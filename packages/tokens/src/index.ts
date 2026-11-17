export const qzlTokens = {
  colors: {
    brand: {
      50: '#eef6ff',
      100: '#dfeeff',
      200: '#bfdcff',
      300: '#8fc3ff',
      400: '#5aa2ff',
      500: '#2a7cff',
      600: '#1b61f2',
      700: '#214bd7',
      800: '#233ca9',
      900: '#233a86'
    },
    violet: {
      50: '#f4f0ff',
      100: '#e7defe',
      200: '#d6c2ff',
      300: '#b597ff',
      400: '#965eff',
      500: '#7a3ef0',
      600: '#682cd6',
      700: '#5220ad',
      800: '#431c8d',
      900: '#351a72'
    },
    cyan: {
      50: '#ecfeff',
      100: '#cdf9ff',
      200: '#a1effb',
      300: '#65dff6',
      400: '#2ac3ea',
      500: '#0ea4d8',
      600: '#0d81b5',
      700: '#126892',
      800: '#175777',
      900: '#184d67'
    },
    neutral: {
      0: '#ffffff',
      50: '#f4f7fb',
      100: '#ebf0f6',
      200: '#dfe7f0',
      300: '#c5d0dc',
      400: '#9aa7b8',
      500: '#68758a',
      600: '#4d5a6e',
      700: '#364153',
      800: '#1e2b39',
      900: '#0b1320',
      950: '#070d17'
    },
    success: '#12b981',
    warning: '#f4b942',
    danger: '#ef5b5b',
    info: '#3b82f6'
  },
  radius: {
    none: '0px',
    sm: '10px',
    md: '14px',
    lg: '18px',
    xl: '24px',
    full: '9999px'
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
    section: '48px',
    hero: '64px'
  },
  typography: {
    fontFamily: {
      sans: 'Inter, "Segoe UI", sans-serif',
      display: '"Space Grotesk", "Segoe UI", sans-serif'
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '36px',
      '5xl': '48px'
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      tight: 1.15,
      normal: 1.5,
      relaxed: 1.7
    }
  },
  shadow: {
    sm: '0 4px 12px rgba(11, 19, 32, 0.08)',
    md: '0 10px 28px rgba(11, 19, 32, 0.12)',
    lg: '0 22px 44px rgba(11, 19, 32, 0.18)'
  },
  motion: {
    fast: '120ms ease',
    normal: '180ms ease',
    slow: '280ms ease'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    toast: 1100,
    popover: 1200
  }
};

export const themes = {
  light: {
    background: '#f4f7fb',
    backgroundStrong: '#edf2fa',
    surface: '#ffffff',
    surfaceMuted: '#f8fafc',
    surfaceInverse: '#0f172a',
    border: '#dfe7f0',
    text: '#0f172a',
    textMuted: '#4d5a6e',
    textSoft: '#68758a',
    primary: '#2a7cff',
    primaryForeground: '#ffffff',
    primarySubtle: '#eef6ff',
    primaryBorder: '#bfdcff',
    accent: '#7a3ef0',
    success: '#10b981',
    successSubtle: '#ecfdf5',
    successBorder: '#bbf7d0',
    warning: '#f4b942',
    warningSubtle: '#fff7ed',
    warningBorder: '#fde68a',
    danger: '#ef5b5b',
    dangerSubtle: '#fef2f2',
    dangerBorder: '#fecaca'
  },
  dark: {
    background: '#070d17',
    backgroundStrong: '#0d1724',
    surface: '#101b2a',
    surfaceMuted: '#152334',
    surfaceInverse: '#edf2fa',
    border: '#233445',
    text: '#edf2fa',
    textMuted: '#a7b3c4',
    textSoft: '#d5deeb',
    primary: '#66a8ff',
    primaryForeground: '#07121d',
    primarySubtle: '#172c46',
    primaryBorder: '#2b4d73',
    accent: '#b392ff',
    success: '#34d399',
    successSubtle: '#12372f',
    successBorder: '#1e5b4b',
    warning: '#facc15',
    warningSubtle: '#3b3017',
    warningBorder: '#635023',
    danger: '#f87171',
    dangerSubtle: '#3c2227',
    dangerBorder: '#63333a'
  }
};

export type ThemeName = keyof typeof themes;
export type ThemeTokens = (typeof themes)[ThemeName];

export type QzlTokenSet = typeof qzlTokens;

export interface ThemeCssVariables {
  '--qzl-background': string;
  '--qzl-background-strong': string;
  '--qzl-surface': string;
  '--qzl-surface-muted': string;
  '--qzl-surface-inverse': string;
  '--qzl-border': string;
  '--qzl-text': string;
  '--qzl-text-muted': string;
  '--qzl-text-soft': string;
  '--qzl-primary': string;
  '--qzl-primary-foreground': string;
  '--qzl-primary-subtle': string;
  '--qzl-primary-border': string;
  '--qzl-accent': string;
  '--qzl-success': string;
  '--qzl-success-subtle': string;
  '--qzl-success-border': string;
  '--qzl-warning': string;
  '--qzl-warning-subtle': string;
  '--qzl-warning-border': string;
  '--qzl-danger': string;
  '--qzl-danger-subtle': string;
  '--qzl-danger-border': string;
}

export function getThemeCssVariables(mode: ThemeName): ThemeCssVariables {
  const theme = themes[mode];

  return {
    '--qzl-background': theme.background,
    '--qzl-background-strong': theme.backgroundStrong,
    '--qzl-surface': theme.surface,
    '--qzl-surface-muted': theme.surfaceMuted,
    '--qzl-surface-inverse': theme.surfaceInverse,
    '--qzl-border': theme.border,
    '--qzl-text': theme.text,
    '--qzl-text-muted': theme.textMuted,
    '--qzl-text-soft': theme.textSoft,
    '--qzl-primary': theme.primary,
    '--qzl-primary-foreground': theme.primaryForeground,
    '--qzl-primary-subtle': theme.primarySubtle,
    '--qzl-primary-border': theme.primaryBorder,
    '--qzl-accent': theme.accent,
    '--qzl-success': theme.success,
    '--qzl-success-subtle': theme.successSubtle,
    '--qzl-success-border': theme.successBorder,
    '--qzl-warning': theme.warning,
    '--qzl-warning-subtle': theme.warningSubtle,
    '--qzl-warning-border': theme.warningBorder,
    '--qzl-danger': theme.danger,
    '--qzl-danger-subtle': theme.dangerSubtle,
    '--qzl-danger-border': theme.dangerBorder
  };
}
