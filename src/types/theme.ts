export type RadarTheme = {
  colors: {
    ring: string;
    grid: string;
    text: string;
  };
  opacity: {
    rings: number;
    text: number;
    entries: number;
  };
  fontSizes: {
    rings: number;
    entries: number;
  };
  sizes: {
    entry: number;
    strokeWidth: number;
  };
  spacing: {
    labelPadding: number;
  };
};

export type RadarEntryPlacement =
  | 'random'
  | 'distributed'
  | 'clustered'
  | 'spiral';
  
export type RadarConfig = {
  theme: RadarTheme;
  entryPlacement: RadarEntryPlacement;
  showLabels: boolean;
  interactive: boolean;
};
