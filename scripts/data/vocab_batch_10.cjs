const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_10 = [
  // ─────────────────────────────────────────────────────────────
  // 17. ANIMALS & CREATURES (401 - 450)
  // ─────────────────────────────────────────────────────────────
  {
    id: 401, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Dog', 'DOG'], zh: ['狗 / 犬', 'Gǒu'], hi: ['कुत्ता / श्वान', 'Kutta'], es: ['Perro', 'PEH-rroh'], fr: ['Chien', 'SHYAN'],
      ar: ['كلب', 'Kalb'], bn: ['কুকুর', 'Kukur'], pt: ['Cachorro / Cão', 'kah-SHOH-hoo'], ru: ['Собака / Пес', 'sah-BAH-kah'], ur: ['کتا', 'Kutta'],
      id: ['Anjing', 'AHN-jeeng'], de: ['Hund', 'HOONT'], ja: ['犬 (いぬ)', 'Inu'], pa: ['ਕੁੱਤਾ', 'Kutta'], sw: ['Mbwa', 'M-bwah'],
      mr: ['कुत्रा', 'Kutra'], te: ['కుక్క', 'Kukka'], tr: ['Köpek', 'kur-PEHK'], ta: ['நாய்', 'Naai'], vi: ['Con chó', 'chaw']
    })
  },
  {
    id: 402, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Cat', 'KAT'], zh: ['猫', 'Māo'], hi: ['बिल्ली', 'Billi'], es: ['Gato', 'GAH-toh'], fr: ['Chat', 'SHAH'],
      ar: ['قط / قطة', 'Qitt'], bn: ['বিড়াল', 'Biral'], pt: ['Gato', 'GAH-too'], ru: ['Кошка / Кот', 'KOHSH-kah'], ur: ['بلی', 'Billi'],
      id: ['Kucing', 'KOO-cheeng'], de: ['Katze', 'KAHT-seh'], ja: ['猫 (ねこ)', 'Neko'], pa: ['ਬਿੱਲੀ', 'Billi'], sw: ['Paka', 'PAH-kah'],
      mr: ['मांजर', 'Maanjar'], te: ['పిల్లి', 'Pilli'], tr: ['Kedi', 'keh-DEE'], ta: ['பூனை', 'Poonai'], vi: ['Con mèo', 'meh-oh']
    })
  },
  {
    id: 403, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Bird', 'BERD'], zh: ['鸟', 'Niǎo'], hi: ['पक्षी / चिड़िया', 'Pakshi'], es: ['Pájaro / Ave', 'PAH-hah-roh'], fr: ['Oiseau', 'wah-ZOH'],
      ar: ['طائر / عصفور', 'Ta\'ir'], bn: ['পাখি', 'Pakhi'], pt: ['Pássaro / Ave', 'PAH-sah-roo'], ru: ['Птица', 'PTEE-tsah'], ur: ['پرندہ / چڑیا', 'Parinda'],
      id: ['Burung', 'BOO-roong'], de: ['Vogel', 'FOH-gel'], ja: ['鳥 (とり)', 'Tori'], pa: ['ਪੰਛੀ / ਚਿੜੀ', 'Panchhi'], sw: ['Ndege', 'n-DEH-geh'],
      mr: ['पक्षी / पाखरू', 'Pakshi'], te: ['పక్షి / పిట్ట', 'Pakshi'], tr: ['Kuş', 'KOOSH'], ta: ['பறவை', 'Paravai'], vi: ['Con chim', 'cheem']
    })
  },
  {
    id: 404, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Fish', 'FISH'], zh: ['鱼', 'Yú'], hi: ['मछली / मीन', 'Machhli'], es: ['Pez / Pescado', 'PEHS'], fr: ['Poisson', 'pwah-SOHN'],
      ar: ['سمكة / سمك', 'Samak'], bn: ['মাছ', 'Maachh'], pt: ['Peixe', 'PAY-shee'], ru: ['Рыба', 'RY-bah'], ur: ['مچھلی', 'Machhli'],
      id: ['Ikan', 'EE-kahn'], de: ['Fisch', 'FEESH'], ja: ['魚 (さかな)', 'Sakana'], pa: ['ਮੱਛੀ', 'Machhi'], sw: ['Samaki', 'sah-MAH-kee'],
      mr: ['मासा', 'Maasa'], te: ['చేప', 'Chepa'], tr: ['Balık', 'bah-LUHK'], ta: ['மீன்', 'Meen'], vi: ['Con cá', 'kah']
    })
  },
  {
    id: 405, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Horse', 'HORS'], zh: ['马', 'Mǎ'], hi: ['घोड़ा / अश्व', 'Ghoda'], es: ['Caballo', 'kah-BAH-yoh'], fr: ['Cheval', 'shuh-VAHL'],
      ar: ['حصان / فرس', 'Hisan'], bn: ['ঘোড়া', 'Ghora'], pt: ['Cavalo', 'kah-VAH-loo'], ru: ['Лошадь / Конь', 'LOH-shaht'], ur: ['گھوڑا', 'Ghoda'],
      id: ['Kuda', 'KOO-dah'], de: ['Pferd', 'PFAIRT'], ja: ['馬 (うま)', 'Uma'], pa: ['ਘੋੜਾ', 'Ghoda'], sw: ['Farasi', 'fah-RAH-see'],
      mr: ['घोडा', 'Ghoda'], te: ['గుర్రం', 'Gurram'], tr: ['At', 'AHT'], ta: ['குதிரை', 'Kudhirai'], vi: ['Con ngựa', 'ngoo-uh']
    })
  },
  {
    id: 406, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Cow', 'KOW'], zh: ['奶牛 / 牛', 'Niú'], hi: ['गाय / गोमाता', 'Gaay'], es: ['Vaca', 'VAH-kah'], fr: ['Vache', 'VAHSH'],
      ar: ['بقرة', 'Baqarah'], bn: ['গরু / গাভী', 'Goru'], pt: ['Vaca', 'VAH-kah'], ru: ['Корова', 'kah-ROH-vah'], ur: ['گائے', 'Gaaye'],
      id: ['Sapi', 'SAH-pee'], de: ['Kuh', 'KOO'], ja: ['牛 (うし)', 'Ushi'], pa: ['ਗਾਂ', 'Gaan'], sw: ['Ng\'ombe', 'ng-OHM-beh'],
      mr: ['गाय', 'Gaay'], te: ['ఆవు', 'Aavu'], tr: ['İnek', 'ee-NEHK'], ta: ['பசு / மாடு', 'Pasu'], vi: ['Con bò', 'baw']
    })
  },
  {
    id: 407, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Sheep', 'SHEEP'], zh: ['绵羊 / 羊', 'Miányáng'], hi: ['भेड़', 'Bhed'], es: ['Oveja', 'oh-VEH-hah'], fr: ['Mouton', 'moo-TOHN'],
      ar: ['خروف / غنم', 'Kharoof'], bn: ['ভেড়া', 'Bheda'], pt: ['Ovelha', 'oh-VEHL-yah'], ru: ['Овца / Баран', 'ahv-TSAH'], ur: ['بھیڑ', 'Bhaid'],
      id: ['Domba', 'DOHM-bah'], de: ['Schaf', 'SHAHF'], ja: ['羊 (ひつじ)', 'Hitsuji'], pa: ['ਭੇਡ', 'Bhed'], sw: ['Kondoo', 'kohn-DOH-oh'],
      mr: ['मेंढी', 'Mendhee'], te: ['గొర్రె', 'Gorre'], tr: ['Koyun', 'koh-YOON'], ta: ['செம்மறியாடு', 'Semmariyaadu'], vi: ['Con cừu', 'koo']
    })
  },
  {
    id: 408, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Goat', 'GOHT'], zh: ['山羊', 'Shānyáng'], hi: ['बकरी', 'Bakri'], es: ['Cabra', 'KAH-brah'], fr: ['Chèvre', 'SHEH-vruh'],
      ar: ['ماعز', 'Ma\'iz'], bn: ['ছাগল', 'Chhagol'], pt: ['Cabra / Bode', 'KAH-brah'], ru: ['Коза / Козел', 'kah-ZAH'], ur: ['بکری', 'Bakri'],
      id: ['Kambing', 'KAHM-beeng'], de: ['Ziege', 'TSEE-geh'], ja: ['山羊 (やぎ)', 'Yagi'], pa: ['ਬੱਕਰੀ', 'Bakkri'], sw: ['Mbuzi', 'm-BOO-zee'],
      mr: ['शेळी / बोकड', 'Sheli'], te: ['మేక', 'Meka'], tr: ['Keçi', 'keh-CHEE'], ta: ['ஆடு', 'Aadu'], vi: ['Con dê', 'zeh']
    })
  },
  {
    id: 409, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Lion', 'LYE-un'], zh: ['狮子', 'Shīzi'], hi: ['शेर / सिंह', 'Sher'], es: ['León', 'leh-OHN'], fr: ['Lion', 'LYOHN'],
      ar: ['أسد', 'Asad'], bn: ['সিংহ', 'Shingho'], pt: ['Leão', 'leh-OWN'], ru: ['Лев', 'LYEHF'], ur: ['شیر / ببر شیر', 'Sher'],
      id: ['Singa', 'SEENG-ah'], de: ['Löwe', 'LER-veh'], ja: ['ライオン (獅子)', 'Raion'], pa: ['ਸ਼ੇਰ', 'Sher'], sw: ['Simba', 'SEEM-bah'],
      mr: ['सिंह', 'Simha'], te: ['సింహం', 'Simham'], tr: ['Aslan', 'ahs-LAHN'], ta: ['சிங்கம்', 'Singam'], vi: ['Sư tử', 'soo too']
    })
  },
  {
    id: 410, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Tiger', 'TY-ger'], zh: ['老虎', 'Lǎohǔ'], hi: ['बाघ', 'Baagh'], es: ['Tigre', 'TEE-greh'], fr: ['Tigre', 'TEE-gruh'],
      ar: ['نمر', 'Namir'], bn: ['বাঘ', 'Baagh'], pt: ['Tigre', 'CHEE-gree'], ru: ['Тигр', 'TEEKR'], ur: ['چیتا / باگھ', 'Cheeta'],
      id: ['Harimau', 'hah-REE-mow'], de: ['Tiger', 'TEE-ger'], ja: ['虎 (とら)', 'Tora'], pa: ['ਬਾਘ / ਚੀਤਾ', 'Baagh'], sw: ['Chui milia', 'CHOO-ee'],
      mr: ['वाघ', 'Vaagh'], te: ['పులి', 'Puli'], tr: ['Kaplan', 'kahp-LAHN'], ta: ['புலி', 'Puli'], vi: ['Con hổ / Cọp', 'hoh']
    })
  },
  {
    id: 411, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Elephant', 'EL-uh-funt'], zh: ['大象', 'Dàxiàng'], hi: ['हाथी / गज', 'Haathi'], es: ['Elefante', 'eh-leh-FAHN-teh'], fr: ['Éléphant', 'ay-lay-FAHN'],
      ar: ['فيل', 'Feel'], bn: ['হাতি', 'Hati'], pt: ['Elefante', 'eh-leh-FAHN-chee'], ru: ['Слон', 'SLOHN'], ur: ['ہاتھی', 'Haathi'],
      id: ['Gajah', 'GAH-jah'], de: ['Elefant', 'eh-leh-FAHNT'], ja: ['象 (ぞう)', 'Zou'], pa: ['ਹਾਥੀ', 'Haathi'], sw: ['Tembo / Ndovu', 'TEHM-boh'],
      mr: ['हत्ती', 'Hatti'], te: ['ఏనుగు', 'Enugu'], tr: ['Fil', 'FEEL'], ta: ['யானை', 'Yaanai'], vi: ['Con voi', 'voy']
    })
  },
  {
    id: 412, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Monkey', 'MUNG-kee'], zh: ['猴子', 'Hóuzi'], hi: ['बंदर / वानर', 'Bandar'], es: ['Mono', 'MOH-noh'], fr: ['Singe', 'SANZH'],
      ar: ['قرد', 'Qird'], bn: ['বানর', 'Bandor'], pt: ['Macaco', 'mah-KAH-koo'], ru: ['Обезьяна', 'ah-bye-ZYAH-nah'], ur: ['بندر', 'Bandar'],
      id: ['Monyet / Kera', 'MOHN-yet'], de: ['Affe', 'AHF-feh'], ja: ['猿 (さる)', 'Saru'], pa: ['ਬਾਂਦਰ', 'Baandar'], sw: ['Nyani / Kima', 'NYAH-nee'],
      mr: ['माकड', 'Maakad'], te: ['కోతి', 'Kothi'], tr: ['Maymun', 'meye-MOON'], ta: ['குரங்கு', 'Kurangu'], vi: ['Con khỉ', 'khee']
    })
  },
  {
    id: 413, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Bear', 'BAIR'], zh: ['熊', 'Xióng'], hi: ['भालू', 'Bhaalu'], es: ['Oso', 'OH-soh'], fr: ['Ours', 'OORS'],
      ar: ['دب', 'Dubb'], bn: ['ভাল্লুক', 'Bhalluk'], pt: ['Urso', 'OOR-soo'], ru: ['Медведь', 'myeed-VYEHT'], ur: ['ریچھ', 'Reechh'],
      id: ['Beruang', 'beh-ROO-ahng'], de: ['Bär', 'BAIR'], ja: ['熊 (くま)', 'Kuma'], pa: ['ਰਿੱਛ', 'Richh'], sw: ['Dubu', 'DOO-boo'],
      mr: ['अस्वल', 'Aswal'], te: ['ఎలుగుబంటి', 'Elugubanti'], tr: ['Ayı', 'ah-YUH'], ta: ['கரடி', 'Karadi'], vi: ['Con gấu', 'gow']
    })
  },
  {
    id: 414, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Snake', 'SNAYK'], zh: ['蛇', 'Shé'], hi: ['साँप / सर्प', 'Saanp'], es: ['Serpiente / Culebra', 'sehr-PYEHN-teh'], fr: ['Serpent', 'sair-PAHN'],
      ar: ['ثعبان / أفعى', 'Thu\'ban'], bn: ['সাপ', 'Saap'], pt: ['Cobra / Serpente', 'KOH-brah'], ru: ['Змея', 'zmyee-YAH'], ur: ['سانپ', 'Saanp'],
      id: ['Ular', 'OO-lahr'], de: ['Schlange', 'SHLAHN-geh'], ja: ['蛇 (へび)', 'Hebi'], pa: ['ਸੱਪ', 'Sapp'], sw: ['Nyoka', 'NYOH-kah'],
      mr: ['साप', 'Saap'], te: ['పాము', 'Paamu'], tr: ['Yılan', 'yuh-LAHN'], ta: ['பாம்பு', 'Paambu'], vi: ['Con rắn', 'zuhn']
    })
  },
  {
    id: 415, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Rabbit / Hare', 'RAB-it'], zh: ['兔子', 'Tùzi'], hi: ['खरगोश', 'Khargosh'], es: ['Conejo', 'koh-NEH-hoh'], fr: ['Lapin', 'lah-PAN'],
      ar: ['أرنب', 'Arnab'], bn: ['খরগোশ', 'Khorgosh'], pt: ['Coelho', 'koo-AY-lyoo'], ru: ['Кролик / Заяц', 'KROH-leek'], ur: ['خرگوش', 'Khargosh'],
      id: ['Kelinci', 'keh-LEEN-chee'], de: ['Kaninchen / Hase', 'kah-NEEN-khen'], ja: ['兎 (うさぎ)', 'Usagi'], pa: ['ਖ਼ਰਗੋਸ਼', 'Khargosh'], sw: ['Sungura', 'soon-GOO-rah'],
      mr: ['ससा', 'Sasa'], te: ['కుందేలు', 'Kundhelu'], tr: ['Tavşan', 'tahv-SHAHN'], ta: ['முயல்', 'Muyal'], vi: ['Con thỏ', 'thaw']
    })
  },
  {
    id: 416, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Duck', 'DUK'], zh: ['鸭子', 'Yāzi'], hi: ['बत्तख', 'Battakh'], es: ['Pato', 'PAH-toh'], fr: ['Canard', 'kah-NAHR'],
      ar: ['بطة', 'Battah'], bn: ['হাঁস', 'Haash'], pt: ['Pato', 'PAH-too'], ru: ['Утка', 'OOT-kah'], ur: ['بطخ', 'Batakh'],
      id: ['Bebek', 'BEH-behk'], de: ['Ente', 'EHN-teh'], ja: ['鴨 / アヒル (かも)', 'Kamo'], pa: ['ਬੱਤਖ਼', 'Battakh'], sw: ['Bata', 'BAH-tah'],
      mr: ['बदक', 'Badak'], te: ['బాతు', 'Baathu'], tr: ['Ördek', 'ur-DEHK'], ta: ['வாத்து', 'Vaatthu'], vi: ['Con vịt', 'veet']
    })
  },
  {
    id: 417, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Chicken / Hen', 'CHIK-in'], zh: ['鸡 / 母鸡', 'Jī'], hi: ['मुर्गी', 'Murgi'], es: ['Pollo / Gallina', 'POH-yoh'], fr: ['Poulet / Poule', 'poo-LAY'],
      ar: ['دجاجة', 'Dajajah'], bn: ['মুরগি', 'Murgi'], pt: ['Galinha / Frango', 'gah-LEEN-yah'], ru: ['Курица', 'KOO-ree-tsah'], ur: ['مرغی', 'Murgi'],
      id: ['Ayam', 'AH-yahm'], de: ['Huhn / Hähnchen', 'HOON'], ja: ['鶏 (にわとり)', 'Niwatori'], pa: ['ਮੁਰਗੀ', 'Murgi'], sw: ['Kuku', 'KOO-koo'],
      mr: ['कोंबडी', 'Kombadi'], te: ['కోడి', 'Kodi'], tr: ['Tavuk', 'tah-VOOK'], ta: ['கோழி', 'Kozhi'], vi: ['Con gà', 'gah']
    })
  },
  {
    id: 418, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Camel', 'KAM-ul'], zh: ['骆驼', 'Luòtuo'], hi: ['ऊँट', 'Oont'], es: ['Camello', 'kah-MEH-yoh'], fr: ['Chameau', 'shah-MOH'],
      ar: ['جمل / ناقة', 'Jamal'], bn: ['উট', 'Ut'], pt: ['Camelo', 'kah-MEH-loo'], ru: ['Верблюд', 'vyeer-BLYOOLT'], ur: ['اونٹ', 'Oont'],
      id: ['Unta', 'OON-tah'], de: ['Kamel', 'kah-MAYL'], ja: ['ラクダ (駱駝)', 'Rakuda'], pa: ['ਊਠ', 'Ooth'], sw: ['Ngamia', 'n-gah-MEE-ah'],
      mr: ['उंट', 'Unt'], te: ['ఒంటె', 'Onte'], tr: ['Deve', 'deh-VEH'], ta: ['ஒட்டகம்', 'Ottagam'], vi: ['Lạc đà', 'lahk dah']
    })
  },
  {
    id: 419, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Deer', 'DEER'], zh: ['鹿', 'Lù'], hi: ['हिरण / मृग', 'Hiran'], es: ['Ciervo / Venado', 'SYEHR-voh'], fr: ['Cerf / Biche', 'SAIR'],
      ar: ['غزال / أيل', 'Ghazal'], bn: ['হরিণ', 'Horin'], pt: ['Cervo / Veado', 'SEHR-voo'], ru: ['Олень', 'ah-LYEHN'], ur: ['ہرن', 'Hiran'],
      id: ['Rusa', 'ROO-sah'], de: ['Hirsch / Reh', 'HEERSH'], ja: ['鹿 (しか)', 'Shika'], pa: ['ਹਿਰਨ', 'Hiran'], sw: ['Kulungu / Paa', 'koo-LOON-goo'],
      mr: ['हरिण', 'Harin'], te: ['జింక', 'Jinka'], tr: ['Geyik', 'geh-YEEK'], ta: ['மான்', 'Maan'], vi: ['Con hươu / Nai', 'hoo-oh']
    })
  },
  {
    id: 420, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Wolf', 'WOOLF'], zh: ['狼', 'Láng'], hi: ['भेड़िया', 'Bhediya'], es: ['Lobo', 'LOH-boh'], fr: ['Loup', 'LOO'],
      ar: ['ذئب', 'Thi\'b'], bn: ['নেকড়ে', 'Nekde'], pt: ['Lobo', 'LOH-boo'], ru: ['Волк', 'VOHLK'], ur: ['بھیڑیا', 'Bhediya'],
      id: ['Serigala', 'seh-ree-GAH-lah'], de: ['Wolf', 'VOLF'], ja: ['狼 (おおかみ)', 'Ookami'], pa: ['ਬਘਿਆੜ', 'Baghiyaad'], sw: ['Mbwa mwitu', 'm-BWAH'],
      mr: ['लांडगा', 'Laandga'], te: ['తోడేలు', 'Thodelu'], tr: ['Kurt', 'KOORT'], ta: ['ஓநாய்', 'Onaai'], vi: ['Chó sói', 'chaw soy']
    })
  },
  {
    id: 421, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Fox', 'FOKS'], zh: ['狐狸', 'Húli'], hi: ['लोमड़ी', 'Lomdi'], es: ['Zorro', 'SOH-rroh'], fr: ['Renard', 'ruh-NAHR'],
      ar: ['ثعلب', 'Tha\'lab'], bn: ['খেঁকশিয়াল', 'Khekshiyal'], pt: ['Raposa', 'hah-POH-zah'], ru: ['Лиса / Лисица', 'lee-SAH'], ur: ['لومڑی', 'Lomdi'],
      id: ['Rubah', 'ROO-bah'], de: ['Fuchs', 'FOOKS'], ja: ['狐 (きつね)', 'Kitsune'], pa: ['ਲੂੰਬੜੀ', 'Loomdi'], sw: ['Mbweha', 'm-BWEH-hah'],
      mr: ['कोल्हा', 'Kolha'], te: ['నక్క', 'Nakka'], tr: ['Tilki', 'teel-KEE'], ta: ['நரி', 'Nari'], vi: ['Con cáo', 'cow']
    })
  },
  {
    id: 422, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Bee (Honeybee)', 'BEE'], zh: ['蜜蜂', 'Mìfēng'], hi: ['मधुमक्खी', 'Madhumakkhi'], es: ['Abeja', 'ah-BEH-hah'], fr: ['Abeille', 'ah-BAY-yuh'],
      ar: ['نحلة', 'Nahlah'], bn: ['মৌমাছি', 'Moumachi'], pt: ['Abelha', 'ah-BAYL-yah'], ru: ['Пчела', 'pcheh-LAH'], ur: ['شہد کی مکھی', 'Makhi'],
      id: ['Lebah', 'LEH-bah'], de: ['Biene', 'BEE-neh'], ja: ['蜂 / ミツバチ (はち)', 'Hachi'], pa: ['ਮਧੂ-ਮੱਖੀ', 'Madhu makkhi'], sw: ['Nyuki', 'NYOO-kee'],
      mr: ['मधमाशी', 'Madhmaashi'], te: ['తేనెటీగ', 'Theneteega'], tr: ['Arı', 'ah-RUH'], ta: ['தேனீ', 'Thenee'], vi: ['Con ong', 'ong']
    })
  },
  {
    id: 423, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Butterfly', 'BUT-er-fly'], zh: ['蝴蝶', 'Húdié'], hi: ['तितली', 'Titli'], es: ['Mariposa', 'mah-ree-POH-sah'], fr: ['Papillon', 'pah-pee-YOHN'],
      ar: ['فراشة', 'Farashah'], bn: ['প্রজাপতি', 'Projaproti'], pt: ['Borboleta', 'bohr-boh-LAY-tah'], ru: ['Бабочка', 'BAH-bahch-kah'], ur: ['تتلی', 'Titli'],
      id: ['Kupu-kupu', 'KOO-poo KOO-poo'], de: ['Schmetterling', 'SHMET-ter-ling'], ja: ['蝶 (ちょう)', 'Chou'], pa: ['ਤਿੱਤਲੀ', 'Tittli'], sw: ['Kipepeo', 'kee-peh-PEH-oh'],
      mr: ['फुलपाखरू', 'Phulpaakhru'], te: ['సీతాకోకచిలుక', 'Seethaakokachiluka'], tr: ['Kelebek', 'keh-leh-BEHK'], ta: ['வண்ணத்துப்பூச்சி', 'Vannatthuppoochi'], vi: ['Con bướm', 'boo-um']
    })
  },
  {
    id: 424, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Ant', 'ANT'], zh: ['蚂蚁', 'Mǎyǐ'], hi: ['चींटी', 'Cheenti'], es: ['Hormiga', 'ohr-MEE-gah'], fr: ['Fourmi', 'foor-MEE'],
      ar: ['نملة', 'Namlah'], bn: ['পিঁপড়া', 'Pipda'], pt: ['Formiga', 'fohr-MEE-gah'], ru: ['Муравей', 'moo-rah-VYAY'], ur: ['چیونٹی', 'Cheenti'],
      id: ['Semut', 'SEH-moot'], de: ['Ameise', 'AH-my-zeh'], ja: ['蟻 (あり)', 'Ari'], pa: ['ਕੀੜੀ', 'Keedi'], sw: ['Siafu / Chungu', 'see-AH-foo'],
      mr: ['मुंगी', 'Mungi'], te: ['చీమ', 'Cheema'], tr: ['Karınca', 'kah-ruhn-JAH'], ta: ['எறும்பு', 'Erumbu'], vi: ['Con kiến', 'kee-en']
    })
  },
  {
    id: 425, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Spider', 'SPY-der'], zh: ['蜘蛛', 'Zhīzhū'], hi: ['मकड़ी', 'Makdi'], es: ['Araña', 'ah-RAH-nyah'], fr: ['Araignée', 'ah-reh-NYAY'],
      ar: ['عنكبوت', '\'Ankaboot'], bn: ['মাকড়সা', 'Makdasha'], pt: ['Aranha', 'ah-RAHN-yah'], ru: ['Паук', 'pah-OOK'], ur: ['مکڑی', 'Makdi'],
      id: ['Laba-laba', 'LAH-bah LAH-bah'], de: ['Spinne', 'SHPIN-neh'], ja: ['蜘蛛 (くも)', 'Kumo'], pa: ['ਮੱਕੜੀ', 'Makkdi'], sw: ['Buibui', 'boo-ee-BOO-ee'],
      mr: ['कोळी', 'Koli'], te: ['సాలీడు', 'Saaleedu'], tr: ['Örümcek', 'ur-room-JEHK'], ta: ['சிலந்தி', 'Silandhi'], vi: ['Con nhện', 'nyen']
    })
  },
  {
    id: 426, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Fly / Housefly', 'FLYE'], zh: ['苍蝇', 'Cāngying'], hi: ['मक्खी', 'Makkhi'], es: ['Mosca', 'MOHS-kah'], fr: ['Mouche', 'MOOSH'],
      ar: ['ذبابة', 'Thubabah'], bn: ['মাছি', 'Maachhi'], pt: ['Mosca', 'MOHS-kah'], ru: ['Муха', 'MOO-khah'], ur: ['مکھی', 'Makkhi'],
      id: ['Lalat', 'LAH-laht'], de: ['Fliege', 'FLEE-geh'], ja: ['蝿 (はえ)', 'Hae'], pa: ['ਮੱਖੀ', 'Makkhi'], sw: ['Inzi', 'EEN-zee'],
      mr: ['माशी', 'Maashi'], te: ['ఈగ', 'Eega'], tr: ['Sinek', 'see-NEHK'], ta: ['ஈ', 'Ee'], vi: ['Con ruồi', 'zoo-ee']
    })
  },
  {
    id: 427, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Mosquito', 'muh-SKEE-toh'], zh: ['蚊子', 'Wénzi'], hi: ['मच्छर', 'Machhar'], es: ['Mosquito', 'mohs-KEE-toh'], fr: ['Moustique', 'moos-TEEK'],
      ar: ['بعوضة', 'Ba\'oodah'], bn: ['মশা', 'Mosha'], pt: ['Mosquito / Pernilongo', 'mohs-KEE-too'], ru: ['Комар', 'kah-MAHR'], ur: ['مچھر', 'Machhar'],
      id: ['Nyamuk', 'NYAH-mook'], de: ['Mücke / Moskito', 'MEE-keh'], ja: ['蚊 (か)', 'Ka'], pa: ['ਮੱਛਰ', 'Machhar'], sw: ['Mbu', 'M-boo'],
      mr: ['डास', 'Daas'], te: ['దోమ', 'Dhoma'], tr: ['Sivrisinek', 'seev-ree-see-NEHK'], ta: ['கொசு', 'Kosu'], vi: ['Con muỗi', 'mwoy']
    })
  },
  {
    id: 428, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Whale', 'WAYL'], zh: ['鲸鱼 / 鲸', 'Jīng'], hi: ['व्हेल मछली', 'Whale'], es: ['Ballena', 'bah-YEH-nah'], fr: ['Baleine', 'bah-LEN'],
      ar: ['حوت', 'Hoot'], bn: ['তিমি', 'Timi'], pt: ['Baleia', 'bah-LAY-ah'], ru: ['Кит', 'KEET'], ur: ['وہیل مچھلی', 'Whale'],
      id: ['Paus', 'POW-oos'], de: ['Wal', 'VAHL'], ja: ['鯨 (くじら)', 'Kujira'], pa: ['ਵ੍ਹੇਲ', 'Whale'], sw: ['Nyangumi', 'nyahn-GOO-mee'],
      mr: ['देवमासा / व्हेल', 'Devmaasa'], te: ['తిమింగలం', 'Thimingalam'], tr: ['Balina', 'bah-lee-NAH'], ta: ['திமிங்கிலம்', 'Thimingilam'], vi: ['Cá voi', 'kah voy']
    })
  },
  {
    id: 429, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Dolphin', 'DOL-fin'], zh: ['海豚', 'Hǎitún'], hi: ['डॉल्फ़िन', 'Dolphin'], es: ['Delfín', 'del-FEEN'], fr: ['Dauphin', 'doh-FAN'],
      ar: ['دلفين', 'Dulfeen'], bn: ['শুশুক / ডলফিন', 'Dolphin'], pt: ['Golfinho', 'gohl-FEEN-yoo'], ru: ['Дельфин', 'dyehl-FEEN'], ur: ['ڈولفن', 'Dolphin'],
      id: ['Lumba-lumba', 'LOOM-bah'], de: ['Delfin', 'del-FEEN'], ja: ['イルカ (海豚)', 'Iruka'], pa: ['ਡਾਲਫਿਨ', 'Dolphin'], sw: ['Pomboo', 'pohm-BOH-oh'],
      mr: ['डॉल्फिन', 'Dolphin'], te: ['డాల్ఫిన్', 'Dolphin'], tr: ['Yunus', 'yoo-NOOS'], ta: ['டால்பின்', 'Dolphin'], vi: ['Cá heo', 'kah heh-oh']
    })
  },
  {
    id: 430, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Shark', 'SHARK'], zh: ['鲨鱼', 'Shāyú'], hi: ['शार्क', 'Shark'], es: ['Tiburón', 'tee-boo-ROHN'], fr: ['Requin', 'ruh-KAN'],
      ar: ['قرش / سمك القرش', 'Qirsh'], bn: ['হাঙ্গর', 'Hangor'], pt: ['Tubarão', 'too-bah-ROWN'], ru: ['Акула', 'ah-KOO-lah'], ur: ['شارک مچھلی', 'Shark'],
      id: ['Hiu', 'HEE-oo'], de: ['Hai / Haifisch', 'HYE'], ja: ['サメ (鮫)', 'Same'], pa: ['ਸ਼ਾਰਕ', 'Shark'], sw: ['Papa', 'PAH-pah'],
      mr: ['शार्क मासा', 'Shark'], te: ['సొరచేప', 'Sorachepa'], tr: ['Köpekbalığı', 'kur-PEHK'], ta: ['சுறா', 'Suraa'], vi: ['Cá mập', 'kah muhp']
    })
  },
  {
    id: 431, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Crab', 'KRAB'], zh: ['螃蟹', 'Pángxiè'], hi: ['केकड़ा', 'Kekda'], es: ['Cangrejo', 'kahn-GREH-hoh'], fr: ['Crabe', 'KRAHB'],
      ar: ['سلطعون / كابوريا', 'Sart\'an'], bn: ['কাঁকড়া', 'Kaakda'], pt: ['Caranguejo', 'kah-rahn-GAY-zhoo'], ru: ['Краб', 'KRAHP'], ur: ['کیکڑا', 'Kaikda'],
      id: ['Kepiting', 'keh-PEE-teeng'], de: ['Krabbe', 'KRAHB-beh'], ja: ['蟹 (かに)', 'Kani'], pa: ['ਕੇਕੜਾ', 'Kekda'], sw: ['Kaa', 'KAH-ah'],
      mr: ['खेकडा', 'Khekda'], te: ['పీత', 'Peetha'], tr: ['Yengeç', 'yehn-GEHTCH'], ta: ['நண்டு', 'Nandu'], vi: ['Con cua', 'koo-uh']
    })
  },
  {
    id: 432, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Eagle', 'EE-gul'], zh: ['老鹰 / 鹰', 'Lǎoyīng'], hi: ['चील / बाज़ / गरुड़', 'Cheel'], es: ['Águila', 'AH-gee-lah'], fr: ['Aigle', 'AY-gluh'],
      ar: ['نسر / عقاب', 'Nasr / \'Uqab'], bn: ['ঈগল / বাজপাখি', 'Eagle'], pt: ['Águia', 'AH-gee-ah'], ru: ['Орел', 'ah-RYOHL'], ur: ['عقاب / شاہین', 'Uqaab'],
      id: ['Elang', 'EH-lahng'], de: ['Adler', 'AHT-ler'], ja: ['鷲 (わし)', 'Washi'], pa: ['ਬਾਜ਼ / ਉਕਾਬ', 'Baaz'], sw: ['Tai', 'TAH-ee'],
      mr: ['गरुड', 'Garud'], te: ['గద్ద / గరుడపక్షి', 'Gadda'], tr: ['Kartal', 'kahr-TAHL'], ta: ['கழுகு', 'Kazhugu'], vi: ['Chim đại bàng', 'dye bahng']
    })
  },
  {
    id: 433, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Pigeon / Dove', 'PIJ-un'], zh: ['鸽子', 'Gēzi'], hi: ['कबूतर', 'Kabootar'], es: ['Paloma', 'pah-LOH-mah'], fr: ['Pigeon / Colombe', 'pee-ZHOHN'],
      ar: ['حمامة', 'Hamamah'], bn: ['কবুতর / পায়রা', 'Kobutor'], pt: ['Pombo / Pomba', 'POHM-boo'], ru: ['Голубь', 'GOH-loopt'], ur: ['کبوتر', 'Kabootar'],
      id: ['Merpati / Burung dara', 'mehr-PAH-tee'], de: ['Taube', 'TOW-beh'], ja: ['鳩 (はと)', 'Hato'], pa: ['ਕਬੂਤਰ', 'Kabootar'], sw: ['Njiwa', 'n-JEE-wah'],
      mr: ['कबुतर', 'Kabutar'], te: ['పావురం', 'Paavuram'], tr: ['Güvercin', 'goo-vehr-JEEN'], ta: ['புறா', 'Puraa'], vi: ['Chim bồ câu', 'boh kow']
    })
  },
  {
    id: 434, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Owl', 'OWL'], zh: ['猫头鹰', 'Māotóuyīng'], hi: ['उल्लू', 'Ullu'], es: ['Búho / Lechuza', 'BOO-oh'], fr: ['Hibou / Chouette', 'ee-BOO'],
      ar: ['بومة', 'Boomah'], bn: ['পেঁচা', 'Pencha'], pt: ['Coruja', 'koh-ROO-zhah'], ru: ['Сова / Филин', 'sah-VAH'], ur: ['الو', 'Ullu'],
      id: ['Burung hantu', 'HAHN-too'], de: ['Eule', 'OY-leh'], ja: ['梟 (ふくろう)', 'Fukurou'], pa: ['ਉੱਲੂ', 'Ullu'], sw: ['Bundi', 'BOON-dee'],
      mr: ['घुबड', 'Ghubad'], te: ['గుడ్లగూబ', 'Gudlaguuba'], tr: ['Baykuş', 'BYE-koosh'], ta: ['ஆந்தை', 'Aandhai'], vi: ['Chim cú mèo', 'koo meh-oh']
    })
  },
  {
    id: 435, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Parrot', 'PAIR-ut'], zh: ['鹦鹉', 'Yīngwǔ'], hi: ['तोता', 'Tota'], es: ['Loro / Papagayo', 'LOH-roh'], fr: ['Perroquet', 'peh-roh-KAY'],
      ar: ['ببغاء', 'Babbagha\''], bn: ['তোতা / টিয়া', 'Tiya'], pt: ['Papagaio', 'pah-pah-GYE-oo'], ru: ['Попугай', 'pah-poo-GYE'], ur: ['طوطا', 'Tota'],
      id: ['Burung beo / Nuri', 'BEH-oh'], de: ['Papagei', 'pah-pah-GYE'], ja: ['オウム / インコ (おうむ)', 'Oumu'], pa: ['ਤੋਤਾ', 'Tota'], sw: ['Kasuku', 'kah-SOO-koo'],
      mr: ['पोपट', 'Popat'], te: ['చిలుక', 'Chiluka'], tr: ['Papağan', 'pah-pah-GAHN'], ta: ['கிளி', 'Kili'], vi: ['Con vẹt', 'veht']
    })
  },
  {
    id: 436, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Frog', 'FROG'], zh: ['青蛙', 'Qīngwā'], hi: ['मेंढक', 'Mendhak'], es: ['Rana', 'RAH-nah'], fr: ['Grenouille', 'gruh-NOO-yuh'],
      ar: ['ضفدع', 'Difda\''], bn: ['ব্যাঙ', 'Byang'], pt: ['Rã / Sapo', 'HAHN'], ru: ['Лягушка', 'lyah-GOOSH-kah'], ur: ['مینڈک', 'Mendhak'],
      id: ['Katak / Kodok', 'KAH-tahk'], de: ['Frosch', 'FROSH'], ja: ['蛙 (かえる)', 'Kaeru'], pa: ['ਡੱਡੂ', 'Daddu'], sw: ['Chura', 'CHOO-rah'],
      mr: ['बेडूक', 'Bedook'], te: ['కప్ప', 'Kappa'], tr: ['Kurbağa', 'koor-bah-AH'], ta: ['தவளை', 'Thavalai'], vi: ['Con ếch', 'ehch']
    })
  },
  {
    id: 437, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Turtle / Tortoise', 'TER-tul'], zh: ['乌龟 / 龟', 'Wūguī'], hi: ['कछुआ', 'Kachhua'], es: ['Tortuga', 'tohr-TOO-gah'], fr: ['Tortue', 'tor-TEW'],
      ar: ['سلحفاة', 'Sulahfah'], bn: ['কচ্ছপ', 'Kocchop'], pt: ['Tartaruga', 'tahr-tah-ROO-gah'], ru: ['Черепаха', 'chye-ryee-PAH-khah'], ur: ['کچھوا', 'Kachhwa'],
      id: ['Kura-kura / Penyu', 'KOO-rah'], de: ['Schildkröte', 'SHEELT-krer-teh'], ja: ['亀 (かめ)', 'Kame'], pa: ['ਕੱਛੂਕੁੰਮਾ', 'Kachhookumma'], sw: ['Kobe', 'KOH-beh'],
      mr: ['कासव', 'Kaasav'], te: ['తాబేలు', 'Thaabelu'], tr: ['Kaplumbağa', 'kahp-loom-bah-AH'], ta: ['ஆமை', 'Aamai'], vi: ['Con rùa', 'zoo-uh']
    })
  },
  {
    id: 438, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Crocodile', 'KROK-uh-dyle'], zh: ['鳄鱼', 'Èyú'], hi: ['मगरमच्छ', 'Magarmacch'], es: ['Cocodrilo', 'koh-koh-DREE-loh'], fr: ['Crocodile', 'kroh-koh-DEEL'],
      ar: ['تمساح', 'Timsah'], bn: ['কুমির', 'Kumir'], pt: ['Crocodilo / Jacaré', 'kroh-koh-JEE-loo'], ru: ['Крокодил', 'kruh-kah-DEEL'], ur: ['مگر مچھ', 'Magarmacch'],
      id: ['Buaya', 'boo-AH-yah'], de: ['Krokodil', 'kroh-koh-DEEL'], ja: ['ワニ (鰐)', 'Wani'], pa: ['ਮਗਰਮੱਛ', 'Magarmachh'], sw: ['Mamba', 'MAHM-bah'],
      mr: ['मगर', 'Magar'], te: ['మొసలి', 'Mosali'], tr: ['Timsah', 'teem-SAH'], ta: ['முதலை', 'Mudhalai'], vi: ['Cá sấu', 'kah sow']
    })
  },
  {
    id: 439, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Bat (Animal)', 'BAT'], zh: ['蝙蝠', 'Biānfú'], hi: ['चमगादड़', 'Chamgaadad'], es: ['Murciélago', 'moor-SYEH-lah-goh'], fr: ['Chauve-souris', 'SHOHV soo-ree'],
      ar: ['خفاش / وطواط', 'Khuffash'], bn: ['বাদুড়', 'Badur'], pt: ['Morcego', 'mohr-SAY-goo'], ru: ['Летучая мышь', 'lyee-TOO-chah-yah'], ur: ['چمگادڑ', 'Chamgaadad'],
      id: ['Kelelawar', 'keh-leh-LAH-wahr'], de: ['Fledermaus', 'FLAY-der-mows'], ja: ['蝙蝠 (こうもり)', 'Koumori'], pa: ['ਚਮਗਿੱਦੜ', 'Chamgiddad'], sw: ['Popo', 'POH-poh'],
      mr: ['वटवाघूळ', 'Vatvaaghool'], te: ['గబ్బిలం', 'Gabbilam'], tr: ['Yarasa', 'yah-rah-SAH'], ta: ['வௌவால்', 'Vauvaal'], vi: ['Con dơi', 'zuh-ee']
    })
  },
  {
    id: 440, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Deer / Gazelle', 'guh-ZEL'], zh: ['羚羊 / 瞪羚', 'Língyáng'], hi: ['गज़ल / मृग', 'Hiran'], es: ['Gacela', 'gah-SEH-lah'], fr: ['Gazelle', 'gah-ZEL'],
      ar: ['غزال', 'Ghazal'], bn: ['হরিণবিশেষ', 'Horin'], pt: ['Gazela', 'gah-ZEH-lah'], ru: ['Газель', 'gah-ZYEHL'], ur: ['غزال / ہرن', 'Ghazal'],
      id: ['Gazel / Kijang', 'GAH-zehl'], de: ['Gazelle', 'gah-TSEL-leh'], ja: ['ガゼル', 'Gazeru'], pa: ['ਹਿਰਨ', 'Hiran'], sw: ['Swala', 'SWAH-lah'],
      mr: ['हरिण / काळवीट', 'Harin'], te: ['లేడి', 'Ledi'], tr: ['Ceylan / Gazal', 'jay-LAHN'], ta: ['புள்ளிமான்', 'Pullimaan'], vi: ['Linh dương', 'linh zoo-ung']
    })
  },
  {
    id: 441, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Fox', 'FOKS'], zh: ['狐狸', 'Húli'], hi: ['लोमड़ी', 'Lomdi'], es: ['Zorro', 'SOH-rroh'], fr: ['Renard', 'ruh-NAHR'],
      ar: ['ثعلب', 'Tha\'lab'], bn: ['শিয়াল', 'Shiyal'], pt: ['Raposa', 'hah-POH-zah'], ru: ['Лиса', 'lee-SAH'], ur: ['لومڑی', 'Lomdi'],
      id: ['Rubah', 'ROO-bah'], de: ['Fuchs', 'FOOKS'], ja: ['狐 (きつね)', 'Kitsune'], pa: ['ਲੂੰਬੜੀ', 'Loomdi'], sw: ['Mbweha', 'm-BWEH-hah'],
      mr: ['कोल्हा', 'Kolha'], te: ['నక్క', 'Nakka'], tr: ['Tilki', 'teel-KEE'], ta: ['நரி', 'Nari'], vi: ['Con cáo', 'cow']
    })
  },
  {
    id: 442, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Donkey', 'DONG-kee'], zh: ['驴', 'Lǘ'], hi: ['गधा', 'Gadha'], es: ['Burro / Asno', 'BOO-rroh'], fr: ['Âne', 'AHN'],
      ar: ['حمار', 'Himar'], bn: ['গাধা', 'Gadha'], pt: ['Burro / Jumento', 'BOO-hoo'], ru: ['Осел', 'ah-SYOHL'], ur: ['گدھا', 'Gadha'],
      id: ['Keledai', 'keh-leh-DYE'], de: ['Esel', 'AY-zel'], ja: ['ロバ (驢馬)', 'Roba'], pa: ['ਖੋਤਾ / ਗਧਾ', 'Khota'], sw: ['Punda', 'POON-dah'],
      mr: ['गाढव', 'Gaadhav'], te: ['గాడిద', 'Gaadida'], tr: ['Eşek', 'eh-SHEHK'], ta: ['கழுதை', 'Kazhudhai'], vi: ['Con lừa', 'loo-uh']
    })
  },
  {
    id: 443, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Penguin', 'PEN-gwin'], zh: ['企鹅', 'Qǐ\'é'], hi: ['पेंगुइन', 'Penguin'], es: ['Pingüino', 'peen-GWEE-noh'], fr: ['Manchot / Pingouin', 'pahn-GWAN'],
      ar: ['بطريق', 'Bitreeq'], bn: ['পেঙ্গুইন', 'Penguin'], pt: ['Pinguim', 'peen-GWEEM'], ru: ['Пингвин', 'peen-GVEEN'], ur: ['پینگوئن', 'Penguin'],
      id: ['Penguin', 'PEHNG-ween'], de: ['Pinguin', 'peen-goo-EEN'], ja: ['ペンギン', 'Pengin'], pa: ['ਪੈਂਗੁਇਨ', 'Penguin'], sw: ['Pengwini', 'pen-GWEE-nee'],
      mr: ['पेंग्विन', 'Penguin'], te: ['పెంగ్విన్', 'Penguin'], tr: ['Penguen', 'pehn-goo-EHN'], ta: ['பென்குயின்', 'Penguin'], vi: ['Chim cánh cụt', 'kahn koot']
    })
  },
  {
    id: 444, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Zebra', 'ZEE-bruh'], zh: ['斑马', 'Bānmǎ'], hi: ['ज़ेबरा', 'Zebra'], es: ['Cebra', 'SEH-brah'], fr: ['Zèbre', 'ZEH-bruh'],
      ar: ['حمار وحشي', 'Himar wahshee'], bn: ['জেব্রা', 'Zebra'], pt: ['Zebra', 'ZEH-brah'], ru: ['Зебра', 'ZYEH-brah'], ur: ['زیبرا', 'Zebra'],
      id: ['Zebra', 'ZEH-brah'], de: ['Zebra', 'TSAY-brah'], ja: ['シマウマ (縞馬)', 'Shimauma'], pa: ['ਜ਼ੈਬਰਾ', 'Zebra'], sw: ['Punda milia', 'POON-dah mee-LEE-ah'],
      mr: ['झेब्रा', 'Zebra'], te: ['జీబ్రా', 'Zebra'], tr: ['Zebra', 'ZEHB-rah'], ta: ['வரிக்குதிரை', 'Varikkudhirai'], vi: ['Ngựa vằn', 'ngoo-uh vuhn']
    })
  },
  {
    id: 445, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Giraffe', 'juh-RAF'], zh: ['长颈鹿', 'Chángjǐnglù'], hi: ['जिराफ़', 'Giraffe'], es: ['Jirafa', 'hee-RAH-fah'], fr: ['Girafe', 'zhee-RAHF'],
      ar: ['زرافة', 'Zarafah'], bn: ['জিরাফ', 'Giraffe'], pt: ['Girafa', 'zhee-RAH-fah'], ru: ['Жираф', 'zhee-RAHF'], ur: ['زرافہ', 'Zarafa'],
      id: ['Jerapah', 'jeh-RAH-pah'], de: ['Giraffe', 'zhee-RAHF-feh'], ja: ['キリン (麒麟)', 'Kirin'], pa: ['ਜਿਰਾਫ਼', 'Giraffe'], sw: ['Twiga', 'TWEE-gah'],
      mr: ['जिराफ', 'Giraffe'], te: ['జిరాఫీ', 'Giraffe'], tr: ['Zürafa', 'zoo-RAH-fah'], ta: ['ஒட்டகச்சிவிங்கி', 'Ottagachivungi'], vi: ['Hươu cao cổ', 'hoo-oh kow koh']
    })
  },
  {
    id: 446, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Kangaroo', 'kang-guh-ROO'], zh: ['袋鼠', 'Dàishǔ'], hi: ['कंगारू', 'Kangaroo'], es: ['Canguro', 'kahn-GOO-roh'], fr: ['Kangourou', 'kahn-goo-ROO'],
      ar: ['كنغر', 'Kangar'], bn: ['ক্যাঙ্গারু', 'Kangaroo'], pt: ['Canguru', 'kahn-goo-ROO'], ru: ['Кенгуру', 'kyeen-goo-ROO'], ur: ['کنگارو', 'Kangaroo'],
      id: ['Kanguru', 'kahn-GOO-roo'], de: ['Känguru', 'KENG-goo-roo'], ja: ['カンガルー', 'Kangaruu'], pa: ['ਕੰਗਾਰੂ', 'Kangaroo'], sw: ['Kangaru', 'kahn-GAH-roo'],
      mr: ['कांगारू', 'Kangaroo'], te: ['కంగారూ', 'Kangaroo'], tr: ['Kanguru', 'kahn-goo-ROO'], ta: ['கங்காரு', 'Kangaroo'], vi: ['Chuột túi / Kangaroo', 'chwot tooy']
    })
  },
  {
    id: 447, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Panda', 'PAN-duh'], zh: ['大熊猫 / 熊猫', 'Xióngmāo'], hi: ['पांडा', 'Panda'], es: ['Panda', 'PAHN-dah'], fr: ['Panda', 'pahn-DAH'],
      ar: ['باندا', 'Banda'], bn: ['পান্ডা', 'Panda'], pt: ['Panda', 'PAHN-dah'], ru: ['Панда', 'PAHN-dah'], ur: ['پانڈا', 'Panda'],
      id: ['Panda', 'PAHN-dah'], de: ['Panda', 'PAHN-dah'], ja: ['パンダ', 'Panda'], pa: ['ਪਾਂਡਾ', 'Panda'], sw: ['Panda', 'PAHN-dah'],
      mr: ['पांडा', 'Panda'], te: ['పాండా', 'Panda'], tr: ['Panda', 'PAHN-dah'], ta: ['பாண்டா கரடி', 'Panda'], vi: ['Gấu trúc', 'gow chook']
    })
  },
  {
    id: 448, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Peacock', 'PEE-kok'], zh: ['孔雀', 'Kǒngquè'], hi: ['मोर / मयूर', 'Mor'], es: ['Pavo real', 'PAH-voh reh-AHL'], fr: ['Paon', 'PAHN'],
      ar: ['طاووس', 'Tawoos'], bn: ['ময়ূর', 'Moyur'], pt: ['Pavão', 'pah-VOWN'], ru: ['Павлин', 'pahv-LEEN'], ur: ['مور', 'Mor'],
      id: ['Merak', 'meh-RAHK'], de: ['Pfau', 'PFOW'], ja: ['孔雀 (くじゃく)', 'Kujaku'], pa: ['ਮੋਰ', 'Mor'], sw: ['Tausi', 'tah-OO-see'],
      mr: ['मोर', 'Mor'], te: ['నెమలి', 'Nemali'], tr: ['Tavus kuşu', 'tah-VOOS'], ta: ['மயில்', 'Mayil'], vi: ['Con công', 'kong']
    })
  },
  {
    id: 449, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Swan', 'SWON'], zh: ['天鹅', 'Tiān\'é'], hi: ['हंस', 'Hans'], es: ['Cisne', 'SEES-neh'], fr: ['Cygne', 'SEEN-yuh'],
      ar: ['تم / بجعة', 'Tam'], bn: ['রাজহাঁস', 'Rajhaash'], pt: ['Cisne', 'SEES-nee'], ru: ['Лебедь', 'LYEH-byeet'], ur: ['ہنس / راج ہنس', 'Hans'],
      id: ['Angsa', 'AHNG-sah'], de: ['Schwan', 'SHVAHN'], ja: ['白鳥 (はくちょう)', 'Hakuchou'], pa: ['ਹੰਸ', 'Hans'], sw: ['Bata maji mweupe', 'BAH-tah'],
      mr: ['हंस', 'Hans'], te: ['హంస', 'Hamsa'], tr: ['Kuğu', 'koo-OO'], ta: ['அன்னப்பறவை', 'Annapparavai'], vi: ['Thiên nga', 'thee-en ngah']
    })
  },
  {
    id: 450, category: 'Animals & Nature',
    translations: createTranslationMap({
      en: ['Octopus', 'OK-tuh-pus'], zh: ['章鱼 / 八爪鱼', 'Zhāngyú'], hi: ['ऑक्टोपस / अष्टबाहु', 'Octopus'], es: ['Pulpo', 'POOL-poh'], fr: ['Pieuvre / Poulpe', 'PYUH-vruh'],
      ar: ['أخطبوط', 'Ukhtuboot'], bn: ['অক্টোপাস', 'Octopus'], pt: ['Polvo', 'POHL-voo'], ru: ['Осьминог', 'ahs-mee-NOHK'], ur: ['آکٹوپس', 'Octopus'],
      id: ['Gurita', 'goo-REE-tah'], de: ['Oktopus / Krake', 'ok-toh-POOS'], ja: ['蛸 (たこ)', 'Tako'], pa: ['ਆਕਟੋਪਸ', 'Octopus'], sw: ['Pweza', 'PWEH-zah'],
      mr: ['ऑक्टोपस', 'Octopus'], te: ['ఆక్టోపస్', 'Octopus'], tr: ['Ahtapot', 'ah-tah-POHT'], ta: ['எண்காலி / ஆக்டோபஸ்', 'Enkaali'], vi: ['Bạch tuộc', 'bahch twohk']
    })
  }
];

module.exports = { VOCAB_BATCH_10 };
