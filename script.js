/* ===========================
   KARO PITCH — Interaction Layer
   Refined for Stability & Precision
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Selection & Initialization ---
    const elements = {
        navbar: document.getElementById("navbar"),
        navIsland: document.querySelector(".nav-island"),
        navLinks: document.getElementById("navLinks"),
        mobileToggle: document.getElementById("mobileToggle"),
        heroVisual: document.querySelector(".hero-visual-wrap"),
        spotlight: document.getElementById("spotlightOverlay"),
        closeSpotlight: document.getElementById("closeSpotlight"),
        counters: document.querySelectorAll(".ks-num[data-count]"),
        tiltItems: document.querySelectorAll(".tilt-element"),
        cursorGlow: document.getElementById("cursorGlow"),
        magneticBtns: document.querySelectorAll(".btn"),
        cityNodes: document.querySelectorAll(".city-node"),
        mapTooltip: document.getElementById("mapTooltip"),
        tooltipCity: document.getElementById("tooltipCity"),
        tooltipStartups: document.getElementById("tooltipStartups"),
        timelineStages: document.querySelectorAll(".stage-point")
    };

    // --- Cursor Glow Evolution ---
    window.addEventListener("mousemove", (e) => {
        if (elements.cursorGlow) {
            elements.cursorGlow.style.opacity = "1";
            elements.cursorGlow.style.left = e.clientX + "px";
            elements.cursorGlow.style.top = e.clientY + "px";
        }
    });

    window.addEventListener("mouseout", () => {
        if (elements.cursorGlow) elements.cursorGlow.style.opacity = "0";
    });

    // --- Magnetic Buttons Interface ---
    elements.magneticBtns.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // --- 2. Navigation State ---
    const handleScroll = () => {
        if (window.scrollY > 20) {
            elements.navbar?.classList.add("scrolled");
            elements.navIsland?.classList.add("scrolled");
        } else {
            elements.navbar?.classList.remove("scrolled");
            elements.navIsland?.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // --- 3. Spotlight Interface ---
    // (Used for future story expansion or details)
    const closeSpotlight = () => {
        elements.spotlight?.classList.remove("active");
        document.body.style.overflow = "";
    };
    elements.closeSpotlight?.addEventListener("click", closeSpotlight);
    elements.spotlight?.addEventListener("click", (e) => {
        if (e.target === elements.spotlight) closeSpotlight();
    });

    // --- 4. 3D Tilt Logic (Premium Motion) ---
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isMobile) {
        elements.tiltItems.forEach(item => {
            // Skip nodes as they have complex parent rotations
            if (item.classList.contains('node-point')) return;

            item.addEventListener("mousemove", (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            item.addEventListener("mouseleave", () => {
                item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // --- 5. Scroll Reveal Engine ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".animate-on-scroll, .animate-up, .animate-fade").forEach(el => {
        revealObserver.observe(el);
    });

    // --- 6. Number Counter (Stat Reveal) ---
    const animateValue = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        let start = 0;
        const startTime = performance.now();

        const counterStep = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            
            el.textContent = value.toLocaleString() + (target >= 1000 ? "+" : "");
            
            if (progress < 1) {
                requestAnimationFrame(counterStep);
            }
        };
        requestAnimationFrame(counterStep);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    elements.counters.forEach(c => counterObserver.observe(c));

    // --- 7. Upvote Mechanism ---
    document.querySelectorAll(".upvote-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            this.classList.toggle("active");
            this.textContent = this.classList.contains("active") ? "▲ Upvoted" : "▲ Upvote";
        });
    });

    // --- 8. Mobile Menu Toggle ---
    elements.mobileToggle?.addEventListener("click", () => {
        elements.navLinks?.classList.toggle("active");
        elements.mobileToggle?.classList.toggle("active");
    });

    // Close mobile menu on link click
    elements.navLinks?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            elements.navLinks?.classList.remove("active");
            elements.mobileToggle?.classList.remove("active");
        });
    });

    // --- 9. Ecosystem Map Hub ---
    elements.cityNodes.forEach(node => {
        node.addEventListener("mouseenter", () => {
            const city = node.dataset.city;
            const startups = node.dataset.startups;
            
            if (elements.tooltipCity) elements.tooltipCity.textContent = city;
            if (elements.tooltipStartups) elements.tooltipStartups.textContent = startups;
            elements.mapTooltip?.classList.add("visible");
        });

        node.addEventListener("mouseleave", () => {
            elements.mapTooltip?.classList.remove("visible");
        });
    });

    // --- 10. Startup Journey Timeline Engine ---
    elements.timelineStages.forEach(stage => {
        stage.addEventListener("mouseenter", () => {
            elements.timelineStages.forEach(s => s.classList.remove("active"));
            stage.classList.add("active");
        });
    });

    // --- System Startup ---
    console.log("🚀 Karo Pitch Advanced Ecosystem Online");
});
