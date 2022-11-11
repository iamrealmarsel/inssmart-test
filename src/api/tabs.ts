export default class Tabs {
  private options: object | undefined;
  private tabsContainerElement: HTMLElement | null;
  private contentContainerElement: HTMLElement | null;
  private tabElements: NodeListOf<Element>;
  private contentElements: NodeListOf<Element>;
  private callbacks: (() => void)[];

  constructor(tabsContainerSelector: string, contentContainerSelector: string, options?: object) {
    this.tabsContainerElement = document.querySelector(tabsContainerSelector);
    this.contentContainerElement = document.querySelector(contentContainerSelector);
    this.tabElements = document.querySelectorAll(`${tabsContainerSelector} > *`);
    this.contentElements = document.querySelectorAll(`${contentContainerSelector} > *`);

    this.options = options;
    this.callbacks = [];
    this.destroy = this.destroy.bind(this);
  }

  public init() {
    // this.tabsContainerElement?.classList.add('my-tabs');
    this.contentContainerElement?.classList.add('my-content');

    this.tabElements[0].classList.add('my-tabs-active');
    this.contentElements[0].classList.add('my-content-active');

    this.tabElements.forEach((elem, i) => {
      const handleTabClick = this.handleTabClick.bind(this, i);
      this.callbacks.push(handleTabClick);

      elem.addEventListener('click', handleTabClick);
    });
  }

  private handleTabClick(i: number) {
    this.contentElements.forEach((elem) => elem.classList.remove('my-content-active'));
    this.contentElements[i].classList.add('my-content-active');

    this.tabElements.forEach((elem) => elem.classList.remove('my-tabs-active'));
    this.tabElements[i].classList.add('my-tabs-active');
  }

  public destroy() {
    this.tabsContainerElement?.classList.remove('my-tabs');
    this.contentContainerElement?.classList.remove('my-content');

    this.tabElements.forEach((elem) => elem.classList.remove('my-tabs-active'));
    this.contentElements.forEach((elem) => elem.classList.remove('my-content-active'));

    this.tabElements.forEach((elem, i) => {
      elem.removeEventListener('click', this.callbacks[i]);
    });

    this.callbacks = [];
  }
}
