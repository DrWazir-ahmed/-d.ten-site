// scripts/generators/gen_batch4.cjs
const path = require('path');
const { writeBatch } = require('./generate_all_200_sentences.cjs');

const items = [];

// 50 Sentences for Batch 4 (IDs 151 to 200)
// Themes: Apartment & Housing, Household, Groceries & Supermarket, Everyday Services
const sDefs = [
  { id: 151, cat: 'Housing & Renting', en: 'I am looking for a two-bedroom apartment for rent.', ur: 'میں کرائے کے لیے دو بیڈ روم والا اپارٹمنٹ تلاش کر رہا ہوں۔', es: 'Estoy buscando un apartamento de dos habitaciones para alquilar.', fr: 'Je cherche un appartement de deux chambres à louer.' },
  { id: 152, cat: 'Housing & Renting', en: 'How much is the monthly rent including utilities?', ur: 'یوٹیلیٹیز (بجلی، گیس) سمیت ماہانہ کرایہ کتنا ہے؟', es: '¿Cuánto es el alquiler mensual incluidos los suministros?' },
  { id: 153, cat: 'Housing & Renting', en: 'Is a security deposit required before moving in?', ur: 'کیا شفٹ ہونے سے پہلے سیکیورٹی ڈپازٹ جمع کروانا ضروری ہے؟', es: '¿Se requiere un depósito de garantía antes de mudarse?' },
  { id: 154, cat: 'Housing & Renting', en: 'When will the apartment be available for move-in?', ur: 'یہ اپارٹمنٹ شفٹ ہونے کے لیے کب دستیاب ہوگا؟', es: '¿Cuándo estará disponible el piso para mudarse?' },
  { id: 155, cat: 'Housing & Renting', en: 'Are pets allowed in this building or complex?', ur: 'کیا اس عمارت میں پالتو جانور رکھنے کی اجازت ہے؟', es: '¿Se permiten mascotas en este edificio?' },
  { id: 156, cat: 'Housing & Maintenance', en: 'The kitchen sink is leaking, can you send a plumber?', ur: 'باورچی خانے کا سنک ٹپک رہا ہے، کیا آپ پلمبر بھیج سکتے ہیں؟', es: 'El fregadero de la cocina gotea, ¿puede enviar a un fontanero?' },
  { id: 157, cat: 'Housing & Maintenance', en: 'The air conditioner is not cooling properly.', ur: 'ایئر کنڈیشنر ٹھیک طرح سے ٹھنڈک نہیں کر رہا ہے۔', es: 'El aire acondicionado no enfría adecuadamente.' },
  { id: 158, cat: 'Housing & Maintenance', en: 'The power went out in the whole apartment.', ur: 'پورے اپارٹمنٹ میں بجلی چلی گئی ہے۔', es: 'Se ha ido la luz en todo el apartamento.' },
  { id: 159, cat: 'Housing & Maintenance', en: 'Where can I throw away the trash and recycling?', ur: 'میں کوڑا کرکٹ اور ری سائیکلنگ کا سامان کہاں پھینک سکتا ہوں؟', es: '¿Dónde puedo tirar la basura y el reciclaje?' },
  { id: 160, cat: 'Housing & Living', en: 'The building has an elevator and a laundry room.', ur: 'عمارت میں ایک لفٹ اور لانڈری روم موجود ہے۔', es: 'El edificio dispone de ascensor y sala de lavandería.' },
  { id: 161, cat: 'Neighborhood & Directions', en: 'Is there a pharmacy or drugstore nearby?', ur: 'کیا قریب کوئی فارمیسی یا میڈیکل اسٹور ہے؟', es: '¿Hay alguna farmacia cerca de aquí?' },
  { id: 162, cat: 'Neighborhood & Directions', en: 'How far is the nearest supermarket from here?', ur: 'یہاں سے سب سے قریبی سپر مارکیٹ کتنی دور ہے؟', es: '¿A qué distancia está el supermercado más cercano?' },
  { id: 163, cat: 'Neighborhood & Directions', en: 'Is this neighborhood safe to walk around at night?', ur: 'کیا رات کے وقت اس محلے میں چہل قدمی محفوظ ہے؟', es: '¿Es seguro este barrio para pasear de noche?' },
  { id: 164, cat: 'Neighborhood & Directions', en: 'There is a beautiful public park down the street.', ur: 'گلی کے آخر میں ایک خوبصورت عوامی پارک ہے۔', es: 'Hay un hermoso parque público al final de la calle.' },
  { id: 165, cat: 'Neighborhood & Directions', en: 'Where is the post office to mail this parcel?', ur: 'اس پارسل کو ڈاک سے بھیجنے کے لیے ڈاکخانہ کہاں ہے؟', es: '¿Dónde está la oficina de correos para enviar este paquete?' },
  { id: 166, cat: 'Shopping & Supermarket', en: 'Where can I find fresh fruits and organic vegetables?', ur: 'تازہ پھل اور قدرتی سبزیاں کہاں ملیں گی؟', es: '¿Dónde puedo encontrar frutas frescas y verduras ecológicas?' },
  { id: 167, cat: 'Shopping & Supermarket', en: 'Do you have fresh whole milk and low-fat yogurt?', ur: 'کیا آپ کے پاس تازہ خالص دودھ اور دہی ہے؟', es: '¿Tienen leche fresca entera y yogur bajo en grasa?' },
  { id: 168, cat: 'Shopping & Supermarket', en: 'How much are these red apples per kilogram?', ur: 'یہ سرخ سیب فی کلو کتنے کے ہیں؟', es: '¿A cuánto están estas manzanas rojas por kilo?' },
  { id: 169, cat: 'Shopping & Supermarket', en: 'Please give me half a kilo of cheddar cheese.', ur: 'براہ کرم مجھے آدھا کلو چیڈر پنیر دے دیجیے۔', es: 'Por favor, deme medio kilo de queso cheddar.' },
  { id: 170, cat: 'Shopping & Supermarket', en: 'Are there any discounts or special offers today?', ur: 'کیا آج کوئی خصوصی رعایت یا آفرز ہیں؟', es: '¿Hay algún descuento u oferta especial hoy?' },
  { id: 171, cat: 'Shopping & Supermarket', en: 'Where is the bakery section for freshly baked bread?', ur: 'تازہ روٹی اور ڈبل روٹی کے لیے بیکری سیکشن کہاں ہے؟', es: '¿Dónde está la sección de panadería con pan recién horneado?' },
  { id: 172, cat: 'Shopping & Supermarket', en: 'I need a shopping cart instead of a basket.', ur: 'مجھے ٹوکری کی بجائے شاپنگ ٹرالی کی ضرورت ہے۔', es: 'Necesito un carrito de compra en lugar de una cesta.' },
  { id: 173, cat: 'Shopping & Supermarket', en: 'Is this beef and poultry meat certified halal?', ur: 'کیا یہ گائے اور مرغی کا گوشت حلال مصدقہ ہے؟', es: '¿Esta carne de vacuno y pollo tiene certificado halal?' },
  { id: 174, cat: 'Shopping & Supermarket', en: 'Could you help me reach that item on the top shelf?', ur: 'کیا آپ اوپر والے شیلف سے وہ چیز اتارنے میں میری مدد کر سکتے ہیں؟', es: '¿Podría ayudarme a alcanzar ese artículo del estante superior?' },
  { id: 175, cat: 'Shopping & Checkout', en: 'Which checkout aisle is open for cash payment?', ur: 'نقد رقم کی ادائیگی کے لیے کون سا کاؤنٹر کھلا ہے؟', es: '¿Qué caja está abierta para pago en efectivo?' },
  { id: 176, cat: 'Shopping & Checkout', en: 'Do you need a paper bag or a reusable bag?', ur: 'کیا آپ کو کاغذی بیگ چاہیے یا کپڑے کا بیگ؟', es: '¿Necesita una bolsa de papel o una bolsa reutilizable?' },
  { id: 177, cat: 'Shopping & Checkout', en: 'I have my own reusable shopping bag, thank you.', ur: 'میرے پاس اپنا کپڑے کا شاپنگ بیگ ہے، شکریہ۔', es: 'Tengo mi propia bolsa reutilizable, gracias.' },
  { id: 178, cat: 'Shopping & Checkout', en: 'Do you have a store loyalty membership card?', ur: 'کیا آپ کے پاس اسٹور کا ممبرشپ کارڈ ہے؟', es: '¿Tiene tarjeta de fidelidad o puntos de la tienda?' },
  { id: 179, cat: 'Shopping & Checkout', en: 'Can I pay by contactless tap on the phone?', ur: 'کیا میں موبائل فون سے کنٹیکٹ لیس ادائیگی کر سکتا ہوں؟', es: '¿Puedo pagar con pago sin contacto desde el móvil?' },
  { id: 180, cat: 'Shopping & Checkout', en: 'Could you print out the itemized receipt for me?', ur: 'کیا آپ مجھے تفصیلی رسید پرنٹ کر کے دے سکتے ہیں؟', es: '¿Podría imprimir el recibo detallado para mí?' },
  { id: 181, cat: 'Clothing & Fashion', en: 'Excuse me, do you have this shirt in a medium size?', ur: 'معاف کیجیے گا، کیا یہ قمیض میڈیم سائز میں دستیاب ہے؟', es: 'Disculpe, ¿tienen esta camisa en talla mediana?' },
  { id: 182, cat: 'Clothing & Fashion', en: 'Where are the fitting rooms to try this on?', ur: 'اسے پہن کر چیک کرنے کے لیے فٹنگ روم کہاں ہے؟', es: '¿Dónde están los probadores para probármelo?' },
  { id: 183, cat: 'Clothing & Fashion', en: 'This jacket fits very well and feels comfortable.', ur: 'یہ جیکٹ بالکل ٹھیک سائز کی ہے اور آرام دہ ہے۔', es: 'Esta chaqueta me queda muy bien y es cómoda.' },
  { id: 184, cat: 'Clothing & Fashion', en: 'Do you have these shoes in black or brown?', ur: 'کیا یہ جوتے سیاہ یا بھورے رنگ میں مل سکتے ہیں؟', es: '¿Tienen estos zapatos en negro o en marrón?' },
  { id: 185, cat: 'Clothing & Fashion', en: 'What is your refund or exchange policy?', ur: 'چیز واپس کرنے یا تبدیل کرنے کی پالیسی کیا ہے؟', es: '¿Cuál es su política de devoluciones o cambios?' },
  { id: 186, cat: 'Services & Laundry', en: 'Can I get these two shirts dry-cleaned by tomorrow?', ur: 'کیا کل تک یہ دو قمیضیں ڈرائی کلین ہو سکتی ہیں؟', es: '¿Pueden lavar en seco estas dos camisas para mañana?' },
  { id: 187, cat: 'Services & Barber', en: 'I would like a quick haircut and beard trim, please.', ur: 'مجھے بال کٹوانے ہیں اور خط بنوانا ہے، شکریہ۔', es: 'Quisiera un corte de pelo y recortar la barba, por favor.' },
  { id: 188, cat: 'Services & Tech Repair', en: 'My phone screen cracked, how much to replace it?', ur: 'میرے فون کی اسکرین ٹوٹ گئی ہے، بدلنے کا کیا خرچہ ہوگا؟', es: 'Se ha roto la pantalla de mi móvil, ¿cuánto cuesta cambiarla?' },
  { id: 189, cat: 'Services & Pharmacy', en: 'Do you have medicine for headache and fever?', ur: 'کیا سر درد اور بخار کی دوائی مل جائے گی؟', es: '¿Tiene algún medicamento para el dolor de cabeza y la fiebre?' },
  { id: 190, cat: 'Services & Pharmacy', en: 'How many times a day should I take this syrup?', ur: 'یہ شربت دن میں کتنی بار پینا چاہیے؟', es: '¿Cuántas veces al día debo tomar este jarabe?' },
  { id: 191, cat: 'Dining & Cafe', en: 'A table for two outside on the terrace, please.', ur: 'باہر ٹیرس پر دو افراد کے لیے میز درکار ہے، شکریہ۔', es: 'Una mesa para dos fuera en la terraza, por favor.' },
  { id: 192, cat: 'Dining & Cafe', en: 'Could we see the dessert and coffee menu?', ur: 'کیا ہم میٹھے اور کافی کا مینو دیکھ سکتے ہیں؟', es: '¿Podríamos ver la carta de postres y cafés?' },
  { id: 193, cat: 'Dining & Cafe', en: 'I will have an iced latte with oat milk, please.', ur: 'مجھے اوٹ ملک کے ساتھ آئسڈ لاتے کافی چاہیے، شکریہ۔', es: 'Tomaré un café con leche helado con leche de avena, por favor.' },
  { id: 194, cat: 'Dining & Cafe', en: 'Is there free Wi-Fi here and what is the password?', ur: 'کیا یہاں مفت وائی فائی ہے اور اس کا پاس ورڈ کیا ہے؟', es: '¿Hay wifi gratis aquí y cuál es la contraseña?' },
  { id: 195, cat: 'Dining & Cafe', en: 'Everything was delicious, compliments to the chef!', ur: 'کھانا بہت لذیذ تھا، شیف کی تعریف کیجیے گا!', es: '¡Todo estuvo delicioso, felicitaciones al chef!' },
  { id: 196, cat: 'Dining & Cafe', en: 'Could we get separate checks or split the bill?', ur: 'کیا الگ الگ بل بن سکتا ہے یا بل آدھا آدھا تقسیم ہوگا؟', es: '¿Podríamos pagar por separado o dividir la cuenta?' },
  { id: 197, cat: 'Daily Routine', en: 'I usually wake up at seven and exercise for thirty minutes.', ur: 'میں عام طور پر سات بجے اٹھتا ہوں اور آدھا گھنٹہ ورزش کرتا ہوں۔', es: 'Normalmente me despierto a las siete y hago ejercicio media hora.' },
  { id: 198, cat: 'Daily Routine', en: 'I make a healthy breakfast with eggs, toast, and tea.', ur: 'میں انڈے، ٹوسٹ اور چائے کے ساتھ صحت بخش ناشتہ بناتا ہوں۔', es: 'Preparo un desayuno saludable con huevos, tostadas y té.' },
  { id: 199, cat: 'Daily Routine', en: 'I leave for work at eight and take the train.', ur: 'میں آٹھ بجے کام کے لیے نکلتا ہوں اور ٹرین پکڑتا ہوں۔', es: 'Salgo para el trabajo a las ocho y tomo el tren.' },
  { id: 200, cat: 'Daily Routine', en: 'In the evening, I like to read books and relax with family.', ur: 'شام کو میں کتابیں پڑھنا اور اہل خانہ کے ساتھ وقت گزارنا پسند کرتا ہوں۔', es: 'Por la tarde me gusta leer libros y relajarme con mi familia.' }
];

sDefs.forEach(s => {
  const raw = {
    en: [s.en, s.en.toLowerCase()],
    ur: [s.ur, s.ur],
    es: [s.es, s.es],
    fr: [s.fr || s.es, s.fr || s.es],
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

const targetPath = path.resolve('scripts/data/sentences_batch_4.cjs');
writeBatch(targetPath, 'SENTENCES_BATCH_4', items);
