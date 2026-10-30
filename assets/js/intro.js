// FellowFlow opening: "The Butterfly Effect" (30 Oct 2026). One movement, about 2.2 seconds, once per tab.
// A gold line draws the mark from the top while a second one answers from the bottom; where they meet, the
// negative space is the butterfly. The shape fills, its wings open once, a single ring runs out through the
// composition, and the mark glides into its place on the page while the words rise under it. Skip is there
// from the first frame. Pure SVG, Web Animations and CSS; no library, no particles, no blur.
// This file loads in <head> without defer so the page can hide its first screen before the first paint.
(function () {
  var root = document.documentElement;
  var seen = false; try { seen = sessionStorage.getItem("ff-intro") === "1"; } catch (e) {}
  if (seen || !window.requestAnimationFrame || !("animate" in Element.prototype)) return; // the page simply shows
  root.classList.add("intro");
  var phone = window.matchMedia("(max-width: 640px)").matches;
  if (phone) root.classList.add("intro-mark");
  var PATH_A = "M154.0 19.5C152.0 16.9 149.2 13.9 147.0 12.0C144.8 10.1 143.4 9.1 141.0 8.0C138.6 6.9 135.2 5.9 132.5 5.5C129.8 5.1 127.5 5.2 125.0 5.5C122.5 5.8 120.0 6.1 117.2 7.0C114.5 7.9 111.0 9.5 108.5 11.0C106.0 12.5 104.0 14.5 102.5 15.8C101.0 17.0 100.9 17.1 99.8 18.8C98.6 20.4 96.6 23.0 95.5 25.5C94.4 28.0 93.5 30.7 93.0 34.0C92.5 37.3 92.6 42.0 92.8 45.2C92.9 48.5 93.3 50.8 94.0 53.5C94.7 56.2 96.0 59.1 97.0 61.2C98.0 63.4 99.1 65.1 100.0 66.5C100.9 67.9 101.0 68.2 102.2 69.5C103.5 70.8 106.4 73.4 107.8 74.2C109.1 75.1 109.8 74.8 110.5 74.8C111.2 74.7 111.5 74.5 112.0 74.0C112.5 73.5 113.5 72.8 113.8 71.5C114.0 70.2 114.1 68.2 113.8 66.5C113.4 64.8 112.2 62.8 111.8 61.0C111.2 59.2 110.9 58.1 110.8 55.8C110.6 53.4 110.4 49.7 110.8 47.0C111.1 44.3 112.1 41.6 112.8 39.8C113.4 37.9 113.9 37.2 114.8 36.0C115.6 34.8 116.8 33.6 117.8 32.8C118.8 31.9 119.5 31.5 120.8 31.0C122.0 30.5 123.8 30.1 125.0 30.0C126.2 29.9 127.3 30.2 128.2 30.5C129.2 30.8 129.4 30.8 130.5 31.8C131.6 32.8 133.7 35.0 134.8 36.5C135.8 38.0 136.2 39.4 136.8 41.0C137.3 42.6 137.8 42.8 138.0 46.2C138.2 49.7 138.4 56.9 138.0 61.5C137.6 66.1 136.6 70.2 135.8 73.8C134.9 77.3 134.3 79.6 133.0 83.0C131.7 86.4 129.5 91.3 128.0 94.2C126.5 97.2 125.4 98.8 124.0 100.8C122.6 102.8 121.8 104.1 119.8 106.2C117.7 108.4 113.7 112.2 111.8 113.8C109.8 115.3 109.6 115.2 108.2 115.8C106.9 116.3 105.1 116.8 103.5 117.0C101.9 117.2 100.8 117.2 98.8 116.8C96.8 116.2 93.9 115.3 91.5 114.0C89.1 112.7 86.5 110.6 84.5 109.0C82.5 107.4 83.2 108.5 79.8 104.2C76.2 100.0 67.7 88.4 63.5 83.5C59.3 78.6 57.2 77.0 54.8 75.0C52.3 73.0 50.8 72.2 49.0 71.2C47.2 70.3 46.0 69.8 44.2 69.2C42.5 68.7 40.7 68.2 38.5 68.0C36.3 67.8 33.4 67.8 31.2 68.0C29.1 68.2 27.5 68.5 25.5 69.2C23.5 70.0 21.3 71.0 19.2 72.5C17.2 74.0 14.7 76.4 13.0 78.5C11.3 80.6 10.2 82.4 9.2 85.0C8.2 87.6 7.3 91.5 7.0 94.0C6.7 96.5 6.9 97.4 7.2 99.8C7.6 102.1 8.2 105.5 9.2 108.2C10.2 111.0 11.3 113.2 13.2 116.0C15.2 118.8 18.7 122.7 21.0 125.0C23.3 127.3 24.9 128.3 27.0 129.8C29.1 131.2 30.7 132.3 33.8 133.8C36.8 135.2 40.9 137.2 45.5 138.5C50.1 139.8 56.2 141.0 61.2 141.5C66.3 142.0 70.1 142.2 75.8 141.8C81.4 141.3 89.6 140.0 95.0 138.8C100.4 137.5 103.7 136.3 108.0 134.5C112.3 132.7 117.5 129.9 121.0 127.8C124.5 125.6 126.4 123.8 128.8 121.8C131.1 119.7 132.6 118.3 135.2 115.2C137.9 112.2 141.8 107.2 144.5 103.2C147.2 99.2 149.3 96.2 151.8 91.2C154.2 86.2 157.2 78.8 159.0 73.2C160.8 67.7 161.9 62.9 162.5 57.8C163.1 52.6 162.9 46.1 162.8 42.5C162.6 38.9 162.2 38.5 161.5 36.0C160.8 33.5 160.0 30.5 158.8 27.8C157.5 25.0 156.0 22.1 154.0 19.5Z M30.0 96.5C30.5 95.2 31.6 94.3 32.5 93.5C33.4 92.7 34.2 92.1 35.5 91.8C36.8 91.4 38.8 91.3 40.2 91.5C41.7 91.7 42.4 91.8 44.2 92.8C46.1 93.8 48.2 94.8 51.2 97.5C54.3 100.2 59.8 106.0 62.8 108.8C65.7 111.5 66.6 112.2 68.8 113.8C70.9 115.2 73.2 116.8 75.5 117.8C77.8 118.8 81.4 119.3 82.8 119.8C84.1 120.2 83.7 120.2 83.5 120.5C83.3 120.8 82.6 121.4 81.8 121.8C80.9 122.1 80.8 122.3 78.2 122.5C75.8 122.7 69.9 123.1 66.8 123.0C63.6 122.9 62.5 122.8 59.2 122.0C56.0 121.2 50.8 119.6 47.5 118.2C44.2 116.9 42.1 115.9 39.5 114.0C36.9 112.1 33.4 108.8 31.8 107.0C30.1 105.2 30.2 104.5 29.8 103.5C29.3 102.5 29.2 102.4 29.2 101.2C29.3 100.1 29.5 97.8 30.0 96.5Z M230.8 55.0C229.2 53.0 226.5 50.5 224.8 49.0C223.0 47.5 221.6 46.9 220.2 46.2C218.9 45.6 218.2 45.5 216.8 45.2C215.3 45.0 213.6 44.7 211.8 44.8C209.9 44.8 207.9 44.7 205.5 45.5C203.1 46.3 199.2 48.7 197.5 49.8C195.8 50.8 196.4 50.4 195.2 51.8C194.1 53.1 192.0 55.7 190.8 57.8C189.5 59.8 189.7 59.3 188.0 64.0C186.3 68.7 182.6 81.0 180.8 86.0C178.9 91.0 178.6 91.0 176.8 94.2C174.9 97.5 172.1 102.0 169.8 105.2C167.4 108.5 165.2 111.0 162.5 113.8C159.8 116.5 158.1 118.6 153.8 122.0C149.4 125.4 141.5 130.8 136.2 134.0C131.0 137.2 127.1 138.8 122.2 141.0C117.4 143.2 112.9 145.0 107.0 147.0C101.1 149.0 95.8 150.8 87.0 153.0C78.2 155.2 62.2 158.3 54.0 160.2C45.8 162.2 41.6 163.5 37.5 164.8C33.4 166.0 32.0 166.6 29.2 168.0C26.5 169.4 24.0 170.7 21.0 173.0C18.0 175.3 13.3 179.9 11.2 182.0C9.2 184.1 9.6 183.8 8.8 185.5C7.9 187.2 6.6 190.2 6.0 192.0C5.4 193.8 5.4 194.5 5.2 196.0C5.1 197.5 5.1 199.7 5.2 201.2C5.4 202.8 5.5 203.6 6.0 205.2C6.5 206.9 7.4 209.2 8.5 211.0C9.6 212.8 11.0 214.8 12.5 216.2C14.0 217.8 16.1 219.1 17.5 220.0C18.9 220.9 19.1 221.2 21.0 221.8C22.9 222.3 26.9 223.2 29.0 223.5C31.1 223.8 32.0 223.5 33.8 223.2C35.5 223.0 37.5 222.6 39.5 221.8C41.5 220.9 44.0 219.7 46.0 218.0C48.0 216.3 50.3 213.6 51.8 211.8C53.2 209.9 53.3 209.7 54.5 207.0C55.7 204.3 57.7 198.2 58.8 195.8C59.8 193.2 59.9 193.3 60.8 192.0C61.6 190.7 62.1 189.5 63.8 187.8C65.4 186.0 68.4 183.1 70.5 181.5C72.6 179.9 74.0 179.3 76.5 178.0C79.0 176.7 79.7 176.2 85.8 173.8C91.8 171.3 105.1 166.7 113.0 163.5C120.9 160.3 127.4 157.5 133.2 154.8C139.1 152.0 143.8 149.4 148.2 146.8C152.7 144.1 156.0 141.9 160.0 139.0C164.0 136.1 167.4 133.8 172.5 129.2C177.6 124.8 186.2 115.9 190.8 112.0C195.3 108.1 195.7 108.2 200.0 105.8C204.3 103.2 212.8 99.2 216.5 97.0C220.2 94.8 220.5 94.0 222.2 92.5C224.0 91.0 225.2 89.9 226.8 88.0C228.3 86.1 230.3 83.3 231.5 81.2C232.7 79.2 233.2 77.3 233.8 75.5C234.3 73.7 234.6 71.9 234.8 70.2C234.9 68.6 234.9 67.3 234.8 65.8C234.6 64.2 234.4 62.5 233.8 60.8C233.1 59.0 232.2 57.0 230.8 55.0Z";
  var PATH_B = "M227.8 173.0C226.0 170.8 226.3 171.2 224.5 169.8C222.7 168.2 220.2 165.9 217.0 164.0C213.8 162.1 209.6 159.9 205.0 158.2C200.4 156.6 194.1 155.1 189.5 154.2C184.9 153.4 180.4 153.2 177.2 153.0C174.1 152.8 173.8 152.8 170.5 153.0C167.2 153.2 162.7 153.5 157.8 154.5C152.8 155.5 145.0 157.7 140.8 159.0C136.5 160.3 135.5 160.9 132.5 162.2C129.5 163.6 126.1 165.1 122.5 167.2C118.9 169.4 114.6 172.0 111.0 175.0C107.4 178.0 103.3 182.5 101.0 185.0C98.7 187.5 98.5 188.0 97.0 190.2C95.5 192.5 93.8 194.8 92.0 198.5C90.2 202.2 87.7 207.4 86.0 212.2C84.3 217.1 82.8 224.0 82.0 227.5C81.2 231.0 81.3 229.9 81.0 233.5C80.7 237.1 80.0 244.2 80.0 249.0C80.0 253.8 80.5 258.5 81.0 262.0C81.5 265.5 82.3 267.8 83.0 270.0C83.7 272.2 83.7 272.6 85.0 275.0C86.3 277.4 89.2 282.1 91.0 284.5C92.8 286.9 93.6 287.8 96.0 289.5C98.4 291.2 103.0 293.7 105.2 294.8C107.5 295.8 107.5 295.7 109.5 296.0C111.5 296.3 114.5 296.8 117.0 296.8C119.5 296.7 122.1 296.5 124.8 295.8C127.4 295.0 130.4 293.9 133.0 292.5C135.6 291.1 138.2 289.1 140.2 287.2C142.3 285.4 143.8 283.6 145.2 281.2C146.8 278.9 148.2 276.2 149.2 273.2C150.3 270.3 151.1 266.6 151.5 263.5C151.9 260.4 151.8 257.8 151.5 254.8C151.2 251.7 150.3 248.0 149.5 245.2C148.7 242.5 147.9 240.8 146.8 238.5C145.6 236.2 144.4 234.0 142.8 231.8C141.1 229.5 138.7 226.8 137.0 225.2C135.3 223.7 133.8 222.8 132.5 222.5C131.2 222.2 130.2 222.9 129.5 223.5C128.8 224.1 128.2 225.1 128.0 226.2C127.8 227.4 127.3 227.5 128.0 230.2C128.7 233.0 131.2 239.6 132.0 242.5C132.8 245.4 132.8 245.0 132.8 247.5C132.8 250.0 132.7 254.2 132.0 257.2C131.3 260.2 129.7 263.5 128.5 265.5C127.3 267.5 125.8 268.6 124.8 269.5C123.7 270.4 123.2 270.6 122.2 271.0C121.3 271.4 120.4 271.8 119.2 272.0C118.1 272.2 116.5 272.2 115.2 272.0C114.0 271.8 113.2 271.7 112.0 271.0C110.8 270.3 109.4 269.3 108.2 268.0C107.1 266.7 105.8 264.4 105.0 263.0C104.2 261.6 104.2 261.6 103.8 259.5C103.2 257.4 102.3 253.4 102.0 250.2C101.7 247.1 101.5 244.8 101.8 240.8C102.0 236.7 103.1 229.8 103.8 226.0C104.4 222.2 104.9 220.9 105.8 218.2C106.6 215.6 107.7 212.6 108.8 210.2C109.8 207.9 110.4 206.4 112.0 204.0C113.6 201.6 116.2 198.1 118.2 195.8C120.3 193.4 122.3 191.5 124.5 189.8C126.7 188.0 129.8 186.2 131.5 185.2C133.2 184.3 133.3 184.3 134.8 184.2C136.2 184.2 138.3 184.5 140.0 185.0C141.7 185.5 143.3 186.1 145.0 187.0C146.7 187.9 148.6 189.1 150.2 190.2C151.9 191.4 152.2 191.5 154.8 194.0C157.2 196.5 161.5 201.0 165.2 205.2C169.0 209.5 173.6 215.6 177.0 219.2C180.4 222.9 183.3 225.1 185.8 227.0C188.2 228.9 189.7 229.5 191.5 230.5C193.3 231.5 194.6 232.2 196.8 232.8C198.9 233.3 202.0 233.8 204.2 234.0C206.5 234.2 207.9 234.1 210.0 233.8C212.1 233.4 215.0 232.5 217.0 231.8C219.0 231.0 220.3 230.3 222.0 229.2C223.7 228.2 225.1 227.4 227.0 225.5C228.9 223.6 231.9 220.2 233.5 217.8C235.1 215.3 235.9 213.2 236.8 210.8C237.6 208.3 238.2 205.0 238.5 203.0C238.8 201.0 238.9 201.0 238.8 199.0C238.6 197.0 238.4 193.9 237.8 191.2C237.1 188.6 236.4 186.0 234.8 183.0C233.1 180.0 229.5 175.2 227.8 173.0Z M154.5 174.2C156.2 173.7 161.9 172.6 165.5 172.2C169.1 171.9 171.9 171.7 176.0 172.0C180.1 172.3 186.4 173.2 190.2 174.0C194.1 174.8 196.2 175.6 199.2 177.0C202.2 178.4 205.6 180.4 208.2 182.5C210.9 184.6 213.4 187.4 215.0 189.8C216.6 192.1 217.2 194.9 217.8 196.5C218.2 198.1 218.1 198.2 218.0 199.2C217.9 200.3 217.9 201.6 217.2 203.0C216.6 204.4 215.5 206.3 214.2 207.5C213.0 208.7 211.0 209.5 209.5 210.0C208.0 210.5 207.0 210.7 205.0 210.5C203.0 210.3 200.1 209.8 197.5 208.8C194.9 207.7 194.1 208.1 189.5 204.0C184.9 199.9 174.7 188.5 170.0 184.2C165.3 180.0 164.0 179.7 161.5 178.2C159.0 176.8 156.4 176.2 155.2 175.5C154.1 174.8 152.8 174.8 154.5 174.2Z";
  var T = { draw: 950, fill: 850, open: 1100, ripple: 1200, hand: 1650 };
  var ended = false, veil, skip, markG, timers = [];
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function build() {
    veil = document.createElement("div"); veil.className = "intro-veil"; veil.setAttribute("aria-hidden", "true");
    veil.innerHTML =
      '<svg class="intro-mark" viewBox="-80 -80 404 462" width="404" height="462">' +
        '<circle class="intro-ring" cx="122" cy="151" r="120"/>' +
        '<g class="intro-fill"><path d="' + PATH_A + ' ' + PATH_B + '" fill-rule="evenodd"/></g>' +
        '<path class="intro-line a" d="' + PATH_A + '"/>' +
        '<path class="intro-line b" d="' + PATH_B + '"/>' +
      '</svg>';
    skip = document.createElement("button"); skip.type = "button"; skip.className = "intro-skip";
    skip.textContent = root.lang === "ar" ? "تخطّي" : "Skip";
    veil.appendChild(skip);
    document.body.appendChild(veil);
    markG = veil.querySelector(".intro-mark");
    skip.addEventListener("click", function () { finish(true); });
    document.addEventListener("keydown", onKey);
  }
  function onKey(e) { if (e.key === "Escape") finish(true); }

  function play() {
    var E = "cubic-bezier(.22,.61,.36,1)";
    // Phase one and two: two lines, one from the top, one from the bottom, drawn at the same time.
    veil.querySelectorAll(".intro-line").forEach(function (p, i) {
      var len = p.getTotalLength();
      p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: T.draw, delay: i * 90, easing: "cubic-bezier(.45,0,.2,1)", fill: "forwards" });
      p.animate([{ opacity: 1, offset: .55 }, { opacity: 0 }], { duration: T.fill + 500, delay: T.draw - 150, fill: "forwards" });
    });
    // Phase three: the shape fills from inside the lines, then the wings open once, and one ring runs out.
    var fill = veil.querySelector(".intro-fill");
    fill.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 520, delay: T.fill, easing: "ease-out", fill: "forwards" });
    markG.animate([{ transform: "perspective(900px) rotateY(-22deg) scale(.94)" }, { transform: "perspective(900px) rotateY(0deg) scale(1)" }],
      { duration: 520, delay: T.open, easing: E, fill: "forwards" });
    var ring = veil.querySelector(".intro-ring");
    ring.animate([{ transform: "scale(.35)", opacity: 0 }, { opacity: .55, offset: .15 }, { transform: "scale(1.9)", opacity: 0 }],
      { duration: 900, delay: T.ripple, easing: "cubic-bezier(.2,.6,.3,1)", fill: "forwards" });
    later(function () { finish(false); }, T.hand);
  }

  // Phase four and five: the veil dissolves, the mark glides to its place (the first screen's mark on a
  // computer, the logo in the header on a phone), and the words rise behind it.
  function finish(skipped) {
    if (ended) return; ended = true;
    timers.forEach(clearTimeout);
    document.removeEventListener("keydown", onKey);
    try { sessionStorage.setItem("ff-intro", "1"); } catch (e) {}
    var target = phone ? document.querySelector(".logo-mark") : document.getElementById("hero-mark");
    var dur = skipped ? 420 : 760, E = "cubic-bezier(.22,.61,.36,1)";
    if (skipped) { veil.querySelectorAll(".intro-line").forEach(function (p) { p.style.opacity = 0; }); veil.querySelector(".intro-fill").style.opacity = 1; }
    if (!phone) root.classList.remove("intro");                       // on a computer the words start rising now
    document.dispatchEvent(new CustomEvent("ff-intro-hand"));         // hero.js draws the still city behind them
    if (skip) skip.style.opacity = 0;
    var from = veil.querySelector(".intro-fill path").getBoundingClientRect();
    if (target && from.width) {
      var to = target.getBoundingClientRect();
      var s = to.width / from.width;
      var dx = (to.left + to.width / 2) - (from.left + from.width / 2), dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      markG.animate([{ transform: "translate(0,0) scale(1)" }, { transform: "translate(" + dx + "px," + dy + "px) scale(" + s + ")" }],
        { duration: dur, easing: E, fill: "forwards", composite: "replace" });
    }
    veil.animate([{ backgroundColor: "rgba(5,12,26,1)" }, { backgroundColor: "rgba(5,12,26,0)" }], { duration: dur * .9, easing: "ease-out", fill: "forwards" });
    later(function () {
      root.classList.remove("intro-mark");                            // the header logo takes over on a phone
      root.classList.remove("intro");                                 // on a phone the words wait until the mark has landed
      document.dispatchEvent(new CustomEvent("ff-intro-end"));        // the first screen's mark fades in and breathes
      veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" }).onfinish = function () { if (veil.parentNode) veil.parentNode.removeChild(veil); };
    }, dur - 60);
  }

  function start() {
    build();
    // A device that cannot keep up gets the end state at once, not a stutter.
    // The first frames of any page are slow (fonts, layout), so the probe starts after them.
    var frames = 0, t0 = 0;
    function probe(now) { if (!t0) { t0 = now; return requestAnimationFrame(probe); } frames++; if (frames < 10) requestAnimationFrame(probe); else if ((now - t0) / frames > 100) finish(true); }
    setTimeout(function () { requestAnimationFrame(probe); }, 450);
    play();
    later(function () { finish(true); }, 4000);                       // whatever happens, the page is reachable
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
