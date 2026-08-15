document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".overlay");
    const animated = document.querySelectorAll(".animate-up");
    setTimeout(() => {
        overlay.classList.add("done");
        setTimeout(() => animated.forEach(el => el.classList.add("done")), 500);
    }, 300);

    const p2ColLeft = document.getElementById("p2ColLeft");
    const p2ColRight = document.getElementById("p2ColRight");
    const cardAccount = document.getElementById("cardAccount");
    const cardRevops = document.getElementById("cardRevops");
    const cardFunnel = document.getElementById("cardFunnel");

    if (!p2ColLeft) return;

    let state = "funnel";
    
    let busy = false;

    const EASE = "cubic-bezier(.4,0,.2,1)";
    const FLIP_MS = 700;
    const FADE_MS = 220;

    const getH = el => el.getBoundingClientRect().height;

    function morphCols(lA, lB, rA, rB, ms, cb) {
        const t0 = performance.now();
        const eio = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        (function tick(now) {
            const p = Math.min((now - t0) / ms, 1), e = eio(p);
            p2ColLeft.style.flexGrow = lA + (lB - lA) * e;
            p2ColRight.style.flexGrow = rA + (rB - rA) * e;
            p < 1 ? requestAnimationFrame(tick) : cb?.();
        })(t0);
    }

    function flipCards(pairs, ms = FLIP_MS, cb) {
        if (typeof ms === "function") { cb = ms; ms = FLIP_MS; }
        pairs.forEach(({ card, startH }) => {
            card.style.flex = "none";
            card.style.height = startH + "px";
        });
        requestAnimationFrame(() => requestAnimationFrame(() => {
            pairs.forEach(({ card, endH }) => {
                card.style.transition = `height ${ms}ms ${EASE}`;
                card.style.height = endH + "px";
            });
            setTimeout(() => {
                pairs.forEach(({ card }) => {
                    card.style.transition = "";
                    card.style.height = "";
                    card.style.flex = "";
                });
                cb?.();
            }, ms + 20);
        }));
    }

    function fadeCard(card, to) {
        card.style.transition = `opacity ${FADE_MS}ms ease`;
        card.style.opacity = String(to);
        card.style.pointerEvents = to === 0 ? "none" : "";
    }

    function collapseContent(card) {
        const b = card.querySelector(".p2-card-body");
        const h = card.querySelector(".p2-card-header h3");
        if (b) Object.assign(b.style, { transition: "opacity .2s,max-height .3s", opacity: "0", maxHeight: "0", pointerEvents: "none" });
        if (h) Object.assign(h.style, { transition: `font-size .25s ${EASE}`, fontSize: "" });
    }

    function revealContent(card, delay = 0.1) {
        const b = card.querySelector(".p2-card-body");
        const h = card.querySelector(".p2-card-header h3");
        if (b) Object.assign(b.style, { transition: `opacity .4s ease ${delay}s,max-height .6s ease ${delay}s`, maxHeight: "500px", opacity: "1", pointerEvents: "auto" });
        if (h) Object.assign(h.style, { transition: `font-size .5s ${EASE} ${delay}s`, fontSize: "clamp(1.8rem,3.2vw,3rem)" });
    }

    function finish(card, nextState) {
        revealContent(card);
        setTimeout(() => {
            state = nextState;
            busy = false;
        }, 300);
    }

    function moveCard(card, parent, prepend = false) {
        fadeCard(card, 0);
        setTimeout(() => {
            prepend ? parent.prepend(card) : parent.appendChild(card);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                card.style.transition = `opacity ${FADE_MS}ms ease`;
                card.style.opacity = "1";
                card.style.pointerEvents = "";
                setTimeout(() => { card.style.transition = ""; }, FADE_MS + 10);
            }));
        }, FADE_MS + 10);
    }

    function fromFunnelToAccount() {
        collapseContent(cardFunnel);
        const hAccS = getH(cardAccount);
        const hFunS = getH(cardFunnel);

        morphCols(1, 1.6, 1.6, 1, 700, () => {
            moveCard(cardRevops, p2ColRight);
            setTimeout(() => {
                flipCards([
                    { card: cardAccount, startH: hAccS, endH: getH(cardAccount) },
                    { card: cardFunnel, startH: hFunS, endH: getH(cardFunnel) }
                ], 700, () => finish(cardAccount, "account"));
            }, FADE_MS + 10);
        });
    }

    function fromFunnelToRevops() {
        collapseContent(cardFunnel);
        p2ColLeft.style.justifyContent = "flex-end";
        const hRevS = getH(cardRevops);
        const hFunS = getH(cardFunnel);

        morphCols(1, 1.6, 1.6, 1, 700, () => { 
            moveCard(cardAccount, p2ColRight, true);
            setTimeout(() => {
                flipCards([
                    { card: cardRevops, startH: hRevS, endH: getH(cardRevops) },
                    { card: cardFunnel, startH: hFunS, endH: getH(cardFunnel) }
                ], 700, () => {
                    p2ColLeft.style.justifyContent = "";
                    finish(cardRevops, "revops");
                });
            }, FADE_MS + 10);
        });
    }

    function fromAccountToRevops() {
        collapseContent(cardAccount);
        const hFull = getH(cardAccount);
        const hHalf = getH(cardFunnel);

        p2ColLeft.appendChild(cardRevops);

        flipCards([{ card: cardAccount, startH: hFull, endH: hHalf }], 450, () => {
            p2ColLeft.style.justifyContent = "flex-end";
            p2ColRight.prepend(cardAccount);
            flipCards([{ card: cardRevops, startH: hHalf, endH: getH(p2ColLeft) }], 450, () => {
                p2ColLeft.style.justifyContent = "";
                finish(cardRevops, "revops");
            });
        });
    }

    function fromRevopsToAccount() {
        collapseContent(cardRevops);
        const hFull = getH(cardRevops);
        const hHalf = getH(cardFunnel);

        p2ColLeft.prepend(cardAccount);

        flipCards([{ card: cardRevops, startH: hFull, endH: hHalf }], 450, () => {
            p2ColLeft.style.justifyContent = "";
            p2ColRight.appendChild(cardRevops);
            flipCards([{ card: cardAccount, startH: hHalf, endH: getH(p2ColLeft) }], 450, () => {
                finish(cardAccount, "account");
            });
        });
    }

    function fromAccountToFunnel() {
        collapseContent(cardAccount);
        const hAccS = getH(cardAccount);
        const hFunS = getH(cardFunnel);

        moveCard(cardRevops, p2ColLeft);
        morphCols(1.6, 1, 1, 1.6, 700, () => {
            flipCards([
                { card: cardAccount, startH: hAccS, endH: getH(cardAccount) },
                { card: cardFunnel, startH: hFunS, endH: getH(cardFunnel) }
            ], 700, () => finish(cardFunnel, "funnel"));
        });
    }

    function fromRevopsToFunnel() {
        collapseContent(cardRevops);
        p2ColLeft.style.justifyContent = "";
        const hRevS = getH(cardRevops);
        const hFunS = getH(cardFunnel);

        moveCard(cardAccount, p2ColLeft, true);
        morphCols(1.6, 1, 1, 1.6, 700, () => {
            flipCards([
                { card: cardRevops, startH: hRevS, endH: getH(cardRevops) },
                { card: cardFunnel, startH: hFunS, endH: getH(cardFunnel) }
            ], 700, () => finish(cardFunnel, "funnel"));
        });
    }

    function goTo(target) {
        if (busy || state === target) return;
        busy = true;
        if (state === "funnel" && target === "account") fromFunnelToAccount();
        else if (state === "funnel" && target === "revops") fromFunnelToRevops();
        else if (state === "account" && target === "revops") fromAccountToRevops(); 
        else if (state === "revops" && target === "account") fromRevopsToAccount();
        else if (state === "account" && target === "funnel") fromAccountToFunnel();
        else if (state === "revops" && target === "funnel") fromRevopsToFunnel();
    }

    document.getElementById("btnAccount")?.addEventListener("click", () => goTo("account"));
    document.getElementById("btnRevops")?.addEventListener("click", () => goTo("revops"));
    document.getElementById("btnFunnel")?.addEventListener("click", () => goTo("funnel"));
});
