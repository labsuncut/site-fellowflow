// FellowFlow opening, the quiet half: the sums that would otherwise stall a frame run here, off the main thread.
//  "flood": ink distance along one piece of the mark (a flood from the tip, so the ink flows along the stroke)
//  "grow":  the growth of the currents: branches reach for points of light placed around the mark, never inside it
//           (space colonisation; the points are placed by design, so every branch serves the final shape)
self.onmessage = function (e) {
  var m = e.data;
  if (m.kind === "flood") self.postMessage({ kind: "flood", idx: m.idx, dist: flood(m.alpha, m.w, m.h, m.ex, m.ey) }, [m.alpha.buffer]);
  else if (m.kind === "grow") self.postMessage({ kind: "grow", tag: m.tag, nodes: grow(m) });
};

function flood(alpha, w, h, ex, ey) {
  var n = w * h, dist = new Int32Array(n), i, x, y, best = -1, bd = 1e9;
  for (i = 0; i < n; i++) dist[i] = -1;
  for (y = Math.max(0, ey - 24); y < Math.min(h, ey + 24); y++) for (x = Math.max(0, ex - 24); x < Math.min(w, ex + 24); x++) {
    i = y * w + x; if (alpha[i] > 128) { var d2 = (x - ex) * (x - ex) + (y - ey) * (y - ey); if (d2 < bd) { bd = d2; best = i; } }
  }
  var Q = [[], [], [], [], []], d = 0, maxD = 0, pending = 1;
  Q[0].push(best);
  while (pending) {
    var b = Q[d % 5];
    for (var k = 0; k < b.length; k++) {
      i = b[k]; pending--;
      if (dist[i] !== -1) continue;
      dist[i] = d; maxD = d;
      x = i % w; y = (i - x) / w;
      var l = x > 0, r = x < w - 1, u = y > 0, dn = y < h - 1, j;
      j = i - 1;     if (l && dist[j] === -1 && alpha[j] > 40) { Q[(d + 3) % 5].push(j); pending++; }
      j = i + 1;     if (r && dist[j] === -1 && alpha[j] > 40) { Q[(d + 3) % 5].push(j); pending++; }
      j = i - w;     if (u && dist[j] === -1 && alpha[j] > 40) { Q[(d + 3) % 5].push(j); pending++; }
      j = i + w;     if (dn && dist[j] === -1 && alpha[j] > 40) { Q[(d + 3) % 5].push(j); pending++; }
      j = i - w - 1; if (l && u && dist[j] === -1 && alpha[j] > 40) { Q[(d + 4) % 5].push(j); pending++; }
      j = i - w + 1; if (r && u && dist[j] === -1 && alpha[j] > 40) { Q[(d + 4) % 5].push(j); pending++; }
      j = i + w - 1; if (l && dn && dist[j] === -1 && alpha[j] > 40) { Q[(d + 4) % 5].push(j); pending++; }
      j = i + w + 1; if (r && dn && dist[j] === -1 && alpha[j] > 40) { Q[(d + 4) % 5].push(j); pending++; }
    }
    b.length = 0; d++;
  }
  var f = new Float32Array(n);
  for (i = 0; i < n; i++) f[i] = dist[i] < 0 ? (alpha[i] > 8 ? 1 : -1) : dist[i] / maxD;
  return f;
}

// m.roots: [x, y, t, stem] the points the currents already own (trunk samples with the time each appears)
// m.pts: [x, y] the points of light; m.step, m.reach, m.kill in px; m.dt ms per step of growth
// returns a flat Float32Array of nodes: x, y, parent index (-1 for a root), time, stem, depth
function grow(m) {
  var nodes = [], pts = m.pts, P = pts.length, step = m.step, reach = m.reach, kill = m.kill, dt = m.dt, r2 = reach * reach, k2 = kill * kill;
  var cell = reach, grid = {}, best = new Int32Array(P), bd = new Float64Array(P), used = new Uint8Array(P), alive = P, i, k;
  for (i = 0; i < P; i++) { best[i] = -1; bd[i] = r2; var kk = ((pts[i][0] / cell) | 0) + "," + ((pts[i][1] / cell) | 0); (grid[kk] || (grid[kk] = [])).push(i); }
  function add(x, y, parent, t, stem, depth, dx, dy) {
    var id = nodes.length; nodes.push({ x: x, y: y, p: parent, t: t, s: stem, d: depth, kids: 0, dx: dx, dy: dy });
    var cx = (x / cell) | 0, cy = (y / cell) | 0;
    for (var gx = cx - 1; gx <= cx + 1; gx++) for (var gy = cy - 1; gy <= cy + 1; gy++) {
      var b = grid[gx + "," + gy]; if (!b) continue;
      for (var j = 0; j < b.length; j++) {
        var a = b[j]; if (used[a]) continue;
        var dx = pts[a][0] - x, dy = pts[a][1] - y, d2 = dx * dx + dy * dy;
        if (d2 < k2) { used[a] = 1; alive--; continue; }
        if (d2 < bd[a]) { bd[a] = d2; best[a] = id; }
      }
    }
    return id;
  }
  for (i = 0; i < m.roots.length; i++) {
    var rx = m.roots[i][0], ry = m.roots[i][1], ddx = m.cx - rx, ddy = m.cy - ry, dl0 = Math.hypot(ddx, ddy) || 1;
    add(rx, ry, -1, m.roots[i][2], m.roots[i][3], 0, ddx / dl0, ddy / dl0);
  }
  var inertia = m.inertia || 0;
  var rounds = 0;
  while (alive > 0 && rounds++ < 500) {
    var pull = {}, found = false;
    for (i = 0; i < P; i++) {
      if (used[i] || best[i] < 0) continue;
      var nd = nodes[best[i]], dl = Math.sqrt(bd[i]) || 1;
      var q = pull[best[i]] || (pull[best[i]] = [0, 0]); q[0] += (pts[i][0] - nd.x) / dl; q[1] += (pts[i][1] - nd.y) / dl; found = true;
    }
    if (!found) break;
    var grew = false;
    for (var id in pull) {
      var n = nodes[id], q2 = pull[id], L = Math.hypot(q2[0], q2[1]);
      if (L < 1e-6) { // opposing pulls cancel: nudge sideways so the branch still moves
        q2[0] = 1; q2[1] = 0; L = 1;
      }
      if (n.kids >= 2 && n.p !== -1) continue;
      n.kids++; grew = true;
      var depth = n.p === -1 ? 1 : (n.kids > 1 ? n.d + 1 : n.d), ux = q2[0] / L, uy = q2[1] / L;
      if (n.kids === 1 && inertia) { ux += n.dx * inertia; uy += n.dy * inertia; }            // a branch keeps its momentum: curves, not spokes
      var wob = m.wobble ? Math.sin(nodes.length * .61 + n.s * 2.3) * m.wobble : 0, cs = Math.cos(wob), sn = Math.sin(wob);
      var vx = ux * cs - uy * sn, vy = ux * sn + uy * cs, vl = Math.hypot(vx, vy) || 1; vx /= vl; vy /= vl;
      add(n.x + vx * step, n.y + vy * step, +id, n.t + dt, n.s, depth, vx, vy);
    }
    if (!grew) break;
  }
  var out = new Float32Array(nodes.length * 6);
  for (i = 0; i < nodes.length; i++) { var o = nodes[i]; out[i * 6] = o.x; out[i * 6 + 1] = o.y; out[i * 6 + 2] = o.p; out[i * 6 + 3] = o.t; out[i * 6 + 4] = o.s; out[i * 6 + 5] = o.d; }
  return out;
}
