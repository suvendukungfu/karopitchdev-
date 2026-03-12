/* ===========================
   KARO PITCH — Interaction Layer
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  const spotlightOverlay = document.getElementById("spotlightOverlay");
  const spotlightCard = spotlightOverlay?.querySelector(".spotlight-card");
  const closeSpotlight = document.getElementById("closeSpotlight");

  const hoverPanel = document.getElementById("hoverPanel");
  const hoverName = document.getElementById("hp-name");
  const hoverCategory = document.getElementById("hp-cat");
  const hoverStage = document.getElementById("hp-stage");
  const hoverLocation = document.getElementById("hp-loc");
  const hoverVotes = document.getElementById("hp-votes");

  const spotlightFounder = document.getElementById("sl-founder");
  const spotlightStartup = document.getElementById("sl-startup");
  const spotlightCategory = document.getElementById("sl-cat");
  const spotlightStage = document.getElementById("sl-stage");
  const spotlightPitch = document.getElementById("sl-pitch");

  const navBar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const mobileToggle = document.getElementById("mobileToggle");

  const discoveryNodes = document.querySelectorAll(".node-point");
  const tiltElements = document.querySelectorAll(".tilt-element");
  const revealOnScroll = document.querySelectorAll(".animate-on-scroll");
  const introAnimated = document.querySelectorAll(".animate-up, .animate-fade");
  const counters = document.querySelectorAll(".ks-num[data-count]");
  const upvoteButtons = document.querySelectorAll(".upvote-btn");

  let hoverHideTimer;

  const setNavScrolled = () => {
    if (!navBar) return;
    navBar.classList.toggle("scrolled", window.scrollY > 12);
  };

  const openSpotlight = (data) => {
    if (!spotlightOverlay) return;
    if (spotlightFounder) spotlightFounder.textContent = data.founder;
    if (spotlightStartup) spotlightStartup.textContent = data.startup;
    if (spotlightCategory) spotlightCategory.textContent = data.category;
    if (spotlightStage) spotlightStage.textContent = data.stage;
    if (spotlightPitch) spotlightPitch.textContent = data.pitch;
    spotlightOverlay.classList.add("active");
    document.body.classList.add("modal-open");
  };

  const closeSpotlightOverlay = () => {
    if (!spotlightOverlay) return;
    spotlightOverlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  const setHoverPanel = (node) => {
    if (!hoverPanel) return;
    if (hoverName) hoverName.textContent = node.dataset.startup || "Startup";
    if (hoverCategory) hoverCategory.textContent = node.dataset.cat || "Category";
    if (hoverStage) hoverStage.textContent = node.dataset.stage || "Stage";
    if (hoverLocation) hoverLocation.textContent = node.dataset.loc || "Location";
    if (hoverVotes) hoverVotes.textContent = node.dataset.votes || "0";
    hoverPanel.classList.add("visible");
  };

  const hideHoverPanel = () => {
    if (!hoverPanel) return;
    hoverPanel.classList.remove("visible");
  };

  introAnimated.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, 100 + index * 90);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );
  revealOnScroll.forEach((element) => revealObserver.observe(element));

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number.parseInt(element.getAttribute("data-count"), 10);
        if (!Number.isFinite(target)) {
          observer.unobserve(element);
          return;
        }
        const durationMs = 1600;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const value = Math.floor(target * progress);
          element.textContent = value.toLocaleString("en-IN");
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    },
    { threshold: 0.4 },
  );
  counters.forEach((element) => counterObserver.observe(element));

  discoveryNodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      clearTimeout(hoverHideTimer);
      setHoverPanel(node);
    });

    node.addEventListener("mouseleave", () => {
      hoverHideTimer = setTimeout(hideHoverPanel, 120);
    });

    node.addEventListener("click", (event) => {
      event.stopPropagation();
      openSpotlight({
        founder: node.dataset.founder || "Founder",
        startup: node.dataset.startup || "Startup",
        category: node.dataset.cat || "Category",
        stage: node.dataset.stage || "Stage",
        pitch: node.dataset.pitch || "Pitch summary unavailable.",
      });
    });
  });

  if (hoverPanel) {
    hoverPanel.addEventListener("mouseenter", () => {
      clearTimeout(hoverHideTimer);
    });
    hoverPanel.addEventListener("mouseleave", hideHoverPanel);
  }

  if (closeSpotlight) {
    closeSpotlight.addEventListener("click", closeSpotlightOverlay);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSpotlightOverlay();
  });

  if (spotlightOverlay && spotlightCard) {
    spotlightOverlay.addEventListener("click", (event) => {
      if (!spotlightCard.contains(event.target)) closeSpotlightOverlay();
    });
  }

  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (supportsFinePointer) {
    tiltElements.forEach((element) => {
      if (element.classList.contains("node-point")) return;
      element.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
        const rotateY = ((x - rect.width / 2) / rect.width) * 10;
        element.style.transform =
          "perspective(1200px) rotateX(" +
          rotateX +
          "deg) rotateY(" +
          rotateY +
          "deg) translateZ(0)";
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "";
      });
    });
  }

  upvoteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");
      button.textContent = isActive ? "▲ Upvoted" : "▲ Upvote";
    });
  });

  const closeMobileMenu = () => {
    if (!navLinks || !mobileToggle) return;
    navLinks.classList.remove("active");
    mobileToggle.classList.remove("active");
    mobileToggle.setAttribute("aria-expanded", "false");
  };

  if (mobileToggle && navLinks) {
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      mobileToggle.classList.toggle("active", isOpen);
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  setNavScrolled();
  window.addEventListener("scroll", setNavScrolled, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });
});
