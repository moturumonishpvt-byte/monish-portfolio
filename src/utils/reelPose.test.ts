import { reelPose, getSceneConfig, normalizeAngle, easeOutCubic } from './reelPose';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

function approx(a: number, b: number, eps = 1e-3): boolean {
  return Math.abs(a - b) <= eps;
}

console.log('--- RUNNING UNIT TESTS FOR reelPose ---');

// Test 1: Geometry at angle = 0 (far center)
{
  const scene = { radius: 1000, tilt: 0, roll: 0, perspective: 500, cardScale: 1.0 };
  const pose = reelPose(0, 1.0, scene);
  assert(approx(pose.x, 0), 'angle 0 deg: x should be 0');
  assert(approx(pose.z, -1000), 'angle 0 deg: z should be -radius (-1000)');
  assert(approx(pose.yaw, 0), 'angle 0 deg: yaw should be 0');
  assert(approx(pose.appear, 1.0), 'angle 0 deg: appear should be 1 at formation 1');
  assert(!pose.behindCamera, 'angle 0 deg: far side is in front of camera');
}

// Test 2: Geometry at angle = 90 deg
{
  const scene = { radius: 1000, tilt: 0, roll: 0, perspective: 500, cardScale: 1.0 };
  const pose = reelPose(90, 1.0, scene);
  assert(approx(pose.x, -1000), 'angle 90 deg: x should be -radius (-1000)');
  assert(approx(pose.z, 0), 'angle 90 deg: z should be 0');
  assert(approx(pose.yaw, 90), 'angle 90 deg: yaw should be 90');
}

// Test 3: Geometry at angle = 180 deg (front nearest camera)
{
  const scene = { radius: 1000, tilt: 0, roll: 0, perspective: 500, cardScale: 1.0 };
  const pose = reelPose(180, 1.0, scene);
  assert(approx(pose.x, 0), 'angle 180 deg: x should be 0');
  assert(approx(pose.z, 1000), 'angle 180 deg: z should be +radius (+1000)');
  assert(approx(pose.yaw, 180), 'angle 180 deg: yaw should be 180');
}

// Test 4: Expansion 0 Scene Config
{
  const s0 = getSceneConfig(0);
  assert(approx(s0.radius, 460), 'expansion 0: radius is 460');
  assert(approx(s0.tilt, -22), 'expansion 0: tilt is -22 deg');
  assert(approx(s0.roll, -20), 'expansion 0: roll is -20 deg');
  assert(approx(s0.perspective, 1000), 'expansion 0: perspective is 1000px');
  assert(approx(s0.cardScale, 0.52), 'expansion 0: cardScale is 0.52');
}

// Test 5: Expansion 1 Scene Config
{
  const s1 = getSceneConfig(1);
  assert(approx(s1.radius, 1800), 'expansion 1: radius is 1800');
  assert(approx(s1.tilt, 0), 'expansion 1: tilt is 0 deg');
  assert(approx(s1.roll, 0), 'expansion 1: roll is 0 deg');
  assert(approx(s1.perspective, 450), 'expansion 1: perspective is 450px');
  assert(approx(s1.cardScale, 2.3), 'expansion 1: cardScale is 2.3');
}

// Test 6: Formation deal - Undealt cards are hidden (appear = 0)
{
  const scene = { radius: 460, tilt: -22, roll: -20, perspective: 1000, cardScale: 0.52, slotIndex: 12, totalSlots: 16 };
  // Card 12 should not appear when formation is low (e.g. 0.1)
  const pose = reelPose((12 * 360) / 16, 0.1, scene);
  assert(pose.appear === 0, 'formation 0.1: slot 12 is in waiting stack and completely invisible (appear = 0)');
}

// Test 7: Formation 1 - All cards are dealt, appear = 1 and at correct angle
{
  const scene = getSceneConfig(1, 4, 16);
  const targetAngle = (4 * 360) / 16; // 90 deg
  const pose = reelPose(targetAngle, 1.0, scene);
  assert(approx(pose.appear, 1.0), 'formation 1: card has appear = 1');
  assert(approx(pose.yaw, targetAngle), 'formation 1: card has exact target angle');
  assert(approx(pose.scale, 2.3), 'formation 1 + expansion 1: cardScale is 2.3');
}

// Test 8: Behind camera detection
{
  // When perspective is 450 and z is 600, card is behind camera plane
  const scene = { radius: 800, tilt: 0, roll: 0, perspective: 450, cardScale: 1.0 };
  const pose = reelPose(180, 1.0, scene); // z = 800 >= 450
  assert(pose.behindCamera, 'card with z > perspective is behind camera plane');
}

console.log('--- ALL UNIT TESTS PASSED SUCCESSFULLY! ---');
