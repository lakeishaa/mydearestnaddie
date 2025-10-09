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