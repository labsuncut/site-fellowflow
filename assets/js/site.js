// FellowFlow brand site: language switch, hero words, the customer journey, the standard rings,
// work recordings on hover, packages path, process line, promise tiles, first-look form.
(function () {
  var WHATSAPP = "962796237444";
  var root = document.documentElement;
  // Old shared links used ?lang=ar on the English page: send them to the Arabic page, keeping any other
  // parameters. This runs before anything else, so the English page never starts to draw.
  if (root.lang !== "ar" && /[?&]lang=ar\b/.test(location.search)) {
    location.replace("ar/" + location.search.replace(/([?&])lang=ar\b&?/, "$1").replace(/[?&]$/, "") + location.hash);
    return;
  }
  root.classList.add("js");
  // The old language switch saved the choice in the browser; each language has its own page now.
  try { localStorage.removeItem("ff-lang"); } catch (e) {}
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;
  // Smooth scrolling (site.css) is for clicks and taps. While someone moves with the Tab key, the page jumps
  // straight to each link, so what has focus is always on screen. A Tab pressed while the page is still moving
  // glides instead: the browser then steers the glide to the new link, where an instant jump would not stop it.
  // The page moves during a glide (after a tap on a link, or after opening the page at a #section) and while the
  // browser animates the visitor's own wheel, swipe, Space, Page Down or arrow-key scroll.
  var scrolledAt = 0, moving = false, ownScroll = false, ownScrollAt = 0, settled = !location.hash, stopTimer;
  if (!settled) {
    window.addEventListener("scrollend", function () { settled = true; }, { once: true });
    setTimeout(function () { settled = true; }, 3000);
  }
  function stopped() { moving = false; ownScroll = false; }
  function ownScrolled() { ownScroll = true; ownScrollAt = Date.now(); }
  window.addEventListener("scroll", function () {
    scrolledAt = Date.now(); moving = true;
    // Browsers without the scrollend event: the page has stopped once no scroll arrives for a moment.
    if (!("onscrollend" in window)) { clearTimeout(stopTimer); stopTimer = setTimeout(stopped, 100); }
  }, { passive: true });
  window.addEventListener("scrollend", stopped);
  window.addEventListener("wheel", ownScrolled, { passive: true });
  window.addEventListener("touchmove", ownScrolled, { passive: true });
  document.addEventListener("keydown", function (ev) {
    var now = Date.now();
    if (/^(PageUp|PageDown|Home|End|ArrowUp|ArrowDown| )$/.test(ev.key) && !(ev.target.closest && ev.target.closest("input, textarea, select, button"))) ownScrolled();
    if (ev.key !== "Tab") return;
    // The visitor's own scroll (or a tapped link's glide) is running or about to start: glide.
    if (ownScroll && now - Math.max(ownScrollAt, scrolledAt) <= 500) root.classList.remove("keys");
    // The page is still: jump. During any other glide (one from an earlier Tab, say) nothing changes, so a glide
    // keeps gliding and quick Tabs keep jumping.
    else if (settled && !(moving && now - scrolledAt < 300)) { ownScroll = false; root.classList.add("keys"); }
  }, true);
  document.addEventListener("pointerdown", function (ev) {
    root.classList.remove("keys");
    // A tapped link to a section glides there, and the page may only start to move a moment later.
    if (ev.target.closest && ev.target.closest('a[href^="#"]')) ownScrolled();
  }, true);

  // Each language has its own page so search engines can read both: English is index.html, Arabic is
  // ar/index.html, built from index.html and the AR list below by tools/build-ar.mjs. After changing any
  // words in either file, run `node tools/build-ar.mjs` and commit both pages.
  var page = root.lang === "ar" ? "ar" : "en";

  // Arabic text (the source for ar/index.html). English lives in index.html.
  var AR = {
    skip: "انتقل إلى المحتوى",
    nav_what: "خدماتنا", nav_why: "لماذا نحن", nav_work: "أعمالنا", nav_services: "باقاتنا", nav_process: "طريقتنا", nav_promise: "وعدنا", nav_team: "الفريق",
    nav_cta: "نظرة أولى مجانية",
    hero_eyebrow: "مواقع وحضور رقمي للأعمال",
    hero_h1: "سهلٌ أن يجدوك. <em>سهلٌ أن يختاروك.</em>",
    hero_purpose: "لنساعد نشاطك التجاري على التدفّق بشكل أفضل.",
    hero_lede: "نبني الموقع والحضور الرقمي اللذين يجلبان العملاء للأعمال في عمّان: يجدونك على Google والخرائط، ويفهمونك في ثوانٍ، ويصلون إليك بلمسة واحدة.",
    hero_cta1: "ابدأ بنظرة أولى مجانية", hero_cta2: "راسلنا على واتساب",
    mk1: "مفحوص قبل الإطلاق", mk2: "بالعربية والإنجليزية", mk3: "يردّ عليك أحد المؤسسين",
    hero_proof: "كل موقع يجتاز فحص الجودة لدينا قبل أن يُنشر.",
    what_eyebrow: "ماذا نقدّم", what_h: "طريق واحد إلى عملائك. <em>نبنيه كلّه.</em>",
    what_p: "كل عميل يمرّ بالخطوات الأربع نفسها. ونحن نبني كل واحدة منها.",
    sv8_h: "تواصل بلمسة واحدة",
    sc_msg: "مرحبًا! هل تتوفر طاولة الليلة؟", sc_reply: "نعم، نراك الساعة 8!", sc_report: "التقرير الشهري", sc_r1: "الموقع متاح وسريع", sc_r2: "الملف دقيق", sc_r3: "كل الروابط تعمل",
    j4_h: "يعودون إليك", j4_p: "نبقيه سريعًا وصحيحًا، ونرسل لك تقريرًا كل شهر.", sv1_h: "تصميم الموقع وبناؤه", sv2_h: "فحص الموقع", sv3_h: "ملف Google التجاري",
    sv4_h: "الظهور في البحث (SEO)",
    sv5_h: "إجابات الذكاء الاصطناعي (GEO)",
    sv6_h: "الطلب والحجز والأتمتة",
    sv7_h: "الرعاية الشهرية والتقارير",
    why_eyebrow: "لماذا FellowFlow", why_h: "فريق واحد. <em>الطريق كلّه.</em>",
    why_p: "لا نبني لك موقعًا ثم نرحل. نبنيه، ونجعل عملاءك يجدونك، ونختبره كما تُختبر البرمجيات، ونبقى معك خطوة بخطوة: رفيقك على الإنترنت.",
    wm6: "ينمو", wb4_k: "رفيق يبقى معك", wb4_p: "تقرير شهري، واقتراحاتنا، وتحسينات مع نموّك.", wm4: "مفحوص", wm5: "منشور وملكك",
    wb1_k: "تنفيذ متكامل", wb1_p: "البحث والموقع والتواصل، يبنيها فريق واحد.",
    wb2_k: "فحص ما قبل الإطلاق", wb2_p: "السرعة والأمان وكل رابط، وباللغتين.",
    wb3_k: "ملكية كاملة", wb3_p: "نطاقك باسمك. بلا قيود.",
    sc_search: "مقهى قريب مني", sc_biz: "نشاطك التجاري", sc_open: "مفتوح الآن · على بُعد 5 دقائق",
    sc_k: "عمّان · مفتوح اليوم", sc_tag: "قهوة جيدة، قريبة منك.", sc_cta: "اطلب الآن", sc_offer: "ماذا نقدّم", sc_where: "أين تجدنا", sc_book: "احجز أو اطلب", sc_site: "yourbusiness.com",
    sc_call: "اتصال", sc_wa: "واتساب", sc_dir: "الاتجاهات",
    j1_h: "يبحثون", j1_p: "يظهر نشاطك حيث يبحث الناس: Google والخرائط ومساعدات الذكاء الاصطناعي.",
    j2_h: "يفتحون موقعك", j2_p: "كل ما يحتاج العميل إلى معرفته، واضح في ثوانٍ، بالعربية والإنجليزية.",
    j3_h: "يصلون إليك", j3_p: "لمسة واحدة للاتصال أو المراسلة أو الطلب.",
    gain_k: "ما تكسبه", gain1: "يجدونك", gain2: "يفهمونك", gain3: "يصلون إليك", gain_p: "لا يضيع أحد في الطريق.",
    std_eyebrow: "معيارنا", std_h: "هذا الموقع هو دراسة الحالة الأولى لنا. <em>مقاس، لا موعود.</em>",
    std_p: "كل موقع نبنيه يجتاز الفحوصات نفسها قبل أن يُنشر. هذه نتائج هذه الصفحة نفسها، مع التاريخ. إنها قياسات مخبرية نعيدها بعد كل إصدار، وليست وعدًا بالعملاء.",
    g1: "السرعة على الهاتف", g2: "السرعة على الحاسوب", g3: "الجاهزية للبحث", g_of: "من 100",
    c1: "رؤوس أمان صارمة، HTTPS فقط، ولا نصوص برمجية من طرف ثالث",
    c2: "كل رابط وزر يعمل، باللغتين، وعلى كل مقاس هاتف",
    c3: "لا أخطاء، لا شيء مقطوع عند 375 بكسل، ولا مخالفات في سهولة الوصول",
    c4: "تحرّك التخطيط على الهواتف قِيس 0.21 مقابل هدف أقل من 0.10: أُصلح في هذا الإصدار، وإعادة القياس قادمة",
    c5: "الصفحة العربية كانت تزن 2.7 ضعف الإنجليزية: قلّصنا الخطوط في هذا الإصدار، وإعادة القياس قادمة",
    std_foot: "قِيس في 30 تشرين الأول 2026 على fellowflow.ai بأداة Lighthouse 12.8 (ظروف مخبرية، إعدادات الهاتف والحاسوب) وبفحص ما قبل الإطلاق لدينا. ننشر القياس التالي بعد كل إصدار.",
    work_eyebrow: "أعمالنا", work_h: "مواقع بنيناها، <em>معروضة كما هي.</em>",
    work_p: "كل موقع بوضعه الحقيقي. مرّر المؤشر فوق أي موقع لتراه يتحرّك.",
    w_own: "هذا الموقع", st_own: "منشور · موقعنا", see_std: "شاهد نتائجه", play: "شغّل المعاينة",
    w_rest: "مطعم", w_gym: "نادٍ رياضي", w_wear: "أزياء الشارع", w_couture: "أزياء راقية", w_food: "برغر",
    st_trial: "تجربة حيّة", st_founder: "تجربة حيّة · يملكها المؤسسون", st_preview: "معاينة",
    view: "زيارة الموقع", view_prev: "مشاهدة المعاينة",
    legend: "<b>تجربة حيّة:</b> نشاط تجاري حقيقي يستخدم الموقع مجانًا بينما يمرّ بفحوصات الإطلاق لدينا. <b>منشور · موقعنا:</b> هذا الموقع، نديره كما ندير موقع أي عميل.",
    svc_eyebrow: "باقاتنا", svc_h: "نبني مرة. <em>ثم نبقى.</em>",
    svc_p: "نظرة أولى مجانية أولًا. ثم مشروع واحد لبناء موقعك، وعلاقة شهرية لتبقى ظاهرًا وتنمو. كل خطوة تُحدَّد كتابيًا قبل تسعيرها، ويُبلَّغ عنها بعدها.",
    st1_s: "منشور اليوم على موقعين تجريبيين", st2_s: "متاح الآن؛ تقاريرنا الشهرية الأولى تبدأ مع عملائنا الأوائل", st3_s: "متاح الآن؛ مقاس ومُبلَّغ عنه، ولا نضمنه أبدًا", incl_sum: "ما الذي تشمله",
    st1_k: "المرحلة الأولى", st1_h: "البناء", st1_l: "مشروع واحد، مكتوب بالكامل.",
    st1_1: "نظرة أولى مجانية، ثم نطاق مكتوب وسعر واضح", st1_2: "موقعك بالعربية والإنجليزية، مبني حول طريقة قرار عملائك", st1_3: "اتصال وواتساب واتجاهات وطلب بلمسة واحدة", st1_4: "مفحوص على نظام فحص ما قبل الإطلاق لدينا، ثم يُنشر على نطاقك وباسمك", st1_5: "مفحوص وفق قائمة الإطلاق لدينا",
    st2_k: "المرحلة الثانية", st2_h: "الرعاية", st2_l: "نبقى بعد الإطلاق.",
    st2_0: "فحص موقعك الحالي أولًا", st2_1: "موقعك سريع وآمن وصحيح، كل شهر", st2_2: "تقرير قصير كل شهر: ما فحصناه وما رأيناه", st2_3: "اقتراحاتنا، وما سيغيّره كل اقتراح لك", st2_5: "شخص معروف بالاسم تراسله على واتساب", st2_4: "تعديلات صغيرة متفق عليها كتابيًا، من دون مشروع جديد",
    st3_k: "المرحلة الثالثة", st3_h: "النمو", st3_l: "ليجدك عملاؤك، وتستمر في النمو.",
    st3_1: "ملفك على Google التجاري، دقيق ونشط", st3_2: "الظهور في البحث (SEO) وإجابات الذكاء الاصطناعي (GEO)، مقاسة ومُبلَّغ عنها، ولا نضمنها أبدًا", st3_3: "الطلب والحجز أونلاين والأتمتة، عندما تستحق كلفتها", st3_4: "كل خطوة متفق عليها ومسعّرة ومُبلَّغ عنها، كغيرها", st3_5: "الطلب والحجز أونلاين والأتمتة",
    start_h: "كل شيء يبدأ بنظرة أولى مجانية.",
    start_cta: "احجز نظرة أولى مجانية",
    proc_eyebrow: "طريقة عملنا", proc_h: "نفهم أولًا. <em>ثم نبني ونختبر ونبقى.</em>",
    s1_h: "الدراسة", s1_p: "ندرس نشاطك، ونستمع إليك، وننظر إلى كيف يجدك العملاء اليوم.",
    s2_h: "التوصية", s2_p: "ما يستحق العمل وما لا يستحقه. نطاق مكتوب وسعر واضح أولًا.",
    s3_h: "البناء", s3_p: "نصمّم ونبني بالعربية والإنجليزية، حول الطريقة التي يقرّر بها عملاؤك.",
    s5_h: "الإطلاق", s5_p: "منشور على نطاقك، وباسمك.", s6_h: "البقاء", s6_p: "تقرير شهري، واقتراحاتنا، وتحسينات مع تطوّر نشاطك.", s4_h: "الفحص", s4_p: "كل رابط وزر ومقاس هاتف، والسرعة، واللغتان، على نظام فحص ما قبل الإطلاق لدينا. ثم نصلح ونفحص من جديد.",
    prom_eyebrow: "<span class=\"rn\">VII</span> · وعدنا", prom_h: "خمسة أشياء <em>نُقسم عليها.</em>",
    p1_h: "نفهم قبل أن نوصي.", p1_p: "نستمع أولًا وننظر إلى الأدلة. إن كنت تحتاج تعديلًا صغيرًا، أو لا شيء على الإطلاق، سنقول لك ذلك.",
    p2_h: "لا نختلق شيئًا.", p2_p: "لا تقييمات مزيّفة، ولا جوائز مخترعة، ولا نتائج مستعارة. وأعمالنا معروضة بما هي عليه بالضبط.",
    p3_h: "لا نطلق شيئًا من دون فحص.", p3_p: "السرعة والأمان وكل رابط وزر، واللغتان، وكل مقاس هاتف: تُفحص على نظام فحص ما قبل الإطلاق لدينا قبل أن يُنشر أي شيء.",
    p4_h: "لا نقيّدك بنا.", p4_p: "يُسجَّل نطاقك باسمك.",
    p5_h: "لا نختفي.", p5_p: "ما بنيناه نحن مسؤولون عنه. بعد الإطلاق نبقيه سريعًا وصحيحًا، ونخبرك كل شهر بما رأيناه وما نقترحه.",
    prom_quote: "اختبارنا في كل مشروع: هل ستقول إننا فهمنا ما يهم، وسهّلنا الأمور، وسلّمنا ما وعدنا به؟",
    team_eyebrow: "الفريق", team_h: "الأشخاص <em>وراء التدفّق.</em>",
    team_note: "ثلاثة مؤسسين من عمّان. نبني كل موقع بأنفسنا، بأدوات الذكاء الاصطناعي وحكمنا الخاص، ونفحصه قبل أن يُنشر. تتحدث مع أحدنا، لا مع مدير حسابات.",
    n_wishta: "عبدالله كشتيني", n_weezy: "علي البوصيفي", n_mahmoud: "محمود أبو حجلة", role_cof: "شريك مؤسس",
    audit_eyebrow: "نظرة أولى مجانية", audit_h: "لنلقِ نظرة على <em>نشاطك.</em>",
    audit_p: "أخبرنا من أنت. ننظر إلى موقعك وإلى طريقة وصول العملاء إليك، ثم نخبرك بوضوح بما يستحق العمل. محادثة، لا عرض مبيعات.",
    audit_free: "مجانًا، ودون أي التزام.",
    af1_h: "تكتب لنا", af1_p: "رسالة واحدة على واتساب، أو النموذج هنا.", af2_h: "ننظر", af2_p: "يقرأها أحد المؤسسين وينظر إلى كيف يجدك العملاء ويصلون إليك اليوم.", af3_h: "نجيبك بوضوح", af3_p: "ما يستحق العمل وما لا يستحقه، وما نقترح البدء به. نطاق مكتوب فقط إن أردت المتابعة.",
    t_choose: "اختر نوعًا (اختياري)",
    f_biz: "اسم النشاط التجاري", f_type: "نوع النشاط",
    t_cafe: "مقهى أو مطعم", t_gym: "نادٍ رياضي أو استوديو", t_fashion: "ملابس أو أزياء", t_salon: "صالون أو عيادة", t_other: "شيء آخر",
    f_link: "رابط الموقع أو Instagram أو خرائط Google (اختياري)", f_name: "اسمك",
    f_send: "افتح واتساب مع هذه الرسالة",
    f_fine: "يفتح هذا واتساب على هاتفك أو حاسوبك مع تعبئة بياناتك. لا يرسل هذا الموقع شيئًا ولا يحفظه.",
    f_sent: "يُفتح واتساب الآن مع رسالتك. اضغط إرسال هناك، ويردّ عليك أحد المؤسسين شخصيًا. لم يُفتح؟ <a href=\"https://wa.me/962796237444\" target=\"_blank\" rel=\"noopener\">راسلنا مباشرة</a> أو اتصل على <a href=\"tel:+962796237444\" dir=\"ltr\">+962 79 623 7444</a>.",
    f_err: "يرجى إضافة اسم النشاط واسمك.",
    final_h: "عملاؤك يبحثون الآن. <em>دعهم يجدونك.</em>", final_cta: "احجز نظرة أولى مجانية", final_wa: "راسلنا على واتساب",
    foot_where: "مواقع وحضور رقمي للأعمال · عمّان، الأردن",
    bar_wa: "واتساب", bar_audit: "نظرة أولى مجانية", foot_privacy: "سياسة الخصوصية",
    menu_open: "القائمة", menu_close: "إغلاق القائمة"
  };
  var MENU_LABEL = { en: { menu_open: "Menu", menu_close: "Close menu" } };
  var MSG = {
    en: { hello: "Hello FellowFlow, I'd like a free first look at my business.", biz: "Business: ", type: "Type: ", link: "Link: ", name: "My name: ", ph_biz: "your business", ph_name: "your name" },
    ar: { hello: "مرحبًا FellowFlow، أودّ نظرة أولى مجانية على نشاطي التجاري.", biz: "النشاط: ", type: "النوع: ", link: "الرابط: ", name: "اسمي: ", ph_biz: "اسم نشاطك", ph_name: "اسمك" }
  };
  // On a phone there is nothing to hover, so these two lines say "tap" instead.
  var TOUCH = { en: { work_p: "Each one labelled by its real status. Tap the play button to see a site come alive." },
                ar: { work_p: "كل موقع بوضعه الحقيقي. المس زر التشغيل لترى الموقع يتحرّك." } };

  if (coarse) {
    document.querySelectorAll("[data-i18n]").forEach(function (n) { var t = TOUCH[page][n.getAttribute("data-i18n")]; if (t) n.innerHTML = t; });
  }
  if (page === "ar") document.querySelectorAll("[data-i18n-aria]").forEach(function (n) { var t = AR[n.getAttribute("data-i18n-aria")]; if (t) n.setAttribute("aria-label", t); });
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

  function lang() { return page; }
  // The language link opens the other page at the section that is on screen now, not back at the top.
  var langLink = document.getElementById("lang");
  langLink.addEventListener("click", function () {
    var here = "";
    document.querySelectorAll("main section[id]").forEach(function (s) { if (s.getBoundingClientRect().top < window.innerHeight * 0.4) here = s.id; });
    langLink.href = langLink.getAttribute("href").split("#")[0] + (here ? "#" + here : "");
  });

  // The opening overlay is gone (30 Oct 2026): the first screen's signature now plays beside the words, in hero.js.

  // Header line once the page scrolls.
  var top = document.querySelector(".top");

  var tabletQ = window.matchMedia("(max-width: 1000px)");
  // Reveal sections as they enter the screen. The packages path draws itself the same way.
  var io = new IntersectionObserver(function (entries) {
    // Anything already above the screen (a jump to #packages, a reload mid-page) counts as seen.
    entries.forEach(function (e) { if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal, .sheet, .path-wrap").forEach(function (el) { io.observe(el); });

  // The phone call bar stays out of the way while the first screen's own buttons are in view: one button, one place.
  var callbar = document.querySelector(".callbar"), ctaRow = document.querySelector(".hero .cta-row");
  if (callbar && ctaRow) new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { callbar.classList.toggle("off", e.isIntersecting); });
  }, { threshold: 0.5 }).observe(ctaRow);
  var stagePath = document.querySelector(".stage-line path");
  if (stagePath) stagePath.style.setProperty("--len", stagePath.getTotalLength());

  // Anything that keeps moving (the breathing mark, the seal, the sparks on the lines) pauses while it is off screen.
  var pauser = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      e.target.classList.toggle("paused", !e.isIntersecting);
      e.target.querySelectorAll("svg").forEach(function (s) { if (s.pauseAnimations) { e.isIntersecting ? s.unpauseAnimations() : s.pauseAnimations(); } });
    });
  }, { rootMargin: "60px 0px" });
  document.querySelectorAll(".hero-art, .certificate, .journey, .why-map").forEach(function (el) { pauser.observe(el); });
  // The rings in Our standard draw once the section is reached.
  var gauges = document.getElementById("gauges");
  if (gauges) io.observe(gauges);
  // Packages: on a phone or tablet the included lists start folded, so the page stays short; the first stays open.
  if (tabletQ.matches) document.querySelectorAll("details.incl-wrap").forEach(function (d, i) { if (i || window.innerWidth <= 640) d.removeAttribute("open"); });

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
  // The video borrows the still picture, at whatever size the browser already picked, as its poster.
  var cards = document.querySelectorAll(".card");
  function play(card) {
    var v = card.querySelector("video"), still = card.querySelector(".frame img");
    if (!v) return;
    if (!v.getAttribute("poster") && still && still.currentSrc) v.poster = still.currentSrc;
    card.classList.add("playing");
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }
  function stop(card) { var v = card.querySelector("video"); if (!v) return; card.classList.remove("playing"); v.pause(); }
  if (coarse) {
    // Nothing downloads by itself on a phone: the play button starts the recording, and it stops once off screen.
    cards.forEach(function (c) {
      var b = c.querySelector(".play-btn");
      if (b) b.addEventListener("click", function () { c.classList.contains("playing") ? stop(c) : play(c); });
    });
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (!e.isIntersecting) stop(e.target); });
    }, { threshold: [0, 0.2] });
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
  var sent = document.getElementById("form-sent");
  var bubble = document.getElementById("bubble-text");
  // The button starts disabled in the HTML, so if this script never runs the form can't put the answers
  // in a page address; a plain WhatsApp link shows instead until the form is ready.
  form.querySelector("button[type=submit]").disabled = false;
  form.classList.add("form-ready");
  function message(preview) {
    var m = MSG[lang()];
    var biz = form.biz.value.trim(), name = form.name.value.trim(), link = form.link.value.trim();
    var lines = [m.hello,
      m.biz + (biz || (preview ? "…" : "")),
      form.type.value ? m.type + form.type.options[form.type.selectedIndex].text : "",
      link ? m.link + link : "",
      m.name + (name || (preview ? "…" : ""))].filter(Boolean);
    return lines.join("\n");
  }
  function updateBubble() { bubble.textContent = message(true); }
  form.addEventListener("input", updateBubble);
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    // Take the visitor to the first empty field, with the message moved just above it. The page stops with the
    // field at the bottom of the screen, which leaves the most room for the message, even on a phone held sideways.
    var missing = !form.biz.value.trim() ? form.biz : !form.name.value.trim() ? form.name : null;
    if (missing) {
      err.hidden = false; sent.hidden = true;
      missing.closest("label").before(err);
      missing.scrollIntoView({ block: "end" });
      missing.focus({ preventScroll: true });
      return;
    }
    err.hidden = true;
    sent.hidden = false;
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message(false)), "_blank", "noopener");
  });

  // Phone and tablet menu. Opens from the header button, closes on the button, on a link, on Escape,
  // and whenever the window grows past the tablet width, so it can never be left open on a desktop.
  // While it is open, the page and footer behind it are switched off (inert), so Tab stays on what can be
  // seen: the header, the menu and the bottom bar.
  var menuBtn = document.getElementById("menu-btn");
  var menu = document.getElementById("menu");
  var main = document.getElementById("main"), foot = document.querySelector(".foot");
  var tablet = window.matchMedia("(max-width: 1000px)"); // the width where site.css shows the menu
  var menuOpen = false;
  function labelMenu() {
    var d = lang() === "ar" ? AR : MENU_LABEL.en;
    menuBtn.setAttribute("aria-label", menuOpen ? d.menu_close : d.menu_open);
  }
  function setMenu(open) {
    if (open === menuOpen) return;
    menuOpen = open;
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    root.classList.toggle("menu-open", open);
    // Focus left on the page (some browsers don't move it to a tapped button) moves to the menu button first.
    if (open && (main.contains(document.activeElement) || foot.contains(document.activeElement))) menuBtn.focus({ preventScroll: true });
    main.inert = open;
    foot.inert = open;
    labelMenu();
  }
  menuBtn.addEventListener("click", function () { setMenu(!menuOpen); });
  document.addEventListener("click", function (ev) {
    // A tap on a link (in the menu, the header or the bottom bar) closes the panel first; the browser then
    // scrolls to the section as usual.
    if (menuOpen && ev.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && menuOpen) { setMenu(false); menuBtn.focus(); } });
  window.addEventListener("resize", function () { if (menuOpen && !tablet.matches) setMenu(false); });
  window.addEventListener("pageshow", function () { setMenu(false); });

  // Start
  splitWords(); updateBubble(); labelMenu();
  onScroll();
  window.addEventListener("load", onScroll);
})();
