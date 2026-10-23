// scripts/generators/make_batch3.cjs
const fs = require('fs');
const path = require('path');
const { writeBatchFile } = require('../generate_all_batches.cjs');

// Complete 50 sentences for Batch 3 (IDs 101 to 150)
const items = [
  // 101 - 110: Airport & Boarding
  {
    id: 101, category: 'Airport & Flights',
    translations: {
      en: ['Where is the check-in counter for flight 302?', 'wair iz the CHEK-in kown-ter for flyte three-oh-too?'],
      zh: ['302航班的值机柜台在哪里？', 'Sān líng èr hángbān de zhíjī guìtái zài nǎlǐ?'],
      hi: ['उड़ान 302 के लिए चेक-इन काउंटर कहाँ है?', 'Udaan 302 ke liye check-in counter kahan hai?'],
      es: ['¿Dónde está el mostrador de facturación para el vuelo 302?', 'DOHN-deh ehs-TAH el mohs-trah-DOR deh fahk-too-rah-SYOHN?'],
      fr: ['Où est le comptoir d\'enregistrement pour le vol 302 ?', 'oo eh luh kohn-TWAR dahn-ruh-zheest-RUH-mahn poor luh vol 302?'],
      ar: ['أين مكتب تسجيل الوصول للرحلة رقم 302؟', 'Ayna maktab tasjeel al-wusool li-rihla raqam 302?'],
      bn: ['৩০২ নম্বর ফ্লাইটের চেক-ইন কাউন্টারটি কোথায়?', '302 number flight-er check-in counter kothay?'],
      pt: ['Onde fica o balcão de check-in para o voo 302?', 'OHN-jee FEE-kah oo bahl-KOWN jee check-in pah-rah oo VOH-oo?'],
      ru: ['Где находится стойка регистрации на рейс 302?', 'Gde na-KHO-deet-sya STOY-kah ree-gee-STRAHT-see na reys 302?'],
      ur: ['فلائٹ 302 کا چیک اِن کاؤنٹر کہاں ہے؟', 'Flight 302 ka check-in counter kahan hai?'],
      id: ['Di mana loket check-in untuk penerbangan 302?', 'Dee MAH-nah LOH-ket check-in oon-took peh-ner-BAHNG-an 302?'],
      de: ['Wo ist der Check-in-Schalter für Flug 302?', 'voh ist dehr CHECK-in SHAHL-ter feor floog 302?'],
      ja: ['302便のチェックインカウンターはどこですか？', 'San-maru-ni bin no chekkuin kauntaa wa doko desu ka?'],
      pa: ['ਉਡਾਣ 302 ਲਈ ਚੈੱਕ-ਇਨ ਕਾਊਂਟਰ ਕਿੱਥੇ ਹੈ?', 'Udaan 302 layee check-in counter kithe hai?'],
      sw: ['Dawati la kukagulia tiketi la ndege 302 liko wapi?', 'DAH-wah-tee lah koo-kah-goo-LEE-ah tee-KEH-tee...'],
      mr: ['फ्लाईट ३०२ चे चेक-इन काउंटर कुठे आहे?', 'Flight 302 che check-in counter kuthe aahe?'],
      te: ['విమానం 302 కొరకు చెక్-ఇన్ కౌంటర్ ఎక్కడ ఉంది?', 'Vimaanam 302 koraku check-in counter ekkada undi?'],
      tr: ['302 sefer sayılı uçuş için check-in kontuarı nerede?', '302 seh-FER sah-yuh-LUH oo-CHOOSH ee-CHEEN check-in kohn-twar-uh NEH-reh-deh?'],
      ta: ['விமானம் 302-க்கான சரிபார்ப்பு கவுண்டர் எங்கே உள்ளது?', 'Vimaanam 302-kkaana saribaarppu counter enge ulladhu?'],
      vi: ['Quầy làm thủ tục cho chuyến bay 302 ở đâu?', 'Kway lahm thoo took chaw chwee-un bye 302 uh dow?']
    }
  },
  {
    id: 102, category: 'Airport & Flights',
    translations: {
      en: ['May I see your passport and ticket, please?', 'may eye see yor PASS-port and TIK-it, pleez?'],
      zh: ['请出示您的护照和机票。', 'Qǐng chūshì nín de hùzhào hé jīpiào.'],
      hi: ['कृपया अपना पासपोर्ट और टिकट दिखाएं।', 'Kripya apna passport aur ticket dikhayein.'],
      es: ['¿Puedo ver su pasaporte y billete, por favor?', 'PWEH-doh vehr soo pah-sah-POR-teh ee bee-YEH-teh?'],
      fr: ['Puis-je voir votre passeport et votre billet, s\'il vous plaît ?', 'pweezh vwar VOHT-ruh pahs-POHR ay VOHT-ruh bee-YAY?'],
      ar: ['هل يمكنني رؤية جواز سفرك وتذكرتك من فضلك؟', 'Hal yumkinuni ru\'yat jawaz safarika wa-tadhkaratika min fadlik?'],
      bn: ['অনুগ্রহ করে আপনার পাসপোর্ট এবং টিকিট দেখতে পারি?', 'Onugroho kore apnar passport ebong ticket dekhte pari?'],
      pt: ['Posso ver seu passaporte e passagem, por favor?', 'POH-soo vehr seh-oo pah-sah-POR-chee ee pah-SAH-zhem?'],
      ru: ['Пожалуйста, покажите ваш паспорт и билет.', 'Pah-ZHAH-loo-stah pah-kah-ZHY-tye vahsh PAHS-port ee bee-LYET.'],
      ur: ['براہ کرم اپنا پاسپورٹ اور ٹکٹ دکھائیے۔', 'Barahe karam apna passport aur ticket dikhaiye.'],
      id: ['Boleh saya melihat paspor dan tiket Anda?', 'BOH-leh SAH-yah meh-LEE-haht PAHS-por dahn TEE-ket AHN-dah?'],
      de: ['Darf ich bitte Ihren Reisepass und Ihr Flugticket sehen?', 'darf ikh BIT-teh EE-ren RYE-zeh-pahs oont eer FLOOG-tik-et zay-en?'],
      ja: ['パスポートと航空券を拝見できますか？', 'Pasupooto to koukuuken o haiken dekimasu ka?'],
      pa: ['ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪਾਸਪੋਰਟ ਅਤੇ ਟਿਕਟ ਦਿਖਾਓ।', 'Kirpa karke aapna passport ate ticket dikhao.'],
      sw: ['Naomba kuona pasipoti na tiketi yako, tafadhali?', 'Nah-OHM-bah koo-OH-nah pah-see-POH-tee nah tee-KEH-tee...'],
      mr: ['कृपया तुमचा पासपोर्ट आणि तिकीट दाखवाल का?', 'Krupaya tumcha passport aani ticket daakhvaal kaa?'],
      te: ['దయచేసి మీ పాస్‌పోర్ట్ మరియు టికెట్ చూపించగలరా?', 'Dayachesi mee passport mariyu ticket choopincha-galara?'],
      tr: ['Pasaportunuzu ve biletinizi görebilir miyim lütfen?', 'Pah-sah-POR-too-noo-zoo veh bee-leh-TEE-nee-zee geh-reh-bee-LEER mee-yeem?'],
      ta: ['தயவுசெய்து உங்கள் கடவுச்சீட்டு மற்றும் பயணச்சீட்டை காட்டவும்.', 'Dayavuseidhu ungal kadavucheettu matrum payanacheettai kaattavum.'],
      vi: ['Xin vui lòng cho tôi xem hộ chiếu và vé máy bay.', 'Sin vooy lawng chaw toy sem hoh chew vah veh mye bye.']
    }
  },
  {
    id: 103, category: 'Airport & Flights',
    translations: {
      en: ['Here is my passport and boarding pass.', 'heer iz my PASS-port and BORD-ing pass.'],
      zh: ['这是我的护照和登机牌。', 'Zhè shì wǒ de hùzhào hé dēngjīpái.'],
      hi: ['यह रहा मेरा पासपोर्ट और बोर्डिंग पास।', 'Yeh raha mera passport aur boarding pass.'],
      es: ['Aquí tiene mi pasaporte y mi tarjeta de embarque.', 'Ah-KEE tee-EH-neh mee pah-sah-POR-teh ee tahr-KHEH-tah deh em-BAR-keh.'],
      fr: ['Voici mon passeport et ma carte d\'embarquement.', 'Vwah-SEE mohn pahs-POHR ay mah kahrt dahm-bar-kuh-MAHN.'],
      ar: ['ها هو جواز سفري وبطاقة صعود الطائرة.', 'Ha huwa jawaz safari wa-bitaqat su\'ood al-ta\'irah.'],
      bn: ['এই যে আমার পাসপোর্ট এবং বোর্ডিং পাস।', 'Ei je amar passport ebong boarding pass.'],
      pt: ['Aqui está meu passaporte e cartão de embarque.', 'Ah-KEE ehs-TAH meh-oo pah-sah-POR-chee ee kahr-TOWN jee em-BAHR-kee.'],
      ru: ['Вот мой паспорт и посадочный талон.', 'Voht moy PAHS-port ee pah-SAH-duch-nyy tah-LOHN.'],
      ur: ['یہ میرا پاسپورٹ اور بورڈنگ پاس ہے۔', 'Yeh mera passport aur boarding pass hai.'],
      id: ['Ini paspor dan boarding pass saya.', 'EE-nee PAHS-por dahn boarding pass SAH-yah.'],
      de: ['Hier sind mein Reisepass und meine Bordkarte.', 'heer zint mine RYE-zeh-pahs oont MY-neh BORT-kahr-teh.'],
      ja: ['こちらが私のパスポートと搭乗券です。', 'Kochira ga watashi no pasupooto to toujouken desu.'],
      pa: ['ਇਹ ਮੇਰਾ ਪਾਸਪੋਰਟ ਅਤੇ ਬੋਰਡਿੰਗ ਪਾਸ ਹੈ।', 'Eh mera passport ate boarding pass hai.'],
      sw: ['Hapa kuna pasipoti yangu na kadi ya kupanda ndege.', 'HAH-pah KOO-nah pah-see-POH-tee YAHN-goo...'],
      mr: ['हे माझे पासपोर्ट आणि बोर्डिंग पास आहे.', 'He maajhe passport aani boarding pass aahe.'],
      te: ['ఇదిగో నా పాస్‌పోర్ట్ మరియు బోర్డింగ్ పాస్.', 'Idhigo naa passport mariyu boarding pass.'],
      tr: ['İşte pasaportum ve biniş kartım.', 'EESH-teh pah-sah-POR-toom veh BEE-neesh kahr-TUHM.'],
      ta: ['இதோ எனது கடவுச்சீட்டு மற்றும் ஏறும் அட்டை.', 'Idho enadhu kadavucheettu matrum aerum attai.'],
      vi: ['Đây là hộ chiếu và thẻ lên máy bay của tôi.', 'Day lah hoh chew vah the len mye bye koo-ah toy.']
    }
  },
  {
    id: 104, category: 'Airport & Flights',
    translations: {
      en: ['Do you have any bags to check in?', 'doo yoo hav EN-ee bagz too chek in?'],
      zh: ['您有行李需要托运吗？', 'Nín yǒu xínglǐ xūyào tuōyùn ma?'],
      hi: ['क्या आपके पास जमा करने के लिए कोई बैग है?', 'Kya aapke paas check-in ke liye koi bag hai?'],
      es: ['¿Tiene maletas para facturar?', 'TYEH-neh mah-LEH-tahs PAH-rah fahk-too-RAHR?'],
      fr: ['Avez-vous des bagages à enregistrer ?', 'Ah-vay VOO day bah-GAHZH ah ahn-ruh-zheest-RAY?'],
      ar: ['هل لديك أي حقائب لتسجيلها وشحنها؟', 'Hal ladayka ayyu haqa\'ib li-tasjeeliha?'],
      bn: ['আপনার কি চেক-ইন করার মতো লাগেজ আছে?', 'Apnar ki check-in korar moto luggage ache?'],
      pt: ['Você tem bagagem para despachar?', 'Voh-SAY taym bah-GAH-zhem pah-rah des-pah-SHAHR?'],
      ru: ['У вас есть багаж для сдачи?', 'Oo vahs yest bah-GAHZH dlya SDAH-chee?'],
      ur: ['کیا آپ کے پاس بُک کروانے کے لیے کوئی بیگ ہے؟', 'Kya aap ke paas check-in ke liye koi bag hai?'],
      id: ['Apakah Anda membawa bagasi untuk didaftarkan?', 'Ah-pah-KAH AHN-dah mem-BAH-wah bah-GAH-see...'],
      de: ['Haben Sie Gepäck zum Einchecken?', 'HAH-ben zee geh-PEK tsoom INE-chek-en?'],
      ja: ['お預けになる荷物はありますか？', 'Oazuke ni naru nimotsu wa arimasu ka?'],
      pa: ['ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਜਮ੍ਹਾਂ ਕਰਵਾਉਣ ਲਈ ਕੋਈ ਬੈਗ ਹੈ?', 'Ki tuhade kol jama karvaun layee koi bag hai?'],
      sw: ['Je, una mizigo ya kusajili ndani ya ndege?', 'JEH, OO-nah mee-ZEE-goh yah koo-sah-JEE-lee?'],
      mr: ['तुमच्याकडे चेक-इन करण्यासाठी बॅग आहेत का?', 'Tumchyakade check-in karnyasathi bag aahet kaa?'],
      te: ['మీ దగ్గర చెక్-ఇన్ చేయడానికి బ్యాగులు ఉన్నాయా?', 'Mee daggara check-in cheyadaniki bags unnaaya?'],
      tr: ['Uçağa verilecek bagajınız var mı?', 'Oo-chah-GAH veh-ree-leh-JEHK bah-gah-zhuh-NUHZ vahr muh?'],
      ta: ['உங்களிடம் பதிவு செய்ய ஏதேனும் பைகள் உள்ளதா?', 'Ungalidam padhivu seiya edhenum paigal ulladha?'],
      vi: ['Bạn có hành lý nào cần ký gửi không?', 'Bahn kaw hahnh lee now kahn kee gooy khawng?']
    }
  },
  {
    id: 105, category: 'Airport & Flights',
    translations: {
      en: ['I only have one carry-on bag and a backpack.', 'eye OHN-lee hav wun KAIR-ee-on bag and a BAK-pak.'],
      zh: ['我只有一个随身行李箱和一个双肩包。', 'Wǒ zhǐyǒu yī gè suíshēn xínglǐxiāng hé yī gè shuāngjiānbāo.'],
      hi: ['मेरे पास केवल एक केबिन बैग और एक बैकपैक है।', 'Mere paas kewal ek cabin bag aur ek backpack hai.'],
      es: ['Solo tengo una maleta de mano y una mochila.', 'SOH-loh TEHN-goh OO-nah mah-LEH-tah deh MAH-noh ee OO-nah moh-CHEE-lah.'],
      fr: ['J\'ai seulement un bagage de cabine et un sac à dos.', 'Zhay suhl-MAHN uhn bah-GAHZH duh kah-BEEN ay uhn sahk ah DOH.'],
      ar: ['لدي فقط حقيبة يد ومحفظة ظهر.', 'Ladayya faqat haqibat yad wa-mihfazat zahr.'],
      bn: ['আমার কেবল একটি কেবিন ব্যাগ এবং একটি ব্যাকপ্যাক আছে।', 'Amar kebol ekti cabin bag ebong ekti backpack ache.'],
      pt: ['Eu só tenho uma mala de mão e uma mochila.', 'Eh-oo SOH TAYN-yoo OO-mah MAH-lah jee MOWN ee OO-mah moh-SHEE-lah.'],
      ru: ['У меня только ручная кладь и рюкзак.', 'Oo mye-NYAH TOHL-kuh rooch-NAH-yah KLAHD ee ryook-ZAHK.'],
      ur: ['میرے پاس صرف ایک ہینڈ کیری اور ایک بیگ پیک ہے۔', 'Mere paas sirf ek hand-carry aur backpack hai.'],
      id: ['Saya hanya membawa koper kabin dan ransel.', 'SAH-yah HAHN-yah mem-BAH-wah KOH-per KAH-bin dahn RAHN-sel.'],
      de: ['Ich habe nur ein Handgepäckstück und einen Rucksack.', 'Ikh HAH-beh noor ine HAHNT-geh-pek-stook oont EYE-nen ROOK-zahk.'],
      ja: ['機内持ち込みバッグ一つとリュックサックだけです。', 'Kinai mochikomi baggu hitotsu to ryukkusakku dake desu.'],
      pa: ['ਮੇਰੇ ਕੋਲ ਸਿਰਫ਼ ਇੱਕ ਹੈਂਡ-ਕੈਰੀ ਅਤੇ ਇੱਕ ਬੈਕਪੈਕ ਹੈ।', 'Mere kol sirf ikk hand-carry ate ikk backpack hai.'],
      sw: ['Nina begi moja la mkononi na mkoba tu.', 'NEE-nah BEH-gee MOH-jah lah m-koh-NOH-nee...'],
      mr: ['माझ्याकडे फक्त एक हॅन्ड बॅग आणि एक पाठीवरची बॅग आहे.', 'Maajhyakade phakta ek hand bag aani backpack aahe.'],
      te: ['నా వద్ద కేవలం ఒక క్యారీ-ఆన్ బ్యాగ్ మరియు బ్యాక్‌ప్యాక్ ఉన్నాయి.', 'Naa vadda kevalam oka carry-on bag mariyu backpack unnaayi.'],
      tr: ['Sadece bir kabin boy valizim ve bir sırt çantam var.', 'SAH-deh-jeh beer kah-BEEN boy vah-lee-ZEEM...'],
      ta: ['என்னிடம் ஒரு சிறிய கைப்பை மற்றும் முதுகுப்பை மட்டுமே உள்ளது.', 'Ennidam oru siriya kaippai matrum mudhuguppai mattume ulladhu.'],
      vi: ['Tôi chỉ có một hành lý xách tay và một ba lô.', 'Toy chee kaw moht hahnh lee sahk tye vah moht bah loh.']
    }
  }
];

// Helper to fill remaining batch items
const patterns = [
  // 106
  {
    id: 106, cat: 'Airport & Flights',
    en: ['Is my flight on schedule or delayed?', 'iz my flyte on SKED-yool or dee-LAYD?'],
    zh: ['我的航班是准点还是延误了？', 'Wǒ de hángbān shì zhǔndiǎn háishì yánwù le?'],
    hi: ['क्या मेरी उड़ान समय पर है या विलंबित है?', 'Kya meri udaan samay par hai ya der se hai?'],
    es: ['¿Mi vuelo está a tiempo o con retraso?', 'Mee VWEH-loh ehs-TAH ah TYEHM-poh oh kohn reh-TRAH-soh?'],
    fr: ['Mon vol est-il à l\'heure ou en retard ?', 'Mohn vol eh-teel ah LUHR oo ahn ruh-TAHR?'],
    ar: ['هل رحلتي في موعدها أم متأخرة؟', 'Hal rihlati fee maw\'idiha am muta\'akh-khirah?'],
    bn: ['আমার ফ্লাইট কি সময়মতো আছে নাকি দেরি হবে?', 'Amar flight ki shomoymoto ache naki deri hobe?'],
    pt: ['Meu voo está no horário ou atrasado?', 'Meh-oo VOH-oo ehs-TAH noo oh-RAH-ryoo oh ah-trah-ZAH-doo?'],
    ru: ['Мой рейс вылетает вовремя или задерживается?', 'Moy reys vy-lye-TAH-yet VOHV-rye-myah ee-lee zah-DYER-zhee-vah-yet-sah?'],
    ur: ['کیا میری پرواز وقت پر ہے یا تاخیر سے ہے؟', 'Kya meri parwaaz waqt par hai ya takheer se hai?'],
    id: ['Apakah penerbangan saya tepat waktu atau tertunda?', 'Ah-pah-KAH peh-ner-BAHNG-an SAH-yah teh-PAHT WAHK-too...'],
    de: ['Ist mein Flug pünktlich oder verspätet?', 'Ist mine floog POONKT-likh oh-der fehr-SHPAY-tet?'],
    ja: ['私の便は定刻通りですか、それとも遅延していますか？', 'Watashi no bin wa teikoku doori desu ka, soretomo chien shite imasu ka?'],
    pa: ['ਕੀ ਮੇਰੀ ਉਡਾਣ ਸਮੇਂ ਸਿਰ ਹੈ ਜਾਂ ਦੇਰੀ ਨਾਲ?', 'Ki meri udaan samey sir hai jaan deri naal?'],
    sw: ['Je, ndege yangu inatoka kwa wakati au imechelewa?', 'JEH, n-DEH-geh YAHN-goo ee-nah-TOH-kah...'],
    mr: ['माझी फ्लाईट वेळेवर आहे की उशीर झाला आहे?', 'Maajhi flight velevar aahe ki usheer zhaala aahe?'],
    te: ['నా విమానం సమయానికి ఉందా లేదా ఆలస్యమా?', 'Naa vimaanam samayaaniki undaa ledha aalasyamaa?'],
    tr: ['Uçuşum zamanında mı yoksa rötar yaptı mı?', 'Oo-choo-SHOOM zah-mah-nuhn-DAH muh yohk-sah roh-TAHR yahp-TUH muh?'],
    ta: ['எனது விமானம் நேரத்திலா அல்லது தாமதமா?', 'Enadhu vimaanam nerathilaa alladhu thaamadhamaa?'],
    vi: ['Chuyến bay của tôi đúng giờ hay bị trễ?', 'Chwee-un bye koo-ah toy doong zoh hay bee chay?']
  },
  // 107
  {
    id: 107, cat: 'Airport & Flights',
    en: ['Which gate does the flight to London depart from?', 'wich gayt duz the flyte too LUN-dun dih-PART frum?'],
    zh: ['飞往伦敦的航班在哪个登机口？', 'Fēi wǎng Lúndūn de hángbān zài nǎge dēngjīkǒu?'],
    hi: ['लंदन की उड़ान किस गेट से जाती है?', 'London ki udaan kis gate se jaati hai?'],
    es: ['¿De qué puerta sale el vuelo a Londres?', 'Deh kay PWEHR-tah SAH-leh el VWEH-loh ah LOHN-dres?'],
    fr: ['De quelle porte part le vol pour Londres ?', 'Duh kel pohrt pahr luh vol poor LOHN-druh?'],
    ar: ['من أي بوابة تقلع الطائرة إلى لندن؟', 'Min ayyi bawwaba tuqli\'u al-ta\'irah ila London?'],
    bn: ['লন্ডনের ফ্লাইটটি কোন গেট থেকে ছাড়বে?', 'London-er flight-ti kon gate theke charbe?'],
    pt: ['De qual portão sai o voo para Londres?', 'Jee kwahl pohr-TOWN sah-ee oo VOH-oo PAH-rah LOHN-dres?'],
    ru: ['Из каких ворот вылетает рейс на Лондон?', 'Eez kah-KEEKH vah-ROHT vy-lye-TAH-yet reys nah LOHN-duhn?'],
    ur: ['لندن جانے والی پرواز کس گیٹ سے روانہ ہوتی ہے؟', 'London jaane wali parwaaz kis gate se rawana hoti hai?'],
    id: ['Dari gerbang mana penerbangan ke London lepas landas?', 'DAH-ree GER-bahng MAH-nah peh-ner-BAHNG-an...'],
    de: ['Von welchem Gate fliegt das Flugzeug nach London ab?', 'Fohn VEL-khem gate fleekt dahs FLOOG-tsoyg nahkh London ahp?'],
    ja: ['ロンドン行きの便は何番ゲートから出ますか？', 'Rondon iki no bin wa nan-ban geeto kara demasu ka?'],
    pa: ['ਲੰਡਨ ਦੀ ਉਡਾਣ ਕਿਸ ਗੇਟ ਤੋਂ ਜਾਂਦੀ ਹੈ?', 'London di udaan kis gate ton jaandi hai?'],
    sw: ['Ndege ya kuelekea London inaondoka geti gani?', 'n-DEH-geh yah koo-eh-leh-KEH-ah London ee-nah-ohn-DOH-kah...'],
    mr: ['लंडनची फ्लाईट कोणत्या गेटवरून सुटणार आहे?', 'Londonchi flight kontya gate varun sutnaar aahe?'],
    te: ['లండన్ వెళ్ళే విమానం ఏ గేటు వద్ద ఉంది?', 'London velle vimaanam ae gate vadda undi?'],
    tr: ['Londra uçağı hangi kapıdan kalkıyor?', 'LOHN-drah oo-chah-GUH hahn-GEE kah-puh-DAHN kahl-KUH-yor?'],
    ta: ['லண்டன் விமானம் எந்த வாயிலிலிருந்து புறப்படுகிறது?', 'London vimaanam endha vaayililirundhu purappadugiradhu?'],
    vi: ['Chuyến bay đến Luân Đôn đi từ cổng nào?', 'Chwee-un bye den Lwan Dohn dee too kawng now?']
  },
  // 108
  {
    id: 108, cat: 'Airport & Flights',
    en: ['The gate has changed to gate B12.', 'the gayt haz chaynjd too gayt bee-twelv.'],
    zh: ['登机口已更改为B12。', 'Dēngjīkǒu yǐ gēnggǎi wèi B shí\'èr.'],
    hi: ['गेट बदलकर बी-12 हो गया है।', 'Gate badalkar B-12 ho gaya hai.'],
    es: ['La puerta ha cambiado a la B12.', 'Lah PWEHR-tah ah kahm-BYAH-doh ah lah beh-doh-seh.'],
    fr: ['La porte d\'embarquement est devenue B12.', 'Lah pohrt dahm-bar-kuh-MAHN eh duh-vuh-NOO B12.'],
    ar: ['تم تغيير البوابة إلى B12.', 'Tamma taghyeeru al-bawwaba ila B12.'],
    bn: ['গেট বদলে B12 করা হয়েছে।', 'Gate bodle B12 kora hoyeche.'],
    pt: ['O portão foi alterado para B12.', 'Oo pohr-TOWN foy ahl-teh-RAH-doo PAH-rah B12.'],
    ru: ['Выход на посадку изменился на B12.', 'VY-khuhd nah pah-SAHD-koo eez-mye-NEEL-syah nah B12.'],
    ur: ['گیٹ تبدیل ہو کر بی-12 ہو گیا ہے۔', 'Gate tabdeel ho kar B-12 ho gaya hai.'],
    id: ['Pintu keberangkatan diganti ke B12.', 'PEEN-too keh-beh-rahng-KAH-tahn dee-GAHN-tee ke B12.'],
    de: ['Das Gate wurde zu B12 gewechselt.', 'Dahs gate voor-deh tsoo B12 geh-VEKH-zelt.'],
    ja: ['ゲートがB12に変更されました。', 'Geeto ga B12 ni henkou saremashita.'],
    pa: ['ਗੇਟ ਬਦਲ ਕੇ ਬੀ-12 ਹੋ ਗਿਆ ਹੈ।', 'Gate badal ke B-12 ho gaya hai.'],
    sw: ['Geti limebadilishwa kuwa B12.', 'GEH-tee lee-meh-bah-dee-LEESH-wah B12.'],
    mr: ['गेट बदलून बी-१२ केले गेले आहे.', 'Gate badalun B-12 kele gele aahe.'],
    te: ['గేటు B12 గా మార్చబడింది.', 'Gate B12 gaa maarchabadindi.'],
    tr: ['Kapı B12 olarak değiştirildi.', 'KAH-puh B12 oh-lah-RAHK deh-yish-tee-REEL-dee.'],
    ta: ['வாயில் B12 ஆக மாற்றப்பட்டுள்ளது.', 'Vaayil B12 aaga maatrappattulladhu.'],
    vi: ['Cổng đổi thành B12 rồi.', 'Kawng doy thahnh B12 roy.']
  },
  // 109
  {
    id: 109, cat: 'Airport & Flights',
    en: ['Please proceed to the security checkpoint.', 'pleez proh-SEED too the sih-KYOOR-ih-tee CHEK-poynt.'],
    zh: ['请立即前往安检通道。', 'Qǐng lìjí qiánwǎng ānjiǎn tōngdào.'],
    hi: ['कृपया तुरंत सुरक्षा जांच (सिक्योरिटी) पर जाएं।', 'Kripya turant suraksha jaanch par jayein.'],
    es: ['Por favor, pase al control de seguridad.', 'Por fah-VOR PAH-seh ahl kohn-TROL deh seh-goo-ree-DAHD.'],
    fr: ['Veuillez vous présenter au contrôle de sécurité.', 'Vuh-yay voo pray-zahn-TAY oh kohn-TROHL...'],
    ar: ['يرجى الذهاب إلى التفتيش الأمني.', 'Yurja al-dhahabu ila al-tafteesh al-amni.'],
    bn: ['অনুগ্রহ করে সিকিউরিটি চেকিংয়ে যান।', 'Onugroho kore security checking-e jan.'],
    pt: ['Favor dirigir-se ao controle de segurança.', 'Fah-VOR jee-ree-ZHEER-seh ow kohn-TROH-lee...'],
    ru: ['Пожалуйста, пройдите контроль безопасности.', 'Pah-ZHAH-loo-stah pry-DEE-tye kahn-TROHL bee-zah-PAHS-nuhs-tee.'],
    ur: ['براہ کرم سیکیورٹی چیک پر تشریف لے جائیں۔', 'Barahe karam security check par tashreef le jayein.'],
    id: ['Silakan menuju pos pemeriksaan keamanan.', 'See-LAH-kahn meh-NOO-joo pohs peh-meh-REEK-sah-ahn...'],
    de: ['Bitte begeben Sie sich zur Sicherheitskontrolle.', 'BIT-teh beh-GAY-ben zee zikh tsoor ZEE-kher-hytes...'],
    ja: ['保安検査場にお進みください。', 'Hoan kensajou ni osusumi kudasai.'],
    pa: ['ਕਿਰਪਾ ਕਰਕੇ ਸੁਰੱਖਿਆ ਜਾਂਚ ਤੇ ਜਾਓ।', 'Kirpa karke surakhya jaanch te jao.'],
    sw: ['Tafadhali nenda kwenye ukaguzi wa usalama.', 'Tah-fah-DHAH-lee NEN-dah kwen-yeh oo-kah-GOO-zee...'],
    mr: ['कृपया सिक्युरिटी चेकसाठी पुढे जा.', 'Krupaya security check sathi pudhe jaa.'],
    te: ['దయచేసి సెక్యూరిటీ చెకింగ్‌కు వెళ్ళండి.', 'Dayachesi security checking ku vellandi.'],
    tr: ['Lütfen güvenlik kontrolüne geçiniz.', 'LEOT-fen goo-ven-LEEK kohn-troh-loo-NEH geh-chee-NEEZ.'],
    ta: ['பாதுகாப்பு சோதனைக்கு செல்லவும்.', 'Paadhukaappu sodhanaikku sellavum.'],
    vi: ['Xin mời bạn đến trạm kiểm tra an ninh.', 'Sin moy bahn den trahm keem trah ahn neenh.']
  },
  // 110
  {
    id: 110, cat: 'Airport & Flights',
    en: ['Where is baggage claim carousel number four?', 'wair iz BAG-ij klaym kair-oo-SEL NUM-ber for?'],
    zh: ['四号行李转盘在哪里？', 'Sì hào xínglǐ zhuànpán zài nǎlǐ?'],
    hi: ['सामान लेने वाला चार नंबर बेल्ट कहाँ है?', 'Samaan lene wala chaar number belt kahan hai?'],
    es: ['¿Dónde está la cinta cuatro de recogida de equipaje?', 'DOHN-deh ehs-TAH lah SEEN-tah KWAH-troh...'],
    fr: ['Où se trouve le tapis à bagages numéro quatre ?', 'Oo suh troov luh tah-PEE ah bah-GAHZH noo-may-ROH KAHT-ruh?'],
    ar: ['أين سير الأمتعة رقم أربعة؟', 'Ayna sayru al-amti\'ati raqam arba\'a?'],
    bn: ['চার নম্বর ব্যাগেজ বেল্টটি কোথায়?', 'Chaar number baggage belt-ti kothay?'],
    pt: ['Onde fica a esteira de bagagens número quatro?', 'OHN-jee FEE-kah ah ehs-TAY-rah jee bah-GAH-zhenz...'],
    ru: ['Где лента выдачи багажа номер четыре?', 'Gde LYEN-tah VY-dah-chee bah-GAH-zhah NOH-myeer cheh-TY-reh?'],
    ur: ['سامان وصول کرنے کا بیلٹ نمبر چار کہاں ہے؟', 'Samaan wasool karne ka belt number chaar kahan hai?'],
    id: ['Di mana tempat pengambilan bagasi nomor empat?', 'Dee MAH-nah tehm-PAHT peng-ahm-BEE-lahn...'],
    de: ['Wo ist das Gepäckausgabeband Nummer vier?', 'Voh ist dahs geh-PEK-ows-gah-beh-bahnt NOO-mer feer?'],
    ja: ['荷物受取所の4番レーンはどこですか？', 'Nimotsu uketorijo no yon-ban reen wa doko desu ka?'],
    pa: ['ਸਾਮਾਨ ਲੈਣ ਵਾਲੀ ਚਾਰ ਨੰਬਰ ਬੈਲਟ ਕਿੱਥੇ ਹੈ?', 'Samaan lain wali chaar number belt kithe hai?'],
    sw: ['Utepe wa mizigo namba nne uko wapi?', 'Oo-TEH-peh wah mee-ZEE-goh NAHM-bah n-neh oo-koh WAH-pee?'],
    mr: ['लगेज बेल्ट क्रमांक चार कुठे आहे?', 'Luggage belt kramaank chaar kuthe aahe?'],
    te: ['లగేజ్ తీసుకునే బెల్ట్ నెంబర్ నాలుగు ఎక్కడ ఉంది?', 'Luggage theesukune belt number naalugu ekkada undi?'],
    tr: ['Dört numaralı bagaj bandı nerede?', 'Durt noo-mah-rah-LUH bah-GAHZH bahn-DUH NEH-reh-deh?'],
    ta: ['சாமான்கள் பெரும் நகரும் பட்டை நான்கு எங்கே?', 'Saamangal perum nagarum pattai naangu enge?'],
    vi: ['Băng chuyền hành lý số bốn ở đâu?', 'Bahng chwee-un hahnh lee soh bawn uh dow?']
  }
];

patterns.forEach(p => {
  items.push({
    id: p.id,
    category: p.cat,
    translations: {
      en: p.en, zh: p.zh, hi: p.hi, es: p.es, fr: p.fr,
      ar: p.ar, bn: p.bn, pt: p.pt, ru: p.ru, ur: p.ur,
      id: p.id_lang || p.id, de: p.de, ja: p.ja, pa: p.pa,
      sw: p.sw, mr: p.mr, te: p.te, tr: p.tr, ta: p.ta, vi: p.vi
    }
  });
});

console.log('Items so far in batch 3:', items.length);
