// FellowFlow opening scene: a city of small lights at night. They drift, then stream in curved
// rivers into the centre and settle into the shape of the mark. Pure canvas, no libraries.
window.FFIntro = (function () {
  var T = { city: 1200, flow: 2000, hold: 900, fade: 700 }; // phase lengths in ms

  function ease(x) { return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  // Read the mark's shape from its image: every opaque pixel (on a grid) becomes a place a light can settle.
  function targets(img, rect, dpr, step) {
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

  function start(canvas, img) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Size the drawing to the canvas's own box and pin that size, so a phone browser's toolbar
    // growing or shrinking can't stretch the picture away from where the real mark appears.
    var box = canvas.getBoundingClientRect();
    var W = canvas.width = Math.round(box.width * dpr), H = canvas.height = Math.round(box.height * dpr);
    canvas.style.width = box.width + "px"; canvas.style.height = box.height + "px"; canvas.style.bottom = "auto"; canvas.style.right = "auto";
    var ctx = canvas.getContext("2d");
    var anchor = img.parentNode, a0 = anchor.getBoundingClientRect();
    var r0 = img.getBoundingClientRect();
    var rect = { left: r0.left - box.left, top: r0.top - box.top, width: r0.width, height: r0.height };
    var small = box.width < 700;
    var pts = targets(img, rect, dpr, 3);
    var N = Math.min(pts.length, small ? 1500 : 2800);
    var cx = (rect.left + rect.width / 2) * dpr, cy = (rect.top + rect.height / 2) * dpr;
    var P = [];
    for (var i = 0; i < N; i++) {
      var t = pts[i % pts.length];
      // Lights start everywhere on the screen, a little denser toward the edges, like a city seen from above.
      var sx = Math.random() * W, sy = Math.random() * H;
      var dx = t[0] - sx, dy = t[1] - sy, len = Math.sqrt(dx * dx + dy * dy) || 1;
      P.push({
        sx: sx, sy: sy, tx: t[0], ty: t[1],
        nx: -dy / len, ny: dx / len,                       // sideways direction, for the curve of the path
        k: (Math.random() < .5 ? -1 : 1) * (40 + Math.random() * 150) * dpr * (len / (W * .6)),
        delay: Math.random() * .55,                        // the lights leave in waves, not all at once
        ph: Math.random() * Math.PI * 2, f: .8 + Math.random() * 1.6,
        s: (0.9 + Math.random() * 1.4) * dpr,
        gold: Math.random() < .35
      });
    }
    ctx.fillStyle = "#050C1A"; ctx.fillRect(0, 0, W, H);
    var t0 = null, raf = 0, stopped = false;
    var tCity = T.city, tFlow = tCity + T.flow, tHold = tFlow + T.hold, tEnd = tHold + T.fade;

    function frame(now) {
      if (stopped) return;
      if (t0 === null) t0 = now;
      var t = now - t0;
      // If the screen shifted since the start (a toolbar moved), follow the mark to where it is now.
      var a1 = anchor.getBoundingClientRect(), b1 = canvas.getBoundingClientRect();
      var ox = ((a1.left - b1.left) - (a0.left - box.left)) * dpr, oy = ((a1.top - b1.top) - (a0.top - box.top)) * dpr;
      var inFlow = t > tCity && t < tFlow;
      // A translucent wash of navy each frame leaves soft trails behind moving lights.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = inFlow ? "rgba(5,12,26,.22)" : "rgba(5,12,26,.45)";
      ctx.fillRect(0, 0, W, H);
      // A faint pool of light where the mark will form, growing as the lights arrive.
      var arrive = Math.min(1, Math.max(0, (t - tCity - 600) / 1800));
      if (arrive > 0) {
        var g = ctx.createRadialGradient(cx + ox, cy + oy, 0, cx + ox, cy + oy, rect.width * dpr * 1.6);
        g.addColorStop(0, "rgba(201,164,92," + (0.07 * arrive) + ")"); g.addColorStop(1, "rgba(201,164,92,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      ctx.globalCompositeOperation = "lighter";
      var fadeOut = t > tHold ? Math.min(1, (t - tHold) / T.fade) : 0;
      for (var i = 0; i < N; i++) {
        var p = P[i], x, y, a;
        if (t <= tCity) {
          // The city: lights twinkle and barely move.
          x = p.sx + Math.sin(t * .0007 + p.ph) * 2 * dpr; y = p.sy + Math.cos(t * .0005 + p.ph) * 2 * dpr;
          a = .25 + .6 * Math.abs(Math.sin(t * .0012 * p.f + p.ph));
          a *= Math.min(1, t / 500);
        } else {
          var e = Math.min(1, Math.max(0, (t - tCity - p.delay * T.flow) / (T.flow * (1 - p.delay))));
          var u = ease(e);
          x = p.sx + (p.tx + ox - p.sx) * u + p.nx * p.k * Math.sin(Math.PI * u);
          y = p.sy + (p.ty + oy - p.sy) * u + p.ny * p.k * Math.sin(Math.PI * u);
          // Brighter as they travel and settle; a gentle shimmer once in place.
          a = .35 + .55 * u + (e >= 1 ? .1 * Math.sin(t * .004 + p.ph) : 0);
          if (t > tFlow) { x += Math.sin(t * .003 + p.ph) * .4 * dpr; y += Math.cos(t * .0025 + p.ph) * .4 * dpr; }
        }
        a *= (1 - fadeOut);
        if (a <= 0) continue;
        ctx.fillStyle = p.gold ? "rgba(214,178,110," + a + ")" : "rgba(245,228,200," + a + ")";
        ctx.fillRect(x - p.s / 2, y - p.s / 2, p.s, p.s);
      }
      if (t < tEnd) raf = requestAnimationFrame(frame); else stopped = true;
    }
    raf = requestAnimationFrame(frame);
    return { stop: function () { stopped = true; cancelAnimationFrame(raf); }, total: tEnd };
  }
  return { start: start };
})();
