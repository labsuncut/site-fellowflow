// FellowFlow brand site: the world behind the page (assets/js/world.js) and its controls, the header,
// the phone menu, reveals, work recordings, and the first-look form. Each language has its own page:
// English is index.html, Arabic is ar/index.html, built from index.html and the AR list below by
// tools/build-ar.mjs. After changing any words in either file, run `node tools/build-ar.mjs` and commit both.
(function () {
  var WHATSAPP = "962796237444";
  var root = document.documentElement;
  if (root.lang !== "ar" && /[?&]lang=ar\b/.test(location.search)) {
    location.replace("ar/" + location.search.replace(/([?&])lang=ar\b&?/, "$1").replace(/[?&]$/, "") + location.hash);
    return;
  }
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;
  var page = root.lang === "ar" ? "ar" : "en";

  // Arabic text (the source for ar/index.html). English lives in index.html.
  var AR = {
    skip: "انتقل إلى المحتوى",
    nav_solutions: "حلولنا", nav_work: "أعمالنا", nav_partnership: "الشراكة", nav_about: "من نحن", nav_cta: "لنبدأ معًا",
    hero_eyebrow: "الهوية الرقمية للأعمال · عمّان",
    hero_h1: "حوِّل ما هو قائم. <em>وابتكر ما هو آتٍ.</em>",
    hero_lede: "نبني الهوية الرقمية للأعمال في عمّان، بالعربية والإنجليزية: الموقع، وكيف يجده العملاء ويصلون إليه عبر Google ومساعدي الذكاء الاصطناعي.",
    hero_cta1: "لنبدأ معًا", hero_cta2: "شاهد أعمالنا",
    beat_k: "العالم", beat_0: "ساكن.", beat_1: "الاتصال الأول.", beat_2: "الاتصالات تنتشر.", beat_3: "كلٌّ حيّ.",
    ctl_skip: "تخطَّ الافتتاح", ctl_pause: "أوقف العالم", ctl_resume: "أكمل العالم", ctl_replay: "شاهد من جديد", ctl_play: "شغّل الافتتاح",
    scroll_hint: "مرّر لتتبع الاتصال",
    act_quote: "اتصال واحد يغيّر عالمًا. ثم تنتشر الاتصالات.",
    sol_eyebrow: "حلولنا", sol_h: "منظومة واحدة، <em>لا قائمة خدمات.</em>",
    sol_p: "كل شيء يتصل بموقع واحد هو ملكك. كل جزء يغذّي الآخر: أن يجدوك يقود إلى أن يفهموك، وهذا يقود إلى أن يصلوا إليك.",
    n1_k: "يجدونك", n1_h: "الظهور في البحث", n1_p: "أساسيات البحث مُنجزة كما يجب، ليُظهر Google والخرائط الاسم الصحيح والمكان وساعات العمل.",
    n2_k: "يجدونك", n2_h: "إجابات الذكاء الاصطناعي", n2_p: "نشاطك مقروء لمساعدي الذكاء الاصطناعي، فتكون جزءًا من الإجابة حين يسأل أحدهم.",
    n3_k: "يجدونك", n3_h: "رعاية ملف Google", n3_p: "ملفك على Google Business دقيق وحيّ دائمًا: ساعات العمل والصور والمنشورات والردود.",
    n0_k: "المركز", n0_h: "موقعك", n0_p: "مبنيّ بالعربية والإنجليزية، سريع على الهاتف، مع اتصال وواتساب واتجاهات بلمسة واحدة. نطاقك باسمك. مفحوص وفق قائمة الإطلاق لدينا قبل النشر.",
    n4_k: "يصلون إليك", n4_h: "الطلب والأتمتة", n4_p: "الطلب أونلاين، والأتمتة الصغيرة التي تردّ وتحجز وتؤكّد بينما تعمل أنت.",
    n5_k: "يبقى", n5_h: "الرعاية والنمو", n5_p: "تعديلات مع تطوّر نشاطك، كلٌّ منها متفق عليه كتابيًا أولًا، مع تقارير نمو شهرية.",
    sol_note: "كل مشروع يبدأ بنظرة أولى مجانية. نطاق مكتوب وسعر واضح قبل أي عمل.",
    work_eyebrow: "أعمال مختارة", work_h: "صُمّمت <em>لأعمال حقيقية.</em>",
    work_p: "أنشطة تجارية في عمّان صمّمنا لها، معروضة بما هي عليه بالضبط.",
    st_trial: "تجربة حيّة", st_trial_own: "تجربة حيّة · ملك أحد المؤسسين", st_own: "حيّ · موقعنا",
    w_apollo_p: "نادٍ رياضي في عمّان. موقع بلغتين مبنيّ حول طريقة قرار الأعضاء: الحصص والمدرّبون وساعات العمل، ولمسة واحدة للاتصال أو المراسلة.",
    w_stoic_p: "علامة يملكها أحد مؤسسينا، مبنية على الأسس نفسها التي نقدّمها لعملائنا.",
    w_ff_p: "هذا الموقع. نحن أول عملائنا، وكل ما هنا يخضع لقائمة الفحص نفسها.",
    view: "زيارة الموقع", view_here: "أنت هنا",
    legend: "<b>تجربة حيّة:</b> نشاط تجاري حقيقي يستخدم الموقع بينما يمرّ بفحوصات الإطلاق لدينا. لا نعرض نتائج لا نستطيع إثباتها.",
    part_eyebrow: "الشراكة", part_h: "نفهم أولًا. <em>ثم نبني.</em>",
    part_p: "أربع خطوات، في العلن. تعرف دائمًا ما الذي يُنجز، وكم يكلّف، ومتى يكتمل.",
    s1_h: "الفهم", s1_p: "نستمع إليك، وننظر إلى كيف يجدك العملاء اليوم.",
    s2_h: "التوصية", s2_p: "نخبرك بما يستحق العمل. نطاق مكتوب وسعر واضح أولًا.",
    s3_h: "البناء", s3_p: "نصمّم ونبني بالعربية والإنجليزية، حول الطريقة التي يقرّر بها عملاؤك.",
    s4_h: "الفحص والإطلاق", s4_p: "كل رابط وكل زر وكل مقاس هاتف مفحوص قبل النشر.",
    p1_h: "نفهم قبل أن نوصي.", p1_p: "نستمع أولًا وننظر إلى الأدلة. إن كنت تحتاج تعديلًا صغيرًا، أو لا شيء على الإطلاق، سنقول لك ذلك.",
    p2_h: "نبني لغاية واضحة.", p2_p: "التصميم والسرعة والحركة موجودة لخدمة عملائك، لا للاستعراض.",
    p3_h: "نتحمّل المسؤولية.", p3_p: "نطاق العمل، ومعنى الإنجاز، والتعديلات، والتسليم، كلها مكتوبة قبل أن نبدأ. ما بنيناه نحن مسؤولون عنه.",
    p4_h: "لا شيء مختلَق.", p4_p: "لا تقييمات مزيّفة، ولا جوائز مخترعة، ولا نتائج مستعارة. وأعمالنا نفسها معروضة بما هي عليه بالضبط.",
    p5_h: "نطاقك يبقى ملكك.", p5_p: "يُسجَّل نطاقك باسمك، ومحتواك ملكك. لا نقيّدك بنا.",
    about_eyebrow: "من نحن", about_h: "استوديو في عمّان، <em>بُني ليتدفّق.</em>",
    about_p: "FellowFlow ثلاثة مؤسسين ومعيار واحد: نفهم النشاط أولًا، ثم نبني ما يحتاجه، ونتحمّل مسؤوليته. بدأنا في عمّان عام 2026، وعلامتنا كانت أول عملائنا.",
    n_wishta: "عبدالله كشتيني", n_weezy: "علي البوصيفي", n_mahmoud: "محمود أبو حجلة", role_cof: "شريك مؤسس",
    begin_eyebrow: "لنبدأ معًا", begin_h: "حدّثنا عن <em>نشاطك.</em>",
    begin_p: "ننظر إلى موقعك وإلى طريقة وصول العملاء إليك، ثم نخبرك بوضوح بما يستحق العمل. مجانًا، ودون أي التزام. محادثة، لا عرض مبيعات.",
    way_wa: "واتساب", way_call: "اتصال", way_mail: "البريد",
    f_biz: "اسم النشاط التجاري", f_type: "نوع النشاط",
    t_cafe: "مقهى أو مطعم", t_gym: "نادٍ رياضي أو استوديو", t_fashion: "ملابس أو أزياء", t_salon: "صالون أو عيادة", t_other: "شيء آخر",
    f_link: "رابط الموقع أو Instagram أو خرائط Google (اختياري)", f_name: "اسمك",
    f_send: "أرسل عبر واتساب",
    f_fine: "يفتح هذا واتساب مع تعبئة بياناتك. لا يُحفظ أي شيء على هذا الموقع. نردّ خلال 24 ساعة.",
    f_sent: "يُفتح واتساب الآن مع رسالتك. اضغط إرسال هناك، وسنردّ خلال 24 ساعة. لم يُفتح؟ <a href=\"https://wa.me/962796237444\" target=\"_blank\" rel=\"noopener\">راسلنا مباشرة</a> أو اتصل على <a href=\"tel:+962796237444\" dir=\"ltr\">+962 79 623 7444</a>.",
    f_err: "يرجى إضافة اسم النشاط واسمك.",
    final_k: "عمّان · بالعربية والإنجليزية",
    final_h: "عملاؤك يبحثون الآن. <em>دعهم يجدونك.</em>", final_cta: "لنبدأ معًا", final_wa: "راسلنا على واتساب",
    foot_where: "الهوية الرقمية للأعمال · عمّان، الأردن",
    bar_wa: "واتساب", bar_begin: "لنبدأ معًا", foot_privacy: "سياسة الخصوصية",
    menu_open: "القائمة", menu_close: "إغلاق القائمة"
  };
  var EN = { beat_0: "Dormant.", beat_1: "The first connection.", beat_2: "Connections spread.", beat_3: "A living whole.", ctl_pause: "Pause the world", ctl_resume: "Resume the world", ctl_play: "Play the opening", menu_open: "Menu", menu_close: "Close menu" };
  var T = page === "ar" ? AR : EN;
  var MSG = {
    en: { hello: "Hello FellowFlow, I'd like a free first look at my business.", biz: "Business: ", type: "Type: ", link: "Link: ", name: "My name: " },
    ar: { hello: "مرحبًا FellowFlow، أودّ نظرة أولى مجانية على نشاطي التجاري.", biz: "النشاط: ", type: "النوع: ", link: "الرابط: ", name: "اسمي: " }
  };

  // ---- the world ----
  var canvas = document.getElementById("world-canvas");
  var world = null, wakeAuto = 0, wakeTarget = null, playing = !reduce, t0 = null, skipped = false;
  var beatText = document.getElementById("beat-text"), beatBar = document.getElementById("beat-bar");
  var ctlSkip = document.getElementById("ctl-skip"), ctlPause = document.getElementById("ctl-pause"), ctlReplay = document.getElementById("ctl-replay");
  try {
    var ws = (location.search.match(/[?&]wscale=([\d.]+)/) || [])[1];   // testing only: a smaller canvas
    if (window.FFWorld && window.FFWorld.start(canvas, ws ? { scale: +ws, tier: "A", preserve: true } : {})) world = window.FFWorld;
  } catch (e) { world = null; }
  if (!world) {
    root.classList.add("no-world");
    document.querySelector(".hero-side").hidden = true;
  } else {
    if (reduce) {
      // Reduce Motion: the awakened world stands still; scroll still moves the camera, which the visitor drives.
      wakeAuto = 1; world.setWake(1); world.still(true);
      ctlSkip.hidden = true; ctlPause.hidden = true;
      ctlReplay.hidden = false; ctlReplay.textContent = T.ctl_play; ctlReplay.setAttribute("data-mode", "play");
    }
    var shownWake = reduce ? 1 : 0;
    // the opening on its own: about eleven seconds from dormant to a living whole, beat by beat
    var BEATS = [[0, 0], [1.8, 0.1], [5.4, 0.34], [8.4, 0.64], [11.2, 1]];
    function autoWake(sec) {
      for (var i = 1; i < BEATS.length; i++) if (sec <= BEATS[i][0]) {
        var a = BEATS[i - 1], b = BEATS[i], u = (sec - a[0]) / (b[0] - a[0]); u = u * u * (3 - 2 * u);
        return a[1] + (b[1] - a[1]) * u;
      }
      return 1;
    }
    function beatFor(w) { return w < 0.1 ? 0 : w < 0.34 ? 1 : w < 0.64 ? 2 : 3; }
    var lastBeat = -1;
    function showBeat(w) {
      var b = beatFor(w);
      if (b !== lastBeat) { lastBeat = b; beatText.textContent = T["beat_" + b]; }
      beatBar.style.setProperty("--p", w.toFixed(3));
    }
    function tick(now) {
      requestAnimationFrame(tick);
      if (playing && !paused) {
        if (t0 === null) t0 = now;
        wakeAuto = Math.max(wakeAuto, autoWake((now - t0) / 1000));
      }
      if (wakeTarget !== null) { wakeAuto += (wakeTarget - wakeAuto) * 0.06; if (Math.abs(wakeTarget - wakeAuto) < 0.002) { wakeAuto = wakeTarget; wakeTarget = null; } }
      // scrolling early also wakes the world, so it is never dormant when it recedes
      var w = Math.max(wakeAuto, Math.min(1, scrollS * 1.6));
      if (w !== shownWake) { shownWake = w; world.setWake(w); showBeat(w); }
      if (w >= 1 && !skipped && !reduce) { ctlSkip.hidden = true; ctlReplay.hidden = false; skipped = true; }
    }
    requestAnimationFrame(tick);
    showBeat(shownWake);
    var paused = false;
    ctlSkip.addEventListener("click", function () { wakeTarget = 1; ctlSkip.hidden = true; ctlReplay.hidden = false; skipped = true; });
    ctlPause.addEventListener("click", function () {
      paused = !paused; world.pause(paused);
      ctlPause.setAttribute("aria-pressed", paused ? "true" : "false");
      ctlPause.textContent = paused ? T.ctl_resume : T.ctl_pause;
      if (!paused) t0 = performance.now() - secondsFor(wakeAuto) * 1000;
    });
    ctlReplay.addEventListener("click", function () {
      if (ctlReplay.getAttribute("data-mode") === "play") { world.still(false); playing = true; ctlPause.hidden = false; }
      wakeAuto = 0; wakeTarget = null; t0 = null; skipped = false; playing = true;
      ctlReplay.hidden = true; ctlSkip.hidden = false;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
    function secondsFor(w) { for (var i = 1; i < BEATS.length; i++) if (w <= BEATS[i][1]) { var a = BEATS[i - 1], b = BEATS[i]; return a[0] + (b[0] - a[0]) * (w - a[1]) / (b[1] - a[1]); } return BEATS[BEATS.length - 1][0]; }
    // the visitor's light follows the pointer over the first screen
    var hero = document.querySelector(".hero");
    function point(ev, on) { var x = ev.clientX / innerWidth, y = ev.clientY / innerHeight; world.pointer(x, y, on); }
    hero.addEventListener("pointermove", function (ev) { point(ev, scrollS < 0.5); });
    hero.addEventListener("pointerleave", function (ev) { point(ev, false); });
    document.addEventListener("keydown", function (ev) {
      if (ev.target.closest && ev.target.closest("input, textarea, select")) return;
      if (ev.key === "Escape" && !skipped && !reduce) ctlSkip.click();
    });
  }

  // ---- scroll: the camera pulls back over the first two screens, the header gains a band ----
  var scrollS = 0, top = document.getElementById("top"), actQuote = document.getElementById("act-quote");
  function onScroll() {
    var y = window.scrollY || 0, vh = innerHeight;
    scrollS = Math.max(0, Math.min(1, y / (vh * 1.9)));
    if (world) { world.setScroll(scrollS); world.rate(scrollS >= 1 ? 2 : 1); }
    top.classList.toggle("scrolled", y > 24);
    root.classList.toggle("scrolled", y > 40);
    if (actQuote) actQuote.classList.toggle("in", scrollS > 0.22);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // ---- the headline rises word by word ----
  var h1 = document.getElementById("h1");
  (function splitWords() {
    var i = 0;
    function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", i++); s.textContent = part; frag.appendChild(s);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) wrap(c);
      });
    }
    wrap(h1);
    requestAnimationFrame(function () { requestAnimationFrame(function () { h1.classList.add("in"); }); });
  })();

  // ---- reveals and the nav's current section ----
  // Checked on every scroll rather than through an observer, so a slow frame (the world on a weak
  // device) can never leave a section invisible.
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function revealCheck() {
    if (!reveals.length) return;
    var vh = innerHeight;
    reveals = reveals.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) { el.classList.add("in"); return false; }
      return true;
    });
  }
  window.addEventListener("scroll", revealCheck, { passive: true });
  window.addEventListener("resize", revealCheck);
  revealCheck(); setTimeout(revealCheck, 300); window.addEventListener("load", revealCheck);
  var navLinks = document.querySelectorAll(".nav a");
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) { a.classList.toggle("here", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(function (s) { so.observe(s); });

  // ---- work recordings: play on hover; on touch, only while actually on screen ----
  document.querySelectorAll(".piece").forEach(function (piece) {
    var v = piece.querySelector("video");
    if (!v) return;
    function play() { piece.classList.add("playing"); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    function stop() { piece.classList.remove("playing"); v.pause(); }
    if (coarse || reduce) {
      if (reduce) return;
      new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.intersectionRatio >= 0.6) play(); else stop(); }); }, { threshold: [0, 0.6] }).observe(piece);
    } else {
      piece.addEventListener("pointerenter", play);
      piece.addEventListener("pointerleave", stop);
      piece.addEventListener("focusin", play);
      piece.addEventListener("focusout", stop);
    }
  });

  // ---- language link keeps the section ----
  var langLink = document.getElementById("lang");
  langLink.addEventListener("click", function () {
    var here = "";
    document.querySelectorAll("main section[id]").forEach(function (s) { if (s.getBoundingClientRect().top < innerHeight * 0.4) here = s.id; });
    if (here && here !== "arrival") langLink.href = langLink.getAttribute("href").split("#")[0] + "#" + here;
  });

  // ---- the first-look form: the WhatsApp message writes itself as you type ----
  var form = document.getElementById("audit-form"), err = document.getElementById("form-err"), sent = document.getElementById("form-sent");
  var bubble = document.getElementById("bubble-text");
  form.querySelector("button[type=submit]").disabled = false;
  function message(preview) {
    var m = MSG[page];
    var biz = form.biz.value.trim(), name = form.name.value.trim(), link = form.link.value.trim();
    return [m.hello, m.biz + (biz || (preview ? "…" : "")), m.type + form.type.options[form.type.selectedIndex].text, link ? m.link + link : "", m.name + (name || (preview ? "…" : ""))].filter(Boolean).join("\n");
  }
  function updateBubble() { bubble.textContent = message(true); }
  form.addEventListener("input", updateBubble);
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var missing = !form.biz.value.trim() ? form.biz : !form.name.value.trim() ? form.name : null;
    if (missing) { err.hidden = false; sent.hidden = true; missing.closest("label").before(err); missing.scrollIntoView({ block: "end" }); missing.focus({ preventScroll: true }); return; }
    err.hidden = true; sent.hidden = false;
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message(false)), "_blank", "noopener");
  });
  updateBubble();

  // ---- phone and tablet menu ----
  var menuBtn = document.getElementById("menu-btn"), menu = document.getElementById("menu");
  var main = document.getElementById("main"), foot = document.querySelector(".foot");
  var tablet = window.matchMedia("(max-width: 1000px)");
  var menuOpen = false;
  function labelMenu() { menuBtn.setAttribute("aria-label", menuOpen ? T.menu_close : T.menu_open); }
  function setMenu(open) {
    if (open === menuOpen) return;
    menuOpen = open;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && (main.contains(document.activeElement) || foot.contains(document.activeElement))) menuBtn.focus({ preventScroll: true });
    main.inert = open; foot.inert = open;
    labelMenu();
  }
  menuBtn.addEventListener("click", function () { setMenu(!menuOpen); });
  document.addEventListener("click", function (ev) { if (menuOpen && ev.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && menuOpen) { setMenu(false); menuBtn.focus(); } });
  window.addEventListener("resize", function () { if (menuOpen && !tablet.matches) setMenu(false); });
  window.addEventListener("pageshow", function () { setMenu(false); });
  labelMenu();
})();
