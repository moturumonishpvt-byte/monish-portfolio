export const motionTokens = {
  // Easings
  ease: {
    cinema: [0.16, 1, 0.3, 1] as [number, number, number, number],
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
    sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
    elastic: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
  // Durations (seconds)
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.5,
    deliberate: 0.8,
    scenic: 1.2,
    epic: 1.6,
  },
  // Springs
  spring: {
    snappy: { stiffness: 350, damping: 25 },
    gentle: { stiffness: 180, damping: 24, mass: 0.8 },
    float: { stiffness: 100, damping: 18, mass: 1 },
    tactile: { stiffness: 400, damping: 30, mass: 0.5 },
  },
  // Stagger delays (seconds)
  stagger: {
    tight: 0.04,
    normal: 0.08,
    relaxed: 0.14,
  },
};
