// FellowFlow brand site: language switch, opening, hero words, river, film strip, process line, audit form.
(function () {
  var WHATSAPP = "962796237444";
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Arabic text. English lives in the HTML so the page works without JavaScript.
  var AR = {
    skip: "انتقل إلى المحتوى",
    intro_tag: "نساعد الأعمال على التدفّق بشكل أفضل.", intro_skip: "تخطّي",
    nav_work: "أعمالنا", nav_services: "خدماتنا", nav_promise: "وعدنا", nav_team: "الفريق", nav_faq: "أسئلة",
    nav_cta: "نظرة أولى مجانية",
    hero_eyebrow: "مواقع إلكترونية للأعمال · عمّان",
    hero_h1: "نساعد الأعمال على <em>التدفّق بشكل أفضل.</em>",
    hero_lede: "نبدأ بفهم نشاطك التجاري. ثم نصمّم ونبني الموقع الذي يحتاجه فعلًا، بالعربية والإنجليزية، ونتحمّل مسؤولية ما نسلّمه.",
    hero_cta1: "احجز نظرة أولى مجانية", hero_cta2: "شاهد أعمالنا",
    src1: "خرائط Google", src2: "Instagram", src3: "صديق على واتساب", src4: "التقييمات", src5: "ChatGPT وGemini",
    dest: "نشاطك التجاري",
    flow_eyebrow: "معنى التدفّق",
    flow_h: "عوائق أقل. <em>وتركيز أكبر على ما يهم.</em>",
    flow_p: "قبل أن يتصل بك العميل، يبحث عن الأساسيات: أين أنت، ومتى تفتح، وماذا تقدّم، وكيف يصل إليك. وهو يأتي من كل مكان. نحن نجد ما يبطئه، ونزيل ما لا حاجة إليه، ونوضّح الباقي، ليصل الطريق إلى بابك.",
    work_eyebrow: "أعمالنا", work_h: "أعمالنا، <em>بمسمّياتها الصادقة.</em>",
    work_p: "مواقع صمّمناها لأنشطة تجارية في عمّان. كل موقع مبني حول ما يبيعه صاحبه وكيف يقرّر عملاؤه، وكل موقع يوضّح أين يقف اليوم.",
    w_gym: "نادٍ رياضي", w_couture: "أزياء راقية", w_food: "برغر", w_clothing: "ملابس",
    st_trial: "تجربة حيّة", st_preview: "معاينة موقع", st_founder: "تجربة حيّة (يملكها المؤسسون)",
    view: "زيارة الموقع", view_prev: "مشاهدة المعاينة",
    legend: "<b>تجربة حيّة:</b> نشاط تجاري حقيقي يستخدم الموقع بينما يمرّ بفحوصات الإطلاق لدينا. Apollo هو أول مشروع تجريبي لنا، في قطاع النوادي الرياضية. <b>معاينة موقع:</b> تصميم أعددناه لنُري نشاطًا تجاريًا كيف يمكن أن يبدو موقعه، وليس عملًا منجزًا لعميل.",
    svc_eyebrow: "خدماتنا", svc_h: "ما نقدّمه <em>اليوم.</em>",
    build_k: "خدمتنا الأساسية", build_h: "بناء موقع",
    build_p: "موقع جديد، أو إعادة بناء موقع لا يخدمك. مصمَّم حول ما يبيعه نشاطك وكيف يقرّر عملاؤك.",
    build_p2: "بالعربية والإنجليزية، والعربية تُقرأ من اليمين إلى اليسار. الاتصال وواتساب والاتجاهات بلمسة واحدة. سريع على الهاتف، مع أساسيات البحث مُنجزة كما يجب.",
    build_fine: "نفحص كل موقع وفق قائمة الإطلاق لدينا قبل نشره، ويراجع العربيةَ متحدّثٌ أصلي بها.",
    now_k: "ونقدّم اليوم أيضًا",
    imp_h: "تحسينات", imp_p: "تعديلات واضحة ومحدّدة على موقع بنيناه لك. نتفق مسبقًا على ما سيتغيّر وكيف نعرف أنه اكتمل.",
    look_h: "نظرة أولى مجانية", look_p: "نظرة قصيرة وصادقة على موقعك وعلى طريق عملائك إليك. نخبرك بما نراه، حتى لو كان الجواب الصحيح ألّا تغيّر شيئًا.",
    later_k: "لاحقًا", soon_badge: "ليس بعد",
    seo_h: "الظهور في البحث والذكاء الاصطناعي", seo_p: "تحسين محركات البحث (SEO)، ورعاية ملفك على Google، والظهور في مساعدات الذكاء الاصطناعي مثل ChatGPT.",
    growth_h: "رعاية ونمو شهري", growth_p: "صيانة مستمرة، وتقارير، وخطط نمو.",
    svc_note: "لن نقدّم هذه الخدمات إلا بعد أن تثبت مواقعنا نجاحها ونعرف التكلفة الكاملة لتقديمها بإتقان. الأسعار تعتمد على نشاطك: تحصل على نطاق عمل مكتوب وسعر واضح قبل أن نبدأ.",
    proc_eyebrow: "طريقة عملنا", proc_h: "نفهم أولًا. <em>ثم نبني.</em>",
    s1_h: "الفهم", s1_p: "نستمع إليك، وننظر إلى موقعك وإلى طريقة وصول العملاء إليك، ونفصل بين ما رأيناه وما نفترضه.",
    s2_h: "التوصية", s2_p: "نخبرك بما يستحق العمل وما لا يستحق. وتحصل على نطاق عمل مكتوب وسعر واضح قبل أن نبدأ.",
    s3_h: "البناء", s3_p: "نصمّم ونبني بالعربية والإنجليزية، حول الطريقة التي يقرّر بها عملاؤك فعلًا.",
    s4_h: "الفحص والإطلاق", s4_p: "نفحص كل رابط وكل زر وكل مقاس هاتف قبل النشر، ونبقى مسؤولين عمّا سلّمناه.",
    prom_eyebrow: "<span class=\"rn\">V</span> · وعدنا", prom_h: "وعدنا، <em>بتوقيعنا.</em>",
    p1_h: "نفهم قبل أن نوصي.", p1_p: "نستمع أولًا وننظر إلى الأدلة. إن كنت تحتاج تعديلًا صغيرًا، أو لا شيء على الإطلاق، سنقول لك ذلك.",
    p2_h: "نبني لغاية واضحة.", p2_p: "التصميم والسرعة والحركة موجودة لخدمة عملائك، لا للاستعراض.",
    p3_h: "نتحمّل مسؤولية ما نسلّمه.", p3_p: "نطاق العمل، ومعنى الإنجاز، والتعديلات، والتسليم، كلها مكتوبة قبل أن نبدأ. ما بنيناه نحن مسؤولون عنه.",
    p4_h: "لا شيء مختلَق.", p4_p: "لا تقييمات مزيّفة، ولا جوائز مخترعة، ولا نتائج مستعارة. وأعمالنا نفسها موصوفة بما هي عليه بالضبط.",
    p5_h: "نطاقك يبقى ملكك.", p5_p: "يُسجَّل نطاقك باسمك، ومحتواك ملكك. لا نقيّدك بنا.",
    prom_quote: "اختبارنا في كل مشروع: هل ستقول إننا فهمنا ما يهم، وسهّلنا الأمور، وسلّمنا ما وعدنا به؟",
    team_eyebrow: "الفريق", team_h: "الأشخاص <em>وراء التدفّق.</em>",
    n_wishta: "عبدالله كشتيني", n_weezy: "علي البوصيفي", n_mahmoud: "محمود أبو حجلة", role_cof: "شريك مؤسس",
    audit_eyebrow: "نظرة أولى مجانية", audit_h: "أخبرنا عن <em>نشاطك.</em>",
    audit_p: "سننظر إلى موقعك وإلى طريقة وصول العملاء إليك، ثم نخبرك بوضوح بما نراه، وما الذي يستحق العمل إن وُجد. إنها محادثة، لا عرض مبيعات.",
    audit_free: "مجانًا، ودون أي التزام.",
    f_biz: "اسم النشاط التجاري", f_type: "نوع النشاط",
    t_cafe: "مقهى أو مطعم", t_gym: "نادٍ رياضي أو استوديو", t_fashion: "ملابس أو أزياء", t_salon: "صالون أو عيادة", t_other: "شيء آخر",
    f_link: "رابط موقعك أو Instagram أو خرائط Google (اختياري)", f_name: "اسمك",
    f_send: "أرسل عبر واتساب",
    f_fine: "يفتح هذا واتساب مع تعبئة بياناتك. لا يُحفظ أي شيء على هذا الموقع.",
    f_err: "يرجى إضافة اسم النشاط واسمك.",
    faq_eyebrow: "أسئلة", faq_h: "إجابات <em>مباشرة.</em>",
    q1: "هل تضمنون المركز الأول على Google؟", a1: "لا أحد يستطيع ذلك بصدق، فـGoogle هو من يقرّر الترتيب. كل موقع نبنيه تُنجز فيه أساسيات البحث كما يجب. أما تحسين محركات البحث بشكل مستمر، فلن نقدّمه إلا حين نتقنه.",
    q2: "هل تقدّمون SEO أو إدارة التواصل الاجتماعي أو الإعلانات؟", a2: "ليس بعد. نحن اليوم نصمّم المواقع ونبنيها ونحسّنها. الظهور في البحث والذكاء الاصطناعي وخطط النمو الشهرية تأتي لاحقًا، بعد أن تثبت مواقعنا نجاحها.",
    q3: "لمن يعود الموقع؟", a3: "يُسجَّل نطاقك باسمك، ومحتواك ملكك. ونتفق كتابيًا على الاستضافة والتسليم قبل أن نبدأ.",
    q4: "هل تبنون مواقع بالعربية؟", a4: "نعم. كل موقع نبنيه يعمل بالعربية والإنجليزية، والعربية تُقرأ من اليمين إلى اليسار، ويراجعها متحدّث أصلي قبل الإطلاق.",
    q5: "أين مقرّكم؟", a5: "في عمّان، الأردن. نعمل حاليًا مع الأنشطة التجارية في عمّان، وسنقبل عملاء من خارجها بعد أن يثبت عملنا هنا.",
    q6: "كم التكلفة؟", a6: "تعتمد على ما يحتاجه نشاطك، لذلك لا ننشر أسعارًا. بعد النظرة الأولى، تحصل على نطاق عمل مكتوب وسعر واضح قبل أن نبدأ.",
    q7: "هل أنتم شركة جديدة؟", a7: "نعم. أول مواقعنا معروضة في هذه الصفحة بمسمّياتها الصادقة: تجارب حيّة ومعاينات. إن عملت معنا الآن، فستكون من أوائل عملائنا، وسنعاملك على هذا الأساس.",
    final_h: "لنرَ ما الذي <em>يعترض طريقك.</em>", final_wa: "راسلنا على واتساب",
    foot_where: "مواقع إلكترونية للأعمال · عمّان، الأردن",
    bar_wa: "واتساب", bar_audit: "نظرة أولى مجانية"
  };
  var MSG = {
    en: { hello: "Hello FellowFlow, I'd like a free first look at my business.", biz: "Business: ", type: "Type: ", link: "Link: ", name: "My name: ", ph_biz: "your business", ph_name: "your name" },
    ar: { hello: "مرحبًا FellowFlow، أودّ نظرة أولى مجانية على نشاطي التجاري.", biz: "النشاط: ", type: "النوع: ", link: "الرابط: ", name: "اسمي: ", ph_biz: "اسم نشاطك", ph_name: "اسمك" }
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
