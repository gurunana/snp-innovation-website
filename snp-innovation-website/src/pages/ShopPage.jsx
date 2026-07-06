/* ========================================
   SHOP PAGE — /shop
   Dynamic product grid + cart drawer + checkout
   Data comes from Supabase (falls back to seed data)
   ======================================== */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Container, Typography, Card, CardMedia, CardContent,
  Chip, Button, Drawer, IconButton, Divider, TextField, Badge,
  CircularProgress, Alert, Snackbar, Stack, Paper, Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBag';

import {
  fetchProducts, addToCart, removeFromCart, updateQuantity,
  clearCart, toggleCart, setActiveCategory, placeOrder, resetOrderStatus,
  selectCartTotal, selectCartCount, selectFilteredProducts, selectCategories,
} from '../store/slices/shopSlice';
import { submitForm } from '../utils/api';

// ── Format INR ──────────────────────────────────────────────
const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

// ── Star row ─────────────────────────────────────────────────
const StarRow = ({ rating, count }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    <Rating value={Number(rating)} readOnly precision={0.1} size="small"
      sx={{ '& .MuiRating-iconFilled': { color: '#F59E0B' }, '& .MuiRating-iconEmpty': { color: '#CBD5E1' } }} />
    <Typography sx={{ fontSize: '12px', color: '#64748B' }}>({count} reviews)</Typography>
  </Box>
);

// ── Product Card ──────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart }) => {
  const save = product.save_percent || Math.round(
    ((product.original_price_inr - product.price_inr) / product.original_price_inr) * 100
  );
  return (
    <Card sx={{
      height: '100%',
      borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      overflow: 'hidden', position: 'relative', transition: 'all 0.3s ease',
      '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', borderColor: '#BFDBFE' },
      '&:hover .product-img': { transform: 'scale(1.06)' },
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Badge */}
      {product.badge && (
        <Chip label={product.badge} size="small" sx={{
          position: 'absolute', top: 12, left: 12, zIndex: 2,
          background: product.badge_color || '#F59E0B', color: 'white',
          fontWeight: 700, fontSize: '11px', height: '24px',
        }} />
      )}
      {/* Class level chip */}
      {product.class_level && (
        <Chip label={product.class_level} size="small" sx={{
          position: 'absolute', top: 12, right: 12, zIndex: 2,
          background: 'rgba(255,255,255,0.95)', color: '#1A3A8F',
          fontWeight: 600, fontSize: '11px', height: '24px',
        }} />
      )}
      <Box sx={{ overflow: 'hidden', height: 200 }}>
        <CardMedia component="img" height="200" className="product-img"
          image={product.image_url || `https://picsum.photos/seed/${product.id}/800/500`}
          alt={product.name}
          onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${product.id}/800/500`; }}
          sx={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
        />
      </Box>
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#0F172A', mb: 0.5 }}>
          {product.name}
        </Typography>
        <Typography sx={{ color: '#64748B', fontSize: '13px', mb: 1 }}>
          {product.subtitle}
        </Typography>
        <StarRow rating={product.rating} count={product.review_count} />

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: 1.5 }}>
            {(Array.isArray(product.tags) ? product.tags : []).slice(0, 4).map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{
                background: '#F1F5F9', color: '#475569', fontSize: '11px', height: '22px',
              }} />
            ))}
          </Box>
        )}

        {/* Price row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto', mb: 2 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '20px', color: '#0F172A' }}>
            {fmt(product.price_inr)}
          </Typography>
          {product.original_price_inr > product.price_inr && (
            <Typography sx={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '14px' }}>
              {fmt(product.original_price_inr)}
            </Typography>
          )}
          {save > 0 && (
            <Chip label={`SAVE ${save}%`} size="small" sx={{
              background: '#DCFCE7', color: '#15803D', fontWeight: 700, fontSize: '11px', height: '22px',
            }} />
          )}
        </Box>

        <Button fullWidth variant="contained" onClick={() => onAddToCart(product)}
          sx={{
            background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
            borderRadius: '8px', fontWeight: 700, py: 1.2,
            textTransform: 'none', fontSize: '14px',
            '&:hover': { background: 'linear-gradient(135deg,#153080,#1A3A8F)' },
          }}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

// ── Cart Item Row ────────────────────────────────────────────
const CartItem = ({ item, onRemove, onQtyChange }) => (
  <Box sx={{ display: 'flex', gap: 2, py: 2, borderBottom: '1px solid #F1F5F9' }}>
    <Box component="img"
      src={item.product.image_url || `https://picsum.photos/seed/${item.product.id}/100/80`}
      alt={item.product.name}
      sx={{ width: 72, height: 60, borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
    />
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#0F172A', lineHeight: 1.3 }}>
        {item.product.name}
      </Typography>
      <Typography sx={{ fontSize: '12px', color: '#64748B', mb: 1 }}>{item.product.subtitle}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
          <IconButton size="small" onClick={() => onQtyChange(item.product.id, item.quantity - 1)}
            disabled={item.quantity <= 1} sx={{ borderRadius: 0, px: 1 }}>
            <RemoveIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Typography sx={{ px: 1.5, fontWeight: 600, fontSize: '14px' }}>{item.quantity}</Typography>
          <IconButton size="small" onClick={() => onQtyChange(item.product.id, item.quantity + 1)}
            sx={{ borderRadius: 0, px: 1 }}>
            <AddIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: '15px', color: '#1A3A8F' }}>
          {fmt(item.product.price_inr * item.quantity)}
        </Typography>
        <IconButton size="small" onClick={() => onRemove(item.product.id)}
          sx={{ color: '#EF4444' }}>
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  </Box>
);

// ── Checkout Form ─────────────────────────────────────────────
const CheckoutForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); onSubmit(form); };

  const field = (name, label, type = 'text', required = true) => (
    <TextField key={name} name={name} label={label} type={type} required={required}
      value={form[name]} onChange={handle} fullWidth size="small"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
  );

  return (
    <Box component="form" onSubmit={submit}>
      <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#0F172A', mb: 2 }}>
        Delivery Details
      </Typography>
      <Stack spacing={1.5}>
        {field('name', 'Full Name')}
        {field('email', 'Email Address', 'email')}
        {field('phone', 'Phone Number', 'tel')}
        {field('address', 'Delivery Address')}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {field('city', 'City')}
          {field('pincode', 'PIN Code')}
        </Box>
        <Button type="submit" fullWidth variant="contained" disabled={loading}
          sx={{
            background: 'linear-gradient(135deg,#15803D,#22C55E)', py: 1.5,
            borderRadius: '10px', fontWeight: 700, fontSize: '15px',
            textTransform: 'none', mt: 1,
            '&:hover': { background: 'linear-gradient(135deg,#166534,#15803D)' },
          }}>
          {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Place Order'}
        </Button>
      </Stack>
    </Box>
  );
};

// ── Main ShopPage ─────────────────────────────────────────────
const ShopPage = () => {
  const dispatch = useDispatch();
  const products       = useSelector(selectFilteredProducts);
  const categories     = useSelector(selectCategories);
  const activeCategory = useSelector(s => s.shop.activeCategory);
  const cart           = useSelector(s => s.shop.cart);
  const cartOpen       = useSelector(s => s.shop.cartOpen);
  const cartCount      = useSelector(selectCartCount);
  const cartTotal      = useSelector(selectCartTotal);
  const orderStatus    = useSelector(s => s.shop.orderStatus);
  const orderMessage   = useSelector(s => s.shop.orderMessage);
  const productsStatus = useSelector(s => s.shop.productsStatus);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, msg: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Reset order status when navigating away
  useEffect(() => {
    if (orderStatus === 'succeeded') {
      setCheckoutOpen(false);
      dispatch(toggleCart(false));
      dispatch(resetOrderStatus());
    }
  }, [orderStatus, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setSnackbar({ open: true, msg: `${product.name} added to cart!` });
  };

  const handleCheckout = async (formData) => {
    const items = cart.map(i => ({
      product_id: i.product.id,
      name: i.product.name,
      qty: i.quantity,
      price: i.product.price_inr,
    }));
    // Save order to Supabase + send email via Web3Forms
    await submitForm('Shop Order', {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      delivery_address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      items: items.map(i => `${i.name} x${i.qty} @ ${fmt(i.price)}`).join(' | '),
      total_amount: fmt(cartTotal),
    });
    dispatch(placeOrder({
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      items,
      total_amount: cartTotal,
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* ── Hero banner ── */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1A3A8F 60%, #2D5BE3 100%)',
        py: { xs: 5, md: 7 }, textAlign: 'center', color: 'white',
      }}>
        <Container maxWidth="md">
          <Typography sx={{ fontWeight: 700, letterSpacing: '3px', fontSize: '12px', mb: 1, opacity: 0.7 }}>
            SNP INNOVATION
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '32px', md: '48px' }, mb: 2 }}>
            Shop STEM Kits Online
          </Typography>
          <Typography sx={{ opacity: 0.8, fontSize: '16px', maxWidth: 500, mx: 'auto' }}>
            Order individual kits or complete lab packages — delivered, installed, and ready to use
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3, flexWrap: 'wrap' }}>
            {[['🚚', 'Free Delivery'], ['🔧', 'Installation Support'], ['📞', '24/7 Helpline'], ['✅', '1-Year Warranty']].map(([icon, label]) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '14px', opacity: 0.85 }}>
                <span>{icon}</span> <span>{label}</span>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        {/* ── Section heading ── */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: '22px', md: '28px' }, color: '#0F172A' }}>
            Browse Our STEM Kits
          </Typography>
          <Typography sx={{ color: '#64748B', fontSize: '14px', mt: 0.5 }}>
            Filter by category to find the right kit for your classroom or lab
          </Typography>
        </Box>

        {/* ── Category filter ── */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2, justifyContent: 'center' }}>
          {categories.map(cat => (
            <Button key={cat} disableElevation
              variant={activeCategory === cat ? 'contained' : 'outlined'}
              onClick={() => dispatch(setActiveCategory(cat))}
              sx={{
                borderRadius: '100px', textTransform: 'none', fontWeight: 600,
                px: 2.5, py: 0.8, fontSize: '14px', transition: 'all 0.2s ease',
                ...(activeCategory === cat
                  ? { background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', color: '#fff', border: 'none',
                      boxShadow: '0 6px 18px rgba(26,58,143,0.30)' }
                  : { borderColor: '#CBD5E1', color: '#475569', background: '#fff',
                      '&:hover': { borderColor: '#1A3A8F', color: '#1A3A8F', background: '#F8FAFF' } }
                ),
              }}>
              {cat}
            </Button>
          ))}
        </Box>

        {/* ── Result count ── */}
        {productsStatus !== 'loading' && (
          <Typography sx={{ textAlign: 'center', color: '#94A3B8', fontSize: '13px', mb: 3 }}>
            Showing {products.length} {products.length === 1 ? 'kit' : 'kits'}
            {activeCategory !== 'All' ? ` in “${activeCategory}”` : ''}
          </Typography>
        )}

        {/* ── Products grid ── */}
        {productsStatus === 'loading' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#1A3A8F' }} />
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 56, color: '#CBD5E1', mb: 1.5 }} />
            <Typography sx={{ color: '#64748B', fontWeight: 600, mb: 0.5 }}>
              No kits in this category yet
            </Typography>
            <Typography sx={{ color: '#94A3B8', fontSize: '14px', mb: 2 }}>
              Try another category or view all kits.
            </Typography>
            <Button variant="outlined" onClick={() => dispatch(setActiveCategory('All'))}
              sx={{ borderRadius: '100px', textTransform: 'none', fontWeight: 600 }}>
              View all kits
            </Button>
          </Box>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            alignItems: 'stretch',
          }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </Box>
        )}
      </Container>

      {/* ── Floating Cart Button (mobile/desktop) ── */}
      <Box sx={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 1200,
        display: cartOpen ? 'none' : 'block',
      }}>
        <Button variant="contained" onClick={() => dispatch(toggleCart(true))}
          sx={{
            background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
            borderRadius: '100px', py: 1.5, px: 2.5,
            boxShadow: '0 8px 30px rgba(26,58,143,0.4)',
            textTransform: 'none', fontWeight: 700, fontSize: '15px',
            '&:hover': { background: 'linear-gradient(135deg,#153080,#1A3A8F)' },
          }}>
          <Badge badgeContent={cartCount} color="error" sx={{ mr: 1 }}>
            <ShoppingCartIcon />
          </Badge>
          Cart {cartCount > 0 && `(${cartCount})`}
        </Button>
      </Box>

      {/* ── Cart Drawer ── */}
      <Drawer anchor="right" open={cartOpen} onClose={() => dispatch(toggleCart(false))}
        PaperProps={{ sx: { width: { xs: '100vw', sm: 420 }, display: 'flex', flexDirection: 'column' } }}>
        {/* Drawer header */}
        <Box sx={{ p: 2.5, borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
            <ShoppingBagOutlinedIcon />
            <Typography sx={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>
              Your Cart {cartCount > 0 && `(${cartCount})`}
            </Typography>
          </Box>
          <IconButton onClick={() => dispatch(toggleCart(false))} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Cart content */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
          {cart.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <ShoppingCartIcon sx={{ fontSize: 64, color: '#CBD5E1', mb: 2 }} />
              <Typography sx={{ color: '#94A3B8', fontWeight: 600 }}>Your cart is empty</Typography>
              <Button variant="outlined" sx={{ mt: 2, textTransform: 'none', borderRadius: '8px' }}
                onClick={() => dispatch(toggleCart(false))}>
                Continue Shopping
              </Button>
            </Box>
          ) : checkoutOpen ? (
            <CheckoutForm onSubmit={handleCheckout} loading={orderStatus === 'loading'} />
          ) : (
            <>
              {cart.map(item => (
                <CartItem key={item.product.id} item={item}
                  onRemove={(id) => dispatch(removeFromCart(id))}
                  onQtyChange={(id, qty) => dispatch(updateQuantity({ id, quantity: qty }))}
                />
              ))}
              <Box sx={{ mt: 2, p: 2, background: '#F8FAFC', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocalShippingOutlinedIcon sx={{ color: '#15803D', fontSize: 18 }} />
                  <Typography sx={{ fontSize: '13px', color: '#15803D', fontWeight: 600 }}>
                    Free delivery on all orders!
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>

        {/* Cart footer */}
        {cart.length > 0 && !checkoutOpen && (
          <Box sx={{ p: 2.5, borderTop: '1px solid #F1F5F9' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontWeight: 600, color: '#475569' }}>Total</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '20px', color: '#0F172A' }}>
                {fmt(cartTotal)}
              </Typography>
            </Box>
            <Button fullWidth variant="contained" onClick={() => setCheckoutOpen(true)}
              sx={{
                background: 'linear-gradient(135deg,#15803D,#22C55E)', py: 1.5,
                borderRadius: '10px', fontWeight: 700, fontSize: '15px', textTransform: 'none',
                '&:hover': { background: 'linear-gradient(135deg,#166534,#15803D)' },
              }}>
              Proceed to Checkout
            </Button>
            <Button fullWidth variant="text" sx={{ mt: 1, color: '#EF4444', textTransform: 'none' }}
              onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </Box>
        )}
        {checkoutOpen && (
          <Box sx={{ p: 2, borderTop: '1px solid #F1F5F9' }}>
            <Button fullWidth variant="text" sx={{ textTransform: 'none', color: '#475569' }}
              onClick={() => setCheckoutOpen(false)}>
              ← Back to Cart
            </Button>
          </Box>
        )}
      </Drawer>

      {/* ── Success message ── */}
      {orderStatus === 'succeeded' && (
        <Box sx={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Paper sx={{ p: 5, borderRadius: '20px', textAlign: 'center', maxWidth: 420, mx: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: '#22C55E', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Order Placed!
            </Typography>
            <Typography sx={{ color: '#64748B', mb: 3 }}>
              {orderMessage || 'Thank you! We will contact you shortly to confirm your order.'}
            </Typography>
            <Button variant="contained" onClick={() => dispatch(resetOrderStatus())}
              sx={{ background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', textTransform: 'none', borderRadius: '8px', fontWeight: 700 }}>
              Continue Shopping
            </Button>
          </Paper>
        </Box>
      )}

      {/* ── Snackbar ── */}
      <Snackbar open={snackbar.open} autoHideDuration={2500}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: '10px' }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShopPage;
