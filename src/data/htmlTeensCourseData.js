/**
 * htmlTeensCourseData.js
 * Comprehensive HTML5 & Web Development curriculum for Pakistani teen boys (Ages 13-16).
 * Features:
 * - 7 Modules, 21 Interactive Lessons
 * - Real teenage Pakistani projects (Esports & Gaming clans, PSL Cricket hub, Tech Startup, PC Builder)
 * - Bilingual (English & Nastaliq Urdu) explanations & voice scripts
 * - Coding challenges, starter code, hints, solutions
 * - 7 End-of-Module Quizzes + 10-Question Comprehensive Final Exam
 */

export const HTML_TEENS_COURSE = {
  id: "course-html-teens-pakistan",
  title: "HTML5 Web Developer: Teen Code Master (عمر 13-16 سال)",
  shortTitle: "HTML5 Web Developer",
  tagline: "Build Real Websites, Gaming Hubs & Tech Portfolios from Scratch! 💻🚀🇵🇰",
  description: "A fast-paced, hands-on web development course created specifically for Pakistani boys aged 13-16 (Matric & O-Levels). Master modern HTML5, semantic structure, interactive forms, responsive layouts, media embeds, and CSS styling. Build authentic projects like personal esports clans, PSL cricket portals, and PC builder shops with live in-browser preview, bilingual Urdu audio, quizzes, and an official printable D.TEN Certificate!",
  category: "Web Development & Coding",
  level: "Intermediate Teen (Ages 13-16)",
  membership: "free",
  thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  instructor: "WebMaster ⚡ & D.TEN Young Tech Academy",
  duration: "10 hours of interactive coding & projects",
  ageGroup: "13-16 Years",
  totalModules: 7,
  totalLessons: 21,
  rating: 5.0,
  reviewsCount: 640,
  status: "published",
  lessonCount: 21,
  lessons: [
    {
      id: "les-htmlteens-studio",
      title: "Interactive HTML5 Web Studio (Editor, Live Preview & Audio)",
      duration: "Flexible",
      type: "html_teens_studio"
    }
  ],

  modules: [
    // ─────────────────────────────────────────────────────────────
    // MODULE 1: The Blueprint of the Internet & First Web Page
    // ─────────────────────────────────────────────────────────────
    {
      id: 1,
      title: "Module 1: The Anatomy of the Web & First HTML Page",
      urduTitle: "ماڈیول 1: انٹرنیٹ کی بنیاد اور پہلا ویب پیج",
      badge: "Level 1 • Web Architect",
      color: "from-blue-600 to-cyan-600",
      description: "Learn how browsers read HTML, understand tags, opening/closing elements, the HTML5 document tree, and build your gamer bio.",
      urduDescription: "جانیے کہ براؤزر ویب سائٹس کیسے چلاتا ہے اور ایچ ٹی ایم ایل ٹیگز کی ساخت کیا ہے۔ اپنا پہلا گیمر پروفائل ویب پیج بنائیں!",
      lessons: [
        {
          id: "m1-l1",
          title: "Lesson 1: How Websites Work & Your First index.html",
          urduTitle: "سبق 1: ویب سائٹس کیسے کام کرتی ہیں اور پہلا ایچ ٹی ایم ایل کوڈ",
          concept: "HTML (HyperText Markup Language) is the structural skeleton of every website on Earth. Browsers read tags like <html>, <head>, and <body> to render text and media.",
          urduConcept: "ایچ ٹی ایم ایل دنیا کی تمام ویب سائٹس کی بنیاد اور ڈھانچہ ہے۔ براؤزر ٹیگز کو پڑھ کر ویب پیج دکھاتا ہے۔ ٹیگ ہمیشہ اینگل بریکٹس میں لکھا جاتا ہے جیسے <h1>۔",
          englishVoice: "Welcome future web developer! Every website you visit, from YouTube to your favorite gaming portal, starts with HTML. Think of HTML as the brick-and-mortar of the internet. Let's build your very first web page right now!",
          urduVoice: "خوش آمدید نوجوان ڈویلپر! دنیا کی ہر بڑی ویب سائٹ ایچ ٹی ایم ایل سے شروع ہوتی ہے۔ یہ انٹرنیٹ کی عمارت کی بنیاد ہے۔ آئیے مل کر اپنا پہلا اصلی ویب پیج بناتے ہیں!",
          pakistaniContext: "Every Pakistani tech entrepreneur from Karachi to Lahore started with HTML. Let's make an introduction page for a Pakistani teen coder!",
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Salam World! 🇵🇰</h1>
  <p>I am a 14-year-old coder from Pakistan learning HTML5 web development.</p>
  <p>Goal: Build the next big Pakistani tech startup!</p>
</body>
</html>`,
          challenge: "Add a new paragraph with your favorite hobby (e.g. PC Gaming, Cricket, or Robotics) and see it update instantly in the Live Preview!",
          hint: "Use the <p> tag: <p>My passion is competitive CS:GO and building gaming PCs.</p>",
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Salam World! 🇵🇰</h1>
  <p>I am a 14-year-old coder from Pakistan learning HTML5 web development.</p>
  <p>My passion is competitive gaming, coding, and building custom gaming rigs!</p>
</body>
</html>`,
          funFact: "Tim Berners-Lee invented HTML in 1991 at CERN to help scientists share research papers!"
        },
        {
          id: "m1-l2",
          title: "Lesson 2: Headings, Formatting & Typography Power",
          urduTitle: "سبق 2: ہیڈنگز اور ٹیکسٹ فارمیٹنگ کی طاقت",
          concept: "HTML provides 6 levels of headings: <h1> to <h6>. Use <strong> for bold, <em> for emphasis, <mark> for highlights, and <hr> for horizontal divider lines.",
          urduConcept: "ایچ ٹی ایم ایل میں 6 درجات کی ہیڈنگز ہوتی ہیں، ایچ 1 سب سے بڑی اور ایچ 6 سب سے چھوٹی۔ بولڈ ٹیکسٹ کے لیے strong اور ہائی لائٹ کے لیے mark استعمال ہوتا ہے۔",
          englishVoice: "Hierarchy is everything in web design. An h1 tag is your main headline, while h2 and h3 structure your sections. Formatting tags like strong and mark make key stats jump off the screen!",
          urduVoice: "اچھی ویب سائٹ میں ہیڈنگز کی ترتیب بہت اہم ہوتی ہے۔ ایچ 1 مین ہیڈ لائن کے لیے جبکہ ایچ 2 اور ایچ 3 ذیلی سرخیوں کے لیے ہوتے ہیں۔ اسٹرانگ اور مارک ٹیگ ضروری باتوں کو نمایاں کرتے ہیں۔",
          pakistaniContext: "Create a match breaking-news report for Pakistan Super League (PSL) cricket match between Lahore Qalandars and Karachi Kings!",
          starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>PSL Super Clash: Lahore vs Karachi 🏏</h1>
  <h2>Live Match Report - Gaddafi Stadium</h2>
  <hr>
  <p>What an electric finish! Shaheen Afridi bowled an <strong>unbelievable 145 km/h yorker</strong> in the final over.</p>
  <p>Babar Azam scored <mark>84 runs off 52 balls</mark> showing pure masterclass technique.</p>
  <h3>Man of the Match Contenders:</h3>
  <p><em>Shaheen Shah Afridi</em> (3 wickets) vs <em>Babar Azam</em> (84 runs).</p>
</body>
</html>`,
          challenge: "Add an <h4> heading for 'Crowd Attendance' and bold the number of fans: <strong>32,000 energetic fans</strong>.",
          hint: "Type <h4>Attendance: <strong>32,000 Fans</strong></h4>",
          solution: `<!DOCTYPE html>
<html>
<body>
  <h1>PSL Super Clash: Lahore vs Karachi 🏏</h1>
  <h2>Live Match Report - Gaddafi Stadium</h2>
  <hr>
  <p>What an electric finish! Shaheen Afridi bowled an <strong>unbelievable 145 km/h yorker</strong> in the final over.</p>
  <p>Babar Azam scored <mark>84 runs off 52 balls</mark> showing pure masterclass technique.</p>
  <h3>Man of the Match Contenders:</h3>
  <p><em>Shaheen Shah Afridi</em> (3 wickets) vs <em>Babar Azam</em> (84 runs).</p>
  <h4>Match Attendance: <strong>32,000 passionate fans</strong> at Gaddafi Stadium!</h4>
</body>
</html>`,
          funFact: "Search engines like Google give the highest ranking weight to your <h1> tag, so every web page should have exactly one <h1>!"
        },
        {
          id: "m1-l3",
          title: "Lesson 3: Hacker Bio & Project 1: Personal Dev Card",
          urduTitle: "سبق 3: ہیکر بائیو اور پروجیکٹ: پرسنل کوڈر پروفائل کارڈ",
          concept: "Combine comments <!-- comment -->, blockquotes <blockquote>, code tags <code>, and preformatted text <pre> to create a programmer's terminal bio.",
          urduConcept: "ایچ ٹی ایم ایل میں کوڈ ٹیگ پروگرامنگ کے کوڈ کو دکھانے کے لیے اور کمنٹس اندرونی نوٹس لکھنے کے لیے استعمال ہوتے ہیں۔ کمنٹس براؤزر پر نظر نہیں آتے۔",
          englishVoice: "Let's build your very first complete project! A tech hacker and gamer profile card. We will use the code tag to display terminal commands and blockquotes for your coding mantra.",
          urduVoice: "آئیے اپنا پہلا مکمل پروجیکٹ بناتے ہیں۔ ایک زبردست ٹیک ہیکر اور گیمر بائیو کارڈ۔ کوڈ ٹیگ کے ذریعے ٹرمینل کمانڈز اور کوٹیشنز سجائیے!",
          pakistaniContext: "Build a Pakistani Cyber Shield & Teen Developer bio card with custom terminal styling.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: #0d1117; color: #58a6ff; font-family: monospace; padding: 20px; }
    h1 { color: #2ea043; border-bottom: 2px solid #2ea043; }
    .card { background-color: #161b22; padding: 18px; border-radius: 10px; border: 1px solid #30363d; }
    code { color: #f0883e; background: #21262d; padding: 2px 6px; border-radius: 4px; }
    blockquote { border-left: 3px solid #f0883e; margin-left: 0; padding-left: 12px; color: #8b949e; }
  </style>
</head>
<body>
  <!-- Teen Developer Profile Card Project -->
  <div class="card">
    <h1>[ROOT@PAK-CYBER-SHIELD ~]# whoami</h1>
    <p>Codename: <strong>CyberWolf_PK</strong> | Location: <strong>Islamabad, Pakistan 🇵🇰</strong></p>
    <p>Specialty: Web Security, HTML5/CSS3, Python Bot Scripting.</p>
    <blockquote>
      "Talk is cheap. Show me the code." - Linus Torvalds
    </blockquote>
    <p>Terminal Command to ping server: <code>ping -c 4 dten.pakistan.edu</code></p>
  </div>
</body>
</html>`,
          challenge: "Add a new line with your personal gaming Discord handle or GitHub username using the <code> tag.",
          hint: '<p>GitHub: <code>github.com/my-tech-alias</code></p>',
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: #0d1117; color: #58a6ff; font-family: monospace; padding: 20px; }
    h1 { color: #2ea043; border-bottom: 2px solid #2ea043; }
    .card { background-color: #161b22; padding: 18px; border-radius: 10px; border: 1px solid #30363d; }
    code { color: #f0883e; background: #21262d; padding: 2px 6px; border-radius: 4px; }
    blockquote { border-left: 3px solid #f0883e; margin-left: 0; padding-left: 12px; color: #8b949e; }
  </style>
</head>
<body>
  <div class="card">
    <h1>[ROOT@PAK-CYBER-SHIELD ~]# whoami</h1>
    <p>Codename: <strong>CyberWolf_PK</strong> | Location: <strong>Islamabad, Pakistan 🇵🇰</strong></p>
    <p>Specialty: Web Security, HTML5/CSS3, Python Bot Scripting.</p>
    <blockquote>
      "Talk is cheap. Show me the code." - Linus Torvalds
    </blockquote>
    <p>Terminal Command to ping server: <code>ping -c 4 dten.pakistan.edu</code></p>
    <p>Discord Clan Handle: <code>@PakGamer_99#1234</code></p>
  </div>
</body>
</html>`,
          funFact: "Comments in HTML are written like <!-- your comment here --> and are completely ignored by the web browser!"
        }
      ],
      quiz: {
        title: "Module 1 Assessment: HTML Foundations & Syntax",
        urduTitle: "ماڈیول 1 ٹیسٹ: ایچ ٹی ایم ایل کی بنیادیں اور ٹیگز",
        questions: [
          {
            question: "What does HTML stand for?",
            urduQuestion: "ایچ ٹی ایم ایل (HTML) کا مکمل مخفف کیا ہے؟",
            options: [
              "HyperText Markup Language",
              "High Tech Modern Language",
              "Hyperlink Text Machine Learning",
              "Home Tool Management Layer"
            ],
            answer: 0,
            explanation: "HTML stands for HyperText Markup Language, the standard markup language for creating web pages."
          },
          {
            question: "Which HTML tag produces the largest and most important heading?",
            urduQuestion: "ویب پیج پر سب سے بڑی اور اہم ہیڈنگ کے لیے کون سا ٹیگ استعمال ہوتا ہے؟",
            options: ["<h6>", "<head>", "<h1>", "<heading>"],
            answer: 2,
            explanation: "<h1> is the top-level heading on an HTML page, reserved for the primary page title."
          },
          {
            question: "How do you write a comment in HTML that the browser will ignore?",
            urduQuestion: "ایچ ٹی ایم ایل میں ایسا کمنٹ کیسے لکھا جاتا ہے جسے براؤزر نظر انداز کرے؟",
            options: [
              "// This is a comment",
              "<!-- This is a comment -->",
              "/* This is a comment */",
              "# This is a comment"
            ],
            answer: 1,
            explanation: "HTML comments start with <!-- and end with -->."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 2: Links, Media & Pakistani Tech Showcase
    // ─────────────────────────────────────────────────────────────
    {
      id: 2,
      title: "Module 2: Hyperlinks, Images & Media Embedding",
      urduTitle: "ماڈیول 2: ہائپر لنکس، تصاویر اور ملٹی میڈیا",
      badge: "Level 2 • Media Engineer",
      color: "from-emerald-600 to-teal-600",
      description: "Connect pages with anchors, embed responsive images, and integrate audio and video players for gaming highlights.",
      urduDescription: "ویب پیجز کو آپس میں جوڑنے کے لیے لنکس بنانا سیکھیں، خوبصورت تصاویر لگائیں، اور گیمنگ ویڈیوز چلائیں!",
      lessons: [
        {
          id: "m2-l1",
          title: "Lesson 1: Hyperlinks & Navigation (The 'Web' in World Wide Web)",
          urduTitle: "سبق 1: لنکس اور نیویگیشن (انٹرنیٹ کا جادوئی جال)",
          concept: "The anchor tag <a href=\"URL\"> creates clickable hyperlinks. Use target=\"_blank\" to open in a new tab, and mailto: or tel: for contact links.",
          urduConcept: "اینکر ٹیگ <a href=\"...\"> کسی بھی ٹیکسٹ یا تصویر کو کلک کے قابل بناتا ہے۔ نیا ٹیب کھولنے کے لیے target=\"_blank\" لکھا جاتا ہے۔",
          englishVoice: "Hyperlinks are what connect the entire internet together! With the 'a' tag and 'href' attribute, you can link to Pakistani educational portals, your favorite YouTube streams, or jump to sections on your own page.",
          urduVoice: "ہائپر لنکس ہی پوری دنیا کے کمپیوٹرز کو آپس میں جوڑتے ہیں۔ اینکر ٹیگ کے ذریعے آپ کسی بھی لفظ پر کلک کر کے نیا پیج کھول سکتے ہیں۔ آئیے لنکس بنانا سیکھتے ہیں!",
          pakistaniContext: "Create a curated Pakistani Youth Tech Resource Hub with one-click links to learn coding and tech.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f0fdf4; }
    .link-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 10px; }
    a { color: #15803d; font-weight: bold; text-decoration: none; }
    a:hover { text-decoration: underline; color: #166534; }
  </style>
</head>
<body>
  <h2>🇵🇰 Pakistani Teen Tech Portal: Top Resources</h2>
  <div class="link-box">
    <p>🎓 Official Learning: <a href="https://dten.edu.pk" target="_blank">D.TEN Technical Education Network</a></p>
  </div>
  <div class="link-box">
    <p>🏏 Sports Live Hub: <a href="https://www.pcb.com.pk" target="_blank">Pakistan Cricket Board (PCB)</a></p>
  </div>
  <div class="link-box">
    <p>📧 Contact Dev: <a href="mailto:youngcoder@pakistan.edu">Email our Tech Club</a></p>
  </div>
</body>
</html>`,
          challenge: "Add a 4th link box for 'National Space Agency' linking to SUPARCO (https://suparco.gov.pk) with target='_blank'.",
          hint: '<div class="link-box"><p>🚀 Space Hub: <a href="https://suparco.gov.pk" target="_blank">SUPARCO Pakistan</a></p></div>',
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f0fdf4; }
    .link-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 10px; }
    a { color: #15803d; font-weight: bold; text-decoration: none; }
    a:hover { text-decoration: underline; color: #166534; }
  </style>
</head>
<body>
  <h2>🇵🇰 Pakistani Teen Tech Portal: Top Resources</h2>
  <div class="link-box">
    <p>🎓 Official Learning: <a href="https://dten.edu.pk" target="_blank">D.TEN Technical Education Network</a></p>
  </div>
  <div class="link-box">
    <p>🏏 Sports Live Hub: <a href="https://www.pcb.com.pk" target="_blank">Pakistan Cricket Board (PCB)</a></p>
  </div>
  <div class="link-box">
    <p>📧 Contact Dev: <a href="mailto:youngcoder@pakistan.edu">Email our Tech Club</a></p>
  </div>
  <div class="link-box">
    <p>🚀 Space Hub: <a href="https://suparco.gov.pk" target="_blank">SUPARCO Pakistan Space Agency</a></p>
  </div>
</body>
</html>`,
          funFact: "The 'a' tag stands for Anchor, because it anchors two different documents together across cyberspace!"
        },
        {
          id: "m2-l2",
          title: "Lesson 2: Images, Responsive Dimensions & Alt Accessibility",
          urduTitle: "سبق 2: تصاویر لگانا، چوڑائی سیٹ کرنا اور آلٹ ٹیکسٹ",
          concept: "The <img src=\"image.jpg\" alt=\"description\"> tag is self-closing. Always include the alt attribute for screen readers and SEO. Use width and height or CSS to make images responsive.",
          urduConcept: "تصویر لگانے کے لیے img ٹیگ استعمال ہوتا ہے جس کا کوئی کلوزنگ ٹیگ نہیں ہوتا۔ alt ایٹریبیوٹ تصویر کی وضاحت کے لیے ہمیشہ ضروری ہوتا ہے۔",
          englishVoice: "A website without graphics is boring. With the img tag, you specify the source url and descriptive alt text. Great developers always add alt text so their website is accessible to visually impaired users!",
          urduVoice: "تصویروں کے بغیر ویب سائٹ ادھوری لگتی ہے۔ img ٹیگ کے ساتھ src میں تصویر کا لنک اور alt میں اس کی تفصیل دی جاتی ہے۔ آئیے ایک شاندار گیلری بناتے ہیں!",
          pakistaniContext: "Build a showcase card for northern Pakistan's majestic mountains (K2 and Karakoram Highway) and esports gaming gear.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    .gallery { display: flex; gap: 15px; flex-wrap: wrap; }
    .card { background: #1e293b; border-radius: 12px; overflow: hidden; width: 280px; border: 1px solid #334155; }
    img { width: 100%; height: 160px; object-fit: cover; }
    .desc { padding: 12px; }
    h3 { margin: 0 0 6px 0; color: #38bdf8; font-size: 16px; }
    p { margin: 0; color: #94a3b8; font-size: 13px; }
  </style>
</head>
<body>
  <h2>🏔️ Incredible Pakistan & Tech Showcase</h2>
  <div class="gallery">
    <div class="card">
      <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600" alt="Majestic K2 Mountain in Gilgit-Baltistan Pakistan">
      <div class="desc">
        <h3>K2: Savage Mountain (8,611m)</h3>
        <p>The 2nd highest peak in the world, located in Gilgit-Baltistan, Pakistan.</p>
      </div>
    </div>
    <div class="card">
      <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600" alt="Mechanical Gaming Keyboard with RGB lighting">
      <div class="desc">
        <h3>Pakistani Esports Setup</h3>
        <p>Pro RGB mechanical keyboard for competitive Valorant and Tekken tournaments.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
          challenge: "Add border-radius: 8px to the images and see how modern curved corners make websites look ultra-premium!",
          hint: "Inside the <style> block, change 'img { width: 100%; height: 160px; object-fit: cover; }' to include 'border-radius: 8px;'",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    .gallery { display: flex; gap: 15px; flex-wrap: wrap; }
    .card { background: #1e293b; border-radius: 12px; overflow: hidden; width: 280px; border: 1px solid #334155; }
    img { width: 100%; height: 160px; object-fit: cover; border-radius: 8px; }
    .desc { padding: 12px; }
    h3 { margin: 0 0 6px 0; color: #38bdf8; font-size: 16px; }
    p { margin: 0; color: #94a3b8; font-size: 13px; }
  </style>
</head>
<body>
  <h2>🏔️ Incredible Pakistan & Tech Showcase</h2>
  <div class="gallery">
    <div class="card">
      <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600" alt="Majestic K2 Mountain in Gilgit-Baltistan Pakistan">
      <div class="desc">
        <h3>K2: Savage Mountain (8,611m)</h3>
        <p>The 2nd highest peak in the world, located in Gilgit-Baltistan, Pakistan.</p>
      </div>
    </div>
    <div class="card">
      <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600" alt="Mechanical Gaming Keyboard with RGB lighting">
      <div class="desc">
        <h3>Pakistani Esports Setup</h3>
        <p>Pro RGB mechanical keyboard for competitive Valorant and Tekken tournaments.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
          funFact: "In HTML5, you can wrap an image inside an anchor tag <a href='...'><img ...></a> to turn the entire image into a clickable button!"
        },
        {
          id: "m2-l3",
          title: "Lesson 3: HTML5 Audio, Video Players & Project 2: Gaming Stream Hub",
          urduTitle: "سبق 3: آڈیو، ویڈیو پلیئرز اور پروجیکٹ: گیمنگ اسٹریم ہب",
          concept: "HTML5 brought native <video controls> and <audio controls> tags, eliminating the need for flash plugins. You can specify poster images, autoplay, loop, and muted attributes.",
          urduConcept: "ایچ ٹی ایم ایل 5 کے ساتھ ویڈیو اور آڈیو چلانا بہت آسان ہو گیا ہے۔ ویڈیو ٹیگ کے اندر controls لکھنے سے پلے، پاز اور والیوم کے بٹن خودکار بن جاتے ہیں۔",
          englishVoice: "Video content drives the web. In this lesson, we build a Gaming Streamer Hub featuring native HTML5 media controls and an embedded stream highlight player!",
          urduVoice: "یوٹیوب اور ٹویچ کی طرح آپ اپنے ویب پیج پر اصلی ویڈیو پلیئر لگا سکتے ہیں۔ ویڈیو ٹیگ میں سورس کا لنک دے کر ہم اپنا اسپورٹس گیمنگ ہب بنائیں گے!",
          pakistaniContext: "Build a Pakistani Teen Gaming Clan Stream Hub celebrating Pakistan's world-famous Tekken and Valorant champions (like Arslan Ash)!",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background: #111827; color: #f3f4f6; padding: 20px; }
    .player-container { background: #1f2937; border-radius: 12px; padding: 20px; max-width: 500px; border: 2px solid #374151; }
    h2 { color: #10b981; margin-top: 0; }
    video { width: 100%; border-radius: 8px; border: 1px solid #4b5563; }
    .badge { background: #ef4444; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="player-container">
    <span class="badge">LIVE STREAM HIGHLIGHT</span>
    <h2>🎮 Lahore Cyber Kings: Match Winning Combo</h2>
    <video controls poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p>Player: <strong>Arslan_Slayer_PK</strong> | Tournament: <em>National Esports Finals</em></p>
    <audio controls style="width: 100%; margin-top: 10px;">
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    </audio>
  </div>
</body>
</html>`,
          challenge: "Add the 'loop' attribute to the video tag so it automatically repeats when it reaches the end!",
          hint: "Change <video controls ...> to <video controls loop ...>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background: #111827; color: #f3f4f6; padding: 20px; }
    .player-container { background: #1f2937; border-radius: 12px; padding: 20px; max-width: 500px; border: 2px solid #374151; }
    h2 { color: #10b981; margin-top: 0; }
    video { width: 100%; border-radius: 8px; border: 1px solid #4b5563; }
    .badge { background: #ef4444; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="player-container">
    <span class="badge">LIVE STREAM HIGHLIGHT</span>
    <h2>🎮 Lahore Cyber Kings: Match Winning Combo</h2>
    <video controls loop poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p>Player: <strong>Arslan_Slayer_PK</strong> | Tournament: <em>National Esports Finals</em></p>
    <audio controls style="width: 100%; margin-top: 10px;">
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    </audio>
  </div>
</body>
</html>`,
          funFact: "Before HTML5 was introduced in 2014, playing a video required clunky Flash Player plugins that crashed browsers constantly!"
        }
      ],
      quiz: {
        title: "Module 2 Assessment: Hyperlinks & Media Elements",
        urduTitle: "ماڈیول 2 ٹیسٹ: لنکس اور ملٹی میڈیا ایلیمنٹس",
        questions: [
          {
            question: "Which attribute tells an <a> link to open in a brand new browser tab?",
            urduQuestion: "لنک کو نئے براؤزر ٹیب میں کھولنے کے لیے کون سا ایٹریبیوٹ استعمال ہوتا ہے؟",
            options: ["target=\"_blank\"", "newtab=\"true\"", "window=\"new\"", "href=\"_blank\""],
            answer: 0,
            explanation: "target=\"_blank\" instructs the browser to open the linked document in a new window or tab."
          },
          {
            question: "Why is the 'alt' attribute mandatory for good quality web images?",
            urduQuestion: "تصاویر میں alt ایٹریبیوٹ لکھنا کیوں لازمی سمجھا جاتا ہے؟",
            options: [
              "It changes image brightness",
              "It provides text for screen-readers and displays if the image fails to load",
              "It compresses the image size",
              "It turns the image into a 3D model"
            ],
            answer: 1,
            explanation: "The alt attribute provides alternative text for accessibility and displays if an image link is broken."
          },
          {
            question: "Which attribute must you add to a <video> element so users can pause, play, and adjust volume?",
            urduQuestion: "ویڈیو ایلیمنٹ میں پلے، پاز اور والیوم کے بٹن لانے کے لیے کیا لکھنا ضروری ہے؟",
            options: ["controls", "buttons=\"on\"", "play=\"true\"", "interactive"],
            answer: 0,
            explanation: "The boolean 'controls' attribute enables standard play, pause, seek, and volume sliders."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 3: Lists, Navigation & Modern Semantic Web
    // ─────────────────────────────────────────────────────────────
    {
      id: 3,
      title: "Module 3: Semantic HTML5 Structure & Navigation Bars",
      urduTitle: "ماڈیول 3: سمینٹک ایچ ٹی ایم ایل اور نیویگیشن بار",
      badge: "Level 3 • UI Architect",
      color: "from-amber-500 to-orange-600",
      description: "Replace messy 'div soup' with modern HTML5 semantic landmarks (<header>, <nav>, <main>, <article>, <aside>, <footer>) and build top navbars.",
      urduDescription: "پرانے بے ربط کوڈ کی جگہ جدید سمینٹک ٹیگز استعمال کریں تاکہ گوگل سرچ اور موبائل پر آپ کی ویب سائٹ فرسٹ کلاس نظر آئے!",
      lessons: [
        {
          id: "m3-l1",
          title: "Lesson 1: Ordered, Unordered & Nested Lists",
          urduTitle: "سبق 1: نمبر والی اور بلٹ پوائنٹس کی لسٹس",
          concept: "Unordered lists (<ul>) render bullet points. Ordered lists (<ol>) render numbers (1, 2, 3). Each item is wrapped in an <li> tag. Lists can also be nested.",
          urduConcept: "بلٹس کے لیے ul ٹیگ اور نمبروں والی فہرست کے لیے ol ٹیگ استعمال ہوتا ہے۔ فہرست کی ہر شے کو li کے اندر لکھا جاتا ہے۔",
          englishVoice: "Whether you are making a recipe, a top-10 gaming ranking, or a website navigation menu, lists are the workhorse of web layouts. Let's create an ultimate PC Gaming Build list!",
          urduVoice: "کسی بھی ویب سائٹ پر مینیو، رینکنگ یا پوائنٹس بنانے کے لیے لسٹس کا استعمال ہوتا ہے۔ آئیے پاکستان میں ٹاپ پی سی گیمنگ سسٹم کی لسٹ بناتے ہیں!",
          pakistaniContext: "Create a Matric/O-Level student's Dream PC Gaming Build specifications in PKR.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; background: #fafafa; }
    .box { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 450px; }
    h2 { color: #d97706; }
    ul { list-style-type: square; color: #374151; }
    ol { color: #1f2937; font-weight: 500; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🖥️ Budget Gaming Rig (PKR 120,000)</h2>
    <p>Top parts available in Hafeez Centre Lahore & Techno City Karachi:</p>
    <ol>
      <li>Processor: Intel Core i5 12th Gen</li>
      <li>Graphics Card: Nvidia RTX 3060 12GB</li>
      <li>RAM: 16GB DDR4 3200MHz HyperX</li>
      <li>Storage: 512GB NVMe M.2 SSD</li>
    </ol>
    <h3>Must-Play Games on this Rig:</h3>
    <ul>
      <li>Counter-Strike 2 (240 FPS)</li>
      <li>GTA V Enhanced</li>
      <li>Tekken 8</li>
    </ul>
  </div>
</body>
</html>`,
          challenge: "Add a 4th game to the unordered list: 'Cricket 24' and see the square bullet appear!",
          hint: "Add <li>Cricket 24</li> inside the <ul>...</ul> block.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; background: #fafafa; }
    .box { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 450px; }
    h2 { color: #d97706; }
    ul { list-style-type: square; color: #374151; }
    ol { color: #1f2937; font-weight: 500; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🖥️ Budget Gaming Rig (PKR 120,000)</h2>
    <p>Top parts available in Hafeez Centre Lahore & Techno City Karachi:</p>
    <ol>
      <li>Processor: Intel Core i5 12th Gen</li>
      <li>Graphics Card: Nvidia RTX 3060 12GB</li>
      <li>RAM: 16GB DDR4 3200MHz HyperX</li>
      <li>Storage: 512GB NVMe M.2 SSD</li>
    </ol>
    <h3>Must-Play Games on this Rig:</h3>
    <ul>
      <li>Counter-Strike 2 (240 FPS)</li>
      <li>GTA V Enhanced</li>
      <li>Tekken 8</li>
      <li>Cricket 24 (Pakistan Stadiums Edition)</li>
    </ul>
  </div>
</body>
</html>`,
          funFact: "Almost every navigation bar on the internet is secretly an unordered list (<ul>) styled horizontally with CSS!"
        },
        {
          id: "m3-l2",
          title: "Lesson 2: Semantic HTML5 Architecture (No More Div Soup!)",
          urduTitle: "سبق 2: سمینٹک ٹیگز کا کمال (ہیڈر، نیو، مین اور فوٹر)",
          concept: "Semantic tags clearly describe their meaning to both browser and developer. Key tags: <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>.",
          urduConcept: "سمینٹک ٹیگز کوڈ کو باوقار اور منظم بناتے ہیں۔ جیسے ہیڈر میں ٹاپ لوگو، نیو میں مینیو، مین میں اصل مواد اور فوٹر میں کاپی رائٹ کی معلومات آتی ہیں۔",
          englishVoice: "In the old days, developers used div tags for everything. Now, HTML5 gives us meaningful landmark tags like header, main, and footer. This allows Google to index your content much faster!",
          urduVoice: "پرانے زمانے میں ہر چیز کے لیے div استعمال ہوتا تھا۔ اب ایچ ٹی ایم ایل 5 میں خاص نام والے ٹیگز جیسے header, nav, main اور footer ہیں جو کوڈ کو پڑھنا اور سمجھنا انتہائی آسان بناتے ہیں۔",
          pakistaniContext: "Build the semantic skeleton for a Pakistani Tech News publication: 'PakTech Wire'.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; background: #f8fafc; }
    header { background: #047857; color: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #d1fae5; text-decoration: none; margin-left: 15px; font-weight: bold; }
    main { padding: 25px; max-width: 700px; margin: auto; background: white; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    article { border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
    footer { text-align: center; padding: 20px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <!-- Semantic Header -->
  <header>
    <h2>🇵🇰 PakTech Wire</h2>
    <nav>
      <a href="#ai">AI News</a>
      <a href="#esports">Esports</a>
      <a href="#gadgets">Gadgets</a>
    </nav>
  </header>

  <!-- Semantic Main Content -->
  <main>
    <article id="ai">
      <h2>Pakistani University Students Win Global AI Cup</h2>
      <p>A team of young engineers from NUST Islamabad developed an agricultural drone powered by computer vision.</p>
    </article>
  </main>

  <!-- Semantic Footer -->
  <footer>
    <p>&copy; 2026 PakTech Wire - Islamabad, Pakistan. Built with Semantic HTML5.</p>
  </footer>
</body>
</html>`,
          challenge: "Add an <aside> block inside or below <main> with a quick fact about Pakistani freelance developers.",
          hint: '<aside style="background: #ecfdf5; padding: 10px; border-left: 4px solid #10b981;"><p><strong>Did you know?</strong> Pakistan ranks in the top 4 freelance developer countries globally!</p></aside>',
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; background: #f8fafc; }
    header { background: #047857; color: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #d1fae5; text-decoration: none; margin-left: 15px; font-weight: bold; }
    main { padding: 25px; max-width: 700px; margin: auto; background: white; margin-top: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    article { border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
    footer { text-align: center; padding: 20px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <h2>🇵🇰 PakTech Wire</h2>
    <nav>
      <a href="#ai">AI News</a>
      <a href="#esports">Esports</a>
      <a href="#gadgets">Gadgets</a>
    </nav>
  </header>

  <main>
    <article id="ai">
      <h2>Pakistani University Students Win Global AI Cup</h2>
      <p>A team of young engineers from NUST Islamabad developed an agricultural drone powered by computer vision.</p>
    </article>
    <aside style="background: #ecfdf5; padding: 12px; border-left: 4px solid #10b981; margin-top: 15px;">
      <p><strong>💡 Industry Fact:</strong> Pakistan ranks among the top 4 freelance developer hubs globally!</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 PakTech Wire - Islamabad, Pakistan. Built with Semantic HTML5.</p>
  </footer>
</body>
</html>`,
          funFact: "Using semantic tags improves web accessibility (a11y) so screen readers can automatically announce 'Entering Navigation' or 'Article Content'."
        },
        {
          id: "m3-l3",
          title: "Lesson 3: Project 3: Responsive Multi-Page Navigation Bar",
          urduTitle: "سبق 3: پروجیکٹ: جدید ریسپانسیو نیویگیشن بار اور ہیرو سیکشن",
          concept: "Combine flexbox styling with semantic <nav> and <ul> to build a sleek modern website header with logo, navigation links, and a Call-To-Action (CTA) button.",
          urduConcept: "جدید نیویگیشن بار بنانے کے لیے nav ٹیگ میں لسٹ اور بٹن کو فلیکس باکس کے ذریعے ایک لائن میں ترتیب دیا جاتا ہے۔",
          englishVoice: "Every major web application needs a stunning header. In this lesson, we will construct a production-ready navigation bar with hover transitions and a Call-To-Action button!",
          urduVoice: "دنیا کی ہر پروفیشنل ویب سائٹ کا سرورق اس کی نیویگیشن بار سے بنتا ہے۔ آئیے ایک خوبصورت لوگو، مینیو اور ایکشن بٹن والا ہیڈر تیار کریں!",
          pakistaniContext: "Build the landing page navigation for 'Babar Azam Cricket Academy Lahore'.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; margin: 0; background: #0b132b; color: white; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background: #1c2541; border-bottom: 2px solid #48cae4; }
    .logo { font-size: 20px; font-weight: 800; color: #48cae4; display: flex; align-items: center; gap: 8px; }
    .nav-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 24px; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-weight: 500; font-size: 14px; transition: color 0.2s; }
    .nav-links a:hover { color: #48cae4; }
    .cta-btn { background: #48cae4; color: #0b132b; font-weight: 700; padding: 8px 18px; border-radius: 20px; text-decoration: none; font-size: 13px; }
    .hero { text-align: center; padding: 60px 20px; }
    .hero h1 { font-size: 36px; margin-bottom: 12px; color: #ffffff; }
    .hero p { color: #94a3b8; max-width: 500px; margin: auto; }
  </style>
</head>
<body>
  <!-- Modern Navbar -->
  <nav class="navbar">
    <div class="logo">🏏 BACA LAHORE</div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#coaching">Coaching</a></li>
      <li><a href="#fixtures">Tournaments</a></li>
      <li><a href="#alumni">Our Stars</a></li>
    </ul>
    <a href="#register" class="cta-btn">Join Academy</a>
  </nav>

  <section class="hero">
    <h1>Master the Cover Drive</h1>
    <p>Train under Pakistan's elite international batting and fast bowling coaches at Gaddafi Stadium high performance center.</p>
  </section>
</body>
</html>`,
          challenge: "Add a 'Batting Masterclass' link to the navigation links list!",
          hint: "Add <li><a href='#masterclass'>Masterclass</a></li> inside the <ul class='nav-links'>.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; margin: 0; background: #0b132b; color: white; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 32px; background: #1c2541; border-bottom: 2px solid #48cae4; }
    .logo { font-size: 20px; font-weight: 800; color: #48cae4; display: flex; align-items: center; gap: 8px; }
    .nav-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 24px; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-weight: 500; font-size: 14px; transition: color 0.2s; }
    .nav-links a:hover { color: #48cae4; }
    .cta-btn { background: #48cae4; color: #0b132b; font-weight: 700; padding: 8px 18px; border-radius: 20px; text-decoration: none; font-size: 13px; }
    .hero { text-align: center; padding: 60px 20px; }
    .hero h1 { font-size: 36px; margin-bottom: 12px; color: #ffffff; }
    .hero p { color: #94a3b8; max-width: 500px; margin: auto; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">🏏 BACA LAHORE</div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#coaching">Coaching</a></li>
      <li><a href="#masterclass">Masterclass</a></li>
      <li><a href="#fixtures">Tournaments</a></li>
      <li><a href="#alumni">Our Stars</a></li>
    </ul>
    <a href="#register" class="cta-btn">Join Academy</a>
  </nav>

  <section class="hero">
    <h1>Master the Cover Drive</h1>
    <p>Train under Pakistan's elite international batting and fast bowling coaches at Gaddafi Stadium high performance center.</p>
  </section>
</body>
</html>`,
          funFact: "Most CSS UI frameworks like Tailwind CSS, Bootstrap, and Bulma all rely on the exact semantic structure you just wrote!"
        }
      ],
      quiz: {
        title: "Module 3 Assessment: Semantic HTML & Lists",
        urduTitle: "ماڈیول 3 ٹیسٹ: سمینٹک ایچ ٹی ایم ایل اور لسٹس",
        questions: [
          {
            question: "Which tag is designated specifically for website navigation links?",
            urduQuestion: "ویب سائٹ کے مینیو اور لنکس کے لیے خاص سمینٹک ٹیگ کون سا ہے؟",
            options: ["<nav>", "<menu-bar>", "<navigation>", "<links>"],
            answer: 0,
            explanation: "The <nav> tag is the HTML5 semantic element specifically for major navigation blocks."
          },
          {
            question: "What is the difference between <ul> and <ol>?",
            urduQuestion: "ul اور ol میں کیا بنیادی فرق ہے؟",
            options: [
              "<ul> is unordered (bullets), while <ol> is ordered (numbers)",
              "<ul> is for links, <ol> is for images",
              "<ul> cannot contain <li> tags",
              "They are 100% identical"
            ],
            answer: 0,
            explanation: "<ul> creates unordered bulleted lists, whereas <ol> creates numbered ordered lists."
          },
          {
            question: "Which semantic tag represents self-contained content like a blog post or news story?",
            urduQuestion: "بلاگ پوسٹ یا اخباری خبر جیسے مکمل مضمون کے لیے کون سا ٹیگ ہے؟",
            options: ["<article>", "<section>", "<div>", "<news>"],
            answer: 0,
            explanation: "The <article> tag is intended for standalone, independently distributable content."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 4: Tables, Data Grids & Cricket Scorecards
    // ─────────────────────────────────────────────────────────────
    {
      id: 4,
      title: "Module 4: Tables, Data Grids & Cricket Scorecards",
      urduTitle: "ماڈیول 4: ٹیبلز، ڈیٹا گرڈز اور کرکٹ اسکور کارڈ",
      badge: "Level 4 • Data Presenter",
      color: "from-purple-600 to-indigo-600",
      description: "Organize complex tabular data with <table>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>, plus colspan and rowspan.",
      urduDescription: "ڈیٹا کو باقاعدہ ٹیبل میں ترتیب دینا، اسکول کا ٹائم ٹیبل اور پاکستان سپر لیگ کا آفیشل اسکور کارڈ بنانا سیکھیں!",
      lessons: [
        {
          id: "m4-l1",
          title: "Lesson 1: Table Foundations (Rows, Headers & Cells)",
          urduTitle: "سبق 1: ٹیبلز کی بنیاد (روز، ہیڈرز اور کالمز)",
          concept: "Tables are built row by row. <tr> defines a table row. Inside a row, <th> defines header cells (bold and centered) while <td> defines data cells.",
          urduConcept: "ٹیبل سطر بہ سطر بنتا ہے۔ tr نئی لائن بناتا ہے، th ہیڈنگ سیل ہوتا ہے اور td عام ڈیٹا سیل ہوتا ہے۔",
          englishVoice: "Whenever you need to display structured data, like class timetables, price sheets, or esports standings, tables are the gold standard. Let's build your weekly Matric study & gaming timetable!",
          urduVoice: "اسکول کا ٹائم ٹیبل ہو یا کرکٹ کے اسکورز، ٹیبل سے بہتر کوئی طریقہ نہیں۔ tr ٹیگ لائن بناتا ہے جبکہ td اور th کالم بناتے ہیں۔ آئیے مل کر ٹیبل بناتے ہیں!",
          pakistaniContext: "Create a balanced weekly study schedule for Pakistani students preparing for Federal Board (FBISE) exams.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #fdf4ff; }
    table { width: 100%; max-width: 550px; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f0abfc; }
    th { background: #86198f; color: white; font-weight: bold; }
    tr:hover { background: #fae8ff; }
  </style>
</head>
<body>
  <h2>📚 FBISE Matric Study & Code Timetable</h2>
  <table>
    <tr>
      <th>Day</th>
      <th>Subject (5-7 PM)</th>
      <th>Coding / Gaming (8-9 PM)</th>
    </tr>
    <tr>
      <td>Monday</td>
      <td>Mathematics (Algebra)</td>
      <td>HTML5 Website Building</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>Physics (Motion & Force)</td>
      <td>Python Bot Coding</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>Computer Science</td>
      <td>Valorant Gaming Session</td>
    </tr>
  </table>
</body>
</html>`,
          challenge: "Add a new row for 'Thursday' with 'Chemistry' and 'CSS Styling'!",
          hint: "Add <tr><td>Thursday</td><td>Chemistry (Periodic Table)</td><td>CSS Styling</td></tr>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #fdf4ff; }
    table { width: 100%; max-width: 550px; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #f0abfc; }
    th { background: #86198f; color: white; font-weight: bold; }
    tr:hover { background: #fae8ff; }
  </style>
</head>
<body>
  <h2>📚 FBISE Matric Study & Code Timetable</h2>
  <table>
    <tr>
      <th>Day</th>
      <th>Subject (5-7 PM)</th>
      <th>Coding / Gaming (8-9 PM)</th>
    </tr>
    <tr>
      <td>Monday</td>
      <td>Mathematics (Algebra)</td>
      <td>HTML5 Website Building</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>Physics (Motion & Force)</td>
      <td>Python Bot Coding</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>Computer Science</td>
      <td>Valorant Gaming Session</td>
    </tr>
    <tr>
      <td>Thursday</td>
      <td>Chemistry (Periodic Table)</td>
      <td>CSS Flexbox Practice</td>
    </tr>
  </table>
</body>
</html>`,
          funFact: "The CSS property 'border-collapse: collapse;' is crucial! Without it, HTML tables show an ugly double border between every cell."
        },
        {
          id: "m4-l2",
          title: "Lesson 2: Advanced Spanning (Colspan & Rowspan)",
          urduTitle: "سبق 2: کالم اور سطروں کو جوڑنا (Colspan اور Rowspan)",
          concept: "Use colspan=\"N\" to make a single cell stretch across multiple columns. Use rowspan=\"N\" to make a cell span across multiple rows.",
          urduConcept: "جب کسی ایک سیل کو دو یا زیادہ کالمز کے برابر چوڑا کرنا ہو تو colspan استعمال کرتے ہیں۔ سطروں کو ملانے کے لیے rowspan استعمال ہوتا ہے۔",
          englishVoice: "In real life, tables have merged cells. With colspan, you can create unified banners and subheaders. Let's build a real Pakistan T20 World Cup batting scorecard!",
          urduVoice: "کبھی کبھار ایک سیل کو دو کالموں جتنی جگہ دینی پڑتی ہے جیسے کل رنز یا ٹیم کا نام۔ اس کے لیے colspan کا جادو استعمال ہوتا ہے۔ آئیے پاکستان کرکٹ ٹیم کا اسکور کارڈ بنائیں!",
          pakistaniContext: "Create the official Pakistan National Cricket Team T20 International batting scorecard against England.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #064e3b; color: white; }
    table { width: 100%; max-width: 550px; border-collapse: collapse; background: #022c22; border: 2px solid #10b981; }
    th, td { padding: 10px 14px; text-align: left; border: 1px solid #065f46; }
    th { background: #047857; color: #ecfdf5; }
    .highlight { color: #fde047; font-weight: bold; }
    .total-row { background: #065f46; font-weight: bold; }
  </style>
</head>
<body>
  <h2>🇵🇰 Pakistan Cricket Team Scorecard</h2>
  <table>
    <tr>
      <th>Batter</th>
      <th>Dismissal</th>
      <th>Runs</th>
      <th>Balls</th>
      <th>4s/6s</th>
    </tr>
    <tr>
      <td>Babar Azam (c)</td>
      <td>c Buttler b Wood</td>
      <td class="highlight">68</td>
      <td>44</td>
      <td>7/2</td>
    </tr>
    <tr>
      <td>Mohammad Rizwan (wk)</td>
      <td>not out</td>
      <td class="highlight">82</td>
      <td>51</td>
      <td>8/3</td>
    </tr>
    <tr>
      <td>Fakhar Zaman</td>
      <td>c Stokes b Rashid</td>
      <td>35</td>
      <td>18</td>
      <td>3/2</td>
    </tr>
    <tr class="total-row">
      <td colspan="2">TOTAL (20 Overs, 2 Wickets)</td>
      <td colspan="3" class="highlight">198/2 (RR: 9.90)</td>
    </tr>
  </table>
</body>
</html>`,
          challenge: "Notice how colspan='2' merges the first two cells. Change the total score to '205/2'!",
          hint: "Change 198/2 to 205/2 inside the last row.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #064e3b; color: white; }
    table { width: 100%; max-width: 550px; border-collapse: collapse; background: #022c22; border: 2px solid #10b981; }
    th, td { padding: 10px 14px; text-align: left; border: 1px solid #065f46; }
    th { background: #047857; color: #ecfdf5; }
    .highlight { color: #fde047; font-weight: bold; }
    .total-row { background: #065f46; font-weight: bold; }
  </style>
</head>
<body>
  <h2>🇵🇰 Pakistan Cricket Team Scorecard</h2>
  <table>
    <tr>
      <th>Batter</th>
      <th>Dismissal</th>
      <th>Runs</th>
      <th>Balls</th>
      <th>4s/6s</th>
    </tr>
    <tr>
      <td>Babar Azam (c)</td>
      <td>c Buttler b Wood</td>
      <td class="highlight">68</td>
      <td>44</td>
      <td>7/2</td>
    </tr>
    <tr>
      <td>Mohammad Rizwan (wk)</td>
      <td>not out</td>
      <td class="highlight">82</td>
      <td>51</td>
      <td>8/3</td>
    </tr>
    <tr>
      <td>Fakhar Zaman</td>
      <td>c Stokes b Rashid</td>
      <td>35</td>
      <td>18</td>
      <td>3/2</td>
    </tr>
    <tr class="total-row">
      <td colspan="2">TOTAL (20 Overs, 2 Wickets)</td>
      <td colspan="3" class="highlight">205/2 (RR: 10.25)</td>
    </tr>
  </table>
</body>
</html>`,
          funFact: "Colspan stands for 'Column Span' and Rowspan stands for 'Row Span'!"
        },
        {
          id: "m4-l3",
          title: "Lesson 3: Project 4: Pakistan Super League (PSL) Standings Grid",
          urduTitle: "سبق 3: پروجیکٹ: پاکستان سپر لیگ (PSL) پوائنٹس ٹیبل گرڈ",
          concept: "In professional web architecture, tables are divided into <thead>, <tbody>, and <tfoot> for semantic clarity and printer friendliness.",
          urduConcept: "پیشہ ورانہ ویب سائٹس پر ٹیبل کو thead (ہیڈر)، tbody (ڈیٹا) اور tfoot (سمری) میں تقسیم کیا جاتا ہے۔ آئیے پی ایس ایل کا آفیشل پوائنٹس ٹیبل بنائیں!",
          englishVoice: "Let's assemble a complete, modern data grid with <thead> and <tbody> for the Pakistan Super League tournament points table, complete with net run rate metrics!",
          urduVoice: "آئیے پی ایس ایل کی 6 فرنچائزز کے لیے ایک شاندار پوائنٹس ٹیبل بناتے ہیں۔ جس میں میچز، فتوحات اور نیٹ رن ریٹ کا خوبصورت ڈیٹا نظر آئے گا!",
          pakistaniContext: "Build the Pakistan Super League (PSL) Season Standings Table featuring Lahore Qalandars, Karachi Kings, Islamabad United, Multan Sultans, Peshawar Zalmi, and Quetta Gladiators.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .table-container { background: #1e293b; padding: 20px; border-radius: 12px; max-width: 650px; border: 1px solid #334155; }
    h2 { color: #38bdf8; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; text-align: center; }
    thead { background: #0284c7; color: white; }
    th, td { padding: 10px; border-bottom: 1px solid #334155; font-size: 14px; }
    td:first-child, th:first-child { text-align: left; }
    .q-zone { background: rgba(34, 197, 94, 0.15); border-left: 3px solid #22c55e; }
    .pts { font-weight: bold; color: #4ade80; }
  </style>
</head>
<body>
  <div class="table-container">
    <h2>🏆 HBL PSL Season 11: Points Table</h2>
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Mat</th>
          <th>Won</th>
          <th>Lost</th>
          <th>NRR</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr class="q-zone">
          <td>🦁 Lahore Qalandars</td>
          <td>10</td>
          <td>8</td>
          <td>2</td>
          <td>+0.845</td>
          <td class="pts">16</td>
        </tr>
        <tr class="q-zone">
          <td>🦅 Islamabad United</td>
          <td>10</td>
          <td>7</td>
          <td>3</td>
          <td>+0.512</td>
          <td class="pts">14</td>
        </tr>
        <tr>
          <td>👑 Karachi Kings</td>
          <td>10</td>
          <td>5</td>
          <td>5</td>
          <td>+0.024</td>
          <td class="pts">10</td>
        </tr>
        <tr>
          <td>⚡ Multan Sultans</td>
          <td>10</td>
          <td>4</td>
          <td>6</td>
          <td>-0.120</td>
          <td class="pts">8</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>`,
          challenge: "Add a 5th row for 'Peshawar Zalmi' with 10 matches, 5 wins, 5 losses, and 10 points!",
          hint: "Add <tr><td>⚡ Peshawar Zalmi</td><td>10</td><td>5</td><td>5</td><td>+0.110</td><td class='pts'>10</td></tr>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .table-container { background: #1e293b; padding: 20px; border-radius: 12px; max-width: 650px; border: 1px solid #334155; }
    h2 { color: #38bdf8; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; text-align: center; }
    thead { background: #0284c7; color: white; }
    th, td { padding: 10px; border-bottom: 1px solid #334155; font-size: 14px; }
    td:first-child, th:first-child { text-align: left; }
    .q-zone { background: rgba(34, 197, 94, 0.15); border-left: 3px solid #22c55e; }
    .pts { font-weight: bold; color: #4ade80; }
  </style>
</head>
<body>
  <div class="table-container">
    <h2>🏆 HBL PSL Season 11: Points Table</h2>
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Mat</th>
          <th>Won</th>
          <th>Lost</th>
          <th>NRR</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr class="q-zone">
          <td>🦁 Lahore Qalandars</td>
          <td>10</td>
          <td>8</td>
          <td>2</td>
          <td>+0.845</td>
          <td class="pts">16</td>
        </tr>
        <tr class="q-zone">
          <td>🦅 Islamabad United</td>
          <td>10</td>
          <td>7</td>
          <td>3</td>
          <td>+0.512</td>
          <td class="pts">14</td>
        </tr>
        <tr>
          <td>👑 Karachi Kings</td>
          <td>10</td>
          <td>5</td>
          <td>5</td>
          <td>+0.024</td>
          <td class="pts">10</td>
        </tr>
        <tr>
          <td>⚡ Peshawar Zalmi</td>
          <td>10</td>
          <td>5</td>
          <td>5</td>
          <td>+0.110</td>
          <td class="pts">10</td>
        </tr>
        <tr>
          <td>🌙 Multan Sultans</td>
          <td>10</td>
          <td>4</td>
          <td>6</td>
          <td>-0.120</td>
          <td class="pts">8</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>`,
          funFact: "Major financial stock exchanges like PSX (Pakistan Stock Exchange) use HTML tables to update live stock prices for thousands of traders!"
        }
      ],
      quiz: {
        title: "Module 4 Assessment: Tables & Data Grids",
        urduTitle: "ماڈیول 4 ٹیسٹ: ٹیبلز اور ڈیٹا گرڈز",
        questions: [
          {
            question: "Which tag defines an individual data cell inside a table row?",
            urduQuestion: "ٹیبل کی سطر (row) کے اندر عام ڈیٹا سیل کے لیے کون سا ٹیگ ہے؟",
            options: ["<td>", "<th>", "<cell>", "<data>"],
            answer: 0,
            explanation: "<td> stands for Table Data and defines a standard cell within a <tr> row."
          },
          {
            question: "How do you make a single table cell merge across 3 columns?",
            urduQuestion: "کسی ایک سیل کو 3 کالمز کے برابر چوڑا کرنے کے لیے کیا لکھتے ہیں؟",
            options: ["colspan=\"3\"", "rowspan=\"3\"", "span=\"3\"", "width=\"300%\""],
            answer: 0,
            explanation: "colspan=\"3\" instructs the cell to span across 3 adjacent columns."
          },
          {
            question: "What is the benefit of wrapping table headers inside <thead>?",
            urduQuestion: "ٹیبل کے ہیڈرز کو thead میں بند کرنے کا کیا فائدہ ہے؟",
            options: [
              "It separates header structure from data for accessibility and multi-page print repeating",
              "It automatically makes all text red",
              "It prevents the user from clicking the table",
              "It converts the table into an image"
            ],
            answer: 0,
            explanation: "<thead> provides semantic grouping, enabling assistive tech and browsers to repeat headers when printing long tables."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 5: Interactive Forms, Inputs & User Login
    // ─────────────────────────────────────────────────────────────
    {
      id: 5,
      title: "Module 5: Interactive Forms & User Input Fields",
      urduTitle: "ماڈیول 5: انٹرایکٹو فارمز اور یوزر ان پٹ فیلڈز",
      badge: "Level 5 • Form Engineer",
      color: "from-rose-600 to-red-600",
      description: "Harness the power of <form>, <input>, <label>, <select>, <textarea>, and <button> to collect registrations, passwords, and orders.",
      urduDescription: "ویب سائٹ پر یوزر سے ڈیٹا لینا، رجسٹریشن فارم، پاس ورڈ ان پٹ اور کسٹم آرڈر فارمز بنانا سیکھیں!",
      lessons: [
        {
          id: "m5-l1",
          title: "Lesson 1: Form Foundations (<form>, <label> & Text Inputs)",
          urduTitle: "سبق 1: فارمز کی بنیاد (فارم، لیبل اور ٹیکسٹ ان پٹس)",
          concept: "Forms collect user data. Always connect every <label for=\"id\"> to its matching <input id=\"id\">. Use placeholder for helpful hints and required for client validation.",
          urduConcept: "فارم یوزر سے معلومات حاصل کرنے کے لیے بنتا ہے۔ ہر ان پٹ کے ساتھ label لگانا لازمی ہے تاکہ یوزر کو معلوم ہو کہ کیا ٹائپ کرنا ہے۔ required لکھنے سے فارم خالی جمع نہیں ہوتا۔",
          englishVoice: "Websites aren't just for reading; they are two-way conversations! With forms, users can sign up, log in, or search. Let's create an esports gaming clan recruitment form!",
          urduVoice: "ویب سائٹ پر انٹرایکشن کا سب سے بڑا ذریعہ فارمز ہیں۔ اس سے یوزر اپنا نام اور ای میل درج کر سکتا ہے۔ آئیے ایک اصلی گیمنگ کلان جوائننگ فارم بناتے ہیں!",
          pakistaniContext: "Create a recruitment application for a Pakistani Esports Gaming Clan (Apex / Valorant / CS2).",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; padding: 20px; }
    .form-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 420px; border: 1px solid #334155; }
    h2 { color: #f43f5e; margin-top: 0; }
    .field { margin-bottom: 16px; }
    label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
    input[type="text"], input[type="email"] { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; }
    input:focus { outline: none; border-color: #f43f5e; }
    button { background: #f43f5e; color: white; border: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; width: 100%; cursor: pointer; }
    button:hover { background: #e11d48; }
  </style>
</head>
<body>
  <div class="form-card">
    <h2>🎯 Join 'Pak_Snipers' Esports Clan</h2>
    <form action="#" method="POST">
      <div class="field">
        <label for="gamerTag">Gamer Tag (In-Game Name):</label>
        <input type="text" id="gamerTag" placeholder="e.g. ShadowStrike_99" required>
      </div>
      <div class="field">
        <label for="city">City in Pakistan:</label>
        <input type="text" id="city" placeholder="e.g. Lahore, Karachi, Peshawar" required>
      </div>
      <div class="field">
        <label for="email">Contact Email:</label>
        <input type="email" id="email" placeholder="gamer@gmail.com" required>
      </div>
      <button type="submit">Submit Clan Application 🚀</button>
    </form>
  </div>
</body>
</html>`,
          challenge: "Add a field for Discord ID with an input placeholder='username#0000'!",
          hint: "<div class='field'><label for='discord'>Discord Handle:</label><input type='text' id='discord' placeholder='username#0000'></div>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; padding: 20px; }
    .form-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 420px; border: 1px solid #334155; }
    h2 { color: #f43f5e; margin-top: 0; }
    .field { margin-bottom: 16px; }
    label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
    input[type="text"], input[type="email"] { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; }
    input:focus { outline: none; border-color: #f43f5e; }
    button { background: #f43f5e; color: white; border: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; width: 100%; cursor: pointer; }
    button:hover { background: #e11d48; }
  </style>
</head>
<body>
  <div class="form-card">
    <h2>🎯 Join 'Pak_Snipers' Esports Clan</h2>
    <form action="#" method="POST">
      <div class="field">
        <label for="gamerTag">Gamer Tag (In-Game Name):</label>
        <input type="text" id="gamerTag" placeholder="e.g. ShadowStrike_99" required>
      </div>
      <div class="field">
        <label for="city">City in Pakistan:</label>
        <input type="text" id="city" placeholder="e.g. Lahore, Karachi, Peshawar" required>
      </div>
      <div class="field">
        <label for="discord">Discord Tag:</label>
        <input type="text" id="discord" placeholder="gamer#0000" required>
      </div>
      <div class="field">
        <label for="email">Contact Email:</label>
        <input type="email" id="email" placeholder="gamer@gmail.com" required>
      </div>
      <button type="submit">Submit Clan Application 🚀</button>
    </form>
  </div>
</body>
</html>`,
          funFact: "Connecting a <label for='x'> to an <input id='x'> means when the user clicks the label text, the input box automatically focuses!"
        },
        {
          id: "m5-l2",
          title: "Lesson 2: Passwords, Checkboxes, Radios & Date Pickers",
          urduTitle: "سبق 2: پاس ورڈز، چیک باکسز، ریڈیو بٹنز اور تاریخ",
          concept: "HTML5 features specialized input types: password (masks characters), checkbox (multi-select), radio (single choice with shared name), number, and date.",
          urduConcept: "پاس ورڈ کو چھپانے کے لیے type='password'، کئی آپشنز میں سے ایک چننے کے لیے ریڈیو بٹن، اور ایک سے زیادہ چننے کے لیے چیک باکس استعمال ہوتا ہے۔",
          englishVoice: "Security and user choices are vital. A password input masks the characters with black dots. Radio buttons let gamers pick their primary role, and checkboxes pick their secondary games!",
          urduVoice: "ویب سیکیورٹی کے لیے پاس ورڈ ٹائپ حروف کو ڈاٹس میں بدل دیتا ہے۔ ریڈیو بٹن کے ذریعے صرف ایک آپشن منتخب ہوتا ہے۔ آئیے ہیکاتھون کا رجسٹریشن فارم بنائیں!",
          pakistaniContext: "Create a registration form for the 'Pakistan National Young AI Hackathon 2026'.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f1f5f9; padding: 20px; }
    .form-box { background: white; padding: 22px; border-radius: 10px; max-width: 440px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    h2 { color: #0284c7; margin-top: 0; }
    .group { margin-bottom: 14px; }
    label { font-size: 13px; font-weight: 600; color: #334155; }
    .options { display: flex; gap: 15px; margin-top: 6px; }
    input[type="date"], input[type="password"] { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="form-box">
    <h2>🤖 Pakistan AI Youth Hackathon</h2>
    <form>
      <div class="group">
        <label for="pwd">Portal Secret Password:</label>
        <input type="password" id="pwd" placeholder="Min 8 characters" required>
      </div>

      <div class="group">
        <label for="dob">Date of Birth (Ages 13-16 only):</label>
        <input type="date" id="dob" required>
      </div>

      <div class="group">
        <label>Primary Role (Choose One):</label>
        <div class="options">
          <label><input type="radio" name="role" value="frontend" checked> Frontend Dev</label>
          <label><input type="radio" name="role" value="python"> Python / AI Dev</label>
        </div>
      </div>

      <div class="group">
        <label><input type="checkbox" required> I agree to the Pakistan Tech Code of Conduct.</label>
      </div>

      <button type="submit" style="background: #0284c7; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; width: 100%;">Complete Registration</button>
    </form>
  </div>
</body>
</html>`,
          challenge: "Add a 3rd radio button for 'Cybersecurity Specialist' with value='security'!",
          hint: "<label><input type='radio' name='role' value='security'> Cybersecurity</label>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f1f5f9; padding: 20px; }
    .form-box { background: white; padding: 22px; border-radius: 10px; max-width: 440px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    h2 { color: #0284c7; margin-top: 0; }
    .group { margin-bottom: 14px; }
    label { font-size: 13px; font-weight: 600; color: #334155; }
    .options { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 6px; }
    input[type="date"], input[type="password"] { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="form-box">
    <h2>🤖 Pakistan AI Youth Hackathon</h2>
    <form>
      <div class="group">
        <label for="pwd">Portal Secret Password:</label>
        <input type="password" id="pwd" placeholder="Min 8 characters" required>
      </div>

      <div class="group">
        <label for="dob">Date of Birth (Ages 13-16 only):</label>
        <input type="date" id="dob" required>
      </div>

      <div class="group">
        <label>Primary Role (Choose One):</label>
        <div class="options">
          <label><input type="radio" name="role" value="frontend" checked> Frontend Dev</label>
          <label><input type="radio" name="role" value="python"> Python / AI Dev</label>
          <label><input type="radio" name="role" value="security"> Cybersecurity</label>
        </div>
      </div>

      <div class="group">
        <label><input type="checkbox" required> I agree to the Pakistan Tech Code of Conduct.</label>
      </div>

      <button type="submit" style="background: #0284c7; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; width: 100%;">Complete Registration</button>
    </form>
  </div>
</body>
</html>`,
          funFact: "Radio buttons are called 'radio' buttons after old car radios where pushing one mechanical preset button popped out the other one!"
        },
        {
          id: "m5-l3",
          title: "Lesson 3: Project 5: Custom Gaming PC Quote & Order Form",
          urduTitle: "سبق 3: پروجیکٹ: کسٹم گیمنگ پی سی کوٹیشن و آرڈر فارم",
          concept: "Combine dropdowns (<select> and <option>), multi-line text (<textarea>), number steppers (<input type=\"number\">), and form reset controls.",
          urduConcept: "ڈراپ ڈاؤن لسٹ بنانے کے لیے select اور option ٹیگز اور لمبی تحریر کے لیے textarea استعمال ہوتا ہے۔ آئیے پی سی بلڈر آرڈر فارم بنائیں۔",
          englishVoice: "Let's build a real commercial e-commerce order form for a Pakistani custom PC building business! Customers can choose their graphics card, enter their delivery address, and request a quote.",
          urduVoice: "آئیے ایک اصلی بزنس آرڈر فارم بناتے ہیں جہاں کسٹمر اپنا پسندیدہ گرافکس کارڈ منتخب کرے اور ڈلیوری کی معلومات درج کر سکے۔",
          pakistaniContext: "Build a custom quote builder for a Hafeez Centre Lahore & Techno City Karachi PC builder.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: white; padding: 20px; }
    .builder-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 460px; border: 1px solid #334155; }
    h2 { color: #10b981; margin-top: 0; }
    .row { margin-bottom: 14px; }
    label { display: block; margin-bottom: 5px; font-size: 13px; font-weight: 600; color: #94a3b8; }
    select, textarea, input[type="number"] { width: 100%; box-sizing: border-box; padding: 10px; background: #0f172a; color: white; border: 1px solid #475569; border-radius: 6px; }
    .actions { display: flex; gap: 10px; margin-top: 15px; }
    .btn-submit { flex: 2; background: #10b981; color: #022c22; font-weight: bold; border: none; padding: 12px; border-radius: 6px; cursor: pointer; }
    .btn-reset { flex: 1; background: #334155; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="builder-card">
    <h2>⚡ PakRig Customs: Instant PC Quote</h2>
    <form>
      <div class="row">
        <label for="gpu">Select Graphics Card (GPU):</label>
        <select id="gpu" required>
          <option value="">-- Choose Graphics Card --</option>
          <option value="rtx3060">Nvidia RTX 3060 12GB (PKR 85,000)</option>
          <option value="rtx4070">Nvidia RTX 4070 Super (PKR 185,000)</option>
          <option value="rx6700xt">AMD Radeon RX 6700 XT (PKR 92,000)</option>
        </select>
      </div>

      <div class="row">
        <label for="fans">RGB Case Fans Quantity:</label>
        <input type="number" id="fans" min="1" max="9" value="4">
      </div>

      <div class="row">
        <label for="notes">Custom Modification Notes & Address:</label>
        <textarea id="notes" rows="3" placeholder="e.g. White themed cables, delivery to Gulberg Lahore..."></textarea>
      </div>

      <div class="actions">
        <button type="submit" class="btn-submit">Request Free Quote 💬</button>
        <button type="reset" class="btn-reset">Reset</button>
      </div>
    </form>
  </div>
</body>
</html>`,
          challenge: "Add a 4th GPU option to the <select> menu: 'Nvidia RTX 4090 24GB (PKR 490,000)'!",
          hint: "<option value='rtx4090'>Nvidia RTX 4090 24GB Beast (PKR 490,000)</option>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: white; padding: 20px; }
    .builder-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 460px; border: 1px solid #334155; }
    h2 { color: #10b981; margin-top: 0; }
    .row { margin-bottom: 14px; }
    label { display: block; margin-bottom: 5px; font-size: 13px; font-weight: 600; color: #94a3b8; }
    select, textarea, input[type="number"] { width: 100%; box-sizing: border-box; padding: 10px; background: #0f172a; color: white; border: 1px solid #475569; border-radius: 6px; }
    .actions { display: flex; gap: 10px; margin-top: 15px; }
    .btn-submit { flex: 2; background: #10b981; color: #022c22; font-weight: bold; border: none; padding: 12px; border-radius: 6px; cursor: pointer; }
    .btn-reset { flex: 1; background: #334155; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="builder-card">
    <h2>⚡ PakRig Customs: Instant PC Quote</h2>
    <form>
      <div class="row">
        <label for="gpu">Select Graphics Card (GPU):</label>
        <select id="gpu" required>
          <option value="">-- Choose Graphics Card --</option>
          <option value="rtx3060">Nvidia RTX 3060 12GB (PKR 85,000)</option>
          <option value="rtx4070">Nvidia RTX 4070 Super (PKR 185,000)</option>
          <option value="rx6700xt">AMD Radeon RX 6700 XT (PKR 92,000)</option>
          <option value="rtx4090">Nvidia RTX 4090 24GB Beast (PKR 490,000)</option>
        </select>
      </div>

      <div class="row">
        <label for="fans">RGB Case Fans Quantity:</label>
        <input type="number" id="fans" min="1" max="9" value="4">
      </div>

      <div class="row">
        <label for="notes">Custom Modification Notes & Address:</label>
        <textarea id="notes" rows="3" placeholder="e.g. White themed cables, delivery to Gulberg Lahore..."></textarea>
      </div>

      <div class="actions">
        <button type="submit" class="btn-submit">Request Free Quote 💬</button>
        <button type="reset" class="btn-reset">Reset</button>
      </div>
    </form>
  </div>
</body>
</html>`,
          funFact: "A <button type='reset'> automatically restores every input field in the entire form back to its default value!"
        }
      ],
      quiz: {
        title: "Module 5 Assessment: Interactive Forms & Inputs",
        urduTitle: "ماڈیول 5 ٹیسٹ: انٹرایکٹو فارمز اور ان پٹس",
        questions: [
          {
            question: "Which input type masks user keystrokes into secure black dots?",
            urduQuestion: "کون سا ان پٹ ٹائپ یوزر کے لکھے ہوئے حروف کو محفوظ نقطوں میں بدل دیتا ہے؟",
            options: ["type=\"password\"", "type=\"secret\"", "type=\"hide\"", "type=\"secure\""],
            answer: 0,
            explanation: "input type=\"password\" automatically masks sensitive keystrokes for privacy and security."
          },
          {
            question: "How do you ensure a group of radio buttons only permits a single selection?",
            urduQuestion: "ریڈیو بٹنز کے گروپ میں سے صرف ایک آپشن منتخب ہونے کی ضمانت کیسے ملتی ہے؟",
            options: [
              "Give all radio buttons the exact same 'name' attribute",
              "Use the single=\"true\" attribute",
              "Radio buttons can never have multiple selections anyway",
              "Wrap each in a separate <form>"
            ],
            answer: 0,
            explanation: "Radio buttons sharing the identical 'name' attribute belong to one mutual exclusion group."
          },
          {
            question: "Which element creates a multi-line text input field for messages or addresses?",
            urduQuestion: "پیغامات اور پتوں کے لیے کئی سطروں والی ان پٹ فیلڈ کون سی ہے؟",
            options: ["<textarea>", "<input type=\"multiline\">", "<textbox>", "<input type=\"area\">"],
            answer: 0,
            explanation: "<textarea> generates a multi-line, resizable text entry field."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 6: Styling with Embedded CSS & Modern Effects
    // ─────────────────────────────────────────────────────────────
    {
      id: 6,
      title: "Module 6: Modern CSS Integration, Flexbox & Dark Mode",
      urduTitle: "ماڈیول 6: جدید سی ایس ایس اسٹائلنگ، فلیکس باکس اور ڈارک موڈ",
      badge: "Level 6 • Style Magician",
      color: "from-fuchsia-600 to-pink-600",
      description: "Master CSS selectors (.class, #id), the Box Model (margin, padding, border), linear gradients, flexbox alignment, and neon glows.",
      urduDescription: "سی ایس ایس کلاسز، مارجن، پیڈنگ، نیون گلو اور فلیکس باکس سیکھ کر سادہ پیجز کو جدید گیمنگ انٹرفیس میں بدلیں!",
      lessons: [
        {
          id: "m6-l1",
          title: "Lesson 1: The CSS Box Model (Margin vs Padding vs Border)",
          urduTitle: "سبق 1: سی ایس ایس باکس ماڈل (مارجن، پیڈنگ اور بارڈر)",
          concept: "Every HTML element is a box. Content is inside; padding creates breathing room inside the border; border wraps the box; margin creates spacing outside between neighboring boxes.",
          urduConcept: "ایچ ٹی ایم ایل کا ہر عنصر ایک باکس ہے۔ پیڈنگ اندرونی فاصلہ پیدا کرتی ہے، بارڈر دیوار بناتی ہے اور مارجن بیرونی فاصلہ دیتی ہے۔",
          englishVoice: "The Box Model is the secret behind clean web design. Beginners confuse padding and margin all the time: padding is inside the border, margin is outside! Let's master it with interactive colored boxes.",
          urduVoice: "باکس ماڈل کو سمجھنا ہر اچھے ویب ڈویلپر کی پہلی نشانی ہے۔ پیڈنگ بارڈر کے اندر جگہ بناتی ہے اور مارجن باہر۔ آئیے لائیو باکس ماڈل بنا کر دیکھیں!",
          pakistaniContext: "Style interactive product pricing cards for Pakistani tech stores.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #1e1b4b; color: white; padding: 20px; }
    .box-demo {
      background: #312e81;          /* Background color */
      padding: 24px;                 /* Space INSIDE */
      border: 3px solid #818cf8;    /* The Border */
      border-radius: 12px;           /* Rounded corners */
      margin: 20px 0;                /* Space OUTSIDE */
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    h2 { color: #a5b4fc; margin-top: 0; }
    .badge { background: #4f46e5; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="box-demo">
    <span class="badge">BOX MODEL IN ACTION</span>
    <h2>📱 Fast Charging Tech Pack</h2>
    <p>67W GaN Super Charger + Braided Type-C Cable.</p>
    <p>Price: <strong>PKR 3,500</strong></p>
  </div>
</body>
</html>`,
          challenge: "Add 'border-color: #ec4899;' and 'box-shadow: 0 0 20px #ec4899;' for a neon cyberpunk pink glow!",
          hint: "Change the border and box-shadow colors in .box-demo to #ec4899.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #1e1b4b; color: white; padding: 20px; }
    .box-demo {
      background: #312e81;
      padding: 24px;
      border: 3px solid #ec4899;
      border-radius: 12px;
      margin: 20px 0;
      box-shadow: 0 0 25px #ec4899;
    }
    h2 { color: #f472b6; margin-top: 0; }
    .badge { background: #db2777; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="box-demo">
    <span class="badge">BOX MODEL IN ACTION</span>
    <h2>📱 Fast Charging Tech Pack</h2>
    <p>67W GaN Super Charger + Braided Type-C Cable.</p>
    <p>Price: <strong>PKR 3,500</strong></p>
  </div>
</body>
</html>`,
          funFact: "Always include '* { box-sizing: border-box; }' at the top of your CSS so padding doesn't accidentally stretch elements beyond their set width!"
        },
        {
          id: "m6-l2",
          title: "Lesson 2: Flexbox Mastery (Centering & Responsive Rows)",
          urduTitle: "سبق 2: فلیکس باکس کا جادو (چیزوں کو درمیان میں لانا اور قطار بنانا)",
          concept: "display: flex turns a container into a flexible layout. justify-content aligns items horizontally; align-items aligns them vertically; gap creates spacing between items.",
          urduConcept: "فلیکس باکس کے ذریعے عناصر کو ایک قطار میں لگانا اور بالکل درمیان (center) میں لانا چند سیکنڈز کا کام ہے۔ justify-content افقی اور align-items عمودی سیدھ دیتا ہے۔",
          englishVoice: "For 20 years, centering things in CSS was a famous nightmare for programmers. Flexbox solved it forever! With just 3 lines of CSS, you can center anything perfectly.",
          urduVoice: "پہلے ویب ڈویلپرز کے لیے کسی چیز کو اسکرین کے بیچ میں لانا ایک سر درد تھا۔ فلیکس باکس نے اسے ہمیشہ کے لیے آسان بنا دیا۔ آئیے لائیو فلیکس گرڈ سیکھتے ہیں!",
          pakistaniContext: "Build a responsive sneaker & streetwear showcase popular among Pakistani teenagers.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #18181b; color: white; padding: 20px; }
    .flex-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .card {
      background: #27272a;
      border: 1px solid #3f3f46;
      border-radius: 10px;
      padding: 16px;
      width: 200px;
      text-align: center;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: #a855f7;
    }
    .price { color: #a855f7; font-weight: bold; font-size: 18px; }
  </style>
</head>
<body>
  <h2 style="text-align: center; color: #a855f7;">👟 Karachi Streetwear & Sneaker Drop</h2>
  <div class="flex-container">
    <div class="card">
      <h3>Retro Jordan 1</h3>
      <p class="price">PKR 14,500</p>
    </div>
    <div class="card">
      <h3>Yeezy Boost 350</h3>
      <p class="price">PKR 18,900</p>
    </div>
    <div class="card">
      <h3>Nike Dunk Low</h3>
      <p class="price">PKR 12,000</p>
    </div>
  </div>
</body>
</html>`,
          challenge: "Add a 4th card for 'Puma RS-X' with price 'PKR 11,500' and watch Flexbox automatically align it!",
          hint: "<div class='card'><h3>Puma RS-X</h3><p class='price'>PKR 11,500</p></div>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #18181b; color: white; padding: 20px; }
    .flex-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .card {
      background: #27272a;
      border: 1px solid #3f3f46;
      border-radius: 10px;
      padding: 16px;
      width: 200px;
      text-align: center;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: #a855f7;
    }
    .price { color: #a855f7; font-weight: bold; font-size: 18px; }
  </style>
</head>
<body>
  <h2 style="text-align: center; color: #a855f7;">👟 Karachi Streetwear & Sneaker Drop</h2>
  <div class="flex-container">
    <div class="card">
      <h3>Retro Jordan 1</h3>
      <p class="price">PKR 14,500</p>
    </div>
    <div class="card">
      <h3>Yeezy Boost 350</h3>
      <p class="price">PKR 18,900</p>
    </div>
    <div class="card">
      <h3>Nike Dunk Low</h3>
      <p class="price">PKR 12,000</p>
    </div>
    <div class="card">
      <h3>Puma RS-X</h3>
      <p class="price">PKR 11,500</p>
    </div>
  </div>
</body>
</html>`,
          funFact: "Over 90% of all websites built in the last 5 years use CSS Flexbox to layout their navigation bars and product grids!"
        },
        {
          id: "m6-l3",
          title: "Lesson 3: Project 6: Karachi Biryani Express Food Delivery Landing Page",
          urduTitle: "سبق 3: پروجیکٹ: کراچی بریانی ایکسپریس فوڈ ڈلیوری پیج",
          concept: "Combine hero sections, call-to-action buttons, menu item grids, and customer reviews into a full commercial landing page.",
          urduConcept: "تمام سیکھے گئے عناصر کو ملا کر ایک مکمل تجارتی ویب پیج بنائیں جس میں ہیرو بینر، لذیذ کھانوں کا گرڈ اور آرڈر بٹن ہو۔",
          englishVoice: "Let's put everything together to build a mouth-watering landing page for Pakistan's most legendary food: Karachi Biryani Express! Featuring hero badges, spicy menu cards, and instant delivery buttons.",
          urduVoice: "پاکستان کا سب سے مشہور کھانا یعنی کراچی بریانی! آئیے ایک خوبصورت فوڈ ڈلیوری ویب پیج بنائیں جس میں نلی بریانی اور اسپیشل رائتہ پیش کیا گیا ہو۔",
          pakistaniContext: "Build a landing page for Karachi's famous Student & Burns Road Biryani with online ordering.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: #fffbeb; color: #1c1917; }
    .hero { background: linear-gradient(135deg, #ea580c, #c2410c); color: white; padding: 40px 20px; text-align: center; }
    .hero h1 { font-size: 32px; margin-bottom: 8px; }
    .hero p { font-size: 16px; opacity: 0.9; margin-top: 0; }
    .menu-grid { display: flex; justify-content: center; gap: 20px; padding: 30px 20px; flex-wrap: wrap; }
    .food-card { background: white; border-radius: 12px; width: 220px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #fed7aa; }
    .food-card img { width: 100%; height: 130px; object-fit: cover; }
    .food-info { padding: 14px; }
    .food-info h3 { margin: 0 0 6px 0; font-size: 16px; color: #9a3412; }
    .food-info p { margin: 0; font-size: 13px; color: #78716c; }
    .order-btn { display: block; text-align: center; background: #ea580c; color: white; padding: 8px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 10px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>🔥 Karachi Biryani Express</h1>
    <p>Authentic Spicy Burns Road Recipe • 30-Min Hot Delivery in Lahore, Karachi & Islamabad</p>
  </div>

  <div class="menu-grid">
    <div class="food-card">
      <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500" alt="Delicious Chicken Biryani with boiled egg">
      <div class="food-info">
        <h3>Special Chicken Dum Biryani</h3>
        <p>Aromatic basmati rice with marinated chicken & fried potatoes.</p>
        <span style="font-weight: bold; color: #ea580c;">PKR 450</span>
        <a href="#order" class="order-btn">Order Now</a>
      </div>
    </div>

    <div class="food-card">
      <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" alt="Special Beef Nalli Biryani">
      <div class="food-info">
        <h3>Karachi Nalli Beef Biryani</h3>
        <p>Tender beef marrow bone with spicy Sindhi masala.</p>
        <span style="font-weight: bold; color: #ea580c;">PKR 750</span>
        <a href="#order" class="order-btn">Order Now</a>
      </div>
    </div>
  </div>
</body>
</html>`,
          challenge: "Add a 3rd menu card for 'Fresh Mint Raita & Salad' priced at 'PKR 80'!",
          hint: "Copy a .food-card block and change the title and price to PKR 80.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: #fffbeb; color: #1c1917; }
    .hero { background: linear-gradient(135deg, #ea580c, #c2410c); color: white; padding: 40px 20px; text-align: center; }
    .hero h1 { font-size: 32px; margin-bottom: 8px; }
    .hero p { font-size: 16px; opacity: 0.9; margin-top: 0; }
    .menu-grid { display: flex; justify-content: center; gap: 20px; padding: 30px 20px; flex-wrap: wrap; }
    .food-card { background: white; border-radius: 12px; width: 220px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #fed7aa; }
    .food-card img { width: 100%; height: 130px; object-fit: cover; }
    .food-info { padding: 14px; }
    .food-info h3 { margin: 0 0 6px 0; font-size: 16px; color: #9a3412; }
    .food-info p { margin: 0; font-size: 13px; color: #78716c; }
    .order-btn { display: block; text-align: center; background: #ea580c; color: white; padding: 8px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 10px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="hero">
    <h1>🔥 Karachi Biryani Express</h1>
    <p>Authentic Spicy Burns Road Recipe • 30-Min Hot Delivery in Lahore, Karachi & Islamabad</p>
  </div>

  <div class="menu-grid">
    <div class="food-card">
      <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500" alt="Delicious Chicken Biryani with boiled egg">
      <div class="food-info">
        <h3>Special Chicken Dum Biryani</h3>
        <p>Aromatic basmati rice with marinated chicken & fried potatoes.</p>
        <span style="font-weight: bold; color: #ea580c;">PKR 450</span>
        <a href="#order" class="order-btn">Order Now</a>
      </div>
    </div>

    <div class="food-card">
      <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" alt="Special Beef Nalli Biryani">
      <div class="food-info">
        <h3>Karachi Nalli Beef Biryani</h3>
        <p>Tender beef marrow bone with spicy Sindhi masala.</p>
        <span style="font-weight: bold; color: #ea580c;">PKR 750</span>
        <a href="#order" class="order-btn">Order Now</a>
      </div>
    </div>

    <div class="food-card">
      <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500" alt="Fresh Mint Raita and crisp salad">
      <div class="food-info">
        <h3>Mint Raita & Fresh Salad</h3>
        <p>Cool cucumber yogurt raita with crunchy onion rings.</p>
        <span style="font-weight: bold; color: #ea580c;">PKR 80</span>
        <a href="#order" class="order-btn">Order Now</a>
      </div>
    </div>
  </div>
</body>
</html>`,
          funFact: "Modern websites use CSS gradients like 'linear-gradient(135deg, color1, color2)' so high-res hero banners load instantly without waiting for heavy background image downloads!"
        }
      ],
      quiz: {
        title: "Module 6 Assessment: CSS Box Model & Flexbox",
        urduTitle: "ماڈیول 6 ٹیسٹ: باکس ماڈل اور فلیکس باکس",
        questions: [
          {
            question: "In the CSS Box Model, what is the space inside the border called?",
            urduQuestion: "سی ایس ایس باکس ماڈل میں بارڈر کے اندر والی خالی جگہ کو کیا کہتے ہیں؟",
            options: ["padding", "margin", "outline", "spacing"],
            answer: 0,
            explanation: "Padding creates space INSIDE an element, between its content and its border."
          },
          {
            question: "Which CSS Flexbox property aligns items horizontally along the main axis?",
            urduQuestion: "فلیکس باکس میں اشیاء کو افقی سیدھ دینے کے لیے کون سی پراپرٹی ہے؟",
            options: ["justify-content", "align-items", "horizontal-align", "flex-center"],
            answer: 0,
            explanation: "justify-content distributes space and aligns items along the primary horizontal flex axis."
          },
          {
            question: "What CSS property gives boxes stylish rounded corners?",
            urduQuestion: "باکسز کے کونوں کو گول کرنے کے لیے کون سی پراپرٹی استعمال ہوتی ہے؟",
            options: ["border-radius", "corner-round", "border-curve", "border-style"],
            answer: 0,
            explanation: "border-radius curves the corners of an element's border box."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 7: Capstone Real-World Web Projects & Final Exam
    // ─────────────────────────────────────────────────────────────
    {
      id: 7,
      title: "Module 7: Capstone Real-World Web Projects & Final Exam",
      urduTitle: "ماڈیول 7: حتمی رئیل ورلڈ ویب پروجیکٹس اور فائنل امتحان",
      badge: "Level 7 • Master Web Engineer",
      color: "from-blue-700 via-indigo-700 to-purple-800",
      description: "Build an industry-standard personal developer portfolio, master SEO meta tags, and take the 10-question certification final exam for your D.TEN diploma!",
      urduDescription: "اپنا ذاتی ڈویلپر پورٹ فولیو تیار کریں، گوگل ایس ای او میٹا ٹیگز سیکھیں اور ڈی ٹین کا آفیشل سرٹیفکیٹ حاصل کریں!",
      lessons: [
        {
          id: "m7-l1",
          title: "Lesson 1: Capstone Project A: Personal Teen Developer & Gamer Portfolio",
          urduTitle: "سبق 1: پروجیکٹ: ذاتی ڈویلپر اور گیمر پورٹ فولیو ویب سائٹ",
          concept: "A developer portfolio showcases your skills, recent projects, tech stack badges, and contact channels. It is your digital resume to land freelance clients and software internships.",
          urduConcept: "پورٹ فولیو ویب سائٹ ہر اچھے پروگرامر کی پہچان ہوتی ہے۔ اس پر آپ کی بنائی ہوئی ویب سائٹس، مہارتیں اور رابطہ کی تفصیلات موجود ہوتی ہیں۔",
          englishVoice: "This is your flagship project! Every tech professional needs a portfolio. We will build a complete dark-mode, responsive personal portfolio website that you can deploy and show to your friends, teachers, and future employers!",
          urduVoice: "یہ آپ کا سب سے بڑا اور شاہکار پروجیکٹ ہے۔ ایک مکمل ڈارک موڈ پرسنل پورٹ فولیو ویب سائٹ جس پر آپ کی اسکلز، پروجیکٹس اور آن لائن لنکس جگمگائیں گے!",
          pakistaniContext: "Create a world-class portfolio for a 15-year-old Pakistani coder aiming for international remote freelance clients.",
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CyberDev PK | Web Developer Portfolio</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: #090d16; color: #e2e8f0; line-height: 1.6; }
    header { background: #0f172a; padding: 20px 40px; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-size: 20px; font-weight: 800; color: #38bdf8; }
    .hero { text-align: center; padding: 50px 20px; max-width: 650px; margin: auto; }
    .hero h1 { font-size: 34px; margin-bottom: 10px; color: #ffffff; }
    .hero span { color: #38bdf8; }
    .skills-grid { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
    .skill-pill { background: #1e293b; border: 1px solid #334155; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; color: #38bdf8; }
    .projects { max-width: 700px; margin: 30px auto; padding: 0 20px; }
    .proj-card { background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
    .proj-card h3 { margin-top: 0; color: #a78bfa; }
    footer { text-align: center; padding: 30px; color: #64748b; font-size: 13px; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <header>
    <div class="brand">🚀 HAMZA_CODES_PK</div>
    <div style="font-size: 13px; color: #94a3b8;">Islamabad, Pakistan 🇵🇰</div>
  </header>

  <section class="hero">
    <h1>Hi, I'm Hamza. A 15-year-old <span>Web Developer</span>.</h1>
    <p>Passionate about crafting lightning-fast HTML5/CSS3 websites, interactive gaming platforms, and Python scripts.</p>
    <div class="skills-grid">
      <div class="skill-pill">⚡ HTML5 Semantic</div>
      <div class="skill-pill">🎨 CSS3 Flexbox</div>
      <div class="skill-pill">🐍 Python 3</div>
      <div class="skill-pill">🎮 Esports Admin</div>
    </div>
  </section>

  <section class="projects">
    <h2>Featured Web Projects</h2>
    <div class="proj-card">
      <h3>🏏 PSL Live Scoreboard Grid</h3>
      <p>A semantic HTML5 table displaying live cricket run-rates, batter stats, and boundary tallies.</p>
    </div>
    <div class="proj-card">
      <h3>💻 Hafeez Centre Custom PC Builder Form</h3>
      <p>Interactive web form with GPU dropdowns and automated quote calculation in Pakistani Rupees.</p>
    </div>
  </section>

  <footer>
    <p>&copy; 2026 Hamza Codes. Built with pride in Pakistan. Available for freelance projects!</p>
  </footer>
</body>
</html>`,
          challenge: "Personalize the portfolio: change 'HAMZA_CODES_PK' to your own name and add a 3rd project card!",
          hint: "Replace Hamza with your name and duplicate a <div class='proj-card'> block.",
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CyberDev PK | Web Developer Portfolio</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: #090d16; color: #e2e8f0; line-height: 1.6; }
    header { background: #0f172a; padding: 20px 40px; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-size: 20px; font-weight: 800; color: #38bdf8; }
    .hero { text-align: center; padding: 50px 20px; max-width: 650px; margin: auto; }
    .hero h1 { font-size: 34px; margin-bottom: 10px; color: #ffffff; }
    .hero span { color: #38bdf8; }
    .skills-grid { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 20px; }
    .skill-pill { background: #1e293b; border: 1px solid #334155; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; color: #38bdf8; }
    .projects { max-width: 700px; margin: 30px auto; padding: 0 20px; }
    .proj-card { background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
    .proj-card h3 { margin-top: 0; color: #a78bfa; }
    footer { text-align: center; padding: 30px; color: #64748b; font-size: 13px; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <header>
    <div class="brand">🚀 ALI_DEV_PK</div>
    <div style="font-size: 13px; color: #94a3b8;">Lahore, Pakistan 🇵🇰</div>
  </header>

  <section class="hero">
    <h1>Hi, I'm Ali. A 15-year-old <span>Web Developer</span>.</h1>
    <p>Passionate about crafting lightning-fast HTML5/CSS3 websites, interactive gaming platforms, and Python scripts.</p>
    <div class="skills-grid">
      <div class="skill-pill">⚡ HTML5 Semantic</div>
      <div class="skill-pill">🎨 CSS3 Flexbox</div>
      <div class="skill-pill">🐍 Python 3</div>
      <div class="skill-pill">🎮 Esports Admin</div>
      <div class="skill-pill">🛡️ Cyber Security</div>
    </div>
  </section>

  <section class="projects">
    <h2>Featured Web Projects</h2>
    <div class="proj-card">
      <h3>🏏 PSL Live Scoreboard Grid</h3>
      <p>A semantic HTML5 table displaying live cricket run-rates, batter stats, and boundary tallies.</p>
    </div>
    <div class="proj-card">
      <h3>💻 Hafeez Centre Custom PC Builder Form</h3>
      <p>Interactive web form with GPU dropdowns and automated quote calculation in Pakistani Rupees.</p>
    </div>
    <div class="proj-card">
      <h3>🍔 Karachi Biryani Express Portal</h3>
      <p>A commercial food delivery landing page with responsive menu cards and instant WhatsApp ordering.</p>
    </div>
  </section>

  <footer>
    <p>&copy; 2026 Ali Dev. Built with pride in Pakistan. Available for freelance projects!</p>
  </footer>
</body>
</html>`,
          funFact: "Thousands of teenagers worldwide earn their first freelance income on platforms like Upwork and Fiverr by building portfolio websites for small businesses!"
        },
        {
          id: "m7-l2",
          title: "Lesson 2: SEO Meta Tags, Favicons & Web Publishing",
          urduTitle: "سبق 2: گوگل ایس ای او، فیویکن اور ویب سائٹ پبلش کرنا",
          concept: "The <head> tag holds invisible superpowers: <meta name=\"description\"> helps Google rank your site; <meta name=\"viewport\"> makes it mobile-friendly; and <link rel=\"icon\"> adds your browser tab logo.",
          urduConcept: "ہیڈ ٹیگ کے اندر میٹا ٹیگز ہوتے ہیں جو گوگل پر آپ کی سائٹ کو سرچ میں اوپر لاتے ہیں اور فیویکن سے براؤزر ٹیب پر خوبصورت لوگو نظر آتا ہے۔",
          englishVoice: "Building a site is only half the battle; people need to find it! In this lesson, we master search engine optimization (SEO) meta tags and configure your site for mobile smartphones.",
          urduVoice: "اگر آپ چاہتے ہیں کہ گوگل پر سرچ کرنے سے آپ کی ویب سائٹ سب سے اوپر آئے، تو میٹا ڈسکرپشن اور ویو پورٹ ٹیگز لگانا لازمی ہے۔ آئیے ایس ای او سیکھتے ہیں!",
          pakistaniContext: "Optimize a Pakistani robotics competition landing page for Google search results.",
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- SEO & Mobile Viewport Tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Official portal of Pakistan National Youth Robotics & AI Championship 2026. Register your school team today!">
  <meta name="keywords" content="Robotics Pakistan, AI for youth, STEM Pakistan, young coders">
  <meta name="author" content="D.TEN Tech Academy">
  <title>Pakistan Youth Robotics Cup 2026 | National Championship</title>

  <style>
    body { font-family: sans-serif; padding: 25px; background: #032b17; color: white; }
    .box { background: #064e3b; padding: 25px; border-radius: 12px; border: 2px solid #10b981; max-width: 550px; }
    h1 { color: #34d399; margin-top: 0; }
  </style>
</head>
<body>
  <div class="box">
    <h1>🤖 Pakistan Youth Robotics Cup 2026</h1>
    <p>National championship for student roboticists and autonomous rover engineers across Pakistan.</p>
    <p><strong>SEO Status:</strong> Google-Ready Meta Tags Enabled! 🚀</p>
  </div>
</body>
</html>`,
          challenge: "Add a <link rel='icon' href='https://dten.edu.pk/favicon.ico'> inside the <head> tag to give your site an official icon!",
          hint: "Place the <link rel='icon' ...> tag right below the <title> tag.",
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Official portal of Pakistan National Youth Robotics & AI Championship 2026. Register your school team today!">
  <meta name="keywords" content="Robotics Pakistan, AI for youth, STEM Pakistan, young coders">
  <meta name="author" content="D.TEN Tech Academy">
  <link rel="icon" href="https://dten.edu.pk/favicon.ico">
  <title>Pakistan Youth Robotics Cup 2026 | National Championship</title>

  <style>
    body { font-family: sans-serif; padding: 25px; background: #032b17; color: white; }
    .box { background: #064e3b; padding: 25px; border-radius: 12px; border: 2px solid #10b981; max-width: 550px; }
    h1 { color: #34d399; margin-top: 0; }
  </style>
</head>
<body>
  <div class="box">
    <h1>🤖 Pakistan Youth Robotics Cup 2026</h1>
    <p>National championship for student roboticists and autonomous rover engineers across Pakistan.</p>
    <p><strong>SEO Status:</strong> Google-Ready Meta Tags Enabled! 🚀</p>
  </div>
</body>
</html>`,
          funFact: "The viewport meta tag was originally invented by Apple when the first iPhone was released in 2007 so websites wouldn't look microscopic on mobile screens!"
        },
        {
          id: "m7-l3",
          title: "Lesson 3: Graduation & Certification Final Preparation",
          urduTitle: "سبق 3: گریجویشن اور فائنل سرٹیفکیٹ امتحان کی تیاری",
          concept: "Review all essential concepts: Document structure, Semantic landmarks, Media embeds, Tables, Forms, and Box Model CSS before taking the certification exam.",
          urduConcept: "تمام ماڈیولز کا شاندار خلاصہ۔ ایچ ٹی ایم ایل ٹیگز، فارمز، ٹیبلز اور سی ایس ایس کا جائزہ لیں اور فائنل امتحان پاس کر کے آفیشل سرٹیفکیٹ حاصل کریں!",
          englishVoice: "Congratulations young engineer! You have transformed from a beginner into a skilled HTML5 web architect. Review your key tags, complete your final coding challenge, and get ready to claim your official D.TEN Web Developer Diploma!",
          urduVoice: "مبارک ہو نوجوان ویب ڈویلپر! آپ نے انٹرنیٹ کا پورا ڈھانچہ بنانا سیکھ لیا ہے۔ آئیے آخری ریویو مکمل کریں اور فائنل امتحان پاس کر کے ڈی ٹین کا گولڈ سرٹیفکیٹ حاصل کریں!",
          pakistaniContext: "Celebrate your milestone as an official Junior Web Developer in Pakistan's booming tech revolution.",
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #020617; color: white; padding: 30px; text-align: center; }
    .diploma-card { background: linear-gradient(135deg, #1e1b4b, #312e81); border: 2px solid #6366f1; border-radius: 16px; padding: 40px; max-width: 550px; margin: auto; box-shadow: 0 0 30px rgba(99, 102, 241, 0.3); }
    h1 { color: #a5b4fc; margin-bottom: 10px; }
    .badge { background: #fbbf24; color: #78350f; font-weight: 800; padding: 6px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin-bottom: 15px; }
    p { color: #cbd5e1; font-size: 15px; }
    .ready-btn { display: inline-block; background: #10b981; color: #022c22; font-weight: 800; padding: 12px 28px; border-radius: 30px; text-decoration: none; margin-top: 20px; font-size: 15px; transition: transform 0.2s; }
    .ready-btn:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="diploma-card">
    <div class="badge">D.TEN CERTIFIED WEB MASTER</div>
    <h1>🎉 Ready for the Final Exam!</h1>
    <p>You have mastered 7 Modules, written over 20 real HTML5 web applications, and built professional Pakistani tech projects.</p>
    <p>Click below to start your 10-Question Comprehensive Certification Exam!</p>
    <a href="#exam" class="ready-btn">Take Final Exam 🚀</a>
  </div>
</body>
</html>`,
          challenge: "Add your personal pledge: '<p><em>I will build positive tech for Pakistan and the world.</em></p>'",
          hint: "Add the italicized pledge paragraph right above the ready button.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #020617; color: white; padding: 30px; text-align: center; }
    .diploma-card { background: linear-gradient(135deg, #1e1b4b, #312e81); border: 2px solid #6366f1; border-radius: 16px; padding: 40px; max-width: 550px; margin: auto; box-shadow: 0 0 30px rgba(99, 102, 241, 0.3); }
    h1 { color: #a5b4fc; margin-bottom: 10px; }
    .badge { background: #fbbf24; color: #78350f; font-weight: 800; padding: 6px 16px; border-radius: 20px; font-size: 12px; display: inline-block; margin-bottom: 15px; }
    p { color: #cbd5e1; font-size: 15px; }
    .ready-btn { display: inline-block; background: #10b981; color: #022c22; font-weight: 800; padding: 12px 28px; border-radius: 30px; text-decoration: none; margin-top: 20px; font-size: 15px; transition: transform 0.2s; }
    .ready-btn:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="diploma-card">
    <div class="badge">D.TEN CERTIFIED WEB MASTER</div>
    <h1>🎉 Ready for the Final Exam!</h1>
    <p>You have mastered 7 Modules, written over 20 real HTML5 web applications, and built professional Pakistani tech projects.</p>
    <p><em>I pledge to build innovative and ethical technology for Pakistan and humanity! 🇵🇰</em></p>
    <a href="#exam" class="ready-btn">Take Final Exam 🚀</a>
  </div>
</body>
</html>`,
          funFact: "Every web browser in the world (Chrome, Safari, Edge, Firefox) is built specifically to understand the exact HTML you just mastered!"
        }
      ],
      quiz: {
        title: "Module 7 Assessment: SEO, Head Meta & Portfolios",
        urduTitle: "ماڈیول 7 ٹیسٹ: ایس ای او، میٹا ٹیگز اور پورٹ فولیو",
        questions: [
          {
            question: "Where do meta tags, page titles, and CSS links belong?",
            urduQuestion: "میٹا ٹیگز، پیج ٹائٹل اور سی ایس ایس کے لنکس کس ٹیگ کے اندر ہوتے ہیں؟",
            options: ["Inside <head>", "Inside <body>", "Inside <footer>", "Outside <html>"],
            answer: 0,
            explanation: "All metadata, titles, charset declarations, and external stylesheets belong strictly inside the <head> element."
          },
          {
            question: "Why is <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> essential?",
            urduQuestion: "ویو پورٹ میٹا ٹیگ ویب سائٹ میں لکھنا کیوں ضروری ہے؟",
            options: [
              "It ensures the website scales properly on mobile phones and tablets",
              "It increases the internet download speed",
              "It enables 4K video playback",
              "It turns on dark mode automatically"
            ],
            answer: 0,
            explanation: "The viewport meta tag instructs mobile browsers to match the screen's width in device-independent pixels."
          },
          {
            question: "What is the small icon called that appears in the browser tab next to the page title?",
            urduQuestion: "براؤزر ٹیب پر پیج ٹائٹل کے ساتھ نظر آنے والے چھوٹے آئیکن کو کیا کہتے ہیں؟",
            options: ["Favicon", "TabIcon", "MetaLogo", "MiniBadge"],
            answer: 0,
            explanation: "A Favicon (Favorites Icon) is specified with <link rel=\"icon\" href=\"...\">."
          }
        ]
      }
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // COMPREHENSIVE FINAL CERTIFICATION EXAM (10 QUESTIONS)
  // ─────────────────────────────────────────────────────────────
  finalExam: {
    title: "Official D.TEN HTML5 Junior Web Developer Certification Exam",
    urduTitle: "آفیشل ڈی ٹین ایچ ٹی ایم ایل 5 جونیئر ویب ڈویلپر سرٹیفکیشن امتحان",
    passingScore: 7, // 7 out of 10 to pass (70%)
    questions: [
      {
        question: "1. What is the fundamental role of HTML in web architecture?",
        urduQuestion: "1. ویب سائٹ کی دنیا میں ایچ ٹی ایم ایل کا بنیادی کردار کیا ہے؟",
        options: [
          "Defines the structural content and layout skeleton of web documents",
          "Executes database queries on the server",
          "Controls 3D game physics engines",
          "Encrypts network routers"
        ],
        answer: 0,
        explanation: "HTML provides the semantic markup and structural backbone for all web pages."
      },
      {
        question: "2. Which tag is used to create a clickable link to another website or section?",
        urduQuestion: "2. کسی دوسری ویب سائٹ یا سیکشن سے جوڑنے کے لیے کون سا ٹیگ ہے؟",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: 0,
        explanation: "The <a> (anchor) element with the href attribute creates hyperlinked connections."
      },
      {
        question: "3. What does the 'target=\"_blank\"' attribute do when added to an anchor link?",
        urduQuestion: "3. اینکر لنک میں target=\"_blank\" لکھنے سے کیا ہوتا ہے؟",
        options: [
          "Opens the destination page in a new browser tab or window",
          "Deletes the previous page",
          "Makes the link invisible",
          "Downloads a blank text file"
        ],
        answer: 0,
        explanation: "target=\"_blank\" tells the browser to open the target document in a new tab."
      },
      {
        question: "4. Which HTML tag is self-closing and requires no closing tag?",
        urduQuestion: "4. ان میں سے کون سا ٹیگ خود کار طریقے سے بند ہوتا ہے اور اسے کلوزنگ ٹیگ کی ضرورت نہیں؟",
        options: ["<img>", "<h1>", "<p>", "<div>"],
        answer: 0,
        explanation: "<img> is a void element that does not have closing tags, alongside <br>, <hr>, and <input>."
      },
      {
        question: "5. Which HTML5 semantic tag should wrap the primary website navigation links?",
        urduQuestion: "5. ویب سائٹ کے مین مینیو اور لنکس کے لیے کون سا سمینٹک ٹیگ ہے؟",
        options: ["<nav>", "<header>", "<menu>", "<main>"],
        answer: 0,
        explanation: "<nav> is specifically designated for major site navigation links."
      },
      {
        question: "6. How do you merge a table cell across two horizontal columns?",
        urduQuestion: "6. ٹیبل کے ایک سیل کو دو کالمز کے برابر چوڑا کیسے کیا جاتا ہے؟",
        options: ["colspan=\"2\"", "rowspan=\"2\"", "col-merge=\"2\"", "table-width=\"2\""],
        answer: 0,
        explanation: "colspan=\"2\" merges the cell across two horizontal columns."
      },
      {
        question: "7. Which input type should be used for secret passwords to prevent over-the-shoulder peeking?",
        urduQuestion: "7. خفیہ پاس ورڈ کو چھپانے کے لیے کون سا ان پٹ ٹائپ استعمال ہوتا ہے؟",
        options: ["type=\"password\"", "type=\"secret\"", "type=\"hidden\"", "type=\"mask\""],
        answer: 0,
        explanation: "type=\"password\" masks entered characters into dots or asterisks."
      },
      {
        question: "8. In the CSS Box Model, what is the space between the content and the border?",
        urduQuestion: "8. سی ایس ایس باکس ماڈل میں مواد اور بارڈر کے درمیانی فاصلے کو کیا کہتے ہیں؟",
        options: ["Padding", "Margin", "Outline", "Gap"],
        answer: 0,
        explanation: "Padding is the internal buffer space between content and border."
      },
      {
        question: "9. Which CSS Flexbox property aligns items along the primary horizontal axis?",
        urduQuestion: "9. فلیکس باکس میں چیزوں کو افقی طور پر سنٹر یا سیدھ دینے والی پراپرٹی کون سی ہے؟",
        options: ["justify-content", "align-items", "align-content", "flex-direction"],
        answer: 0,
        explanation: "justify-content aligns children along the main flex axis."
      },
      {
        question: "10. Where must SEO meta description tags and the page <title> be placed?",
        urduQuestion: "10. گوگل ایس ای او میٹا ٹیگز اور ٹائٹل کس ٹیگ کے اندر ہونے چاہئیں؟",
        options: ["Inside <head>", "Inside <body>", "Inside <footer>", "Inside <section>"],
        answer: 0,
        explanation: "All document metadata, SEO descriptors, and title tags belong strictly in <head>."
      }
    ]
  }
};
