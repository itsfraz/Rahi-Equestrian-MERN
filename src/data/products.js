const products = [
  {
    /* HMR trigger */
    id: 1,
    name: "Classic Riding Helmet",
    price: 89.99,
    image: "/images/Apperal_Helmet_01.jpeg",
    images: [
      "/images/Apperal_Helmet_01.jpeg",
      "/images/Apperal_Helmet_02.jpeg", 
      "/images/Apperal_Helmet_03.jpeg",
      "/images/Apperal_Helmet_01.jpeg" // Distinct angle simulation
    ],
    description: "Certified safety helmet for everyday riding. Features a lightweight shell, advanced ventilation system, and a comfortable, moisture-wicking liner. Perfect for training and casual rides.",
    category: "Rider Gear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#1a1a1a", "#333333"]
  },
  {
    id: 2,
    name: "Elite Competition Helmet",
    price: 129.99,
    image: "/images/Apperal_Helmet_02.jpeg",
    images: [
       "/images/Apperal_Helmet_02.jpeg",
       "/images/Apperal_Helmet_01.jpeg",
       "/images/Apperal_Helmet_03.jpeg"
    ],
    description: "Premium helmet with advanced ventilation flow. Designed for the competitive rider who demands both safety and style.",
    category: "Rider Gear",
    sizes: ["S", "M", "L"],
    colors: ["#000000", "#1F2937"]
  },
  {
    id: 3,
    name: "Matte Finish Helmet",
    price: 109.99,
    image: "/images/Apperal_Helmet_03.jpeg",
    images: [
      "/images/Apperal_Helmet_03.jpeg",
      "/images/Apperal_Helmet_01.jpeg",
      "/images/Apperal_Helmet_02.jpeg"
    ],
    description: "Stylish matte finish helmet with adjustable fit. sleek look with maximum protection.",
    category: "Rider Gear",
    sizes: ["S", "M", "L"],
    colors: ["#111827", "#374151"]
  },
  {
    id: 4,
    name: "Performance Riding Boots",
    price: 199.99,
    image: "/images/Apperal_BT_N01.jpeg",
    images: [
      "/images/Apperal_BT_N01.jpeg",
      "/images/Apperal_BT_N02.jpeg",
      "/images/Apperal_BT_N03.jpeg"
    ],
    description: "Durable leather boots designed for all-day comfort. Reinforced toe and heel for extra protection.",
    category: "Rider Gear",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["#3E2723", "#000000"]
  },
  {
    id: 5,
    name: "Field Riding Boots",
    price: 219.99,
    image: "/images/Apperal_BT_N02.jpeg",
    description: "Classic field boots with laced front for flexibility.",
    category: "Rider Gear"
  },
  {
    id: 6,
    name: "Dressage Boots",
    price: 249.99,
    image: "/images/Apperal_BT_N03.jpeg",
    description: "Stiff-shaft dressage boots for optimal leg position.",
    category: "Rider Gear"
  },
  {
    id: 7,
    name: "Premium Leather Bridle",
    price: 149.99,
    image: "/images/Equ_pro_B01.jpeg",
    description: "High-quality leather bridle with padded noseband.",
    category: "Saddlery"
  },
  {
    id: 8,
    name: "Anatomic Bridle Set",
    price: 169.99,
    image: "/images/Equ_pro_B02.jpeg",
    description: "Anatomically designed headpiece to reduce pressure.",
    category: "Saddlery"
  },
  {
    id: 9,
    name: "Show Jumping Bridle",
    price: 159.99,
    image: "/images/Equ_pro_B03.jpeg",
    description: "Fancy stitched bridle ideal for the show ring.",
    category: "Saddlery"
  },
  {
    id: 10,
    name: "Double Bridle",
    price: 189.99,
    image: "/images/Equ_pro_B04.jpeg",
    description: "Elegant double bridle for upper level dressage.",
    category: "Saddlery"
  },
  {
    id: 11,
    name: "Leather Headcollar",
    price: 49.99,
    image: "/images/Cagry4.jpeg",
    description: "Soft leather headcollar with brass fittings.",
    category: "Horse Care"
  }
];

export { products };
