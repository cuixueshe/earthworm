import confetti from "canvas-confetti";

export function redFireworksEffect(customConfetti: ReturnType<typeof confetti.create>) {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  const chineseReds = ["#ed5a65", "#c04851", "#c02c38", "#7c1823"];

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    customConfetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: chineseReds,
    });
    customConfetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: chineseReds,
    });
  }, 250);
}

export function schoolPrideEffect(customConfetti: ReturnType<typeof confetti.create>) {
  const end = Date.now() + 15 * 1000;
  const colors = ["#bb0000", "#ffffff"];

  (function frame() {
    customConfetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    customConfetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function normalEffect(customConfetti: ReturnType<typeof confetti.create>) {
  customConfetti({
    particleCount: 300,
    spread: 180,
    origin: { y: -0.1 },
    startVelocity: -35,
  });
}
