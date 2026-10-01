const menu = document.querySelector(".menu"),
  nav = document.querySelector("nav");
menu.onclick = () => nav.classList.toggle("open");
document
  .querySelectorAll("nav a")
  .forEach((a) => (a.onclick = () => nav.classList.remove("open")));

const filters = document.querySelectorAll(".filters button"),
  cards = document.querySelectorAll(".work-grid article");
filters.forEach(
  (f) =>
    (f.onclick = () => {
      filters.forEach((x) => x.classList.remove("active"));
      f.classList.add("active");
      cards.forEach((c) =>
        c.classList.toggle(
          "hide",
          f.dataset.filter !== "all" && c.dataset.type !== f.dataset.filter,
        ),
      );
    }),
);

const range = document.querySelector(".compare input"),
  after = document.querySelector(".after");
if (range && after)
  range.oninput = () => (after.style.width = range.value + "%");

const modal = document.querySelector("#modal");
if (document.querySelector("#play"))
  document.querySelector("#play").onclick = () => modal.classList.add("open");
if (document.querySelector(".modal button"))
  document.querySelector(".modal button").onclick = () =>
    modal.classList.remove("open");
if (modal)
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("open");
  };
document.onkeydown = (e) => {
  if (e.key === "Escape" && modal) modal.classList.remove("open");
};

// Google Apps Script Web App URL. Replace this after deploying Code.gs.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/1JaEAV57Q-pYkApUKBHuOrduCjR_Aj_M7PV9qbEEBwmjBLpkK2ldIUp4P/exec";

const form = document.querySelector("#form");
if (form) {
  form.onsubmit = async (e) => {
    e.preventDefault();
    const msg = document.querySelector("#msg");
    const button = form.querySelector('button[type="submit"]');
    const data = new URLSearchParams(new FormData(form));
    msg.textContent = "Sending...";
    button.disabled = true;
    try {
      if (GOOGLE_SCRIPT_URL.includes("1JaEAV57Q-pYkApUKBHuOrduCjR_Aj_M7PV9qbEEBwmjBLpkK2ldIUp4P"))
        throw new Error("Google Script URL not configured");
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
        mode: "no-cors",
      });
      msg.textContent = "Thank you! Your inquiry has been received.";
      form.reset();
    } catch (err) {
      console.error(err);
      msg.textContent =
        "Unable to submit right now. Please try WhatsApp or email.";
    } finally {
      button.disabled = false;
    }
  };
}

document.querySelector("#year").textContent = new Date().getFullYear();
