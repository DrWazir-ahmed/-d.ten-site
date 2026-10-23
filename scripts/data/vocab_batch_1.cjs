const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_1 = [
  // ─────────────────────────────────────────────────────────────
  // 2. NUMBERS & QUANTITY (26 - 55)
  // ─────────────────────────────────────────────────────────────
  {
    id: 26, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['One', 'WUN'], zh: ['一', 'Yī'], hi: ['एक', 'Ek'], es: ['Uno', 'OO-noh'], fr: ['Un', 'UHN'],
      ar: ['واحد', 'Wahid'], bn: ['এক', 'Aek'], pt: ['Um', 'OOM'], ru: ['Один', 'Ah-DEEN'], ur: ['ایک', 'Ek'],
      id: ['Satu', 'SAH-too'], de: ['Eins', 'YNS'], ja: ['一 (いち)', 'Ichi'], pa: ['ਇੱਕ', 'Ikk'], sw: ['Moja', 'MOH-jah'],
      mr: ['एक', 'Ek'], te: ['ఒకటి', 'Okati'], tr: ['Bir', 'BEER'], ta: ['ஒன்று', 'Ondru'], vi: ['Một', 'moht']
    })
  },
  {
    id: 27, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Two', 'TOO'], zh: ['二', 'Èr'], hi: ['दो', 'Do'], es: ['Dos', 'DOHS'], fr: ['Deux', 'DUH'],
      ar: ['اثنان', 'Ithnan'], bn: ['দুই', 'Dui'], pt: ['Dois', 'DOYSH'], ru: ['Два', 'DVAH'], ur: ['دو', 'Do'],
      id: ['Dua', 'DOO-ah'], de: ['Zwei', 'TSVYE'], ja: ['二 (に)', 'Ni'], pa: ['ਦੋ', 'Do'], sw: ['Mbili', 'm-BEE-lee'],
      mr: ['दोन', 'Don'], te: ['రెండు', 'Rendu'], tr: ['İki', 'ee-KEE'], ta: ['இரண்டு', 'Irandu'], vi: ['Hai', 'hye']
    })
  },
  {
    id: 28, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Three', 'THREE'], zh: ['三', 'Sān'], hi: ['तीन', 'Teen'], es: ['Tres', 'TREHS'], fr: ['Trois', 'TRWAH'],
      ar: ['ثلاثة', 'Thalatha'], bn: ['তিন', 'Tin'], pt: ['Três', 'TREHSH'], ru: ['Три', 'TREE'], ur: ['تین', 'Teen'],
      id: ['Tiga', 'TEE-gah'], de: ['Drei', 'DRY'], ja: ['三 (さん)', 'San'], pa: ['ਤਿੰਨ', 'Tinn'], sw: ['Tatu', 'TAH-too'],
      mr: ['तीन', 'Teen'], te: ['మూడు', 'Moodu'], tr: ['Üç', 'OOTCH'], ta: ['மூன்று', 'Moondru'], vi: ['Ba', 'bah']
    })
  },
  {
    id: 29, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Four', 'FOR'], zh: ['四', 'Sì'], hi: ['चार', 'Chaar'], es: ['Cuatro', 'KWAH-troh'], fr: ['Quatre', 'KAH-truh'],
      ar: ['أربعة', 'Arba\'a'], bn: ['চার', 'Char'], pt: ['Quatro', 'KWAH-troo'], ru: ['Четыре', 'Cheh-TY-rye'], ur: ['چار', 'Chaar'],
      id: ['Empat', 'EM-paht'], de: ['Vier', 'FEER'], ja: ['四 (よん)', 'Yon / Shi'], pa: ['ਚਾਰ', 'Chaar'], sw: ['Nne', 'N-neh'],
      mr: ['चार', 'Chaar'], te: ['నాలుగు', 'Naalugu'], tr: ['Dört', 'DURT'], ta: ['நான்கு', 'Naangu'], vi: ['Bốn', 'bohn']
    })
  },
  {
    id: 30, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Five', 'FYVE'], zh: ['五', 'Wǔ'], hi: ['पाँच', 'Paanch'], es: ['Cinco', 'SEEN-koh'], fr: ['Cinq', 'SANK'],
      ar: ['خمسة', 'Khamsa'], bn: ['পাঁচ', 'Pnach'], pt: ['Cinco', 'SEEN-koo'], ru: ['Пять', 'PYAHT'], ur: ['پانچ', 'Paanch'],
      id: ['Lima', 'LEE-mah'], de: ['Fünf', 'FEWNF'], ja: ['五 (ご)', 'Go'], pa: ['ਪੰਜ', 'Panj'], sw: ['Tano', 'TAH-noh'],
      mr: ['पाच', 'Paach'], te: ['ఐదు', 'Aaidu'], tr: ['Beş', 'BESH'], ta: ['ஐந்து', 'Aindhu'], vi: ['Năm', 'nuhm']
    })
  },
  {
    id: 31, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Six', 'SIKS'], zh: ['六', 'Liù'], hi: ['छह', 'Chhah'], es: ['Seis', 'SAYS'], fr: ['Six', 'SEES'],
      ar: ['ستة', 'Sitta'], bn: ['ছয়', 'Chhoy'], pt: ['Seis', 'SAYSH'], ru: ['Шесть', 'SHEST'], ur: ['چھ', 'Chhay'],
      id: ['Enam', 'EH-nahm'], de: ['Sechs', 'ZEKS'], ja: ['六 (ろく)', 'Roku'], pa: ['ਛੇ', 'Chhe'], sw: ['Sita', 'SEE-tah'],
      mr: ['सहा', 'Saha'], te: ['ఆరు', 'Aaru'], tr: ['Altı', 'ahl-TUH'], ta: ['ஆறு', 'Aaru'], vi: ['Sáu', 'sow']
    })
  },
  {
    id: 32, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Seven', 'SEV-en'], zh: ['七', 'Qī'], hi: ['सात', 'Saat'], es: ['Siete', 'SYEH-teh'], fr: ['Sept', 'SET'],
      ar: ['سبعة', 'Sab\'a'], bn: ['সাত', 'Shaat'], pt: ['Sete', 'SEH-chee'], ru: ['Семь', 'SYEM'], ur: ['سات', 'Saat'],
      id: ['Tujuh', 'TOO-joo'], de: ['Sieben', 'ZEE-ben'], ja: ['七 (なな)', 'Nana / Shichi'], pa: ['ਸੱਤ', 'Satt'], sw: ['Saba', 'SAH-bah'],
      mr: ['सात', 'Saat'], te: ['ఏడు', 'Eedu'], tr: ['Yedi', 'yeh-DEE'], ta: ['ஏழு', 'Ezhu'], vi: ['Bảy', 'bye']
    })
  },
  {
    id: 33, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Eight', 'AYT'], zh: ['八', 'Bā'], hi: ['आठ', 'Aath'], es: ['Ocho', 'OH-choh'], fr: ['Huit', 'WEET'],
      ar: ['ثمانية', 'Thamaniya'], bn: ['আট', 'Aat'], pt: ['Oito', 'OY-too'], ru: ['Восемь', 'VOH-syem'], ur: ['آٹھ', 'Aath'],
      id: ['Delapan', 'duh-LAH-pahn'], de: ['Acht', 'AHKHT'], ja: ['八 (はち)', 'Hachi'], pa: ['ਅੱਠ', 'Atth'], sw: ['Nane', 'NAH-neh'],
      mr: ['आठ', 'Aath'], te: ['ఎనిమిది', 'Enimidi'], tr: ['Sekiz', 'seh-KEEZ'], ta: ['எட்டு', 'Ettu'], vi: ['Tám', 'tahm']
    })
  },
  {
    id: 34, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Nine', 'NYNE'], zh: ['九', 'Jiǔ'], hi: ['नौ', 'Nau'], es: ['Nueve', 'NWEH-veh'], fr: ['Neuf', 'NUHF'],
      ar: ['تسعة', 'Tis\'a'], bn: ['নয়', 'Noy'], pt: ['Nove', 'NOH-vee'], ru: ['Девять', 'DYEH-vyaht'], ur: ['نو', 'Nau'],
      id: ['Sembilan', 'sem-BEE-lahn'], de: ['Neun', 'NOYN'], ja: ['九 (きゅう)', 'Kyuu'], pa: ['ਨੌਂ', 'Naun'], sw: ['Tisa', 'TEE-sah'],
      mr: ['नऊ', 'Nau'], te: ['తొమ్మిది', 'Tommidi'], tr: ['Dokuz', 'doh-KOOZ'], ta: ['ஒன்பது', 'Onbadhu'], vi: ['Chín', 'cheen']
    })
  },
  {
    id: 35, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Ten', 'TEN'], zh: ['十', 'Shí'], hi: ['दस', 'Das'], es: ['Diez', 'DYEHS'], fr: ['Dix', 'DEES'],
      ar: ['عشرة', 'Ashara'], bn: ['দশ', 'Dosh'], pt: ['Dez', 'DEHZ'], ru: ['Десять', 'DYEH-syaht'], ur: ['دس', 'Das'],
      id: ['Sepuluh', 'suh-POO-loo'], de: ['Zehn', 'TSAYN'], ja: ['十 (じゅう)', 'Juu'], pa: ['ਦਸ', 'Das'], sw: ['Kumi', 'KOO-mee'],
      mr: ['दहा', 'Daha'], te: ['పది', 'Padi'], tr: ['On', 'OHN'], ta: ['பத்து', 'Pathu'], vi: ['Mười', 'mooy']
    })
  },
  {
    id: 36, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Twenty', 'TWEN-tee'], zh: ['二十', 'Èrshí'], hi: ['बीस', 'Bees'], es: ['Veinte', 'VAYN-teh'], fr: ['Vingt', 'VAN'],
      ar: ['عشرون', 'Ishroon'], bn: ['কুড়ি / বিশ', 'Kuri / Bish'], pt: ['Vinte', 'VEEN-chee'], ru: ['Двадцать', 'DVAHD-tsaht'], ur: ['بیس', 'Bees'],
      id: ['Dua puluh', 'DOO-ah POO-loo'], de: ['Zwanzig', 'TSVAHN-tsikh'], ja: ['二十 (にじゅう)', 'Nijuu'], pa: ['ਵੀਹ', 'Veeh'], sw: ['Ishirini', 'ee-shee-REE-nee'],
      mr: ['वीस', 'Vees'], te: ['ఇరవై', 'Iravai'], tr: ['Yirmi', 'yeer-MEE'], ta: ['இருபது', 'Irubadhu'], vi: ['Hai mươi', 'hye mooy']
    })
  },
  {
    id: 37, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Hundred', 'HUN-dred'], zh: ['百', 'Bǎi'], hi: ['सौ', 'Sau'], es: ['Cien / Ciento', 'SYEN'], fr: ['Cent', 'SAHN'],
      ar: ['مائة', 'Mi\'a'], bn: ['একশো', 'Eksho'], pt: ['Cem', 'SAYN'], ru: ['Сто', 'STOH'], ur: ['سو', 'Sau'],
      id: ['Seratus', 'suh-RAH-toos'], de: ['Hundert', 'HOON-dert'], ja: ['百 (ひゃく)', 'Hyaku'], pa: ['ਸੌ', 'Sau'], sw: ['Mia', 'MEE-ah'],
      mr: ['शंभर', 'Shambhar'], te: ['వంద', 'Vanda'], tr: ['Yüz', 'YOOZ'], ta: ['நூறு', 'Nooru'], vi: ['Một trăm', 'moht chahm']
    })
  },
  {
    id: 38, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Thousand', 'THOW-zand'], zh: ['千', 'Qiān'], hi: ['हज़ार', 'Hazaar'], es: ['Mil', 'MEEL'], fr: ['Mille', 'MEEL'],
      ar: ['ألف', 'Alf'], bn: ['হাজার', 'Hajar'], pt: ['Mil', 'MEEL'], ru: ['Тысяча', 'TY-syah-chah'], ur: ['ہزار', 'Hazaar'],
      id: ['Seribu', 'suh-REE-boo'], de: ['Tausend', 'TOW-zent'], ja: ['千 (せん)', 'Sen'], pa: ['ਹਜ਼ਾਰ', 'Hazaar'], sw: ['Elfu', 'EL-foo'],
      mr: ['हजार', 'Hajar'], te: ['వెయ్యి', 'Veyyi'], tr: ['Bin', 'BEEN'], ta: ['ஆயிரம்', 'Aayiram'], vi: ['Một nghìn', 'moht ngeen']
    })
  },
  {
    id: 39, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Million', 'MIL-yun'], zh: ['百万', 'Bǎiwàn'], hi: ['दस लाख / मिलियन', 'Das Lakh'], es: ['Millón', 'mee-YOHN'], fr: ['Million', 'mee-LYOHN'],
      ar: ['مليون', 'Milyoon'], bn: ['মিলিয়ন', 'Million'], pt: ['Milhão', 'mee-LYOWNG'], ru: ['Миллион', 'meel-lee-OHN'], ur: ['ملین / دس لاکھ', 'Million'],
      id: ['Juta', 'JOO-tah'], de: ['Million', 'mil-YOHN'], ja: ['百万', 'Hyakuman'], pa: ['ਮਿਲੀਅਨ', 'Million'], sw: ['Milioni', 'mee-lee-OH-nee'],
      mr: ['दहा लाख', 'Daha Lakh'], te: ['మిలియన్', 'Million'], tr: ['Milyon', 'meel-YOHN'], ta: ['பத்து லட்சம்', 'Pathu Latcham'], vi: ['Triệu', 'tree-yoo']
    })
  },
  {
    id: 40, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Many / Much', 'MEN-ee / MUCH'], zh: ['很多', 'Hěn duō'], hi: ['बहुत', 'Bahut'], es: ['Mucho / Muchos', 'MOO-choh'], fr: ['Beaucoup', 'boh-KOO'],
      ar: ['كثير', 'Katheer'], bn: ['অনেক', 'Onek'], pt: ['Muito', 'MWEE-too'], ru: ['Много', 'MNOH-gah'], ur: ['بہت / زیادہ', 'Bahut / Zyada'],
      id: ['Banyak', 'BAHN-yahk'], de: ['Viel / Viele', 'FEEL'], ja: ['多い / たくさん', 'Takusan'], pa: ['ਬਹੁਤ', 'Bahut'], sw: ['Mingi / Sana', 'MEEN-gee'],
      mr: ['खूप', 'Khoop'], te: ['చాలా', 'Chaala'], tr: ['Çok', 'CHOHK'], ta: ['நிறைய', 'Niraiya'], vi: ['Nhiều', 'nyee-oo']
    })
  },
  {
    id: 41, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Few / Little', 'FYOO / LIT-ul'], zh: ['少 / 一些', 'Shǎo / Yīxiē'], hi: ['कम / थोड़ा', 'Kam / Thoda'], es: ['Poco / Pocos', 'POH-koh'], fr: ['Peu', 'PUH'],
      ar: ['قليل', 'Qaleel'], bn: ['কম / অল্প', 'Kom / Olpo'], pt: ['Pouco', 'POH-koo'], ru: ['Мало / Немного', 'MAH-lah'], ur: ['کم / تھوڑا', 'Kam / Thoda'],
      id: ['Sedikit', 'suh-DEE-keet'], de: ['Wenig / Ein wenig', 'VAY-nikh'], ja: ['少し', 'Sukoshi'], pa: ['ਥੋੜ੍ਹਾ', 'Thodha'], sw: ['Chache / Kidogo', 'kee-DOH-goh'],
      mr: ['कमी / थोडे', 'Kamee / Thode'], te: ['కొద్దిగా', 'Koddiga'], tr: ['Az', 'AHZ'], ta: ['கொஞ்சம்', 'Konjam'], vi: ['Ít', 'eet']
    })
  },
  {
    id: 42, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['All / Every', 'AWL'], zh: ['全部 / 所有', 'Quánbù / Suǒyǒu'], hi: ['सब / सभी', 'Sab / Sabhi'], es: ['Todo / Todos', 'TOH-doh'], fr: ['Tout / Tous', 'TOO'],
      ar: ['كل / الجميع', 'Kull / Al-jamee\''], bn: ['সব / সমস্ত', 'Shob'], pt: ['Tudo / Todos', 'TOO-doo'], ru: ['Все / Всё', 'VSYE / VSYOH'], ur: ['تمام / سب', 'Tamam / Sab'],
      id: ['Semua', 'suh-MOO-ah'], de: ['Alle / Alles', 'AH-leh'], ja: ['すべて', 'Subete'], pa: ['ਸਾਰੇ', 'Saare'], sw: ['Wote / Yote', 'WOH-teh'],
      mr: ['सर्व / सगळे', 'Sarva / Sagale'], te: ['అన్ని / అందరు', 'Anni / Andaru'], tr: ['Bütün / Hepsi', 'boo-TOON'], ta: ['அனைத்தும்', 'Anaithum'], vi: ['Tất cả', 'tuht kah']
    })
  },
  {
    id: 43, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['None / Nothing', 'NUN / NUTH-ing'], zh: ['没有 / 无', 'Méiyǒu / Wú'], hi: ['कोई नहीं / कुछ नहीं', 'Koi nahi / Kuch nahi'], es: ['Ninguno / Nada', 'neen-GOO-noh / NAH-dah'], fr: ['Aucun / Rien', 'oh-KUHN / RYAN'],
      ar: ['لا شيء / لا أحد', 'La shay\''], bn: ['কিছুই না', 'Kichhui na'], pt: ['Nenhum / Nada', 'nen-YOOM / NAH-dah'], ru: ['Ничего / Никто', 'Nee-cheh-VOH'], ur: ['کوئی نہیں / کچھ نہیں', 'Koi nahi / Kuch nahi'],
      id: ['Tidak ada', 'TEE-dahk AH-dah'], de: ['Keiner / Nichts', 'KY-ner / NIKHTS'], ja: ['何もない', 'Nanimo nai'], pa: ['ਕੋਈ ਨਹੀਂ', 'Koi nahi'], sw: ['Hakuna kitu', 'hah-KOO-nah KEE-too'],
      mr: ['काहीही नाही', 'Kahihi nahi'], te: ['ఏమీ లేదు', 'Emee ledu'], tr: ['Hiçbiri / Hiçbir şey', 'HEECH'], ta: ['எதுவும் இல்லை', 'Edhuvum illai'], vi: ['Không có gì', 'khong caw zee']
    })
  },
  {
    id: 44, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['More', 'MOR'], zh: ['更多', 'Gèng duō'], hi: ['और / अधिक', 'Aur / Adhik'], es: ['Más', 'MAHS'], fr: ['Plus', 'PLEW'],
      ar: ['المزيد / أكثر', 'Al-mazeed / Akthar'], bn: ['আরো / বেশি', 'Aro / Beshi'], pt: ['Mais', 'MYSH'], ru: ['Больше', 'BOHL-sheh'], ur: ['مزید / زیادہ', 'Mazeed / Zyada'],
      id: ['Lebih', 'luh-BEEH'], de: ['Mehr', 'MAYR'], ja: ['もっと / より多くの', 'Motto'], pa: ['ਹੋਰ', 'Hor'], sw: ['Zaidi', 'zah-EE-dee'],
      mr: ['अजून / अधिक', 'Ajoon / Adhik'], te: ['ఇంకా / ఎక్కువ', 'Inkaa / Ekkuva'], tr: ['Daha fazla', 'dah-HAH faz-LAH'], ta: ['மேலும்', 'Melum'], vi: ['Nhiều hơn / Thêm', 'nyee-oo hern']
    })
  },
  {
    id: 45, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Less', 'LES'], zh: ['更少', 'Gèng shǎo'], hi: ['कम', 'Kam'], es: ['Menos', 'MEH-nohs'], fr: ['Moins', 'MWAN'],
      ar: ['أقل', 'Aqall'], bn: ['কম', 'Kom'], pt: ['Menos', 'MEH-noosh'], ru: ['Меньше', 'MYEN-sheh'], ur: ['کم', 'Kam'],
      id: ['Kurang', 'KOO-rahng'], de: ['Weniger', 'VAY-nee-ger'], ja: ['より少なく', 'Yori sukunaku'], pa: ['ਘੱਟ', 'Ghatt'], sw: ['Chini / Pungufu', 'poo-NGOO-foo'],
      mr: ['कमी', 'Kamee'], te: ['తక్కువ', 'Takkuva'], tr: ['Daha az', 'dah-HAH ahz'], ta: ['குறைவாக', 'Kuraivaaga'], vi: ['Ít hơn', 'eet hern']
    })
  },
  {
    id: 46, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['First', 'FERST'], zh: ['第一', 'Dì yī'], hi: ['पहला', 'Pahla'], es: ['Primero', 'pree-MEH-roh'], fr: ['Premier', 'pruh-MYAY'],
      ar: ['الأول', 'Al-awwal'], bn: ['প্রথম', 'Prothom'], pt: ['Primeiro', 'pree-MAY-roo'], ru: ['Первый', 'PYEHR-vy'], ur: ['پہلا', 'Pehla'],
      id: ['Pertama', 'pair-TAH-mah'], de: ['Erste', 'AIR-steh'], ja: ['一番目 / 最初', 'Ichibanme'], pa: ['ਪਹਿਲਾ', 'Pahila'], sw: ['Kwanza', 'KWAHN-zah'],
      mr: ['पहिला', 'Pahila'], te: ['మొదటి', 'Modati'], tr: ['Birinci / İlk', 'bee-reen-JEE'], ta: ['முதல்', 'Mudhal'], vi: ['Đầu tiên / Thứ nhất', 'dow tyen']
    })
  },
  {
    id: 47, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Last', 'LAST'], zh: ['最后', 'Zuìhòu'], hi: ['अंतिम / आख़िरी', 'Antim / Aakhiri'], es: ['Último', 'OOL-tee-moh'], fr: ['Dernier', 'dair-NYAY'],
      ar: ['الأخير', 'Al-akheer'], bn: ['শেষ / অন্তিম', 'Shesh'], pt: ['Último', 'OOL-chee-moo'], ru: ['Последний', 'pah-SLYED-nee'], ur: ['آخری', 'Aakhri'],
      id: ['Terakhir', 'ter-AH-kheer'], de: ['Letzte', 'LETS-teh'], ja: ['最後', 'Saigo'], pa: ['ਆਖ਼ਰੀ', 'Aakhri'], sw: ['Mwisho', 'MWEE-shoh'],
      mr: ['शेवटचा', 'Shevatcha'], te: ['చివరి', 'Chivari'], tr: ['Son / Sonuncu', 'SOHN'], ta: ['கடைசி', 'Kadaisi'], vi: ['Cuối cùng', 'kwoy koong']
    })
  },
  {
    id: 48, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Half', 'HAF'], zh: ['一半', 'Yībàn'], hi: ['आधा', 'Aadha'], es: ['Mitad / Medio', 'mee-TAHD'], fr: ['Moitié / Demi', 'mwah-TYAY'],
      ar: ['نصف', 'Nisf'], bn: ['অর্ধেক', 'Ordhek'], pt: ['Metade / Meio', 'meh-TAH-jee'], ru: ['Половина', 'pah-lah-VEE-nah'], ur: ['آدھا', 'Aadha'],
      id: ['Setengah', 'suh-TENG-ah'], de: ['Hälfte / Halb', 'HEL-fteh'], ja: ['半分', 'Hanbun'], pa: ['ਅੱਧਾ', 'Addha'], sw: ['Nusu', 'NOO-soo'],
      mr: ['अर्धा', 'Ardha'], te: ['సగం', 'Sagam'], tr: ['Yarım / Buçuk', 'yah-RUHM'], ta: ['பாதி', 'Paadhi'], vi: ['Một nửa', 'moht noo-uh']
    })
  },
  {
    id: 49, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Big / Large', 'BIG'], zh: ['大', 'Dà'], hi: ['बड़ा', 'Bada'], es: ['Grande', 'GRAHN-deh'], fr: ['Grand', 'GRAHN'],
      ar: ['كبير', 'Kabeer'], bn: ['বড়', 'Boro'], pt: ['Grande', 'GRAHN-jee'], ru: ['Большой', 'bahl-SHOY'], ur: ['بڑا', 'Bada'],
      id: ['Besar', 'buh-SAHR'], de: ['Groß', 'GROHS'], ja: ['大きい', 'Ookii'], pa: ['ਵੱਡਾ', 'Vadda'], sw: ['Kubwa', 'KOOB-wah'],
      mr: ['मोठा', 'Motha'], te: ['పెద్ద', 'Pedda'], tr: ['Büyük', 'boo-YOOK'], ta: ['பெரிய', 'Periya'], vi: ['Lớn / To', 'lurn']
    })
  },
  {
    id: 50, category: 'Numbers & Quantity',
    translations: createTranslationMap({
      en: ['Small / Little', 'SMAWL'], zh: ['小', 'Xiǎo'], hi: ['छोटा', 'Chhota'], es: ['Pequeño', 'peh-KEH-nyoh'], fr: ['Petit', 'puh-TEE'],
      ar: ['صغير', 'Sagheer'], bn: ['ছোট', 'Chhoto'], pt: ['Pequeno', 'peh-KAY-noo'], ru: ['Маленький', 'MAH-lyen-kee'], ur: ['چھوٹا', 'Chhota'],
      id: ['Kecil', 'kuh-CHEEL'], de: ['Klein', 'KLYN'], ja: ['小さい', 'Chiisai'], pa: ['ਛੋਟਾ', 'Chhota'], sw: ['Ndogo', 'n-DOH-goh'],
      mr: ['लहान', 'Lahan'], te: ['చిన్న', 'Chinna'], tr: ['Küçük', 'koo-CHOOK'], ta: ['சிறிய', 'Siriya'], vi: ['Nhỏ / Bé', 'nyor']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 3. PEOPLE & FAMILY (51 - 70)
  // ─────────────────────────────────────────────────────────────
  {
    id: 51, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Person / Human', 'PER-sun'], zh: ['人', 'Rén'], hi: ['व्यक्ति / इंसान', 'Vyakti / Insaan'], es: ['Persona', 'pair-SOH-nah'], fr: ['Personne', 'pair-SUN'],
      ar: ['شخص / إنسان', 'Shakhs / Insaan'], bn: ['ব্যক্তি / মানুষ', 'Byakti / Manush'], pt: ['Pessoa', 'peh-SOH-ah'], ru: ['Человек', 'cheh-lah-VYEK'], ur: ['شخص / انسان', 'Shakhs / Insaan'],
      id: ['Orang', 'OH-rahng'], de: ['Person / Mensch', 'pair-ZOHN'], ja: ['人 (ひと)', 'Hito'], pa: ['ਵਿਅਕਤੀ / ਇਨਸਾਨ', 'Insaan'], sw: ['Mtu', 'M-too'],
      mr: ['व्यक्ती / माणूस', 'Vyakti / Manoos'], te: ['వ్యక్తి / మనిషి', 'Vyakti / Manishi'], tr: ['Kişi / İnsan', 'KEE-shee'], ta: ['நபர் / மனிதன்', 'Nabar / Manidhan'], vi: ['Người', 'ngwee']
    })
  },
  {
    id: 52, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Man', 'MAN'], zh: ['男人', 'Nánrén'], hi: ['पुरुष / आदमी', 'Purush / Aadmi'], es: ['Hombre', 'OHM-breh'], fr: ['Homme', 'UM'],
      ar: ['رجل', 'Rajul'], bn: ['পুরুষ / লোক', 'Purush'], pt: ['Homem', 'OH-mayn'], ru: ['Мужчина', 'moosh-CHEE-nah'], ur: ['آدمی / مرد', 'Aadmi / Mard'],
      id: ['Pria / Laki-laki', 'PREE-ah'], de: ['Mann', 'MAHN'], ja: ['男の人', 'Otoko no hito'], pa: ['ਆਦਮੀ', 'Aadmi'], sw: ['Mwanaume', 'mwah-nah-OO-meh'],
      mr: ['पुरुष / माणूस', 'Purush'], te: ['పురుషుడు / మనిషి', 'Purushudu'], tr: ['Adam / Erkek', 'ah-DAHM'], ta: ['ஆண்', 'Aan'], vi: ['Đàn ông', 'dahn ohng']
    })
  },
  {
    id: 53, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Woman', 'WOO-mun'], zh: ['女人', 'Nǚrén'], hi: ['महिला / औरत', 'Mahila / Aurat'], es: ['Mujer', 'moo-HAIR'], fr: ['Femme', 'FAHM'],
      ar: ['امرأة', 'Imra\'a'], bn: ['মহিলা / নারী', 'Mohila / Nari'], pt: ['Mulher', 'mool-YAIR'], ru: ['Женщина', 'ZHEN-shchee-nah'], ur: ['عورت / خاتون', 'Aurat / Khatoon'],
      id: ['Wanita / Perempuan', 'wah-NEE-tah'], de: ['Frau', 'FROW'], ja: ['女の人', 'Onna no hito'], pa: ['ਔਰਤ', 'Aurat'], sw: ['Mwanamke', 'mwah-NAHM-keh'],
      mr: ['स्त्री / महिला', 'Stree / Mahila'], te: ['మహిళ / స్త్రీ', 'Mahila / Stree'], tr: ['Kadın', 'kah-DUHN'], ta: ['பெண்', 'Pen'], vi: ['Phụ nữ', 'foo noo']
    })
  },
  {
    id: 54, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Child / Kid', 'CHYLD'], zh: ['孩子', 'Háizi'], hi: ['बच्चा', 'Bachha'], es: ['Niño / Niño', 'NEE-nyoh'], fr: ['Enfant', 'ahn-FAHN'],
      ar: ['طفل', 'Tifl'], bn: ['শিশু / বাচ্চা', 'Shishu / Bachha'], pt: ['Criança', 'kree-AHN-sah'], ru: ['Ребёнок', 'ryeh-BYOH-nahk'], ur: ['بچہ', 'Bachha'],
      id: ['Anak', 'AH-nahk'], de: ['Kind', 'KINT'], ja: ['子供 (こども)', 'Kodomo'], pa: ['ਬੱਚਾ', 'Bachha'], sw: ['Mtoto', 'm-TOH-toh'],
      mr: ['मूल / बाळ', 'Mool / Baal'], te: ['పిల్లవాడు / బిడ్డ', 'Pillavaadu'], tr: ['Çocuk', 'choh-JOOK'], ta: ['குழந்தை', 'Kuzhandhai'], vi: ['Đứa trẻ / Con nít', 'doo-uh treh']
    })
  },
  {
    id: 55, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Father / Dad', 'FAH-ther'], zh: ['父亲 / 爸爸', 'Fùqīn / Bàba'], hi: ['पिता / पापा', 'Pita / Papa'], es: ['Padre / Papá', 'PAH-dreh'], fr: ['Père / Papa', 'PAIR'],
      ar: ['أب / والدي', 'Ab / Walid'], bn: ['বাবা / পিতা', 'Baba / Pita'], pt: ['Pai', 'PYE'], ru: ['Отец / Папа', 'ah-TYETS'], ur: ['والد / ابا', 'Walid / Abba'],
      id: ['Ayah / Bapak', 'AH-yah'], de: ['Vater / Papa', 'FAH-ter'], ja: ['お父さん / 父', 'Otousan'], pa: ['ਪਿਤਾ / ਬਾਪੂ', 'Pita / Baapu'], sw: ['Baba', 'BAH-bah'],
      mr: ['वडील / बाबा', 'Vadeel / Baba'], te: ['తండ్రి / నాన్న', 'Tandri / Naanna'], tr: ['Baba', 'bah-BAH'], ta: ['தந்தை / அப்பா', 'Thandhai / Appa'], vi: ['Cha / Bố', 'chah / boh']
    })
  },
  {
    id: 56, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Mother / Mom', 'MUH-ther'], zh: ['母亲 / 妈妈', 'Mǔqīn / Māma'], hi: ['माता / माँ', 'Mata / Maa'], es: ['Madre / Mamá', 'MAH-dreh'], fr: ['Mère / Maman', 'MAIR'],
      ar: ['أم / والدتي', 'Umm / Walidati'], bn: ['মা / মাতা', 'Maa / Mata'], pt: ['Mãe', 'MYNG'], ru: ['Мать / Мама', 'MAHT'], ur: ['والدہ / امی', 'Walidah / Ammi'],
      id: ['Ibu / Mama', 'EE-boo'], de: ['Mutter / Mama', 'MOOT-ter'], ja: ['お母さん / 母', 'Okaasan'], pa: ['ਮਾਤਾ / ਮਾਂ', 'Mata / Maa'], sw: ['Mama', 'MAH-mah'],
      mr: ['आई', 'Aai'], te: ['తల్లి / అమ్మ', 'Talli / Amma'], tr: ['Anne', 'ahn-NEH'], ta: ['தாய் / அம்மா', 'Thaai / Amma'], vi: ['Mẹ / Má', 'meh / mah']
    })
  },
  {
    id: 57, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Brother', 'BRUH-ther'], zh: ['兄弟 / 哥哥 / 弟弟', 'Xiōngdì'], hi: ['भाई', 'Bhai'], es: ['Hermano', 'air-MAH-noh'], fr: ['Frère', 'FRAIR'],
      ar: ['أخ', 'Akh'], bn: ['ভাই', 'Bhai'], pt: ['Irmão', 'eer-MOWNG'], ru: ['Брат', 'BRAHT'], ur: ['بھائی', 'Bhai'],
      id: ['Saudara laki-laki', 'sow-DAH-rah'], de: ['Bruder', 'BROO-der'], ja: ['兄弟 / 兄 / 弟', 'Kyoudai'], pa: ['ਭਰਾ', 'Bhra'], sw: ['Kaka / Ndugu', 'KAH-kah'],
      mr: ['भाऊ', 'Bhau'], te: ['సోదరుడు / అన్న / తమ్ముడు', 'Sodarudu'], tr: ['Erkek kardeş', 'kahr-DESH'], ta: ['சகோதரன் / அண்ணன்', 'Sagodharan'], vi: ['Anh trai / Em trai', 'ahn try']
    })
  },
  {
    id: 58, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Sister', 'SIS-ter'], zh: ['姐妹 / 姐姐 / 妹妹', 'Jiěmèi'], hi: ['बहन', 'Behan'], es: ['Hermana', 'air-MAH-nah'], fr: ['Sœur', 'SUHR'],
      ar: ['أخت', 'Ukht'], bn: ['বোন', 'Bon'], pt: ['Irmã', 'eer-MAHNG'], ru: ['Сестра', 'sye-STRAH'], ur: ['بہن', 'Behan'],
      id: ['Saudara perempuan', 'sow-DAH-rah'], de: ['Schwester', 'SHVES-ter'], ja: ['姉妹 / 姉 / 妹', 'Shimai'], pa: ['ਭੈਣ', 'Bhain'], sw: ['Dada', 'DAH-dah'],
      mr: ['बहीण', 'Baheen'], te: ['సోదరి / అక్క / చెల్లెలు', 'Sodari'], tr: ['Kız kardeş', 'kuhz kahr-DESH'], ta: ['சகோதரி / அக்கா', 'Sagodhari'], vi: ['Chị gái / Em gái', 'chee guy']
    })
  },
  {
    id: 59, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Son', 'SUN'], zh: ['儿子', 'Érzi'], hi: ['बेटा / पुत्र', 'Beta / Putra'], es: ['Hijo', 'EE-hoh'], fr: ['Fils', 'FEES'],
      ar: ['ابن', 'Ibn'], bn: ['ছেলে / পুত্র', 'Chhele / Putro'], pt: ['Filho', 'FEEL-yoo'], ru: ['Сын', 'SYN'], ur: ['بیٹا / فرزند', 'Beta / Farzand'],
      id: ['Anak laki-laki', 'AH-nahk'], de: ['Sohn', 'ZOHN'], ja: ['息子 (むすこ)', 'Musuko'], pa: ['ਪੁੱਤਰ / ਬੇਟਾ', 'Puttar'], sw: ['Mwanaume / Mwana', 'MWAH-nah'],
      mr: ['मुलगा / पुत्र', 'Mulga / Putra'], te: ['కుమారుడు / కొడుకు', 'Kumaarudu'], tr: ['Oğul', 'oh-OOL'], ta: ['மகன்', 'Magan'], vi: ['Con trai', 'con try']
    })
  },
  {
    id: 60, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Daughter', 'DAW-ter'], zh: ['女儿', 'Nǚ\'ér'], hi: ['बेटी / पुत्री', 'Beti / Putri'], es: ['Hija', 'EE-hah'], fr: ['Fille', 'FEEL-yuh'],
      ar: ['ابنة', 'Ibna'], bn: ['মেয়ে / কন্যা', 'Meye / Konna'], pt: ['Filha', 'FEEL-yah'], ru: ['Дочь', 'DOCH'], ur: ['بیٹی / دختر', 'Beti / Dukhtar'],
      id: ['Anak perempuan', 'AH-nahk'], de: ['Tochter', 'TOKH-ter'], ja: ['娘 (むすめ)', 'Musume'], pa: ['ਧੀ / ਬੇਟੀ', 'Dhee'], sw: ['Binti / Mwana', 'BEEN-tee'],
      mr: ['मुलगी / कन्या', 'Mulgi / Kanya'], te: ['కుమార్తె / కూతురు', 'Kumaarthe'], tr: ['Kız', 'KUUZ'], ta: ['மகள்', 'Magal'], vi: ['Con gái', 'con guy']
    })
  },
  {
    id: 61, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Husband', 'HUZ-bund'], zh: ['丈夫', 'Zhàngfu'], hi: ['पति', 'Pati'], es: ['Esposo / Marido', 'es-POH-soh'], fr: ['Mari / Époux', 'mah-REE'],
      ar: ['زوج', 'Zawj'], bn: ['স্বামী', 'Swami'], pt: ['Marido / Esposo', 'mah-REE-doo'], ru: ['Муж', 'MOOZH'], ur: ['شوہر', 'Shohar'],
      id: ['Suami', 'soo-AH-mee'], de: ['Ehemann', 'AY-heh-mahn'], ja: ['夫 / 旦那', 'Otto / Danna'], pa: ['ਪਤੀ / ਘਰਵਾਲਾ', 'Pati'], sw: ['Mume', 'MOO-meh'],
      mr: ['पती / नवरा', 'Pati / Navra'], te: ['భర్త', 'Bhartha'], tr: ['Koca / Eş', 'koh-JAH'], ta: ['கணவன்', 'Kanavan'], vi: ['Chồng', 'chawng']
    })
  },
  {
    id: 62, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Wife', 'WYFE'], zh: ['妻子', 'Qīzi'], hi: ['पत्नी', 'Patni'], es: ['Esposa / Mujer', 'es-POH-sah'], fr: ['Femme / Épouse', 'FAHM'],
      ar: ['زوجة', 'Zawja'], bn: ['স্ত্রী / পত্নী', 'Stree / Potni'], pt: ['Esposa / Mulher', 'esh-POH-sah'], ru: ['Жена', 'zheh-NAH'], ur: ['بیوی / اہلیہ', 'Biwi / Ahliyah'],
      id: ['Istri', 'EES-tree'], de: ['Ehefrau', 'AY-heh-frow'], ja: ['妻 / 奥さん', 'Tsuma / Okusan'], pa: ['ਪਤਨੀ / ਘਰਵਾਲੀ', 'Patni'], sw: ['Mke', 'M-keh'],
      mr: ['पत्नी / बायको', 'Patni / Bayko'], te: ['భార్య', 'Bhaarya'], tr: ['Karı / Eş', 'kah-RUH'], ta: ['மனைவி', 'Manaivi'], vi: ['Vợ', 'vuh']
    })
  },
  {
    id: 63, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Family', 'FAM-uh-lee'], zh: ['家庭 / 家人', 'Jiātíng'], hi: ['परिवार', 'Parivaar'], es: ['Familia', 'fah-MEE-lyah'], fr: ['Famille', 'fah-MEE-yuh'],
      ar: ['عائلة / أسرة', 'A\'ila / Usra'], bn: ['পরিবার', 'Poribar'], pt: ['Família', 'fah-MEE-lyah'], ru: ['Семья', 'syem-YAH'], ur: ['خاندان / فیملی', 'Khandaan'],
      id: ['Keluarga', 'kuh-loo-AHR-gah'], de: ['Familie', 'fah-MEE-lee-eh'], ja: ['家族', 'Kazoku'], pa: ['ਪਰਿਵਾਰ', 'Parivaar'], sw: ['Familia', 'fah-MEE-lee-ah'],
      mr: ['कुटुंब / परिवार', 'Kutumb / Parivaar'], te: ['కుటుంబం', 'Kutumbam'], tr: ['Aile', 'ah-ee-LEH'], ta: ['குடும்பம்', 'Kudumbam'], vi: ['Gia đình', 'zah deen']
    })
  },
  {
    id: 64, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Teacher', 'TEE-cher'], zh: ['老师', 'Lǎoshī'], hi: ['शिक्षक / अध्यापक', 'Shikshak'], es: ['Profesor / Maestro', 'proh-feh-SOR'], fr: ['Professeur', 'proh-feh-SUHR'],
      ar: ['معلم / أستاذ', 'Mu\'allim / Ustaadh'], bn: ['শিক্ষক', 'Shikkhok'], pt: ['Professor', 'proh-feh-SOR'], ru: ['Учитель', 'oo-CHEE-tyel'], ur: ['استاد / معلم', 'Ustaad / Muallim'],
      id: ['Guru', 'GOO-roo'], de: ['Lehrer', 'LAY-rer'], ja: ['先生 (せんせい)', 'Sensei'], pa: ['ਅਧਿਆਪਕ', 'Adhiaapak'], sw: ['Mwalimu', 'mwah-LEE-moo'],
      mr: ['शिक्षक / गुरूजी', 'Shikshak'], te: ['ఉపాధ్యాయుడు / గురువు', 'Upaadhyaayudu'], tr: ['Öğretmen', 'oh-ret-MEN'], ta: ['ஆசிரியர்', 'Aasiriyar'], vi: ['Giáo viên / Thầy cô', 'zow vyen']
    })
  },
  {
    id: 65, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Student', 'STOO-dent'], zh: ['学生', 'Xuéshēng'], hi: ['छात्र / विद्यार्थी', 'Chhaatra / Vidyarthi'], es: ['Estudiante / Alumno', 'es-too-DYAHN-teh'], fr: ['Étudiant / Élève', 'ay-tew-DYAHN'],
      ar: ['طالب / تلميذ', 'Talib / Tilmeez'], bn: ['ছাত্র / শিক্ষার্থী', 'Chhatro'], pt: ['Estudante / Aluno', 'esh-too-DAHN-chee'], ru: ['Студент / Ученик', 'stoo-DYEHNT'], ur: ['طالب علم', 'Talib-e-Ilm'],
      id: ['Siswa / Mahasiswa', 'SEES-wah'], de: ['Student / Schüler', 'shtoo-DENT'], ja: ['学生 (がくせい)', 'Gakusei'], pa: ['ਵਿਦਿਆਰਥੀ', 'Vidyarthi'], sw: ['Mwanafunzi', 'mwah-nah-FOON-zee'],
      mr: ['विद्यार्थी', 'Vidyarthi'], te: ['విద్యార్థి', 'Vidyarthi'], tr: ['Öğrenci', 'oh-ren-JEE'], ta: ['மாணவர்', 'Maanavar'], vi: ['Học sinh / Sinh viên', 'hawk sin']
    })
  },
  {
    id: 66, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Doctor', 'DOK-ter'], zh: ['医生', 'Yīshēng'], hi: ['डॉक्टर / चिकित्सक', 'Doctor / Chikitsak'], es: ['Médico / Doctor', 'MEH-dee-koh'], fr: ['Médecin / Docteur', 'mayd-SAN'],
      ar: ['طبيب / دكتور', 'Tabeeb / Duktoor'], bn: ['ডাক্তার / চিকিৎসক', 'Doctor'], pt: ['Médico / Doutor', 'MEH-jee-koo'], ru: ['Врач / Доктор', 'VRAHCH'], ur: ['ڈاکٹر / طبیب', 'Doctor / Tabeeb'],
      id: ['Dokter', 'DOHK-ter'], de: ['Arzt / Doktor', 'AHRTS-t'], ja: ['医者 (いしゃ)', 'Isha'], pa: ['ਡਾਕਟਰ', 'Doctor'], sw: ['Daktari', 'dahk-TAH-ree'],
      mr: ['डॉक्टर / वैद्य', 'Doctor'], te: ['వైద్యుడు / డాక్టర్', 'Vaidyudu'], tr: ['Doktor / Hekim', 'dohk-TOR'], ta: ['மருத்துவர்', 'Maruthuvar'], vi: ['Bác sĩ', 'bahk see']
    })
  },
  {
    id: 67, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Name', 'NAYM'], zh: ['名字', 'Míngzi'], hi: ['नाम', 'Naam'], es: ['Nombre', 'NOHM-breh'], fr: ['Nom', 'NOHN'],
      ar: ['اسم', 'Ism'], bn: ['নাম', 'Naam'], pt: ['Nome', 'NOH-mee'], ru: ['Имя', 'EE-myah'], ur: ['نام', 'Naam'],
      id: ['Nama', 'NAH-mah'], de: ['Name', 'NAH-meh'], ja: ['名前 (なまえ)', 'Namae'], pa: ['ਨਾਮ', 'Naam'], sw: ['Jina', 'JEE-nah'],
      mr: ['नाव', 'Naav'], te: ['పేరు', 'Peru'], tr: ['İsim / Ad', 'ee-SEEM / AHD'], ta: ['பெயர்', 'Peyar'], vi: ['Tên', 'ten']
    })
  },
  {
    id: 68, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Boy', 'BOY'], zh: ['男孩', 'Nánhái'], hi: ['लड़का', 'Ladka'], es: ['Chico / Niño', 'CHEE-koh'], fr: ['Garçon', 'gar-SOHN'],
      ar: ['ولد / صبي', 'Walad'], bn: ['ছেলে / বালক', 'Chhele'], pt: ['Menino / Garoto', 'meh-NEE-noo'], ru: ['Мальчик', 'MAHL-cheek'], ur: ['لڑکا', 'Ladka'],
      id: ['Anak laki-laki', 'AH-nahk'], de: ['Junge', 'YOONG-eh'], ja: ['男の子', 'Otokonoko'], pa: ['ਮੁੰਡਾ', 'Munda'], sw: ['Mvulana', 'm-voo-LAH-nah'],
      mr: ['मुलगा', 'Mulga'], te: ['అబ్బాయి', 'Abbaayi'], tr: ['Erkek çocuk / Oğlan', 'oh-LAHN'], ta: ['சிறுவன்', 'Siruvan'], vi: ['Cậu bé', 'kow beh']
    })
  },
  {
    id: 69, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Girl', 'GERL'], zh: ['女孩', 'Nǚhái'], hi: ['लड़की', 'Ladki'], es: ['Chica / Niña', 'CHEE-kah'], fr: ['Fille', 'FEEL-yuh'],
      ar: ['بنت / فتاة', 'Bint / Fataat'], bn: ['মেয়ে / বালিকা', 'Meye'], pt: ['Menina / Garota', 'meh-NEE-nah'], ru: ['Девочка', 'DYEH-vahch-kah'], ur: ['لڑکی', 'Ladki'],
      id: ['Anak perempuan', 'AH-nahk'], de: ['Mädchen', 'MAYT-khen'], ja: ['女の子', 'Onnanoko'], pa: ['ਕੁੜੀ', 'Kudi'], sw: ['Msichana', 'm-see-CHAH-nah'],
      mr: ['मुलगी', 'Mulgi'], te: ['అమ్మాయి', 'Ammaayi'], tr: ['Kız çocuk', 'KUUZ'], ta: ['சிறுமி', 'Sirumi'], vi: ['Cô bé', 'coh beh']
    })
  },
  {
    id: 70, category: 'People & Family',
    translations: createTranslationMap({
      en: ['Baby / Infant', 'BAY-bee'], zh: ['婴儿 / 宝宝', 'Yīng\'ér / Bǎobao'], hi: ['शिशु / नन्हा बच्चा', 'Shishu'], es: ['Bebé', 'beh-BEH'], fr: ['Bébé', 'bay-BAY'],
      ar: ['رضيع / طفل صغير', 'Radee\' / Tifl'], bn: ['শিশু / বাচ্চা', 'Shishu'], pt: ['Bebê', 'beh-BEH'], ru: ['Младенец / Малыш', 'mlah-DYEH-nyets'], ur: ['شیر خوار بچہ / بے بی', 'Bachha'],
      id: ['Bayi', 'BAH-yee'], de: ['Baby / Säugling', 'BAY-bee'], ja: ['赤ちゃん (あかちゃん)', 'Akachan'], pa: ['ਬੱਚਾ', 'Bachha'], sw: ['Mtoto mchanga', 'm-CHAHN-gah'],
      mr: ['बाळ', 'Baal'], te: ['శిశువు / పసిబిడ్డ', 'Shishuvu'], tr: ['Bebek', 'beh-BEHK'], ta: ['குழந்தை', 'Kuzhandhai'], vi: ['Em bé / Trẻ sơ sinh', 'em beh']
    })
  }
];

module.exports = { VOCAB_BATCH_1 };
