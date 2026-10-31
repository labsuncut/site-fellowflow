// FellowFlow: the Living Universe. One WebGL2 canvas behind the whole page, drawn by a single
// fragment shader (a ray-marched distance field; no libraries, no image files).
// The world is a colony of dormant cells. The first connection forms between two of them, then
// connections spread outward in a wave; teal light lives where cells have joined. The camera
// starts on the membrane of one cell and pulls back to the monumental colony as the page is read.
// The colony's layout is built once in JavaScript and handed to the shader as two small textures,
// so each ray step reads a few texels instead of recomputing noise.
// Public: window.FFWorld = { start(canvas, opts), setWake(0..1), setScroll(0..1), pointer(x,y,on), report() }.
(function () {
  "use strict";

  var S = 2;                       // lattice spacing (world units)
  var GX = 64, GY = 2, GZ = 64;    // cells: x,z in [-32, 31], y in {-1, 0}
  var HR = 0.62;                   // radius of the first cell, which sits at H = (1, 1, 1)

  var VS = "#version 300 es\nlayout(location=0) in vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";

  var FS = `#version 300 es
precision highp float;
precision highp sampler2D;
out vec4 o;
uniform vec2 uRes, uShift;
uniform float uTime, uWake, uDim, uSteps, uDetail, uPtr, uFov, uGrain, uDebug, uFog, uWarm;
uniform vec3 uCam, uPointer;
uniform mat3 uRot;
uniform sampler2D uA, uB;     // A: centre offset (xyz) and radius (w, 0 = no cell). B: neck factors +x +y +z, spare
const float S = 2.0;
const vec3 H = vec3(1.0);
const float TOP = 2.4;

float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
vec3 hash3(vec3 p){ return vec3(hash(p), hash(p + 31.17), hash(p + 77.71)); }
float vnoise(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x), mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x), mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z); }
float fbm(vec3 p){ return 0.5*vnoise(p) + 0.25*vnoise(p*2.03+1.7) + 0.125*vnoise(p*4.1+3.1); }

// one cell, read from the layout textures. Returns false when there is no cell at this id.
bool cell(vec3 id, out vec3 c, out float r, out vec3 nk){
  if (id.y < -1.5 || id.y > 0.5 || abs(id.x + 0.5) > 32.0 || abs(id.z + 0.5) > 32.0) return false;
  ivec2 t = ivec2(int(id.x) + 32, int(id.z) + 32 + 64 * (int(id.y) + 1));
  vec4 a = texelFetch(uA, t, 0);
  if (a.w < 0.002) return false;
  c = (id + 0.5 + (a.xyz - 0.5) * 0.7) * S;
  r = a.w * 0.8;
  nk = texelFetch(uB, t, 0).xyz;
  return true; }
// how awake the world is at a point: a wave from the first cell, plus the visitor's light
float alive(vec3 p){
  float R = uWake * 34.0 - 1.5;
  float a = smoothstep(R + 1.2, R - 2.4, length(p - H)) * smoothstep(0.0, 0.1, uWake);
  float pt = uPtr * smoothstep(3.4, 0.0, length(p - uPointer));
  return max(a, pt); }
float smin(float a, float b, float k){ if (a > 50.0) return b; if (b > 50.0) return a; float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0); return mix(b, a, h) - k*h*(1.0-h); }
float capsule(vec3 p, vec3 a, vec3 b, float r){ vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0); return length(pa - ba*h) - r * (0.78 + 0.5 * (h - 0.5) * (h - 0.5) * 4.0 * 0.5); }

// a neck from cell ia toward its neighbour ia+ax. It only exists where the wave has passed and grows
// outward from the first cell, so the far end appears last.
float neck(vec3 p, vec3 ia, vec3 ax, out float glow){
  glow = 0.0;
  vec3 ca, cb, na, nb; float ra, rb;
  if (!cell(ia, ca, ra, na)) return 1e9;
  float f = dot(na, ax);
  if (f < 0.02) return 1e9;
  if (!cell(ia + ax, cb, rb, nb)) return 1e9;
  float a = alive(0.5 * (ca + cb));
  if (a <= 0.001) return 1e9;
  float grow = smoothstep(0.0, 1.0, a);
  if (length(cb - H) < length(ca - H)) { vec3 tmp = ca; ca = cb; cb = tmp; }
  vec3 tip = ca + (cb - ca) * min(1.0, grow * 1.2);
  float r = 0.07 * S * f * (0.45 + 0.55 * grow);
  float d = capsule(p, ca, tip, r);
  glow = grow * smoothstep(0.3, 0.0, d);
  return d; }

float map(vec3 p, out float glow){
  glow = 0.0;
  float d = 1e9;
  vec3 base = floor(p / S - 0.5);
  vec3 c, nk; float r;
  for (int i = 0; i < 8; i++) {
    vec3 id = base + vec3(float(i & 1), float((i >> 1) & 1), float((i >> 2) & 1));
    if (cell(id, c, r, nk)) {
      float a = alive(c);
      vec3 q = p - c;
      // a lobed, slightly flattened body that swells a little when awake
      float sd = length(q * vec3(1.0, 1.15, 1.0)) - r * (1.0 + 0.05 * a);
      if (sd < 0.5) {
        float az = atan(q.z, q.x), lobes = 5.0 + 2.0 * step(0.5, fract(c.x * 0.37));
        sd -= r * 0.10 * (vnoise(q * 2.4 / r + c * 3.0) - 0.5);
        sd -= r * 0.035 * cos(az * lobes + c.z) * (1.0 - abs(q.y) / (r * 1.2));
      }
      d = smin(d, sd, 0.2 * S);
    }
  }
  // necks live between cells, so they are found from the block of neck midpoints around p (one block per axis)
  if (alive(p) > 0.001) {
    float g;
    vec3 bx = floor(p / S - vec3(1.0, 0.5, 0.5)), by = floor(p / S - vec3(0.5, 1.0, 0.5)), bz = floor(p / S - vec3(0.5, 0.5, 1.0));
    for (int i = 0; i < 8; i++) {
      vec3 off = vec3(float(i & 1), float((i >> 1) & 1), float((i >> 2) & 1));
      d = smin(d, neck(p, bx + off, vec3(1, 0, 0), g), 0.24 * S); glow = max(glow, g);
      d = smin(d, neck(p, by + off, vec3(0, 1, 0), g), 0.24 * S); glow = max(glow, g);
      d = smin(d, neck(p, bz + off, vec3(0, 0, 1), g), 0.24 * S); glow = max(glow, g);
    }
  }
  return d; }
float mapS(vec3 p){ float g; return map(p, g); }
float relief(vec3 p){ return fbm(p * 5.5) * 0.007 + vnoise(p * 23.0) * 0.002; }
vec3 normalAt(vec3 p){
  vec2 e = vec2(0.0025, 0.0);
  float dp = uDetail;
  return normalize(vec3(
    mapS(p + e.xyy) - mapS(p - e.xyy) + dp*(relief(p + e.xyy) - relief(p - e.xyy)),
    mapS(p + e.yxy) - mapS(p - e.yxy) + dp*(relief(p + e.yxy) - relief(p - e.yxy)),
    mapS(p + e.yyx) - mapS(p - e.yyx) + dp*(relief(p + e.yyx) - relief(p - e.yyx)))); }
float inner0(vec3 n, vec3 v){ return pow(max(dot(n, v), 0.0), 1.5); }
// pores: a cellular pattern on the membrane; dark dimples when dormant, lit from inside when awake
float pores(vec3 p, out float edge){
  vec3 q = p * 4.2; vec3 i = floor(q), f = fract(q); float m = 9.0, m2 = 9.0;
  for (int z=-1; z<=1; z++) for (int y=-1; y<=1; y++) for (int x=-1; x<=1; x++) {
    vec3 g = vec3(x,y,z); vec3 r = g + hash3(i+g) - f; float dd = dot(r,r); if (dd < m) { m2 = m; m = dd; } else if (dd < m2) m2 = dd; }
  edge = sqrt(m2) - sqrt(m);
  return sqrt(m); }

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  vec3 rd = normalize(uRot * vec3(uv - uShift, uFov));
  vec3 ro = uCam;
  float t = 0.0, g = 0.0, gAcc = 0.0, d = 0.0; int steps = int(uSteps); bool hit = false;
  for (int i = 0; i < 160; i++) {
    if (i >= steps) break;
    vec3 p = ro + rd * t;
    if ((p.y > TOP + 0.3 && rd.y > 0.0) || (p.y < -2.9 && rd.y < 0.0)) break;
    d = map(p, g);
    d = min(d, 0.5);                                    // only the nearest cells are known: never leap past another
    if (p.y > TOP + 0.3) d = max(d, (p.y - TOP) * 0.9);
    if (p.y < -2.9) d = max(d, (-2.7 - p.y) * 0.9);
    gAcc += g * 0.006 / (0.2 + d * d * 9.0);
    if (d < 0.0012 * (1.0 + t)) { hit = true; break; }
    t += d * 0.9;
    if (t > 110.0) break;
  }
  vec3 fogC = vec3(0.0025, 0.005, 0.016);
  vec3 gold = vec3(1.0, 0.72, 0.36);
  vec3 teal = vec3(0.12, 0.80, 0.78);
  vec3 L1 = normalize(vec3(0.5, 0.8, 0.3));
  vec3 L2 = normalize(vec3(-0.6, -0.5, 0.2));
  // the sky: near-black above, a faint warm breath where the key light sits, deep navy below
  vec3 col = fogC * (0.3 + 0.7 * smoothstep(0.9, -0.6, rd.y));
  col += gold * 0.035 * uWarm * pow(max(dot(rd, L1), 0.0), 5.0);
  if (uDebug > 0.5) { o = vec4(hit ? vec3(t / 30.0, 1.0, 0.0) : rd * 0.5 + 0.5, 1.0); return; }
  if (hit) {
    vec3 p = ro + rd * t;
    vec3 n = normalAt(p);
    vec3 v = -rd;
    float a = alive(p);
    float gl; map(p, gl);
    float dif = max(dot(n, L1), 0.0);
    float fill = max(dot(n, L2), 0.0);
    vec3 hv = normalize(L1 + v);
    float ndh = max(dot(n, hv), 0.0);
    float spec = pow(ndh, 420.0) * 0.9 + pow(ndh, 22.0) * 0.12;
    float fres = pow(1.0 - max(dot(n, v), 0.0), 3.5);
    float ao = clamp(mapS(p + n * 0.22) / 0.22, 0.0, 1.0) * 0.65 + 0.35;
    float pr2; float pr = pores(p, pr2);
    float pore = smoothstep(0.22, 0.05, pr);
    float sp2; float spark = smoothstep(0.07, 0.0, pores(p * 1.3 + 11.0, sp2)) * step(0.45, hash(floor(p * 5.5 + 2.0)));
    // lacquered navy membrane with a faint warm mottle; pores are dimples
    vec3 albedo = vec3(0.040, 0.034, 0.036);
    albedo = mix(albedo, vec3(0.07, 0.052, 0.034), 0.3 * fbm(p * 2.2));
    albedo *= 1.0 - 0.3 * pore;
    col = albedo * (0.04 + 0.7 * dif * ao) * vec3(1.0, 0.82, 0.58);
    col += vec3(0.02, 0.04, 0.10) * (0.35 + fill) * 0.5 * ao;
    // lacquer: the dark sky and the warm key light mirrored in the membrane, strongest at the rim
    vec3 refl = reflect(-v, n);
    vec3 env = mix(fogC * 0.6, gold * 0.09, smoothstep(0.45, -0.25, refl.y)) + gold * 0.25 * pow(max(dot(refl, L1), 0.0), 12.0);
    col += env * (0.08 + 0.92 * fres) * ao;
    col += gold * spec * 0.6 * ao * (1.0 - 0.8 * pore);
    col += gold * fres * 0.30 * (0.25 + 0.75 * dif);
    // dormant embers on the membrane, teal once awake
    col += mix(gold * 0.5, teal * 0.7, a) * spark * (0.4 + 0.6 * inner0(n, v));
    // once awake: the pores glow from inside, strongest facing the viewer, and the rim warms
    float inner = pow(max(dot(n, v), 0.0), 1.5);
    float nucleus = pow(max(dot(n, v), 0.0), 9.0);
    float vein = smoothstep(0.05, 0.0, pr2) * (1.0 - pore);
    float far = exp(-t * 0.05);
    col += mix(gold * 0.06, teal * 0.6, a) * nucleus * (0.6 + 0.4 * ao) * (0.4 + 0.6 * far);
    col += teal * vein * a * 0.3 * inner * far;
    col += teal * pore * a * (0.3 + 0.7 * inner) * 0.26;
    col += teal * 0.02 * a * inner;
    col += gold * fres * a * 0.10;
    // the necks carry a thin luminous core, seen through the membrane
    col += teal * gl * gl * inner * inner * 0.3;
    col = mix(col, fogC, 1.0 - exp(-t * uFog));
  }
  col += teal * min(gAcc, 0.4) * 0.25;
  col *= 1.0 - 0.5 * dot(uv, uv);
  col *= uDim;
  float grain = (hash(vec3(gl_FragCoord.xy, fract(uTime) * 61.0)) - 0.5) * uGrain;
  col = 1.0 - exp(-max(col, 0.0) * 1.7);                   // soft shoulder, deep floor
  col = pow(col, vec3(1.0 / 2.2)) + grain;
  o = vec4(col, 1.0); }`;

  // ---- the colony, built once ----
  function fract(x) { return x - Math.floor(x); }
  function hash(x, y, z) { var px = fract(x * 0.3183099 + 0.1) * 17, py = fract(y * 0.3183099 + 0.1) * 17, pz = fract(z * 0.3183099 + 0.1) * 17; return fract(px * py * pz * (px + py + pz)); }
  function vnoise(x, y, z) {
    var ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z), fx = x - ix, fy = y - iy, fz = z - iz;
    fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy); fz = fz * fz * (3 - 2 * fz);
    function h(a, b, c) { return hash(ix + a, iy + b, iz + c); }
    function l(a, b, t) { return a + (b - a) * t; }
    return l(l(l(h(0, 0, 0), h(1, 0, 0), fx), l(h(0, 1, 0), h(1, 1, 0), fx), fy), l(l(h(0, 0, 1), h(1, 0, 1), fx), l(h(0, 1, 1), h(1, 1, 1), fx), fy), fz);
  }
  var layout = null;   // { A, B, cells: [{id, c, r}], N }
  function buildColony() {
    var A = new Uint8Array(GX * GY * GZ * 4), B = new Uint8Array(GX * GY * GZ * 4), cells = [];
    function idx(ix, iy, iz) { return ((iz + 32 + 64 * (iy + 1)) * 64 + (ix + 32)) * 4; }
    for (var iy = -1; iy <= 0; iy++) for (var iz = -32; iz <= 31; iz++) for (var ix = -32; ix <= 31; ix++) {
      var cx = (ix + 0.5) * S, cy = (iy + 0.5) * S, cz = (iz + 0.5) * S;
      var hero = ix === 0 && iy === 0 && iz === 0, nb = ix === 1 && iy === 0 && iz === 0;
      var on;
      if (hero || nb) on = true;
      else if (Math.hypot(cx - 1, cy - 1, cz - 1) < 3.2) on = false;                       // the first pair stands alone
      else {
        var n = vnoise(cx * 0.11 + 7, cy * 0.11 + 7, cz * 0.11 + 7) * 0.8 + vnoise(cx * 0.31 + 3, cy * 0.31, cz * 0.31) * 0.2;
        var far = Math.hypot(cx - 1, cz - 1);
        var keep = n - 0.06 - Math.max(0, Math.min(1, (far - 14) / 34)) * 0.55 - (iy === -1 ? 0.12 : 0);
        on = hash(ix + 3.31, iy + 3.31, iz + 3.31) < keep;
      }
      if (!on) continue;
      var o = idx(ix, iy, iz);
      var ox = hero ? 0.5 : hash(ix, iy, iz), oy = hero ? 0.5 : hash(ix + 31.17, iy + 31.17, iz + 31.17), oz = hero ? 0.5 : hash(ix + 77.71, iy + 77.71, iz + 77.71);
      var hr = hash(ix + 9.9, iy + 9.9, iz + 9.9);
      var r = hero ? HR : S * (0.13 + 0.17 * hr * hr + (hash(ix + 5.5, iy + 5.5, iz + 5.5) > 0.92 ? 0.07 : 0));
      if (nb) { ox = 0.5 + (ox - 0.5) * 0.5; oy = 0.5; oz = 0.5 + (oz - 0.5) * 0.5; r = Math.max(r, 0.46); }
      A[o] = Math.round(ox * 255); A[o + 1] = Math.round(oy * 255); A[o + 2] = Math.round(oz * 255); A[o + 3] = Math.round(Math.min(1, r / 0.8) * 255);
      // necks toward +x, +y, +z: most pairs join, with varied thickness; the first pair always joins fully
      for (var ax = 0; ax < 3; ax++) {
        var hv = hash(ix + 13.1 * (ax + 1), iy + 2.3 * ax, iz + 41.7);
        var f = hv < 0.22 ? 0 : 0.55 + 0.45 * hash(ix + 1.1, iy + ax, iz + 9.3);
        if (hero && ax === 0) f = 1;
        if (hero && ax !== 0) f = 0;
        if (ax === 1 && hash(ix + 0.7, iy, iz + 0.2) < 0.45) f = 0;                    // fewer vertical necks
        B[o + ax] = Math.round(f * 255);
      }
      cells.push({ id: [ix, iy, iz], c: [(ix + 0.5 + (ox - 0.5) * 0.7) * S, (iy + 0.5 + (oy - 0.5) * 0.7) * S, (iz + 0.5 + (oz - 0.5) * 0.7) * S], r: r, o: o, nb: nb, hero: hero });
    }
    var N = cells.filter(function (c) { return c.nb; })[0].c;
    return { A: A, B: B, cells: cells, N: N };
  }
  // cells that would sit in the camera's way are removed from the layout (never the first pair)
  function clearPath(lay, sampler) {
    for (var t = -0.3; t <= 2.05; t += 0.02) {
      var pos = sampler(t);
      lay.cells.forEach(function (c) {
        if (c.hero || c.nb) return;
        if (Math.hypot(pos[0] - c.c[0], pos[1] - c.c[1], pos[2] - c.c[2]) < c.r + 0.75) { lay.A[c.o + 3] = 0; c.r = 0; }
      });
    }
  }

  var state = { wake: 0, scroll: 0, tier: "A", frames: 0, times: [], first: 0, paused: false, still: false, rate: 1, dirty: true, tick: 0, clock: 0, last: 0 };
  var gl, prog, canvas, uni = {}, raf, start = 0, pointer = { x: 0.5, y: 0.5, on: 0, want: 0, world: [1, 1, 1] }, scale = 1, steps = 80, visible = true;
  var cam = { pos: [0, 0, 0], rot: null, fov: 1.1, dim: 1, fog: 0.05 };

  function compile(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function pickTier() {
    var small = Math.min(innerWidth, innerHeight) < 700, coarse = matchMedia("(pointer: coarse)").matches;
    var mem = navigator.deviceMemory || 8, cores = navigator.hardwareConcurrency || 8;
    if (small || coarse || mem <= 4 || cores <= 4) return "B";
    return "A";
  }
  function applyTier(t) {
    state.tier = t;
    if (t === "A") { scale = Math.min(devicePixelRatio, 2) * 0.66; steps = 80; }
    else { scale = Math.min(devicePixelRatio, 2) * 0.46; steps = 56; }
  }
  function resize() {
    var w = Math.max(1, Math.round(canvas.clientWidth * scale)), h = Math.max(1, Math.round(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  }
  // ---- camera ----
  function ease(x) { return x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
  function mix(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
  function norm(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function lookAt(pos, target, roll) {
    var f = norm(sub(target, pos)), u = [Math.sin(roll), Math.cos(roll), 0];
    var r = norm(cross(f, u)), up = cross(r, f);
    return new Float32Array([r[0], r[1], r[2], up[0], up[1], up[2], f[0], f[1], f[2]]);
  }
  // Keyframes in a frame built on the first cell H and its neighbour N: e1 along the bond, up, e3 sideways.
  // Catmull-Rom between them, so the camera never stops or kinks. Wake 0..1 drives the opening; scroll
  // continues the same path further back and lowers the gaze, so the world recedes behind the page.
  var KEYS = null;
  function frameOf() {
    var H = [1, 1, 1], N = layout.N;
    var e1 = norm(sub(N, H)), up = norm(sub([0, 1, 0], mul(e1, e1[1]))), e3 = cross(e1, up);
    var mid = mix(H, N, 0.5);
    function at(o, a, b, c) { return add(add(add(o, mul(e1, a)), mul(up, b)), mul(e3, c)); }
    return { H: H, N: N, mid: mid, keys: [
      // t,  position (along the bond, up, sideways),  target,  fov
      [-0.30, at(H, -1.0, HR + 0.46, 0.55), at(H, 0.5, HR * 0.9, 0.0), 1.05],
      [0.00, at(H, -0.7, HR + 0.3, 0.34), at(H, 1.3, HR * 0.55, -0.1), 1.05],
      [0.32, at(H, -0.5, 2.3, 2.3), at(mid, 0, 0.0, 0), 1.12],
      [0.62, at(mid, -1.0, 4.4, 6.4), at(mid, 0.3, -0.3, 0), 1.15],
      [1.00, at(mid, 3.0, 6.5, 19.0), at(mid, 3.0, -0.8, -2.0), 1.2],
      [1.60, at(mid, 6.0, 13.0, 30.0), at(mid, 4.0, -3.0, -3.0), 1.2],
      [2.10, at(mid, 9.0, 20.0, 40.0), at(mid, 4.0, -5.0, -4.0), 1.2]
    ] };
  }
  function spline(keys, t, idx) {
    var n = keys.length, i = 0;
    while (i < n - 2 && t > keys[i + 1][0]) i++;
    var k0 = keys[Math.max(i - 1, 0)], k1 = keys[i], k2 = keys[i + 1], k3 = keys[Math.min(i + 2, n - 1)];
    var u = Math.max(0, Math.min(1, (t - k1[0]) / (k2[0] - k1[0])));
    function cr(p0, p1, p2, p3) { return 0.5 * ((2 * p1) + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u); }
    if (idx === 3) return cr(k0[3], k1[3], k2[3], k3[3]);
    return [cr(k0[idx][0], k1[idx][0], k2[idx][0], k3[idx][0]), cr(k0[idx][1], k1[idx][1], k2[idx][1], k3[idx][1]), cr(k0[idx][2], k1[idx][2], k2[idx][2], k3[idx][2])];
  }
  function pathT(w, s) { return w + ease(s) * 1.05; }
  function camera(w, s, time) {
    var t = pathT(w, s);
    var pos = spline(KEYS.keys, t, 1), tgt = spline(KEYS.keys, t, 2), fov = spline(KEYS.keys, t, 3);
    // a slow breath so the picture is never frozen
    pos = add(pos, [0.04 * Math.sin(time * 0.13), 0.03 * Math.sin(time * 0.09 + 1), 0.04 * Math.cos(time * 0.11)]);
    var roll = 0.01 * Math.sin(time * 0.05);
    cam.pos = pos; cam.rot = lookAt(pos, tgt, roll);
    cam.fov = fov * (canvas.clientWidth < canvas.clientHeight ? 0.78 : 1.0);
    cam.dim = 1.0 - 0.62 * ease((s - 0.05) / 0.5);
    cam.fog = lerp(0.3, 0.04, ease(t / 1.0));
    // once the whole is in view, the picture slides aside so the headline keeps dark sky behind it
    var k = ease((w - 0.45) / 0.5) * (1 - ease((s - 0.3) / 0.6));
    cam.shift = canvas.clientWidth < canvas.clientHeight ? [0, -0.2 * k] : [0.2 * k, 0.04 * k];
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!visible) return;
    if (!start) start = now;
    // the world's own clock stops while paused or still (Reduce Motion); scroll and pointer still redraw it
    if (!state.paused && !state.still) state.clock += Math.min(0.1, (now - (state.last || now)) / 1000);
    state.last = now;
    state.tick++;
    if (state.rate > 1 && state.tick % state.rate) return;
    if ((state.paused || state.still) && !state.dirty) return;
    state.dirty = false;
    var time = state.clock;
    resize();
    camera(state.wake, state.scroll, time);
    if (api.override) { cam.pos = api.override.pos; cam.rot = lookAt(api.override.pos, api.override.target, 0); cam.fov = api.override.fov || 1.1; cam.dim = 1; }
    // the visitor's light: a point along their ray, as deep as the first cell
    var r = cam.rot, ux = (pointer.x - 0.5) * canvas.clientWidth / canvas.clientHeight, uy = (0.5 - pointer.y);
    var dx = r[0] * ux + r[3] * uy + r[6] * cam.fov, dy = r[1] * ux + r[4] * uy + r[7] * cam.fov, dz = r[2] * ux + r[5] * uy + r[8] * cam.fov, dl = Math.hypot(dx, dy, dz);
    var depth = Math.hypot(cam.pos[0] - 1, cam.pos[1] - 1, cam.pos[2] - 1);
    pointer.world = [cam.pos[0] + dx / dl * depth, cam.pos[1] + dy / dl * depth, cam.pos[2] + dz / dl * depth];
    pointer.on += (pointer.want - pointer.on) * 0.08;
    if (Math.abs(pointer.want - pointer.on) > 0.01) state.dirty = true;

    gl.uniform2f(uni.uRes, canvas.width, canvas.height);
    gl.uniform1f(uni.uTime, time);
    gl.uniform1f(uni.uWake, state.wake);
    gl.uniform1f(uni.uDim, cam.dim);
    gl.uniform1f(uni.uSteps, steps);
    gl.uniform1f(uni.uDetail, state.tier === "A" ? 1 : 0.6);
    gl.uniform1f(uni.uPtr, pointer.on);
    gl.uniform1f(uni.uFov, cam.fov);
    gl.uniform1f(uni.uGrain, 0.03);
    gl.uniform1f(uni.uDebug, api.debug || 0);
    gl.uniform1f(uni.uFog, cam.fog);
    gl.uniform1f(uni.uWarm, 1);
    gl.uniform2f(uni.uShift, cam.shift ? cam.shift[0] : 0, cam.shift ? cam.shift[1] : 0);
    gl.uniform3f(uni.uCam, cam.pos[0], cam.pos[1], cam.pos[2]);
    gl.uniform3f(uni.uPointer, pointer.world[0], pointer.world[1], pointer.world[2]);
    gl.uniformMatrix3fv(uni.uRot, false, cam.rot);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    state.frames++;
    if (state.frames === 1) { state.first = performance.now(); canvas.dispatchEvent(new Event("ffworld-first")); }
    if (state.times.length < 4000) state.times.push(now);
    // adaptive: if the first seconds ran slowly, step down once
    if (state.tier === "A" && state.frames === 120 && !api.lockTier) {
      var span = state.times[119] - state.times[60];
      if (span / 59 > 24) applyTier("B");
    }
  }
  function texture(unit, data) {
    var tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, GX, GY * GZ, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }

  var api = {
    start: function (c, opts) {
      canvas = c; opts = opts || {};
      gl = c.getContext("webgl2", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance", preserveDrawingBuffer: !!opts.preserve });
      if (!gl) return false;
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      gl.useProgram(prog);
      var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      ["uRes", "uTime", "uWake", "uDim", "uSteps", "uDetail", "uPtr", "uFov", "uGrain", "uDebug", "uFog", "uWarm", "uShift", "uCam", "uPointer", "uRot", "uA", "uB"].forEach(function (n) { uni[n] = gl.getUniformLocation(prog, n); });
      layout = buildColony();
      KEYS = frameOf();
      clearPath(layout, function (t) { return spline(KEYS.keys, t, 1); });
      texture(0, layout.A); texture(1, layout.B);
      gl.uniform1i(uni.uA, 0); gl.uniform1i(uni.uB, 1);
      applyTier(opts.tier || pickTier());
      if (opts.scale) scale = opts.scale;
      if (opts.steps) steps = opts.steps;
      if (opts.tier) api.lockTier = true;
      document.addEventListener("visibilitychange", function () { visible = document.visibilityState === "visible"; state.last = 0; });
      window.addEventListener("resize", function () { state.dirty = true; });
      raf = requestAnimationFrame(frame);
      return true;
    },
    setWake: function (w) { w = Math.max(0, Math.min(1, w)); if (w !== state.wake) state.dirty = true; state.wake = w; },
    setScroll: function (s) { s = Math.max(0, Math.min(1, s)); if (s !== state.scroll) state.dirty = true; state.scroll = s; },
    pointer: function (x, y, on) { pointer.x = x; pointer.y = y; pointer.want = on ? 1 : 0; state.dirty = true; },
    pause: function (on) { state.paused = !!on; state.dirty = true; },
    still: function (on) { state.still = !!on; state.dirty = true; },
    rate: function (r) { state.rate = r; },
    state: state,
    report: function () {
      var t = state.times, dts = [];
      for (var i = 1; i < t.length; i++) dts.push(t[i] - t[i - 1]);
      dts.sort(function (a, b) { return a - b; });
      var avg = dts.reduce(function (a, b) { return a + b; }, 0) / (dts.length || 1);
      return { tier: state.tier, frames: state.frames, avgMs: +avg.toFixed(1), fps: +(1000 / avg).toFixed(1), low1: dts.length ? +dts[Math.floor(dts.length * 0.99)].toFixed(1) : 0, spikes: dts.filter(function (x) { return x > 50; }).length, canvas: canvas.width + "x" + canvas.height, cells: layout ? layout.cells.filter(function (c) { return c.r > 0; }).length : 0 };
    }
  };
  window.FFWorld = api;
})();
