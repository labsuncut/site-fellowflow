// FellowFlow brand site: language switch, opening, hero words and dust, the customer journey,
// work recordings on hover, packages path, process line, promise tiles, first-look form.
(function () {
  var WHATSAPP = "962796237444";
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;

  // Arabic text. English lives in the HTML so the page works without JavaScript.
  var AR = {
    skip: "انتقل إلى المحتوى",
    intro_tag: "نساعد الأعمال على التدفّق بشكل أفضل.", intro_skip: "تخطّي",
    nav_work: "أعمالنا", nav_services: "باقاتنا", nav_process: "طريقتنا", nav_promise: "وعدنا", nav_team: "الفريق",
    nav_cta: "نظرة أولى مجانية",
    hero_eyebrow: "الهوية الرقمية للأعمال · عمّان",
    hero_h1: "لنساعد نشاطك التجاري على <em>التدفّق بشكل أفضل.</em>",
    hero_lede: "نفهم نشاطك التجاري أولًا. ثم نبني هويته الرقمية: الموقع، وكيف يجده العملاء ويصلون إليه.",
    hero_cta1: "احجز نظرة أولى مجانية", hero_cta2: "شاهد أعمالنا",
    flow_eyebrow: "ما الذي يتغيّر",
    flow_h: "من البحث <em>إلى الوصول إليك.</em>",
    flow_p: "قبل أن يتصل بك أحد أو يزورك، يبحث عنك على هاتفه. هذا هو الطريق الذي نبنيه لعملائك، خطوة بخطوة.",
    sc_search: "بالقرب مني", sc_biz: "نشاطك التجاري", sc_open: "مفتوح الآن · على بُعد 5 دقائق",
    sc_offer: "ماذا نقدّم", sc_hours: "ساعات العمل", sc_where: "أين تجدنا",
    sc_call: "اتصال", sc_wa: "واتساب", sc_dir: "الاتجاهات",
    j1_h: "يبحثون", j1_p: "على Google أو الخرائط أو Instagram أو مساعد ذكاء اصطناعي. يظهر نشاطك بوضوح، بالاسم الصحيح والمكان وساعات العمل.",
    j2_h: "يفهمونك في ثوانٍ", j2_p: "ماذا تقدّم، وأين أنت، ومتى تفتح. واضح بالعربية والإنجليزية، وسريع على الهاتف.",
    j3_h: "يصلون إليك بلمسة واحدة", j3_p: "اتصال أو واتساب أو اتجاهات، كلٌّ منها بلمسة واحدة. لا نماذج، ولا بحث عن رقم.",
    gain_k: "ما تكسبه", gain1: "يجدونك", gain2: "يفهمونك", gain3: "يصلون إليك", gain_p: "لا يضيع أحد في الطريق.",
    work_eyebrow: "أعمالنا", work_h: "صُمّمت <em>لأعمال حقيقية.</em>",
    work_p: "أنشطة تجارية في عمّان صمّمنا لها. مرّر المؤشر فوق أي موقع لتراه يتحرّك.",
    w_gym: "نادٍ رياضي", w_couture: "أزياء راقية", w_food: "برغر",
    st_trial: "تجربة حيّة", st_preview: "معاينة",
    view: "زيارة الموقع", view_prev: "مشاهدة المعاينة",
    legend: "<b>تجربة حيّة:</b> نشاط تجاري حقيقي يستخدم الموقع بينما يمرّ بفحوصات الإطلاق لدينا. <b>معاينة:</b> تصميم أعددناه لنُري نشاطًا تجاريًا كيف يمكن أن يبدو موقعه.",
    svc_eyebrow: "باقاتنا", svc_h: "ثلاث مراحل. <em>طريق واحد.</em>",
    svc_p: "كل نشاط يبدأ بنظرة أولى مجانية. ومن هناك، هكذا نعمل معك.",
    st1_k: "المرحلة الأولى", st1_h: "الأساس", st1_l: "موقعك، مبني كما يجب.",
    st1_1: "بالعربية والإنجليزية", st1_2: "اتصال وواتساب واتجاهات بلمسة واحدة", st1_3: "سريع على الهاتف", st1_4: "أساسيات البحث مُنجزة كما يجب", st1_5: "مفحوص وفق قائمة الإطلاق لدينا",
    st2_k: "المرحلة الثانية", st2_h: "التحسين", st2_l: "تحسينات محدّدة ومتفق عليها.",
    st2_1: "صفحات وعروض جديدة مع تطوّر نشاطك", st2_2: "تعديل ما يراه العملاء أولًا", st2_3: "كل تعديل متفق عليه كتابيًا قبل البدء", st2_4: "تعرف دائمًا متى اكتمل العمل",
    st3_k: "المرحلة الثالثة", st3_h: "النمو", st3_l: "ليجدك عملاؤك، وتستمر في النمو.",
    st3_1: "الظهور في البحث (SEO)", st3_2: "رعاية ملفك على Google", st3_3: "الظهور في إجابات الذكاء الاصطناعي (GEO)", st3_4: "تقارير نمو شهرية", st3_5: "الطلب أونلاين والأتمتة",
    start_h: "كل شيء يبدأ بنظرة أولى مجانية.",
    start_cta: "احجز نظرة أولى مجانية",
    proc_eyebrow: "طريقة عملنا", proc_h: "نفهم أولًا. <em>ثم نبني.</em>",
    s1_h: "الفهم", s1_p: "نستمع إليك، وننظر إلى كيف يجدك العملاء اليوم.",
    s2_h: "التوصية", s2_p: "نخبرك بما يستحق العمل. نطاق مكتوب وسعر واضح أولًا.",
    s3_h: "البناء", s3_p: "نصمّم ونبني بالعربية والإنجليزية، حول الطريقة التي يقرّر بها عملاؤك.",
    s4_h: "الفحص والإطلاق", s4_p: "كل رابط وكل زر وكل مقاس هاتف مفحوص قبل النشر.",
    prom_eyebrow: "<span class=\"rn\">V</span> · وعدنا", prom_h: "خمسة أشياء <em>نعدك بها.</em>",
    prom_hint: "مرّر المؤشر فوق كل وعد لتقرأه.",
    p1_h: "نفهم قبل أن نوصي.", p1_p: "نستمع أولًا وننظر إلى الأدلة. إن كنت تحتاج تعديلًا صغيرًا، أو لا شيء على الإطلاق، سنقول لك ذلك.",
    p2_h: "نبني لغاية واضحة.", p2_p: "التصميم والسرعة والحركة موجودة لخدمة عملائك، لا للاستعراض.",
    p3_h: "نتحمّل المسؤولية.", p3_p: "نطاق العمل، ومعنى الإنجاز، والتعديلات، والتسليم، كلها مكتوبة قبل أن نبدأ. ما بنيناه نحن مسؤولون عنه.",
    p4_h: "لا شيء مختلَق.", p4_p: "لا تقييمات مزيّفة، ولا جوائز مخترعة، ولا نتائج مستعارة. وأعمالنا نفسها معروضة بما هي عليه بالضبط.",
    p5_h: "نطاقك يبقى ملكك.", p5_p: "يُسجَّل نطاقك باسمك، ومحتواك ملكك. لا نقيّدك بنا.",
    prom_quote: "اختبارنا في كل مشروع: هل ستقول إننا فهمنا ما يهم، وسهّلنا الأمور، وسلّمنا ما وعدنا به؟",
    team_eyebrow: "الفريق", team_h: "الأشخاص <em>وراء التدفّق.</em>",
    n_wishta: "عبدالله كشتيني", n_weezy: "علي البوصيفي", n_mahmoud: "محمود أبو حجلة", role_cof: "شريك مؤسس",
    audit_eyebrow: "نظرة أولى مجانية", audit_h: "لنلقِ نظرة على <em>نشاطك.</em>",
    audit_p: "أخبرنا من أنت. ننظر إلى موقعك وإلى طريقة وصول العملاء إليك، ثم نخبرك بوضوح بما يستحق العمل. محادثة، لا عرض مبيعات.",
    audit_free: "مجانًا، ودون أي التزام.",
    f_biz: "اسم النشاط التجاري", f_type: "نوع النشاط",
    t_cafe: "مقهى أو مطعم", t_gym: "نادٍ رياضي أو استوديو", t_fashion: "ملابس أو أزياء", t_salon: "صالون أو عيادة", t_other: "شيء آخر",
    f_link: "رابط الموقع أو Instagram أو خرائط Google (اختياري)", f_name: "اسمك",
    f_send: "أرسل عبر واتساب",
    f_fine: "يفتح هذا واتساب مع تعبئة بياناتك. لا يُحفظ أي شيء على هذا الموقع.",
    f_err: "يرجى إضافة اسم النشاط واسمك.",
    final_h: "عملاؤك يبحثون الآن. <em>دعهم يجدونك.</em>", final_cta: "احجز نظرة أولى مجانية", final_wa: "راسلنا على واتساب",
    foot_where: "الهوية الرقمية للأعمال · عمّان، الأردن",
    bar_wa: "واتساب", bar_audit: "نظرة أولى مجانية"
  };
  var MSG = {
    en: { hello: "Hello FellowFlow, I'd like a free first look at my business.", biz: "Business: ", type: "Type: ", link: "Link: ", name: "My name: ", ph_biz: "your business", ph_name: "your name" },
    ar: { hello: "مرحبًا FellowFlow، أودّ نظرة أولى مجانية على نشاطي التجاري.", biz: "النشاط: ", type: "النوع: ", link: "الرابط: ", name: "اسمي: ", ph_biz: "اسم نشاطك", ph_name: "اسمك" }
  };
  // On a phone there is nothing to hover, so these two lines say "tap" instead.
  var TOUCH = { en: { work_p: "Businesses in Amman we have designed for. Tap a site to see it come alive.", prom_hint: "Tap each one to read it." },
                ar: { work_p: "أنشطة تجارية في عمّان صمّمنا لها. المس أي موقع لتراه يتحرّك.", prom_hint: "المس كل وعد لتقرأه." } };

  var nodes = document.querySelectorAll("[data-i18n]");
  var EN = {};
  nodes.forEach(function (n) { EN[n.getAttribute("data-i18n")] = n.innerHTML; });
  if (coarse) { AR.work_p = TOUCH.ar.work_p; AR.prom_hint = TOUCH.ar.prom_hint; EN.work_p = TOUCH.en.work_p; EN.prom_hint = TOUCH.en.prom_hint; }
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
  // The intro plays even with Reduce Motion on (founders' call, 2026-10-20): it is short, skippable and part of the brand.
  if (!seen && window.FFIntro) {
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

  // Reveal sections as they enter the screen. The packages path draws itself the same way.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal, .sheet, .path-wrap").forEach(function (el) { io.observe(el); });
  var stagePath = document.querySelector(".stage-line path");
  if (stagePath) stagePath.style.setProperty("--len", stagePath.getTotalLength());

  // The first screen: gold dust, a handful of specks with random size and timing, rising around the mark.
  var sky = document.getElementById("sky"), dust = document.getElementById("dust");
  if (sky && dust) {
    var count = window.innerWidth < 640 ? 14 : 24;
    for (var bi = 0; bi < count; bi++) {
      var d = document.createElement("span"); d.className = "bubble-dot";
      d.style.setProperty("--x", (4 + Math.random() * 92) + "%");
      d.style.setProperty("--s", (2 + Math.random() * 5).toFixed(1) + "px");
      d.style.setProperty("--d", (16 + Math.random() * 16).toFixed(1) + "s");
      d.style.setProperty("--delay", (-Math.random() * 32).toFixed(1) + "s");
      d.style.setProperty("--sway", Math.round((Math.random() - .5) * 120) + "px");
      dust.appendChild(d);
    }
    var sizeSky = function () { sky.style.setProperty("--h", (sky.offsetHeight + 100) + "px"); };
    sizeSky(); window.addEventListener("resize", sizeSky);
  }

  // The customer journey and the process line both light up step by step as they scroll into view.
  var journey = document.getElementById("journey");
  var jsteps = journey.querySelectorAll(".jstep");
  var steps = document.getElementById("steps");
  var stepItems = steps.querySelectorAll("li");
  var stagesBox = document.querySelector(".stages"), stageItems = stagesBox.querySelectorAll(".stage");

  function light(list, box, span) {
    var r = box.getBoundingClientRect(), vh = window.innerHeight;
    var q = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * span)));
    list.forEach(function (li, i) { li.classList.toggle("lit", q >= (i + 0.6) / list.length); });
    return q;
  }
  function flowEach(list) {
    var vh = window.innerHeight;
    list.forEach(function (li) {
      var r = li.getBoundingClientRect();
      li.classList.toggle("lit", r.top < vh * 0.62);
      if (r.bottom < vh * 0.9) li.classList.add("flows");
    });
  }
  function onScroll() {
    top.classList.toggle("scrolled", window.scrollY > 8);
    if (window.innerWidth > 1000) {
      light(jsteps, journey, 0.6);
      steps.style.setProperty("--p", light(stepItems, steps, 0.6).toFixed(3));
    } else {
      // Stacked on a phone or tablet: each step lights up as it reaches the middle of the screen, and the
      // gold thread under it draws once its end is in view, leading the eye down to the next one.
      [jsteps, stepItems, stageItems].forEach(function (list) { flowEach(list); });
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // Our work: each card's recording plays while the pointer is over it (or, on a phone, while the
  // card is mostly on screen). The still picture stays underneath, so nothing is downloaded until needed.
  var cards = document.querySelectorAll(".card");
  function play(card) { var v = card.querySelector("video"); if (!v || reduce) return; card.classList.add("playing"); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  function stop(card) { var v = card.querySelector("video"); if (!v) return; card.classList.remove("playing"); v.pause(); }
  if (coarse) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.intersectionRatio >= 0.7) play(e.target); else stop(e.target); });
    }, { threshold: [0, 0.7] });
    cards.forEach(function (c) { vio.observe(c); });
  } else {
    cards.forEach(function (c) {
      c.addEventListener("mouseenter", function () { play(c); });
      c.addEventListener("mouseleave", function () { stop(c); });
      c.addEventListener("focusin", function () { play(c); });
      c.addEventListener("focusout", function () { stop(c); });
    });
  }

  // Promise tiles: on a phone a tap opens one (the text is always shown there anyway, see CSS).
  document.querySelectorAll(".vow").forEach(function (v) {
    v.addEventListener("click", function () { v.classList.toggle("open"); });
  });

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

  // First-look form: the WhatsApp message writes itself as you type. Nothing goes to a server.
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
