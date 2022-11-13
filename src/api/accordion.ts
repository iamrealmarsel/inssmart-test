interface IEventHandlers {
  element: HTMLElement;
  handler: (event: Event) => void;
  animation: Animation;
}

interface IDefautlOptions {
  duration: number;
  breakpointMaxWidth?: number;
  breakpointMinWidth?: number;
}

const defautlOptions: IDefautlOptions = {
  duration: 500,
};

export default class Accordion {
  private accordionElement: HTMLElement | null;
  private accordionChildElements: HTMLCollection | undefined;
  private eventHandlers: IEventHandlers[];
  private isAccordionCreated: boolean;
  private options: IDefautlOptions;

  constructor(selector: string, options?: Partial<IDefautlOptions>) {
    this.accordionElement = document.querySelector(selector);
    this.accordionChildElements = this.accordionElement?.children;

    this.options = { ...defautlOptions, ...options };
    this.eventHandlers = [];
    this.isAccordionCreated = false;
  }

  public init() {
    const { breakpointMaxWidth, breakpointMinWidth } = this.options;

    if (breakpointMaxWidth && breakpointMinWidth) {
      if (window.innerWidth >= breakpointMinWidth && window.innerWidth <= breakpointMaxWidth) {
        this.create();
      }
      window.addEventListener('resize', () => {
        if (window.innerWidth >= breakpointMinWidth && window.innerWidth <= breakpointMaxWidth) {
          this.create();
        } else {
          this.destroy();
        }
      });
    } else if (breakpointMaxWidth) {
      if (window.innerWidth <= breakpointMaxWidth) {
        this.create();
      }
      window.addEventListener('resize', () => {
        if (window.innerWidth <= breakpointMaxWidth) {
          this.create();
        } else {
          this.destroy();
        }
      });
    } else if (breakpointMinWidth) {
      if (window.innerWidth >= breakpointMinWidth) {
        this.create();
      }
      window.addEventListener('resize', () => {
        if (window.innerWidth >= breakpointMinWidth) {
          this.create();
        } else {
          this.destroy();
        }
      });
    }
  }

  private destroy() {
    if (!this.isAccordionCreated) return;

    this.eventHandlers.forEach((item) => {
      item.element.classList.remove('my-accordion-title');
      item.element.removeEventListener('click', item.handler);
      const contentWrapperElement = item.element.nextElementSibling as HTMLElement;
      contentWrapperElement.style.height = '';
      item.animation.cancel();
    });

    this.isAccordionCreated = false;
  }

  private create() {
    if (this.isAccordionCreated) return;

    if (this.accordionChildElements) {
      for (let i = 0; i < this.accordionChildElements.length; i += 2) {
        const titleElement = this.accordionChildElements[i];
        const contentWrapperElement = this.accordionChildElements[i + 1];
        const contentElement = contentWrapperElement.firstElementChild;

        if (
          !(
            titleElement instanceof HTMLElement &&
            contentElement instanceof HTMLElement &&
            contentWrapperElement instanceof HTMLElement
          )
        )
          throw new Error('Wrong element structure');

        titleElement.classList.add('my-accordion-title');

        let isOpen = false;
        let isAnimated = false;

        const animationEffect = new KeyframeEffect(contentWrapperElement, null, {
          duration: this.options.duration,
          fill: 'forwards',
          easing: 'ease-in-out',
        });

        const accordionAnimation = new Animation(animationEffect);

        accordionAnimation.addEventListener('finish', () => {
          isAnimated = false;
          accordionAnimation.cancel();
          contentWrapperElement.style.height = isOpen ? 'auto' : '0';
        });

        const handleTitleAccordionClick = (event: Event) => {
          event.preventDefault();

          if (isAnimated) return;

          isAnimated = true;

          if (isOpen) {
            animationEffect.setKeyframes([
              {
                height: `${contentElement.offsetHeight}px`,
                offset: 0,
              },
              {
                height: 0,
                offset: 1,
              },
            ]);
          } else {
            animationEffect.setKeyframes([
              {
                height: 0,
                offset: 0,
              },
              {
                height: `${contentElement.offsetHeight}px`,
                offset: 1,
              },
            ]);
          }

          isOpen = !isOpen;
          accordionAnimation.play();
        };

        titleElement.addEventListener('click', handleTitleAccordionClick);

        this.eventHandlers.push({
          element: titleElement,
          handler: handleTitleAccordionClick,
          animation: accordionAnimation,
        });
      }
    }

    this.isAccordionCreated = true;
  }

  private configBreakpoints() {
    // const { breakpointMaxWidth, breakpointMinWidth } = this.options;
    // if (breakpointMaxWidth && breakpointMinWidth) {
    //   window.addEventListener('resize', () => {
    //     if (window.innerWidth >= breakpointMinWidth && window.innerWidth <= breakpointMaxWidth) {
    //       this.create();
    //     } else {
    //       this.destroy();
    //     }
    //   });
    // } else if (breakpointMaxWidth) {
    //   window.addEventListener('resize', () => {
    //     if (window.innerWidth <= breakpointMaxWidth) {
    //       this.create();
    //     } else {
    //       this.destroy();
    //     }
    //   });
    // } else if (breakpointMinWidth) {
    //   window.addEventListener('resize', () => {
    //     if (window.innerWidth >= breakpointMinWidth) {
    //       this.create();
    //     } else {
    //       this.destroy();
    //     }
    //   });
    // }
  }
}
