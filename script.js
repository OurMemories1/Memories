"use strict";

/* =====================================================
   ENGINE
===================================================== */
const stage = document.getElementById("stage");
const bar = document.getElementById("bar");
const counter = document.getElementById("counter");
const audio = document.getElementById("audio");
const musicBtn = document.getElementById("music");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const nextBtn = (label, extra = "") =>
    `<button class="btn" data-next type="button">${esc(label)}</button>${extra}`;

const pages = [
    // 1 Opening
    (c) => `
        <section class="page">
            ${c.opening.badge ? `<span class="badge">${esc(c.opening.badge)}</span>` : ""}
            <h1>${esc(c.opening.headline)}</h1>
            <span class="name">${esc(c.crushName)}</span>
            ${c.opening.subhead ? `<p>${esc(c.opening.subhead)}</p>` : ""}
            ${c.opening.message ? `<p>${esc(c.opening.message)}</p>` : ""}
            ${c.opening.signature ? `<p class="script" style="font-size:15px">${esc(c.opening.signature)}</p>` : ""}
            ${nextBtn(c.opening.button)}
        </section>`,

    // 2 Letter
    (c) => `
        <section class="page">
            <h2>${esc(c.letter.title)}</h2>
            <div class="letter script">
                <span class="dear">${esc(c.ui.dear)} ${esc(c.crushName)},</span>
                <div class="body typing" id="typed"></div>
                <div class="sign" id="sign" hidden>${esc(c.senderName)}</div>
            </div>
            <div class="nav" id="letterNav" hidden>
                <button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>
                ${nextBtn(c.letter.button)}
            </div>
        </section>`,

    // 3 Little things
    (c) => `
        <section class="page wide">
            <h2>${esc(c.little.title)}</h2>
            <div class="cards ${c.little.items.length > 3 ? "four" : "three"}">
                ${c.little.items
                    .map(
                        (it, i) => `
                    <article class="card" style="animation-delay:${0.15 + i * 0.15}s">
                        <span class="ico">${esc(it.icon)}</span>
                        <h3>${esc(it.title)}</h3>
                        <p>${esc(it.text)}</p>
                    </article>`
                    )
                    .join("")}
            </div>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.little.button)}</div>
        </section>`,

    // 4 Memories
    (c) => `
        <section class="page wide">
            <h2>${esc(c.memories.title)}</h2>
            <div class="gallery n${c.memories.photos.length}">
                ${c.memories.photos
                    .map(
                        (p) => `
                    <figure class="shot">
                        <img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy">
                        <figcaption>${esc(p.caption)}</figcaption>
                    </figure>`
                    )
                    .join("")}
            </div>
            <div class="memory-note">
                ${c.memories.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
            </div>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.memories.button)}</div>
        </section>`,

    // 5 Satu kenangan yang tersisa
    (c) => `
        <section class="page memory-solo">
            <h2>${esc(c.soloMemory.title)}</h2>
            <div class="solo-photo">
                <figure class="shot">
                    <img src="${esc(c.soloMemory.photo.src)}" alt="${esc(c.soloMemory.photo.caption)}" loading="lazy">
                    <figcaption>${esc(c.soloMemory.photo.caption)}</figcaption>
                </figure>
            </div>
            ${c.soloMemory.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.soloMemory.button)}</div>
        </section>`,

    // 6 Why you
    (c) => `
        <section class="page wide">
            <h2>${esc(c.why.title)}</h2>
            <div class="cards four">
                ${c.why.items
                    .map(
                        (it, i) => `
                    <article class="card" style="animation-delay:${0.15 + i * 0.15}s">
                        <span class="num">${String(i + 1).padStart(2, "0")}</span>
                        <h3>${esc(it.title)}</h3>
                        <p>${esc(it.text)}</p>
                    </article>`
                    )
                    .join("")}
            </div>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.why.button)}</div>
        </section>`,

    // 7 Final
    (c) => `
        <section class="page">
            <span class="badge">${esc(c.final.badge)}</span>
            <p class="final-line">${esc(c.final.headline)}</p>
            ${c.final.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
            <div class="heart-big">♡</div>
            <div class="script" style="font-size:16px">${esc(c.final.from)}</div>
            <span class="name" style="font-size:clamp(30px,9vw,44px)">${esc(c.senderName)}</span>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>
            <button class="btn" data-restart type="button">${esc(c.final.button)}</button></div>
        </section>`
];

let current = 0;
let busy = false;
let typeTimer = null;
let typeDone = false;

/* ---------- Render & transisi ---------- */
function show(index) {
    if (index < 0 || index >= pages.length) return;
    clearTimeout(typeTimer);

    stage.innerHTML = pages[index](CONFIG);
    current = index;

    const total = String(pages.length).padStart(2, "0");
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${total}`;
    bar.style.width = ((index + 1) / pages.length) * 100 + "%";

    document.querySelectorAll(".shot img").forEach((img) =>
        img.addEventListener("error", () => {
            img.remove();
            img.parentElement?.classList.add("empty");
        })
    );

    if (index === 1) startTyping();
}

function go(index) {
    if (busy || index === current) return;
    const old = stage.firstElementChild;
    if (!old || reduceMotion) return show(index);

    busy = true;
    old.classList.add("leave");
    setTimeout(() => {
        show(index);
        busy = false;
    }, 420);
}

/* ---------- Typing ---------- */
function startTyping() {
    const box = document.getElementById("typed");
    const text = CONFIG.letter.message;
    typeDone = false;
    let i = 0;

    const tick = () => {
        i++;
        box.textContent = text.slice(0, i);
        if (i >= text.length) return finishTyping();
        typeTimer = setTimeout(tick, CONFIG.typingSpeed);
    };

    if (reduceMotion) return finishTyping();
    tick();
}

function finishTyping() {
    clearTimeout(typeTimer);
    const box = document.getElementById("typed");
    if (!box) return;
    box.textContent = CONFIG.letter.message;
    box.classList.remove("typing");
    document.getElementById("sign").hidden = false;
    document.getElementById("letterNav").hidden = false;
    typeDone = true;
}

/* ---------- Heart burst ---------- */
function burst(x, y) {
    if (reduceMotion) return;
    for (let i = 0; i < 8; i++) {
        const h = document.createElement("span");
        const angle = (Math.PI * 2 * i) / 8;
        const dist = 40 + Math.random() * 40;
        h.className = "burst";
        h.textContent = "♡";
        h.style.cssText = `left:${x}px;top:${y}px;font-size:${12 + Math.random() * 10}px;--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist}px`;
        document.body.appendChild(h);
        h.addEventListener("animationend", () => h.remove());
    }
}

/* ---------- Klik ---------- */
document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.hasAttribute("data-next")) {
        burst(e.clientX, e.clientY);
        go(current + 1);
    } else if (btn.hasAttribute("data-prev")) {
        go(current - 1);
    } else if (btn.hasAttribute("data-restart")) {
        burst(e.clientX, e.clientY);
        go(0);
    }
});

// Klik di area surat = lewati ketikan
stage.addEventListener("click", (e) => {
    if (current === 1 && !typeDone && !e.target.closest("button")) finishTyping();
});

/* ---------- Keyboard ---------- */
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        if (current === 1 && !typeDone) return finishTyping();
        go(current + 1);
    } else if (e.key === "ArrowLeft") {
        go(current - 1);
    }
});

/* ---------- Musik latar: coba autoplay, lalu mulai saat interaksi pertama jika diblokir ---------- */
function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
}

function playMusic(showError = false) {
    audio.play().then(() => {
        musicBtn.classList.add("on");
        musicBtn.setAttribute("aria-label", "Jeda musik");
    }).catch((err) => {
        musicBtn.classList.remove("on");
        if (showError) {
            console.warn("Musik gagal diputar:", err, audio.src);
            toast(audio.error ? "File musik tidak ditemukan atau formatnya tidak didukung" : "Browser memblokir autoplay. Tekan tombol musik untuk memulai.");
        }
    });
}

audio.addEventListener("play", () => musicBtn.classList.add("on"));
audio.addEventListener("pause", () => musicBtn.classList.remove("on"));
window.addEventListener("load", () => playMusic(false));
document.addEventListener("pointerdown", function startAfterGesture() {
    if (audio.paused) playMusic(false);
    document.removeEventListener("pointerdown", startAfterGesture);
}, { once: true });

musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) playMusic(true);
    else {
        audio.pause();
        musicBtn.classList.remove("on");
        musicBtn.setAttribute("aria-label", "Putar musik");
    }
});

/* ---------- Floating hearts & sparkles ---------- */
(function floaters() {
    if (reduceMotion) return;
    const box = document.getElementById("floaters");
    const symbols = ["♡", "♥", "✦", "·"];

    setInterval(() => {
        if (document.hidden) return;
        const f = document.createElement("span");
        f.className = "floater";
        f.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        f.style.left = Math.random() * 100 + "%";
        f.style.fontSize = 10 + Math.random() * 16 + "px";
        f.style.animationDuration = 9 + Math.random() * 8 + "s";
        f.style.setProperty("--sway", Math.random() * 60 - 30 + "px");
        box.appendChild(f);
        f.addEventListener("animationend", () => f.remove());
    }, 1400);
})();

/* ---------- Terapkan pengaturan dari config.js ---------- */
if (CONFIG.pageTitle) document.title = CONFIG.pageTitle;
Object.entries(CONFIG.theme || {}).forEach(([k, v]) => document.documentElement.style.setProperty("--" + k, v));
if (CONFIG.music && CONFIG.music.src) {
    let src = CONFIG.music.src;
    try { src = encodeURI(decodeURI(src)); } catch (e) { /* pakai apa adanya */ }
    audio.src = src;
}
if (CONFIG.music && CONFIG.music.enabled === false) musicBtn.hidden = true;
if (CONFIG.effects && CONFIG.effects.floaters === false) document.getElementById("floaters").hidden = true;

show(0);
