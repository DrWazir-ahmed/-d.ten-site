/**
 * pythonKidsCourseData.js
 * Comprehensive Python for Kids curriculum (Ages 6-12) for Pakistani students.
 * Includes:
 * - 7 Modules, 21 Interactive Lessons
 * - Real Pakistani cultural examples (Cricket, Eidi, Biryani, Cities, Rupee Math)
 * - English & Urdu (Nastaliq) explanations & voice narration scripts
 * - Starter code, challenges, hints, and friendly error checks
 * - End-of-Module Quizzes & Comprehensive Final Exam
 */

export const PYTHON_KIDS_COURSE = {
  id: "course-python-kids-pakistan",
  title: "Python for Kids: Junior Code Master (عمر 6-12 سال)",
  shortTitle: "Python for Kids",
  tagline: "The Fun, Interactive Python Coding Course for Young Pakistani Pioneers! 🚀🇵🇰",
  description: "An exciting, playful programming adventure designed specifically for Pakistani boys and girls aged 6-12. Learn step-by-step with dual Urdu and English voice narration, live in-browser code editor, cricket scorekeepers, Eidi calculators, end-of-module quizzes, and an official printable D.TEN Certificate of Completion with your own photo!",
  category: "Coding & AI for Kids",
  level: "Beginner (Ages 6-12)",
  membership: "free",
  thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  instructor: "PyBot 🤖 & D.TEN Junior Coding Academy",
  duration: "8 hours of interactive play",
  ageGroup: "6-12 Years",
  totalModules: 7,
  totalLessons: 21,
  rating: 5.0,
  reviewsCount: 890,
  status: "published",
  lessonCount: 21,
  lessons: [
    {
      id: "les-pykids-studio",
      title: "Interactive Python for Kids Studio (Playground & Voice)",
      duration: "Flexible",
      type: "python_kids_studio"
    }
  ],

  modules: [
    // ─────────────────────────────────────────────────────────────
    // MODULE 1: Meet Python & First Steps
    // ─────────────────────────────────────────────────────────────
    {
      id: 1,
      title: "Module 1: Meet Python & First Words",
      urduTitle: "ماڈیول 1: پائتھن سے دوستی اور پہلا کوڈ",
      badge: "Level 1 • Novice",
      color: "from-blue-500 to-indigo-600",
      description: "Discover what coding is, meet your robot friend PyBot, and write your first computer instructions using print().",
      urduDescription: "جانیے کہ کوڈنگ کیا ہے اور کمپیوٹر سے باتیں کرنا سیکھیں۔ اپنا پہلا پائتھن پروگرام بنائیں!",
      lessons: [
        {
          id: "m1-l1",
          title: "Lesson 1: Say Hello to the World & Pakistan!",
          urduTitle: "سبق 1: سلام پاکستان اور پہلا میسج!",
          concept: "The print() function tells the computer to show text on the screen. Words inside quotation marks (\"...\") are called Strings.",
          urduConcept: "کمپیوٹر کو اپنی اسکرین پر کچھ دکھانے کے لیے ہم print() کا جادوئی لفظ استعمال کرتے ہیں۔ لفظوں کو ہمیشہ کوٹیشن مارکس (\"...\") میں لکھتے ہیں۔",
          englishVoice: "Hello young coder! Welcome to Python. The print command is like a megaphone. Whatever message you put inside the speech marks will be shouted onto the screen!",
          urduVoice: "ہیلو دوست! پائتھن کی دنیا میں خوش آمدید۔ پرنٹ کمانڈ کمپیوٹر کا لاؤڈ اسپیکر ہے۔ جو بات آپ کوٹیشن مارکس میں لکھیں گے، کمپیوٹر اسے اسکرین پر دکھائے گا!",
          pakistaniContext: "Let's print a warm greeting to our homeland: 'Dil Dil Pakistan, Jan Jan Pakistan!' 🇵🇰",
          starterCode: `# Write your first Python message!
print("Salam Pakistan! 🇵🇰")
print("I am learning Python coding with D.TEN!")
`,
          challenge: "Change the message to say 'Hello' and your own name, then click Run Code!",
          hint: 'Remember to close the quotes and bracket: print("Salam [Your Name]")',
          solution: 'print("Salam Fatima!")',
          funFact: "Did you know? Python was named after a British comedy show called Monty Python, not the snake!"
        },
        {
          id: "m1-l2",
          title: "Lesson 2: Drawing with Code & Emojis",
          urduTitle: "سبق 2: کوڈنگ سے کارٹون اور ایموجیز بنانا",
          concept: "You can print multiple lines to create ASCII art, rocket ships, and smiley faces!",
          urduConcept: "آپ کئی لائنوں میں پرنٹ لکھ کر کمپیوٹر پر راکٹ اور مزے دار کارٹون بنا سکتے ہیں۔",
          englishVoice: "Did you know you can make art with code? By stacking print statements, we can launch a rocket ship into outer space!",
          urduVoice: "کیا آپ جانتے ہیں کہ کوڈنگ سے ڈرائنگ بھی بنائی جا سکتی ہے؟ آئیے ایک ساتھ مل کر خلائی راکٹ بناتے ہیں۔",
          pakistaniContext: "Let's build a space rocket for SUPARCO, Pakistan's Space Agency!",
          starterCode: `# Space Rocket Art 🚀
print("   /\\   ")
print("  /  \\  ")
print(" | PK | ")
print(" | 🇵🇰 | ")
print("  /||\\  ")
print(" ^^^^^^ ")
print("3... 2... 1... BLAST OFF!")
`,
          challenge: "Add two more lines with fire emojis 🔥🔥🔥 at the bottom of the rocket!",
          hint: 'Use print("  🔥🔥  ")',
          solution: 'print("  🔥🔥  ")',
          funFact: "Computers execute Python code line by line from top to bottom, exactly like reading a storybook!"
        },
        {
          id: "m1-l3",
          title: "Lesson 3: Catching Oopsies! (Friendly Errors)",
          urduTitle: "سبق 3: غلطیوں سے مت ڈریں (ایرز کو سمجھیں)",
          concept: "When you make a typo in Python, it's called a Bug. Python gives you a gentle error message so you can fix it!",
          urduConcept: "کوڈنگ میں غلطی کو 'بگ' کہتے ہیں۔ گھبرائیں مت، غلطیوں سے ہی ہم اچھے پروگرامر بنتے ہیں!",
          englishVoice: "Great programmers are not afraid of making mistakes. When Python shows a red error, it is just whispering a clue on how to fix your code!",
          urduVoice: "بڑے بڑے پروگرامرز بھی غلطیاں کرتے ہیں۔ جب کمپیوٹر سرخ نشان دکھائے تو سمجھیں وہ آپ کو کوڈ ٹھیک کرنے کا اشارہ دے رہا ہے۔",
          pakistaniContext: "Think of an error like dropping a catch in cricket—you just pick up the ball and try again!",
          starterCode: `# Can you spot and fix the bug in this line?
# It is missing a closing quote mark!
print("Babar Azam hit a brilliant century!)
`,
          challenge: "Add the missing quote mark at the end of the text to fix the error!",
          hint: 'Change century!) to century!")',
          solution: 'print("Babar Azam hit a brilliant century!")',
          funFact: "The word 'debugging' started in 1947 when an actual moth got stuck inside an old computer machine!"
        }
      ],
      quiz: {
        title: "Module 1 Champion Quiz 🏆",
        questions: [
          {
            q: "What magical command tells Python to display text on the computer screen?",
            options: ["show()", "print()", "speak()", "display()"],
            answer: 1,
            explanation: "print() is the standard Python function used to output text to the screen."
          },
          {
            q: "How do you write text (strings) correctly inside print()?",
            options: ["print(Hello)", "print('Hello')", "print <Hello>", "print{Hello}"],
            answer: 1,
            explanation: "Text must be enclosed inside quotation marks like 'Hello' or \"Hello\"."
          },
          {
            q: "What do programmers call a mistake or typo in their code?",
            options: ["A spider", "A bug", "A cricket", "A cat"],
            answer: 1,
            explanation: "A mistake in computer code is called a 'bug', and fixing it is 'debugging'!"
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 2: Variables & Super Memory
    // ─────────────────────────────────────────────────────────────
    {
      id: 2,
      title: "Module 2: Variables & Super Memory",
      urduTitle: "ماڈیول 2: ویری ایبلز اور جادوئی بکسے",
      badge: "Level 2 • Apprentice",
      color: "from-emerald-500 to-teal-600",
      description: "Learn how computers remember numbers and names using Variables like labelled toy boxes.",
      urduDescription: "ویری ایبلز کمپیوٹر کے لیبل والے بکسے ہیں جن میں ہم نمبرز اور نام محفوظ کرتے ہیں۔",
      lessons: [
        {
          id: "m2-l1",
          title: "Lesson 1: The Magic Storage Box",
          urduTitle: "سبق 1: نام اور نمبر یاد رکھنے والے بکسے",
          concept: "A variable is like a named box. You put something inside with the equals sign (=), and Python remembers it forever!",
          urduConcept: "ویری ایبل ایک ڈبے کی طرح ہے۔ جب آپ player = 'Shaheen' لکھتے ہیں تو کمپیوٹر اس نام کو یاد کر لیتا ہے۔",
          englishVoice: "Imagine you have magic labelled boxes. In one box you put a player's name, and in another box you put their score!",
          urduVoice: "تصور کریں آپ کے پاس جادوئی بکسے ہیں۔ ایک بکسے میں کرکٹر کا نام رکھیں اور دوسرے میں اس کا اسکور!",
          pakistaniContext: "Let's store Pakistan's cricket captain and his shirt number!",
          starterCode: `# Store data in variables
player_name = "Babar Azam"
shirt_number = 56

print("Our Star Batter:")
print(player_name)
print("Shirt Number:")
print(shirt_number)
`,
          challenge: "Create a new variable called favorite_food = 'Biryani' and print it!",
          hint: "Write favorite_food = 'Biryani' and then print(favorite_food)",
          solution: "favorite_food = 'Biryani'\nprint(favorite_food)",
          funFact: "Variable names in Python cannot have spaces! We use an underscore like student_name."
        },
        {
          id: "m2-l2",
          title: "Lesson 2: The Eid Pocket Money Calculator 💰",
          urduTitle: "سبق 2: عیدی پاکٹ منی کیلکولیٹر",
          concept: "Computers are lightning-fast calculators! You can use +, -, *, and / with variables.",
          urduConcept: "کمپیوٹر سیکنڈ میں جمع، نفی اور ضرب کر سکتا ہے۔ آئیے عیدی کا حساب لگائیں!",
          englishVoice: "On Eid day, you collect Eidi from your family. Let's write a program that counts your total Eid treasure!",
          urduVoice: "عید پر سب بچوں کو عیدی ملتی ہے۔ آئیے پائتھن سے اپنی عیدی کا کل حساب لگاتے ہیں!",
          pakistaniContext: "Add up Eidi from Chacha, Mama, and Dadi Jaan in Pakistani Rupees (PKR)!",
          starterCode: `# Eid Eidi Counter in Rupees (PKR)
eidi_chacha = 500
eidi_mama = 1000
eidi_dadi = 2000

# Calculate total sum
total_eidi = eidi_chacha + eidi_mama + eidi_dadi

print("🎉 Mubarak! Your Total Eidi is:")
print(total_eidi)
print("Rupees (PKR)!")
`,
          challenge: "Suppose Abu gave you 1500 rupees too! Add eidi_abu = 1500 to the total.",
          hint: "Add eidi_abu to the total_eidi equation.",
          solution: "eidi_abu = 1500\ntotal_eidi = eidi_chacha + eidi_mama + eidi_dadi + eidi_abu\nprint(total_eidi)",
          funFact: "In Python, the symbol for multiplication is an asterisk (*), and division is a forward slash (/)."
        },
        {
          id: "m2-l3",
          title: "Lesson 3: Cricket Over & Run Rate Counter 🏏",
          urduTitle: "سبق 3: کرکٹ اسکور بورڈ اور چوکے چھکے",
          concept: "We can multiply boundaries: 4 runs for every boundary, 6 runs for every sixer!",
          urduConcept: "آئیے چوکے اور چھکے گن کر ٹیم کا اسکور معلوم کریں۔ چار ضرب چوکے اور چھ ضرب چھکے!",
          englishVoice: "Pakistan needs 20 runs to win! Let's multiply our sixes and fours to find out the final match score.",
          urduVoice: "پاکستان کو میچ جیتنے کے لیے رنز چاہیے۔ آئیے چھکوں اور چوکوں کو ضرب دے کر اسکور نکالتے ہیں۔",
          pakistaniContext: "Fakhar Zaman hit 4 sixes and 5 fours in Lahore Gaddafi Stadium!",
          starterCode: `# Gaddafi Stadium Live Scoreboard
sixes_hit = 4
fours_hit = 5

runs_from_sixes = sixes_hit * 6
runs_from_fours = fours_hit * 4

total_score = runs_from_sixes + runs_from_fours

print("Runs from 6s:", runs_from_sixes)
print("Runs from 4s:", runs_from_fours)
print("Total Boundary Runs:", total_score)
`,
          challenge: "If Fakhar hits one more six, change sixes_hit to 5 and run the code!",
          hint: "Set sixes_hit = 5",
          solution: "sixes_hit = 5",
          funFact: "Python can calculate numbers with millions of digits without ever breaking a sweat!"
        }
      ],
      quiz: {
        title: "Module 2 Variables Quiz 🏆",
        questions: [
          {
            q: "Which line correctly creates a variable storing a student's age?",
            options: ["age == 10", "age = 10", "10 = age", "age : 10"],
            answer: 1,
            explanation: "In Python, we use a single equals sign (=) for assignment: variable_name = value."
          },
          {
            q: "What symbol do we use in Python to multiply two numbers together?",
            options: ["x", "*", "#", "&"],
            answer: 1,
            explanation: "Python uses the asterisk (*) operator for multiplication."
          },
          {
            q: "If eidi = 500 and you spend 200 on ice cream, how do you find the remaining money?",
            options: ["eidi + 200", "eidi - 200", "eidi * 200", "eidi / 200"],
            answer: 1,
            explanation: "Subtraction (-) takes away 200 from eidi, leaving 300."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 3: Decisions & Magic Choices (If / Else)
    // ─────────────────────────────────────────────────────────────
    {
      id: 3,
      title: "Module 3: Decisions with If, Elif & Else",
      urduTitle: "ماڈیول 3: فیصلے کرنا: اگر، ورنہ (If & Else)",
      badge: "Level 3 • Explorer",
      color: "from-amber-500 to-orange-600",
      description: "Teach your computer to think and make smart decisions using conditions.",
      urduDescription: "کمپیوٹر کو عقل مند بنائیں تاکہ وہ حالات دیکھ کر خود فیصلے کر سکے!",
      lessons: [
        {
          id: "m3-l1",
          title: "Lesson 1: The Secret Password Door",
          urduTitle: "سبق 1: جادوئی دروازہ اور خفیہ پاس ورڈ",
          concept: "An 'if' statement checks a condition. If it is True, the code runs. If not, it skips!",
          urduConcept: "اگر پاس ورڈ درست ہے تو دروازہ کھلے گا، ورنہ بند رہے گا۔ یہی if اور else کا کمال ہے!",
          englishVoice: "Imagine a secret superhero door. If you whisper the correct password, it swings open with lights!",
          urduVoice: "تصور کریں ایک خفیہ دروازہ ہے۔ اگر آپ صحیح پاس ورڈ بولیں گے تو وہ کھل جائے گا۔",
          pakistaniContext: "The secret password to open the Lahore Fort secret treasure chamber!",
          starterCode: `# Secret Chamber Passcode
secret_code = "PakistanZindabad"

guess = "PakistanZindabad"

if guess == secret_code:
    print("✨ Door unlocked! Welcome to the treasure chamber! 💎")
else:
    print("❌ Wrong secret word! Access denied!")
`,
          challenge: "Change guess to 'OpenSesame' to see what happens when the password is wrong!",
          hint: "Set guess = 'OpenSesame'",
          solution: "guess = 'OpenSesame'",
          funFact: "Notice the spaces before print() inside the 'if'? That is called Indentation, and Python uses it to group code!"
        },
        {
          id: "m3-l2",
          title: "Lesson 2: Pakistani Exam Grading Robot 📝",
          urduTitle: "سبق 2: اسکول رزلٹ اور گریڈ چیکر",
          concept: "Use 'if', 'elif' (else if), and 'else' to test multiple conditions in a row.",
          urduConcept: "اگر 90 سے زیادہ نمبر ہیں تو A-One گریڈ، ورنہ اگر 50 ہیں تو پاس!",
          englishVoice: "Let us build an automated teacher assistant that reads exam marks and awards A-Plus, A, or Pass badges!",
          urduVoice: "آئیے ایک ایسا روبوٹ بنائیں جو اسکول کے امتحانی نمبر دیکھ کر فوراً گریڈ بتا دے۔",
          pakistaniContext: "Federal Board / Matric / Cambridge examination grading system in Pakistan!",
          starterCode: `# School Exam Grade Checker
marks = 92

if marks >= 90:
    print("🌟 Grade: A-One! Outstanding Scholar!")
elif marks >= 80:
    print("🎉 Grade: A! Excellent Performance!")
elif marks >= 50:
    print("👍 Grade: Pass! Good job, keep it up!")
else:
    print("📚 Need more practice! You can do better next time!")
`,
          challenge: "Change marks to 75 and run the code to see the result!",
          hint: "Set marks = 75",
          solution: "marks = 75",
          funFact: "In Python, >= means 'greater than or equal to', and == checks if two things are identical."
        },
        {
          id: "m3-l3",
          title: "Lesson 3: Murree Snow & Karachi Weather Advisor ☀️❄️",
          urduTitle: "سبق 3: مری کی برفباری یا کراچی کی دھوپ",
          concept: "Checking weather conditions to decide what clothes to wear.",
          urduConcept: "اگر مری میں شدید سردی ہے تو گرم جیکٹ پہنیں، اور کراچی میں دھوپ ہے تو سن گلاسز!",
          englishVoice: "Are you traveling to snowy Murree hills or Karachi sunny beach? Let Python pick your travel gear!",
          urduVoice: "کیا آپ مری کی سیر پر جا رہے ہیں یا کلفٹن کے ساحل پر؟ پائتھن بتائے گا کیا پہننا ہے۔",
          pakistaniContext: "Deciding between jacket, umbrella, or sunglasses depending on Pakistani city temperature!",
          starterCode: `# Pakistan Travel Weather Advisor
temperature = 5 # In Celsius

if temperature < 10:
    print("❄️ It is freezing in Murree! Wear your warm jacket and gloves!")
elif temperature > 35:
    print("☀️ Karachi is super hot! Drink cold lemonade and stay hydrated!")
else:
    print("🌤️ Islamabad weather is lovely! Perfect day for a walk in Shakarparian!")
`,
          challenge: "Set temperature = 40 and see what the weather bot advises!",
          hint: "Set temperature = 40",
          solution: "temperature = 40",
          funFact: "Weather forecasting apps all around the world use Python to crunch satellite data!"
        }
      ],
      quiz: {
        title: "Module 3 Decisions Quiz 🏆",
        questions: [
          {
            q: "What character must ALWAYS be written at the end of an 'if' or 'else' line?",
            options: ["; (semicolon)", ": (colon)", ". (period)", "! (exclamation)"],
            answer: 1,
            explanation: "In Python, control lines like if, elif, and else must end with a colon (:)."
          },
          {
            q: "What does 'elif' stand for in Python?",
            options: ["Elephant if", "Else if", "Extra life", "End line if"],
            answer: 1,
            explanation: "elif is short for 'else if', allowing you to test another condition."
          },
          {
            q: "What comparison symbol tests whether two values are equal?",
            options: ["=", "==", "===", "equals"],
            answer: 1,
            explanation: "Double equals (==) tests for equality, while single equals (=) assigns a variable."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 4: Magic Loops (Repeating without Re-typing)
    // ─────────────────────────────────────────────────────────────
    {
      id: 4,
      title: "Module 4: Loops & Repeating Magic",
      urduTitle: "ماڈیول 4: لوپس: جادوئی دہرائی (ایک کام بار بار)",
      badge: "Level 4 • Wizard",
      color: "from-purple-500 to-violet-600",
      description: "Why do repetitive work when a loop can do it 100 times in half a second?",
      urduDescription: "کمپیوٹر کی سب سے بڑی طاقت یہ ہے کہ وہ ایک کام ہزار بار بغیر تھکے کر سکتا ہے!",
      lessons: [
        {
          id: "m4-l1",
          title: "Lesson 1: The Rocket Countdown Loop 🚀",
          urduTitle: "سبق 1: خلائی راکٹ کی الٹی گنتی (Countdown)",
          concept: "The for loop repeats a block of code a specified number of times using range().",
          urduConcept: "for لوپ کوڈ کو بار بار چلانے کے لیے استعمال ہوتا ہے۔ range(5) کا مطلب ہے 5 مرتبہ!",
          englishVoice: "Imagine counting 100 cricket balls by hand. Boring, right? With a for loop, Python counts them in the blink of an eye!",
          urduVoice: "سو گیندیں گننا کتنا مشکل ہے۔ لیکن پائتھن کے لوپ سے کمپیوٹر پلک جھپکتے ہی گنتی کر لیتا ہے!",
          pakistaniContext: "Launching Pakistan's satellite probe into orbit!",
          starterCode: `# Satellite Countdown with a for loop!
print("Starting Engine Launch Sequence...")

for count in [5, 4, 3, 2, 1]:
    print("T-minus:", count)

print("🚀 BLAST OFF TO THE MOON! Pakistan Zindabad!")
`,
          challenge: "Add '0' into the countdown list before BLAST OFF!",
          hint: "Use [5, 4, 3, 2, 1, 0]",
          solution: "for count in [5, 4, 3, 2, 1, 0]:\n    print(count)",
          funFact: "Animation in video games like Minecraft runs inside a giant loop that repeats 60 times every second!"
        },
        {
          id: "m4-l2",
          title: "Lesson 2: Math Multiplication Tables ✖️",
          urduTitle: "سبق 2: ریاضی کے پہاڑے (Multiplication Tables)",
          concept: "Use range(1, 11) to automatically print any math table in just two lines of code!",
          urduConcept: "range(1, 11) کی مدد سے صرف دو لائنوں میں کسی بھی نمبر کا پہاڑا لکھیں!",
          englishVoice: "Struggling to memorize your 7 times table? Let's write a 3-line Python script that prints the whole table instantly!",
          urduVoice: "پہاڑے یاد کرنے میں مشکل؟ آئیے پائتھن سے کہیے کہ وہ فوراً سات کا پورا پہاڑا لکھ دے!",
          pakistaniContext: "Learning your 7 times table for school math class!",
          starterCode: `# 7 Times Table Generator
table_number = 7

for i in range(1, 11):
    answer = table_number * i
    print(table_number, "x", i, "=", answer)
`,
          challenge: "Change table_number to 9 to generate the 9 times table!",
          hint: "Set table_number = 9",
          solution: "table_number = 9",
          funFact: "range(1, 11) starts at 1 and stops right before 11, so it counts up to 10."
        },
        {
          id: "m4-l3",
          title: "Lesson 3: Serving Delicious Biryani Plates 🍛",
          urduTitle: "سبق 3: شادی پر بریانی کی پلیٹیں تقسیم کرنا",
          concept: "The while loop keeps running as long as a condition remains True.",
          urduConcept: "جب تک مہمان موجود ہیں، بریانی کی پلیٹیں سرو کرتے رہیں۔ یہی while لوپ ہے!",
          englishVoice: "At a Pakistani wedding dinner, we keep serving tasty biryani until the big deg (cauldron) is empty!",
          urduVoice: "شادی کی دعوت میں جب تک بریانی کی دیگ خالی نہیں ہوتی، پلیٹیں لگتی رہتی ہیں۔",
          pakistaniContext: "Serving piping hot Karachi Biryani to guests at an Eid feast!",
          starterCode: `# While Loop: Serving Biryani
plates_left = 5

while plates_left > 0:
    print("🍛 Serving hot biryani plate number:", plates_left)
    plates_left = plates_left - 1

print("🎉 All wedding guests are happily served!")
`,
          challenge: "Change plates_left to 8 so more guests can enjoy biryani!",
          hint: "Set plates_left = 8",
          solution: "plates_left = 8",
          funFact: "Always make sure a while loop has a way to end, otherwise it becomes an Infinite Loop!"
        }
      ],
      quiz: {
        title: "Module 4 Loops Quiz 🏆",
        questions: [
          {
            q: "How many times will 'for i in range(5):' repeat its code block?",
            options: ["3 times", "4 times", "5 times", "6 times"],
            answer: 2,
            explanation: "range(5) produces 0, 1, 2, 3, 4 which is exactly 5 repetitions."
          },
          {
            q: "What danger happens if a while loop condition never becomes False?",
            options: ["The computer explodes", "An Infinite Loop runs endlessly", "It turns off", "Code deletes itself"],
            answer: 1,
            explanation: "An infinite loop repeats forever because the stopping condition is never reached."
          },
          {
            q: "In 'for i in range(1, 6):', what is the last value of i?",
            options: ["4", "5", "6", "7"],
            answer: 1,
            explanation: "range(1, 6) starts at 1 and stops before 6, so the last number is 5."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 5: Lists & Magic Backpacks
    // ─────────────────────────────────────────────────────────────
    {
      id: 5,
      title: "Module 5: Lists & Magic Backpacks",
      urduTitle: "ماڈیول 5: لسٹس: کمپیوٹر کا جادوئی اسکول بستہ",
      badge: "Level 5 • Master",
      color: "from-rose-500 to-pink-600",
      description: "Store groups of items together in square brackets [ ] and access them with ease.",
      urduDescription: "ایک سے زیادہ چیزوں کو ایک ہی ویری ایبل میں سنبھالنے کے لیے لسٹس کا استعمال کریں۔",
      lessons: [
        {
          id: "m5-l1",
          title: "Lesson 1: Pakistan Cricket Playing XI 🏏",
          urduTitle: "سبق 1: پاکستان کرکٹ ٹیم کی پلیئنگ الیون لسٹ",
          concept: "A list holds multiple items inside square brackets, separated by commas: ['a', 'b', 'c'].",
          urduConcept: "لسٹ میں کئی نام رکھے جا سکتے ہیں۔ پائتھن میں گنتی 0 سے شروع ہوتی ہے!",
          englishVoice: "Imagine picking your dream Pakistani cricket squad! With a Python list, you can store all your favorite stars in one team roster.",
          urduVoice: "تصور کریں آپ کو اپنی من پسند کرکٹ ٹیم چننی ہے۔ لسٹ میں تمام کھلاڑیوں کے نام جمع کر لیں۔",
          pakistaniContext: "Selecting Babar, Rizwan, Shaheen, and Naseem for the national squad!",
          starterCode: `# Pakistan Cricket Stars Roster
team = ["Babar Azam", "Mohammad Rizwan", "Shaheen Afridi", "Shadab Khan"]

print("Full Squad:", team)
print("Team Captain (Item 0):", team[0])
print("Wicket Keeper (Item 1):", team[1])
`,
          challenge: "Print the star fast bowler at index 2 (Shaheen Afridi)!",
          hint: "Use print('Fast Bowler:', team[2])",
          solution: "print(team[2])",
          funFact: "In programming, we count starting from 0! The very first item in a list is at index 0."
        },
        {
          id: "m5-l2",
          title: "Lesson 2: Adding Items to the Eid Shopping Cart 🛒",
          urduTitle: "سبق 2: عید شاپنگ لسٹ میں نئی چیزیں شامل کرنا",
          concept: "Use the .append() spell to add new goodies to your list at any time!",
          urduConcept: "لسٹ میں نئی چیز شامل کرنے کے لیے ہم .append() کا طریقہ استعمال کرتے ہیں۔",
          englishVoice: "Going shopping for Eid clothes in Anarkali or Tariq Road? Let's use append() to add shoes and bangles to our bag!",
          urduVoice: "عید کی شاپنگ پر جاتے ہوئے خریداری کی لسٹ میں نئے کپڑے، جوتے اور چوڑیاں شامل کریں۔",
          pakistaniContext: "Packing your Eid shopping bag for the whole family!",
          starterCode: `# Eid Shopping Cart
shopping_bag = ["Kurta Shalwar", "Peshawari Chappal"]

print("Initial Bag:", shopping_bag)

# Add sweets and bangles
shopping_bag.append("Gulab Jamun Sweets 🍬")
shopping_bag.append("Eid Bangles ✨")

print("After Shopping:", shopping_bag)
print("Total Items in Bag:", len(shopping_bag))
`,
          challenge: "Append 'Mehndi Cone' to the shopping bag and run the code!",
          hint: "Write shopping_bag.append('Mehndi Cone')",
          solution: "shopping_bag.append('Mehndi Cone')",
          funFact: "len() tells you the exact number of items stored inside any list or string!"
        },
        {
          id: "m5-l3",
          title: "Lesson 3: Looping Through Favorite Pakistani Dishes 🍲",
          urduTitle: "سبق 3: لسٹ میں موجود تمام کھانوں کا چکر لگانا",
          concept: "You can combine a for loop with a list to print every single item individually!",
          urduConcept: "for لوپ کی مدد سے لسٹ کی ہر ایک چیز کو ایک ایک کر کے دیکھا اور دکھایا جا سکتا ہے۔",
          englishVoice: "Let us inspect all the mouth-watering Pakistani dishes in our culinary grand menu!",
          urduVoice: "آئیے پاکستان کے تمام لذیذ کھانوں کی لسٹ کو خوبصورتی سے اسکرین پر پرنٹ کرتے ہیں۔",
          pakistaniContext: "Famous Pakistani foods: Biryani, Nihari, Haleem, Seekh Kabab, and Kheer!",
          starterCode: `# Famous Pakistani Feast Menu
menu = ["Sindhi Biryani", "Lahori Nihari", "Peshawari Chapli Kabab", "Shahi Kheer"]

print("🍽️ Welcome to the D.TEN Dawat Menu:")

for dish in menu:
    print("⭐ Delicious Dish:", dish)
`,
          challenge: "Add 'Halwa Puri' to the menu list at the top and re-run!",
          hint: "Add 'Halwa Puri' inside the square brackets.",
          solution: 'menu = ["Sindhi Biryani", "Lahori Nihari", "Peshawari Chapli Kabab", "Shahi Kheer", "Halwa Puri"]',
          funFact: "Lists in Python can contain numbers, strings, and even other lists inside them!"
        }
      ],
      quiz: {
        title: "Module 5 Lists Quiz 🏆",
        questions: [
          {
            q: "What is the index number of the very first item in a Python list?",
            options: ["1", "0", "-1", "first"],
            answer: 1,
            explanation: "Python uses 0-based indexing, so the first element is always at index 0."
          },
          {
            q: "Which method adds a new item to the end of a list?",
            options: ["list.add()", "list.append()", "list.insert()", "list.push()"],
            answer: 1,
            explanation: "In Python, .append() is the standard method to add an item to the end of a list."
          },
          {
            q: "What does len(['cat', 'dog', 'parrot']) evaluate to?",
            options: ["2", "3", "4", "15"],
            answer: 1,
            explanation: "There are 3 animal items in the list, so len() returns 3."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 6: Functions & Magic Spells
    // ─────────────────────────────────────────────────────────────
    {
      id: 6,
      title: "Module 6: Functions & Magic Spells",
      urduTitle: "ماڈیول 6: فنکشنز: اپنے خود کے جادوئی منتر بنائیں",
      badge: "Level 6 • Sorcerer",
      color: "from-cyan-500 to-blue-600",
      description: "Package your super cool code into reusable functions using def.",
      urduDescription: "کوڈ کا ایک ٹکڑا بنا کر اس کا نام رکھ لیں اور جب چاہیں ایک لفظ سے استعمال کریں!",
      lessons: [
        {
          id: "m6-l1",
          title: "Lesson 1: The Magic Greeting Spell 🪄",
          urduTitle: "سبق 1: سلام کرنے والا جادوئی فنکشن",
          concept: "A function is a mini-program that you give a name to with 'def'. You can call it whenever you want!",
          urduConcept: "def لکھ کر ہم اپنا فنکشن بناتے ہیں۔ پھر جہاں ضرورت ہو اسے نام سے پکار لیتے ہیں!",
          englishVoice: "Imagine casting a spell that greets any person with their name and wishes them happy coding! That is what a function does.",
          urduVoice: "ایک ایسا جادوئی منتر جو ہر دوست کا نام لے کر اسے سلام کہے اور خوش آمدید کرے۔",
          pakistaniContext: "Creating a polite Pakistani greeting function for school friends!",
          starterCode: `# Define a greeting function
def say_salam(friend_name):
    print("Assalam-o-Alaikum", friend_name, "! 🇵🇰")
    print("Welcome to Python Coding Club!")

# Call the function for different friends
say_salam("Ali")
say_salam("Zainab")
say_salam("Hamza")
`,
          challenge: "Call say_salam() with your own name!",
          hint: 'Write say_salam("YourName")',
          solution: 'say_salam("Fatima")',
          funFact: "Functions save thousands of hours because you write the recipe once and use it forever!"
        },
        {
          id: "m6-l2",
          title: "Lesson 2: The Superhero Power Multiplier 🦸",
          urduTitle: "سبق 2: سپر ہیرو طاقت بڑھانے والا فنکشن",
          concept: "Functions can return values using the 'return' keyword.",
          urduConcept: "فنکشن حساب کتاب کر کے ہمیں نتیجہ واپس (return) بھی کر سکتا ہے۔",
          englishVoice: "When our superhero drinks magic potion, their power gets tripled! Let's write a function with return.",
          urduVoice: "جب سپر ہیرو جادوئی شربت پیتا ہے تو اس کی طاقت تین گنا ہو جاتی ہے۔ آئیے پاور ملٹی پلائر بناتے ہیں۔",
          pakistaniContext: "Leveling up your gaming avatar's power points!",
          starterCode: `# Superhero Power Multiplier
def boost_power(current_power, multiplier):
    final_power = current_power * multiplier
    return final_power

my_hero_power = 50
boosted = boost_power(my_hero_power, 3)

print("Original Power:", my_hero_power)
print("⚡ Super Boosted Power:", boosted)
`,
          challenge: "Change the multiplier from 3 to 10 for MEGA POWER!",
          hint: "Call boost_power(my_hero_power, 10)",
          solution: "boost_power(my_hero_power, 10)",
          funFact: "Functions can take multiple parameters separated by commas like (a, b)!"
        },
        {
          id: "m6-l3",
          title: "Lesson 3: Bazaar Discount Calculator 🏷️",
          urduTitle: "سبق 3: بازار میں رعایت اور بچت کا حساب",
          concept: "A practical function that calculates shopping discounts and savings.",
          urduConcept: "بازار سے خریداری کرتے ہوئے ڈسکاؤنٹ اور بچت کا درست حساب لگانے والا فنکشن۔",
          englishVoice: "Shopping in Liberty Market Lahore? Let us calculate how much money you save with a discount coupon!",
          urduVoice: "لاہور کے لبرٹی بازار میں شاپنگ کرتے ہوئے پتا لگائیں کہ ڈسکاؤنٹ کے بعد کتنے پیسے بچے۔",
          pakistaniContext: "Buying new school shoes and calculating 100 rupees discount coupon!",
          starterCode: `# Bazaar Discount Calculator
def calculate_bill(original_price, discount_rupees):
    final_price = original_price - discount_rupees
    return final_price

shoes_price = 2500
coupon_discount = 500

to_pay = calculate_bill(shoes_price, coupon_discount)

print("Original Shoes Price: Rs", shoes_price)
print("Discount Saved: Rs", coupon_discount)
print("Final Price to Pay: Rs", to_pay)
`,
          challenge: "If you buy a cricket bat for Rs 3000 with Rs 600 discount, calculate the price!",
          hint: "Call calculate_bill(3000, 600)",
          solution: "calculate_bill(3000, 600)",
          funFact: "All e-commerce websites like Daraz and Amazon use functions to calculate discounts and taxes!"
        }
      ],
      quiz: {
        title: "Module 6 Functions Quiz 🏆",
        questions: [
          {
            q: "What keyword is used to declare and define a function in Python?",
            options: ["func", "function", "def", "create"],
            answer: 2,
            explanation: "'def' (short for define) is the keyword used to create functions in Python."
          },
          {
            q: "Which keyword sends a calculated answer back from a function?",
            options: ["send", "output", "return", "give"],
            answer: 2,
            explanation: "The 'return' statement exits a function and passes back a result value."
          },
          {
            q: "How do you run (call) a function named celebrate()?",
            options: ["call celebrate", "celebrate()", "run.celebrate", "celebrate[]"],
            answer: 1,
            explanation: "You call a function by writing its name followed by parentheses: celebrate()."
          }
        ]
      }
    },

    // ─────────────────────────────────────────────────────────────
    // MODULE 7: Mini Projects, Games & Final Exam
    // ─────────────────────────────────────────────────────────────
    {
      id: 7,
      title: "Module 7: Games, Mini Projects & Final Exam",
      urduTitle: "ماڈیول 7: منی گیمز بنائیں اور فائنل سرٹیفکیٹ امتحان",
      badge: "Level 7 • Grandmaster",
      color: "from-amber-500 to-emerald-600",
      description: "Put everything together to build real interactive mini games and pass the Grandmaster Exam!",
      urduDescription: "اب تک سیکھی گئی تمام چیزوں سے اپنے کھیل بنائیں اور فائنل سرٹیفکیٹ حاصل کریں!",
      lessons: [
        {
          id: "m7-l1",
          title: "Project 1: The Magic Secret Number Game 🔮",
          urduTitle: "پروجیکٹ 1: جادوئی نمبر بوجھنے کا کھیل",
          concept: "Building an interactive guessing game using variables, conditions, and user input.",
          urduConcept: "کمپیوٹر ایک خفیہ نمبر سوچے گا اور آپ کو بوجھنے کا اشارہ دے گا۔",
          englishVoice: "Let us code our first interactive computer game! The player guesses a secret number, and Python tells them if they are too high, too low, or won the game!",
          urduVoice: "آئیے ایک مزے دار کمپیوٹر گیم بناتے ہیں۔ کیا آپ کمپیوٹر کا خفیہ نمبر بوجھ سکتے ہیں؟",
          pakistaniContext: "Play the game with your brother, sister, or school classmate!",
          starterCode: `# Magic Secret Number Guesser
secret_number = 7
player_guess = 7

print("🎮 Playing: Guess the Mystery Number!")

if player_guess == secret_number:
    print("🏆 BINGO! You guessed the secret number 7! You are a genius!")
elif player_guess > secret_number:
    print("📈 Too high! Guess a smaller number next time!")
else:
    print("📉 Too low! Guess a bigger number next time!")
`,
          challenge: "Change player_guess to 3 and run to see the 'Too low' hint!",
          hint: "Set player_guess = 3",
          solution: "player_guess = 3",
          funFact: "You just wrote the core logic used in millions of puzzle and arcade games!"
        },
        {
          id: "m7-l2",
          title: "Project 2: Rock, Paper, Scissors (پتھر، کاغذ، قینچی) ✂️",
          urduTitle: "پروجیکٹ 2: راک، پیپر، سیزرز گیم",
          concept: "Classic game using logic conditions to determine the winner.",
          urduConcept: "بچپن کا سب سے مشہور کھیل: پتھر قینچی کو توڑتا ہے، کاغذ پتھر کو لپیٹتا ہے!",
          englishVoice: "The world-famous playground game! Rock beats Scissors, Scissors cuts Paper, Paper covers Rock. Let's program the referee bot!",
          urduVoice: "راک پیپر سیزرز کا ایمپائر بوٹ! پائتھن خود فیصلہ کرے گا کہ کون جیتا۔",
          pakistaniContext: "The classic game played in school lunch breaks across Pakistan!",
          starterCode: `# Rock, Paper, Scissors Game
player_1 = "Rock"
player_2 = "Scissors"

print("Player 1 chose:", player_1)
print("Player 2 chose:", player_2)

if player_1 == player_2:
    print("🤝 It is a tie match!")
elif player_1 == "Rock" and player_2 == "Scissors":
    print("🎉 Player 1 WINS! Rock smashes scissors!")
elif player_1 == "Scissors" and player_2 == "Paper":
    print("🎉 Player 1 WINS! Scissors cut paper!")
elif player_1 == "Paper" and player_2 == "Rock":
    print("🎉 Player 1 WINS! Paper covers rock!")
else:
    print("🎉 Player 2 WINS!")
`,
          challenge: "Make Player 1 choose 'Paper' and Player 2 choose 'Scissors'. Who wins?",
          hint: 'Set player_1 = "Paper" and player_2 = "Scissors"',
          solution: 'player_1 = "Paper"\nplayer_2 = "Scissors"',
          funFact: "Logical operators like 'and' allow you to check two conditions at the exact same time!"
        },
        {
          id: "m7-l3",
          title: "Project 3: Pakistan Super Quiz Bot 🇵🇰",
          urduTitle: "پروجیکٹ 3: پاکستان سوپر کوئز روبوٹ",
          concept: "A smart quiz robot that tests general knowledge and tallies the final score.",
          urduConcept: "ایک ذہین کوئز روبوٹ جو سوال پوچھے گا، جواب چیک کرے گا اور کل اسکور بتائے گا۔",
          englishVoice: "Let's build a smart Quiz Bot that quizzes users about Pakistan and celebrates with fireworks!",
          urduVoice: "آئیے ایک ایسا روبوٹ بنائیں جو پاکستان کے بارے میں دلچسپ سوالات کرے اور درست جواب پر شاباش دے۔",
          pakistaniContext: "Questions about Minar-e-Pakistan, K2 mountain, and national sports!",
          starterCode: `# Pakistan Quiz Bot
score = 0

print("🤖 PyBot: Welcome to the Pakistan Super Quiz!")

# Question 1
ans1 = "Islamabad"
if ans1 == "Islamabad":
    print("✅ Correct! Islamabad is the beautiful capital of Pakistan!")
    score = score + 10

# Question 2
ans2 = "K2"
if ans2 == "K2":
    print("✅ Correct! K2 is the 2nd highest mountain in the world located in Pakistan!")
    score = score + 10

print("🏆 Final Quiz Score:", score, "out of 20 points! Shabaash!")
`,
          challenge: "Add a third question asking for the national language ('Urdu')!",
          hint: 'if ans3 == "Urdu": score = score + 10',
          solution: 'ans3 = "Urdu"\nif ans3 == "Urdu":\n    print("Correct!")\n    score = score + 10',
          funFact: "You are now ready to take your Grandmaster Final Exam and claim your verified Certificate!"
        }
      ],
      quiz: {
        title: "Module 7 Mini Projects Quiz 🏆",
        questions: [
          {
            q: "How can you keep score in a game program?",
            options: ["By creating a variable like score = 0 and adding to it", "By shouting at the screen", "It is not possible", "By restarting computer"],
            answer: 0,
            explanation: "We create a numerical variable like score = 0 and increment it whenever points are scored."
          },
          {
            q: "What does the 'and' operator do in an if condition?",
            options: ["Checks if at least one is True", "Requires BOTH conditions to be True", "Reverses the answer", "Prints text"],
            answer: 1,
            explanation: "'and' requires both conditions on the left and right to be True."
          },
          {
            q: "What is the ultimate benefit of learning Python at a young age?",
            options: ["Building games and AI apps", "Thinking logically like a scientist", "Solving real world problems", "All of the above! 🌟"],
            answer: 3,
            explanation: "Learning to code gives kids problem-solving superpowers for math, games, AI, and science!"
          }
        ]
      }
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // COMPREHENSIVE FINAL EXAM (10 Questions for Certificate)
  // ─────────────────────────────────────────────────────────────
  finalExam: {
    id: "exam-python-kids-grandmaster",
    title: "Junior Python Programmer Certification Exam (گرینڈ ماسٹر فائنل امتحان)",
    passingScore: 70, // 70% to get certificate
    timeMinutes: 20,
    questions: [
      {
        id: "fe1",
        question: "Which Python function is used to show a message on the screen?",
        urduQuestion: "اسکرین پر کوئی بات یا میسج دکھانے کے لیے کون سا فنکشن استعمال ہوتا ہے؟",
        options: ["show()", "print()", "write()", "speak()"],
        answer: 1,
        explanation: "print() is the built-in function that outputs text to the console."
      },
      {
        id: "fe2",
        question: "How do you correctly store text in a variable?",
        urduQuestion: "ویری ایبل میں الفاظ (ٹیکسٹ) کو درست طریقے سے کیسے محفوظ کرتے ہیں؟",
        options: ["city = Karachi", "city = 'Karachi'", "city == 'Karachi'", "'Karachi' = city"],
        answer: 1,
        explanation: "Text must be enclosed in quotes like city = 'Karachi'."
      },
      {
        id: "fe3",
        question: "What is the output of: print(5 + 3 * 2)?",
        urduQuestion: "اس کا کیا جواب آئے گا: print(5 + 3 * 2)؟",
        options: ["16", "11", "10", "15"],
        answer: 1,
        explanation: "Multiplication happens first: 3 * 2 = 6, then 5 + 6 = 11 (BODMAS rule)!"
      },
      {
        id: "fe4",
        question: "Which of the following checks if a number is greater than 50?",
        urduQuestion: "کون سی شرط چیک کرتی ہے کہ نمبر 50 سے بڑا ہے؟",
        options: ["if number > 50:", "if number < 50:", "if number == 50:", "if number = 50:"],
        answer: 0,
        explanation: "> is the greater-than operator."
      },
      {
        id: "fe5",
        question: "What is missing at the end of this line: if score >= 100",
        urduQuestion: "اس لائن کے آخر میں کیا لگانا ضروری ہے: if score >= 100",
        options: ["; (semicolon)", ": (colon)", ". (full stop)", "= (equals)"],
        answer: 1,
        explanation: "In Python, every if, elif, else, for, while, and def statement MUST end with a colon (:)."
      },
      {
        id: "fe6",
        question: "How many times will this loop run: for i in range(1, 4):?",
        urduQuestion: "یہ لوپ کتنی بار چلے گا: for i in range(1, 4):؟",
        options: ["4 times", "3 times (1, 2, 3)", "1 time", "5 times"],
        answer: 1,
        explanation: "range(1, 4) produces 1, 2, 3 which is 3 iterations."
      },
      {
        id: "fe7",
        question: "If heroes = ['Arfa Karim', 'Abdul Sattar Edhi', 'Imran Khan'], what is heroes[0]?",
        urduQuestion: "لسٹ میں پہلا نام (index 0) کون سا ہے؟",
        options: ["'Abdul Sattar Edhi'", "'Arfa Karim'", "'Imran Khan'", "None"],
        answer: 1,
        explanation: "Index 0 refers to the very first item in the list: 'Arfa Karim'!"
      },
      {
        id: "fe8",
        question: "How do you add 'Mango' to a list called fruits?",
        urduQuestion: "fruits نامی لسٹ میں 'Mango' شامل کرنے کا صحیح طریقہ کیا ہے؟",
        options: ["fruits.add('Mango')", "fruits.append('Mango')", "fruits.push('Mango')", "fruits + 'Mango'"],
        answer: 1,
        explanation: ".append() is the Python method to add an element to a list."
      },
      {
        id: "fe9",
        question: "Which keyword is used to create your own reusable function?",
        urduQuestion: "نیا فنکشن بنانے کے لیے کون سا خاص لفظ استعمال ہوتا ہے؟",
        options: ["make", "def", "func", "build"],
        answer: 1,
        explanation: "'def' (define) creates a function in Python."
      },
      {
        id: "fe10",
        question: "What does the line 'return total' do inside a function?",
        urduQuestion: "فنکشن کے اندر 'return total' کا کیا کام ہے؟",
        options: ["Shuts down computer", "Sends the answer back to where it was called", "Deletes total", "Prints error"],
        answer: 1,
        explanation: "'return' passes the result of the function back to the caller."
      }
    ]
  }
};
