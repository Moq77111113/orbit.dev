import type { RadarConfig, RadarTheme } from '~/types/theme.js';

export const defaultTheme = {
  colors: {
    ring: '#1e90ff',
    grid: '#dedede',
    text: '#333333',
    background: '#ffffff',
  },
  opacity: {
    rings: 0.7,
    text: 0.9,
    entries: 1,
  },
  fontSizes: {
    rings: 14,
    entries: 12,
  },
  sizes: {
    entry: 70,
    strokeWidth: 1,
  },
  spacing: {
    labelPadding: 8,
  },
} as const satisfies RadarTheme;

export const defaultConfig = {
  theme: defaultTheme,
  entryPlacement: 'spiral',
  showLabels: true,
  interactive: true,
} satisfies RadarConfig;
