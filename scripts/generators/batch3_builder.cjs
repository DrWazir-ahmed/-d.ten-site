const fs = require('fs');
const path = require('path');

// Helper to construct a translation map
function t(en, zh, hi, es, fr, ar, bn, pt, ru, ur, id, de, ja, pa, sw, mr, te, tr, ta, vi) {
  return {
    en: { text: en[0], pronunciation: en[1] },
    zh: { text: zh[0], pronunciation: zh[1] },
    hi: { text: hi[0], pronunciation: hi[1] },
    es: { text: es[0], pronunciation: es[1] },
    fr: { text: fr[0], pronunciation: fr[1] },
    ar: { text: ar[0], pronunciation: ar[1] },
    bn: { text: bn[0], pronunciation: bn[1] },
    pt: { text: pt[0], pronunciation: pt[1] },
    ru: { text: ru[0], pronunciation: ru[1] },
    ur: { text: ur[0], pronunciation: ur[1] },
    id: { text: id[0], pronunciation: id[1] },
    de: { text: de[0], pronunciation: de[1] },
    ja: { text: ja[0], pronunciation: ja[1] },
    pa: { text: pa[0], pronunciation: pa[1] },
    sw: { text: sw[0], pronunciation: sw[1] },
    mr: { text: mr[0], pronunciation: mr[1] },
    te: { text: te[0], pronunciation: te[1] },
    tr: { text: tr[0], pronunciation: tr[1] },
    ta: { text: ta[0], pronunciation: ta[1] },
    vi: { text: vi[0], pronunciation: vi[1] }
  };
}

// 50 Sentences for Batch 3 (IDs 101 to 150)
// Themes: Airport, Customs, Currency, Banking, Train, Subway & Transit
const data = [];

// 101
data.push({
  id: 101, category: 'Airport & Travel',
  translations: t(
    ['Where is the check-in counter for flight 302?', 'wair iz the CHEK-in kown-ter for flyte three-oh-too?'],
    ['302航班的值机柜台在哪里？', 'Sān líng èr hángbān de zhíjī guìtái zài nǎlǐ?'],
    ['उड़ान 302 के लिए चेक-इन काउंटर कहाँ है?', 'Udaan 302 ke liye check-in counter kahan hai?'],
    ['¿Dónde está el mostrador de facturación para el vuelo 302?', 'DOHN-deh ehs-TAH el mohs-trah-DOR deh fahk-too-rah-SYOHN?'],
    ['Où est le comptoir d\'enregistrement pour le vol 302 ?', 'oo eh luh kohn-TWAR dahn-ruh-zheest-RUH-mahn poor luh vol 302?'],
    ['أين مكتب تسجيل الوصول للرحلة رقم 302؟', 'Ayna maktab tasjeel al-wusool li-rihla raqam 302?'],
    ['৩০২ নম্বর ফ্লাইটের চেক-ইন কাউন্টারটি কোথায়?', '302 number flight-er check-in counter kothay?'],
    ['Onde fica o balcão de check-in para o voo 302?', 'OHN-jee FEE-kah oo bahl-KOWN jee check-in pah-rah oo VOH-oo?'],
    ['Где находится стойка регистрации на рейс 302?', 'Gde na-KHO-deet-sya STOY-kah ree-gee-STRAHT-see na reys 302?'],
    ['فلائٹ 302 کا چیک اِن کاؤنٹر کہاں ہے؟', 'Flight 302 ka check-in counter kahan hai?'],
    ['Di mana loket check-in untuk penerbangan 302?', 'Dee MAH-nah LOH-ket check-in oon-took peh-ner-BAHNG-an 302?'],
    ['Wo ist der Check-in-Schalter für Flug 302?', 'voh ist dehr CHECK-in SHAHL-ter feor floog 302?'],
    ['302便のチェックインカウンターはどこですか？', 'San-maru-ni bin no chekkuin kauntaa wa doko desu ka?'],
    ['ਉਡਾਣ 302 ਲਈ ਚੈੱਕ-ਇਨ ਕਾਊਂਟਰ ਕਿੱਥੇ ਹੈ?', 'Udaan 302 layee check-in counter kithe hai?'],
    ['Dawati la kukagulia tiketi la ndege 302 liko wapi?', 'DAH-wah-tee lah koo-kah-goo-LEE-ah tee-KEH-tee...'],
    ['फ्लाईट ३०२ चे चेक-इन काउंटर कुठे आहे?', 'Flight 302 che check-in counter kuthe aahe?'],
    ['విమానం 302 కొరకు చెక్-ఇన్ కౌంటర్ ఎక్కడ ఉంది?', 'Vimaanam 302 koraku check-in counter ekkada undi?'],
    ['302 sefer sayılı uçuş için check-in kontuarı nerede?', '302 seh-FER sah-yuh-LUH oo-CHOOSH ee-CHEEN check-in kohn-twar-uh NEH-reh-deh?'],
    ['விமானம் 302-க்கான சரிபார்ப்பு கவுண்டர் எங்கே உள்ளது?', 'Vimaanam 302-kkaana saribaarppu counter enge ulladhu?'],
    ['Quầy làm thủ tục cho chuyến bay 302 ở đâu?', 'Kway lahm thoo took chaw chwee-un bye 302 uh dow?']
  )
});

// 102
data.push({
  id: 102, category: 'Airport & Travel',
  translations: t(
    ['May I see your passport and ticket, please?', 'may eye see yor PASS-port and TIK-it, pleez?'],
    ['请出示您的护照和机票。', 'Qǐng chūshì nín de hùzhào hé jīpiào.'],
    ['कृपया अपना पासपोर्ट और टिकट दिखाएं।', 'Kripya apna passport aur ticket dikhayein.'],
    ['¿Puedo ver su pasaporte y billete, por favor?', 'PWEH-doh vehr soo pah-sah-POR-teh ee bee-YEH-teh?'],
    ['Puis-je voir votre passeport et votre billet, s\'il vous plaît ?', 'pweezh vwar VOHT-ruh pahs-POHR ay VOHT-ruh bee-YAY?'],
    ['هل يمكنني رؤية جواز سفرك وتذكرتك من فضلك؟', 'Hal yumkinuni ru\'yat jawaz safarika wa-tadhkaratika min fadlik?'],
    ['অনুগ্রহ করে আপনার পাসপোর্ট এবং টিকিট দেখতে পারি?', 'Onugroho kore apnar passport ebong ticket dekhte pari?'],
    ['Posso ver seu passaporte e passagem, por favor?', 'POH-soo vehr seh-oo pah-sah-POR-chee ee pah-SAH-zhem?'],
    ['Пожалуйста, покажите ваш паспорт и билет.', 'Pah-ZHAH-loo-stah pah-kah-ZHY-tye vahsh PAHS-port ee bee-LYET.'],
    ['براہ کرم اپنا پاسپورٹ اور ٹکٹ دکھائیے۔', 'Barahe karam apna passport aur ticket dikhaiye.'],
    ['Boleh saya melihat paspor dan tiket Anda?', 'BOH-leh SAH-yah meh-LEE-haht PAHS-por dahn TEE-ket AHN-dah?'],
    ['Darf ich bitte Ihren Reisepass und Ihr Flugticket sehen?', 'darf ikh BIT-teh EE-ren RYE-zeh-pahs oont eer FLOOG-tik-et zay-en?'],
    ['パスポートと航空券を拝見できますか？', 'Pasupooto to koukuuken o haiken dekimasu ka?'],
    ['ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪਾਸਪੋਰਟ ਅਤੇ ਟਿਕਟ ਦਿਖਾਓ।', 'Kirpa karke aapna passport ate ticket dikhao.'],
    ['Naomba kuona pasipoti na tiketi yako, tafadhali?', 'Nah-OHM-bah koo-OH-nah pah-see-POH-tee nah tee-KEH-tee...'],
    ['कृपया तुमचा पासपोर्ट आणि तिकीट दाखवाल का?', 'Krupaya tumcha passport aani ticket daakhvaal kaa?'],
    ['దయచేసి మీ పాస్‌పోర్ట్ మరియు టికెట్ చూపించగలరా?', 'Dayachesi mee passport mariyu ticket choopincha-galara?'],
    ['Pasaportunuzu ve biletinizi görebilir miyim lütfen?', 'Pah-sah-POR-too-noo-zoo veh bee-leh-TEE-nee-zee geh-reh-bee-LEER mee-yeem?'],
    ['தயவுசெய்து உங்கள் கடவுச்சீட்டு மற்றும் பயணச்சீட்டை காட்டவும்.', 'Dayavuseidhu ungal kadavucheettu matrum payanacheettai kaattavum.'],
    ['Xin vui lòng cho tôi xem hộ chiếu và vé máy bay.', 'Sin vooy lawng chaw toy sem hoh chew vah veh mye bye.']
  )
});

// 103
data.push({
  id: 103, category: 'Airport & Travel',
  translations: t(
    ['Here is my passport and boarding pass.', 'heer iz my PASS-port and BORD-ing pass.'],
    ['这是我的护照和登机牌。', 'Zhè shì wǒ de hùzhào hé dēngjīpái.'],
    ['यह रहा मेरा पासपोर्ट और बोर्डिंग पास।', 'Yeh raha mera passport aur boarding pass.'],
    ['Aquí tiene mi pasaporte y mi tarjeta de embarque.', 'Ah-KEE tee-EH-neh mee pah-sah-POR-teh ee tahr-KHEH-tah deh em-BAR-keh.'],
    ['Voici mon passeport et ma carte d\'embarquement.', 'Vwah-SEE mohn pahs-POHR ay mah kahrt dahm-bar-kuh-MAHN.'],
    ['ها هو جواز سفري وبطاقة صعود الطائرة.', 'Ha huwa jawaz safari wa-bitaqat su\'ood al-ta\'irah.'],
    ['এই যে আমার পাসপোর্ট এবং বোর্ডিং পাস।', 'Ei je amar passport ebong boarding pass.'],
    ['Aqui está meu passaporte e cartão de embarque.', 'Ah-KEE ehs-TAH meh-oo pah-sah-POR-chee ee kahr-TOWN jee em-BAHR-kee.'],
    ['Вот мой паспорт и посадочный талон.', 'Voht moy PAHS-port ee pah-SAH-duch-nyy tah-LOHN.'],
    ['یہ میرا پاسپورٹ اور بورڈنگ پاس ہے۔', 'Yeh mera passport aur boarding pass hai.'],
    ['Ini paspor dan boarding pass saya.', 'EE-nee PAHS-por dahn boarding pass SAH-yah.'],
    ['Hier sind mein Reisepass und meine Bordkarte.', 'heer zint mine RYE-zeh-pahs oont MY-neh BORT-kahr-teh.'],
    ['こちらが私のパスポートと搭乗券です。', 'Kochira ga watashi no pasupooto to toujouken desu.'],
    ['ਇਹ ਮੇਰਾ ਪਾਸਪੋਰਟ ਅਤੇ ਬੋਰਡਿੰਗ ਪਾਸ ਹੈ।', 'Eh mera passport ate boarding pass hai.'],
    ['Hapa kuna pasipoti yangu na kadi ya kupanda ndege.', 'HAH-pah KOO-nah pah-see-POH-tee YAHN-goo...'],
    ['हे माझे पासपोर्ट आणि बोर्डिंग पास आहे.', 'He maajhe passport aani boarding pass aahe.'],
    ['ఇదిగో నా పాస్‌పోర్ట్ మరియు బోర్డింగ్ పాస్.', 'Idhigo naa passport mariyu boarding pass.'],
    ['İşte pasaportum ve biniş kartım.', 'EESH-teh pah-sah-POR-toom veh BEE-neesh kahr-TUHM.'],
    ['இதோ எனது கடவுச்சீட்டு மற்றும் ஏறும் அட்டை.', 'Idho enadhu kadavucheettu matrum aerum attai.'],
    ['Đây là hộ chiếu và thẻ lên máy bay của tôi.', 'Day lah hoh chew vah the len mye bye koo-ah toy.']
  )
});

// 104
data.push({
  id: 104, category: 'Airport & Travel',
  translations: t(
    ['Do you have any bags to check in?', 'doo yoo hav EN-ee bagz too chek in?'],
    ['您有行李需要托运吗？', 'Nín yǒu xínglǐ xūyào tuōyùn ma?'],
    ['क्या आपके पास जमा करने के लिए कोई बैग है?', 'Kya aapke paas check-in ke liye koi bag hai?'],
    ['¿Tiene maletas para facturar?', 'TYEH-neh mah-LEH-tahs PAH-rah fahk-too-RAHR?'],
    ['Avez-vous des bagages à enregistrer ?', 'Ah-vay VOO day bah-GAHZH ah ahn-ruh-zheest-RAY?'],
    ['هل لديك أي حقائب لتسجيلها وشحنها؟', 'Hal ladayka ayyu haqa\'ib li-tasjeeliha?'],
    ['আপনার কি চেক-ইন করার মতো লাগেজ আছে?', 'Apnar ki check-in korar moto luggage ache?'],
    ['Você tem bagagem para despachar?', 'Voh-SAY taym bah-GAH-zhem pah-rah des-pah-SHAHR?'],
    ['У вас есть багаж для сдачи?', 'Oo vahs yest bah-GAHZH dlya SDAH-chee?'],
    ['کیا آپ کے پاس بُک کروانے کے لیے کوئی بیگ ہے؟', 'Kya aap ke paas check-in ke liye koi bag hai?'],
    ['Apakah Anda membawa bagasi untuk didaftarkan?', 'Ah-pah-KAH AHN-dah mem-BAH-wah bah-GAH-see...'],
    ['Haben Sie Gepäck zum Einchecken?', 'HAH-ben zee geh-PEK tsoom INE-chek-en?'],
    ['お預けになる荷物はありますか？', 'Oazuke ni naru nimotsu wa arimasu ka?'],
    ['ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਜਮ੍ਹਾਂ ਕਰਵਾਉਣ ਲਈ ਕੋਈ ਬੈਗ ਹੈ?', 'Ki tuhade kol jama karvaun layee koi bag hai?'],
    ['Je, una mizigo ya kusajili ndani ya ndege?', 'JEH, OO-nah mee-ZEE-goh yah koo-sah-JEE-lee?'],
    ['तुमच्याकडे चेक-इन करण्यासाठी बॅग आहेत का?', 'Tumchyakade check-in karnyasathi bag aahet kaa?'],
    ['మీ దగ్గర చెక్-ఇన్ చేయడానికి బ్యాగులు ఉన్నాయా?', 'Mee daggara check-in cheyadaniki bags unnaaya?'],
    ['Uçağa verilecek bagajınız var mı?', 'Oo-chah-GAH veh-ree-leh-JEHK bah-gah-zhuh-NUHZ vahr muh?'],
    ['உங்களிடம் பதிவு செய்ய ஏதேனும் பைகள் உள்ளதா?', 'Ungalidam padhivu seiya edhenum paigal ulladha?'],
    ['Bạn có hành lý nào cần ký gửi không?', 'Bahn kaw hahnh lee now kahn kee gooy khawng?']
  )
});

// 105
data.push({
  id: 105, category: 'Airport & Travel',
  translations: t(
    ['I only have one carry-on bag and a backpack.', 'eye OHN-lee hav wun KAIR-ee-on bag and a BAK-pak.'],
    ['我只有一个随身行李箱和一个双肩包。', 'Wǒ zhǐyǒu yī gè suíshēn xínglǐxiāng hé yī gè shuāngjiānbāo.'],
    ['मेरे पास केवल एक केबिन बैग और एक बैकपैक है।', 'Mere paas kewal ek cabin bag aur ek backpack hai.'],
    ['Solo tengo una maleta de mano y una mochila.', 'SOH-loh TEHN-goh OO-nah mah-LEH-tah deh MAH-noh ee OO-nah moh-CHEE-lah.'],
    ['J\'ai seulement un bagage de cabine et un sac à dos.', 'Zhay suhl-MAHN uhn bah-GAHZH duh kah-BEEN ay uhn sahk ah DOH.'],
    ['لدي فقط حقيبة يد ومحفظة ظهر.', 'Ladayya faqat haqibat yad wa-mihfazat zahr.'],
    ['আমার কেবল একটি কেবিন ব্যাগ এবং একটি ব্যাকপ্যাক আছে।', 'Amar kebol ekti cabin bag ebong ekti backpack ache.'],
    ['Eu só tenho uma mala de mão e uma mochila.', 'Eh-oo SOH TAYN-yoo OO-mah MAH-lah jee MOWN ee OO-mah moh-SHEE-lah.'],
    ['У меня только ручная кладь и рюкзак.', 'Oo mye-NYAH TOHL-kuh rooch-NAH-yah KLAHD ee ryook-ZAHK.'],
    ['میرے پاس صرف ایک ہینڈ کیری اور ایک بیگ پیک ہے۔', 'Mere paas sirf ek hand-carry aur backpack hai.'],
    ['Saya hanya membawa koper kabin dan ransel.', 'SAH-yah HAHN-yah mem-BAH-wah KOH-per KAH-bin dahn RAHN-sel.'],
    ['Ich habe nur ein Handgepäckstück und einen Rucksack.', 'Ikh HAH-beh noor ine HAHNT-geh-pek-stook oont EYE-nen ROOK-zahk.'],
    ['機内持ち込みバッグ一つとリュックサックだけです。', 'Kinai mochikomi baggu hitotsu to ryukkusakku dake desu.'],
    ['ਮੇਰੇ ਕੋਲ ਸਿਰਫ਼ ਇੱਕ ਹੈਂਡ-ਕੈਰੀ ਅਤੇ ਇੱਕ ਬੈਕਪੈਕ ਹੈ।', 'Mere kol sirf ikk hand-carry ate ikk backpack hai.'],
    ['Nina begi moja la mkononi na mkoba tu.', 'NEE-nah BEH-gee MOH-jah lah m-koh-NOH-nee...'],
    ['माझ्याकडे फक्त एक हॅन्ड बॅग आणि एक पाठीवरची बॅग आहे.', 'Maajhyakade phakta ek hand bag aani backpack aahe.'],
    ['నా వద్ద కేవలం ఒక క్యారీ-ఆన్ బ్యాగ్ మరియు బ్యాక్‌ప్యాక్ ఉన్నాయి.', 'Naa vadda kevalam oka carry-on bag mariyu backpack unnaayi.'],
    ['Sadece bir kabin boy valizim ve bir sırt çantam var.', 'SAH-deh-jeh beer kah-BEEN boy vah-lee-ZEEM...'],
    ['என்னிடம் ஒரு சிறிய கைப்பை மற்றும் முதுகுப்பை மட்டுமே உள்ளது.', 'Ennidam oru siriya kaippai matrum mudhuguppai mattume ulladhu.'],
    ['Tôi chỉ có một hành lý xách tay và một ba lô.', 'Toy chee kaw moht hahnh lee sahk tye vah moht bah loh.']
  )
});

// We can add sentences 106 to 150 systematically using a loop of rich phrase templates:
const rawList = [
  {
    id: 106, cat: 'Airport & Travel',
    en: ['Is my flight on schedule or delayed?', 'iz my flyte on SKED-yool or dee-LAYD?'],
    zh: ['我的航班是准点还是延误了？', 'Wǒ de hángbān shì zhǔndiǎn háishì yánwù le?'],
    hi: ['क्या मेरी उड़ान समय पर है या विलंबित है?', 'Kya meri udaan samay par hai ya der se hai?'],
    es: ['¿Mi vuelo está a tiempo o retrasado?', 'Mee VWEH-loh ehs-TAH ah TYEHM-poh oh reh-trah-SAH-doh?'],
    fr: ['Mon vol est-il à l\'heure ou retardé ?', 'Mohn vol eh-teel ah LUHR oo ruh-tahr-DAY?'],
    ar: ['هل رحلتي في موعدها أم متأخرة؟', 'Hal rihlati fee maw\'idiha am muta\'akh-khirah?'],
    bn: ['আমার ফ্লাইট কি সময়মতো আছে নাকি দেরি হবে?', 'Amar flight ki shomoymoto ache naki deri hobe?'],
    pt: ['Meu voo está no horário ou atrasado?', 'Meh-oo VOH-oo ehs-TAH noo oh-RAH-ryoo oh ah-trah-ZAH-doo?'],
    ru: ['Мой рейс вылетает по расписанию или задерживается?', 'Moy reys vy-lye-TAH-yet pah rah-spee-SAH-nee-yoo...'],
    ur: ['کیا میری فلائٹ وقت پر ہے یا تاخیر کا شکار ہے؟', 'Kya meri flight waqt par hai ya takheer ka shikar hai?'],
    id: ['Apakah penerbangan saya tepat waktu atau tertunda?', 'Ah-pah-KAH peh-ner-BAHNG-an SAH-yah teh-PAHT WAHK-too...'],
    de: ['Ist mein Flug pünktlich oder verspätet?', 'Ist mine floog POONKT-likh oh-der fehr-SHPAY-tet?'],
    ja: ['私の便は定刻通りですか、遅延していますか？', 'Watashi no bin wa teikoku doori desu ka, chien shite imasu ka?'],
    pa: ['ਕੀ ਮੇਰੀ ਉਡਾਣ ਸਮੇਂ ਸਿਰ ਹੈ ਜਾਂ ਦੇਰੀ ਨਾਲ ਹੈ?', 'Ki meri udaan samey sir hai jaan deri naal hai?'],
    sw: ['Je, ndege yangu inatoka kwa wakati au imechelewa?', 'JEH, n-DEH-geh YAHN-goo ee-nah-TOH-kah...'],
    mr: ['माझी फ्लाईट वेळेवर आहे की उशीर झाला आहे?', 'Maajhi flight velevar aahe ki usheer zhaala aahe?'],
    te: ['నా విమానం సమయానికి బయలుదేరుతుందా లేదా ఆలస్యమవుతుందా?', 'Naa vimaanam samayaaniki bayaluderuthundaa ledha aalasyamavuthundaa?'],
    tr: ['Uçuşum zamanında mı yoksa rötar mı var?', 'Oo-choo-SHOOM zah-mah-nuhn-DAH muh yohk-sah roh-TAHR muh vahr?'],
    ta: ['எனது விமானம் சரியான நேரத்திலா அல்லது தாமதமாகவா புறப்படும்?', 'Enadhu vimaanam sariyaana nerathilaa alladhu thaamadhamaagavaa?'],
    vi: ['Chuyến bay của tôi đúng giờ hay bị hoãn vậy?', 'Chwee-un bye koo-ah toy doong zoh hay bee hwahn vay?']
  },
  {
    id: 107, cat: 'Airport & Travel',
    en: ['Which gate does the flight depart from?', 'wich gayt duz the flyte dih-PART frum?'],
    zh: ['航班从哪个登机口出发？', 'Hángbān cóng nǎge dēngjīkǒu chūfā?'],
    hi: ['उड़ान किस गेट से प्रस्थान करेगी?', 'Udaan kis gate se prasthan karegi?'],
    es: ['¿De qué puerta sale el vuelo?', 'Deh kay PWEHR-tah SAH-leh el VWEH-loh?'],
    fr: ['De quelle porte part le vol ?', 'Duh kel pohrt pahr luh vol?'],
    ar: ['من أي بوابة تغادر الرحلة؟', 'Min ayyi bawwaba tughadiru al-rihla?'],
    bn: ['ফ্লাইটটি কোন গেট থেকে ছাড়বে?', 'Flight-ti kon gate theke charbe?'],
    pt: ['De qual portão parte o voo?', 'Jee kwahl pohr-TOWN PAHR-chee oo VOH-oo?'],
    ru: ['От какого выхода отправляется рейс?', 'Aht kah-KOH-vah VY-khuh-dah oht-prahv-LYAH-yet-sah reys?'],
    ur: ['فلائٹ کس گیٹ سے روانہ ہوگی؟', 'Flight kis gate se rawana hogi?'],
    id: ['Dari gerbang mana penerbangan berangkat?', 'DAH-ree GER-bahng MAH-nah peh-ner-BAHNG-an beh-RAHNG-kaht?'],
    de: ['Von welchem Gate fliegt die Maschine ab?', 'Fohn VEL-khem gate fleekt dee mah-SHEE-neh ahp?'],
    ja: ['便は何番ゲートから出発しますか？', 'Bin wa nan-ban geeto kara shuppatsu shimasu ka?'],
    pa: ['ਉਡਾਣ ਕਿਸ ਗੇਟ ਤੋਂ ਰਵਾਨਾ ਹੁੰਦੀ ਹੈ?', 'Udaan kis gate ton ravana hundi hai?'],
    sw: ['Ndege inaondoka kutoka geti gani?', 'n-DEH-geh ee-nah-ohn-DOH-kah koo-TOH-kah GEH-tee GAH-nee?'],
    mr: ['फ्लाईट कोणत्या गेटवरून सुटेल?', 'Flight kontya gate varun sutel?'],
    te: ['విమానం ఏ గేటు నుంచి బయలుదేరుతుంది?', 'Vimaanam ae gate nunchi bayaluderuthundi?'],
    tr: ['Uçuş hangi kapıdan kalkıyor?', 'Oo-choosh hahn-GEE kah-puh-DAHN kahl-KUH-yor?'],
    ta: ['விமானம் எந்த வாயிலிலிருந்து புறப்படுகிறது?', 'Vimaanam endha vaayililirundhu purappadugiradhu?'],
    vi: ['Chuyến bay khởi hành từ cửa nào?', 'Chwee-un bye khoy hahnh too koo-ah now?']
  },
  {
    id: 108, cat: 'Airport & Travel',
    en: ['The departure gate has changed to B12.', 'the dih-PAR-cher gayt haz chaynjd too bee-twelv.'],
    zh: ['登机口已变更为B12。', 'Dēngjīkǒu yǐ biàngēng wèi B shí\'èr.'],
    hi: ['प्रस्थान गेट बदलकर बी-12 कर दिया गया है।', 'Prasthan gate badalkar B-12 kar diya gaya hai.'],
    es: ['La puerta de embarque ha cambiado a B12.', 'Lah PWEHR-tah deh em-BAR-keh ah kahm-BYAH-doh ah beh-doh-seh.'],
    fr: ['La porte d\'embarquement est passée à B12.', 'Lah pohrt dahm-bar-kuh-MAHN eh pah-SAY ah B12.'],
    ar: ['تم تغيير بوابة المغادرة إلى B12.', 'Tamma taghyeeru bawwabatil-mughadarati ila B12.'],
    bn: ['প্রস্থান গেট পরিবর্তন করে B12 করা হয়েছে।', 'Prosthan gate poriborton kore B12 kora hoyeche.'],
    pt: ['O portão mudou para B12.', 'Oo pohr-TOWN moo-DOH PAH-rah B12.'],
    ru: ['Выход на посадку изменен на B12.', 'VY-khuhd nah pah-SAHD-koo eez-mye-NYOHN nah B12.'],
    ur: ['روانگی کا گیٹ بی-12 میں تبدیل ہو گیا ہے۔', 'Rawangi ka gate B-12 mein tabdeel ho gaya hai.'],
    id: ['Pintu keberangkatan telah dipindahkan ke B12.', 'PEEN-too keh-beh-rahng-KAH-tahn dee-PEEN-dah-kahn ke B12.'],
    de: ['Das Abfluggate wurde auf B12 geändert.', 'Dahs AHP-floog-gate voor-deh owf B12 geh-EN-dert.'],
    ja: ['出発ゲートがB12に変更されました。', 'Shuppatsu geeto ga B12 ni henkou saremashita.'],
    pa: ['ਰਵਾਨਗੀ ਗੇਟ ਬਦਲ ਕੇ ਬੀ-12 ਹੋ ਗਿਆ ਹੈ।', 'Ravangi gate badal ke B-12 ho gaya hai.'],
    sw: ['Geti la kuondoka limebadilishwa kuwa B12.', 'GEH-tee lah koo-ohn-DOH-kah lee-meh-bah-dee-LEESH-wah B12.'],
    mr: ['बोर्डिंग गेट बदलून बी-१२ झाले आहे.', 'Boarding gate badalun B-12 zhaale aahe.'],
    te: ['గేటు B12 కు మార్చబడింది.', 'Gate B12 ku maarchabadindi.'],
    tr: ['Biniş kapısı B12 olarak değişti.', 'BEE-neesh kah-puh-SUH B12 oh-lah-RAHK deh-YEESH-tee.'],
    ta: ['வாயில் B12-ஆக மாற்றப்பட்டுள்ளது.', 'Vaayil B12-aaga maatrappattulladhu.'],
    vi: ['Cổng khởi hành đã đổi sang B12.', 'Kawng khoy hahnh dah doy sahng B12.']
  },
  {
    id: 109, cat: 'Airport & Security',
    en: ['Please proceed to the security checkpoint.', 'pleez proh-SEED too the sih-KYOOR-ih-tee CHEK-poynt.'],
    zh: ['请前往安全检查通道。', 'Qǐng qiánwǎng ānquán jiǎnchá tōngdào.'],
    hi: ['कृपया सुरक्षा जांच चौकी पर जाएं।', 'Kripya suraksha jaanch chowki par jayein.'],
    es: ['Por favor, diríjase al control de seguridad.', 'Por fah-VOR dee-REE-khah-seh ahl kohn-TROL deh seh-goo-ree-DAHD.'],
    fr: ['Veuillez passer au contrôle de sécurité.', 'Vuh-yay pah-SAY oh kohn-TROHL duh say-koo-ree-TAY.'],
    ar: ['يرجى التوجه إلى نقطة التفتيش الأمنية.', 'Yurja al-tawajjuh ila nuqtat al-tafteesh al-amniyyah.'],
    bn: ['দয়া করে নিরাপত্তা চৌকির দিকে এগিয়ে যান।', 'Doya kore nirapotta chowkir dike egiye jan.'],
    pt: ['Por favor, siga para a inspeção de segurança.', 'Por fah-VOR SEE-gah PAH-rah ah eens-peh-SOWN jee seh-goo-RAHN-sah.'],
    ru: ['Пожалуйста, пройдите на пункт досмотра.', 'Pah-ZHAH-loo-stah pry-DEE-tye nah poonkt dahs-MOHT-rah.'],
    ur: ['براہ کرم سیکیورٹی چیک پوسٹ پر جائیے۔', 'Barahe karam security check post par jaiye.'],
    id: ['Silakan menuju pos pemeriksaan keamanan.', 'See-LAH-kahn meh-NOO-joo pohs peh-meh-REEK-sah-ahn...'],
    de: ['Bitte gehen Sie zur Sicherheitskontrolle.', 'BIT-teh GAY-en zee tsoor ZEE-kher-hytes-kohn-troh-leh.'],
    ja: ['保安検査場へお進みください。', 'Hoan kensajou e osusumi kudasai.'],
    pa: ['ਕਿਰਪਾ ਕਰਕੇ ਸੁਰੱਖਿਆ ਚੌਕੀ ਵੱਲ ਜਾਓ।', 'Kirpa karke surakhya chowki vall jao.'],
    sw: ['Tafadhali nenda kwenye ukaguzi wa kiusalama.', 'Tah-fah-DHAH-lee NEN-dah kwen-yeh oo-kah-GOO-zee...'],
    mr: ['कृपया सुरक्षा तपासणीकडे जा.', 'Krupaya suraksha tapaasneekade jaa.'],
    te: ['దయచేసి సెక్యూరిటీ చెక్ పాయింట్ వద్దకు వెళ్ళండి.', 'Dayachesi security check point vaddaku vellandi.'],
    tr: ['Lütfen güvenlik kontrolüne gidiniz.', 'LEOT-fen goo-ven-LEEK kohn-troh-leo-neh GEE-dee-neez.'],
    ta: ['பாதுகாப்பு சோதனைச் சாவடிக்கு செல்லுங்கள்.', 'Paadhukaappu sodhanai saavadikku sellungal.'],
    vi: ['Xin hãy đến điểm kiểm tra an ninh.', 'Sin hye den deem keem trah ahn neenh.']
  },
  {
    id: 110, cat: 'Airport & Baggage',
    en: ['Where is baggage claim carousel number four?', 'wair iz BAG-ij klaym kair-oo-SEL NUM-ber for?'],
    zh: ['四号行李提取转盘在哪里？', 'Sì hào xínglǐ tíqǔ zhuànpán zài nǎlǐ?'],
    hi: ['सामान लेने वाला चार नंबर बेल्ट कहाँ है?', 'Samaan lene wala chaar number belt kahan hai?'],
    es: ['¿Dónde está la cinta de recogida de equipaje número cuatro?', 'DOHN-deh ehs-TAH lah SEEN-tah deh reh-koh-KHEE-dah...'],
    fr: ['Où se trouve le carrousel à bagages numéro quatre ?', 'Oo suh troov luh kah-roo-ZEL ah bah-GAHZH noo-may-ROH KAHT-ruh?'],
    ar: ['أين سير استلام الحقائب رقم أربعة؟', 'Ayna sayru istilam al-haqa\'ib raqam arba\'a?'],
    bn: ['চার নম্বর লাগেজ সংগ্রহের বেল্টটি কোথায়?', 'Chaar number luggage shonggroher belt-ti kothay?'],
    pt: ['Onde fica a esteira de bagagens número quatro?', 'OHN-jee FEE-kah ah ehs-TAY-rah jee bah-GAH-zhenz...'],
    ru: ['Где лента выдачи багажа номер четыре?', 'Gde LYEN-tah VY-dah-chee bah-GAH-zhah NOH-myeer cheh-TY-reh?'],
    ur: ['سامان کی وصولی کے لیے بیلٹ نمبر چار کہاں ہے؟', 'Samaan ki wasooli ke liye belt number chaar kahan hai?'],
    id: ['Di mana tempat pengambilan bagasi nomor empat?', 'Dee MAH-nah tehm-PAHT peng-ahm-BEE-lahn bah-GAH-see...'],
    de: ['Wo ist das Gepäckband Nummer vier?', 'Voh ist dahs geh-PEK-bahnt NOO-mer feer?'],
    ja: ['4番の荷物受取ターンテーブルはどこですか？', 'Yon-ban no nimotsu uketori taanteeburu wa doko desu ka?'],
    pa: ['ਸਾਮਾਨ ਲੈਣ ਵਾਲੀ ਚਾਰ ਨੰਬਰ ਬੈਲਟ ਕਿੱਥੇ ਹੈ?', 'Samaan lain wali chaar number belt kithe hai?'],
    sw: ['Utepe wa nne wa kuchukulia mizigo uko wapi?', 'Oo-TEH-peh wah n-neh wah koo-choo-koo-LEE-ah mee-ZEE-goh...'],
    mr: ['सामान घेण्याचा बेल्ट क्रमांक चार कुठे आहे?', 'Samaan ghenyacha belt kramaank chaar kuthe aahe?'],
    te: ['లగేజ్ తీసుకునే బెల్ట్ నంబర్ నాలుగు ఎక్కడ ఉంది?', 'Luggage theesukune belt number naalugu ekkada undi?'],
    tr: ['Dört numaralı bagaj alım bandı nerede?', 'Durt noo-mah-rah-LUH bah-GAHZH ah-LUHM bahn-DUH NEH-reh-deh?'],
    ta: ['நான்காம் எண் சாமான்கள் பெறும் பட்டை எங்கே உள்ளது?', 'Naangaam enn saamangal perum pattai enge ulladhu?'],
    vi: ['Băng chuyền hành lý số bốn ở đâu?', 'Bahng chwee-un hahnh lee soh bawn uh dow?']
  }
];

rawList.forEach(item => {
  data.push({
    id: item.id,
    category: item.cat,
    translations: t(
      item.en, item.zh, item.hi, item.es, item.fr,
      item.ar, item.bn, item.pt, item.ru, item.ur,
      item.id_lang || item.id_val || item.id, // safe
      item.de, item.ja, item.pa, item.sw,
      item.mr, item.te, item.tr, item.ta, item.vi
    )
  });
});

console.log('Batch 3 item count currently:', data.length);
