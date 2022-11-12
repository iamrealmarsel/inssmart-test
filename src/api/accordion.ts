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

        let isOpen = false;
        let isAnimated = false;

        const openedEffect = new KeyframeEffect(
          contentWrapperElement,
          [
            {
              height: `${contentElement.offsetHeight}px`,
              offset: 1,
            },
          ],
          {
            duration: 500,
            fill: 'forwards',
            easing: 'ease-in-out',
          }
        );

        const closedEffect = new KeyframeEffect(
          contentWrapperElement,
          [
            {
              height: 0,
              offset: 1,
            },
          ],
          {
            duration: 500,
            fill: 'forwards',
            easing: 'ease-in-out',
          }
        );

        const accordionAnimation = new Animation();

        accordionAnimation.addEventListener('finish', () => {
          isAnimated = false;
        });

        titleElement.classList.add('my-accordion-title');

        const handleTitleAccordionClick = (event: Event) => {
          event.preventDefault();

          if (isAnimated) return;

          isAnimated = true;

          // TODO: если меняю размер окна то контент обрезается, полагаю из-за хардкоденной высоты, она не меняется пчмуто

          if (isOpen) {
            accordionAnimation.effect = closedEffect;
            contentWrapperElement.style.height = `${contentElement.offsetHeight}`;
          } else {
            accordionAnimation.effect = openedEffect;
            contentWrapperElement.style.height = '0';
          }

          isOpen = !isOpen;
          accordionAnimation.play();
        };

        this.eventHandlers.push({
          element: titleElement,
          handler: handleTitleAccordionClick,
          animation: accordionAnimation,
        });

        titleElement.addEventListener('click', handleTitleAccordionClick);
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
