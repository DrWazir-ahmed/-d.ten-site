const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_8 = [
  // ─────────────────────────────────────────────────────────────
  // 13. EDUCATION & LEARNING (301 - 325)
  // ─────────────────────────────────────────────────────────────
  {
    id: 301, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['School', 'SKOOL'], zh: ['学校', 'Xuéxiào'], hi: ['विद्यालय / स्कूल', 'School'], es: ['Escuela / Colegio', 'ehs-KWEH-lah'], fr: ['École', 'ay-KOHL'],
      ar: ['مدرسة', 'Madrasah'], bn: ['বিদ্যালয় / স্কুল', 'Biddaloy'], pt: ['Escola', 'ehs-KOH-lah'], ru: ['Школа', 'SHKOH-lah'], ur: ['اسکول / مدرسہ', 'School'],
      id: ['Sekolah', 'seh-KOH-lah'], de: ['Schule', 'SHOO-leh'], ja: ['学校 (がっこう)', 'Gakkou'], pa: ['ਸਕੂਲ', 'School'], sw: ['Shule', 'SHOO-leh'],
      mr: ['शाळा', 'Shaala'], te: ['పాఠశాల', 'Paathashaala'], tr: ['Okul', 'oh-KOOL'], ta: ['பள்ளி', 'Palli'], vi: ['Trường học', 'troo-ung hawk']
    })
  },
  {
    id: 302, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['University', 'yoo-ni-VER-si-tee'], zh: ['大学', 'Dàxué'], hi: ['विश्वविद्यालय', 'Vishwavidyalaya'], es: ['Universidad', 'oo-nee-vehr-see-DAHD'], fr: ['Université', 'ew-nee-vair-see-TAY'],
      ar: ['جامعة', 'Jami\'ah'], bn: ['বিশ্ববিদ্যালয়', 'Bish-shobiddaloy'], pt: ['Universidade', 'oo-nee-vehr-see-DAH-jee'], ru: ['Университет', 'oo-nee-vyehr-see-TYEHT'], ur: ['جامعہ / یونیورسٹی', 'University'],
      id: ['Universitas', 'oo-nee-vehr-SEE-tahs'], de: ['Universität', 'oo-nee-vehr-zee-TAYT'], ja: ['大学 (だいがく)', 'Daigaku'], pa: ['ਯੂਨੀਵਰਸਿਟੀ', 'University'], sw: ['Chuo kikuu', 'CHOH-oh kee-KOO'],
      mr: ['विद्यापीठ', 'Vidyapeeth'], te: ['విశ్వవిద్యాలయం', 'Vishwavidyaalayam'], tr: ['Üniversite', 'oo-nee-vehr-see-TEH'], ta: ['பல்கலைக்கழகம்', 'Palkalaikkazhagam'], vi: ['Trường đại học', 'troo-ung dye hawk']
    })
  },
  {
    id: 303, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Teacher', 'TEE-cher'], zh: ['老师 / 教师', 'Lǎoshī'], hi: ['अध्यापक / शिक्षक', 'Shikshak'], es: ['Profesor / Maestro', 'proh-feh-SOHR'], fr: ['Enseignant / Professeur', 'ahn-sen-YAHN'],
      ar: ['معلم / أستاذ', 'Mu\'allim'], bn: ['শিক্ষক', 'Shikkhok'], pt: ['Professor(a)', 'proh-feh-SOHR'], ru: ['Учитель / Преподаватель', 'oo-CHEE-tyel'], ur: ['استاد / معلم', 'Ustaad'],
      id: ['Guru', 'GOO-roo'], de: ['Lehrer', 'LAY-rer'], ja: ['先生 / 教師 (せんせい)', 'Sensei'], pa: ['ਅਧਿਆਪਕ', 'Adhiaapak'], sw: ['Mwalimu', 'm-wah-LEE-moo'],
      mr: ['शिक्षक', 'Shikshak'], te: ['ఉపాధ్యాయుడు / గురువు', 'Upaadhyaayudu'], tr: ['Öğretmen', 'ur-reht-MEHN'], ta: ['ஆசிரியர்', 'Aasiriyar'], vi: ['Giáo viên / Thầy cô', 'zah-oh vee-en']
    })
  },
  {
    id: 304, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Student', 'STOO-dent'], zh: ['学生', 'Xuéshēng'], hi: ['छात्र / विद्यार्थी', 'Chhaatra'], es: ['Estudiante / Alumno', 'ehs-too-DYAHN-teh'], fr: ['Étudiant / Élève', 'ay-too-DYAHN'],
      ar: ['طالب / تلميذ', 'Talib'], bn: ['ছাত্র / শিক্ষার্থী', 'Chhatro'], pt: ['Estudante / Aluno', 'ehs-too-DAHN-chee'], ru: ['Студент / Ученик', 'stoo-DYEHNT'], ur: ['طالب علم', 'Taalib-e-Ilm'],
      id: ['Siswa / Mahasiswa', 'SEES-wah'], de: ['Student / Schüler', 'shtoo-DENT'], ja: ['学生 / 生徒 (がくせい)', 'Gakusei'], pa: ['ਵਿਦਿਆਰਥੀ', 'Vidiaarthi'], sw: ['Mwanafunzi', 'm-wah-nah-FOON-zee'],
      mr: ['विद्यार्थी', 'Vidyaarthi'], te: ['విద్యార్థి', 'Vidyaarthi'], tr: ['Öğrenci', 'ur-rehn-JEE'], ta: ['மாணவர்', 'Maanavar'], vi: ['Học sinh / Sinh viên', 'hawk sin']
    })
  },
  {
    id: 305, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Classroom', 'KLAS-room'], zh: ['教室', 'Jiàoshì'], hi: ['कक्षा / क्लासरूम', 'Kaksha'], es: ['Aula / Salón de clases', 'OW-lah'], fr: ['Salle de classe', 'SAHL duh KLAHS'],
      ar: ['فصل دراسي / صف', 'Fasl dirasee'], bn: ['শ্রেণিকক্ষ', 'Srenikokkho'], pt: ['Sala de aula', 'SAH-lah jee OW-lah'], ru: ['Класс / Аудитория', 'KLAHS'], ur: ['کلاس روم / کمرۂ جماعت', 'Classroom'],
      id: ['Ruang kelas', 'ROO-ahng'], de: ['Klassenzimmer', 'KLAHS-sen-tseem-mer'], ja: ['教室 (きょうしつ)', 'Kyoushitsu'], pa: ['ਜਮਾਤ ਦਾ ਕਮਰਾ', 'Jamat da kamra'], sw: ['Darasa', 'dah-RAH-sah'],
      mr: ['वर्गखोली', 'Vargakholi'], te: ['తరగతి గది', 'Tharagathi gadhi'], tr: ['Sınıf / Derslik', 'SUH-nuhf'], ta: ['வகுப்பறை', 'Vagupparai'], vi: ['Lớp học', 'luhp hawk']
    })
  },
  {
    id: 306, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Library', 'LYE-brer-ee'], zh: ['图书馆', 'Túshūguǎn'], hi: ['पुस्तकालय', 'Pustakaalaya'], es: ['Biblioteca', 'bee-blyoh-TEH-kah'], fr: ['Bibliothèque', 'bee-blee-oh-TEK'],
      ar: ['مكتبة', 'Maktabah'], bn: ['গ্রন্থাগার / লাইব্রেরি', 'Gronthagar'], pt: ['Biblioteca', 'bee-blyoh-TEH-kah'], ru: ['Библиотека', 'bee-blee-ah-TYEH-kah'], ur: ['کتب خانہ / لائبریری', 'Kutub Khana'],
      id: ['Perpustakaan', 'pehr-poos-tah-KAH-ahn'], de: ['Bibliothek', 'bee-blee-oh-TAYK'], ja: ['図書館 (としょかん)', 'Toshokan'], pa: ['ਲਾਇਬ੍ਰੇਰੀ', 'Library'], sw: ['Maktaba', 'mahk-TAH-bah'],
      mr: ['ग्रंथालय', 'Granthaalaya'], te: ['గ్రంథాలయం', 'Granthaalayam'], tr: ['Kütüphane', 'koo-toop-hah-NEH'], ta: ['நூலகம்', 'Noolagam'], vi: ['Thư viện', 'thoo vee-en']
    })
  },
  {
    id: 307, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Pen', 'PEN'], zh: ['钢笔 / 笔', 'Bǐ'], hi: ['कलम / पेन', 'Kalam'], es: ['Bolígrafo / Pluma', 'boh-LEE-grah-foh'], fr: ['Stylo', 'stee-LOH'],
      ar: ['قلم حبر', 'Qalam'], bn: ['কলম', 'Kolom'], pt: ['Caneta', 'kah-NAY-tah'], ru: ['Ручка (для письма)', 'ROOCH-kah'], ur: ['قلم / پین', 'Qalam'],
      id: ['Pulpen / Pena', 'POOL-pen'], de: ['Stift / Kugelschreiber', 'SHTIFT'], ja: ['ペン / ボールペン', 'Pen'], pa: ['ਕਲਮ / ਪੈੱਨ', 'Kalam'], sw: ['Kalamu', 'kah-LAH-moo'],
      mr: ['लेखणी / पेन', 'Pen'], te: ['కలము / పెన్ను', 'Kalamu'], tr: ['Tükenmez kalem', 'tew-kehn-MEHZ'], ta: ['பேனா', 'Pena'], vi: ['Bút mực', 'boot mook']
    })
  },
  {
    id: 308, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Pencil', 'PEN-sul'], zh: ['铅笔', 'Qiānbǐ'], hi: ['पेंसिल', 'Pencil'], es: ['Lápiz', 'LAH-pees'], fr: ['Crayon', 'kray-YOHN'],
      ar: ['قلم رصاص', 'Qalam rasas'], bn: ['পেন্সিল', 'Pencil'], pt: ['Lápis', 'LAH-pees'], ru: ['Карандаш', 'kah-rahn-DAHSH'], ur: ['پنسل', 'Pencil'],
      id: ['Pensil', 'PEHN-seel'], de: ['Bleistift', 'BLY-shtift'], ja: ['鉛筆 (えんぴつ)', 'Enpitsu'], pa: ['ਪੈਨਸਿਲ', 'Pencil'], sw: ['Penseli', 'pehn-SEH-lee'],
      mr: ['पेन्सिल', 'Pencil'], te: ['పెన్సిల్', 'Pencil'], tr: ['Kurşun kalem', 'koor-SHOON'], ta: ['பென்சில்', 'Pencil'], vi: ['Bút chì', 'boot chee']
    })
  },
  {
    id: 309, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Notebook', 'NOHT-book'], zh: ['笔记本', 'Bǐjìběn'], hi: ['कॉपी / नोटबुक', 'Notebook'], es: ['Cuaderno / Libreta', 'kwah-DEHR-noh'], fr: ['Cahier', 'kah-YAY'],
      ar: ['دفتر ملاحظات', 'Daftar'], bn: ['নোটবুক / খাতা', 'Khata'], pt: ['Caderno', 'kah-DEHR-noo'], ru: ['Тетрадь / Блокнот', 'teet-RAHDT'], ur: ['کاپی / نوٹ بک', 'Copy'],
      id: ['Buku catatan', 'BOO-koo'], de: ['Notizbuch', 'noh-TEETS-bookh'], ja: ['ノート (帳面)', 'Nooto'], pa: ['ਕਾਪੀ', 'Copy'], sw: ['Daftari', 'dahf-TAH-ree'],
      mr: ['वही / नोंदवही', 'Vahi'], te: ['నోట్‌బుక్', 'Notebook'], tr: ['Defter', 'def-TEHR'], ta: ['குறிப்பேடு', 'Kurippedu'], vi: ['Vở ghi chép', 'vuh zee chehp']
    })
  },
  {
    id: 310, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Dictionary', 'DIK-shun-er-ee'], zh: ['词典 / 字典', 'Cídiǎn'], hi: ['शब्दकोश', 'Shabdakosh'], es: ['Diccionario', 'deek-syoh-NAH-ryoh'], fr: ['Dictionnaire', 'deek-syoh-NAIR'],
      ar: ['قاموس / معجم', 'Qamoos'], bn: ['অভিধান', 'Obhidhan'], pt: ['Dicionário', 'jee-syoh-NAH-ryoo'], ru: ['Словарь', 'slah-VAHR'], ur: ['لغت / ڈکشنری', 'Lughat'],
      id: ['Kamus', 'KAH-moos'], de: ['Wörterbuch', 'VUR-ter-bookh'], ja: ['辞書 (じしょ)', 'Jisho'], pa: ['ਸ਼ਬਦ-ਕੋਸ਼', 'Shabad kosh'], sw: ['Kamusi', 'kah-MOO-see'],
      mr: ['शब्दकोश', 'Shabdakosh'], te: ['నిఘంటువు', 'Nighantuvu'], tr: ['Sözlük', 'surz-LOOK'], ta: ['அகராதி', 'Agaraadhi'], vi: ['Từ điển', 'too deey-en']
    })
  },
  {
    id: 311, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Exam / Test', 'eg-ZAM'], zh: ['考试 / 测验', 'Kǎoshì'], hi: ['परीक्षा / इम्तिहान', 'Pareeksha'], es: ['Examen / Prueba', 'ehk-SAH-men'], fr: ['Examen / Épreuve', 'eg-zah-MAN'],
      ar: ['امتحان / اختبار', 'Imtihan'], bn: ['পরীক্ষা', 'Porikkha'], pt: ['Exame / Prova', 'ehg-ZAH-mee'], ru: ['Экзамен / Тест', 'ehg-ZAH-myeen'], ur: ['امتحان / ٹیسٹ', 'Imtihaan'],
      id: ['Ujian / Tes', 'oo-JEE-ahn'], de: ['Prüfung / Examen', 'PREE-foong'], ja: ['試験 / テスト (しけん)', 'Shiken'], pa: ['ਇਮਤਿਹਾਨ / ਪ੍ਰੀਖਿਆ', 'Imtihaan'], sw: ['Mtihani', 'm-tee-HAH-nee'],
      mr: ['परीक्षा', 'Pareeksha'], te: ['పరీక్ష', 'Pareeksha'], tr: ['Sınav', 'suh-NAHV'], ta: ['தேர்வு', 'Thervu'], vi: ['Kỳ thi / Bài kiểm tra', 'kee thee']
    })
  },
  {
    id: 312, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Homework', 'HOHM-werk'], zh: ['家庭作业', 'Jiātíng zuòyè'], hi: ['गृहकार्य / होमवर्क', 'Grihakarya'], es: ['Deberes / Tarea', 'deh-BEH-rehs'], fr: ['Devoirs', 'duh-VWAHR'],
      ar: ['واجب منزلي', 'Wajib manzilee'], bn: ['বাড়ির কাজ / হোমওয়ার্ক', 'Barir kaaj'], pt: ['Lição de casa / Tarefa', 'lee-SOWN'], ru: ['Домашнее задание', 'dah-MAHSH-nyeh-yeh'], ur: ['گھر کا کام / ہوم ورک', 'Home work'],
      id: ['Pekerjaan rumah (PR)', 'peh-kehr-JAH-ahn'], de: ['Hausaufgaben', 'HOWS-owf-gah-ben'], ja: ['宿題 (しゅくだい)', 'Shukudai'], pa: ['ਘਰ ਦਾ ਕੰਮ', 'Ghar da kamm'], sw: ['Kazi ya nyumbani', 'KAH-zee'],
      mr: ['घरचा अभ्यास', 'Gharcha abhyaas'], te: ['ఇంటి పని / హోంవర్క్', 'Homework'], tr: ['Ev ödevi', 'EHV ur-deh-vee'], ta: ['வீட்டுப்பாடம்', 'Veettuppaadam'], vi: ['Bài tập về nhà', 'bye tuhp']
    })
  },
  {
    id: 313, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Knowledge', 'NOL-ij'], zh: ['知识', 'Zhīshi'], hi: ['ज्ञान / विद्या', 'Gyaan'], es: ['Conocimiento', 'koh-noh-see-MYEHN-toh'], fr: ['Connaissance / Savoir', 'koh-neh-SAHNS'],
      ar: ['معرفة / علم', 'Ma\'rifah'], bn: ['জ্ঞান', 'Gyaan'], pt: ['Conhecimento', 'kohn-yay-see-MAYN-too'], ru: ['Знание', 'ZNAH-nyee-yeh'], ur: ['علم / دانش', 'Ilm'],
      id: ['Pengetahuan', 'pehng-eh-TAH-hoo-ahn'], de: ['Wissen', 'VEES-sen'], ja: ['知識 (ちしき)', 'Chishiki'], pa: ['ਗਿਆਨ', 'Gyaan'], sw: ['Maarifa / Ujuzi', 'mah-ah-REE-fah'],
      mr: ['ज्ञान', 'Gyaan'], te: ['జ్ఞానం', 'Gnyaanam'], tr: ['Bilgi', 'beel-GEE'], ta: ['அறிவு / ஞானம்', 'Arivu'], vi: ['Kiến thức', 'keeyeng thook']
    })
  },
  {
    id: 314, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Science', 'SYE-uns'], zh: ['科学', 'Kēxué'], hi: ['विज्ञान', 'Vigyaan'], es: ['Ciencia', 'SYEHN-syah'], fr: ['Science', 'SYAHNS'],
      ar: ['علم / علوم', '\'Ilm / \'Uloom'], bn: ['বিজ্ঞান', 'Bigyaan'], pt: ['Ciência', 'see-AYN-syah'], ru: ['Наука', 'nah-OO-kah'], ur: ['سائنس', 'Science'],
      id: ['Ilmu pengetahuan / Sains', 'SAH-eens'], de: ['Wissenschaft', 'VEES-sen-shahft'], ja: ['科学 (かがく)', 'Kagaku'], pa: ['ਵਿਗਿਆਨ', 'Vigyaan'], sw: ['Sayansi', 'sah-YAHN-see'],
      mr: ['विज्ञान', 'Vigyaan'], te: ['సైన్స్ / విజ్ఞానశాస్త్రం', 'Science'], tr: ['Bilim', 'bee-LEEM'], ta: ['அறிவியல்', 'Ariviyal'], vi: ['Khoa học', 'khwah hawk']
    })
  },
  {
    id: 315, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Mathematics', 'math-uh-MAT-iks'], zh: ['数学', 'Shùxué'], hi: ['गणित', 'Ganit'], es: ['Matemáticas', 'mah-teh-MAH-tee-kahs'], fr: ['Mathématiques', 'mah-tay-mah-TEEK'],
      ar: ['رياضيات', 'Riyadiyyat'], bn: ['গণিত', 'Gonit'], pt: ['Matemática', 'mah-teh-MAH-chee-kah'], ru: ['Математика', 'mah-tyeh-MAH-tee-kah'], ur: ['ریاضی / حساب', 'Riazi'],
      id: ['Matematika', 'mah-teh-mah-TEE-kah'], de: ['Mathematik', 'mah-teh-mah-TEEK'], ja: ['数学 (すうがく)', 'Suugaku'], pa: ['ਹਿਸਾਬ / ਗਣਿਤ', 'Hisaab'], sw: ['Hisabati', 'hee-sah-BAH-tee'],
      mr: ['गणित', 'Ganit'], te: ['గణితం', 'Ganitham'], tr: ['Matematik', 'mah-teh-mah-TEEK'], ta: ['கணிதம்', 'Ganidham'], vi: ['Toán học', 'twahn hawk']
    })
  },
  {
    id: 316, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['History', 'HIS-tree'], zh: ['历史', 'Lìshǐ'], hi: ['इतिहास', 'Itihaas'], es: ['Historia', 'ees-TOH-ryah'], fr: ['Histoire', 'ees-TWAHR'],
      ar: ['تاريخ', 'Tareekh'], bn: ['ইতিহাস', 'Itihash'], pt: ['História', 'ees-TOH-ryah'], ru: ['История', 'ees-TOH-ree-yah'], ur: ['تاریخ', 'Tareekh'],
      id: ['Sejarah', 'seh-JAH-rah'], de: ['Geschichte', 'geh-SHEEKH-teh'], ja: ['歴史 (れきし)', 'Rekishi'], pa: ['ਇਤਿਹਾਸ', 'Itihaas'], sw: ['Historia', 'hee-stoh-REE-ah'],
      mr: ['इतिहास', 'Itihaas'], te: ['చరిత్ర', 'Charithra'], tr: ['Tarih', 'tah-REEH'], ta: ['வரலாறு', 'Varalaaru'], vi: ['Lịch sử', 'leech soo']
    })
  },
  {
    id: 317, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Geography', 'jee-OG-ruh-fee'], zh: ['地理', 'Dìlǐ'], hi: ['भूगोल', 'Bhoogol'], es: ['Geografía', 'heh-oh-grah-FEE-ah'], fr: ['Géographie', 'zhay-oh-grah-FEE'],
      ar: ['جغرافيا', 'Jughrafiya'], bn: ['ভূগোল', 'Bhoogol'], pt: ['Geografia', 'zheh-oh-grah-FEE-ah'], ru: ['География', 'gyeh-ah-GRAH-fee-yah'], ur: ['جغرافیہ', 'Jughrafia'],
      id: ['Geografi', 'geh-oh-GRAH-fee'], de: ['Geographie / Erdkunde', 'gay-oh-grah-FEE'], ja: ['地理 (ちり)', 'Chiri'], pa: ['ਭੂਗੋਲ', 'Bhoogol'], sw: ['Jiografia', 'jee-oh-GRAH-fee-ah'],
      mr: ['भूगोल', 'Bhoogol'], te: ['భూగోళశాస్త్రం', 'Bhoogolam'], tr: ['Coğrafya', 'joh-RAHF-yah'], ta: ['புவியியல்', 'Puviyiyal'], vi: ['Địa lý', 'deeyah lee']
    })
  },
  {
    id: 318, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Language', 'LANG-gwij'], zh: ['语言', 'Yǔyán'], hi: ['भाषा / ज़ुबान', 'Bhasha'], es: ['Idioma / Lengua', 'ee-DYOH-mah'], fr: ['Langue', 'LAHNG'],
      ar: ['لغة', 'Lughah'], bn: ['ভাষা', 'Bhasha'], pt: ['Idioma / Língua', 'ee-DYOH-mah'], ru: ['Язык (речь)', 'yeh-ZYK'], ur: ['زبان', 'Zubaan'],
      id: ['Bahasa', 'bah-HAH-sah'], de: ['Sprache', 'SHPRAH-kheh'], ja: ['言語 / 言葉 (げんご)', 'Gengo'], pa: ['ਭਾਸ਼ਾ / ਬੋਲੀ', 'Bhasha'], sw: ['Lugha', 'LOO-ghah'],
      mr: ['भाषा', 'Bhasha'], te: ['భాష', 'Bhasha'], tr: ['Dil / Lisan', 'DEEL'], ta: ['மொழி', 'Mozhi'], vi: ['Ngôn ngữ / Tiếng', 'ngon ngoo']
    })
  },
  {
    id: 319, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Question', 'KWES-chun'], zh: ['问题', 'Wèntí'], hi: ['प्रश्न / सवाल', 'Prashna'], es: ['Pregunta', 'preh-GOON-tah'], fr: ['Question', 'kes-TYOHN'],
      ar: ['سؤال', 'Su\'al'], bn: ['প্রশ্ন / সওয়াল', 'Proshno'], pt: ['Pergunta / Questão', 'pehr-GOON-tah'], ru: ['Вопрос', 'vah-PROHS'], ur: ['سوال', 'Sawaal'],
      id: ['Pertanyaan', 'pehr-tahn-YAH-ahn'], de: ['Frage', 'FRAH-geh'], ja: ['質問 (しつもん)', 'Shitsumon'], pa: ['ਸਵਾਲ / ਪ੍ਰਸ਼ਨ', 'Sawaal'], sw: ['Swali', 'SWAH-lee'],
      mr: ['प्रश्न', 'Prashna'], te: ['ప్రశ్న', 'Prashna'], tr: ['Soru', 'soh-ROO'], ta: ['கேள்வி', 'Kelvi'], vi: ['Câu hỏi', 'kow hoy']
    })
  },
  {
    id: 320, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Answer', 'AN-ser'], zh: ['答案 / 回答', 'Dá\'àn'], hi: ['उत्तर / जवाब', 'Uttar'], es: ['Respuesta', 'rehs-PWEHS-tah'], fr: ['Réponse', 'ray-POHNS'],
      ar: ['إجابة / جواب', 'Ijabah'], bn: ['উত্তর / জবাব', 'Uttor'], pt: ['Resposta', 'hehs-POHS-tah'], ru: ['Ответ', 'aht-VYEHT'], ur: ['جواب', 'Jawaab'],
      id: ['Jawaban', 'jah-WAH-bahn'], de: ['Antwort', 'AHNT-vort'], ja: ['答え (こたえ)', 'Kotae'], pa: ['ਜਵਾਬ / ਉੱਤਰ', 'Jawaab'], sw: ['Jibu', 'JEE-boo'],
      mr: ['उत्तर', 'Uttar'], te: ['సమాధానం', 'Samaadhaanam'], tr: ['Cevap / Yanıt', 'jeh-VAHP'], ta: ['பதில் / விடை', 'Badhil'], vi: ['Câu trả lời', 'kow chah luh-ee']
    })
  },
  {
    id: 321, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Rule / Law', 'ROOL'], zh: ['规则 / 规律', 'Guīzé'], hi: ['नियम / कानून', 'Niyam'], es: ['Regla / Norma', 'REH-glah'], fr: ['Règle / Loi', 'REG-luh'],
      ar: ['قاعدة / قانون', 'Qa\'idah'], bn: ['নিয়ম / কানুন', 'Niyom'], pt: ['Regra / Lei', 'HEH-grah'], ru: ['Правило / Закон', 'PRAH-vee-luh'], ur: ['قاعدہ / اصول / قانون', 'Qayeda'],
      id: ['Aturan / Kaidah', 'ah-TOO-rahn'], de: ['Regel', 'RAY-gel'], ja: ['規則 / ルール (きそく)', 'Kisoku'], pa: ['ਨਿਯਮ / ਕਾਨੂੰਨ', 'Niyam'], sw: ['Kanuni / Sheria', 'kah-NOO-nee'],
      mr: ['नियम', 'Niyam'], te: ['నియమం / చట్టం', 'Niyamam'], tr: ['Kural / Kanun', 'koo-RAHL'], ta: ['விதி / சட்டம்', 'Vidhi'], vi: ['Quy tắc / Luật', 'kwee tuhk']
    })
  },
  {
    id: 322, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Example', 'eg-ZAM-pul'], zh: ['例子 / 范例', 'Lìzi'], hi: ['उदाहरण / मिसाल', 'Udaaharan'], es: ['Ejemplo', 'eh-HEHM-ploh'], fr: ['Exemple', 'eg-ZAHN-pluh'],
      ar: ['مثال', 'Mithal'], bn: ['উদাহরণ / দৃষ্টান্ত', 'Udahoron'], pt: ['Exemplo', 'ehg-ZAYM-ploo'], ru: ['Пример', 'pree-MYEHR'], ur: ['مثال', 'Misaal'],
      id: ['Contoh', 'CHOHN-toh'], de: ['Beispiel', 'BY-shpeel'], ja: ['例 (れい / たとえ)', 'Rei'], pa: ['ਉਦਾਹਰਨ / ਮਿਸਾਲ', 'Udaaharan'], sw: ['Mfano', 'm-FAH-noh'],
      mr: ['उदाहरण', 'Udaaharan'], te: ['ఉదాహరణ', 'Udaaharana'], tr: ['Örnek / Misal', 'ur-NEHK'], ta: ['உதாரணம் / எடுத்துக்காட்டு', 'Udaaranam'], vi: ['Ví dụ', 'vee zoo']
    })
  },
  {
    id: 323, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Lesson', 'LES-n'], zh: ['课程 / 课', 'Kè'], hi: ['सबक / पाठ', 'Paath'], es: ['Lección / Clase', 'lehk-SYOHN'], fr: ['Leçon', 'luh-SOHN'],
      ar: ['درس', 'Dars'], bn: ['পাঠ / শিক্ষা', 'Paath'], pt: ['Lição / Aula', 'lee-SOWN'], ru: ['Урок', 'oo-ROHK'], ur: ['سبق / درس', 'Sabaq'],
      id: ['Pelajaran', 'peh-lah-JAH-rahn'], de: ['Lektion / Unterricht', 'lek-TSYOHN'], ja: ['授業 / レッスン (じゅぎょう)', 'Jugyou'], pa: ['ਸਬਕ / ਪਾਠ', 'Sabaq'], sw: ['Somo', 'SOH-moh'],
      mr: ['धडा / पाठ', 'Paath'], te: ['పాఠం', 'Paatham'], tr: ['Ders', 'DEHRS'], ta: ['பாடம்', 'Paadam'], vi: ['Bài học', 'bye hawk']
    })
  },
  {
    id: 324, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Diploma / Degree', 'dih-PLOH-muh'], zh: ['文凭 / 学位', 'Wénpíng'], hi: ['डिप्लोमा / उपाधि', 'Degree'], es: ['Diploma / Título', 'dee-PLOH-mah'], fr: ['Diplôme', 'dee-PLOHM'],
      ar: ['شهادة / دبلوم', 'Shahadah'], bn: ['সনদপত্র / ডিগ্রি', 'Degree'], pt: ['Diploma / Certificado', 'jee-PLOH-mah'], ru: ['Диплом', 'dee-PLOHM'], ur: ['ڈگری / سند', 'Sanad / Degree'],
      id: ['Ijazah / Diploma', 'ee-JAH-zah'], de: ['Diplom / Abschluss', 'dee-PLOHM'], ja: ['卒業証書 / 学位', 'Gakui'], pa: ['ਡਿਗਰੀ / ਸਨਦ', 'Degree'], sw: ['Stashahada / Shahada', 'shah-HAH-dah'],
      mr: ['पदवी / प्रमाणपत्र', 'Padvee'], te: ['డిగ్రీ / పట్టా', 'Degree'], tr: ['Diploma', 'deep-LOH-mah'], ta: ['பட்டயப்படிப்பு / பட்டம்', 'Pattam'], vi: ['Bằng cấp', 'buhng kuhp']
    })
  },
  {
    id: 325, category: 'Education & Learning',
    translations: createTranslationMap({
      en: ['Success', 'suk-SESS'], zh: ['成功', 'Chénggōng'], hi: ['सफलता / कामयाबी', 'Safalta'], es: ['Éxito', 'EHK-see-toh'], fr: ['Succès / Réussite', 'sook-SAY'],
      ar: ['نجاح', 'Najah'], bn: ['সাফল্য / কৃতকার্য', 'Shafolyo'], pt: ['Sucesso', 'soo-SEH-soo'], ru: ['Успех', 'oos-PYEKH'], ur: ['کامیابی / کامرانی', 'Kamyabi'],
      id: ['Keberhasilan / Sukses', 'sook-SEHS'], de: ['Erfolg', 'ehr-FOLK'], ja: ['成功 (せいこう)', 'Seikou'], pa: ['ਕਾਮਯਾਬੀ / ਸਫ਼ਲਤਾ', 'Kamyabi'], sw: ['Mafanikio', 'mah-fah-nee-KEE-oh'],
      mr: ['यश', 'Yash'], te: ['విజయం / సఫలత', 'Vijayam'], tr: ['Başarı', 'bah-shah-RUH'], ta: ['வெற்றி', 'Vetri'], vi: ['Thành công', 'thahnh kong']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 14. WORK & PROFESSIONS (326 - 350)
  // ─────────────────────────────────────────────────────────────
  {
    id: 326, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Job / Work', 'JOB'], zh: ['工作 / 职业', 'Gōngzuò'], hi: ['काम / नौकरी', 'Naukri'], es: ['Trabajo / Empleo', 'trah-BAH-hoh'], fr: ['Travail / Métier', 'trah-VYE'],
      ar: ['عمل / وظيفة', '\'Amal / Watheefah'], bn: ['কাজ / চাকরি', 'Chakri'], pt: ['Trabalho / Emprego', 'trah-BAHL-yoo'], ru: ['Работа / Труд', 'rah-BOH-tah'], ur: ['ملازمت / کام', 'Mulaazmat'],
      id: ['Pekerjaan / Kerja', 'peh-kehr-JAH-ahn'], de: ['Arbeit / Beruf', 'AHR-byte'], ja: ['仕事 / 職業 (しごと)', 'Shigoto'], pa: ['ਕੰਮ / ਨੌਕਰੀ', 'Naukri'], sw: ['Kazi', 'KAH-zee'],
      mr: ['नोकरी / काम', 'Naukri'], te: ['ఉద్యోగం / పని', 'Udhyogam'], tr: ['İş / Meslek', 'EESH'], ta: ['வேலை / தொழில்', 'Velai'], vi: ['Công việc', 'kong vee-ek']
    })
  },
  {
    id: 327, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Office', 'OF-is'], zh: ['办公室', 'Bàngōngshì'], hi: ['कार्यालय / दफ़्तर', 'Daftar'], es: ['Oficina', 'oh-fee-SEE-nah'], fr: ['Bureau', 'bew-ROH'],
      ar: ['مكتب', 'Maktab'], bn: ['দপ্তর / অফিস', 'Office'], pt: ['Escritório', 'ehs-kree-TOH-ryoo'], ru: ['Офис / Контора', 'OH-fees'], ur: ['دفتر / آفس', 'Daftar'],
      id: ['Kantor', 'KAHN-tohr'], de: ['Büro', 'bee-ROH'], ja: ['事務所 / オフィス (じむしょ)', 'Jimusho'], pa: ['ਦਫ਼ਤਰ', 'Daftar'], sw: ['Ofisi', 'oh-FEE-see'],
      mr: ['कार्यालय / कचेरी', 'Kaaryaalaya'], te: ['కార్యాలయం / ఆఫీస్', 'Kaaryaalayam'], tr: ['Ofis / Büro', 'oh-FEES'], ta: ['அலுவலகம்', 'Aluvalagam'], vi: ['Văn phòng', 'vuhn fawng']
    })
  },
  {
    id: 328, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Manager / Boss', 'MAN-i-jer'], zh: ['经理 / 老板', 'Jīnglǐ'], hi: ['प्रबंधक / मैनेजर', 'Manager'], es: ['Gerente / Jefe', 'heh-REHN-teh'], fr: ['Gérant / Patron', 'zhay-RAHN'],
      ar: ['مدير', 'Mudeer'], bn: ['ব্যবস্থাপক / ম্যানেজার', 'Manager'], pt: ['Gerente / Chefe', 'zheh-REHN-chee'], ru: ['Менеджер / Начальник', 'MYEHN-eh-dzheer'], ur: ['منیجر / نگران', 'Manager'],
      id: ['Manajer / Pimpinan', 'mah-NAH-jehr'], de: ['Manager / Chef', 'MAH-nah-zher'], ja: ['部長 / 支配人 (ぶちょう)', 'Buchou'], pa: ['ਮੈਨੇਜਰ', 'Manager'], sw: ['Meneja / Bosi', 'meh-NEH-jah'],
      mr: ['व्यवस्थापक', 'Vyavasthaapak'], te: ['మేనేజర్ / అధికారి', 'Manager'], tr: ['Müdür / Yönetici', 'moo-DOOR'], ta: ['மேலாளர்', 'Melaalar'], vi: ['Quản lý / Sếp', 'kwahn lee']
    })
  },
  {
    id: 329, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Doctor', 'DOK-ter'], zh: ['医生 / 大夫', 'Yīshēng'], hi: ['चिकित्सक / डॉक्टर', 'Doctor'], es: ['Médico / Doctor', 'MEH-dee-koh'], fr: ['Médecin / Docteur', 'mayd-SAN'],
      ar: ['طبيب / دكتور', 'Tabeeb'], bn: ['চিকিৎসক / ডাক্তার', 'Doctor'], pt: ['Médico(a) / Doutor', 'MEH-jee-koo'], ru: ['Врач / Доктор', 'VRAHCH'], ur: ['ڈاکٹر / طبیب', 'Doctor'],
      id: ['Dokter', 'DOHK-tehr'], de: ['Arzt / Ärztin', 'AHRTS'], ja: ['医師 / お医者さん (いし)', 'Isha'], pa: ['ਡਾਕਟਰ', 'Doctor'], sw: ['Daktari / Mganga', 'dahk-TAH-ree'],
      mr: ['डॉक्टर / वैद्य', 'Doctor'], te: ['వైద్యుడు / డాక్టర్', 'Vaidhyudu'], tr: ['Doktor / Hekim', 'dohk-TOHR'], ta: ['மருத்துவர்', 'Maruthuvar'], vi: ['Bác sĩ', 'bahk see']
    })
  },
  {
    id: 330, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Nurse', 'NERS'], zh: ['护士', 'Hùshi'], hi: ['परिचारिका / नर्स', 'Nurse'], es: ['Enfermero / Enfermera', 'en-fehr-MEH-roh'], fr: ['Infirmier / Infirmière', 'an-feer-MYAY'],
      ar: ['ممرض / ممرضة', 'Mumarrid'], bn: ['সেবিকা / নার্স', 'Nurse'], pt: ['Enfermeiro(a)', 'en-fehr-MAY-roo'], ru: ['Медсестра / Медбрат', 'myeht-syees-TRAH'], ur: ['نرس', 'Nurse'],
      id: ['Perawat', 'peh-RAH-waht'], de: ['Krankenpfleger / Krankenschwester', 'KRAHN-ken'], ja: ['看護師 (かんごし)', 'Kangoshi'], pa: ['ਨਰਸ', 'Nurse'], sw: ['Muuguzi', 'moo-oo-GOO-zee'],
      mr: ['परिचारिका / नर्स', 'Nurse'], te: ['నర్స్ / పరిచారిక', 'Nurse'], tr: ['Hemşire', 'hehm-shee-REH'], ta: ['செவிலியர்', 'Seviliyar'], vi: ['Y tá', 'ee tah']
    })
  },
  {
    id: 331, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Engineer', 'en-juh-NEER'], zh: ['工程师', 'Gōngchéngshī'], hi: ['अभियंता / इंजीनियर', 'Engineer'], es: ['Ingeniero / Ingeniera', 'een-heh-NYEH-roh'], fr: ['Ingénieur', 'an-zhay-NYUHR'],
      ar: ['مهندس', 'Muhandis'], bn: ['প্রকৌশলী / ইঞ্জিনিয়ার', 'Prokousholi'], pt: ['Engenheiro(a)', 'en-zhen-YAY-roo'], ru: ['Инженер', 'een-zheh-NYEHR'], ur: ['انجینئر', 'Engineer'],
      id: ['Insinyur / Teknisi', 'een-SEEN-yoor'], de: ['Ingenieur', 'een-zheh-NYUHR'], ja: ['技術者 / エンジニア', 'Gijutsusha'], pa: ['ਇੰਜੀਨੀਅਰ', 'Engineer'], sw: ['Mhandisi', 'm-hahn-DEE-see'],
      mr: ['अभियंता', 'Abhiyanta'], te: ['ఇంజనీర్', 'Engineer'], tr: ['Mühendis', 'moo-hehn-DEES'], ta: ['பொறியாளர்', 'Poriyaalar'], vi: ['Kỹ sư', 'kee soo']
    })
  },
  {
    id: 332, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Lawyer', 'LOY-er'], zh: ['律师', 'Lǜshī'], hi: ['वकील / अधिवक्ता', 'Vakeel'], es: ['Abogado / Abogada', 'ah-boh-GAH-doh'], fr: ['Avocat', 'ah-voh-KAH'],
      ar: ['محامٍ', 'Muhamin'], bn: ['আইনজীবী / উকিল', 'Ukil'], pt: ['Advogado(a)', 'ahd-voh-GAH-doo'], ru: ['Юрист / Адвокат', 'yoo-REEST'], ur: ['وکیل', 'Vakeel'],
      id: ['Pengacara / Advokat', 'pehng-ah-CHAH-rah'], de: ['Rechtsanwalt', 'REKHTS-ahn-vahlt'], ja: ['弁護士 (べんごし)', 'Bengoshi'], pa: ['ਵਕੀਲ', 'Vakeel'], sw: ['Wakili', 'wah-KEE-lee'],
      mr: ['वकील', 'Vakeel'], te: ['న్యాయవాది / లాయర్', 'Nyaayavaadhi'], tr: ['Avukat', 'ah-voo-KAHT'], ta: ['வழக்கறிஞர்', 'Vazhakkaringar'], vi: ['Luật sư', 'loo-uht soo']
    })
  },
  {
    id: 333, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Police Officer', 'poh-LEES OF-i-ser'], zh: ['警察 / 警官', 'Jǐngchá'], hi: ['पुलिस अधिकारी', 'Police afsar'], es: ['Oficial de policía', 'oh-fee-SYAHL'], fr: ['Policier / Agent de police', 'poh-lee-SYAY'],
      ar: ['شرطي / ضابط شرطة', 'Shurtiyy'], bn: ['পুলিশ কর্মকর্তা', 'Police'], pt: ['Policial', 'poh-lee-SYAHL'], ru: ['Полицейский', 'pah-lee-TSAY-skee'], ur: ['پولیس اہلکار', 'Police'],
      id: ['Polisi', 'poh-LEE-see'], de: ['Polizist / Polizistin', 'poh-lee-TSEEST'], ja: ['警察官 (けいさつかん)', 'Keisatsukan'], pa: ['ਪੁਲਿਸ ਅਫ਼ਸਰ', 'Police'], sw: ['Afisa wa polisi', 'ah-FEE-sah'],
      mr: ['पोलीस अधिकारी', 'Police'], te: ['పోలీస్ అధికారి', 'Police'], tr: ['Polis memuru', 'poh-LEES'], ta: ['காவல்துறை அதிகாரி', 'Kaavalthurai'], vi: ['Cảnh sát', 'kahnh suht']
    })
  },
  {
    id: 334, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Driver', 'DRY-ver'], zh: ['司机', 'Sījī'], hi: ['चालक / ड्राइवर', 'Driver'], es: ['Conductor / Chofer', 'kohn-dook-TOHR'], fr: ['Chauffeur / Conducteur', 'shoh-FUHR'],
      ar: ['سائق', 'Sa\'iq'], bn: ['চালক / ড্রাইভার', 'Driver'], pt: ['Motorista', 'moh-toh-REES-tah'], ru: ['Водитель / Шофер', 'vah-DEE-tyel'], ur: ['ڈرائیور / گاڑی بان', 'Driver'],
      id: ['Pengemudi / Sopir', 'SOH-peer'], de: ['Fahrer', 'FAH-rer'], ja: ['運転手 (うんてんしゅ)', 'Untenshu'], pa: ['ਡਰਾਈਵਰ', 'Driver'], sw: ['Dereva', 'deh-REH-vah'],
      mr: ['चालक / ड्रायव्हर', 'Driver'], te: ['డ్రైవర్ / నడుపువాడు', 'Driver'], tr: ['Şoför / Sürücü', 'shoh-FUR'], ta: ['ஓட்டுநர்', 'Ottunar'], vi: ['Tài xế / Người lái xe', 'tye seh']
    })
  },
  {
    id: 335, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Chef / Cook', 'SHEF'], zh: ['厨师', 'Chúshī'], hi: ['रसोइया / शेफ', 'Rasoiya'], es: ['Cocinero / Chef', 'koh-see-NEH-roh'], fr: ['Cuisinier / Chef', 'kwee-zee-NYAY'],
      ar: ['طاهٍ / طباخ', 'Tabbakh'], bn: ['বাবুর্চি / রাঁধুনি', 'Baburchi'], pt: ['Cozinheiro(a) / Chef', 'koh-zeen-YAY-roo'], ru: ['Повар / Шеф-повар', 'POH-vahr'], ur: ['باورچی / شیف', 'Bawarchi'],
      id: ['Koki / Juru masak', 'KOH-kee'], de: ['Koch / Köchin', 'KOKH'], ja: ['料理人 / シェフ (りょうりにん)', 'Ryourinin'], pa: ['ਰਸੋਈਆ / ਬਾਵਰਚੀ', 'Rasoiya'], sw: ['Mpishi', 'm-PEE-shee'],
      mr: ['आचारी / शेफ', 'Aachaari'], te: ['వంటమనిషి / చెఫ్', 'Vantamani'], tr: ['Aşçı / Şef', 'ahsh-CHUH'], ta: ['சமையல்காரர்', 'Samaiyalkaarar'], vi: ['Đầu bếp', 'dow bep']
    })
  },
  {
    id: 336, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Worker / Employee', 'WER-ker'], zh: ['工人 / 员工', 'Gōngrén'], hi: ['कर्मचारी / मज़दूर', 'Karmachari'], es: ['Trabajador / Empleado', 'trah-bah-hah-DOHR'], fr: ['Travailleur / Employé', 'trah-vye-YUHR'],
      ar: ['عامل / موظف', '\'Amil / Muwathaf'], bn: ['কর্মী / কর্মচারী', 'Kormi'], pt: ['Trabalhador / Funcionário', 'trah-bahl-yah-DOHR'], ru: ['Рабочий / Сотрудник', 'rah-BOH-chee'], ur: ['ملازم / کارکن', 'Mulazim'],
      id: ['Pekerja / Karyawan', 'peh-KEHR-jah'], de: ['Arbeiter / Angestellter', 'AHR-byte-er'], ja: ['労働者 / 従業員', 'Roudousha'], pa: ['ਕਰਮਚਾਰੀ / ਮਜ਼ਦੂਰ', 'Karmachari'], sw: ['Mfanyakazi', 'm-fah-nyah-KAH-zee'],
      mr: ['कामगार / कर्मचारी', 'Kaamgaar'], te: ['కార్మికుడు / ఉద్యోగి', 'Kaarmikudu'], tr: ['İşçi / Çalışan', 'eesh-CHEE'], ta: ['தொழிலாளி / ஊழியர்', 'Thozhilaali'], vi: ['Công nhân / Nhân viên', 'kong nyuhn']
    })
  },
  {
    id: 337, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Farmer', 'FAR-mer'], zh: ['农民', 'Nóngmín'], hi: ['किसान / कृषक', 'Kisaan'], es: ['Granjero / Agricultor', 'grahn-HEH-roh'], fr: ['Agriculteur / Fermier', 'ah-gree-kool-TUHR'],
      ar: ['مزارع / فلاح', 'Muzari\''], bn: ['কৃষক / চাষী', 'Krishok'], pt: ['Fazendeiro / Agricultor', 'fah-zayn-DAY-roo'], ru: ['Фермер / Крестьянин', 'FYEHR-myeer'], ur: ['کسان / مزارع', 'Kisaan'],
      id: ['Petani', 'peh-TAH-nee'], de: ['Bauer / Landwirt', 'BOW-er'], ja: ['農家 / 農業従事者 (のうか)', 'Nouka'], pa: ['ਕਿਸਾਨ', 'Kisaan'], sw: ['Mkulima', 'm-koo-LEE-mah'],
      mr: ['शेतकरी', 'Shetkari'], te: ['రైతు / వ్యవసాయదారుడు', 'Raithu'], tr: ['Çiftçi', 'cheeft-CHEE'], ta: ['விவசாயி / உழவர்', 'Vivasayi'], vi: ['Nông dân', 'nowng zuhn']
    })
  },
  {
    id: 338, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Artist', 'AR-tist'], zh: ['艺术家 / 画家', 'Yìshùjiā'], hi: ['कलाकार', 'Kalakaar'], es: ['Artista', 'ahr-TEES-tah'], fr: ['Artiste', 'ahr-TEEST'],
      ar: ['فنان', 'Fannan'], bn: ['শিল্পী / চিত্রশিল্পী', 'Shilpi'], pt: ['Artista', 'ahr-CHEES-tah'], ru: ['Художник / Артист', 'khoo-DOHZH-neek'], ur: ['فنکار / آرٹسٹ', 'Fankaar'],
      id: ['Seniman / Artis', 'seh-NEE-mahn'], de: ['Künstler', 'KEENST-ler'], ja: ['芸術家 / アーティスト', 'Geijutsuka'], pa: ['ਕਲਾਕਾਰ', 'Kalakaar'], sw: ['Msanii', 'm-SAH-nee'],
      mr: ['कलाकार', 'Kalakaar'], te: ['కళాకారుడు', 'Kalaakaarudu'], tr: ['Sanatçı', 'sah-naht-CHUH'], ta: ['கலைஞர்', 'Kalaignar'], vi: ['Nghệ sĩ / Họa sĩ', 'ngeh see']
    })
  },
  {
    id: 339, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Musician', 'myoo-ZISH-un'], zh: ['音乐家', 'Yīnyuèjiā'], hi: ['संगीतकार', 'Sangeetkaar'], es: ['Músico', 'MOO-see-koh'], fr: ['Musicien', 'mew-zee-SYAN'],
      ar: ['موسيقي', 'Musiqiyy'], bn: ['সঙ্গীতশিল্পী', 'Shongeetshilpi'], pt: ['Músico(a)', 'MOO-zee-koo'], ru: ['Музыкант', 'moo-zy-KAHNT'], ur: ['موسیقار', 'Moseeqaar'],
      id: ['Musisi', 'moo-SEE-see'], de: ['Musiker', 'MOO-zee-ker'], ja: ['音楽家 / ミュージシャン', 'Ongakuka'], pa: ['ਸੰਗੀਤਕਾਰ', 'Sangeetkaar'], sw: ['Mwanamuziki', 'm-wah-nah-moo-ZEE-kee'],
      mr: ['संगीतकार', 'Sangeetkaar'], te: ['సంగీత విద్వాంసుడు', 'Sangeetha'], tr: ['Müzisyen', 'moo-zees-YEHN'], ta: ['இசைக்கலைஞர்', 'Isaikkalaignar'], vi: ['Nhạc sĩ / Nhạc công', 'nyahk see']
    })
  },
  {
    id: 340, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Writer / Author', 'RY-ter'], zh: ['作家 / 作者', 'Zuòjiā'], hi: ['लेखक', 'Lekhak'], es: ['Escritor / Autor', 'ehs-kree-TOHR'], fr: ['Écrivain / Auteur', 'ay-kree-VAN'],
      ar: ['كاتب / مؤلف', 'Katib'], bn: ['লেখক', 'Lekhok'], pt: ['Escritor(a) / Autor', 'ehs-kree-TOHR'], ru: ['Писатель / Автор', 'pee-SAH-tyel'], ur: ['مصنف / رائٹر', 'Musannif'],
      id: ['Penulis / Pengarang', 'peh-NOO-lees'], de: ['Schriftsteller / Autor', 'SHRIFT-shtel-ler'], ja: ['作家 / 著者 (さっか)', 'Sakka'], pa: ['ਲੇਖਕ', 'Lekhak'], sw: ['Mwandishi', 'm-wahn-DEE-shee'],
      mr: ['लेखक', 'Lekhak'], te: ['రచయిత', 'Rachayitha'], tr: ['Yazar', 'yah-ZAHR'], ta: ['எழுத்தாளர்', 'Ezhutthaalar'], vi: ['Nhà văn / Tác giả', 'nyah vuhn']
    })
  },
  {
    id: 341, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Salary / Wages', 'SAL-uh-ree'], zh: ['薪水 / 工资', 'Xīnshuǐ'], hi: ['वेतन / तनख्वाह', 'Tankhwah'], es: ['Salario / Sueldo', 'sah-LAH-ryoh'], fr: ['Salaire', 'sah-LAIR'],
      ar: ['راتب / أجر', 'Ratib'], bn: ['বেতন / পারিশ্রমিক', 'Beton'], pt: ['Salário', 'sah-LAH-ryoo'], ru: ['Зарплата / Оклад', 'zahr-PLAH-tah'], ur: ['تنخواہ / اجرت', 'Tankhwah'],
      id: ['Gaji / Upah', 'GAH-jee'], de: ['Gehalt / Lohn', 'geh-HAHLT'], ja: ['給料 / 給与 (きゅうりょう)', 'Kyuuryou'], pa: ['ਤਨਖ਼ਾਹ', 'Tankhwah'], sw: ['Mshahara', 'm-shah-HAH-rah'],
      mr: ['पगार / वेतन', 'Pagaar'], te: ['జీతం / వేతనం', 'Jeetham'], tr: ['Maaş / Ücret', 'mah-AHSH'], ta: ['சம்பளம் / ஊதியம்', 'Sambalam'], vi: ['Tiền lương', 'teeyeng loo-ung']
    })
  },
  {
    id: 342, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Company / Business', 'KUM-puh-nee'], zh: ['公司 / 企业', 'Gōngsī'], hi: ['कंपनी / व्यवसाय', 'Company'], es: ['Empresa / Compañía', 'em-PREH-sah'], fr: ['Entreprise / Société', 'ahn-truh-PREEZ'],
      ar: ['شركة', 'Sharikah'], bn: ['প্রতিষ্ঠান / কোম্পানি', 'Company'], pt: ['Empresa / Companhia', 'em-PREH-zah'], ru: ['Компания / Фирма', 'kahm-PAH-nee-yah'], ur: ['کمپنی / ادارہ', 'Company'],
      id: ['Perusahaan', 'peh-roo-sah-HAH-ahn'], de: ['Unternehmen / Firma', 'OON-tehr-nay-men'], ja: ['会社 / 企業 (かいしゃ)', 'Kaisha'], pa: ['ਕੰਪਨੀ / ਕਾਰੋਬਾਰ', 'Company'], sw: ['Kampuni', 'kahm-POO-nee'],
      mr: ['कंपनी / व्यवसाय', 'Company'], te: ['కంపెనీ / సంస్థ', 'Company'], tr: ['Şirket / Firma', 'sheer-KEHT'], ta: ['நிறுவனம்', 'Niruvanam'], vi: ['Công ty / Doanh nghiệp', 'kong tee']
    })
  },
  {
    id: 343, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Meeting', 'MEET-ing'], zh: ['会议 / 开会', 'Huìyì'], hi: ['बैठक / मीटिंग', 'Baithak'], es: ['Reunión', 'reh-oo-NYOHN'], fr: ['Réunion', 'ray-ew-NYOHN'],
      ar: ['اجتماع', 'Ijtima\''], bn: ['সভা / মিটিং', 'Shobha'], pt: ['Reunião', 'heh-oo-nee-OWN'], ru: ['Встреча / Собрание', 'VSTREH-chah'], ur: ['اجلاس / میٹنگ', 'Ijlaas'],
      id: ['Rapat / Pertemuan', 'RAH-paht'], de: ['Besprechung / Meeting', 'beh-SHPREKH-oong'], ja: ['会議 / ミーティング (かいぎ)', 'Kaigi'], pa: ['ਮੀਟਿੰਗ / ਇਕੱਠ', 'Meeting'], sw: ['Mkutano', 'm-koo-TAH-noh'],
      mr: ['बैठक / सभा', 'Baithak'], te: ['సమావేశం / మీటింగ్', 'Samaavesham'], tr: ['Toplantı', 'tohp-lahn-TUH'], ta: ['கூட்டம்', 'Koottam'], vi: ['Cuộc họp', 'kwok hawp']
    })
  },
  {
    id: 344, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Contract / Agreement', 'KON-trakt'], zh: ['合同 / 协议', 'Hétong'], hi: ['अनुबंध / समझौता', 'Samjhauta'], es: ['Contrato / Acuerdo', 'kohn-TRAH-toh'], fr: ['Contrat / Accord', 'kohn-TRAH'],
      ar: ['عقد / اتفاقية', '\'Aqd'], bn: ['চুক্তিপত্র', 'Chukti'], pt: ['Contrato / Acordo', 'kohn-TRAH-too'], ru: ['Договор / Контракт', 'dah-gah-VOHR'], ur: ['معاہدہ / کنٹریکٹ', 'Muahida'],
      id: ['Kontrak / Perjanjian', 'KOHN-trahk'], de: ['Vertrag', 'fehr-TRAHK'], ja: ['契約 / 協定 (けいやく)', 'Keiyaku'], pa: ['ਇਕਰਾਰਨਾਮਾ / ਸਮਝੌਤਾ', 'Samjhouta'], sw: ['Mkataba', 'm-kah-TAH-bah'],
      mr: ['करार / करारनामा', 'Karaar'], te: ['ఒప్పందం', 'Oppandham'], tr: ['Sözleşme / Kontrat', 'surz-lesh-MEH'], ta: ['ஒப்பந்தம்', 'Oppandham'], vi: ['Hợp đồng', 'huhp dawng']
    })
  },
  {
    id: 345, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Project', 'PROJ-ekt'], zh: ['项目 / 计划', 'Xiàngmù'], hi: ['परियोजना / प्रोजेक्ट', 'Project'], es: ['Proyecto', 'proh-YEHK-toh'], fr: ['Projet', 'proh-ZHAY'],
      ar: ['مشروع', 'Mashroo\''], bn: ['প্রকল্প / প্রজেক্ট', 'Prokolpo'], pt: ['Projeto', 'proh-ZHEH-too'], ru: ['Проект', 'prah-YEHKT'], ur: ['منصوبہ / پروجیکٹ', 'Mansooba'],
      id: ['Proyek', 'PROH-yek'], de: ['Projekt', 'proh-YEKT'], ja: ['事業 / プロジェクト (じぎょう)', 'Purojekuto'], pa: ['ਪ੍ਰੋਜੈਕਟ / ਯੋਜਨਾ', 'Project'], sw: ['Mradi', 'm-RAH-dee'],
      mr: ['प्रकल्प', 'Prakalpa'], te: ['ప్రాజెక్ట్', 'Project'], tr: ['Proje', 'proh-ZHEH'], ta: ['திட்டம்', 'Thittam'], vi: ['Dự án', 'zoo ahn']
    })
  },
  {
    id: 346, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Deadline', 'DED-lyne'], zh: ['截止日期', 'Jiézhǐ rìqī'], hi: ['अंतिम समय सीमा', 'Deadline'], es: ['Fecha límite', 'FEH-chah LEE-mee-teh'], fr: ['Date limite', 'DAHT lee-MEET'],
      ar: ['الموعد النهائي', 'Al-maw\'id an-niha\'ee'], bn: ['শেষ সময়সীমা', 'Deadline'], pt: ['Prazo final', 'PRAH-zoo fee-NAHL'], ru: ['Крайний срок (дедлайн)', 'KRY-nee SROHK'], ur: ['آخری تاریخ / ڈیڈ لائن', 'Deadline'],
      id: ['Batas waktu (tenggat)', 'BAH-tahs WAHK-too'], de: ['Frist / Stichtag', 'FRIST'], ja: ['締め切り (しめきり)', 'Shimekiri'], pa: ['ਆਖਰੀ ਤਾਰੀਖ', 'Aakhri tareekh'], sw: ['Tarehe ya mwisho', 'tah-REH-heh'],
      mr: ['शेवटची मुदत', 'Mudat'], te: ['చివరి గడువు', 'Gaduvu'], tr: ['Son teslim tarihi', 'SOHN tehs-LEEM'], ta: ['கடைசி தேதி', 'Kadaisi thedhi'], vi: ['Hạn chót', 'hahn chawt']
    })
  },
  {
    id: 347, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Customer / Client', 'KUS-tuh-mer'], zh: ['顾客 / 客户', 'Gùkè'], hi: ['ग्राहक', 'Graahak'], es: ['Cliente', 'klyEHN-teh'], fr: ['Client', 'klee-AHN'],
      ar: ['زبون / عميل', 'Zaboon'], bn: ['ক্রেতা / গ্রাহক', 'Grahok'], pt: ['Cliente', 'klee-EHN-chee'], ru: ['Клиент / Покупатель', 'klee-YEHNT'], ur: ['گاہک / کلائنٹ', 'Gaahak'],
      id: ['Pelanggan / Nasabah', 'peh-LAHNG-gahn'], de: ['Kunde / Kundin', 'KOON-deh'], ja: ['顧客 / お客様 (こきゃく)', 'Okyakusama'], pa: ['ਗਾਹਕ', 'Gaahak'], sw: ['Mteja', 'm-TEH-jah'],
      mr: ['ग्राहक', 'Graahak'], te: ['కస్టమర్ / వినియోగదారుడు', 'Customer'], tr: ['Müşteri', 'moosh-teh-REE'], ta: ['வாடிக்கையாளர்', 'Vaadikkaiyaalar'], vi: ['Khách hàng', 'khahch hahng']
    })
  },
  {
    id: 348, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Career', 'kuh-REER'], zh: ['职业生涯 / 事业', 'Shìyè'], hi: ['आजीविका / करियर', 'Career'], es: ['Carrera profesional', 'kah-RREH-rah'], fr: ['Carrière', 'kah-RYAIR'],
      ar: ['مسيرة مهنية', 'Maseerah mihniyyah'], bn: ['কর্মজীবন / পেশা', 'Career'], pt: ['Carreira', 'kah-HAY-rah'], ru: ['Карьера', 'kahr-YEH-rah'], ur: ['مستقبل / کیریئر', 'Career'],
      id: ['Karier', 'kah-ree-EHR'], de: ['Karriere / Laufbahn', 'kah-ree-EH-reh'], ja: ['経歴 / キャリア (けいれき)', 'Kyaria'], pa: ['ਕੈਰੀਅਰ', 'Career'], sw: ['Kazi ya maisha', 'KAH-zee'],
      mr: ['कारकीर्द', 'Kaarkeerd'], te: ['వృత్తి / కెరీర్', 'Career'], tr: ['Kariyer', 'kah-ree-YEHR'], ta: ['தொழில் வாழ்க்கை', 'Thozhil vaazhkai'], vi: ['Sự nghiệp', 'soo ngeeyep']
    })
  },
  {
    id: 349, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Interview (Job)', 'IN-ter-vyoo'], zh: ['面试', 'Miànshì'], hi: ['साक्षात्कार / इंटरव्यू', 'Interview'], es: ['Entrevista de trabajo', 'en-treh-VEES-tah'], fr: ['Entretien d\'embauche', 'ahn-truh-TYAN'],
      ar: ['مقابلة عمل', 'Muqabalat \'amal'], bn: ['চাকরির সাক্ষাৎকার', 'Interview'], pt: ['Entrevista de emprego', 'en-treh-VEES-tah'], ru: ['Собеседование', 'sah-bye-SYEH-dah-vah-nyee-yeh'], ur: ['انٹرویو', 'Interview'],
      id: ['Wawancara kerja', 'wah-wahn-CHAH-rah'], de: ['Vorstellungsgespräch', 'FOR-shtel-loongs'], ja: ['面接 (めんせつ)', 'Mensetsu'], pa: ['ਇੰਟਰਵਿਊ', 'Interview'], sw: ['Mahojiano ya kazi', 'mah-hoh-jee-AH-noh'],
      mr: ['मुलाखत', 'Mulaakhat'], te: ['ఇంటర్వ్యూ', 'Interview'], tr: ['İş görüşmesi / Mülakat', 'mew-lah-KAHT'], ta: ['நேர்காணல்', 'Nerkaanal'], vi: ['Phỏng vấn xin việc', 'fawng vuhn']
    })
  },
  {
    id: 350, category: 'Work & Professions',
    translations: createTranslationMap({
      en: ['Experience', 'ek-SPEER-ee-uns'], zh: ['经验', 'Jīngyàn'], hi: ['अनुभव / तजुर्बा', 'Anubhav'], es: ['Experiencia', 'ehks-peh-RYEHN-syah'], fr: ['Expérience', 'ex-pay-RYAHNS'],
      ar: ['خبرة', 'Khibrah'], bn: ['অভিজ্ঞতা', 'Obhiggota'], pt: ['Experiência', 'ehks-peh-ree-AYN-syah'], ru: ['Опыт работы', 'OH-pyt'], ur: ['تجربہ', 'Tajurba'],
      id: ['Pengalaman', 'pehng-ah-LAH-mahn'], de: ['Erfahrung', 'ehr-FAH-roong'], ja: ['経験 (けいけん)', 'Keiken'], pa: ['ਤਜ਼ਰਬਾ / ਅਨੁਭਵ', 'Tajurba'], sw: ['Uzoefu', 'oo-zoh-EH-foo'],
      mr: ['अनुभव', 'Anubhav'], te: ['అనుభవం', 'Anubhavam'], tr: ['Deneyim / Tecrübe', 'deh-neh-YEEM'], ta: ['அனுபவம்', 'Anubhavam'], vi: ['Kinh nghiệm', 'kinh ngeeyem']
    })
  }
];

module.exports = { VOCAB_BATCH_8 };
