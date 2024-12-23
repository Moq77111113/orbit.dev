import type { Target } from '~/types/radar-options.js';
import type { RadarService } from '../../radar.js';

export abstract class DrawService {
  protected readonly radar: RadarService;

  constructor(radar: RadarService) {
    this.radar = radar;
  }

  abstract draw(target: Target): void;
}
