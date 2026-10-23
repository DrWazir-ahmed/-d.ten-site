const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_3 = [
  // ─────────────────────────────────────────────────────────────
  // 5. FOOD & DINING CONTINUED (101 - 125)
  // ─────────────────────────────────────────────────────────────
  {
    id: 101, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Egg', 'EG'], zh: ['鸡蛋 / 蛋', 'Jīdàn'], hi: ['अंडा', 'Anda'], es: ['Huevo', 'WEH-voh'], fr: ['Œuf', 'UHF'],
      ar: ['بيض', 'Bayd'], bn: ['ডিম', 'Dim'], pt: ['Ovo', 'OH-voo'], ru: ['Яйцо', 'yay-TSOH'], ur: ['انڈا', 'Anda'],
      id: ['Telur', 'tuh-LOOR'], de: ['Ei', 'EYE'], ja: ['卵 (たまご)', 'Tamago'], pa: ['ਆਂਡਾ', 'Aanda'], sw: ['Yai', 'YAH-ee'],
      mr: ['अंडे', 'Ande'], te: ['గుడ్డు', 'Guddu'], tr: ['Yumurta', 'yoo-moor-TAH'], ta: ['முட்டை', 'Muttai'], vi: ['Trứng', 'choong']
    })
  },
  {
    id: 102, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Sugar', 'SHOO-ger'], zh: ['糖', 'Táng'], hi: ['चीनी / शक्कर', 'Cheeni / Shakkar'], es: ['Azúcar', 'ah-ZOO-kar'], fr: ['Sucre', 'SEW-kruh'],
      ar: ['سكر', 'Sukkar'], bn: ['চিনি', 'Chini'], pt: ['Açúcar', 'ah-SOO-kar'], ru: ['Сахар', 'SAH-khahr'], ur: ['چینی / شکر', 'Cheeni / Shakkar'],
      id: ['Gula', 'GOO-lah'], de: ['Zucker', 'TSOOK-ker'], ja: ['砂糖 (さとう)', 'Satou'], pa: ['ਖੰਡ / ਚੀਨੀ', 'Khand'], sw: ['Sukari', 'soo-KAH-ree'],
      mr: ['साखर', 'Sakhar'], te: ['చక్కెర', 'Chakkera'], tr: ['Şeker', 'sheh-KEHR'], ta: ['சர்க்கரை', 'Sarkkarai'], vi: ['Đường', 'doong']
    })
  },
  {
    id: 103, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Salt', 'SAWLT'], zh: ['盐', 'Yán'], hi: ['नमक', 'Namak'], es: ['Sal', 'SAHL'], fr: ['Sel', 'SEL'],
      ar: ['ملح', 'Milh'], bn: ['লবণ / নুন', 'Lobon'], pt: ['Sal', 'SAHL'], ru: ['Соль', 'SOHL'], ur: ['نمک', 'Namak'],
      id: ['Garam', 'GAH-rahm'], de: ['Salz', 'ZAHLTS'], ja: ['塩 (しお)', 'Shio'], pa: ['ਲੂਣ', 'Loon'], sw: ['Chumvi', 'CHOOM-vee'],
      mr: ['मीठ', 'Meeth'], te: ['ఉప్పు', 'Uppu'], tr: ['Tuz', 'TOOZ'], ta: ['உப்பு', 'Uppu'], vi: ['Muối', 'mwoy']
    })
  },
  {
    id: 104, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Apple', 'AP-ul'], zh: ['苹果', 'Píngguǒ'], hi: ['सेब', 'Seb'], es: ['Manzana', 'mahn-ZAH-nah'], fr: ['Pomme', 'PUM'],
      ar: ['تفاح', 'Tuffah'], bn: ['আপেল', 'Apel'], pt: ['Maçã', 'mah-SAHNG'], ru: ['Яблоко', 'YAH-blah-kah'], ur: ['سیب', 'Seb'],
      id: ['Apel', 'AH-pel'], de: ['Apfel', 'AHP-fel'], ja: ['りんご', 'Ringo'], pa: ['ਸੇਬ', 'Seb'], sw: ['Tofaa', 'toh-FAH-ah'],
      mr: ['सफरचंद', 'Safarchand'], te: ['ఆపిల్', 'Apple'], tr: ['Elma', 'el-MAH'], ta: ['ஆப்பிள்', 'Aappil'], vi: ['Táo', 'tah-oh']
    })
  },
  {
    id: 105, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Banana', 'buh-NAN-uh'], zh: ['香蕉', 'Xiāngjiāo'], hi: ['केला', 'Kela'], es: ['Plátano / Banana', 'PLAH-tah-noh'], fr: ['Banane', 'bah-NAHN'],
      ar: ['موز', 'Mawz'], bn: ['কলা', 'Kola'], pt: ['Banana', 'bah-NAH-nah'], ru: ['Банан', 'bah-NAHN'], ur: ['کیلا', 'Kela'],
      id: ['Pisang', 'PEE-sahng'], de: ['Banane', 'bah-NAH-neh'], ja: ['バナナ', 'Banana'], pa: ['ਕੇਲਾ', 'Kela'], sw: ['Ndizi', 'n-DEE-zee'],
      mr: ['केळे', 'Kele'], te: ['అరటిపండు', 'Aratipandu'], tr: ['Muz', 'MOOZ'], ta: ['வாழைப்பழம்', 'Vazhaipazham'], vi: ['Chuối', 'chwoy']
    })
  },
  {
    id: 106, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Food / Meal', 'FOOD'], zh: ['食物 / 饭菜', 'Shíwù'], hi: ['खाना / भोजन', 'Khana / Bhojan'], es: ['Comida / Alimento', 'koh-MEE-dah'], fr: ['Nourriture / Repas', 'noo-ree-TEWR'],
      ar: ['طعام / أكل', 'Ta\'am / Akl'], bn: ['খাবার / খাদ্য', 'Khabar'], pt: ['Comida / Alimento', 'koo-MEE-dah'], ru: ['Еда / Пища', 'yeh-DAH'], ur: ['کھانا / طعام', 'Khana'],
      id: ['Makanan', 'mah-KAH-nahn'], de: ['Essen / Nahrung', 'ES-sen'], ja: ['食べ物 / 食事', 'Tabemono'], pa: ['ਖਾਣਾ / ਭੋਜਨ', 'Khana'], sw: ['Chakula', 'chah-KOO-lah'],
      mr: ['अन्न / जेवण', 'Anna / Jevan'], te: ['ఆహారం / భోజనం', 'Aahaaram'], tr: ['Yemek / Yiyecek', 'yeh-MEHK'], ta: ['உணவு', 'Unavu'], vi: ['Thức ăn / Món ăn', 'took ahn']
    })
  },
  {
    id: 107, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Restaurant', 'RES-tuh-rahnt'], zh: ['餐馆 / 餐厅', 'Cānguǎn'], hi: ['रेस्तरां / भोजनालय', 'Restaurant'], es: ['Restaurante', 'res-tow-RAHN-teh'], fr: ['Restaurant', 'res-toh-RAHN'],
      ar: ['مطعم', 'Mat\'am'], bn: ['রেস্তোরাঁ', 'Restora'], pt: ['Restaurante', 'hes-tow-RAHN-chee'], ru: ['Ресторан', 'ryeh-stah-RAHN'], ur: ['ریستوران / ہوٹل', 'Restaurant'],
      id: ['Restoran / Rumah makan', 'res-toh-RAHN'], de: ['Restaurant / Gasthaus', 'res-toh-RAHN'], ja: ['レストラン / 飲食店', 'Resutoran'], pa: ['ਰੈਸਟੋਰੈਂਟ', 'Restaurant'], sw: ['Mkahawa', 'm-kah-HAH-wah'],
      mr: ['उपहारगृह / हॉटेल', 'Hotel'], te: ['రెస్టారెంట్ / హోటల్', 'Restaurant'], tr: ['Restoran / Lokanta', 'res-toh-RAHN'], ta: ['உணவகம்', 'Unavagam'], vi: ['Nhà hàng', 'nyah hahng']
    })
  },
  {
    id: 108, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Breakfast', 'BREK-fust'], zh: ['早餐 / 早饭', 'Zǎocān'], hi: ['नाश्ता', 'Nashta'], es: ['Desayuno', 'deh-sah-YOO-noh'], fr: ['Petit-déjeuner', 'puh-tee day-zhuh-NAY'],
      ar: ['فطور / إفطار', 'Futoor'], bn: ['সকালের নাস্তা', 'Nasta'], pt: ['Café da manhã', 'kah-FEH'], ru: ['Завтрак', 'ZAHF-trahk'], ur: ['ناشتہ', 'Nashta'],
      id: ['Sarapan', 'sah-RAH-pahn'], de: ['Frühstück', 'FREW-shtewk'], ja: ['朝食 (ちょうしょく)', 'Choushoku'], pa: ['ਨਾਸ਼ਤਾ', 'Nashta'], sw: ['Kifungua kinywa', 'kee-foon-GOO-ah'],
      mr: ['नाश्ता', 'Nashta'], te: ['అల్పాహారం / టిఫిన్', 'Alpaahaaram'], tr: ['Kahvaltı', 'kah-vahl-TUH'], ta: ['காலை உணவு', 'Kaalai Unavu'], vi: ['Bữa sáng', 'boo-uh sahng']
    })
  },
  {
    id: 109, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Lunch', 'LUNCH'], zh: ['午餐 / 午饭', 'Wǔcān'], hi: ['दोपहर का खाना', 'Dopahar ka khana'], es: ['Almuerzo / Comida', 'ahl-MWEHR-zoh'], fr: ['Déjeuner', 'day-zhuh-NAY'],
      ar: ['غداء', 'Ghadaa\''], bn: ['দুপুরের খাবার', 'Dupurer khabar'], pt: ['Almoço', 'ahl-MOH-soo'], ru: ['Обед', 'ah-BYEHT'], ur: ['دوپہر کا کھانا', 'Dopahar ka khana'],
      id: ['Makan siang', 'MAH-kahn SEE-ahng'], de: ['Mittagessen', 'MIT-tahk-es-sen'], ja: ['昼食 (ちゅうしょく)', 'Chuushoku'], pa: ['ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ', 'Khana'], sw: ['Chakula cha mchana', 'm-CHAH-nah'],
      mr: ['दुपारचे जेवण', 'Dupaarche Jevan'], te: ['మధ్యాహ్న భోజనం', 'Bhojanam'], tr: ['Öğle yemeği', 'oh-LEH yeh-meh-YEE'], ta: ['மதிய உணவு', 'Madhiya Unavu'], vi: ['Bữa trưa', 'boo-uh troo-uh']
    })
  },
  {
    id: 110, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Dinner', 'DIN-er'], zh: ['晚餐 / 晚饭', 'Wǎncān'], hi: ['रात का खाना', 'Raat ka khana'], es: ['Cena', 'SEH-nah'], fr: ['Dîner', 'dee-NAY'],
      ar: ['عشاء', 'Asha\''], bn: ['রাতের খাবার', 'Rater khabar'], pt: ['Jantar', 'zhahn-TAHR'], ru: ['Ужин', 'OO-zheen'], ur: ['رات کا کھانا', 'Raat ka khana'],
      id: ['Makan malam', 'MAH-kahn MAH-lahm'], de: ['Abendessen', 'AH-bent-es-sen'], ja: ['夕食 (ゆうしょく)', 'Yuushoku'], pa: ['ਰਾਤ ਦਾ ਖਾਣਾ', 'Raat da khana'], sw: ['Chakula cha jioni', 'jee-OH-nee'],
      mr: ['रात्रीचे जेवण', 'Raatriche Jevan'], te: ['రాత్రి భోజనం', 'Raatri Bhojanam'], tr: ['Akşam yemeği', 'ahk-SHAHM'], ta: ['இரவு உணவு', 'Iravu Unavu'], vi: ['Bữa tối', 'boo-uh toy']
    })
  },
  {
    id: 111, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Delicious / Tasty', 'dih-LISH-us'], zh: ['好吃 / 美味', 'Hǎochī / Měiwèi'], hi: ['स्वादिष्ट / लज़ीज़', 'Swadisht'], es: ['Delicioso / Rico', 'deh-lee-SYOH-soh'], fr: ['Délicieux', 'day-lee-SYUH'],
      ar: ['لذيذ / شهي', 'Ladheedh'], bn: ['সুস্বাদু / মজাদার', 'Sushwadu'], pt: ['Delicioso / Gostoso', 'deh-lee-SYOH-zoo'], ru: ['Вкусно / Вкусный', 'VKOOS-nah'], ur: ['لذیذ / مزے دار', 'Laziz / Mazedar'],
      id: ['Enak / Lezat', 'EH-nahk / luh-ZAHT'], de: ['Lecker / Köstlich', 'LEK-ker'], ja: ['美味しい (おいしい)', 'Oishii'], pa: ['ਸੁਆਦੀ', 'Suaadi'], sw: ['Tamu / Nzuri', 'TAH-moo'],
      mr: ['चवदार / स्वादिष्ट', 'Chavdaar'], te: ['రుచికరమైన', 'Ruchikaramaina'], tr: ['Lezzetli', 'lez-zet-LEE'], ta: ['சுவையான', 'Suvaiyaana'], vi: ['Ngon', 'ngon']
    })
  },
  {
    id: 112, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Hunger / Hungry', 'HUNG-gree'], zh: ['饥饿 / 饿', 'È'], hi: ['भूख / भूखा', 'Bhookh / Bhookha'], es: ['Hambre / Hambriento', 'AHM-breh'], fr: ['Faim / Affamé', 'FAN'],
      ar: ['جوع / جائع', 'Joo\' / Jaa\'i'], bn: ['ক্ষুধা / ক্ষুধার্ত', 'Khudha'], pt: ['Fome', 'FOH-mee'], ru: ['Голод / Голодный', 'GOH-laht'], ur: ['بھوک / بھوکا', 'Bhookh'],
      id: ['Lapar', 'LAH-pahr'], de: ['Hunger / Hungrig', 'HOON-ger'], ja: ['お腹が空いた', 'Onaka ga suita'], pa: ['ਭੁੱਖ', 'Bhukkh'], sw: ['Njaa', 'n-JAH-ah'],
      mr: ['भूक', 'Bhook'], te: ['ఆకలి', 'Aakali'], tr: ['Açlık / Aç', 'AHTCH'], ta: ['பசி', 'Pasi'], vi: ['Đói', 'doy']
    })
  },
  {
    id: 113, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Thirst / Thirsty', 'THURST-ee'], zh: ['渴', 'Kě'], hi: ['प्यास / प्यासा', 'Pyaas / Pyaasa'], es: ['Sed / Sediento', 'SED'], fr: ['Soif', 'SWAHF'],
      ar: ['عطش / عطشان', 'Atash'], bn: ['তৃষ্ণা / পিপাসা', 'Trishna'], pt: ['Sede', 'SEH-jee'], ru: ['Жажда', 'ZHAHZH-dah'], ur: ['پیاس / پیاسا', 'Pyaas'],
      id: ['Haus / Dahaga', 'HOWS'], de: ['Durst / Durstig', 'DOORST'], ja: ['喉が渇いた', 'Nodo ga kawaita'], pa: ['ਪਿਆਸ', 'Pyaas'], sw: ['Kiu', 'KEE-oo'],
      mr: ['तहान', 'Tahan'], te: ['దాహం', 'Daaham'], tr: ['Susuzluk / Susamış', 'soo-SOOZ'], ta: ['தாகம்', 'Dhaagam'], vi: ['Khát', 'kaht']
    })
  },
  {
    id: 114, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Chicken', 'CHIK-in'], zh: ['鸡肉 / 鸡', 'Jīròu'], hi: ['मुर्ग़ा / चिकन', 'Murga / Chicken'], es: ['Pollo', 'POH-yoh'], fr: ['Poulet', 'poo-LAY'],
      ar: ['دجاج', 'Dajaj'], bn: ['মুরগি', 'Murgi'], pt: ['Frango', 'FRAHN-goo'], ru: ['Курица', 'KOO-ree-tsah'], ur: ['مرغی / چکن', 'Murghi / Chicken'],
      id: ['Ayam', 'AH-yahm'], de: ['Hähnchen / Huhn', 'HEN-khen'], ja: ['鶏肉 / チキン', 'Toriniku'], pa: ['ਕੁੱਕੜ / ਚਿਕਨ', 'Kukkad'], sw: ['Kuku', 'KOO-koo'],
      mr: ['चिकन / कोंबडी', 'Chicken'], te: ['కోడి మాంసం', 'Kodi maamsam'], tr: ['Tavuk', 'tah-VOOK'], ta: ['கோழி', 'Kozhi'], vi: ['Thịt gà', 'tit gah']
    })
  },
  {
    id: 115, category: 'Food & Dining',
    translations: createTranslationMap({
      en: ['Potato', 'puh-TAY-toh'], zh: ['土豆 / 马铃薯', 'Tǔdòu'], hi: ['आलू', 'Aloo'], es: ['Patata / Papa', 'pah-TAH-tah'], fr: ['Pomme de terre', 'pum duh TAIR'],
      ar: ['بطاطس', 'Batatis'], bn: ['আলু', 'Aloo'], pt: ['Batata', 'bah-TAH-tah'], ru: ['Картофель', 'kahr-TOH-fyel'], ur: ['آلو', 'Aloo'],
      id: ['Kentang', 'ken-TAHNG'], de: ['Kartoffel', 'kahr-TOF-fel'], ja: ['じゃがいも', 'Jagaimo'], pa: ['ਆਲੂ', 'Aloo'], sw: ['Viazi', 'vee-AH-zee'],
      mr: ['बटाटा', 'Batata'], te: ['బంగాళాదుంప', 'Bangaaladumpa'], tr: ['Patates', 'pah-tah-TES'], ta: ['உருளைக்கிழங்கு', 'Urulaikizhangu'], vi: ['Khoai tây', 'kwye tey']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 6. HOME & DAILY OBJECTS (116 - 145)
  // ─────────────────────────────────────────────────────────────
  {
    id: 116, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['House / Home', 'HOWS / HOHM'], zh: ['房子 / 家', 'Fángzi / Jiā'], hi: ['घर / मकान', 'Ghar / Makaan'], es: ['Casa / Hogar', 'KAH-sah'], fr: ['Maison', 'may-ZOHN'],
      ar: ['بيت / منزل', 'Bayt / Manzil'], bn: ['বাড়ি / ঘর', 'Bari / Ghor'], pt: ['Casa / Lar', 'KAH-zah'], ru: ['Дом', 'DOHM'], ur: ['گھر / مکان', 'Ghar / Makaan'],
      id: ['Rumah', 'ROO-mah'], de: ['Haus / Heim', 'HOWS'], ja: ['家 (いえ / うち)', 'Ie / Uchi'], pa: ['ਘਰ', 'Ghar'], sw: ['Nyumba', 'NYOOM-bah'],
      mr: ['घर', 'Ghar'], te: ['ఇల్లు', 'Illu'], tr: ['Ev', 'EV'], ta: ['வீடு', 'Veedu'], vi: ['Nhà', 'nyah']
    })
  },
  {
    id: 117, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Room', 'ROOM'], zh: ['房间', 'Fángjiān'], hi: ['कमरा', 'Kamra'], es: ['Habitación / Cuarto', 'ah-bee-tah-SYOHN'], fr: ['Chambre / Pièce', 'SHAHM-bruh'],
      ar: ['غرفة', 'Ghurfa'], bn: ['ঘর / কক্ষ', 'Ghor / Kokkho'], pt: ['Quarto / Cômodo', 'KWAHR-too'], ru: ['Комната', 'KOHM-nah-tah'], ur: ['کمرہ', 'Kamra'],
      id: ['Kamar / Ruangan', 'KAH-mahr'], de: ['Zimmer / Raum', 'TSIM-mer'], ja: ['部屋 (へや)', 'Heya'], pa: ['ਕਮਰਾ', 'Kamra'], sw: ['Chumba', 'CHOOM-bah'],
      mr: ['खोली', 'Kholi'], te: ['గది', 'Gadi'], tr: ['Oda', 'oh-DAH'], ta: ['அறை', 'Arai'], vi: ['Phòng', 'fawng']
    })
  },
  {
    id: 118, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Door', 'DOR'], zh: ['门', 'Mén'], hi: ['दरवाज़ा', 'Darwaaza'], es: ['Puerta', 'PWEHR-tah'], fr: ['Porte', 'PORT'],
      ar: ['باب', 'Baab'], bn: ['দরজা', 'Dorja'], pt: ['Porta', 'POR-tah'], ru: ['Дверь', 'DVYEHR'], ur: ['دروازہ', 'Darwaza'],
      id: ['Pintu', 'PEEN-too'], de: ['Tür', 'TEWR'], ja: ['ドア / 戸', 'Doa'], pa: ['ਦਰਵਾਜ਼ਾ', 'Darwaaza'], sw: ['Mlango', 'm-LAHN-goh'],
      mr: ['दार / दरवाजा', 'Daar / Darwaja'], te: ['ద్వారం / తలుపు', 'Talupu'], tr: ['Kapı', 'kah-PUH'], ta: ['கதவு', 'Kadhavu'], vi: ['Cửa', 'koo-uh']
    })
  },
  {
    id: 119, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Window', 'WIN-doh'], zh: ['窗户', 'Chuānghu'], hi: ['खिड़की', 'Khidki'], es: ['Ventana', 'ven-TAH-nah'], fr: ['Fenêtre', 'fuh-NEH-truh'],
      ar: ['نافذة / شباك', 'Nafidha / Shubbak'], bn: ['জানালা', 'Janala'], pt: ['Janela', 'zhah-NEH-lah'], ru: ['Окно', 'ahk-NOH'], ur: ['کھڑکی', 'Khidki'],
      id: ['Jendela', 'jen-DEH-lah'], de: ['Fenster', 'FEN-ster'], ja: ['窓 (まど)', 'Mado'], pa: ['ਖਿੜਕੀ', 'Khidki'], sw: ['Dirisha', 'dee-REE-shah'],
      mr: ['खिडकी', 'Khidki'], te: ['కిటికీ', 'Kitiki'], tr: ['Pencere', 'pen-JEH-reh'], ta: ['ஜன்னல்', 'Jannal'], vi: ['Cửa sổ', 'koo-uh soh']
    })
  },
  {
    id: 120, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Table / Desk', 'TAY-bul'], zh: ['桌子', 'Zhuōzi'], hi: ['मेज़', 'Mez'], es: ['Mesa', 'MEH-sah'], fr: ['Table', 'TAH-bluh'],
      ar: ['طاولة', 'Tawila'], bn: ['টেবিল', 'Table'], pt: ['Mesa', 'MEH-zah'], ru: ['Стол', 'STOHL'], ur: ['میز', 'Mez'],
      id: ['Meja', 'MEH-jah'], de: ['Tisch', 'TISH'], ja: ['テーブル / 机', 'Teeburu / Tsukue'], pa: ['ਮੇਜ਼', 'Mez'], sw: ['Meza', 'MEH-zah'],
      mr: ['मेज / टेबल', 'Table'], te: ['మేజా / బల్ల', 'Balla'], tr: ['Masa', 'mah-SAH'], ta: ['மேஜை', 'Mejai'], vi: ['Bàn', 'bahn']
    })
  },
  {
    id: 121, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Chair', 'CHAIR'], zh: ['椅子', 'Yǐzi'], hi: ['कुर्सी', 'Kursi'], es: ['Silla', 'SEE-yah'], fr: ['Chaise', 'SHEHZ'],
      ar: ['كرسي', 'Kursee'], bn: ['চেয়ার / কেদারা', 'Chair'], pt: ['Cadeira', 'kah-DAY-rah'], ru: ['Стул', 'STOOL'], ur: ['کرسی', 'Kursi'],
      id: ['Kursi', 'KOOR-see'], de: ['Stuhl', 'SHTOOL'], ja: ['椅子 (いす)', 'Isu'], pa: ['ਕੁਰਸੀ', 'Kursi'], sw: ['Kiti', 'KEE-tee'],
      mr: ['खुर्ची', 'Khurchi'], te: ['కుర్చీ', 'Kurchi'], tr: ['Sandalye', 'sahn-dahl-YEH'], ta: ['நாற்காலி', 'Naarkaali'], vi: ['Ghế', 'geh']
    })
  },
  {
    id: 122, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Bed', 'BED'], zh: ['床', 'Chuáng'], hi: ['बिस्तर / पलंग', 'Bistar / Palang'], es: ['Cama', 'KAH-mah'], fr: ['Lit', 'LEE'],
      ar: ['سرير', 'Sareer'], bn: ['বিছানা / খাট', 'Bichhana'], pt: ['Cama', 'KAH-mah'], ru: ['Кровать', 'krah-VAHT'], ur: ['بستر / پلنگ', 'Bistar / Palang'],
      id: ['Tempat tidur / Ranjang', 'TEM-paht'], de: ['Bett', 'BET'], ja: ['ベッド', 'Beddo'], pa: ['ਬਿਸਤਰਾ / ਮੰਜਾ', 'Bistra'], sw: ['Kitanda', 'kee-TAHN-dah'],
      mr: ['खाट / पलंग', 'Palang'], te: ['మంచం', 'Mancham'], tr: ['Yatak', 'yah-TAHK'], ta: ['படுக்கை', 'Padukkai'], vi: ['Giường', 'zoong']
    })
  },
  {
    id: 123, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Book', 'BOOK'], zh: ['书', 'Shū'], hi: ['किताब / पुस्तक', 'Kitaab / Pustak'], es: ['Libro', 'LEE-broh'], fr: ['Livre', 'LEE-vruh'],
      ar: ['كتاب', 'Kitaab'], bn: ['বই / পুস্তক', 'Boi'], pt: ['Livro', 'LEE-vroo'], ru: ['Книга', 'KNEE-gah'], ur: ['کتاب', 'Kitaab'],
      id: ['Buku', 'BOO-koo'], de: ['Buch', 'BOOKH'], ja: ['本 (ほん)', 'Hon'], pa: ['ਕਿਤਾਬ', 'Kitaab'], sw: ['Kitabu', 'kee-TAH-boo'],
      mr: ['पुस्तक / ग्रंथ', 'Pustak'], te: ['పుస్తకం', 'Pusthakam'], tr: ['Kitap', 'kee-TAHP'], ta: ['புத்தகம்', 'Puthagam'], vi: ['Sách', 'sahk']
    })
  },
  {
    id: 124, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Pen / Pencil', 'PEN'], zh: ['笔 / 钢笔', 'Bǐ / Gāngbǐ'], hi: ['कलम / पेन', 'Kalam / Pen'], es: ['Bolígrafo / Pluma', 'boh-LEE-grah-foh'], fr: ['Stylo', 'stee-LOH'],
      ar: ['قلم', 'Qalam'], bn: ['কলম', 'Kolom'], pt: ['Caneta', 'kah-NEH-tah'], ru: ['Ручка / Карандаш', 'ROOCH-kah'], ur: ['قلم / پین', 'Qalam / Pen'],
      id: ['Pena / Pulpen', 'PEH-nah'], de: ['Stift / Kugelschreiber', 'SHTIFT'], ja: ['ペン / 筆記用具', 'Pen'], pa: ['ਕਲਮ / ਪੈੱਨ', 'Kalam'], sw: ['Kalamu', 'kah-LAH-moo'],
      mr: ['पेन / लेखणी', 'Pen'], te: ['కలం / పెన్ను', 'Kalam'], tr: ['Kalem', 'kah-LEM'], ta: ['பேனா', 'Pena'], vi: ['Bút', 'boot']
    })
  },
  {
    id: 125, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Phone / Mobile', 'FOHN'], zh: ['手机 / 电话', 'Shǒujī / Diànhuà'], hi: ['फ़ोन / मोबाइल', 'Phone / Mobile'], es: ['Teléfono / Móvil', 'teh-LEH-foh-noh'], fr: ['Téléphone / Portable', 'tay-lay-FUN'],
      ar: ['هاتف / جوال', 'Hatif / Jawwal'], bn: ['ফোন / মুঠোফোন', 'Phone'], pt: ['Telefone / Celular', 'teh-leh-FOH-nee'], ru: ['Телефон', 'tye-lye-FOHN'], ur: ['فون / موبائل', 'Phone / Mobile'],
      id: ['Telepon / HP', 'teh-leh-POHN'], de: ['Telefon / Handy', 'teh-leh-FOHN'], ja: ['電話 / 携帯', 'Denwa / Keitai'], pa: ['ਫ਼ੋਨ / ਮੋਬਾਈਲ', 'Phone'], sw: ['Simu', 'SEE-moo'],
      mr: ['फोन / मोबाईल', 'Phone'], te: ['ఫోన్ / మొబైల్', 'Phone'], tr: ['Telefon', 'teh-leh-FOHN'], ta: ['தொலைபேசி', 'Tholaipesi'], vi: ['Điện thoại', 'dyen twye']
    })
  }
];

module.exports = { VOCAB_BATCH_3 };
