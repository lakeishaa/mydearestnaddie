document.addEventListener("click", () => {
  document.getElementById("myAudio").play();
});

// 🎃🍄🐌🔮🎪🎬🎭🍋🌈🤡 spawn random emojis while hovering the envelope
(function () {
    const hoverTarget = document.querySelector(".letter-image");
    if (!hoverTarget) return;
  
    let timer = null;
  
    // pool of emojis to choose from
    const emojis = ["🤡","🎃","🍄","🐌","🔮","🎪","🎬","🎭","🍋","🌈"];
  
    function spawnEmoji() {
      const el = document.createElement("div");
      el.className = "emoji-pop";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
      // random size, position, and speed
      const size = 32 + Math.random() * 36;              // 22–58px
      const x = Math.random() * window.innerWidth;       // anywhere on screen
      const y = Math.random() * window.innerHeight;      // anywhere on screen
      const dur = 2 + Math.random() * 1.8;             // 0.9–2.7s
  
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.fontSize = size + "px";
      el.style.animationDuration = dur + "s";
      el.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
  
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
  
    function burst(n = 24) {
      for (let i = 0; i < n; i++) spawnEmoji();
    }
  
    hoverTarget.addEventListener("mouseenter", () => {
      if (timer) return;           // prevent stacking intervals
      burst(30);                   // initial burst
      timer = setInterval(() => {  // continual sprinkle
        for (let i = 0; i < 8; i++) spawnEmoji();
      }, 400);
    });
  
    hoverTarget.addEventListener("mouseleave", () => {
      if (timer) clearInterval(timer);
      timer = null;
      // clean up any leftovers after their animation
      setTimeout(() => {
        document.querySelectorAll(".emoji-pop").forEach(n => n.remove());
      }, 2500);
    });
  })();

  // i fear nothing
  (function () {
    const hoverArea = document.querySelector(".letter-image");
    const container = document.querySelector(".letter .letter-context-body");
    if (!hoverArea || !container) return;
  
    let rafId = null;
    let direction = 1; // 1 = scroll down, -1 = up
    let lastTime = 0;
  
    // speed scales with content length; tune baseSpeed to taste
    function getSpeedPxPerSec() {
      const max = container.scrollHeight - container.clientHeight;
      // 30–70 px/s depending on how long the content is
      return Math.min(70, Math.max(30, max / 8));
    }
  
    function step(ts) {
      if (!lastTime) lastTime = ts;
      const dt = (ts - lastTime) / 1000;
      lastTime = ts;
    
      const max = container.scrollHeight - container.clientHeight;
      if (max <= 0) return;
    
      const speed = getSpeedPxPerSec() * 0.33; // 33% of current speed
      container.scrollTop += direction * speed * dt;
  
      // bounce at edges
      if (container.scrollTop <= 0) {
        container.scrollTop = 0;
        direction = 1;
      } else if (container.scrollTop >= max) {
        container.scrollTop = max;
        direction = -1;
      }
  
      rafId = requestAnimationFrame(step);
    }
  
    function start() {
      // Only auto-scroll when the envelope is "open" (on hover)
      cancelAnimationFrame(rafId);
      lastTime = 0;
      rafId = requestAnimationFrame(step);
    }
  
    function stop() {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  
    // If the user manually scrolls, we keep animating but in the current direction
    let lastScrollTop = 0;
    container.addEventListener("scroll", () => {
      const now = container.scrollTop;
      direction = now >= lastScrollTop ? 1 : -1;
      lastScrollTop = now;
    }, { passive: true });
  
    hoverArea.addEventListener("mouseenter", start);
    hoverArea.addEventListener("mouseleave", stop);
  
    // Also stop on page hide to be nice to the CPU
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
    });
  })();