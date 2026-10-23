const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_0 = [
  // ─────────────────────────────────────────────────────────────
  // 1. GREETINGS & CIVILITY (1 - 25)
  // ─────────────────────────────────────────────────────────────
  {
    id: 1, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Hello', 'heh-LOH'], zh: ['你好', 'Nǐ hǎo'], hi: ['नमस्ते', 'Namaste'], es: ['Hola', 'OH-lah'], fr: ['Bonjour', 'bohn-ZHOOR'],
      ar: ['مرحباً', 'Marhaban'], bn: ['হ্যালো / নমস্কার', 'Hyālo / Nômoshkar'], pt: ['Olá', 'oh-LAH'], ru: ['Здравствуйте', 'ZDRAH-stvooy-tyeh'], ur: ['ہیلو / السلام علیکم', 'Assalam-o-Alaikum'],
      id: ['Halo', 'HAH-loh'], de: ['Hallo', 'HAH-loh'], ja: ['こんにちは', 'Konnichiwa'], pa: ['ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'Sat Sri Akal'], sw: ['Hujambo', 'hoo-JAHM-boh'],
      mr: ['नमस्कार', 'Namaskar'], te: ['నమస్కారం', 'Namaskaram'], tr: ['Merhaba', 'mehr-hah-BAH'], ta: ['வணக்கம்', 'Vanakkam'], vi: ['Xin chào', 'sin chow']
    })
  },
  {
    id: 2, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Good morning', 'good MOR-ning'], zh: ['早上好', 'Zǎoshang hǎo'], hi: ['शुभ प्रभात', 'Shubh Prabhaat'], es: ['Buenos días', 'BWEH-nohs DEE-ahs'], fr: ['Bonjour', 'bohn-ZHOOR'],
      ar: ['صباح الخير', 'Sabah al-khayr'], bn: ['সুপ্রভাত', 'Shuprabhat'], pt: ['Bom dia', 'bohm JEE-ah'], ru: ['Доброе утро', 'DOH-broh-yeh OO-troh'], ur: ['صبح بخیر', 'Subah Bakhair'],
      id: ['Selamat pagi', 'seh-LAH-maht PAH-gee'], de: ['Guten Morgen', 'GOO-ten MOR-gen'], ja: ['おはようございます', 'Ohayou gozaimasu'], pa: ['ਸ਼ੁਭ ਸਵੇਰ', 'Shubh Saver'], sw: ['Habari za asubuhi', 'hah-BAH-ree zah ah-soo-BOO-hee'],
      mr: ['शुभ सकाळ', 'Shubh Sakal'], te: ['శుభోదయం', 'Shubhodayam'], tr: ['Günaydın', 'goon-eye-DUHN'], ta: ['காலை வணக்கம்', 'Kaalai Vanakkam'], vi: ['Chào buổi sáng', 'chow bwoy sahng']
    })
  },
  {
    id: 3, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Good afternoon', 'good af-ter-NOON'], zh: ['下午好', 'Xiàwǔ hǎo'], hi: ['शुभ दोपहर', 'Shubh Dopahar'], es: ['Buenas tardes', 'BWEH-nahs TAR-dehs'], fr: ['Bon après-midi', 'bohn ah-preh-mee-DEE'],
      ar: ['مساء الخير', 'Masa\' al-khayr'], bn: ['শুভ অপরাহ্ন', 'Shubho Oporahnho'], pt: ['Boa tarde', 'BOH-ah TAR-jee'], ru: ['Добрый день', 'DOH-bry dayn'], ur: ['دوپہر بخیر', 'Dopahar Bakhair'],
      id: ['Selamat siang', 'seh-LAH-maht SEE-ahng'], de: ['Guten Tag', 'GOO-ten TAHK'], ja: ['こんにちは', 'Konnichiwa'], pa: ['ਦੁਪਹਿਰ ਦੀ ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'Dupahir di Sat Sri Akal'], sw: ['Habari za mchana', 'hah-BAH-ree zah m-CHAH-nah'],
      mr: ['शुभ दुपार', 'Shubh Dupar'], te: ['శుభ మధ్యాహ్నం', 'Shubha Madhyahnam'], tr: ['Tünaydın / İyi günler', 'too-neye-DUHN'], ta: ['மதிய வணக்கம்', 'Madhiya Vanakkam'], vi: ['Chào buổi chiều', 'chow bwoy chee-ew']
    })
  },
  {
    id: 4, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Good evening', 'good EEV-ning'], zh: ['晚上好', 'Wǎnshang hǎo'], hi: ['शुभ संध्या', 'Shubh Sandhya'], es: ['Buenas noches', 'BWEH-nahs NOH-chehs'], fr: ['Bonsoir', 'bohn-SWAHR'],
      ar: ['مساء النور', 'Masa\' an-noor'], bn: ['শুভ সন্ধ্যা', 'Shubho Shondhya'], pt: ['Boa noite', 'BOH-ah NOY-chee'], ru: ['Добрый вечер', 'DOH-bry VYEH-cheer'], ur: ['شام بخیر', 'Shaam Bakhair'],
      id: ['Selamat sore / malam', 'seh-LAH-maht SOH-reh'], de: ['Guten Abend', 'GOO-ten AH-bent'], ja: ['こんばんは', 'Konbanwa'], pa: ['ਸ਼ਾਮ ਦੀ ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'Shaam di Sat Sri Akal'], sw: ['Habari za jioni', 'hah-BAH-ree zah jee-OH-nee'],
      mr: ['शुभ संध्याकाळ', 'Shubh Sandhyakal'], te: ['శుభ సాయంత్రం', 'Shubha Sayantram'], tr: ['İyi akşamlar', 'EE ahk-shahm-LAHR'], ta: ['மாலை வணக்கம்', 'Maalai Vanakkam'], vi: ['Chào buổi tối', 'chow bwoy toy']
    })
  },
  {
    id: 5, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Good night', 'good NYTE'], zh: ['晚安', 'Wǎn\'ān'], hi: ['शुभ रात्रि', 'Shubh Raatri'], es: ['Buenas noches', 'BWEH-nahs NOH-chehs'], fr: ['Bonne nuit', 'buhn NWEE'],
      ar: ['تصبح على خير', 'Tisbah \'ala khayr'], bn: ['শুভ রাত্রি', 'Shubho Raatri'], pt: ['Boa noite', 'BOH-ah NOY-chee'], ru: ['Спокойной ночи', 'spah-KOY-nuhy NOH-chee'], ur: ['شب بخیر', 'Shab Bakhair'],
      id: ['Selamat malam / tidur', 'seh-LAH-maht TEE-dur'], de: ['Gute Nacht', 'GOO-teh NAHKHT'], ja: ['おやすみなさい', 'Oyasuminasai'], pa: ['ਸ਼ੁਭ ਰਾਤ', 'Shubh Raat'], sw: ['Usiku mwema', 'oo-SEE-koo m-WEH-mah'],
      mr: ['शुभ रात्री', 'Shubh Ratri'], te: ['శుభ రాత్రి', 'Shubha Raatri'], tr: ['İyi geceler', 'EE geh-jeh-LEHR'], ta: ['இனிய இரவு', 'Iniya Iravu'], vi: ['Chúc ngủ ngon', 'chook ngoo ngon']
    })
  },
  {
    id: 6, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Goodbye / Bye', 'good-BYE'], zh: ['再见', 'Zàijiàn'], hi: ['अलविदा / फिर मिलेंगे', 'Alvida'], es: ['Adiós / Chao', 'ah-DYOHS'], fr: ['Au revoir', 'oh ruh-VWAHR'],
      ar: ['مع السلامة', 'Ma\'a as-salama'], bn: ['বিদায়', 'Biday'], pt: ['Adeus / Tchau', 'ah-DEH-oosh / chow'], ru: ['До свидания', 'duh svee-DAH-nyah'], ur: ['خدا حافظ / الوداع', 'Khuda Hafiz'],
      id: ['Selamat tinggal', 'seh-LAH-maht TEENG-gahl'], de: ['Auf Wiedersehen / Tschüss', 'owf VEE-der-zayn'], ja: ['さようなら', 'Sayounara'], pa: ['ਅਲਵਿਦਾ', 'Alvida'], sw: ['Kwaheri', 'kwah-HEH-ree'],
      mr: ['पुन्हा भेटू / अलविदा', 'Punha bhetu'], te: ['వీడ్కోలు / మళ్ళీ కలుద్దాం', 'Veedkolu'], tr: ['Hoşça kal', 'hosh-chah KAHL'], ta: ['பிரியாவிடை / வருகிறேன்', 'Piriyavidai'], vi: ['Tạm biệt', 'tahm bee-et']
    })
  },
  {
    id: 7, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['See you later', 'see yoo LAY-ter'], zh: ['一会儿见', 'Yīhuǐ\'er jiàn'], hi: ['बाद में मिलते हैं', 'Baad mein milte hain'], es: ['Hasta luego', 'AHS-tah LWEH-goh'], fr: ['À plus tard', 'ah plew TAHR'],
      ar: ['أراك لاحقاً', 'Araka lahiqan'], bn: ['পরে দেখা হবে', 'Pore dekha hobe'], pt: ['Até logo', 'ah-TEH LOH-goo'], ru: ['Увидимся позже', 'oo-VEE-deem-syah POHZ-zheh'], ur: ['بعد میں ملتے ہیں', 'Baad mein miltay hain'],
      id: ['Sampai jumpa nanti', 'SAHM-py JOOM-pah NAHN-tee'], de: ['Bis später', 'bis SHPAY-ter'], ja: ['また後で (またあとで)', 'Mata ato de'], pa: ['ਬਾਅਦ ਵਿੱਚ ਮਿਲਦੇ ਹਾਂ', 'Baad vich milde haan'], sw: ['Tutaonana baadaye', 'too-tah-oh-NAH-nah bah-dah-YEH'],
      mr: ['नंतर भेटू', 'Nantar bhetu'], te: ['తరువాత కలుద్దాం', 'Taruvaatha kaluddhaam'], tr: ['Sonra görüşürüz', 'sohn-RAH gur-yoo-shoo-ROOZ'], ta: ['பிறகு சந்திப்போம்', 'Piragu sandhippom'], vi: ['Hẹn gặp lại sau', 'hen gahp lye sow']
    })
  },
  {
    id: 8, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Please', 'PLEEZ'], zh: ['请', 'Qǐng'], hi: ['कृपया', 'Kripya'], es: ['Por favor', 'por fah-VOR'], fr: ['S\'il vous plaît', 'seel voo PLEH'],
      ar: ['من فضلك / رجاءً', 'Min fadlik / Raja\'an'], bn: ['দয়া করে', 'Doya kore'], pt: ['Por favor', 'poor fah-VOHR'], ru: ['Пожалуйста', 'pah-ZHAHL-stah'], ur: ['براہ کرم / پلیز', 'Barahe Karam'],
      id: ['Tolong / Silakan', 'TOH-long / see-lah-KAHN'], de: ['Bitte', 'BIT-teh'], ja: ['お願いします / どうぞ', 'Onegaishimasu'], pa: ['ਕਿਰਪਾ ਕਰਕੇ', 'Kripa karke'], sw: ['Tafadhali', 'tah-fah-DHAH-lee'],
      mr: ['कृपया', 'Krupaya'], te: ['దయచేసి', 'Dayachesi'], tr: ['Lütfen', 'LEWT-fehn'], ta: ['தயவுசெய்து', 'Dhayavuseidhu'], vi: ['Làm ơn', 'lahm uhn']
    })
  },
  {
    id: 9, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Thank you', 'THANK yoo'], zh: ['谢谢', 'Xièxie'], hi: ['धन्यवाद / शुक्रिया', 'Dhanyavaad / Shukriya'], es: ['Gracias', 'GRAH-syahs'], fr: ['Merci', 'mair-SEE'],
      ar: ['شكراً', 'Shukran'], bn: ['ধন্যবাদ', 'Dhonnobad'], pt: ['Obrigado / Obrigada', 'oh-bree-GAH-doo'], ru: ['Спасибо', 'spah-SEE-bah'], ur: ['شکریہ', 'Shukriya'],
      id: ['Terima kasih', 'teh-REE-mah KAH-see'], de: ['Danke', 'DAHN-keh'], ja: ['ありがとう', 'Arigatou'], pa: ['ਧੰਨਵਾਦ / ਸ਼ੁਕਰੀਆ', 'Dhanvaad'], sw: ['Asante', 'ah-SAHN-teh'],
      mr: ['धन्यवाद', 'Dhanyavaad'], te: ['ధన్యవాదాలు', 'Dhanyavaadaalu'], tr: ['Teşekkür ederim', 'teh-shek-KOOR eh-deh-reem'], ta: ['நன்றி', 'Nandri'], vi: ['Cảm ơn', 'kahm uhn']
    })
  },
  {
    id: 10, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Thank you very much', 'THANK yoo VEH-ree much'], zh: ['非常感谢', 'Fēicháng gǎnxiè'], hi: ['बहुत-बहुत धन्यवाद', 'Bahut bahut dhanyavaad'], es: ['Muchas gracias', 'MOO-chahs GRAH-syahs'], fr: ['Merci beaucoup', 'mair-SEE boh-KOO'],
      ar: ['شكراً جزيلاً', 'Shukran jazeelan'], bn: ['অনেক ধন্যবাদ', 'Onek dhonnobad'], pt: ['Muito obrigado', 'MWEE-too oh-bree-GAH-doo'], ru: ['Большое спасибо', 'bahl-SHOH-yeh spah-SEE-bah'], ur: ['بہت بہت شکریہ', 'Bohat bohat shukriya'],
      id: ['Terima kasih banyak', 'teh-REE-mah KAH-see BAHN-yahk'], de: ['Vielen Dank', 'FEE-len DAHNK'], ja: ['どうもありがとうございます', 'Doumo arigatou gozaimasu'], pa: ['ਬਹੁਤ ਬਹੁਤ ਧੰਨਵਾਦ', 'Bahut bahut dhanvaad'], sw: ['Asante sana', 'ah-SAHN-teh SAH-nah'],
      mr: ['खूप खूप धन्यवाद', 'Khoop khoop dhanyavaad'], te: ['చాలా ధన్యవాదాలు', 'Chaala dhanyavaadaalu'], tr: ['Çok teşekkürler', 'chohk teh-shek-koor-LEHR'], ta: ['மிக்க நன்றி', 'Mikka nandri'], vi: ['Cảm ơn rất nhiều', 'kahm uhn ruht nyew']
    })
  },
  {
    id: 11, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['You are welcome', 'yoo are WEL-kum'], zh: ['不客气', 'Bù kèqi'], hi: ['आपका स्वागत है', 'Aapka swagat hai'], es: ['De nada', 'deh NAH-dah'], fr: ['De rien / Je vous en prie', 'duh RYEHN'],
      ar: ['عفواً', '\'Afwan'], bn: ['আপনাকে স্বাগতম', 'Aponake shagotom'], pt: ['De nada', 'jee NAH-dah'], ru: ['Пожалуйста / Не за что', 'NYEH zah shtoh'], ur: ['خوش آمدید / کوئی بات نہیں', 'Khush Amdeed'],
      id: ['Sama-sama', 'SAH-mah SAH-mah'], de: ['Bitte schön / Gern geschehen', 'GERN geh-SHAY-en'], ja: ['どういたしまして', 'Douitashimashite'], pa: ['ਜੀ ਆਇਆਂ ਨੂੰ', 'Jee aayan nu'], sw: ['Karibu', 'kah-REE-boo'],
      mr: ['आपले स्वागत आहे', 'Aaple swagat aahe'], te: ['స్వాగతం', 'Swaagatam'], tr: ['Rica ederim', 'ree-JAH eh-deh-reem'], ta: ['வரவேற்கிறேன்', 'Varaverkirom'], vi: ['Không có gì', 'khong kaw zee']
    })
  },
  {
    id: 12, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Excuse me', 'ek-SKYOOZ mee'], zh: ['劳驾 / 不好意思', 'Láojià / Bùhǎoyìsi'], hi: ['माफ़ कीजिये', 'Maaf kijiye'], es: ['Disculpe / Perdón', 'dees-KOOL-peh'], fr: ['Excusez-moi / Pardon', 'ex-kew-ZAY MWAH'],
      ar: ['عذراً / المعذرة', '\'Uthran / Al-ma\'thirah'], bn: ['মাফ করবেন', 'Maaf korben'], pt: ['Com licença / Desculpe', 'kohn lee-SEHN-sah'], ru: ['Извините', 'eez-vee-NEE-tyeh'], ur: ['معاف کیجئے گا', 'Maaf kijiye ga'],
      id: ['Permisi', 'pehr-MEE-see'], de: ['Entschuldigung', 'ent-SHOOL-dee-goong'], ja: ['すみません', 'Sumimasen'], pa: ['ਮਾਫ਼ ਕਰਨਾ', 'Maaf karna'], sw: ['Samahani', 'sah-mah-HAH-nee'],
      mr: ['माफ करा', 'Maaf kara'], te: ['క్షమించండి', 'Kshaminchandi'], tr: ['Affedersiniz / Pardon', 'ahf-feh-DEHR-see-neez'], ta: ['மன்னிக்கவும்', 'Mannikkavum'], vi: ['Xin lỗi', 'sin loy']
    })
  },
  {
    id: 13, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Sorry / I am sorry', 'SOR-ee'], zh: ['对不起', 'Duìbuqǐ'], hi: ['मुझे खेद है / सॉरी', 'Mujhe khed hai'], es: ['Lo siento', 'loh SYEHN-toh'], fr: ['Désolé', 'day-zoh-LAY'],
      ar: ['آسف', 'Aasif'], bn: ['আমি দুঃখিত', 'Ami dukkhito'], pt: ['Desculpe / Sinto muito', 'SEEN-too MWEE-too'], ru: ['Простите', 'prahs-TEE-tyeh'], ur: ['معذرت خواہ ہوں / افسوس', 'Maazrat khwah hoon'],
      id: ['Maaf / Saya minta maaf', 'MAH-ahf'], de: ['Es tut mir leid', 'es toot meer LYTE'], ja: ['ごめんなさい', 'Gomennasai'], pa: ['ਮੈਨੂੰ ਅਫਸੋਸ ਹੈ', 'Mainu afsos hai'], sw: ['Pole', 'POH-leh'],
      mr: ['मला माफ करा', 'Mala maaf kara'], te: ['నన్ను క్షమించండి', 'Nannu kshaminchandi'], tr: ['Özür dilerim', 'ur-ZOOR dee-leh-REEM'], ta: ['என்னை மன்னியுங்கள்', 'Ennai manniyungal'], vi: ['Tôi xin lỗi', 'toy sin loy']
    })
  },
  {
    id: 14, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Yes', 'YES'], zh: ['是的', 'Shì de'], hi: ['हाँ', 'Haan'], es: ['Sí', 'SEE'], fr: ['Oui', 'WEE'],
      ar: ['نعم', 'Na\'am'], bn: ['হ্যাঁ', 'Hya'], pt: ['Sim', 'SEEN'], ru: ['Да', 'DAH'], ur: ['ہاں / جی ہاں', 'Jee haan'],
      id: ['Ya', 'YAH'], de: ['Ja', 'YAH'], ja: ['はい', 'Hai'], pa: ['ਹਾਂ', 'Haan'], sw: ['Ndiyo', 'n-DEE-yoh'],
      mr: ['होय', 'Hoy'], te: ['అవును', 'Avunu'], tr: ['Evet', 'eh-VEHT'], ta: ['ஆம்', 'Aam'], vi: ['Vâng / Có', 'vuhng']
    })
  },
  {
    id: 15, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['No', 'NOH'], zh: ['不是 / 不', 'Bù / Bù shì'], hi: ['नहीं', 'Nahin'], es: ['No', 'NOH'], fr: ['Non', 'NOHN'],
      ar: ['لا', 'Laa'], bn: ['না', 'Na'], pt: ['Não', 'NOWNG'], ru: ['Нет', 'NYEHT'], ur: ['نہیں / جی نہیں', 'Nahin'],
      id: ['Tidak', 'TEE-dahk'], de: ['Nein', 'NYNE'], ja: ['いいえ', 'Iie'], pa: ['ਨਹੀਂ', 'Nahin'], sw: ['Hapana', 'hah-PAH-nah'],
      mr: ['नाही', 'Naahi'], te: ['కాదు / లేదు', 'Kaadu'], tr: ['Hayır', 'hah-YUHR'], ta: ['இல்லை', 'Illai'], vi: ['Không', 'khawng']
    })
  },
  {
    id: 16, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Maybe / Perhaps', 'MAY-bee'], zh: ['也许 / 可能', 'Yěxǔ / Kěnéng'], hi: ['शायद', 'Shayad'], es: ['Tal vez / Quizás', 'tahl VEHS'], fr: ['Peut-être', 'puh-TEH-truh'],
      ar: ['ربما', 'Rubbama'], bn: ['হয়তো', 'Hoyto'], pt: ['Talvez', 'tahl-VEHZ'], ru: ['Может быть', 'MOH-zhet byt'], ur: ['شاید', 'Shayad'],
      id: ['Mungkin', 'MOONG-keen'], de: ['Vielleicht', 'fee-LYKHT'], ja: ['たぶん', 'Tabun'], pa: ['ਸ਼ਾਇਦ', 'Shayad'], sw: ['Labda', 'LAHB-dah'],
      mr: ['कदाचित', 'Kadachit'], te: ['బహుశా', 'Bahusha'], tr: ['Belki', 'behl-KEE'], ta: ['ஒருவேளை', 'Oruvelai'], vi: ['Có lẽ', 'kaw leh']
    })
  },
  {
    id: 17, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Okay / Alright', 'oh-KAY'], zh: ['好的', 'Hǎo de'], hi: ['ठीक है', 'Theek hai'], es: ['Está bien / De acuerdo', 'ehs-TAH BYEHN'], fr: ['D\'accord', 'dah-KOR'],
      ar: ['حسناً', 'Hasanan'], bn: ['ঠিক আছে', 'Thik ache'], pt: ['Está bem / Tudo bem', 'ehs-TAH baym'], ru: ['Хорошо / Ладно', 'khuh-rah-SHOH'], ur: ['ٹھیک ہے', 'Theek hai'],
      id: ['Baiklah / Oke', 'byk-LAH'], de: ['In Ordnung / Okay', 'in ORT-noong'], ja: ['わかりました / 大丈夫', 'Wakarimashita'], pa: ['ਠੀਕ ਹੈ', 'Theek hai'], sw: ['Sawa', 'SAH-wah'],
      mr: ['ठीक आहे', 'Theek aahe'], te: ['సరే', 'Sare'], tr: ['Tamam', 'tah-MAHM'], ta: ['சரி', 'Sari'], vi: ['Được rồi', 'dook roy']
    })
  },
  {
    id: 18, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Help!', 'HELP'], zh: ['救命！ / 帮忙', 'Jiùmìng!'], hi: ['मदद! / बचाओ!', 'Madad!'], es: ['¡Ayuda!', 'ah-YOO-dah'], fr: ['Au secours ! / Aide', 'oh suh-KOOR'],
      ar: ['النجدة! / ساعدني', 'An-najdah!'], bn: ['সাহায্য করুন!', 'Shahajjo korun!'], pt: ['Socorro! / Ajuda!', 'soo-KOH-hoo'], ru: ['Помогите!', 'pah-mah-GEE-tyeh'], ur: ['مدد! / بچاؤ!', 'Madad!'],
      id: ['Tolong!', 'TOH-long'], de: ['Hilfe!', 'HIL-feh'], ja: ['助けて！(たすけて)', 'Tasukete!'], pa: ['ਮਦਦ ਕਰੋ!', 'Madad karo!'], sw: ['Msaada!', 'm-SAH-ah-dah'],
      mr: ['मदत करा!', 'Madat kara!'], te: ['సహాయం చేయండి!', 'Sahaayam cheyandi!'], tr: ['İmdat! / Yardım edin!', 'eem-DAHT'], ta: ['உதவி!', 'Udhavi!'], vi: ['Cứu tôi với!', 'kew toy voy']
    })
  },
  {
    id: 19, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Welcome', 'WEL-kum'], zh: ['欢迎', 'Huānyíng'], hi: ['स्वागत', 'Swagat'], es: ['Bienvenido', 'byen-veh-NEE-doh'], fr: ['Bienvenue', 'byen-veh-NEW'],
      ar: ['أهلاً وسهلاً', 'Ahlan wa sahlan'], bn: ['স্বাগতম', 'Shagotom'], pt: ['Bem-vindo', 'baym VEEN-doo'], ru: ['Добро пожаловать', 'dah-BROH pah-ZHAH-lah-vaht'], ur: ['خوش آمدید', 'Khush Amdeed'],
      id: ['Selamat datang', 'seh-LAH-maht DAH-tahng'], de: ['Willkommen', 'vil-KOM-men'], ja: ['ようこそ', 'Youkoso'], pa: ['ਜੀ ਆਇਆਂ ਨੂੰ', 'Jee aayan nu'], sw: ['Karibu', 'kah-REE-boo'],
      mr: ['स्वागत असो', 'Swagat aso'], te: ['స్వాగతం', 'Swaagatam'], tr: ['Hoş geldiniz', 'hosh gehl-dee-NEEZ'], ta: ['நல்வரவு', 'Nalvaravu'], vi: ['Chào mừng', 'chow moong']
    })
  },
  {
    id: 20, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['How are you?', 'how are yoo'], zh: ['你好吗？', 'Nǐ hǎo ma?'], hi: ['आप कैसे हैं?', 'Aap kaise hain?'], es: ['¿Cómo estás?', 'KOH-moh ehs-TAHS'], fr: ['Comment allez-vous ?', 'koh-mahn tah-lay VOO'],
      ar: ['كيف حالك؟', 'Kayfa haluk?'], bn: ['আপনি কেমন আছেন?', 'Apni kemon achhen?'], pt: ['Como vai você?', 'KOH-moo vye voh-SEH'], ru: ['Как дела?', 'kahk dyeh-LAH'], ur: ['آپ کیسے ہیں؟', 'Aap kaisay hain?'],
      id: ['Apa kabar?', 'AH-pah KAH-bahr'], de: ['Wie geht es dir?', 'vee gayt es deer'], ja: ['お元気ですか？', 'Ogenki desu ka?'], pa: ['ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', 'Tusi kivein ho?'], sw: ['Habari gani?', 'hah-BAH-ree GAH-nee'],
      mr: ['तुम्ही कसे आहात?', 'Tumhi kase aahat?'], te: ['మీరు ఎలా ఉన్నారు?', 'Meeru ela unnaaru?'], tr: ['Nasılsınız?', 'nah-SUHL-suh-nuhz'], ta: ['எப்படி இருக்கிறீர்கள்?', 'Eppadi irukkeergal?'], vi: ['Bạn khỏe không?', 'bahn khweh khong']
    })
  },
  {
    id: 21, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['I am fine', 'eye am fyne'], zh: ['我很好', 'Wǒ hěn hǎo'], hi: ['मैं ठीक हूँ', 'Main theek hoon'], es: ['Estoy bien', 'ehs-TOY BYEHN'], fr: ['Je vais bien', 'zhuh vay BYEHN'],
      ar: ['أنا بخير', 'Ana bi-khayr'], bn: ['আমি ভালো আছি', 'Ami bhalo achi'], pt: ['Estou bem', 'ehs-TOH baym'], ru: ['Я в порядке / Хорошо', 'yah v pahr-YAHD-kyeh'], ur: ['میں ٹھیک ہوں', 'Main theek hoon'],
      id: ['Saya baik-baik saja', 'SAH-yah BYE-k'], de: ['Mir geht es gut', 'meer gayt es goot'], ja: ['元気です', 'Genki desu'], pa: ['ਮੈਂ ਠੀਕ ਹਾਂ', 'Main theek haan'], sw: ['Mimi ni mzima', 'MEE-mee nee m-ZEE-mah'],
      mr: ['मी ठीक आहे', 'Mee theek aahe'], te: ['నేను బాగున్నాను', 'Nenu baagunnaanu'], tr: ['İyiyim', 'ee-YEE-yeem'], ta: ['நான் நலமாக உள்ளேன்', 'Naan nalamaaga ullen'], vi: ['Tôi khỏe', 'toy khweh']
    })
  },
  {
    id: 22, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['What is your name?', 'wut iz yoor naym'], zh: ['你叫什么名字？', 'Nǐ jiào shénme míngzì?'], hi: ['आपका नाम क्या है?', 'Aapka naam kya hai?'], es: ['¿Cómo te llamas?', 'KOH-moh teh YAH-mahs'], fr: ['Comment vous appelez-vous ?', 'koh-mahn voo zah-play VOO'],
      ar: ['ما اسمك؟', 'Ma ismuk?'], bn: ['আপনার নাম কি?', 'Aponar nam ki?'], pt: ['Qual é o seu nome?', 'kwahl eh oo seh-oo NOH-mee'], ru: ['Как вас зовут?', 'kahk vahs zah-VOOT'], ur: ['آپ کا نام کیا ہے؟', 'Aap ka naam kya hai?'],
      id: ['Siapa nama Anda?', 'SYAH-pah NAH-mah AHN-dah'], de: ['Wie heißen Sie?', 'vee HY-sen zee'], ja: ['お名前は何ですか？', 'Onamae wa nan desu ka?'], pa: ['ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?', 'Tuhada naam ki hai?'], sw: ['Jina lako ni nani?', 'JEE-nah LAH-koh nee NAH-nee'],
      mr: ['तुमचे नाव काय आहे?', 'Tumche naav kaay aahe?'], te: ['మీ పేరు ఏమిటి?', 'Mee peru emiti?'], tr: ['Adınız ne?', 'ah-DUH-nuhz neh'], ta: ['உங்கள் பெயர் என்ன?', 'Ungal peyar enna?'], vi: ['Bạn tên là gì?', 'bahn ten lah zee']
    })
  },
  {
    id: 23, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['My name is...', 'mye naym iz'], zh: ['我的名字是……', 'Wǒ de míngzì shì...'], hi: ['मेरा नाम... है', 'Mera naam... hai'], es: ['Mi nombre es...', 'mee NOHM-breh ehs'], fr: ['Je m\'appelle...', 'zhuh mah-PEL'],
      ar: ['اسمي...', 'Ismee...'], bn: ['আমার নাম...', 'Amar nam...'], pt: ['Meu nome é...', 'meh-oo NOH-mee eh'], ru: ['Меня зовут...', 'mye-NYAH zah-VOOT'], ur: ['میرا نام ... ہے', 'Mera naam... hai'],
      id: ['Nama saya...', 'NAH-mah SAH-yah'], de: ['Mein Name ist...', 'myne NAH-meh ist'], ja: ['私の名前は…です', 'Watashi no namae wa... desu'], pa: ['ਮੇਰਾ ਨਾਮ... ਹੈ', 'Mera naam... hai'], sw: ['Jina langu ni...', 'JEE-nah LAHN-goo nee'],
      mr: ['माझे नाव... आहे', 'Maazhe naav... aahe'], te: ['నా పేరు...', 'Naa peru...'], tr: ['Benim adım...', 'beh-NEEM ah-DUHM'], ta: ['என் பெயர்...', 'En peyar...'], vi: ['Tên tôi là...', 'ten toy lah']
    })
  },
  {
    id: 24, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Nice to meet you', 'nyce too meet yoo'], zh: ['很高兴认识你', 'Hěn gāoxìng rènshí nǐ'], hi: ['आपसे मिलकर खुशी हुई', 'Aapse milkar khushi hui'], es: ['Mucho gusto / Encantado', 'MOO-choh GOOS-toh'], fr: ['Enchanté(e)', 'ahn-shahn-TAY'],
      ar: ['تشرفت بمعرفتك', 'Tasharraftu bi-ma\'rifatik'], bn: ['আপনার সাথে দেখা করে ভালো লাগলো', 'Aponar sathe dekha kore bhalo laglo'], pt: ['Prazer em conhecê-lo', 'prah-ZEHR aym kohn-yeh-SEH-loo'], ru: ['Приятно познакомиться', 'pree-YAHT-nuh pahz-nah-KOH-mee-tsah'], ur: ['آپ سے مل کر خوشی ہوئی', 'Aap se mil kar khushi hui'],
      id: ['Senang bertemu dengan Anda', 'seh-NAHNG behr-TEH-moo'], de: ['Freut mich / Schön Sie kennenzulernen', 'froy-t meesh'], ja: ['はじめまして', 'Hajimemashite'], pa: ['ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ', 'Tuhanu mil ke khushi hoi'], sw: ['Nimefurahi kukuona', 'nee-meh-foo-RAH-hee koo-koo-OH-nah'],
      mr: ['तुम्हाला भेटून आनंद झाला', 'Tumhala bhetun aanand zhaala'], te: ['మిమ్మల్ని కలవడం ఆనందంగా ఉంది', 'Mimmalni kalavadam aanandamga undi'], tr: ['Tanıştığımıza memnun oldum', 'tah-nuhsh-tuh-ur-muh-ZAH mehm-noon'], ta: ['உங்களை சந்தித்ததில் மகிழ்ச்சி', 'Ungalai sandhithadhil magizhchi'], vi: ['Rất vui được gặp bạn', 'ruht vooy dook gahp bahn']
    })
  },
  {
    id: 25, category: 'Greetings & Civility',
    translations: createTranslationMap({
      en: ['Cheers / Good health', 'CHEERZ'], zh: ['干杯 / 祝你健康', 'Gānbēi'], hi: ['चीयर्स / आपके स्वास्थ्य के लिए', 'Cheers'], es: ['¡Salud!', 'sah-LOOD'], fr: ['Santé ! / À votre santé', 'sahn-TAY'],
      ar: ['في صحتك / بالصحة', 'Fee sihtak'], bn: ['চিয়ার্স / সুস্বাস্থ্য কামনা', 'Cheers'], pt: ['Saúde!', 'sah-OO-jee'], ru: ['За ваше здоровье!', 'zah VAH-sheh zdah-ROHV-yeh'], ur: ['صحت اور خوشی کے لیے', 'Sehat aur khushi ke liye'],
      id: ['Bersulang / Untuk kesehatan', 'behr-SOO-lahng'], de: ['Prost / Zum Wohl', 'PROHST'], ja: ['乾杯 (かんぱい)', 'Kanpai'], pa: ['ਚੀਅਰਸ / ਸਿਹਤ ਲਈ', 'Cheers'], sw: ['Afya njema', 'AHF-yah n-JEH-mah'],
      mr: ['चीअर्स / आरोग्यासाठी', 'Cheers'], te: ['చీర్స్ / మీ ఆరోగ్యానికి', 'Cheers'], tr: ['Şerefe!', 'sheh-reh-FEH'], ta: ['வாழ்த்துகள்', 'Vaazhthukal'], vi: ['Chúc sức khỏe / Cạn ly', 'chook sook khweh']
    })
  }
];

module.exports = { VOCAB_BATCH_0 };
