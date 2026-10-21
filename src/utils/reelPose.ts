/**
 * Pure 3D Reel Pose Function & Interpolators
 *
 * Implements the mathematical cylinder projection and motion transforms:
 * x = -sin(a) * radius
 * z = -cos(a) * radius
 * yaw = a
 *
 * Supports two master motion drivers:
 * 1. formation (0 -> 1): Staggered deal out from front stack (180 deg) around the ring.
 * 2. expansion (0 -> 1): Camera swoop from exterior overhead tilt into inside-cylinder level view.
 */

export interface SceneConfig {
  radius: number;       // ring radius in px (460 -> 1800)
  tilt: number;         // x-axis tilt in deg (-22 -> 0)
  roll: number;         // z-axis dutch roll in deg (-20 -> 0)
  perspective: number;  // camera perspective in px (1000 -> 450)
  cardScale: number;    // scale factor (0.52 -> 2.3)
  cardYOffset?: number; // optional vertical offset in px
  slotIndex?: number;   // 0..15 slot index for staggered deal order
  totalSlots?: number;  // default 16
}

export interface ReelPoseResult {
  x: number;
  y: number;
  z: number;
  yaw: number;
  scale: number;
  appear: number;
  behindCamera: boolean;
}

// Cubic bezier evaluator for expansion: cubic-bezier(.5, 0, .15, 1)
export function createCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  function sampleX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }
  function sampleY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }
  function solveX(x: number) {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const currentX = sampleX(t) - x;
      if (Math.abs(currentX) < 1e-5) return t;
      const dX = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(dX) < 1e-5) break;
      t -= currentX / dX;
    }
    return t;
  }

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return sampleY(solveX(x));
  };
}

export const expansionEase = createCubicBezier(0.5, 0, 0.15, 1);

export function easeOutCubic(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - clamped, 3);
}

/**
 * Computes interpolated SceneConfig for expansion (0 to 1)
 * At expansion 0: radius 460, tilt -22deg, roll -20deg, perspective 1000px, cardScale 0.52
 * At expansion 1: radius 1800, tilt 0deg, roll 0deg, perspective 450px, cardScale 2.3
 */
export function getSceneConfig(expansion: number, slotIndex?: number, totalSlots = 16): SceneConfig {
  const e = expansionEase(Math.min(1, Math.max(0, expansion)));
  return {
    radius: 460 + (1800 - 460) * e,
    tilt: -22 + (0 - -22) * e,
    roll: -20 + (0 - -20) * e,
    perspective: 1000 + (450 - 1000) * e,
    cardScale: 0.52 + (2.3 - 0.52) * e,
    slotIndex,
    totalSlots,
  };
}

/**
 * Normalizes an angle into [-180, 180) degrees
 */
export function normalizeAngle(deg: number): number {
  let a = deg % 360;
  if (a > 180) a -= 360;
  if (a <= -180) a += 360;
  return a;
}

/**
 * Pure Pose Function: reelPose(angle, formation, scene)
 *
 * @param angle Target resting angle around the ring in degrees. (0 = far center, ±180 = nearest front)
 * @param formation Deal progress (0 to 1). Deal travels around the ring.
 * @param scene Scene properties (radius, perspective, cardScale, etc.)
 */
export function reelPose(
  angle: number,
  formation: number,
  scene: SceneConfig
): ReelPoseResult {
  const totalSlots = scene.totalSlots || 16;

  // Derive slot index from scene config or resting angle
  let slotIndex = scene.slotIndex;
  if (slotIndex === undefined) {
    const norm = (angle % 360 + 360) % 360;
    slotIndex = Math.round((norm / 360) * totalSlots) % totalSlots;
  }

  // Formation Deal:
  // All cards start stacked at the front of the ring (180°), looking like one card.
  // Each card deals out sequentially along a curved trajectory into its assigned slot.
  let currentAngle = angle;
  let appear = 1;
  let dealScaleMult = 1;

  if (formation < 1) {
    // Stagger deal across the slots so the deal travels around the ring.
    // Order slots by angle: slot 0 (0° far), slot 8 (180° front), etc.
    // Normalized slot position in sequence [0, 1)
    const slotNorm = (slotIndex / totalSlots);

    // Stagger window: each deal takes ~0.28 of the total formation timeline
    const cardDuration = 0.28;
    const maxStart = 1.0 - cardDuration;
    const cardStart = slotNorm * maxStart;
    const cardEnd = cardStart + cardDuration;

    if (formation <= cardStart) {
      // Waiting stack: kept invisible as specified ("so the waiting stack is never visible")
      appear = 0;
      currentAngle = 180;
      dealScaleMult = 0.8;
    } else if (formation >= cardEnd) {
      // Already dealt into position
      appear = 1;
      currentAngle = angle;
      dealScaleMult = 1;
    } else {
      // Actively dealing outward
      const localT = (formation - cardStart) / cardDuration;
      const easedT = easeOutCubic(localT);

      // Swing outward from front stack (180°) to assigned target angle
      // Pick shortest angular travel
      const diff = normalizeAngle(angle - 180);
      currentAngle = 180 + diff * easedT;

      // Card fades in during first 40% of its deal
      appear = Math.min(1, localT * 2.5);
      dealScaleMult = 0.85 + 0.15 * easedT;
    }
  }

  // Pure geometry projection:
  // x = -sin(a) * radius
  // z = -cos(a) * radius
  // yaw = a
  const rad = (currentAngle * Math.PI) / 180;
  const x = -Math.sin(rad) * scene.radius;
  const z = -Math.cos(rad) * scene.radius;
  const y = scene.cardYOffset || 0;
  const yaw = currentAngle;
  const scale = scene.cardScale * dealScaleMult;

  // Behind camera detection:
  // The camera is at (0, 0, scene.perspective).
  // A card is behind camera or clipped if its projected z approaches or exceeds perspective distance.
  const behindCamera = z >= scene.perspective - 40;

  return {
    x,
    y,
    z,
    yaw,
    scale,
    appear,
    behindCamera,
  };
}
