const aura = document.querySelector(".cursor-aura");
const progress = document.querySelector(".progress");
window.__v2RideLoaded = true;

window.addEventListener("pointermove", (event) => {
  aura?.style.setProperty("--x", `${event.clientX}px`);
  aura?.style.setProperty("--y", `${event.clientY}px`);
}, { passive: true });

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? window.scrollY / max : 0;
  progress?.style.setProperty("transform", `scaleX(${Math.max(0, Math.min(1, value))})`);
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

function setupFallbackMotion() {
  const hero = document.querySelector(".ride-hero");
  const posters = document.querySelectorAll(".poster");
  const planet = document.querySelector(".avatar-planet");
  const copy = document.querySelector(".hero-copy");
  const foodStory = document.querySelector(".food-story");
  const foodIcons = Array.from(document.querySelectorAll(".food-icon"));
  const storyCopies = Array.from(document.querySelectorAll(".story-copy"));
  const signal = document.querySelector(".shawn-signal");
  const frames = Array.from(document.querySelectorAll(".review-frame"));
  const words = Array.from(document.querySelectorAll(".kinetic-words span"));
  const skyLines = Array.from(document.querySelectorAll(".story-sky span"));

  window.addEventListener("scroll", () => {
    const rect = hero?.getBoundingClientRect();
    if (rect && planet && copy) {
      const progress = Math.max(0, Math.min(1, Math.abs(rect.top) / (rect.height - window.innerHeight)));
      planet.style.transform = `scale(${1 + progress * .42}) rotate(${progress * 18}deg)`;
      copy.style.transform = `translateY(${-progress * 130}px)`;
      copy.style.opacity = String(1 - progress * .65);
      posters.forEach((poster, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        poster.style.transform = `translate(${direction * progress * 120}px, ${progress * -80}px) rotate(${direction * (8 + progress * 18)}deg)`;
      });
    }

    const storyRect = foodStory?.getBoundingClientRect();
    if (!storyRect || !foodIcons.length) return;
    if (window.innerWidth <= 900) {
      storyCopies.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      if (signal) {
        signal.style.opacity = "1";
        signal.style.transform = "none";
      }
      return;
    }
    const storyProgress = Math.max(0, Math.min(1, -storyRect.top / (storyRect.height - window.innerHeight)));
    const centerPull = Math.sin(storyProgress * Math.PI);
    const burst = Math.max(0, (storyProgress - .66) / .34);
    const iconMoves = [
      [-170, -80, -18],
      [160, -110, 16],
      [0, 120, -6],
      [-130, 120, 12],
      [180, 115, -12]
    ];

    foodIcons.forEach((icon, index) => {
      const [x, y, rotate] = iconMoves[index];
      const form = Math.max(0, Math.min(1, storyProgress * 2.8 - index * .16));
      const gatherX = x * (1 - centerPull) + (index - 2) * 34 * centerPull;
      const gatherY = y * (1 - centerPull) + Math.sin(index) * 18 * centerPull + burst * (index % 2 ? -190 : 190);
      const spin = rotate + storyProgress * (index % 2 ? -140 : 140);
      icon.style.opacity = String(.18 + form * .82);
      icon.style.transform = `translate(${gatherX}px, ${gatherY}px) rotate(${spin}deg) scale(${.5 + form * .5 + centerPull * .28})`;
    });

    storyCopies.forEach((item, index) => {
      const centers = [.12, .43, .75];
      const active = 1 - Math.min(1, Math.abs(storyProgress - centers[index]) / .28);
      item.style.opacity = String(Math.max(0, active));
      item.style.transform = `translateY(${(1 - Math.max(0, active)) * 32}px)`;
    });

    if (signal) {
      const signalScale = .68 + centerPull * .58 + burst * .35;
      signal.style.opacity = String(Math.min(1, storyProgress * 3));
      signal.style.transform = `translate(-50%, -50%) scale(${signalScale}) rotate(${storyProgress * 24}deg)`;
    }

    frames.forEach((frame, index) => {
      const side = index % 2 ? 1 : -1;
      const frameProgress = Math.max(0, Math.min(1, storyProgress * 2.2 - index * .24));
      frame.style.opacity = String(frameProgress * (1 - burst * .7));
      frame.style.transform = `translate(${side * (1 - frameProgress) * 180}px, ${(1 - frameProgress) * 120}px) rotate(${side * (14 - storyProgress * 30)}deg) scale(${.88 + frameProgress * .18})`;
    });

    words.forEach((word, index) => {
      const wordProgress = Math.max(0, Math.min(1, storyProgress * 2.5 - index * .13));
      const drift = (index - 2) * storyProgress * 95;
      word.style.opacity = String(.08 + wordProgress * .32 - burst * .18);
      word.style.transform = `translate(${drift}px, ${Math.sin(storyProgress * 4 + index) * 34}px) rotate(${(index - 2) * 7 + storyProgress * 24}deg)`;
    });

    skyLines.forEach((line, index) => {
      line.style.transform = `translateX(${storyProgress * (index % 2 ? -180 : 180)}px) rotate(${index % 2 ? 21 : -18}deg)`;
      line.style.opacity = String(.18 + centerPull * .48);
    });
  }, { passive: true });
}

function setupGsapRide() {
  if (!window.gsap || !window.ScrollTrigger) {
    setupFallbackMotion();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".journey-start img, .journey-start .eyebrow, .journey-start h1, .scroll-cue", {
    y: 36,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: .1
  });

  gsap.to(".journey-start > div", {
    scrollTrigger: {
      trigger: ".journey-start",
      start: "top top",
      end: "bottom top",
      scrub: 1
    },
    y: -120,
    opacity: 0,
    scale: .9
  });

  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ride-hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  heroTl
    .fromTo(".poster-one", { x: -180, y: 80, rotate: -18, opacity: .4 }, { x: 60, y: -60, rotate: -4, opacity: 1 }, 0)
    .fromTo(".poster-two", { x: 220, y: 40, rotate: 18, opacity: .4 }, { x: -80, y: -80, rotate: 4, opacity: 1 }, 0)
    .fromTo(".poster-three", { y: 180, rotate: 8, opacity: .4 }, { y: -90, rotate: -8, opacity: 1 }, 0)
    .fromTo(".avatar-planet", { scale: .72, rotate: -10 }, { scale: 1.4, rotate: 18 }, 0)
    .to(".hero-copy", { y: -180, opacity: .15 }, .18)
    .to(".hero-stage", { backgroundColor: "#120806" }, .2);

  gsap.from(".scene-copy > *", {
    scrollTrigger: {
      trigger: ".scene-one",
      start: "top 72%",
      end: "top 25%",
      scrub: 1
    },
    y: 70,
    opacity: 0,
    stagger: .12
  });

  const storyTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".food-story",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });

  storyTl
    .fromTo(".rib-icon", { x: -220, y: -120, rotate: -35, scale: .35, opacity: .1 }, { x: -40, y: 20, rotate: 6, scale: 1.1, opacity: 1 }, 0)
    .fromTo(".taco-icon", { x: 260, y: -120, rotate: 32, scale: .35, opacity: .1 }, { x: 40, y: 30, rotate: -6, scale: 1.05, opacity: 1 }, .04)
    .fromTo(".chicken-icon", { y: 260, rotate: -20, scale: .3, opacity: .1 }, { y: 0, rotate: 10, scale: 1.18, opacity: 1 }, .08)
    .fromTo(".sandwich-icon", { x: -240, y: 190, rotate: 24, scale: .3, opacity: .1 }, { x: -20, y: -20, rotate: -5, scale: 1.08, opacity: 1 }, .12)
    .fromTo(".steak-icon", { x: 260, y: 210, rotate: -24, scale: .3, opacity: .1 }, { x: 20, y: -10, rotate: 5, scale: 1.18, opacity: 1 }, .16)
    .to(".food-icon", { x: 0, y: 0, rotate: 0, scale: 1.28, stagger: .03 }, .48)
    .to(".food-icon", { y: (i) => i % 2 ? -140 : 130, x: (i) => (i - 2) * 95, rotate: (i) => i % 2 ? -75 : 75, scale: 1.35, stagger: .02 }, .72)
    .fromTo(".story-copy-one", { opacity: 1, y: 0 }, { opacity: 0, y: -40 }, .16)
    .fromTo(".story-copy-two", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, .24)
    .to(".story-copy-two", { opacity: 0, y: -40 }, .58)
    .fromTo(".story-copy-three", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, .66);

  gsap.from(".scene-device", {
    scrollTrigger: {
      trigger: ".scene-one",
      start: "top 70%",
      end: "center center",
      scrub: 1
    },
    rotate: -6,
    scale: .86,
    opacity: .35
  });

  const horizontal = document.querySelector(".horizontal-inner");
  if (horizontal && window.matchMedia("(min-width: 901px)").matches) {
    const distance = horizontal.scrollWidth - window.innerWidth + window.innerWidth * .1;
    gsap.to(horizontal, {
      x: () => -distance,
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-ride",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });
  }

  gsap.from(".ride-card", {
    scrollTrigger: {
      trigger: ".horizontal-ride",
      start: "top 70%",
      end: "top top",
      scrub: 1
    },
    y: 160,
    rotate: 4,
    opacity: .35,
    stagger: .1
  });

  gsap.from(".impact-card", {
    scrollTrigger: {
      trigger: ".impact-grid",
      start: "top 72%",
      end: "center center",
      scrub: 1
    },
    y: 120,
    opacity: 0,
    stagger: .16
  });

  gsap.to(".finale-bg", {
    scrollTrigger: {
      trigger: ".finale",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    scale: 1,
    y: -80
  });
}

setupGsapRide();
