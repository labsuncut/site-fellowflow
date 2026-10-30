// FellowFlow first screen: behind the mark, one still frame of a city at night, each light a business.
// The opening (assets/js/intro.js) hands over to it; without the opening, it simply shows.
(function () {
  var art = document.getElementById("sky"), canvas = document.getElementById("form-canvas");
  if (!art || !canvas) return;
  var drawn = false;
  function city() {
    if (drawn) return; drawn = true;
    var box = art.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!box.width || !box.height) return;
    var W = canvas.width = Math.round(box.width * dpr), H = canvas.height = Math.round(box.height * dpr), ctx = canvas.getContext("2d");
    var n = Math.round(W * H / (dpr * dpr) / 2600);
    for (var i = 0; i < n; i++) {
      var s = (0.8 + Math.random() * 1.4) * dpr, a = .12 + Math.random() * .3;
      ctx.fillStyle = Math.random() < .4 ? "rgba(214,178,110," + a + ")" : "rgba(245,228,200," + a + ")";
      ctx.fillRect(Math.random() * W, Math.random() * H, s, s);
    }
  }
  function settle() { art.classList.add("formed"); }
  if (document.documentElement.classList.contains("intro")) {
    document.addEventListener("ff-intro-hand", city);
    document.addEventListener("ff-intro-end", settle);
    setTimeout(function () { city(); settle(); }, 6000);   // never leave the first screen empty
  } else { city(); settle(); }
})();
