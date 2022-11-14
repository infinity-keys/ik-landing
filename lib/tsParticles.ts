export const fireworks: any = {
  autoPlay: false,
  fullScreen: {
    enable: true,
  },
  detectRetina: true,
  background: {
    color: "transparent",
  },
  fpsLimit: 60,
  emitters: {
    direction: "top",
    life: {
      count: 0,
      duration: 0.01,
      delay: 0.15,
    },
    rate: {
      delay: 0.2,
      quantity: 1,
    },
    size: {
      width: 50,
      height: 0,
    },
    position: {
      y: 100,
      x: 50,
    },
  },
  particles: {
    number: {
      value: 0,
    },
    destroy: {
      mode: "split",
      split: {
        count: 2,
        factor: { value: 1 / 3 },
        rate: {
          value: 5,
        },
        particles: {
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
          },
          stroke: {
            width: 0,
          },
          number: {
            value: 0,
          },
          collisions: {
            enable: false,
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: 0.1,
              sync: false,
              startValue: "max",
              destroy: "min",
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 2 },
            animation: {
              enable: false,
            },
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2,
              },
            },
          },
          move: {
            enable: true,
            gravity: {
              enable: false,
            },
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outMode: "destroy",
          },
        },
      },
    },
    life: {
      count: 0.3,
    },
    shape: {
      type: "line",
    },
    size: {
      value: { min: 1, max: 100 },
      animation: {
        enable: true,
        sync: true,
        speed: 100,
        startValue: "random",
        destroy: "min",
      },
    },
    stroke: {
      color: {
        value: "#324f9e",
      },
      width: 1,
    },
    rotate: {
      path: true,
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true,
        maxSpeed: 100,
      },
      speed: { min: 10, max: 15 },
      outModes: "destroy",
      trail: {
        fillColor: "#101D42",
        enable: false,
        length: 10,
      },
    },
  },
};

export const stars = {
  fullScreen: {
    enable: true,
    zIndex: 1,
  },
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#3FCCBB",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
      resize: false,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  background: {
    color: "transparent",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "20%",
  },
};
