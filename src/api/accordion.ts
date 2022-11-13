export default class Accordion {
  private accordionElement: HTMLElement | null;
  private accordionChildElements: HTMLCollection | undefined;
  private eventHandlers: {
    element: HTMLElement;
    handler: (event: Event) => void;
    animation: Animation;
  }[];
  private isInited: boolean;

  constructor(selector: string) {
    this.accordionElement = document.querySelector(selector);
    this.accordionChildElements = this.accordionElement?.children;

    this.eventHandlers = [];
    this.isInited = false;
  }

  public init() {
    if (this.isInited) return;

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
          duration: 500,
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

    this.isInited = true;
  }

  public destroy() {
    if (!this.isInited) return;

    this.eventHandlers.forEach((item) => {
      item.element.classList.remove('my-accordion-title');
      item.element.removeEventListener('click', item.handler);
      const contentWrapperElement = item.element.nextElementSibling as HTMLElement;
      contentWrapperElement.style.height = '';
      item.animation.cancel();
    });

    this.isInited = false;
  }
}
