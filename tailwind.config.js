/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      // Fontes personalizadas do projeto
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'], // Fonte padrão
        serif: ['Georgia', 'serif']
      },

      // Paleta de cores personalizada para saúde e bem-estar
      colors: {
        // Paleta principal do projeto
        primary: {
          orange: '#d08d2f', // Laranja apagado
          blue: '#489ec9', // Azul
          green: '#6eb645' // Verde
        },
        // Cores antigas mantidas para compatibilidade
        health: {
          50: '#f0f9f3',
          100: '#dbf0e1',
          200: '#b9e0c7',
          300: '#8bc9a4',
          400: '#58ab7e',
          500: '#399661',
          600: '#2b754c',
          700: '#235e3e',
          800: '#1e4b33',
          900: '#1a3f2b'
        },
        wellness: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        accent: {
          blue: '#3b82f6',
          green: '#10b981',
          purple: '#8b5cf6',
          pink: '#ec4899'
        }
      },

      // Espaçamentos personalizados
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
        144: '36rem'
      },

      // Tamanhos de fonte personalizados
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem'
      },

      // Sombras personalizadas
      boxShadow: {
        soft: '0 2px 20px rgba(0, 0, 0, 0.08)',
        health: '0 4px 20px rgba(59, 130, 246, 0.15)',
        wellness: '0 4px 20px rgba(16, 185, 129, 0.15)'
      },

      // Bordas personalizadas
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        default: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px'
      },

      // Animações personalizadas
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'pulse-slow': 'pulse 3s infinite'
      },

      // Backgrounds personalizados
      backgroundImage: {
        'gradient-health': 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
        'gradient-wellness':
          'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
        'pattern-dots':
          'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)'
      },

      // Breakpoints personalizados (se necessário)
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      }
    }
  },
  plugins: []
};
