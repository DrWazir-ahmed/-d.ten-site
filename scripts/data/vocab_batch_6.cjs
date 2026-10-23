const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_6 = [
  // ─────────────────────────────────────────────────────────────
  // 8. COMMON VERBS CONTINUED (181 - 206)
  // ─────────────────────────────────────────────────────────────
  {
    id: 181, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To sell', 'too SEL'], zh: ['卖 / 出售', 'Mài'], hi: ['बेचना', 'Bechna'], es: ['Vender', 'ven-DAIR'], fr: ['Vendre', 'VAHN-druh'],
      ar: ['باع / يبيع', 'Baa\'a'], bn: ['বিক্রি করা', 'Bikri kora'], pt: ['Vender', 'ven-DAIR'], ru: ['Продавать', 'prah-dah-VAHT'], ur: ['بیچنا / فروخت کرنا', 'Bechna'],
      id: ['Menjual', 'men-JOO-ahl'], de: ['Verkaufen', 'fair-KOW-fen'], ja: ['売る (うる)', 'Uru'], pa: ['ਵੇਚਣਾ', 'Vechna'], sw: ['Kuuza', 'koo-OO-zah'],
      mr: ['विकणे', 'Vikne'], te: ['అమ్ముట', 'Ammuta'], tr: ['Satmak', 'saht-MAHK'], ta: ['விற்பனை செய்தல்', 'Virpadhanai'], vi: ['Bán', 'bahn']
    })
  },
  {
    id: 182, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To give', 'too GIV'], zh: ['给 / 给与', 'Gěi'], hi: ['देना', 'Dena'], es: ['Dar', 'DAR'], fr: ['Donner', 'duh-NAY'],
      ar: ['أعطى / يعطي', 'A\'taa'], bn: ['দেওয়া', 'Dewa'], pt: ['Dar', 'DAR'], ru: ['Давать', 'dah-VAHT'], ur: ['دینا', 'Dena'],
      id: ['Memberi', 'mem-buh-REE'], de: ['Geben', 'GAY-ben'], ja: ['あげる / 与える', 'Ageru'], pa: ['ਦੇਣਾ', 'Dena'], sw: ['Kutoa / Kupa', 'koo-TOH-ah'],
      mr: ['देणे', 'Dene'], te: ['ఇచ్చుట', 'Ichuta'], tr: ['Vermek', 'vair-MEHK'], ta: ['கொடுத்தல்', 'Koduthal'], vi: ['Cho / Tặng', 'chaw']
    })
  },
  {
    id: 183, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To take', 'too TAYK'], zh: ['拿 / 取', 'Ná / Qǔ'], hi: ['लेना', 'Lena'], es: ['Tomar / Llevar', 'toh-MAR'], fr: ['Prendre', 'PRAHN-druh'],
      ar: ['أخذ / يأخذ', 'Akhadha'], bn: ['নেওয়া', 'Newa'], pt: ['Tomar / Pegar', 'toh-MAR'], ru: ['Брать / Взять', 'BRAHT'], ur: ['لینا', 'Lena'],
      id: ['Mengambil', 'meng-AHM-beel'], de: ['Nehmen', 'NAY-men'], ja: ['取る (とる)', 'Toru'], pa: ['ਲੈਣਾ', 'Laina'], sw: ['Kuchukua', 'koo-choo-KOO-ah'],
      mr: ['घेणे', 'Ghene'], te: ['తీసుకొనుట', 'Theesukonuta'], tr: ['Almak', 'ahl-MAHK'], ta: ['எடுத்தல்', 'Eduthal'], vi: ['Lấy / Cầm', 'leye']
    })
  },
  {
    id: 184, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To want', 'too WONT'], zh: ['想要 / 要', 'Xiǎng / Yào'], hi: ['चाहना', 'Chahna'], es: ['Querer', 'keh-REHR'], fr: ['Vouloir', 'voo-LWAHR'],
      ar: ['أراد / يريد', 'Araada'], bn: ['চাওয়া', 'Chawa'], pt: ['Querer', 'keh-REHR'], ru: ['Хотеть', 'khah-TYEHT'], ur: ['چاہنا', 'Chahna'],
      id: ['Menginginkan / Mau', 'mow'], de: ['Wollen', 'VOL-len'], ja: ['欲しい / 望む', 'Hoshii'], pa: ['ਚਾਹੁਣਾ', 'Chahuna'], sw: ['Kutaka', 'koo-TAH-kah'],
      mr: ['हवे असणे / इच्छिणे', 'Have asane'], te: ['కోరుకొనుట', 'Korukonuta'], tr: ['İstemek', 'ees-teh-MEHK'], ta: ['விரும்புதல்', 'Virumbudhal'], vi: ['Muốn', 'mwohn']
    })
  },
  {
    id: 185, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To need', 'too NEED'], zh: ['需要', 'Xūyào'], hi: ['ज़रूरत होना', 'Zaroorat hona'], es: ['Necesitar', 'neh-seh-see-TAR'], fr: ['Avoir besoin de', 'ah-vwar buh-ZWAN'],
      ar: ['احتاج / يحتاج', 'Ihtaaja'], bn: ['প্রয়োজন হওয়া', 'Proyojon howa'], pt: ['Precisar', 'preh-see-ZAHR'], ru: ['Нуждаться', 'noozh-DAHT-syah'], ur: ['ضرورت ہونا', 'Zaroorat hona'],
      id: ['Membutuhkan / Butuh', 'BOO-too'], de: ['Brauchen', 'BROW-khen'], ja: ['必要とする', 'Hitsuyou to suru'], pa: ['ਲੋੜ ਹੋਣਾ', 'Lod hona'], sw: ['Kuhitaji', 'koo-hee-TAH-jee'],
      mr: ['गरज असणे', 'Garaj asane'], te: ['అవసరం ఉండుట', 'Avasaram unduta'], tr: ['İhtiyaç duymak', 'eeh-tee-YAHTCH'], ta: ['தேவைப்படுதல்', 'Thevaipadudhal'], vi: ['Cần', 'kuhn']
    })
  },
  {
    id: 186, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To like', 'too LYKE'], zh: ['喜欢', 'Xǐhuan'], hi: ['पसंद करना', 'Pasand karna'], es: ['Gustar', 'goos-TAR'], fr: ['Aimer / Apprécier', 'ay-MAY'],
      ar: ['أعجب / يعجب', 'A\'jaba'], bn: ['পছন্দ করা', 'Pochhondo kora'], pt: ['Gostar', 'gohsh-TAR'], ru: ['Нравиться', 'NRAH-veet-syah'], ur: ['پسند کرنا', 'Pasand karna'],
      id: ['Menyukai / Suka', 'SOO-kah'], de: ['Mögen / Gefallen', 'MOO-gen'], ja: ['好む / 好き', 'Konomu / Suki'], pa: ['ਪਸੰਦ ਕਰਨਾ', 'Pasand karna'], sw: ['Kupenda', 'koo-PEN-dah'],
      mr: ['आवडणे', 'Aavadne'], te: ['ఇష్టపడుట', 'Ishtapaduta'], tr: ['Beğenmek / Hoşlanmak', 'beh-en-MEHK'], ta: ['பிடித்தல்', 'Pidithal'], vi: ['Thích', 'teek']
    })
  },
  {
    id: 187, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To love', 'too LUV'], zh: ['爱', 'Ài'], hi: ['प्यार करना / प्रेम करना', 'Pyar karna'], es: ['Amar', 'ah-MAR'], fr: ['Aimer', 'ay-MAY'],
      ar: ['أحب / يحب', 'Ahabba'], bn: ['ভালোবাসা', 'Bhalobasha'], pt: ['Amar', 'ah-MAR'], ru: ['Любить', 'lyoo-BEET'], ur: ['محبت کرنا / پیار کرنا', 'Mohabbat karna'],
      id: ['Mencintai / Mengasihi', 'men-chin-TYE'], de: ['Lieben', 'LEE-ben'], ja: ['愛する (あいする)', 'Aisuru'], pa: ['ਪਿਆਰ ਕਰਨਾ', 'Pyar karna'], sw: ['Kupenda sana', 'koo-PEN-dah'],
      mr: ['प्रेम करणे', 'Prem karne'], te: ['ప్రేమించుట', 'Preminchuta'], tr: ['Sevmek / Aşık olmak', 'sev-MEHK'], ta: ['நேசித்தல்', 'Nesithal'], vi: ['Yêu', 'yew']
    })
  },
  {
    id: 188, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To think', 'too THINK'], zh: ['思考 / 认为', 'Sīkǎo / Rènwéi'], hi: ['सोचना / विचार करना', 'Sochna'], es: ['Pensar', 'pen-SAR'], fr: ['Penser', 'pahn-SAY'],
      ar: ['فكر / يفكر', 'Fakkara'], bn: ['ভাবা / চিন্তা করা', 'Bhaba'], pt: ['Pensar', 'pen-SAHR'], ru: ['Думать', 'DOO-maht'], ur: ['سوچنا / خیال کرنا', 'Sochna'],
      id: ['Berpikir', 'bair-PEE-keer'], de: ['Denken', 'DEN-ken'], ja: ['考える / 思う', 'Kangaeru / Omou'], pa: ['ਸੋਚਣਾ', 'Sochna'], sw: ['Kufikiri', 'koo-fee-KEE-ree'],
      mr: ['विचार करणे', 'Vichaar karne'], te: ['ఆలోచించుట', 'Aalochinchuta'], tr: ['Düşünmek', 'doo-shoon-MEHK'], ta: ['சிந்தித்தல்', 'Sindhithal'], vi: ['Nghĩ / Suy nghĩ', 'ngee']
    })
  },
  {
    id: 189, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To work', 'too WERK'], zh: ['工作 / 劳动', 'Gōngzuò'], hi: ['काम करना / कार्य करना', 'Kaam karna'], es: ['Trabajar', 'trah-bah-HAR'], fr: ['Travailler', 'trah-vah-YAY'],
      ar: ['عمل / يعمل', '\'Amila'], bn: ['কাজ করা', 'Kaaj kora'], pt: ['Trabalhar', 'trah-bahl-YAHR'], ru: ['Работать', 'rah-BOH-taht'], ur: ['کام کرنا', 'Kaam karna'],
      id: ['Bekerja', 'buh-KAIR-jah'], de: ['Arbeiten', 'AHR-by-ten'], ja: ['働く (はたらく)', 'Hataraku'], pa: ['ਕੰਮ ਕਰਨਾ', 'Kamm karna'], sw: ['Kufanya kazi', 'koo-FAHN-yah'],
      mr: ['काम करणे', 'Kaam karne'], te: ['పనిచేయుట', 'Panicheyuta'], tr: ['Çalışmak', 'chah-lush-MAHK'], ta: ['வேலை செய்தல்', 'Velai seydhal'], vi: ['Làm việc', 'lahm vyek']
    })
  },
  {
    id: 190, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To sleep', 'too SLEEP'], zh: ['睡觉', 'Shuìjiào'], hi: ['सोना', 'Sona'], es: ['Dormir', 'dor-MEER'], fr: ['Dormir', 'dor-MEER'],
      ar: ['نام / ينام', 'Naama'], bn: ['ঘুমানো', 'Ghumano'], pt: ['Dormir', 'dor-MEER'], ru: ['Спать', 'SPAHT'], ur: ['سونا', 'Sona'],
      id: ['Tidur', 'TEE-door'], de: ['Schlafen', 'SHLAH-fen'], ja: ['眠る / 寝る', 'Nemuru / Neru'], pa: ['ਸੌਣਾ', 'Sauna'], sw: ['Kulala', 'koo-LAH-lah'],
      mr: ['झोपणे', 'Zhopne'], te: ['నిద్రపోవుట', 'Nidrapovuta'], tr: ['Uyumak', 'oo-yoo-MAHK'], ta: ['தூங்குதல்', 'Thoongudhal'], vi: ['Ngủ', 'ngoo']
    })
  },
  {
    id: 191, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To wake up', 'too WAYK up'], zh: ['醒来 / 起床', 'Xǐng lái / Qǐchuáng'], hi: ['जागना / उठना', 'Jaagna'], es: ['Despertar', 'des-pair-TAR'], fr: ['Se réveiller', 'suh ray-vay-YAY'],
      ar: ['استيقظ / يصحو', 'Istayqadha'], bn: ['জেগে ওঠা', 'Jege otha'], pt: ['Acordar', 'ah-kor-DAR'], ru: ['Просыпаться', 'prah-sy-PAHT-syah'], ur: ['جاگنا / بیدار ہونا', 'Jaagna'],
      id: ['Bangun tidur', 'BAHNG-oon'], de: ['Aufwachen', 'OWF-vah-khen'], ja: ['起きる / 目覚める', 'Okiru / Mezameru'], pa: ['ਜਾਗਣਾ', 'Jaagna'], sw: ['Kuamka', 'koo-AHM-kah'],
      mr: ['जागे होणे / उठणे', 'Jaage hone'], te: ['మేల్కొనుట', 'Melkonuta'], tr: ['Uyanmak', 'oo-yahn-MAHK'], ta: ['விழித்தல் / எழுதல்', 'Vizhithal'], vi: ['Thức dậy', 'took zeye']
    })
  },
  {
    id: 192, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To open', 'too OH-pen'], zh: ['开 / 打开', 'Kāi / Dǎkāi'], hi: ['खोलना', 'Kholna'], es: ['Abrir', 'ah-BREER'], fr: ['Ouvrir', 'oo-VREER'],
      ar: ['فتح / يفتح', 'Fataha'], bn: ['খোলা', 'Khola'], pt: ['Abrir', 'ah-BREER'], ru: ['Открывать', 'aht-kry-VAHT'], ur: ['کھولنا', 'Kholna'],
      id: ['Membuka', 'mem-BOO-kah'], de: ['Öffnen', 'OOF-nen'], ja: ['開ける (あける)', 'Akeru'], pa: ['ਖੋਲ੍ਹਣਾ', 'Kholhna'], sw: ['Kufungua', 'koo-foon-GOO-ah'],
      mr: ['उघडणे', 'Ughadne'], te: ['తెరుచుట', 'Theruchuta'], tr: ['Açmak', 'ahtch-MAHK'], ta: ['திறத்தல்', 'Thirathal'], vi: ['Mở', 'mer']
    })
  },
  {
    id: 193, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To close / To shut', 'too KLOHZ'], zh: ['关 / 关闭', 'Guān / Guānbì'], hi: ['बंद करना', 'Band karna'], es: ['Cerrar', 'sair-RAR'], fr: ['Fermer', 'fair-MAY'],
      ar: ['أغلق / يقفل', 'Aghlaqa'], bn: ['বন্ধ করা', 'Bondho kora'], pt: ['Fechar', 'feh-SHAR'], ru: ['Закрывать', 'zah-kry-VAHT'], ur: ['بند کرنا', 'Band karna'],
      id: ['Menutup', 'muh-NOO-toop'], de: ['Schließen / Zumachen', 'SHLEE-sen'], ja: ['閉める (しめる)', 'Shimeru'], pa: ['ਬੰਦ ਕਰਨਾ', 'Band karna'], sw: ['Kufunga', 'koo-FOON-gah'],
      mr: ['बंद करणे', 'Band karne'], te: ['మూయుట', 'Mooyuta'], tr: ['Kapatmak', 'kah-paht-MAHK'], ta: ['மூடுதல்', 'Moodudhal'], vi: ['Đóng', 'dawng']
    })
  },
  {
    id: 194, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To eat', 'too EET'], zh: ['吃 / 吃饭', 'Chī'], hi: ['खाना', 'Khana'], es: ['Comer', 'koh-MAIR'], fr: ['Manger', 'mahn-ZHAY'],
      ar: ['أكل / يأكل', 'Akala'], bn: ['খাওয়া', 'Khawa'], pt: ['Comer', 'koo-MAIR'], ru: ['Есть / Кушать', 'YEST'], ur: ['کھانا', 'Khana'],
      id: ['Makan', 'MAH-kahn'], de: ['Essen', 'ES-sen'], ja: ['食べる (たべる)', 'Taberu'], pa: ['ਖਾਣਾ', 'Khana'], sw: ['Kula', 'KOO-lah'],
      mr: ['खाणे / जेवणे', 'Khane'], te: ['తినుట', 'Thinuta'], tr: ['Yemek yemek', 'yeh-MEHK'], ta: ['உண்ணுதல் / சாப்பிடுதல்', 'Saappidudhal'], vi: ['Ăn', 'ahn']
    })
  },
  {
    id: 195, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To drink', 'too DRINK'], zh: ['喝 / 饮', 'Hē'], hi: ['पीना', 'Peena'], es: ['Beber / Tomar', 'beh-BAIR'], fr: ['Boire', 'BWAHR'],
      ar: ['شرب / يشرب', 'Shariba'], bn: ['পান করা', 'Paan kora'], pt: ['Beber', 'beh-BAIR'], ru: ['Пить', 'PEET'], ur: ['پینا', 'Peena'],
      id: ['Minum', 'MEE-noom'], de: ['Trinken', 'TRING-ken'], ja: ['飲む (のむ)', 'Nomu'], pa: ['ਪੀਣਾ', 'Peena'], sw: ['Kunywa', 'koon-YWAH'],
      mr: ['पिणे', 'Pine'], te: ['తాగుట', 'Thaaguta'], tr: ['İçmek', 'eech-MEHK'], ta: ['குடித்தல்', 'Kudithal'], vi: ['Uống', 'wohng']
    })
  },
  {
    id: 196, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To walk', 'too WAWK'], zh: ['走 / 步行', 'Zǒu'], hi: ['चलना / टहलना', 'Chalna'], es: ['Caminar / Andar', 'kah-mee-NAR'], fr: ['Marcher', 'mar-SHAY'],
      ar: ['مشى / يمشي', 'Mashaa'], bn: ['হাঁটা', 'Hnata'], pt: ['Caminhar / Andar', 'kah-meen-YAHR'], ru: ['Гулять / Ходить', 'khah-DEET'], ur: ['چلنا / ٹہلنا', 'Chalna'],
      id: ['Berjalan', 'bair-JAH-lahn'], de: ['Spazieren / Gehen', 'shpah-TSEER-en'], ja: ['歩く (あるく)', 'Aruku'], pa: ['ਤੁਰਨਾ', 'Turna'], sw: ['Kutembea', 'koo-tem-BEH-ah'],
      mr: ['चालणे', 'Chalne'], te: ['నడుచుట', 'Naduchuta'], tr: ['Yürümek', 'yoo-roo-MEHK'], ta: ['நடத்தல்', 'Nadathal'], vi: ['Đi bộ', 'dee boh']
    })
  },
  {
    id: 197, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To run', 'too RUN'], zh: ['跑 / 跑步', 'Pǎo'], hi: ['दौड़ना / भागना', 'Daudna'], es: ['Correr', 'kor-RAIR'], fr: ['Courir', 'koo-REER'],
      ar: ['ركض / يجري', 'Rakada'], bn: ['দৌড়ানো', 'Dourano'], pt: ['Correr', 'koh-HAIR'], ru: ['Бегать / Бежать', 'BYEH-gaht'], ur: ['دوڑنا / بھاگنا', 'Daudna'],
      id: ['Berlari', 'bair-LAH-ree'], de: ['Rennen / Laufen', 'REN-nen'], ja: ['走る (はしる)', 'Hashiru'], pa: ['ਦੌੜਨਾ', 'Daudna'], sw: ['Kukimbia', 'koo-keem-BEE-ah'],
      mr: ['धावणे / पळणे', 'Dhavne'], te: ['పరుగెత్తుట', 'Parugethuta'], tr: ['Koşmak', 'kosh-MAHK'], ta: ['ஓடுதல்', 'Oodudhal'], vi: ['Chạy', 'chye']
    })
  },
  {
    id: 198, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To wait', 'too WAYT'], zh: ['等 / 等待', 'Děng'], hi: ['इंतज़ार करना', 'Intezaar karna'], es: ['Esperar', 'es-peh-RAR'], fr: ['Attendre', 'ah-TAHN-druh'],
      ar: ['انتظر / ينتظر', 'Intazara'], bn: ['অপেক্ষা করা', 'Opekkha kora'], pt: ['Esperar', 'esh-peh-RAR'], ru: ['Ждать', 'ZHDAHT'], ur: ['انتظار کرنا', 'Intezaar karna'],
      id: ['Menunggu', 'muh-NOONG-goo'], de: ['Warten', 'VAHR-ten'], ja: ['待つ (まつ)', 'Matsu'], pa: ['ਉਡੀਕਣਾ', 'Udeekna'], sw: ['Kusubiri', 'koo-soo-BEE-ree'],
      mr: ['वाट पाहणे', 'Vaat pahane'], te: ['వేచి ఉండుట', 'Vechi unduta'], tr: ['Beklemek', 'bek-leh-MEHK'], ta: ['காத்திருத்தல்', 'Kaathiruthal'], vi: ['Chờ / Đợi', 'chuh / duy']
    })
  },
  {
    id: 199, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To find / To search', 'too FYND'], zh: ['寻找 / 找到', 'Zhǎo / Zhǎodào'], hi: ['ढूँढना / पाना', 'Dhoondhna'], es: ['Encontrar / Buscar', 'en-kohn-TRAR'], fr: ['Trouver / Chercher', 'troo-VAY'],
      ar: ['وجد / يبحث', 'Wajada / Bahatha'], bn: ['খোঁজা / পাওয়া', 'Khoja'], pt: ['Encontrar / Buscar', 'en-kohn-TRAHR'], ru: ['Находить / Искать', 'nah-khah-DEET'], ur: ['تلاش کرنا / پانا', 'Talash karna'],
      id: ['Menemukan / Mencari', 'muh-neh-MOO-kahn'], de: ['Finden / Suchen', 'FIN-den'], ja: ['見つける / 探す', 'Mitsukeru / Sagasu'], pa: ['ਲੱਭਣਾ', 'Labbhna'], sw: ['Kupata / Kutafuta', 'koo-PAH-tah'],
      mr: ['शोधणे / सापडणे', 'Shodhne'], te: ['వెతుకుట / కనుగొనుట', 'Kanugonuta'], tr: ['Bulmak / Aramak', 'bool-MAHK'], ta: ['கண்டுபிடித்தல்', 'Kandupidithal'], vi: ['Tìm / Thấy', 'teem']
    })
  },
  {
    id: 200, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To start / To begin', 'too START'], zh: ['开始 / 启动', 'Kāishǐ'], hi: ['शुरू करना', 'Shuru karna'], es: ['Empezar / Comenzar', 'em-peh-ZAR'], fr: ['Commencer', 'kuh-mahn-SAY'],
      ar: ['بدأ / يبدأ', 'Bada\'a'], bn: ['শুরু করা', 'Shuru kora'], pt: ['Começar / Iniciar', 'koo-meh-SAHR'], ru: ['Начинать', 'nah-chee-NAHT'], ur: ['شروع کرنا / آغاز کرنا', 'Shuru karna'],
      id: ['Memulai', 'muh-MOO-lye'], de: ['Beginnen / Anfangen', 'beh-GIN-nen'], ja: ['始める (はじめる)', 'Hajimeru'], pa: ['ਸ਼ੁਰੂ ਕਰਨਾ', 'Shuru karna'], sw: ['Kuanza', 'koo-AHN-zah'],
      mr: ['सुरू करणे / आरंभ करणे', 'Suru karne'], te: ['ప్రారంభించుట', 'Praarambhinchuta'], tr: ['Başlamak', 'bahsh-lah-MAHK'], ta: ['தொடங்குதல்', 'Thodangudhal'], vi: ['Bắt đầu', 'baht dow']
    })
  },
  {
    id: 201, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To stop / To halt', 'too STOP'], zh: ['停止 / 停下', 'Tíngzhǐ'], hi: ['रुकना / रोकना', 'Rukna'], es: ['Parar / Detener', 'pah-RAR'], fr: ['Arrêter / Cesser', 'ah-reh-TAY'],
      ar: ['توقف / يقف', 'Tawaqqafa'], bn: ['থামা / থামানো', 'Thama'], pt: ['Parar', 'pah-RAHR'], ru: ['Останавливать', 'ah-stah-nahv-LEE-vaht'], ur: ['رکنا / روکنا', 'Rukna'],
      id: ['Berhenti', 'bair-HEN-tee'], de: ['Stoppen / Anhalten', 'SHTOP-pen'], ja: ['止まる / 止める', 'Tomaru / Tomeru'], pa: ['ਰੁਕਣਾ', 'Rukna'], sw: ['Kusimama', 'koo-see-MAH-mah'],
      mr: ['थांबणे / थांबवणे', 'Thambne'], te: ['ఆగుట / ఆపుట', 'Aaguta'], tr: ['Durmak / Durdurmak', 'door-MAHK'], ta: ['நிறுத்துதல்', 'Nirutthudhal'], vi: ['Dừng lại', 'zoong lye']
    })
  },
  {
    id: 202, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To finish / To complete', 'too FIN-ish'], zh: ['完成 / 结束', 'Wánchéng'], hi: ['खत्म करना / पूरा करना', 'Khatam karna'], es: ['Terminar / Finalizar', 'tair-mee-NAR'], fr: ['Finir / Terminer', 'fee-NEER'],
      ar: ['أنهى / يكمل', 'Anhaa'], bn: ['শেষ করা / সমাপ্ত করা', 'Shesh kora'], pt: ['Terminar / Concluir', 'tair-mee-NAHR'], ru: ['Заканчивать', 'zah-kahn-CHEE-vaht'], ur: ['ختم کرنا / مکمل کرنا', 'Khatam karna'],
      id: ['Menyelesaikan / Selesai', 'suh-luh-SYE'], de: ['Beenden / Fertigstellen', 'beh-EN-den'], ja: ['終える / 完了する', 'Oeru / Kanryou suru'], pa: ['ਖ਼ਤਮ ਕਰਨਾ', 'Khatam karna'], sw: ['Kumaliza', 'koo-mah-LEE-zah'],
      mr: ['संपवणे / पूर्ण करणे', 'Sampavne'], te: ['ముగించుట / పూర్తిచేయుట', 'Muginchuta'], tr: ['Bitirmek / Tamamlamak', 'bee-teer-MEHK'], ta: ['முடித்தல்', 'Mudithal'], vi: ['Hoàn thành / Kết thúc', 'hwahn tahn']
    })
  },
  {
    id: 203, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To remember', 'too ree-MEM-ber'], zh: ['记得 / 记住', 'Jìde'], hi: ['याद रखना', 'Yaad rakhna'], es: ['Recordar / Acordarse', 'reh-kor-DAR'], fr: ['Se souvenir / Rappeler', 'suh soo-vuh-NEER'],
      ar: ['تذكر / يتذكر', 'Tadhakkara'], bn: ['মনে রাখা / স্মরণ করা', 'Mone rakha'], pt: ['Lembrar', 'lem-BRAHR'], ru: ['Помнить', 'POHM-neet'], ur: ['یاد رکھنا', 'Yaad rakhna'],
      id: ['Mengingat / Ingat', 'ING-aht'], de: ['Erinnern', 'air-IN-nern'], ja: ['覚える / 思い出す', 'Oboeru / Omoidasu'], pa: ['ਯਾਦ ਰੱਖਣਾ', 'Yaad rakhna'], sw: ['Kukumbuka', 'koo-koom-BOO-kah'],
      mr: ['लक्षात ठेवणे / आठवणे', 'Lakshat thevne'], te: ['గుర్తుంచుకొనుట', 'Gurthunchukonuta'], tr: ['Hatırlamak', 'hah-tuhr-lah-MAHK'], ta: ['நினைவில் கொள்ளுதல்', 'Ninaivil'], vi: ['Nhớ', 'nyer']
    })
  },
  {
    id: 204, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To forget', 'too fer-GET'], zh: ['忘记 / 遗忘', 'Wàngjì'], hi: ['भूलना', 'Bhoolna'], es: ['Olvidar', 'ohl-vee-DAR'], fr: ['Oublier', 'oo-blee-AY'],
      ar: ['نسي / ينسى', 'Nasiya'], bn: ['ভুলে যাওয়া', 'Bhule jawa'], pt: ['Esquecer', 'esh-keh-SAIR'], ru: ['Забывать', 'zah-by-VAHT'], ur: ['بھولنا', 'Bhoolna'],
      id: ['Lupa', 'LOO-pah'], de: ['Vergessen', 'fair-GES-sen'], ja: ['忘れる (わすれる)', 'Wasureru'], pa: ['ਭੁੱਲਣਾ', 'Bhullna'], sw: ['Kusahau', 'koo-sah-HAH-oo'],
      mr: ['विसरणे', 'Visarne'], te: ['మరచిపోవుట', 'Marachipovuta'], tr: ['Unutmak', 'oo-noot-MAHK'], ta: ['மறத்தல்', 'Marathal'], vi: ['Quên', 'kwehn']
    })
  },
  {
    id: 205, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To live', 'too LIV'], zh: ['生活 / 居住', 'Shēnghuó / Jūzhù'], hi: ['जीना / रहना', 'Jeena / Rehna'], es: ['Vivir', 'vee-VEER'], fr: ['Vivre / Habiter', 'VEE-vruh'],
      ar: ['عاش / يسكن', '\'Aasha / Yaskun'], bn: ['বাস করা / বেঁচে থাকা', 'Bhash kora'], pt: ['Viver / Morar', 'vee-VAIR'], ru: ['Жить', 'ZHYT'], ur: ['جینا / رہنا', 'Jeena / Rehna'],
      id: ['Hidup / Tinggal', 'HEE-doop'], de: ['Leben / Wohnen', 'LAY-ben'], ja: ['生きる / 住む', 'Ikiru / Sumu'], pa: ['ਜਿਊਣਾ / ਰਹਿਣਾ', 'Jeeuna'], sw: ['Kuishi', 'koo-EE-shee'],
      mr: ['जपणे / जगणे / राहणे', 'Jagne'], te: ['జీవించుట / నివసించుట', 'Jeevinchuta'], tr: ['Yaşamak', 'yah-shah-MAHK'], ta: ['வாழ்தல் / வசித்தல்', 'Vaazhdhal'], vi: ['Sống', 'sawng']
    })
  },
  {
    id: 206, category: 'Common Verbs',
    translations: createTranslationMap({
      en: ['To die', 'too DYE'], zh: ['去世 / 死亡', 'Sǐ'], hi: ['मरना / देहांत होना', 'Marna'], es: ['Morir', 'moh-REER'], fr: ['Mourir', 'moo-REER'],
      ar: ['مات / يموت', 'Maata'], bn: ['মারা যাওয়া', 'Mara jawa'], pt: ['Morrer', 'moh-HAIR'], ru: ['Умирать', 'oo-mee-RAHT'], ur: ['مرنا / انتقال کرنا', 'Marna'],
      id: ['Mati / Meninggal', 'muh-NEENG-gahl'], de: ['Sterben', 'SHTAIR-ben'], ja: ['死ぬ / 亡くなる', 'Shinu'], pa: ['ਮਰਨਾ', 'Marna'], sw: ['Kufa', 'KOO-fah'],
      mr: ['मरणे / मृत्यू पावणे', 'Marne'], te: ['మరణించుట', 'Maraninchuta'], tr: ['Ölmek', 'url-MEHK'], ta: ['இறத்தல்', 'Irathal'], vi: ['Chết / Mất', 'chet']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 9. ADJECTIVES & DESCRIPTORS (207 - 230)
  // ─────────────────────────────────────────────────────────────
  {
    id: 207, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Good / Fine', 'GOOD'], zh: ['好 / 优秀', 'Hǎo'], hi: ['अच्छा / बढ़िया', 'Achha'], es: ['Bueno / Bien', 'BWEH-noh'], fr: ['Bon / Bien', 'BOHN'],
      ar: ['جيد / طيب', 'Jayyid / Tayyib'], bn: ['ভালো / উত্তম', 'Bhalo'], pt: ['Bom / Boa', 'BOHN'], ru: ['Хороший', 'khah-ROH-shee'], ur: ['اچھا / عمدہ', 'Achha / Umdah'],
      id: ['Bagus / Baik', 'BAH-goos'], de: ['Gut', 'GOOT'], ja: ['良い (いい / よい)', 'Ii / Yoi'], pa: ['ਚੰਗਾ', 'Changa'], sw: ['Nzuri / Njema', 'n-ZOO-ree'],
      mr: ['चांगला / छान', 'Changla'], te: ['మంచి / బాగున్న', 'Manchi'], tr: ['İyi / Güzel', 'ee-YEE'], ta: ['நல்ல', 'Nalla'], vi: ['Tốt / Hay', 'toht']
    })
  },
  {
    id: 208, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Bad', 'BAD'], zh: ['坏 / 差', 'Huài / Chà'], hi: ['बुरा / ख़राब', 'Bura / Kharab'], es: ['Malo', 'MAH-loh'], fr: ['Mauvais', 'moh-VEH'],
      ar: ['سيء / رديء', 'Sayyi\''], bn: ['খারাপ / মন্দ', 'Kharap'], pt: ['Mau / Ruim', 'MOW / hoo-EEN'], ru: ['Плохой', 'plah-KHOY'], ur: ['برا / خراب', 'Bura / Kharab'],
      id: ['Buruk / Jahat', 'BOO-rook'], de: ['Schlecht', 'SHLEKHT'], ja: ['悪い (わるい)', 'Warui'], pa: ['ਬੁਰਾ / ਮਾੜਾ', 'Bura'], sw: ['Mbaya', 'm-BAH-yah'],
      mr: ['वाईट / खराब', 'Vaait'], te: ['చెడు / చెడ్డ', 'Chedu'], tr: ['Kötü', 'kur-TOO'], ta: ['கெட்ட / மோசமான', 'Ketta'], vi: ['Xấu / Tồi', 'sow']
    })
  },
  {
    id: 209, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Happy', 'HAP-ee'], zh: ['快乐 / 高兴', 'Kuàilè / Gāoxìng'], hi: ['ख़ुश / प्रसन्न', 'Khush / Prasanna'], es: ['Feliz / Alegre', 'feh-LEES'], fr: ['Heureux / Joyeux', 'uh-RUH'],
      ar: ['سعيد / فرحان', 'Sa\'eed / Farhan'], bn: ['খুশি / সুখী', 'Khushi'], pt: ['Feliz / Contente', 'feh-LEES'], ru: ['Счастливый', 'schah-STLEE-vy'], ur: ['خوش / مسرور', 'Khush / Masroor'],
      id: ['Senang / Bahagia', 'suh-NAHNG'], de: ['Glücklich / Froh', 'GLEWK-likh'], ja: ['嬉しい / 幸せ', 'Ureshii / Shiawase'], pa: ['ਖ਼ੁਸ਼', 'Khush'], sw: ['Furaha', 'foo-RAH-hah'],
      mr: ['आनंदी / आनंदीत', 'Aanandi'], te: ['సంతోషకరమైన', 'Santhoshamaina'], tr: ['Mutlu', 'moot-LOO'], ta: ['மகிழ்ச்சியான', 'Magizhchiyaana'], vi: ['Vui vẻ / Hạnh phúc', 'vooy veh']
    })
  },
  {
    id: 210, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Sad', 'SAD'], zh: ['伤心 / 悲伤', 'Shāngxīn'], hi: ['उदास / दुखी', 'Udaas / Dukhi'], es: ['Triste', 'TREES-teh'], fr: ['Triste', 'TREEST'],
      ar: ['حزين', 'Hazeen'], bn: ['দুঃখী / বিষণ্ণ', 'Dukkhi'], pt: ['Triste', 'TREES-chee'], ru: ['Грустный / Печальный', 'GROOS-nee'], ur: ['اداس / غمگین', 'Udaas / Ghamgeen'],
      id: ['Sedih', 'suh-DEEH'], de: ['Traurig', 'TROW-rikh'], ja: ['悲しい (かなしい)', 'Kanashii'], pa: ['ਉਦਾਸ', 'Udaas'], sw: ['Huzuni', 'hoo-ZOO-nee'],
      mr: ['दुःखी / उदास', 'Dukhi'], te: ['విచారంగా', 'Vichaaranga'], tr: ['Üzgün', 'ooz-GOON'], ta: ['சோகமான', 'Sogamaana'], vi: ['Buồn', 'bwon']
    })
  },
  {
    id: 211, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Beautiful', 'BYOO-tuh-ful'], zh: ['美丽 / 漂亮', 'Měilì / Piàoliang'], hi: ['सुंदर / ख़ूबसूरत', 'Sundar / Khoobsoorat'], es: ['Hermoso / Bello', 'air-MOH-soh'], fr: ['Beau / Belle', 'BOH / BEL'],
      ar: ['جميل', 'Jameel'], bn: ['সুন্দর', 'Shundor'], pt: ['Belo / Bonito', 'BEH-loo / boh-NEE-too'], ru: ['Красивый', 'krah-SEE-vy'], ur: ['خوبصورت / جمیل', 'Khoobsoorat'],
      id: ['Indah / Cantik', 'EEN-dah'], de: ['Schön / Hübsch', 'SHOON'], ja: ['美しい / 綺麗', 'Utsukushii / Kirei'], pa: ['ਸੁੰਦਰ / ਸੋਹਣਾ', 'Sohna'], sw: ['Mrembo / Nzuri', 'm-REM-boh'],
      mr: ['सुंदर / छान', 'Sundar'], te: ['అందమైన', 'Andamaina'], tr: ['Güzel', 'goo-ZEL'], ta: ['அழகான', 'Azhagaana'], vi: ['Đẹp', 'dep']
    })
  },
  {
    id: 212, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Easy', 'EE-zee'], zh: ['容易 / 简单', 'Róngyì / Jiǎndān'], hi: ['आसान / सरल', 'Aasaan / Saral'], es: ['Fácil', 'FAH-seel'], fr: ['Facile', 'fah-SEEL'],
      ar: ['سهل', 'Sahl'], bn: ['সহজ', 'Shohoj'], pt: ['Fácil', 'FAH-seel'], ru: ['Лёгкий / Просто', 'LYOHKH-kee'], ur: ['آسان / سہل', 'Aasaan'],
      id: ['Mudah / Gampang', 'MOO-dah'], de: ['Einfach / Leicht', 'EYN-fahkh'], ja: ['簡単 (かんたん)', 'Kantan'], pa: ['ਆਸਾਨ / ਸੌਖਾ', 'Aasaan'], sw: ['Rahisi', 'rah-HEE-see'],
      mr: ['सोपे / सोपा', 'Sope'], te: ['సులభమైన', 'Sulabhamaina'], tr: ['Kolay', 'koh-LYE'], ta: ['எளிதான', 'Elidhaana'], vi: ['Dễ', 'zeh']
    })
  },
  {
    id: 213, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Difficult / Hard', 'DIF-uh-kult'], zh: ['困难 / 难', 'Kùnnán / Nán'], hi: ['कठिन / मुश्किल', 'Kathin / Mushkil'], es: ['Difícil', 'dee-FEE-seel'], fr: ['Difficile', 'dee-fee-SEEL'],
      ar: ['صعب', 'Sa\'b'], bn: ['কঠিন / মুশকিল', 'Kothin'], pt: ['Difícil', 'jee-FEE-seel'], ru: ['Трудный / Сложный', 'TROOD-nee'], ur: ['مشکل / کٹھن', 'Mushkil / Kathin'],
      id: ['Sulit / Sukar', 'SOO-leet'], de: ['Schwierig / Schwer', 'SHVEE-rikh'], ja: ['難しい (むずかしい)', 'Muzukashii'], pa: ['ਔਖਾ / ਮੁਸ਼ਕਲ', 'Aukha'], sw: ['Ngumu', 'n-GOO-moo'],
      mr: ['कठीण / अवघड', 'Katheen / Avgad'], te: ['కష్టమైన', 'Kashtamaina'], tr: ['Zor / Güç', 'ZOR'], ta: ['கடினமான', 'Kadinamaana'], vi: ['Khó', 'khaw']
    })
  },
  {
    id: 214, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Hot / Warm', 'HOT'], zh: ['热 / 炎热', 'Rè'], hi: ['गर्म', 'Garam'], es: ['Caliente / Caluroso', 'kah-LYEHN-teh'], fr: ['Chaud', 'SHOH'],
      ar: ['حار / ساخن', 'Haar / Saakhin'], bn: ['গরম', 'Gorom'], pt: ['Quente', 'KEN-chee'], ru: ['Горячий / Жаркий', 'gah-RYAH-chee'], ur: ['گرم', 'Garam'],
      id: ['Panas / Hangat', 'PAH-nahs'], de: ['Heiß / Warm', 'HYS'], ja: ['熱い / 暑い', 'Atsui'], pa: ['ਗਰਮ', 'Garam'], sw: ['Moto', 'MOH-toh'],
      mr: ['गरम / उष्ण', 'Garam'], te: ['వేడిగా', 'Vediga'], tr: ['Sıcak', 'suh-JAHK'], ta: ['சூடான', 'Soodaana'], vi: ['Nóng', 'nawng']
    })
  },
  {
    id: 215, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Cold', 'KOHLD'], zh: ['冷 / 寒冷', 'Lěng'], hi: ['ठंडा / शीत', 'Thanda'], es: ['Frío', 'FREE-oh'], fr: ['Froid', 'FRWAH'],
      ar: ['بارد', 'Barid'], bn: ['ঠান্ডা / শীতল', 'Thanda'], pt: ['Frio', 'FREE-oo'], ru: ['Холодный', 'khah-LOHD-ny'], ur: ['ٹھنڈا / سرد', 'Thanda / Sard'],
      id: ['Dingin', 'DEENG-een'], de: ['Kalt', 'KAHLT'], ja: ['冷たい / 寒い', 'Tsumetai / Samui'], pa: ['ਠੰਢਾ', 'Thandha'], sw: ['Baridi', 'bah-REE-dee'],
      mr: ['थंड / गार', 'Thand'], te: ['చల్లగా', 'Challaga'], tr: ['Soğuk', 'soh-OOK'], ta: ['குளிர்ந்த', 'Kulirndha'], vi: ['Lạnh', 'lahny']
    })
  },
  {
    id: 216, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Fast / Quick', 'FAST'], zh: ['快 / 快速', 'Kuài'], hi: ['तेज़ / शीघ्र', 'Tez'], es: ['Rápido', 'RAH-pee-doh'], fr: ['Rapide / Vite', 'rah-PEED'],
      ar: ['سريع', 'Saree\''], bn: ['দ্রুত / তাড়াতাড়ি', 'Druto'], pt: ['Rápido', 'HAH-pee-doo'], ru: ['Быстрый', 'BY-stry'], ur: ['تیز / جلد', 'Tez'],
      id: ['Cepat', 'chuh-PAHT'], de: ['Schnell', 'SHNEL'], ja: ['速い (はやい)', 'Hayai'], pa: ['ਤੇਜ਼', 'Tez'], sw: ['Haraka', 'hah-RAH-kah'],
      mr: ['वेगवान / जलद', 'Jalad'], te: ['వేగంగా', 'Veganga'], tr: ['Hızlı', 'huz-LUH'], ta: ['வேகமான', 'Vegamaana'], vi: ['Nhanh', 'nyahn']
    })
  },
  {
    id: 217, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Slow', 'SLOH'], zh: ['慢 / 缓慢', 'Màn'], hi: ['धीमा / धीरे', 'Dheema'], es: ['Lento', 'LEHN-toh'], fr: ['Lent', 'LAHN'],
      ar: ['بطيء', 'Batee\''], bn: ['ধীর / আস্তে', 'Dheer'], pt: ['Lento / Devagar', 'LEHN-too'], ru: ['Медленный', 'MYEHD-lyen-ny'], ur: ['سست / آہستہ', 'Sust / Aahista'],
      id: ['Lambat / Pelan', 'LAHM-baht'], de: ['Langsam', 'LAHNG-zahm'], ja: ['遅い (おそい)', 'Osoi'], pa: ['ਹੌਲੀ', 'Hauli'], sw: ['Polepole / Pole', 'POH-leh'],
      mr: ['हळू / मंद', 'Halu'], te: ['నెమ్మదిగా', 'Nemmadiga'], tr: ['Yavaş', 'yah-VAHSH'], ta: ['மெதுவான', 'Medhuvaana'], vi: ['Chậm', 'chuhm']
    })
  },
  {
    id: 218, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['New', 'NYOO'], zh: ['新 / 新鲜', 'Xīn'], hi: ['नया', 'Naya'], es: ['Nuevo', 'NWEH-voh'], fr: ['Nouveau / Neuf', 'noo-VOH'],
      ar: ['جديد', 'Jadeed'], bn: ['নতুন', 'Notun'], pt: ['Novo', 'NOH-voo'], ru: ['Новый', 'NOH-vy'], ur: ['نیا / جدید', 'Naya / Jadeed'],
      id: ['Baru', 'BAH-roo'], de: ['Neu', 'NOY'], ja: ['新しい (あたらしい)', 'Atarashii'], pa: ['ਨਵਾਂ', 'Nawaan'], sw: ['Mpya', 'M-pyah'],
      mr: ['नवीन', 'Naveen'], te: ['కొత్త', 'Kotha'], tr: ['Yeni', 'yeh-NEE'], ta: ['புதிய', 'Pudhiya'], vi: ['Mới', 'mer-ee']
    })
  },
  {
    id: 219, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Old', 'OHLD'], zh: ['老 / 旧', 'Lǎo / Jiù'], hi: ['पुराना / वृद्ध', 'Purana'], es: ['Viejo / Antiguo', 'VYEH-hoh'], fr: ['Vieux / Ancien', 'VYUH'],
      ar: ['قديم / كبير بالسن', 'Qadeem / Kabeer'], bn: ['পুরনো / প্রাচীন', 'Purono'], pt: ['Velho / Antigo', 'VEHL-yoo'], ru: ['Старый', 'STAH-ry'], ur: ['پرانا / قدیم / بوڑھا', 'Purana / Qadeem'],
      id: ['Tua / Lama', 'TOO-ah'], de: ['Alt', 'AHLT'], ja: ['古い / 年老いた', 'Furui / Toshi oita'], pa: ['ਪੁਰਾਣਾ', 'Purana'], sw: ['Zamani / Mzee', 'zah-MAH-nee'],
      mr: ['जुना / म्हातारा', 'Juna'], te: ['పాత / వృద్ధ', 'Paatha'], tr: ['Eski / Yaşlı', 'es-KEE / yahsh-LUH'], ta: ['பழைய / முதிய', 'Pazhaiya'], vi: ['Cũ / Già', 'koo / zah']
    })
  },
  {
    id: 220, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Young', 'YUNG'], zh: ['年轻 / 幼小', 'Niánqīng'], hi: ['जवान / युवा', 'Jawaan / Yuva'], es: ['Joven', 'HOH-ven'], fr: ['Jeune', 'ZHUHN'],
      ar: ['شاب / صغير', 'Shaabb / Sagheer'], bn: ['তরুণ / যুবক', 'Torun'], pt: ['Jovem', 'ZHOH-veyn'], ru: ['Молодой', 'mah-lah-DOY'], ur: ['جوان / نوجوان', 'Jawan / Naujawan'],
      id: ['Muda', 'MOO-dah'], de: ['Jung', 'YOONG'], ja: ['若い (わかい)', 'Wakai'], pa: ['ਜਵਾਨ', 'Jawan'], sw: ['Kijana / Dogo', 'kee-JAH-nah'],
      mr: ['तरुण / लहान', 'Tarun'], te: ['యువ / చిన్న', 'Yuva'], tr: ['Genç', 'GENCH'], ta: ['இளம்', 'Ilam'], vi: ['Trẻ', 'treh']
    })
  },
  {
    id: 221, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Clean', 'KLEEN'], zh: ['干净 / 清洁', 'Gānjìng'], hi: ['साफ़ / स्वच्छ', 'Saaf / Swachh'], es: ['Limpio', 'LEEM-pyoh'], fr: ['Propre', 'PROH-pruh'],
      ar: ['نظيف', 'Nadheef'], bn: ['পরিষ্কার / সাফ', 'Porishkar'], pt: ['Limpo', 'LEEM-poo'], ru: ['Чистый', 'CHEES-tee'], ur: ['صاف / ستھرا', 'Saaf / Suthra'],
      id: ['Bersih', 'bair-SEEH'], de: ['Sauber / Rein', 'ZOW-ber'], ja: ['綺麗 / 清潔', 'Kirei / Seiketsu'], pa: ['ਸਾਫ਼', 'Saaf'], sw: ['Safi', 'SAH-fee'],
      mr: ['स्वच्छ / साफ', 'Swachh'], te: ['శుభ్రమైన', 'Shubhramaina'], tr: ['Temiz', 'teh-MEEZ'], ta: ['சுத்தமான', 'Suthamaana'], vi: ['Sạch sẽ', 'sahk seh']
    })
  },
  {
    id: 222, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Dirty', 'DER-tee'], zh: ['脏 / 污秽', 'Zāng'], hi: ['गंदा / मैला', 'Ganda'], es: ['Sucio', 'SOO-syoh'], fr: ['Sale', 'SAHL'],
      ar: ['قذر / وسخ', 'Qadhir / Wasikh'], bn: ['নোংরা / অপরিচ্ছন্ন', 'Nongra'], pt: ['Sujo', 'SOO-zhoo'], ru: ['Грязный', 'GRYAHZ-ny'], ur: ['گندا / میلا', 'Ganda / Mela'],
      id: ['Kotor', 'KOH-tohr'], de: ['Dreckig / Schmutzig', 'SHMOOT-tsikh'], ja: ['汚い (きたない)', 'Kitanai'], pa: ['ਗੰਦਾ', 'Ganda'], sw: ['Chafu', 'CHAH-foo'],
      mr: ['घाणेरडा / अस्वच्छ', 'Ghanerda'], te: ['మురికిగా', 'Murikiga'], tr: ['Kirli / Pis', 'keer-LEE'], ta: ['அழுக்கான', 'Azhukkaana'], vi: ['Bẩn / Dơ', 'buhn']
    })
  },
  {
    id: 223, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Rich / Wealthy', 'RICH'], zh: ['富 / 富裕', 'Fù / Fùyù'], hi: ['अमीर / धनी', 'Ameer / Dhani'], es: ['Rico / Adinerado', 'REE-koh'], fr: ['Riche', 'REESH'],
      ar: ['غني / ثري', 'Ghaniyy / Thariyy'], bn: ['ধনী / পয়সাওয়ালা', 'Dhoni'], pt: ['Rico', 'HEE-koo'], ru: ['Богатый', 'bah-GAH-ty'], ur: ['امیر / دولتمند', 'Ameer / Daulatmand'],
      id: ['Kaya', 'KAH-yah'], de: ['Reich / Wohlhabend', 'RYKH'], ja: ['お金持ち / 裕福', 'Okanemochi'], pa: ['ਅਮੀਰ', 'Ameer'], sw: ['Tajiri', 'tah-JEE-ree'],
      mr: ['श्रीमंत / श्रीमंती', 'Shrimant'], te: ['ధనవంతుడు / ధనిక', 'Dhanik'], tr: ['Zengin', 'zen-GEEN'], ta: ['பணக்கார / செல்வந்தர்', 'Panakkaara'], vi: ['Giàu có', 'zow caw']
    })
  },
  {
    id: 224, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Poor', 'POOR'], zh: ['穷 / 贫穷', 'Qióng'], hi: ['ग़रीब / निर्धन', 'Gareeb'], es: ['Pobre', 'POH-breh'], fr: ['Pauvre', 'POH-vruh'],
      ar: ['فقير', 'Faqeer'], bn: ['গরীব / দরিদ্র', 'Gorib'], pt: ['Pobre', 'POH-bree'], ru: ['Бедный', 'BYEHD-ny'], ur: ['غریب / نادار', 'Ghareeb'],
      id: ['Miskin', 'MEES-keen'], de: ['Arm', 'AHRM'], ja: ['貧しい (まずしい)', 'Mazushii'], pa: ['ਗ਼ਰੀਬ', 'Gareeb'], sw: ['Maskini', 'mahs-KEE-nee'],
      mr: ['गरीब / निर्धन', 'Gareeb'], te: ['పేద', 'Peda'], tr: ['Fakir / Yoksul', 'fah-KEER'], ta: ['ஏழை', 'Ezhai'], vi: ['Nghèo', 'ngew']
    })
  },
  {
    id: 225, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Strong', 'STRONG'], zh: ['强壮 / 有力', 'Qiángzhuàng'], hi: ['मज़बूत / ताक़तवर', 'Mazboot / Taaqatwar'], es: ['Fuerte', 'FWEHR-teh'], fr: ['Fort', 'FOR'],
      ar: ['قوي', 'Qawiyy'], bn: ['শক্তিশালী / মজবুত', 'Shoktishali'], pt: ['Forte', 'FOR-chee'], ru: ['Сильный / Крепкий', 'SEEL-nee'], ur: ['مضبوط / طاقتور', 'Mazboot / Taaqatwar'],
      id: ['Kuat', 'KOO-aht'], de: ['Stark / Kräftig', 'SHTAHRK'], ja: ['強い (つよい)', 'Tsuyoi'], pa: ['ਮਜ਼ਬੂਤ / ਤਾਕਤਵਰ', 'Mazboot'], sw: ['Hodari / Nguvu', 'hoh-DAH-ree'],
      mr: ['मजबूत / बलवान', 'Majboot'], te: ['బలమైన', 'Balamaina'], tr: ['Güçlü / Kuvvetli', 'gooch-LOO'], ta: ['வலுவான / பலமான', 'Valuvaana'], vi: ['Mạnh mẽ / Khỏe', 'mahny']
    })
  },
  {
    id: 226, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Weak', 'WEEK'], zh: ['虚弱 / 弱', 'Ruò / Xūruò'], hi: ['कमज़ोर / दुर्बल', 'Kamzor'], es: ['Débil', 'DEH-beel'], fr: ['Faible', 'FEH-bluh'],
      ar: ['ضعيف', 'Da\'eef'], bn: ['দুর্বল', 'Durbol'], pt: ['Fraco', 'FRAH-koo'], ru: ['Слабый', 'SLAH-by'], ur: ['کمزور / ناتواں', 'Kamzor'],
      id: ['Lemah', 'luh-MAH'], de: ['Schwach', 'SHVAHKH'], ja: ['弱い (よわい)', 'Yowai'], pa: ['ਕਮਜ਼ੋਰ', 'Kamzor'], sw: ['Dhaifu', 'dhah-EE-foo'],
      mr: ['कमकुवत / दुर्बल', 'Kamkuvat'], te: ['బలహీనమైన', 'Balaheenamaina'], tr: ['Zayıf / Güçsüz', 'zah-YUUF'], ta: ['பலவீனமான', 'Balaheenamaana'], vi: ['Yếu / Yếu đuối', 'eew']
    })
  },
  {
    id: 227, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Safe / Secure', 'SAYF'], zh: ['安全', 'Ānquán'], hi: ['सुरक्षित / महफ़ूज़', 'Surakshit'], es: ['Seguro', 'seh-GOO-roh'], fr: ['Sûr / Sécurisé', 'SEWR'],
      ar: ['آمن / سليم', 'Aamin / Saleem'], bn: ['নিরাপদ', 'Nirapod'], pt: ['Seguro', 'seh-GOO-roo'], ru: ['Безопасный', 'bye-zah-PAHS-ny'], ur: ['محفوظ / مامون', 'Mehfooz'],
      id: ['Aman', 'AH-mahn'], de: ['Sicher', 'ZEE-kher'], ja: ['安全 (あんぜん)', 'Anzen'], pa: ['ਸੁਰੱਖਿਅਤ', 'Surakkhiat'], sw: ['Salama', 'sah-LAH-mah'],
      mr: ['सुरक्षित', 'Surakshit'], te: ['సురక్షితమైన', 'Surakshithamaina'], tr: ['Güvenli / Emin', 'goo-ven-LEE'], ta: ['பாதுகாப்பான', 'Paadhukaappaana'], vi: ['An toàn', 'ahn twahn']
    })
  },
  {
    id: 228, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['Dangerous', 'DAYN-jer-us'], zh: ['危险', 'Wēixiǎn'], hi: ['ख़तरनाक', 'Khatarnaak'], es: ['Peligroso', 'peh-lee-GROH-soh'], fr: ['Dangereux', 'dahn-zhuh-RUH'],
      ar: ['خطير', 'Khateer'], bn: ['বিপজ্জনক', 'Bipojjonok'], pt: ['Perigoso', 'peh-ree-GOH-zoo'], ru: ['Опасный', 'ah-PAHS-ny'], ur: ['خطرناک', 'Khatarnaak'],
      id: ['Berbahaya', 'bair-bah-HAH-yah'], de: ['Gefährlich', 'geh-FAIR-likh'], ja: ['危険 (きけん)', 'Kiken'], pa: ['ਖ਼ਤਰਨਾਕ', 'Khatarnaak'], sw: ['Hatari', 'hah-TAH-ree'],
      mr: ['धोकादायक / धोका', 'Dhokadayak'], te: ['ప్రమాదకరమైన', 'Pramaadakaramaina'], tr: ['Tehlikeli', 'teh-lee-keh-LEE'], ta: ['ஆபத்தான', 'Aabathaana'], vi: ['Nguy hiểm', 'ngwee hyem']
    })
  },
  {
    id: 229, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['True / Correct', 'TROO'], zh: ['真 / 正确', 'Zhēn / Zhèngquè'], hi: ['सत्य / सही', 'Satya / Sahi'], es: ['Verdadero / Correcto', 'vair-dah-DEH-roh'], fr: ['Vrai / Correct', 'VRAY'],
      ar: ['صحيح / حق', 'Saheeh / Haqq'], bn: ['সত্য / সঠিক', 'Shotto / Shothik'], pt: ['Verdadeiro / Certo', 'vair-dah-DAY-roo'], ru: ['Правдивый / Верно', 'PRAHV-dah'], ur: ['سچ / صحیح', 'Sach / Sahi'],
      id: ['Benar', 'buh-NAHR'], de: ['Wahr / Richtig', 'VAHR / RIKH-tikh'], ja: ['本当 / 正しい', 'Hontou / Tadashii'], pa: ['ਸੱਚ / ਠੀਕ', 'Sach'], sw: ['Kweli / Sahihi', 'KWEH-lee'],
      mr: ['खरे / सत्य', 'Khare / Satya'], te: ['నిజం / సరైన', 'Nijam'], tr: ['Doğru / Gerçek', 'doh-ROO'], ta: ['உண்மை / சரி', 'Unmai / Sari'], vi: ['Đúng / Thật', 'doong']
    })
  },
  {
    id: 230, category: 'Adjectives & Descriptors',
    translations: createTranslationMap({
      en: ['False / Wrong', 'FAWLS / RONG'], zh: ['假 / 错误', 'Jiǎ / Cuòwù'], hi: ['ग़लत / असत्य', 'Galat / Asatya'], es: ['Falso / Incorrecto', 'FAHL-soh'], fr: ['Faux / Erroné', 'FOH'],
      ar: ['خطأ / باطل', 'Khata\' / Baatil'], bn: ['ভুল / মিথ্যা', 'Bhul / Mittha'], pt: ['Falso / Errado', 'FAHL-soo'], ru: ['Ложный / Неверно', 'LOHZH-ny'], ur: ['غلط / باطل', 'Ghalat'],
      id: ['Salah / Palsu', 'SAH-lah'], de: ['Falsch', 'FAHLSH'], ja: ['間違い / 嘘', 'Machigai / Uso'], pa: ['ਗ਼ਲਤ / ਝੂਠ', 'Ghalat'], sw: ['Uongo / Si sahihi', 'oo-OHN-goh'],
      mr: ['खोटे / चुकीचे', 'Khote / Chuki'], te: ['తప్పు / అబద్ధం', 'Thappu'], tr: ['Yanlış / Sahte', 'yahn-LUSH'], ta: ['தவறு / பொய்', 'Thavaru / Poi'], vi: ['Sai / Giả', 'sye / zah']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 10. NATURE & ESSENTIALS (231 - 250)
  // ─────────────────────────────────────────────────────────────
  {
    id: 231, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Sun', 'SUN'], zh: ['太阳 / 日', 'Tàiyáng'], hi: ['सूरज / सूर्य', 'Sooraj / Surya'], es: ['Sol', 'SOHL'], fr: ['Soleil', 'soh-LAY'],
      ar: ['شمس', 'Shams'], bn: ['সূর্য / রবি', 'Shurjo'], pt: ['Sol', 'SOHL'], ru: ['Солнце', 'SOHN-tseh'], ur: ['سورج / شمس', 'Sooraj / Shams'],
      id: ['Matahari', 'mah-tah-HAH-ree'], de: ['Sonne', 'ZON-neh'], ja: ['太陽 (たいよう)', 'Taiyou'], pa: ['ਸੂਰਜ', 'Sooraj'], sw: ['Jua', 'JOO-ah'],
      mr: ['सूर्य / रवी', 'Surya'], te: ['సూర్యుడు', 'Sooryudu'], tr: ['Güneş', 'goo-NESH'], ta: ['சூரியன்', 'Sooriyan'], vi: ['Mặt trời', 'muht choy']
    })
  },
  {
    id: 232, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Moon', 'MOON'], zh: ['月亮 / 月', 'Yuèliang'], hi: ['चाँद / चन्द्रमा', 'Chaand / Chandrama'], es: ['Luna', 'LOO-nah'], fr: ['Lune', 'LEWN'],
      ar: ['قمر', 'Qamar'], bn: ['চাঁদ', 'Chnad'], pt: ['Lua', 'LOO-ah'], ru: ['Луна', 'loo-NAH'], ur: ['چاند / قمر', 'Chaand / Qamar'],
      id: ['Bulan', 'BOO-lahn'], de: ['Mond', 'MOHNT'], ja: ['月 (つき)', 'Tsuki'], pa: ['ਚੰਨ', 'Chann'], sw: ['Mwezi', 'MWEH-zee'],
      mr: ['चंद्र / चांदोबा', 'Chandra'], te: ['చంద్రుడు', 'Chandrudu'], tr: ['Ay / Hilal', 'EYE'], ta: ['நிலா / சந்திரன்', 'Nilaa'], vi: ['Mặt trăng', 'muht chahng']
    })
  },
  {
    id: 233, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Star', 'STAR'], zh: ['星星 / 星', 'Xīngxing'], hi: ['तारा / सितारा', 'Taara / Sitaara'], es: ['Estrella', 'es-TREH-yah'], fr: ['Étoile', 'ay-TWAHL'],
      ar: ['نجم / كوكب', 'Najm'], bn: ['তারা / নক্ষত্র', 'Tara'], pt: ['Estrela', 'esh-TREH-lah'], ru: ['Звезда', 'zvyez-DAH'], ur: ['تارہ / ستارہ', 'Taara / Sitaara'],
      id: ['Bintang', 'BEEN-tahng'], de: ['Stern', 'SHTAIRN'], ja: ['星 (ほし)', 'Hoshi'], pa: ['ਤਾਰਾ', 'Taara'], sw: ['Nyota', 'NYOH-tah'],
      mr: ['तारा / चांदणी', 'Tara'], te: ['నక్షత్రం / చుక్క', 'Nakshatram'], tr: ['Yıldız', 'yuhl-DUHZ'], ta: ['நட்சத்திரம் / விண்மீன்', 'Natchathiram'], vi: ['Ngôi sao', 'ngoy sow']
    })
  },
  {
    id: 234, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Sky', 'SKYE'], zh: ['天空 / 天', 'Tiānkōng'], hi: ['आसमान / आकाश', 'Aasmaan / Aakash'], es: ['Cielo', 'SYEH-loh'], fr: ['Ciel', 'SYEL'],
      ar: ['سماء', 'Samaa\''], bn: ['আকাশ / গগন', 'Aakash'], pt: ['Céu', 'SEH-oo'], ru: ['Небо', 'NYEH-bah'], ur: ['آسمان / فلک', 'Aasmaan / Falak'],
      id: ['Langit', 'LAHNG-eet'], de: ['Himmel', 'HIM-mel'], ja: ['空 (そら)', 'Sora'], pa: ['ਅਸਮਾਨ', 'Asmaan'], sw: ['Anga / Mbingu', 'AHN-gah'],
      mr: ['आकाश / आभाळ', 'Aakash'], te: ['ఆకాశం', 'Aakaasham'], tr: ['Gökyüzü / Gök', 'gurk-yoo-ZOO'], ta: ['வானம் / ஆகாயம்', 'Vaanam'], vi: ['Bầu trời', 'bow choy']
    })
  },
  {
    id: 235, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Rain', 'RAYN'], zh: ['雨 / 下雨', 'Yǔ'], hi: ['बारिश / वर्षा', 'Baarish / Varsha'], es: ['Lluvia', 'YOO-vyah'], fr: ['Pluie', 'PLWEE'],
      ar: ['مطر', 'Matar'], bn: ['বৃষ্টি', 'Brishti'], pt: ['Chuva', 'SHOO-vah'], ru: ['Дождь', 'DOZHD'], ur: ['بارش / باراں', 'Baarish'],
      id: ['Hujan', 'HOO-jahn'], de: ['Regen', 'RAY-gen'], ja: ['雨 (あめ)', 'Ame'], pa: ['ਮੀਂਹ / ਬਰਸਾਤ', 'Meenh'], sw: ['Mvua', 'M-voo-ah'],
      mr: ['पाऊस / वर्षा', 'Paaus'], te: ['వర్షం / వాన', 'Varsham'], tr: ['Yağmur', 'yah-MOOR'], ta: ['மழை', 'Mazhai'], vi: ['Mưa', 'moo-uh']
    })
  },
  {
    id: 236, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Wind', 'WIND'], zh: ['风', 'Fēng'], hi: ['हवा / वायु', 'Hawa / Vaayu'], es: ['Viento', 'VYEHN-toh'], fr: ['Vent', 'VAHN'],
      ar: ['ريح / هواء', 'Reeh / Hawaa\''], bn: ['বাতাস / বায়ু', 'Batash'], pt: ['Vento', 'VEN-too'], ru: ['Ветер', 'VYEH-tyer'], ur: ['ہوا / باد', 'Hawa'],
      id: ['Angin', 'AHN-geen'], de: ['Wind', 'VINT'], ja: ['風 (かぜ)', 'Kaze'], pa: ['ਹਵਾ', 'Hawa'], sw: ['Upepo', 'oo-PEH-poh'],
      mr: ['वारा / पवन', 'Vaara'], te: ['గాలి / వాయువు', 'Gaali'], tr: ['Rüzgar', 'rooz-GAHR'], ta: ['காற்று', 'Kaatru'], vi: ['Gió', 'zaw']
    })
  },
  {
    id: 237, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Fire', 'FYRE'], zh: ['火', 'Huǒ'], hi: ['आग / अग्नि', 'Aag / Agni'], es: ['Fuego', 'FWEH-goh'], fr: ['Feu', 'FUH'],
      ar: ['نار / حريق', 'Naar'], bn: ['আগুন / অগ্নি', 'Agun'], pt: ['Fogo', 'FOH-goo'], ru: ['Огонь / Пожар', 'ah-GOHN'], ur: ['آگ / آتش', 'Aag / Aatish'],
      id: ['Api', 'AH-pee'], de: ['Feuer', 'FOY-er'], ja: ['火 (ひ)', 'Hi'], pa: ['ਅੱਗ', 'Agg'], sw: ['Moto', 'MOH-toh'],
      mr: ['आग / विस्तव', 'Aag'], te: ['నిప్పు / అగ్ని', 'Nippu'], tr: ['Ateş / Yangın', 'ah-TESH'], ta: ['தீ / நெருப்பு', 'Thee / Neruppu'], vi: ['Lửa', 'loo-uh']
    })
  },
  {
    id: 238, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Earth / Soil', 'ERTH'], zh: ['泥土 / 大地', 'Tǔ / Dàdì'], hi: ['मिट्टी / धरती', 'Mitti / Dharti'], es: ['Tierra / Suelo', 'TYEHR-rah'], fr: ['Terre / Sol', 'TAIR'],
      ar: ['تراب / أرض', 'Turaab / Ard'], bn: ['মাটি / ভূমি', 'Maati'], pt: ['Terra / Solo', 'TEH-hah'], ru: ['Земля / Почва', 'zyem-LYAH'], ur: ['مٹی / زمین', 'Mitti / Zameen'],
      id: ['Tanah / Bumi', 'TAH-nah'], de: ['Erde / Boden', 'AIR-deh'], ja: ['土 / 地球', 'Tsuchi'], pa: ['ਮਿੱਟੀ / ਧਰਤੀ', 'Mitti'], sw: ['Udongo / Ardhi', 'oo-DOHN-goh'],
      mr: ['माती / जमीन', 'Maati'], te: ['మట్టి / నేల', 'Matti'], tr: ['Toprak / Yer', 'tohp-RAHK'], ta: ['மண் / பூமி', 'Mann'], vi: ['Đất', 'duht']
    })
  },
  {
    id: 239, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Cloud', 'KLOWD'], zh: ['云 / 白云', 'Yún'], hi: ['बादल / मेघ', 'Baadal / Megh'], es: ['Nube', 'NOO-beh'], fr: ['Nuage', 'new-AHZH'],
      ar: ['سحاب / غيم', 'Sahaab / Ghaym'], bn: ['মেঘ', 'Megh'], pt: ['Nuvem', 'NOO-veyn'], ru: ['Облако / Туча', 'OH-blah-kah'], ur: ['بادل / سحاب', 'Baadal'],
      id: ['Awan', 'AH-wahn'], de: ['Wolke', 'VOL-keh'], ja: ['雲 (くも)', 'Kumo'], pa: ['ਬੱਦਲ', 'Baddal'], sw: ['Wingu', 'WEEN-goo'],
      mr: ['ढग / मेघ', 'Dhag'], te: ['మేఘం', 'Megham'], tr: ['Bulut', 'boo-LOOT'], ta: ['மேகம்', 'Megam'], vi: ['Mây', 'mye']
    })
  },
  {
    id: 240, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Snow', 'SNOH'], zh: ['雪 / 白雪', 'Xuě'], hi: ['बर्फ़ / हिम', 'Barf / Him'], es: ['Nieve', 'NYEH-veh'], fr: ['Neige', 'NEHZH'],
      ar: ['ثلج', 'Thalj'], bn: ['বরফ / তুষার', 'Borof'], pt: ['Neve', 'NEH-vee'], ru: ['Снег', 'SNYEK'], ur: ['برف / کہرا', 'Barf'],
      id: ['Salju', 'SAHL-joo'], de: ['Schnee', 'SHNAY'], ja: ['雪 (ゆき)', 'Yuki'], pa: ['ਬਰਫ਼', 'Barf'], sw: ['Theluji', 'theh-LOO-jee'],
      mr: ['बर्फ / हिम', 'Barfa'], te: ['మంచు', 'Manchu'], tr: ['Kar', 'KAHR'], ta: ['பனி', 'Pani'], vi: ['Tuyết', 'twee-yet']
    })
  },
  {
    id: 241, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Red', 'RED'], zh: ['红 / 红色', 'Hóng'], hi: ['लाल', 'Laal'], es: ['Rojo', 'ROH-hoh'], fr: ['Rouge', 'ROOZH'],
      ar: ['أحمر', 'Ahmar'], bn: ['লাল', 'Laal'], pt: ['Vermelho', 'vair-MEL-yoo'], ru: ['Красный', 'KRAHS-ny'], ur: ['سرخ / لال', 'Surkh / Laal'],
      id: ['Merah', 'MEH-rah'], de: ['Rot', 'ROHT'], ja: ['赤 (あか)', 'Aka'], pa: ['ਲਾਲ', 'Laal'], sw: ['Nyekundu', 'n-yeh-KOON-doo'],
      mr: ['लाल', 'Laal'], te: ['ఎరుపు', 'Erupu'], tr: ['Kırmızı / Al', 'kuhr-muh-ZUH'], ta: ['சிவப்பு', 'Sivappu'], vi: ['Đỏ', 'daw']
    })
  },
  {
    id: 242, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Blue', 'BLOO'], zh: ['蓝 / 蓝色', 'Lán'], hi: ['नीला', 'Neela'], es: ['Azul', 'ah-ZOOL'], fr: ['Bleu', 'BLUH'],
      ar: ['أزرق', 'Azraq'], bn: ['নীল', 'Neel'], pt: ['Azul', 'ah-ZOOL'], ru: ['Синий / Голубой', 'SEE-nee'], ur: ['نیلا', 'Neela'],
      id: ['Biru', 'BEE-roo'], de: ['Blau', 'BLOW'], ja: ['青 (あお)', 'Ao'], pa: ['ਨੀਲਾ', 'Neela'], sw: ['Buluu', 'boo-LOO'],
      mr: ['निळा', 'Nila'], te: ['నీలం', 'Neelam'], tr: ['Mavi', 'mah-VEE'], ta: ['நீலம்', 'Neelam'], vi: ['Xanh lam / Xanh dương', 'sahn lahm']
    })
  },
  {
    id: 243, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Green', 'GREEN'], zh: ['绿 / 绿色', 'Lǜ'], hi: ['हरा', 'Hara'], es: ['Verde', 'VAIR-deh'], fr: ['Vert', 'VAIR'],
      ar: ['أخضر', 'Akhdar'], bn: ['সবুজ', 'Shobuj'], pt: ['Verde', 'VAIR-jee'], ru: ['Зелёный', 'zye-LYOH-ny'], ur: ['سبز / ہرا', 'Sabz / Hara'],
      id: ['Hijau', 'HEE-jow'], de: ['Grün', 'GREWN'], ja: ['緑 (みどり)', 'Midori'], pa: ['ਹਰਾ', 'Hara'], sw: ['Kijani', 'kee-JAH-nee'],
      mr: ['हिरवा', 'Hirva'], te: ['ఆకుపచ్చ', 'Aakupachha'], tr: ['Yeşil', 'yeh-SHEEL'], ta: ['பச்சை', 'Pachai'], vi: ['Xanh lá cây', 'sahn lah']
    })
  },
  {
    id: 244, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Yellow', 'YEL-oh'], zh: ['黄 / 黄色', 'Huáng'], hi: ['पीला', 'Peela'], es: ['Amarillo', 'ah-mah-REE-yoh'], fr: ['Jaune', 'ZHOHN'],
      ar: ['أصفر', 'Asfar'], bn: ['হলুদ', 'Holud'], pt: ['Amarelo', 'ah-mah-REH-loo'], ru: ['Жёлтый', 'ZHOHL-ty'], ur: ['پیلا / زرد', 'Peela / Zard'],
      id: ['Kuning', 'KOO-neeng'], de: ['Gelb', 'GELP'], ja: ['黄色 (きいろ)', 'Kiiro'], pa: ['ਪੀਲਾ', 'Peela'], sw: ['Njano', 'NYAH-noh'],
      mr: ['पिवळा', 'Pivla'], te: ['పసుపు', 'Pasupu'], tr: ['Sarı', 'sah-RUH'], ta: ['மஞ்சள்', 'Manjal'], vi: ['Vàng', 'vahng']
    })
  },
  {
    id: 245, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Black', 'BLAK'], zh: ['黑 / 黑色', 'Hēi'], hi: ['काला', 'Kaala'], es: ['Negro', 'NEH-groh'], fr: ['Noir', 'NWAHR'],
      ar: ['أسود', 'Aswad'], bn: ['কালো', 'Kalo'], pt: ['Preto / Negro', 'PRAY-too'], ru: ['Чёрный', 'CHYOR-ny'], ur: ['سیاہ / کالا', 'Siyah / Kaala'],
      id: ['Hitam', 'HEE-tahm'], de: ['Schwarz', 'SHVAHRTS'], ja: ['黒 (くろ)', 'Kuro'], pa: ['ਕਾਲਾ', 'Kaala'], sw: ['Nyeusi', 'n-yeh-OO-see'],
      mr: ['काळा', 'Kala'], te: ['నలుపు', 'Nalupu'], tr: ['Siyah / Kara', 'see-YAH'], ta: ['கருப்பு', 'Karuppu'], vi: ['Đen', 'den']
    })
  },
  {
    id: 246, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['White', 'WYTE'], zh: ['白 / 白色', 'Bái'], hi: ['सफ़ेद', 'Safed'], es: ['Blanco', 'BLAHN-koh'], fr: ['Blanc', 'BLAHN'],
      ar: ['أبيض', 'Abyad'], bn: ['সাদা', 'Shada'], pt: ['Branco', 'BRAHN-koo'], ru: ['Белый', 'BYEH-ly'], ur: ['سفید', 'Safaid'],
      id: ['Putih', 'POO-teeh'], de: ['Weiß', 'VYS'], ja: ['白 (しろ)', 'Shiro'], pa: ['ਚਿੱਟਾ / ਸਫ਼ੈਦ', 'Chitta'], sw: ['Nyeupe', 'n-yeh-OO-peh'],
      mr: ['पांढरा', 'Pandhra'], te: ['తెలుపు', 'Telupu'], tr: ['Beyaz / Ak', 'beh-YAHZ'], ta: ['வெள்ளை', 'Vellai'], vi: ['Trắng', 'chahng']
    })
  },
  {
    id: 247, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Eye', 'EYE'], zh: ['眼睛 / 眼', 'Yǎnjing'], hi: ['आँख / नयन', 'Aankh'], es: ['Ojo', 'OH-hoh'], fr: ['Œil / Yeux', 'UY'],
      ar: ['عين', '\'Ayn'], bn: ['চোখ / নয়ন', 'Chokh'], pt: ['Olho', 'OHL-yoo'], ru: ['Глаз', 'GLAHS'], ur: ['آنکھ / چشم', 'Aankh / Chashm'],
      id: ['Mata', 'MAH-tah'], de: ['Auge', 'OW-geh'], ja: ['目 (め)', 'Me'], pa: ['ਅੱਖ', 'Akkh'], sw: ['Jicho', 'JEE-choh'],
      mr: ['डोळा', 'Dola'], te: ['కన్ను', 'Kannu'], tr: ['Göz', 'GURZ'], ta: ['கண்', 'Kann'], vi: ['Mắt', 'muht']
    })
  },
  {
    id: 248, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Heart', 'HART'], zh: ['心 / 心脏', 'Xīn / Xīnzàng'], hi: ['दिल / हृदय', 'Dil / Hridaya'], es: ['Corazón', 'koh-rah-SOHN'], fr: ['Cœur', 'KUHR'],
      ar: ['قلب', 'Qalb'], bn: ['হৃদয় / দিল', 'Hridoy'], pt: ['Coração', 'koh-rah-SOWNG'], ru: ['Сердце', 'SYEHRD-tseh'], ur: ['دل / قلب', 'Dil / Qalb'],
      id: ['Hati / Jantung', 'JAHN-toong'], de: ['Herz', 'HAIRTS'], ja: ['心 / 心臓', 'Kokoro / Shinzou'], pa: ['ਦਿਲ', 'Dil'], sw: ['Moyo', 'MOH-yoh'],
      mr: ['हृदय / मन', 'Hruday'], te: ['గుండె / హృదయం', 'Gunde'], tr: ['Kalp / Yürek', 'KAHLP'], ta: ['இதயம்', 'Idhayam'], vi: ['Trái tim', 'chye teem']
    })
  },
  {
    id: 249, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Sound / Voice', 'SOWND / VOYS'], zh: ['声音 / 嗓音', 'Shēngyīn'], hi: ['आवाज़ / ध्वनि', 'Aawaaz / Dhwani'], es: ['Sonido / Voz', 'soh-NEE-doh'], fr: ['Son / Voix', 'SOHN / VWAH'],
      ar: ['صوت', 'Sawt'], bn: ['শব্দ / কণ্ঠস্বর', 'Shobdo'], pt: ['Som / Voz', 'SOHN / VOHZ'], ru: ['Звук / Голос', 'ZVOOK'], ur: ['آواز / صدا', 'Aawaaz'],
      id: ['Suara / Bunyi', 'soo-AH-rah'], de: ['Ton / Stimme', 'TOHN'], ja: ['声 / 音', 'Koe / Oto'], pa: ['ਆਵਾਜ਼', 'Aawaaz'], sw: ['Sauti', 'sah-OO-tee'],
      mr: ['आवाज / ध्वनी', 'Aawaaz'], te: ['శబ్దం / స్వరం', 'Shabdam'], tr: ['Ses', 'SES'], ta: ['ஒலி / குரல்', 'Oli / Kural'], vi: ['Âm thanh / Giọng nói', 'uhm tahn']
    })
  },
  {
    id: 250, category: 'Nature & Essentials',
    translations: createTranslationMap({
      en: ['Life', 'LYFE'], zh: ['生命 / 生活', 'Shēngmìng'], hi: ['जीवन / ज़िंदगी', 'Jeevan / Zindagi'], es: ['Vida', 'VEE-dah'], fr: ['Vie', 'VEE'],
      ar: ['حياة', 'Hayaat'], bn: ['জীবন', 'Jeebon'], pt: ['Vida', 'VEE-dah'], ru: ['Жизнь', 'ZHEEZN'], ur: ['زندگی / حیات', 'Zindagi / Hayaat'],
      id: ['Kehidupan / Hidup', 'HEE-doop'], de: ['Leben', 'LAY-ben'], ja: ['命 / 人生', 'Inochi / Jinsei'], pa: ['ਜ਼ਿੰਦਗੀ / ਜੀਵਨ', 'Zindagi'], sw: ['Maisha', 'mah-EE-shah'],
      mr: ['जीवन / आयुष्य', 'Jeevan'], te: ['జీవితం / ప్రాణం', 'Jeevitham'], tr: ['Hayat / Yaşam', 'hah-YAHT'], ta: ['வாழ்க்கை / உயிர்', 'Vaazhkkai'], vi: ['Cuộc sống / Đời', 'kwawk sawng']
    })
  }
];

module.exports = { VOCAB_BATCH_6 };
