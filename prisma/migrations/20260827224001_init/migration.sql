-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "descriptionAr" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionAr" TEXT,
    "shortDescription" TEXT,
    "shortDescriptionAr" TEXT,
    "price" REAL NOT NULL,
    "salePrice" REAL,
    "sku" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "material" TEXT,
    "dimensions" TEXT,
    "sizes" TEXT NOT NULL DEFAULT '[]',
    "colors" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "bestseller" BOOLEAN NOT NULL DEFAULT false,
    "newArrival" BOOLEAN NOT NULL DEFAULT false,
    "onSale" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "governorate" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "building" TEXT,
    "apartment" TEXT,
    "notes" TEXT,
    "subtotal" REAL NOT NULL,
    "deliveryFee" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL DEFAULT 'cod',
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" INTEGER NOT NULL,
    "productId" TEXT,
    "productName" TEXT NOT NULL,
    "productImage" TEXT,
    "size" TEXT,
    "color" TEXT,
    "unitPrice" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HomepageContent" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "heroImage" TEXT NOT NULL DEFAULT '',
    "heroTitleEn" TEXT NOT NULL DEFAULT 'Made for Beautiful Living.',
    "heroTitleAr" TEXT NOT NULL DEFAULT 'صُنع من أجل حياة أجمل.',
    "heroSubtitleEn" TEXT NOT NULL DEFAULT 'Thoughtfully crafted home essentials designed to make everyday spaces feel extraordinary.',
    "heroSubtitleAr" TEXT NOT NULL DEFAULT 'قطع منزلية مصنوعة بعناية لتجعل مساحاتك اليومية استثنائية.',
    "heroButtonPrimaryEn" TEXT NOT NULL DEFAULT 'Shop Collection',
    "heroButtonPrimaryAr" TEXT NOT NULL DEFAULT 'تسوقي المجموعة',
    "heroButtonSecondaryEn" TEXT NOT NULL DEFAULT 'Discover Gelin Home',
    "heroButtonSecondaryAr" TEXT NOT NULL DEFAULT 'اكتشفي جلين هوم',
    "brandStoryTitleEn" TEXT NOT NULL DEFAULT 'Crafted with intention.',
    "brandStoryTitleAr" TEXT NOT NULL DEFAULT 'صُنع بعناية ونية.',
    "brandStoryBodyEn" TEXT NOT NULL DEFAULT 'At Gelin Home, we believe the smallest details can transform a space. Every collection is selected with an appreciation for quality, comfort and timeless design.',
    "brandStoryBodyAr" TEXT NOT NULL DEFAULT 'في جلين هوم، نؤمن بأن أدق التفاصيل قادرة على تحويل أي مساحة. نختار كل مجموعة بتقدير للجودة والراحة والتصميم الخالد.',
    "brandStoryImage" TEXT NOT NULL DEFAULT '',
    "newCollectionTitleEn" TEXT NOT NULL DEFAULT 'The New Collection',
    "newCollectionTitleAr" TEXT NOT NULL DEFAULT 'المجموعة الجديدة',
    "newCollectionSubtitleEn" TEXT NOT NULL DEFAULT 'Fresh textures and warm neutrals for the season ahead.',
    "newCollectionSubtitleAr" TEXT NOT NULL DEFAULT 'ملمس جديد وألوان دافئة محايدة لموسم قادم.',
    "newCollectionImage" TEXT NOT NULL DEFAULT '',
    "newsletterTitleEn" TEXT NOT NULL DEFAULT 'Join the Gelin Home world.',
    "newsletterTitleAr" TEXT NOT NULL DEFAULT 'انضمي إلى عالم جلين هوم.',
    "newsletterSubtitleEn" TEXT NOT NULL DEFAULT 'Be the first to know about new collections, private sales and stories from the atelier.',
    "newsletterSubtitleAr" TEXT NOT NULL DEFAULT 'كوني أول من يعلم بمجموعاتنا الجديدة وعروضنا الخاصة.',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "brandName" TEXT NOT NULL DEFAULT 'Hand Made Gelin Home',
    "logoUrl" TEXT NOT NULL DEFAULT '',
    "faviconUrl" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '+20 100 000 0000',
    "whatsapp" TEXT NOT NULL DEFAULT '+20 100 000 0000',
    "email" TEXT NOT NULL DEFAULT 'hello@gelinhome.com',
    "addressEn" TEXT NOT NULL DEFAULT 'Nasr City, Cairo, Egypt',
    "addressAr" TEXT NOT NULL DEFAULT 'مدينة نصر، القاهرة، مصر',
    "googleMapsUrl" TEXT NOT NULL DEFAULT 'https://maps.app.goo.gl/RDpJEYgbQjRk5fFH6',
    "openingHoursEn" TEXT NOT NULL DEFAULT 'Saturday – Thursday, 10:00 AM – 10:00 PM',
    "openingHoursAr" TEXT NOT NULL DEFAULT 'السبت – الخميس، 10:00 صباحًا – 10:00 مساءً',
    "instagram" TEXT NOT NULL DEFAULT '',
    "facebook" TEXT NOT NULL DEFAULT '',
    "tiktok" TEXT NOT NULL DEFAULT '',
    "deliveryFee" REAL NOT NULL DEFAULT 75,
    "freeShippingThreshold" REAL NOT NULL DEFAULT 2000,
    "deliveryInfoEn" TEXT NOT NULL DEFAULT 'Delivery within 2–5 business days across Egypt.',
    "deliveryInfoAr" TEXT NOT NULL DEFAULT 'التوصيل خلال 2-5 أيام عمل داخل مصر.',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PolicyPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentAr" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "ProductImage_productId_idx" ON "ProductImage"("productId");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PolicyPage_slug_key" ON "PolicyPage"("slug");
