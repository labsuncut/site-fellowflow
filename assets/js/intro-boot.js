// FellowFlow opening, part one of two: this tiny file loads in <head> without defer, so the page can hold its
// first screen back before the first paint. The opening itself ("The Convergence", assets/js/convergence.js)
// loads deferred and never blocks rendering. Once per tab; a visitor who has seen it simply gets the page.
(function () {
  var seen = false; try { seen = sessionStorage.getItem("ff-intro") === "1"; } catch (e) {}
  if (seen || !window.requestAnimationFrame || !document.createElement("canvas").getContext) return;
  var root = document.documentElement;
  root.classList.add("intro");
  if (window.matchMedia("(max-width: 640px)").matches) root.classList.add("intro-mark");
})();
