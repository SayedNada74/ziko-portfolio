/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Luxury Cinema Haute-Monolith Palette
        cinema: {
          black: '#040508',
          deep: '#06080e',
          secondary: '#0b0f19',
          card: '#101626',
          cardHover: '#172036',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(223, 177, 91, 0.45)',
          gold: '#dfb15b',
          goldLight: '#f3cf7a',
          goldDark: '#b88933',
          goldGlow: 'rgba(223, 177, 91, 0.35)',
          cyan: '#00f0ff',
          cyanDim: '#00b4d8',
          cyanGlow: 'rgba(0, 240, 255, 0.35)',
          amber: '#ff9900',
          amberGlow: 'rgba(255, 153, 0, 0.35)',
          crimson: '#ff2a55',
          crimsonGlow: 'rgba(255, 42, 85, 0.45)',
          muted: '#62728f',
          text: '#f1f5f9',
        },
        // Cyber-Cine Telemetry Palette
        cyber: {
          black: '#040508',
          deep: '#06080e',
          panel: '#0a0e18',
          card: '#101626',
          cardHover: '#172036',
          cyan: '#00f0ff',
          cyanDim: '#00b4d8',
          cyanGlow: 'rgba(0, 240, 255, 0.35)',
          amber: '#ff9900',
          amberGlow: 'rgba(255, 153, 0, 0.35)',
          crimson: '#ff2a55',
          crimsonGlow: 'rgba(255, 42, 85, 0.45)',
          border: 'rgba(0, 240, 255, 0.15)',
          borderHover: 'rgba(0, 240, 255, 0.6)',
          borderAmber: 'rgba(255, 153, 0, 0.35)',
          muted: '#62728f',
          text: '#f1f5f9',
        }
      },
      fontFamily: {
        display: ['Syne', 'Alexandria', 'sans-serif'],
        sans: ['Outfit', '"Space Grotesk"', 'sans-serif'],
        serif: ['Syne', 'serif'],
        body: ['Outfit', '"Space Grotesk"', 'sans-serif'],
        tech: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        arabic: ['"IBM Plex Sans Arabic"', 'Alexandria', 'Cairo', 'sans-serif'],
        thmanyah: ['"IBM Plex Sans Arabic"', 'Alexandria', 'Cairo', 'sans-serif'],
        alexandria: ['Alexandria', '"IBM Plex Sans Arabic"', 'Cairo', 'sans-serif'],
      },
      animation: {
        'kenburns': 'kenburns 20s ease-in-out infinite alternate',
        'marquee': 'marquee 40s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'border-beam': 'borderBeam 4s linear infinite',
        'rotate-slow': 'rotateSlow 25s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.08) translate(-1%, -0.5%)' },
          '100%': { transform: 'scale(1.04) translate(1%, 0.5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.04)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        borderBeam: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
