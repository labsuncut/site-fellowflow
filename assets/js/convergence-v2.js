// FellowFlow opening, part two: "The Convergence" (30 Oct 2026). Version two of the opening; version one
// ("The Butterfly Effect", assets/js/intro.js) stays in the repo as the reference it replaced.
//
// Many forces. One rhythm. A living transformation.
//   I   Awakening   three fine gold currents wake in the dark, each in its own place, at its own pace
//   II  Connection  they feel one another, bend, cross and braid; tension, then resolution
//   III Emergence   each current runs one last lap along its own piece of the mark and sets into cream ink;
//                   the negative space between the three strokes is the butterfly
//   IV  Ascension   one expansion, and the mark glides to its place while three lines leave it and become
//                   the eyebrow rule, the gold word in the headline and the gold button
//   V   Flow        the first screen is in use; the mark stays as the signature
//
// Pure canvas 2D, no library, no particles, no blur. The mark is the traced vector of the logo; the ink
// spreads along each piece by geodesic distance (a flood from the tip of each stroke), so it flows, it does
// not fade in. Once per tab (sessionStorage "ff-intro"), Skip and Esc from the first frame, a slow-device
// probe and a hard cap, a calm version for Reduce Motion, and a "Replay the opening" control in the hero.
// Phones get their own choreography (portrait entries, mark lands on the header logo). Nothing here blocks
// rendering: assets/js/intro-boot.js (in <head>) only sets html.intro; this file is deferred.
(function () {
  "use strict";
  var root = document.documentElement, doc = document;
  var AR = root.lang === "ar";

  // The three pieces of the mark, in its own 244 x 302 box: the vector outline (with its hole), the tip
  // where the ink enters, and the centre line the current follows on its final lap.
  var PIECES = [
    { id: "a", box: [7, 5, 163, 142], path: "M154.0 19.5C152.0 16.9 149.2 13.9 147.0 12.0C144.8 10.1 143.4 9.1 141.0 8.0C138.6 6.9 135.2 5.9 132.5 5.5C129.8 5.1 127.5 5.2 125.0 5.5C122.5 5.8 120.0 6.1 117.2 7.0C114.5 7.9 111.0 9.5 108.5 11.0C106.0 12.5 104.0 14.5 102.5 15.8C101.0 17.0 100.9 17.1 99.8 18.8C98.6 20.4 96.6 23.0 95.5 25.5C94.4 28.0 93.5 30.7 93.0 34.0C92.5 37.3 92.6 42.0 92.8 45.2C92.9 48.5 93.3 50.8 94.0 53.5C94.7 56.2 96.0 59.1 97.0 61.2C98.0 63.4 99.1 65.1 100.0 66.5C100.9 67.9 101.0 68.2 102.2 69.5C103.5 70.8 106.4 73.4 107.8 74.2C109.1 75.1 109.8 74.8 110.5 74.8C111.2 74.7 111.5 74.5 112.0 74.0C112.5 73.5 113.5 72.8 113.8 71.5C114.0 70.2 114.1 68.2 113.8 66.5C113.4 64.8 112.2 62.8 111.8 61.0C111.2 59.2 110.9 58.1 110.8 55.8C110.6 53.4 110.4 49.7 110.8 47.0C111.1 44.3 112.1 41.6 112.8 39.8C113.4 37.9 113.9 37.2 114.8 36.0C115.6 34.8 116.8 33.6 117.8 32.8C118.8 31.9 119.5 31.5 120.8 31.0C122.0 30.5 123.8 30.1 125.0 30.0C126.2 29.9 127.3 30.2 128.2 30.5C129.2 30.8 129.4 30.8 130.5 31.8C131.6 32.8 133.7 35.0 134.8 36.5C135.8 38.0 136.2 39.4 136.8 41.0C137.3 42.6 137.8 42.8 138.0 46.2C138.2 49.7 138.4 56.9 138.0 61.5C137.6 66.1 136.6 70.2 135.8 73.8C134.9 77.3 134.3 79.6 133.0 83.0C131.7 86.4 129.5 91.3 128.0 94.2C126.5 97.2 125.4 98.8 124.0 100.8C122.6 102.8 121.8 104.1 119.8 106.2C117.7 108.4 113.7 112.2 111.8 113.8C109.8 115.3 109.6 115.2 108.2 115.8C106.9 116.3 105.1 116.8 103.5 117.0C101.9 117.2 100.8 117.2 98.8 116.8C96.8 116.2 93.9 115.3 91.5 114.0C89.1 112.7 86.5 110.6 84.5 109.0C82.5 107.4 83.2 108.5 79.8 104.2C76.2 100.0 67.7 88.4 63.5 83.5C59.3 78.6 57.2 77.0 54.8 75.0C52.3 73.0 50.8 72.2 49.0 71.2C47.2 70.3 46.0 69.8 44.2 69.2C42.5 68.7 40.7 68.2 38.5 68.0C36.3 67.8 33.4 67.8 31.2 68.0C29.1 68.2 27.5 68.5 25.5 69.2C23.5 70.0 21.3 71.0 19.2 72.5C17.2 74.0 14.7 76.4 13.0 78.5C11.3 80.6 10.2 82.4 9.2 85.0C8.2 87.6 7.3 91.5 7.0 94.0C6.7 96.5 6.9 97.4 7.2 99.8C7.6 102.1 8.2 105.5 9.2 108.2C10.2 111.0 11.3 113.2 13.2 116.0C15.2 118.8 18.7 122.7 21.0 125.0C23.3 127.3 24.9 128.3 27.0 129.8C29.1 131.2 30.7 132.3 33.8 133.8C36.8 135.2 40.9 137.2 45.5 138.5C50.1 139.8 56.2 141.0 61.2 141.5C66.3 142.0 70.1 142.2 75.8 141.8C81.4 141.3 89.6 140.0 95.0 138.8C100.4 137.5 103.7 136.3 108.0 134.5C112.3 132.7 117.5 129.9 121.0 127.8C124.5 125.6 126.4 123.8 128.8 121.8C131.1 119.7 132.6 118.3 135.2 115.2C137.9 112.2 141.8 107.2 144.5 103.2C147.2 99.2 149.3 96.2 151.8 91.2C154.2 86.2 157.2 78.8 159.0 73.2C160.8 67.7 161.9 62.9 162.5 57.8C163.1 52.6 162.9 46.1 162.8 42.5C162.6 38.9 162.2 38.5 161.5 36.0C160.8 33.5 160.0 30.5 158.8 27.8C157.5 25.0 156.0 22.1 154.0 19.5Z M30.0 96.5C30.5 95.2 31.6 94.3 32.5 93.5C33.4 92.7 34.2 92.1 35.5 91.8C36.8 91.4 38.8 91.3 40.2 91.5C41.7 91.7 42.4 91.8 44.2 92.8C46.1 93.8 48.2 94.8 51.2 97.5C54.3 100.2 59.8 106.0 62.8 108.8C65.7 111.5 66.6 112.2 68.8 113.8C70.9 115.2 73.2 116.8 75.5 117.8C77.8 118.8 81.4 119.3 82.8 119.8C84.1 120.2 83.7 120.2 83.5 120.5C83.3 120.8 82.6 121.4 81.8 121.8C80.9 122.1 80.8 122.3 78.2 122.5C75.8 122.7 69.9 123.1 66.8 123.0C63.6 122.9 62.5 122.8 59.2 122.0C56.0 121.2 50.8 119.6 47.5 118.2C44.2 116.9 42.1 115.9 39.5 114.0C36.9 112.1 33.4 108.8 31.8 107.0C30.1 105.2 30.2 104.5 29.8 103.5C29.3 102.5 29.2 102.4 29.2 101.2C29.3 100.1 29.5 97.8 30.0 96.5Z", entry: [108, 64], nib: 0.75, lead: 0.46,
      line: [[108,64],[101,50],[104,36],[116,25],[132,22],[146,34],[152,56],[150,82],[139,106],[121,125],[97,135],[70,137],[45,131],[26,117],[17,99],[24,82],[42,73],[62,73],[78,83],[88,97],[84,110]],
      out: [24, 82] },
    { id: "b", box: [5, 45, 235, 224], path: "M230.8 55.0C229.2 53.0 226.5 50.5 224.8 49.0C223.0 47.5 221.6 46.9 220.2 46.2C218.9 45.6 218.2 45.5 216.8 45.2C215.3 45.0 213.6 44.7 211.8 44.8C209.9 44.8 207.9 44.7 205.5 45.5C203.1 46.3 199.2 48.7 197.5 49.8C195.8 50.8 196.4 50.4 195.2 51.8C194.1 53.1 192.0 55.7 190.8 57.8C189.5 59.8 189.7 59.3 188.0 64.0C186.3 68.7 182.6 81.0 180.8 86.0C178.9 91.0 178.6 91.0 176.8 94.2C174.9 97.5 172.1 102.0 169.8 105.2C167.4 108.5 165.2 111.0 162.5 113.8C159.8 116.5 158.1 118.6 153.8 122.0C149.4 125.4 141.5 130.8 136.2 134.0C131.0 137.2 127.1 138.8 122.2 141.0C117.4 143.2 112.9 145.0 107.0 147.0C101.1 149.0 95.8 150.8 87.0 153.0C78.2 155.2 62.2 158.3 54.0 160.2C45.8 162.2 41.6 163.5 37.5 164.8C33.4 166.0 32.0 166.6 29.2 168.0C26.5 169.4 24.0 170.7 21.0 173.0C18.0 175.3 13.3 179.9 11.2 182.0C9.2 184.1 9.6 183.8 8.8 185.5C7.9 187.2 6.6 190.2 6.0 192.0C5.4 193.8 5.4 194.5 5.2 196.0C5.1 197.5 5.1 199.7 5.2 201.2C5.4 202.8 5.5 203.6 6.0 205.2C6.5 206.9 7.4 209.2 8.5 211.0C9.6 212.8 11.0 214.8 12.5 216.2C14.0 217.8 16.1 219.1 17.5 220.0C18.9 220.9 19.1 221.2 21.0 221.8C22.9 222.3 26.9 223.2 29.0 223.5C31.1 223.8 32.0 223.5 33.8 223.2C35.5 223.0 37.5 222.6 39.5 221.8C41.5 220.9 44.0 219.7 46.0 218.0C48.0 216.3 50.3 213.6 51.8 211.8C53.2 209.9 53.3 209.7 54.5 207.0C55.7 204.3 57.7 198.2 58.8 195.8C59.8 193.2 59.9 193.3 60.8 192.0C61.6 190.7 62.1 189.5 63.8 187.8C65.4 186.0 68.4 183.1 70.5 181.5C72.6 179.9 74.0 179.3 76.5 178.0C79.0 176.7 79.7 176.2 85.8 173.8C91.8 171.3 105.1 166.7 113.0 163.5C120.9 160.3 127.4 157.5 133.2 154.8C139.1 152.0 143.8 149.4 148.2 146.8C152.7 144.1 156.0 141.9 160.0 139.0C164.0 136.1 167.4 133.8 172.5 129.2C177.6 124.8 186.2 115.9 190.8 112.0C195.3 108.1 195.7 108.2 200.0 105.8C204.3 103.2 212.8 99.2 216.5 97.0C220.2 94.8 220.5 94.0 222.2 92.5C224.0 91.0 225.2 89.9 226.8 88.0C228.3 86.1 230.3 83.3 231.5 81.2C232.7 79.2 233.2 77.3 233.8 75.5C234.3 73.7 234.6 71.9 234.8 70.2C234.9 68.6 234.9 67.3 234.8 65.8C234.6 64.2 234.4 62.5 233.8 60.8C233.1 59.0 232.2 57.0 230.8 55.0Z", entry: [14, 206], nib: 1.15, lead: 0.40,
      line: [[14,206],[26,192],[46,177],[74,165],[106,156],[136,147],[160,133],[180,112],[200,88],[216,66]],
      out: [216, 66] },
    { id: "c", box: [80, 153, 239, 297], path: "M227.8 173.0C226.0 170.8 226.3 171.2 224.5 169.8C222.7 168.2 220.2 165.9 217.0 164.0C213.8 162.1 209.6 159.9 205.0 158.2C200.4 156.6 194.1 155.1 189.5 154.2C184.9 153.4 180.4 153.2 177.2 153.0C174.1 152.8 173.8 152.8 170.5 153.0C167.2 153.2 162.7 153.5 157.8 154.5C152.8 155.5 145.0 157.7 140.8 159.0C136.5 160.3 135.5 160.9 132.5 162.2C129.5 163.6 126.1 165.1 122.5 167.2C118.9 169.4 114.6 172.0 111.0 175.0C107.4 178.0 103.3 182.5 101.0 185.0C98.7 187.5 98.5 188.0 97.0 190.2C95.5 192.5 93.8 194.8 92.0 198.5C90.2 202.2 87.7 207.4 86.0 212.2C84.3 217.1 82.8 224.0 82.0 227.5C81.2 231.0 81.3 229.9 81.0 233.5C80.7 237.1 80.0 244.2 80.0 249.0C80.0 253.8 80.5 258.5 81.0 262.0C81.5 265.5 82.3 267.8 83.0 270.0C83.7 272.2 83.7 272.6 85.0 275.0C86.3 277.4 89.2 282.1 91.0 284.5C92.8 286.9 93.6 287.8 96.0 289.5C98.4 291.2 103.0 293.7 105.2 294.8C107.5 295.8 107.5 295.7 109.5 296.0C111.5 296.3 114.5 296.8 117.0 296.8C119.5 296.7 122.1 296.5 124.8 295.8C127.4 295.0 130.4 293.9 133.0 292.5C135.6 291.1 138.2 289.1 140.2 287.2C142.3 285.4 143.8 283.6 145.2 281.2C146.8 278.9 148.2 276.2 149.2 273.2C150.3 270.3 151.1 266.6 151.5 263.5C151.9 260.4 151.8 257.8 151.5 254.8C151.2 251.7 150.3 248.0 149.5 245.2C148.7 242.5 147.9 240.8 146.8 238.5C145.6 236.2 144.4 234.0 142.8 231.8C141.1 229.5 138.7 226.8 137.0 225.2C135.3 223.7 133.8 222.8 132.5 222.5C131.2 222.2 130.2 222.9 129.5 223.5C128.8 224.1 128.2 225.1 128.0 226.2C127.8 227.4 127.3 227.5 128.0 230.2C128.7 233.0 131.2 239.6 132.0 242.5C132.8 245.4 132.8 245.0 132.8 247.5C132.8 250.0 132.7 254.2 132.0 257.2C131.3 260.2 129.7 263.5 128.5 265.5C127.3 267.5 125.8 268.6 124.8 269.5C123.7 270.4 123.2 270.6 122.2 271.0C121.3 271.4 120.4 271.8 119.2 272.0C118.1 272.2 116.5 272.2 115.2 272.0C114.0 271.8 113.2 271.7 112.0 271.0C110.8 270.3 109.4 269.3 108.2 268.0C107.1 266.7 105.8 264.4 105.0 263.0C104.2 261.6 104.2 261.6 103.8 259.5C103.2 257.4 102.3 253.4 102.0 250.2C101.7 247.1 101.5 244.8 101.8 240.8C102.0 236.7 103.1 229.8 103.8 226.0C104.4 222.2 104.9 220.9 105.8 218.2C106.6 215.6 107.7 212.6 108.8 210.2C109.8 207.9 110.4 206.4 112.0 204.0C113.6 201.6 116.2 198.1 118.2 195.8C120.3 193.4 122.3 191.5 124.5 189.8C126.7 188.0 129.8 186.2 131.5 185.2C133.2 184.3 133.3 184.3 134.8 184.2C136.2 184.2 138.3 184.5 140.0 185.0C141.7 185.5 143.3 186.1 145.0 187.0C146.7 187.9 148.6 189.1 150.2 190.2C151.9 191.4 152.2 191.5 154.8 194.0C157.2 196.5 161.5 201.0 165.2 205.2C169.0 209.5 173.6 215.6 177.0 219.2C180.4 222.9 183.3 225.1 185.8 227.0C188.2 228.9 189.7 229.5 191.5 230.5C193.3 231.5 194.6 232.2 196.8 232.8C198.9 233.3 202.0 233.8 204.2 234.0C206.5 234.2 207.9 234.1 210.0 233.8C212.1 233.4 215.0 232.5 217.0 231.8C219.0 231.0 220.3 230.3 222.0 229.2C223.7 228.2 225.1 227.4 227.0 225.5C228.9 223.6 231.9 220.2 233.5 217.8C235.1 215.3 235.9 213.2 236.8 210.8C237.6 208.3 238.2 205.0 238.5 203.0C238.8 201.0 238.9 201.0 238.8 199.0C238.6 197.0 238.4 193.9 237.8 191.2C237.1 188.6 236.4 186.0 234.8 183.0C233.1 180.0 229.5 175.2 227.8 173.0Z M154.5 174.2C156.2 173.7 161.9 172.6 165.5 172.2C169.1 171.9 171.9 171.7 176.0 172.0C180.1 172.3 186.4 173.2 190.2 174.0C194.1 174.8 196.2 175.6 199.2 177.0C202.2 178.4 205.6 180.4 208.2 182.5C210.9 184.6 213.4 187.4 215.0 189.8C216.6 192.1 217.2 194.9 217.8 196.5C218.2 198.1 218.1 198.2 218.0 199.2C217.9 200.3 217.9 201.6 217.2 203.0C216.6 204.4 215.5 206.3 214.2 207.5C213.0 208.7 211.0 209.5 209.5 210.0C208.0 210.5 207.0 210.7 205.0 210.5C203.0 210.3 200.1 209.8 197.5 208.8C194.9 207.7 194.1 208.1 189.5 204.0C184.9 199.9 174.7 188.5 170.0 184.2C165.3 180.0 164.0 179.7 161.5 178.2C159.0 176.8 156.4 176.2 155.2 175.5C154.1 174.8 152.8 174.8 154.5 174.2Z", entry: [130, 226], nib: 0.55, lead: 0.43,
      line: [[130,226],[139,241],[143,262],[134,282],[116,293],[99,289],[88,272],[86,250],[92,226],[105,202],[122,181],[143,166],[167,157],[192,159],[216,170],[231,190],[226,211],[206,224],[182,221],[162,206],[153,191],[160,178]],
      out: [116, 293] }
  ];
  // Where each current wanders before its final lap, as fractions of the screen. Landscape and portrait are
  // two different pieces of choreography, not one scaled down.
  var ROUTES = {
    land: [
      [[-0.06, 0.82], [0.14, 0.60], [0.33, 0.74], [0.50, 0.66], [0.58, 0.50]],
      [[1.06, 0.10], [0.82, 0.28], [0.63, 0.20], [0.42, 0.36], [0.31, 0.58], [0.36, 0.68]],
      [[0.10, -0.06], [0.22, 0.20], [0.44, 0.30], [0.68, 0.42], [0.63, 0.56]]
    ],
    port: [
      [[-0.12, 0.96], [0.26, 0.78], [0.72, 0.66], [0.78, 0.52]],
      [[1.12, 0.04], [0.62, 0.16], [0.18, 0.30], [0.12, 0.50], [0.20, 0.60]],
      [[-0.12, 0.30], [0.28, 0.10], [0.86, 0.26], [0.74, 0.44]]
    ]
  };
  var CREAM = [245, 228, 200], GOLD = [232, 205, 143], NAVY = "5,12,26";
  var R = 2;                                     // the ink is drawn at twice the mark's size, then scaled

  // Timeline of a first visit, in milliseconds. Replay runs the same score at a more leisurely tempo.
  var T = { wake: [0, 220, 440], awake: 700, meet: 1650, lap: [1560, 1700, 1800], lapLen: [860, 700, 620],
            hold: 2440, rise: 2660, riseLen: 680, lines: [2720, 480], words: 2920, cap: 5200 };

  var show = null;                               // the running opening, if any
  var masks = null;                              // the three ink pieces, built once

  /* ---------- helpers ---------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function mix(a, b, t) { return a + (b - a) * t; }
  function easeIn(t) { return t * t; }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function span(t, a, len) { return clamp((t - a) / len, 0, 1); }

  // A smooth curve through points (Catmull-Rom), sampled by arc length so u in 0..1 moves at a steady pace.
  function spline(pts) {
    var N = 420, P = [], L = [0];
    function at(i) { return pts[clamp(i, 0, pts.length - 1)]; }
    for (var k = 0; k <= N; k++) {
      var g = k / N * (pts.length - 1), i = Math.min(Math.floor(g), pts.length - 2), t = g - i;
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
    return { pos: pos, length: total };
  }

  /* ---------- the ink: each piece of the mark as a geodesic distance field ---------- */
  function ready() { return !!(masks && masks[0] && masks[1] && masks[2]); }
  function buildMasks(limit) {                   // limit: how many pieces to build now (all, when missing)
    masks = masks || [null, null, null];
    var built = 0;
    PIECES.forEach(function (pc, idx) {
      if (masks[idx] || (limit && built >= limit)) return;
      built++;
      // The piece, drawn into a box of its own size at twice the mark's scale.
      var x0 = (pc.box[0] - 2) * R, y0 = (pc.box[1] - 2) * R, w = (pc.box[2] - pc.box[0] + 4) * R, h = (pc.box[3] - pc.box[1] + 4) * R, n = w * h;
      var cv = doc.createElement("canvas"), c = cv.getContext("2d", { willReadFrequently: true });
      cv.width = w; cv.height = h;
      c.setTransform(R, 0, 0, R, -x0, -y0); c.fillStyle = "#fff"; c.fill(new Path2D(pc.path), "evenodd");
      var px = c.getImageData(0, 0, w, h).data, alpha = new Uint8Array(n), dist = new Int32Array(n), i, x, y;
      for (i = 0; i < n; i++) { alpha[i] = px[i * 4 + 3]; dist[i] = -1; }
      // The entry tip, snapped to the nearest solid pixel.
      var ex = pc.entry[0] * R - x0, ey = pc.entry[1] * R - y0, best = -1, bd = 1e9;
      for (y = Math.max(0, ey - 24); y < Math.min(h, ey + 24); y++) for (x = Math.max(0, ex - 24); x < Math.min(w, ex + 24); x++) {
        i = y * w + x; if (alpha[i] > 128) { var d2 = (x - ex) * (x - ex) + (y - ey) * (y - ey); if (d2 < bd) { bd = d2; best = i; } }
      }
      // Flood from the tip along the stroke (Dial's algorithm with 3-4 chamfer steps): ink distance, not straight-line.
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
      for (i = 0; i < n; i++) f[i] = dist[i] < 0 ? (alpha[i] > 8 ? 1 : -1) : dist[i] / maxD;   // edge pixels the flood missed come last
      var out = doc.createElement("canvas"); out.width = w; out.height = h;
      var oc = out.getContext("2d"), img = oc.createImageData(w, h);
      masks[idx] = { cv: out, ctx: oc, img: img, alpha: alpha, dist: f, w: w, h: h, x0: x0, y0: y0, painted: -1 };
    });
    return masks;
  }
  // Paint one piece at ink progress p (0 nothing, 1 whole piece). The front is a short gold glint that
  // settles into cream behind it.
  function paintPiece(m, p, warm) {
    if (p === m.painted && !warm) return;
    m.painted = warm ? -1 : p;
    var data = m.img.data, dist = m.dist, a = m.alpha, n = m.w * m.h, soft = .06, front = p * (1 + soft) ;
    var cr = CREAM[0], cg = CREAM[1], cb = CREAM[2], gr = GOLD[0], gg = GOLD[1], gb = GOLD[2];
    for (var i = 0, j = 0; i < n; i++, j += 4) {
      var d = dist[i];
      if (d < 0) { data[j + 3] = 0; continue; }
      var v = (front - d) / soft;
      if (v <= 0) { data[j + 3] = 0; continue; }
      if (v > 1) v = 1;
      var g = p >= 1 ? warm || 0 : clamp(1 - (front - d) / .16, 0, 1);  // gold near the front, cream behind
      data[j] = cr + (gr - cr) * g; data[j + 1] = cg + (gg - cg) * g; data[j + 2] = cb + (gb - cb) * g;
      data[j + 3] = (v * a[i]) | 0;
    }
    m.ctx.putImageData(m.img, 0, 0);
  }

  /* ---------- the opening ---------- */
  function start(opts) {
    if (show) return;
    opts = opts || {};
    var replay = !!opts.replay, tempo = replay ? 1.35 : 1;
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches && !opts.force;
    var phone = window.matchMedia("(max-width: 640px)").matches;
    var W = window.innerWidth, H = window.innerHeight, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var veil = doc.createElement("div"); veil.className = "intro-veil cv"; veil.setAttribute("aria-hidden", "true");
    var cv = doc.createElement("canvas"); cv.className = "cv-canvas"; veil.appendChild(cv);
    var skip = doc.createElement("button"); skip.type = "button"; skip.className = "intro-skip";
    skip.textContent = AR ? "تخطّي" : "Skip"; veil.appendChild(skip);
    doc.body.appendChild(veil);
    root.classList.add("intro-live");
    var art = doc.querySelector(".hero-art"), heroMark = doc.getElementById("hero-mark"), logo = doc.querySelector(".logo-mark");
    function hold() { root.classList.add("intro"); if (phone) root.classList.add("intro-mark"); if (replay && art) art.classList.remove("formed"); }
    var ctx = cv.getContext("2d");
    function size() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Where the mark forms: the middle of a computer screen, the upper half of a phone.
      S.form = { s: (phone ? Math.min(W * .5, 230) / 244 : Math.min(H * .27, 240) / 302), cx: W * .5, cy: phone ? H * .42 : H * .5 };
      S.routes = ROUTES[phone ? "port" : "land"].map(function (r, i) {
        var pc = PIECES[i], pts = r.map(function (q) { return [(AR ? 1 - q[0] : q[0]) * W, q[1] * H]; });
        pc.line.forEach(function (q) { pts.push(mark(q, S.form)); });
        var sp = spline(pts), lapStart = 0;
        // u where the final lap begins (the entry tip)
        var wander = spline(r.map(function (q) { return [(AR ? 1 - q[0] : q[0]) * W, q[1] * H]; }).concat([mark(pc.line[0], S.form)]));
        lapStart = wander.length / sp.length;
        return { sp: sp, lapStart: lapStart, len: pc.lead };
      });
    }
    function mark(q, f) { return [f.cx + (q[0] - 122) * f.s, f.cy + (q[1] - 151) * f.s]; }
    var S = { form: null, routes: null, t0: 0, mode: calm ? "calm" : "full", done: false, raf: 0, probe: [], target: null, lines: null, landed: false, handed: false, wordsUp: false, fast: false, offset: 0, fadeIn: replay ? 420 : 0 };
    size();
    window.addEventListener("resize", size);
    var timers = [];
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    if (replay) later(hold, S.fadeIn); else hold();            // on replay the veil fades in first, then the page is held back
    if (calm) { buildMasks(); S.target = phone ? S.form : measureTarget(); }   // calm: the ink flows in where the mark will live

    // Where the mark lands: the first screen's own mark on a computer, the header logo on a phone.
    function measureTarget() {
      var el = phone ? logo : heroMark;
      if (!el) return S.form;
      var r = el.getBoundingClientRect(); if (!r.width) return S.form;
      var lift = phone ? 0 : 24;                         // html.intro holds .hero-art 24px low until it rises
      return { s: r.width / 244, cx: r.left + r.width / 2, cy: r.top + r.height / 2 - lift };
    }
    // The three lines of Act IV end on the page's own geometry.
    function measureLines() {
      var out = [];
      function rect(sel, lift) { var el = doc.querySelector(sel); if (!el) return null; var r = el.getBoundingClientRect(); if (!r.width || r.top > H || r.bottom < 0) return null; return { l: r.left, r: r.right, t: r.top - (lift || 0), b: r.bottom - (lift || 0), w: r.width }; }
      var rule = rect(".hero .eyebrow .rule", 24), em = rect(".hero h1 em", 0), btn = rect(".hero .btn-gold", 24);
      if (rule) out.push({ from: PIECES[0].out, to: [AR ? rule.r : rule.l, rule.t + .5], to2: [AR ? rule.l : rule.r, rule.t + .5] });
      if (em) out.push({ from: PIECES[1].out, to: [AR ? em.r : em.l, em.b - 2], to2: [AR ? em.l : em.r, em.b - 2] });
      if (btn) out.push({ from: PIECES[2].out, to: [AR ? btn.r : btn.l, btn.t + .5], to2: [AR ? btn.l : btn.r, btn.t + .5] });
      return out;
    }

    /* ----- drawing ----- */
    var others = [];
    function ribbon(i, t) {
      var rt = S.routes[i], pc = PIECES[i], tw = T.wake[i];
      if (t < tw) return null;
      // Head progress along the route: wake slowly, travel, then the final lap that eases to a stop.
      var head;
      if (t < T.awake) head = easeIn(span(t, tw, T.awake - tw)) * 0.16 * rt.lapStart / 0.6;
      else if (t < T.lap[i]) head = mix(0.16 * rt.lapStart / 0.6, rt.lapStart, easeInOut(span(t, T.awake, T.lap[i] - T.awake)));
      else head = mix(rt.lapStart, 1, easeOut(span(t, T.lap[i], T.lapLen[i])));
      var lap = span(t, T.lap[i], T.lapLen[i]);
      var alpha = Math.min(1, span(t, tw, 380)) * (1 - easeIn(lap));
      if (alpha <= 0.01) return { head: head, lap: lap, pos: rt.sp.pos(head) };
      var len = rt.len * (0.75 + 0.35 * Math.sin(t / 420 + i)), tail = Math.max(0, head - len), K = 52;
      var pts = [], widths = [], maxW = (phone ? 4.6 : 6.2) * (replay ? 1.1 : 1);
      var pull = smooth(span(t, T.awake - 200, 500)) * (1 - smooth(span(t, T.meet - 400, 500)));   // Act II: they feel each other
      for (var k = 0; k <= K; k++) {
        var f = k / K, u = mix(tail, head, f), p = rt.sp.pos(u), q = rt.sp.pos(Math.min(1, u + .004));
        var tx = q[0] - p[0], ty = q[1] - p[1], tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
        var nx = -ty, ny = tx, free = 1 - smooth((u - rt.lapStart * .55) / (rt.lapStart * .45));
        var off = 0;
        if (free > 0) {
          off += Math.sin(u * 23 + t / 260 + i * 2.1) * 9 * free * (1 - f * .6);       // a living line, not a drawn one
          for (var o = 0; o < others.length; o++) if (o !== i && others[o]) {            // bend toward the other currents
            var dx = others[o][0] - p[0], dy = others[o][1] - p[1], d = Math.hypot(dx, dy);
            if (d < 220 && d > 1) off += (dx * nx + dy * ny) / d * (1 - d / 220) * 26 * pull * free;
          }
        }
        pts.push([p[0] + nx * off, p[1] + ny * off]);
        var ang = Math.atan2(ty, tx), nib = .45 + .55 * Math.abs(Math.sin(ang - pc.nib));   // a broad nib: thick and thin
        var press = Math.pow(Math.sin(Math.PI * Math.pow(f, .75)), .85);   // a brush stroke: fine at the tail, fine again at the tip
        widths.push(maxW * press * nib);
      }
      function poly(scale) {
        ctx.beginPath();
        var L = [], Rr = [];
        for (var k = 0; k <= K; k++) {
          var a = pts[Math.max(0, k - 1)], b = pts[Math.min(K, k + 1)], tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.hypot(tx, ty) || 1;
          var nx = -ty / tl * widths[k] * scale, ny = tx / tl * widths[k] * scale;
          L.push([pts[k][0] + nx, pts[k][1] + ny]); Rr.push([pts[k][0] - nx, pts[k][1] - ny]);
        }
        ctx.moveTo(L[0][0], L[0][1]);
        for (k = 1; k <= K; k++) ctx.lineTo(L[k][0], L[k][1]);
        for (k = K; k >= 0; k--) ctx.lineTo(Rr[k][0], Rr[k][1]);
        ctx.closePath();
      }
      var g = ctx.createLinearGradient(pts[0][0], pts[0][1], pts[K][0], pts[K][1]);
      g.addColorStop(0, "rgba(232,205,143,0)"); g.addColorStop(.55, "rgba(232,205,143," + (.75 * alpha) + ")"); g.addColorStop(1, "rgba(245,228,200," + alpha + ")");
      poly(3); ctx.fillStyle = "rgba(201,164,92," + (.08 * alpha) + ")"; ctx.fill();   // a soft bloom under the stroke, no blur
      poly(1); ctx.fillStyle = g; ctx.fill();
      return { head: head, lap: lap, pos: pts[K] };
    }

    function drawMark(f, alpha, warm) {
      if (!masks) return;
      ctx.globalAlpha = alpha;
      masks.forEach(function (m, i) {
        var p = f.p ? f.p[i] : 1;
        if (!m || p <= 0) return;
        paintPiece(m, p, warm);
        ctx.drawImage(m.cv, f.cx + (m.x0 / R - 122) * f.s, f.cy + (m.y0 / R - 151) * f.s, m.w / R * f.s, m.h / R * f.s);
      });
      ctx.globalAlpha = 1;
    }
    function drawLine(ln, f, grow, alpha) {
      var a = mark(ln.from, f), b = ln.to, c = ln.to2;
      var c1 = [a[0], mix(a[1], b[1], .8)], c2 = [mix(a[0], b[0], .55), b[1]];
      ctx.beginPath(); ctx.moveTo(a[0], a[1]);
      var N = 40, last = a;
      for (var k = 1; k <= N; k++) {
        var s = k / N; if (s > grow) break;
        var x = Math.pow(1 - s, 3) * a[0] + 3 * Math.pow(1 - s, 2) * s * c1[0] + 3 * (1 - s) * s * s * c2[0] + s * s * s * b[0];
        var y = Math.pow(1 - s, 3) * a[1] + 3 * Math.pow(1 - s, 2) * s * c1[1] + 3 * (1 - s) * s * s * c2[1] + s * s * s * b[1];
        ctx.lineTo(x, y); last = [x, y];
      }
      if (grow > 1) { var g2 = Math.min(1, grow - 1); ctx.lineTo(mix(b[0], c[0], g2), mix(b[1], c[1], g2)); }
      ctx.strokeStyle = "rgba(232,205,143," + alpha + ")"; ctx.lineWidth = 1.1; ctx.lineCap = "round"; ctx.stroke();
    }

    /* ----- the frame ----- */
    function frame(now) {
      if (S.done) return;
      if (!S.t0) S.t0 = now;
      var t = (now - S.t0) / tempo + S.offset;
      if (S.fast) t = (S.mode === "calm" ? 2000 : T.rise) + (now - S.fastAt) * 1.8;        // Skip: straight to the ascension, briskly
      S.probe.push(now);
      var veilA = Math.min(1, S.fadeIn ? (now - S.t0) / S.fadeIn : 1);
      ctx.clearRect(0, 0, W, H);
      var mode = S.mode, f = S.form, i, RISE = mode === "calm" ? 2000 : T.rise;   // the calm version has no acts to wait for
      if (t < RISE) {
        ctx.fillStyle = "rgba(" + NAVY + "," + veilA + ")"; ctx.fillRect(0, 0, W, H);
        if (mode === "full") {
          if (t > 60 && !ready()) buildMasks(1);               // built one piece per frame during the awakening, never before first paint
          var heads = [], ps = [];
          for (i = 0; i < 3; i++) { var rb = ribbon(i, t); heads.push(rb ? rb.pos : null); ps.push(rb ? easeOut(rb.lap) : 0); }
          others = heads;
          if (ready()) {
            var hold = span(t, T.hold, RISE - T.hold);
            drawMark({ s: f.s, cx: f.cx, cy: f.cy, p: ps }, 1, hold > 0 ? .5 * Math.sin(hold * Math.PI) : 0);
          }
        } else {                                              // calm: the ink simply flows in, in its place
          if (!ready()) buildMasks();
          var cp = easeInOut(span(t, 200, 1500)), cf = S.target || f;
          drawMark({ s: cf.s, cx: cf.cx, cy: cf.cy, p: [cp, cp, cp] }, 1, 0);
        }
      } else {
        // IV. Ascension: one expansion and the glide; three lines leave the mark and become the page.
        if (!S.target) {
          if (!ready()) buildMasks();
          S.target = measureTarget(); S.lines = measureLines();
          if (!S.handed) { S.handed = true; doc.dispatchEvent(new CustomEvent("ff-intro-hand")); }
          veil.classList.add("through"); skip.style.opacity = 0;   // the page is usable from here on
        }
        var k = span(t, RISE, T.riseLen), e = easeOutQuint(k), tg = S.target;
        var swell = phone ? 1 + .14 * Math.sin(Math.min(1, k * 1.6) * Math.PI) : 1;   // on a phone the one expansion is a breath before the descent
        var g = mode === "calm" ? { s: tg.s, cx: tg.cx, cy: tg.cy } : { s: mix(f.s, tg.s, e) * swell, cx: mix(f.cx, tg.cx, e), cy: mix(f.cy, tg.cy, e) };
        ctx.fillStyle = "rgba(" + NAVY + "," + (1 - easeOut(span(t, RISE, T.riseLen * .8))) + ")"; ctx.fillRect(0, 0, W, H);
        var landAt = RISE + T.riseLen;
        if (!S.wordsUp && t >= (phone ? landAt : T.words)) { S.wordsUp = true; root.classList.remove("intro"); }   // a phone's words wait for the mark to land
        if (mode !== "calm" && !phone && S.lines) for (i = 0; i < S.lines.length; i++) {
          var ls = T.lines[0] + i * 70, grow = span(t, ls, T.lines[1]) * 1.6, la = Math.min(1, span(t, ls, 160)) * (1 - easeIn(span(t, ls + T.lines[1] + 120, 420)));
          if (la > 0 && grow > 0) drawLine(S.lines[i], g, grow, la);
        }
        if (!S.landed && t >= landAt) {
          S.landed = true; root.classList.remove("intro-mark"); root.classList.remove("intro");
          doc.dispatchEvent(new CustomEvent("ff-intro-end"));
          if (replay && art) art.classList.add("formed");
        }
        var ma = 1 - easeIn(span(t, landAt + (phone ? 120 : 350), phone ? 420 : 900));
        if (ma > 0) drawMark({ s: g.s, cx: g.cx, cy: g.cy }, ma, 0);
        if (ma <= 0) return end();
      }
      S.raf = requestAnimationFrame(frame);
    }

    function end() {
      if (S.done) return; S.done = true;
      cancelAnimationFrame(S.raf); timers.forEach(clearTimeout);
      window.removeEventListener("resize", size); doc.removeEventListener("keydown", onKey);
      root.classList.remove("intro"); root.classList.remove("intro-mark"); root.classList.remove("intro-live");
      if (veil.parentNode) veil.parentNode.removeChild(veil);
      if (masks) masks.forEach(function (m) { if (m) m.painted = -1; });
      show = null;
      if (replay && replayBtn) replayBtn.focus({ preventScroll: true });
    }
    function skipNow() {
      if (S.done || S.fast) return;
      S.fast = true; S.fastAt = performance.now();
      buildMasks();
    }
    S.skip = skipNow;
    function onKey(e) { if (e.key === "Escape") skipNow(); }
    skip.addEventListener("click", skipNow);
    doc.addEventListener("keydown", onKey);
    // A device that cannot keep up gets the calm version; whatever happens, the page is reachable.
    later(function () {                                         // after fonts and layout have settled
      var p = S.probe; if (p.length < 11 || S.mode !== "full") return;
      var dt = (p[p.length - 1] - p[p.length - 11]) / 10;
      if (dt > 85) { S.mode = "calm"; S.offset = -((performance.now() - S.t0) / tempo) + 200; buildMasks(); }
    }, 950 * tempo);
    later(skipNow, T.cap * tempo);
    try { sessionStorage.setItem("ff-intro", "1"); } catch (e) {}
    show = S;
    S.raf = requestAnimationFrame(frame);
  }

  /* ---------- wiring ---------- */
  var replayBtn = doc.getElementById("replay-intro");
  if (replayBtn) {
    replayBtn.hidden = false;
    replayBtn.addEventListener("click", function () { if (!show) start({ replay: true }); });
  }
  window.FFIntro = { replay: function () { if (!show) start({ replay: true }); }, skip: function () { if (show) show.skip(); } };
  if (root.classList.contains("intro")) {
    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", function () { start(); }); else start();
  }
})();
