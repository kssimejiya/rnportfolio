/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Custom breakpoints - adds 'xs' for precise mobile control
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Background Images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Portfolio enhancements
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      colors: {
        gray: {
          850: '#1a1d24',
        },
      },
      // ⚡️ PERFORMANCE-OPTIMIZED ANIMATIONS
      // All animations use GPU-accelerated properties (transform, opacity)
      animation: {
        // Cosmic background
        'ambient-glow': 'ambient-glow 15s ease-in-out infinite',
        'twinkle': 'twinkle 10s ease-in-out infinite',
        'nebula': 'nebula 25s ease-in-out infinite',
        
        // Device showcase
        'device-glow': 'device-glow 6s ease-in-out infinite',
        'float-main': 'float-main 7s ease-in-out infinite',
        'float-medium': 'float-medium 9s ease-in-out infinite',
        'float-slow': 'float-slow 10s ease-in-out infinite',
        'orb-1': 'orb-1 6s ease-in-out infinite',
        'orb-2': 'orb-2 8s ease-in-out infinite',
        
        // UI elements
        'scroll-hint': 'scroll-hint 2.5s ease-in-out infinite',
        'scroll-dot': 'scroll-dot 2.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        
        // Legacy (kept for compatibility)
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'aurora': 'aurora 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        // ⚡️ NEW OPTIMIZED KEYFRAMES
        'ambient-glow': {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(1) translateX(-50%)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.03) translateX(-50%)',
          },
        },
        'twinkle': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.9',
            transform: 'scale(1.3)',
          },
        },
        'nebula': {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.75',
            transform: 'scale(1.1)',
          },
        },
        'device-glow': {
          '0%, 100%': {
            opacity: '0.5',
          },
          '50%': {
            opacity: '0.7',
          },
        },
        'float-main': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
        'float-medium': {
          '0%, 100%': {
            transform: 'translate(-50%, -48%) translateY(0)',
          },
          '50%': {
            transform: 'translate(-50%, -48%) translateY(-6px)',
          },
        },
        'float-slow': {
          '0%, 100%': {
            transform: 'translate(-50%, -45%) translateY(0)',
          },
          '50%': {
            transform: 'translate(-50%, -45%) translateY(-4px)',
          },
        },
        'orb-1': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'translateY(-6px) scale(1.15)',
          },
        },
        'orb-2': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'translateY(-5px) scale(1.2)',
          },
        },
        'scroll-hint': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(5px)',
          },
        },
        'scroll-dot': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'translateY(0)',
          },
          '50%': {
            opacity: '0.9',
            transform: 'translateY(5px)',
          },
        },
        'spin-slow': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        // Legacy keyframes (kept for compatibility)
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right bottom'
          },
        },
        'aurora': {
          '0%, 100%': {
            transform: 'translateX(-10%) skewX(-5deg)',
            opacity: '0.6',
          },
          '50%': {
            transform: 'translateX(10%) skewX(5deg)',
            opacity: '0.9',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'shimmer': {
          '0%': {
            'background-position': '-200% 0',
          },
          '100%': {
            'background-position': '200% 0',
          },
        },
      },
      // Custom backdrop blur values
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};