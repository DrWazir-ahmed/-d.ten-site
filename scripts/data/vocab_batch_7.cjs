const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_7 = [
  // ─────────────────────────────────────────────────────────────
  // 11. BODY & ANATOMY (251 - 275)
  // ─────────────────────────────────────────────────────────────
  {
    id: 251, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Head', 'HED'], zh: ['头', 'Tóu'], hi: ['सिर', 'Sir'], es: ['Cabeza', 'kah-BEH-sah'], fr: ['Tête', 'TEHT'],
      ar: ['رأس', 'Ra\'s'], bn: ['মাথা', 'Matha'], pt: ['Cabeça', 'kah-BEH-sah'], ru: ['Голова', 'gah-lah-VAH'], ur: ['سر', 'Sar'],
      id: ['Kepala', 'keh-PAH-lah'], de: ['Kopf', 'KOPF'], ja: ['頭 (あたま)', 'Atama'], pa: ['ਸਿਰ', 'Sir'], sw: ['Kichwa', 'KEE-chwah'],
      mr: ['डोके', 'Doke'], te: ['తల', 'Thala'], tr: ['Baş / Kafa', 'BAHSH'], ta: ['தலை', 'Thalai'], vi: ['Đầu', 'dow']
    })
  },
  {
    id: 252, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Eye', 'EYE'], zh: ['眼睛', 'Yǎnjing'], hi: ['आँख', 'Aankh'], es: ['Ojo', 'OH-hoh'], fr: ['Œil', 'UY'],
      ar: ['عين', '\'Ayn'], bn: ['চোখ', 'Chokh'], pt: ['Olho', 'OH-lyoo'], ru: ['Глаз', 'GLAHS'], ur: ['آنکھ', 'Aankh'],
      id: ['Mata', 'MAH-tah'], de: ['Auge', 'OW-geh'], ja: ['目 (め)', 'Me'], pa: ['ਅੱਖ', 'Akkh'], sw: ['Jicho', 'JEE-choh'],
      mr: ['डोळा', 'Dola'], te: ['కన్ను', 'Kannu'], tr: ['Göz', 'GURZ'], ta: ['கண்', 'Kan'], vi: ['Mắt', 'muht']
    })
  },
  {
    id: 253, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Ear', 'EER'], zh: ['耳朵', 'Ěrduo'], hi: ['कान', 'Kaan'], es: ['Oreja / Oído', 'oh-REH-hah'], fr: ['Oreille', 'oh-RAY-yuh'],
      ar: ['أذن', 'Uthun'], bn: ['কান', 'Kaan'], pt: ['Orelha / Ouvido', 'oh-REH-lyah'], ru: ['Ухо', 'OO-khuh'], ur: ['کان', 'Kaan'],
      id: ['Telinga', 'teh-LEENG-ah'], de: ['Ohr', 'OHR'], ja: ['耳 (みみ)', 'Mimi'], pa: ['ਕੰਨ', 'Kann'], sw: ['Sikio', 'see-KEE-oh'],
      mr: ['कान', 'Kaan'], te: ['చెవి', 'Chevi'], tr: ['Kulak', 'koo-LAHK'], ta: ['காது', 'Kaadhu'], vi: ['Tai', 'tye']
    })
  },
  {
    id: 254, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Nose', 'NOHZ'], zh: ['鼻子', 'Bízi'], hi: ['नाक', 'Naak'], es: ['Nariz', 'nah-REES'], fr: ['Nez', 'NAY'],
      ar: ['أنف', 'Anf'], bn: ['নাক', 'Naak'], pt: ['Nariz', 'nah-REEZ'], ru: ['Нос', 'NOHS'], ur: ['ناک', 'Naak'],
      id: ['Hidung', 'HEE-doong'], de: ['Nase', 'NAH-zeh'], ja: ['鼻 (はな)', 'Hana'], pa: ['ਨੱਕ', 'Nakk'], sw: ['Pua', 'POO-ah'],
      mr: ['नाक', 'Naak'], te: ['ముక్కు', 'Mukku'], tr: ['Burun', 'boo-ROON'], ta: ['மூக்கு', 'Mookku'], vi: ['Mũi', 'moo-ee']
    })
  },
  {
    id: 255, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Mouth', 'MOWTH'], zh: ['嘴巴 / 口', 'Zuǐba'], hi: ['मुँह', 'Munh'], es: ['Boca', 'BOH-kah'], fr: ['Bouche', 'BOOSH'],
      ar: ['فم', 'Fam'], bn: ['মুখ', 'Mukh'], pt: ['Boca', 'BOH-kah'], ru: ['Рот', 'ROHT'], ur: ['منہ', 'Munh'],
      id: ['Mulut', 'MOO-loot'], de: ['Mund', 'MOONT'], ja: ['口 (くち)', 'Kuchi'], pa: ['ਮੂੰਹ', 'Munh'], sw: ['Kinywa', 'kee-NYWAH'],
      mr: ['तोंड', 'Tond'], te: ['నోరు', 'Noru'], tr: ['Ağız', 'ah-UUZ'], ta: ['வாய்', 'Vaai'], vi: ['Miệng', 'meeyeng']
    })
  },
  {
    id: 256, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Tooth / Teeth', 'TOOTH'], zh: ['牙齿', 'Yáchǐ'], hi: ['दाँत', 'Daant'], es: ['Diente', 'DYEHN-teh'], fr: ['Dent', 'DAHN'],
      ar: ['سن / أسنان', 'Sinn / Asnan'], bn: ['দাঁত', 'Daant'], pt: ['Dente', 'DAYN-chee'], ru: ['Зуб', 'ZOOB'], ur: ['دانت', 'Daant'],
      id: ['Gigi', 'GEE-gee'], de: ['Zahn', 'TSAHN'], ja: ['歯 (は)', 'Ha'], pa: ['ਦੰਦ', 'Dand'], sw: ['Jino / Meno', 'JEE-noh'],
      mr: ['दात', 'Daat'], te: ['పన్ను / దంతాలు', 'Pannu'], tr: ['Diş', 'DEESH'], ta: ['பல்', 'Pal'], vi: ['Răng', 'zuhng']
    })
  },
  {
    id: 257, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Hand', 'HAND'], zh: ['手', 'Shǒu'], hi: ['हाथ', 'Haath'], es: ['Mano', 'MAH-noh'], fr: ['Main', 'MAN'],
      ar: ['يد', 'Yad'], bn: ['হাত', 'Haat'], pt: ['Mão', 'MOWN'], ru: ['Рука (кисть)', 'roo-KAH'], ur: ['ہاتھ', 'Haath'],
      id: ['Tangan', 'TAHN-gahn'], de: ['Hand', 'HAHNT'], ja: ['手 (て)', 'Te'], pa: ['ਹੱਥ', 'Hatth'], sw: ['Mkono', 'm-KOH-noh'],
      mr: ['हात', 'Haat'], te: ['చేయి', 'Cheyi'], tr: ['El', 'EHL'], ta: ['கை', 'Kai'], vi: ['Tay', 'tye']
    })
  },
  {
    id: 258, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Finger', 'FING-ger'], zh: ['手指', 'Shǒuzhǐ'], hi: ['उँगली', 'Ungli'], es: ['Dedo', 'DEH-doh'], fr: ['Doigt', 'DWAH'],
      ar: ['إصبع', 'Isba\''], bn: ['আঙুল', 'Aangul'], pt: ['Dedo', 'DEH-doo'], ru: ['Палец', 'PAH-lyeets'], ur: ['انگلی', 'Ungli'],
      id: ['Jari', 'JAH-ree'], de: ['Finger', 'FING-er'], ja: ['指 (ゆび)', 'Yubi'], pa: ['ਉਂਗਲ', 'Ungal'], sw: ['Kidole', 'kee-DOH-leh'],
      mr: ['बोट', 'Bot'], te: ['వేలు', 'Veelu'], tr: ['Parmak', 'pahr-MAHK'], ta: ['விரல்', 'Viral'], vi: ['Ngón tay', 'ngawn tye']
    })
  },
  {
    id: 259, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Arm', 'ARM'], zh: ['手臂', 'Shǒubì'], hi: ['बाँह / भुजा', 'Baanh'], es: ['Brazo', 'BRAH-soh'], fr: ['Bras', 'BRAH'],
      ar: ['ذراع', 'Thira\''], bn: ['বাহু', 'Bahu'], pt: ['Braço', 'BRAH-soo'], ru: ['Рука (выше кисти)', 'roo-KAH'], ur: ['بازو', 'Baazu'],
      id: ['Lengan', 'LEHN-gahn'], de: ['Arm', 'AHRM'], ja: ['腕 (うで)', 'Ude'], pa: ['ਬਾਂਹ', 'Baanh'], sw: ['Mkono', 'm-KOH-noh'],
      mr: ['हात / बाहू', 'Baahu'], te: ['భుజము / చేయి', 'Bhujamu'], tr: ['Kol', 'KOHL'], ta: ['கை / புஜம்', 'Bujam'], vi: ['Cánh tay', 'kahn tye']
    })
  },
  {
    id: 260, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Leg', 'LEG'], zh: ['腿', 'Tuǐ'], hi: ['टांग / पैर', 'Taang'], es: ['Pierna', 'PYEHR-nah'], fr: ['Jambe', 'ZHAHMB'],
      ar: ['ساق / رجل', 'Saaq'], bn: ['পা / ঠ্যাং', 'Paa'], pt: ['Perna', 'PEHR-nah'], ru: ['Нога', 'nah-GAH'], ur: ['ٹانگ', 'Taang'],
      id: ['Kaki', 'KAH-kee'], de: ['Bein', 'BYNE'], ja: ['脚 (あし)', 'Ashi'], pa: ['ਲੱਤ', 'Latt'], sw: ['Mguu', 'm-GOO'],
      mr: ['पाय', 'Paay'], te: ['కాలు', 'Kaalu'], tr: ['Bacak', 'bah-JAHK'], ta: ['கால்', 'Kaal'], vi: ['Chân', 'chuhn']
    })
  },
  {
    id: 261, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Foot', 'FOOT'], zh: ['脚', 'Jiǎo'], hi: ['पैर / पाँव', 'Pair'], es: ['Pie', 'PYEH'], fr: ['Pied', 'PYAY'],
      ar: ['قدم', 'Qadam'], bn: ['পা', 'Paa'], pt: ['Pé', 'PEH'], ru: ['Ступня / Нога', 'stoo-PNYAH'], ur: ['پاؤں', 'Paaon'],
      id: ['Telapak kaki', 'teh-LAH-pahk'], de: ['Fuß', 'FOOS'], ja: ['足 (あし)', 'Ashi'], pa: ['ਪੈਰ', 'Pair'], sw: ['Unyayo / Mguu', 'oon-YAH-yoh'],
      mr: ['पाऊल', 'Paaool'], te: ['పాదము', 'Paadamu'], tr: ['Ayak', 'ah-YAHK'], ta: ['பாதம்', 'Paadham'], vi: ['Bàn chân', 'bahn chuhn']
    })
  },
  {
    id: 262, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Heart', 'HART'], zh: ['心脏 / 心', 'Xīnzàng'], hi: ['दिल / हृदय', 'Dil'], es: ['Corazón', 'koh-rah-SOHN'], fr: ['Cœur', 'KUHR'],
      ar: ['قلب', 'Qalb'], bn: ['হৃদয় / দিল', 'Hridoy'], pt: ['Coração', 'koh-rah-SOWN'], ru: ['Сердце', 'SYEHRD-tseh'], ur: ['دل', 'Dil'],
      id: ['Jantung / Hati', 'JAHN-toong'], de: ['Herz', 'HAIRTS'], ja: ['心臓 (しんぞう)', 'Shinzou'], pa: ['ਦਿਲ', 'Dil'], sw: ['Moyo', 'MOH-yoh'],
      mr: ['हृदय', 'Hruday'], te: ['గుండె', 'Gunde'], tr: ['Kalp', 'KAHLP'], ta: ['இதயம்', 'Idhayam'], vi: ['Trái tim', 'chye teem']
    })
  },
  {
    id: 263, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Brain', 'BRAYN'], zh: ['大脑', 'Dànǎo'], hi: ['दिमाग / मस्तिष्क', 'Dimaag'], es: ['Cerebro', 'seh-REH-broh'], fr: ['Cerveau', 'sair-VOH'],
      ar: ['دماغ / مخ', 'Dimagh'], bn: ['মস্তিষ্ক / ব্রেন', 'Mosh-tishko'], pt: ['Cérebro', 'SEH-reh-broo'], ru: ['Мозг', 'MOHZK'], ur: ['دماغ', 'Dimaagh'],
      id: ['Otak', 'OH-tahk'], de: ['Gehirn', 'geh-HEERN'], ja: ['脳 (のう)', 'Nou'], pa: ['ਦਿਮਾਗ਼', 'Dimaag'], sw: ['Ubongo', 'oo-BOHN-goh'],
      mr: ['मेंदू', 'Mendu'], te: ['మెదడు', 'Medhadu'], tr: ['Beyin', 'beh-YEEN'], ta: ['மூளை', 'Moolai'], vi: ['Bộ não', 'boh now']
    })
  },
  {
    id: 264, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Blood', 'BLUD'], zh: ['血 / 血液', 'Xuè'], hi: ['रक्त / खून', 'Khoon'], es: ['Sangre', 'SAHN-greh'], fr: ['Sang', 'SAHN'],
      ar: ['دم', 'Dam'], bn: ['রক্ত', 'Rokto'], pt: ['Sangue', 'SAHN-gee'], ru: ['Кровь', 'KROHF'], ur: ['خون', 'Khoon'],
      id: ['Darah', 'DAH-rah'], de: ['Blut', 'BLOOT'], ja: ['血 (ち / けつえき)', 'Chi'], pa: ['ਖੂਨ', 'Khoon'], sw: ['Damu', 'DAH-moo'],
      mr: ['रक्त', 'Rakta'], te: ['రక్తం', 'Raktam'], tr: ['Kan', 'KAHN'], ta: ['இரத்தம்', 'Irattham'], vi: ['Máu', 'mow']
    })
  },
  {
    id: 265, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Bone', 'BOHN'], zh: ['骨头', 'Gǔtou'], hi: ['हड्डी', 'Haddi'], es: ['Hueso', 'WEH-soh'], fr: ['Os', 'OHS'],
      ar: ['عظم', '\'Atham'], bn: ['হাড়', 'Haad'], pt: ['Osso', 'OH-soo'], ru: ['Кость', 'KOHST'], ur: ['ہڈی', 'Haddi'],
      id: ['Tulang', 'TOO-lahng'], de: ['Knochen', 'KNOH-khen'], ja: ['骨 (ほね)', 'Hone'], pa: ['ਹੱਡੀ', 'Haddi'], sw: ['Mfupa', 'm-FOO-pah'],
      mr: ['हाड', 'Haad'], te: ['ఎముక', 'Emuka'], tr: ['Kemik', 'keh-MEEK'], ta: ['எலும்பு', 'Elumbu'], vi: ['Xương', 'soo-ung']
    })
  },
  {
    id: 266, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Skin', 'SKIN'], zh: ['皮肤', 'Pífū'], hi: ['त्वचा / चमड़ी', 'Tvacha'], es: ['Piel', 'PYEHL'], fr: ['Peau', 'POH'],
      ar: ['جلد', 'Jild'], bn: ['ত্বক / চামড়া', 'Twak'], pt: ['Pele', 'PEH-lee'], ru: ['Кожа', 'KOH-zhah'], ur: ['جلد', 'Jild'],
      id: ['Kulit', 'KOO-leet'], de: ['Haut', 'HOWT'], ja: ['皮膚 (ひふ / はだ)', 'Hada'], pa: ['ਚਮੜੀ', 'Chamdi'], sw: ['Ngozi', 'n-GOH-zee'],
      mr: ['त्वचा', 'Tvacha'], te: ['చర్మము', 'Charmamu'], tr: ['Cilt / Deri', 'JEELT'], ta: ['தோல்', 'Thol'], vi: ['Da', 'zah']
    })
  },
  {
    id: 267, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Hair', 'HAIR'], zh: ['头发', 'Tóufa'], hi: ['बाल / केश', 'Baal'], es: ['Pelo / Cabello', 'PEH-loh'], fr: ['Cheveux', 'shuh-VUH'],
      ar: ['شعر', 'Sha\'r'], bn: ['চুল', 'Chul'], pt: ['Cabelo', 'kah-BAY-loo'], ru: ['Волосы', 'VOH-luh-sy'], ur: ['بال', 'Baal'],
      id: ['Rambut', 'RAHM-boot'], de: ['Haare', 'HAH-reh'], ja: ['髪 (かみ)', 'Kami'], pa: ['ਵਾਲ਼', 'Vaal'], sw: ['Nywele', 'ny-WEH-leh'],
      mr: ['केस', 'Kes'], te: ['జుట్టు', 'Juttu'], tr: ['Saç', 'SAHTCH'], ta: ['முடி', 'Mudi'], vi: ['Tóc', 'tohk']
    })
  },
  {
    id: 268, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Back', 'BAK'], zh: ['背部', 'Bèibù'], hi: ['पीठ', 'Peeth'], es: ['Espalda', 'ehs-PAHL-dah'], fr: ['Dos', 'DOH'],
      ar: ['ظهر', 'Thahr'], bn: ['পিঠ', 'Pith'], pt: ['Costas', 'KOHSH-tahs'], ru: ['Спина', 'spee-NAH'], ur: ['پیٹھ / کمر', 'Peeth'],
      id: ['Punggung', 'POONG-goong'], de: ['Rücken', 'REE-ken'], ja: ['背中 (せなか)', 'Senaka'], pa: ['ਪਿੱਠ', 'Pitth'], sw: ['Mgongo', 'm-GOHN-goh'],
      mr: ['पाठ', 'Paath'], te: ['వీపు', 'Veepu'], tr: ['Sırt', 'SUHRT'], ta: ['முதுகு', 'Mudhugu'], vi: ['Lưng', 'loong']
    })
  },
  {
    id: 269, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Stomach', 'STUM-uk'], zh: ['胃 / 肚子', 'Wèi'], hi: ['पेट', 'Pet'], es: ['Estómago', 'ehs-TOH-mah-goh'], fr: ['Estomac', 'es-toh-MAH'],
      ar: ['معدة / بطن', 'Mi\'dah'], bn: ['পেট', 'Pet'], pt: ['Estômago', 'ehs-TOH-mah-goo'], ru: ['Желудок / Живот', 'zheh-LOO-duhk'], ur: ['معدہ / پیٹ', 'Pait'],
      id: ['Perut / Lambung', 'PEH-root'], de: ['Magen / Bauch', 'MAH-gen'], ja: ['胃 / お腹 (おなか)', 'Onaka'], pa: ['ਢਿੱਡ', 'Dhidd'], sw: ['Tumbo', 'TOOM-boh'],
      mr: ['पोट', 'Pot'], te: ['కడుపు', 'Kadupu'], tr: ['Mide / Karın', 'mee-DEH'], ta: ['வயிறு', 'Vayiru'], vi: ['Bụng / Dạ dày', 'boong']
    })
  },
  {
    id: 270, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Throat', 'THROHT'], zh: ['喉咙', 'Hóulóng'], hi: ['गला / कंठ', 'Gala'], es: ['Garganta', 'gahr-GAHN-tah'], fr: ['Gorge', 'GORZH'],
      ar: ['حلق', 'Halq'], bn: ['গলা', 'Gola'], pt: ['Garganta', 'gahr-GAHN-tah'], ru: ['Горло', 'GOHR-luh'], ur: ['گلا', 'Gala'],
      id: ['Tenggorokan', 'tehng-goh-ROH-kahn'], de: ['Kehle / Hals', 'KAY-leh'], ja: ['喉 (のど)', 'Nodo'], pa: ['ਗਲਾ', 'Gala'], sw: ['Koo', 'KOH-oh'],
      mr: ['घसा', 'Ghasa'], te: ['గొంతు', 'Gonthu'], tr: ['Boğaz', 'boh-AHZ'], ta: ['தொண்டை', 'Thondai'], vi: ['Họng / Cổ họng', 'hawng']
    })
  },
  {
    id: 271, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Shoulder', 'SHOHL-der'], zh: ['肩膀', 'Jiānbǎng'], hi: ['कंधा', 'Kandha'], es: ['Hombro', 'OHM-broh'], fr: ['Épaule', 'ay-POHL'],
      ar: ['كتف', 'Katif'], bn: ['কাঁধ', 'Kaadh'], pt: ['Ombro', 'OHM-broo'], ru: ['Плечо', 'plyeh-CHOH'], ur: ['کندھا', 'Kandha'],
      id: ['Bahu', 'BAH-hoo'], de: ['Schulter', 'SHOOL-ter'], ja: ['肩 (かた)', 'Kata'], pa: ['ਮੋਢਾ', 'Modha'], sw: ['Bega', 'BEH-gah'],
      mr: ['खांदा', 'Khaanda'], te: ['భుజము', 'Bhujamu'], tr: ['Omuz', 'oh-MOOZ'], ta: ['தோள்பட்டை', 'Tholpattai'], vi: ['Vai', 'vye']
    })
  },
  {
    id: 272, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Chest', 'CHEST'], zh: ['胸膛 / 胸', 'Xiōng'], hi: ['छाती / सीना', 'Chhaati'], es: ['Pecho', 'PEH-choh'], fr: ['Poitrine', 'pwah-TREEN'],
      ar: ['صدر', 'Sadr'], bn: ['বুক', 'Buk'], pt: ['Peito', 'PAY-too'], ru: ['Грудь', 'GROODT'], ur: ['سینہ / چھاتی', 'Seena'],
      id: ['Dada', 'DAH-dah'], de: ['Brust', 'BROOST'], ja: ['胸 (むね)', 'Mune'], pa: ['ਛਾਤੀ', 'Chhaati'], sw: ['Kifua', 'kee-FOO-ah'],
      mr: ['छाती', 'Chhaati'], te: ['ఛాతీ', 'Chaathi'], tr: ['Göğüs', 'gur-OOS'], ta: ['மார்பு', 'Maarbu'], vi: ['Ngực', 'ngook']
    })
  },
  {
    id: 273, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Knee', 'NEE'], zh: ['膝盖', 'Xīgài'], hi: ['घुटना', 'Ghutna'], es: ['Rodilla', 'roh-DEE-yah'], fr: ['Genou', 'zhuh-NOO'],
      ar: ['ركبة', 'Rukbah'], bn: ['হাঁটু', 'Haantu'], pt: ['Joelho', 'zhoo-AY-lyoo'], ru: ['Колено', 'kah-LYEH-nuh'], ur: ['گھٹنا', 'Ghutna'],
      id: ['Lutut', 'LOO-toot'], de: ['Knie', 'KNEE'], ja: ['膝 (ひざ)', 'Hiza'], pa: ['ਗੋਡਾ', 'Goda'], sw: ['Goti', 'GOH-tee'],
      mr: ['गुडघा', 'Gudghaa'], te: ['మోకాలు', 'Mokaalu'], tr: ['Diz', 'DEEZ'], ta: ['முழங்கால்', 'Muzhankaal'], vi: ['Đầu gối', 'dow goy']
    })
  },
  {
    id: 274, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Face', 'FAYS'], zh: ['脸', 'Liǎn'], hi: ['चेहरा / मुखड़ा', 'Chehra'], es: ['Cara / Rostro', 'KAH-rah'], fr: ['Visage', 'vee-ZAHZH'],
      ar: ['وجه', 'Wajh'], bn: ['মুখমণ্ডল / চেহারা', 'Chehara'], pt: ['Rosto / Cara', 'HOHS-too'], ru: ['Лицо', 'lee-TSOH'], ur: ['چہرہ', 'Chehra'],
      id: ['Wajah / Muka', 'WAH-jah'], de: ['Gesicht', 'geh-ZEEKHT'], ja: ['顔 (かお)', 'Kao'], pa: ['ਚਿਹਰਾ', 'Chehra'], sw: ['Uso', 'OO-soh'],
      mr: ['चेहरा', 'Chehra'], te: ['ముఖం', 'Mukham'], tr: ['Yüz', 'YOOZ'], ta: ['முகம்', 'Mukam'], vi: ['Khuôn mặt', 'khwon muht']
    })
  },
  {
    id: 275, category: 'Body & Health',
    translations: createTranslationMap({
      en: ['Tongue', 'TUNG'], zh: ['舌头', 'Shétou'], hi: ['जीभ', 'Jeebh'], es: ['Lengua', 'LEHN-gwah'], fr: ['Langue', 'LAHNG'],
      ar: ['لسان', 'Lisan'], bn: ['জিহ্বা / জিভ', 'Jibh'], pt: ['Língua', 'LEEN-gwah'], ru: ['Язык (орган)', 'yeh-ZYK'], ur: ['زبان', 'Zubaan'],
      id: ['Lidah', 'LEE-dah'], de: ['Zunge', 'TSOONG-eh'], ja: ['舌 (した)', 'Shita'], pa: ['ਜੀਭ', 'Jeebh'], sw: ['Ulimi', 'oo-LEE-mee'],
      mr: ['जीभ', 'Jeebh'], te: ['నాలుక', 'Naaluka'], tr: ['Dil', 'DEEL'], ta: ['நாக்கு', 'Naakku'], vi: ['Lưỡi', 'loo-ee']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 12. CLOTHING & ACCESSORIES (276 - 300)
  // ─────────────────────────────────────────────────────────────
  {
    id: 276, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Shirt', 'SHERT'], zh: ['衬衫', 'Chènshān'], hi: ['कमीज़', 'Qameez'], es: ['Camisa', 'kah-MEE-sah'], fr: ['Chemise', 'shuh-MEEZ'],
      ar: ['قميص', 'Qamees'], bn: ['শার্ট / জামা', 'Shirt'], pt: ['Camisa', 'kah-MEE-zah'], ru: ['Рубашка', 'roo-BAHSH-kah'], ur: ['قمیض', 'Qameez'],
      id: ['Kemeja', 'keh-MEH-jah'], de: ['Hemd', 'HEHMT'], ja: ['シャツ', 'Shatsu'], pa: ['ਕਮੀਜ਼', 'Qameez'], sw: ['Shati', 'SHAH-tee'],
      mr: ['शर्ट', 'Shirt'], te: ['చొక్కా', 'Chokka'], tr: ['Gömlek', 'gurm-LEHK'], ta: ['சட்டை', 'Sattai'], vi: ['Áo sơ mi', 'ow suh mee']
    })
  },
  {
    id: 277, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Pants / Trousers', 'PANTS'], zh: ['裤子', 'Kùzi'], hi: ['पतलून / पैंट', 'Paint'], es: ['Pantalones', 'pahn-tah-LOH-nehs'], fr: ['Pantalon', 'pahn-tah-LOHN'],
      ar: ['بنطال / سروال', 'Bintal'], bn: ['প্যান্ট', 'Pant'], pt: ['Calças', 'KAHL-sahs'], ru: ['Брюки / Штаны', 'BRYOO-kee'], ur: ['پتلون / پینٹ', 'Patloon'],
      id: ['Celana panjang', 'cheh-LAH-nah'], de: ['Hose', 'HOH-zeh'], ja: ['ズボン / パンツ', 'Zubon'], pa: ['ਪੈਂਟ', 'Pant'], sw: ['Suruali', 'soo-roo-AH-lee'],
      mr: ['पँट', 'Pant'], te: ['ప్యాంటు', 'Pantu'], tr: ['Pantolon', 'pahn-toh-LOHN'], ta: ['கால்சட்டை', 'Kaalsattai'], vi: ['Quần dài', 'kwuhn dye']
    })
  },
  {
    id: 278, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Dress', 'DRESS'], zh: ['连衣裙 / 裙子', 'Liányīqún'], hi: ['पोशाक / ड्रेस', 'Dress'], es: ['Vestido', 'vehs-TEE-doh'], fr: ['Robe', 'ROHB'],
      ar: ['فستان', 'Fustan'], bn: ['পোশাক', 'Poshak'], pt: ['Vestido', 'vehs-CHEE-doo'], ru: ['Платье', 'PLAH-tyeh'], ur: ['لباس / فراک', 'Libaas'],
      id: ['Gaun / Terusan', 'GOWN'], de: ['Kleid', 'KLYTE'], ja: ['ドレス / ワンピース', 'Doresu'], pa: ['ਪੁਸ਼ਾਕ', 'Poshak'], sw: ['Gauni', 'GAH-oo-nee'],
      mr: ['ड्रेस / झगा', 'Dress'], te: ['దుస్తులు / గౌను', 'Dhusthulu'], tr: ['Elbise', 'ehl-bee-SEH'], ta: ['ஆடை / உடை', 'Aadai'], vi: ['Váy đầm', 'vye duhm']
    })
  },
  {
    id: 279, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Shoes', 'SHOOZ'], zh: ['鞋子', 'Xiézi'], hi: ['जूते', 'Joote'], es: ['Zapatos', 'sah-PAH-tohs'], fr: ['Chaussures', 'shoh-SEWR'],
      ar: ['حذاء', 'Hitha\''], bn: ['জুতো', 'Juto'], pt: ['Sapatos', 'sah-PAH-toos'], ru: ['Туфли / Обувь', 'TOOF-lee'], ur: ['جوتے', 'Jootay'],
      id: ['Sepatu', 'seh-PAH-too'], de: ['Schuhe', 'SHOO-eh'], ja: ['靴 (くつ)', 'Kutsu'], pa: ['ਜੁੱਤੀਆਂ', 'Juttiyan'], sw: ['Viatu', 'vee-AH-too'],
      mr: ['बूट / जोडे', 'Boot'], te: ['బూట్లు', 'Bootlu'], tr: ['Ayakkabı', 'ah-yahk-kah-BUH'], ta: ['காலணி', 'Kaalani'], vi: ['Giày', 'zye']
    })
  },
  {
    id: 280, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Jacket', 'JAK-it'], zh: ['夹克', 'Jiákè'], hi: ['जैकेट', 'Jacket'], es: ['Chaqueta', 'chah-KEH-tah'], fr: ['Veste', 'VEST'],
      ar: ['سترة / جاكيت', 'Sitrah'], bn: ['জ্যাকেট', 'Jacket'], pt: ['Jaqueta / Casaco', 'zhah-KEH-tah'], ru: ['Куртка / Жакет', 'KOORT-kah'], ur: ['جیکٹ', 'Jacket'],
      id: ['Jaket', 'JAH-ket'], de: ['Jacke', 'YAH-keh'], ja: ['ジャケット', 'Jaketto'], pa: ['ਜੈਕੇਟ', 'Jacket'], sw: ['Koti', 'KOH-tee'],
      mr: ['जॅकेट', 'Jacket'], te: ['జాకెట్', 'Jacket'], tr: ['Ceket', 'jeh-KEHT'], ta: ['மேலங்கி', 'Melangi'], vi: ['Áo khoác', 'ow khwahk']
    })
  },
  {
    id: 281, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Coat', 'KOHT'], zh: ['大衣 / 外套', 'Dàyī'], hi: ['कोट', 'Coat'], es: ['Abrigo', 'ah-BREE-goh'], fr: ['Manteau', 'mahn-TOH'],
      ar: ['معطف', 'Mi\'taf'], bn: ['কোট', 'Coat'], pt: ['Casaco / Sobretudo', 'kah-ZAH-koo'], ru: ['Пальто', 'pahl-TOH'], ur: ['اوور کوٹ', 'Coat'],
      id: ['Mantel', 'MAHN-tehl'], de: ['Mantel', 'MAHN-tel'], ja: ['コート', 'Kooto'], pa: ['ਕੋਟ', 'Coat'], sw: ['Koti kubwa', 'KOH-tee'],
      mr: ['कोट', 'Coat'], te: ['కోటు', 'Kotu'], tr: ['Palto / Kaban', 'pahl-TOH'], ta: ['நீளங்கி', 'Neelangi'], vi: ['Áo choàng', 'ow chwahng']
    })
  },
  {
    id: 282, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Hat / Cap', 'HAT'], zh: ['帽子', 'Màozi'], hi: ['टोपी', 'Topi'], es: ['Sombrero / Gorra', 'sohm-BREH-roh'], fr: ['Chapeau', 'shah-POH'],
      ar: ['قبعة', 'Qubba\'ah'], bn: ['টুপি', 'Tupi'], pt: ['Chapéu / Boné', 'shah-PEH-oo'], ru: ['Шляпа / Кепка', 'SHLYAH-pah'], ur: ['ٹوپی', 'Topi'],
      id: ['Topi', 'TOH-pee'], de: ['Hut / Mütze', 'HOOT'], ja: ['帽子 (ぼうし)', 'Boushi'], pa: ['ਟੋਪੀ', 'Topi'], sw: ['Kofia', 'koh-FEE-ah'],
      mr: ['टोपी', 'Topi'], te: ['టోపీ', 'Topi'], tr: ['Şapka', 'shahp-KAH'], ta: ['தொப்பி', 'Thoppi'], vi: ['Mũ / Nón', 'moo']
    })
  },
  {
    id: 283, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Socks', 'SOKS'], zh: ['袜子', 'Wàzi'], hi: ['मोज़े', 'Moze'], es: ['Calcetines', 'kahl-seh-TEE-nehs'], fr: ['Chaussettes', 'shoh-SET'],
      ar: ['جوارب', 'Jawarib'], bn: ['মোজা', 'Moja'], pt: ['Meias', 'MAY-ahs'], ru: ['Носки', 'nahs-KEE'], ur: ['جرابیں', 'Jorabein'],
      id: ['Kaus kaki', 'KOWS KAH-kee'], de: ['Socken', 'ZOK-ken'], ja: ['靴下 (くつした)', 'Kutsushita'], pa: ['ਜੁਰਾਬਾਂ', 'Juraaban'], sw: ['Mede / Soksi', 'SOHK-see'],
      mr: ['मोजे', 'Moje'], te: ['మేజోళ్ళు', 'Mejollu'], tr: ['Çorap', 'choh-RAHP'], ta: ['காலுறை', 'Kaalurai'], vi: ['Tất / Vớ', 'tuht']
    })
  },
  {
    id: 284, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Glasses / Eyeglasses', 'GLAS-iz'], zh: ['眼镜', 'Yǎnjìng'], hi: ['चश्मा', 'Chashma'], es: ['Gafas / Lentes', 'GAH-fahs'], fr: ['Lunettes', 'lew-NET'],
      ar: ['نظارة', 'Natharah'], bn: ['চশমা', 'Choshma'], pt: ['Óculos', 'OH-koo-loos'], ru: ['Очки', 'ahch-KEE'], ur: ['عینک / چشمہ', 'Ainak'],
      id: ['Kacamata', 'kah-chah-MAH-tah'], de: ['Brille', 'BRIL-leh'], ja: ['眼鏡 (めがね)', 'Megane'], pa: ['ਐਨਕ', 'Ainak'], sw: ['Miwani', 'mee-WAH-nee'],
      mr: ['चष्मा', 'Chashma'], te: ['కళ్ళద్దాలు', 'Kalladdhaalu'], tr: ['Gözlük', 'gurz-LOOK'], ta: ['மூக்குக்கண்ணாடி', 'Mookkukkannaadi'], vi: ['Kính mắt', 'kinh muht']
    })
  },
  {
    id: 285, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Watch (Wristwatch)', 'WATCH'], zh: ['手表', 'Shǒubiǎo'], hi: ['कलाई घड़ी', 'Ghadi'], es: ['Reloj de pulsera', 'reh-LOH'], fr: ['Montre', 'MOHN-truh'],
      ar: ['ساعة يد', 'Sa\'at yad'], bn: ['হাতঘড়ি', 'Haat-ghodi'], pt: ['Relógio de pulso', 'heh-LOH-zhyoo'], ru: ['Часы (наручные)', 'chah-SY'], ur: ['کلائی گھڑی', 'Ghadi'],
      id: ['Jam tangan', 'JAHM TAHN-gahn'], de: ['Armbanduhr', 'AHRM-bahnt-oor'], ja: ['腕時計 (うでどけい)', 'Udedokei'], pa: ['ਘੜੀ', 'Ghadi'], sw: ['Saa ya mkononi', 'SAH'],
      mr: ['हातघड्याळ', 'Haat-ghadyaal'], te: ['చేతి గడియారం', 'Chethi gadiyaaram'], tr: ['Kol saati', 'KOHL sah-ah-tee'], ta: ['கைக்கடிகாரம்', 'Kaikkadigaaram'], vi: ['Đồng hồ đeo tay', 'dawng hoh']
    })
  },
  {
    id: 286, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Gloves', 'GLUVZ'], zh: ['手套', 'Shǒutào'], hi: ['दस्ताने', 'Dastaane'], es: ['Guantes', 'GWAHN-tehs'], fr: ['Gants', 'GAHN'],
      ar: ['قفازات', 'Quffazat'], bn: ['দস্তানা', 'Dostana'], pt: ['Luvas', 'LOO-vahs'], ru: ['Перчатки', 'peer-CHAHT-kee'], ur: ['دستانے', 'Dastaanay'],
      id: ['Sarung tangan', 'SAH-roong'], de: ['Handschuhe', 'HAHNT-shoo-eh'], ja: ['手袋 (てぶくろ)', 'Tebukuro'], pa: ['ਦਸਤਾਨੇ', 'Dastaane'], sw: ['Glovu', 'GLOH-voo'],
      mr: ['हातमोजे', 'Haatmoje'], te: ['చేతి తొడుగులు', 'Chethi thodugulu'], tr: ['Eldiven', 'ehl-dee-VEHN'], ta: ['கையுறை', 'Kaiyurai'], vi: ['Găng tay', 'guhng tye']
    })
  },
  {
    id: 287, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Scarf', 'SKARF'], zh: ['围巾', 'Wéijīn'], hi: ['दुपट्टा / मफलर', 'Dupatta'], es: ['Bufanda', 'boo-FAHN-dah'], fr: ['Écharpe', 'ay-SHARP'],
      ar: ['وشاح', 'Wishah'], bn: ['মাফলার / ওড়না', 'Muffler'], pt: ['Cachecol', 'kah-sheh-KOHL'], ru: ['Шарф', 'SHARF'], ur: ['مفلر / اسکارف', 'Muffler'],
      id: ['Syal', 'SYAHL'], de: ['Schal', 'SHAHL'], ja: ['マフラー / スカーフ', 'Mafuraa'], pa: ['ਸਕਾਰਫ਼', 'Scarf'], sw: ['Skafu', 'SKAH-foo'],
      mr: ['मफलर', 'Muffler'], te: ['స్కార్ఫ్', 'Scarf'], tr: ['Atkı', 'aht-KUH'], ta: ['கழுத்துப்பட்டை', 'Kaluthuppattai'], vi: ['Khăn quàng cổ', 'khuhn kwahng']
    })
  },
  {
    id: 288, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Belt', 'BELT'], zh: ['腰带 / 皮带', 'Yāodài'], hi: ['कमरबंद / बेल्ट', 'Belt'], es: ['Cinturón', 'seen-too-ROHN'], fr: ['Ceinture', 'san-TEWR'],
      ar: ['حزام', 'Hizam'], bn: ['বেল্ট / কোমরবন্ধ', 'Belt'], pt: ['Cinto', 'SEEN-too'], ru: ['Ремень / Пояс', 'ryee-MYEN'], ur: ['بیلٹ / پیٹی', 'Belt'],
      id: ['Ikat pinggang', 'EE-kaht'], de: ['Gürtel', 'GEER-tel'], ja: ['ベルト', 'Beruto'], pa: ['ਬੈਲਟ', 'Belt'], sw: ['Mshipi', 'm-SHEE-pee'],
      mr: ['पट्टा', 'Patta'], te: ['బెల్ట్', 'Belt'], tr: ['Kemer', 'keh-MEHR'], ta: ['இடுப்பு வார்', 'Iduppu vaar'], vi: ['Thắt lưng / Dây nịt', 'thuht loong']
    })
  },
  {
    id: 289, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Wallet', 'WAWL-it'], zh: ['钱包', 'Qiánbāo'], hi: ['बटुआ', 'Batua'], es: ['Billetera / Cartera', 'bee-yeh-TEH-rah'], fr: ['Portefeuille', 'por-tuh-FUH-yuh'],
      ar: ['محفظة', 'Mahfathah'], bn: ['মানিব্যাগ', 'Manibag'], pt: ['Carteira', 'kahr-TAY-rah'], ru: ['Кошелек / Бумажник', 'kuh-sheh-LYOHK'], ur: ['بٹوہ', 'Batwa'],
      id: ['Dompet', 'DOHM-pet'], de: ['Geldbörse', 'GELT-bur-zeh'], ja: ['財布 (さいふ)', 'Saifu'], pa: ['ਬਟੂਆ', 'Batua'], sw: ['Pochi', 'POH-chee'],
      mr: ['पाकीट', 'Paakeet'], te: ['పర్సు / వాలెట్', 'Purse'], tr: ['Cüzdan', 'jooz-DAHN'], ta: ['பணப்பை', 'Panappai'], vi: ['Ví tiền', 'vee teeyeng']
    })
  },
  {
    id: 290, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Ring (Jewelry)', 'RING'], zh: ['戒指', 'Jièzhi'], hi: ['अंगूठी', 'Angoothi'], es: ['Anillo', 'ah-NEE-yoh'], fr: ['Bague', 'BAHG'],
      ar: ['خاتم', 'Khatim'], bn: ['আংটি', 'Aangti'], pt: ['Anel', 'ah-NEHL'], ru: ['Кольцо', 'kahl-TSOH'], ur: ['انگوٹھی', 'Angoothi'],
      id: ['Cincin', 'CHEEN-cheen'], de: ['Ring', 'RING'], ja: ['指輪 (ゆびわ)', 'Yubiwa'], pa: ['ਮੁੰਦਰੀ', 'Mundri'], sw: ['Pete', 'PEH-teh'],
      mr: ['अंगठी', 'Angathi'], te: ['ఉంగరం', 'Ungaram'], tr: ['Yüzük', 'yoo-ZOOK'], ta: ['மோதிரம்', 'Modhiram'], vi: ['Nhẫn', 'nyuhn']
    })
  },
  {
    id: 291, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Necklace', 'NEK-lis'], zh: ['项链', 'Xiàngliàn'], hi: ['हार / कंठमाला', 'Haar'], es: ['Collar', 'koh-YAHR'], fr: ['Collier', 'kohl-YAY'],
      ar: ['قلادة / عقد', 'Qiladah'], bn: ['গলার হার', 'Haar'], pt: ['Colar', 'koh-LAHR'], ru: ['Ожерелье', 'ah-zheh-RYEHL-yeh'], ur: ['ہار / مالا', 'Haar'],
      id: ['Kalung', 'KAH-loong'], de: ['Halskette', 'HAHLS-ket-teh'], ja: ['ネックレス', 'Nekkuresu'], pa: ['ਹਾਰ', 'Haar'], sw: ['Mkufu', 'm-KOO-foo'],
      mr: ['हार / कंठहार', 'Haar'], te: ['హారము', 'Haaramu'], tr: ['Kolye', 'kohl-YEH'], ta: ['கழுத்தணி / மாலை', 'Maalai'], vi: ['Dây chuyền', 'zye chweey-en']
    })
  },
  {
    id: 292, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Pockets', 'POK-its'], zh: ['口袋', 'Kǒudài'], hi: ['जेब', 'Jeb'], es: ['Bolsillos', 'bohl-SEE-yohs'], fr: ['Poches', 'POHSH'],
      ar: ['جيوب', 'Juyoob'], bn: ['পকেট', 'Pocket'], pt: ['Bolsos', 'BOHL-soos'], ru: ['Карманы', 'kahr-MAH-ny'], ur: ['جیب', 'Jaib'],
      id: ['Saku', 'SAH-koo'], de: ['Taschen', 'TAH-shen'], ja: ['ポケット', 'Poketto'], pa: ['ਜੇਬਾਂ', 'Jeban'], sw: ['Mifuko', 'mee-FOO-koh'],
      mr: ['खिसा', 'Khisa'], te: ['జేబులు', 'Jebulu'], tr: ['Cepler', 'jehp-LEHR'], ta: ['பைகள்', 'Paigal'], vi: ['Túi áo', 'tooy ow']
    })
  },
  {
    id: 293, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Button', 'BUT-n'], zh: ['纽扣', 'Niǔkòu'], hi: ['बटन', 'Button'], es: ['Botón', 'boh-TOHN'], fr: ['Bouton', 'boo-TOHN'],
      ar: ['زر', 'Zirr'], bn: ['বোতাম', 'Botam'], pt: ['Botão', 'boh-TOWN'], ru: ['Пуговица', 'POO-guh-vee-tsah'], ur: ['بٹن', 'Button'],
      id: ['Kancing', 'KAHN-cheeng'], de: ['Knopf', 'KNOPF'], ja: ['ボタン', 'Botan'], pa: ['ਬਟਨ', 'Button'], sw: ['Kifungo', 'kee-FOON-goh'],
      mr: ['बटण', 'Batan'], te: ['బటన్', 'Button'], tr: ['Düğme', 'dew-MEH'], ta: ['பொத்தான்', 'Potthaan'], vi: ['Cúc áo', 'kook ow']
    })
  },
  {
    id: 294, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Zipper', 'ZIP-er'], zh: ['拉链', 'Lāliàn'], hi: ['ज़िप / ज़ंजीर', 'Zip'], es: ['Cremallera / Cierre', 'kreh-mah-YEH-rah'], fr: ['Fermeture éclair', 'fair-muh-TEWR'],
      ar: ['سحاب', 'Sahhab'], bn: ['চেইন / জিপার', 'Chain'], pt: ['Zíper', 'ZEE-pehr'], ru: ['Молния (застежка)', 'MOHL-nee-yah'], ur: ['زپ', 'Zip'],
      id: ['Ritsleting', 'REET-sleh-teeng'], de: ['Reißverschluss', 'RYS-fehr-shloos'], ja: ['ファスナー / ジッパー', 'Fasunaa'], pa: ['ਜ਼ਿਪ', 'Zip'], sw: ['Zipu', 'ZEE-poo'],
      mr: ['झिप', 'Zip'], te: ['జిప్', 'Zip'], tr: ['Fermuar', 'fehr-moo-AHR'], ta: ['ஜிப்பர்', 'Zipper'], vi: ['Khóa kéo', 'khwah kew']
    })
  },
  {
    id: 295, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Umbrella', 'um-BREL-uh'], zh: ['雨伞', 'Yǔsǎn'], hi: ['छाता', 'Chhaata'], es: ['Paraguas', 'pah-RAH-gwahs'], fr: ['Parapluie', 'pah-rah-PLWEE'],
      ar: ['مظلة', 'Mithallah'], bn: ['ছাতা', 'Chhata'], pt: ['Guarda-chuva', 'GWAHR-dah SHOO-vah'], ru: ['Зонт', 'ZOHT'], ur: ['چھتری', 'Chhatri'],
      id: ['Payung', 'PAH-yoong'], de: ['Regenschirm', 'RAY-gen-sheerm'], ja: ['傘 (かさ)', 'Kasa'], pa: ['ਛਤਰੀ', 'Chhatri'], sw: ['Mwavuli', 'm-wah-VOO-lee'],
      mr: ['छत्री', 'Chhatri'], te: ['గొడుగు', 'Godugu'], tr: ['Şemsiye', 'shehm-see-YEH'], ta: ['குடை', 'Kudai'], vi: ['Chiếc ô / Dù', 'cheeyek oh']
    })
  },
  {
    id: 296, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Silk', 'SILK'], zh: ['丝绸', 'Sīchóu'], hi: ['रेशम', 'Resham'], es: ['Seda', 'SEH-dah'], fr: ['Soie', 'SWAH'],
      ar: ['حرير', 'Hareer'], bn: ['রেশম / সিল্ক', 'Resham'], pt: ['Seda', 'SAY-dah'], ru: ['Шелк', 'SHOHLK'], ur: ['ریشم', 'Resham'],
      id: ['Sutra', 'SOO-trah'], de: ['Seide', 'ZY-deh'], ja: ['絹 (きぬ / シルク)', 'Kinu'], pa: ['ਰੇਸ਼ਮ', 'Resham'], sw: ['Hariri', 'hah-REE-ree'],
      mr: ['रेशीम', 'Resheem'], te: ['పట్టు', 'Pattu'], tr: ['İpek', 'ee-PEHK'], ta: ['பட்டு', 'Pattu'], vi: ['Lụa', 'loo-uh']
    })
  },
  {
    id: 297, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Cotton', 'KOT-n'], zh: ['棉花 / 全棉', 'Miánhua'], hi: ['कपास / सूती', 'Kapaas'], es: ['Algodón', 'ahl-goh-DOHN'], fr: ['Coton', 'koh-TOHN'],
      ar: ['قطن', 'Qutn'], bn: ['তুলা / সুতি', 'Tula'], pt: ['Algodão', 'ahl-goh-DOWN'], ru: ['Хлопок', 'KHLAH-puhk'], ur: ['کپاس / سوتی', 'Sooti'],
      id: ['Kapas / Katun', 'KAH-toon'], de: ['Baumwolle', 'BOWM-vol-leh'], ja: ['木綿 (もめん / コットン)', 'Momen'], pa: ['ਕਪਾਹ', 'Kapaah'], sw: ['Pamba', 'PAHM-bah'],
      mr: ['कापूस / सुती', 'Kaapoos'], te: ['పత్తి / నూలు', 'Patthi'], tr: ['Pamuk', 'pah-MOOK'], ta: ['பருத்தி', 'Parutthi'], vi: ['Bông / Cotton', 'bawng']
    })
  },
  {
    id: 298, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Wool', 'WOOL'], zh: ['羊毛', 'Yángmáo'], hi: ['ऊन', 'Oon'], es: ['Lana', 'LAH-nah'], fr: ['Laine', 'LEN'],
      ar: ['صوف', 'Soof'], bn: ['পশম', 'Poshom'], pt: ['Lã', 'LAHN'], ru: ['Шерсть', 'SHEHRST'], ur: ['اون', 'Oon'],
      id: ['Wol', 'WOHL'], de: ['Wolle', 'VOL-leh'], ja: ['羊毛 (ウール)', 'Uuru'], pa: ['ਉੱਨ', 'Unn'], sw: ['Sufi', 'SOO-fee'],
      mr: ['लोकर', 'Lokar'], te: ['ఉన్ని', 'Unni'], tr: ['Yün', 'YOON'], ta: ['கம்பளி', 'Kambali'], vi: ['Len', 'len']
    })
  },
  {
    id: 299, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Leather', 'LETH-er'], zh: ['皮革 / 真皮', 'Pígé'], hi: ['चमड़ा', 'Chamda'], es: ['Cuero / Piel', 'KWEH-roh'], fr: ['Cuir', 'KWEER'],
      ar: ['جلد', 'Jild'], bn: ['চামড়া', 'Chamda'], pt: ['Couro', 'KOH-roo'], ru: ['Кожа (материал)', 'KOH-zhah'], ur: ['چمڑا', 'Chamda'],
      id: ['Kulit (bahan)', 'KOO-leet'], de: ['Leder', 'LAY-der'], ja: ['革 (かわ)', 'Kawa'], pa: ['ਚਮੜਾ', 'Chamda'], sw: ['Ngozi', 'n-GOH-zee'],
      mr: ['कातडे', 'Kaatde'], te: ['తోలు', 'Tholu'], tr: ['Deri', 'deh-REE'], ta: ['தோல்', 'Thol'], vi: ['Da thuộc', 'zah thwork']
    })
  },
  {
    id: 300, category: 'Clothing & Fashion',
    translations: createTranslationMap({
      en: ['Clean clothes', 'kleen klohz'], zh: ['干净的衣服', 'Gānjìng de yīfu'], hi: ['साफ़ कपड़े', 'Saaf kapde'], es: ['Ropa limpia', 'ROH-pah LEEM-pyah'], fr: ['Vêtements propres', 'veht-MAHN PROH-pruh'],
      ar: ['ملابس نظيفة', 'Malabis natheefah'], bn: ['পরিষ্কার জামাকাপড়', 'Porishkar jama'], pt: ['Roupas limpas', 'HOH-pahs LEEM-pahs'], ru: ['Чистая одежда', 'CHEES-tah-yah ah-DYEHZH-dah'], ur: ['صاف کپڑے', 'Saaf kapray'],
      id: ['Pakaian bersih', 'pah-KYE-ahn'], de: ['Saubere Kleidung', 'ZOW-beh-reh'], ja: ['清潔な服', 'Seiketsu na fuku'], pa: ['ਸਾਫ਼ ਕੱਪੜੇ', 'Saaf kapde'], sw: ['Nguo safi', 'n-GOO-oh SAH-fee'],
      mr: ['स्वच्छ कपडे', 'Swachha kapde'], te: ['శుభ్రమైన బట్టలు', 'Shubhramaina battalu'], tr: ['Temiz kıyafetler', 'teh-MEEZ kuh-yah-feht-LEHR'], ta: ['சுத்தமான உடைகள்', 'Sutthamaana udaigal'], vi: ['Quần áo sạch', 'kwuhn ow sahch']
    })
  }
];

module.exports = { VOCAB_BATCH_7 };
