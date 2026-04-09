// Mock data for FitMatch development
// This simulates what we'll get from Serper Shopping API + Gemini

export const AESTHETIC_TAGS = [
  'Old Money', 'Streetwear', 'Minimalist', 'Y2K', 'Dark Academia',
  'Coastal Grandmother', 'Quiet Luxury', 'Gorpcore', 'Coquette',
  'Bohemian', 'Preppy', 'Grunge', 'Athleisure', 'Cottagecore'
]

export const BRANDS = ['Zara', 'ASOS', 'SSENSE']

export const MOCK_ITEMS = [
  {
    id: '1',
    title: 'Oversized Wool Blend Blazer',
    brand: 'Zara',
    price: 89.90,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=550&fit=crop',
    product_url: 'https://www.zara.com',
    store: 'Zara',
    aesthetic_tags: ['Old Money', 'Quiet Luxury'],
    color: 'Navy',
    category: 'Blazers'
  },
  {
    id: '2',
    title: 'Pleated Wide-Leg Trousers',
    brand: 'ASOS',
    price: 45.00,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=600&fit=crop',
    product_url: 'https://www.asos.com',
    store: 'ASOS',
    aesthetic_tags: ['Minimalist', 'Old Money'],
    color: 'Cream',
    category: 'Pants'
  },
  {
    id: '3',
    title: 'Chunky Platform Sneakers',
    brand: 'SSENSE',
    price: 320.00,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
    product_url: 'https://www.ssense.com',
    store: 'SSENSE',
    aesthetic_tags: ['Streetwear', 'Y2K'],
    color: 'White',
    category: 'Shoes'
  },
  {
    id: '4',
    title: 'Cashmere V-Neck Sweater',
    brand: 'Zara',
    price: 69.90,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=550&fit=crop',
    product_url: 'https://www.zara.com',
    store: 'Zara',
    aesthetic_tags: ['Quiet Luxury', 'Minimalist'],
    color: 'Camel',
    category: 'Sweaters'
  },
  {
    id: '5',
    title: 'Leather Crossbody Bag',
    brand: 'ASOS',
    price: 55.00,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=480&fit=crop',
    product_url: 'https://www.asos.com',
    store: 'ASOS',
    aesthetic_tags: ['Old Money', 'Dark Academia'],
    color: 'Brown',
    category: 'Bags'
  },
  {
    id: '6',
    title: 'Relaxed Fit Denim Jacket',
    brand: 'Zara',
    price: 59.90,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=560&fit=crop',
    product_url: 'https://www.zara.com',
    store: 'Zara',
    aesthetic_tags: ['Streetwear', 'Grunge'],
    color: 'Light Blue',
    category: 'Jackets'
  },
  {
    id: '7',
    title: 'Linen Button-Down Shirt',
    brand: 'ASOS',
    price: 38.00,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=520&fit=crop',
    product_url: 'https://www.asos.com',
    store: 'ASOS',
    aesthetic_tags: ['Coastal Grandmother', 'Minimalist'],
    color: 'White',
    category: 'Shirts'
  },
  {
    id: '8',
    title: 'Tailored Midi Skirt',
    brand: 'SSENSE',
    price: 195.00,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=400&h=580&fit=crop',
    product_url: 'https://www.ssense.com',
    store: 'SSENSE',
    aesthetic_tags: ['Dark Academia', 'Preppy'],
    color: 'Charcoal',
    category: 'Skirts'
  },
  {
    id: '9',
    title: 'Knit Polo Short Sleeve',
    brand: 'Zara',
    price: 35.90,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop',
    product_url: 'https://www.zara.com',
    store: 'Zara',
    aesthetic_tags: ['Preppy', 'Old Money'],
    color: 'Olive',
    category: 'Tops'
  },
  {
    id: '10',
    title: 'High-Rise Straight Jeans',
    brand: 'ASOS',
    price: 42.00,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop',
    product_url: 'https://www.asos.com',
    store: 'ASOS',
    aesthetic_tags: ['Minimalist', 'Streetwear'],
    color: 'Indigo',
    category: 'Jeans'
  },
  {
    id: '11',
    title: 'Structured Tote Bag',
    brand: 'SSENSE',
    price: 275.00,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=480&fit=crop',
    product_url: 'https://www.ssense.com',
    store: 'SSENSE',
    aesthetic_tags: ['Quiet Luxury', 'Old Money'],
    color: 'Black',
    category: 'Bags'
  },
  {
    id: '12',
    title: 'Cropped Bomber Jacket',
    brand: 'Zara',
    price: 79.90,
    currency: 'USD',
    image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=540&fit=crop',
    product_url: 'https://www.zara.com',
    store: 'Zara',
    aesthetic_tags: ['Streetwear', 'Athleisure'],
    color: 'Black',
    category: 'Jackets'
  }
]

export const MOCK_BOARDS = [
  {
    id: 'b1',
    name: 'Old Money Essentials',
    description: 'Timeless pieces for the quiet luxury aesthetic',
    itemCount: 24,
    coverImages: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop',
    ]
  },
  {
    id: 'b2',
    name: 'Street Style',
    description: 'Urban edge meets comfort',
    itemCount: 18,
    coverImages: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop',
    ]
  },
  {
    id: 'b3',
    name: 'Interview Ready',
    description: 'Professional outfits that make an impression',
    itemCount: 12,
    coverImages: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop',
    ]
  }
]

export const MOCK_USER = {
  id: 'u1',
  username: 'stylelover',
  display_name: 'Alex Jordan',
  avatar_url: null,
  stats: { boards: 3, likes: 47, following: 12, followers: 8 }
}
