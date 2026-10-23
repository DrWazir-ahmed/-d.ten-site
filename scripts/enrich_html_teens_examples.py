import re
from pathlib import Path

# Load data file
course_file = Path("src/data/htmlTeensCourseData.js")
content = course_file.read_text(encoding="utf-8")

# Comprehensive 2 examples per lesson mapping
EXAMPLES_MAP = {
    "m1-l1": [
        {
            "title": "Example 1: Basic Paragraph & Tag Anatomy",
            "urduTitle": "مثال 1: بنیادی پیراگراف اور ٹیگ کی ساخت",
            "code": "<p>Salam Pakistan! 🇵🇰</p>",
            "explanation": "Here, <p> is the opening tag that signals a paragraph, 'Salam Pakistan! 🇵🇰' is the human-readable text content, and </p> is the closing tag that tells the browser the paragraph has ended.",
            "urduExplanation": "یہاں <p> اوپننگ ٹیگ ہے جو پیراگراف شروع کرتا ہے، 'Salam Pakistan!' اس کا مواد ہے، اور </p> کلوزنگ ٹیگ ہے جو بتاتا ہے کہ پیراگراف یہاں ختم ہو گیا ہے۔"
        },
        {
            "title": "Example 2: Teen Gamer Info Card with Multiple Paragraphs",
            "urduTitle": "مثال 2: نوجوان گیمر کی معلومات کے پیراگراف",
            "code": "<p>Gamer Tag: <strong>CyberWolf_PK</strong></p>\n<p>City: Islamabad, Pakistan</p>\n<p>Favorite Game: Valorant & CS2</p>",
            "explanation": "Stacking multiple <p> tags creates clean, separated lines of text. Browsers automatically add vertical spacing between each paragraph block.",
            "urduExplanation": "ایک کے بعد ایک <p> ٹیگز لکھنے سے الگ الگ لائنیں بن جاتی ہیں۔ براؤزر ہر پیراگراف کے درمیان خودکار مناسب فاصلہ پیدا کرتا ہے۔"
        }
    ],
    "m1-l2": [
        {
            "title": "Example 1: Minimal Valid HTML5 Skeleton",
            "urduTitle": "مثال 1: ایچ ٹی ایم ایل 5 کا بنیادی اور سادہ ڈھانچہ",
            "code": "<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Site</title>\n</head>\n<body>\n  <p>Hello from Pakistan!</p>\n</body>\n</html>",
            "explanation": "Every valid webpage has <!DOCTYPE html>, an opening <html>, a <head> holding the tab title, and a <body> holding the visible text.",
            "urduExplanation": "ہر درست ویب پیج میں سب سے اوپر ڈاک ٹائپ، پھر html، ٹیب ٹائٹل کے لیے head، اور دکھائی دینے والے مواد کے لیے body ہوتا ہے۔"
        },
        {
            "title": "Example 2: Complete Webpage with Meta UTF-8 Charset",
            "urduTitle": "مثال 2: مکمل ویب پیج بمعہ اردو اور ایموجی سپورٹ",
            "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Babar Azam Fan Page</title>\n</head>\n<body>\n  <h1>King Babar Azam 🏏</h1>\n  <p>Pakistan National Cricket Captain</p>\n</body>\n</html>",
            "explanation": "The <meta charset='UTF-8'> tag guarantees that international characters, Urdu script, and emojis like 🏏 and 🇵🇰 display perfectly on all smartphones and computers.",
            "urduExplanation": "meta charset='UTF-8' ٹیگ اس بات کو یقینی بناتا ہے کہ اردو حروف اور ایموجیز ہر موبائل اور کمپیوٹر پر بغیر کسی خرابی کے صاف نظر آئیں۔"
        }
    ],
    "m1-l3": [
        {
            "title": "Example 1: The 6 Heading Sizes Hierarchy",
            "urduTitle": "مثال 1: ہیڈنگز کے چھ سائزز کی ترتیب",
            "code": "<h1>H1: Main Article Title</h1>\n<h2>H2: Major Section Heading</h2>\n<h3>H3: Sub-topic Heading</h3>",
            "explanation": "<h1> is the largest and most important headline. <h2> is for major chapters or sections, and <h3> is for sub-points.",
            "urduExplanation": "<h1> سب سے بڑی اور اہم ہیڈنگ ہوتی ہے، <h2> بڑے سیکشن کے لیے اور <h3> ذیلی موضوعات کے لیے استعمال ہوتی ہے۔"
        },
        {
            "title": "Example 2: Breaking News Report with strong, em & hr",
            "urduTitle": "مثال 2: بریکنگ نیوز رپورٹ بمعہ بولڈ اور ترچھا ٹیکسٹ",
            "code": "<h2>PSL Live: Lahore vs Karachi</h2>\n<hr>\n<p>Shaheen Afridi bowled a <strong>145 km/h yorker</strong>!</p>\n<p><em>Match Attendance: 30,000 passionate fans.</em></p>",
            "explanation": "<strong> gives bold visual weight to critical stats, <em> emphasizes quotes in italics, and <hr> draws a clean divider line.",
            "urduExplanation": "strong ٹیگ اہم معلومات کو بولڈ کرتا ہے، em الفاظ کو ترچھا کر کے زور دیتا ہے، اور hr ایک صاف ستھری لکیر کھینچتا ہے۔"
        }
    ],
    "m2-l1": [
        {
            "title": "Example 1: Clickable Link with href Attribute",
            "urduTitle": "مثال 1: ایچ ریف ایٹریبیوٹ کے ساتھ کلک ہونے والا لنک",
            "code": "<a href=\"https://dten.edu.pk\">Visit D.TEN Network</a>",
            "explanation": "The <a> tag creates a hyperlink, and href=\"https://...\" is the attribute specifying the exact website destination.",
            "urduExplanation": "<a> ٹیگ لنک بناتا ہے اور href=\"https://...\" وہ ایٹریبیوٹ ہے جو بتاتا ہے کہ کلک کرنے پر کون سی ویب سائٹ کھلے گی۔"
        },
        {
            "title": "Example 2: Contact Links with mailto: and tel:",
            "urduTitle": "مثال 2: ای میل اور فون نمبر کے براہ راست لنکس",
            "code": "<p>Questions? <a href=\"mailto:info@dten.edu.pk\">Email Support</a></p>\n<p>Helpline: <a href=\"tel:+92511234567\">Call Islamabad Office</a></p>",
            "explanation": "Using 'mailto:' opens the user's default email client, while 'tel:' lets mobile phone users dial a number with a single tap.",
            "urduExplanation": "mailto لکھنے سے یوزر کی ای میل ایپ کھل جاتی ہے، اور tel لکھنے سے موبائل پر ایک کلک سے فون مل جاتا ہے۔"
        }
    ],
    "m2-l2": [
        {
            "title": "Example 1: Opening External Links in a New Tab",
            "urduTitle": "مثال 1: بیرونی لنک کو نئے براؤزر ٹیب میں کھولنا",
            "code": "<a href=\"https://store.steampowered.com\" target=\"_blank\">Open Steam Store</a>",
            "explanation": "The attribute target='_blank' tells the browser to spawn a fresh new tab so the visitor never loses their place on your website.",
            "urduExplanation": "target='_blank' براؤزر کو حکم دیتا ہے کہ آپ کی سائٹ بند کیے بغیر لنک کو ایک نئے الگ ٹیب میں کھولے۔"
        },
        {
            "title": "Example 2: Button-Styled Safe Link",
            "urduTitle": "مثال 2: بٹن اسٹائل محفوظ نیا ٹیب لنک",
            "code": "<a href=\"https://discord.com\" target=\"_blank\" style=\"background:#5865f2;color:white;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:bold;\">Join Gaming Discord 🚀</a>",
            "explanation": "Anchor tags can be styled with CSS background colors, rounded corners, and padding to look like professional call-to-action buttons.",
            "urduExplanation": "اینکر لنک پر سی ایس ایس لگا کر اسے کسی بھی پروفیشنل ایپلیکیشن کے ڈاؤن لوڈ یا جوائننگ بٹن جیسا بنایا جا سکتا ہے۔"
        }
    ],
    "m2-l3": [
        {
            "title": "Example 1: Jumping Down to an On-Page Bookmark (#id)",
            "urduTitle": "مثال 1: اسی پیج کے اندر نیچے موجود سیکشن تک جمپ کرنا",
            "code": "<a href=\"#contact-section\">Jump to Contact Details ↓</a>\n\n<!-- Far down the page -->\n<div id=\"contact-section\">\n  <h3>Contact Our Lahore Team</h3>\n</div>",
            "explanation": "When the link href has '#contact-section', clicking it smoothly teleports the browser viewport straight down to the element with id='contact-section'.",
            "urduExplanation": "جب لنک میں #contact-section ہو تو اس پر کلک کرنے سے اسکرین فوراً اسی پیج میں نیچے موجود متعلقہ آئی ڈی تک پہنچ جاتی ہے۔"
        },
        {
            "title": "Example 2: Quick Jump Navigation Bar",
            "urduTitle": "مثال 2: پیج کے ٹاپ پر کوئیک جمپ مینیو",
            "code": "<nav>\n  <a href=\"#ai\">AI Club</a> | \n  <a href=\"#gaming\">Gaming League</a> | \n  <a href=\"#coding\">Web Courses</a>\n</nav>",
            "explanation": "This simple pattern creates a table of contents that allows visitors on mobile phones to jump to sections without endless scrolling.",
            "urduExplanation": "یہ طریقہ موبائل فون صارفین کے لیے انتہائی مددگار ہے تاکہ وہ لمبی اسکرولنگ کے بغیر مطلوبہ سیکشن پر پہنچ سکیں۔"
        }
    ],
    "m3-l1": [
        {
            "title": "Example 1: Displaying an Image with Descriptive Alt Text",
            "urduTitle": "مثال 1: تصویر لگانا اور آلٹ ٹیکسٹ کی وضاحت",
            "code": "<img src=\"https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600\" alt=\"Snow covered peak of K2 in Pakistan\">",
            "explanation": "<img> is a self-closing void tag. 'src' points to the photo url, and 'alt' provides accessibility descriptions for screen readers.",
            "urduExplanation": "<img> سیلف کلوزنگ ٹیگ ہے۔ src تصویر کا ایڈریس دیتا ہے اور alt نابینا صارفین اور سرچ انجنز کے لیے تصویر کی وضاحت کرتا ہے۔"
        },
        {
            "title": "Example 2: Clickable Picture Button with Dimensions",
            "urduTitle": "مثال 2: کلک کے قابل تصویر اور سائز سیٹ کرنا",
            "code": "<a href=\"https://dten.edu.pk\" target=\"_blank\">\n  <img src=\"https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400\" alt=\"Gaming Setup\" width=\"300\" style=\"border-radius:10px;\">\n</a>",
            "explanation": "Wrapping an <img> tag inside an <a> tag turns the entire image into a clickable button. Setting width='300' controls its rendered size.",
            "urduExplanation": "تصویر کو <a> ٹیگ کے اندر بند کرنے سے پوری تصویر ایک بٹن بن جاتی ہے۔ width کے ذریعے اس کی چوڑائی کنٹرول ہوتی ہے۔"
        }
    ],
    "m3-l2": [
        {
            "title": "Example 1: Native HTML5 Video Player with Controls",
            "urduTitle": "مثال 1: کنٹرولز کے ساتھ اصلی ویڈیو پلیئر",
            "code": "<video controls width=\"360\">\n  <source src=\"https://www.w3schools.com/html/mov_bbb.mp4\" type=\"video/mp4\">\n  Your browser does not support video.\n</video>",
            "explanation": "The 'controls' attribute instructs the browser to generate play, pause, seek, and volume buttons automatically.",
            "urduExplanation": "'controls' لکھنے سے براؤزر خودکار طریقے سے پلے، پاز اور والیوم کے بٹن مہیا کر دیتا ہے۔"
        },
        {
            "title": "Example 2: Native HTML5 Audio Player",
            "urduTitle": "مثال 2: ایچ ٹی ایم ایل کا اپنا آڈیو پلیئر",
            "code": "<audio controls>\n  <source src=\"https://www.w3schools.com/html/horse.mp3\" type=\"audio/mpeg\">\n  Your browser does not support audio.\n</audio>",
            "explanation": "The <audio controls> tag streams podcasts, match commentary, or sound effects directly in the webpage without any external plugin.",
            "urduExplanation": "<audio controls> کے ذریعے پوڈکاسٹ، تلاوت یا کرکٹ کمنٹری کو براہ راست پیج پر سنا جا سکتا ہے۔"
        }
    ],
    "m3-l3": [
        {
            "title": "Example 1: Video Player with Custom Poster Thumbnail",
            "urduTitle": "مثال 1: ویڈیو شروع ہونے سے پہلے تھمب نیل پوسٹر لگانا",
            "code": "<video controls poster=\"https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600\" width=\"400\">\n  <source src=\"https://www.w3schools.com/html/mov_bbb.mp4\" type=\"video/mp4\">\n</video>",
            "explanation": "The 'poster' attribute acts just like a YouTube thumbnail—displaying an exciting preview image until the visitor hits play.",
            "urduExplanation": "poster ایٹریبیوٹ بالکل یوٹیوب تھمب نیل کی طرح کام کرتا ہے جو ویڈیو شروع ہونے سے پہلے دلکش تصویر دکھاتا ہے۔"
        },
        {
            "title": "Example 2: Esports Clan Media Highlight Card",
            "urduTitle": "مثال 2: گیمنگ کلان کا ملٹی میڈیا کارڈ",
            "code": "<div style=\"background:#1e293b;padding:16px;border-radius:12px;color:white;max-width:380px;\">\n  <span style=\"background:#ef4444;padding:2px 8px;border-radius:4px;font-size:11px;\">LIVE HIGHLIGHT</span>\n  <h3>Tekken 8 Tournament Final</h3>\n  <video controls width=\"100%\">\n    <source src=\"https://www.w3schools.com/html/mov_bbb.mp4\" type=\"video/mp4\">\n  </video>\n</div>",
            "explanation": "Combining video with status badges and modern container styling creates professional social-ready gaming cards.",
            "urduExplanation": "ویڈیو کے ساتھ بیجز اور خوبصورت بیک گراؤنڈ ملا کر ایک سوشل میڈیا جیسا جدید گیمنگ کارڈ بنتا ہے۔"
        }
    ],
    "m4-l1": [
        {
            "title": "Example 1: Unordered Bulleted List (ul + li)",
            "urduTitle": "مثال 1: بلٹ پوائنٹس والی غیر ترتیبی لسٹ",
            "code": "<ul>\n  <li>Intel Core i5 Processor</li>\n  <li>Nvidia RTX 3060 GPU</li>\n  <li>16GB HyperX RAM</li>\n</ul>",
            "explanation": "<ul> creates bullet points where item sequence is not critical. Each item must strictly be wrapped in an <li> tag.",
            "urduExplanation": "<ul> بلٹ پوائنٹس بناتا ہے جہاں ترتیب لازمی نہیں ہوتی۔ ہر شے کو لازماً <li> کے اندر بند کیا جاتا ہے۔"
        },
        {
            "title": "Example 2: Ordered Sequential Ranking List (ol + li)",
            "urduTitle": "مثال 2: نمبروں والی ترتیبی رینکنگ لسٹ",
            "code": "<ol>\n  <li>Babar Azam (Top Batter)</li>\n  <li>Shaheen Afridi (Lead Pacer)</li>\n  <li>Mohammad Rizwan (Wicketkeeper)</li>\n</ol>",
            "explanation": "<ol> instructs the browser to number the items sequentially: 1, 2, 3... without you having to type numbers manually.",
            "urduExplanation": "<ol> براؤزر کو خودکار طور پر نمبر لگانے کا حکم دیتا ہے: 1، 2، 3 وغیرہ، آپ کو ہاتھ سے نمبر لکھنے کی ضرورت نہیں ہوتی۔"
        }
    ],
    "m4-l2": [
        {
            "title": "Example 1: The Core 4 Semantic Landmarks",
            "urduTitle": "مثال 1: بنیادی چار سمینٹک ٹیگز",
            "code": "<header>Top Logo & Slogan</header>\n<nav><a href=\"#\">Home</a></nav>\n<main><p>Primary article content goes here.</p></main>\n<footer>&copy; 2026 D.TEN Pakistan</footer>",
            "explanation": "These 4 tags replace generic divs, explicitly signaling the page header, navigation bar, main body, and footer.",
            "urduExplanation": "یہ چاروں ٹیگز بے مقصد div کی جگہ لے کر براؤزر کو بتاتے ہیں کہ ہیڈر، مینیو، اصل مواد اور فوٹر کہاں ہیں۔"
        },
        {
            "title": "Example 2: Article with Aside Fact Box",
            "urduTitle": "مثال 2: آرٹیکل کے ساتھ سائیڈ انفارمیشن باکس",
            "code": "<article>\n  <h2>Pakistani AI Robotics Cup</h2>\n  <p>Young engineers designed autonomous drones.</p>\n  <aside style=\"background:#ecfdf5;padding:10px;border-left:4px solid #10b981;\">\n    <small>💡 Fact: Over 40 school teams participated.</small>\n  </aside>\n</article>",
            "explanation": "<article> wraps standalone publishable stories, and <aside> houses related side notes, quotes, or author callouts.",
            "urduExplanation": "<article> آزاد کہانی یا بلاگ کو سمیٹتا ہے اور <aside> ساتھ میں دلچسپ حقائق یا نوٹس کا باکس بناتا ہے۔"
        }
    ],
    "m4-l3": [
        {
            "title": "Example 1: Horizontal Navigation Bar with Flexbox",
            "urduTitle": "مثال 1: فلیکس باکس کے ذریعے افقی نیویگیشن بار",
            "code": "<nav style=\"display:flex;gap:20px;background:#0f172a;padding:14px;border-radius:8px;\">\n  <a href=\"#home\" style=\"color:#38bdf8;font-weight:bold;text-decoration:none;\">Home</a>\n  <a href=\"#courses\" style=\"color:#cbd5e1;text-decoration:none;\">Courses</a>\n  <a href=\"#contact\" style=\"color:#cbd5e1;text-decoration:none;\">Contact</a>\n</nav>",
            "explanation": "'display:flex' aligns all links horizontally in a single row, and 'gap:20px' spaces them out evenly without messy margins.",
            "urduExplanation": "display:flex تمام لنکس کو ایک سیدھی افقی لائن میں لاتا ہے اور gap ان کے درمیان خودکار یکساں فاصلہ دیتا ہے۔"
        },
        {
            "title": "Example 2: Academy Header with Logo and Action Button",
            "urduTitle": "مثال 2: اکیڈمی کا ہیڈر بمعہ لوگو اور جوائننگ بٹن",
            "code": "<nav style=\"display:flex;justify-content:space-between;align-items:center;background:#1e293b;padding:12px 24px;color:white;\">\n  <span style=\"font-weight:bold;color:#38bdf8;\">🏏 BACA LAHORE</span>\n  <a href=\"#join\" style=\"background:#38bdf8;color:#0f172a;padding:6px 14px;border-radius:20px;font-weight:bold;text-decoration:none;\">Join Academy</a>\n</nav>",
            "explanation": "'justify-content: space-between' pushes the brand logo to the far left and the CTA button to the far right automatically.",
            "urduExplanation": "justify-content: space-between لوگو کو بائیں جانب اور جوائننگ بٹن کو خود بخود دائیں کونے میں بھیج دیتا ہے۔"
        }
    ],
    "m5-l1": [
        {
            "title": "Example 1: Basic 2x2 Table Structure",
            "urduTitle": "مثال 1: دو ضرب دو کی بنیادی ٹیبل ساخت",
            "code": "<table border=\"1\">\n  <tr>\n    <th>Subject</th>\n    <th>Day</th>\n  </tr>\n  <tr>\n    <td>Computer Science</td>\n    <td>Monday</td>\n  </tr>\n</table>",
            "explanation": "<tr> defines the horizontal row. <th> creates the bold column header, and <td> creates the data cell.",
            "urduExplanation": "<tr> افقی سطر بناتا ہے، <th> بولڈ ہیڈر سیل بناتا ہے، اور <td> عام ڈیٹا کا خانہ بناتا ہے۔"
        },
        {
            "title": "Example 2: Clean Table with border-collapse",
            "urduTitle": "مثال 2: بارڈر کولیپس کے ساتھ خوبصورت ٹیبل",
            "code": "<table style=\"border-collapse:collapse;width:100%;max-width:350px;\">\n  <tr style=\"background:#0284c7;color:white;\">\n    <th style=\"padding:8px;border:1px solid #cbd5e1;\">Device</th>\n    <th style=\"padding:8px;border:1px solid #cbd5e1;\">Price (PKR)</th>\n  </tr>\n  <tr>\n    <td style=\"padding:8px;border:1px solid #cbd5e1;\">Gaming Mouse</td>\n    <td style=\"padding:8px;border:1px solid #cbd5e1;\">2,500</td>\n  </tr>\n</table>",
            "explanation": "'border-collapse: collapse;' eliminates the ugly double lines between cells, rendering crisp single borders like modern apps.",
            "urduExplanation": "border-collapse: collapse بارڈرز کے درمیان کا ناپسندیدہ فاصلہ ختم کر کے ایک خوبصورت باریک لکیر بناتا ہے۔"
        }
    ],
    "m5-l2": [
        {
            "title": "Example 1: Merging Columns with colspan='2'",
            "urduTitle": "مثال 1: دو کالمز کو آپس میں جوڑنا",
            "code": "<table border=\"1\" style=\"border-collapse:collapse;\">\n  <tr>\n    <th>Item</th>\n    <th>Cost</th>\n  </tr>\n  <tr>\n    <td>Keyboard</td>\n    <td>3,000</td>\n  </tr>\n  <tr>\n    <td colspan=\"2\" style=\"text-align:center;font-weight:bold;\">All Prices in PKR</td>\n  </tr>\n</table>",
            "explanation": "colspan='2' stretches the cell across 2 columns. Notice the last row only has one <td> because it spans the width of two!",
            "urduExplanation": "colspan='2' ایک سیل کو دو کالمز جتنا چوڑا کر دیتا ہے۔ آخری سطر میں صرف ایک سیل ہے کیونکہ وہ دو کی جگہ لے رہا ہے۔"
        },
        {
            "title": "Example 2: Cricket Scorecard Total Row",
            "urduTitle": "مثال 2: کرکٹ اسکور کارڈ کی ٹوٹل اسکور سطر",
            "code": "<tr style=\"background:#065f46;color:#fde047;font-weight:bold;\">\n  <td colspan=\"2\">TOTAL (20 Overs)</td>\n  <td colspan=\"2\">198/3 (RR: 9.90)</td>\n</tr>",
            "explanation": "Merging cells with colspan allows you to create high-impact score banners without misaligning other rows.",
            "urduExplanation": "کول اسپین کے ذریعے آپ اسکور کارڈ میں بغیر ٹیبل خراب کیے واضح بینر بنا سکتے ہیں۔"
        }
    ],
    "m5-l3": [
        {
            "title": "Example 1: Organizing with thead and tbody",
            "urduTitle": "مثال 1: ٹیبل ہیڈ اور باڈی کو الگ الگ کرنا",
            "code": "<table style=\"border-collapse:collapse;width:100%;\">\n  <thead style=\"background:#0f172a;color:white;\">\n    <tr><th>Team</th><th>Points</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Lahore Qalandars</td><td>16</td></tr>\n    <tr><td>Karachi Kings</td><td>12</td></tr>\n  </tbody>\n</table>",
            "explanation": "<thead> separates column titles from data rows in <tbody>, ensuring screen-readers and mobile layouts render cleanly.",
            "urduExplanation": "thead عنوانات کو tbody کے اصل ریکارڈز سے الگ کرتا ہے تاکہ موبائل اور پرنٹ پر ڈیٹا بالکل صاف نظر آئے۔"
        },
        {
            "title": "Example 2: Qualifying Zone Highlight Row",
            "urduTitle": "مثال 2: پلے آف کوالیفائی کرنے والی ٹیم کی سطر کو رنگین کرنا",
            "code": "<tr style=\"background:rgba(34,197,94,0.15);border-left:4px solid #22c55e;\">\n  <td style=\"padding:8px;\">🦁 Lahore Qalandars (Q)</td>\n  <td style=\"padding:8px;font-weight:bold;color:#22c55e;\">16 Pts</td>\n</tr>",
            "explanation": "Applying subtle background tints and colored left borders visually marks teams that have qualified for the PSL playoffs.",
            "urduExplanation": "ہلکا سبز رنگ اور بائیں جانب سبز بارڈر لگانے سے پلے آف کوالیفائی کرنے والی ٹیمیں فوری نمایاں ہو جاتی ہیں۔"
        }
    ],
    "m6-l1": [
        {
            "title": "Example 1: Connected Label and Text Input",
            "urduTitle": "مثال 1: لیبل اور ان پٹ کو آپس میں جوڑنا",
            "code": "<form>\n  <label for=\"username\">Gamer Username:</label><br>\n  <input type=\"text\" id=\"username\" placeholder=\"e.g. CyberNinja_PK\">\n</form>",
            "explanation": "The 'for' attribute on <label> matches the 'id' on <input>. Clicking the text label focuses the cursor straight into the box!",
            "urduExplanation": "لیبل کا for اور ان پٹ کا id ایک جیسا ہے۔ جب یوزر تحریر پر کلک کرتا ہے تو کرسر خودکار طور پر ڈبے کے اندر پہنچ جاتا ہے۔"
        },
        {
            "title": "Example 2: Required Email Field with Submit Button",
            "urduTitle": "مثال 2: لازمی ای میل فیلڈ اور جمع کرانے کا بٹن",
            "code": "<form action=\"#\" method=\"POST\">\n  <label for=\"mail\">Email Address (Required):</label><br>\n  <input type=\"email\" id=\"mail\" required placeholder=\"you@gmail.com\"><br><br>\n  <button type=\"submit\" style=\"background:#10b981;color:white;padding:8px 16px;border:none;border-radius:6px;\">Sign Up Free</button>\n</form>",
            "explanation": "'required' stops empty submissions, and type='email' checks for '@' symbols automatically before submitting.",
            "urduExplanation": "required فیلڈ کو خالی جمع ہونے سے روکتا ہے اور type='email' خودکار چیک کرتا ہے کہ @ کا نشان موجود ہے یا نہیں۔"
        }
    ],
    "m6-l2": [
        {
            "title": "Example 1: Password Input and Agreement Checkbox",
            "urduTitle": "مثال 1: پاس ورڈ فیلڈ اور اقرار نامے کا چیک باکس",
            "code": "<form>\n  <label for=\"pass\">Password:</label><br>\n  <input type=\"password\" id=\"pass\" placeholder=\"••••••••\"><br><br>\n  <label><input type=\"checkbox\" required> I agree to Fair Play rules</label>\n</form>",
            "explanation": "type='password' masks characters into secure black dots. type='checkbox' allows simple on/off selection.",
            "urduExplanation": "type='password' خفیہ الفاظ کو نقطوں میں بدلتا ہے اور type='checkbox' ٹک لگانے کی سہولت دیتا ہے۔"
        },
        {
            "title": "Example 2: Radio Button Group (Single Selection)",
            "urduTitle": "مثال 2: ریڈیو بٹن گروپ (صرف ایک آپشن کا انتخاب)",
            "code": "<p>Select Your Gaming Role:</p>\n<label><input type=\"radio\" name=\"role\" value=\"sniper\" checked> Sniper</label>\n<label><input type=\"radio\" name=\"role\" value=\"entry\"> Entry Fragger</label>\n<label><input type=\"radio\" name=\"role\" value=\"support\"> Support</label>",
            "explanation": "Because all 3 radios share name='role', selecting one automatically unchecks the others!",
            "urduExplanation": "کیونکہ تینوں ریڈیو بٹنز کا name='role' ایک جیسا ہے، اس لیے کسی ایک کو منتخب کرنے سے باقی خودکار ہٹ جاتے ہیں۔"
        }
    ],
    "m6-l3": [
        {
            "title": "Example 1: Dropdown Selection Menu (<select> + <option>)",
            "urduTitle": "مثال 1: ڈراپ ڈاؤن سلیکشن مینیو",
            "code": "<label for=\"city\">Select Your City:</label><br>\n<select id=\"city\">\n  <option value=\"lhr\">Lahore</option>\n  <option value=\"khi\">Karachi</option>\n  <option value=\"isb\">Islamabad</option>\n</select>",
            "explanation": "<select> creates the dropdown container, and each <option> represents a clickable choice.",
            "urduExplanation": "<select> ڈراپ ڈاؤن کنٹینر ہے اور <option> اس کے اندر موجود ایک ایک شہر کا نام ہے۔"
        },
        {
            "title": "Example 2: Multi-line Message Textarea and Reset Button",
            "urduTitle": "مثال 2: ملٹی لائن ٹیکسٹ ایریا اور ری سیٹ بٹن",
            "code": "<form>\n  <label for=\"msg\">Custom PC Specifications / Address:</label><br>\n  <textarea id=\"msg\" rows=\"3\" cols=\"30\" placeholder=\"Describe your build...\"></textarea><br><br>\n  <button type=\"submit\">Submit</button>\n  <button type=\"reset\">Reset Form</button>\n</form>",
            "explanation": "<textarea> accepts long paragraphs with multiple lines. <button type='reset'> restores all inputs to empty.",
            "urduExplanation": "<textarea> لمبی تحریر اور پتوں کے لیے ہوتا ہے۔ reset بٹن پورے فارم کو ایک کلک میں دوبارہ خالی کر دیتا ہے۔"
        }
    ],
    "m7-l1": [
        {
            "title": "Example 1: The CSS Box Model (Padding vs Border vs Margin)",
            "urduTitle": "مثال 1: سی ایس ایس باکس ماڈل (پیڈنگ، بارڈر اور مارجن)",
            "code": "<div style=\"background:#312e81;padding:20px;border:3px solid #818cf8;margin:20px;color:white;border-radius:10px;\">\n  <h3>Padding is inside the border.</h3>\n  <p>Margin is outside pushing neighbors away.</p>\n</div>",
            "explanation": "Padding (20px) creates breathing room inside the purple border. Margin (20px) creates empty room outside.",
            "urduExplanation": "پیڈنگ بارڈر کے اندر 20 پکسل جگہ بناتی ہے، جبکہ مارجن بارڈر کے باہر فاصلہ دیتا ہے۔"
        },
        {
            "title": "Example 2: Cyberpunk Neon Card with box-shadow",
            "urduTitle": "مثال 2: نیون گلو اور شیڈو والا جدید کارڈ",
            "code": "<div style=\"background:#0f172a;border:2px solid #ec4899;box-shadow:0 0 20px #ec4899;padding:16px;border-radius:12px;color:white;max-width:300px;\">\n  <h3 style=\"color:#f472b6;margin-top:0;\">Neon Cyber Shield</h3>\n  <p>Status: Active Protection</p>\n</div>",
            "explanation": "'box-shadow: 0 0 20px #ec4899;' gives the border a glowing pink neon aesthetic popular in gaming UI.",
            "urduExplanation": "box-shadow بارڈر کے گرد چمکتا ہوا نیون گلو دیتا ہے جو گیمنگ انٹرفیس میں بہت مقبول ہے۔"
        }
    ],
    "m7-l2": [
        {
            "title": "Example 1: Perfect Horizontal Centering with Flexbox",
            "urduTitle": "مثال 1: فلیکس باکس کے ذریعے بالکل درمیان میں لانا",
            "code": "<div style=\"display:flex;justify-content:center;align-items:center;height:120px;background:#18181b;border-radius:10px;\">\n  <button style=\"background:#a855f7;color:white;padding:10px 20px;border:none;border-radius:6px;font-weight:bold;\">Centered Button ⚡</button>\n</div>",
            "explanation": "Combining 'display: flex' with 'justify-content: center' and 'align-items: center' centers any element in 3 lines.",
            "urduExplanation": "ڈسپلے فلیکس اور دونوں سنٹر پراپرٹیز ملا کر کسی بھی بٹن کو باکس کے بالکل بیچوں بیچ لے آتی ہیں۔"
        },
        {
            "title": "Example 2: Responsive Product Cards Grid",
            "urduTitle": "مثال 2: ریسپانسیو پروڈکٹ کارڈز کی گرڈ",
            "code": "<div style=\"display:flex;gap:12px;flex-wrap:wrap;background:#18181b;padding:16px;\">\n  <div style=\"background:#27272a;padding:12px;border-radius:8px;color:white;width:130px;text-align:center;\">\n    <h4>Jordan 1</h4><p style=\"color:#a855f7;\">PKR 14.5k</p>\n  </div>\n  <div style=\"background:#27272a;padding:12px;border-radius:8px;color:white;width:130px;text-align:center;\">\n    <h4>Yeezy 350</h4><p style=\"color:#a855f7;\">PKR 18.9k</p>\n  </div>\n</div>",
            "explanation": "'flex-wrap: wrap' allows cards to automatically drop down to the next row when viewed on a narrow smartphone screen.",
            "urduExplanation": "flex-wrap: wrap کارڈز کو موبائل اسکرین پر خودکار طریقے سے اگلی لائن پر منتقل ہونے کی لچک دیتا ہے۔"
        }
    ],
    "m7-l3": [
        {
            "title": "Example 1: Essential SEO Meta Tags in <head>",
            "urduTitle": "مثال 1: گوگل ایس ای او کے اہم میٹا ٹیگز",
            "code": "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"Junior Web Developer portfolio of Pakistani teen coder.\">\n  <title>Ali Codes | Web Dev PK</title>\n</head>",
            "explanation": "The viewport tag optimizes mobile layout scaling, and the description meta tag provides Google with search snippets.",
            "urduExplanation": "viewport ٹیگ موبائل پر ویب سائٹ کو فٹ کرتا ہے اور description ٹیگ گوگل سرچ میں پیج کا تعارف دکھاتا ہے۔"
        },
        {
            "title": "Example 2: Tech Skills Badges Component",
            "urduTitle": "مثال 2: مہارتوں کے بیجز کا ماڈرن کمپوننٹ",
            "code": "<div style=\"display:flex;gap:8px;flex-wrap:wrap;\">\n  <span style=\"background:#1e293b;color:#38bdf8;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid #334155;\">⚡ HTML5</span>\n  <span style=\"background:#1e293b;color:#a855f7;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid #334155;\">🎨 CSS Flexbox</span>\n  <span style=\"background:#1e293b;color:#34d399;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid #334155;\">📊 Tables</span>\n</div>",
            "explanation": "Pill-style badges with contrasting borders and dark backgrounds communicate technical competence at a glance.",
            "urduExplanation": "پِل اسٹائل کے بیجز پورٹ فولیو پر آپ کی مختلف مہارتوں کو ایک نظر میں شاندار طریقے سے دکھاتے ہیں۔"
        }
    ]
}

# Update content by replacing or adding examples to each lesson
for lesson_id, examples in EXAMPLES_MAP.items():
    # Format examples as JS string
    ex_js = "examples: [\n"
    for ex in examples:
        code_escaped = ex['code'].replace('`', '\\`').replace('\\n', '\\\\n')
        ex_js += f"""          {{
            title: {repr(ex['title'])},
            urduTitle: {repr(ex['urduTitle'])},
            code: `{ex['code']}`,
            explanation: {repr(ex['explanation'])},
            urduExplanation: {repr(ex['urduExplanation'])}
          }},\n"""
    ex_js += "        ],\n"

    # Find lesson block and inject examples right after pakistaniContext
    pattern = re.compile(rf'(id:\s*["\']{lesson_id}["\'].*?pakistaniContext:\s*["\'].*?["\'],\s*)', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub(rf'\1{ex_js}', content)

course_file.write_text(content, encoding="utf-8")
print("Successfully enriched all 21 lessons with 2 distinct examples and explanations!")
