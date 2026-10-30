// FellowFlow first screen: the lights of a city, each one a business, drift, then stream into the centre and
// settle into the shape of the mark. About three seconds, once per tab, beside the words and never over them.
// Pure canvas, no libraries. With Reduce Motion, or on a second visit in the same tab, the mark simply shows.
(function () {
  var art = document.getElementById("sky"), canvas = document.getElementById("form-canvas"), img = document.getElementById("hero-mark");
  if (!art || !canvas || !img) return;
  var T = { city: 600, flow: 1500, hold: 500 };
  var seen = false; try { seen = sessionStorage.getItem("ff-formed") === "1"; } catch (e) {}
  var started = false;
  function settle() { art.classList.add("formed"); try { sessionStorage.setItem("ff-formed", "1"); } catch (e) {} }
  // The faint city that stays around the mark: one still frame of scattered lights, drawn once.
  function city(ctx, W, H, dpr, keep) {
    ctx.globalCompositeOperation = "source-over"; ctx.clearRect(0, 0, W, H);
    var n = keep || Math.round(W * H / (dpr * dpr) / 2600);
    for (var i = 0; i < n; i++) {
      var s = (0.8 + Math.random() * 1.4) * dpr, a = .12 + Math.random() * .3;
      ctx.fillStyle = Math.random() < .4 ? "rgba(214,178,110," + a + ")" : "rgba(245,228,200," + a + ")";
      ctx.fillRect(Math.random() * W, Math.random() * H, s, s);
    }
  }
  function still() {
    var box = art.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (box.width && box.height) { canvas.width = Math.round(box.width * dpr); canvas.height = Math.round(box.height * dpr); city(canvas.getContext("2d"), canvas.width, canvas.height, dpr); }
    settle();
  }
  // Founders' rule (30 Oct 2026): the formation plays even with Reduce Motion on, once per tab.
  if (seen) { still(); return; }
  function ease(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function targets(rect, dpr, step) {
    var w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
    var off = document.createElement("canvas"); off.width = w; off.height = h;
    var c = off.getContext("2d"); c.drawImage(img, 0, 0, w, h);
    var data = c.getImageData(0, 0, w, h).data, pts = [];
    for (var y = 0; y < h; y += step) for (var x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 140) pts.push([rect.left * dpr + x + (Math.random() - .5) * step, rect.top * dpr + y + (Math.random() - .5) * step]);
    }
    for (var i = pts.length - 1; i > 0; i--) { var j = (Math.random() * (i + 1)) | 0; var t = pts[i]; pts[i] = pts[j]; pts[j] = t; }
    return pts;
  }
  function begin() {
    if (started) return; started = true;
    var box = art.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (!box.width || !box.height) { settle(); return; }
    var W = canvas.width = Math.round(box.width * dpr), H = canvas.height = Math.round(box.height * dpr);
    var ctx = canvas.getContext("2d");
    var r0 = img.getBoundingClientRect();
    var rect = { left: r0.left - box.left, top: r0.top - box.top, width: r0.width, height: r0.height };
    var pts;
    try { pts = targets(rect, dpr, 3); } catch (e) { settle(); return; }
    if (!pts.length) { settle(); return; }
    var N = Math.min(pts.length, box.width < 700 ? 1100 : 2200);
    var cx = (rect.left + rect.width / 2) * dpr, cy = (rect.top + rect.height / 2) * dpr;
    var P = [];
    for (var i = 0; i < N; i++) {
      var t = pts[i % pts.length];
      var sx = Math.random() * W, sy = Math.random() * H;
      var dx = t[0] - sx, dy = t[1] - sy, len = Math.sqrt(dx * dx + dy * dy) || 1;
      P.push({ sx: sx, sy: sy, tx: t[0], ty: t[1], nx: -dy / len, ny: dx / len,
        k: (Math.random() < .5 ? -1 : 1) * (30 + Math.random() * 120) * dpr * (len / (W * .6)),
        delay: Math.random() * .5, ph: Math.random() * Math.PI * 2, f: .8 + Math.random() * 1.6,
        s: (0.9 + Math.random() * 1.3) * dpr, gold: Math.random() < .4 });
    }
    var t0 = null, tCity = T.city, tFlow = tCity + T.flow, tEnd = tFlow + T.hold, settled = false;
    function frame(now) {
      if (t0 === null) t0 = now;
      var t = now - t0;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      var arrive = Math.min(1, Math.max(0, (t - tCity - 500) / 1400));
      if (arrive > 0) {
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rect.width * dpr * 1.4);
        g.addColorStop(0, "rgba(201,164,92," + (0.12 * arrive) + ")"); g.addColorStop(1, "rgba(201,164,92,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < N; i++) {
        var p = P[i], x, y, a;
        if (t <= tCity) {
          x = p.sx + Math.sin(t * .0007 + p.ph) * 2 * dpr; y = p.sy + Math.cos(t * .0005 + p.ph) * 2 * dpr;
          a = (.25 + .6 * Math.abs(Math.sin(t * .0012 * p.f + p.ph))) * Math.min(1, t / 400);
        } else {
          var e = Math.min(1, Math.max(0, (t - tCity - p.delay * T.flow) / (T.flow * (1 - p.delay))));
          var u = ease(e);
          x = p.sx + (p.tx - p.sx) * u + p.nx * p.k * Math.sin(Math.PI * u);
          y = p.sy + (p.ty - p.sy) * u + p.ny * p.k * Math.sin(Math.PI * u);
          a = .35 + .55 * u + (e >= 1 ? .1 * Math.sin(t * .004 + p.ph) : 0);
        }
        ctx.fillStyle = p.gold ? "rgba(214,178,110," + a + ")" : "rgba(245,228,200," + a + ")";
        ctx.fillRect(x - p.s / 2, y - p.s / 2, p.s, p.s);
      }
      if (t >= tFlow && !settled) { settled = true; settle(); }   // the real mark fades in over the lights
      if (t < tEnd + 900) requestAnimationFrame(frame);           // then the lights give way to a still, faint city
      else city(ctx, W, H, dpr);
    }
    requestAnimationFrame(frame);
  }
  if (img.decode) img.decode().then(begin, begin); else if (img.complete) begin(); else { img.onload = begin; img.onerror = begin; }
  setTimeout(function () { if (!started) still(); }, 2500);      // never leave the first screen empty
})();
