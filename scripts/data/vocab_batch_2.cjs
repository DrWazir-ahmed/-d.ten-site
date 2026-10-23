const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_2 = [
  // ─────────────────────────────────────────────────────────────
  // 4. TIME & CALENDAR (71 - 100)
  // ─────────────────────────────────────────────────────────────
  {
    id: 71, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Time', 'TYME'], zh: ['时间', 'Shíjiān'], hi: ['समय / वक़्त', 'Samay / Waqt'], es: ['Tiempo / Hora', 'TYEHM-poh'], fr: ['Temps / Heure', 'TAHN'],
      ar: ['وقت / زمن', 'Waqt / Zaman'], bn: ['সময়', 'Shomoy'], pt: ['Tempo / Hora', 'TAYM-poo'], ru: ['Время', 'VRYEH-myah'], ur: ['وقت / زمانہ', 'Waqt'],
      id: ['Waktu / Jam', 'WAHK-too'], de: ['Zeit', 'TSYTE'], ja: ['時間 (じかん)', 'Jikan'], pa: ['ਸਮਾਂ / ਵਕਤ', 'Samaan / Vakat'], sw: ['Wakati / Saa', 'wah-KAH-tee'],
      mr: ['वेळ', 'Vel'], te: ['సమయం / కాలం', 'Samayam'], tr: ['Zaman / Vakit', 'zah-MAHN'], ta: ['நேரம் / காலம்', 'Neram'], vi: ['Thời gian', 'teree zahn']
    })
  },
  {
    id: 72, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Day', 'DAY'], zh: ['天 / 日', 'Tiān / Rì'], hi: ['दिन', 'Din'], es: ['Día', 'DEE-ah'], fr: ['Jour', 'ZHOOR'],
      ar: ['يوم', 'Yawm'], bn: ['দিন', 'Din'], pt: ['Dia', 'DEE-ah'], ru: ['День', 'DYEN'], ur: ['دن', 'Din'],
      id: ['Hari', 'HAH-ree'], de: ['Tag', 'TAHK'], ja: ['日 (ひ / にち)', 'Hi / Nichi'], pa: ['ਦਿਨ', 'Din'], sw: ['Siku', 'SEE-koo'],
      mr: ['दिवस', 'Divas'], te: ['రోజు / దినం', 'Roju'], tr: ['Gün', 'GOON'], ta: ['நாள்', 'Naal'], vi: ['Ngày', 'nye']
    })
  },
  {
    id: 73, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Night', 'NYTE'], zh: ['夜 / 晚上', 'Yè / Wǎnshang'], hi: ['रात', 'Raat'], es: ['Noche', 'NOH-cheh'], fr: ['Nuit', 'NWEE'],
      ar: ['ليل / ليلة', 'Layl / Layla'], bn: ['রাত / রাত্রি', 'Raat'], pt: ['Noite', 'NOY-chee'], ru: ['Ночь', 'NOCH'], ur: ['رات / شب', 'Raat'],
      id: ['Malam', 'MAH-lahm'], de: ['Nacht', 'NAHKHT'], ja: ['夜 (よる)', 'Yoru'], pa: ['ਰਾਤ', 'Raat'], sw: ['Usiku', 'oo-SEE-koo'],
      mr: ['रात्र', 'Ratra'], te: ['రాత్రి', 'Raatri'], tr: ['Gece', 'geh-JEH'], ta: ['இரவு', 'Iravu'], vi: ['Đêm', 'dehm']
    })
  },
  {
    id: 74, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Today', 'tuh-DAY'], zh: ['今天', 'Jīntiān'], hi: ['आज', 'Aaj'], es: ['Hoy', 'OY'], fr: ['Aujourd\'hui', 'oh-zhoor-DWEE'],
      ar: ['اليوم', 'Al-yawm'], bn: ['আজ', 'Aaj'], pt: ['Hoje', 'OH-zhee'], ru: ['Сегодня', 'sye-VOHD-nyah'], ur: ['آج', 'Aaj'],
      id: ['Hari ini', 'HAH-ree EE-nee'], de: ['Heute', 'HOY-teh'], ja: ['今日 (きょう)', 'Kyou'], pa: ['ਅੱਜ', 'Ajj'], sw: ['Leo', 'LEH-oh'],
      mr: ['आज', 'Aaj'], te: ['ఈ రోజు', 'Ee roju'], tr: ['Bugün', 'boo-GOON'], ta: ['இன்று', 'Indru'], vi: ['Hôm nay', 'hohm nye']
    })
  },
  {
    id: 75, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Tomorrow', 'tuh-MOR-oh'], zh: ['明天', 'Míngtiān'], hi: ['कल (आने वाला)', 'Kal'], es: ['Mañana', 'mah-NYAH-nah'], fr: ['Demain', 'duh-MAN'],
      ar: ['غداً', 'Ghadan'], bn: ['আগামীকাল', 'Agameekaal'], pt: ['Amanhã', 'ah-mahn-YAHNG'], ru: ['Завтра', 'ZAHF-trah'], ur: ['کل (آنے والا)', 'Kal'],
      id: ['Besok', 'BAY-sohk'], de: ['Morgen', 'MOR-gen'], ja: ['明日 (あした)', 'Ashita'], pa: ['ਭਲਕੇ / ਕੱਲ੍ਹ', 'Kalh'], sw: ['Kesho', 'KEH-shoh'],
      mr: ['उद्या', 'Udya'], te: ['రేపు', 'Repu'], tr: ['Yarın', 'yah-RUHN'], ta: ['நாளை', 'Naalai'], vi: ['Ngày mai', 'nye my']
    })
  },
  {
    id: 76, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Yesterday', 'YES-ter-day'], zh: ['昨天', 'Zuótiān'], hi: ['कल (बीता हुआ)', 'Kal'], es: ['Ayer', 'ah-YAIR'], fr: ['Hier', 'YAIR'],
      ar: ['أمس / البارحة', 'Ams / Al-bariha'], bn: ['গতকাল', 'Gotokaal'], pt: ['Ontem', 'OHN-tayn'], ru: ['Вчера', 'vcheh-RAH'], ur: ['کل (گزرا ہوا)', 'Kal'],
      id: ['Kemarin', 'kuh-MAH-reen'], de: ['Gestern', 'GES-tern'], ja: ['昨日 (きのう)', 'Kinou'], pa: ['ਕੱਲ੍ਹ (ਬੀਤਿਆ)', 'Kalh'], sw: ['Jana', 'JAH-nah'],
      mr: ['काल', 'Kaal'], te: ['నిన్న', 'Ninna'], tr: ['Dün', 'DOON'], ta: ['நேற்று', 'Netru'], vi: ['Hôm qua', 'hohm kwah']
    })
  },
  {
    id: 77, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Week', 'WEEK'], zh: ['周 / 星期', 'Zhōu / Xīngqī'], hi: ['सप्ताह / हफ़्ता', 'Saptah / Hafta'], es: ['Semana', 'seh-MAH-nah'], fr: ['Semaine', 'suh-MEHN'],
      ar: ['أسبوع', 'Usboo\''], bn: ['সপ্তাহ', 'Shoptaho'], pt: ['Semana', 'seh-MAH-nah'], ru: ['Неделя', 'nye-DYEH-lyah'], ur: ['ہفتہ', 'Haftah'],
      id: ['Minggu / Pekan', 'MEENG-goo'], de: ['Woche', 'VOKH-eh'], ja: ['週 (しゅう)', 'Shuu'], pa: ['ਹਫ਼ਤਾ', 'Hafta'], sw: ['Wiki', 'WEE-kee'],
      mr: ['आठवडा', 'Aathavada'], te: ['వారం', 'Vaaram'], tr: ['Hafta', 'hahf-TAH'], ta: ['வாரம்', 'Vaaram'], vi: ['Tuần', 'twuhn']
    })
  },
  {
    id: 78, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Month', 'MUNTH'], zh: ['月', 'Yuè'], hi: ['महीना / माह', 'Mahina'], es: ['Mes', 'MEHS'], fr: ['Mois', 'MWAH'],
      ar: ['شهر', 'Shahr'], bn: ['মাস', 'Mash'], pt: ['Mês', 'MAYSH'], ru: ['Месяц', 'MYEH-syats'], ur: ['مہینہ / ماہ', 'Mahina'],
      id: ['Bulan', 'BOO-lahn'], de: ['Monat', 'MOH-naht'], ja: ['月 (つき / がつ)', 'Tsuki'], pa: ['ਮਹੀਨਾ', 'Mahina'], sw: ['Mwezi', 'MWEH-zee'],
      mr: ['महिना', 'Mahina'], te: ['నెల', 'Nela'], tr: ['Ay', 'EYE'], ta: ['மாதம்', 'Maadham'], vi: ['Tháng', 'tahng']
    })
  },
  {
    id: 79, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Year', 'YEER'], zh: ['年', 'Nián'], hi: ['वर्ष / साल', 'Varsh / Saal'], es: ['Año', 'AH-nyoh'], fr: ['An / Année', 'AHN'],
      ar: ['سنة / عام', 'Sana / Aam'], bn: ['বছর', 'Bochhor'], pt: ['Ano', 'AH-noo'], ru: ['Год', 'GOHT'], ur: ['سال / برس', 'Saal'],
      id: ['Tahun', 'TAH-hoon'], de: ['Jahr', 'YAHR'], ja: ['年 (とし / ねん)', 'Toshi'], pa: ['ਸਾਲ', 'Saal'], sw: ['Mwaka', 'MWAH-kah'],
      mr: ['वर्ष', 'Varsha'], te: ['సంవత్సరం', 'Samvathsaram'], tr: ['Yıl / Sene', 'YUHL'], ta: ['ஆண்டு / வருடம்', 'Aandu'], vi: ['Năm', 'nuhm']
    })
  },
  {
    id: 80, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Hour', 'OW-er'], zh: ['小时', 'Xiǎoshí'], hi: ['घंटा', 'Ghanta'], es: ['Hora', 'OH-rah'], fr: ['Heure', 'UHR'],
      ar: ['ساعة', 'Saa\'a'], bn: ['ঘণ্টা', 'Ghonta'], pt: ['Hora', 'OH-rah'], ru: ['Час', 'CHAHS'], ur: ['گھنٹہ', 'Ghanta'],
      id: ['Jam', 'JAHM'], de: ['Stunde', 'SHTOON-deh'], ja: ['時間 (じかん)', 'Jikan'], pa: ['ਘੰਟਾ', 'Ghanta'], sw: ['Saa', 'SAH-ah'],
      mr: ['तास', 'Taas'], te: ['గంట', 'Ganta'], tr: ['Saat', 'sah-AHT'], ta: ['மணி / மணிநேரம்', 'Mani'], vi: ['Giờ / Tiếng', 'zer']
    })
  },
  {
    id: 81, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Minute', 'MIN-it'], zh: ['分钟', 'Fēnzhōng'], hi: ['मिनट', 'Minute'], es: ['Minuto', 'mee-NOO-toh'], fr: ['Minute', 'mee-NEWT'],
      ar: ['دقيقة', 'Daqeeqa'], bn: ['মিনিট', 'Minute'], pt: ['Minuto', 'mee-NOO-too'], ru: ['Минута', 'mee-NOO-tah'], ur: ['منٹ', 'Minute'],
      id: ['Menit', 'muh-NEET'], de: ['Minute', 'mee-NOO-teh'], ja: ['分 (ふん)', 'Fun'], pa: ['ਮਿੰਟ', 'Minute'], sw: ['Dakika', 'dah-KEE-kah'],
      mr: ['मिनिट', 'Minit'], te: ['నిమిషం', 'Nimisham'], tr: ['Dakika', 'dah-kee-KAH'], ta: ['நிமிடம்', 'Nimidam'], vi: ['Phút', 'foot']
    })
  },
  {
    id: 82, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Morning', 'MOR-ning'], zh: ['早晨 / 上午', 'Zǎochén'], hi: ['सुबह / प्रातः', 'Subah'], es: ['Mañana', 'mah-NYAH-nah'], fr: ['Matin', 'mah-TAN'],
      ar: ['صباح', 'Sabah'], bn: ['সকাল', 'Shokal'], pt: ['Manhã', 'mahn-YAHNG'], ru: ['Утро', 'OO-trah'], ur: ['صبح', 'Subah'],
      id: ['Pagi', 'PAH-gee'], de: ['Morgen', 'MOR-gen'], ja: ['朝 (あさ)', 'Asa'], pa: ['ਸਵੇਰ', 'Saver'], sw: ['Asubuhi', 'ah-soo-BOO-hee'],
      mr: ['सकाळ', 'Sakal'], te: ['ఉదయం', 'Udayam'], tr: ['Sabah', 'sah-BAH'], ta: ['காலை', 'Kaalai'], vi: ['Buổi sáng', 'bwoy sahng']
    })
  },
  {
    id: 83, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Afternoon', 'AF-ter-noon'], zh: ['下午', 'Xiàwǔ'], hi: ['दोपहर', 'Dopahar'], es: ['Tarde', 'TAR-deh'], fr: ['Après-midi', 'ah-preh-mee-DEE'],
      ar: ['بعد الظهر', 'Ba\'d az-zuhr'], bn: ['দুপুর / বিকেল', 'Dupur'], pt: ['Tarde', 'TAR-jee'], ru: ['День / После полудня', 'DYEN'], ur: ['دوپہر / بعد دوپہر', 'Dopahar'],
      id: ['Siang / Sore', 'SEE-ahng'], de: ['Nachmittag', 'NAHKH-mit-tahk'], ja: ['午後 / 昼', 'Gogo / Hiru'], pa: ['ਦੁਪਹਿਰ', 'Dupahar'], sw: ['Mchana', 'm-CHAH-nah'],
      mr: ['दुपार', 'Dupaar'], te: ['మధ్యాహ్నం', 'Madhyaahnam'], tr: ['Öğleden sonra', 'oh-leh-DEN'], ta: ['பிற்பகல்', 'Pirpagal'], vi: ['Buổi chiều', 'bwoy chee-ew']
    })
  },
  {
    id: 84, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Evening', 'EEV-ning'], zh: ['傍晚 / 晚上', 'Bàngwǎn'], hi: ['शाम / सांध्य', 'Shaam'], es: ['Tarde / Noche', 'TAR-deh'], fr: ['Soir / Soirée', 'SWAHR'],
      ar: ['مساء', 'Masa\''], bn: ['সন্ধ্যা', 'Shondhya'], pt: ['Noite / Fim de tarde', 'NOY-chee'], ru: ['Вечер', 'VYEH-chyer'], ur: ['شام', 'Shaam'],
      id: ['Sore / Petang', 'SOH-ray'], de: ['Abend', 'AH-bent'], ja: ['夕方 / 晩', 'Yuugata / Ban'], pa: ['ਸ਼ਾਮ / ਤ੍ਰਿਕਾਲਾਂ', 'Shaam'], sw: ['Jioni', 'jee-OH-nee'],
      mr: ['संध्याकाळ', 'Sandhyakal'], te: ['సాయంత్రం', 'Saayantram'], tr: ['Akşam', 'ahk-SHAHM'], ta: ['மாலை', 'Maalai'], vi: ['Buổi tối', 'bwoy toy']
    })
  },
  {
    id: 85, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Now', 'NOW'], zh: ['现在', 'Xiànzài'], hi: ['अब / अभी', 'Ab / Abhi'], es: ['Ahora', 'ah-OH-rah'], fr: ['Maintenant', 'man-tuh-NAHN'],
      ar: ['الآن', 'Al-aan'], bn: ['এখন', 'Ekhon'], pt: ['Agora', 'ah-GOH-rah'], ru: ['Сейчас', 'see-CHAHS'], ur: ['اب / ابھی', 'Ab / Abhi'],
      id: ['Sekarang', 'suh-KAH-rahng'], de: ['Jetzt', 'YETST'], ja: ['今 (いま)', 'Ima'], pa: ['ਹੁਣ', 'Hun'], sw: ['Sasa', 'SAH-sah'],
      mr: ['आता', 'Aata'], te: ['ఇప్పుడు', 'Ippudu'], tr: ['Şimdi', 'sheem-DEE'], ta: ['இப்போது', 'Ippodhu'], vi: ['Bây giờ', 'bye zer']
    })
  },
  {
    id: 86, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Later', 'LAY-ter'], zh: ['稍后 / 以后', 'Shāohòu'], hi: ['बाद में', 'Baad mein'], es: ['Más tarde / Luego', 'MAHS TAR-deh'], fr: ['Plus tard', 'plew TAHR'],
      ar: ['لاحقاً / بعدين', 'Lahiqan'], bn: ['পরে', 'Pore'], pt: ['Mais tarde', 'MYSH TAR-jee'], ru: ['Позже', 'POHZ-zheh'], ur: ['بعد میں', 'Baad mein'],
      id: ['Nanti', 'NAHN-tee'], de: ['Später', 'SHPAY-ter'], ja: ['後で (あとで)', 'Ato de'], pa: ['ਬਾਅਦ ਵਿੱਚ', 'Baad vich'], sw: ['Baadaye', 'bah-dah-YEH'],
      mr: ['नंतर', 'Nantar'], te: ['తరువాత', 'Taruvaatha'], tr: ['Daha sonra', 'dah-HAH sohn-RAH'], ta: ['பிறகு', 'Piragu'], vi: ['Sau này / Lát nữa', 'sow nye']
    })
  },
  {
    id: 87, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Always', 'AWL-wayz'], zh: ['总是 / 永远', 'Zǒngshì'], hi: ['हमेशा / सदा', 'Hamesha / Sada'], es: ['Siempre', 'SYEHM-preh'], fr: ['Toujours', 'too-ZHOOR'],
      ar: ['دائماً', 'Da\'iman'], bn: ['সবসময়', 'Shobshomoy'], pt: ['Sempre', 'SEHM-pree'], ru: ['Всегда', 'fsyehg-DAH'], ur: ['ہمیشہ / سدا', 'Hamesha'],
      id: ['Selalu', 'suh-LAH-loo'], de: ['Immer', 'IM-mer'], ja: ['いつも', 'Itsumo'], pa: ['ਹਮੇਸ਼ਾ', 'Hamesha'], sw: ['Daima', 'dah-EE-mah'],
      mr: ['नेहमी / सदैव', 'Nehami'], te: ['ఎల్లప్పుడూ', 'Ellappudu'], tr: ['Her zaman / Daima', 'HEHR'], ta: ['எப்போதும்', 'Eppodhum'], vi: ['Luôn luôn', 'loo-on loo-on']
    })
  },
  {
    id: 88, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Never', 'NEV-er'], zh: ['从不 / 决不', 'Cóngbù'], hi: ['कभी नहीं', 'Kabhi nahi'], es: ['Nunca / Jamás', 'NOON-kah'], fr: ['Jamais', 'zhah-MEH'],
      ar: ['أبداً', 'Abadan'], bn: ['কখনও না', 'Kokhono na'], pt: ['Nunca / Jamais', 'NOON-kah'], ru: ['Никогда', 'nee-kahg-DAH'], ur: ['کبھی نہیں', 'Kabhi nahi'],
      id: ['Tidak pernah', 'PAIR-nah'], de: ['Nie / Niemals', 'NEE'], ja: ['決して〜ない', 'Kesshite...nai'], pa: ['ਕਦੇ ਨਹੀਂ', 'Kade nahi'], sw: ['Kamwe', 'KAHM-weh'],
      mr: ['कधीच नाही', 'Kadhich nahi'], te: ['ఎప్పుడూ లేదు', 'Eppudu ledu'], tr: ['Asla / Hiçbir zaman', 'ahs-LAH'], ta: ['ஒருபோதும் இல்லை', 'Orubodhum'], vi: ['Không bao giờ', 'khong bow zer']
    })
  },
  {
    id: 89, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Sunday', 'SUN-day'], zh: ['星期天 / 周日', 'Xīngqītiān'], hi: ['रविवार / इतवार', 'Ravivaar'], es: ['Domingo', 'doh-MEEN-goh'], fr: ['Dimanche', 'dee-MAHNSH'],
      ar: ['الأحد', 'Al-ahad'], bn: ['রবিবার', 'Robibaar'], pt: ['Domingo', 'doo-MEEN-goo'], ru: ['Воскресенье', 'vah-skryeh-SYEN-yeh'], ur: ['اتوار', 'Itwaar'],
      id: ['Minggu', 'MEENG-goo'], de: ['Sonntag', 'ZON-tahk'], ja: ['日曜日', 'Nichiyoubi'], pa: ['ਐਤਵਾਰ', 'Aitvaar'], sw: ['Jumapili', 'joo-mah-PEE-lee'],
      mr: ['रविवार', 'Ravivaar'], te: ['ఆదివారం', 'Aadivaaram'], tr: ['Pazar', 'pah-ZAHR'], ta: ['ஞாயிறு', 'Gnaayiru'], vi: ['Chủ nhật', 'choo nyuht']
    })
  },
  {
    id: 90, category: 'Time & Calendar',
    translations: createTranslationMap({
      en: ['Monday', 'MUN-day'], zh: ['星期一', 'Xīngqīyī'], hi: ['सोमवार', 'Somvaar'], es: ['Lunes', 'LOO-nes'], fr: ['Lundi', 'luhn-DEE'],
      ar: ['الإثنين', 'Al-ithnayn'], bn: ['সোমবার', 'Shombaar'], pt: ['Segunda-feira', 'seh-GOON-dah'], ru: ['Понедельник', 'pah-nye-DYEHL-neek'], ur: ['پیر / سوموار', 'Peer / Somwaar'],
      id: ['Senin', 'suh-NEEN'], de: ['Montag', 'MOHN-tahk'], ja: ['月曜日', 'Getsuyoubi'], pa: ['ਸੋਮਵਾਰ', 'Somvaar'], sw: ['Jumatatu', 'joo-mah-TAH-too'],
      mr: ['सोमवार', 'Somvaar'], te: ['సోమవారం', 'Somavaaram'], tr: ['Pazartesi', 'pah-zahr-teh-SEE'], ta: ['திங்கள்', 'Thingal'], vi: ['Thứ hai', 'too hye']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 5. FOOD & DINING (91 - 125)
  // ─────────────────────────────────────────────────────────────
  {
    id: 91, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Water', 'WAW-ter'], zh: ['水', 'Shuǐ'], hi: ['पानी / जल', 'Paani / Jal'], es: ['Agua', 'AH-gwah'], fr: ['Eau', 'OH'],
      ar: ['ماء', 'Maa\''], bn: ['জল / পানি', 'Jol / Pani'], pt: ['Água', 'AH-gwah'], ru: ['Вода', 'vah-DAH'], ur: ['پانی', 'Paani'],
      id: ['Air', 'AH-yeer'], de: ['Wasser', 'VAHS-ser'], ja: ['水 (みず)', 'Mizu'], pa: ['ਪਾਣੀ', 'Paani'], sw: ['Maji', 'MAH-jee'],
      mr: ['पाणी', 'Paani'], te: ['నీరు / నీళ్లు', 'Neeru'], tr: ['Su', 'SOO'], ta: ['தண்ணீர்', 'Thanneer'], vi: ['Nước', 'nook']
    })
  },
  {
    id: 92, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Bread', 'BRED'], zh: ['面包', 'Miànbāo'], hi: ['रोटी / ब्रेड', 'Roti / Bread'], es: ['Pan', 'PAHN'], fr: ['Pain', 'PAN'],
      ar: ['خبز', 'Khubz'], bn: ['রুটি', 'Ruti'], pt: ['Pão', 'POWNG'], ru: ['Хлеб', 'KHLYEHP'], ur: ['روٹی / ڈبل روٹی', 'Roti'],
      id: ['Roti', 'ROH-tee'], de: ['Brot', 'BROHT'], ja: ['パン', 'Pan'], pa: ['ਰੋਟੀ / ਬਰੈੱਡ', 'Roti'], sw: ['Mkate', 'm-KAH-teh'],
      mr: ['पाव / पोळी', 'Paav / Poli'], te: ['రొట్టె / బ్రెడ్', 'Rotte'], tr: ['Ekmek', 'ek-MEHK'], ta: ['ரொட்டி', 'Rotti'], vi: ['Bánh mì', 'bahn mee']
    })
  },
  {
    id: 93, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Rice', 'RYCE'], zh: ['米饭 / 米', 'Mǐfàn'], hi: ['चावल', 'Chawal'], es: ['Arroz', 'ah-ROHS'], fr: ['Riz', 'REE'],
      ar: ['أرز', 'Aruzz'], bn: ['ভাত / চাল', 'Bhaat'], pt: ['Arroz', 'ah-ROHZ'], ru: ['Рис', 'REES'], ur: ['چاول', 'Chawal'],
      id: ['Nasi / Beras', 'NAH-see'], de: ['Reis', 'RYSE'], ja: ['ご飯 / 米', 'Gohan / Kome'], pa: ['ਚੌਲ', 'Chaul'], sw: ['Wali / Mchele', 'WAH-lee'],
      mr: ['भात / तांदूळ', 'Bhaat'], te: ['అన్నం / బియ్యం', 'Annam'], tr: ['Pirinç / Pilav', 'pee-REENCH'], ta: ['அரிசி / சாதம்', 'Arisi / Saadham'], vi: ['Cơm / Gạo', 'curm']
    })
  },
  {
    id: 94, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Milk', 'MILK'], zh: ['牛奶', 'Niúnǎi'], hi: ['दूध', 'Doodh'], es: ['Leche', 'LEH-cheh'], fr: ['Lait', 'LEH'],
      ar: ['حليب', 'Haleeb'], bn: ['দুধ', 'Dudh'], pt: ['Leite', 'LAY-chee'], ru: ['Молоко', 'mah-lah-KOH'], ur: ['دودھ', 'Doodh'],
      id: ['Susu', 'SOO-soo'], de: ['Milch', 'MILKH'], ja: ['牛乳 / ミルク', 'Gyuunyuu'], pa: ['ਦੁੱਧ', 'Duddh'], sw: ['Maziwa', 'mah-ZEE-wah'],
      mr: ['दूध', 'Doodh'], te: ['పాలు', 'Paalu'], tr: ['Süt', 'SOOT'], ta: ['பால்', 'Paal'], vi: ['Sữa', 'soo-uh']
    })
  },
  {
    id: 95, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Tea', 'TEE'], zh: ['茶', 'Chá'], hi: ['चाय', 'Chai'], es: ['Té', 'TEH'], fr: ['Thé', 'TAY'],
      ar: ['شاي', 'Shaay'], bn: ['চা', 'Cha'], pt: ['Chá', 'SHAH'], ru: ['Чай', 'CHY'], ur: ['چائے', 'Chai'],
      id: ['Teh', 'TEH'], de: ['Tee', 'TAY'], ja: ['お茶 (おちゃ)', 'Ocha'], pa: ['ਚਾਹ', 'Chaah'], sw: ['Chai', 'CHAH-ee'],
      mr: ['चहा', 'Chaha'], te: ['టీ / తేనీరు', 'Tea'], tr: ['Çay', 'CHY'], ta: ['தேநீர்', 'Theneer'], vi: ['Trà', 'chah']
    })
  },
  {
    id: 96, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Coffee', 'KAWF-ee'], zh: ['咖啡', 'Kāfēi'], hi: ['कॉफ़ी', 'Coffee'], es: ['Café', 'kah-FEH'], fr: ['Café', 'kah-FAY'],
      ar: ['قهوة', 'Qahwah'], bn: ['কফি', 'Coffee'], pt: ['Café', 'kah-FEH'], ru: ['Кофе', 'KOH-fyeh'], ur: ['کافی', 'Coffee'],
      id: ['Kopi', 'KOH-pee'], de: ['Kaffee', 'KAH-fay'], ja: ['コーヒー', 'Koohii'], pa: ['ਕੌਫੀ', 'Coffee'], sw: ['Kahawa', 'kah-HAH-wah'],
      mr: ['कॉफी', 'Coffee'], te: ['కాఫీ', 'Coffee'], tr: ['Kahve', 'kah-VEH'], ta: ['காபி', 'Kaapi'], vi: ['Cà phê', 'cah feh']
    })
  },
  {
    id: 97, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Fruit', 'FROOT'], zh: ['水果', 'Shuǐguǒ'], hi: ['फल', 'Phal'], es: ['Fruta', 'FROO-tah'], fr: ['Fruit', 'FRWEE'],
      ar: ['فاكهة', 'Fakiha'], bn: ['ফল', 'Phol'], pt: ['Fruta', 'FROO-tah'], ru: ['Фрукт', 'FROOKT'], ur: ['پھل', 'Phal'],
      id: ['Buah', 'BOO-ah'], de: ['Obst / Frucht', 'OHBST'], ja: ['果物 (くだもの)', 'Kudamono'], pa: ['ਫਲ', 'Phal'], sw: ['Tunda', 'TOON-dah'],
      mr: ['फळ', 'Phal'], te: ['పండు', 'Pandu'], tr: ['Meyve', 'mey-VEH'], ta: ['பழம்', 'Pazham'], vi: ['Trái cây / Hoa quả', 'chye kye']
    })
  },
  {
    id: 98, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Vegetable', 'VEJ-tuh-bul'], zh: ['蔬菜', 'Shūcài'], hi: ['सब्ज़ी', 'Sabzi'], es: ['Verdura / Vegetal', 'vair-DOO-rah'], fr: ['Légume', 'lay-GEWM'],
      ar: ['خضار / خضروات', 'Khudar'], bn: ['সবজি', 'Shobji'], pt: ['Legume / Verdura', 'leh-GOO-mee'], ru: ['Овощ', 'OH-vahshch'], ur: ['سبزی', 'Sabzi'],
      id: ['Sayur', 'SAH-yoor'], de: ['Gemüse', 'geh-MEW-zeh'], ja: ['野菜 (やさい)', 'Yasai'], pa: ['ਸਬਜ਼ੀ', 'Sabzi'], sw: ['Gulay / Mboga', 'm-BOH-gah'],
      mr: ['भाजी', 'Bhaji'], te: ['కూరగాయ', 'Kooragaaya'], tr: ['Sebze', 'seb-ZEH'], ta: ['காய்கறி', 'Kaaikari'], vi: ['Rau củ', 'zow koo']
    })
  },
  {
    id: 99, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Meat', 'MEET'], zh: ['肉', 'Ròu'], hi: ['माँस / गोश्त', 'Maans / Gosht'], es: ['Carne', 'KAR-neh'], fr: ['Viande', 'VYAHND'],
      ar: ['لحم', 'Lahm'], bn: ['মাংস', 'Mangsho'], pt: ['Carne', 'KAR-nee'], ru: ['Мясо', 'MYAH-sah'], ur: ['گوشت', 'Gosht'],
      id: ['Daging', 'DAH-geeng'], de: ['Fleisch', 'FLYSH'], ja: ['肉 (にく)', 'Niku'], pa: ['ਮੀਟ / ਮਾਸ', 'Meat / Maas'], sw: ['Nyama', 'NYAH-mah'],
      mr: ['मांस', 'Maans'], te: ['మాంసం', 'Maamsam'], tr: ['Et', 'ET'], ta: ['இறைச்சி', 'Iraichi'], vi: ['Thịt', 'tit']
    })
  },
  {
    id: 100, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Fish', 'FISH'], zh: ['鱼', 'Yú'], hi: ['मछली', 'Machhli'], es: ['Pescado / Pez', 'pes-KAH-doh'], fr: ['Poisson', 'pwah-SOHN'],
      ar: ['سمك', 'Samak'], bn: ['মাছ', 'Maachh'], pt: ['Peixe', 'PAY-shee'], ru: ['Рыба', 'RY-bah'], ur: ['مچھلی', 'Machhli'],
      id: ['Ikan', 'EE-kahn'], de: ['Fisch', 'FISH'], ja: ['魚 (さかな)', 'Sakana'], pa: ['ਮੱਛੀ', 'Machhi'], sw: ['Samaki', 'sah-MAH-kee'],
      mr: ['मासा', 'Masa'], te: ['చేప', 'Chepa'], tr: ['Balık', 'bah-LUHK'], ta: ['மீன்', 'Meen'], vi: ['Cá', 'kah']
    })
  }
];

module.exports = { VOCAB_BATCH_2 };
