// FellowFlow opening, "The Convergence", version three (30 Oct 2026). Version two is kept beside it as
// convergence-v2.js, version one as intro.js; neither is loaded.
//
// Growth creates possibility. Synergy creates transformation. Flow brings everything into harmony.
//
// The opening happens on the first screen itself, in the place the mark will live; nothing is covered and
// nothing is cut. Three gold currents come in from three edges and settle as three arcs of one rim, a shape
// none of them could close alone. From the rim, each grows inward: branches, finer branches, a venation
// reaching for points of light placed around the mark and never inside it. Each current pulses to its own
// rhythm; as they grow into one another the rhythms fall into step, and one pulse runs through the whole.
// In that instant the dark the branches left untouched is the butterfly. The ink flows into it, the whole
// composition takes one breath, and the venation dims to the hero's own backdrop while three of its branches
// reach the page: the eyebrow rule, the first word of the headline, the gold button. The page was the
// destination from the first frame.
//
// Canvas 2D in the hero, no library, no blur, no particles. The heavy sums (the growth, the ink distance
// along each stroke) run in a worker (convergence-worker.js). Once per tab, Skip and Esc from the first
// frame, a calm version for Reduce Motion and slow devices, "Replay the opening" in the hero at a more
// leisurely tempo. On a page that does not play the opening, the finished backdrop is painted anyway, so
// the first screen is the same screen either way.
(function () {
  "use strict";
  var root = document.documentElement, doc = document;
  var AR = root.lang === "ar", HOLD = /ffhold/.test(location.hash);
  var PIECES = [
    { box: [7, 5, 163, 142], entry: [108, 64], path: "M154.0 19.5C152.0 16.9 149.2 13.9 147.0 12.0C144.8 10.1 143.4 9.1 141.0 8.0C138.6 6.9 135.2 5.9 132.5 5.5C129.8 5.1 127.5 5.2 125.0 5.5C122.5 5.8 120.0 6.1 117.2 7.0C114.5 7.9 111.0 9.5 108.5 11.0C106.0 12.5 104.0 14.5 102.5 15.8C101.0 17.0 100.9 17.1 99.8 18.8C98.6 20.4 96.6 23.0 95.5 25.5C94.4 28.0 93.5 30.7 93.0 34.0C92.5 37.3 92.6 42.0 92.8 45.2C92.9 48.5 93.3 50.8 94.0 53.5C94.7 56.2 96.0 59.1 97.0 61.2C98.0 63.4 99.1 65.1 100.0 66.5C100.9 67.9 101.0 68.2 102.2 69.5C103.5 70.8 106.4 73.4 107.8 74.2C109.1 75.1 109.8 74.8 110.5 74.8C111.2 74.7 111.5 74.5 112.0 74.0C112.5 73.5 113.5 72.8 113.8 71.5C114.0 70.2 114.1 68.2 113.8 66.5C113.4 64.8 112.2 62.8 111.8 61.0C111.2 59.2 110.9 58.1 110.8 55.8C110.6 53.4 110.4 49.7 110.8 47.0C111.1 44.3 112.1 41.6 112.8 39.8C113.4 37.9 113.9 37.2 114.8 36.0C115.6 34.8 116.8 33.6 117.8 32.8C118.8 31.9 119.5 31.5 120.8 31.0C122.0 30.5 123.8 30.1 125.0 30.0C126.2 29.9 127.3 30.2 128.2 30.5C129.2 30.8 129.4 30.8 130.5 31.8C131.6 32.8 133.7 35.0 134.8 36.5C135.8 38.0 136.2 39.4 136.8 41.0C137.3 42.6 137.8 42.8 138.0 46.2C138.2 49.7 138.4 56.9 138.0 61.5C137.6 66.1 136.6 70.2 135.8 73.8C134.9 77.3 134.3 79.6 133.0 83.0C131.7 86.4 129.5 91.3 128.0 94.2C126.5 97.2 125.4 98.8 124.0 100.8C122.6 102.8 121.8 104.1 119.8 106.2C117.7 108.4 113.7 112.2 111.8 113.8C109.8 115.3 109.6 115.2 108.2 115.8C106.9 116.3 105.1 116.8 103.5 117.0C101.9 117.2 100.8 117.2 98.8 116.8C96.8 116.2 93.9 115.3 91.5 114.0C89.1 112.7 86.5 110.6 84.5 109.0C82.5 107.4 83.2 108.5 79.8 104.2C76.2 100.0 67.7 88.4 63.5 83.5C59.3 78.6 57.2 77.0 54.8 75.0C52.3 73.0 50.8 72.2 49.0 71.2C47.2 70.3 46.0 69.8 44.2 69.2C42.5 68.7 40.7 68.2 38.5 68.0C36.3 67.8 33.4 67.8 31.2 68.0C29.1 68.2 27.5 68.5 25.5 69.2C23.5 70.0 21.3 71.0 19.2 72.5C17.2 74.0 14.7 76.4 13.0 78.5C11.3 80.6 10.2 82.4 9.2 85.0C8.2 87.6 7.3 91.5 7.0 94.0C6.7 96.5 6.9 97.4 7.2 99.8C7.6 102.1 8.2 105.5 9.2 108.2C10.2 111.0 11.3 113.2 13.2 116.0C15.2 118.8 18.7 122.7 21.0 125.0C23.3 127.3 24.9 128.3 27.0 129.8C29.1 131.2 30.7 132.3 33.8 133.8C36.8 135.2 40.9 137.2 45.5 138.5C50.1 139.8 56.2 141.0 61.2 141.5C66.3 142.0 70.1 142.2 75.8 141.8C81.4 141.3 89.6 140.0 95.0 138.8C100.4 137.5 103.7 136.3 108.0 134.5C112.3 132.7 117.5 129.9 121.0 127.8C124.5 125.6 126.4 123.8 128.8 121.8C131.1 119.7 132.6 118.3 135.2 115.2C137.9 112.2 141.8 107.2 144.5 103.2C147.2 99.2 149.3 96.2 151.8 91.2C154.2 86.2 157.2 78.8 159.0 73.2C160.8 67.7 161.9 62.9 162.5 57.8C163.1 52.6 162.9 46.1 162.8 42.5C162.6 38.9 162.2 38.5 161.5 36.0C160.8 33.5 160.0 30.5 158.8 27.8C157.5 25.0 156.0 22.1 154.0 19.5Z M30.0 96.5C30.5 95.2 31.6 94.3 32.5 93.5C33.4 92.7 34.2 92.1 35.5 91.8C36.8 91.4 38.8 91.3 40.2 91.5C41.7 91.7 42.4 91.8 44.2 92.8C46.1 93.8 48.2 94.8 51.2 97.5C54.3 100.2 59.8 106.0 62.8 108.8C65.7 111.5 66.6 112.2 68.8 113.8C70.9 115.2 73.2 116.8 75.5 117.8C77.8 118.8 81.4 119.3 82.8 119.8C84.1 120.2 83.7 120.2 83.5 120.5C83.3 120.8 82.6 121.4 81.8 121.8C80.9 122.1 80.8 122.3 78.2 122.5C75.8 122.7 69.9 123.1 66.8 123.0C63.6 122.9 62.5 122.8 59.2 122.0C56.0 121.2 50.8 119.6 47.5 118.2C44.2 116.9 42.1 115.9 39.5 114.0C36.9 112.1 33.4 108.8 31.8 107.0C30.1 105.2 30.2 104.5 29.8 103.5C29.3 102.5 29.2 102.4 29.2 101.2C29.3 100.1 29.5 97.8 30.0 96.5Z" },
    { box: [5, 45, 235, 224], entry: [14, 206], path: "M230.8 55.0C229.2 53.0 226.5 50.5 224.8 49.0C223.0 47.5 221.6 46.9 220.2 46.2C218.9 45.6 218.2 45.5 216.8 45.2C215.3 45.0 213.6 44.7 211.8 44.8C209.9 44.8 207.9 44.7 205.5 45.5C203.1 46.3 199.2 48.7 197.5 49.8C195.8 50.8 196.4 50.4 195.2 51.8C194.1 53.1 192.0 55.7 190.8 57.8C189.5 59.8 189.7 59.3 188.0 64.0C186.3 68.7 182.6 81.0 180.8 86.0C178.9 91.0 178.6 91.0 176.8 94.2C174.9 97.5 172.1 102.0 169.8 105.2C167.4 108.5 165.2 111.0 162.5 113.8C159.8 116.5 158.1 118.6 153.8 122.0C149.4 125.4 141.5 130.8 136.2 134.0C131.0 137.2 127.1 138.8 122.2 141.0C117.4 143.2 112.9 145.0 107.0 147.0C101.1 149.0 95.8 150.8 87.0 153.0C78.2 155.2 62.2 158.3 54.0 160.2C45.8 162.2 41.6 163.5 37.5 164.8C33.4 166.0 32.0 166.6 29.2 168.0C26.5 169.4 24.0 170.7 21.0 173.0C18.0 175.3 13.3 179.9 11.2 182.0C9.2 184.1 9.6 183.8 8.8 185.5C7.9 187.2 6.6 190.2 6.0 192.0C5.4 193.8 5.4 194.5 5.2 196.0C5.1 197.5 5.1 199.7 5.2 201.2C5.4 202.8 5.5 203.6 6.0 205.2C6.5 206.9 7.4 209.2 8.5 211.0C9.6 212.8 11.0 214.8 12.5 216.2C14.0 217.8 16.1 219.1 17.5 220.0C18.9 220.9 19.1 221.2 21.0 221.8C22.9 222.3 26.9 223.2 29.0 223.5C31.1 223.8 32.0 223.5 33.8 223.2C35.5 223.0 37.5 222.6 39.5 221.8C41.5 220.9 44.0 219.7 46.0 218.0C48.0 216.3 50.3 213.6 51.8 211.8C53.2 209.9 53.3 209.7 54.5 207.0C55.7 204.3 57.7 198.2 58.8 195.8C59.8 193.2 59.9 193.3 60.8 192.0C61.6 190.7 62.1 189.5 63.8 187.8C65.4 186.0 68.4 183.1 70.5 181.5C72.6 179.9 74.0 179.3 76.5 178.0C79.0 176.7 79.7 176.2 85.8 173.8C91.8 171.3 105.1 166.7 113.0 163.5C120.9 160.3 127.4 157.5 133.2 154.8C139.1 152.0 143.8 149.4 148.2 146.8C152.7 144.1 156.0 141.9 160.0 139.0C164.0 136.1 167.4 133.8 172.5 129.2C177.6 124.8 186.2 115.9 190.8 112.0C195.3 108.1 195.7 108.2 200.0 105.8C204.3 103.2 212.8 99.2 216.5 97.0C220.2 94.8 220.5 94.0 222.2 92.5C224.0 91.0 225.2 89.9 226.8 88.0C228.3 86.1 230.3 83.3 231.5 81.2C232.7 79.2 233.2 77.3 233.8 75.5C234.3 73.7 234.6 71.9 234.8 70.2C234.9 68.6 234.9 67.3 234.8 65.8C234.6 64.2 234.4 62.5 233.8 60.8C233.1 59.0 232.2 57.0 230.8 55.0Z" },
    { box: [80, 153, 239, 297], entry: [130, 226], path: "M227.8 173.0C226.0 170.8 226.3 171.2 224.5 169.8C222.7 168.2 220.2 165.9 217.0 164.0C213.8 162.1 209.6 159.9 205.0 158.2C200.4 156.6 194.1 155.1 189.5 154.2C184.9 153.4 180.4 153.2 177.2 153.0C174.1 152.8 173.8 152.8 170.5 153.0C167.2 153.2 162.7 153.5 157.8 154.5C152.8 155.5 145.0 157.7 140.8 159.0C136.5 160.3 135.5 160.9 132.5 162.2C129.5 163.6 126.1 165.1 122.5 167.2C118.9 169.4 114.6 172.0 111.0 175.0C107.4 178.0 103.3 182.5 101.0 185.0C98.7 187.5 98.5 188.0 97.0 190.2C95.5 192.5 93.8 194.8 92.0 198.5C90.2 202.2 87.7 207.4 86.0 212.2C84.3 217.1 82.8 224.0 82.0 227.5C81.2 231.0 81.3 229.9 81.0 233.5C80.7 237.1 80.0 244.2 80.0 249.0C80.0 253.8 80.5 258.5 81.0 262.0C81.5 265.5 82.3 267.8 83.0 270.0C83.7 272.2 83.7 272.6 85.0 275.0C86.3 277.4 89.2 282.1 91.0 284.5C92.8 286.9 93.6 287.8 96.0 289.5C98.4 291.2 103.0 293.7 105.2 294.8C107.5 295.8 107.5 295.7 109.5 296.0C111.5 296.3 114.5 296.8 117.0 296.8C119.5 296.7 122.1 296.5 124.8 295.8C127.4 295.0 130.4 293.9 133.0 292.5C135.6 291.1 138.2 289.1 140.2 287.2C142.3 285.4 143.8 283.6 145.2 281.2C146.8 278.9 148.2 276.2 149.2 273.2C150.3 270.3 151.1 266.6 151.5 263.5C151.9 260.4 151.8 257.8 151.5 254.8C151.2 251.7 150.3 248.0 149.5 245.2C148.7 242.5 147.9 240.8 146.8 238.5C145.6 236.2 144.4 234.0 142.8 231.8C141.1 229.5 138.7 226.8 137.0 225.2C135.3 223.7 133.8 222.8 132.5 222.5C131.2 222.2 130.2 222.9 129.5 223.5C128.8 224.1 128.2 225.1 128.0 226.2C127.8 227.4 127.3 227.5 128.0 230.2C128.7 233.0 131.2 239.6 132.0 242.5C132.8 245.4 132.8 245.0 132.8 247.5C132.8 250.0 132.7 254.2 132.0 257.2C131.3 260.2 129.7 263.5 128.5 265.5C127.3 267.5 125.8 268.6 124.8 269.5C123.7 270.4 123.2 270.6 122.2 271.0C121.3 271.4 120.4 271.8 119.2 272.0C118.1 272.2 116.5 272.2 115.2 272.0C114.0 271.8 113.2 271.7 112.0 271.0C110.8 270.3 109.4 269.3 108.2 268.0C107.1 266.7 105.8 264.4 105.0 263.0C104.2 261.6 104.2 261.6 103.8 259.5C103.2 257.4 102.3 253.4 102.0 250.2C101.7 247.1 101.5 244.8 101.8 240.8C102.0 236.7 103.1 229.8 103.8 226.0C104.4 222.2 104.9 220.9 105.8 218.2C106.6 215.6 107.7 212.6 108.8 210.2C109.8 207.9 110.4 206.4 112.0 204.0C113.6 201.6 116.2 198.1 118.2 195.8C120.3 193.4 122.3 191.5 124.5 189.8C126.7 188.0 129.8 186.2 131.5 185.2C133.2 184.3 133.3 184.3 134.8 184.2C136.2 184.2 138.3 184.5 140.0 185.0C141.7 185.5 143.3 186.1 145.0 187.0C146.7 187.9 148.6 189.1 150.2 190.2C151.9 191.4 152.2 191.5 154.8 194.0C157.2 196.5 161.5 201.0 165.2 205.2C169.0 209.5 173.6 215.6 177.0 219.2C180.4 222.9 183.3 225.1 185.8 227.0C188.2 228.9 189.7 229.5 191.5 230.5C193.3 231.5 194.6 232.2 196.8 232.8C198.9 233.3 202.0 233.8 204.2 234.0C206.5 234.2 207.9 234.1 210.0 233.8C212.1 233.4 215.0 232.5 217.0 231.8C219.0 231.0 220.3 230.3 222.0 229.2C223.7 228.2 225.1 227.4 227.0 225.5C228.9 223.6 231.9 220.2 233.5 217.8C235.1 215.3 235.9 213.2 236.8 210.8C237.6 208.3 238.2 205.0 238.5 203.0C238.8 201.0 238.9 201.0 238.8 199.0C238.6 197.0 238.4 193.9 237.8 191.2C237.1 188.6 236.4 186.0 234.8 183.0C233.1 180.0 229.5 175.2 227.8 173.0Z M154.5 174.2C156.2 173.7 161.9 172.6 165.5 172.2C169.1 171.9 171.9 171.7 176.0 172.0C180.1 172.3 186.4 173.2 190.2 174.0C194.1 174.8 196.2 175.6 199.2 177.0C202.2 178.4 205.6 180.4 208.2 182.5C210.9 184.6 213.4 187.4 215.0 189.8C216.6 192.1 217.2 194.9 217.8 196.5C218.2 198.1 218.1 198.2 218.0 199.2C217.9 200.3 217.9 201.6 217.2 203.0C216.6 204.4 215.5 206.3 214.2 207.5C213.0 208.7 211.0 209.5 209.5 210.0C208.0 210.5 207.0 210.7 205.0 210.5C203.0 210.3 200.1 209.8 197.5 208.8C194.9 207.7 194.1 208.1 189.5 204.0C184.9 199.9 174.7 188.5 170.0 184.2C165.3 180.0 164.0 179.7 161.5 178.2C159.0 176.8 156.4 176.2 155.2 175.5C154.1 174.8 152.8 174.8 154.5 174.2Z" }
  ];
  var CREAM = [245, 228, 200], GOLD = [232, 205, 143], R = window.matchMedia("(max-width: 640px)").matches ? 1 : 2;   // the ink is drawn at twice the mark on a computer, at its own size on a phone
  var SELF = (doc.currentScript && doc.currentScript.src) || "assets/js/convergence.js";
  var WORKER_URL = SELF.replace(/convergence\.js[^/]*$/, "convergence-worker.js?v=1");

  // The score of a first visit, in milliseconds (replay runs it 1.5 times slower).
  var T = { enter: [0, 120, 240], arrive: 520, rim: 980, growEnd: 1450, growDt: 12, sync: 1380, pulse: 1480, ink: 1560, inkLen: 520,
            breath: 1560, words: 1760, dim: 1900, dimLen: 560, end: 2460, cap: 4200 };

  var show = null, masks = [null, null, null], worker = null, final = null;   // final: the finished growth, for pages without the opening
  try { worker = new Worker(WORKER_URL); } catch (e) { worker = null; }
  var waiting = {};
  if (worker) worker.onmessage = function (e) {
    var m = e.data;
    if (m.kind === "flood") { var mk = masks[m.idx]; if (mk) { mk.dist = m.dist; } }
    else if (m.kind === "grow" && waiting[m.tag]) { var fn = waiting[m.tag]; delete waiting[m.tag]; fn(m.nodes); }
  };

  /* ---------- helpers ---------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function mix(a, b, t) { return a + (b - a) * t; }
  function easeIn(t) { return t * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function span(t, a, len) { return clamp((t - a) / len, 0, 1); }
  function rnd(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  function spline(pts, closed) {
    var N = closed ? 360 : 300, P = [], L = [0], M = pts.length;
    function at(i) { return closed ? pts[((i % M) + M) % M] : pts[clamp(i, 0, M - 1)]; }
    var segs = closed ? M : M - 1;
    for (var k = 0; k <= N; k++) {
      var g = k / N * segs, i = Math.min(Math.floor(g), segs - 1), t = g - i;
      var p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2), t2 = t * t, t3 = t2 * t;
      P.push([
        .5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        .5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)
      ]);
      if (k) L.push(L[k - 1] + Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1]));
    }
    var total = L[N];
    function pos(u) {
      var s = clamp(u, 0, 1) * total, lo = 0, hi = N;
      while (lo < hi) { var m = (lo + hi) >> 1; if (L[m] < s) lo = m + 1; else hi = m; }
      var i = Math.max(1, lo), f = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1);
      return [mix(P[i - 1][0], P[i][0], f), mix(P[i - 1][1], P[i][1], f)];
    }
    return { pos: pos, length: total, pts: P };
  }
  function inside(poly, x, y) {   // point in polygon
    var c = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }

  /* ---------- the ink: each piece of the mark, with its distance from the tip (worker) ---------- */
  function buildMasks() {
    PIECES.forEach(function (pc, idx) {
      if (masks[idx]) return;
      var x0 = (pc.box[0] - 2) * R, y0 = (pc.box[1] - 2) * R, w = (pc.box[2] - pc.box[0] + 4) * R, h = (pc.box[3] - pc.box[1] + 4) * R, n = w * h;
      var cv = doc.createElement("canvas"), c = cv.getContext("2d", { willReadFrequently: true });
      cv.width = w; cv.height = h;
      c.setTransform(R, 0, 0, R, -x0, -y0); c.fillStyle = "#fff"; c.fill(new Path2D(pc.path), "evenodd");
      var px = c.getImageData(0, 0, w, h).data, alpha = new Uint8Array(n), keep = new Uint8Array(n);
      for (var i = 0; i < n; i++) keep[i] = alpha[i] = px[i * 4 + 3];
      var out = doc.createElement("canvas"); out.width = w; out.height = h;
      var oc = out.getContext("2d");
      masks[idx] = { cv: out, ctx: oc, img: oc.createImageData(w, h), alpha: keep, dist: null, w: w, h: h, x0: x0, y0: y0, painted: -1 };
      if (worker) worker.postMessage({ kind: "flood", idx: idx, alpha: alpha, w: w, h: h, ex: pc.entry[0] * R - x0, ey: pc.entry[1] * R - y0 }, [alpha.buffer]);
    });
  }
  function inkReady() { return masks[0] && masks[0].dist && masks[1].dist && masks[2].dist; }
  // Paint one piece at ink progress p: a short gold front that settles into cream.
  function paintPiece(m, p) {
    if (p === m.painted) return;
    m.painted = p;
    var data = m.img.data, dist = m.dist, a = m.alpha, n = m.w * m.h, soft = .07, front = p * (1 + soft);
    for (var i = 0, j = 0; i < n; i++, j += 4) {
      var d = dist ? dist[i] : (a[i] > 8 ? 0 : -1);
      if (d < 0) { data[j + 3] = 0; continue; }
      var v = dist ? (front - d) / soft : p;
      if (v <= 0) { data[j + 3] = 0; continue; }
      if (v > 1) v = 1;
      var g = p >= 1 ? 0 : clamp(1 - (front - d) / .16, 0, 1);
      data[j] = CREAM[0] + (GOLD[0] - CREAM[0]) * g; data[j + 1] = CREAM[1] + (GOLD[1] - CREAM[1]) * g; data[j + 2] = CREAM[2] + (GOLD[2] - CREAM[2]) * g;
      data[j + 3] = (v * a[i]) | 0;
    }
    m.ctx.putImageData(m.img, 0, 0);
  }

  /* ---------- the composition: where things are, measured from the hero itself ---------- */
  var hero = doc.querySelector(".hero"), art = doc.querySelector(".hero-art"), heroMark = doc.getElementById("hero-mark"), formCanvas = doc.getElementById("form-canvas");
  if (!hero || !art || !heroMark || !formCanvas) return;
  var phone = window.matchMedia("(max-width: 640px)").matches;

  function geometry() {
    var hr = hero.getBoundingClientRect(), ar = art.getBoundingClientRect(), mr = heroMark.getBoundingClientRect();
    var W = hr.width, H = hr.height, cx = ar.left - hr.left + ar.width / 2, cy = ar.top - hr.top + ar.height / 2 - (root.classList.contains("intro") ? 24 : 0);
    var s = (mr.width || (phone ? 140 : 210)) / 244;                   // mark scale: px per unit of the 244 x 302 mark
    var rr = s * 244 * (phone ? .98 : 1.14), seed = rnd(7), rim = [];      // the rim the three currents close
    for (var k = 0; k < 7; k++) { var a = -Math.PI / 2 + k / 7 * Math.PI * 2 + (seed() - .5) * .3, r = rr * (.88 + .24 * seed()); rim.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
    var rimSp = spline(rim, true);
    // Each current: a way in from its own edge, then its third of the rim (with a little overlap at the joins).
    var ways = phone ? [[[-.08, .5]], [[1.0, -.03]], [[.95, 1.0]]] : [[[-.04, .62]], [[1.0, -.04]], [[.9, 1.05]]];   // where each current comes from: left, top right, bottom
    var starts = [.86, .22, .55], arc = 1 / 3 + .035, trunks = [];
    for (var i = 0; i < 3; i++) {
      var pts = ways[i].map(function (q) { return [(AR ? 1 - q[0] : q[0]) * W, q[1] * H]; });
      var u0 = AR ? 1 - starts[i] : starts[i], dir = AR ? -1 : 1, n = 40, rimPts = [];
      for (var k2 = 0; k2 <= n; k2++) rimPts.push(rimSp.pos(((u0 + dir * arc * k2 / n) % 1 + 1) % 1));
      // The way joins the rim along its tangent, sweeping in from outside: three points before the arc.
      function outward(u, k) { var q = rimSp.pos(((u % 1) + 1) % 1), dx = q[0] - cx, dy = q[1] - cy, l = Math.hypot(dx, dy) || 1; return [q[0] + dx / l * k, q[1] + dy / l * k]; }
      pts = pts.concat([outward(u0 - dir * .16, rr * .45), outward(u0 - dir * .06, rr * .06)]);
      var all = pts.concat(rimPts), sp = spline(all, false);
      var way = spline(pts.concat([rimPts[0]]), false);
      trunks.push({ sp: sp, rimAt: way.length / sp.length, rimPts: rimPts, head: rimPts[0] });
    }
    return { W: W, H: H, cx: cx, cy: cy, s: s, rim: rimSp, rimPoly: rimSp.pts, trunks: trunks, rr: rr };
  }
  function markPt(g, q) { return [g.cx + (q[0] - 122) * g.s, g.cy + (q[1] - 151) * g.s]; }

  // Points of light: inside the rim, never inside the mark (with a gap), denser along the mark's edge so the
  // branches draw its outline by stopping. Deterministic, so every visitor sees the same composition.
  function lights(g) {
    var gap = 9 * g.s, band = 8 * g.s;
    var cvA = doc.createElement("canvas"), cvB = doc.createElement("canvas"), ca = cvA.getContext("2d", { willReadFrequently: true }), cb = cvB.getContext("2d", { willReadFrequently: true });
    cvA.width = cvB.width = 304; cvA.height = cvB.height = 362;                    // the mark with a 30-unit margin
    [[ca, gap / g.s], [cb, (gap + band) / g.s]].forEach(function (q) {
      var c = q[0], p = new Path2D(PIECES[0].path + " " + PIECES[1].path + " " + PIECES[2].path);
      c.setTransform(1, 0, 0, 1, 30, 30); c.fillStyle = "#fff"; c.fill(p, "evenodd"); c.lineWidth = q[1] * 2; c.lineJoin = "round"; c.strokeStyle = "#fff"; c.stroke(p);
    });
    var A = ca.getImageData(0, 0, 304, 362).data, B = cb.getImageData(0, 0, 304, 362).data;
    function hit(data, x, y) { var mx = Math.round((x - g.cx) / g.s + 122 + 30), my = Math.round((y - g.cy) / g.s + 151 + 30); if (mx < 0 || my < 0 || mx >= 304 || my >= 362) return false; return data[(my * 304 + mx) * 4 + 3] > 60; }
    var seed = rnd(11), pts = [], step = (phone ? 15 : 17) * g.s, fine = step * .3, x, y;
    var x0 = g.cx - g.rr * 1.1, x1 = g.cx + g.rr * 1.1, y0 = g.cy - g.rr * 1.1, y1 = g.cy + g.rr * 1.1;
    for (y = y0; y < y1; y += step) for (x = x0; x < x1; x += step) {
      var px = x + (seed() - .5) * step * .9, py = y + (seed() - .5) * step * .9;
      if (!inside(g.rimPoly, px, py) || hit(A, px, py)) continue;
      pts.push([px, py]);
    }
    for (y = y0; y < y1; y += fine) for (x = x0; x < x1; x += fine) {     // the band along the mark
      var qx = x + (seed() - .5) * fine, qy = y + (seed() - .5) * fine;
      if (!inside(g.rimPoly, qx, qy) || hit(A, qx, qy) || !hit(B, qx, qy)) continue;
      pts.push([qx, qy]);
    }
    return pts;
  }

  /* ---------- drawing ---------- */
  // A trunk: a thin calligraphic stroke along its way and its arc, drawn up to head u.
  function trunkPath(ctx, tr, u, s, from) {
    from = from || 0;
    var K = Math.max(8, Math.round(140 * (u - from))), L = [], Rr = [], nib = 0.9;
    for (var k = 0; k <= K; k++) {
      var f = k / K, uu = mix(from, u, f), p = tr.sp.pos(uu), q = tr.sp.pos(Math.min(1, uu + .003));
      var tx = q[0] - p[0], ty = q[1] - p[1], tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
      var ang = Math.atan2(ty, tx), w = (1.1 + .9 * Math.abs(Math.sin(ang - nib))) * s * (0.55 + .45 * Math.sin(Math.PI * Math.min(1, uu * 1.15)));
      if (k === K && u < 1) w *= .4;
      L.push([p[0] - ty * w, p[1] + tx * w]); Rr.push([p[0] + ty * w, p[1] - tx * w]);
    }
    ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]);
    for (k = 1; k <= K; k++) ctx.lineTo(L[k][0], L[k][1]);
    for (k = K; k >= 0; k--) ctx.lineTo(Rr[k][0], Rr[k][1]);
    ctx.closePath();
  }
  function widthFor(depth, s) { return Math.max(.45, (depth <= 1 ? 1.9 : depth === 2 ? 1.2 : depth === 3 ? .8 : .55) * Math.min(1.3, s * 1.2)); }
  function alphaFor(depth) { return depth <= 1 ? .92 : depth === 2 ? .8 : depth === 3 ? .66 : .55; }
  // Draw the nodes born up to time `upto` that have not been drawn yet, into the lace canvas.
  function growInto(lace, upto) {
    var nd = lace.nodes, ctx = lace.ctx; if (!nd) return false;
    var i = lace.drawn, any = false;
    ctx.lineCap = "round";
    while (i < nd.length / 6 && nd[i * 6 + 3] <= upto) {
      var p = nd[i * 6 + 2];
      if (p >= 0) {
        var d = nd[i * 6 + 5];
        ctx.strokeStyle = "rgba(232,205,143," + alphaFor(d) + ")"; ctx.lineWidth = widthFor(d, lace.s);
        ctx.beginPath(); ctx.moveTo(nd[p * 6], nd[p * 6 + 1]); ctx.lineTo(nd[i * 6], nd[i * 6 + 1]); ctx.stroke(); any = true;
      }
      i++;
    }
    lace.drawn = i;
    return any;
  }
  function makeLayer(W, H, dpr) {
    var cv = doc.createElement("canvas"); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    var ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { cv: cv, ctx: ctx, nodes: null, drawn: 0, s: 1 };
  }

  // The growth, asked of the worker: roots along the rim arcs (with the time the trunk reaches each), the points of light.
  function askGrowth(g, tag, roots, pts, dt, cb) {
    var msg = { kind: "grow", tag: tag, roots: roots, pts: pts, step: 4.6 * Math.max(.8, g.s), reach: 62 * g.s + 12, kill: 3.2 * g.s + 1.5, dt: dt, cx: g.cx, cy: g.cy, inertia: tag === "corr" ? .4 : .9, wobble: .22 };
    if (!worker) return cb(null);
    waiting[tag] = cb; worker.postMessage(msg);
  }
  function rimRoots(g, times) {   // times: when each trunk's head reaches rim fraction f (0..1), as a function
    var roots = [];
    g.trunks.forEach(function (tr, i) {
      var n = tr.rimPts.length;
      for (var k = 3; k < n - 2; k += 9) roots.push([tr.rimPts[k][0], tr.rimPts[k][1], times(i, k / (n - 1)), i]);
    });
    return roots;
  }
  // The three branches that reach the page: a chain of points from the rim to each element.
  function corridors(g) {
    var hr = hero.getBoundingClientRect(), out = [];
    function rect(sel, lift) { var el = doc.querySelector(sel); if (!el) return null; var r = el.getBoundingClientRect(); if (!r.width) return null; return { l: r.left - hr.left, r: r.right - hr.left, t: r.top - hr.top - (lift || 0), b: r.bottom - hr.top - (lift || 0) }; }
    var lift = root.classList.contains("intro") ? 24 : 0, w1 = doc.querySelector(".hero h1 .w"), lift2 = lift && w1 ? parseFloat(getComputedStyle(w1).fontSize) * .5 : 0;
    var tg = [rect(".hero .eyebrow .rule", lift), rect(".hero h1 .w", lift2), rect(".hero .btn-gold", lift)];
    var ends = [tg[0] && [AR ? tg[0].r : tg[0].l, (tg[0].t + tg[0].b) / 2], tg[1] && [AR ? tg[1].r + 6 : tg[1].l - 6, tg[1].b - 4], tg[2] && [AR ? tg[2].r : tg[2].l, tg[2].t + 1]];
    var seed = rnd(23);
    ends.forEach(function (e, i) {
      if (!e) return;
      var a = Math.atan2(e[1] - g.cy, e[0] - g.cx), start = g.rim.pos(((a + Math.PI / 2) / (Math.PI * 2) + 1) % 1);
      var mid = [mix(start[0], e[0], .5) + (seed() - .5) * 60 * g.s, mix(start[1], e[1], .5) + (seed() - .5) * 60 * g.s];
      var sp = spline([start, mid, e], false), n = Math.max(4, Math.round(sp.length / (9 * Math.max(.8, g.s))));
      for (var k = 1; k <= n; k++) { var p = sp.pos(k / n); out.push([p[0] + (seed() - .5) * 4, p[1] + (seed() - .5) * 4]); if (k < n - 1 && seed() < .35) { var q = sp.pos(k / n); out.push([q[0] + (seed() - .5) * 26 * g.s, q[1] + (seed() - .5) * 26 * g.s]); } }
    });
    return out;
  }

  /* ---------- the finished backdrop, for a page that does not play the opening ---------- */
  function paintFinal(g, cb) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2), lace = makeLayer(g.W, g.H, dpr); lace.s = g.s;
    askGrowth(g, "final", rimRoots(g, function () { return 0; }), lights(g), 1, function (nodes) {
      lace.nodes = nodes; if (nodes) growInto(lace, 1e9);
      g.trunks.forEach(function (tr) { trunkPath(lace.ctx, tr, 1, g.s, tr.rimAt); lace.ctx.fillStyle = "rgba(232,205,143,.9)"; lace.ctx.fill(); });
      cb(lace);
    });
  }
  function settle(g, lace, alpha) {   // copy the lace into the hero's own canvas, where it stays
    var ar = art.getBoundingClientRect(), hr = hero.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    formCanvas.width = Math.round(ar.width * dpr); formCanvas.height = Math.round(ar.height * dpr);
    var c = formCanvas.getContext("2d"); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.globalAlpha = alpha;
    var lift = root.classList.contains("intro") ? 24 : 0;
    c.drawImage(lace.cv, -(ar.left - hr.left), -(ar.top - hr.top - lift), g.W, g.H);
    art.classList.add("formed");
  }

  /* ---------- the opening ---------- */
  function start(opts) {
    if (show) return;
    opts = opts || {};
    var replay = !!opts.replay, tempo = replay ? 1.5 : 1;
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var stage = doc.createElement("div"); stage.className = "cv-stage"; stage.setAttribute("aria-hidden", "true");
    var cv = doc.createElement("canvas"); cv.className = "cv-canvas"; stage.appendChild(cv);
    var skip = doc.createElement("button"); skip.type = "button"; skip.className = "intro-skip";
    skip.textContent = AR ? "تخطّي" : "Skip"; stage.appendChild(skip);
    hero.appendChild(stage);
    root.classList.add("intro-live");
    var ctx = cv.getContext("2d");
    var S = { t0: 0, mode: calm ? "calm" : "full", done: false, raf: 0, probe: [], offset: 0, fast: false, wordsUp: false, landed: false, corr: false, fadeIn: replay ? 440 : 0, trunkInk: [false, false, false] };
    var g, lace, laceC;
    function hold() { root.classList.add("intro"); root.classList.remove("intro-fade"); if (replay) { art.classList.remove("formed"); formCanvas.getContext("2d").clearRect(0, 0, formCanvas.width, formCanvas.height); } }
    function size() {
      g = geometry();
      cv.width = Math.round(g.W * dpr); cv.height = Math.round(g.H * dpr); cv.style.width = g.W + "px"; cv.style.height = g.H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    if (replay) { root.classList.add("intro-fade"); setTimeout(hold, S.fadeIn); } else hold();
    size();
    lace = makeLayer(g.W, g.H, dpr); lace.s = g.s; laceC = makeLayer(g.W, g.H, dpr); laceC.s = g.s;
    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    buildMasks();
    // The growth: roots along the rim, each stamped with the moment the trunk's head passes it.
    var growDt = T.growDt;
    askGrowth(g, "main", rimRoots(g, function (i, f) { return T.arrive + (T.rim - T.arrive) * f + T.enter[i] * .5; }), lights(g), growDt, function (nodes) { lace.nodes = nodes; });

    function headOf(i, t) {   // the trunk's head along its route, 0..1
      var tr = g.trunks[i], a = T.enter[i];
      if (t < T.arrive) return tr.rimAt * easeInOut(span(t, a, T.arrive - a));
      return mix(tr.rimAt, 1, easeOut(span(t, T.arrive, T.rim - T.arrive + a * .5)));
    }
    function growClock(t) {   // node time: the growth runs fast at first and slows into the recognition
      if (S.fast) return 1e9;
      var top = T.rim + 60 * growDt, x = span(t, T.arrive, T.growEnd - T.arrive);
      return T.arrive + (top - T.arrive) * (1 - Math.pow(1 - x, 1.6));
    }
    // A pulse: the branches within a ring of the source light up for a moment (drawn segment by segment, no compositing).
    function pulseRing(cx, cy, r, w, amp, src) {
      var nd = src.nodes; if (!nd) return;
      ctx.lineCap = "round";
      for (var i = 0, n = src.drawn; i < n; i++) {
        var p = nd[i * 6 + 2]; if (p < 0) continue;
        var x = nd[i * 6], y = nd[i * 6 + 1], d = Math.abs(Math.hypot(x - cx, y - cy) - r);
        if (d >= w) continue;
        var a = amp * (1 - d / w);
        ctx.strokeStyle = "rgba(250,238,214," + a + ")"; ctx.lineWidth = widthFor(nd[i * 6 + 5], src.s) + .4;
        ctx.beginPath(); ctx.moveTo(nd[p * 6], nd[p * 6 + 1]); ctx.lineTo(x, y); ctx.stroke();
      }
    }
    function drawMark(alpha, p) {
      ctx.globalAlpha = alpha;
      masks.forEach(function (m, i) {
        var q = p[i]; if (!m || q <= 0) return;
        paintPiece(m, q);
        ctx.drawImage(m.cv, g.cx + (m.x0 / R - 122) * g.s, g.cy + (m.y0 / R - 151) * g.s, m.w / R * g.s, m.h / R * g.s);
      });
      ctx.globalAlpha = 1;
    }

    function frame(now) {
      if (S.done) return;
      if (!S.t0) S.t0 = now;
      var t = (now - S.t0) / tempo + S.offset;
      if (S.fast) t = T.ink - 40 + (now - S.fastAt) * 1.7;
      if (HOLD && t > T.sync) t = T.sync;                       // #ffhold: freeze before the ink, for checking the composition
      S.probe.push(now);
      ctx.clearRect(0, 0, g.W, g.H);
      var mode = S.mode, i, k;
      var breath = span(t, T.breath, 820), bs = 1 + .035 * Math.sin(breath * Math.PI);   // one breath as the ink arrives
      var laceA = (t < T.dim ? 1 : mix(1, .34, easeInOut(span(t, T.dim, T.dimLen)))) * (1 - span(t, T.end - 300, 1000));
      var corrA = t < T.dim ? 1 : 1 - easeInOut(span(t, T.dim, T.dimLen));
      var veilA = S.fadeIn ? Math.min(1, (now - S.t0) / S.fadeIn) : 1;

      if (mode === "full") {
        // I and II. The currents come in and close the rim; the growth starts the moment a trunk reaches it.
        var gc = growClock(t);
        growInto(lace, gc);
        if (t >= T.arrive + 60 && !S.corr && lace.nodes) {   // the branches that reach the page, seeded on the rim's near side
          S.corr = true;
          var roots = [], nd = lace.nodes;
          for (k = 0; k < nd.length / 6; k++) if (nd[k * 6 + 2] >= 0 && nd[k * 6 + 5] <= 2) roots.push([nd[k * 6], nd[k * 6 + 1], nd[k * 6 + 3], nd[k * 6 + 4]]);
          askGrowth(g, "corr", roots, corridors(g), growDt * .8, function (nodes) { laceC.nodes = nodes; });
        }
        growInto(laceC, gc);
        ctx.save(); ctx.translate(g.cx, g.cy); ctx.scale(bs, bs); ctx.translate(-g.cx, -g.cy);
        ctx.globalAlpha = laceA * veilA; ctx.drawImage(lace.cv, 0, 0, g.W, g.H);
        if (corrA > 0) { ctx.globalAlpha = corrA * veilA; ctx.drawImage(laceC.cv, 0, 0, g.W, g.H); }
        ctx.globalAlpha = 1;
        for (i = 0; i < 3; i++) {                                     // the trunks, drawn live until complete
          var u = S.fast ? 1 : headOf(i, t);
          if (u <= 0) continue;
          var tr = g.trunks[i], wayA = (1 - span(t, T.pulse, 520)) * Math.min(1, span(t, T.enter[i], 260)) * veilA;   // the way in dissolves once the rhythm locks
          if (u >= 1 && !S.trunkInk[i]) { S.trunkInk[i] = true; trunkPath(lace.ctx, tr, 1, g.s, tr.rimAt); lace.ctx.fillStyle = "rgba(232,205,143,.9)"; lace.ctx.fill(); }
          else if (u < 1 && u > tr.rimAt) { trunkPath(ctx, tr, u, g.s, tr.rimAt); ctx.fillStyle = "rgba(232,205,143," + (.9 * veilA) + ")"; ctx.fill(); }
          if (wayA > .01) { trunkPath(ctx, tr, Math.min(u, tr.rimAt), g.s); ctx.fillStyle = "rgba(232,205,143," + (.9 * wayA) + ")"; ctx.fill(); }
        }
        ctx.restore();
        // Rhythm: each current pulses to its own beat from its own root; the beats fall into step by the sync.
        if (t > T.enter[2] + 300 && t < T.ink + 300 && !S.fast) {
          var lock = smooth(span(t, T.sync - 700, 700)), period = 760;
          for (i = 0; i < 3; i++) {
            var ph = mix(i * 0.33, 0, lock), f = ((t / period + ph) % 1 + 1) % 1, src = g.trunks[i].head;
            var cxp = mix(src[0], g.cx, lock), cyp = mix(src[1], g.cy, lock);
            var fade = Math.min(1, span(t, T.enter[2] + 300, 400)) * (t > T.pulse ? 1 - span(t, T.pulse, 250) : 1);
            if (fade > 0) pulseRing(cxp, cyp, f * g.rr * 2.1, 30 * g.s + 12, .7 * fade * (1 - .4 * lock), lace);
          }
        }
        if (t >= T.pulse && t < T.pulse + 620) {                        // the one pulse: harmony
          var pf = easeOut(span(t, T.pulse, 620));
          pulseRing(g.cx, g.cy, pf * g.rr * 2.2, 40 * g.s + 16, 1 * (1 - pf * pf), lace);
        }
        // III. The dark the branches left is the butterfly: it warms as the rhythm locks, then the ink fills it from each stroke's tip.
        if (t >= T.sync && t < T.ink) { var pre = .14 * smooth(span(t, T.sync, T.ink - T.sync)); masks.forEach(function (m) { if (m) paintPiece(m, 1); }); drawMark(pre, [1, 1, 1]); masks.forEach(function (m) { if (m) m.painted = -1; }); }
        if (t >= T.ink) {
          var p = easeInOut(span(t, T.ink, T.inkLen));
          ctx.save(); ctx.translate(g.cx, g.cy); ctx.scale(bs, bs); ctx.translate(-g.cx, -g.cy);
          drawMark(1 - span(t, T.end - 300, 1000), [p, p, p]);
          ctx.restore();
        }
      } else {
        // Calm: the finished composition simply arrives, the ink with it. No growth, no pulse.
        if (!S.calmReady) {
          S.calmReady = true;
          if (!lace.calmAsked) { lace.calmAsked = true; paintFinal(g, function (fin) { lace = fin; }); }
        }
        var ca = easeInOut(span(t, 100, 900)), cp = easeInOut(span(t, 350, 900));
        ctx.globalAlpha = ca * veilA * (t < T.dim ? 1 : mix(1, .34, easeInOut(span(t, T.dim, T.dimLen)))) * (1 - span(t, T.end - 300, 1000)); ctx.drawImage(lace.cv, 0, 0, g.W, g.H); ctx.globalAlpha = 1;
        drawMark(1 - span(t, T.end - 300, 1000), [cp, cp, cp]);
        if (!S.wordsUp && t >= 900) { S.wordsUp = true; root.classList.remove("intro"); stage.classList.add("through"); skip.style.opacity = 0; }
      }
      // IV. The page: words rise; the venation dims to the backdrop and three branches hand over to the page.
      if (!S.wordsUp && t >= T.words) { S.wordsUp = true; root.classList.remove("intro"); stage.classList.add("through"); skip.style.opacity = 0; }
      if (!S.landed && t >= T.end - 300) { S.landed = true; settle(g, lace, .34); }
      if (t >= T.end + 750) return end();
      S.raf = requestAnimationFrame(frame);
    }

    function end() {
      if (S.done) return; S.done = true;
      cancelAnimationFrame(S.raf); timers.forEach(clearTimeout);
      doc.removeEventListener("keydown", onKey);
      root.classList.remove("intro"); root.classList.remove("intro-live"); root.classList.remove("intro-fade");
      if (!S.landed) settle(g, lace, .34);
      if (stage.parentNode) stage.parentNode.removeChild(stage);
      masks.forEach(function (m) { if (m) m.painted = -1; });
      show = null;
      if (replay && replayBtn) replayBtn.focus({ preventScroll: true });
    }
    function skipNow() {
      if (S.done || S.fast) return;
      if (S.mode !== "full") { S.offset = 2000; return; }
      S.fast = true; S.fastAt = performance.now();
      if (lace.nodes) growInto(lace, 1e9); if (laceC.nodes) growInto(laceC, 1e9);
    }
    function onKey(e) { if (e.key === "Escape") skipNow(); }
    skip.addEventListener("click", skipNow);
    doc.addEventListener("keydown", onKey);
    later(function () {                                              // a device that cannot keep up gets the calm version
      var p = S.probe; if (p.length < 11 || S.mode !== "full") return;
      var dt = (p[p.length - 1] - p[p.length - 11]) / 10;
      if (dt > 85) { S.mode = "calm"; S.offset = -((performance.now() - S.t0) / tempo); }
    }, 900 * tempo);
    if (!HOLD) later(skipNow, T.cap * tempo);
    try { sessionStorage.setItem("ff-intro", "1"); } catch (e) {}
    show = S; S.skip = skipNow;
    S.raf = requestAnimationFrame(frame);
  }

  /* ---------- wiring ---------- */
  var replayBtn = doc.getElementById("replay-intro");
  if (replayBtn) {
    replayBtn.hidden = false;
    replayBtn.addEventListener("click", function () { if (!show) start({ replay: true }); });
  }
  window.FFIntro = { replay: function () { if (!show) start({ replay: true }); }, skip: function () { if (show) show.skip(); } };
  function boot() {
    if (root.classList.contains("intro")) start();
    else { var g = geometry(); buildMasks(); paintFinal(g, function (lace) { settle(g, lace, .34); }); }
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})();
