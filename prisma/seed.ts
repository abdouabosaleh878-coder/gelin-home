import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function img(seed: string, w = 1200, h = 1500) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

async function main() {
  // --- Admin user -----------------------------------------------------
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@gelinhome.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const adminName = process.env.ADMIN_NAME || "Gelin Home Admin";

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: adminName },
    create: { email: adminEmail, passwordHash, name: adminName },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  // --- Site settings ----------------------------------------------------
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });

  // --- Homepage content ---------------------------------------------------
  await prisma.homepageContent.upsert({
    where: { id: "main" },
    update: {
      heroImage: img("gelin-hero", 2000, 1400),
      brandStoryImage: img("gelin-story", 1600, 1200),
      newCollectionImage: img("gelin-collection", 2000, 1400),
    },
    create: {
      id: "main",
      heroImage: img("gelin-hero", 2000, 1400),
      brandStoryImage: img("gelin-story", 1600, 1200),
      newCollectionImage: img("gelin-collection", 2000, 1400),
    },
  });

  // --- Instagram gallery ----------------------------------------------
  const existingPosts = await prisma.instagramPost.count();
  if (existingPosts === 0) {
    await prisma.instagramPost.createMany({
      data: Array.from({ length: 6 }).map((_, i) => ({
        imageUrl: img(`gelin-ig-${i}`, 800, 800),
        link: "",
        sortOrder: i,
      })),
    });
  }

  // --- Policy pages -----------------------------------------------------
  const policies = [
    {
      slug: "shipping",
      titleEn: "Shipping Policy",
      titleAr: "سياسة الشحن",
      contentEn:
        "We deliver across all governorates in Egypt within 2–5 business days. A flat delivery fee applies at checkout, with free delivery on orders above the threshold shown in your cart. Orders are processed within 24 hours on business days.",
      contentAr:
        "نقوم بالتوصيل إلى جميع محافظات مصر خلال 2-5 أيام عمل. تُطبق رسوم توصيل ثابتة عند إتمام الطلب، مع توصيل مجاني للطلبات التي تتجاوز الحد الموضح في سلتك. تتم معالجة الطلبات خلال 24 ساعة في أيام العمل.",
    },
    {
      slug: "returns",
      titleEn: "Returns & Exchange",
      titleAr: "الإرجاع والاستبدال",
      contentEn:
        "If you're not fully satisfied with your order, you may request a return or exchange within 14 days of delivery. Items must be unused, unwashed and in their original packaging. Contact us on WhatsApp to arrange a pickup.",
      contentAr:
        "إذا لم تكوني راضية تمامًا عن طلبك، يمكنك طلب إرجاع أو استبدال خلال 14 يومًا من الاستلام. يجب أن تكون المنتجات غير مستخدمة وغير مغسولة وبعبوتها الأصلية. تواصلي معنا عبر واتساب لترتيب الاستلام.",
    },
    {
      slug: "privacy",
      titleEn: "Privacy Policy",
      titleAr: "سياسة الخصوصية",
      contentEn:
        "Hand Made Gelin Home respects your privacy. We collect only the information needed to process your orders — name, phone, address and email — and never share it with third parties except delivery partners required to fulfill your order.",
      contentAr:
        "تحترم جلين هوم خصوصيتك. نجمع فقط المعلومات اللازمة لمعالجة طلباتك — الاسم والهاتف والعنوان والبريد الإلكتروني — ولا نشاركها مع أي طرف ثالث باستثناء شركاء التوصيل اللازمين لتنفيذ طلبك.",
    },
    {
      slug: "terms",
      titleEn: "Terms & Conditions",
      titleAr: "الشروط والأحكام",
      contentEn:
        "By placing an order with Hand Made Gelin Home you agree to pay the listed price plus any applicable delivery fee. Product photography is for illustration; minor variations in color or texture may occur due to the handmade nature of our pieces.",
      contentAr:
        "بإتمام طلب لدى جلين هوم فإنك توافقين على دفع السعر المعلن بالإضافة إلى أي رسوم توصيل. صور المنتجات للتوضيح فقط؛ قد تحدث اختلافات طفيفة في اللون أو الملمس نظرًا للطبيعة اليدوية لمنتجاتنا.",
    },
  ];
  for (const policy of policies) {
    await prisma.policyPage.upsert({ where: { slug: policy.slug }, update: {}, create: policy });
  }

  // --- Categories ----------------------------------------------------------
  const categoryDefs = [
    { name: "Bed Linen", nameAr: "مفارش الأسرة", slug: "bed-linen", seed: "cat-bed" },
    { name: "Towels", nameAr: "مناشف", slug: "towels", seed: "cat-towels" },
    { name: "Table Linen", nameAr: "مفارش الطاولة", slug: "table-linen", seed: "cat-table" },
    { name: "Bath Robes", nameAr: "أرواب الحمام", slug: "bath-robes", seed: "cat-robes" },
    { name: "Cushions & Throws", nameAr: "وسائد وأغطية", slug: "cushions-throws", seed: "cat-cushions" },
    { name: "Home Accessories", nameAr: "إكسسوارات منزلية", slug: "home-accessories", seed: "cat-accessories" },
    { name: "Kitchen Textiles", nameAr: "منسوجات المطبخ", slug: "kitchen-textiles", seed: "cat-kitchen" },
  ];

  const categories: Record<string, string> = {};
  for (let i = 0; i < categoryDefs.length; i++) {
    const def = categoryDefs[i];
    const category = await prisma.category.upsert({
      where: { slug: def.slug },
      update: {},
      create: {
        name: def.name,
        nameAr: def.nameAr,
        slug: def.slug,
        description: `Premium ${def.name.toLowerCase()} crafted with care.`,
        image: img(def.seed, 900, 1100),
        sortOrder: i,
        active: true,
      },
    });
    categories[def.slug] = category.id;
  }
  console.log(`${categoryDefs.length} categories ready`);

  // --- Products --------------------------------------------------------
  type ProductSeed = {
    name: string;
    nameAr: string;
    category: string;
    price: number;
    salePrice?: number;
    material: string;
    dimensions: string;
    sizes?: string[];
    colors?: { name: string; hex: string }[];
    featured?: boolean;
    bestseller?: boolean;
    newArrival?: boolean;
    onSale?: boolean;
    stock?: number;
  };

  const products: ProductSeed[] = [
    { name: "Egyptian Cotton Sateen Duvet Set", nameAr: "طقم لحاف ساتان قطن مصري", category: "bed-linen", price: 2450, salePrice: 1960, material: "100% Egyptian Cotton Sateen, 400 TC", dimensions: "220 x 240 cm", sizes: ["Double", "King"], colors: [{ name: "Ivory", hex: "#F1EAE0" }, { name: "Sand", hex: "#D8C8AE" }], featured: true, bestseller: true, onSale: true },
    { name: "Linen Blend Bed Sheet Set", nameAr: "طقم ملاءات مزيج كتان", category: "bed-linen", price: 1850, material: "55% Linen / 45% Cotton", dimensions: "160 x 200 cm", sizes: ["Single", "Double", "King"], colors: [{ name: "Stone", hex: "#C9BEA9" }, { name: "Charcoal", hex: "#4A4038" }], newArrival: true },
    { name: "Quilted Bedspread — Sand Dune", nameAr: "غطاء سرير مبطن — كثيب رملي", category: "bed-linen", price: 2100, material: "Cotton with polyester fill", dimensions: "240 x 260 cm", featured: true, stock: 8 },
    { name: "Embroidered Pillowcase Pair", nameAr: "زوج مخدات مطرزة", category: "bed-linen", price: 650, material: "Egyptian Cotton", dimensions: "50 x 75 cm", colors: [{ name: "Ivory", hex: "#F1EAE0" }], bestseller: true },
    { name: "Waffle Weave Bath Towel Set", nameAr: "طقم مناشف حمام منسوجة وافل", category: "towels", price: 980, salePrice: 780, material: "100% Turkish Cotton", dimensions: "70 x 140 cm (x2)", colors: [{ name: "Warm White", hex: "#F7F3EC" }, { name: "Terracotta", hex: "#B5714B" }], onSale: true, bestseller: true },
    { name: "Zero-Twist Hand Towel Set of 4", nameAr: "طقم مناشف يد ناعمة (4 قطع)", category: "towels", price: 540, material: "100% Combed Cotton", dimensions: "40 x 70 cm", newArrival: true },
    { name: "Oversized Beach & Bath Towel", nameAr: "منشفة شاطئ وحمام كبيرة", category: "towels", price: 720, material: "100% Cotton Terry", dimensions: "100 x 180 cm", colors: [{ name: "Sand", hex: "#D8C8AE" }, { name: "Charcoal", hex: "#4A4038" }] },
    { name: "Guest Towel Embroidered Set", nameAr: "طقم مناشف ضيوف مطرزة", category: "towels", price: 420, material: "Egyptian Cotton", dimensions: "30 x 50 cm", stock: 6 },
    { name: "Linen Table Runner — Natural", nameAr: "ممر طاولة كتان طبيعي", category: "table-linen", price: 480, material: "100% Stonewashed Linen", dimensions: "40 x 220 cm", featured: true },
    { name: "Cotton Tablecloth — Ivory Weave", nameAr: "مفرش طاولة قطن — نسيج عاجي", category: "table-linen", price: 890, material: "100% Cotton", dimensions: "150 x 220 cm", bestseller: true },
    { name: "Woven Placemat Set of 6", nameAr: "طقم مفارش فردية منسوجة (6 قطع)", category: "table-linen", price: 620, material: "Cotton & Jute Blend", dimensions: "35 x 45 cm", newArrival: true },
    { name: "Linen Napkin Set of 6 — Sage", nameAr: "طقم مناديل كتان (6 قطع) — أخضر فاتح", category: "table-linen", price: 390, salePrice: 310, material: "100% Linen", dimensions: "45 x 45 cm", onSale: true },
    { name: "Waffle Bathrobe — Unisex", nameAr: "روب حمام وافل — للجنسين", category: "bath-robes", price: 1290, material: "Cotton Waffle Weave", dimensions: "One Size", sizes: ["S/M", "L/XL"], colors: [{ name: "Warm White", hex: "#F7F3EC" }], featured: true, bestseller: true },
    { name: "Terry Kids Bathrobe with Hood", nameAr: "روب حمام أطفال بقلنسوة", category: "bath-robes", price: 750, material: "100% Cotton Terry", dimensions: "Ages 4–10", sizes: ["4-6y", "7-10y"], newArrival: true },
    { name: "Linen Blend Cushion Cover — Set of 2", nameAr: "غطاء وسادة كتان (2 قطعة)", category: "cushions-throws", price: 540, material: "60% Linen / 40% Cotton", dimensions: "45 x 45 cm", colors: [{ name: "Ivory", hex: "#F1EAE0" }, { name: "Terracotta", hex: "#B5714B" }], bestseller: true },
    { name: "Chunky Knit Throw Blanket", nameAr: "بطانية صوف محبوكة سميكة", category: "cushions-throws", price: 1450, salePrice: 1150, material: "Acrylic-Wool Blend", dimensions: "130 x 170 cm", onSale: true, featured: true },
    { name: "Tasseled Cotton Throw", nameAr: "غطاء قطني بشراريب", category: "cushions-throws", price: 890, material: "100% Cotton", dimensions: "150 x 200 cm", stock: 9 },
    { name: "Velvet Cushion Cover — Amber", nameAr: "غطاء وسادة مخملي — كهرماني", category: "cushions-throws", price: 480, material: "Velvet", dimensions: "50 x 50 cm", newArrival: true },
    { name: "Handblown Glass Vase — Amber", nameAr: "مزهرية زجاج مصنوعة يدويًا — كهرمانية", category: "home-accessories", price: 1150, material: "Handblown Glass", dimensions: "H 32 cm", featured: true },
    { name: "Ceramic Trinket Bowl Set", nameAr: "طقم أطباق سيراميك صغيرة", category: "home-accessories", price: 480, material: "Glazed Ceramic", dimensions: "12 cm diameter", bestseller: true },
    { name: "Rattan Storage Basket — Large", nameAr: "سلة تخزين خيزران — كبيرة", category: "home-accessories", price: 690, material: "Natural Rattan", dimensions: "40 x 30 cm", newArrival: true },
    { name: "Scented Soy Candle — Amber & Oud", nameAr: "شمعة صويا معطرة — كهرمان وعود", category: "home-accessories", price: 380, material: "Soy Wax", dimensions: "200g / 40hr burn", bestseller: true, stock: 15 },
    { name: "Linen Kitchen Apron", nameAr: "مريلة مطبخ كتان", category: "kitchen-textiles", price: 480, material: "100% Linen", dimensions: "One Size", colors: [{ name: "Stone", hex: "#C9BEA9" }, { name: "Charcoal", hex: "#4A4038" }] },
    { name: "Cotton Kitchen Towel Set of 3", nameAr: "طقم فوط مطبخ قطنية (3 قطع)", category: "kitchen-textiles", price: 320, salePrice: 260, material: "100% Cotton", dimensions: "45 x 70 cm", onSale: true },
    { name: "Woven Pot Holder Set", nameAr: "طقم ماسكات أواني منسوجة", category: "kitchen-textiles", price: 260, material: "Cotton", dimensions: "20 x 20 cm", stock: 4 },
  ];

  let createdCount = 0;
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const slug = p.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    const sku = `GH-${(i + 1).toString().padStart(4, "0")}`;

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) continue;

    await prisma.product.create({
      data: {
        name: p.name,
        nameAr: p.nameAr,
        slug,
        description: `${p.name} — thoughtfully crafted for Hand Made Gelin Home. Made from ${p.material.toLowerCase()}, this piece brings understated, timeless elegance to any room. Care instructions: gentle machine wash, do not bleach, tumble dry low.`,
        descriptionAr: `${p.nameAr} — قطعة مصممة بعناية من جلين هوم، مصنوعة من ${p.material}، تضيف لمسة أنيقة وخالدة لأي غرفة. تعليمات العناية: غسيل لطيف بالغسالة، لا تستخدمي المبيض، تجفيف منخفض الحرارة.`,
        shortDescription: `Crafted from ${p.material.toLowerCase()} for lasting comfort and quality.`,
        price: p.price,
        salePrice: p.salePrice ?? null,
        sku,
        stock: p.stock ?? 20,
        categoryId: categories[p.category],
        material: p.material,
        dimensions: p.dimensions,
        sizes: JSON.stringify(p.sizes || []),
        colors: JSON.stringify(p.colors || []),
        featured: p.featured ?? false,
        bestseller: p.bestseller ?? false,
        newArrival: p.newArrival ?? false,
        onSale: p.onSale ?? false,
        active: true,
        isDemo: true,
        images: {
          create: [0, 1, 2].map((imgIndex) => ({
            url: img(`${slug}-${imgIndex}`, 1200, 1500),
            sortOrder: imgIndex,
          })),
        },
      },
    });
    createdCount++;
  }
  console.log(`${createdCount} products created (${products.length - createdCount} already existed)`);

  // --- Sample reviews ------------------------------------------------
  const sampleProducts = await prisma.product.findMany({ take: 6, orderBy: { createdAt: "asc" } });
  const reviewCount = await prisma.review.count();
  if (reviewCount === 0) {
    const sampleReviews = [
      { name: "Mona A.", rating: 5, comment: "Beautiful quality, exactly as pictured. Fast delivery too!" },
      { name: "Sara H.", rating: 4, comment: "Lovely texture and color. Slightly smaller than I expected but still happy." },
      { name: "Youssef K.", rating: 5, comment: "Bought this as a gift — the packaging and quality were impressive." },
    ];
    for (const product of sampleProducts) {
      for (const review of sampleReviews) {
        await prisma.review.create({
          data: {
            productId: product.id,
            customerName: review.name,
            rating: review.rating,
            comment: review.comment,
          },
        });
      }
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
