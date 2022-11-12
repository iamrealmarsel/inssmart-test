export default class Tabs {
  private options: object | undefined;
  private tabElements: NodeListOf<Element>;
  private eventHandlers: {
    tabElement: HTMLElement;
    contentElement: HTMLElement;
    handler: (event: Event) => void;
  }[];
  private activeElements: {
    tabElement: HTMLElement | null;
    contentElement: HTMLElement | null;
  };
  private isInited: boolean;

  constructor(options?: object) {
    this.tabElements = document.querySelectorAll(`[data-tab-to]`);

    this.activeElements = { tabElement: null, contentElement: null };
    this.eventHandlers = [];
    this.options = options;
    this.isInited = false;
  }

  public init() {
    if (this.isInited) return;

    let isInitedElements = false;

    this.tabElements.forEach((tabElement) => {
      if (!(tabElement instanceof HTMLElement)) return;

      const contentElement = document.querySelector(`#${tabElement.dataset.tabTo}`);

      if (!(contentElement instanceof HTMLElement)) return;

      contentElement.classList.add('my-content');

      if (!isInitedElements) {
        tabElement.classList.add('my-tabs-active');
        contentElement.classList.add('my-content-active');

        this.activeElements = {
          tabElement,
          contentElement,
        };

        isInitedElements = true;
      }

      const handleTabClick = () => {
        this.activeElements.tabElement?.classList.remove('my-tabs-active');
        this.activeElements.contentElement?.classList.remove('my-content-active');

        tabElement.classList.add('my-tabs-active');
        contentElement.classList.add('my-content-active');

        this.activeElements = {
          tabElement,
          contentElement,
        };
      };

      this.eventHandlers.push({
        tabElement,
        contentElement,
        handler: handleTabClick,
      });

      tabElement.addEventListener('click', handleTabClick);
    });

    this.isInited = true;
  }

  public destroy() {
    if (!this.isInited) return;

    this.eventHandlers.forEach((item) => {
      item.tabElement.removeEventListener('click', item.handler);
      item.tabElement.classList.remove('my-tabs-active');
      item.contentElement.classList.remove('my-content');
      item.contentElement.classList.remove('my-content-active');
    });

    this.isInited = false;
  }
}
