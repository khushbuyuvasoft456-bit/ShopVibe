export const CATEGORIES = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Sports",
];

export const DUMMY_PRODUCTS = [
  // Electronics
  {
    id: "el-1",
    name: "Pro Wireless Noise-Cancelling Headphones",
    description:
      "Experience absolute audio clarity with our premium active noise-cancelling headphones. Featuring hybrid ANC technology, 40-hour battery life, fast charging, and plush memory foam earcups for ultimate all-day comfort. Seamless Bluetooth 5.2 connectivity ensures a lag-free audio experience for music, movies, and calls.",
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Electronics",
    variants: {
      colors: [
        { name: "Obsidian Black", hex: "#1a1a1a" },
        { name: "Platinum Silver", hex: "#e2e8f0" },
        { name: "Navy Blue", hex: "#1e3a8a" },
      ],
    },
    stock: 15,
    reviews: [
      {
        id: "rev-1-1",
        userName: "Sarah Jenkins",
        rating: 5,
        comment:
          "Amazing sound quality and the ANC is top tier. Easily matches more expensive brands.",
        date: "2026-05-12",
      },
      {
        id: "rev-1-2",
        userName: "Marcus Vance",
        rating: 4,
        comment:
          "Very comfortable for long flights. Battery life easily lasts my travel days.",
        date: "2026-05-28",
      },
      {
        id: "rev-1-3",
        userName: "Elena Rostova",
        rating: 5,
        comment: "The bass is crisp and not muddy. Highly recommended!",
        date: "2026-06-02",
      },
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "el-2",
    name: "Ultra-Thin Smart Watch Series 5",
    description:
      "Stay connected and track your wellness with the sleek, lightweight Smart Watch Series 5. Features dynamic heart rate monitoring, sleep analysis, SpO2 levels, blood pressure approximations, and 20+ sports modes. Its AMOLED crystal-clear display is visible even under direct sunlight, paired with a water-resistant design up to 50m.",
    price: 129.99,
    originalPrice: 159.99,
    discount: 18,
    rating: 4.5,
    reviewCount: 92,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Electronics",
    variants: {
      colors: [
        { name: "Space Gray", hex: "#374151" },
        { name: "Rose Gold", hex: "#fda4af" },
      ],
      sizes: ["40mm", "44mm"],
    },
    stock: 8,
    reviews: [
      {
        id: "rev-2-1",
        userName: "David K.",
        rating: 5,
        comment:
          "Tracking is accurate, and I only have to charge it once a week. Fantastic watch.",
        date: "2026-04-18",
      },
      {
        id: "rev-2-2",
        userName: "Clara M.",
        rating: 4,
        comment:
          "Beautiful display. Notification syncs instantly with my iPhone.",
        date: "2026-05-22",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: "el-3",
    name: "NextGen 10.5-inch Tablet Pro",
    description:
      "Engineered for both work and play, the NextGen Tablet Pro features a superfast octa-core processor, 8GB RAM, and 128GB of expandable storage. The gorgeous 2K display is perfect for drawing, streaming, and editing documents, backed by a robust 8000mAh battery that keeps you going all day.",
    price: 349.99,
    originalPrice: 399.99,
    discount: 12,
    rating: 4.6,
    reviewCount: 48,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Electronics",
    variants: {
      colors: [
        { name: "Carbon Gray", hex: "#1f2937" },
        { name: "Arctic Silver", hex: "#9ca3af" },
      ],
    },
    stock: 12,
    reviews: [
      {
        id: "rev-3-1",
        userName: "Jordan P.",
        rating: 5,
        comment:
          "Super fast, screen is incredibly sharp. Great value compared to IPad.",
        date: "2026-03-30",
      },
    ],
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: "el-4",
    name: "4K Action Sports Camera",
    description:
      "Capture your adventures in stunning detail with our ultra HD 4K Action Camera. Designed to withstand extreme environments, it features a waterproof case (up to 30m), advanced electronic image stabilization, 170-degree wide-angle lens, and built-in Wi-Fi to edit and share your moments instantly.",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.3,
    reviewCount: 37,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Electronics",
    variants: {
      colors: [{ name: "Matte Black", hex: "#030712" }],
    },
    stock: 20,
    reviews: [
      {
        id: "rev-4-1",
        userName: "Alex River",
        rating: 4,
        comment:
          "Used it snorkeling. Footage is very crisp. Stabilizer works well.",
        date: "2026-05-01",
      },
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
  },

  // Fashion
  {
    id: "fa-1",
    name: "Classic Leather Biker Jacket",
    description:
      "Crafted from 100% genuine full-grain leather, this timeless biker jacket is a wardrobe essential. Features premium asymmetric metal zippers, lapel collar, zippered cuffs, and a quilted lining for warmth. Tailored fit designed to age beautifully and last a lifetime.",
    price: 199.99,
    originalPrice: 279.99,
    discount: 28,
    rating: 4.7,
    reviewCount: 78,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Fashion",
    variants: {
      colors: [
        { name: "Classic Black", hex: "#000000" },
        { name: "Rustic Brown", hex: "#451a03" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    stock: 6,
    reviews: [
      {
        id: "rev-5-1",
        userName: "Tom H.",
        rating: 5,
        comment: "High quality heavy leather. Smells genuine. Fits perfectly.",
        date: "2026-04-10",
      },
      {
        id: "rev-5-2",
        userName: "Jessica V.",
        rating: 4,
        comment:
          "Bought for my husband, he loves it. Sleeves are a little snug.",
        date: "2026-04-25",
      },
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "fa-2",
    name: "AeroFit Lightweight Running Shoes",
    description:
      "Run further and faster with the AeroFit engineered mesh running shoes. The hyper-responsive foam midsole provides maximum shock absorption, while the breathable upper keeps feet cool. Finished with a high-abrasion rubber outsole for dependable grip on road or track.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.4,
    reviewCount: 110,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Fashion",
    variants: {
      colors: [
        { name: "Crimson Red", hex: "#ef4444" },
        { name: "Neon Lime", hex: "#84cc16" },
        { name: "Stealth Black", hex: "#1f2937" },
      ],
      sizes: ["8", "9", "10", "11"],
    },
    stock: 25,
    reviews: [
      {
        id: "rev-6-1",
        userName: "Brad S.",
        rating: 5,
        comment: "Extremely bouncy sole, runs like a dream.",
        date: "2026-05-15",
      },
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "fa-3",
    name: "Urban Explorer Canvas Backpack",
    description:
      'Designed for modern commuters and weekend travelers. Made from heavy-duty water-resistant canvas with rich leather accents. Includes a dedicated 15.6" padded laptop compartment, multiple storage pockets, and magnetic strap closures for quick accessibility.',
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    rating: 4.6,
    reviewCount: 65,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Fashion",
    variants: {
      colors: [
        { name: "Forest Green", hex: "#065f46" },
        { name: "Khaki Tan", hex: "#d97706" },
        { name: "Charcoal", hex: "#4b5563" },
      ],
    },
    stock: 14,
    reviews: [
      {
        id: "rev-7-1",
        userName: "Liam Fletcher",
        rating: 5,
        comment: "Fits my laptop, books, lunch box easily. Quality canvas.",
        date: "2026-05-20",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: "fa-4",
    name: "Retro Round Sunglasses",
    description:
      "Channel vintage aesthetics with our Retro Round Sunglasses. Features thin gold-tone metal frames and polarized, 100% UV400 protective lenses to safeguard your eyes. Lightweight and comfortable for all-day sunwear.",
    price: 24.99,
    originalPrice: 39.99,
    discount: 37,
    rating: 4.2,
    reviewCount: 39,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Fashion",
    variants: {
      colors: [
        { name: "Gold/Green", hex: "#b45309" },
        { name: "Silver/Black", hex: "#6b7280" },
      ],
    },
    stock: 30,
    reviews: [
      {
        id: "rev-8-1",
        userName: "Zoe B.",
        rating: 4,
        comment: "Super cute and classic. Polarization works very well.",
        date: "2026-06-01",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
  },

  // Home & Kitchen
  {
    id: "hk-1",
    name: "Barista Touch Espresso Machine",
    description:
      "Bring the third-wave specialty coffee shop experience home. This semi-automatic espresso machine features an integrated precision conical burr grinder, digital PID temperature control, and a commercial-style steam wand for silky microfoam milk texturing.",
    price: 599.99,
    originalPrice: 699.99,
    discount: 14,
    rating: 4.9,
    reviewCount: 54,
    images: [
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579888944880-d983411b8cb3?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Home & Kitchen",
    variants: {
      colors: [
        { name: "Brushed Steel", hex: "#cbd5e1" },
        { name: "Truffle Black", hex: "#27272a" },
      ],
    },
    stock: 5,
    reviews: [
      {
        id: "rev-9-1",
        userName: "Robert C.",
        rating: 5,
        comment:
          "Outstanding espresso pull. Grinder runs smoothly. Takes some practice but worth it.",
        date: "2026-05-10",
      },
      {
        id: "rev-9-2",
        userName: "Sophia G.",
        rating: 5,
        comment:
          "I haven't bought Starbucks in weeks. This machine is a masterpiece.",
        date: "2026-06-05",
      },
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "hk-2",
    name: "High-Speed Professional Blender",
    description:
      "Pulverize ice, frozen fruit, and tough greens with our 1400-watt commercial-grade motor. Features variable speed controls, pulse settings, and 3 pre-programmed cycles for perfect smoothies, hot soups, and frozen desserts. The 64 oz container is BPA-free and self-cleaning.",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Home & Kitchen",
    variants: {
      colors: [
        { name: "Slate Gray", hex: "#4b5563" },
        { name: "Vibrant Red", hex: "#dc2626" },
      ],
    },
    stock: 12,
    reviews: [
      {
        id: "rev-10-1",
        userName: "Danielle",
        rating: 5,
        comment: "Crushes ice like snow. Best smoothies I've ever made.",
        date: "2026-05-14",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
  },
  {
    id: "hk-3",
    name: "Digital Air Fryer Pro XL",
    description:
      "Enjoy your favorite crispy foods with up to 85% less oil than traditional deep fryers. With 8 preset functions, touch control panel, and a massive 5.8-quart nonstick basket, cooking meals for the whole family is faster, healthier, and effortless.",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    rating: 4.7,
    reviewCount: 88,
    images: [
      "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Home & Kitchen",
    variants: {
      colors: [{ name: "Glossy Black", hex: "#09090b" }],
    },
    stock: 15,
    reviews: [
      {
        id: "rev-11-1",
        userName: "Monica G.",
        rating: 5,
        comment: "Life-changing appliance. Cooked crispy wings in 20 minutes.",
        date: "2026-05-18",
      },
      {
        id: "rev-11-2",
        userName: "Chandler B.",
        rating: 4,
        comment:
          "Good size. Cleaning is simple, though it takes a lot of counter space.",
        date: "2026-05-24",
      },
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "hk-4",
    name: "Minimalist Ceramic Mug Set (4-Piece)",
    description:
      "Sip your morning brew in elegance. Our artisanal stoneware ceramic mugs are individually glazed for a unique finish. Microwave and dishwasher safe, featuring ergonomic wide loops and thick walls to keep your beverages piping hot.",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Home & Kitchen",
    variants: {
      colors: [
        { name: "Cream White", hex: "#fef08a" },
        { name: "Sage Green", hex: "#a7f3d0" },
        { name: "Terracotta", hex: "#fed7aa" },
      ],
    },
    stock: 18,
    reviews: [
      {
        id: "rev-12-1",
        userName: "Anna L.",
        rating: 5,
        comment: "Beautiful textures. I love holding these in the morning.",
        date: "2026-06-03",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
  },

  // Beauty
  {
    id: "be-1",
    name: "Organic Vitamin C Face Serum",
    description:
      "Rejuvenate and brighten your skin tone with our pure Organic Vitamin C Face Serum. Formulated with 20% L-Ascorbic Acid, Hyaluronic Acid, and Vitamin E to boost collagen production, fade dark spots, and defend against environmental stressors.",
    price: 24.99,
    originalPrice: 34.99,
    discount: 28,
    rating: 4.6,
    reviewCount: 154,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Beauty",
    variants: {
      sizes: ["30ml", "50ml"],
    },
    stock: 40,
    reviews: [
      {
        id: "rev-13-1",
        userName: "Lily Rose",
        rating: 5,
        comment:
          "Faded my acne scars in two weeks. Very hydrating and doesn't feel sticky.",
        date: "2026-05-02",
      },
      {
        id: "rev-13-2",
        userName: "Gemma O.",
        rating: 4,
        comment: "Excellent serum. Skin looks visibly glowing.",
        date: "2026-05-20",
      },
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "be-2",
    name: "Premium Rose Water Hydration Spray",
    description:
      "100% pure, natural distilled Moroccan Rose Water. Multi-use toner, makeup setter, and cooling mist that hydrates, balances pH, and calms irritated skin. Free from alcohol, artificial fragrances, or parabens.",
    price: 14.99,
    originalPrice: 19.99,
    discount: 25,
    rating: 4.4,
    reviewCount: 76,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Beauty",
    variants: {
      sizes: ["100ml"],
    },
    stock: 22,
    reviews: [
      {
        id: "rev-14-1",
        userName: "Tina",
        rating: 4,
        comment: "Smells divine and very refreshing during hot days.",
        date: "2026-05-15",
      },
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
  },
  {
    id: "be-3",
    name: "Ionic Hair Dryer & Volumizer",
    description:
      "Dry and style your hair simultaneously for Salon-quality results. The 1100-watt hair dryer features tourmaline-ceramic heating with negative ions to reduce frizz and heat damage, leaving hair shiny and voluminous.",
    price: 49.99,
    originalPrice: 64.99,
    discount: 23,
    rating: 4.5,
    reviewCount: 63,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Beauty",
    variants: {
      colors: [
        { name: "Midnight Teal", hex: "#115e59" },
        { name: "Dusty Pink", hex: "#f472b6" },
      ],
    },
    stock: 10,
    reviews: [
      {
        id: "rev-15-1",
        userName: "Rachel Green",
        rating: 5,
        comment: "Dries my hair so fast and gives the best bounce!",
        date: "2026-05-30",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    id: "be-4",
    name: "Velvet Matte Liquid Lipstick Trio",
    description:
      "Get intense pigment with a weightless, transfer-proof matte finish. Includes three best-selling nude, pink, and red shades. Enriched with avocado oil and vitamin E to prevent drying and provide 12-hour comfortable wear.",
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    rating: 4.3,
    reviewCount: 45,
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Beauty",
    variants: {
      colors: [
        { name: "Nude Trio", hex: "#d97706" },
        { name: "Berry Trio", hex: "#9d174d" },
      ],
    },
    stock: 35,
    reviews: [
      {
        id: "rev-16-1",
        userName: "Mila K.",
        rating: 4,
        comment:
          "Colors are gorgeous and transfer proof, though a bit dry after 6 hours.",
        date: "2026-05-12",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: false,
  },

  // Sports
  {
    id: "sp-1",
    name: "Non-Slip Alignment Yoga Mat",
    description:
      "Elevate your yoga practice with our eco-friendly TPE yoga mat. Features double-sided non-slip textures, optimal 6mm cushioning for joints, and laser-engraved alignment lines to guide hands and feet accurately during poses.",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    rating: 4.7,
    reviewCount: 81,
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Sports",
    variants: {
      colors: [
        { name: "Ocean Blue", hex: "#0284c7" },
        { name: "Lilac Violet", hex: "#c084fc" },
        { name: "Olive Green", hex: "#65a30d" },
      ],
    },
    stock: 15,
    reviews: [
      {
        id: "rev-17-1",
        userName: "Maya",
        rating: 5,
        comment:
          "Doesn't slip at all even in hot yoga. Alignment lines are super helpful.",
        date: "2026-05-09",
      },
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
  },
  {
    id: "sp-2",
    name: "Insulated Stainless Steel Water Bottle",
    description:
      "Keep your drinks ice cold for up to 24 hours or steaming hot for 12 hours. Constructed from double-walled, food-grade 18/8 stainless steel with a sweat-proof exterior. Comes with an leakproof straw lid and carrying loop.",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    rating: 4.6,
    reviewCount: 140,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Sports",
    variants: {
      colors: [
        { name: "Pacific Teal", hex: "#0d9488" },
        { name: "Granite Gray", hex: "#374151" },
        { name: "Blush Pink", hex: "#ec4899" },
      ],
      sizes: ["24 oz", "32 oz"],
    },
    stock: 22,
    reviews: [
      {
        id: "rev-18-1",
        userName: "John Doe",
        rating: 5,
        comment: "Ice stays frozen all day long, even in a hot car. Amazing.",
        date: "2026-05-25",
      },
    ],
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: true,
  },
  {
    id: "sp-3",
    name: "Adjustable Dumbbell Set (40 lbs)",
    description:
      "Maximize your home gym efficiency with this all-in-one adjustable dumbbell set. Includes heavy-duty cast iron plates, secure spinlock collars, and an ergonomic textured steel handle that converts from 5 lbs up to 40 lbs.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.5,
    reviewCount: 52,
    images: [
      "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Sports",
    variants: {},
    stock: 8,
    reviews: [
      {
        id: "rev-19-1",
        userName: "Mike P.",
        rating: 5,
        comment: "Very sturdy plates. Spinlocks stay tight. Excellent value.",
        date: "2026-05-14",
      },
    ],
    isFeatured: true,
    isNewArrival: false,
    isBestSeller: false,
  },
  {
    id: "sp-4",
    name: "GPS Smart Fitness Tracker",
    description:
      "Track your running routes, pacing, and sleep patterns with built-in GPS. Features continuous stress monitoring, recovery scores, music controls, and smartwatch notifications. Sleek design with a breathable silicone sports band.",
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    rating: 4.4,
    reviewCount: 60,
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Sports",
    variants: {
      colors: [
        { name: "Active Orange", hex: "#f97316" },
        { name: "Stealth Black", hex: "#0f172a" },
      ],
    },
    stock: 12,
    reviews: [
      {
        id: "rev-20-1",
        userName: "Gavin D.",
        rating: 4,
        comment:
          "GPS connects quickly. Heart rate matches my chest strap perfectly.",
        date: "2026-06-02",
      },
    ],
    isFeatured: false,
    isNewArrival: true,
    isBestSeller: true,
  },
];
