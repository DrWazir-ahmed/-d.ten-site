// scripts/generators/gen_batch5.cjs
const path = require('path');
const { writeBatch } = require('./generate_all_200_sentences.cjs');

const items = [];

// 50 Sentences for Batch 5 (IDs 201 to 250)
// Themes: School, University, Work, Office, Business, Computers & Technology
const sDefs = [
  { id: 201, cat: 'Education & School', en: 'The university semester begins next Monday.', ur: 'یونیورسٹی کا نیا سمسٹر اگلے پیر سے شروع ہو رہا ہے۔', es: 'El semestre universitario comienza el próximo lunes.' },
  { id: 202, cat: 'Education & School', en: 'I am studying computer science and software engineering.', ur: 'میں کمپیوٹر سائنس اور سافٹ ویئر انجینئرنگ کی تعلیم حاصل کر رہا ہوں۔', es: 'Estudio ciencias de la computación e ingeniería de software.' },
  { id: 203, cat: 'Education & School', en: 'Where can I borrow textbooks from the campus library?', ur: 'کیمپس لائبریری سے درسی کتابیں کہاں سے مل سکتی ہیں؟', es: '¿Dónde puedo pedir prestados libros de la biblioteca del campus?' },
  { id: 204, cat: 'Education & School', en: 'Our professor gave us a research assignment due on Friday.', ur: 'ہمارے پروفیسر نے ہمیں ایک تحقیقی اسائنمنٹ دی ہے جو جمعہ تک جمع کروانی ہے۔', es: 'El profesor nos dio una tarea de investigación para el viernes.' },
  { id: 205, cat: 'Education & School', en: 'Are you preparing for the final examinations next week?', ur: 'کیا آپ اگلے ہفتے کے فائنل امتحانات کی تیاری کر رہے ہیں؟', es: '¿Te estás preparando para los exámenes finales de la próxima semana?' },
  { id: 206, cat: 'Education & School', en: 'I need a tutor to help me understand calculus and physics.', ur: 'مجھے ریاضی اور فزکس سمجھنے کے لیے ایک ٹیوٹر کی ضرورت ہے۔', es: 'Necesito un profesor particular de cálculo y física.' },
  { id: 207, cat: 'Education & School', en: 'She graduated with high honors in business administration.', ur: 'اس نے بزنس ایڈمنسٹریشن میں امتیازی اعزاز کے ساتھ گریجویشن مکمل کی۔', es: 'Se graduó con honores en administración de empresas.' },
  { id: 208, cat: 'Education & School', en: 'Can we study together in the quiet study room?', ur: 'کیا ہم پرسکون اسٹڈی روم میں اکٹھے پڑھ سکتے ہیں؟', es: '¿Podemos estudiar juntos en la sala de estudio silenciosa?' },
  { id: 209, cat: 'Education & School', en: 'The lecture was very informative and engaging.', ur: 'پروفیسر کا لیکچر بہت معلوماتی اور دلچسپ تھا۔', es: 'La clase magistral fue muy informativa e interesante.' },
  { id: 210, cat: 'Education & School', en: 'Don\'t forget to submit your lab report before midnight.', ur: 'آدھی رات سے پہلے اپنی لیب رپورٹ جمع کروانا مت بھولنا۔', es: 'No olvides entregar tu informe de laboratorio antes de medianoche.' },
  { id: 211, cat: 'Work & Career', en: 'I have a job interview scheduled for ten o\'clock tomorrow.', ur: 'کل صبح دس بجے میرا ملازمت کا انٹرویو طے ہے۔', es: 'Tengo una entrevista de trabajo programada para mañana a las diez.' },
  { id: 212, cat: 'Work & Career', en: 'Could you please send me your updated resume and portfolio?', ur: 'کیا آپ براہ کرم اپنا تازہ ترین ریزیومے اور پورٹ فولیو بھیج سکتے ہیں؟', es: '¿Podría enviarme su currículum y portafolio actualizado?' },
  { id: 213, cat: 'Work & Career', en: 'Our team has a weekly project sync meeting at eleven.', ur: 'ہماری ٹیم کی ہفتہ وار پروجیکٹ میٹنگ گیارہ بجے ہے۔', es: 'Nuestro equipo tiene una reunión semanal del proyecto a las once.' },
  { id: 214, cat: 'Work & Career', en: 'I will send you the presentation slides by email today.', ur: 'میں آج ای میل کے ذریعے آپ کو پریزنٹیشن سلائیڈز بھیج دوں گا۔', es: 'Le enviaré las diapositivas de la presentación por correo hoy.' },
  { id: 215, cat: 'Work & Career', en: 'We need to meet the deadline for the product launch.', ur: 'ہمیں پروڈکٹ لانچ کی مقررہ تاریخ ہر صورت پوری کرنی ہے۔', es: 'Tenemos que cumplir con el plazo para el lanzamiento del producto.' },
  { id: 216, cat: 'Work & Career', en: 'Please review the contract terms before signing it.', ur: 'دستخط کرنے سے پہلے معاہدے کی تمام شرائط کا جائزہ لے لیں۔', es: 'Revise los términos del contrato antes de firmarlo, por favor.' },
  { id: 217, cat: 'Work & Career', en: 'She was promoted to senior project manager last month.', ur: 'پچھلے مہینے اسے سینئر پروجیکٹ مینیجر کے عہدے پر ترقی دی گئی۔', es: 'El mes pasado fue ascendida a jefa de proyectos sénior.' },
  { id: 218, cat: 'Work & Career', en: 'I work remotely from home three days a week.', ur: 'میں ہفتے میں تین دن گھر سے ریموٹ کام کرتا ہوں۔', es: 'Trabajo a distancia desde casa tres días a la semana.' },
  { id: 219, cat: 'Work & Career', en: 'Let\'s schedule a video call on Zoom or Google Meet.', ur: 'آئیے زوم یا گوگل میٹ پر ایک ویڈیو کال طے کرتے ہیں۔', es: 'Programemos una videollamada por Zoom o Google Meet.' },
  { id: 220, cat: 'Work & Career', en: 'Thank you for your business partnership and collaboration.', ur: 'آپ کی کاروباری شراکت اور تعاون کا بہت شکریہ۔', es: 'Muchas gracias por su asociación comercial y colaboración.' },
  { id: 221, cat: 'Technology & Devices', en: 'Can I connect my laptop to the Wi-Fi network here?', ur: 'کیا میں یہاں اپنا لیپ ٹاپ وائی فائی نیٹ ورک سے کنیکٹ کر سکتا ہوں؟', es: '¿Puedo conectar mi portátil a la red wifi de aquí?' },
  { id: 222, cat: 'Technology & Devices', en: 'My phone battery is very low, do you have a charger cable?', ur: 'میرے فون کی بیٹری بہت کم ہے، کیا آپ کے پاس چارجر کیبل ہے؟', es: 'Mi móvil tiene muy poca batería, ¿tienes un cargador?' },
  { id: 223, cat: 'Technology & Devices', en: 'Please download the mobile application from the app store.', ur: 'براہ کرم ایپ اسٹور سے موبائل ایپلی کیشن ڈاؤن لوڈ کریں۔', es: 'Descargue la aplicación móvil desde la tienda de aplicaciones.' },
  { id: 224, cat: 'Technology & Devices', en: 'You must set a strong password with letters and numbers.', ur: 'آپ کو حروف اور اعداد پر مشتمل مضبوط پاس ورڈ رکھنا چاہیے۔', es: 'Debe crear una contraseña segura con letras y números.' },
  { id: 225, cat: 'Technology & Devices', en: 'The internet connection is running exceptionally fast today.', ur: 'آج انٹرنیٹ کنکشن غیر معمولی طور پر تیز رفتار چل رہا ہے۔', es: 'La conexión a internet va excepcionalmente rápida hoy.' },
  { id: 226, cat: 'Technology & Devices', en: 'Make sure to back up your important files to the cloud.', ur: 'اپنی تمام اہم فائلیں کلاؤڈ پر محفوظ (بیک اپ) کرنا یقینی بنائیں۔', es: 'Asegúrese de hacer una copia de seguridad en la nube.' },
  { id: 227, cat: 'Technology & Devices', en: 'I received a verification security code by SMS.', ur: 'مجھے ایس ایم ایس کے ذریعے تصدیقی سیکیورٹی کوڈ موصول ہوا ہے۔', es: 'He recibido un código de verificación por SMS.' },
  { id: 228, cat: 'Technology & Devices', en: 'The printer is out of paper and needs a new ink cartridge.', ur: 'پرنٹر کا کاغذ ختم ہو چکا ہے اور نیا انک کارٹریج درکار ہے۔', es: 'La impresora no tiene papel y necesita un cartucho nuevo.' },
  { id: 229, cat: 'Technology & Devices', en: 'Click on the link to verify your email address.', ur: 'اپنا ای میل پتہ تصدیق کرنے کے لیے لنک پر کلک کریں۔', es: 'Haga clic en el enlace para verificar su dirección de correo.' },
  { id: 230, cat: 'Technology & Devices', en: 'Artificial intelligence is transforming modern industries.', ur: 'مصنوعی ذہانت جدید صنعتوں کو یکسر بدل رہی ہے۔', es: 'La inteligencia artificial está transformando las industrias.' },
  { id: 231, cat: 'Communications & Phone', en: 'Hello, could I speak with Mr. David, please?', ur: 'ہیلو، کیا میں مسٹر ڈیوڈ سے بات کر سکتا ہوں، شکریہ؟', es: 'Hola, ¿podría hablar con el señor David, por favor?' },
  { id: 232, cat: 'Communications & Phone', en: 'He is currently on another call, would you like to leave a message?', ur: 'وہ اس وقت دوسری کال پر مصروف ہیں، کیا آپ پیغام دینا چاہیں گے؟', es: 'Está en otra llamada, ¿le gustaría dejar un recado?' },
  { id: 233, cat: 'Communications & Phone', en: 'I will call you back as soon as I am free.', ur: 'جیسے ہی میں فارغ ہوتا ہوں، میں آپ کو واپس کال کروں گا۔', es: 'Le devolveré la llamada en cuanto quede libre.' },
  { id: 234, cat: 'Communications & Phone', en: 'The audio reception is breaking up, can you hear me well?', ur: 'آواز کٹ کٹ کر آ رہی ہے، کیا آپ مجھے ٹھیک سن پا رہے ہیں؟', es: 'Se corta la llamada, ¿me escucha usted bien?' },
  { id: 235, cat: 'Communications & Phone', en: 'Please text me the location address on WhatsApp.', ur: 'براہ کرم مجھے واٹس ایپ پر لوکیشن کا پتہ بھیج دیں۔', es: 'Por favor, envíeme la dirección por WhatsApp.' },
  { id: 236, cat: 'Meetings & Collaboration', en: 'Welcome everyone, let us begin today\'s agenda.', ur: 'سب کو خوش آمدید، آئیے آج کے ایجنڈے کا آغاز کرتے ہیں۔', es: 'Bienvenidos a todos, comencemos con el orden del día.' },
  { id: 237, cat: 'Meetings & Collaboration', en: 'What are the main key takeaways from this report?', ur: 'اس رپورٹ کے اہم ترین نتائج اور نکات کیا ہیں؟', es: '¿Cuáles son las conclusiones principales de este informe?' },
  { id: 238, cat: 'Meetings & Collaboration', en: 'We have achieved a twenty percent increase in quarterly sales.', ur: 'ہم نے سہ ماہی فروخت میں بیس فیصد اضافہ حاصل کیا ہے۔', es: 'Hemos logrado un aumento del veinte por ciento en ventas.' },
  { id: 239, cat: 'Meetings & Collaboration', en: 'Does anyone have any questions or feedback before we wrap up?', ur: 'میٹنگ ختم کرنے سے پہلے کیا کسی کا کوئی سوال یا رائے ہے؟', es: '¿Alguien tiene preguntas antes de terminar la reunión?' },
  { id: 240, cat: 'Meetings & Collaboration', en: 'Great job everyone, thank you for your hard work and dedication!', ur: 'شاندار کارکردگی! آپ سب کی محنت اور لگن کا بے حد شکریہ!', es: '¡Gran trabajo a todos, gracias por su esfuerzo y dedicación!' },
  { id: 241, cat: 'Finance & Payments', en: 'Our company offers flexible salary packages and healthcare benefits.', ur: 'ہماری کمپنی پرکشش تنخواہ اور ہیلتھ کیئر مراعات فراہم کرتی ہے۔', es: 'Nuestra empresa ofrece sueldos competitivos y seguro médico.' },
  { id: 242, cat: 'Finance & Payments', en: 'The client has already approved and paid the project invoice.', ur: 'کلائنٹ نے پروجیکٹ کا انوائس منظور کر کے ادائیگی کر دی ہے۔', es: 'El cliente ya ha aprobado y pagado la factura del proyecto.' },
  { id: 243, cat: 'Finance & Payments', en: 'We must track all project expenses in the monthly budget sheet.', ur: 'ہمیں ماہانہ بجٹ شیٹ میں تمام اخراجات درج کرنے ہوں گے۔', es: 'Debemos registrar los gastos del proyecto en el presupuesto.' },
  { id: 244, cat: 'Finance & Payments', en: 'Are there any hidden service fees or charges?', ur: 'کیا اس میں کوئی پوشیدہ سروس چارجز یا فیس شامل ہے؟', es: '¿Hay alguna comisión o cargo oculto en el servicio?' },
  { id: 245, cat: 'Finance & Payments', en: 'Payment will be transferred directly to your bank account.', ur: 'رقم براہ راست آپ کے بینک اکاؤنٹ میں منتقل کر دی جائے گی۔', es: 'El pago se transferirá directamente a su cuenta bancaria.' },
  { id: 246, cat: 'Digital Life & Media', en: 'I love listening to educational podcasts while commuting.', ur: 'سفر کے دوران تعلیمی پوڈکاسٹ سننا مجھے بہت پسند ہے۔', es: 'Me encanta escuchar podcasts educativos durante los trayectos.' },
  { id: 247, cat: 'Digital Life & Media', en: 'She takes stunning high-resolution photography on her smartphone.', ur: 'وہ اپنے سمارٹ فون سے شاندار ہائی ریزولوشن تصاویر بناتی ہے۔', es: 'Ella hace fotografías impresionantes con su teléfono inteligente.' },
  { id: 248, cat: 'Digital Life & Media', en: 'Can you share the cloud link so I can download the video?', ur: 'کیا آپ کلاؤڈ لنک شیئر کر سکتے ہیں تاکہ میں ویڈیو ڈاؤن لوڈ کر لوں؟', es: '¿Puedes compartir el enlace para que descargue el vídeo?' },
  { id: 249, cat: 'Digital Life & Media', en: 'You should enable two-factor authentication to secure your account.', ur: 'اپنے اکاؤنٹ کی حفاظت کے لیے ٹو فیکٹر تصدیق ضرور فعال کریں۔', es: 'Active la autenticación en dos pasos para proteger su cuenta.' },
  { id: 250, cat: 'Digital Life & Media', en: 'Online learning allows students worldwide to acquire new skills.', ur: 'آن لائن تعلیم دنیا بھر کے طلبا کو نئی مہارتیں سیکھنے کا موقع دیتی ہے۔', es: 'La educación online permite a estudiantes de todo el mundo aprender.' }
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

const targetPath = path.resolve('scripts/data/sentences_batch_5.cjs');
writeBatch(targetPath, 'SENTENCES_BATCH_5', items);
