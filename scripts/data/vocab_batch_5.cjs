const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_5 = [
  // ─────────────────────────────────────────────────────────────
  // 7. PLACES & TRAVEL CONTINUED (151 - 165)
  // ─────────────────────────────────────────────────────────────
  {
    id: 151, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Beach', 'BEECH'], zh: ['海滩 / 沙滩', 'Hǎitān'], hi: ['समुद्र तट / बीच', 'Samudra Tat'], es: ['Playa', 'PLAH-yah'], fr: ['Plage', 'PLAHZH'],
      ar: ['شاطئ', 'Shati\''], bn: ['সৈকত / বিচ', 'Shoikot'], pt: ['Praia', 'PRY-ah'], ru: ['Пляж', 'PLYAHZH'], ur: ['ساحل سمندر', 'Sahil-e-Samundar'],
      id: ['Pantai', 'PAHN-tye'], de: ['Strand', 'SHTRAHNT'], ja: ['浜辺 / ビーチ', 'Hamabe'], pa: ['ਸਮੁੰਦਰੀ ਤੱਟ', 'Samundari tatt'], sw: ['Pwani / Fukwe', 'PWAH-nee'],
      mr: ['समुद्रकिनारा', 'Samudrakinara'], te: ['సముద్ర తీరం / బీచ్', 'Samudra Teeram'], tr: ['Plaj / Sahil', 'PLAHZH'], ta: ['கடற்கரை', 'Kadarkarai'], vi: ['Bãi biển', 'bye byen']
    })
  },
  {
    id: 152, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Mountain', 'MOWN-tin'], zh: ['山', 'Shān'], hi: ['पहाड़ / पर्वत', 'Pahaad / Parvat'], es: ['Montaña', 'mohn-TAH-nyah'], fr: ['Montagne', 'mohn-TAHN-yuh'],
      ar: ['جبل', 'Jabal'], bn: ['পাহাড় / পর্বত', 'Pahar'], pt: ['Montanha', 'mohn-TAHN-yah'], ru: ['Гора', 'gah-RAH'], ur: ['پہاڑ / جبل', 'Pahaad'],
      id: ['Gunung', 'GOO-noong'], de: ['Berg', 'BAIRK'], ja: ['山 (やま)', 'Yama'], pa: ['ਪਹਾੜ', 'Pahaad'], sw: ['Mlima', 'm-LEE-mah'],
      mr: ['डोंगर / पर्वत', 'Dongar / Parvat'], te: ['పర్వతం / కొండ', 'Parvatham'], tr: ['Dağ', 'DAH'], ta: ['மலை', 'Malai'], vi: ['Núi', 'nooy']
    })
  },
  {
    id: 153, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['River', 'RIV-er'], zh: ['河流 / 河', 'Héliú / Hé'], hi: ['नदी', 'Nadi'], es: ['Río', 'REE-oh'], fr: ['Rivière / Fleuve', 'ree-VYAIR'],
      ar: ['نهر', 'Nahr'], bn: ['নদী / গাঙ', 'Nodi'], pt: ['Rio', 'HEE-oo'], ru: ['Река', 'rye-KAH'], ur: ['دریا / ندی', 'Darya / Nadi'],
      id: ['Sungai', 'SOONG-eye'], de: ['Fluss', 'FLOOS'], ja: ['川 (かわ)', 'Kawa'], pa: ['ਦਰਿਆ / ਨਦੀ', 'Darya'], sw: ['Mto', 'M-toh'],
      mr: ['नदी', 'Nadi'], te: ['నది', 'Nadi'], tr: ['Nehir / Irmak', 'neh-HEER'], ta: ['ஆறு', 'Aaru'], vi: ['Sông', 'sawng']
    })
  },
  {
    id: 154, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Tree', 'TREE'], zh: ['树 / 树木', 'Shù'], hi: ['पेड़ / वृक्ष', 'Ped / Vriksha'], es: ['Árbol', 'AR-bohl'], fr: ['Arbre', 'AR-bruh'],
      ar: ['شجرة', 'Shajara'], bn: ['গাছ / বৃক্ষ', 'Gaachh'], pt: ['Árvore', 'AR-voh-ree'], ru: ['Дерево', 'DYEH-rye-vah'], ur: ['درخت / پیڑ', 'Darakht / Ped'],
      id: ['Pohon', 'POH-hohn'], de: ['Baum', 'BOWM'], ja: ['木 (き)', 'Ki'], pa: ['ਰੁੱਖ / ਦਰੱਖਤ', 'Rukkh'], sw: ['Mti', 'M-tee'],
      mr: ['झाड / वृक्ष', 'Jhaad'], te: ['చెట్టు / వృక్షం', 'Chettu'], tr: ['Ağaç', 'ah-AHTCH'], ta: ['மரம்', 'Maram'], vi: ['Cây', 'kye']
    })
  },
  {
    id: 155, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['World / Earth', 'WERLD'], zh: ['世界 / 地球', 'Shìjiè / Dìqiú'], hi: ['दुनिया / संसार', 'Duniya / Sansaar'], es: ['Mundo / Tierra', 'MOON-doh'], fr: ['Monde / Terre', 'MOHND'],
      ar: ['عالم / دنيا', 'Aalam / Dunya'], bn: ['পৃথিবী / বিশ্ব', 'Prithibi'], pt: ['Mundo / Terra', 'MOON-doo'], ru: ['Мир / Земля', 'MEER'], ur: ['دنیا / عالم', 'Duniya / Aalam'],
      id: ['Dunia / Bumi', 'DOO-nyah'], de: ['Welt / Erde', 'VELT'], ja: ['世界 (せかい)', 'Sekai'], pa: ['ਦੁਨੀਆ / ਸੰਸਾਰ', 'Duniya'], sw: ['Dunia', 'doo-NEE-ah'],
      mr: ['जग / जगत्', 'Jag'], te: ['ప్రపంచం / లోకం', 'Prapancham'], tr: ['Dünya / Yeryüzü', 'doon-YAH'], ta: ['உலகம்', 'Ulagam'], vi: ['Thế giới / Trái đất', 'teh zoy']
    })
  },
  {
    id: 156, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Map', 'MAP'], zh: ['地图', 'Dìtú'], hi: ['नक़्शा', 'Naqsha'], es: ['Mapa', 'MAH-pah'], fr: ['Carte', 'KART'],
      ar: ['خريطة', 'Khareeta'], bn: ['মানচিত্র', 'Manchitro'], pt: ['Mapa', 'MAH-pah'], ru: ['Карта', 'KAHR-tah'], ur: ['نقشہ', 'Naqshah'],
      id: ['Peta', 'PEH-tah'], de: ['Karte / Landkarte', 'KAHR-teh'], ja: ['地図 (ちず)', 'Chizu'], pa: ['ਨਕਸ਼ਾ', 'Naksha'], sw: ['Ramani', 'rah-MAH-nee'],
      mr: ['नकाशा', 'Nakasha'], te: ['పటం / మ్యాప్', 'Patam'], tr: ['Harita', 'hah-ree-TAH'], ta: ['வரைபடம்', 'Varaipadam'], vi: ['Bản đồ', 'bahn doh']
    })
  },
  {
    id: 157, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Ticket', 'TIK-it'], zh: ['票 / 车票', 'Piào'], hi: ['टिकट', 'Ticket'], es: ['Boleto / Billete', 'boh-LEH-toh'], fr: ['Billet / Ticket', 'bee-YAY'],
      ar: ['تذكرة', 'Tadhkira'], bn: ['টিকিট', 'Ticket'], pt: ['Bilhete / Passagem', 'beel-YAY-chee'], ru: ['Билет', 'bee-LYEHT'], ur: ['ٹکٹ', 'Ticket'],
      id: ['Tiket / Karcis', 'TEE-ket'], de: ['Ticket / Fahrkarte', 'TIK-et'], ja: ['切符 / チケット', 'Kippu / Chiketto'], pa: ['ਟਿਕਟ', 'Ticket'], sw: ['Tiketi', 'tee-KEH-tee'],
      mr: ['तिकीट', 'Tikeet'], te: ['టిక్కెట్టు', 'Ticketu'], tr: ['Bilet', 'bee-LET'], ta: ['பயணச்சீட்டு / டிக்கெட்', 'Payanacheettu'], vi: ['Vé', 'veh']
    })
  },
  {
    id: 158, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Left', 'LEFT'], zh: ['左 / 左边', 'Zuǒ'], hi: ['बायाँ / उलटा', 'Baayaan'], es: ['Izquierda', 'ees-KYAIR-dah'], fr: ['Gauche', 'GOHSH'],
      ar: ['يسار / شمال', 'Yasaar / Shimaal'], bn: ['বাম / বাঁদিক', 'Baam'], pt: ['Esquerda', 'esh-KAIR-dah'], ru: ['Лево / Слева', 'LYEH-vah'], ur: ['بائیں / الٹا', 'Bayein'],
      id: ['Kiri', 'KEE-ree'], de: ['Links', 'LINKS'], ja: ['左 (ひだり)', 'Hidari'], pa: ['ਖੱਬਾ', 'Khabba'], sw: ['Kushoto', 'koo-SHOH-toh'],
      mr: ['डावा', 'Dava'], te: ['ఎడమ', 'Edama'], tr: ['Sol', 'SOHL'], ta: ['இடது', 'Idadhu'], vi: ['Trái / Bên trái', 'chye']
    })
  },
  {
    id: 159, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Right', 'RYTE'], zh: ['右 / 右边', 'Yòu'], hi: ['दायाँ / सीधा', 'Daayaan'], es: ['Derecha', 'deh-REH-chah'], fr: ['Droite', 'DRWAHT'],
      ar: ['يمين', 'Yameen'], bn: ['ডান / ডানদিক', 'Daan'], pt: ['Direita', 'jee-RAY-tah'], ru: ['Право / Справа', 'PRAH-vah'], ur: ['دائیں / سیدھا', 'Dayein'],
      id: ['Kanan', 'KAH-nahn'], de: ['Rechts', 'REKHTS'], ja: ['右 (みぎ)', 'Migi'], pa: ['ਸੱਜਾ', 'Sajja'], sw: ['Kulia', 'koo-LEE-ah'],
      mr: ['उजवा', 'Ujava'], te: ['కుడి', 'Kudi'], tr: ['Sağ', 'SAH'], ta: ['வலது', 'Valadhu'], vi: ['Phải / Bên phải', 'fye']
    })
  },
  {
    id: 160, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Straight', 'STRAYT'], zh: ['直 / 笔直', 'Zhí'], hi: ['सीधा', 'Seedha'], es: ['Recto / Derecho', 'REHK-toh'], fr: ['Tout droit', 'too DRWAH'],
      ar: ['مستقيم / للأمام', 'Mustaqeem'], bn: ['সোজা', 'Shoja'], pt: ['Direto / Reto', 'jee-REH-too'], ru: ['Прямо', 'PRYAH-mah'], ur: ['سیدھا', 'Seedha'],
      id: ['Lurus', 'LOO-roos'], de: ['Geradeaus', 'geh-RAH-deh-ows'], ja: ['まっすぐ', 'Massugu'], pa: ['ਸਿੱਧਾ', 'Siddha'], sw: ['Moja kwa moja', 'MOH-jah'],
      mr: ['सरळ', 'Saral'], te: ['నేరుగా / సూటిగా', 'Neeruga'], tr: ['Düz', 'DOOZ'], ta: ['நேராக', 'Neraaga'], vi: ['Thẳng', 'tahng']
    })
  },
  {
    id: 161, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Near / Close', 'NEER'], zh: ['近 / 附近', 'Jìn / Fùjìn'], hi: ['पास / नज़दीक', 'Paas / Nazdeek'], es: ['Cerca', 'SAIR-kah'], fr: ['Près / Proche', 'PREH'],
      ar: ['قريب', 'Qareeb'], bn: ['কাছে / নিকটে', 'Kachhe'], pt: ['Perto / Próximo', 'PAIR-too'], ru: ['Близко / Рядом', 'BLEEZ-kah'], ur: ['قریب / پاس', 'Qareeb / Paas'],
      id: ['Dekat', 'duh-KAHT'], de: ['Nah / In der Nähe', 'NAH'], ja: ['近い (ちかい)', 'Chikai'], pa: ['ਨੇੜੇ / ਕੋਲ', 'Nede'], sw: ['Karibu', 'kah-REE-boo'],
      mr: ['जवळ', 'Javal'], te: ['దగ్గర', 'Daggara'], tr: ['Yakın', 'yah-KUHN'], ta: ['அருகில்', 'Arugil'], vi: ['Gần', 'guhn']
    })
  },
  {
    id: 162, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Far / Distant', 'FAR'], zh: ['远 / 遥远', 'Yuǎn'], hi: ['दूर', 'Door'], es: ['Lejos', 'LEH-hohs'], fr: ['Loin', 'LWAN'],
      ar: ['بعيد', 'Ba\'eed'], bn: ['দূরে', 'Doore'], pt: ['Longe / Distante', 'LOHN-zhee'], ru: ['Далеко', 'dah-lye-KOH'], ur: ['دور', 'Door'],
      id: ['Jauh', 'JAH-oo'], de: ['Fern / Weit', 'VYT'], ja: ['遠い (とおい)', 'Tooi'], pa: ['ਦੂਰ', 'Door'], sw: ['Mbali', 'm-BAH-lee'],
      mr: ['दूर / लांब', 'Door'], te: ['దూరం', 'Dooram'], tr: ['Uzak', 'oo-ZAHK'], ta: ['தொலைவில் / தூரம்', 'Tholaivil'], vi: ['Xa', 'sah']
    })
  },
  {
    id: 163, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['North', 'NORTH'], zh: ['北 / 北方', 'Běi'], hi: ['उत्तर', 'Uttar'], es: ['Norte', 'NOR-teh'], fr: ['Nord', 'NOR'],
      ar: ['شمال', 'Shamal'], bn: ['উত্তর', 'Uttor'], pt: ['Norte', 'NOR-chee'], ru: ['Север', 'SYEH-vyehr'], ur: ['شمال', 'Shumaal'],
      id: ['Utara', 'oo-TAH-rah'], de: ['Norden', 'NOR-den'], ja: ['北 (きた)', 'Kita'], pa: ['ਉੱਤਰ', 'Uttar'], sw: ['Kaskazini', 'kahs-kah-ZEE-nee'],
      mr: ['उत्तर', 'Uttar'], te: ['ఉత్తరం', 'Uttaram'], tr: ['Kuzey', 'koo-ZEY'], ta: ['வடக்கு', 'Vadakku'], vi: ['Bắc / Hướng bắc', 'bahk']
    })
  },
  {
    id: 164, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['South', 'SOWTH'], zh: ['南 / 南方', 'Nán'], hi: ['दक्षिण', 'Dakshin'], es: ['Sur', 'SOOR'], fr: ['Sud', 'SEWD'],
      ar: ['جنوب', 'Janoob'], bn: ['দক্ষিণ', 'Dokkhin'], pt: ['Sul', 'SOOL'], ru: ['Юг', 'YOOK'], ur: ['جنوب', 'Janoob'],
      id: ['Selatan', 'suh-LAH-tahn'], de: ['Süden', 'ZEW-den'], ja: ['南 (みなみ)', 'Minami'], pa: ['ਦੱਖਣ', 'Dakkhan'], sw: ['Kusini', 'koo-SEE-nee'],
      mr: ['दक्षिण', 'Dakshin'], te: ['దక్షిణం', 'Dakshinam'], tr: ['Güney', 'goo-NEY'], ta: ['தெற்கு', 'Therku'], vi: ['Nam / Hướng nam', 'nahm']
    })
  },
  {
    id: 165, category: 'Places & Travel',
    translations: createTranslationMap({
      en: ['Bridge', 'BRIJ'], zh: ['桥 / 桥梁', 'Qiáo'], hi: ['पुल', 'Pul'], es: ['Puente', 'PWEHN-teh'], fr: ['Pont', 'POHN'],
      ar: ['جسر', 'Jisr'], bn: ['সেতু / পুল', 'Shetu'], pt: ['Ponte', 'POHN-chee'], ru: ['Мост', 'MOHST'], ur: ['پل', 'Pul'],
      id: ['Jembatan', 'jem-BAH-tahn'], de: ['Brücke', 'BREW-keh'], ja: ['橋 (はし)', 'Hashi'], pa: ['ਪੁਲ', 'Pul'], sw: ['Daraja', 'dah-RAH-jah'],
      mr: ['पूल', 'Pool'], te: ['వంతెన', 'Vanthena'], tr: ['Köprü', 'kur-PROO'], ta: ['பாலம்', 'Paalam'], vi: ['Cầu', 'kow']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 8. COMMON VERBS (166 - 200)
  // ─────────────────────────────────────────────────────────────
  {
    id: 166, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To be', 'too BEE'], zh: ['是 / 存在', 'Shì'], hi: ['होना', 'Hona'], es: ['Ser / Estar', 'SAIR / es-TAR'], fr: ['Être', 'EH-truh'],
      ar: ['كان / يكون', 'Kaana'], bn: ['হওয়া', 'Howa'], pt: ['Ser / Estar', 'SAIR'], ru: ['Быть', 'BYT'], ur: ['ہونا', 'Hona'],
      id: ['Menjadi / Adalah', 'men-JAH-dee'], de: ['Sein', 'ZYN'], ja: ['である / いる', 'De aru / Iru'], pa: ['ਹੋਣਾ', 'Hona'], sw: ['Kuwa', 'koo-WAH'],
      mr: ['असणे', 'Asane'], te: ['ఉండుట', 'Unduta'], tr: ['Olmak', 'ohl-MAHK'], ta: ['இருத்தல்', 'Iruthal'], vi: ['Là / Thì / Ở', 'lah']
    })
  },
  {
    id: 167, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To have', 'too HAV'], zh: ['有 / 拥有', 'Yǒu'], hi: ['रखना / पास होना', 'Rakhna'], es: ['Tener / Haber', 'teh-NAIR'], fr: ['Avoir', 'ah-VWAHR'],
      ar: ['امتلك / يملك', 'Malaka'], bn: ['থাকা / অধিকার করা', 'Thaka'], pt: ['Ter / Haver', 'TAIR'], ru: ['Иметь', 'ee-MYEHT'], ur: ['رکھنا / پاس ہونا', 'Rakhna'],
      id: ['Memiliki / Punya', 'meh-MEE-lee-kee'], de: ['Haben', 'HAH-ben'], ja: ['持つ (もつ)', 'Motsu'], pa: ['ਕੋਲ ਹੋਣਾ', 'Kol hona'], sw: ['Kuwa na', 'koo-WAH nah'],
      mr: ['जवळ असणे', 'Javal asane'], te: ['కలిగి ఉండుట', 'Kaligi unduta'], tr: ['Sahip olmak', 'sah-HEEP'], ta: ['வைத்திருத்தல்', 'Vaithiruthal'], vi: ['Có', 'caw']
    })
  },
  {
    id: 168, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To do / To make', 'too DOO'], zh: ['做 / 制造', 'Zuò'], hi: ['करना / बनाना', 'Karna / Banana'], es: ['Hacer', 'ah-SAIR'], fr: ['Faire', 'FAIR'],
      ar: ['فعل / يفعل', 'Fa\'ala'], bn: ['করা / তৈরি করা', 'Kora'], pt: ['Fazer', 'fah-ZAIR'], ru: ['Делать', 'DYEH-laht'], ur: ['کرنا / بنانا', 'Karna'],
      id: ['Melakukan / Membuat', 'meh-LAH-koo-kahn'], de: ['Tun / Machen', 'TOON / MAH-khen'], ja: ['する / 作る', 'Suru / Tsukuru'], pa: ['ਕਰਨਾ', 'Karna'], sw: ['Kufanya', 'koo-FAHN-yah'],
      mr: ['करणे / बनवणे', 'Karne'], te: ['చేయుట', 'Cheyuta'], tr: ['Yapmak', 'yahp-MAHK'], ta: ['செய்தல்', 'Seydhal'], vi: ['Làm', 'lahm']
    })
  },
  {
    id: 169, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To say / To speak', 'too SAY'], zh: ['说 / 讲话', 'Shuō'], hi: ['कहना / बोलना', 'Kehna / Bolna'], es: ['Decir / Hablar', 'deh-SEER'], fr: ['Dire / Parler', 'DEER / par-LAY'],
      ar: ['قال / يقول', 'Qaala'], bn: ['বলা / কথা বলা', 'Bola'], pt: ['Dizer / Falar', 'jee-ZAIR'], ru: ['Сказать / Говорить', 'skah-ZAHT'], ur: ['کہنا / بولنا', 'Kehna / Bolna'],
      id: ['Berkata / Berbicara', 'bair-KAH-tah'], de: ['Sagen / Sprechen', 'ZAH-gen'], ja: ['言う / 話す', 'Iu / Hanasu'], pa: ['ਕਹਿਣਾ / ਬੋਲਣਾ', 'Kehna'], sw: ['Kusema / Kuongea', 'koo-SEH-mah'],
      mr: ['सांगणे / बोलणे', 'Sangne'], te: ['చెప్పుట / మాట్లాడుట', 'Chepputa'], tr: ['Söylemek / Konuşmak', 'soy-leh-MEHK'], ta: ['கூறுதல் / பேசுதல்', 'Koorudhal'], vi: ['Nói', 'noy']
    })
  },
  {
    id: 170, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To go', 'too GOH'], zh: ['去 / 走', 'Qù / Zǒu'], hi: ['जाना', 'Jaana'], es: ['Ir', 'EER'], fr: ['Aller', 'ah-LAY'],
      ar: ['ذهب / يذهب', 'Dhahaba'], bn: ['যাওয়া', 'Jawa'], pt: ['Ir', 'EER'], ru: ['Идти / Ехать', 'eed-TEE'], ur: ['جانا', 'Jaana'],
      id: ['Pergi', 'pair-GEE'], de: ['Gehen', 'GAY-en'], ja: ['行く (いく)', 'Iku'], pa: ['ਜਾਣਾ', 'Jaana'], sw: ['Kwenda', 'KWEN-dah'],
      mr: ['जाणे', 'Jaane'], te: ['వెళ్ళుట', 'Velluta'], tr: ['Gitmek', 'geet-MEHK'], ta: ['செல்லுதல் / போதல்', 'Selludhal'], vi: ['Đi', 'dee']
    })
  },
  {
    id: 171, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To come', 'too KUM'], zh: ['来 / 来临', 'Lái'], hi: ['आना', 'Aana'], es: ['Venir', 'veh-NEER'], fr: ['Venir', 'vuh-NEER'],
      ar: ['جاء / أتى', 'Jaa\'a / Ataa'], bn: ['আসা', 'Asha'], pt: ['Vir', 'VEER'], ru: ['Приходить', 'pree-khah-DEET'], ur: ['آنا', 'Aana'],
      id: ['Datang', 'DAH-tahng'], de: ['Kommen', 'KOM-men'], ja: ['来る (くる)', 'Kuru'], pa: ['ਆਉਣਾ', 'Aauna'], sw: ['Kuja', 'KOO-jah'],
      mr: ['येणे', 'Yene'], te: ['వచ్చుట', 'Vachuta'], tr: ['Gelmek', 'gel-MEHK'], ta: ['வருதல்', 'Varudhal'], vi: ['Đến / Tới', 'den']
    })
  },
  {
    id: 172, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To see / To look', 'too SEE'], zh: ['看 / 看见', 'Kàn / Kànjiàn'], hi: ['देखना', 'Dekhna'], es: ['Ver / Mirar', 'VAIR / mee-RAR'], fr: ['Voir / Regarder', 'VWAHR'],
      ar: ['رأى / يرى', 'Ra\'aa / Yaraa'], bn: ['দেখা', 'Dekha'], pt: ['Ver / Olhar', 'VAIR / ohl-YAHR'], ru: ['Видеть / Смотреть', 'VEE-jyet'], ur: ['دیکھنا', 'Dekhna'],
      id: ['Melihat', 'muh-LEE-haht'], de: ['Sehen / Schauen', 'ZAY-en'], ja: ['見る (みる)', 'Miru'], pa: ['ਵੇਖਣਾ / ਦੇਖਣਾ', 'Vekhna'], sw: ['Kuona / Kutazama', 'koo-OH-nah'],
      mr: ['पाहणे / बघणे', 'Pahane'], te: ['చూచుట', 'Choochuta'], tr: ['Görmek / Bakmak', 'gur-MEHK'], ta: ['பார்த்தல்', 'Paarthal'], vi: ['Thấy / Nhìn', 'tye / nyin']
    })
  },
  {
    id: 173, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To hear / To listen', 'too HEER'], zh: ['听 / 听到', 'Tīng'], hi: ['सुनना', 'Sunna'], es: ['Oír / Escuchar', 'oh-EER'], fr: ['Entendre / Écouter', 'ahn-TAHN-druh'],
      ar: ['سمع / يستمع', 'Sami\'a'], bn: ['শোনা', 'Shona'], pt: ['Ouvir / Escutar', 'oh-VEER'], ru: ['Слышать / Слушать', 'SLY-shaht'], ur: ['سننا', 'Sunna'],
      id: ['Mendengar', 'men-DENG-ahr'], de: ['Hören / Zuhören', 'HUR-ren'], ja: ['聞く (きく)', 'Kiku'], pa: ['ਸੁਣਨਾ', 'Sunna'], sw: ['Kusikia / Kusikiliza', 'koo-see-KEE-ah'],
      mr: ['ऐकणे', 'Aikane'], te: ['వినుట', 'Vinuta'], tr: ['Duymak / Dinlemek', 'dooy-MAHK'], ta: ['கேட்டல்', 'Kaettal'], vi: ['Nghe', 'ngeh']
    })
  },
  {
    id: 174, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To know', 'too NOH'], zh: ['知道 / 认识', 'Zhīdào / Rènshi'], hi: ['जानना / पता होना', 'Jaanna'], es: ['Saber / Conocer', 'sah-BAIR'], fr: ['Savoir / Connaître', 'sah-VWAHR'],
      ar: ['عرف / يعرف', '\'Arafa / Ya\'rifu'], bn: ['জানা / চেনা', 'Jana'], pt: ['Saber / Conhecer', 'sah-BAIR'], ru: ['Знать', 'ZNAHT'], ur: ['جاننا / معلوم ہونا', 'Jaanna'],
      id: ['Tahu / Mengenal', 'TAH-hoo'], de: ['Wissen / Kennen', 'VIS-sen'], ja: ['知る / 分かる', 'Shiru / Wakaru'], pa: ['ਜਾਣਨਾ', 'Jaanna'], sw: ['Kujua', 'koo-JOO-ah'],
      mr: ['माहित असणे / जाणणे', 'Jaanne'], te: ['తెలియుట', 'Teliyuta'], tr: ['Bilmek / Tanımak', 'beel-MEHK'], ta: ['அறிதல் / தெரிதல்', 'Aridhal'], vi: ['Biết', 'byet']
    })
  },
  {
    id: 175, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To understand', 'too un-der-STAND'], zh: ['理解 / 懂', 'Lǐjiě / Dǒng'], hi: ['समझना', 'Samajhna'], es: ['Entender / Comprender', 'en-ten-DAIR'], fr: ['Comprendre', 'kohm-PRAHN-druh'],
      ar: ['فهم / يفهم', 'Fahima / Yafhamu'], bn: ['বোঝা / বুঝতে পারা', 'Bojha'], pt: ['Entender / Compreender', 'en-ten-DAIR'], ru: ['Понимать', 'pah-nee-MAHT'], ur: ['سمجھنا', 'Samajhna'],
      id: ['Mengerti / Memahami', 'meng-AIR-tee'], de: ['Verstehen', 'fair-SHTAY-en'], ja: ['理解する / わかる', 'Rikai suru'], pa: ['ਸਮਝਣਾ', 'Samajhna'], sw: ['Kuelewa', 'koo-eh-LEH-wah'],
      mr: ['समजणे / उमगणे', 'Samajne'], te: ['అర్థం చేసుకొనుట', 'Artham chesukonuta'], tr: ['Anlamak', 'ahn-lah-MAHK'], ta: ['புரிந்துகொள்ளுதல்', 'Purindhukolludhal'], vi: ['Hiểu', 'hee-ew']
    })
  },
  {
    id: 176, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To read', 'too REED'], zh: ['读 / 阅读', 'Dú / Yuèdú'], hi: ['पढ़ना', 'Padhna'], es: ['Leer', 'leh-AIR'], fr: ['Lire', 'LEER'],
      ar: ['قرأ / يقرأ', 'Qara\'a'], bn: ['পড়া', 'Pora'], pt: ['Ler', 'LAIR'], ru: ['Читать', 'chee-TAHT'], ur: ['پڑھنا', 'Padhna'],
      id: ['Membaca', 'mem-BAH-chah'], de: ['Lesen', 'LAY-zen'], ja: ['読む (よむ)', 'Yomu'], pa: ['ਪੜ੍ਹਨਾ', 'Padhna'], sw: ['Kusoma', 'koo-SOH-mah'],
      mr: ['वाचणे', 'Vaachane'], te: ['చదువుట', 'Chaduvuta'], tr: ['Okumak', 'oh-koo-MAHK'], ta: ['படித்தல்', 'Padithal'], vi: ['Đọc', 'dawk']
    })
  },
  {
    id: 177, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To write', 'too RYTE'], zh: ['写 / 书写', 'Xiě'], hi: ['लिखना', 'Likhna'], es: ['Escribir', 'es-kree-BEER'], fr: ['Écrire', 'ay-KREER'],
      ar: ['كتب / يكتب', 'Kataba'], bn: ['লেখা', 'Lekha'], pt: ['Escrever', 'esh-kreh-VAIR'], ru: ['Писать', 'pee-SAHT'], ur: ['لکھنا', 'Likhna'],
      id: ['Menulis', 'meh-NOO-lees'], de: ['Schreiben', 'SHRY-ben'], ja: ['書く (かく)', 'Kaku'], pa: ['ਲਿਖਣਾ', 'Likhna'], sw: ['Kuandika', 'koo-ahn-DEE-kah'],
      mr: ['लिहिणे', 'Lihine'], te: ['రాయుట', 'Raayuta'], tr: ['Yazmak', 'yahz-MAHK'], ta: ['எழுதுதல்', 'Ezhudhudhal'], vi: ['Viết', 'vyet']
    })
  },
  {
    id: 178, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To learn / To study', 'too LERN'], zh: ['学习', 'Xuéxí'], hi: ['सीखना / पढ़ना', 'Seekhna'], es: ['Aprender / Estudiar', 'ah-pren-DAIR'], fr: ['Apprendre / Étudier', 'ah-PRAHN-druh'],
      ar: ['تعلم / يتعلم', 'Ta\'allama'], bn: ['শেখা / অধ্যয়ন করা', 'Shekha'], pt: ['Aprender / Estudar', 'ah-pren-DAIR'], ru: ['Учить / Изучать', 'oo-CHEET'], ur: ['سیکھنا / پڑھنا', 'Seekhna'],
      id: ['Belajar', 'buh-LAH-jahr'], de: ['Lernen / Studieren', 'LAIR-nen'], ja: ['学ぶ / 勉強する', 'Manabu / Benkyou suru'], pa: ['ਸਿੱਖਣਾ', 'Sikkhna'], sw: ['Kujifunza', 'koo-jee-FOON-zah'],
      mr: ['शिकणे / अभ्यास करणे', 'Shikne'], te: ['నేర్చుకొనుట', 'Nerchukonuta'], tr: ['Öğrenmek / Çalışmak', 'oh-ren-MEHK'], ta: ['கற்றல்', 'Katral'], vi: ['Học', 'hawk']
    })
  },
  {
    id: 179, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To teach', 'too TEECH'], zh: ['教 / 教授', 'Jiāo'], hi: ['सिखाना / पढ़ाना', 'Sikhana / Padhana'], es: ['Enseñar', 'en-seh-NYAR'], fr: ['Enseigner', 'ahn-seh-NYAY'],
      ar: ['علّم / يعلّم', '\'Allama'], bn: ['শেখানো / পড়ানো', 'Shekhano'], pt: ['Ensinar', 'en-see-NAHR'], ru: ['Учить / Преподавать', 'oo-CHEET'], ur: ['سکھانا / پڑھانا', 'Sikhana'],
      id: ['Mengajar', 'meng-AH-jahr'], de: ['Lehren / Unterrichten', 'LAY-ren'], ja: ['教える (おしえる)', 'Oshieru'], pa: ['ਸਿਖਾਉਣਾ', 'Sikhauna'], sw: ['Kufundisha', 'koo-foon-DEE-shah'],
      mr: ['शिकवणे', 'Shikavne'], te: ['బోధించుట', 'Bodhinchuta'], tr: ['Öğretmek', 'oh-ret-MEHK'], ta: ['கற்பித்தல்', 'Karpithal'], vi: ['Dạy / Giảng dạy', 'zeye']
    })
  },
  {
    id: 180, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To buy / To purchase', 'too BYE'], zh: ['买 / 购买', 'Mǎi'], hi: ['खरीदना', 'Khareedna'], es: ['Comprar', 'kohm-PRAR'], fr: ['Acheter', 'ahsh-TAY'],
      ar: ['اشترى / يشتري', 'Ishtaraa'], bn: ['কেনা / ক্রয় করা', 'Kena'], pt: ['Comprar', 'kohm-PRAR'], ru: ['Покупать / Купить', 'pah-koo-PAHT'], ur: ['خریدنا', 'Khareedna'],
      id: ['Membeli', 'mem-BUH-lee'], de: ['Kaufen', 'KOW-fen'], ja: ['買う (かう)', 'Kau'], pa: ['ਖ਼ਰੀਦਣਾ', 'Khareedna'], sw: ['Kununua', 'koo-noo-NOO-ah'],
      mr: ['खरेदी करणे / विकत घेणे', 'Kharedi karne'], te: ['కొనుట', 'Konuta'], tr: ['Satın almak', 'sah-TUHN ahl-MAHK'], ta: ['வாங்குதல்', 'Vaangudhal'], vi: ['Mua', 'moo-ah']
    })
  }
];

module.exports = { VOCAB_BATCH_5 };
