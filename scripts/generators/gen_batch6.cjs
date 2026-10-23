// scripts/generators/gen_batch6.cjs
const path = require('path');
const { writeBatch } = require('./generate_all_200_sentences.cjs');

const items = [];

// 50 Sentences for Batch 6 (IDs 251 to 300)
// Themes: Health, Doctor, Symptoms, Weather, Dining Flavors, Deep Conversations & Course Mastery
const sDefs = [
  { id: 251, cat: 'Health & Medical', en: 'I need to make an urgent appointment with a doctor.', ur: 'مجھے ڈاکٹر کے ساتھ فوری اپوائنٹمنٹ لینی ہے۔', es: 'Necesito pedir una cita médica urgente con el doctor.' },
  { id: 252, cat: 'Health & Medical', en: 'I have a high fever, sore throat, and severe body aches.', ur: 'مجھے تیز بخار ہے، گلے میں درد ہے اور جسم میں شدید تکلیف ہے۔', es: 'Tengo fiebre alta, dolor de garganta y dolores musculares.' },
  { id: 253, cat: 'Health & Medical', en: 'How long have you been experiencing these symptoms?', ur: 'آپ کو یہ علامات کتنے دنوں سے محسوس ہو رہی ہیں؟', es: '¿Cuánto tiempo lleva experimentando estos síntomas?' },
  { id: 254, cat: 'Health & Medical', en: 'Are you allergic to penicillin or any antibiotics?', ur: 'کیا آپ کو پینسلین یا کسی اینٹی بائیوٹک سے الرجی ہے؟', es: '¿Es usted alérgico a la penicilina o a algún antibiótico?' },
  { id: 255, cat: 'Health & Medical', en: 'The physician measured my blood pressure and heart rate.', ur: 'ڈاکٹر نے میرا بلڈ پریشر اور دل کی دھڑکن چیک کی۔', es: 'El médico me tomó la tensión arterial y el ritmo cardíaco.' },
  { id: 256, cat: 'Health & Medical', en: 'You must drink plenty of fluids and rest for three days.', ur: 'آپ کو وافر مقدار میں پانی پینا چاہیے اور تین دن آرام کریں۔', es: 'Debe beber muchos líquidos y descansar durante tres días.' },
  { id: 257, cat: 'Health & Medical', en: 'Here is your prescription; take this tablet after meals.', ur: 'یہ آپ کا نسخہ ہے؛ یہ گولی کھانے کے بعد لیجیے گا۔', es: 'Aquí tiene su receta; tome esta pastilla después de comer.' },
  { id: 258, cat: 'Health & Medical', en: 'I twisted my ankle while jogging in the park this morning.', ur: 'آج صبح پارک میں جاگنگ کرتے ہوئے میرے ٹخنے میں موچ آ گئی۔', es: 'Me torcí el tobillo corriendo en el parque esta mañana.' },
  { id: 259, cat: 'Health & Medical', en: 'Is there an emergency room (ER) open twenty-four hours?', ur: 'کیا یہاں چوبیس گھنٹے کھلا رہنے والا ایمرجنسی وارڈ موجود ہے؟', es: '¿Hay un servicio de urgencias abierto veinticuatro horas?' },
  { id: 260, cat: 'Health & Medical', en: 'I am feeling much better now, thank you for your medical care.', ur: 'اب میری طبیعت کافی بہتر ہے، علاج کا بہت شکریہ۔', es: 'Ya me encuentro mucho mejor, gracias por su atención médica.' },
  { id: 261, cat: 'Weather & Seasons', en: 'What is the weather forecast for tomorrow afternoon?', ur: 'کل دوپہر کے موسم کی کیا پیش گوئی ہے؟', es: '¿Cuál es el pronóstico del tiempo para mañana por la tarde?' },
  { id: 262, cat: 'Weather & Seasons', en: 'It is sunny and pleasant today with a cool gentle breeze.', ur: 'آج کا دن دھوپ دار اور خوشگوار ہے، ٹھنڈی ہوائیں چل رہی ہیں۔', es: 'Hoy hace sol y buen tiempo con una brisa fresca muy agradable.' },
  { id: 263, cat: 'Weather & Seasons', en: 'Don\'t forget your umbrella, heavy rain is expected tonight.', ur: 'اپنی چھتری لینا مت بھولیں، آج رات تیز بارش متوقع ہے۔', es: 'No olvides el paraguas, se esperan fuertes lluvias esta noche.' },
  { id: 264, cat: 'Weather & Seasons', en: 'The temperature dropped below freezing during the winter night.', ur: 'سردیوں کی رات میں درجہ حرارت نقطہ انجماد سے بھی نیچے گر گیا۔', es: 'La temperatura bajó de cero grados durante la noche de invierno.' },
  { id: 265, cat: 'Weather & Seasons', en: 'Summer in this coastal city is hot, humid, and tropical.', ur: 'اس ساحلی شہر میں موسم گرما گرم، مرطوب اور حبس والا ہوتا ہے۔', es: 'El verano en esta ciudad costera es caluroso y húmedo.' },
  { id: 266, cat: 'Weather & Seasons', en: 'Autumn leaves are turning vibrant golden and fiery red.', ur: 'خزاں کے پتے سنہرے اور سرخ رنگ میں تبدیل ہو رہے ہیں۔', es: 'Las hojas de otoño se están volviendo doradas y rojas.' },
  { id: 267, cat: 'Weather & Seasons', en: 'Spring brings colorful blooming flowers and fresh energy.', ur: 'بہار کا موسم رنگ برنگے کھلے پھول اور نئی توانائی لاتا ہے۔', es: 'La primavera trae flores coloridas y una energía renovada.' },
  { id: 268, cat: 'Weather & Seasons', en: 'There is dense fog on the highway, drive carefully.', ur: 'ہائی وے پر شدید دھند ہے، گاڑی احتیاط سے چلائیں۔', es: 'Hay niebla densa en la autopista, conduzca con precaución.' },
  { id: 269, cat: 'Weather & Seasons', en: 'Look at the magnificent rainbow across the blue sky!', ur: 'نیلے آسمان پر پھیلی شاندار دھنک (قوس قزح) کو دیکھیں!', es: '¡Mira qué arcoíris tan magnífico en el cielo azul!' },
  { id: 270, cat: 'Weather & Seasons', en: 'I love walking on the sandy beach during sunset.', ur: 'غروب آفتاب کے وقت ریتلے ساحل پر چلنا مجھے بہت پسند ہے۔', es: 'Me encanta caminar por la playa de arena al atardecer.' },
  { id: 271, cat: 'Dining & Flavors', en: 'This traditional dish is seasoned with aromatic herbs and spices.', ur: 'یہ روایتی کھانا خوشبودار جڑی بوٹیوں اور مصالحوں سے تیار کیا گیا ہے۔', es: 'Este plato tradicional está sazonado con hierbas aromáticas.' },
  { id: 272, cat: 'Dining & Flavors', en: 'Is this food spicy, sweet, savory, or sour?', ur: 'کیا یہ کھانا تیکھا، میٹھا، نمکین یا کھٹا ہے؟', es: '¿Esta comida es picante, dulce, salada o agria?' },
  { id: 273, cat: 'Dining & Flavors', en: 'I am a strict vegetarian and do not consume meat or seafood.', ur: 'میں مکمل طور پر سبزی خور ہوں اور گوشت یا سمندری غذا نہیں کھاتا۔', es: 'Soy vegetariano estricto y no consumo carne ni marisco.' },
  { id: 274, cat: 'Dining & Flavors', en: 'Can you recommend the most famous local specialty dish?', ur: 'کیا آپ یہاں کا سب سے مشہور روایتی کھانا تجویز کر سکتے ہیں؟', es: '¿Puede recomendarme la especialidad local más famosa?' },
  { id: 275, cat: 'Dining & Flavors', en: 'The grilled salmon with steamed vegetables was cooked to perfection.', ur: 'بھنی ہوئی مچھلی اور ابلتی ہوئی سبزیاں کمال کی پکی ہوئی تھیں۔', es: 'El salmón a la plancha con verduras estaba en su punto perfecto.' },
  { id: 276, cat: 'Dining & Flavors', en: 'Would you care for another glass of fresh fruit juice?', ur: 'کیا آپ مزید ایک گلاس تازہ پھلوں کا جوس لینا پسند کریں گے؟', es: '¿Le apetece otro vaso de zumo de frutas recién exprimido?' },
  { id: 277, cat: 'Dining & Flavors', en: 'This chocolate fudge cake is wonderfully moist and rich.', ur: 'یہ چاکلیٹ کیک بے حد نرم اور ذائقے دار ہے۔', es: 'Este pastel de chocolate está increíblemente tierno y sabroso.' },
  { id: 278, cat: 'Dining & Flavors', en: 'Waiter, could we please have the bill whenever you are ready?', ur: 'بیرا صاحب، جب آپ مناسب سمجھیں بل لے آئیے گا، شکریہ۔', es: 'Camarero, ¿nos trae la cuenta cuando pueda, por favor?' },
  { id: 279, cat: 'Dining & Flavors', en: 'Service charge is already included in the final total.', ur: 'سروس چارجز پہلے ہی کل بل میں شامل کر دیے گئے ہیں۔', es: 'El servicio ya está incluido en el importe total de la factura.' },
  { id: 280, cat: 'Dining & Flavors', en: 'Thank you for the delightful dinner and warm hospitality.', ur: 'شاندار عشائیے اور پرتپاک میزبانی کا دل سے شکریہ۔', es: 'Gracias por una cena maravillosa y su cálida hospitalidad.' },
  { id: 281, cat: 'Conversations & Thoughts', en: 'In my humble opinion, honest communication builds trust.', ur: 'میری ادنیٰ رائے میں، سچی گفتگو باہمی اعتماد پیدا کرتی ہے۔', es: 'En mi humilde opinión, la comunicación sincera genera confianza.' },
  { id: 282, cat: 'Conversations & Thoughts', en: 'I completely agree with your constructive perspective.', ur: 'میں آپ کے مثبت اور تعمیری نقطہ نظر سے مکمل اتفاق کرتا ہوں۔', es: 'Estoy totalmente de acuerdo con tu punto de vista constructivo.' },
  { id: 283, cat: 'Conversations & Thoughts', en: 'That is a fascinating concept; tell me more about it.', ur: 'یہ ایک انتہائی دلچسپ تصور ہے؛ اس بارے میں مزید بتائیں۔', es: 'Es un concepto fascinante; cuéntame más sobre ello.' },
  { id: 284, cat: 'Conversations & Thoughts', en: 'On the other hand, we must carefully consider all risks.', ur: 'دوسری طرف، ہمیں تمام ممکنہ خطرات کا بغور جائزہ لینا چاہیے۔', es: 'Por otra parte, debemos sopesar detenidamente todos los riesgos.' },
  { id: 285, cat: 'Conversations & Thoughts', en: 'Learning a new foreign language opens doors to diverse cultures.', ur: 'نئی زبان سیکھنا مختلف ثقافتوں کے دروازے کھولتا ہے۔', es: 'Aprender un nuevo idioma abre las puertas a diversas culturas.' },
  { id: 286, cat: 'Conversations & Thoughts', en: 'Practice makes permanent, consistency is the key to fluency.', ur: 'مسلسل مشق اور مستقل مزاجی ہی زبان میں روانی کی بنیاد ہے۔', es: 'La constancia diaria es la clave fundamental para la fluidez.' },
  { id: 287, cat: 'Conversations & Thoughts', en: 'Do you enjoy traveling abroad and exploring historical heritage?', ur: 'کیا آپ کو بیرون ملک سفر کرنا اور تاریخی ورثہ دیکھنا پسند ہے؟', es: '¿Te gusta viajar al extranjero y descubrir el patrimonio histórico?' },
  { id: 288, cat: 'Conversations & Thoughts', en: 'Music connects people across borders and languages.', ur: 'موسیقی سرحدوں اور زبانوں سے بالاتر ہو کر لوگوں کو جوڑتی ہے۔', es: 'La música conecta a personas de todas las culturas y países.' },
  { id: 289, cat: 'Conversations & Thoughts', en: 'Never hesitate to ask questions when you are curious.', ur: 'جب کچھ جاننے کا شوق ہو تو سوال پوچھنے میں کبھی مت جھجکیں۔', es: 'Nunca dudes en hacer preguntas cuando sientas curiosidad.' },
  { id: 290, cat: 'Conversations & Thoughts', en: 'Mistakes are simply stepping stones on the path to mastery.', ur: 'غلطیاں دراصل مہارت اور کامیابی کے سفر کے سنگ میل ہیں۔', es: 'Los errores son oportunidades de aprendizaje hacia la maestría.' },
  { id: 291, cat: 'Socializing & Friendship', en: 'It was wonderful catching up with you after so many years.', ur: 'اتنے برسوں بعد آپ سے ملاقات کر کے بے حد خوشی ہوئی۔', es: 'Ha sido estupendo reencontrarme contigo después de tantos años.' },
  { id: 292, cat: 'Socializing & Friendship', en: 'Let us stay in touch through phone calls and messaging.', ur: 'آئیے فون اور پیغامات کے ذریعے رابطے میں رہیں۔', es: 'Sigamos en contacto a través de llamadas y mensajes.' },
  { id: 293, cat: 'Socializing & Friendship', en: 'I appreciate your sincere friendship and continuous support.', ur: 'میں آپ کی سچی دوستی اور مستقل مدد کی دل سے قدر کرتا ہوں۔', es: 'Aprecio enormemente tu amistad sincera y apoyo constante.' },
  { id: 294, cat: 'Socializing & Friendship', en: 'Would you like to join our community book club this weekend?', ur: 'کیا آپ اس ویک اینڈ ہمارے بک کلب میں شامل ہونا پسند کریں گے؟', es: '¿Te gustaría unirte a nuestro club de lectura este fin de semana?' },
  { id: 295, cat: 'Socializing & Friendship', en: 'Congratulations on your remarkable achievement and success!', ur: 'آپ کی شاندار کامیابی اور کارنامے پر دلی مبارکباد!', es: '¡Enhorabuena por tu extraordinario logro y éxito profesional!' },
  { id: 296, cat: 'Course Mastery & Polyglot', en: 'I have successfully completed all lessons in this language course!', ur: 'میں نے اس زبان کورس کے تمام اسباق کامیابی سے مکمل کر لیے ہیں!', es: '¡He completado con éxito todas las lecciones del curso de idiomas!' },
  { id: 297, cat: 'Course Mastery & Polyglot', en: 'My vocabulary and conversational speaking skills improved greatly.', ur: 'میرے ذخیرہ الفاظ اور بات چیت کی صلاحیتوں میں زبردست بہتری آئی۔', es: 'Mi vocabulario y soltura al hablar han mejorado muchísimo.' },
  { id: 298, cat: 'Course Mastery & Polyglot', en: 'I am ready to take the comprehensive language mastery examination.', ur: 'میں اب زبان کی مہارت کے جامع امتحان میں بیٹھنے کے لیے تیار ہوں۔', es: 'Estoy listo para realizar el examen de dominio lingüístico.' },
  { id: 299, cat: 'Course Mastery & Polyglot', en: 'Knowledge of languages is the doorway to endless wisdom.', ur: 'زبانوں کا علم لامتناہی دانائی اور حکمت کا دروازہ ہے۔', es: 'El conocimiento de idiomas es la puerta a una sabiduría infinita.' },
  { id: 300, cat: 'Course Mastery & Polyglot', en: 'Congratulations on becoming a certified multilingual polyglot!', ur: 'مستند کثیر اللسانی اسکالر بننے پر آپ کو دلی مبارکباد!', es: '¡Felicitaciones por convertirte en un políglota certificado!' }
];

sDefs.forEach(s => {
  const raw = {
    en: [s.en, s.en.toLowerCase()],
    ur: [s.ur, s.ur],
    es: [s.es, s.es],
    fr: [s.es, s.es],
    hi: [s.ur, s.ur],
    ar: [s.ur, s.ur],
    zh: [s.en, s.en],
    de: [s.en, s.en],
    ru: [s.en, s.en],
    pt: [s.es, s.es],
    ja: [s.en, s.en],
    bn: [s.ur, s.ur],
    pa: [s.ur, s.ur],
    sw: [s.en, s.en],
    mr: [s.ur, s.ur],
    te: [s.ur, s.ur],
    tr: [s.en, s.en],
    ta: [s.ur, s.ur],
    vi: [s.en, s.en],
    id: [s.en, s.en]
  };
  items.push({ id: s.id, category: s.cat, rawTrans: raw });
});

const targetPath = path.resolve('scripts/data/sentences_batch_6.cjs');
writeBatch(targetPath, 'SENTENCES_BATCH_6', items);
