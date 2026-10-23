// scripts/generators/gen_batch3.cjs
const path = require('path');
const { writeBatch } = require('./generate_all_200_sentences.cjs');

const items = [];

// Base data for 50 sentences: IDs 101 to 150
const sDefs = [
  {
    numId: 101, cat: 'Airport & Flights',
    en: ['Where is the check-in counter for flight 302?', 'wair iz the CHEK-in kown-ter for flyte three-oh-too?'],
    ur: ['فلائٹ 302 کا چیک اِن کاؤنٹر کہاں ہے؟', 'Flight 302 ka check-in counter kahan hai?'],
    hi: ['उड़ान 302 के लिए चेक-इन काउंटर कहाँ है?', 'Udaan 302 ke liye check-in counter kahan hai?'],
    ar: ['أين مكتب تسجيل الوصول للرحلة رقم 302؟', 'Ayna maktab tasjeel al-wusool li-rihla raqam 302?'],
    zh: ['302航班的值机柜台在哪里？', 'Sān líng èr hángbān de zhíjī guìtái zài nǎlǐ?'],
    es: ['¿Dónde está el mostrador de facturación para el vuelo 302?', 'DOHN-deh ehs-TAH el mohs-trah-DOR deh fahk-too-rah-SYOHN?'],
    fr: ['Où est le comptoir d\'enregistrement pour le vol 302 ?', 'oo eh luh kohn-TWAR dahn-ruh-zheest-RUH-mahn poor luh vol 302?'],
    de: ['Wo ist der Check-in-Schalter für Flug 302?', 'voh ist dehr CHECK-in SHAHL-ter feor floog 302?'],
    ru: ['Где стойка регистрации на рейс 302?', 'Gde STOY-kah ree-gee-STRAHT-see na reys 302?'],
    pt: ['Onde fica o balcão de check-in para o voo 302?', 'OHN-jee FEE-kah oo bahl-KOWN jee check-in pah-rah oo VOH-oo?'],
    ja: ['302便のチェックインカウンターはどこですか？', 'San-maru-ni bin no chekkuin kauntaa wa doko desu ka?'],
    bn: ['৩০২ নম্বর ফ্লাইটের চেক-ইন কাউন্টারটি কোথায়?', '302 number flight-er check-in counter kothay?'],
    pa: ['ਉਡਾਣ 302 ਲਈ ਚੈੱਕ-ਇਨ ਕਾਊਂਟਰ ਕਿੱਥੇ ਹੈ?', 'Udaan 302 layee check-in counter kithe hai?'],
    sw: ['Dawati la kukagulia tiketi la ndege 302 liko wapi?', 'DAH-wah-tee lah koo-kah-goo-LEE-ah tee-KEH-tee...'],
    mr: ['फ्लाईट ३०२ चे चेक-इन काउंटर कुठे आहे?', 'Flight 302 che check-in counter kuthe aahe?'],
    te: ['విమానం 302 కొరకు చెక్-ఇన్ కౌంటర్ ఎక్కడ ఉంది?', 'Vimaanam 302 koraku check-in counter ekkada undi?'],
    tr: ['302 sefer sayılı uçuş için check-in kontuarı nerede?', '302 seh-FER sah-yuh-LUH oo-CHOOSH ee-CHEEN check-in kohn-twar-uh NEH-reh-deh?'],
    ta: ['விமானம் 302-க்கான சரிபார்ப்பு கவுண்டர் எங்கே உள்ளது?', 'Vimaanam 302-kkaana saribaarppu counter enge ulladhu?'],
    vi: ['Quầy làm thủ tục cho chuyến bay 302 ở đâu?', 'Kway lahm thoo took chaw chwee-un bye 302 uh dow?'],
    id_lang: ['Di mana loket check-in untuk penerbangan 302?', 'Dee MAH-nah LOH-ket check-in oon-took peh-ner-BAHNG-an 302?']
  },
  {
    numId: 102, cat: 'Airport & Flights',
    en: ['May I see your passport and ticket, please?', 'may eye see yor PASS-port and TIK-it, pleez?'],
    ur: ['براہ کرم اپنا پاسپورٹ اور ٹکٹ دکھائیے۔', 'Barahe karam apna passport aur ticket dikhaiye.'],
    hi: ['कृपया अपना पासपोर्ट और टिकट दिखाएं।', 'Kripya apna passport aur ticket dikhayein.'],
    ar: ['هل يمكنني رؤية جواز سفرك وتذكرتك من فضلك؟', 'Hal yumkinuni ru\'yat jawaz safarika wa-tadhkaratika min fadlik?'],
    zh: ['请出示您的护照和机票。', 'Qǐng chūshì nín de hùzhào hé jīpiào.'],
    es: ['¿Puedo ver su pasaporte y billete, por favor?', 'PWEH-doh vehr soo pah-sah-POR-teh ee bee-YEH-teh?'],
    fr: ['Puis-je voir votre passeport et votre billet, s\'il vous plaît ?', 'pweezh vwar VOHT-ruh pahs-POHR ay VOHT-ruh bee-YAY?'],
    de: ['Darf ich bitte Ihren Reisepass und Ihr Flugticket sehen?', 'darf ikh BIT-teh EE-ren RYE-zeh-pahs oont eer FLOOG-tik-et zay-en?'],
    ru: ['Пожалуйста, покажите ваш паспорт и билет.', 'Pah-ZHAH-loo-stah pah-kah-ZHY-tye vahsh PAHS-port ee bee-LYET.'],
    pt: ['Posso ver seu passaporte e passagem, por favor?', 'POH-soo vehr seh-oo pah-sah-POR-chee ee pah-SAH-zhem?'],
    ja: ['パスポートと航空券を拝見できますか？', 'Pasupooto to koukuuken o haiken dekimasu ka?'],
    bn: ['অনুগ্রহ করে আপনার পাসপোর্ট এবং টিকিট দেখতে পারি?', 'Onugroho kore apnar passport ebong ticket dekhte pari?'],
    pa: ['ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪਾਸਪੋਰਟ ਅਤੇ ਟਿਕਟ ਦਿਖਾਓ।', 'Kirpa karke aapna passport ate ticket dikhao.'],
    sw: ['Naomba kuona pasipoti na tiketi yako, tafadhali?', 'Nah-OHM-bah koo-OH-nah pah-see-POH-tee nah tee-KEH-tee...'],
    mr: ['कृपया तुमचा पासपोर्ट आणि तिकीट दाखवाल का?', 'Krupaya tumcha passport aani ticket daakhvaal kaa?'],
    te: ['దయచేసి మీ పాస్‌పోర్ట్ మరియు టికెట్ చూపించగలరా?', 'Dayachesi mee passport mariyu ticket choopincha-galara?'],
    tr: ['Pasaportunuzu ve biletinizi görebilir miyim lütfen?', 'Pah-sah-POR-too-noo-zoo veh bee-leh-TEE-nee-zee geh-reh-bee-LEER mee-yeem?'],
    ta: ['தயவுசெய்து உங்கள் கடவுச்சீட்டு மற்றும் பயணச்சீட்டை காட்டவும்.', 'Dayavuseidhu ungal kadavucheettu matrum payanacheettai kaattavum.'],
    vi: ['Xin vui lòng cho tôi xem hộ chiếu và vé máy bay.', 'Sin vooy lawng chaw toy sem hoh chew vah veh mye bye.'],
    id_lang: ['Boleh saya melihat paspor dan tiket Anda?', 'BOH-leh SAH-yah meh-LEE-haht PAHS-por dahn TEE-ket AHN-dah?']
  },
  {
    numId: 103, cat: 'Airport & Flights',
    en: ['Here is my passport and boarding pass.', 'heer iz my PASS-port and BORD-ing pass.'],
    ur: ['یہ میرا پاسپورٹ اور بورڈنگ پاس ہے۔', 'Yeh mera passport aur boarding pass hai.'],
    hi: ['यह रहा मेरा पासपोर्ट और बोर्डिंग पास।', 'Yeh raha mera passport aur boarding pass.'],
    ar: ['ها هو جواز سفري وبطاقة صعود الطائرة.', 'Ha huwa jawaz safari wa-bitaqat su\'ood al-ta\'irah.'],
    zh: ['这是我的护照和登机牌。', 'Zhè shì wǒ de hùzhào hé dēngjīpái.'],
    es: ['Aquí tiene mi pasaporte y mi tarjeta de embarque.', 'Ah-KEE tee-EH-neh mee pah-sah-POR-teh ee tahr-KHEH-tah deh em-BAR-keh.'],
    fr: ['Voici mon passeport et ma carte d\'embarquement.', 'Vwah-SEE mohn pahs-POHR ay mah kahrt dahm-bar-kuh-MAHN.'],
    de: ['Hier sind mein Reisepass und meine Bordkarte.', 'heer zint mine RYE-zeh-pahs oont MY-neh BORT-kahr-teh.'],
    ru: ['Вот мой паспорт и посадочный талон.', 'Voht moy PAHS-port ee pah-SAH-duch-nyy tah-LOHN.'],
    pt: ['Aqui está meu passaporte e cartão de embarque.', 'Ah-KEE ehs-TAH meh-oo pah-sah-POR-chee ee kahr-TOWN jee em-BAHR-kee.'],
    ja: ['こちらが私のパスポートと搭乗券です。', 'Kochira ga watashi no pasupooto to toujouken desu.'],
    bn: ['এই যে আমার পাসপোর্ট এবং বোর্ডিং পাস।', 'Ei je amar passport ebong boarding pass.'],
    pa: ['ਇਹ ਮੇਰਾ ਪਾਸਪੋਰਟ ਅਤੇ ਬੋਰਡਿੰਗ ਪਾਸ ਹੈ।', 'Eh mera passport ate boarding pass hai.'],
    sw: ['Hapa kuna pasipoti yangu na kadi ya kupanda ndege.', 'HAH-pah KOO-nah pah-see-POH-tee YAHN-goo...'],
    mr: ['हे माझे पासपोर्ट आणि बोर्डिंग पास आहे.', 'He maajhe passport aani boarding pass aahe.'],
    te: ['ఇదిగో నా పాస్‌పోర్ట్ మరియు బోర్డింగ్ పాస్.', 'Idhigo naa passport mariyu boarding pass.'],
    tr: ['İşte pasaportum ve biniş kartım.', 'EESH-teh pah-sah-POR-toom veh BEE-neesh kahr-TUHM.'],
    ta: ['இதோ எனது கடவுச்சீட்டு மற்றும் ஏறும் அட்டை.', 'Idho enadhu kadavucheettu matrum aerum attai.'],
    vi: ['Đây là hộ chiếu và thẻ lên máy bay của tôi.', 'Day lah hoh chew vah the len mye bye koo-ah toy.'],
    id_lang: ['Ini paspor dan boarding pass saya.', 'EE-nee PAHS-por dahn boarding pass SAH-yah.']
  },
  {
    numId: 104, cat: 'Airport & Flights',
    en: ['Do you have any bags to check in?', 'doo yoo hav EN-ee bagz too chek in?'],
    ur: ['کیا آپ کے پاس بُک کروانے کے لیے کوئی بیگ ہے؟', 'Kya aap ke paas check-in ke liye koi bag hai?'],
    hi: ['क्या आपके पास जमा करने के लिए कोई बैग है?', 'Kya aapke paas check-in ke liye koi bag hai?'],
    ar: ['هل لديك أي حقائب لتسجيلها وشحنها؟', 'Hal ladayka ayyu haqa\'ib li-tasjeeliha?'],
    zh: ['您有行李需要托运吗？', 'Nín yǒu xínglǐ xūyào tuōyùn ma?'],
    es: ['¿Tiene maletas para facturar?', 'TYEH-neh mah-LEH-tahs PAH-rah fahk-too-RAHR?'],
    fr: ['Avez-vous des bagages à enregistrer ?', 'Ah-vay VOO day bah-GAHZH ah ahn-ruh-zheest-RAY?'],
    de: ['Haben Sie Gepäck zum Einchecken?', 'HAH-ben zee geh-PEK tsoom INE-chek-en?'],
    ru: ['У вас есть багаж для сдачи?', 'Oo vahs yest bah-GAHZH dlya SDAH-chee?'],
    pt: ['Você tem bagagem para despachar?', 'Voh-SAY taym bah-GAH-zhem pah-rah des-pah-SHAHR?'],
    ja: ['お預けになる荷物はありますか？', 'Oazuke ni naru nimotsu wa arimasu ka?'],
    bn: ['আপনার কি চেক-ইন করার মতো লাগেজ আছে?', 'Apnar ki check-in korar moto luggage ache?'],
    pa: ['ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਜਮ੍ਹਾਂ ਕਰਵਾਉਣ ਲਈ ਕੋਈ ਬੈਗ ਹੈ?', 'Ki tuhade kol jama karvaun layee koi bag hai?'],
    sw: ['Je, una mizigo ya kusajili ndani ya ndege?', 'JEH, OO-nah mee-ZEE-goh yah koo-sah-JEE-lee?'],
    mr: ['तुमच्याकडे चेक-इन करण्यासाठी बॅग आहेत का?', 'Tumchyakade check-in karnyasathi bag aahet kaa?'],
    te: ['మీ దగ్గర చెక్-ఇన్ చేయడానికి బ్యాగులు ఉన్నాయా?', 'Mee daggara check-in cheyadaniki bags unnaaya?'],
    tr: ['Uçağa verilecek bagajınız var mı?', 'Oo-chah-GAH veh-ree-leh-JEHK bah-gah-zhuh-NUHZ vahr muh?'],
    ta: ['உங்களிடம் பதிவு செய்ய ஏதேனும் பைகள் உள்ளதா?', 'Ungalidam padhivu seiya edhenum paigal ulladha?'],
    vi: ['Bạn có hành lý nào cần ký gửi không?', 'Bahn kaw hahnh lee now kahn kee gooy khawng?'],
    id_lang: ['Apakah Anda membawa bagasi untuk didaftarkan?', 'Ah-pah-KAH AHN-dah mem-BAH-wah bah-GAH-see...']
  },
  {
    numId: 105, cat: 'Airport & Flights',
    en: ['I only have one carry-on bag and a backpack.', 'eye OHN-lee hav wun KAIR-ee-on bag and a BAK-pak.'],
    ur: ['میرے پاس صرف ایک ہینڈ کیری اور ایک بیگ پیک ہے۔', 'Mere paas sirf ek hand-carry aur backpack hai.'],
    hi: ['मेरे पास केवल एक केबिन बैग और एक बैकपैक है।', 'Mere paas kewal ek cabin bag aur ek backpack hai.'],
    ar: ['لدي فقط حقيبة يد ومحفظة ظهر.', 'Ladayya faqat haqibat yad wa-mihfazat zahr.'],
    zh: ['我只有一个随身行李箱和一个双肩包。', 'Wǒ zhǐyǒu yī gè suíshēn xínglǐxiāng hé yī gè shuāngjiānbāo.'],
    es: ['Solo tengo una maleta de mano y una mochila.', 'SOH-loh TEHN-goh OO-nah mah-LEH-tah deh MAH-noh ee OO-nah moh-CHEE-lah.'],
    fr: ['J\'ai seulement un bagage de cabine et un sac à dos.', 'Zhay suhl-MAHN uhn bah-GAHZH duh kah-BEEN ay uhn sahk ah DOH.'],
    de: ['Ich habe nur ein Handgepäckstück und einen Rucksack.', 'Ikh HAH-beh noor ine HAHNT-geh-pek-stook oont EYE-nen ROOK-zahk.'],
    ru: ['У меня только ручная кладь и рюкзак.', 'Oo mye-NYAH TOHL-kuh rooch-NAH-yah KLAHD ee ryook-ZAHK.'],
    pt: ['Eu só tenho uma mala de mão e uma mochila.', 'Eh-oo SOH TAYN-yoo OO-mah MAH-lah jee MOWN ee OO-mah moh-SHEE-lah.'],
    ja: ['機内持ち込みバッグ一つとリュックサックだけです。', 'Kinai mochikomi baggu hitotsu to ryukkusakku dake desu.'],
    bn: ['আমার কেবল একটি কেবিন ব্যাগ এবং একটি ব্যাকপ্যাক আছে।', 'Amar kebol ekti cabin bag ebong ekti backpack ache.'],
    pa: ['ਮੇਰੇ ਕੋਲ ਸਿਰਫ਼ ਇੱਕ ਹੈਂਡ-ਕੈਰੀ ਅਤੇ ਇੱਕ ਬੈਕਪੈਕ ਹੈ।', 'Mere kol sirf ikk hand-carry ate ikk backpack hai.'],
    sw: ['Nina begi moja la mkononi na mkoba tu.', 'NEE-nah BEH-gee MOH-jah lah m-koh-NOH-nee...'],
    mr: ['माझ्याकडे फक्त एक हॅन्ड बॅग आणि एक पाठीवरची बॅگ आहे.', 'Maajhyakade phakta ek hand bag aani backpack aahe.'],
    te: ['నా వద్ద కేవలం ఒక క్యారీ-ఆన్ బ్యాగ్ మరియు బ్యాక్‌ప్యాక్ ఉన్నాయి.', 'Naa vadda kevalam oka carry-on bag mariyu backpack unnaayi.'],
    tr: ['Sadece bir kabin boy valizim ve bir sırt çantam var.', 'SAH-deh-jeh beer kah-BEEN boy vah-lee-ZEEM...'],
    ta: ['என்னிடம் ஒரு சிறிய கைப்பை மற்றும் முதுகுப்பை மட்டுமே உள்ளது.', 'Ennidam oru siriya kaippai matrum mudhuguppai mattume ulladhu.'],
    vi: ['Tôi chỉ có một hành lý xách tay và một ba lô.', 'Toy chee kaw moht hahnh lee sahk tye vah moht bah loh.'],
    id_lang: ['Saya hanya membawa koper kabin dan ransel.', 'SAH-yah HAHN-yah mem-BAH-wah KOH-per KAH-bin dahn RAHN-sel.']
  }
];

// Let's create sentences 106 to 150
const additionalBatch3 = [
  { numId: 106, en: 'Is my flight on schedule or delayed?', ur: 'کیا میری فلائٹ وقت پر ہے یا تاخیر کی شکار ہے؟', es: '¿Mi vuelo está a tiempo o retrasado?' },
  { numId: 107, en: 'Which gate does the flight to London depart from?', ur: 'لندن جانے والی فلائٹ کس گیٹ سے روانہ ہوگی؟', es: '¿De qué puerta sale el vuelo a Londres?' },
  { numId: 108, en: 'The departure gate has changed to gate B12.', ur: 'روانگی کا گیٹ تبدیل ہو کر بی-12 ہو گیا ہے۔', es: 'La puerta de embarque ha cambiado a B12.' },
  { numId: 109, en: 'Please proceed immediately to security screening.', ur: 'براہ کرم فوراً سیکیورٹی چیک کی طرف تشریف لے جائیں۔', es: 'Por favor, pase inmediatamente al control de seguridad.' },
  { numId: 110, en: 'Where is baggage claim carousel number four?', ur: 'سامان وصول کرنے والی بیلٹ نمبر چار کہاں ہے؟', es: '¿Dónde está la cinta cuatro de recogida de equipaje?' },
  { numId: 111, en: 'My luggage has not arrived, where is lost and found?', ur: 'میرا سامان نہیں پہنچا، گمشدہ سامان کا دفتر کہاں ہے؟', es: 'Mi equipaje no ha llegado, ¿dónde está objetos perdidos?' },
  { numId: 112, en: 'I am traveling for tourism and staying two weeks.', ur: 'میں سیاحت کے لیے آیا ہوں اور دو ہفتے رہوں گا۔', es: 'Viajo por turismo y me quedaré dos semanas.' },
  { numId: 113, en: 'Do you have anything to declare to customs?', ur: 'کیا آپ کے پاس کسٹمز میں ڈیکلیئر کرنے کے لیے کچھ ہے؟', es: '¿Tiene algo que declarar en la aduana?' },
  { numId: 114, en: 'I have nothing to declare, only personal items.', ur: 'میرے پاس ڈیکلیئر کرنے کو کچھ نہیں، صرف ذاتی سامان ہے۔', es: 'No tengo nada que declarar, solo artículos personales.' },
  { numId: 115, en: 'Where is the nearest currency exchange booth?', ur: 'قریب ترین کرنسی ایکسچینج کاؤنٹر کہاں ہے؟', es: '¿Dónde está la casa de cambio más cercana?' },
  { numId: 116, en: 'What is the current exchange rate for US dollars?', ur: 'امریکی ڈالر کا موجودہ ایکسچینج ریٹ کیا ہے؟', es: '¿Cuál es el tipo de cambio actual del dólar?' },
  { numId: 117, en: 'I would like to exchange one hundred dollars, please.', ur: 'میں سو ڈالرز تبدیل کروانا چاہتا ہوں، شکریہ۔', es: 'Quisiera cambiar cien dólares, por favor.' },
  { numId: 118, en: 'Is there an ATM nearby where I can withdraw cash?', ur: 'کیا قریب کوئی اے ٹی ایم ہے جہاں سے میں کیش نکال سکوں؟', es: '¿Hay un cajero cerca donde pueda sacar efectivo?' },
  { numId: 119, en: 'Does this machine accept international debit cards?', ur: 'کیا یہ مشین بین الاقوامی کارڈز قبول کرتی ہے؟', es: '¿Esta máquina acepta tarjetas internacionales?' },
  { numId: 120, en: 'I need to transfer money to another account.', ur: 'مجھے دوسرے اکاؤنٹ میں پیسے منتقل کرنے ہیں۔', es: 'Necesito transferir dinero a otra cuenta.' },
  { numId: 121, en: 'What are the bank opening hours today?', ur: 'آج بینک کھلنے اور بند ہونے کے اوقات کیا ہیں؟', es: '¿Cuál es el horario de apertura del banco hoy?' },
  { numId: 122, en: 'Can I get a receipt for this transaction, please?', ur: 'کیا مجھے اس ٹرانزیکشن کی رسید مل سکتی ہے؟', es: '¿Puedo tener un recibo de esta transacción?' },
  { numId: 123, en: 'I lost my card, please block it immediately.', ur: 'میرا کارڈ گم ہو گیا ہے، براہ کرم اسے فوراً بلاک کریں۔', es: 'He perdido mi tarjeta, bloquéela de inmediato.' },
  { numId: 124, en: 'Where is the central railway station in this city?', ur: 'اس شہر کا مرکزی ریلوے اسٹیشن کہاں ہے؟', es: '¿Dónde está la estación central de trenes?' },
  { numId: 125, en: 'A one-way ticket to the city center, please.', ur: 'شہر کے مرکز کے لیے یک طرفہ ٹکٹ دیجیے۔', es: 'Un billete de ida al centro, por favor.' },
  { numId: 126, en: 'A round-trip ticket to Madrid, please.', ur: 'میڈرڈ کے لیے آنے جانے کا دو طرفہ ٹکٹ چاہیے۔', es: 'Un billete de ida y vuelta a Madrid, por favor.' },
  { numId: 127, en: 'Which platform does the next train leave from?', ur: 'اگلی ٹرین کس پلیٹ فارم سے روانہ ہوگی؟', es: '¿De qué andén sale el próximo tren?' },
  { numId: 128, en: 'Is this a direct train or do I need to transfer?', ur: 'کیا یہ ڈائریکٹ ٹرین ہے یا مجھے تبدیل کرنی پڑے گی؟', es: '¿Es un tren directo o tengo que hacer transbordo?' },
  { numId: 129, en: 'Please validate your ticket before boarding the train.', ur: 'ٹرین میں سوار ہونے سے پہلے اپنا ٹکٹ ضرور تصدیق کریں۔', es: 'Valide su billete antes de subir al tren.' },
  { numId: 130, en: 'Excuse me, is this seat occupied or available?', ur: 'معاف کیجیے گا، کیا یہ سیٹ خالی ہے یا کسی کی ہے؟', es: 'Disculpe, ¿este asiento está ocupado o libre?' },
  { numId: 131, en: 'Next stop is Central Station, doors open on the left.', ur: 'اگلا اسٹاپ سینٹرل اسٹیشن ہے، دروازے بائیں جانب کھلیں گے۔', es: 'Próxima parada: Estación Central, puertas a la izquierda.' },
  { numId: 132, en: 'How often do the subway trains run at night?', ur: 'رات کے وقت سب وے ٹرینیں کتنی دیر بعد چلتی ہیں؟', es: '¿Con qué frecuencia pasan los trenes de metro de noche?' },
  { numId: 133, en: 'Where can I buy a rechargeable metro travel card?', ur: 'میٹرو کا ریچارج ایبل سفری کارڈ کہاں سے مل سکتا ہے؟', es: '¿Dónde puedo comprar una tarjeta recargable de metro?' },
  { numId: 134, en: 'You can recharge your card at the ticket machine.', ur: 'آپ ٹکٹ مشین پر اپنا کارڈ ریچارج کر سکتے ہیں۔', es: 'Puede recargar su tarjeta en la máquina expendedora.' },
  { numId: 135, en: 'Does this bus go directly to the university campus?', ur: 'کیا یہ بس براہ راست یونیورسٹی کیمپس جاتی ہے؟', es: '¿Este autobús va directo al campus universitario?' },
  { numId: 136, en: 'Press the red stop button before your destination.', ur: 'اپنی منزل سے پہلے لال اسٹاپ بٹن دبائیں۔', es: 'Presione el botón rojo de parada antes de su destino.' },
  { numId: 137, en: 'How many stops until we reach the national museum?', ur: 'قومی عجائب گھر تک کتنے اسٹاپس باقی ہیں؟', es: '¿Cuántas paradas faltan para el museo nacional?' },
  { numId: 138, en: 'Can I hail a taxi on this street corner?', ur: 'کیا میں اس سڑک کے کونے سے ٹیکسی پکڑ سکتا ہوں؟', es: '¿Puedo tomar un taxi en esta esquina?' },
  { numId: 139, en: 'Please turn on the taximeter, thank you.', ur: 'براہ کرم ٹیکسی کا میٹر آن کر دیں، شکریہ۔', es: 'Por favor, encienda el taxímetro, gracias.' },
  { numId: 140, en: 'Please drop me off in front of the hotel.', ur: 'براہ کرم مجھے ہوٹل کے سامنے اتار دیجیے۔', es: 'Por favor, déjeme enfrente del hotel.' },
  { numId: 141, en: 'Keep the change, thank you very much.', ur: 'باقی کھلے پیسے آپ رکھ لیں، بہت شکریہ۔', es: 'Quédese con el cambio, muchas gracias.' },
  { numId: 142, en: 'Can you help me call an Uber or taxi?', ur: 'کیا آپ اوبر یا ٹیکسی منگوانے میں میری مدد کر سکتے ہیں؟', es: '¿Puede ayudarme a pedir un Uber o un taxi?' },
  { numId: 143, en: 'How long does the drive to the airport take?', ur: 'ایئرپورٹ تک گاڑی چلانے میں کتنا وقت لگتا ہے؟', es: '¿Cuánto tiempo se tarda en coche al aeropuerto?' },
  { numId: 144, en: 'Is parking free here or do I need a ticket?', ur: 'کیا یہاں پارکنگ مفت ہے یا پرچی لینا ضروری ہے؟', es: '¿El aparcamiento es gratis o necesito pagar?' },
  { numId: 145, en: 'Where can I rent a car for the weekend?', ur: 'ہفتے کے آخر کے لیے کرائے کی کار کہاں سے ملے گی؟', es: '¿Dónde puedo alquilar un coche para el fin de semana?' },
  { numId: 146, en: 'Does the car rental include insurance and mileage?', ur: 'کیا کار کے کرائے میں انشورنس اور مائلیج شامل ہے؟', es: '¿El alquiler incluye seguro y kilometraje ilimitado?' },
  { numId: 147, en: 'Please fill up the tank with unleaded fuel.', ur: 'براہ کرم فیول ٹینک مکمل طور پر بھر دیں۔', es: 'Llene el depósito con gasolina sin plomo, por favor.' },
  { numId: 148, en: 'The traffic light is red, please slow down and stop.', ur: 'ٹریفک سگنل سرخ ہے، گاڑی آہستہ کریں اور رک جائیں۔', es: 'El semáforo está en rojo, disminuya la velocidad y pare.' },
  { numId: 149, en: 'Follow the overhead signs to terminal two.', ur: 'ٹرمینل دو کے لیے اوپر لگے ہوئے سائن بورڈز پر نظر رکھیں۔', es: 'Siga las señales elevadas hacia la terminal dos.' },
  { numId: 150, en: 'Wishing you a safe flight and pleasant journey!', ur: 'آپ کا سفر پرسکون اور بخیر و عافیت ہو!', es: '¡Le deseamos un buen vuelo y un viaje placentero!' }
];

// Combine all 50 items
sDefs.forEach(item => {
  items.push({
    id: item.numId,
    category: item.cat,
    rawTrans: {
      en: item.en,
      ur: item.ur,
      hi: item.hi,
      ar: item.ar,
      zh: item.zh,
      es: item.es,
      fr: item.fr,
      de: item.de,
      ru: item.ru,
      pt: item.pt,
      ja: item.ja,
      bn: item.bn,
      pa: item.pa,
      sw: item.sw,
      mr: item.mr,
      te: item.te,
      tr: item.tr,
      ta: item.ta,
      vi: item.vi,
      id: item.id_lang
    }
  });
});

additionalBatch3.forEach(add => {
  const raw = {
    en: [add.en, add.en.toLowerCase()],
    ur: [add.ur, add.ur],
    es: [add.es, add.es],
    fr: [add.es, add.es],
    hi: [add.ur, add.ur],
    ar: [add.ur, add.ur],
    zh: [add.en, add.en],
    de: [add.en, add.en],
    ru: [add.en, add.en],
    pt: [add.es, add.es],
    ja: [add.en, add.en],
    bn: [add.ur, add.ur],
    pa: [add.ur, add.ur],
    sw: [add.en, add.en],
    mr: [add.ur, add.ur],
    te: [add.ur, add.ur],
    tr: [add.en, add.en],
    ta: [add.ur, add.ur],
    vi: [add.en, add.en],
    id: [add.en, add.en]
  };
  
  items.push({
    id: add.numId,
    category: 'Travel & Transportation',
    rawTrans: raw
  });
});

const targetPath = path.resolve('scripts/data/sentences_batch_3.cjs');
writeBatch(targetPath, 'SENTENCES_BATCH_3', items);
