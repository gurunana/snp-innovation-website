/* ========================================
   PRIMARY BUTTON - Modern reusable button
   Blue gradient for contained variant
   Rounded corners, shadow effects, hover animations

   Props:
   - children (string/React element): Button text or content
   - to (string): Route path to navigate to
   - onClick (function): Callback function when button clicked
   - variant (string): 'contained' (default) | 'outlined' | 'text'
   - size (string): 'small' | 'medium' | 'large' (default)
   - endIcon (React component): Icon to display at end
   - ...props: Any other MUI Button props
   ======================================== */

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PrimaryButton = ({
  children,
  to,
  onClick,
  variant = 'contained',
  size = 'large',
  endIcon,
  ...props
}) => {
  const navigate = useNavigate();

  // Handle click - navigate if 'to' prop provided, otherwise call onClick
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  const sizeStyles = {
    small: {
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: 600,
    },
    medium: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 600,
    },
    large: {
      padding: '14px 32px',
      fontSize: '15px',
      fontWeight: 600,
    },
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      endIcon={endIcon}
      sx={{
        background:
          variant === 'contained'
            ? 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)'
            : 'transparent',
        color:
          variant === 'contained'
            ? '#FFFFFF'
            : '#2D5BE3',
        border: variant === 'outlined' ? '2px solid #2D5BE3' : 'none',
        borderRadius: '12px',
        textTransform: 'none',
        letterSpacing: '0.3px',
        fontWeight: 600,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow:
          variant === 'contained'
            ? '0 4px 15px rgba(59, 130, 246, 0.3)'
            : 'none',
        position: 'relative',
        overflow: 'hidden',
        ...sizeStyles[size === 'medium' || size === undefined ? 'medium' : size],
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transition: 'left 0.5s ease',
        },
        '&:hover': {
          transform:
            variant === 'contained'
              ? 'translateY(-2px)'
              : 'translateY(-1px)',
          boxShadow:
            variant === 'contained'
              ? '0 6px 25px rgba(59, 130, 246, 0.4)'
              : 'none',
          backgroundColor:
            variant === 'outlined'
              ? 'rgba(59, 130, 246, 0.08)'
              : undefined,
          borderColor: variant === 'outlined' ? '#2563EB' : undefined,
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&:hover:before': {
          left: '100%',
        },
        '&:disabled': {
          background:
            variant === 'contained'
              ? '#D1D5DB'
              : 'transparent',
          color: '#9CA3AF',
          boxShadow: 'none',
          cursor: 'not-allowed',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
