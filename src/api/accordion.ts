export default class Accordion {
  private accordionElement: HTMLElement | null;
  private accordionChildElements: HTMLCollection | undefined;
  private eventHandlers: {
    element: HTMLElement;
    handler: (event: Event) => void;
    animation: Animation;
  }[];

  constructor(selector: string) {
    this.accordionElement = document.querySelector(selector);
    this.accordionChildElements = this.accordionElement?.children;

    this.eventHandlers = [];
    this.destroy = this.destroy.bind(this);
  }

  public init() {
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
          throw new Error('wrong element structure');

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
  }

  public destroy() {
    this.eventHandlers.forEach((item) => {
      item.element.classList.remove('my-accordion-title');
      item.element.removeEventListener('click', item.handler);
      const contentWrapperElement = item.element.nextElementSibling as HTMLElement;
      contentWrapperElement.style.height = '';
      item.animation.cancel();
    });
  }
}
