/**
 * htmlTeensCourseData.js
 * Comprehensive Ground-Zero HTML5 & Web Development curriculum for Pakistani teen boys (Ages 13-16).
 * Designed for absolute newbies starting from 0:
 * - Detailed new term introductions & real-world analogies
 * - Line-by-line code breakdowns
 * - In-depth commentary voice-overs in Urdu and English
 * - Authentic Pakistani teen coding projects & challenges
 * - 7 End-of-Module Quizzes + 10-Question Comprehensive Final Exam
 */

export const HTML_TEENS_COURSE = {
  id: "course-html-teens-pakistan",
  title: "HTML5 Web Developer: Teen Code Master (عمر 13-16 سال)",
  shortTitle: "HTML5 Web Developer",
  tagline: "Start from Absolute Zero: Build Real Websites, Gaming Hubs & Tech Portfolios! 💻🚀🇵🇰",
  description: "Designed from ground zero for Pakistani teenagers aged 13-16 (Matric & O-Levels). No prior coding experience required! Learn step-by-step: what is a tag, how browsers work, building web pages, hyperlinks, media embeds, cricket scorecards, interactive forms, and modern CSS styling with live in-browser preview, detailed bilingual audio commentary, quizzes, and an official printable D.TEN Certificate!",
  category: "Web Development & Coding",
  level: "Beginner to Intermediate (Ages 13-16)",
  membership: "free",
  thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  instructor: "WebMaster ⚡ & D.TEN Young Tech Academy",
  duration: "12 hours of step-by-step coding & projects",
  ageGroup: "13-16 Years",
  totalModules: 7,
  totalLessons: 21,
  rating: 5.0,
  reviewsCount: 720,
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
    // MODULE 1: Ground Zero - What is HTML, Tags & First Webpage
    // ─────────────────────────────────────────────────────────────
    {
      id: 1,
      title: "Module 1: Ground Zero - What is HTML & Your Very First Webpage",
      urduTitle: "ماڈیول 1: بالکل صفر سے آغاز - ایچ ٹی ایم ایل کیا ہے اور پہلا پیج",
      badge: "Level 1 • Absolute Beginner",
      color: "from-blue-600 to-cyan-600",
      description: "Start from 0: understand the internet, browsers, files, tags, opening and closing elements, and the basic HTML skeleton.",
      urduDescription: "کمپیوٹر اور انٹرنیٹ کی بنیادی باتیں، براؤزر کیسے کام کرتا ہے، ٹیگ کیا ہوتا ہے، اور بالکل شروع سے پہلا ویب پیج بنانا سیکھیں۔",
      lessons: [
        {
          id: "m1-l1",
          title: "Lesson 1: What is a Web Browser, HTML & Writing Your First Tag",
          urduTitle: "سبق 1: ویب براؤزر، ایچ ٹی ایم ایل اور پہلا ٹیگ لکھنا",
          newTerms: [
            {
              term: "HTML",
              urduTerm: "ایچ ٹی ایم ایل",
              definition: "HyperText Markup Language. It is not a programming language like Python, but a 'markup language' that tells the web browser how to display text, images, and buttons on the screen.",
              urduDefinition: "یہ کوئی روایتی پروگرامنگ زبان نہیں بلکہ مارک اپ زبان ہے، جو براؤزر کو بتاتی ہے کہ اسکرین پر تحریر، تصویر اور بٹن کہاں اور کیسے دکھانے ہیں۔"
            },
            {
              term: "Tag",
              urduTerm: "ٹیگ",
              definition: "A special command enclosed in angle brackets like <p>. Most tags come in pairs: an Opening Tag <p> to start, and a Closing Tag </p> with a forward slash to stop.",
              urduDefinition: "اینگل بریکٹس میں لکھا جانے والا خاص لفظ جیسے <p>۔ اکثر ٹیگز جوڑوں کی شکل میں ہوتے ہیں: کھولنے والا ٹیگ <p> اور سلیش کے ساتھ بند کرنے والا ٹیگ </p>۔"
            },
            {
              term: "Element",
              urduTerm: "ایلیمنٹ",
              definition: "The complete package: Opening Tag + Content inside + Closing Tag. For example: <p>Salam Pakistan!</p> is a paragraph element.",
              urduDefinition: "کھولنے والا ٹیگ، اس کے اندر موجود تحریر، اور بند کرنے والا ٹیگ—ان تینوں کو ملا کر مکمل 'ایلیمنٹ' کہا جاتا ہے۔"
            }
          ],
          analogy: "Think of an HTML tag like a sandwich bun! The opening tag <p> is the top bun, your text message is the delicious patty inside, and the closing tag </p> is the bottom bun. If you forget the bottom bun, the sandwich falls apart!",
          urduAnalogy: "ایچ ٹی ایم ایل ٹیگ کو برگر کی طرح سمجھیں! اوپر والا بن اوپننگ ٹیگ <p> ہے، درمیانی کباب آپ کی تحریر ہے، اور نیچے والا بن کلوزنگ ٹیگ </p> ہے۔ اگر نیچے والا بن لگانا بھول جائیں گے تو برگر گر جائے گا!",
          concept: "Every website on the planet (from YouTube to Google) is built using HTML. A web browser (like Google Chrome, Microsoft Edge, or Safari) is simply a smart reader: it reads your HTML text file and renders it visually into buttons, headlines, and paragraphs.",
          urduConcept: "دنیا کی ہر ویب سائٹ ایچ ٹی ایم ایل سے بنتی ہے۔ گوگل کروم یا مائیکروسافٹ ایج جیسے براؤزر دراصل ایک ریڈر کی طرح ہیں جو آپ کے ایچ ٹی ایم ایل کوڈ کو پڑھ کر خوبصورت اسکرین میں بدل دیتے ہیں۔",
          englishVoice: "Welcome young web architect! We are starting from absolute zero, like a complete newbie. You do not need any prior coding knowledge. Have you ever wondered how websites are made? When you open Chrome or Edge, the browser reads an HTML file. In HTML, we use tags inside angle brackets. For example, the letter p stands for paragraph. You open with <p>, type your words, and close with </p>. Look at the editor right now, change the name to your own, and watch the Live Preview change instantly!",
          urduVoice: "خوش آمدید نوجوان ڈویلپر! ہم بالکل صفر سے، ایک نوآموز کی طرح آغاز کر رہے ہیں۔ آپ کو پہلے سے کسی کوڈنگ کی ضرورت نہیں۔ کیا آپ نے کبھی سوچا کہ ویب سائٹس کیسے بنتی ہیں؟ جب آپ گوگل کروم کھولتے ہیں تو وہ ایچ ٹی ایم ایل فائل کو پڑھتا ہے۔ ایچ ٹی ایم ایل میں ہم اینگل بریکٹس یعنی ٹیگز کا استعمال کرتے ہیں۔ انگریزی حرف پی کا مطلب ہے پیراگراف۔ پہلے بریکٹ میں پی لکھتے ہیں، پھر اپنی بات، اور آخر میں سلیش پی کے ساتھ اسے بند کرتے ہیں۔ ایڈیٹر میں اپنا نام لکھیں اور لائیو اسکرین پر جادو دیکھیں!",
          pakistaniContext: "Every Pakistani teen coder in Karachi, Lahore, and Islamabad starts their web development journey right here with their first paragraph tag!",
          examples: [
          {
            title: 'Example 1: Basic Paragraph & Tag Anatomy',
            urduTitle: 'مثال 1: بنیادی پیراگراف اور ٹیگ کی ساخت',
            code: `<p>Salam Pakistan! 🇵🇰</p>`,
            explanation: "Here, <p> is the opening tag that signals a paragraph, 'Salam Pakistan! 🇵🇰' is the human-readable text content, and </p> is the closing tag that tells the browser the paragraph has ended.",
            urduExplanation: "یہاں <p> اوپننگ ٹیگ ہے جو پیراگراف شروع کرتا ہے، 'Salam Pakistan!' اس کا مواد ہے، اور </p> کلوزنگ ٹیگ ہے جو بتاتا ہے کہ پیراگراف یہاں ختم ہو گیا ہے۔"
          },
          {
            title: 'Example 2: Teen Gamer Info Card with Multiple Paragraphs',
            urduTitle: 'مثال 2: نوجوان گیمر کی معلومات کے پیراگراف',
            code: `<p>Gamer Tag: <strong>CyberWolf_PK</strong></p>
<p>City: Islamabad, Pakistan</p>
<p>Favorite Game: Valorant & CS2</p>`,
            explanation: 'Stacking multiple <p> tags creates clean, separated lines of text. Browsers automatically add vertical spacing between each paragraph block.',
            urduExplanation: 'ایک کے بعد ایک <p> ٹیگز لکھنے سے الگ الگ لائنیں بن جاتی ہیں۔ براؤزر ہر پیراگراف کے درمیان خودکار مناسب فاصلہ پیدا کرتا ہے۔'
          },
        ],
starterCode: `<!-- This is your very first HTML code! -->
<p>Salam Pakistan! 🇵🇰</p>
<p>My name is Hamza and I am 14 years old.</p>
<p>I am learning HTML5 from scratch with D.TEN!</p>`,
          challenge: "Change 'Hamza' to your own real name, and add a 4th paragraph with your city name (e.g. <p>I live in Rawalpindi.</p>)!",
          hint: "Remember the sandwich rule: start with <p>, write your text, and finish with </p>.",
          solution: `<!-- My first web code -->
<p>Salam Pakistan! 🇵🇰</p>
<p>My name is Ali and I am 15 years old.</p>
<p>I am learning HTML5 from scratch with D.TEN!</p>
<p>I live in Peshawar, Pakistan.</p>`,
          funFact: "HTML was invented in 1991 by British scientist Tim Berners-Lee to connect university computers. The first webpage ever made is still online today!"
        },
        {
          id: "m1-l2",
          title: "Lesson 2: The Skeleton of the Web (Doctype, html, head & body)",
          urduTitle: "سبق 2: ویب سائٹ کا مکمل ڈھانچہ (ڈاک ٹائپ، ہیڈ اور باڈی)",
          newTerms: [
            {
              term: "<!DOCTYPE html>",
              urduTerm: "ڈاک ٹائپ",
              definition: "The very first line of any modern webpage. It tells the browser: 'Hey, this document is written in the latest modern HTML5 standard! Please render it properly.'",
              urduDefinition: "ہر جدید ویب پیج کی سب سے پہلی لائن۔ یہ براؤزر کو بتاتی ہے کہ یہ فائل جدید ایچ ٹی ایم ایل 5 کے اصولوں پر لکھی گئی ہے۔"
            },
            {
              term: "<head>",
              urduTerm: "ہیڈ ٹیگ (سر)",
              definition: "The invisible brain of the page. It contains settings, the page title shown on the browser tab, character encoding, and styles. Nothing inside <head> appears directly on the white canvas.",
              urduDefinition: "ویب پیج کا پوشیدہ دماغ۔ اس میں پیج کا ٹائٹل اور اندرونی سیٹنگز ہوتی ہیں جو براؤزر کے ٹیب پر نظر آتی ہیں لیکن ویب پیج کے اندر نہیں دکھتیں۔"
            },
            {
              term: "<body>",
              urduTerm: "باڈی ٹیگ (جسم)",
              definition: "The visible body of the webpage! Everything you want the human user to actually see and interact with (headings, images, buttons, videos) MUST live inside <body>.",
              urduDefinition: "ویب سائٹ کا اصل جسم! ہر وہ چیز جو آپ یوزر کو دکھانا چاہتے ہیں جیسے کہ ہیڈنگز، بٹن اور تصاویر، وہ لازماً باڈی ٹیگ کے اندر لکھی جاتی ہے۔"
            }
          ],
          analogy: "Think of a human being! The <head> contains thoughts, language knowledge, and passport info (invisible to people looking at you). The <body> contains the clothes, shoes, and watch that everyone can visibly see!",
          urduAnalogy: "ایک انسان کی مثال لیں! سر (head) کے اندر دماغ، معلومات اور خیالات ہیں جو باہر سے نظر نہیں آتے۔ جبکہ جسم (body) پر پہنے گئے کپڑے، گھڑی اور جوتے وہ ہیں جو سب کو نظر آتے ہیں۔ ویب سائٹ بھی بالکل ایسی ہی ہوتی ہے!",
          concept: "Every professional webpage follows a standard document tree. You start with <!DOCTYPE html>, then open <html>. Inside <html>, you have two main children: <head> (for metadata and title) and <body> (for visible content). Finally, you close with </html> at the very bottom.",
          urduConcept: "ہر پروفیشنل ویب سائٹ کی ایک مقررہ ترتیب ہوتی ہے۔ سب سے اوپر ڈاک ٹائپ، پھر html ٹیگ۔ اس کے اندر دو حصے: پہلا head (معلومات اور ٹائٹل کے لیے) اور دوسرا body (اصل دکھائی دینے والے مواد کے لیے)۔",
          englishVoice: "Now we step up from simple text to the complete official structure of the internet! Just like a human has a head and a body, every single webpage has a <head> and a <body>. Notice the <title> tag inside head: whatever you write inside title appears at the very top of your browser tab. Everything inside body is what users see on the page. Let's build the full skeleton together!",
          urduVoice: "اب ہم سادہ تحریر سے آگے بڑھ کر انٹرنیٹ کا مکمل آفیشل ڈھانچہ سیکھ رہے ہیں۔ جس طرح انسان کے پاس سر اور جسم ہوتا ہے، اسی طرح ہر ویب پیج کے دو حصے ہوتے ہیں: ہیڈ اور باڈی۔ ہیڈ کے اندر ٹائٹل لکھا جاتا ہے جو براؤزر کی ونڈو یا ٹیب کے اوپر نظر آتا ہے۔ اور باڈی کے اندر لکھی گئی ہر چیز اسکرین پر نظر آتی ہے۔ آئیے یہ ڈھانچہ خود بناتے ہیں!",
          pakistaniContext: "Set up the official webpage structure for an aspiring Pakistani Young Tech Founder in Lahore.",
          examples: [
          {
            title: 'Example 1: Minimal Valid HTML5 Skeleton',
            urduTitle: 'مثال 1: ایچ ٹی ایم ایل 5 کا بنیادی اور سادہ ڈھانچہ',
            code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Site</title>
</head>
<body>
  <p>Hello from Pakistan!</p>
</body>
</html>`,
            explanation: 'Every valid webpage has <!DOCTYPE html>, an opening <html>, a <head> holding the tab title, and a <body> holding the visible text.',
            urduExplanation: 'ہر درست ویب پیج میں سب سے اوپر ڈاک ٹائپ، پھر html، ٹیب ٹائٹل کے لیے head، اور دکھائی دینے والے مواد کے لیے body ہوتا ہے۔'
          },
          {
            title: 'Example 2: Complete Webpage with Meta UTF-8 Charset',
            urduTitle: 'مثال 2: مکمل ویب پیج بمعہ اردو اور ایموجی سپورٹ',
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Babar Azam Fan Page</title>
</head>
<body>
  <h1>King Babar Azam 🏏</h1>
  <p>Pakistan National Cricket Captain</p>
</body>
</html>`,
            explanation: "The <meta charset='UTF-8'> tag guarantees that international characters, Urdu script, and emojis like 🏏 and 🇵🇰 display perfectly on all smartphones and computers.",
            urduExplanation: "meta charset='UTF-8' ٹیگ اس بات کو یقینی بناتا ہے کہ اردو حروف اور ایموجیز ہر موبائل اور کمپیوٹر پر بغیر کسی خرابی کے صاف نظر آئیں۔"
          },
        ],
starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gamer & Coder Portal</title>
</head>
<body>
  <h1>Welcome to My Official Webpage! 🚀</h1>
  <p>Location: Lahore, Pakistan 🇵🇰</p>
  <p>Status: Learning the structural foundations of HTML5.</p>
</body>
</html>`,
          challenge: "Change the <title> tag text to 'My Tech Lab - [Your City]' and add a 3rd paragraph inside the <body>!",
          hint: "Keep the <title> inside <head>...</head>, and place your new <p> inside <body>...</body>.",
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Tech Lab - Karachi</title>
</head>
<body>
  <h1>Welcome to My Official Webpage! 🚀</h1>
  <p>Location: Karachi, Pakistan 🇵🇰</p>
  <p>Status: Learning the structural foundations of HTML5.</p>
  <p>Next Step: Mastering headlines and bold text styling!</p>
</body>
</html>`,
          funFact: "If you omit the <!DOCTYPE html> declaration, old browsers go into 'Quirks Mode', which emulates bugs from the 1990s Netscape browser!"
        },
        {
          id: "m1-l3",
          title: "Lesson 3: Headlines & Text Styling (h1 to h6, strong, em, hr)",
          urduTitle: "سبق 3: ہیڈنگز کے درجات اور ٹیکسٹ فارمیٹنگ (ایچ 1 تا ایچ 6)",
          newTerms: [
            {
              term: "Heading Hierarchy (h1-h6)",
              urduTerm: "ہیڈنگز کے 6 درجات",
              definition: "HTML has 6 heading tags. <h1> is the biggest and most important (newspaper main headline), while <h6> is the smallest.",
              urduDefinition: "ایچ ٹی ایم ایل میں 6 درجات کی سرخیاں ہوتی ہیں۔ <h1> سب سے بڑی سرخی ہوتی ہے اور <h6> سب سے چھوٹی۔"
            },
            {
              term: "<strong> & <em>",
              urduTerm: "بولڈ اور ترچھا ٹیکسٹ",
              definition: "<strong> makes text bold and signals strong importance. <em> stands for emphasis and makes text italicized.",
              urduDefinition: "<strong> تحریر کو موٹا (Bold) کرتا ہے اور اس کی اہمیت ظاہر کرتا ہے۔ <em> تحریر کو ترچھا (Italic) کر کے زور دیتا ہے۔"
            },
            {
              term: "<hr> & <br>",
              urduTerm: "لائن بریک اور ہوریزونٹل ڈیوائیڈر",
              definition: "<hr> creates a horizontal divider line across the page. <br> creates a line break (like pressing Enter on your keyboard). Both are self-closing void tags!",
              urduDefinition: "<hr> صفحے پر ایک افقی لکیر کھینچتا ہے۔ <br> تحریر کو اگلی لائن پر منتقل کرتا ہے، جیسے کی بورڈ کا انٹر دبایا گیا ہو۔"
            }
          ],
          analogy: "Think of an Urdu newspaper like Daily Jang or The News! The huge headline on the front page is <h1>. The section topic like 'Sports' is <h2>. The match title is <h3>. And player quotes are italicized with <em>!",
          urduAnalogy: "کسی روزنامے کی مثال لیں! سب سے بڑی خبر کی ہیڈ لائن <h1> ہے۔ صفحے کا سیکشن جیسے 'کھیلوں کی دنیا' <h2> ہے۔ میچ کا نام <h3> ہے، اور کسی کھلاڑی کا بیان <em> کے ساتھ ترچھا لکھا جاتا ہے!",
          concept: "Good web design is all about visual hierarchy. Search engines like Google read your <h1> to understand the main topic of your article. Never use more than one <h1> per page. Use <h2> and <h3> for sub-topics.",
          urduConcept: "اچھی ویب سائٹ میں عنوانات کی ترتیب بہت ضروری ہے۔ گوگل سرچ انجن آپ کی <h1> ہیڈنگ کو سب سے زیادہ اہمیت دیتا ہے، اس لیے ہر پیج پر عام طور پر ایک ہی <h1> ہونی چاہیے اور باقی ذیلی عنوانات <h2> اور <h3> ہونے چاہئیں۔",
          englishVoice: "Let's explore typography power! Headings tell the browser what is most important. <h1> is your king headline. Notice formatting tags: <strong> turns words bold, <em> tilts them into italics, <mark> highlights them like a neon yellow marker, and <hr> draws a clean divider line. Let's create a Pakistan Super League cricket match report!",
          urduVoice: "اب ہم ہیڈنگز اور خوبصورت الفاظ کی طاقت دیکھتے ہیں۔ ہیڈنگز براؤزر کو بتاتی ہیں کہ سب سے اہم بات کون سی ہے۔ ایچ 1 سب سے بڑا عنوان ہے۔ اسٹرانگ سے الفاظ موٹے ہو جاتے ہیں، ای ایم سے ترچھے، مارک سے ہائی لائٹ اور ایچ آر سے خوبصورت لکیر بن جاتی ہے۔ آئیے پی ایس ایل کا ایک بریکنگ نیوز پیج بناتے ہیں!",
          pakistaniContext: "Create a match report for a thrilling Pakistan Super League (PSL) match between Lahore Qalandars and Karachi Kings.",
          examples: [
          {
            title: 'Example 1: The 6 Heading Sizes Hierarchy',
            urduTitle: 'مثال 1: ہیڈنگز کے چھ سائزز کی ترتیب',
            code: `<h1>H1: Main Article Title</h1>
<h2>H2: Major Section Heading</h2>
<h3>H3: Sub-topic Heading</h3>`,
            explanation: '<h1> is the largest and most important headline. <h2> is for major chapters or sections, and <h3> is for sub-points.',
            urduExplanation: '<h1> سب سے بڑی اور اہم ہیڈنگ ہوتی ہے، <h2> بڑے سیکشن کے لیے اور <h3> ذیلی موضوعات کے لیے استعمال ہوتی ہے۔'
          },
          {
            title: 'Example 2: Breaking News Report with strong, em & hr',
            urduTitle: 'مثال 2: بریکنگ نیوز رپورٹ بمعہ بولڈ اور ترچھا ٹیکسٹ',
            code: `<h2>PSL Live: Lahore vs Karachi</h2>
<hr>
<p>Shaheen Afridi bowled a <strong>145 km/h yorker</strong>!</p>
<p><em>Match Attendance: 30,000 passionate fans.</em></p>`,
            explanation: '<strong> gives bold visual weight to critical stats, <em> emphasizes quotes in italics, and <hr> draws a clean divider line.',
            urduExplanation: 'strong ٹیگ اہم معلومات کو بولڈ کرتا ہے، em الفاظ کو ترچھا کر کے زور دیتا ہے، اور hr ایک صاف ستھری لکیر کھینچتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>PSL Championship Clash 🏏</h1>
  <h2>Lahore Qalandars vs Karachi Kings</h2>
  <hr>
  <p>Shaheen Afridi bowled an <strong>unbelievable 145 km/h yorker</strong> in the final over of the match!</p>
  <p>Babar Azam scored <mark>79 runs off 48 balls</mark> showing pure international class.</p>
  <h3>Man of the Match Contenders:</h3>
  <p><em>Shaheen Shah Afridi</em> (3 wickets) vs <em>Babar Azam</em> (79 runs).</p>
</body>
</html>`,
          challenge: "Add an <h4> heading for 'Match Venue: Gaddafi Stadium Lahore' and add a horizontal divider <hr> below it!",
          hint: "Type <h4>Match Venue: Gaddafi Stadium Lahore</h4> followed by <hr>.",
          solution: `<!DOCTYPE html>
<html>
<body>
  <h1>PSL Championship Clash 🏏</h1>
  <h2>Lahore Qalandars vs Karachi Kings</h2>
  <hr>
  <p>Shaheen Afridi bowled an <strong>unbelievable 145 km/h yorker</strong> in the final over of the match!</p>
  <p>Babar Azam scored <mark>79 runs off 48 balls</mark> showing pure international class.</p>
  <h3>Man of the Match Contenders:</h3>
  <p><em>Shaheen Shah Afridi</em> (3 wickets) vs <em>Babar Azam</em> (79 runs).</p>
  <h4>Match Venue: Gaddafi Stadium Lahore 🏟️</h4>
  <hr>
</body>
</html>`,
          funFact: "In HTML, if you hit Enter 10 times in your code, the browser will ignore it! It collapses all extra whitespace into a single space unless you use a <br> tag or <pre> tag."
        }
      ],
      quiz: {
        title: "Module 1 Assessment: HTML Foundations & Syntax",
        urduTitle: "ماڈیول 1 ٹیسٹ: ایچ ٹی ایم ایل کی بنیادیں اور ٹیگز",
        questions: [
          {
            question: "What is the difference between an Opening Tag and a Closing Tag?",
            urduQuestion: "اوپننگ ٹیگ اور کلوزنگ ٹیگ میں کیا بنیادی فرق ہے؟",
            options: [
              "A closing tag has a forward slash '/' before the tag name, like </p>",
              "A closing tag uses square brackets [p]",
              "An opening tag is always in capital letters",
              "There is no difference"
            ],
            answer: 0,
            explanation: "Closing tags always include a forward slash '/' (e.g. </p>, </h1>, </body>) to tell the browser that the element has finished."
          },
          {
            question: "Where must all visible elements (headings, paragraphs, buttons) be placed?",
            urduQuestion: "اسکرین پر دکھائی دینے والے تمام عناصر کس ٹیگ کے اندر ہونے چاہئیں؟",
            options: ["Inside <body>...</body>", "Inside <head>...</head>", "Inside <title>...</title>", "Outside <html>"],
            answer: 0,
            explanation: "The <body> element holds everything visible to human visitors. The <head> holds invisible metadata and tab title."
          },
          {
            question: "Which heading tag represents the largest and most important headline?",
            urduQuestion: "سب سے بڑی اور اہم ہیڈنگ کے لیے کون سا ٹیگ ہے؟",
            options: ["<h1>", "<h6>", "<heading>", "<head>"],
            answer: 0,
            explanation: "<h1> is the top-level headline. <h6> is the smallest."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 2: Attributes & Hyperlinks (Connecting the Web)
    // ─────────────────────────────────────────────────────────────
    {
      id: 2,
      title: "Module 2: Attributes, Hyperlinks & Connecting the Web",
      urduTitle: "ماڈیول 2: ایٹریبیوٹس، ہائپر لنکس اور انٹرنیٹ کا جال",
      badge: "Level 2 • Link Master",
      color: "from-emerald-600 to-teal-600",
      description: "Understand HTML attributes (name=\"value\"), master the <a> anchor tag, href, target=\"_blank\", and link to local sections.",
      urduDescription: "ایٹریبیوٹس کی گہرائی، اینکر ٹیگ کے ذریعے کسی بھی لفظ کو کلک کے قابل بنانا اور نئے ٹیب میں کھولنا سیکھیں۔",
      lessons: [
        {
          id: "m2-l1",
          title: "Lesson 1: What is an HTML Attribute? (name=\"value\")",
          urduTitle: "سبق 1: ایچ ٹی ایم ایل ایٹریبیوٹ کیا ہوتا ہے؟ (نام اور ویلیو)",
          newTerms: [
            {
              term: "Attribute",
              urduTerm: "ایٹریبیوٹ (خصوصیت)",
              definition: "Extra settings placed inside the opening tag to customize how the tag behaves. It always follows the pattern: name=\"value\".",
              urduDefinition: "اوپننگ ٹیگ کے اندر لکھی جانے والی اضافی خصوصیات جو ٹیگ کے انداز یا کام کو بدلتی ہیں۔ یہ ہمیشہ name=\"value\" کی شکل میں لکھی جاتی ہیں۔"
            },
            {
              term: "href Attribute",
              urduTerm: "ایچ ریف ایٹریبیوٹ",
              definition: "Stands for 'Hypertext Reference'. It specifies the destination web address (URL) where the link will take the user when clicked.",
              urduDefinition: "اس کا مطلب ہے 'ہائپر ٹیکسٹ ریفرنس'۔ یہ وہ ویب ایڈریس بتاتا ہے جہاں کلک کرنے پر یوزر پہنچے گا۔"
            }
          ],
          analogy: "Think of an HTML tag as a car: <car>. The attributes are its paint color and license plate: <car color=\"green\" plate=\"PAK-786\">. The attributes don't change the fact that it's a car, they just give it specific features!",
          urduAnalogy: "ٹیگ کو ایک گاڑی سمجھیں: <car>۔ اب اس کا رنگ اور نمبر پلیٹ اس کے ایٹریبیوٹس ہیں: <car color=\"green\" number=\"786\">۔ گاڑی وہی رہتی ہے مگر ایٹریبیوٹ سے اس کی پہچان بدل جاتی ہے!",
          concept: "Attributes always go inside the OPENING tag, never the closing tag. The attribute name is in lowercase, followed by an equals sign =, and the value is wrapped inside double quotation marks \"...\".",
          urduConcept: "ایٹریبیوٹ ہمیشہ صرف کھولنے والے (Opening) ٹیگ کے اندر لکھا جاتا ہے، بند کرنے والے ٹیگ میں کبھی نہیں۔ ایٹریبیوٹ کا نام، پھر برابر کا نشان، اور پھر کوٹیشن مارکس کے اندر اس کی ویلیو لکھی جاتی ہے۔",
          englishVoice: "Now you are learning one of the most powerful concepts in web development: Attributes! An attribute gives extra instructions to an HTML tag. The most famous attribute on the internet is href, which tells an anchor tag where to take the user when they click it. Let's write our first clickable link together!",
          urduVoice: "اب آپ ویب ڈویلپمنٹ کا سب سے طاقتور راز سیکھ رہے ہیں، جسے ایٹریبیوٹ کہتے ہیں! ایٹریبیوٹ کسی بھی ٹیگ کو اضافی ہدایات دیتا ہے۔ انٹرنیٹ کا سب سے مشہور ایٹریبیوٹ href ہے۔ یہ بتاتا ہے کہ جب یوزر کسی لفظ پر کلک کرے تو کون سی ویب سائٹ کھلے۔ آئیے پہلا کلک کے قابل لنک بناتے ہیں!",
          pakistaniContext: "Create a resource link card for Pakistani educational resources like D.TEN and the Pakistan IT Board.",
          examples: [
          {
            title: 'Example 1: Clickable Link with href Attribute',
            urduTitle: 'مثال 1: ایچ ریف ایٹریبیوٹ کے ساتھ کلک ہونے والا لنک',
            code: `<a href="https://dten.edu.pk">Visit D.TEN Network</a>`,
            explanation: 'The <a> tag creates a hyperlink, and href="https://..." is the attribute specifying the exact website destination.',
            urduExplanation: '<a> ٹیگ لنک بناتا ہے اور href="https://..." وہ ایٹریبیوٹ ہے جو بتاتا ہے کہ کلک کرنے پر کون سی ویب سائٹ کھلے گی۔'
          },
          {
            title: 'Example 2: Contact Links with mailto: and tel:',
            urduTitle: 'مثال 2: ای میل اور فون نمبر کے براہ راست لنکس',
            code: `<p>Questions? <a href="mailto:info@dten.edu.pk">Email Support</a></p>
<p>Helpline: <a href="tel:+92511234567">Call Islamabad Office</a></p>`,
            explanation: "Using 'mailto:' opens the user's default email client, while 'tel:' lets mobile phone users dial a number with a single tap.",
            urduExplanation: 'mailto لکھنے سے یوزر کی ای میل ایپ کھل جاتی ہے، اور tel لکھنے سے موبائل پر ایک کلک سے فون مل جاتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<body>
  <h2>🇵🇰 Pakistani Student Tech Resources</h2>
  <p>Click the link below to visit the official technical education network:</p>
  <a href="https://dten.edu.pk">Visit D.TEN Network of Technical Education</a>
</body>
</html>`,
          challenge: "Add a second link below that links to 'https://pitb.gov.pk' (Punjab IT Board) with the text 'Visit Punjab Information Technology Board'!",
          hint: 'Write <p><a href="https://pitb.gov.pk">Visit Punjab IT Board</a></p>.',
          solution: `<!DOCTYPE html>
<html>
<body>
  <h2>🇵🇰 Pakistani Student Tech Resources</h2>
  <p>Click the link below to visit the official technical education network:</p>
  <a href="https://dten.edu.pk">Visit D.TEN Network of Technical Education</a>
  <p>
    <a href="https://pitb.gov.pk">Visit Punjab Information Technology Board (PITB)</a>
  </p>
</body>
</html>`,
          funFact: "The letter 'a' in the link tag stands for Anchor, because early web scientists thought of links as dropping an anchor between two different documents!"
        },
        {
          id: "m2-l2",
          title: "Lesson 2: Opening in a New Tab with target=\"_blank\"",
          urduTitle: "سبق 2: نئے براؤزر ٹیب میں لنک کھولنا (target=\"_blank\")",
          newTerms: [
            {
              term: "target=\"_blank\"",
              urduTerm: "ٹارگٹ بلینک ایٹریبیوٹ",
              definition: "Tells the browser: 'Do not replace my current website! Open the clicked link in a brand new browser tab.'",
              urduDefinition: "یہ براؤزر کو حکم دیتا ہے کہ موجودہ ویب سائٹ کو بند مت کرو، بلکہ لنک کو ایک نئے براؤزر ٹیب میں کھولو۔"
            },
            {
              term: "mailto: & tel:",
              urduTerm: "ای میل اور فون لنکس",
              definition: "Special link protocols. href=\"mailto:info@domain.com\" opens your email client, while href=\"tel:+92...\" dials a phone number on mobile smartphones.",
              urduDefinition: "خاص پروٹوکول لنکس۔ mailto لکھنے سے ای میل ایپ کھل جاتی ہے اور tel لکھنے سے موبائل پر براہ راست فون مل جاتا ہے۔"
            }
          ],
          analogy: "Imagine reading an encyclopedia book! When you encounter a footnote link, you don't throw your book in the trash; you put a bookmark and open a second book on your desk. target=\"_blank\" does exactly that for your browser tabs!",
          urduAnalogy: "تصور کریں آپ ایک دلچسپ کتاب پڑھ رہے ہیں۔ جب بیچ میں کوئی حوالہ آئے تو آپ کتاب بند نہیں کرتے بلکہ دوسری چھوٹی کتاب پاس کھول لیتے ہیں۔ target=\"_blank\" آپ کی ویب سائٹ کو بند کیے بغیر نیا ٹیب کھول دیتا ہے!",
          concept: "If you link to an external website without target=\"_blank\", the visitor leaves your site! Professional developers almost always use target=\"_blank\" for external resources so visitors keep their original tab open.",
          urduConcept: "اگر آپ target=\"_blank\" نہیں لکھیں گے تو یوزر آپ کی ویب سائٹ سے نکل کر دوسری ویب سائٹ پر چلا جائے گا۔ اچھے ڈویلپرز بیرونی لنکس کے لیے ہمیشہ نیا ٹیب کھولتے ہیں تاکہ ان کی سائٹ بند نہ ہو۔",
          englishVoice: "Notice what happens when you click a link normally: it replaces your current webpage! To keep users on your gaming portal while they check out YouTube or Twitch, we add target=\"_blank\". It is like magic: one attribute, and your link automatically pops up in a fresh new tab. Let's test it!",
          urduVoice: "غور کریں، جب آپ عام لنک پر کلک کرتے ہیں تو آپ کا اپنا پیج غائب ہو جاتا ہے اور نیا پیج کھل جاتا ہے۔ یوزر کو اپنی سائٹ پر برقرار رکھنے کے لیے ہم target=\"_blank\" لگاتے ہیں۔ اس سے نیا ٹیب الگ سے کھلتا ہے اور آپ کی ویب سائٹ کھلی رہتی ہے۔ آئیے اسے ٹیسٹ کرتے ہیں!",
          pakistaniContext: "Build a Pakistani Teen Gaming & Esports quick-launcher hub.",
          examples: [
          {
            title: 'Example 1: Opening External Links in a New Tab',
            urduTitle: 'مثال 1: بیرونی لنک کو نئے براؤزر ٹیب میں کھولنا',
            code: `<a href="https://store.steampowered.com" target="_blank">Open Steam Store</a>`,
            explanation: "The attribute target='_blank' tells the browser to spawn a fresh new tab so the visitor never loses their place on your website.",
            urduExplanation: "target='_blank' براؤزر کو حکم دیتا ہے کہ آپ کی سائٹ بند کیے بغیر لنک کو ایک نئے الگ ٹیب میں کھولے۔"
          },
          {
            title: 'Example 2: Button-Styled Safe Link',
            urduTitle: 'مثال 2: بٹن اسٹائل محفوظ نیا ٹیب لنک',
            code: `<a href="https://discord.com" target="_blank" style="background:#5865f2;color:white;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:bold;">Join Gaming Discord 🚀</a>`,
            explanation: 'Anchor tags can be styled with CSS background colors, rounded corners, and padding to look like professional call-to-action buttons.',
            urduExplanation: 'اینکر لنک پر سی ایس ایس لگا کر اسے کسی بھی پروفیشنل ایپلیکیشن کے ڈاؤن لوڈ یا جوائننگ بٹن جیسا بنایا جا سکتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .btn { display: inline-block; padding: 10px 18px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-right: 10px; }
    .btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <h2>🎮 Pakistan Esports Clan Portal</h2>
  <p>External Gaming Hubs (Opens in New Tab):</p>
  <a href="https://store.steampowered.com" target="_blank" class="btn">Steam Games</a>
  <a href="https://discord.com" target="_blank" class="btn">Clan Discord</a>
</body>
</html>`,
          challenge: "Add a 3rd button for 'Twitch Esports' linking to 'https://twitch.tv' with target='_blank' and class='btn'!",
          hint: '<a href="https://twitch.tv" target="_blank" class="btn">Twitch Esports</a>',
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .btn { display: inline-block; padding: 10px 18px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-right: 10px; margin-bottom: 10px; }
    .btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <h2>🎮 Pakistan Esports Clan Portal</h2>
  <p>External Gaming Hubs (Opens in New Tab):</p>
  <a href="https://store.steampowered.com" target="_blank" class="btn">Steam Games</a>
  <a href="https://discord.com" target="_blank" class="btn">Clan Discord</a>
  <a href="https://twitch.tv" target="_blank" class="btn">Twitch Esports</a>
</body>
</html>`,
          funFact: "For modern security, browsers automatically pair target='_blank' with rel='noopener' to prevent malicious sites from hijacking the opening tab!"
        },
        {
          id: "m2-l3",
          title: "Lesson 3: Project: Pakistani Youth Tech Bookmark Hub",
          urduTitle: "سبق 3: پروجیکٹ: پاکستانی یوتھ ٹیک پورٹل اور بک مارکس",
          newTerms: [
            {
              term: "Jump Link / Bookmark (#id)",
              urduTerm: "جمپ لنک یا انٹرنل بک مارک",
              definition: "A hyperlink that scrolls smoothly down to a specific section on the SAME webpage. Use href=\"#sectionName\" and give the target element id=\"sectionName\".",
              urduDefinition: "ایسا لنک جو اسی پیج کے اندر نیچے موجود کسی خاص ہیڈنگ یا سیکشن تک جمپ کر کے لے جائے۔"
            }
          ],
          analogy: "Think of an elevator in a Centaurus or Lucky One shopping mall! Instead of walking to another building, pressing the '3rd Floor' button jumps you straight to the Food Court on the same building!",
          urduAnalogy: "کسی شاپنگ مال کی لفٹ کی طرح سوچیں! دوسری عمارت جانے کی بجائے لفٹ کا بٹن دبانے سے آپ اسی بلڈنگ میں فوڈ کورٹ تک فوراً پہنچ جاتے ہیں۔ جمپ لنک بھی پیج کے نیچے تک فوراً پہنچا دیتا ہے!",
          concept: "By combining external links, mailto contact links, and internal jump anchors, you can build a complete navigation hub on a single page.",
          urduConcept: "بیرونی لنکس، ای میل لنکس اور جمپ لنکس کو ملا کر آپ ایک مکمل ویب پورٹل بنا سکتے ہیں جس پر کلک کر کے یوزر کسی بھی سیکشن پر جا سکتا ہے۔",
          englishVoice: "Let's build a real project! A complete Pakistani Teen Tech Hub. We will create jump links so visitors can click at the top and instantly teleport down to the AI Section or the Coding Section. Let's write the code!",
          urduVoice: "آئیے ایک مکمل پروجیکٹ تیار کرتے ہیں! پاکستانی نوجوانوں کے لیے ایک ٹیک پورٹل۔ اس میں ہم جمپ لنکس بنائیں گے تاکہ اوپر کلک کرنے سے یوزر خودکار طریقے سے نیچے کوڈنگ یا مصنوعی ذہانت کے سیکشن پر پہنچ جائے۔",
          pakistaniContext: "Build a youth tech resource directory connecting Pakistani students to AI, freelancing, and robotics.",
          examples: [
          {
            title: 'Example 1: Jumping Down to an On-Page Bookmark (#id)',
            urduTitle: 'مثال 1: اسی پیج کے اندر نیچے موجود سیکشن تک جمپ کرنا',
            code: `<a href="#contact-section">Jump to Contact Details ↓</a>

<!-- Far down the page -->
<div id="contact-section">
  <h3>Contact Our Lahore Team</h3>
</div>`,
            explanation: "When the link href has '#contact-section', clicking it smoothly teleports the browser viewport straight down to the element with id='contact-section'.",
            urduExplanation: 'جب لنک میں #contact-section ہو تو اس پر کلک کرنے سے اسکرین فوراً اسی پیج میں نیچے موجود متعلقہ آئی ڈی تک پہنچ جاتی ہے۔'
          },
          {
            title: 'Example 2: Quick Jump Navigation Bar',
            urduTitle: 'مثال 2: پیج کے ٹاپ پر کوئیک جمپ مینیو',
            code: `<nav>
  <a href="#ai">AI Club</a> | 
  <a href="#gaming">Gaming League</a> | 
  <a href="#coding">Web Courses</a>
</nav>`,
            explanation: 'This simple pattern creates a table of contents that allows visitors on mobile phones to jump to sections without endless scrolling.',
            urduExplanation: 'یہ طریقہ موبائل فون صارفین کے لیے انتہائی مددگار ہے تاکہ وہ لمبی اسکرولنگ کے بغیر مطلوبہ سیکشن پر پہنچ سکیں۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f8fafc; color: #1e293b; padding: 20px; line-height: 1.6; }
    .nav-box { background: #0f172a; color: white; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
    .nav-box a { color: #38bdf8; text-decoration: none; font-weight: bold; margin-right: 15px; }
    .section { background: white; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 20px; }
    h2 { color: #0284c7; margin-top: 0; }
  </style>
</head>
<body>
  <!-- Top Navigation with Jump Links -->
  <div class="nav-box">
    <span>Quick Navigation: </span>
    <a href="#ai">🤖 Artificial Intelligence</a>
    <a href="#coding">💻 Web Coding</a>
  </div>

  <div id="ai" class="section">
    <h2>🤖 Pakistan AI Youth Club</h2>
    <p>Learn machine learning, computer vision, and autonomous robotics with students across Pakistan.</p>
    <p><a href="https://dten.edu.pk" target="_blank">Read AI Curriculum →</a></p>
  </div>

  <div id="coding" class="section">
    <h2>💻 Web Development Mastery</h2>
    <p>Master HTML5, CSS3, and JavaScript to build modern apps and freelance portfolios.</p>
  </div>
</body>
</html>`,
          challenge: "Add a 3rd section with id='gaming' for '🎮 Pakistan Esports League' and add its jump link to the top nav-box!",
          hint: "Add <a href='#gaming'>🎮 Esports League</a> inside .nav-box, and create <div id='gaming' class='section'>...</div> below.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f8fafc; color: #1e293b; padding: 20px; line-height: 1.6; }
    .nav-box { background: #0f172a; color: white; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
    .nav-box a { color: #38bdf8; text-decoration: none; font-weight: bold; margin-right: 15px; }
    .section { background: white; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 20px; }
    h2 { color: #0284c7; margin-top: 0; }
  </style>
</head>
<body>
  <div class="nav-box">
    <span>Quick Navigation: </span>
    <a href="#ai">🤖 Artificial Intelligence</a>
    <a href="#coding">💻 Web Coding</a>
    <a href="#gaming">🎮 Pakistan Esports</a>
  </div>

  <div id="ai" class="section">
    <h2>🤖 Pakistan AI Youth Club</h2>
    <p>Learn machine learning, computer vision, and autonomous robotics with students across Pakistan.</p>
    <p><a href="https://dten.edu.pk" target="_blank">Read AI Curriculum →</a></p>
  </div>

  <div id="coding" class="section">
    <h2>💻 Web Development Mastery</h2>
    <p>Master HTML5, CSS3, and JavaScript to build modern apps and freelance portfolios.</p>
  </div>

  <div id="gaming" class="section">
    <h2>🎮 Pakistan Esports Championship</h2>
    <p>Compete in national Tekken, CS2, and Valorant tournaments representing your city!</p>
  </div>
</body>
</html>`,
          funFact: "Every time you click a table of contents link on Wikipedia, it uses the exact same jump link (#id) technology you just coded!"
        }
      ],
      quiz: {
        title: "Module 2 Assessment: Attributes & Hyperlinks",
        urduTitle: "ماڈیول 2 ٹیسٹ: ایٹریبیوٹس اور ہائپر لنکس",
        questions: [
          {
            question: "Where do HTML attributes belong?",
            urduQuestion: "ایچ ٹی ایم ایل ایٹریبیوٹس کہاں لکھے جاتے ہیں؟",
            options: [
              "Strictly inside the opening tag, like <a href=\"...\">",
              "Inside the closing tag, like </a href=\"...\">",
              "Between the opening and closing tag",
              "In a separate notepad file"
            ],
            answer: 0,
            explanation: "Attributes must strictly be placed inside the opening tag before the closing angle bracket '>'."
          },
          {
            question: "Which attribute opens a clicked link in a brand new browser tab?",
            urduQuestion: "لنک کو نئے براؤزر ٹیب میں کھولنے کے لیے کون سا ایٹریبیوٹ ہے؟",
            options: ["target=\"_blank\"", "newtab=\"yes\"", "href=\"_new\"", "window=\"blank\""],
            answer: 0,
            explanation: "target=\"_blank\" instructs the browser to open the linked document in a new window or tab."
          },
          {
            question: "How do you create a link that jumps down to an element with id=\"footer\"?",
            urduQuestion: "اسی پیج کے اندر id=\"footer\" والے حصے تک جانے کے لیے کون سا لنک لکھیں گے؟",
            options: ["<a href=\"#footer\">", "<a href=\"footer\">", "<a jump=\"footer\">", "<a to=\"#footer\">"],
            answer: 0,
            explanation: "The hash symbol (#) indicates an internal page anchor (e.g. href=\"#footer\")."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 3: Images & Multimedia (Graphics, Audio & Video)
    // ─────────────────────────────────────────────────────────────
    {
      id: 3,
      title: "Module 3: Images & Multimedia (Graphics, Audio & Video)",
      urduTitle: "ماڈیول 3: تصاویر اور ملٹی میڈیا (گرافکس، آڈیو اور ویڈیو)",
      badge: "Level 3 • Media Engineer",
      color: "from-amber-500 to-orange-600",
      description: "Learn void tags, the <img> element, src, alt, responsive image styling, and HTML5 native audio and video players.",
      urduDescription: "سیلف کلوزنگ ٹیگز، تصاویر لگانا، آلٹ ٹیکسٹ اور براؤزر میں ویڈیو اور آڈیو پلیئر چلانا سیکھیں۔",
      lessons: [
        {
          id: "m3-l1",
          title: "Lesson 1: The img Tag, src, and the Essential alt Attribute",
          urduTitle: "سبق 1: تصویر کا ٹیگ، سورس اور آلٹ ایٹریبیوٹ کی اہمیت",
          newTerms: [
            {
              term: "Void / Self-Closing Tag",
              urduTerm: "وائڈ یا سیلف کلوزنگ ٹیگ",
              definition: "An HTML tag that cannot have any text inside it, so it does NOT have a closing tag! Examples: <img>, <br>, <hr>, <input>.",
              urduDefinition: "ایسا ٹیگ جس کے اندر الگ سے کوئی تحریر نہیں ہوتی، اس لیے اس کا کوئی کلوزنگ ٹیگ نہیں ہوتا۔ جیسے کہ <img> اور <br>۔"
            },
            {
              term: "src Attribute",
              urduTerm: "سورس ایٹریبیوٹ",
              definition: "Stands for 'Source'. It specifies the file path or web URL where the image file is hosted.",
              urduDefinition: "سورس یعنی ذریعہ۔ یہ تصویر کی فائل کا پتہ یا انٹرنیٹ کا یو آر ایل بتاتا ہے۔"
            },
            {
              term: "alt Attribute",
              urduTerm: "آلٹ ٹیکسٹ (متبادل تحریر)",
              definition: "Stands for 'Alternative Text'. It describes the image for screen-readers (helping blind users) and displays if the internet connection is too slow to load the image.",
              urduDefinition: "تصویر کی وضاحت کے لیے متبادل تحریر۔ اگر انٹرنیٹ سست ہو یا کوئی نابینا صارف اسکرین ریڈر استعمال کر رہا ہو تو یہ ٹیکسٹ پڑھا جاتا ہے۔"
            }
          ],
          analogy: "Think of an image tag like a photo frame hanging on a wall! The <img> tag is the frame, the 'src' is the actual photograph slid inside the frame, and the 'alt' is the sticky note on the back describing who is in the photo!",
          urduAnalogy: "تصویر کے ٹیگ کو دیوار پر لگے فوٹو فریم کی طرح سمجھیں! <img> فریم ہے، src اس کے اندر لگی اصل تصویر ہے، اور alt فریم کے پیچھے لگی پرچی ہے جس پر لکھا ہے کہ یہ تصویر کس کی ہے!",
          concept: "Never write </img>! The <img> tag is a void element. You simply write <img src=\"url\" alt=\"description\">. Great web developers always include meaningful alt text for web accessibility (a11y) and Google SEO.",
          urduConcept: "کبھی بھی </img> مت لکھیں! کیونکہ یہ سیلف کلوزنگ ٹیگ ہے۔ آپ صرف <img src=\"...\" alt=\"...\"> لکھتے ہیں۔ اچھے کوڈرز ہمیشہ alt ٹیکسٹ لکھتے ہیں تاکہ گوگل سرچ میں تصویر اوپر آئے۔",
          englishVoice: "A webpage without images is just black-and-white text. With the img tag, you can bring your website to life! Notice that img does not have a closing tag. It is a void tag. You provide src with the image url, and alt with a clear description. Let's render the majestic K2 mountain of Pakistan!",
          urduVoice: "تصویروں کے بغیر ویب سائٹ بالکل بے رنگ لگتی ہے۔ img ٹیگ کے ذریعے آپ اپنے پیج کو خوبصورت بنا سکتے ہیں۔ یاد رکھیں کہ img کا کوئی کلوزنگ ٹیگ نہیں ہوتا۔ اس میں src تصویر کا لنک بتاتا ہے اور alt اس کی تفصیل بتاتا ہے۔ آئیے پاکستان کے مشہور پہاڑ کے ٹو کی تصویر لگاتے ہیں!",
          pakistaniContext: "Showcase the breathtaking natural beauty of Northern Pakistan (Gilgit-Baltistan and Hunza Valley).",
          examples: [
          {
            title: 'Example 1: Displaying an Image with Descriptive Alt Text',
            urduTitle: 'مثال 1: تصویر لگانا اور آلٹ ٹیکسٹ کی وضاحت',
            code: `<img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600" alt="Snow covered peak of K2 in Pakistan">`,
            explanation: "<img> is a self-closing void tag. 'src' points to the photo url, and 'alt' provides accessibility descriptions for screen readers.",
            urduExplanation: '<img> سیلف کلوزنگ ٹیگ ہے۔ src تصویر کا ایڈریس دیتا ہے اور alt نابینا صارفین اور سرچ انجنز کے لیے تصویر کی وضاحت کرتا ہے۔'
          },
          {
            title: 'Example 2: Clickable Picture Button with Dimensions',
            urduTitle: 'مثال 2: کلک کے قابل تصویر اور سائز سیٹ کرنا',
            code: `<a href="https://dten.edu.pk" target="_blank">
  <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400" alt="Gaming Setup" width="300" style="border-radius:10px;">
</a>`,
            explanation: "Wrapping an <img> tag inside an <a> tag turns the entire image into a clickable button. Setting width='300' controls its rendered size.",
            urduExplanation: 'تصویر کو <a> ٹیگ کے اندر بند کرنے سے پوری تصویر ایک بٹن بن جاتی ہے۔ width کے ذریعے اس کی چوڑائی کنٹرول ہوتی ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; border-radius: 12px; overflow: hidden; max-width: 400px; border: 1px solid #334155; }
    img { width: 100%; height: 220px; object-fit: cover; }
    .info { padding: 16px; }
    h2 { color: #38bdf8; margin: 0 0 8px 0; }
  </style>
</head>
<body>
  <div class="card">
    <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" alt="Majestic snowy peaks of K2 in Pakistan">
    <div class="info">
      <h2>K2: The Savage Mountain (8,611m)</h2>
      <p>Located in Gilgit-Baltistan, Pakistan. The 2nd highest and most challenging mountain on Earth.</p>
    </div>
  </div>
</body>
</html>`,
          challenge: "Notice the image width is set to 100%. Add 'border-radius: 8px;' to the img tag style so its corners match the card!",
          hint: "In the <style> section, change 'img { width: 100%; height: 220px; object-fit: cover; }' to include 'border-radius: 8px;'.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #0f172a; color: white; }
    .card { background: #1e293b; border-radius: 12px; overflow: hidden; max-width: 400px; border: 1px solid #334155; }
    img { width: 100%; height: 220px; object-fit: cover; border-radius: 8px; }
    .info { padding: 16px; }
    h2 { color: #38bdf8; margin: 0 0 8px 0; }
  </style>
</head>
<body>
  <div class="card">
    <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" alt="Majestic snowy peaks of K2 in Pakistan">
    <div class="info">
      <h2>K2: The Savage Mountain (8,611m)</h2>
      <p>Located in Gilgit-Baltistan, Pakistan. The 2nd highest and most challenging mountain on Earth.</p>
    </div>
  </div>
</body>
</html>`,
          funFact: "If you wrap an image inside an anchor tag: <a href='...'><img ...></a>, the entire picture becomes a clickable button!"
        },
        {
          id: "m3-l2",
          title: "Lesson 2: Native HTML5 Audio and Video Players",
          urduTitle: "سبق 2: ایچ ٹی ایم ایل 5 کے اصلی ویڈیو اور آڈیو پلیئرز",
          newTerms: [
            {
              term: "<video> & <audio>",
              urduTerm: "ویڈیو اور آڈیو ایلیمنٹس",
              definition: "Native HTML5 elements that stream media directly in the browser without requiring external plugins like Adobe Flash.",
              urduDefinition: "جدید ایچ ٹی ایم ایل 5 کے ٹیگز جو بغیر کسی بیرونی سافٹ ویئر کے براؤزر کے اندر براہ راست ویڈیو اور آڈیو چلاتے ہیں۔"
            },
            {
              term: "controls Attribute",
              urduTerm: "کنٹرولز ایٹریبیوٹ",
              definition: "A boolean attribute. Adding 'controls' tells the browser to display standard Play/Pause buttons, a progress seekbar, and a volume slider.",
              urduDefinition: "یہ ایٹریبیوٹ لکھنے سے براؤزر خودکار طریقے سے پلے، پاز، والیوم اور فل اسکرین کا بٹن فراہم کر دیتا ہے۔"
            }
          ],
          analogy: "Think of a television set! The <video> tag is the TV screen. If you don't include the 'controls' attribute, it's like a TV without a remote control or buttons—you can't pause or adjust the sound!",
          urduAnalogy: "ٹیلی ویژن کی مثال لیں! ویڈیو ٹیگ ٹی وی اسکرین ہے۔ اگر آپ 'controls' نہیں لکھیں گے تو یہ بغیر ریموٹ اور بغیر بٹن والے ٹی وی جیسا ہوگا جسے نہ کوئی پاز کر سکے گا نہ آواز کم کر سکے گا!",
          concept: "To play video, write: <video controls><source src=\"movie.mp4\" type=\"video/mp4\">Your browser does not support video.</video>. You can also add poster=\"thumbnail.jpg\" to show a thumbnail before the user hits play.",
          urduConcept: "ویڈیو چلانے کے لیے <video controls> کے اندر source ٹیگ لگایا جاتا ہے۔ آپ poster ایٹریبیوٹ کے ذریعے ویڈیو شروع ہونے سے پہلے یوٹیوب کی طرح تھمب نیل بھی دکھا سکتے ہیں۔",
          englishVoice: "Before HTML5, playing videos on the web was difficult and crashed browsers. Today, HTML5 gives us the video and audio tags with built-in controls! With one single word, controls, the browser automatically draws play buttons, time scrubbers, and volume controls. Let's build a media player for an esports tournament highlight!",
          urduVoice: "پرانے زمانے میں ویب سائٹ پر ویڈیو چلانا انتہائی مشکل کام تھا۔ لیکن اب ایچ ٹی ایم ایل 5 میں ویڈیو اور آڈیو ٹیگز موجود ہیں۔ صرف ایک لفظ controls لکھنے سے براؤزر خود بخود پلے اور والیوم کے بٹن بنا دیتا ہے۔ آئیے گیمنگ ٹورنامنٹ کے لیے اصلی ویڈیو پلیئر کوڈ کرتے ہیں!",
          pakistaniContext: "Build a video highlights stream for Pakistan's world champion Tekken player Arslan Ash.",
          examples: [
          {
            title: 'Example 1: Native HTML5 Video Player with Controls',
            urduTitle: 'مثال 1: کنٹرولز کے ساتھ اصلی ویڈیو پلیئر',
            code: `<video controls width="360">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support video.
</video>`,
            explanation: "The 'controls' attribute instructs the browser to generate play, pause, seek, and volume buttons automatically.",
            urduExplanation: "'controls' لکھنے سے براؤزر خودکار طریقے سے پلے، پاز اور والیوم کے بٹن مہیا کر دیتا ہے۔"
          },
          {
            title: 'Example 2: Native HTML5 Audio Player',
            urduTitle: 'مثال 2: ایچ ٹی ایم ایل کا اپنا آڈیو پلیئر',
            code: `<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Your browser does not support audio.
</audio>`,
            explanation: 'The <audio controls> tag streams podcasts, match commentary, or sound effects directly in the webpage without any external plugin.',
            urduExplanation: '<audio controls> کے ذریعے پوڈکاسٹ، تلاوت یا کرکٹ کمنٹری کو براہ راست پیج پر سنا جا سکتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background: #111827; color: white; padding: 20px; }
    .box { background: #1f2937; padding: 20px; border-radius: 12px; max-width: 480px; border: 1px solid #374151; }
    h2 { color: #10b981; margin-top: 0; }
    video { width: 100%; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🎮 Pakistan Tekken Championship Finals</h2>
    <video controls poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support video.
    </video>
    <p>Player: <strong>Arslan_Ash_PK</strong> | Match Point Combo</p>
  </div>
</body>
</html>`,
          challenge: "Add an <audio controls style='width: 100%; margin-top: 12px;'> element below the video paragraph with src='https://www.w3schools.com/html/horse.mp3'!",
          hint: '<audio controls style="width: 100%; margin-top: 12px;"><source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg"></audio>',
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background: #111827; color: white; padding: 20px; }
    .box { background: #1f2937; padding: 20px; border-radius: 12px; max-width: 480px; border: 1px solid #374151; }
    h2 { color: #10b981; margin-top: 0; }
    video { width: 100%; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🎮 Pakistan Tekken Championship Finals</h2>
    <video controls poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support video.
    </video>
    <p>Player: <strong>Arslan_Ash_PK</strong> | Match Point Combo</p>
    <audio controls style="width: 100%; margin-top: 12px;">
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    </audio>
  </div>
</body>
</html>`,
          funFact: "Adding the boolean attribute 'loop' to <video controls loop> will cause the video to automatically replay forever when it finishes!"
        },
        {
          id: "m3-l3",
          title: "Lesson 3: Project: Pakistani Esports Media Showcase Card",
          urduTitle: "سبق 3: پروجیکٹ: پاکستانی گیمنگ ملٹی میڈیا شوکیس کارڈ",
          newTerms: [
            {
              term: "poster Attribute",
              urduTerm: "پوسٹر ایٹریبیوٹ (تھمب نیل)",
              definition: "Displays a custom thumbnail picture on the video player before the user presses the play button.",
              urduDefinition: "ویڈیو پلے کرنے سے پہلے دکھایا جانے والا سرورق یا تھمب نیل امیج۔"
            }
          ],
          analogy: "Like a YouTube thumbnail! Before you click a video, you see a crisp image preview with exciting text. The 'poster' attribute is the YouTube thumbnail of HTML5!",
          urduAnalogy: "بالکل یوٹیوب کے تھمب نیل کی طرح! ویڈیو چلنے سے پہلے جو دلکش تصویر نظر آتی ہے، پوسٹر ایٹریبیوٹ ایچ ٹی ایم ایل میں وہی کام کرتا ہے!",
          concept: "Combine images, video, badges, and hyperlinks into a complete multimedia gaming card ready for social sharing.",
          urduConcept: "تصویر، ویڈیو پلیئر اور لنکس کو اکٹھا کر کے ایک پروفیشنل میڈیا کارڈ بنانا سیکھیں جسے گیمنگ ویب سائٹس پر استعمال کیا جا سکے۔",
          englishVoice: "Let's assemble a complete multimedia project! A responsive Esports Clan Highlights Card. We will integrate a poster thumbnail, audio player, social link button, and team badge. Let's make it look like a pro esports hub!",
          urduVoice: "آئیے ایک مکمل ملٹی میڈیا پروجیکٹ تیار کرتے ہیں۔ گیمنگ کلان ہائی لائٹس کارڈ۔ جس میں تھمب نیل پوسٹر، آڈیو کمنٹری، سوشل لنکس اور ٹیم کا بیج ایک ساتھ جگمگائیں گے!",
          pakistaniContext: "Celebrate Pakistan's rising esports stars in international competitions.",
          examples: [
          {
            title: 'Example 1: Video Player with Custom Poster Thumbnail',
            urduTitle: 'مثال 1: ویڈیو شروع ہونے سے پہلے تھمب نیل پوسٹر لگانا',
            code: `<video controls poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600" width="400">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
</video>`,
            explanation: "The 'poster' attribute acts just like a YouTube thumbnail—displaying an exciting preview image until the visitor hits play.",
            urduExplanation: 'poster ایٹریبیوٹ بالکل یوٹیوب تھمب نیل کی طرح کام کرتا ہے جو ویڈیو شروع ہونے سے پہلے دلکش تصویر دکھاتا ہے۔'
          },
          {
            title: 'Example 2: Esports Clan Media Highlight Card',
            urduTitle: 'مثال 2: گیمنگ کلان کا ملٹی میڈیا کارڈ',
            code: `<div style="background:#1e293b;padding:16px;border-radius:12px;color:white;max-width:380px;">
  <span style="background:#ef4444;padding:2px 8px;border-radius:4px;font-size:11px;">LIVE HIGHLIGHT</span>
  <h3>Tekken 8 Tournament Final</h3>
  <video controls width="100%">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  </video>
</div>`,
            explanation: 'Combining video with status badges and modern container styling creates professional social-ready gaming cards.',
            urduExplanation: 'ویڈیو کے ساتھ بیجز اور خوبصورت بیک گراؤنڈ ملا کر ایک سوشل میڈیا جیسا جدید گیمنگ کارڈ بنتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #0b0f19; color: white; padding: 20px; }
    .media-card { background: #161f30; border: 2px solid #2563eb; border-radius: 14px; padding: 20px; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .badge { background: #ef4444; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    h2 { margin: 10px 0 6px 0; color: #60a5fa; font-size: 20px; }
    video { width: 100%; border-radius: 8px; margin: 10px 0; border: 1px solid #334155; }
    .btn { display: inline-block; background: #2563eb; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="media-card">
    <span class="badge">🔴 LIVE MATCH REPLAY</span>
    <h2>🇵🇰 Lahore Cyber Wolves vs Karachi Titans</h2>
    <video controls poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    </video>
    <p>Grand Finals Round 5 • Clutch Victory by <strong>Wolf_Leader_PK</strong></p>
    <a href="#join" class="btn">Join Our Discord Clan →</a>
  </div>
</body>
</html>`,
          challenge: "Add a paragraph below the video: '<p><em>Tournament Prize Pool: PKR 500,000</em></p>'!",
          hint: "Place the italicized prize pool paragraph right above the Join button.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #0b0f19; color: white; padding: 20px; }
    .media-card { background: #161f30; border: 2px solid #2563eb; border-radius: 14px; padding: 20px; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .badge { background: #ef4444; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    h2 { margin: 10px 0 6px 0; color: #60a5fa; font-size: 20px; }
    video { width: 100%; border-radius: 8px; margin: 10px 0; border: 1px solid #334155; }
    .btn { display: inline-block; background: #2563eb; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="media-card">
    <span class="badge">🔴 LIVE MATCH REPLAY</span>
    <h2>🇵🇰 Lahore Cyber Wolves vs Karachi Titans</h2>
    <video controls poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    </video>
    <p>Grand Finals Round 5 • Clutch Victory by <strong>Wolf_Leader_PK</strong></p>
    <p><em>Tournament Prize Pool: PKR 500,000</em></p>
    <a href="#join" class="btn">Join Our Discord Clan →</a>
  </div>
</body>
</html>`,
          funFact: "You can also embed YouTube videos directly into your HTML using the <iframe> tag provided by YouTube's 'Share > Embed' button!"
        }
      ],
      quiz: {
        title: "Module 3 Assessment: Media & Void Elements",
        urduTitle: "ماڈیول 3 ٹیسٹ: میڈیا اور وائڈ ٹیگز",
        questions: [
          {
            question: "Why does the <img> tag NOT have a closing </img> tag?",
            urduQuestion: "تصویر کے <img> ٹیگ کا کوئی کلوزنگ ٹیگ </img> کیوں نہیں ہوتا؟",
            options: [
              "Because it is a void / self-closing element that holds content via attributes, not inner text",
              "Because it was an error made in 1995",
              "Closing tags are illegal in HTML5",
              "Because images only exist on the computer screen"
            ],
            answer: 0,
            explanation: "Void elements like <img>, <br>, and <hr> cannot contain child nodes or text, so they do not have closing tags."
          },
          {
            question: "What happens if you omit the 'controls' attribute from a <video> element?",
            urduQuestion: "اگر ویڈیو ٹیگ میں controls نہ لکھا جائے تو کیا ہوگا؟",
            options: [
              "The browser will not show play, pause, or volume buttons",
              "The video will delete itself",
              "The browser will crash",
              "The video turns into audio only"
            ],
            answer: 0,
            explanation: "Without 'controls', the video player interface is hidden, making it impossible for the user to play or pause the video unless controlled via JavaScript."
          },
          {
            question: "Which attribute sets the thumbnail preview image shown before a video is played?",
            urduQuestion: "ویڈیو چلنے سے پہلے دکھایا جانے والا تھمب نیل کس ایٹریبیوٹ سے لگتا ہے؟",
            options: ["poster=\"image.jpg\"", "thumbnail=\"image.jpg\"", "preview=\"image.jpg\"", "cover=\"image.jpg\""],
            answer: 0,
            explanation: "The 'poster' attribute specifies an image to be shown while the video is downloading or until the user hits play."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 4: Lists, Structural Organization & Navigation
    // ─────────────────────────────────────────────────────────────
    {
      id: 4,
      title: "Module 4: Lists, Semantic Landmarks & Navigation Bars",
      urduTitle: "ماڈیول 4: لسٹس، سمینٹک ٹیگز اور نیویگیشن بار",
      badge: "Level 4 • Structure Architect",
      color: "from-purple-600 to-indigo-600",
      description: "Learn unordered <ul>, ordered <ol>, nested lists, and modern semantic tags (<header>, <nav>, <main>, <footer>) to build navigation menus.",
      urduDescription: "نمبروں اور بلٹس والی فہرستیں، سمینٹک ٹیگز کی خوبصورتی اور پروفیشنل مینیو بار بنانا سیکھیں۔",
      lessons: [
        {
          id: "m4-l1",
          title: "Lesson 1: Unordered <ul> vs Ordered <ol> Lists",
          urduTitle: "سبق 1: غیر ترتیبی (بلٹس) اور ترتیبی (نمبرز) لسٹس",
          newTerms: [
            {
              term: "<ul> & <li>",
              urduTerm: "غیر ترتیبی لسٹ (بلٹ پوائنٹس)",
              definition: "Unordered List. Renders bulleted points where order does not matter (like a shopping list). Every item inside MUST be wrapped in <li> (List Item).",
              urduDefinition: "بلٹ پوائنٹس والی فہرست جہاں ترتیب ضروری نہیں ہوتی۔ ہر شے کو <li> یعنی لسٹ آئٹم میں بند کیا جاتا ہے۔"
            },
            {
              term: "<ol>",
              urduTerm: "ترتیبی لسٹ (نمبر والی فہرست)",
              definition: "Ordered List. The browser automatically counts and numbers the items (1, 2, 3...) sequentially. Perfect for rankings, recipes, and timetables.",
              urduDefinition: "نمبروں والی فہرست جہاں براؤزر خودکار طریقے سے 1، 2، 3 وغیرہ نمبر لگاتا ہے۔ رینکنگ اور ٹائم ٹیبل کے لیے بہترین ہے۔"
            }
          ],
          analogy: "Think of an Eid Shopping List vs a Cake Recipe! For Eid shopping (shoes, kurta, perfume), the order doesn't matter (that's <ul>). But for baking a cake, step 1, step 2, step 3 MUST be in exact order (that's <ol>)!",
          urduAnalogy: "عید کی شاپنگ لسٹ اور کیک بنانے کی ترکیب کا موازنہ کریں! عید کی شاپنگ (کرتا، جوتے، عطر) میں ترتیب اہم نہیں ہے (یہ ul ہے)۔ لیکن کیک بنانے کے لیے مرحلہ 1، مرحلہ 2 ترتیب سے ہونا ضروری ہے (یہ ol ہے)!",
          concept: "Never place raw text directly inside <ul> or <ol>! Only <li> tags are allowed as direct children of a list. Lists can also be nested inside each other to create sub-menus.",
          urduConcept: "کبھی بھی ul یا ol کے اندر براہ راست تحریر مت لکھیں! صرف اور صرف <li> ٹیگ ہی لسٹ کے اندر آ سکتا ہے۔ آپ ایک لسٹ کے اندر دوسری ذیلی لسٹ بھی بنا سکتے ہیں۔",
          englishVoice: "Lists are the backbone of organized web content. Did you know that almost every navigation bar on the web is secretly an unordered list? In this lesson, we will build a Dream PC Gaming build guide, comparing bulleted lists with numbered rankings!",
          urduVoice: "فہرستیں کسی بھی ویب سائٹ کو منظم بناتی ہیں۔ کیا آپ جانتے ہیں کہ دنیا کی ہر بڑی نیویگیشن بار دراصل ایک لسٹ ہوتی ہے؟ آئیے پاکستان میں ایک خوابیدہ پی سی گیمنگ سسٹم کے پرزوں کی لسٹ تیار کرتے ہیں!",
          pakistaniContext: "Create a Matric/O-Level student's Dream PC Gaming Build specifications in PKR.",
          examples: [
          {
            title: 'Example 1: Unordered Bulleted List (ul + li)',
            urduTitle: 'مثال 1: بلٹ پوائنٹس والی غیر ترتیبی لسٹ',
            code: `<ul>
  <li>Intel Core i5 Processor</li>
  <li>Nvidia RTX 3060 GPU</li>
  <li>16GB HyperX RAM</li>
</ul>`,
            explanation: '<ul> creates bullet points where item sequence is not critical. Each item must strictly be wrapped in an <li> tag.',
            urduExplanation: '<ul> بلٹ پوائنٹس بناتا ہے جہاں ترتیب لازمی نہیں ہوتی۔ ہر شے کو لازماً <li> کے اندر بند کیا جاتا ہے۔'
          },
          {
            title: 'Example 2: Ordered Sequential Ranking List (ol + li)',
            urduTitle: 'مثال 2: نمبروں والی ترتیبی رینکنگ لسٹ',
            code: `<ol>
  <li>Babar Azam (Top Batter)</li>
  <li>Shaheen Afridi (Lead Pacer)</li>
  <li>Mohammad Rizwan (Wicketkeeper)</li>
</ol>`,
            explanation: '<ol> instructs the browser to number the items sequentially: 1, 2, 3... without you having to type numbers manually.',
            urduExplanation: '<ol> براؤزر کو خودکار طور پر نمبر لگانے کا حکم دیتا ہے: 1، 2، 3 وغیرہ، آپ کو ہاتھ سے نمبر لکھنے کی ضرورت نہیں ہوتی۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: #fafafa; }
    .box { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 460px; border: 1px solid #e5e7eb; }
    h2 { color: #d97706; margin-top: 0; }
    ol { font-weight: 600; color: #1f2937; }
    ul { list-style-type: square; color: #4b5563; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🖥️ Budget Gaming Rig (PKR 125,000)</h2>
    <p>Parts available at Hafeez Centre Lahore & Techno City Karachi:</p>
    <ol>
      <li>Processor: Intel Core i5 12400F</li>
      <li>Graphics Card: Nvidia RTX 3060 12GB</li>
      <li>RAM: 16GB DDR4 3200MHz HyperX</li>
      <li>Storage: 1TB NVMe M.2 SSD</li>
    </ol>
    <h3>Top Games to Play:</h3>
    <ul>
      <li>Counter-Strike 2 (High FPS)</li>
      <li>Tekken 8</li>
      <li>Valorant</li>
    </ul>
  </div>
</body>
</html>`,
          challenge: "Add a 4th game to the unordered list: 'Cricket 24' and see the square bullet appear!",
          hint: "Inside <ul>...</ul>, add <li>Cricket 24</li>.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: #fafafa; }
    .box { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); max-width: 460px; border: 1px solid #e5e7eb; }
    h2 { color: #d97706; margin-top: 0; }
    ol { font-weight: 600; color: #1f2937; }
    ul { list-style-type: square; color: #4b5563; }
  </style>
</head>
<body>
  <div class="box">
    <h2>🖥️ Budget Gaming Rig (PKR 125,000)</h2>
    <p>Parts available at Hafeez Centre Lahore & Techno City Karachi:</p>
    <ol>
      <li>Processor: Intel Core i5 12400F</li>
      <li>Graphics Card: Nvidia RTX 3060 12GB</li>
      <li>RAM: 16GB DDR4 3200MHz HyperX</li>
      <li>Storage: 1TB NVMe M.2 SSD</li>
    </ol>
    <h3>Top Games to Play:</h3>
    <ul>
      <li>Counter-Strike 2 (High FPS)</li>
      <li>Tekken 8</li>
      <li>Valorant</li>
      <li>Cricket 24</li>
    </ul>
  </div>
</body>
</html>`,
          funFact: "You can change the numbering style in <ol> using the 'type' attribute: type='A' for capital letters (A, B, C), or type='I' for Roman numerals (I, II, III)!"
        },
        {
          id: "m4-l2",
          title: "Lesson 2: Semantic HTML5 Tags (header, nav, main, footer)",
          urduTitle: "سبق 2: سمینٹک ٹیگز کی طاقت (ہیڈر، نیو، مین اور فوٹر)",
          newTerms: [
            {
              term: "Semantic Tag",
              urduTerm: "سمینٹک ٹیگ (با معنی ٹیگ)",
              definition: "A tag whose name clearly describes its meaning to both the browser and the developer. Instead of generic <div> everywhere, we use <header>, <nav>, <main>, <article>, and <footer>.",
              urduDefinition: "ایسا ٹیگ جس کا نام خود بتاتا ہے کہ اس کے اندر کیا مواد ہے۔ بے مقصد div لکھنے کی بجائے header، nav اور footer جیسے معنی خیز ٹیگز استعمال ہوتے ہیں۔"
            },
            {
              term: "<nav>",
              urduTerm: "نیویگیشن ٹیگ",
              definition: "Designated specifically for the main website navigation links and menus.",
              urduDefinition: "ویب سائٹ کے اہم مینیو اور لنکس کے لیے مخصوص سمینٹک ٹیگ۔"
            }
          ],
          analogy: "Imagine a house blueprint! Instead of labeling every room 'Box 1', 'Box 2', 'Box 3', the architect writes 'Kitchen', 'Living Room', 'Bedroom'. That's what semantic tags do for web architecture!",
          urduAnalogy: "کسی گھر کے نقشے کی مثال لیں! نقشہ نویس ہر کمرے کو 'باکس 1'، 'باکس 2' نہیں کہتا بلکہ 'باورچی خانہ'، 'ڈرائنگ روم' اور 'بیڈ روم' لکھتا ہے۔ سمینٹک ٹیگز بھی ویب پیج کے کمروں کو صاف نام دیتے ہیں!",
          concept: "Using semantic HTML makes your code much cleaner to maintain, significantly improves Google Search rankings (SEO), and ensures visually impaired users navigating with screen readers can easily skip to main content.",
          urduConcept: "سمینٹک ٹیگز استعمال کرنے سے نہ صرف کوڈ پڑھنا آسان ہوتا ہے بلکہ گوگل سرچ انجن آپ کی سائٹ کو ترجیح دیتا ہے اور معذور افراد کے لیے ویب سائٹ قابل رسائی بنتی ہے۔",
          englishVoice: "In the early days of the web, developers used the div tag for everything. It created what programmers call 'div soup'—a messy tangle of code! HTML5 introduced semantic tags: header for the top banner, nav for menus, main for the primary article, and footer for copyrights. Let's build a clean, modern Pakistani Tech News page!",
          urduVoice: "پرانے زمانے میں پروگرامرز ہر چیز کے لیے div ٹیگ استعمال کرتے تھے جس سے کوڈ کا کھچڑی بن جاتی تھی۔ ایچ ٹی ایم ایل 5 نے سمینٹک ٹیگز متعارف کرائے: ہیڈر اوپر کے بینر کے لیے، نیو مینیو کے لیے، مین اصل آرٹیکل کے لیے اور فوٹر کاپی رائٹ کے لیے۔ آئیے ایک جدید ٹیک نیوز پیج بناتے ہیں!",
          pakistaniContext: "Build the semantic layout for 'PakTech Wire', a tech news portal for Pakistani students.",
          examples: [
          {
            title: 'Example 1: The Core 4 Semantic Landmarks',
            urduTitle: 'مثال 1: بنیادی چار سمینٹک ٹیگز',
            code: `<header>Top Logo & Slogan</header>
<nav><a href="#">Home</a></nav>
<main><p>Primary article content goes here.</p></main>
<footer>&copy; 2026 D.TEN Pakistan</footer>`,
            explanation: 'These 4 tags replace generic divs, explicitly signaling the page header, navigation bar, main body, and footer.',
            urduExplanation: 'یہ چاروں ٹیگز بے مقصد div کی جگہ لے کر براؤزر کو بتاتے ہیں کہ ہیڈر، مینیو، اصل مواد اور فوٹر کہاں ہیں۔'
          },
          {
            title: 'Example 2: Article with Aside Fact Box',
            urduTitle: 'مثال 2: آرٹیکل کے ساتھ سائیڈ انفارمیشن باکس',
            code: `<article>
  <h2>Pakistani AI Robotics Cup</h2>
  <p>Young engineers designed autonomous drones.</p>
  <aside style="background:#ecfdf5;padding:10px;border-left:4px solid #10b981;">
    <small>💡 Fact: Over 40 school teams participated.</small>
  </aside>
</article>`,
            explanation: '<article> wraps standalone publishable stories, and <aside> houses related side notes, quotes, or author callouts.',
            urduExplanation: '<article> آزاد کہانی یا بلاگ کو سمیٹتا ہے اور <aside> ساتھ میں دلچسپ حقائق یا نوٹس کا باکس بناتا ہے۔'
          },
        ],
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; background: #f8fafc; }
    header { background: #047857; color: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #d1fae5; text-decoration: none; margin-left: 15px; font-weight: bold; }
    main { padding: 25px; max-width: 650px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    footer { text-align: center; padding: 20px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <h2>🇵🇰 PakTech Wire</h2>
    <nav>
      <a href="#ai">AI News</a>
      <a href="#esports">Esports</a>
    </nav>
  </header>

  <main>
    <article id="ai">
      <h2>Pakistani Teen Coders Win International Hackathon</h2>
      <p>Young developers from Karachi built an AI drone that detects crop diseases in Sindh.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 PakTech Wire - Islamabad, Pakistan. Built with Semantic HTML5.</p>
  </footer>
</body>
</html>`,
          challenge: "Add a 3rd link in the <nav> for 'Robotics' linking to '#robotics'!",
          hint: "Inside <nav>...</nav>, add <a href='#robotics'>Robotics</a>.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; background: #f8fafc; }
    header { background: #047857; color: white; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #d1fae5; text-decoration: none; margin-left: 15px; font-weight: bold; }
    main { padding: 25px; max-width: 650px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    footer { text-align: center; padding: 20px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <h2>🇵🇰 PakTech Wire</h2>
    <nav>
      <a href="#ai">AI News</a>
      <a href="#esports">Esports</a>
      <a href="#robotics">Robotics</a>
    </nav>
  </header>

  <main>
    <article id="ai">
      <h2>Pakistani Teen Coders Win International Hackathon</h2>
      <p>Young developers from Karachi built an AI drone that detects crop diseases in Sindh.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 PakTech Wire - Islamabad, Pakistan. Built with Semantic HTML5.</p>
  </footer>
</body>
</html>`,
          funFact: "Google's search bot automatically penalizes websites that use zero semantic tags, because it cannot easily tell where the main article begins!"
        },
        {
          id: "m4-l3",
          title: "Lesson 3: Project: Babar Azam Cricket Academy Navigation Bar",
          urduTitle: "سبق 3: پروجیکٹ: بابر اعظم کرکٹ اکیڈمی نیویگیشن بار",
          newTerms: [
            {
              term: "Call-To-Action (CTA)",
              urduTerm: "کال ٹو ایکشن بٹن",
              definition: "A prominent button that urges the visitor to take immediate action, like 'Join Now', 'Download App', or 'Register'.",
              urduDefinition: "ایسا نمایاں بٹن جو یوزر کو فوری ایکشن لینے پر آمادہ کرے جیسے 'ابھی جوائن کریں' یا 'رجسٹر کریں'۔"
            }
          ],
          analogy: "Like the golden ticket on a chocolate bar! The navigation bar provides options, but the bright CTA button is the golden ticket that draws your eye first!",
          urduAnalogy: "جس طرح کسی دکان کے دروازے پر سب سے بڑا اور چمکتا ہوا سائن بورڈ لگا ہوتا ہے، کال ٹو ایکشن بٹن بھی وہی نمایاں بٹن ہوتا ہے جس پر سب سے پہلے نظر پڑتی ہے!",
          concept: "By styling a semantic <nav> containing an unordered list with CSS Flexbox, you get a responsive, production-ready website header.",
          urduConcept: "سمینٹک nav ٹیگ اور لسٹ کو ملا کر سی ایس ایس سے ایک لائن میں سجانے سے ایک خوبصورت ریسپانسیو مینیو بار تیار ہو جاتی ہے۔",
          englishVoice: "Every major website has a stunning header. In this lesson, we will construct a production-ready navigation bar with hover effects, an academy logo, and a prominent 'Join Academy' button for Babar Azam Cricket Academy Lahore!",
          urduVoice: "دنیا کی ہر پروفیشنل ویب سائٹ کی جان اس کا ہیڈر ہوتا ہے۔ آئیے لاہور میں بابر اعظم کرکٹ اکیڈمی کے لیے ایک مکمل نیویگیشن بار بناتے ہیں، جس میں لوگو، مینیو لنکس اور خوبصورت جوائننگ بٹن شامل ہوگا!",
          pakistaniContext: "Build the landing page header for Babar Azam Cricket Academy at Gaddafi Stadium Lahore.",
          examples: [
          {
            title: 'Example 1: Horizontal Navigation Bar with Flexbox',
            urduTitle: 'مثال 1: فلیکس باکس کے ذریعے افقی نیویگیشن بار',
            code: `<nav style="display:flex;gap:20px;background:#0f172a;padding:14px;border-radius:8px;">
  <a href="#home" style="color:#38bdf8;font-weight:bold;text-decoration:none;">Home</a>
  <a href="#courses" style="color:#cbd5e1;text-decoration:none;">Courses</a>
  <a href="#contact" style="color:#cbd5e1;text-decoration:none;">Contact</a>
</nav>`,
            explanation: "'display:flex' aligns all links horizontally in a single row, and 'gap:20px' spaces them out evenly without messy margins.",
            urduExplanation: 'display:flex تمام لنکس کو ایک سیدھی افقی لائن میں لاتا ہے اور gap ان کے درمیان خودکار یکساں فاصلہ دیتا ہے۔'
          },
          {
            title: 'Example 2: Academy Header with Logo and Action Button',
            urduTitle: 'مثال 2: اکیڈمی کا ہیڈر بمعہ لوگو اور جوائننگ بٹن',
            code: `<nav style="display:flex;justify-content:space-between;align-items:center;background:#1e293b;padding:12px 24px;color:white;">
  <span style="font-weight:bold;color:#38bdf8;">🏏 BACA LAHORE</span>
  <a href="#join" style="background:#38bdf8;color:#0f172a;padding:6px 14px;border-radius:20px;font-weight:bold;text-decoration:none;">Join Academy</a>
</nav>`,
            explanation: "'justify-content: space-between' pushes the brand logo to the far left and the CTA button to the far right automatically.",
            urduExplanation: 'justify-content: space-between لوگو کو بائیں جانب اور جوائننگ بٹن کو خود بخود دائیں کونے میں بھیج دیتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #0b132b; color: white; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 28px; background: #1c2541; border-bottom: 2px solid #48cae4; }
    .logo { font-size: 20px; font-weight: 800; color: #48cae4; }
    .nav-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 20px; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-weight: 600; font-size: 14px; }
    .nav-links a:hover { color: #48cae4; }
    .cta-btn { background: #48cae4; color: #0b132b; font-weight: 800; padding: 8px 18px; border-radius: 20px; text-decoration: none; font-size: 13px; }
    .hero { text-align: center; padding: 50px 20px; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">🏏 BACA LAHORE</div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#coaching">Coaching</a></li>
      <li><a href="#tournaments">Fixtures</a></li>
    </ul>
    <a href="#register" class="cta-btn">Join Academy</a>
  </nav>

  <section class="hero">
    <h1>Master the World-Famous Cover Drive</h1>
    <p>Train under Pakistan's elite international batting coaches at Gaddafi Stadium.</p>
  </section>
</body>
</html>`,
          challenge: "Add a 4th link to the .nav-links list: '<li><a href=\"#stars\">Alumni Stars</a></li>'!",
          hint: "Place the new <li> inside the <ul class='nav-links'> list.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #0b132b; color: white; }
    .navbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 28px; background: #1c2541; border-bottom: 2px solid #48cae4; }
    .logo { font-size: 20px; font-weight: 800; color: #48cae4; }
    .nav-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 20px; }
    .nav-links a { color: #cbd5e1; text-decoration: none; font-weight: 600; font-size: 14px; }
    .nav-links a:hover { color: #48cae4; }
    .cta-btn { background: #48cae4; color: #0b132b; font-weight: 800; padding: 8px 18px; border-radius: 20px; text-decoration: none; font-size: 13px; }
    .hero { text-align: center; padding: 50px 20px; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">🏏 BACA LAHORE</div>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#coaching">Coaching</a></li>
      <li><a href="#tournaments">Fixtures</a></li>
      <li><a href="#stars">Alumni Stars</a></li>
    </ul>
    <a href="#register" class="cta-btn">Join Academy</a>
  </nav>

  <section class="hero">
    <h1>Master the World-Famous Cover Drive</h1>
    <p>Train under Pakistan's elite international batting coaches at Gaddafi Stadium.</p>
  </section>
</body>
</html>`,
          funFact: "The CSS property 'list-style: none;' removes the default bullets from an unordered list so you can style it like a modern horizontal toolbar!"
        }
      ],
      quiz: {
        title: "Module 4 Assessment: Lists & Semantic Navigation",
        urduTitle: "ماڈیول 4 ٹیسٹ: لسٹس اور سمینٹک نیویگیشن",
        questions: [
          {
            question: "Which tag represents an individual item inside both <ul> and <ol> lists?",
            urduQuestion: "ul اور ol دونوں لسٹوں میں ہر شے کو کس ٹیگ میں لکھا جاتا ہے؟",
            options: ["<li> (List Item)", "<item>", "<bullet>", "<list>"],
            answer: 0,
            explanation: "<li> stands for List Item and is the only valid direct child of <ul> and <ol>."
          },
          {
            question: "What is the primary benefit of semantic HTML5 tags like <nav>, <header>, and <footer>?",
            urduQuestion: "سمینٹک ٹیگز جیسے nav اور header استعمال کرنے کا بنیادی فائدہ کیا ہے؟",
            options: [
              "They give meaningful structure that improves search ranking and accessibility",
              "They make the internet connection faster",
              "They automatically translate English to Urdu",
              "They turn on the computer webcam"
            ],
            answer: 0,
            explanation: "Semantic tags describe their content's purpose to search engines, browsers, and screen readers."
          },
          {
            question: "Which list type automatically generates sequential numbers (1, 2, 3)?",
            urduQuestion: "کون سی لسٹ خودکار طور پر 1، 2، 3 نمبر لگاتی ہے؟",
            options: ["<ol> (Ordered List)", "<ul> (Unordered List)", "<dl>", "<nl>"],
            answer: 0,
            explanation: "<ol> stands for Ordered List and numbers items sequentially."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 5: Tables, Data Grids & Cricket Scorecards
    // ─────────────────────────────────────────────────────────────
    {
      id: 5,
      title: "Module 5: Tables, Data Grids & Cricket Scorecards",
      urduTitle: "ماڈیول 5: ٹیبلز، ڈیٹا گرڈز اور کرکٹ اسکور کارڈ",
      badge: "Level 5 • Data Master",
      color: "from-blue-700 to-indigo-700",
      description: "Master <table>, <tr>, <th>, <td>, colspan, rowspan, and semantic <thead> and <tbody> to build official cricket scorecards.",
      urduDescription: "ڈیٹا کو باقاعدہ ٹیبل میں ترتیب دینا، کالمز کو آپس میں جوڑنا اور پی ایس ایل کا آفیشل اسکور کارڈ بنانا سیکھیں۔",
      lessons: [
        {
          id: "m5-l1",
          title: "Lesson 1: Table Foundations (table, tr, th, td)",
          urduTitle: "سبق 1: ٹیبلز کی بنیاد (ٹیبل، روز، ہیڈرز اور ڈیٹا سیلز)",
          newTerms: [
            {
              term: "<tr>",
              urduTerm: "ٹیبل رو (سطر)",
              definition: "Table Row. Tables are built horizontally row by row. Everything inside a <tr> forms a single horizontal line of cells.",
              urduDefinition: "ٹیبل ہمیشہ سطر بہ سطر (Row by Row) بنتا ہے۔ tr نئی افقی لائن شروع کرتا ہے۔"
            },
            {
              term: "<th> vs <td>",
              urduTerm: "ہیڈر سیل بمقابلہ عام سیل",
              definition: "<th> (Table Header) is used for title cells at the top of a column (bold and centered). <td> (Table Data) is used for regular data cells.",
              urduDefinition: "th کالم کے عنوان کے لیے ہوتا ہے جو خودکار طور پر بولڈ اور سینٹر ہو جاتا ہے۔ td عام ڈیٹا سیل ہوتا ہے۔"
            }
          ],
          analogy: "Think of an Excel spreadsheet! The whole sheet is <table>. Each numbered row (1, 2, 3) is a <tr>. The bold title at the top like 'Price' is a <th>, and the numbers inside like '150' are <td>!",
          urduAnalogy: "ایکسل شیٹ کی مثال لیں! پوری شیٹ <table> ہے۔ ہر قطار <tr> ہے۔ کالم کا عنوان <th> ہے اور اندر لکھی گئی قیمتیں <td> ہیں!",
          concept: "Tables are designed specifically for tabular data like class schedules, match scores, or price lists. Never use tables to layout entire webpages (use CSS Flexbox instead). Always include 'border-collapse: collapse;' in CSS so cells don't have ugly double lines.",
          urduConcept: "ٹیبل صرف ڈیٹا کو منظم طریقے سے دکھانے کے لیے ہوتے ہیں جیسے کہ ٹائم ٹیبل یا اسکور بورڈ۔ بارڈرز کو خوبصورت بنانے کے لیے border-collapse استعمال کیا جاتا ہے۔",
          englishVoice: "Whenever you have numbers, dates, or cricket scores, tables are the gold standard. In HTML, tables are constructed row by row using tr tags. Inside each row, th creates a bold header cell and td creates a normal data cell. Let's build your weekly Matric study and coding schedule!",
          urduVoice: "جب بھی آپ کے پاس نمبرز، تاریخیں یا کرکٹ کے اسکورز ہوں تو ٹیبل سے بہتر کوئی طریقہ نہیں۔ ایچ ٹی ایم ایل میں ٹیبل سطر بہ سطر بنتا ہے جس کے لیے tr لکھا جاتا ہے۔ اس کے اندر th ہیڈنگ بناتا ہے اور td ڈیٹا سیل۔ آئیے میٹرک کی پڑھائی اور کوڈنگ کا ہفتہ وار ٹائم ٹیبل بناتے ہیں!",
          pakistaniContext: "Create a balanced weekly study schedule for Pakistani students preparing for Federal Board (FBISE) exams.",
          examples: [
          {
            title: 'Example 1: Basic 2x2 Table Structure',
            urduTitle: 'مثال 1: دو ضرب دو کی بنیادی ٹیبل ساخت',
            code: `<table border="1">
  <tr>
    <th>Subject</th>
    <th>Day</th>
  </tr>
  <tr>
    <td>Computer Science</td>
    <td>Monday</td>
  </tr>
</table>`,
            explanation: '<tr> defines the horizontal row. <th> creates the bold column header, and <td> creates the data cell.',
            urduExplanation: '<tr> افقی سطر بناتا ہے، <th> بولڈ ہیڈر سیل بناتا ہے، اور <td> عام ڈیٹا کا خانہ بناتا ہے۔'
          },
          {
            title: 'Example 2: Clean Table with border-collapse',
            urduTitle: 'مثال 2: بارڈر کولیپس کے ساتھ خوبصورت ٹیبل',
            code: `<table style="border-collapse:collapse;width:100%;max-width:350px;">
  <tr style="background:#0284c7;color:white;">
    <th style="padding:8px;border:1px solid #cbd5e1;">Device</th>
    <th style="padding:8px;border:1px solid #cbd5e1;">Price (PKR)</th>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid #cbd5e1;">Gaming Mouse</td>
    <td style="padding:8px;border:1px solid #cbd5e1;">2,500</td>
  </tr>
</table>`,
            explanation: "'border-collapse: collapse;' eliminates the ugly double lines between cells, rendering crisp single borders like modern apps.",
            urduExplanation: 'border-collapse: collapse بارڈرز کے درمیان کا ناپسندیدہ فاصلہ ختم کر کے ایک خوبصورت باریک لکیر بناتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #fdf4ff; }
    table { width: 100%; max-width: 500px; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
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
      <th>Coding (8-9 PM)</th>
    </tr>
    <tr>
      <td>Monday</td>
      <td>Mathematics (Algebra)</td>
      <td>HTML5 Web Building</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>Physics (Motion & Force)</td>
      <td>Python Bot Coding</td>
    </tr>
  </table>
</body>
</html>`,
          challenge: "Add a 3rd row for 'Wednesday' with 'Computer Science' and 'Gaming & Rest'!",
          hint: "Add <tr><td>Wednesday</td><td>Computer Science</td><td>Gaming & Rest</td></tr>.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #fdf4ff; }
    table { width: 100%; max-width: 500px; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
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
      <th>Coding (8-9 PM)</th>
    </tr>
    <tr>
      <td>Monday</td>
      <td>Mathematics (Algebra)</td>
      <td>HTML5 Web Building</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>Physics (Motion & Force)</td>
      <td>Python Bot Coding</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>Computer Science</td>
      <td>Gaming & Rest</td>
    </tr>
  </table>
</body>
</html>`,
          funFact: "Without the CSS rule 'border-collapse: collapse;', HTML tables render an ugly 2px gap between every single cell!"
        },
        {
          id: "m5-l2",
          title: "Lesson 2: Merging Cells with colspan and rowspan",
          urduTitle: "سبق 2: کالم اور سطروں کو جوڑنا (Colspan اور Rowspan)",
          newTerms: [
            {
              term: "colspan=\"N\"",
              urduTerm: "کالم جوڑنا (کول اسپین)",
              definition: "Stands for 'Column Span'. Makes a single table cell stretch horizontally across N columns.",
              urduDefinition: "کول اسپین کسی ایک سیل کو افقی طور پر دو یا زیادہ کالمز کے برابر چوڑا کر دیتا ہے۔"
            },
            {
              term: "rowspan=\"N\"",
              urduTerm: "سطریں جوڑنا (رو اسپین)",
              definition: "Stands for 'Row Span'. Makes a single table cell stretch vertically downward across N rows.",
              urduDefinition: "رو اسپین کسی ایک سیل کو عمودی طور پر نیچے کی طرف دو یا زیادہ سطروں کے برابر لمبا کر دیتا ہے۔"
            }
          ],
          analogy: "Think of knocking down a wall between two small rooms to create one grand master bedroom! colspan knocks down vertical column dividers so a cell becomes double wide!",
          urduAnalogy: "دو چھوٹے کمروں کے درمیان والی دیوار گرا کر ایک بڑا ہال بنانے کی طرح سوچیں! کول اسپین کالم کی دیوار گرا کر سیل کو بڑا کر دیتا ہے!",
          concept: "In cricket scorecards, the 'TOTAL SCORE' row doesn't have individual bowler names; it merges across columns using colspan. When you use colspan='2', you must remove one <td> from that row so the table doesn't overflow.",
          urduConcept: "کرکٹ اسکور کارڈ میں کل اسکور کی لائن دو یا تین کالمز کو ملا کر لکھی جاتی ہے۔ جب آپ colspan='2' لکھتے ہیں تو اسی لائن سے ایک td کم کر دیا جاتا ہے تاکہ ٹیبل خراب نہ ہو۔",
          englishVoice: "Real-world tables have merged cells. With colspan, you can create summary banners like the team's total score. Let's recreate the official Pakistan T20 World Cup batting scorecard against England!",
          urduVoice: "اصلی زندگی کے ٹیبلز میں خانے ملے ہوئے ہوتے ہیں۔ کول اسپین کے ذریعے آپ ٹوٹل اسکور کی بینر لائن بنا سکتے ہیں۔ آئیے پاکستان ٹی 20 کرکٹ ٹیم کا آفیشل بیٹنگ اسکور کارڈ تیار کرتے ہیں!",
          pakistaniContext: "Create the Pakistan National Cricket Team batting scorecard celebrating Babar Azam and Mohammad Rizwan's masterclass partnership.",
          examples: [
          {
            title: "Example 1: Merging Columns with colspan='2'",
            urduTitle: 'مثال 1: دو کالمز کو آپس میں جوڑنا',
            code: `<table border="1" style="border-collapse:collapse;">
  <tr>
    <th>Item</th>
    <th>Cost</th>
  </tr>
  <tr>
    <td>Keyboard</td>
    <td>3,000</td>
  </tr>
  <tr>
    <td colspan="2" style="text-align:center;font-weight:bold;">All Prices in PKR</td>
  </tr>
</table>`,
            explanation: "colspan='2' stretches the cell across 2 columns. Notice the last row only has one <td> because it spans the width of two!",
            urduExplanation: "colspan='2' ایک سیل کو دو کالمز جتنا چوڑا کر دیتا ہے۔ آخری سطر میں صرف ایک سیل ہے کیونکہ وہ دو کی جگہ لے رہا ہے۔"
          },
          {
            title: 'Example 2: Cricket Scorecard Total Row',
            urduTitle: 'مثال 2: کرکٹ اسکور کارڈ کی ٹوٹل اسکور سطر',
            code: `<tr style="background:#065f46;color:#fde047;font-weight:bold;">
  <td colspan="2">TOTAL (20 Overs)</td>
  <td colspan="2">198/3 (RR: 9.90)</td>
</tr>`,
            explanation: 'Merging cells with colspan allows you to create high-impact score banners without misaligning other rows.',
            urduExplanation: 'کول اسپین کے ذریعے آپ اسکور کارڈ میں بغیر ٹیبل خراب کیے واضح بینر بنا سکتے ہیں۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #064e3b; color: white; }
    table { width: 100%; max-width: 550px; border-collapse: collapse; background: #022c22; border: 2px solid #10b981; }
    th, td { padding: 10px 14px; text-align: left; border: 1px solid #065f46; }
    th { background: #047857; color: #ecfdf5; }
    .gold { color: #fde047; font-weight: bold; }
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
      <td class="gold">75</td>
      <td>48</td>
      <td>8/2</td>
    </tr>
    <tr>
      <td>Mohammad Rizwan (wk)</td>
      <td>not out</td>
      <td class="gold">88</td>
      <td>54</td>
      <td>9/3</td>
    </tr>
    <tr class="total-row">
      <td colspan="2">TOTAL (20 Overs)</td>
      <td colspan="3" class="gold">202/1 (RR: 10.10)</td>
    </tr>
  </table>
</body>
</html>`,
          challenge: "Notice how colspan='2' merges Batter + Dismissal, and colspan='3' merges Runs + Balls + 4s/6s. Change the Total to '210/1'!",
          hint: "Inside the last row, change '202/1' to '210/1'.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; padding: 20px; background: #064e3b; color: white; }
    table { width: 100%; max-width: 550px; border-collapse: collapse; background: #022c22; border: 2px solid #10b981; }
    th, td { padding: 10px 14px; text-align: left; border: 1px solid #065f46; }
    th { background: #047857; color: #ecfdf5; }
    .gold { color: #fde047; font-weight: bold; }
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
      <td class="gold">75</td>
      <td>48</td>
      <td>8/2</td>
    </tr>
    <tr>
      <td>Mohammad Rizwan (wk)</td>
      <td>not out</td>
      <td class="gold">88</td>
      <td>54</td>
      <td>9/3</td>
    </tr>
    <tr class="total-row">
      <td colspan="2">TOTAL (20 Overs)</td>
      <td colspan="3" class="gold">210/1 (RR: 10.50)</td>
    </tr>
  </table>
</body>
</html>`,
          funFact: "Colspan merges horizontally (columns); Rowspan merges vertically (rows)!"
        },
        {
          id: "m5-l3",
          title: "Lesson 3: Project: Pakistan Super League (PSL) Standings Grid",
          urduTitle: "سبق 3: پروجیکٹ: پاکستان سپر لیگ (PSL) آفیشل پوائنٹس ٹیبل گرڈ",
          newTerms: [
            {
              term: "<thead> & <tbody>",
              urduTerm: "ٹیبل ہیڈ اور باڈی",
              definition: "Semantic tags dividing the table into a Header section (<thead>) and a Data Body section (<tbody>).",
              urduDefinition: "ٹیبل کو دو حصوں میں تقسیم کرنے والے سمینٹک ٹیگز: thead ہیڈرز کے لیے اور tbody اصل ڈیٹا ریکارڈز کے لیے۔"
            }
          ],
          analogy: "Like a book with a title page and chapters! thead holds the column titles, while tbody holds the actual records.",
          urduAnalogy: "کتاب کے سرورق اور اندرونی صفحات کی طرح! thead کالموں کے نام سنبھالتا ہے اور tbody اصل ڈیٹا ریکارڈز کو محفوظ رکھتا ہے۔",
          concept: "Professional sports websites use <thead> and <tbody>. If users print the page or view it on a mobile device, the browser repeats the <thead> on every page so data remains easy to read.",
          urduConcept: "پروفیشنل اسپورٹس سائٹس thead اور tbody استعمال کرتی ہیں تاکہ موبائل اور پرنٹ پر ڈیٹا بالکل صاف نظر آئے۔",
          englishVoice: "Let's assemble a complete, production-grade tournament standings table for the Pakistan Super League! We will feature team icons, matches played, won, lost, Net Run Rate, and qualification badges.",
          urduVoice: "آئیے پی ایس ایل کی 6 فرنچائزز کے لیے ایک شاندار پوائنٹس ٹیبل بناتے ہیں۔ جس میں میچز، فتوحات، نیٹ رن ریٹ اور پلے آف کوالیفکیشن کا خوبصورت ڈیٹا نظر آئے گا!",
          pakistaniContext: "Build the official Pakistan Super League (PSL) Season Points Table featuring Lahore Qalandars, Karachi Kings, Islamabad United, Multan Sultans, and Peshawar Zalmi.",
          examples: [
          {
            title: 'Example 1: Organizing with thead and tbody',
            urduTitle: 'مثال 1: ٹیبل ہیڈ اور باڈی کو الگ الگ کرنا',
            code: `<table style="border-collapse:collapse;width:100%;">
  <thead style="background:#0f172a;color:white;">
    <tr><th>Team</th><th>Points</th></tr>
  </thead>
  <tbody>
    <tr><td>Lahore Qalandars</td><td>16</td></tr>
    <tr><td>Karachi Kings</td><td>12</td></tr>
  </tbody>
</table>`,
            explanation: '<thead> separates column titles from data rows in <tbody>, ensuring screen-readers and mobile layouts render cleanly.',
            urduExplanation: 'thead عنوانات کو tbody کے اصل ریکارڈز سے الگ کرتا ہے تاکہ موبائل اور پرنٹ پر ڈیٹا بالکل صاف نظر آئے۔'
          },
          {
            title: 'Example 2: Qualifying Zone Highlight Row',
            urduTitle: 'مثال 2: پلے آف کوالیفائی کرنے والی ٹیم کی سطر کو رنگین کرنا',
            code: `<tr style="background:rgba(34,197,94,0.15);border-left:4px solid #22c55e;">
  <td style="padding:8px;">🦁 Lahore Qalandars (Q)</td>
  <td style="padding:8px;font-weight:bold;color:#22c55e;">16 Pts</td>
</tr>`,
            explanation: 'Applying subtle background tints and colored left borders visually marks teams that have qualified for the PSL playoffs.',
            urduExplanation: 'ہلکا سبز رنگ اور بائیں جانب سبز بارڈر لگانے سے پلے آف کوالیفائی کرنے والی ٹیمیں فوری نمایاں ہو جاتی ہیں۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .table-container { background: #1e293b; padding: 20px; border-radius: 12px; max-width: 600px; border: 1px solid #334155; }
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
      </tbody>
    </table>
  </div>
</body>
</html>`,
          challenge: "Add a 4th row for '⚡ Peshawar Zalmi' with 10 matches, 5 wins, 5 losses, and 10 points!",
          hint: "Add <tr><td>⚡ Peshawar Zalmi</td><td>10</td><td>5</td><td>5</td><td>+0.110</td><td class='pts'>10</td></tr> inside <tbody>.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 20px; background: #0f172a; color: white; }
    .table-container { background: #1e293b; padding: 20px; border-radius: 12px; max-width: 600px; border: 1px solid #334155; }
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
      </tbody>
    </table>
  </div>
</body>
</html>`,
          funFact: "Stock exchanges like the Pakistan Stock Exchange (PSX) use live HTML table grids to update share prices for millions of investors simultaneously!"
        }
      ],
      quiz: {
        title: "Module 5 Assessment: Tables & Data Grids",
        urduTitle: "ماڈیول 5 ٹیسٹ: ٹیبلز اور ڈیٹا گرڈز",
        questions: [
          {
            question: "Which tag is used to create a new horizontal row in an HTML table?",
            urduQuestion: "ٹیبل کے اندر نئی افقی سطر (Row) بنانے کے لیے کون سا ٹیگ ہے؟",
            options: ["<tr> (Table Row)", "<td> (Table Data)", "<th> (Table Header)", "<row>"],
            answer: 0,
            explanation: "<tr> stands for Table Row and holds <th> and <td> cells horizontally."
          },
          {
            question: "How do you make a single table cell merge across 3 horizontal columns?",
            urduQuestion: "کسی ایک سیل کو 3 کالمز کے برابر چوڑا کیسے کیا جاتا ہے؟",
            options: ["colspan=\"3\"", "rowspan=\"3\"", "merge=\"3\"", "span=\"3\""],
            answer: 0,
            explanation: "colspan=\"3\" instructs the cell to span across 3 adjacent columns."
          },
          {
            question: "What CSS property prevents ugly double lines between table cells?",
            urduQuestion: "ٹیبل سیلز کے درمیان ڈبل بارڈرز کو ختم کرنے کے لیے کون سی پراپرٹی ہے؟",
            options: ["border-collapse: collapse;", "border: single;", "cell-merge: true;", "table-border: 0;"],
            answer: 0,
            explanation: "border-collapse: collapse merges adjacent borders into a single clean line."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 6: Interactive Forms, Inputs & User Login
    // ─────────────────────────────────────────────────────────────
    {
      id: 6,
      title: "Module 6: Interactive Forms & User Input Fields",
      urduTitle: "ماڈیول 6: انٹرایکٹو فارمز اور یوزر ان پٹ فیلڈز",
      badge: "Level 6 • Form Engineer",
      color: "from-rose-600 to-red-600",
      description: "Learn <form>, <label>, <input type=\"text/password/email/date\">, <select>, <textarea>, and <button> to collect registrations and orders.",
      urduDescription: "ویب سائٹ پر یوزر سے ڈیٹا لینا، رجسٹریشن فارم، پاس ورڈ فیلڈز اور کسٹم آرڈر فارمز بنانا سیکھیں۔",
      lessons: [
        {
          id: "m6-l1",
          title: "Lesson 1: Form Foundations (<form>, <label> & Text Inputs)",
          urduTitle: "سبق 1: فارم کی بنیاد (فارم، لیبل اور ٹیکسٹ ان پٹ)",
          newTerms: [
            {
              term: "<form>",
              urduTerm: "فارم ٹیگ",
              definition: "The container that wraps all user input fields, buttons, and checkboxes, allowing the collected data to be submitted to a server.",
              urduDefinition: "تمام ان پٹ فیلڈز اور بٹنز کو اپنے اندر سمیٹنے والا ٹیگ، جو یوزر کے لکھے ہوئے ڈیٹا کو محفوظ کرنے کے لیے بھیجتا ہے۔"
            },
            {
              term: "<label for=\"id\">",
              urduTerm: "لیبل ٹیگ",
              definition: "A text label explaining what to type into a field. When connected to <input id=\"...\">, clicking the label automatically focuses the text cursor!",
              urduDefinition: "ان پٹ فیلڈ کے اوپر لکھا جانے والا عنوان۔ جب یوزر لیبل پر کلک کرتا ہے تو کرسر خودکار طور پر ان پٹ باکس کے اندر چلا جاتا ہے۔"
            },
            {
              term: "placeholder Attribute",
              urduTerm: "پلیس ہولڈر (اشارہ)",
              definition: "Light gray hint text displayed inside an empty input box that disappears when the user begins typing.",
              urduDefinition: "ان پٹ باکس کے اندر ہلکے سرمئی رنگ میں لکھا اشارہ جو ٹائپ کرنے پر خود غائب ہو جاتا ہے۔"
            }
          ],
          analogy: "Think of an admission form for school or college! You have a box that says 'Full Name', and a blank space below it to write. In HTML, the printed title is <label> and the blank box is <input>!",
          urduAnalogy: "اسکول یا کالج کے داخلہ فارم کی طرح سوچیں! کاغذ پر لکھا ہوتا ہے 'طالب علم کا نام' اور نیچے خالی ڈبہ ہوتا ہے۔ ایچ ٹی ایم ایل میں لکھی ہوئی ہدایت <label> ہے اور خالی ڈبہ <input> ہے!",
          concept: "Forms turn a one-way website into an interactive two-way conversation. Every <input> should have an id, and every <label> should have a matching for attribute. Adding 'required' prevents users from submitting blank fields.",
          urduConcept: "فارمز ویب سائٹ کو دو طرفہ رابطہ بناتے ہیں۔ ہر ان پٹ کو id اور لیبل کو for کے ذریعے جوڑا جاتا ہے۔ required لکھنے سے فارم بغیر پر کیے جمع نہیں ہو سکتا۔",
          englishVoice: "Websites are not just digital books; they are interactive applications where users log in, search, and buy products! With forms, users can talk to your website. Always connect every label to its input with the 'for' and 'id' attributes. Let's build an esports clan application form!",
          urduVoice: "ویب سائٹس صرف پڑھنے کے لیے نہیں ہوتیں بلکہ ان پر یوزر لاگ ان کرتا ہے اور فارم بھرتا ہے۔ فارمز کے ذریعے یوزر اور ویب سائٹ میں رابطہ قائم ہوتا ہے۔ لیبل اور ان پٹ کو جوڑنا ایک اچھے کوڈر کا طریقہ ہے۔ آئیے ایک گیمنگ کلان کا رجسٹریشن فارم بناتے ہیں!",
          pakistaniContext: "Create a recruitment form for a Pakistani Esports Gaming Clan (Valorant / CS2).",
          examples: [
          {
            title: 'Example 1: Connected Label and Text Input',
            urduTitle: 'مثال 1: لیبل اور ان پٹ کو آپس میں جوڑنا',
            code: `<form>
  <label for="username">Gamer Username:</label><br>
  <input type="text" id="username" placeholder="e.g. CyberNinja_PK">
</form>`,
            explanation: "The 'for' attribute on <label> matches the 'id' on <input>. Clicking the text label focuses the cursor straight into the box!",
            urduExplanation: 'لیبل کا for اور ان پٹ کا id ایک جیسا ہے۔ جب یوزر تحریر پر کلک کرتا ہے تو کرسر خودکار طور پر ڈبے کے اندر پہنچ جاتا ہے۔'
          },
          {
            title: 'Example 2: Required Email Field with Submit Button',
            urduTitle: 'مثال 2: لازمی ای میل فیلڈ اور جمع کرانے کا بٹن',
            code: `<form action="#" method="POST">
  <label for="mail">Email Address (Required):</label><br>
  <input type="email" id="mail" required placeholder="you@gmail.com"><br><br>
  <button type="submit" style="background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;">Sign Up Free</button>
</form>`,
            explanation: "'required' stops empty submissions, and type='email' checks for '@' symbols automatically before submitting.",
            urduExplanation: "required فیلڈ کو خالی جمع ہونے سے روکتا ہے اور type='email' خودکار چیک کرتا ہے کہ @ کا نشان موجود ہے یا نہیں۔"
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; padding: 20px; }
    .form-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 400px; border: 1px solid #334155; }
    h2 { color: #f43f5e; margin-top: 0; }
    .field { margin-bottom: 14px; }
    label { display: block; margin-bottom: 5px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
    input[type="text"], input[type="email"] { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; }
    button { background: #f43f5e; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; width: 100%; cursor: pointer; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="form-card">
    <h2>🎯 Join 'Pak_Snipers' Clan</h2>
    <form action="#" method="POST">
      <div class="field">
        <label for="gamerTag">Gamer Tag (In-Game Name):</label>
        <input type="text" id="gamerTag" placeholder="e.g. ShadowStrike_99" required>
      </div>
      <div class="field">
        <label for="city">City in Pakistan:</label>
        <input type="text" id="city" placeholder="e.g. Lahore, Karachi, Rawalpindi" required>
      </div>
      <button type="submit">Submit Clan Application 🚀</button>
    </form>
  </div>
</body>
</html>`,
          challenge: "Add an email input field with label 'Contact Email:' and placeholder='gamer@gmail.com'!",
          hint: '<div class="field"><label for="email">Contact Email:</label><input type="email" id="email" placeholder="gamer@gmail.com" required></div>',
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; padding: 20px; }
    .form-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 400px; border: 1px solid #334155; }
    h2 { color: #f43f5e; margin-top: 0; }
    .field { margin-bottom: 14px; }
    label { display: block; margin-bottom: 5px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
    input[type="text"], input[type="email"] { width: 100%; box-sizing: border-box; padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: white; }
    button { background: #f43f5e; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; width: 100%; cursor: pointer; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="form-card">
    <h2>🎯 Join 'Pak_Snipers' Clan</h2>
    <form action="#" method="POST">
      <div class="field">
        <label for="gamerTag">Gamer Tag (In-Game Name):</label>
        <input type="text" id="gamerTag" placeholder="e.g. ShadowStrike_99" required>
      </div>
      <div class="field">
        <label for="city">City in Pakistan:</label>
        <input type="text" id="city" placeholder="e.g. Lahore, Karachi, Rawalpindi" required>
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
          funFact: "If you click a <label>, the browser automatically focuses on the associated input field! This makes forms much easier to use on mobile phones with touchscreens."
        },
        {
          id: "m6-l2",
          title: "Lesson 2: Passwords, Radios, Checkboxes & Date Pickers",
          urduTitle: "سبق 2: پاس ورڈز، ریڈیو بٹنز، چیک باکسز اور تاریخ",
          newTerms: [
            {
              term: "type=\"password\"",
              urduTerm: "پاس ورڈ ان پٹ",
              definition: "Masks keystrokes into black dots so someone looking over your shoulder cannot read your secret password.",
              urduDefinition: "ٹائپ کیے گئے حروف کو نقطوں میں بدل دیتا ہے تاکہ پاس کھڑا شخص آپ کا خفیہ پاس ورڈ نہ دیکھ سکے۔"
            },
            {
              term: "type=\"radio\"",
              urduTerm: "ریڈیو بٹن (ایک آپشن منتخب کرنا)",
              definition: "Round buttons where only ONE option can be selected in a group. All radios in the group must share the same 'name' attribute.",
              urduDefinition: "گول بٹن جن میں سے صرف ایک آپشن منتخب ہو سکتا ہے۔ گروپ کے تمام ریڈیو بٹنز کا 'name' ایٹریبیوٹ ایک جیسا ہونا لازمی ہے۔"
            },
            {
              term: "type=\"checkbox\"",
              urduTerm: "چیک باکس (ایک سے زیادہ آپشنز)",
              definition: "Square tick-boxes where the user can check multiple choices (e.g. Agreeing to Terms, selecting multiple interests).",
              urduDefinition: "چوکور خانے جہاں یوزر ایک سے زیادہ آپشنز پر ٹک کا نشان لگا سکتا ہے۔"
            }
          ],
          analogy: "Think of multiple-choice exam questions! A single-answer question is a Radio button (only A, B, C, or D). A question that says 'Select all that apply' is a Checkbox!",
          urduAnalogy: "امتحان کے ایم سی کیوز کی طرح سوچیں! جس سوال کا صرف ایک ہی درست جواب ہو وہ ریڈیو بٹن ہے۔ اور جہاں لکھا ہو کہ 'تمام درست آپشنز منتخب کریں' وہ چیک باکس ہے!",
          concept: "Radio buttons require a shared 'name' attribute to establish mutual exclusion. Checkboxes can be checked or unchecked independently. Input type='date' automatically pops up an interactive calendar on mobile and desktop.",
          urduConcept: "ریڈیو بٹنز کے لیے name ایک جیسا ہونا ضروری ہے۔ چیک باکس کو یوزر مرضی سے آن یا آف کر سکتا ہے۔ اور type='date' سے کمپیوٹر کا مکمل کیلنڈر کھل جاتا ہے۔",
          englishVoice: "User authentication and preference choices are vital for real web applications. When users sign in, type='password' protects their credentials with secure dots. Radio buttons let gamers pick their primary role, and checkboxes confirm their agreement. Let's build a registration portal for the Pakistan AI Youth Hackathon!",
          urduVoice: "ویب سائٹ پر رجسٹریشن اور یوزر کی پسند جاننے کے لیے مختلف ان پٹس استعمال ہوتے ہیں۔ پاس ورڈ فیلڈ حروف کو چھپا دیتی ہے۔ ریڈیو بٹن سے صرف ایک رول منتخب ہوتا ہے اور چیک باکس سے شرائط منظور ہوتی ہیں۔ آئیے پاکستان یوتھ ہیکاتھون کا رجسٹریشن فارم بناتے ہیں!",
          pakistaniContext: "Create a registration form for the Pakistan National Young AI Hackathon 2026.",
          examples: [
          {
            title: 'Example 1: Password Input and Agreement Checkbox',
            urduTitle: 'مثال 1: پاس ورڈ فیلڈ اور اقرار نامے کا چیک باکس',
            code: `<form>
  <label for="pass">Password:</label><br>
  <input type="password" id="pass" placeholder="••••••••"><br><br>
  <label><input type="checkbox" required> I agree to Fair Play rules</label>
</form>`,
            explanation: "type='password' masks characters into secure black dots. type='checkbox' allows simple on/off selection.",
            urduExplanation: "type='password' خفیہ الفاظ کو نقطوں میں بدلتا ہے اور type='checkbox' ٹک لگانے کی سہولت دیتا ہے۔"
          },
          {
            title: 'Example 2: Radio Button Group (Single Selection)',
            urduTitle: 'مثال 2: ریڈیو بٹن گروپ (صرف ایک آپشن کا انتخاب)',
            code: `<p>Select Your Gaming Role:</p>
<label><input type="radio" name="role" value="sniper" checked> Sniper</label>
<label><input type="radio" name="role" value="entry"> Entry Fragger</label>
<label><input type="radio" name="role" value="support"> Support</label>`,
            explanation: "Because all 3 radios share name='role', selecting one automatically unchecks the others!",
            urduExplanation: "کیونکہ تینوں ریڈیو بٹنز کا name='role' ایک جیسا ہے، اس لیے کسی ایک کو منتخب کرنے سے باقی خودکار ہٹ جاتے ہیں۔"
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f1f5f9; padding: 20px; }
    .form-box { background: white; padding: 22px; border-radius: 10px; max-width: 420px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    h2 { color: #0284c7; margin-top: 0; }
    .group { margin-bottom: 14px; }
    label { font-size: 13px; font-weight: 600; color: #334155; }
    .options { display: flex; gap: 14px; margin-top: 6px; }
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

      <button type="submit" style="background: #0284c7; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; width: 100%;">Complete Registration</button>
    </form>
  </div>
</body>
</html>`,
          challenge: "Add a 3rd radio button option for '🛡️ Cybersecurity' with value='security'!",
          hint: "Inside .options, add <label><input type='radio' name='role' value='security'> 🛡️ Cybersecurity</label>.",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #f1f5f9; padding: 20px; }
    .form-box { background: white; padding: 22px; border-radius: 10px; max-width: 420px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    h2 { color: #0284c7; margin-top: 0; }
    .group { margin-bottom: 14px; }
    label { font-size: 13px; font-weight: 600; color: #334155; }
    .options { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 6px; }
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
          <label><input type="radio" name="role" value="security"> 🛡️ Cybersecurity</label>
        </div>
      </div>

      <div class="group">
        <label><input type="checkbox" required> I agree to the Pakistan Tech Code of Conduct.</label>
      </div>

      <button type="submit" style="background: #0284c7; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; width: 100%;">Complete Registration</button>
    </form>
  </div>
</body>
</html>`,
          funFact: "Radio buttons got their name from old car radios where pushing one mechanical channel button popped out the other button!"
        },
        {
          id: "m6-l3",
          title: "Lesson 3: Project: Custom Gaming PC Quote & Order Form",
          urduTitle: "سبق 3: پروجیکٹ: کسٹم گیمنگ پی سی کوٹیشن و آرڈر فارم",
          newTerms: [
            {
              term: "<select> & <option>",
              urduTerm: "ڈراپ ڈاؤن مینیو",
              definition: "Creates a compact dropdown menu of choices. <select> is the container and each choice is an <option>.",
              urduDefinition: "کلک کرنے پر نیچے کھلنے والی آپشنز کی لسٹ۔ select کنٹینر ہے اور option اس کی ایک ایک شے ہے۔"
            },
            {
              term: "<textarea>",
              urduTerm: "ملٹی لائن ٹیکسٹ باکس",
              definition: "A large, resizable text box allowing users to type long paragraphs, feedback, or delivery addresses.",
              urduDefinition: "کئی سطروں پر مشتمل بڑا ٹیکسٹ باکس، جس میں لمبا پیغام، رائے یا ڈلیوری کا پتہ لکھا جا سکے۔"
            }
          ],
          analogy: "Like a restaurant menu! The <select> is the laminated menu card, and each delicious dish listed is an <option>!",
          urduAnalogy: "کسی ریستوران کے مینیو کارڈ کی طرح! سلیکٹ ٹیگ پورا کارڈ ہے اور اس کے اندر موجود ہر ڈش ایک آپشن ہے!",
          concept: "By combining select dropdowns, number steppers, textareas, submit buttons, and reset buttons, you can build full-fledged commercial ecommerce order forms.",
          urduConcept: "ڈراپ ڈاؤن، نمبرز اور ٹیکسٹ ایریا کو ملا کر آپ ای کامرس کے لیے اصلی آرڈر فارمز تیار کر سکتے ہیں۔",
          englishVoice: "Let's build a real commercial e-commerce order form for a Pakistani custom PC building business! Customers can choose their graphics card from a dropdown, enter their delivery address in a textarea, and request an instant quote. Let's assemble the form!",
          urduVoice: "آئیے ایک اصلی کمرشل ای کامرس فارم بناتے ہیں جہاں کسٹمر ڈراپ ڈاؤن سے گرافکس کارڈ چن سکے، ٹیکسٹ ایریا میں ڈلیوری کا پتہ لکھ سکے اور فوری کوٹیشن مانگ سکے۔ آئیے مل کر کوڈ کرتے ہیں!",
          pakistaniContext: "Build a custom quote builder for a Hafeez Centre Lahore and Techno City Karachi PC builder.",
          examples: [
          {
            title: 'Example 1: Dropdown Selection Menu (<select> + <option>)',
            urduTitle: 'مثال 1: ڈراپ ڈاؤن سلیکشن مینیو',
            code: `<label for="city">Select Your City:</label><br>
<select id="city">
  <option value="lhr">Lahore</option>
  <option value="khi">Karachi</option>
  <option value="isb">Islamabad</option>
</select>`,
            explanation: '<select> creates the dropdown container, and each <option> represents a clickable choice.',
            urduExplanation: '<select> ڈراپ ڈاؤن کنٹینر ہے اور <option> اس کے اندر موجود ایک ایک شہر کا نام ہے۔'
          },
          {
            title: 'Example 2: Multi-line Message Textarea and Reset Button',
            urduTitle: 'مثال 2: ملٹی لائن ٹیکسٹ ایریا اور ری سیٹ بٹن',
            code: `<form>
  <label for="msg">Custom PC Specifications / Address:</label><br>
  <textarea id="msg" rows="3" cols="30" placeholder="Describe your build..."></textarea><br><br>
  <button type="submit">Submit</button>
  <button type="reset">Reset Form</button>
</form>`,
            explanation: "<textarea> accepts long paragraphs with multiple lines. <button type='reset'> restores all inputs to empty.",
            urduExplanation: '<textarea> لمبی تحریر اور پتوں کے لیے ہوتا ہے۔ reset بٹن پورے فارم کو ایک کلک میں دوبارہ خالی کر دیتا ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: white; padding: 20px; }
    .builder-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 440px; border: 1px solid #334155; }
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
        </select>
      </div>

      <div class="row">
        <label for="fans">RGB Case Fans Quantity:</label>
        <input type="number" id="fans" min="1" max="9" value="4">
      </div>

      <div class="row">
        <label for="address">Delivery Address & Custom Notes:</label>
        <textarea id="address" rows="3" placeholder="e.g. Gulberg III, Lahore. White cables preferred..."></textarea>
      </div>

      <div class="actions">
        <button type="submit" class="btn-submit">Request Free Quote 💬</button>
        <button type="reset" class="btn-reset">Reset</button>
      </div>
    </form>
  </div>
</body>
</html>`,
          challenge: "Add an option for 'AMD Radeon RX 6700 XT (PKR 92,000)' inside the <select> element!",
          hint: "<option value='rx6700xt'>AMD Radeon RX 6700 XT (PKR 92,000)</option>",
          solution: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #0f172a; color: white; padding: 20px; }
    .builder-card { background: #1e293b; padding: 24px; border-radius: 12px; max-width: 440px; border: 1px solid #334155; }
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
        <label for="address">Delivery Address & Custom Notes:</label>
        <textarea id="address" rows="3" placeholder="e.g. Gulberg III, Lahore. White cables preferred..."></textarea>
      </div>

      <div class="actions">
        <button type="submit" class="btn-submit">Request Free Quote 💬</button>
        <button type="reset" class="btn-reset">Reset</button>
      </div>
    </form>
  </div>
</body>
</html>`,
          funFact: "A <button type='reset'> automatically restores every single field in the entire form back to its default starting value without writing any JavaScript!"
        }
      ],
      quiz: {
        title: "Module 6 Assessment: Forms & Input Types",
        urduTitle: "ماڈیول 6 ٹیسٹ: فارمز اور ان پٹ ٹائپس",
        questions: [
          {
            question: "Which input type securely conceals entered characters with black dots?",
            urduQuestion: "کون سا ان پٹ ٹائپ یوزر کے لکھے ہوئے الفاظ کو نقطوں میں چھپا دیتا ہے؟",
            options: ["type=\"password\"", "type=\"secret\"", "type=\"hidden\"", "type=\"protect\""],
            answer: 0,
            explanation: "input type=\"password\" automatically masks sensitive keystrokes for user privacy."
          },
          {
            question: "How do you ensure only ONE radio button can be selected at a time in a group?",
            urduQuestion: "ریڈیو بٹنز کے گروپ میں سے صرف ایک آپشن منتخب ہونے کی ضمانت کیسے ملتی ہے؟",
            options: [
              "Give all radio buttons in the group the exact same 'name' attribute",
              "Wrap each in a separate <form>",
              "Use single=\"true\"",
              "Radio buttons can never have multiple selections anyway"
            ],
            answer: 0,
            explanation: "Radio buttons sharing the identical 'name' attribute belong to one mutual-exclusion group."
          },
          {
            question: "Which HTML element creates a multi-line text input field for messages and addresses?",
            urduQuestion: "پیغامات اور پتوں کے لیے کئی سطروں والی بڑی فیلڈ کس ٹیگ سے بنتی ہے؟",
            options: ["<textarea>", "<input type=\"multiline\">", "<textbox>", "<input type=\"paragraph\">"],
            answer: 0,
            explanation: "<textarea> creates a resizable, multi-line text input area."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 7: Modern CSS Introduction, Dark Mode & Capstone Portfolio
    // ─────────────────────────────────────────────────────────────
    {
      id: 7,
      title: "Module 7: Modern CSS Integration, Flexbox & Capstone Portfolio",
      urduTitle: "ماڈیول 7: جدید سی ایس ایس، فلیکس باکس اور فائنل پورٹ فولیو",
      badge: "Level 7 • Master Web Engineer",
      color: "from-blue-700 via-indigo-700 to-purple-800",
      description: "Master CSS selectors (.class, #id), the Box Model (padding, margin, border), Flexbox alignment, and build your flagship portfolio website for the D.TEN diploma!",
      urduDescription: "سی ایس ایس کا باکس ماڈل، فلیکس باکس، نیون گلو اور اپنا ذاتی پورٹ فولیو بنا کر ڈی ٹین کا آفیشل سرٹیفکیٹ حاصل کریں۔",
      lessons: [
        {
          id: "m7-l1",
          title: "Lesson 1: The CSS Box Model (Margin vs Padding vs Border)",
          urduTitle: "سبق 1: سی ایس ایس باکس ماڈل (مارجن، پیڈنگ اور بارڈر کا فرق)",
          newTerms: [
            {
              term: "Padding",
              urduTerm: "پیڈنگ (اندرونی فاصلہ)",
              definition: "The buffer space INSIDE an element, between its text/content and its outer border.",
              urduDefinition: "مواد اور بارڈر کے درمیان اندرونی خالی جگہ۔ اس سے تحریر بارڈر سے چپکتی نہیں۔"
            },
            {
              term: "Border",
              urduTerm: "بارڈر (چاردیواری)",
              definition: "The decorative outline wrapping around an element's padding and content (e.g. 2px solid #3b82f6).",
              urduDefinition: "کسی بھی عنصر کے گرد کھینچی جانے والی چاردیواری یا آؤٹ لائن۔"
            },
            {
              term: "Margin",
              urduTerm: "مارجن (بیرونی فاصلہ)",
              definition: "The invisible empty space OUTSIDE the border, pushing neighboring boxes away from each other.",
              urduDefinition: "بارڈر کے باہر والی خالی جگہ، جو دو خانوں کو آپس میں ٹکرانے سے روکتی ہے۔"
            }
          ],
          analogy: "Think of a house in Pakistan! The rooms inside are the content. The courtyard garden inside the boundary wall is Padding. The perimeter boundary wall is the Border. The street outside separating your house from your neighbor's house is Margin!",
          urduAnalogy: "کسی پاکستانی گھر کی مثال لیں! کمروں کے اندر کا حصہ مواد ہے۔ چاردیواری کے اندر کا کھلا صحن پیڈنگ (Padding) ہے۔ چاردیواری خود بارڈر (Border) ہے۔ اور گھر کے باہر گلی کا فاصلہ مارجن (Margin) ہے!",
          concept: "Every single HTML tag is treated by the browser as a rectangular box. Beginners often mix up padding and margin: Padding pushes outward from inside the border; Margin pushes neighboring boxes away on the outside.",
          urduConcept: "براؤزر ایچ ٹی ایم ایل کے ہر ٹیگ کو ایک چوکور باکس سمجھتا ہے۔ پیڈنگ بارڈر کے اندر جگہ بناتی ہے اور مارجن بارڈر کے باہر فاصلہ پیدا کرتا ہے۔",
          englishVoice: "The CSS Box Model is the foundation of professional web design. Once you understand the difference between padding and margin, you will never struggle with layout spacing again! Padding is inside the border, margin is outside the border. Let's create an interactive product pricing card to see the difference live!",
          urduVoice: "سی ایس ایس باکس ماڈل کو سمجھنا ہر پروفیشنل ویب ڈویلپر کے لیے لازمی ہے۔ پیڈنگ بارڈر کے اندر کی جگہ ہے اور مارجن بارڈر کے باہر کی جگہ۔ جب آپ یہ فرق سمجھ جائیں گے تو آپ کے ویب پیجز انتہائی خوبصورت لگیں گے۔ آئیے ایک شاندار پراڈکٹ کارڈ بنا کر باکس ماڈل کو لائیو دیکھتے ہیں!",
          pakistaniContext: "Style interactive tech product pricing cards for Pakistani stores.",
          examples: [
          {
            title: 'Example 1: The CSS Box Model (Padding vs Border vs Margin)',
            urduTitle: 'مثال 1: سی ایس ایس باکس ماڈل (پیڈنگ، بارڈر اور مارجن)',
            code: `<div style="background:#312e81;padding:20px;border:3px solid #818cf8;margin:20px;color:white;border-radius:10px;">
  <h3>Padding is inside the border.</h3>
  <p>Margin is outside pushing neighbors away.</p>
</div>`,
            explanation: 'Padding (20px) creates breathing room inside the purple border. Margin (20px) creates empty room outside.',
            urduExplanation: 'پیڈنگ بارڈر کے اندر 20 پکسل جگہ بناتی ہے، جبکہ مارجن بارڈر کے باہر فاصلہ دیتا ہے۔'
          },
          {
            title: 'Example 2: Cyberpunk Neon Card with box-shadow',
            urduTitle: 'مثال 2: نیون گلو اور شیڈو والا جدید کارڈ',
            code: `<div style="background:#0f172a;border:2px solid #ec4899;box-shadow:0 0 20px #ec4899;padding:16px;border-radius:12px;color:white;max-width:300px;">
  <h3 style="color:#f472b6;margin-top:0;">Neon Cyber Shield</h3>
  <p>Status: Active Protection</p>
</div>`,
            explanation: "'box-shadow: 0 0 20px #ec4899;' gives the border a glowing pink neon aesthetic popular in gaming UI.",
            urduExplanation: 'box-shadow بارڈر کے گرد چمکتا ہوا نیون گلو دیتا ہے جو گیمنگ انٹرفیس میں بہت مقبول ہے۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #1e1b4b; color: white; padding: 20px; }
    .box-demo {
      background: #312e81;          /* Background color */
      padding: 24px;                 /* Space INSIDE the border */
      border: 3px solid #818cf8;    /* The Border outline */
      border-radius: 12px;           /* Smooth rounded corners */
      margin: 20px 0;                /* Space OUTSIDE the border */
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
    <p>67W GaN Super Fast Charger + Braided Type-C Cable.</p>
    <p>Price: <strong>PKR 3,500</strong></p>
  </div>
</body>
</html>`,
          challenge: "Change 'border-color: #ec4899;' and 'box-shadow: 0 0 25px #ec4899;' to give the box a cyberpunk neon pink glow!",
          hint: "In .box-demo, update the border and box-shadow color hex codes to #ec4899.",
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
    <p>67W GaN Super Fast Charger + Braided Type-C Cable.</p>
    <p>Price: <strong>PKR 3,500</strong></p>
  </div>
</body>
</html>`,
          funFact: "Always include '* { box-sizing: border-box; }' at the top of your CSS stylesheet so padding doesn't accidentally increase the overall width of your containers!"
        },
        {
          id: "m7-l2",
          title: "Lesson 2: Flexbox Alignment (Centering & Responsive Grids)",
          urduTitle: "سبق 2: فلیکس باکس کا کمال (اشیاء کو درمیان میں لانا اور گرڈ بنانا)",
          newTerms: [
            {
              term: "display: flex",
              urduTerm: "فلیکس باکس لے آؤٹ",
              definition: "Turns any container into a flexible one-dimensional layout, aligning child elements horizontally in a clean row.",
              urduDefinition: "کسی بھی باکس کو لچکدار بنا کر اس کے اندر موجود تمام چیزوں کو ایک خوبصورت قطار میں لگا دیتا ہے۔"
            },
            {
              term: "justify-content",
              urduTerm: "افقی سیدھ (Horizontal Alignment)",
              definition: "Controls horizontal alignment along the main axis: center, space-between, or flex-start.",
              urduDefinition: "تمام چیزوں کو افقی طور پر اسکرین کے بیچ میں لانے یا ان کے درمیان فاصلہ تقسیم کرنے کی پراپرٹی۔"
            }
          ],
          analogy: "Think of an Olympic medal podium! Three athletes standing side by side, centered on the stage with equal spacing between them. display: flex achieves that with just 3 lines of code!",
          urduAnalogy: "اولمپک میڈل پوڈیم کی طرح سوچیں جہاں تینوں کھلاڑی ایک قطار میں بالکل درمیان میں کھڑے ہوتے ہیں۔ فلیکس باکس بھی صرف 3 لائنوں کے کوڈ سے تمام چیزوں کو اسکرین کے بیچوں بیچ سجا دیتا ہے!",
          concept: "Before Flexbox, aligning items horizontally required complicated floats and hacks. Flexbox makes horizontal card grids, centering items, and responsive wrapping effortless.",
          urduConcept: "فلیکس باکس سے پہلے ویب پیج پر اشیاء کو ایک لائن میں لانا بہت مشکل تھا۔ اب display: flex اور justify-content: center سے ہر چیز خودکار سیدھ میں آ جاتی ہے۔",
          englishVoice: "For 20 years, centering an element on a webpage was a famous running joke among programmers because it was so hard. Flexbox solved it forever! With just display: flex and justify-content: center, anything centers perfectly. Let's build a trendy sneaker product card showcase!",
          urduVoice: "ماضی میں ویب سائٹ پر کسی چیز کو بالکل درمیان میں لانا اتنا مشکل تھا کہ اس پر لطیفے بنتے تھے۔ فلیکس باکس نے اسے ہمیشہ کے لیے آسان بنا دیا۔ صرف ڈسپلے فلیکس لکھنے سے تمام کارڈز ایک قطار میں سنٹر ہو جاتے ہیں۔ آئیے کراچی اسٹریٹ ویئر اسنیکرز کا شاندار پروڈکٹ گرڈ تیار کرتے ہیں!",
          pakistaniContext: "Build a responsive sneaker and streetwear showcase popular among Pakistani teenagers.",
          examples: [
          {
            title: 'Example 1: Perfect Horizontal Centering with Flexbox',
            urduTitle: 'مثال 1: فلیکس باکس کے ذریعے بالکل درمیان میں لانا',
            code: `<div style="display:flex;justify-content:center;align-items:center;height:120px;background:#18181b;border-radius:10px;">
  <button style="background:#a855f7;color:white;padding:10px 20px;border:none;border-radius:6px;font-weight:bold;">Centered Button ⚡</button>
</div>`,
            explanation: "Combining 'display: flex' with 'justify-content: center' and 'align-items: center' centers any element in 3 lines.",
            urduExplanation: 'ڈسپلے فلیکس اور دونوں سنٹر پراپرٹیز ملا کر کسی بھی بٹن کو باکس کے بالکل بیچوں بیچ لے آتی ہیں۔'
          },
          {
            title: 'Example 2: Responsive Product Cards Grid',
            urduTitle: 'مثال 2: ریسپانسیو پروڈکٹ کارڈز کی گرڈ',
            code: `<div style="display:flex;gap:12px;flex-wrap:wrap;background:#18181b;padding:16px;">
  <div style="background:#27272a;padding:12px;border-radius:8px;color:white;width:130px;text-align:center;">
    <h4>Jordan 1</h4><p style="color:#a855f7;">PKR 14.5k</p>
  </div>
  <div style="background:#27272a;padding:12px;border-radius:8px;color:white;width:130px;text-align:center;">
    <h4>Yeezy 350</h4><p style="color:#a855f7;">PKR 18.9k</p>
  </div>
</div>`,
            explanation: "'flex-wrap: wrap' allows cards to automatically drop down to the next row when viewed on a narrow smartphone screen.",
            urduExplanation: 'flex-wrap: wrap کارڈز کو موبائل اسکرین پر خودکار طریقے سے اگلی لائن پر منتقل ہونے کی لچک دیتا ہے۔'
          },
        ],
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
      width: 180px;
      text-align: center;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover { transform: translateY(-5px); border-color: #a855f7; }
    .price { color: #a855f7; font-weight: bold; font-size: 16px; }
  </style>
</head>
<body>
  <h2 style="text-align: center; color: #a855f7;">👟 Karachi Streetwear Sneaker Drop</h2>
  <div class="flex-container">
    <div class="card">
      <h3>Retro Jordan 1</h3>
      <p class="price">PKR 14,500</p>
    </div>
    <div class="card">
      <h3>Yeezy Boost</h3>
      <p class="price">PKR 18,900</p>
    </div>
    <div class="card">
      <h3>Nike Dunk Low</h3>
      <p class="price">PKR 12,000</p>
    </div>
  </div>
</body>
</html>`,
          challenge: "Add a 4th card for 'Puma RS-X' priced at 'PKR 11,500' and watch Flexbox automatically align it!",
          hint: "Copy a .card div block and add it inside .flex-container.",
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
      width: 180px;
      text-align: center;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover { transform: translateY(-5px); border-color: #a855f7; }
    .price { color: #a855f7; font-weight: bold; font-size: 16px; }
  </style>
</head>
<body>
  <h2 style="text-align: center; color: #a855f7;">👟 Karachi Streetwear Sneaker Drop</h2>
  <div class="flex-container">
    <div class="card">
      <h3>Retro Jordan 1</h3>
      <p class="price">PKR 14,500</p>
    </div>
    <div class="card">
      <h3>Yeezy Boost</h3>
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
          funFact: "Over 95% of modern CSS frameworks like Tailwind CSS rely entirely on CSS Flexbox for their grid and layout utility classes!"
        },
        {
          id: "m7-l3",
          title: "Lesson 3: Capstone Flagship Project: Teen Developer Portfolio & SEO",
          urduTitle: "سبق 3: فائنل پروجیکٹ: ذاتی ڈویلپر پورٹ فولیو اور گوگل ایس ای او",
          newTerms: [
            {
              term: "Portfolio Website",
              urduTerm: "ڈویلپر پورٹ فولیو ویب سائٹ",
              definition: "A personal showcase website demonstrating your coding projects, technical skills, and contact info to clients and tech companies.",
              urduDefinition: "ایک ذاتی شوکیس ویب سائٹ جس پر آپ کی بنائی ہوئی ویب سائٹس، مہارتیں اور رابطہ کی تفصیلات موجود ہوتی ہیں۔"
            },
            {
              term: "<meta name=\"description\">",
              urduTerm: "گوگل ایس ای او میٹا ٹیگ",
              definition: "A hidden tag inside <head> providing a 1-sentence summary that Google displays under your website link in search results.",
              urduDefinition: "ہیڈ ٹیگ کے اندر چھپا ٹیگ جو گوگل سرچ رزلٹس میں آپ کی ویب سائٹ کے لنک کے نیچے نظر آتا ہے۔"
            }
          ],
          analogy: "Think of a superhero's identity card and trophy room! Your portfolio is your trophy room where anyone visiting can inspect the cool web apps you built with your own hands!",
          urduAnalogy: "کسی سپر ہیرو کے ٹرافی روم کی طرح سوچیں! آپ کی پورٹ فولیو ویب سائٹ آپ کا ڈیجیٹل ٹرافی روم ہے جہاں کوئی بھی آ کر دیکھ سکتا ہے کہ آپ نے اپنے ہاتھوں سے کون کون سے شاہکار پروجیکٹس بنائے ہیں!",
          concept: "This is your graduation capstone project! You will combine semantic landmarks, dark-mode CSS, skills pills, project cards, and meta tags into a production-ready personal developer website.",
          urduConcept: "یہ آپ کا فائنل پروجیکٹ ہے۔ تمام ماڈیولز میں سیکھے گئے ٹیگز، سی ایس ایس، اسکلز بیجز اور پروجیکٹس کو ملا کر ایک مکمل پورٹ فولیو تیار کریں۔",
          englishVoice: "Congratulations young engineer! You have reached your graduation project. You started from absolute zero, and now you are writing complete HTML5 applications. In this capstone lesson, we will construct your official personal developer portfolio. Customize it with your name and city, take the final exam, and claim your verified D.TEN Web Developer Diploma!",
          urduVoice: "مبارک ہو نوجوان ویب انجینئر! آپ نے بالکل صفر سے آغاز کیا تھا، اور اب آپ ایک مکمل ایچ ٹی ایم ایل 5 ویب سائٹ بنا رہے ہیں۔ اس فائنل پروجیکٹ میں ہم آپ کی اپنی ذاتی پورٹ فولیو ویب سائٹ تیار کریں گے۔ اپنا نام اور شہر درج کریں، فائنل امتحان پاس کریں، اور ڈی ٹین کا آفیشل گولڈ سرٹیفکیٹ حاصل کریں!",
          pakistaniContext: "Create a world-class portfolio for a 15-year-old Pakistani coder aiming for international remote freelance clients.",
          examples: [
          {
            title: 'Example 1: Essential SEO Meta Tags in <head>',
            urduTitle: 'مثال 1: گوگل ایس ای او کے اہم میٹا ٹیگز',
            code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Junior Web Developer portfolio of Pakistani teen coder.">
  <title>Ali Codes | Web Dev PK</title>
</head>`,
            explanation: 'The viewport tag optimizes mobile layout scaling, and the description meta tag provides Google with search snippets.',
            urduExplanation: 'viewport ٹیگ موبائل پر ویب سائٹ کو فٹ کرتا ہے اور description ٹیگ گوگل سرچ میں پیج کا تعارف دکھاتا ہے۔'
          },
          {
            title: 'Example 2: Tech Skills Badges Component',
            urduTitle: 'مثال 2: مہارتوں کے بیجز کا ماڈرن کمپوننٹ',
            code: `<div style="display:flex;gap:8px;flex-wrap:wrap;">
  <span style="background:#1e293b;color:#38bdf8;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid #334155;">⚡ HTML5</span>
  <span style="background:#1e293b;color:#a855f7;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid #334155;">🎨 CSS Flexbox</span>
  <span style="background:#1e293b;color:#34d399;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid #334155;">📊 Tables</span>
</div>`,
            explanation: 'Pill-style badges with contrasting borders and dark backgrounds communicate technical competence at a glance.',
            urduExplanation: 'پِل اسٹائل کے بیجز پورٹ فولیو پر آپ کی مختلف مہارتوں کو ایک نظر میں شاندار طریقے سے دکھاتے ہیں۔'
          },
        ],
starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Personal portfolio of an aspiring young Pakistani web developer.">
  <title>Muhammad Ali | Junior Web Developer PK</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: #090d16; color: #e2e8f0; line-height: 1.6; }
    header { background: #0f172a; padding: 20px 30px; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-size: 20px; font-weight: 800; color: #38bdf8; }
    .hero { text-align: center; padding: 40px 20px; max-width: 650px; margin: auto; }
    .hero h1 { font-size: 32px; margin-bottom: 8px; color: #ffffff; }
    .hero span { color: #38bdf8; }
    .skills-grid { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
    .skill-pill { background: #1e293b; border: 1px solid #334155; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; color: #38bdf8; }
    .projects { max-width: 650px; margin: 20px auto; padding: 0 20px; }
    .proj-card { background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 18px; margin-bottom: 14px; }
    .proj-card h3 { margin-top: 0; color: #a78bfa; }
    footer { text-align: center; padding: 25px; color: #64748b; font-size: 13px; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <header>
    <div class="brand">🚀 ALI_CODES_PK</div>
    <div style="font-size: 13px; color: #94a3b8;">Islamabad, Pakistan 🇵🇰</div>
  </header>

  <section class="hero">
    <h1>Hi, I'm Ali. A 15-year-old <span>Web Developer</span>.</h1>
    <p>Certified by D.TEN. Building responsive HTML5 websites, interactive gaming hubs, and custom forms.</p>
    <div class="skills-grid">
      <div class="skill-pill">⚡ HTML5 Semantic</div>
      <div class="skill-pill">🎨 CSS3 Flexbox</div>
      <div class="skill-pill">📊 Data Tables</div>
      <div class="skill-pill">🎮 Esports Media</div>
    </div>
  </section>

  <section class="projects">
    <h2>Featured Web Projects</h2>
    <div class="proj-card">
      <h3>🏏 PSL Live Scoreboard Grid</h3>
      <p>A semantic HTML5 table displaying live cricket run-rates, batter stats, and boundary tallies.</p>
    </div>
    <div class="proj-card">
      <h3>💻 Custom PC Builder Form</h3>
      <p>Interactive web form with GPU dropdowns and automated quote calculation in Pakistani Rupees.</p>
    </div>
  </section>

  <footer>
    <p>&copy; 2026 Ali Codes. Built with pride in Pakistan. Ready for freelance projects!</p>
  </footer>
</body>
</html>`,
          challenge: "Personalize the portfolio: change 'Ali' to your own name, enter your city, and add a 3rd project card!",
          hint: "Replace 'ALI_CODES_PK' with your own name, and add another <div class='proj-card'> block.",
          solution: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Personal portfolio of an aspiring young Pakistani web developer.">
  <title>Hamza Khan | Junior Web Developer PK</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, sans-serif; margin: 0; background: #090d16; color: #e2e8f0; line-height: 1.6; }
    header { background: #0f172a; padding: 20px 30px; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-size: 20px; font-weight: 800; color: #38bdf8; }
    .hero { text-align: center; padding: 40px 20px; max-width: 650px; margin: auto; }
    .hero h1 { font-size: 32px; margin-bottom: 8px; color: #ffffff; }
    .hero span { color: #38bdf8; }
    .skills-grid { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
    .skill-pill { background: #1e293b; border: 1px solid #334155; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; color: #38bdf8; }
    .projects { max-width: 650px; margin: 20px auto; padding: 0 20px; }
    .proj-card { background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 18px; margin-bottom: 14px; }
    .proj-card h3 { margin-top: 0; color: #a78bfa; }
    footer { text-align: center; padding: 25px; color: #64748b; font-size: 13px; border-top: 1px solid #1e293b; }
  </style>
</head>
<body>
  <header>
    <div class="brand">🚀 HAMZA_DEV_PK</div>
    <div style="font-size: 13px; color: #94a3b8;">Lahore, Pakistan 🇵🇰</div>
  </header>

  <section class="hero">
    <h1>Hi, I'm Hamza. A 15-year-old <span>Web Developer</span>.</h1>
    <p>Certified by D.TEN. Building responsive HTML5 websites, interactive gaming hubs, and custom forms.</p>
    <div class="skills-grid">
      <div class="skill-pill">⚡ HTML5 Semantic</div>
      <div class="skill-pill">🎨 CSS3 Flexbox</div>
      <div class="skill-pill">📊 Data Tables</div>
      <div class="skill-pill">🎮 Esports Media</div>
      <div class="skill-pill">🛡️ Cybersecurity</div>
    </div>
  </section>

  <section class="projects">
    <h2>Featured Web Projects</h2>
    <div class="proj-card">
      <h3>🏏 PSL Live Scoreboard Grid</h3>
      <p>A semantic HTML5 table displaying live cricket run-rates, batter stats, and boundary tallies.</p>
    </div>
    <div class="proj-card">
      <h3>💻 Custom PC Builder Form</h3>
      <p>Interactive web form with GPU dropdowns and automated quote calculation in Pakistani Rupees.</p>
    </div>
    <div class="proj-card">
      <h3>🍔 Karachi Biryani Express Portal</h3>
      <p>Commercial food delivery landing page with responsive menu cards and instant online ordering.</p>
    </div>
  </section>

  <footer>
    <p>&copy; 2026 Hamza Dev. Built with pride in Pakistan. Ready for freelance projects!</p>
  </footer>
</body>
</html>`,
          funFact: "Top tech companies like Google, Meta, and Microsoft all hire web engineers who started out as teenagers just like you by building their first HTML portfolio!"
        }
      ],
      quiz: {
        title: "Module 7 Assessment: CSS Box Model & Portfolios",
        urduTitle: "ماڈیول 7 ٹیسٹ: باکس ماڈل اور پورٹ فولیو",
        questions: [
          {
            question: "In the CSS Box Model, what is the buffer space inside the border called?",
            urduQuestion: "سی ایس ایس باکس ماڈل میں بارڈر کے اندر والی خالی جگہ کو کیا کہتے ہیں؟",
            options: ["padding", "margin", "border-spacing", "outline"],
            answer: 0,
            explanation: "Padding is the internal spacing inside the border. Margin is the external spacing outside the border."
          },
          {
            question: "Which CSS Flexbox property aligns children along the primary horizontal axis?",
            urduQuestion: "فلیکس باکس میں اشیاء کو افقی سیدھ دینے کے لیے کون سی پراپرٹی ہے؟",
            options: ["justify-content", "align-items", "horizontal-align", "flex-center"],
            answer: 0,
            explanation: "justify-content aligns flex items horizontally along the main flex axis."
          },
          {
            question: "Where must SEO meta description tags and the <title> tag be placed?",
            urduQuestion: "گوگل ایس ای او میٹا ٹیگز اور ٹائٹل کس ٹیگ کے اندر ہونے چاہئیں؟",
            options: ["Inside <head>", "Inside <body>", "Inside <footer>", "Inside <section>"],
            answer: 0,
            explanation: "All document metadata, character sets, titles, and SEO tags belong strictly inside <head>."
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
        question: "4. Which HTML tag is self-closing (void) and requires NO closing tag?",
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
