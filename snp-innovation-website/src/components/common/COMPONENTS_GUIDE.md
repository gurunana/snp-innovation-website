# Reusable Components Guide

All reusable components are located in `src/components/common/` directory. Import them using the barrel export:

```jsx
import { 
  SectionHeader, 
  PrimaryButton, 
  SecondaryButton,
  InfoCard,
  StatCounter,
  TestimonialCard,
  EnquiryForm,
  PageBanner,
  LoadingSpinner,
  ScrollToTop 
} from '../components/common';
```

---

## 1. SectionHeader

Reusable section title component with decorative underline.

### Props
- `title` (string): Main heading text
- `subtitle` (string): Optional subtitle text
- `light` (boolean): If true, uses light text colors for dark backgrounds

### Usage
```jsx
<SectionHeader 
  title="Our Services" 
  subtitle="Comprehensive solutions for your business"
  light={false}
/>
```

### Color Control
Modify in `src/index.css`:
- `--color-text-primary`: Title color (light=false)
- `--color-text-secondary`: Subtitle color (light=false)
- `--color-secondary`: Underline color

---

## 2. PrimaryButton

Global reusable button with primary brand color. Change in CSS for global updates.

### Props
- `children` (string/React element): Button text
- `to` (string): Route path to navigate to
- `onClick` (function): Click callback
- `variant` (string): 'contained' (default) | 'outlined' | 'text'
- `size` (string): 'small' | 'medium' | 'large' (default)
- `...props`: Any MUI Button props

### Usage
```jsx
// Navigate on click
<PrimaryButton to="/services">Learn More</PrimaryButton>

// Custom click handler
<PrimaryButton onClick={() => console.log('clicked')}>
  Submit
</PrimaryButton>

// Different variants
<PrimaryButton variant="outlined">Outlined</PrimaryButton>
<PrimaryButton variant="text">Text Only</PrimaryButton>
```

### Color Control
Modify in `src/index.css`:
- `--color-primary`: Button background
- `--color-primary-dark`: Hover state background
- `--color-text-light`: Text color

---

## 3. SecondaryButton

Same as PrimaryButton but uses secondary brand color.

### Usage
```jsx
<SecondaryButton to="/contact">Get Started</SecondaryButton>
<SecondaryButton variant="outlined">Learn More</SecondaryButton>
```

### Color Control
Modify in `src/index.css`:
- `--color-secondary`: Button background
- `--color-secondary-dark`: Hover state background

---

## 4. InfoCard

Card component for displaying vertical information - features, services, benefits.

### Props
- `title` (string): Card heading
- `description` (string): Card description text
- `icon` (React component): MUI Icon component
- `link` (string): Route to navigate on click
- `onClick` (function): Click callback

### Usage
```jsx
import BuildIcon from '@mui/icons-material/Build';

<InfoCard
  icon={BuildIcon}
  title="Custom Solutions"
  description="Tailored solutions designed specifically for your needs"
  link="/services"
/>
```

### Features
- Hover effect: Lifts up with shadow
- Icon colored with primary color
- Clickable card navigation

### Color Control
- `--color-primary`: Icon color
- `--color-text-secondary`: Description text
- `--shadow-lg`: Hover shadow

---

## 5. StatCounter

Animated number counter that animates when scrolled into view.

### Props
- `count` (number): Target count number
- `label` (string): Label text below number

### Usage
```jsx
<StatCounter count={500} label="Happy Clients" />
<StatCounter count={1000} label="Projects Completed" />
```

### Features
- Animates from 0 to target when element enters viewport
- Uses Intersection Observer for performance
- Auto-adds '+' after number

---

## 6. TestimonialCard

Card component for client testimonials with quote, name, designation, organization.

### Props
- `quote` (string): The testimonial quote text
- `name` (string): Client name
- `designation` (string): Job title/position
- `organization` (string): Company name
- `image` (string): Optional profile image URL

### Usage
```jsx
<TestimonialCard
  quote="This service transformed our business operations completely"
  name="John Smith"
  designation="CEO"
  organization="Tech Corp"
  image="https://..."
/>
```

### Features
- Quote icon in primary color
- Client info always at bottom
- Optional profile image with avatar

---

## 7. EnquiryForm

Reusable form component with field validation and state management.

### Props
- `fields` (array): Array of field config objects:
  ```jsx
  {
    name: 'email',           // form state key
    label: 'Email Address',  // display label
    type: 'email',           // 'text' | 'email' | 'tel' | 'textarea' | 'select'
    required: true,          // is field required
    placeholder: 'name@example.com',
    options: [               // for select type only
      { label: 'Option 1', value: 'opt1' }
    ],
    rows: 4                  // for textarea type
  }
  ```
- `onSubmit` (function): Called with form data on valid submission
- `buttonText` (string): Submit button text (default: "Submit")
- `loading` (boolean): Show loading state

### Usage
```jsx
const handleSubmit = (formData) => {
  console.log('Form data:', formData);
  // Dispatch Redux action here
};

<EnquiryForm
  fields={[
    { 
      name: 'name', 
      label: 'Full Name', 
      type: 'text', 
      required: true 
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'email', 
      required: true 
    },
    { 
      name: 'service', 
      label: 'Service Type', 
      type: 'select',
      required: true,
      options: [
        { label: 'Consulting', value: 'consulting' },
        { label: 'Development', value: 'development' }
      ]
    },
    { 
      name: 'message', 
      label: 'Message', 
      type: 'textarea',
      rows: 5
    }
  ]}
  onSubmit={handleSubmit}
  buttonText="Send Enquiry"
  loading={false}
/>
```

### Features
- Built-in validation (required, email format)
- Real-time error clearing
- Form state handled internally
- Loading state on submit button

---

## 8. PageBanner

Hero banner component for inner pages with gradient background.

### Props
- `title` (string): Main page heading
- `subtitle` (string): Optional subheading

### Usage
```jsx
<PageBanner 
  title="About Us" 
  subtitle="Learn more about our company and mission"
/>
```

### Features
- Gradient background (primary to primary-dark)
- Full width banner
- White text color

### Color Control
- `--color-primary`: Gradient lighter color
- `--color-primary-dark`: Gradient darker color

---

## 9. LoadingSpinner

Simple centered loading spinner component.

### Props
- `size` (number): Spinner size in pixels (default: 40)
- `text` (string): Optional loading text (default: "Loading...")
- `fullScreen` (boolean): If true, takes full screen height

### Usage
```jsx
// Inline spinner
<LoadingSpinner size={40} text="Loading data..." />

// Full screen spinner
<LoadingSpinner fullScreen size={60} />

// Just spinner, no text
<LoadingSpinner text="" />
```

### Color Control
- `--color-primary`: Spinner color
- `--color-text-secondary`: Text color

---

## 10. ScrollToTop

Utility component that scrolls to top when route changes.

### Usage
Place inside Router, before Routes:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/common';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Features
- Auto-scrolls on every route change
- Smooth scroll animation
- No visible UI element

---

## Global Color Configuration

All components use CSS variables from `src/index.css`. To change colors globally:

1. Open `src/index.css`
2. Modify the `:root` CSS variables
3. Changes automatically apply to all components

### Key Variables
```css
--color-primary: #1565C0;           /* Main brand color */
--color-primary-dark: #0D47A1;      /* Primary hover/active state */
--color-secondary: #FF6F00;         /* Accent color */
--color-text-primary: #212121;      /* Main text */
--color-text-secondary: #616161;    /* Secondary text */
--color-text-light: #FFFFFF;        /* Light text (on dark bg) */
--shadow-lg: 0 10px 25px rgba(...); /* Card hover shadow */
```

---

## Best Practices

1. **Functional Logic**: Keep logic out of JSX. Filter/process data in functions before rendering
2. **Reusability**: Use these components instead of creating new ones
3. **Styling**: Use Tailwind CSS classes for one-off styles, CSS variables for consistent theming
4. **Props**: Keep component props flexible and well-documented
5. **Error Handling**: Wrap components with error boundaries in main pages

---

## File Structure
```
src/
├── components/
│   └── common/
│       ├── index.js                    # Barrel export
│       ├── SectionHeader.jsx
│       ├── PrimaryButton.jsx
│       ├── SecondaryButton.jsx
│       ├── InfoCard.jsx
│       ├── StatCounter.jsx
│       ├── TestimonialCard.jsx
│       ├── EnquiryForm.jsx
│       ├── PageBanner.jsx
│       ├── LoadingSpinner.jsx
│       └── ScrollToTop.jsx
├── index.css                           # Global CSS variables
└── ...
```
