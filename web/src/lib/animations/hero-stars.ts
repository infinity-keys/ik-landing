import type { IOptions, RecursivePartial } from 'tsparticles-engine'

import IK_TOKENS from 'src/lib/theme/ik-tokens.tokens.json'

export const heroStars: RecursivePartial<IOptions> = {
  fps_limit: 60,
  fullScreen: false,
  interactivity: {
    detect_on: 'canvas',
    events: {
      onclick: { enable: true, mode: 'repulse' },
      onhover: {
        enable: true,
        mode: 'bubble',
        parallax: { enable: false, force: 2, smooth: 10 },
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        opacity: 0,
        size: 0,
        speed: 3,
      },
      grab: { distance: 400, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
      repulse: { distance: 400, duration: 0.4 },
    },
  },
  particles: {
    color: { value: IK_TOKENS.brand.color['ik-gold-primary'].$value },
    line_linked: {
      color: '#ffffff',
      distance: 150,
      enable: false,
      opacity: 0.4,
      width: 1,
    },
    move: {
      size: true,
      attract: { enable: false, rotateX: 600, rotateY: 600 },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: true,
      speed: 0.3,
      straight: false,
    },
    number: {
      density: { enable: true, value_area: 800 },
      value: 160,
    },
    opacity: {
      anim: { enable: true, opacity_min: 0, speed: 1, sync: false },
      random: true,
      value: 1,
    },
    shape: {
      polygon: { nb_sides: 5 },
      stroke: { color: '#000000', width: 0 },
      type: 'circle',
    },
    size: {
      anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
      random: true,
      value: 3,
    },
  },
  polygon: {
    draw: {
      enable: false,
      lineColor: '#ffffff',
      lineWidth: 0.5,
    },
    move: { radius: 10 },
    scale: 1,
    type: 'none',
    url: '',
  },
  retina_detect: true,
}
