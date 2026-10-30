// FellowFlow opening, part one of two: this tiny file loads in <head> without defer, so the first screen's words
// can wait for the opening before the first paint. The opening itself ("The Convergence", convergence.js) loads
// deferred and never blocks rendering. The hold is written here as well as in site.css, so it does not depend on
// the stylesheet arriving first: the page never shows its words and then takes them back. Once per tab.
(function () {
  document.documentElement.classList.add("js");   // before the first paint, so nothing reveals and then hides (the sheets used to peek in at the fold)
  var seen = false; try { seen = sessionStorage.getItem("ff-intro") === "1"; } catch (e) {}
  if (seen || !window.requestAnimationFrame || !window.Worker || !document.createElement("canvas").getContext) return;
  document.documentElement.classList.add("intro");
  var st = document.createElement("style");
  st.textContent = "html.intro .hero .reveal,html.intro .words .w,html.intro .hero-art{opacity:0!important;transform:translateY(24px);transition:none!important}html.intro .words .w{transform:translateY(.5em)}";
  document.head.appendChild(st);
})();
