/* ========================================
   SHOP SLICE — Products + Cart State
   - products: fetched from Supabase, fallback to seeds
   - cart: localStorage-persisted line items
   - orders: checkout submission
   ======================================== */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts as fetchFromSupabase, saveOrder } from '../../lib/supabase';

// ─── Seed data (shown when Supabase is not yet configured) ───
export const SEED_PRODUCTS = [
  {
    id: 'seed-1',
    name: 'Plug-and-Play Starter Kit',
    subtitle: 'Class 5–8 Essentials',
    price_inr: 24999,
    original_price_inr: 29999,
    badge: 'Bestseller',
    badge_color: '#F59E0B',
    class_level: 'Class 5–8',
    category: 'Starter',
    image_url: 'https://picsum.photos/seed/shop-kit-1/800/500',
    rating: 4.8,
    review_count: 312,
    tags: ['Basic Electronics', 'Sensor Kits', 'Junior Coding', 'Lab Manual'],
    description: 'The perfect starter kit for young learners. Includes all essential electronics, sensor kits, and a full lab manual.',
    save_percent: 17,
    active: true,
  },
  {
    id: 'seed-2',
    name: 'Arduino Robotics Kit',
    subtitle: 'Build & Program Real Robots',
    price_inr: 39999,
    original_price_inr: 49999,
    badge: 'Popular',
    badge_color: '#2D5BE3',
    class_level: 'Class 8–12',
    category: 'Robotics',
    image_url: 'https://picsum.photos/seed/shop-kit-2/800/500',
    rating: 4.9,
    review_count: 487,
    tags: ['Arduino Uno', 'Servo & DC Motors', 'Ultrasonic Sensors', 'Python Interface'],
    description: 'Build and program real robots using Arduino. Includes full robotics components and programming guide.',
    save_percent: 20,
    active: true,
  },
  {
    id: 'seed-3',
    name: 'AI & Vision Kit',
    subtitle: 'Machine Learning for Schools',
    price_inr: 64999,
    original_price_inr: 79999,
    badge: 'New',
    badge_color: '#8B5CF6',
    class_level: 'Class 11+ / College',
    category: 'AI/ML',
    image_url: 'https://picsum.photos/seed/shop-kit-3/800/500',
    rating: 4.7,
    review_count: 128,
    tags: ['Jetson Nano', 'Camera Module', 'TensorFlow Lite', 'Gesture Recognition'],
    description: 'Dive into AI and machine learning with Jetson Nano. Includes camera module and gesture recognition projects.',
    save_percent: 19,
    active: true,
  },
  {
    id: 'seed-4',
    name: 'IoT Smart Home Kit',
    subtitle: 'Connect & Automate Everything',
    price_inr: 34999,
    original_price_inr: 44999,
    badge: 'Sale',
    badge_color: '#EF4444',
    class_level: 'College / Research',
    category: 'IoT',
    image_url: 'https://picsum.photos/seed/shop-kit-4/800/500',
    rating: 4.6,
    review_count: 203,
    tags: ['NodeMCU', 'MQTT Broker', 'Cloud Dashboard', 'Smart Sensors Pack'],
    description: 'Build smart home automation with NodeMCU and cloud connectivity. Full IoT stack included.',
    save_percent: 22,
    active: true,
  },
  {
    id: 'seed-5',
    name: 'Raspberry Pi Lab Kit',
    subtitle: 'Full Linux Computer in Your Kit',
    price_inr: 44999,
    original_price_inr: 54999,
    badge: 'Pro',
    badge_color: '#0EA5E9',
    class_level: 'Class 10–12 / College',
    category: 'Computing',
    image_url: 'https://picsum.photos/seed/shop-kit-5/800/500',
    rating: 4.8,
    review_count: 176,
    tags: ['Raspberry Pi 4', 'Python & C++', 'GPIO Projects', 'Touchscreen Display'],
    description: 'A full Linux computer in your lab kit. Run Python, GPIO projects and connect a touchscreen display.',
    save_percent: 18,
    active: true,
  },
  {
    id: 'seed-6',
    name: 'Science Exploration Kit',
    subtitle: 'Hands-On STEM for Juniors',
    price_inr: 14999,
    original_price_inr: 18999,
    badge: 'Starter',
    badge_color: '#10B981',
    class_level: 'Class 5–7',
    category: 'Science',
    image_url: 'https://picsum.photos/seed/shop-kit-6/800/500',
    rating: 4.9,
    review_count: 421,
    tags: ['Physics Experiments', 'Chemistry Kits', 'Biology Slides', 'Experiment Manual'],
    description: 'Explore science with hands-on physics, chemistry and biology experiments. Perfect for juniors.',
    save_percent: 21,
    active: true,
  },
];

// ─── Load cart from localStorage ──────────────────────────
const loadCart = () => {
  try {
    const saved = localStorage.getItem('snp_cart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

const saveCart = (cartItems) => {
  try { localStorage.setItem('snp_cart', JSON.stringify(cartItems)); } catch { /* ignore */ }
};

// ─── Async Thunks ─────────────────────────────────────────
export const fetchProducts = createAsyncThunk(
  'shop/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchFromSupabase();
      return products.length > 0 ? products : SEED_PRODUCTS;
    } catch (error) {
      return SEED_PRODUCTS; // always fallback — never break the page
    }
  }
);

export const placeOrder = createAsyncThunk(
  'shop/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const result = await saveOrder(orderData);
      return result;
    } catch (error) {
      return rejectWithValue('Failed to place order');
    }
  }
);

// ─── Slice ────────────────────────────────────────────────
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    products: [],
    productsStatus: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    cart: loadCart(),           // [{ product, quantity }]
    cartOpen: false,
    orderStatus: 'idle',        // 'idle' | 'loading' | 'succeeded' | 'failed'
    orderMessage: '',
    activeCategory: 'All',
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.cart.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ product, quantity: 1 });
      }
      saveCart(state.cart);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.product.id !== action.payload);
      saveCart(state.cart);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cart.find(i => i.product.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(state.cart);
      }
    },
    clearCart(state) {
      state.cart = [];
      saveCart([]);
    },
    toggleCart(state, action) {
      state.cartOpen = action.payload !== undefined ? action.payload : !state.cartOpen;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    resetOrderStatus(state) {
      state.orderStatus = 'idle';
      state.orderMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.productsStatus = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsStatus = 'failed';
        state.products = SEED_PRODUCTS;
      })
      .addCase(placeOrder.pending, (state) => { state.orderStatus = 'loading'; })
      .addCase(placeOrder.fulfilled, (state) => {
        state.orderStatus = 'succeeded';
        state.orderMessage = 'Order placed successfully! We will contact you shortly.';
        state.cart = [];
        saveCart([]);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.orderMessage = action.payload || 'Failed to place order. Please try again.';
      });
  },
});

// ─── Selectors ───────────────────────────────────────────
export const selectCartTotal = (state) =>
  state.shop.cart.reduce((sum, item) => sum + item.product.price_inr * item.quantity, 0);

export const selectCartCount = (state) =>
  state.shop.cart.reduce((sum, item) => sum + item.quantity, 0);

export const selectFilteredProducts = (state) => {
  const { products, activeCategory } = state.shop;
  if (activeCategory === 'All') return products;
  return products.filter(p => p.category === activeCategory);
};

export const selectCategories = (state) => {
  const cats = ['All', ...new Set(state.shop.products.map(p => p.category).filter(Boolean))];
  return cats;
};

export const {
  addToCart, removeFromCart, updateQuantity, clearCart,
  toggleCart, setActiveCategory, resetOrderStatus,
} = shopSlice.actions;

export default shopSlice.reducer;
