const { createTranslationMap } = require('../generate_multilingual_data.cjs');

const VOCAB_BATCH_9 = [
  // ─────────────────────────────────────────────────────────────
  // 15. TECHNOLOGY & INTERNET (351 - 375)
  // ─────────────────────────────────────────────────────────────
  {
    id: 351, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Computer', 'kum-PYOO-ter'], zh: ['电脑 / 计算机', 'Diànnǎo'], hi: ['कंप्यूटर / संगणक', 'Computer'], es: ['Computadora / Ordenador', 'kohm-poo-tah-DOH-rah'], fr: ['Ordinateur', 'or-dee-nah-TUHR'],
      ar: ['حاسوب / كمبيوتر', 'Hasoob'], bn: ['কম্পিউটার', 'Computer'], pt: ['Computador', 'kohm-poo-tah-DOHR'], ru: ['Компьютер', 'kahm-PYOO-tyehr'], ur: ['کمپیوٹر', 'Computer'],
      id: ['Komputer', 'kohm-POO-tehr'], de: ['Computer / Rechner', 'kohm-PYOO-ter'], ja: ['パソコン / コンピュータ', 'Pasokon'], pa: ['ਕੰਪਿਊਟਰ', 'Computer'], sw: ['Kompyuta', 'kohm-PYOO-tah'],
      mr: ['संगणक / कॉम्प्युटर', 'Sanganak'], te: ['కంప్యూటర్ / గణక యంత్రం', 'Computer'], tr: ['Bilgisayar', 'beel-gee-sah-YAHR'], ta: ['கணினி', 'Kanini'], vi: ['Máy vi tính', 'mye vee tinh']
    })
  },
  {
    id: 352, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Smartphone / Mobile', 'SMART-fohn'], zh: ['智能手机', 'Zhìnéng shǒujī'], hi: ['मोबाइल फ़ोन', 'Mobile'], es: ['Teléfono móvil / Smartphone', 'teh-LEH-foh-noh'], fr: ['Téléphone portable', 'tay-lay-FOHN'],
      ar: ['هاتف ذكي / جوال', 'Hatif thakee'], bn: ['স্মার্টফোন / মোবাইল', 'Mobile'], pt: ['Celular / Smartphone', 'seh-loo-LAHR'], ru: ['Смартфон / Мобильный', 'smaahrt-FOHN'], ur: ['موبائل فون', 'Mobile phone'],
      id: ['Ponsel cerdas / HP', 'POHN-sehl'], de: ['Smartphone / Handy', 'SMAHRT-fohn'], ja: ['スマートフォン / スマホ', 'Sumaho'], pa: ['ਮੋਬਾਈਲ ਫੋਨ', 'Mobile'], sw: ['Simu janja', 'SEE-moo JAHN-jah'],
      mr: ['स्मार्टफोन / मोबाईल', 'Mobile'], te: ['స్మార్ట్‌ఫోన్ / మొబైల్', 'Mobile'], tr: ['Akıllı telefon', 'ah-kuhl-LUH'], ta: ['கைப்பேசி', 'Kaippesi'], vi: ['Điện thoại thông minh', 'deeyeng thwye']
    })
  },
  {
    id: 353, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Laptop', 'LAP-top'], zh: ['笔记本电脑', 'Bǐjìběn diànnǎo'], hi: ['लैपटॉप', 'Laptop'], es: ['Portátil / Laptop', 'por-TAH-teel'], fr: ['Ordinateur portable', 'or-dee-nah-TUHR'],
      ar: ['حاسوب محمول / لابتوب', 'Hasoob mahmool'], bn: ['ল্যাপটপ', 'Laptop'], pt: ['Notebook / Portátil', 'NOHT-book'], ru: ['Ноутбук', 'noh-oot-BOOK'], ur: ['لیپ ٹاپ', 'Laptop'],
      id: ['Laptop', 'LAHP-tohp'], de: ['Laptop / Notebook', 'LEHP-top'], ja: ['ノートパソコン', 'Nooto pasokon'], pa: ['ਲੈਪਟਾਪ', 'Laptop'], sw: ['Tarakilishi ya pajani', 'tah-rah-kee-LEE-shee'],
      mr: ['लॅपटॉप', 'Laptop'], te: ['ల్యాప్‌టాప్', 'Laptop'], tr: ['Dizüstü bilgisayar', 'deez-OOS-too'], ta: ['மடிக்கணினி', 'Madikkanini'], vi: ['Máy tính xách tay', 'mye tinh sahch tye']
    })
  },
  {
    id: 354, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Tablet', 'TAB-lit'], zh: ['平板电脑', 'Píngbǎn diànnǎo'], hi: ['टैबलेट', 'Tablet'], es: ['Tableta', 'tah-BLEH-tah'], fr: ['Tablette', 'tah-BLET'],
      ar: ['جهاز لوحي / تابلت', 'Jihaz lawhiyy'], bn: ['ট্যাবলেট', 'Tablet'], pt: ['Tablet', 'TAH-bleht'], ru: ['Планшет', 'plahn-SHEHT'], ur: ['ٹیبلٹ', 'Tablet'],
      id: ['Tablet', 'TAH-bleht'], de: ['Tablet', 'TEHB-let'], ja: ['タブレット', 'Taburetto'], pa: ['ਟੈਬਲੇਟ', 'Tablet'], sw: ['Kishikwambi', 'kee-shee-KWAHM-bee'],
      mr: ['टॅब्लेट', 'Tablet'], te: ['టాబ్లెట్', 'Tablet'], tr: ['Tablet', 'tahb-LEHT'], ta: ['கைக்கணினி / டேப்லெட்', 'Tablet'], vi: ['Máy tính bảng', 'mye tinh bahng']
    })
  },
  {
    id: 355, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Screen / Display', 'SKREEN'], zh: ['屏幕 / 显示屏', 'Píngmù'], hi: ['स्क्रीन / पर्दा', 'Screen'], es: ['Pantalla', 'pahn-TAH-yah'], fr: ['Écran', 'ay-KRAHN'],
      ar: ['شاشة', 'Shashah'], bn: ['পর্দা / স্ক্রিন', 'Screen'], pt: ['Tela / Ecrã', 'TAY-lah'], ru: ['Экран / Дисплей', 'eh-KRAHN'], ur: ['اسکرین / پردہ', 'Screen'],
      id: ['Layar', 'LAH-yahr'], de: ['Bildschirm', 'BEELT-sheerm'], ja: ['画面 / ディスプレイ (がめん)', 'Gamen'], pa: ['ਸਕ੍ਰੀਨ', 'Screen'], sw: ['Skrini / Kioo', 'SKREE-nee'],
      mr: ['स्क्रीन / पडदा', 'Screen'], te: ['స్క్రీన్ / తెర', 'Screen'], tr: ['Ekran', 'ehk-RAHN'], ta: ['திரை', 'Thirai'], vi: ['Màn hình', 'mahn hinh']
    })
  },
  {
    id: 356, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Keyboard', 'KEE-bord'], zh: ['键盘', 'Jiànpán'], hi: ['कीबोर्ड', 'Keyboard'], es: ['Teclado', 'teh-KLAH-doh'], fr: ['Clavier', 'klah-VYAY'],
      ar: ['لوحة المفاتيح', 'Lawhat al-mafateeh'], bn: ['কীবোর্ড', 'Keyboard'], pt: ['Teclado', 'teh-KLAH-doo'], ru: ['Клавиатура', 'klah-vee-ah-TOO-rah'], ur: ['کی بورڈ', 'Keyboard'],
      id: ['Papan tombol / Keyboard', 'KEE-bord'], de: ['Tastatur', 'tahs-tah-TOOR'], ja: ['キーボード', 'Kiiboodo'], pa: ['ਕੀ-ਬੋਰਡ', 'Keyboard'], sw: ['Kibodi', 'kee-BOH-dee'],
      mr: ['कळफलक / कीबोर्ड', 'Keyboard'], te: ['కీబోర్డు', 'Keyboard'], tr: ['Klavye', 'klahv-YEH'], ta: ['விசைப்பலகை', 'Visaippalagai'], vi: ['Bàn phím', 'bahn feem']
    })
  },
  {
    id: 357, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Mouse (Computer)', 'MOWS'], zh: ['鼠标', 'Shǔbiāo'], hi: ['माउस', 'Mouse'], es: ['Ratón / Mouse', 'rah-TOHN'], fr: ['Souris', 'soo-REE'],
      ar: ['فأرة الحاسوب', 'Fa\'rah'], bn: ['মাউস', 'Mouse'], pt: ['Mouse / Rato', 'MOW-see'], ru: ['Мышь (компьютерная)', 'MYSH'], ur: ['ماؤس', 'Mouse'],
      id: ['Tetikus / Mouse', 'teh-TEE-koos'], de: ['Maus', 'MOWS'], ja: ['マウス', 'Mausu'], pa: ['ਮਾਊਸ', 'Mouse'], sw: ['Kipanya', 'kee-PAHN-yah'],
      mr: ['माउस', 'Mouse'], te: ['మౌస్', 'Mouse'], tr: ['Fare', 'fah-REH'], ta: ['சுட்டி', 'Sutti'], vi: ['Chuột máy tính', 'chwot']
    })
  },
  {
    id: 358, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Internet', 'IN-ter-net'], zh: ['互联网 / 网络', 'Hùliánwǎng'], hi: ['इंटरनेट', 'Internet'], es: ['Internet', 'een-tehr-NEHT'], fr: ['Internet', 'an-tair-NET'],
      ar: ['إنترنت / الشبكة', 'Internet'], bn: ['ইন্টারনেট', 'Internet'], pt: ['Internet', 'een-tehr-NEH-chee'], ru: ['Интернет', 'een-tehr-NYEHT'], ur: ['انٹرنیٹ', 'Internet'],
      id: ['Internet', 'een-tehr-NEHT'], de: ['Internet', 'IN-ter-net'], ja: ['インターネット', 'Intaanetto'], pa: ['ਇੰਟਰਨੈੱਟ', 'Internet'], sw: ['Mtandao', 'm-tahn-DAH-oh'],
      mr: ['इंटरनेट', 'Internet'], te: ['ఇంటర్నెట్', 'Internet'], tr: ['İnternet', 'een-tehr-NEHT'], ta: ['இணையம்', 'Inaiyam'], vi: ['Mạng Internet', 'mahng']
    })
  },
  {
    id: 359, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Website', 'WEB-syte'], zh: ['网站', 'Wǎngzhàn'], hi: ['वेबसाइट', 'Website'], es: ['Sitio web / Página web', 'SEE-tyoh web'], fr: ['Site web / Site internet', 'SEET web'],
      ar: ['موقع إلكتروني', 'Mawqi\''], bn: ['ওয়েবসাইট', 'Website'], pt: ['Site / Página da web', 'SY-chee'], ru: ['Веб-сайт', 'vyehb SYTE'], ur: ['ویب سائٹ', 'Website'],
      id: ['Situs web', 'SEE-toos web'], de: ['Website / Internetseite', 'VEHP-syte'], ja: ['ウェブサイト / ホームページ', 'Uebusaito'], pa: ['ਵੈੱਬਸਾਈਟ', 'Website'], sw: ['Tovuti', 'toh-VOO-tee'],
      mr: ['संकेतस्थळ / वेबसाईट', 'Website'], te: ['వెబ్‌సైట్', 'Website'], tr: ['Web sitesi', 'VEHB see-teh-see'], ta: ['வலைத்தளம்', 'Valaitthalam'], vi: ['Trang web', 'chrahng wehp']
    })
  },
  {
    id: 360, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Application / App', 'AP'], zh: ['应用程序 / 软件', 'Yìngyòng chéngxù'], hi: ['ऐप / एप्लिकेशन', 'App'], es: ['Aplicación / App', 'ah-plee-kah-SYOHN'], fr: ['Application / Appli', 'ah-plee-kah-SYOHN'],
      ar: ['تطبيق', 'Tatbeeq'], bn: ['অ্যাপ্লিকেশন / অ্যাপ', 'App'], pt: ['Aplicativo / App', 'ah-plee-kah-CHEE-voo'], ru: ['Приложение / Приложение', 'pree-lah-ZHEH-nyee-yeh'], ur: ['ایپ / ایپلیکیشن', 'App'],
      id: ['Aplikasi', 'ah-plee-KAH-see'], de: ['App / Anwendung', 'EHP'], ja: ['アプリ / アプリケーション', 'Apuri'], pa: ['ਐਪ', 'App'], sw: ['Programu / Programishi', 'proh-GRAH-moo'],
      mr: ['अ‍ॅप / अ‍ॅप्लिकेशन', 'App'], te: ['యాప్ / అప్లికేషన్', 'App'], tr: ['Uygulama / Aplikasyon', 'ooy-goo-lah-MAH'], ta: ['செயலி / ஆப்', 'Seyali'], vi: ['Ứng dụng', 'oong zoong']
    })
  },
  {
    id: 361, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Password', 'PASS-werd'], zh: ['密码', 'Mìmǎ'], hi: ['पासवर्ड / कूटशब्द', 'Password'], es: ['Contraseña', 'kohn-trah-SEH-nyah'], fr: ['Mot de passe', 'MOH duh pahs'],
      ar: ['كلمة المرور / السر', 'Kalimat al-muroor'], bn: ['পাসওয়ার্ড', 'Password'], pt: ['Senha', 'SAYN-yah'], ru: ['Пароль', 'pah-ROHL'], ur: ['پاس ورڈ / خفیہ لفظ', 'Password'],
      id: ['Kata sandi', 'KAH-tah SAHN-dee'], de: ['Passwort', 'PAHS-vort'], ja: ['パスワード / 暗証番号', 'Pasuwaado'], pa: ['ਪਾਸਵਰਡ', 'Password'], sw: ['Nenosiri', 'neh-noh-SEE-ree'],
      mr: ['पासवर्ड / गुप्तशब्द', 'Password'], te: ['పాస్‌వర్డ్', 'Password'], tr: ['Şifre / Parola', 'SHEEF-reh'], ta: ['கடவுச்சொல்', 'Kadavuchol'], vi: ['Mật khẩu', 'muht khow']
    })
  },
  {
    id: 362, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Username / Account', 'YOO-zer-naym'], zh: ['用户名 / 账号', 'Yònghùmíng'], hi: ['यूज़रनेम / खाता', 'Username'], es: ['Nombre de usuario / Cuenta', 'NOHM-breh'], fr: ['Nom d\'utilisateur / Compte', 'NOHN'],
      ar: ['اسم المستخدم / حساب', 'Ism al-mustakhdim'], bn: ['ইউজারনেম / অ্যাকাউন্ট', 'Username'], pt: ['Nome de usuário / Conta', 'NOH-mee'], ru: ['Имя пользователя / Аккаунт', 'EE-myah'], ur: ['صارف کا نام / اکاؤنٹ', 'Username'],
      id: ['Nama pengguna / Akun', 'NAH-mah'], de: ['Benutzername / Konto', 'beh-NOOT-ser-nah-meh'], ja: ['ユーザー名 / アカウント', 'Yuuzaamei'], pa: ['ਯੂਜ਼ਰ ਨੇਮ', 'Username'], sw: ['Jina la mtumiaji', 'JEE-nah'],
      mr: ['वापरकर्ता नाव / खाते', 'Username'], te: ['యూజర్‌నేమ్ / ఖాతా', 'Username'], tr: ['Kullanıcı adı / Hesap', 'kool-lah-nuh-JUH'], ta: ['பயனர்பெயர் / கணக்கு', 'Payanarpeyar'], vi: ['Tên người dùng / Tài khoản', 'ten ngoo-ee zoong']
    })
  },
  {
    id: 363, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Message / Text', 'MES-ij'], zh: ['信息 / 短信', 'Xìnxī'], hi: ['संदेश / मैसेज', 'Sandesh'], es: ['Mensaje / Texto', 'men-SAH-heh'], fr: ['Message / Texto', 'meh-SAHZH'],
      ar: ['رسالة', 'Risalah'], bn: ['বার্তা / মেসেজ', 'Barta'], pt: ['Mensagem', 'mayn-SAH-zhaym'], ru: ['Сообщение', 'sah-ahb-SHCHEH-nyee-yeh'], ur: ['پیغام / میسج', 'Paighaam'],
      id: ['Pesan / Teks', 'PEH-sahn'], de: ['Nachricht', 'NAHKH-reekht'], ja: ['メッセージ (めっせーじ)', 'Messeji'], pa: ['ਸੁਨੇਹਾ / ਮੈਸੇਜ', 'Suneha'], sw: ['Ujumbe', 'oo-JOOM-beh'],
      mr: ['संदेश / मेसेज', 'Sandesh'], te: ['సందేశం / మెసేజ్', 'Sandhesham'], tr: ['Mesaj', 'meh-SAHZH'], ta: ['செய்தி', 'Seithi'], vi: ['Tin nhắn', 'tin nyuhn']
    })
  },
  {
    id: 364, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Email', 'EE-mayl'], zh: ['电子邮件 / 邮箱', 'Diànzǐ yóujiàn'], hi: ['ईमेल', 'Email'], es: ['Correo electrónico / Email', 'koh-RREH-oh'], fr: ['Courriel / E-mail', 'koo-RYEL'],
      ar: ['بريد إلكتروني', 'Bareed iliktroonee'], bn: ['ইমেইল', 'Email'], pt: ['E-mail / Correio eletrônico', 'EE-may-oo'], ru: ['Электронная почта / Емейл', 'eh-lyek-TROHN-nah-yah'], ur: ['ای میل', 'Email'],
      id: ['Surel / Email', 'SOO-rehl'], de: ['E-Mail', 'EE-mayl'], ja: ['電子メール / メール', 'Meeru'], pa: ['ਈਮੇਲ', 'Email'], sw: ['Barua pepe', 'bah-ROO-ah PEH-peh'],
      mr: ['ईमेल', 'Email'], te: ['ఈమెయిల్', 'Email'], tr: ['E-posta', 'EH pohs-tah'], ta: ['மின்னஞ்சல்', 'Minnanjal'], vi: ['Thư điện tử / Email', 'thoo deeyeng too']
    })
  },
  {
    id: 365, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Battery', 'BAT-er-ee'], zh: ['电池', 'Diànchí'], hi: ['बैटरी', 'Battery'], es: ['Batería / Pila', 'bah-teh-REE-ah'], fr: ['Batterie / Pile', 'bah-tuh-REE'],
      ar: ['بطارية', 'Battariyyah'], bn: ['ব্যাটারি', 'Battery'], pt: ['Bateria', 'bah-teh-REE-ah'], ru: ['Батарея / Аккумулятор', 'bah-tah-RYEH-yah'], ur: ['بیٹری', 'Battery'],
      id: ['Baterai', 'BAH-teh-rye'], de: ['Akku / Batterie', 'AHK-koo'], ja: ['バッテリー / 電池', 'Batterii'], pa: ['ਬੈਟਰੀ', 'Battery'], sw: ['Betri', 'BEH-tree'],
      mr: ['बॅटरी', 'Battery'], te: ['బ్యాటరీ', 'Battery'], tr: ['Batarya / Pil', 'bah-TAHR-yah'], ta: ['மின்கலம் / பேட்டரி', 'Minkalam'], vi: ['Pin', 'pin']
    })
  },
  {
    id: 366, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Charger', 'CHAR-jer'], zh: ['充电器', 'Chōngdiànqì'], hi: ['चार्जर', 'Charger'], es: ['Cargador', 'kahr-gah-DOHR'], fr: ['Chargeur', 'shar-ZHUHR'],
      ar: ['شاحن', 'Shahin'], bn: ['চার্জার', 'Charger'], pt: ['Carregador', 'kah-heh-gah-DOHR'], ru: ['Зарядное устройство', 'zah-RYAHD-nuh-yeh'], ur: ['چارجر', 'Charger'],
      id: ['Pengisi daya / Charger', 'pehng-EE-see'], de: ['Ladegerät', 'LAH-deh-geh-rayt'], ja: ['充電器 (じゅうでんき)', 'Juudenki'], pa: ['ਚਾਰਜਰ', 'Charger'], sw: ['Chaja', 'CHAH-jah'],
      mr: ['चार्जर', 'Charger'], te: ['ఛార్జర్', 'Charger'], tr: ['Şarj aleti', 'SHAH-rzh'], ta: ['மின்னூற்றி / சார்ஜர்', 'Charger'], vi: ['Cục sạc', 'kook sahk']
    })
  },
  {
    id: 367, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Camera', 'KAM-ruh'], zh: ['照相机 / 摄像机', 'Xiàngjī'], hi: ['कैमरा', 'Camera'], es: ['Cámara', 'KAH-mah-rah'], fr: ['Appareil photo / Caméra', 'ah-pah-RAY'],
      ar: ['كاميرا / آلة تصوير', 'Kamera'], bn: ['ক্যামেরা', 'Camera'], pt: ['Câmera / Máquina fotográfica', 'KAH-meh-rah'], ru: ['Камера / Фотоаппарат', 'KAH-mye-rah'], ur: ['کیمرہ', 'Camera'],
      id: ['Kamera', 'kah-MEH-rah'], de: ['Kamera', 'KAH-meh-rah'], ja: ['カメラ (写真機)', 'Kamera'], pa: ['ਕੈਮਰਾ', 'Camera'], sw: ['Kamera', 'kah-MEH-rah'],
      mr: ['कॅमेरा', 'Camera'], te: ['కెమెరా', 'Camera'], tr: ['Kamera / Fotoğraf makinesi', 'kah-MEH-rah'], ta: ['புகைப்படக்கருவி', 'Pugaippadakkaruvi'], vi: ['Máy ảnh / Camera', 'mye ahnh']
    })
  },
  {
    id: 368, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Headphones / Earphones', 'HED-fohnz'], zh: ['耳机', 'Ěrjī'], hi: ['ईयरफ़ोन / हेडफ़ोन', 'Headphones'], es: ['Auriculares / Audífonos', 'ow-ree-koo-LAH-rehs'], fr: ['Écouteurs / Casque', 'ay-koo-TUHR'],
      ar: ['سماعات الأذن', 'Samma\'at'], bn: ['হেডফোন / ইয়ারফোন', 'Headphone'], pt: ['Fones de ouvido', 'FOH-nees'], ru: ['Наушники', 'nah-OOSH-nee-kee'], ur: ['ہیڈ فون / ایئر فون', 'Headphone'],
      id: ['Headphone / Earphone', 'HED-fohn'], de: ['Kopfhörer', 'KOPF-hur-rer'], ja: ['ヘッドホン / イヤホン', 'Heddohon'], pa: ['ਹੈੱਡਫੋਨ', 'Headphone'], sw: ['Vifaa vya masikioni', 'vee-FAH-ah'],
      mr: ['हेडफोन', 'Headphone'], te: ['హెడ్‌ఫోన్స్', 'Headphones'], tr: ['Kulaklık', 'koo-lahk-LUHK'], ta: ['தலையணி ஒலிபெருக்கி', 'Headphones'], vi: ['Tai nghe', 'tye ngeh']
    })
  },
  {
    id: 369, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Speaker (Audio)', 'SPEE-ker'], zh: ['扬声器 / 音箱', 'Yīnxiāng'], hi: ['स्पीकर', 'Speaker'], es: ['Altavoz / Parlante', 'ahl-tah-VOHS'], fr: ['Haut-parleur', 'oh-par-LUHR'],
      ar: ['مكبر صوت', 'Mukabbir sawt'], bn: ['লাউডস্পিকার', 'Speaker'], pt: ['Caixa de som / Alto-falante', 'KYE-shah'], ru: ['Колонка / Динамик', 'kah-LOHN-kah'], ur: ['اسپیکر / لاؤڈ اسپیکر', 'Speaker'],
      id: ['Pengeras suara / Speaker', 'SPEE-kehr'], de: ['Lautsprecher', 'LOWT-shprekh-er'], ja: ['スピーカー', 'Supiikaa'], pa: ['ਸਪੀਕਰ', 'Speaker'], sw: ['Kipaza sauti', 'kee-PAH-zah'],
      mr: ['स्पीकर', 'Speaker'], te: ['స్పీకర్', 'Speaker'], tr: ['Hoparlör', 'hoh-pahr-LUR'], ta: ['ஒலிபெருக்கி', 'Oliberukki'], vi: ['Loa phát thanh', 'lwah']
    })
  },
  {
    id: 370, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Microphone', 'MY-kruh-fohn'], zh: ['麦克风 / 话筒', 'Màikèfēng'], hi: ['माइक्रोफ़ोन / माइक', 'Mic'], es: ['Micrófono', 'mee-KROH-foh-noh'], fr: ['Microphone / Micro', 'mee-kroh-FOHN'],
      ar: ['ميكروفون / مجهار', 'Mikrofon'], bn: ['মাইক্রোফোন', 'Microphone'], pt: ['Microfone', 'mee-kroh-FOH-nee'], ru: ['Микрофон', 'mee-krah-FOHN'], ur: ['مائیکرو فون', 'Microphone'],
      id: ['Mikrofon', 'mee-kroh-FOHN'], de: ['Mikrofon', 'mee-kroh-FOHN'], ja: ['マイク / マイクロホン', 'Maiku'], pa: ['ਮਾਈਕ੍ਰੋਫੋਨ', 'Microphone'], sw: ['Maikrofoni', 'mye-kroh-FOH-nee'],
      mr: ['मायक्रोफोन', 'Microphone'], te: ['మైక్రోఫోన్', 'Microphone'], tr: ['Mikrofon', 'meek-roh-FOHN'], ta: ['நுண்ணொலிவாங்கி', 'Nunnolivaangi'], vi: ['Micro', 'mee-kroh']
    })
  },
  {
    id: 371, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Software', 'SOFT-wair'], zh: ['软件', 'Ruǎnjiàn'], hi: ['सॉफ़्टवेयर', 'Software'], es: ['Software / Programa', 'SOFT-wair'], fr: ['Logiciel', 'loh-zhee-SYEL'],
      ar: ['برمجيات / برنامج', 'Barmajiyyat'], bn: ['সফ্টওয়্যার', 'Software'], pt: ['Software / Programa', 'SOFT-wehr'], ru: ['Программное обеспечение', 'prah-GRAHM-nuh-yeh'], ur: ['سافٹ ویئر', 'Software'],
      id: ['Perangkat lunak', 'peh-RAHNG-kaht'], de: ['Software / Programm', 'SOFT-vair'], ja: ['ソフトウェア', 'Sofutowea'], pa: ['ਸਾਫਟਵੇਅਰ', 'Software'], sw: ['Programu / Programishi', 'proh-GRAH-moo'],
      mr: ['सॉफ्टवेअर', 'Software'], te: ['సాఫ్ట్‌వేర్', 'Software'], tr: ['Yazılım', 'yah-zuh-LUHM'], ta: ['மென்பொருள்', 'Menporul'], vi: ['Phần mềm', 'fuhn mem']
    })
  },
  {
    id: 372, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Hardware', 'HARD-wair'], zh: ['硬件', 'Yìngjiàn'], hi: ['हार्डवेयर', 'Hardware'], es: ['Hardware', 'HARD-wair'], fr: ['Matériel informatique', 'mah-tay-RYEL'],
      ar: ['عتاد الحاسوب / هاردوير', '\'Atad'], bn: ['হার্ডওয়্যার', 'Hardware'], pt: ['Hardware', 'HARD-wehr'], ru: ['Аппаратное обеспечение (железо)', 'ah-pah-RAHT-nuh-yeh'], ur: ['ہارڈ ویئر', 'Hardware'],
      id: ['Perangkat keras', 'peh-RAHNG-kaht'], de: ['Hardware', 'HAHRT-vair'], ja: ['ハードウェア', 'Haadowea'], pa: ['ਹਾਰਡਵੇਅਰ', 'Hardware'], sw: ['Vifaa ngumu', 'vee-FAH-ah'],
      mr: ['हार्डवेअर', 'Hardware'], te: ['హార్డ్‌వేర్', 'Hardware'], tr: ['Donanım', 'doh-nah-NUHM'], ta: ['வன்பொருள்', 'Vanporul'], vi: ['Phần cứng', 'fuhn koong']
    })
  },
  {
    id: 373, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Printer', 'PRIN-ter'], zh: ['打印机', 'Dǎyìnjī'], hi: ['प्रिंटर / मुद्रक', 'Printer'], es: ['Impresora', 'eem-preh-SOH-rah'], fr: ['Imprimante', 'an-pree-MAHNT'],
      ar: ['طابعة', 'Tabi\'ah'], bn: ['প্রিন্টার', 'Printer'], pt: ['Impressora', 'eem-preh-SOH-rah'], ru: ['Принтер', 'PREEN-tyehr'], ur: ['پرنٹر', 'Printer'],
      id: ['Pencetak / Printer', 'pehn-CHEH-tahk'], de: ['Drucker', 'DROOK-er'], ja: ['プリンター (印刷機)', 'Purintaa'], pa: ['ਪ੍ਰਿੰਟਰ', 'Printer'], sw: ['Kichapishi', 'kee-chah-PEE-shee'],
      mr: ['मुद्रक / प्रिंटर', 'Printer'], te: ['ప్రింటర్', 'Printer'], tr: ['Yazıcı', 'yah-zuh-JUH'], ta: ['அச்சுப்பொறி', 'Acchuppori'], vi: ['Máy in', 'mye in']
    })
  },
  {
    id: 374, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['File / Document', 'FYLE'], zh: ['文件 / 文档', 'Wénjiàn'], hi: ['फ़ाइल / दस्तावेज़', 'File'], es: ['Archivo / Documento', 'ahr-CHEE-voh'], fr: ['Fichier / Document', 'fee-SHYAY'],
      ar: ['ملف / وثيقة', 'Milaff'], bn: ['নথি / ফাইল', 'File'], pt: ['Arquivo / Ficheiro', 'ahr-KEE-voo'], ru: ['Файл / Документ', 'FYLE'], ur: ['فائل / دستاویز', 'File'],
      id: ['Berkas / File', 'BEHR-kahs'], de: ['Datei / Dokument', 'dah-TYE'], ja: ['ファイル / 文書 (ぶんしょ)', 'Fairu'], pa: ['ਫ਼ਾਈਲ / ਦਸਤਾਵੇਜ਼', 'File'], sw: ['Faili', 'FAH-ee-lee'],
      mr: ['फाईल / दस्तऐवज', 'File'], te: ['ఫైల్ / పత్రం', 'File'], tr: ['Dosya / Belge', 'dohs-YAH'], ta: ['கோப்பு / ஆவணம்', 'Koppu'], vi: ['Tập tin / Tài liệu', 'tuhp tin']
    })
  },
  {
    id: 375, category: 'Technology & Devices',
    translations: createTranslationMap({
      en: ['Data / Information', 'DAY-tuh'], zh: ['数据 / 资料', 'Shùjù'], hi: ['डेटा / आंकड़े', 'Data'], es: ['Datos / Información', 'DAH-tohs'], fr: ['Données / Informations', 'doh-NAY'],
      ar: ['بيانات / معلومات', 'Bayanat'], bn: ['উপাত্ত / তথ্য', 'Data'], pt: ['Dados / Informações', 'DAH-doos'], ru: ['Данные / Сведения', 'DAHN-ny-yeh'], ur: ['ڈیٹا / معلومات', 'Data'],
      id: ['Data / Informasi', 'DAH-tah'], de: ['Daten', 'DAH-ten'], ja: ['データ / 情報 (じょうほう)', 'Deeta'], pa: ['ਡੇਟਾ / ਜਾਣਕਾਰੀ', 'Data'], sw: ['Data / Taarifa', 'DAH-tah'],
      mr: ['माहिती / डेटा', 'Data'], te: ['డేటా / సమాచారం', 'Data'], tr: ['Veri / Data', 'veh-REE'], ta: ['தரவு / தகவல்கள்', 'Tharavu'], vi: ['Dữ liệu', 'zoo leeyew']
    })
  },

  // ─────────────────────────────────────────────────────────────
  // 16. WEATHER, SEASONS & NATURE (376 - 400)
  // ─────────────────────────────────────────────────────────────
  {
    id: 376, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Sun', 'SUN'], zh: ['太阳 / 日', 'Tàiyáng'], hi: ['सूरज / सूर्य', 'Sooraj'], es: ['Sol', 'SOHL'], fr: ['Soleil', 'soh-LAY'],
      ar: ['شمس', 'Shams'], bn: ['সূর্য', 'Shurjo'], pt: ['Sol', 'SOHL'], ru: ['Солнце', 'SOHN-tseh'], ur: ['سورج / آفتاب', 'Sooraj'],
      id: ['Matahari', 'mah-tah-HAH-ree'], de: ['Sonne', 'ZON-neh'], ja: ['太陽 (たいよう / ひ)', 'Taiyou'], pa: ['ਸੂਰਜ', 'Sooraj'], sw: ['Jua', 'JOO-ah'],
      mr: ['सूर्य / रवी', 'Soorya'], te: ['సూర్యుడు', 'Sooryudu'], tr: ['Güneş', 'goo-NESH'], ta: ['சூரியன்', 'Sooriyan'], vi: ['Mặt trời', 'muht chuh-ee']
    })
  },
  {
    id: 377, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Moon', 'MOON'], zh: ['月亮 / 月', 'Yuèliang'], hi: ['चाँद / चंद्रमा', 'Chaand'], es: ['Luna', 'LOO-nah'], fr: ['Lune', 'LEWN'],
      ar: ['قمر', 'Qamar'], bn: ['চাঁদ', 'Chaad'], pt: ['Lua', 'LOO-ah'], ru: ['Луна', 'loo-NAH'], ur: ['چاند / قمر', 'Chaand'],
      id: ['Bulan', 'BOO-lahn'], de: ['Mond', 'MOHNT'], ja: ['月 (つき)', 'Tsuki'], pa: ['ਚੰਨ', 'Chann'], sw: ['Mwezi', 'm-WEH-zee'],
      mr: ['चंद्र', 'Chandra'], te: ['చంద్రుడు', 'Chandrudu'], tr: ['Ay', 'EYE'], ta: ['நிலா / சந்திரன்', 'Nila'], vi: ['Mặt trăng', 'muht chahng']
    })
  },
  {
    id: 378, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Star', 'STAR'], zh: ['星星', 'Xīngxing'], hi: ['तारा / सितारा', 'Taara'], es: ['Estrella', 'ehs-TREH-yah'], fr: ['Étoile', 'ay-TWAHL'],
      ar: ['نجم / كوكب', 'Najm'], bn: ['তারা / নক্ষত্র', 'Tara'], pt: ['Estrela', 'ehs-TREH-lah'], ru: ['Звезда', 'zvyez-DAH'], ur: ['ستارہ / تارا', 'Sitara'],
      id: ['Bintang', 'BEEN-tahng'], de: ['Stern', 'SHTAIRN'], ja: ['星 (ほし)', 'Hoshi'], pa: ['ਤਾਰਾ', 'Taara'], sw: ['Nyota', 'NYOH-tah'],
      mr: ['तारा / चांदणी', 'Taara'], te: ['నక్షత్రం / చుక్క', 'Nakshatram'], tr: ['Yıldız', 'yuhl-DUHZ'], ta: ['நட்சத்திரம் / விண்மீன்', 'Natchathiram'], vi: ['Ngôi sao', 'ngoy sow']
    })
  },
  {
    id: 379, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Sky', 'SKYE'], zh: ['天空', 'Tiānkōng'], hi: ['आकाश / आसमान', 'Aasman'], es: ['Cielo', 'SYEH-loh'], fr: ['Ciel', 'SYEL'],
      ar: ['سماء', 'Sama\''], bn: ['আকাশ', 'Aakash'], pt: ['Céu', 'SEH-oo'], ru: ['Небо', 'NYEH-buh'], ur: ['آسمان / فلک', 'Aasmaan'],
      id: ['Langit', 'LAHNG-eet'], de: ['Himmel', 'HIM-mel'], ja: ['空 (そら)', 'Sora'], pa: ['ਅਸਮਾਨ', 'Aasmaan'], sw: ['Anga / Mbingu', 'AHN-gah'],
      mr: ['आकाश / आभाळ', 'Aakaash'], te: ['ఆకాశం', 'Aakaasham'], tr: ['Gökyüzü', 'gurk-yoo-ZOO'], ta: ['வானம் / ஆகாயம்', 'Vaanam'], vi: ['Bầu trời', 'bow chuh-ee']
    })
  },
  {
    id: 380, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Cloud', 'KLOWD'], zh: ['云', 'Yún'], hi: ['बादल / मेघ', 'Baadal'], es: ['Nube', 'NOO-beh'], fr: ['Nuage', 'new-AHZH'],
      ar: ['سحاب / غيم', 'Sahab'], bn: ['মেঘ', 'Megh'], pt: ['Nuvem', 'NOO-vaym'], ru: ['Облако / Туча', 'OH-blah-kuh'], ur: ['بادل / ابر', 'Baadal'],
      id: ['Awan', 'AH-wahn'], de: ['Wolke', 'VOL-keh'], ja: ['雲 (くも)', 'Kumo'], pa: ['ਬੱਦਲ', 'Baddal'], sw: ['Wingu', 'WEEN-goo'],
      mr: ['ढग', 'Dhag'], te: ['మేఘం', 'Megham'], tr: ['Bulut', 'boo-LOOT'], ta: ['மேகம்', 'Megam'], vi: ['Đám mây', 'dahm may']
    })
  },
  {
    id: 381, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Rain', 'RAYN'], zh: ['雨 / 下雨', 'Yǔ'], hi: ['बारिश / वर्षा', 'Baarish'], es: ['Lluvia', 'YOO-vyah'], fr: ['Pluie', 'PLWEE'],
      ar: ['مطر', 'Matar'], bn: ['বৃষ্টি', 'Brishti'], pt: ['Chuva', 'SHOO-vah'], ru: ['Дождь', 'DOHZHDT'], ur: ['بارش / برسات', 'Baarish'],
      id: ['Hujan', 'HOO-jahn'], de: ['Regen', 'RAY-gen'], ja: ['雨 (あめ)', 'Ame'], pa: ['ਮੀਂਹ / ਬਾਰਿਸ਼', 'Meenh'], sw: ['Mvua', 'm-VOO-ah'],
      mr: ['पाऊस', 'Paaoos'], te: ['వర్షం', 'Varsham'], tr: ['Yağmur', 'yah-MOOR'], ta: ['மழை', 'Mazhai'], vi: ['Cơn mưa', 'kuhn moo-uh']
    })
  },
  {
    id: 382, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Snow', 'SNOH'], zh: ['雪 / 下雪', 'Xuě'], hi: ['बर्फ़ / हिमपात', 'Barf'], es: ['Nieve', 'NYEH-veh'], fr: ['Neige', 'NEZH'],
      ar: ['ثلج', 'Thalj'], bn: ['তুষার / বরফ', 'Tushar'], pt: ['Neve', 'NEH-vee'], ru: ['Снег', 'SNYEHK'], ur: ['برف باری', 'Barf'],
      id: ['Salju', 'SAHL-joo'], de: ['Schnee', 'SHNAY'], ja: ['雪 (ゆき)', 'Yuki'], pa: ['ਬਰਫ਼', 'Barf'], sw: ['Theluji', 'theh-LOO-jee'],
      mr: ['बर्फ', 'Barfa'], te: ['మంచు', 'Manchu'], tr: ['Kar', 'KAHR'], ta: ['பனிப்பொழிவு', 'Pani'], vi: ['Tuyết', 'tweey-et']
    })
  },
  {
    id: 383, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Wind', 'WIND'], zh: ['风', 'Fēng'], hi: ['हवा / पवन', 'Hawa'], es: ['Viento', 'VYEHN-toh'], fr: ['Vent', 'VAHN'],
      ar: ['ريح / هواء', 'Reeh'], bn: ['বাতাস / বায়ু', 'Batash'], pt: ['Vento', 'VAYN-too'], ru: ['Ветер', 'VYEH-tyeer'], ur: ['ہوا / باد', 'Hawa'],
      id: ['Angin', 'AHN-geen'], de: ['Wind', 'VINT'], ja: ['風 (かぜ)', 'Kaze'], pa: ['ਹਵਾ', 'Hawa'], sw: ['Upepo', 'oo-PEH-poh'],
      mr: ['वारा', 'Vaara'], te: ['గాలి', 'Gaali'], tr: ['Rüzgar', 'rooz-GAHR'], ta: ['காற்று', 'Kaatru'], vi: ['Gió', 'zaw']
    })
  },
  {
    id: 384, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Storm', 'STORM'], zh: ['暴风雨 / 风暴', 'Bàofēngyǔ'], hi: ['तूफ़ान / आंधी', 'Toofaan'], es: ['Tormenta', 'tohr-MEHN-tah'], fr: ['Tempête / Orage', 'tahn-PET'],
      ar: ['عاصفة', '\'Asifah'], bn: ['ঝড় / তুফান', 'Jhod'], pt: ['Tempestade', 'tehm-pehs-TAH-jee'], ru: ['Буря / Шторм', 'BOO-ryah'], ur: ['طوفان / آندھی', 'Toofaan'],
      id: ['Badai', 'BAH-dye'], de: ['Sturm / Gewitter', 'SHTOORM'], ja: ['嵐 (あらし)', 'Arashi'], pa: ['ਤੂਫ਼ਾਨ', 'Toofaan'], sw: ['Dhoruba', 'dhoh-ROO-bah'],
      mr: ['वादळ', 'Vaadal'], te: ['తుఫాను', 'Thuphaanu'], tr: ['Fırtına', 'fuhr-tuh-NAH'], ta: ['புயல்', 'Puyal'], vi: ['Cơn bão', 'kuhn bow']
    })
  },
  {
    id: 385, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Rainbow', 'RAYN-boh'], zh: ['彩虹', 'Cǎihóng'], hi: ['इंद्रधनुष', 'Indradhanush'], es: ['Arcoíris', 'ahr-koh-EE-rees'], fr: ['Arc-en-ciel', 'ahrk-ahn-SYEL'],
      ar: ['قوس قزح', 'Qaws quzah'], bn: ['রংধনু', 'Rongdhonu'], pt: ['Arco-íris', 'AHR-koo EE-rees'], ru: ['Радуга', 'RAH-doo-gah'], ur: ['دھنک / قوس قزح', 'Dhanak'],
      id: ['Pelangi', 'peh-LAHNG-ee'], de: ['Regenbogen', 'RAY-gen-boh-gen'], ja: ['虹 (にじ)', 'Niji'], pa: ['ਪੀਂਘ / ਸਤਰੰਗੀ ਪੀਂਘ', 'Peegh'], sw: ['Upinde wa mvua', 'oo-PEEN-deh'],
      mr: ['इंद्रधनुष्य', 'Indradhanushya'], te: ['ఇంద్రధనుస్సు', 'Indradhanussu'], tr: ['Gökkuşağı', 'gurk-koo-shah-UH'], ta: ['வானவில்', 'Vaanavil'], vi: ['Cầu vồng', 'kow vohng']
    })
  },
  {
    id: 386, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Spring (Season)', 'SPRING'], zh: ['春天 / 春季', 'Chūntiān'], hi: ['वसंत ऋतु', 'Vasant'], es: ['Primavera', 'pree-mah-VEH-rah'], fr: ['Printemps', 'pran-TAHN'],
      ar: ['فصل الربيع', 'Ar-rabee\''], bn: ['বসন্তকাল', 'Boshonto'], pt: ['Primavera', 'pree-mah-VEH-rah'], ru: ['Весна', 'vyehs-NAH'], ur: ['موسم بہار', 'Bahaar'],
      id: ['Musim semi', 'MOO-seem'], de: ['Frühling', 'FREE-ling'], ja: ['春 (はる)', 'Haru'], pa: ['ਬਸੰਤ ਰੁੱਤ', 'Basant'], sw: ['Majira ya kuchipua', 'mah-JEE-rah'],
      mr: ['वसंत ऋतू', 'Vasant'], te: ['వసంత కాలం', 'Vasantha kaalam'], tr: ['İlkbahar', 'EELK-bah-hahr'], ta: ['இளவேனில்காலம்', 'Ilavenil'], vi: ['Mùa xuân', 'moo-uh swuhn']
    })
  },
  {
    id: 387, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Summer', 'SUM-er'], zh: ['夏天 / 夏季', 'Xiàtiān'], hi: ['गर्मी का मौसम / ग्रीष्म', 'Garmi'], es: ['Verano', 'veh-RAH-noh'], fr: ['Été', 'ay-TAY'],
      ar: ['فصل الصيف', 'As-sayf'], bn: ['গ্রীষ্মকাল', 'Grishmo'], pt: ['Verão', 'veh-ROWN'], ru: ['Лето', 'LYEH-tuh'], ur: ['موسم گرما', 'Garma'],
      id: ['Musim panas', 'MOO-seem PAH-nahs'], de: ['Sommer', 'ZOM-mer'], ja: ['夏 (なつ)', 'Natsu'], pa: ['ਗਰਮੀ ਦੀ ਰੁੱਤ', 'Garmi'], sw: ['Kiangazi / Majira ya joto', 'kee-ahn-GAH-zee'],
      mr: ['उन्हाळा', 'Unhaala'], te: ['వేసవి కాలం', 'Vesavi'], tr: ['Yaz', 'YAHZ'], ta: ['கோடைகாலம்', 'Kodaikaalam'], vi: ['Mùa hè', 'moo-uh heh']
    })
  },
  {
    id: 388, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Autumn / Fall', 'AW-tum'], zh: ['秋天 / 秋季', 'Qiūtiān'], hi: ['पतझड़ / शरद', 'Patjhad'], es: ['Otoño', 'oh-TOH-nyoh'], fr: ['Automne', 'oh-TUHN'],
      ar: ['فصل الخريف', 'Al-khareef'], bn: ['শরৎকাল / হেমন্তকাল', 'Shorot'], pt: ['Outono', 'oh-TOH-noo'], ru: ['Осень', 'OH-syen'], ur: ['موسم خزاں', 'Khizaan'],
      id: ['Musim gugur', 'MOO-seem GOO-goor'], de: ['Herbst', 'HAIRPST'], ja: ['秋 (あき)', 'Aki'], pa: ['ਪਤਝੜ', 'Patjhad'], sw: ['Msimu wa vuli', 'm-SEE-moo'],
      mr: ['शरद ऋतू / पानगळ', 'Sharad'], te: ['శరదృతువు', 'Sharad ruthuvu'], tr: ['Sonbahar / Güz', 'SOHN-bah-hahr'], ta: ['இலையுதிர்காலம்', 'Ilaiyudhir'], vi: ['Mùa thu', 'moo-uh thoo']
    })
  },
  {
    id: 389, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Winter', 'WIN-ter'], zh: ['冬天 / 冬季', 'Dōngtiān'], hi: ['सर्दी का मौसम / शीतकाल', 'Sardi'], es: ['Invierno', 'een-VYEHR-noh'], fr: ['Hiver', 'ee-VAIR'],
      ar: ['فصل الشتاء', 'Ash-shita\''], bn: ['শীতকাল', 'Sheetkaal'], pt: ['Inverno', 'een-VEHR-noo'], ru: ['Зима', 'zee-MAH'], ur: ['موسم سرما', 'Sarma'],
      id: ['Musim dingin', 'MOO-seem DEENG-een'], de: ['Winter', 'VIN-ter'], ja: ['冬 (ふゆ)', 'Fuyu'], pa: ['ਸਿਆਲ਼ / ਸਰਦੀ', 'Siaal'], sw: ['Kipupwe / Majira ya baridi', 'kee-POOP-weh'],
      mr: ['हिवाळा', 'Hivaala'], te: ['శీతాకాలం', 'Sheethaakaalam'], tr: ['Kış', 'KUHSH'], ta: ['குளிர்காலம்', 'Kulirkaalam'], vi: ['Mùa đông', 'moo-uh dawng']
    })
  },
  {
    id: 390, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Sea / Ocean', 'SEE'], zh: ['大海 / 海洋', 'Dàhǎi'], hi: ['समुद्र / सागर', 'Samudra'], es: ['Mar / Océano', 'MAHR'], fr: ['Mer / Océan', 'MAIR'],
      ar: ['بحر / محيط', 'Bahr'], bn: ['সমুদ্র / সাগর', 'Shomudro'], pt: ['Mar / Oceano', 'MAHR'], ru: ['Море / Океан', 'MOH-ryeh'], ur: ['سمندر / بحر', 'Samandar'],
      id: ['Laut / Samudra', 'LOWT'], de: ['Meer / Ozean', 'MAIR'], ja: ['海 (うみ)', 'Umi'], pa: ['ਸਮੁੰਦਰ', 'Samundar'], sw: ['Bahari', 'bah-HAH-ree'],
      mr: ['समुद्र / सागर', 'Samudra'], te: ['సముద్రం', 'Samudhram'], tr: ['Deniz / Okyanus', 'deh-NEEZ'], ta: ['கடல் / பெருங்கடல்', 'Kadal'], vi: ['Biển / Đại dương', 'bee-en']
    })
  },
  {
    id: 391, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['River', 'RIV-er'], zh: ['河流 / 江', 'Héliú'], hi: ['नदी', 'Nadi'], es: ['Río', 'REE-oh'], fr: ['Rivière / Fleuve', 'ree-VYAIR'],
      ar: ['نهر', 'Nahr'], bn: ['নদী', 'Nodi'], pt: ['Rio', 'HEE-oo'], ru: ['Река', 'ryeh-KAH'], ur: ['دریا / ندی', 'Darya'],
      id: ['Sungai', 'SOONG-eye'], de: ['Fluss', 'FLOOS'], ja: ['川 (かわ)', 'Kawa'], pa: ['ਦਰਿਆ / ਨਦੀ', 'Dariya'], sw: ['Mto', 'm-TOH'],
      mr: ['नदी', 'Nadi'], te: ['నది', 'Nadhi'], tr: ['Nehir / Irmak', 'neh-HEER'], ta: ['ஆறு', 'Aaru'], vi: ['Dòng sông', 'zawng sawng']
    })
  },
  {
    id: 392, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Mountain', 'MOWN-tin'], zh: ['山 / 高山', 'Shān'], hi: ['पहाड़ / पर्वत', 'Pahaad'], es: ['Montaña', 'mohn-TAH-nyah'], fr: ['Montagne', 'mohn-TAHN-yuh'],
      ar: ['جبل', 'Jabal'], bn: ['পাহাড় / পর্বত', 'Pahar'], pt: ['Montanha', 'mohn-TAHN-yah'], ru: ['Гора', 'gah-RAH'], ur: ['پہاڑ / کوہ', 'Pahaad'],
      id: ['Gunung', 'GOO-noong'], de: ['Berg / Gebirge', 'BAIRK'], ja: ['山 (やま)', 'Yama'], pa: ['ਪਹਾੜ', 'Pahaad'], sw: ['Mlima', 'm-LEE-mah'],
      mr: ['पर्वत / डोंगर', 'Parvat'], te: ['పర్వతం / కొండ', 'Parvatham'], tr: ['Dağ', 'DAH'], ta: ['மலை', 'Malai'], vi: ['Ngọn núi', 'ngawn nooy']
    })
  },
  {
    id: 393, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Forest / Woods', 'FOR-ist'], zh: ['森林 / 树林', 'Sēnlín'], hi: ['जंगल / वन', 'Jangal'], es: ['Bosque / Selva', 'BOHS-keh'], fr: ['Forêt / Bois', 'foh-REH'],
      ar: ['غابة', 'Ghabah'], bn: ['বন / জঙ্গল', 'Bon'], pt: ['Floresta / Bosque', 'floh-REHS-tah'], ru: ['Лес', 'LYEHS'], ur: ['جنگل', 'Jangal'],
      id: ['Hutan', 'HOO-tahn'], de: ['Wald', 'VAHLT'], ja: ['森 / 林 (もり)', 'Mori'], pa: ['ਜੰਗਲ', 'Jangal'], sw: ['Msitu', 'm-SEE-too'],
      mr: ['जंगल / वन', 'Jangal'], te: ['అడవి', 'Adavi'], tr: ['Orman', 'ohr-MAHN'], ta: ['காடு', 'Kaadu'], vi: ['Khu rừng', 'khoo zoong']
    })
  },
  {
    id: 394, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Tree', 'TREE'], zh: ['树 / 树木', 'Shù'], hi: ['पेड़ / वृक्ष', 'Ped'], es: ['Árbol', 'AHR-bohl'], fr: ['Arbre', 'AHR-bruh'],
      ar: ['شجرة', 'Shajarah'], bn: ['গাছ / বৃক্ষ', 'Gaachh'], pt: ['Árvore', 'AHR-voh-ree'], ru: ['Дерево', 'DYEH-ryee-vuh'], ur: ['درخت / پیڑ', 'Darakht'],
      id: ['Pohon', 'POH-hohn'], de: ['Baum', 'BOWM'], ja: ['木 (き)', 'Ki'], pa: ['ਦਰੱਖ਼ਤ / ਰੁੱਖ', 'Rukkh'], sw: ['Mti', 'm-TEE'],
      mr: ['झाड / वृक्ष', 'Jhaad'], te: ['చెట్టు', 'Chettu'], tr: ['Ağaç', 'ah-AHCH'], ta: ['மரம்', 'Maram'], vi: ['Cây cối', 'kye koy']
    })
  },
  {
    id: 395, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Flower', 'FLOW-er'], zh: ['花 / 花朵', 'Huā'], hi: ['फूल / पुष्प', 'Phool'], es: ['Flor', 'FLOHR'], fr: ['Fleur', 'FLUHR'],
      ar: ['زهرة / وردة', 'Zahrah'], bn: ['ফুল', 'Phul'], pt: ['Flor', 'FLOHR'], ru: ['Цветок', 'tsvye-TOHK'], ur: ['پھول / گل', 'Phool'],
      id: ['Bunga', 'BOONG-ah'], de: ['Blume', 'BLOO-meh'], ja: ['花 (はな)', 'Hana'], pa: ['ਫੁੱਲ', 'Phull'], sw: ['Ua', 'OO-ah'],
      mr: ['फूल', 'Phool'], te: ['పువ్వు', 'Puvvu'], tr: ['Çiçek', 'chee-CHEHK'], ta: ['மலர் / பூ', 'Poo'], vi: ['Bông hoa', 'bawng hwa']
    })
  },
  {
    id: 396, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Earth / Planet', 'ERTH'], zh: ['地球 / 世界', 'Dìqiú'], hi: ['पृथ्वी / धरती', 'Prithvi'], es: ['Tierra (planeta)', 'TYEH-rrah'], fr: ['Terre', 'TAIR'],
      ar: ['الأرض / كوكب الأرض', 'Al-ard'], bn: ['পৃথিবী', 'Prithibi'], pt: ['Terra (planeta)', 'TEH-hah'], ru: ['Земля', 'zyeem-LYAH'], ur: ['زمین / دنیا', 'Zameen'],
      id: ['Bumi', 'BOO-mee'], de: ['Erde', 'AIR-deh'], ja: ['地球 (ちきゅう)', 'Chikyuu'], pa: ['ਧਰਤੀ', 'Dharti'], sw: ['Dunia', 'doo-NEE-ah'],
      mr: ['पृथ्वी / धरणी', 'Prithvi'], te: ['భూమి', 'Bhoomi'], tr: ['Dünya / Yerküre', 'doon-YAH'], ta: ['பூமி', 'Bhoomi'], vi: ['Trái đất', 'chye duht']
    })
  },
  {
    id: 397, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Desert', 'DEZ-ert'], zh: ['沙漠', 'Shāmò'], hi: ['रेगिस्तान / मरुस्थल', 'Registaan'], es: ['Desierto', 'deh-SYEHR-toh'], fr: ['Désert', 'day-ZAIR'],
      ar: ['صحراء', 'Sahra\''], bn: ['মরুভূমি', 'Morubhumi'], pt: ['Deserto', 'deh-ZEHR-too'], ru: ['Пустыня', 'poos-TY-nyah'], ur: ['صحرا / ریگستان', 'Sehra'],
      id: ['Gurun', 'GOO-roon'], de: ['Wüste', 'VEES-teh'], ja: ['砂漠 (さばく)', 'Sabaku'], pa: ['ਰੇਗਿਸਤਾਨ / ਮਾਰੂਥਲ', 'Registaan'], sw: ['Jangwa', 'JAHN-gwah'],
      mr: ['वाळवंट', 'Vaalwant'], te: ['ఎడారి', 'Edaari'], tr: ['Çöl', 'CHURL'], ta: ['பாலைவனம்', 'Paalaivanam'], vi: ['Sa mạc', 'sah mahk']
    })
  },
  {
    id: 398, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Island', 'EYE-lund'], zh: ['岛屿 / 岛', 'Dǎoyǔ'], hi: ['द्वीप / टापू', 'Dweep'], es: ['Isla', 'EES-lah'], fr: ['Île', 'EEL'],
      ar: ['جزيرة', 'Jazeerah'], bn: ['দ্বীপ', 'Dweep'], pt: ['Ilha', 'EEL-yah'], ru: ['Остров', 'OHS-truhf'], ur: ['جزیرہ', 'Jazeera'],
      id: ['Pulau', 'POO-low'], de: ['Insel', 'IN-zel'], ja: ['島 (しま)', 'Shima'], pa: ['ਟਾਪੂ', 'Taapu'], sw: ['Kisiwa', 'kee-SEE-wah'],
      mr: ['बेट', 'Bet'], te: ['ద్వీపం', 'Dweepam'], tr: ['Ada', 'ah-DAH'], ta: ['தீவு', 'Theevu'], vi: ['Hòn đảo', 'hawn dow']
    })
  },
  {
    id: 399, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Lake', 'LAYK'], zh: ['湖泊 / 湖', 'Húpō'], hi: ['झील', 'Jheel'], es: ['Lago', 'LAH-goh'], fr: ['Lac', 'LAHK'],
      ar: ['بحيرة', 'Buhayrah'], bn: ['হ্রদ / বিল', 'Hrod'], pt: ['Lago', 'LAH-goo'], ru: ['Озеро', 'OH-zye-ruh'], ur: ['جھیل', 'Jheel'],
      id: ['Danau', 'DAH-now'], de: ['See', 'ZAY'], ja: ['湖 (みずうみ)', 'Mizuumi'], pa: ['ਝੀਲ', 'Jheel'], sw: ['Ziwa', 'ZEE-wah'],
      mr: ['तलाव / सरोवर', 'Talaav'], te: ['సరస్సు', 'Sarassu'], tr: ['Göl', 'GURL'], ta: ['ஏரி', 'Eri'], vi: ['Hồ nước', 'hoh noo-uk']
    })
  },
  {
    id: 400, category: 'Weather & Nature',
    translations: createTranslationMap({
      en: ['Thunder & Lightning', 'THUN-der'], zh: ['雷电', 'Léidiàn'], hi: ['गरज और बिजली', 'Bijli'], es: ['Truenos y relámpagos', 'TWEH-nohs'], fr: ['Tonnerre et éclair', 'toh-NAIR'],
      ar: ['رعد وبرق', 'Ra\'d wa barq'], bn: ['বজ্র ও বিদ্যুৎ', 'Bojro'], pt: ['Trovão e relâmpago', 'troh-VOWN'], ru: ['Гром и молния', 'GROHM ee MOHL-nee-yah'], ur: ['گرج اور چمک', 'Garaj'],
      id: ['Guntur dan petir', 'GOON-toor'], de: ['Donner und Blitz', 'DON-ner'], ja: ['雷 (かみなり / いなずま)', 'Kaminari'], pa: ['ਗਰਜ ਅਤੇ ਬਿਜਲੀ', 'Bijli'], sw: ['Ngurumo na umeme', 'ngoo-ROO-moh'],
      mr: ['वीज आणि गडगडाट', 'Veej'], te: ['ఉరుము మరియు మెరుపు', 'Urumu'], tr: ['Gök gürültüsü ve şimşek', 'GOERK'], ta: ['இடியும் மின்னலும்', 'Idiyum minnalum'], vi: ['Sấm và sét', 'suhm vah seht']
    })
  }
];

module.exports = { VOCAB_BATCH_9 };
