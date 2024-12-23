import { getContext, setContext } from 'svelte';
import { RadarService } from '~/lib/radar/radar.js';
import { defaultTheme } from '~/lib/theme.js';
import type { Radar } from '~/types/radar.js';
import type { RadarTheme } from '~/types/theme.js';

type RadarStateProps = {
  radar: Radar;
};
class RadarState {
  readonly props: RadarStateProps;
  #theme = $state<RadarTheme>(defaultTheme);

  #service: RadarService;
  #target: SVGElement;
  constructor(props: RadarStateProps) {
    this.props = props;
    this.#service = new RadarService(props.radar);
  }

  bindTarget(target: SVGElement) {
    this.#target = target;
    this.#service.draw(target);
  }
  changeTheme(theme: RadarTheme) {
    this.#service.changeTheme(theme);
  }

  get theme() {
    return this.#service.config.theme;
  }
}

const SYMBOL_KEY = 'orb-radar';

export function createRadarState(props: RadarStateProps) {
  return setContext(Symbol.for(SYMBOL_KEY), new RadarState(props));
}

export function useRadar(): RadarState {
  return getContext(Symbol.for(SYMBOL_KEY));
}
