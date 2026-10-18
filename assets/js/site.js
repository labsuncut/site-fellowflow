// FellowFlow brand site: language switch, opening, hero words, river, film strip, process line, audit form.
(function () {
  var WHATSAPP = "962796237444";
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Arabic text. English lives in the HTML so the page works without JavaScript.
  var AR = {
    skip: "انتقل إلى المحتوى",
    intro_tag: "نجعل العملاء يتدفّقون إليك.", intro_skip: "تخطّي",
    nav_work: "أعمالنا", nav_services: "خدماتنا", nav_promise: "ضماننا", nav_team: "الفريق", nav_faq: "أسئلة",
    nav_cta: "تقييم مجاني",
    hero_eyebrow: "استوديو الهوية الرقمية · عمّان",
    hero_h1: "نجعل العملاء <em>يتدفّقون إليك.</em>",
    hero_lede: "خرائط Google، وInstagram، وواتساب، ومساعدات الذكاء الاصطناعي، كلها تشير إلى مكان واحد: نشاطك التجاري. نبني الطريق كاملًا، بالعربية والإنجليزية، ونرعاه كل شهر.",
    hero_cta1: "احصل على تقييم حضورك مجانًا", hero_cta2: "شاهد أعمالنا",
    src1: "خرائط Google", src2: "Instagram", src3: "صديق على واتساب", src4: "التقييمات", src5: "ChatGPT وGemini",
    dest: "نشاطك التجاري",
    flow_eyebrow: "التدفّق",
    flow_h: "عملاؤك لا يبدؤون من موقعك. <em>يبدؤون من كل مكان.</em>",
    flow_p: "يسأل العميل صديقًا على واتساب، ويتصفّح Instagram، ويفتح خرائط Google، أو يسأل ChatGPT «وين نروح الليلة؟». كل طريق من هذه الطرق يجب أن ينتهي عندك. نبني كل طريق ونربطها معًا.",
    work_eyebrow: "أعمالنا", work_h: "مختارات من <em>أعمالنا.</em>",
    work_p: "مواقع صمّمناها وبنيناها لأنشطة تجارية في عمّان. كل موقع مبني حول ما يبيعه صاحبه وكيف يقرّر عملاؤه.",
    w_gym: "نادٍ رياضي", w_couture: "أزياء راقية", w_cafe: "مقهى", w_food: "برغر", w_clothing: "ملابس",
    w5_p: "قريبًا.",
    view: "زيارة الموقع",
    svc_eyebrow: "خدماتنا", svc_h: "نبني مرة. <em>وننمو كل شهر.</em>",
    build_k: "مرة واحدة", build_h: "البناء",
    build_p: "موقعك وكل ما وراءه: ألوانك، والعربية والإنجليزية، وبنية تفهمها محركات البحث.",
    build_p2: "ويوم الإطلاق نجهّز حضورك: ملف Google للنشاط التجاري، وخرائط Bing وApple، وSearch Console، وصفحة أسئلة، وبطاقة QR للتقييمات.",
    build_fine: "أربعة مستويات، من موقع بصفحة واحدة إلى بناء مميّز بحركة وفيديو مخصّصين.",
    grow_k: "شهريًا",
    care_h: "الرعاية", care_p: "الاستضافة، والحماية، ومراقبة عمل الموقع، والتعديلات الصغيرة متى احتجتها.",
    vis_h: "الظهور", vis_badge: "الأكثر اختيارًا",
    vis_p: "ندير ملفك على Google، وننمّي التقييمات الحقيقية، ونوحّد بياناتك في كل الأدلة، ونكتب إجابة جديدة كل شهر، ونتابع ما تقوله مساعدات الذكاء الاصطناعي عنك. وتقرير واضح كل شهر.",
    gp_h: "شريك النمو", gp_p: "فريقك الرقمي كاملًا: كل ما في «الظهور»، مع خطة Instagram، وحملة شهرية، وإدارة إعلاناتك، ومكالمة شهرية.",
    svc_note: "الأسعار تعتمد على نشاطك. ابدأ بالتقييم المجاني، وسنقترح عليك الخطة المناسبة بسعر واضح.",
    proc_eyebrow: "طريقة عملنا", proc_h: "أربع خطوات. <em>بلا مفاجآت.</em>",
    s1_h: "التقييم", s1_p: "نبحث عن نشاطك على Google والخرائط ومساعدات الذكاء الاصطناعي، ونريك في صفحة واحدة أين لا يراك أحد.",
    s2_h: "البناء", s2_p: "نصمّم موقعك ونجهّز كل بياناتك من سجلّ واحد صحيح لنشاطك.",
    s3_h: "الإطلاق", s3_p: "نفحص كل رابط وكل زر وكل مقاس هاتف قبل أن يُنشر أي شيء.",
    s4_h: "النمو", s4_p: "كل شهر نحسّن شيئًا واحدًا، ونقيس ما تغيّر، ونخبرك بصدق.",
    prom_eyebrow: "<span class=\"rn\">V</span> · ضماننا", prom_h: "ما يمكنك <em>الاعتماد عليه.</em>",
    p1_h: "كل شيء ملكك.", p1_p: "نطاقك وملفاتك ومحتواك تبقى باسمك. دائمًا.",
    p2_h: "أرقام صادقة.", p2_p: "كل شهر ترى الاتصالات وطلبات الاتجاهات والتقييمات وذكر اسمك في الذكاء الاصطناعي. ننقل ما تغيّر، لا أكثر.",
    p5_h: "في الموعد، أو الشهر الأول مجانًا.", p5_p: "نتفق معًا على موعد الإطلاق. إن تأخّرنا عنه، فأول شهر من خطتك الشهرية علينا.",
    p3_h: "لا شيء مختلَق.", p3_p: "لا تقييمات مزيّفة ولا جوائز مخترعة. فقط حقائق عن نشاطك.",
    p4_h: "تبقى لأنها تنجح.", p4_p: "الخطط الشهرية تبدأ بثلاثة أشهر، ثم تستمر شهرًا بشهر.",
    prom_quote: "لا أحد يستطيع بصدق أن يعدك بالمركز الأول على Google. نعدك بأن نقوم بكل ما يجعله ممكنًا، كل شهر.",
    team_eyebrow: "الفريق", team_h: "الأشخاص <em>وراء التدفّق.</em>",
    n_wishta: "عبدالله كشتيني", n_weezy: "علي البوصيفي", n_mahmoud: "محمود أبو حجلة", role_cof: "شريك مؤسس",
    audit_eyebrow: "تقييم الحضور المجاني", audit_h: "شاهد نشاطك كما <em>يراه عملاؤك.</em>",
    audit_p: "أخبرنا عن نشاطك. سنبحث عنه على Google والخرائط ومساعدات الذكاء الاصطناعي، ونرسل لك صفحة واحدة: أين أنت قوي، وأين لا يراك أحد، وما الحل.",
    audit_free: "مجانًا، ودون أي التزام.",
    f_biz: "اسم النشاط التجاري", f_type: "نوع النشاط",
    t_cafe: "مقهى أو مطعم", t_gym: "نادٍ رياضي أو استوديو", t_fashion: "ملابس أو أزياء", t_salon: "صالون أو عيادة", t_other: "شيء آخر",
    f_link: "رابط Instagram أو خرائط Google (اختياري)", f_name: "اسمك",
    f_send: "أرسل عبر واتساب",
    f_fine: "يفتح هذا واتساب مع تعبئة بياناتك. لا يُحفظ أي شيء على هذا الموقع.",
    f_err: "يرجى إضافة اسم النشاط واسمك.",
    faq_eyebrow: "أسئلة", faq_h: "إجابات <em>مباشرة.</em>",
    q1: "هل تضمنون المركز الأول على Google؟", a1: "لا أحد يستطيع ذلك بصدق، فـGoogle هو من يقرّر الترتيب. نحن نقوم بكل ما يزيد فرص ظهور نشاطك، ونريك الأرقام الحقيقية كل شهر.",
    q2: "ما هو GEO؟", a2: "تحسين الظهور في محركات الذكاء الاصطناعي: أن نتأكد أن مساعدات مثل ChatGPT وGemini لديها معلومات واضحة وصحيحة عن نشاطك، لتتمكن من ترشيحك.",
    q3: "لمن يعود الموقع؟", a3: "لك. النطاق والمحتوى وملفاتك كلها باسمك.",
    q4: "هل تبنون مواقع بالعربية؟", a4: "نعم. كل موقع نبنيه يعمل بالعربية والإنجليزية، والعربية تُقرأ من اليمين إلى اليسار.",
    q5: "أين مقرّكم؟", a5: "في عمّان، الأردن. نعمل مع الأنشطة التجارية المحلية في أنحاء المدينة.",
    q6: "كم التكلفة؟", a6: "تعتمد على ما يحتاجه نشاطك. ابدأ بالتقييم المجاني، وسنقترح عليك خطة بسعر واضح.",
    final_h: "جاهز ليجدك <em>عملاؤك؟</em>", final_wa: "راسلنا على واتساب",
    foot_where: "استوديو الهوية الرقمية · عمّان، الأردن",
    bar_wa: "واتساب", bar_audit: "تقييم مجاني"
  };
  var MSG = {
    en: { hello: "Hello FellowFlow, I'd like a free Presence Audit.", biz: "Business: ", type: "Type: ", link: "Link: ", name: "My name: ", ph_biz: "your business", ph_name: "your name" },
    ar: { hello: "مرحبًا FellowFlow، أريد تقييم حضور مجانيًا.", biz: "النشاط: ", type: "النوع: ", link: "الرابط: ", name: "اسمي: ", ph_biz: "اسم نشاطك", ph_name: "اسمك" }
  };

  var nodes = document.querySelectorAll("[data-i18n]");
  var EN = {};
  nodes.forEach(function (n) { EN[n.getAttribute("data-i18n")] = n.innerHTML; });
  var langBtn = document.getElementById("lang");
  var h1 = document.querySelector(".words");

  function splitWords() {
    // Wrap each word so it can rise in on its own. <em> words keep their gold.
    var i = 0;
    function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", i++); s.textContent = part; frag.appendChild(s);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) wrap(c);
      });
    }
    wrap(h1);
    h1.classList.remove("in");
    requestAnimationFrame(function () { requestAnimationFrame(function () { h1.classList.add("in"); }); });
  }

  function lang() { return root.lang === "ar" ? "ar" : "en"; }
  function setLang(l) {
    var dict = l === "ar" ? AR : EN;
    nodes.forEach(function (n) { var k = n.getAttribute("data-i18n"); if (dict[k] != null) n.innerHTML = dict[k]; });
    root.lang = l;
    root.dir = l === "ar" ? "rtl" : "ltr";
    langBtn.textContent = l === "ar" ? "English" : "عربي";
    langBtn.lang = l === "ar" ? "en" : "ar";
    splitWords();
    updateBubble();
    try { localStorage.setItem("ff-lang", l); } catch (e) {}
  }
  langBtn.addEventListener("click", function () { setLang(lang() === "ar" ? "en" : "ar"); });

  // Opening, once per visit. The streams, mark and name are timed in CSS; here we only decide
  // whether to play it, and at the end we fly the mark and the name to their places in the header.
  var intro = document.getElementById("intro");
  var topLogo = document.querySelector(".top .logo");
  var seen = false, introDone = false, introTimer = null, scene = null;
  try { seen = sessionStorage.getItem("ff-intro") === "1"; } catch (e) {}

  function flyTo(el, target) {
    // Move `el` so it lands exactly on `target` (same top-left, scaled to the same width).
    var a = el.getBoundingClientRect(), b = target.getBoundingClientRect();
    var s = b.width / a.width;
    el.style.transform = "translate(" + (b.left - a.left) + "px," + (b.top - a.top) + "px) scale(" + s + ")";
  }
  function endIntro() {
    if (introDone) return;
    introDone = true;
    clearTimeout(introTimer);
    try { sessionStorage.setItem("ff-intro", "1"); } catch (e) {}
    intro.classList.add("done");
    flyTo(document.getElementById("intro-mark"), document.querySelector(".top .logo-mark"));
    flyTo(document.getElementById("intro-word"), document.querySelector(".top .logo-word"));
    setTimeout(function () { topLogo.classList.add("show"); }, 700);
    setTimeout(function () { intro.classList.remove("play"); document.body.style.overflow = ""; if (scene) scene.stop(); }, 1250);
  }
  if (!seen && !reduce && window.FFIntro) {
    intro.classList.add("play");
    document.body.style.overflow = "hidden";
    // The scene needs the mark's picture loaded to know its shape; the CSS timings wait for nothing,
    // so start the clock only once the picture is ready (or at once if it never loads).
    var markImg = document.getElementById("intro-mark");
    function begin() {
      if (introDone || scene) return;
      try { scene = window.FFIntro.start(document.getElementById("intro-canvas"), markImg); } catch (e) { endIntro(); return; }
      intro.classList.add("rolling");
      introTimer = setTimeout(endIntro, 5800);
    }
    if (markImg.decode) markImg.decode().then(begin, begin); else if (markImg.complete) begin(); else { markImg.onload = begin; markImg.onerror = begin; }
    setTimeout(begin, 1500);                                     // never wait longer than this for the picture
    intro.addEventListener("click", endIntro);
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") endIntro(); });
    setTimeout(function () { if (!introDone) endIntro(); }, 9500); // safety net
  } else {
    topLogo.classList.add("show");
  }

  // Header line once the page scrolls.
  var top = document.querySelector(".top");

  // Reveal sections as they enter the screen.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal, .sheet").forEach(function (el) { io.observe(el); });

  // The first screen: a handful of bubbles with random size and timing float up around the mark.
  var art = document.getElementById("orbit"), bubbles = document.getElementById("bubbles");
  if (art && bubbles) {
    var count = window.innerWidth < 640 ? 10 : 16;
    for (var bi = 0; bi < count; bi++) {
      var d = document.createElement("span"); d.className = "bubble-dot";
      d.style.setProperty("--x", (4 + Math.random() * 92) + "%");
      d.style.setProperty("--s", Math.round(6 + Math.random() * 30) + "px");
      d.style.setProperty("--d", (14 + Math.random() * 14).toFixed(1) + "s");
      d.style.setProperty("--delay", (-Math.random() * 28).toFixed(1) + "s");
      d.style.setProperty("--sway", Math.round((Math.random() - .5) * 90) + "px");
      bubbles.appendChild(d);
    }
    var sizeArt = function () { art.style.setProperty("--h", (art.offsetHeight + 140) + "px"); };
    sizeArt(); window.addEventListener("resize", sizeArt);
  }

  // The river: paths draw as the section scrolls into view.
  var river = document.getElementById("river");
  var paths = river.querySelectorAll(".paths path");
  paths.forEach(function (p) { p.style.setProperty("--len", p.getTotalLength()); });

  var steps = document.getElementById("steps");
  var stepItems = steps.querySelectorAll("li");

  function onScroll() {
    var y = window.scrollY;
    top.classList.toggle("scrolled", y > 8);

    // river
    var rr = river.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh * 0.85 - rr.top) / (rr.height * 0.9)));
    river.style.setProperty("--p", p.toFixed(3));
    river.classList.toggle("lit", p > 0.7);

    // process line
    var sr = steps.getBoundingClientRect();
    var q = Math.min(1, Math.max(0, (vh * 0.8 - sr.top) / (vh * 0.6)));
    steps.style.setProperty("--p", q.toFixed(3));
    stepItems.forEach(function (li, i) { li.classList.toggle("lit", q >= (i + 0.5) / stepItems.length); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // Team portraits lean toward the pointer.
  if (window.matchMedia("(pointer: fine)").matches && !reduce) {
    document.querySelectorAll(".tilt").forEach(function (el) {
      el.addEventListener("mousemove", function (ev) {
        var r = el.getBoundingClientRect();
        var rx = ((ev.clientY - r.top) / r.height - 0.5) * -8;
        var ry = ((ev.clientX - r.left) / r.width - 0.5) * 10;
        el.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateZ(10px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  // Audit form: the WhatsApp message writes itself as you type. Nothing goes to a server.
  var form = document.getElementById("audit-form");
  var err = document.getElementById("form-err");
  var bubble = document.getElementById("bubble-text");
  function message(preview) {
    var m = MSG[lang()];
    var biz = form.biz.value.trim(), name = form.name.value.trim(), link = form.link.value.trim();
    var lines = [m.hello,
      m.biz + (biz || (preview ? "…" : "")),
      m.type + form.type.options[form.type.selectedIndex].text,
      link ? m.link + link : "",
      m.name + (name || (preview ? "…" : ""))].filter(Boolean);
    return lines.join("\n");
  }
  function updateBubble() { bubble.textContent = message(true); }
  form.addEventListener("input", updateBubble);
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (!form.biz.value.trim() || !form.name.value.trim()) { err.hidden = false; return; }
    err.hidden = true;
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message(false)), "_blank", "noopener");
  });

  // Start
  var saved = null;
  try { saved = localStorage.getItem("ff-lang"); } catch (e) {}
  if (saved === "ar" || /[?&]lang=ar\b/.test(location.search)) setLang("ar"); else { splitWords(); updateBubble(); }
  onScroll();
  window.addEventListener("load", onScroll);
})();
