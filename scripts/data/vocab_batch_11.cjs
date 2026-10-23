const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_11 = [
  // ─────────────────────────────────────────────────────────────
  // 18. EMOTIONS, FEELINGS & MIND (451 - 485)
  // ─────────────────────────────────────────────────────────────
  {
    id: 451, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Happy / Joyful', 'HAP-ee'], zh: ['快乐 / 高兴', 'Kuàilè'], hi: ['खुश / प्रसन्न', 'Khush'], es: ['Feliz / Alegre', 'feh-LEES'], fr: ['Heureux / Joyeux', 'uh-RUH'],
      ar: ['سعيد / فرحان', 'Sa\'eed'], bn: ['খুশি / আনন্দিত', 'Khushi'], pt: ['Feliz / Alegre', 'feh-LEEZ'], ru: ['Счастливый / Радостный', 'shchahs-TLEE-vy'], ur: ['خوش / مسرور', 'Khush'],
      id: ['Bahagia / Senang', 'bah-HAH-gyah'], de: ['Glücklich / Froh', 'GLEEK-leekh'], ja: ['嬉しい / 幸せ (うれしい)', 'Ureshii'], pa: ['ਖੁਸ਼', 'Khush'], sw: ['Mwenye furaha', 'foo-RAH-hah'],
      mr: ['आनंदी / सुखी', 'Aanandi'], te: ['సంతోషంగా', 'Santhoshangaa'], tr: ['Mutlu / Neşeli', 'moot-LOO'], ta: ['மகிழ்ச்சி', 'Magizhchi'], vi: ['Hạnh phúc / Vui vẻ', 'hahnh fook']
    })
  },
  {
    id: 452, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Sad / Unhappy', 'SAD'], zh: ['伤心 / 悲伤', 'Shāngxīn'], hi: ['उदास / दुखी', 'Udaas'], es: ['Triste', 'TREES-teh'], fr: ['Triste', 'TREEST'],
      ar: ['حزين', 'Hazeen'], bn: ['দুঃখিত / বিষণ্ণ', 'Dukkhito'], pt: ['Triste', 'TREES-chee'], ru: ['Грустный / Печальный', 'GROOS-ny'], ur: ['اداس / غمگین', 'Udaas'],
      id: ['Sedih', 'seh-DEEH'], de: ['Traurig', 'TROW-reekh'], ja: ['悲しい (かなしい)', 'Kanashii'], pa: ['ਉਦਾਸ / ਦੁਖੀ', 'Udaas'], sw: ['Mwenye huzuni', 'hoo-ZOO-nee'],
      mr: ['दुःखी / खिन्न', 'Dukkhi'], te: ['విచారంగా', 'Vichaaramgaa'], tr: ['Üzgün / Hüzünlü', 'ooz-GOON'], ta: ['சோகம் / வருத்தம்', 'Sogam'], vi: ['Buồn bã', 'bwon']
    })
  },
  {
    id: 453, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Angry', 'ANG-gree'], zh: ['生气 / 愤怒', 'Shēngqì'], hi: ['गुस्सा / क्रोधित', 'Gussa'], es: ['Enojado / Enfadado', 'eh-noh-HAH-doh'], fr: ['Fâché / En colère', 'fah-SHAY'],
      ar: ['غاضب', 'Ghadib'], bn: ['রাগান্বিত / ক্রুদ্ধ', 'Ragannito'], pt: ['Bravo / Com raiva', 'BRAH-voo'], ru: ['Сердитый / Злой', 'syeer-DEE-ty'], ur: ['غصہ / ناراض', 'Gussa'],
      id: ['Marah', 'MAH-rah'], de: ['Wütend / Sauer', 'VEE-tent'], ja: ['怒っている (おこっている)', 'Okotte iru'], pa: ['ਗੁੱਸੇ', 'Gusse'], sw: ['Mwenye hasira', 'hah-SEE-rah'],
      mr: ['रागावलेला', 'Raagaavlela'], te: ['కోపంగా', 'Kopamgaa'], tr: ['Kızgın / Öfkeli', 'kuhz-GUHN'], ta: ['கோபம்', 'Kobam'], vi: ['Tức giận', 'took zuhn']
    })
  },
  {
    id: 454, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Excited', 'ek-SYE-tid'], zh: ['兴奋 / 激动', 'Xīngfèn'], hi: ['उत्साहित / रोमांचित', 'Utsaahit'], es: ['Emocionado / Entusiasmado', 'eh-moh-syoh-NAH-doh'], fr: ['Excité / Enthousiaste', 'ek-see-TAY'],
      ar: ['متحمس', 'Mutahammis'], bn: ['উত্তেজিত / রোমাঞ্চিত', 'Uttejito'], pt: ['Empolgado / Animado', 'aym-pohl-GAH-doo'], ru: ['Взволнованный', 'vzvahl-NOH-vahn-ny'], ur: ['پُرجوش / پرامید', 'Purjosh'],
      id: ['Bersemangat / Antusias', 'behr-seh-MAHNG-aht'], de: ['Begeistert / Aufgeregt', 'beh-GYS-tert'], ja: ['興奮した / ワクワク', 'Koufun shita'], pa: ['ਉਤਸ਼ਾਹਿਤ', 'Utshaahit'], sw: ['Mwenye msisimko', 'm-see-SEEM-koh'],
      mr: ['उत्साही / उत्तेजित', 'Utsaahi'], te: ['ఉత్సాహంగా', 'Utsaahamgaa'], tr: ['Heyecanlı', 'heh-yeh-jahn-LUH'], ta: ['உற்சாகம்', 'Ursaagam'], vi: ['Hào hứng / Phấn khởi', 'how hoong']
    })
  },
  {
    id: 455, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Tired / Exhausted', 'TY-erd'], zh: ['累 / 疲倦', 'Lèi'], hi: ['थका हुआ / क्लांत', 'Thaka'], es: ['Cansado / Agotado', 'kahn-SAH-doh'], fr: ['Fatigué / Épuisé', 'fah-tee-GAY'],
      ar: ['تعبان / مرهق', 'Ta\'ban'], bn: ['ক্লান্ত / পরিশ্রান্ত', 'Klanto'], pt: ['Cansado / Exausto', 'kahn-SAH-doo'], ru: ['Уставший', 'oo-STAHF-sheey'], ur: ['تھکا ہوا', 'Thaka hua'],
      id: ['Lelah / Capek', 'LEH-lah'], de: ['Müde / Erschöpft', 'MEE-deh'], ja: ['疲れた (つかれた)', 'Tsukareta'], pa: ['ਥੱਕਿਆ ਹੋਇਆ', 'Thakkya'], sw: ['Mchovu', 'm-CHOH-voo'],
      mr: ['थकलेला', 'Thaklela'], te: ['అలసిపోయిన', 'Alasipoyina'], tr: ['Yorgun / Bitkin', 'yohr-GOON'], ta: ['களைப்பு / சோர்வு', 'Kalaippu'], vi: ['Mệt mỏi', 'met moy']
    })
  },
  {
    id: 456, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Surprised / Amazed', 'ser-PRYZD'], zh: ['惊讶 / 吃惊', 'Jīngyà'], hi: ['आश्चर्यचकित / हैरान', 'Hairaan'], es: ['Sorprendido', 'sohr-pren-DEE-doh'], fr: ['Surpris / Étonné', 'sewr-PREE'],
      ar: ['متفاجئ / مندهش', 'Mutafaji\''], bn: ['বিস্মিত / অবাক', 'Bismito'], pt: ['Surpreso', 'soor-PRAY-zoo'], ru: ['Удивленный', 'oo-deev-LYOHN-ny'], ur: ['حیران / ششدر', 'Hairaan'],
      id: ['Terkejut / Kaget', 'tehr-KEH-joot'], de: ['Überrascht', 'EE-ber-rahsht'], ja: ['驚いた (おどろいた)', 'Odoroita'], pa: ['ਹੈਰਾਨ', 'Hairaan'], sw: ['Mshangao', 'm-shahn-GAH-oh'],
      mr: ['आश्चर्यचकित / चकित', 'Aascharyachakit'], te: ['ఆశ్చర్యపోయిన', 'Aascharyapoyina'], tr: ['Şaşırmış', 'shah-shuhr-MUHSH'], ta: ['ஆச்சரியம்', 'Aachariyam'], vi: ['Ngạc nhiên', 'ngahk nyeen']
    })
  },
  {
    id: 457, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Afraid / Scared', 'uh-FRAYD'], zh: ['害怕 / 恐惧', 'Hàipà'], hi: ['डरा हुआ / भयभीत', 'Dara hua'], es: ['Asustado / Con miedo', 'ah-soos-TAH-doh'], fr: ['Effrayé / Apeuré', 'eh-fray-YAY'],
      ar: ['خائف', 'Kha\'if'], bn: ['ভীত / আতঙ্কিত', 'Bheeto'], pt: ['Assustado / Com medo', 'ah-soos-TAH-doo'], ru: ['Испуганный', 'ees-POO-gahn-ny'], ur: ['خوفزدہ / ڈرا ہوا', 'Khaufzada'],
      id: ['Takut', 'TAH-koot'], de: ['Ängstlich / Erschrocken', 'ENGST-leekh'], ja: ['怖がっている (こわがっている)', 'Kowagatte iru'], pa: ['ਡਰਿਆ ਹੋਇਆ', 'Dariya'], sw: ['Mwoga / Mwenye hofu', 'm-WOH-gah'],
      mr: ['घाबरलेला / भयभीत', 'Ghaabarlela'], te: ['భయపడిన', 'Bhayapadina'], tr: ['Korkmuş', 'kohrk-MOOSH'], ta: ['பயம்', 'Bayam'], vi: ['Sợ hãi', 'suh hye']
    })
  },
  {
    id: 458, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Calm / Peaceful', 'KAHM'], zh: ['平静 / 冷静', 'Píngjìng'], hi: ['शांत / स्थिर', 'Shaant'], es: ['Tranquilo / En calma', 'trahn-KEE-loh'], fr: ['Calme / Paisible', 'KAHLM'],
      ar: ['هادئ', 'Hadi\''], bn: ['শান্ত / নিরব', 'Shanto'], pt: ['Calmo / Tranquilo', 'KAHL-moo'], ru: ['Спокойный / Тихий', 'spah-KOY-ny'], ur: ['پُرسکون / خاموش', 'Pursukoon'],
      id: ['Tenang / Damai', 'teh-NAHNG'], de: ['Ruhig / Gelassen', 'ROO-eekh'], ja: ['落ち着いた / 平静な', 'Ochitsuita'], pa: ['ਸ਼ਾਂਤ', 'Shaant'], sw: ['Mpole / Mtulivu', 'm-POH-leh'],
      mr: ['शांत', 'Shaant'], te: ['శాంతంగా', 'Shaanthamgaa'], tr: ['Sakin / Dingin', 'sah-KEEN'], ta: ['அமைதி', 'Amaidhi'], vi: ['Bình tĩnh / Yên ả', 'binh tinh']
    })
  },
  {
    id: 459, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Nervous / Anxious', 'NER-vus'], zh: ['紧张 / 焦虑', 'Jǐnzhāng'], hi: ['घबराया हुआ / चिंतित', 'Ghabraya'], es: ['Nervioso / Ansioso', 'nehr-VYOH-soh'], fr: ['Nerveux / Anxieux', 'nair-VUH'],
      ar: ['متوتر / قلق', 'Mutawattir'], bn: ['উদ্বিগ্ন / চিন্তিত', 'Udbigno'], pt: ['Nervoso / Ansioso', 'nehr-VOH-zoo'], ru: ['Нервный / Тревожный', 'NYEHRV-ny'], ur: ['گھبرایا ہوا / پریشان', 'Ghabraya'],
      id: ['Gugup / Cemas', 'GOO-goop'], de: ['Nervös / Besorgt', 'nehr-VURS'], ja: ['緊張している (きんちょう)', 'Kinchou shite iru'], pa: ['ਘਬਰਾਇਆ ਹੋਇਆ', 'Ghabraya'], sw: ['Mwenye wasiwasi', 'wah-see-WAH-see'],
      mr: ['घाबरलेला / अस्वस्थ', 'Aswastha'], te: ['కంగారుగా / ఆందోళనగా', 'Kangaarugaa'], tr: ['Gergin / Tedirgin', 'gehr-GEEN'], ta: ['பதற்றம்', 'Padhatram'], vi: ['Lo lắng / Hồi hộp', 'law lahng']
    })
  },
  {
    id: 460, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Bored', 'BORD'], zh: ['无聊 / 厌烦', 'Wúliáo'], hi: ['ऊबा हुआ / बोर', 'Uba hua'], es: ['Aburrido', 'ah-boo-RREE-doh'], fr: ['Ennuyé', 'ahn-nwee-YAY'],
      ar: ['ملان / ضجران', 'Malla\'an'], bn: ['বিরক্ত / একঘেয়ে', 'Birokto'], pt: ['Entediado', 'en-teh-jee-AH-doo'], ru: ['Скучающий', 'skoo-CHAH-yoo-shcheey'], ur: ['اکتا گیا / بیزار', 'Ukta gaya'],
      id: ['Bosan', 'BOH-sahn'], de: ['Gelangweilt', 'geh-LAHNG-vaylt'], ja: ['退屈している (たいくつ)', 'Taikutsu shite iru'], pa: ['ਅੱਕਿਆ ਹੋਇਆ', 'Akkya'], sw: ['Amechoka (kinyume cha shauku)', 'ah-meh-CHOH-kah'],
      mr: ['कंटाळलेला', 'Kantaallela'], te: ['విసుగు చెందిన', 'Visugu chendhina'], tr: ['Sıkılmış', 'suh-kuhl-MUHSH'], ta: ['சலிப்பு', 'Salippu'], vi: ['Buồn chán', 'bwon chahn']
    })
  },
  {
    id: 461, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Proud', 'PROWD'], zh: ['自豪 / 骄傲', 'Zìháo'], hi: ['गर्व / स्वाभिमानी', 'Garv'], es: ['Orgulloso', 'ohr-goo-YOH-soh'], fr: ['Fier', 'FYAIR'],
      ar: ['فخور', 'Fakhoor'], bn: ['গর্বিত', 'Gorbito'], pt: ['Orgulhoso', 'ohr-gool-YOH-zoo'], ru: ['Гордый', 'GOHR-dy'], ur: ['فخر / ناز', 'Fakhr'],
      id: ['Bangga', 'BAHNG-gah'], de: ['Stolz', 'SHTOLTS'], ja: ['誇らしい (ほこらしい)', 'Hokorashii'], pa: ['ਮਾਣ / ਫ਼ਖ਼ਰ', 'Maan'], sw: ['Mwenye kujivunia', 'koo-jee-voo-NEE-ah'],
      mr: ['अभिमान / गर्व', 'Abhimaan'], te: ['గర్వంగా', 'Garvamgaa'], tr: ['Gururlu', 'goo-roor-LOO'], ta: ['பெருமை', 'Perumai'], vi: ['Tự hào', 'too how']
    })
  },
  {
    id: 462, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Confused', 'kun-FYOOZD'], zh: ['困惑 / 迷茫', 'Kùnhuò'], hi: ['भ्रमित / असमंजस में', 'Bhramit'], es: ['Confundido', 'kohn-foon-DEE-doh'], fr: ['Confus', 'kohn-FEW'],
      ar: ['مرتبك / حائر', 'Murtobik'], bn: ['বিভ্রান্ত', 'Bibhranto'], pt: ['Confuso', 'kohn-FOO-zoo'], ru: ['Запутанный / Растерянный', 'zah-POO-tahn-ny'], ur: ['الجھن کا شکار', 'Uljhan'],
      id: ['Bingung', 'BEENG-oong'], de: ['Verwirrt', 'fehr-VEERT'], ja: ['混乱した / 迷った', 'Konran shita'], pa: ['ਭੰਬਲਭੂਸੇ ਵਿੱਚ', 'Bhambal'], sw: ['Amechanganyikiwa', 'chahn-gah-nyee-KEE-wah'],
      mr: ['गोंधळलेला', 'Gondhallela'], te: ['గందరగోళంలో ఉన్న', 'Gandharagolam'], tr: ['Kafası karışık', 'kah-fah-SUH'], ta: ['குழப்பம்', 'Kuzhappam'], vi: ['Bối rối', 'boy zoy']
    })
  },
  {
    id: 463, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Hopeful', 'HOHP-ful'], zh: ['充满希望', 'Chōngmǎn xīwàng'], hi: ['आशावादी / उम्मीद से भरा', 'Aashawadi'], es: ['Esperanzado', 'ehs-peh-rahn-SAH-doh'], fr: ['Plein d\'espoir', 'PLAN des-PWAHR'],
      ar: ['متفائل / مفعم بالأمل', 'Mutafa\'il'], bn: ['আশাবাদী', 'Ashabadi'], pt: ['Esperançoso', 'ehs-peh-rahn-SOH-zoo'], ru: ['Полный надежд', 'POHL-ny nah-DYEHZH-duh'], ur: ['پُرامید', 'Pur umeed'],
      id: ['Penuh harapan', 'PEH-nooh'], de: ['Hoffnungsvoll', 'HOF-noongs-fol'], ja: ['希望に満ちた', 'Kibou ni michita'], pa: ['ਆਸ਼ਾਵਾਦੀ', 'Aashawadi'], sw: ['Mwenye matumaini', 'mah-too-mah-EE-nee'],
      mr: ['आशावादी', 'Aashawadi'], te: ['ఆశాభావంతో', 'Aashaabhaavamtho'], tr: ['Umutlu', 'oo-moot-LOO'], ta: ['நம்பிக்கை', 'Nambikkai'], vi: ['Đầy hy vọng', 'dye hee vohng']
    })
  },
  {
    id: 464, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Love', 'LUV'], zh: ['爱 / 爱情', 'Ài'], hi: ['प्रेम / प्यार', 'Pyaar'], es: ['Amor', 'ah-MOHR'], fr: ['Amour', 'ah-MOOR'],
      ar: ['حب / عشق', 'Hubb'], bn: ['ভালোবাসা / প্রেম', 'Bhalobasha'], pt: ['Amor', 'ah-MOHR'], ru: ['Любовь', 'lyoo-BOHF'], ur: ['محبت / پیار', 'Mohabbat'],
      id: ['Cinta / Kasih', 'CHEEN-tah'], de: ['Liebe', 'LEE-beh'], ja: ['愛 / 恋 (あい)', 'Ai'], pa: ['ਪਿਆਰ / ਮੁਹੱਬਤ', 'Pyaar'], sw: ['Upendo', 'oo-PEHN-doh'],
      mr: ['प्रेम', 'Prem'], te: ['ప్రేమ', 'Prema'], tr: ['Sevgi / Aşk', 'sehy-GEE'], ta: ['அன்பு / காதல்', 'Anbu'], vi: ['Tình yêu', 'tinh yew']
    })
  },
  {
    id: 465, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Courage / Bravery', 'KUR-ij'], zh: ['勇气 / 勇敢', 'Yǒngqì'], hi: ['साहस / हिम्मत', 'Saahas'], es: ['Valor / Coraje', 'vah-LOHR'], fr: ['Courage', 'koo-RAHZH'],
      ar: ['شجاعة', 'Shaja\'ah'], bn: ['সাহস', 'Shahosh'], pt: ['Coragem', 'koh-RAH-zhaym'], ru: ['Смелость / Храбрость', 'SMYEH-lahst'], ur: ['حوصلہ / ہمت / شجاعت', 'Himmat'],
      id: ['Keberanian', 'keh-beh-rah-NEE-ahn'], de: ['Mut / Tapferkeit', 'MOOT'], ja: ['勇気 (ゆうき)', 'Yuuki'], pa: ['ਹਿੰਮਤ / ਦਲੇਰੀ', 'Himmat'], sw: ['Ujasiri', 'oo-jah-SEE-ree'],
      mr: ['धैर्य / हिम्मत', 'Dhairya'], te: ['ధైర్యం', 'Dhairyam'], tr: ['Cesaret', 'jeh-sah-REHT'], ta: ['துணிச்சல் / தைரியம்', 'Thunichal'], vi: ['Lòng dũng cảm', 'long zoong kahm']
    })
  },
  {
    id: 466, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Kindness', 'KYND-nis'], zh: ['善良 / 仁慈', 'Shànliáng'], hi: ['दयालुता / नेकी', 'Dayaluta'], es: ['Amabilidad / Bondad', 'ah-mah-bee-lee-DAHD'], fr: ['Bonté / Gentillesse', 'bohn-TAY'],
      ar: ['لطف / عطف', 'Lutf'], bn: ['দয়া / সহানুভূতি', 'Doya'], pt: ['Bondade / Gentileza', 'bohn-DAH-jee'], ru: ['Доброта', 'dah-brah-TAH'], ur: ['مہربانی / نیکی', 'Meherbani'],
      id: ['Kebaikan', 'keh-bye-KAHN'], de: ['Freundlichkeit / Güte', 'FROYNT-leekh-kayt'], ja: ['親切 / 優しさ (やさしさ)', 'Yasashisa'], pa: ['ਦਿਆਲਤਾ / ਭਲਾਈ', 'Dayaalta'], sw: ['Wema / Ukarimu', 'WEH-mah'],
      mr: ['दयाळूपणा / सौजन्य', 'Dayaaloopana'], te: ['దయ / మంచితనం', 'Daya'], tr: ['Nezaket / İyilik', 'neh-zah-KEHT'], ta: ['கருணை / தயவு', 'Karunai'], vi: ['Lòng tốt', 'long toht']
    })
  },
  {
    id: 467, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Honesty', 'ON-is-tee'], zh: ['诚实 / 正直', 'Chéngshí'], hi: ['ईमानदारी', 'Imaandaari'], es: ['Honestidad', 'oh-nehs-tee-DAHD'], fr: ['Honnêteté', 'oh-net-TAY'],
      ar: ['أمانة / صدق', 'Amanah'], bn: ['সততা', 'Shotota'], pt: ['Honestidade', 'oh-nehs-chee-DAH-jee'], ru: ['Честность', 'CHYEHS-nahst'], ur: ['دیانت داری / سچائی', 'Diyanatdaari'],
      id: ['Kejujuran', 'keh-joo-JOO-rahn'], de: ['Ehrlichkeit', 'AIR-leekh-kayt'], ja: ['正直 (しょうじき)', 'Shoujiki'], pa: ['ਇਮਾਨਦਾਰੀ', 'Imaandaari'], sw: ['Uaminifu', 'oo-ah-mee-NEE-foo'],
      mr: ['प्रामाणिकपणा', 'Praamaanikpana'], te: ['నిజాయితీ', 'Nijaayeethee'], tr: ['Dürüstlük', 'doo-roost-LOOK'], ta: ['நேர்மை', 'Nermai'], vi: ['Sự trung thực', 'soo choong thook']
    })
  },
  {
    id: 468, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Patience', 'PAY-shuns'], zh: ['耐心 / 忍耐', 'Nàixīn'], hi: ['धैर्य / सब्र', 'Dhairya'], es: ['Paciencia', 'pah-SYEHN-syah'], fr: ['Patience', 'pah-SYAHNS'],
      ar: ['صبر', 'Sabr'], bn: ['ধৈর্য / সবুর', 'Dhoirjo'], pt: ['Paciência', 'pah-see-AYN-syah'], ru: ['Терпение', 'tyeer-PYEH-nyee-yeh'], ur: ['صبر / برداشت', 'Sabr'],
      id: ['Kesabaran', 'keh-sah-BAH-rahn'], de: ['Geduld', 'geh-DOOLT'], ja: ['忍耐 / 我慢 (にんたい)', 'Nintai'], pa: ['ਧੀਰਜ / ਸਬਰ', 'Dheeraj'], sw: ['Uvumilivu / Subira', 'oo-voo-mee-LEE-voo'],
      mr: ['संयम / धीर', 'Sanyam'], te: ['ఓపిక / సహనం', 'Opika'], tr: ['Sabır', 'sah-BUHR'], ta: ['பொறுமை', 'Porumai'], vi: ['Sự kiên nhẫn', 'soo kee-en nyuhn']
    })
  },
  {
    id: 469, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Gratitude', 'GRAT-i-tood'], zh: ['感恩 / 感谢', 'Gǎn\'ēn'], hi: ['कृतज्ञता / आभार', 'Kritagyata'], es: ['Gratitud / Agradecimiento', 'grah-tee-TOOD'], fr: ['Gratitude / Reconnaissance', 'grah-tee-TEWD'],
      ar: ['امتنان / شكر', 'Imtinan'], bn: ['কৃতজ্ঞতা', 'Kritoggota'], pt: ['Gratidão', 'grah-chee-DOWN'], ru: ['Благодарность', 'blah-gah-DAHR-nahst'], ur: ['شکر گزاری / تشکر', 'Shukarguzari'],
      id: ['Rasa syukur', 'RAH-sah'], de: ['Dankbarkeit', 'DAHNK-bahr-kayt'], ja: ['感謝 (かんしゃ)', 'Kansha'], pa: ['ਧੰਨਵਾਦੀ ਭਾਵ', 'Dhanvaad'], sw: ['Shukrani', 'shoo-KRAH-nee'],
      mr: ['कृतज्ञता', 'Kritagyata'], te: ['కృతజ్ఞత', 'Krithagyatha'], tr: ['Şükran / Minnet', 'shook-RAHN'], ta: ['நன்றியுணர்வு', 'Nandriyunarvu'], vi: ['Lòng biết ơn', 'long bee-et uhn']
    })
  },
  {
    id: 470, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Peace', 'PEES'], zh: ['和平 / 平安', 'Hépíng'], hi: ['शांति / अमन', 'Shaanti'], es: ['Paz', 'PAHS'], fr: ['Paix', 'PEH'],
      ar: ['سلام / أمان', 'Salam'], bn: ['শান্তি / আমন', 'Shanti'], pt: ['Paz', 'PAHS'], ru: ['Мир / Покой', 'MEER'], ur: ['امن / سلامتی', 'Aman'],
      id: ['Perdamaian / Damai', 'dah-MYE'], de: ['Frieden', 'FREE-den'], ja: ['平和 (へいわ)', 'Heiwa'], pa: ['ਅਮਨ / ਸ਼ਾਂਤੀ', 'Aman'], sw: ['Amani', 'ah-MAH-nee'],
      mr: ['शांतता / अमन', 'Shaantata'], te: ['శాంతి', 'Shaanthi'], tr: ['Barış / Huzur', 'bah-RUHSH'], ta: ['அமைதி / சமாதானம்', 'Amaidhi'], vi: ['Hòa bình', 'hwa binh']
    })
  },
  {
    id: 471, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Trust / Faith', 'TRUST'], zh: ['信任 / 信仰', 'Xìnrèn'], hi: ['विश्वास / भरोसा', 'Vishwas'], es: ['Confianza / Fe', 'kohn-FYAHN-sah'], fr: ['Confiance / Foi', 'kohn-FYAHNS'],
      ar: ['ثقة / إيمان', 'Thiqah'], bn: ['বিশ্বাস / ভরসা', 'Bish-shash'], pt: ['Confiança / Fé', 'kohn-fee-AHN-sah'], ru: ['Доверие / Вера', 'dah-VYEH-ree-yeh'], ur: ['اعتماد / بھروسا', 'Aitamaad'],
      id: ['Kepercayaan', 'keh-pehr-chah-YAH-ahn'], de: ['Vertrauen / Glaube', 'fehr-TROW-en'], ja: ['信頼 / 信用 (しんらい)', 'Shinrai'], pa: ['ਵਿਸ਼ਵਾਸ / ਭਰੋਸਾ', 'Vishwas'], sw: ['Imani / Kuamini', 'ee-MAH-nee'],
      mr: ['विश्वास / निष्ठा', 'Vishwas'], te: ['నమ్మకం / విశ్వాసం', 'Nammakam'], tr: ['Güven / İtikat', 'goo-VEHN'], ta: ['நம்பிக்கை', 'Nambikkai'], vi: ['Niềm tin / Tin tưởng', 'neeyem tin']
    })
  },
  {
    id: 472, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Friendship', 'FREND-ship'], zh: ['友谊 / 友情', 'Yǒuyì'], hi: ['दोस्ती / मित्रता', 'Dosti'], es: ['Amistad', 'ah-mees-TAHD'], fr: ['Amitié', 'ah-mee-TYAY'],
      ar: ['صداقة', 'Sadaqah'], bn: ['বন্ধুত্ব', 'Bondhutto'], pt: ['Amizade', 'ah-mee-ZAH-jee'], ru: ['Дружба', 'DROOZH-bah'], ur: ['دوستی / رفاقت', 'Dosti'],
      id: ['Persahabatan', 'pehr-sah-hah-BAH-tahn'], de: ['Freundschaft', 'FROYNT-shahft'], ja: ['友情 (ゆうじょう)', 'Yuujou'], pa: ['ਦੋਸਤੀ / ਮਿੱਤਰਤਾ', 'Dosti'], sw: ['Urafiki', 'oo-rah-FEE-kee'],
      mr: ['मैत्री / मैत्रीभाव', 'Maitree'], te: ['స్నేహం / మైత్రి', 'Snehm'], tr: ['Dostluk / Arkadaşlık', 'dohst-LOOK'], ta: ['நட்பு', 'Natpu'], vi: ['Tình bạn', 'tinh bahn']
    })
  },
  {
    id: 473, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Dream (Vision)', 'DREEM'], zh: ['梦想 / 梦', 'Mèngxiǎng'], hi: ['सपना / ख़्वाब', 'Sapna'], es: ['Sueño', 'SWEH-nyoh'], fr: ['Rêve', 'REV'],
      ar: ['حلم', 'Hulm'], bn: ['স্বপ্ন', 'Shopno'], pt: ['Sonho', 'SOHN-yoo'], ru: ['Мечта / Сон', 'myech-TAH'], ur: ['خواب / سپنا', 'Khwaab'],
      id: ['Mimpi / Impian', 'MEEM-pee'], de: ['Traum', 'TROW-m'], ja: ['夢 (ゆめ)', 'Yume'], pa: ['ਸੁਪਨਾ', 'Supna'], sw: ['Ndoto', 'n-DOH-toh'],
      mr: ['स्वप्न', 'Swapna'], te: ['కల / స్వప్నం', 'Kala'], tr: ['Rüya / Düş', 'roo-YAH'], ta: ['கனவு', 'Kanavu'], vi: ['Giấc mơ', 'zuhk muh']
    })
  },
  {
    id: 474, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Smile', 'SMYLE'], zh: ['微笑', 'Wēixiào'], hi: ['मुस्कान / मुस्कुराहट', 'Muskaan'], es: ['Sonrisa', 'sohn-REE-sah'], fr: ['Sourire', 'soo-REER'],
      ar: ['ابتسامة', 'Ibtisamah'], bn: ['হাসি / মৃদুহাসি', 'Hashi'], pt: ['Sorriso', 'soh-HEE-zoo'], ru: ['Улыбка', 'oo-LYP-kah'], ur: ['مسکراہٹ / تبسم', 'Muskurahat'],
      id: ['Senyuman', 'sehn-YOO-mahn'], de: ['Lächeln', 'LEKH-eln'], ja: ['笑顔 / 微笑み (えがお)', 'Egao'], pa: ['ਮੁਸਕਰਾਹਟ', 'Muskuraahat'], sw: ['Tabasamu', 'tah-bah-SAH-moo'],
      mr: ['हास्य / स्मित', 'Haasya'], te: ['చిరునవ్వు', 'Chirunavvu'], tr: ['Gülümseme', 'goo-loom-seh-MEH'], ta: ['புன்னகை', 'Punnagai'], vi: ['Nụ cười', 'noo coo-ee']
    })
  },
  {
    id: 475, category: 'Emotions & Feelings',
    translations: createTranslationMap({
      en: ['Laughter', 'LAF-ter'], zh: ['笑声 / 大笑', 'Xiàoshēng'], hi: ['हँसी', 'Hansi'], es: ['Risa', 'REE-sah'], fr: ['Rire', 'REER'],
      ar: ['ضحك', 'Dahik'], bn: ['হাস্য / অট্টহাসি', 'Hashyo'], pt: ['Riso / Risada', 'HEE-zoo'], ru: ['Смех', 'SMYEKH'], ur: ['ہنسی / قہقہہ', 'Hansi'],
      id: ['Tawa', 'TAH-wah'], de: ['Lachen', 'LAH-khen'], ja: ['笑い (わらい)', 'Warai'], pa: ['ਹਾਸਾ', 'Haasa'], sw: ['Kicheko', 'kee-CHEH-koh'],
      mr: ['हसणे', 'Hasne'], te: ['నవ్వు', 'Navvu'], tr: ['Kahkaha / Gülüş', 'kahh-kah-HAH'], ta: ['சிரிப்பு', 'Sirippu'], vi: ['Tiếng cười', 'teeyeng coo-ee']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 19. ADVERBS & CONNECTORS (476 - 500)
  // ─────────────────────────────────────────────────────────────
  {
    id: 476, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Always', 'AWL-wayz'], zh: ['总是 / 永远', 'Zǒngshì'], hi: ['हमेशा / सदैव', 'Hamesha'], es: ['Siempre', 'SYEHM-preh'], fr: ['Toujours', 'too-ZHOOR'],
      ar: ['دائماً', 'Da\'iman'], bn: ['সর্বদা / সব সময়', 'Shorboda'], pt: ['Sempre', 'SAYM-pree'], ru: ['Всегда', 'fsyeeg-DAH'], ur: ['ہمیشہ / سدا', 'Hamesha'],
      id: ['Selalu', 'seh-LAH-loo'], de: ['Immer', 'EEM-mer'], ja: ['いつも / 常に', 'Itsumo'], pa: ['ਹਮੇਸ਼ਾ', 'Hamesha'], sw: ['Daima / Sikuzote', 'dah-EE-mah'],
      mr: ['नेहमी / सदैव', 'Nehmi'], te: ['ఎల్లప్పుడూ', 'Ellappudu'], tr: ['Her zaman / Daima', 'HEHR zah-mahn'], ta: ['எப்போதும்', 'Eppodhum'], vi: ['Luôn luôn', 'lwon lwon']
    })
  },
  {
    id: 477, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Never', 'NEV-er'], zh: ['从不 / 绝不', 'Cóngbù'], hi: ['कभी नहीं', 'Kabhi nahin'], es: ['Nunca / Jamás', 'NOON-kah'], fr: ['Jamais', 'zhah-MAY'],
      ar: ['أبداً', 'Abadan'], bn: ['কখনও না', 'Kokhono na'], pt: ['Nunca / Jamais', 'NOON-kah'], ru: ['Никогда', 'nee-kahg-DAH'], ur: ['کبھی نہیں', 'Kabhi nahin'],
      id: ['Tidak pernah', 'TEE-dahk PEHR-nah'], de: ['Nie / Niemals', 'NEE'], ja: ['決して〜ない (けっして)', 'Kesshite'], pa: ['ਕਦੇ ਨਹੀਂ', 'Kade nahi'], sw: ['Kamwe', 'KAHM-weh'],
      mr: ['कधीही नाही', 'Kadheehi naahi'], te: ['ఎప్పటికీ కాదు', 'Eppatikee kaadhu'], tr: ['Asla / Hiçbir zaman', 'ahs-LAH'], ta: ['ஒருபோதும் இல்லை', 'Orupodhum illai'], vi: ['Không bao giờ', 'khong bow zuh']
    })
  },
  {
    id: 478, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Sometimes', 'SUM-tymez'], zh: ['有时 / 有时候', 'Yǒushí'], hi: ['कभी-कभी', 'Kabhi kabhi'], es: ['A veces / De vez en cuando', 'ah VEH-sehs'], fr: ['Parfois / Quelquefois', 'par-FWAH'],
      ar: ['أحياناً', 'Ahyanan'], bn: ['মাঝে মাঝে', 'Majhe majhe'], pt: ['Às vezes', 'ahs VEH-zees'], ru: ['Иногда', 'ee-nahg-DAH'], ur: ['کبھی کبھار', 'Kabhi kabhaar'],
      id: ['Kadang-kadang', 'KAH-dahng'], de: ['Manchmal', 'MAHNCH-mahl'], ja: ['時々 (ときどき)', 'Tokidoki'], pa: ['ਕਦੇ-ਕਦੇ', 'Kade kade'], sw: ['Wakati mwingine', 'wah-KAH-tee'],
      mr: ['कधीकधी', 'Kadhikadhi'], te: ['అప్పుడప్పుడు', 'Appudappudu'], tr: ['Bazen / Kimi zaman', 'BAH-zehn'], ta: ['சில நேரங்களில்', 'Sila nerangalil'], vi: ['Đôi khi / Thỉnh thoảng', 'doy khee']
    })
  },
  {
    id: 479, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Often / Frequently', 'OF-un'], zh: ['经常 / 常常', 'Jīngcháng'], hi: ['अक्सर / प्रायः', 'Aksar'], es: ['A menudo / Frecuentemente', 'ah meh-NOO-doh'], fr: ['Souvent', 'soo-VAHN'],
      ar: ['غالباً / مراراً', 'Ghaliban'], bn: ['প্রায়শই / প্রায়', 'Prayoshoi'], pt: ['Frequentemente', 'fray-kwayn-chee-MAYN-chee'], ru: ['Часто', 'CHAHS-tuh'], ur: ['اکثر / بار بار', 'Aksar'],
      id: ['Sering', 'SEH-reeng'], de: ['Oft / Häufig', 'OFT'], ja: ['よく / しばしば', 'Yoku'], pa: ['ਅਕਸਰ', 'Aksar'], sw: ['Mara nyingi', 'MAH-rah NYEEN-gee'],
      mr: ['नेहमी / वारंवार', 'Vaaranvaar'], te: ['తరచుగా', 'Tharachugaa'], tr: ['Sık sık / Çoğunlukla', 'SUHK suhk'], ta: ['அடிக்கடி', 'Adikkadi'], vi: ['Thường xuyên', 'thoo-ung sweey-en']
    })
  },
  {
    id: 480, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Quickly / Fast', 'KWIK-lee'], zh: ['快速地 / 快', 'Kuàisù'], hi: ['जल्दी से / तेज़ी से', 'Jaldi se'], es: ['Rápidamente', 'rah-pee-dah-MEHN-teh'], fr: ['Rapidement / Vite', 'rah-peed-MAHN'],
      ar: ['بسرعة', 'Bi-sur\'ah'], bn: ['তাড়াতাড়ি / দ্রুত', 'Druto'], pt: ['Rapidamente', 'hah-pee-dah-MAYN-chee'], ru: ['Быстро', 'BYHS-truh'], ur: ['جلدی سے / تیزی سے', 'Jaldi se'],
      id: ['Cepat / Segera', 'CHEH-paht'], de: ['Schnell / Rasch', 'SHNEL'], ja: ['早く / 迅速に (はやく)', 'Hayaku'], pa: ['ਛੇਤੀ ਨਾਲ', 'Chheti naal'], sw: ['Haraka / Kwa kasi', 'hah-RAH-kah'],
      mr: ['लवकर / वेगाने', 'Lavkar'], te: ['త్వరగా / వేగంగా', 'Thvaragaa'], tr: ['Hızlıca / Çabucak', 'huhz-LUH-jah'], ta: ['விரைவாக', 'Viraivaaga'], vi: ['Nhanh chóng', 'nyahnh chawng']
    })
  },
  {
    id: 481, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Slowly', 'SLOH-lee'], zh: ['慢慢地', 'Mànmàn de'], hi: ['धीरे से / आहिस्ता', 'Dheere se'], es: ['Lentamente / Despacio', 'lehn-tah-MEHN-teh'], fr: ['Lentement', 'lahnt-MAHN'],
      ar: ['ببطء', 'Bi-but\''], bn: ['আস্তে আস্তে / ধীরে', 'Dheere'], pt: ['Lentamente / Devagar', 'layn-tah-MAYN-chee'], ru: ['Медленно', 'MYEHD-lyeen-nuh'], ur: ['آہستہ سے', 'Aahista se'],
      id: ['Perlahan-lahan', 'pehr-LAH-hahn'], de: ['Langsam', 'LAHNG-zahm'], ja: ['ゆっくり / 遅く', 'Yukkuri'], pa: ['ਹੌਲੀ-ਹੌਲੀ', 'Houli houli'], sw: ['Polepole', 'poh-leh-POH-leh'],
      mr: ['हळूच / सावकाश', 'Halooch'], te: ['నెమ్మదిగా', 'Nemmadhigaa'], tr: ['Yavaşça', 'yah-vahsh-CHAH'], ta: ['மெதுவாக', 'Medhuvaaga'], vi: ['Chậm rãi', 'chuhm zye']
    })
  },
  {
    id: 482, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Together', 'tuh-GETH-er'], zh: ['一起 / 共同', 'Yīqǐ'], hi: ['साथ में / मिलकर', 'Saath mein'], es: ['Juntos', 'HOON-tohs'], fr: ['Ensemble', 'ahn-SAHN-bluh'],
      ar: ['معاً / سوياً', 'Ma\'an'], bn: ['একসাথে', 'Ekshathe'], pt: ['Juntos', 'ZHOON-toos'], ru: ['Вместе', 'VMYEHS-tyeh'], ur: ['ایک ساتھ / مل کر', 'Aik sath'],
      id: ['Bersama-sama', 'behr-SAH-mah'], de: ['Zusammen / Gemeinsam', 'tsoo-ZAHM-men'], ja: ['一緒に (いっしょに)', 'Issho ni'], pa: ['ਇਕੱਠੇ', 'Ikatthe'], sw: ['Pamoja', 'pah-MOH-jah'],
      mr: ['एकत्र / सोबत', 'Ekatra'], te: ['కలిసి', 'Kalisi'], tr: ['Birlikte / Beraber', 'beer-LEEK-teh'], ta: ['சேர்ந்து / ஒன்றாக', 'Serndhu'], vi: ['Cùng nhau', 'koong nyow']
    })
  },
  {
    id: 483, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Alone', 'uh-LOHN'], zh: ['独自 / 一个人', 'Dúzì'], hi: ['अकेला', 'Akela'], es: ['Solo', 'SOH-loh'], fr: ['Seul', 'SUHL'],
      ar: ['لوحده / منفرداً', 'Li-wahdihi'], bn: ['একা / নিঃসঙ্গ', 'Eka'], pt: ['Sozinho', 'soh-ZEEN-yoo'], ru: ['Один / В одиночку', 'ah-DEEN'], ur: ['اکیلا / تنہا', 'Akela'],
      id: ['Sendiri', 'sehn-DEE-ree'], de: ['Allein', 'ah-LYNE'], ja: ['一人で (ひとりで)', 'Hitori de'], pa: ['ਇਕੱਲਾ', 'Ikalla'], sw: ['Peke yake', 'PEH-keh'],
      mr: ['एकटा', 'Ekta'], te: ['ఒంటరిగా', 'Ontarigaa'], tr: ['Yalnız / Tek başına', 'yahl-NUHZ'], ta: ['தனியாக', 'Thaniyaaga'], vi: ['Một mình', 'moht meeng']
    })
  },
  {
    id: 484, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Also / Too', 'AWL-soh'], zh: ['也 / 并且', 'Yě'], hi: ['भी', 'Bhee'], es: ['También', 'tahm-BYEHN'], fr: ['Aussi', 'oh-SEE'],
      ar: ['أيضاً / كذلك', 'Aydan'], bn: ['ও / আরও', 'O'], pt: ['Também', 'tahm-BAYM'], ru: ['Также / Тоже', 'TAHK-zheh'], ur: ['بھی / نیز', 'Bhee'],
      id: ['Juga / Pun', 'JOO-gah'], de: ['Auch', 'OWKH'], ja: ['〜も (また)', 'Mo'], pa: ['ਵੀ', 'Vee'], sw: ['Pia', 'PEE-ah'],
      mr: ['सुद्धा / देखील', 'Suddha'], te: ['కూడా', 'Koodaa'], tr: ['De / Da / Ayrıca', 'deh'], ta: ['கூட / மேலும்', 'Kooda'], vi: ['Cũng', 'koong']
    })
  },
  {
    id: 485, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Because', 'bih-KUZ'], zh: ['因为', 'Yīnwèi'], hi: ['क्योंकि', 'Kyonki'], es: ['Porque', 'pohr-KAY'], fr: ['Parce que / Car', 'pars-KUH'],
      ar: ['لأن / بسبب', 'Li\'anna'], bn: ['কারণ', 'Karon'], pt: ['Porque / Pois', 'poor-KAY'], ru: ['Потому что', 'pah-tah-MOO shtoh'], ur: ['کیونکہ', 'Kyonkay'],
      id: ['Karena / Sebab', 'kah-REH-nah'], de: ['Weil / Da', 'VYL'], ja: ['なぜなら / 〜だから', 'Nazenara'], pa: ['ਕਿਉਂਕਿ', 'Kyonki'], sw: ['Kwa sababu', 'kwah sah-BAH-boo'],
      mr: ['कारण', 'Kaaran'], te: ['ఎందుకంటే', 'Endhukante'], tr: ['Çünkü', 'CHOON-koo'], ta: ['ஏனெனில் / ஏனெனில்', 'Enenil'], vi: ['Bởi vì', 'buh-ee vee']
    })
  },
  {
    id: 486, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['But', 'BUT'], zh: ['但是 / 不过', 'Dànshì'], hi: ['लेकिन / परन्तु', 'Lekin'], es: ['Pero / Sino', 'PEH-roh'], fr: ['Mais', 'MEH'],
      ar: ['لكن', 'Lakin'], bn: ['কিন্তু', 'Kintu'], pt: ['Mas / Porém', 'MAHS'], ru: ['Но / Однако', 'NOH'], ur: ['لیکن / مگر', 'Lekin'],
      id: ['Tetapi / Namun', 'teh-TAH-pee'], de: ['Aber', 'AH-ber'], ja: ['しかし / でも', 'Shikashi'], pa: ['ਪਰ / ਪਰੰਤੂ', 'Par'], sw: ['Lakini', 'lah-KEE-nee'],
      mr: ['पण / परंतु', 'Pan'], te: ['కానీ', 'Kaani'], tr: ['Fakat / Ama', 'ah-MAH'], ta: ['ஆனால்', 'Aanaal'], vi: ['Nhưng', 'nyoong']
    })
  },
  {
    id: 487, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Although / Even though', 'awl-THOH'], zh: ['虽然 / 尽管', 'Suīrán'], hi: ['हालाँकि / यद्यपि', 'Haalanki'], es: ['Aunque', 'OWN-kay'], fr: ['Bien que / Quoique', 'BYAN kuh'],
      ar: ['رغم أن / مع أن', 'Raghm'], bn: ['যদিও', 'Jodio'], pt: ['Embora / Ainda que', 'eem-BOH-rah'], ru: ['Хотя', 'khah-TYAH'], ur: ['اگرچہ / حالانکہ', 'Agarcha'],
      id: ['Meskipun / Walaupun', 'mehs-KEE-poon'], de: ['Obwohl', 'op-VOHL'], ja: ['〜だけれども / たとえ〜でも', 'Keredomo'], pa: ['ਹਾਲਾਂਕਿ', 'Haalanki'], sw: ['Ingawa', 'een-GAH-wah'],
      mr: ['जरी / तरीही', 'Jari'], te: ['అయినప్పటికీ', 'Ayinappatikee'], tr: ['Rağmen / -e rağmen', 'RAH-men'], ta: ['இருப்பினும்', 'Iruppinum'], vi: ['Mặc dù', 'mahk zoo']
    })
  },
  {
    id: 488, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Very / Extremely', 'VEH-ree'], zh: ['非常 / 很', 'Fēicháng'], hi: ['बहुत / अत्यंत', 'Bahut'], es: ['Muy / Mucho', 'MWEE'], fr: ['Très / Beaucoup', 'TRAY'],
      ar: ['جداً / للغاية', 'Jiddan'], bn: ['খুব / অত্যন্ত', 'Khoob'], pt: ['Muito', 'MWEE-too'], ru: ['Очень', 'OH-cheen'], ur: ['بہت / نہایت', 'Bohat'],
      id: ['Sangat / Amat', 'SAHNG-aht'], de: ['Sehr', 'ZAIR'], ja: ['とても / 大変 (たいへん)', 'Totemo'], pa: ['ਬਹੁਤ', 'Bahut'], sw: ['Sana', 'SAH-nah'],
      mr: ['खूप / फार', 'Khoop'], te: ['చాలా', 'Chaala'], tr: ['Çok / Gayet', 'CHOHK'], ta: ['மிகவும்', 'Migavum'], vi: ['Rất / Lắm', 'ruht']
    })
  },
  {
    id: 489, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Really / Truly', 'REE-lee'], zh: ['真正地 / 确实', 'Zhēnzhèng'], hi: ['सचमुच / वाकई', 'Sachmuch'], es: ['Realmente / De verdad', 'reh-ahl-MEHN-teh'], fr: ['Vraiment', 'vray-MAHN'],
      ar: ['حقاً / فعلاً', 'Haqqan'], bn: ['সত্যিই / বাস্তবিক', 'Shottii'], pt: ['Realmente / De fato', 'heh-ahl-MAYN-chee'], ru: ['Действительно / Правда', 'dyeyst-VEE-tyel-nuh'], ur: ['واقعی / سچ مچ', 'Waqayi'],
      id: ['Benar-benar / Sungguh', 'beh-NAHR'], de: ['Wirklich / Echt', 'VEERK-leekh'], ja: ['本当に (ほんとうに)', 'Hontou ni'], pa: ['ਸੱਚਮੁੱਚ', 'Sachmuch'], sw: ['Kweli / Hakika', 'KWEH-lee'],
      mr: ['खरोखर', 'Kharokhar'], te: ['నిజంగా', 'Nijamgaa'], tr: ['Gerçekten', 'gehr-chehk-TEHN'], ta: ['உண்மையிலேயே', 'Unmaiyiley'], vi: ['Thật sự', 'thuht soo']
    })
  },
  {
    id: 490, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Here', 'HEAR'], zh: ['这里 / 这儿', 'Zhèlǐ'], hi: ['यहाँ', 'Yahaan'], es: ['Aquí / Acá', 'ah-KEE'], fr: ['Ici', 'ee-SEE'],
      ar: ['هنا', 'Huna'], bn: ['এখানে', 'Ekhane'], pt: ['Aqui / Cá', 'ah-KEE'], ru: ['Здесь / Тут', 'ZDYEHS'], ur: ['یہاں', 'Yahan'],
      id: ['Di sini', 'dee SEE-nee'], de: ['Hier', 'HEER'], ja: ['ここ / こちら', 'Koko'], pa: ['ਇੱਥੇ', 'Itthe'], sw: ['Hapa', 'HAH-pah'],
      mr: ['येथे / इथे', 'Yethe'], te: ['ఇక్కడ', 'Ikkada'], tr: ['Burada', 'boo-rah-DAH'], ta: ['இங்கே', 'Inge'], vi: ['Ở đây', 'uh day']
    })
  },
  {
    id: 491, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['There', 'THAIR'], zh: ['那里 / 那儿', 'Nàlǐ'], hi: ['वहाँ', 'Vahaan'], es: ['Allí / Allá', 'ah-YEE'], fr: ['Là-bas / Là', 'lah-BAH'],
      ar: ['هناك', 'Hunaka'], bn: ['সেখানে / ওখানে', 'Shekhane'], pt: ['Lá / Ali', 'LAH'], ru: ['Там', 'TAHM'], ur: ['وہاں', 'Wahan'],
      id: ['Di sana', 'dee SAH-nah'], de: ['Dort / Da', 'DORT'], ja: ['そこ / あそこ', 'Soko'], pa: ['ਉੱਥੇ', 'Utthe'], sw: ['Huko / Kule', 'HOO-koh'],
      mr: ['तेथे / तिथे', 'Tethe'], te: ['అక్కడ', 'Akkada'], tr: ['Orada', 'oh-rah-DAH'], ta: ['அங்கே', 'Ange'], vi: ['Ở đó', 'uh daw']
    })
  },
  {
    id: 492, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Now', 'NOW'], zh: ['现在 / 如今', 'Xiànzài'], hi: ['अब / अभी', 'Ab'], es: ['Ahora', 'ah-OH-rah'], fr: ['Maintenant', 'man-tuh-NAHN'],
      ar: ['الآن', 'Al-aan'], bn: ['এখন', 'Ekhon'], pt: ['Agora', 'ah-GOH-rah'], ru: ['Сейчас / Теперь', 'see-CHAHS'], ur: ['اب / ابھی', 'Ab'],
      id: ['Sekarang', 'seh-KAH-rahng'], de: ['Jetzt / Nun', 'YEHTST'], ja: ['今 (いま)', 'Ima'], pa: ['ਹੁਣ', 'Hun'], sw: ['Sasa', 'SAH-sah'],
      mr: ['आता', 'Aata'], te: ['ఇప్పుడు', 'Ippudu'], tr: ['Şimdi', 'sheem-DEE'], ta: ['இப்போது', 'Ippodhu'], vi: ['Bây giờ', 'bye zuh']
    })
  },
  {
    id: 493, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Later', 'LAY-ter'], zh: ['后来 / 稍后', 'Hòulái'], hi: ['बाद में', 'Baad mein'], es: ['Más tarde / Luego', 'mahs TAHR-deh'], fr: ['Plus tard', 'plew TAHR'],
      ar: ['لاحقاً / بعدين', 'Lahiqan'], bn: ['পরে', 'Pore'], pt: ['Mais tarde / Depois', 'myce TAHR-jee'], ru: ['Позже / Потом', 'POHZH-zheh'], ur: ['بعد میں', 'Baad mein'],
      id: ['Nanti', 'NAHN-tee'], de: ['Später', 'SHPAY-ter'], ja: ['後で (あとで)', 'Ato de'], pa: ['ਬਾਅਦ ਵਿੱਚ', 'Baad vich'], sw: ['Baadaye', 'bah-dah-YEH'],
      mr: ['नंतर', 'Nantar'], te: ['తరువాత', 'Taruvaatha'], tr: ['Sonra', 'sohn-RAH'], ta: ['பிறகு', 'Piragu'], vi: ['Sau này', 'sow nye']
    })
  },
  {
    id: 494, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Already', 'awl-RED-ee'], zh: ['已经', 'Yǐjīng'], hi: ['पहले से ही', 'Pehle se'], es: ['Ya', 'YAH'], fr: ['Déjà', 'day-ZHAH'],
      ar: ['بالفعل / مسبقاً', 'Bil-fi\'l'], bn: ['ইতিমধ্যে / আগেই', 'Itimodhye'], pt: ['Já', 'ZHAH'], ru: ['Уже', 'oo-ZHEH'], ur: ['پہلے ہی', 'Pehle hi'],
      id: ['Sudah', 'SOO-dah'], de: ['Schon / Bereits', 'SHOHN'], ja: ['すでに / もう', 'Sudeni'], pa: ['ਪਹਿਲਾਂ ਹੀ', 'Pehlaan hi'], sw: ['Tayari', 'tah-YAH-ree'],
      mr: ['आधीच', 'Aadheech'], te: ['ఇప్పటికే', 'Ippatike'], tr: ['Zaten / Çoktan', 'ZAH-tehn'], ta: ['ஏற்கனவே', 'Erkanave'], vi: ['Đã ... rồi', 'dah roy']
    })
  },
  {
    id: 495, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Almost / Nearly', 'AWL-mohst'], zh: ['几乎 / 差不多', 'Jīhū'], hi: ['लगभग / करीब-करीब', 'Lagbhag'], es: ['Casi', 'KAH-see'], fr: ['Presque', 'PRES-kuh'],
      ar: ['تقريباً / كاد', 'Taqreeban'], bn: ['প্রায়', 'Praay'], pt: ['Quase', 'KWAH-zee'], ru: ['Почти', 'pahch-TEE'], ur: ['تقریباً', 'Taqreeban'],
      id: ['Hampir', 'HAHM-peer'], de: ['Fast / Beinahe', 'FAHST'], ja: ['ほとんど / もう少しで', 'Hotondo'], pa: ['ਲਗਭਗ', 'Lagbhag'], sw: ['Karibu (nusura)', 'kah-REE-boo'],
      mr: ['जवळजवळ', 'Javaljaval'], te: ['దాదాపు', 'Dhaadhaapu'], tr: ['Neredeyse / Hemen hemen', 'neh-reh-DEHY-seh'], ta: ['கிட்டத்தட்ட', 'Kittathatta'], vi: ['Gần như', 'guhn nyoo']
    })
  },
  {
    id: 496, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Enough', 'ih-NUF'], zh: ['足够 / 够了', 'Zúgòu'], hi: ['काफ़ी / पर्याप्त', 'Kaafi'], es: ['Suficiente / Bastante', 'soo-fee-SYEHN-teh'], fr: ['Assez / Suffisant', 'ah-SAY'],
      ar: ['كافٍ / يكفي', 'Kafin'], bn: ['যথেষ্ট', 'Jotheshto'], pt: ['Suficiente / Chega', 'soo-fee-see-AYN-chee'], ru: ['Достаточно / Хватит', 'dah-STAH-tuhch-nuh'], ur: ['کافی ہے', 'Kaafi hai'],
      id: ['Cukup', 'CHOO-koop'], de: ['Genug', 'geh-NOOK'], ja: ['十分 / 足りる (じゅうぶん)', 'Juubun'], pa: ['ਬਥੇਰਾ / ਕਾਫ਼ੀ', 'Kaafi'], sw: ['Inatosha', 'ee-nah-TOH-shah'],
      mr: ['पुरेसे', 'Purese'], te: ['సరిపోతుంది', 'Saripothundi'], tr: ['Yeterli / Kafi', 'yeh-tehr-LEE'], ta: ['போதும்', 'Podhum'], vi: ['Đủ rồi', 'doo roy']
    })
  },
  {
    id: 497, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Maybe / Probably', 'PROB-uh-blee'], zh: ['大概 / 兴许', 'Dàgài'], hi: ['शायद / संभवतः', 'Shayad'], es: ['Probablemente', 'proh-bah-bleh-MEHN-teh'], fr: ['Probablement', 'proh-bah-bluh-MAHN'],
      ar: ['من المحتمل', 'Min al-muhtamal'], bn: ['সম্ভবত', 'Shombhoboto'], pt: ['Provavelmente', 'proh-vah-vehl-MAYN-chee'], ru: ['Вероятно / Наверное', 'vye-rah-YAHT-nuh'], ur: ['غالباً / ممکنہ طور پر', 'Ghaliban'],
      id: ['Mungkin / Barangkali', 'MOONG-keen'], de: ['Wahrscheinlich', 'vahr-SHYN-leekh'], ja: ['恐らく / 多分 (おそらく)', 'Osoraku'], pa: ['ਸ਼ਾਇਦ', 'Shayad'], sw: ['Pengine / Huenda', 'pehn-GEE-neh'],
      mr: ['बहुधा / कदाचित', 'Bahudha'], te: ['బహుశా', 'Bahusha'], tr: ['Muhtemelen', 'mooh-teh-meh-LEHN'], ta: ['அநேகமாக', 'Anegamaaga'], vi: ['Có lẽ / Có thể', 'kaw leh']
    })
  },
  {
    id: 498, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Certainly / Of course', 'SER-tun-lee'], zh: ['当然 / 一定', 'Dāngrán'], hi: ['ज़रूर / अवश्य', 'Zaroor'], es: ['Ciertamente / Por supuesto', 'syehr-tah-MEHN-teh'], fr: ['Certainement / Bien sûr', 'sair-tehn-MAHN'],
      ar: ['بالتأكيد / طبعاً', 'Bit-ta\'keed'], bn: ['অবশ্যই / নিশ্চয়ই', 'Oboshshoi'], pt: ['Com certeza / Claro', 'kohn sehr-TAY-zah'], ru: ['Конечно / Безусловно', 'kah-NYECH-nuh'], ur: ['یقیناً / بے شک', 'Yaqeenan'],
      id: ['Tentu saja / Pasti', 'TEHN-too SAH-jah'], de: ['Sicherlich / Natürlich', 'ZEE-kher-leekh'], ja: ['もちろん / 確かに', 'Mochiron'], pa: ['ਜ਼ਰੂਰ / ਬੇਸ਼ੱਕ', 'Zaroor'], sw: ['Bila shaka / Hakika', 'BEE-lah SHAH-kah'],
      mr: ['नक्कीच / अर्थात', 'Nakkeech'], te: ['ఖచ్చితంగా', 'Khachithamgaa'], tr: ['Kesinlikle / Elbette', 'keh-seen-LEEK-leh'], ta: ['நிச்சயமாக', 'Nichayamaaga'], vi: ['Chắc chắn rồi', 'chuhk chuhn roy']
    })
  },
  {
    id: 499, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Finally / At last', 'FY-nuh-lee'], zh: ['终于 / 最后', 'Zhōngyú'], hi: ['आखिरकार / अंततः', 'Aakhirkon'], es: ['Finalmente / Por fin', 'fee-nahl-MEHN-teh'], fr: ['Finalement / Enfin', 'fee-nahl-MAHN'],
      ar: ['أخيراً', 'Akheeran'], bn: ['অবশেষে', 'Obosheshe'], pt: ['Finalmente / Enfim', 'fee-nahl-MAYN-chee'], ru: ['Наконец-то', 'nah-kah-NYEHTS-tuh'], ur: ['بالآخر / آخر کار', 'Bil-aakhir'],
      id: ['Akhirnya', 'ah-KHEER-nyah'], de: ['Endlich / Schließlich', 'ENT-leekh'], ja: ['ついに / ようやく', 'Tsui ni'], pa: ['ਆਖਰਕਾਰ', 'Aakharkon'], sw: ['Hatimaye', 'hah-tee-MAH-yeh'],
      mr: ['शेवटी / अखेर', 'Shevti'], te: ['చివరకు', 'Chivaraku'], tr: ['Sonunda / Nihayet', 'soh-noon-DAH'], ta: ['இறுதியாக', 'Irudhiyaaga'], vi: ['Cuối cùng thì', 'kwooy koong thee']
    })
  },
  {
    id: 500, category: 'Adverbs & Connectors',
    translations: createTranslationMap({
      en: ['Forever / Always and forever', 'for-EV-er'], zh: ['永远', 'Yǒngyuǎn'], hi: ['हमेशा के लिए / सदा', 'Hamesha ke liye'], es: ['Para siempre', 'PAH-rah SYEHM-preh'], fr: ['Pour toujours / À jamais', 'poor too-ZHOOR'],
      ar: ['إلى الأبد', 'Ila al-abad'], bn: ['চিরতরে / চিরকাল', 'Chirotore'], pt: ['Para sempre', 'PAH-rah SAYM-pree'], ru: ['Навсегда / Навеки', 'nahf-seeg-DAH'], ur: ['ہمیشہ کے لیے / سدا', 'Hamesha ke liye'],
      id: ['Selamanya / Abadi', 'seh-lah-MAH-nyah'], de: ['Für immer / Ewig', 'feer EEM-mer'], ja: ['永遠に (えいえんに)', 'Eien ni'], pa: ['ਹਮੇਸ਼ਾ ਲਈ', 'Hamesha layi'], sw: ['Milele na milele', 'mee-LEH-leh'],
      mr: ['कायमचे / चिरंतन', 'Kaayamche'], te: ['ఎప్పటికీ', 'Eppatikee'], tr: ['Sonsuza kadar', 'sohn-SOO-zah'], ta: ['என்றென்றும்', 'Endrendrum'], vi: ['Mãi mãi', 'mye mye']
    })
  }
];

module.exports = { VOCAB_BATCH_11 };
