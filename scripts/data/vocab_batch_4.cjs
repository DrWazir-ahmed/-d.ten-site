const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_4 = [
  // ─────────────────────────────────────────────────────────────
  // 6. HOME & DAILY OBJECTS CONTINUED (126 - 155)
  // ─────────────────────────────────────────────────────────────
  {
    id: 126, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Computer', 'kum-PYOO-ter'], zh: ['电脑 / 计算机', 'Diànnǎo'], hi: ['कंप्यूटर / संगणक', 'Computer'], es: ['Computadora / Ordenador', 'kohm-poo-tah-DOH-rah'], fr: ['Ordinateur', 'or-dee-nah-TUHR'],
      ar: ['حاسوب / كمبيوتر', 'Hasoob'], bn: ['কম্পিউটার', 'Computer'], pt: ['Computador', 'kohm-poo-tah-DOR'], ru: ['Компьютер', 'kahm-PYOO-tyer'], ur: ['کمپیوٹر', 'Computer'],
      id: ['Komputer', 'kohm-POO-ter'], de: ['Computer / Rechner', 'kohm-PYOO-ter'], ja: ['パソコン / コンピュータ', 'Pasokon'], pa: ['ਕੰਪਿਊਟਰ', 'Computer'], sw: ['Kompyuta', 'kohm-PYOO-tah'],
      mr: ['संगणक / संगणक', 'Sanganak'], te: ['కంప్యూటర్', 'Computer'], tr: ['Bilgisayar', 'beel-gee-sah-YAHR'], ta: ['கணினி', 'Kanini'], vi: ['Máy tính', 'mye teen']
    })
  },
  {
    id: 127, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Bag / Backpack', 'BAG'], zh: ['包 / 背包', 'Bāo / Bèibāo'], hi: ['थैला / बैग', 'Thaila / Bag'], es: ['Bolsa / Mochila', 'BOHL-sah'], fr: ['Sac / Sac à dos', 'SAHK'],
      ar: ['حقيبة', 'Haqeeba'], bn: ['ব্যাগ / থলে', 'Bag / Thole'], pt: ['Bolsa / Mochila', 'BOHL-sah'], ru: ['Сумка / Рюкзак', 'SOOM-kah'], ur: ['تھیلا / بیگ', 'Thela / Bag'],
      id: ['Tas / Ransel', 'TAHS'], de: ['Tasche / Rucksack', 'TAH-sheh'], ja: ['鞄 (かばん)', 'Kaban'], pa: ['ਬੈਗ / ਝੋਲਾ', 'Bag'], sw: ['Mfuko / Mkoba', 'm-FOO-koh'],
      mr: ['पिशवी / बॅग', 'Pishvee'], te: ['సంచి / బ్యాగ్', 'Sanchi'], tr: ['Çanta', 'chahn-TAH'], ta: ['பை', 'Pai'], vi: ['Túi xách / Balo', 'twee sahk']
    })
  },
  {
    id: 128, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Key', 'KEE'], zh: ['钥匙', 'Yàoshi'], hi: ['चाबी / कुंजी', 'Chaabi / Kunji'], es: ['Llave', 'YAH-veh'], fr: ['Clé', 'KLAY'],
      ar: ['مفتاح', 'Miftah'], bn: ['চাবি', 'Chabi'], pt: ['Chave', 'SHAH-vee'], ru: ['Ключ', 'KLYOOCH'], ur: ['چابی / کلید', 'Chaabi / Kaleed'],
      id: ['Kunci', 'KOON-chee'], de: ['Schlüssel', 'SHLEWS-sel'], ja: ['鍵 (かぎ)', 'Kagi'], pa: ['ਚਾਬੀ', 'Chaabi'], sw: ['Ufunguo', 'oo-foon-GOO-oh'],
      mr: ['किल्ली / चावी', 'Killee / Chavi'], te: ['తాళంచెవి', 'Taalamchevi'], tr: ['Anahtar', 'ah-nahh-TAHR'], ta: ['சாவி', 'Saavi'], vi: ['Chìa khóa', 'cheeyah khwah']
    })
  },
  {
    id: 129, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Money / Cash', 'MUN-ee'], zh: ['钱 / 现金', 'Qián / Xiànjīn'], hi: ['पैसा / धन', 'Paisa / Dhan'], es: ['Dinero / Plata', 'dee-NEH-roh'], fr: ['Argent', 'ar-ZHAHN'],
      ar: ['نقود / مال', 'Nuqood / Maal'], bn: ['টাকা / অর্থ', 'Taka / Ortho'], pt: ['Dinheiro', 'jeen-YAY-roo'], ru: ['Деньги', 'DYEN-gee'], ur: ['پیسہ / روپیہ', 'Paisa / Rupiya'],
      id: ['Uang', 'OO-ahng'], de: ['Geld', 'GELT'], ja: ['お金 (おかね)', 'Okane'], pa: ['ਪੈਸਾ / ਧਨ', 'Paisa'], sw: ['Pesa', 'PEH-sah'],
      mr: ['पैसे / धन', 'Paise'], te: ['డబ్బు', 'Dabbu'], tr: ['Para', 'pah-RAH'], ta: ['பணம்', 'Panam'], vi: ['Tiền', 'tyen']
    })
  },
  {
    id: 130, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Clothes / Clothing', 'KLOHDHZ'], zh: ['衣服 / 服装', 'Yīfu'], hi: ['कपड़े / वस्त्र', 'Kapde / Vastra'], es: ['Ropa', 'ROH-pah'], fr: ['Vêtements / Habits', 'veht-MAHN'],
      ar: ['ملابس / ثياب', 'Malabis / Thiyab'], bn: ['জামাকাপড় / পোশাক', 'Poshak'], pt: ['Roupas', 'HOH-pahsh'], ru: ['Одежда', 'ah-DYEHZH-dah'], ur: ['کپڑے / لباس', 'Kapray / Libas'],
      id: ['Pakaian / Baju', 'pah-KYE-ahn'], de: ['Kleidung / Klamotten', 'KLY-doong'], ja: ['服 (ふく)', 'Fuku'], pa: ['ਕੱਪੜੇ', 'Kappade'], sw: ['Nguo', 'n-GOO-oh'],
      mr: ['कपडे', 'Kapde'], te: ['బట్టలు / వస్త్రాలు', 'Battalu'], tr: ['Giysi / Kıyafet', 'gee-SEE'], ta: ['ஆடை / உடைகள்', 'Aadai'], vi: ['Quần áo', 'kwuhn ow']
    })
  },
  {
    id: 131, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Shoes', 'SHOOZ'], zh: ['鞋子', 'Xiézi'], hi: ['जूते', 'Joote'], es: ['Zapatos', 'sah-PAH-tohs'], fr: ['Chaussures', 'shoh-SEWR'],
      ar: ['حذاء', 'Hidhaa\''], bn: ['জুতো', 'Juto'], pt: ['Sapatos', 'sah-PAH-toosh'], ru: ['Обувь / Туфли', 'OH-boov'], ur: ['جوتے', 'Joote'],
      id: ['Sepatu', 'suh-PAH-too'], de: ['Schuhe', 'SHOO-eh'], ja: ['靴 (くつ)', 'Kutsu'], pa: ['ਜੁੱਤੀਆਂ', 'Juttiyan'], sw: ['Viatu', 'vee-AH-too'],
      mr: ['बूट / जोडे', 'Boot / Jode'], te: ['పాదరక్షలు / బూట్లు', 'Bootlu'], tr: ['Ayakkabı', 'eye-yahk-kah-BUH'], ta: ['காலணி', 'Kaalani'], vi: ['Giày', 'zye']
    })
  },
  {
    id: 132, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Clock / Watch', 'KLOK'], zh: ['钟表 / 手表', 'Zhōngbiǎo / Shǒubiǎo'], hi: ['घड़ी', 'Ghadi'], es: ['Reloj', 'reh-LOH'], fr: ['Horloge / Montre', 'or-LOZH'],
      ar: ['ساعة يد / حائط', 'Saa\'a'], bn: ['ঘড়ি', 'Ghori'], pt: ['Relógio', 'heh-LOH-zhyoo'], ru: ['Часы', 'chah-SY'], ur: ['گھڑی', 'Ghadi'],
      id: ['Jam / Arloji', 'JAHM'], de: ['Uhr', 'OOR'], ja: ['時計 (とけい)', 'Tokei'], pa: ['ਘੜੀ', 'Ghadi'], sw: ['Saa', 'SAH-ah'],
      mr: ['घड्याळ', 'Ghadyal'], te: ['గడియారం', 'Gadiyaaram'], tr: ['Saat', 'sah-AHT'], ta: ['கடிகாரம்', 'Kadigaram'], vi: ['Đồng hồ', 'dawng hoh']
    })
  },
  {
    id: 133, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Light / Lamp', 'LYTE'], zh: ['灯 / 光', 'Dēng / Guāng'], hi: ['बत्ती / प्रकाश', 'Batti / Prakash'], es: ['Luz / Lámpara', 'LOOS / LAHM-pah-rah'], fr: ['Lumière / Lampe', 'lew-MYAIR'],
      ar: ['ضوء / مصباح', 'Daw\' / Misbah'], bn: ['আলো / বাতি', 'Alo / Bati'], pt: ['Luz / Lâmpada', 'LOOZ'], ru: ['Свет / Лампа', 'SVYET'], ur: ['روشنی / بتی / لیمپ', 'Roshni / Batti'],
      id: ['Lampu / Cahaya', 'LAHM-poo'], de: ['Licht / Lampe', 'LIKHT'], ja: ['光 / ランプ', 'Hikari / Ranpu'], pa: ['ਬੱਤੀ / ਰੌਸ਼ਨੀ', 'Batti'], sw: ['Taa / Mwanga', 'TAH-ah'],
      mr: ['दिवा / प्रकाश', 'Diva'], te: ['వెలుగు / దీపం', 'Velugu'], tr: ['Işık / Lamba', 'uh-SHUHK'], ta: ['விளக்கு / ஒளி', 'Vilakku'], vi: ['Đèn / Ánh sáng', 'den']
    })
  },
  {
    id: 134, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Mirror', 'MEER-er'], zh: ['镜子', 'Jìngzi'], hi: ['आईना / शीशा', 'Aaina / Sheesha'], es: ['Espejo', 'es-PEH-hoh'], fr: ['Miroir', 'mee-RWAHR'],
      ar: ['مرآة', 'Mir\'at'], bn: ['আয়না', 'Ayna'], pt: ['Espelho', 'esh-PAY-lyoo'], ru: ['Зеркало', 'ZYER-kah-lah'], ur: ['آئینہ / شیشہ', 'Aaina / Sheesha'],
      id: ['Cermin', 'chair-MEEN'], de: ['Spiegel', 'SHPEE-gel'], ja: ['鏡 (かがみ)', 'Kagami'], pa: ['ਸ਼ੀਸ਼ਾ', 'Sheesha'], sw: ['Kioo', 'kee-OH-oh'],
      mr: ['आरसा', 'Aarsa'], te: ['అద్దం', 'Addam'], tr: ['Ayna', 'eye-NAH'], ta: ['கண்ணாடி', 'Kannaadi'], vi: ['Gương', 'goong']
    })
  },
  {
    id: 135, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Box / Container', 'BOKS'], zh: ['盒子 / 箱子', 'Hézi / Xiāngzi'], hi: ['डिब्बा / बक्सा', 'Dibba / Baksa'], es: ['Caja', 'KAH-hah'], fr: ['Boîte / Caisse', 'BWAHT'],
      ar: ['صندوق / علبة', 'Sundooq / \'Ulba'], bn: ['বাক্স', 'Baksho'], pt: ['Caixa', 'KYE-shah'], ru: ['Коробка / Ящик', 'kah-ROHB-kah'], ur: ['ڈبہ / بکس', 'Dabba / Box'],
      id: ['Kotak', 'KOH-tahk'], de: ['Kiste / Schachtel', 'KIS-teh'], ja: ['箱 (はこ)', 'Hako'], pa: ['ਡੱਬਾ', 'Dabba'], sw: ['Sanduku', 'sahn-DOO-koo'],
      mr: ['डबा / खोके', 'Daba'], te: ['పెట్టె', 'Pette'], tr: ['Kutu', 'koo-TOO'], ta: ['பெட்டி', 'Petti'], vi: ['Hộp / Thùng', 'hohp']
    })
  },
  {
    id: 136, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Paper', 'PAY-per'], zh: ['纸', 'Zhǐ'], hi: ['काग़ज़', 'Kaagaz'], es: ['Papel', 'pah-PEL'], fr: ['Papier', 'pah-PYAY'],
      ar: ['ورق', 'Waraq'], bn: ['কাগজ', 'Kagoj'], pt: ['Papel', 'pah-PEHL'], ru: ['Бумага', 'boo-MAH-gah'], ur: ['کاغذ', 'Kaghaz'],
      id: ['Kertas', 'kair-TAHS'], de: ['Papier', 'pah-PEER'], ja: ['紙 (かみ)', 'Kami'], pa: ['ਕਾਗਜ਼', 'Kaagaz'], sw: ['Karatasi', 'kah-rah-TAH-see'],
      mr: ['कागद', 'Kaagad'], te: ['కాగితం', 'Kaagitham'], tr: ['Kağıt', 'kah-UHT'], ta: ['காகிதம்', 'Kaagidham'], vi: ['Giấy', 'zeye']
    })
  },
  {
    id: 137, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Car / Automobile', 'KAR'], zh: ['汽车 / 车', 'Qìchē / Chē'], hi: ['कार / गाड़ी', 'Car / Gaadi'], es: ['Coche / Auto', 'KOH-cheh'], fr: ['Voiture / Auto', 'vwah-TEWR'],
      ar: ['سيارة', 'Sayyara'], bn: ['গাড়ি', 'Gari'], pt: ['Carro / Automóvel', 'KAH-hoo'], ru: ['Машина / Автомобиль', 'mah-SHEE-nah'], ur: ['گاڑی / کار', 'Gaadi / Car'],
      id: ['Mobil', 'MOH-beel'], de: ['Auto / Wagen', 'OW-toh'], ja: ['車 (くるま)', 'Kuruma'], pa: ['ਕਾਰ / ਗੱਡੀ', 'Car / Gaddi'], sw: ['Gari', 'GAH-ree'],
      mr: ['गाडी / मोटार', 'Gadi'], te: ['కారు / బండి', 'Caru'], tr: ['Araba / Otomobil', 'ah-rah-BAH'], ta: ['மகிழுந்து / கார்', 'Car'], vi: ['Xe hơi / Ô tô', 'seh her']
    })
  },
  {
    id: 138, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Road / Street', 'ROHD / STREET'], zh: ['道路 / 街道', 'Dàolù / Jiēdào'], hi: ['सड़क / रास्ता', 'Sadak / Raasta'], es: ['Camino / Calle', 'kah-MEE-noh'], fr: ['Route / Rue', 'ROOT'],
      ar: ['طريق / شارع', 'Tareeq / Shari\''], bn: ['রাস্তা / পথ', 'Rasta'], pt: ['Estrada / Rua', 'esh-TRAH-dah'], ru: ['Дорога / Улица', 'dah-ROH-gah'], ur: ['سڑک / راستہ', 'Sadak / Raasta'],
      id: ['Jalan', 'JAH-lahn'], de: ['Straße / Weg', 'SHTRAH-seh'], ja: ['道 / 道路', 'Michi / Douro'], pa: ['ਸੜਕ / ਰਾਹ', 'Sadak'], sw: ['Barabara / Njia', 'bah-rah-BAH-rah'],
      mr: ['रस्ता / मार्ग', 'Rasta'], te: ['రహదారి / రోడ్డు', 'Road'], tr: ['Yol / Cadde', 'YOHL'], ta: ['சாலை / வழி', 'Saalai'], vi: ['Đường / Con đường', 'doong']
    })
  },
  {
    id: 139, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Bicycle / Bike', 'BY-sik-ul'], zh: ['自行车 / 单车', 'Zìxíngchē'], hi: ['साइकिल', 'Bicycle'], es: ['Bicicleta / Bici', 'bee-see-KLEH-tah'], fr: ['Vélo / Bicyclette', 'vay-LOH'],
      ar: ['دراجة هوائية', 'Darraja'], bn: ['সাইকেল', 'Cycle'], pt: ['Bicicleta', 'bee-see-KLEH-tah'], ru: ['Велосипед', 'vye-lah-see-PYEHT'], ur: ['سائیکل', 'Cycle'],
      id: ['Sepeda', 'suh-PAY-dah'], de: ['Fahrrad', 'FAHR-raht'], ja: ['自転車 (じてんしゃ)', 'Jitensha'], pa: ['ਸਾਈਕਲ', 'Cycle'], sw: ['Baiskeli', 'bye-SKEH-lee'],
      mr: ['सायकल', 'Cycle'], te: ['సైకిల్', 'Cycle'], tr: ['Bisiklet', 'bee-seek-LET'], ta: ['மிதிவண்டி', 'Midhivandi'], vi: ['Xe đạp', 'seh dahp']
    })
  },
  {
    id: 140, category: 'Home & Objects',
    translations: createTranslationMap({
      en: ['Medicine / Drug', 'MED-uh-sin'], zh: ['药 / 药物', 'Yào'], hi: ['दवा / औषधि', 'Dawa / Aushadhi'], es: ['Medicina / Medicamento', 'meh-dee-SEE-nah'], fr: ['Médicament', 'may-dee-kah-MAHN'],
      ar: ['دواء / علاج', 'Dawaa\''], bn: ['ওষুধ', 'Oshudh'], pt: ['Remédio / Medicamento', 'heh-MEH-jyoo'], ru: ['Лекарство', 'lye-KAHR-stvah'], ur: ['دوا / دوائی', 'Dawa / Dawai'],
      id: ['Obat', 'OH-baht'], de: ['Medizin / Medikament', 'meh-dee-TSEEN'], ja: ['薬 (くすり)', 'Kusuri'], pa: ['ਦਵਾਈ', 'Dawai'], sw: ['Dawa', 'DAH-wah'],
      mr: ['औषध', 'Aushadh'], te: ['మందు', 'Mandu'], tr: ['İlaç', 'ee-LAHTCH'], ta: ['மருந்து', 'Marundhu'], vi: ['Thuốc', 'took']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 7. PLACES & TRAVEL (141 - 170)
  // ─────────────────────────────────────────────────────────────
  {
    id: 141, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['City / Town', 'SIT-ee'], zh: ['城市 / 城镇', 'Chéngshì'], hi: ['शहर / नगर', 'Shahar / Nagar'], es: ['Ciudad / Pueblo', 'syoo-DAHD'], fr: ['Ville', 'VEEL'],
      ar: ['مدينة', 'Madeena'], bn: ['শহর / নগর', 'Shohor'], pt: ['Cidade', 'see-DAH-jee'], ru: ['Город', 'GOH-raht'], ur: ['شہر / نگر', 'Shahar'],
      id: ['Kota', 'KOH-tah'], de: ['Stadt', 'SHTAHT'], ja: ['都市 / 町', 'Toshi / Machi'], pa: ['ਸ਼ਹਿਰ', 'Shahar'], sw: ['Mji / Jiji', 'M-jee'],
      mr: ['शहर / नगर', 'Shahar'], te: ['నగరం / పట్టణం', 'Nagaram'], tr: ['Şehir / Kent', 'sheh-HEER'], ta: ['நகரம்', 'Nagaram'], vi: ['Thành phố', 'tahn foh']
    })
  },
  {
    id: 142, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Country / Nation', 'KUN-tree'], zh: ['国家', 'Guójiā'], hi: ['देश / राष्ट्र', 'Desh / Rashtra'], es: ['País / Nación', 'pah-EES'], fr: ['Pays / Nation', 'pay-EE'],
      ar: ['بلد / دولة', 'Balad / Dawla'], bn: ['দেশ / রাষ্ট্র', 'Desh'], pt: ['País / Nação', 'pye-EES'], ru: ['Страна', 'strah-NAH'], ur: ['ملک / دیس / وطن', 'Mulk / Watan'],
      id: ['Negara', 'nuh-GAH-rah'], de: ['Land / Staat', 'LAHNT'], ja: ['国 (くに)', 'Kuni'], pa: ['ਦੇਸ਼ / ਮੁਲਕ', 'Desh'], sw: ['Nchi', 'N-chee'],
      mr: ['देश / राष्ट्र', 'Desh'], te: ['దేశం', 'Desham'], tr: ['Ülke / Memleket', 'ool-KEH'], ta: ['நாடு / தேசம்', 'Naadu'], vi: ['Quốc gia / Đất nước', 'kwawk zah']
    })
  },
  {
    id: 143, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['School', 'SKOOL'], zh: ['学校', 'Xuéxiào'], hi: ['स्कूल / विद्यालय', 'School / Vidyalaya'], es: ['Escuela / Colegio', 'es-KWEH-lah'], fr: ['École', 'ay-KOL'],
      ar: ['مدرسة', 'Madrasa'], bn: ['বিদ্যালয় / স্কুল', 'School'], pt: ['Escola', 'esh-KOH-lah'], ru: ['Школа', 'SHKOH-lah'], ur: ['اسکول / مدرسہ', 'School / Madrasah'],
      id: ['Sekolah', 'suh-KOH-lah'], de: ['Schule', 'SHOO-leh'], ja: ['学校 (がっこう)', 'Gakkou'], pa: ['ਸਕੂਲ', 'School'], sw: ['Shule', 'SHOO-leh'],
      mr: ['शाळा', 'Shala'], te: ['పాఠశాల / బడి', 'Paathashaala'], tr: ['Okul', 'oh-KOOL'], ta: ['பள்ளி', 'Palli'], vi: ['Trường học', 'troong hawk']
    })
  },
  {
    id: 144, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Hospital', 'HOS-pi-tul'], zh: ['医院', 'Yīyuàn'], hi: ['अस्पताल', 'Aspataal'], es: ['Hospital', 'ohs-pee-TAHL'], fr: ['Hôpital', 'oh-pee-TAHL'],
      ar: ['مستشفى', 'Mustashfa'], bn: ['হাসপাতাল', 'Hospital'], pt: ['Hospital', 'ohsh-pee-TAHL'], ru: ['Больница', 'bahl-NEE-tsah'], ur: ['ہسپتال / شفا خانہ', 'Haspatal'],
      id: ['Rumah sakit', 'ROO-mah SAH-keet'], de: ['Krankenhaus', 'KRAHN-ken-hows'], ja: ['病院 (びょういん)', 'Byouin'], pa: ['ਹਸਪਤਾਲ', 'Hospital'], sw: ['Hospitali', 'hohs-pee-TAH-lee'],
      mr: ['दवाखाना / रुग्णालय', 'Davakhana'], te: ['ఆసుపత్రి', 'Aasupathri'], tr: ['Hastane', 'hahs-tah-NEH'], ta: ['மருத்துவமனை', 'Maruthuvamanai'], vi: ['Bệnh viện', 'ben vyen']
    })
  },
  {
    id: 145, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Market / Bazaar', 'MAR-kit'], zh: ['市场 / 集市', 'Shìchǎng'], hi: ['बाज़ार / मंडी', 'Bazaar / Mandi'], es: ['Mercado', 'mair-KAH-doh'], fr: ['Marché', 'mar-SHAY'],
      ar: ['سوق', 'Sooq'], bn: ['বাজার', 'Bazaar'], pt: ['Mercado / Feira', 'mair-KAH-doo'], ru: ['Рынок / Базар', 'RY-nahk'], ur: ['بازار / مارکیٹ', 'Bazaar / Market'],
      id: ['Pasar', 'PAH-sahr'], de: ['Markt', 'MARKT'], ja: ['市場 (いちば / マーケット)', 'Ichiba'], pa: ['ਬਾਜ਼ਾਰ', 'Bazaar'], sw: ['Soko', 'SOH-koh'],
      mr: ['बाजार / पेठ', 'Bajar'], te: ['మార్కెట్ / సంత', 'Market'], tr: ['Pazar / Çarşı', 'pah-ZAHR'], ta: ['சந்தை / அங்காடி', 'Sandhai'], vi: ['Chợ / Thị trường', 'chuh']
    })
  },
  {
    id: 146, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Hotel', 'hoh-TEL'], zh: ['酒店 / 饭店', 'Jiǔdiàn'], hi: ['होटल', 'Hotel'], es: ['Hotel', 'oh-TEL'], fr: ['Hôtel', 'oh-TEL'],
      ar: ['فندق', 'Funduq'], bn: ['হোটেল', 'Hotel'], pt: ['Hotel', 'oh-TEHL'], ru: ['Отель / Гостиница', 'ah-TYEHL'], ur: ['ہوٹل', 'Hotel'],
      id: ['Hotel', 'hoh-TEHL'], de: ['Hotel', 'hoh-TEL'], ja: ['ホテル / 旅館', 'Hoteru'], pa: ['ਹੋਟਲ', 'Hotel'], sw: ['Hoteli', 'hoh-TEH-lee'],
      mr: ['हॉटेल', 'Hotel'], te: ['హోటల్', 'Hotel'], tr: ['Otel', 'oh-TEL'], ta: ['விடுதி / ஹோட்டல்', 'Vidudhi'], vi: ['Khách sạn', 'khahk sahn']
    })
  },
  {
    id: 147, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Airport', 'AIR-port'], zh: ['机场', 'Jīchǎng'], hi: ['हवाई अड्डा', 'Hawai Adda'], es: ['Aeropuerto', 'ah-eh-roh-PWEHR-toh'], fr: ['Aéroport', 'ah-ay-roh-POR'],
      ar: ['مطار', 'Matar'], bn: ['বিমানবন্দর', 'Bimanbondor'], pt: ['Aeroporto', 'ah-eh-roh-POR-too'], ru: ['Аэропорт', 'ah-eh-rah-POHRT'], ur: ['ہوائی اڈا / ایئر پورٹ', 'Hawai Adda'],
      id: ['Bandara', 'bahn-DAH-rah'], de: ['Flughafen', 'FLOOK-hah-fen'], ja: ['空港 (くうこう)', 'Kuukou'], pa: ['ਹਵਾਈ ਅੱਡਾ', 'Hawai Adda'], sw: ['Uwanja wa ndege', 'oo-WAHN-jah'],
      mr: ['विमानतळ', 'Vimantal'], te: ['విమానాశ్రయం', 'Vimaanaashrayam'], tr: ['Havalimanı / Havaalanı', 'hah-vah-lee-mah-NUH'], ta: ['விமான நிலையம்', 'Vimaana Nilayam'], vi: ['Sân bay', 'suhn bye']
    })
  },
  {
    id: 148, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Train Station', 'TRAYN STAY-shun'], zh: ['火车站', 'Huǒchē zhàn'], hi: ['रेलवे स्टेशन', 'Railway Station'], es: ['Estación de tren', 'es-tah-SYOHN'], fr: ['Gare', 'GAHR'],
      ar: ['محطة القطار', 'Mahattat al-qitar'], bn: ['রেল স্টেশন', 'Rail Station'], pt: ['Estação de trem', 'esh-tah-SOWNG'], ru: ['Вокзал / Станция', 'vahk-ZAHL'], ur: ['ریلوے اسٹیشن', 'Railway Station'],
      id: ['Stasiun kereta', 'stah-SYOON'], de: ['Bahnhof', 'BAHN-hohf'], ja: ['駅 (えき)', 'Eki'], pa: ['ਰੇਲਵੇ ਸਟੇਸ਼ਨ', 'Railway Station'], sw: ['Kituo cha treni', 'kee-TOO-oh'],
      mr: ['रेल्वे स्थानक', 'Railway Sthanak'], te: ['రైల్వే స్టేషన్', 'Railway Station'], tr: ['Tren istasyonu / Gar', 'GAR'], ta: ['தொடருந்து நிலையம்', 'Thodarundhu Nilayam'], vi: ['Ga tàu hỏa', 'gah tow']
    })
  },
  {
    id: 149, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Bank', 'BANK'], zh: ['银行', 'Yínháng'], hi: ['बैंक', 'Bank'], es: ['Banco', 'BAHN-koh'], fr: ['Banque', 'BAHN-kuh'],
      ar: ['بنك / مصرف', 'Bank / Masrif'], bn: ['ব্যাংক', 'Bank'], pt: ['Banco', 'BAHN-koo'], ru: ['Банк', 'BAHNK'], ur: ['بینک', 'Bank'],
      id: ['Bank', 'BAHNK'], de: ['Bank', 'BAHNK'], ja: ['銀行 (ぎんこう)', 'Ginkou'], pa: ['ਬੈਂਕ', 'Bank'], sw: ['Benki', 'BEN-kee'],
      mr: ['बँक', 'Bank'], te: ['బ్యాంకు', 'Banku'], tr: ['Banka', 'BAHN-kah'], ta: ['வங்கி', 'Vangi'], vi: ['Ngân hàng', 'nguhn hahng']
    })
  },
  {
    id: 150, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Sea / Ocean', 'SEE / OH-shun'], zh: ['大海 / 海洋', 'Dàhǎi / Hǎiyáng'], hi: ['समुद्र / सागर', 'Samudra / Saagar'], es: ['Mar / Océano', 'MAR'], fr: ['Mer / Océan', 'MAIR'],
      ar: ['بحر / محيط', 'Bahr / Muheet'], bn: ['সমুদ্র / সাগর', 'Shomudro'], pt: ['Mar / Oceano', 'MAR'], ru: ['Море / Океан', 'MOH-rye'], ur: ['سمندر / بحر', 'Samundar / Bahr'],
      id: ['Laut / Samudra', 'LAH-oot'], de: ['Meer / Ozean', 'MAYR'], ja: ['海 (うみ)', 'Umi'], pa: ['ਸਮੁੰਦਰ', 'Samundar'], sw: ['Bahari', 'bah-HAH-ree'],
      mr: ['समुद्र / सागर', 'Samudra'], te: ['సముద్రం / సాగరం', 'Samudram'], tr: ['Deniz / Okyanus', 'deh-NEEZ'], ta: ['கடல்', 'Kadal'], vi: ['Biển / Đại dương', 'byen']
    })
  }
];

module.exports = { VOCAB_BATCH_4 };
