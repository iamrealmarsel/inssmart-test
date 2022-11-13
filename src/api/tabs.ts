const AnimationType = {
  FADE: 'fade',
  SCALE: 'scale',
};

interface IEventHandlers {
  tabElement: HTMLElement;
  contentElement: HTMLElement;
  handler: (event: Event) => void;
}

interface IActiveElements {
  tabElement: HTMLElement | null;
  contentElement: HTMLElement | null;
}

interface IDefautlOptions {
  duration: number;
  easing: string;
  animation?: string;
  breakpointMaxWidth?: number;
  breakpointMinWidth?: number;
}

const defautlOptions: IDefautlOptions = {
  duration: 500,
  easing: 'ease-in',
};

export default class Tabs {
  private options: IDefautlOptions;
  private tabElements: NodeListOf<Element>;
  private eventHandlers: IEventHandlers[];
  private activeElements: IActiveElements;
  private isTabsCreated: boolean;

  constructor(options?: Partial<IDefautlOptions>) {
    this.tabElements = document.querySelectorAll(`[data-tab-to]`);

    this.activeElements = { tabElement: null, contentElement: null };
    this.eventHandlers = [];
    this.options = { ...defautlOptions, ...options };
    this.isTabsCreated = false;
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
    } else {
      this.create();
    }
  }

  private destroy() {
    if (!this.isTabsCreated) return;

    this.eventHandlers.forEach((item) => {
      item.tabElement.removeEventListener('click', item.handler);
      item.tabElement.classList.remove('my-tabs-active');
      item.contentElement.classList.remove('my-content');
      item.contentElement.classList.remove('my-content-active');
    });

    this.isTabsCreated = false;
  }

  private create() {
    if (this.isTabsCreated) return;

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

      const animationEffect = new KeyframeEffect(
        contentElement,
        [
          {
            opacity: this.options.animation === AnimationType.FADE ? 0 : 1,
            transform: this.options.animation === AnimationType.SCALE ? 'scale(0)' : 'scale(1)',
          },
          {
            opacity: 1,
            transform: 'scale(1)',
          },
        ],
        {
          duration: this.options.duration,
          easing: this.options.easing,
        }
      );

      const accordionAnimation = new Animation(animationEffect);

      const handleTabClick = () => {
        if (this.activeElements.tabElement === tabElement) return;

        this.activeElements.tabElement?.classList.remove('my-tabs-active');
        this.activeElements.contentElement?.classList.remove('my-content-active');

        tabElement.classList.add('my-tabs-active');
        contentElement.classList.add('my-content-active');
        accordionAnimation.play();

        this.activeElements = {
          tabElement,
          contentElement,
        };
      };

      tabElement.addEventListener('click', handleTabClick);

      this.eventHandlers.push({
        tabElement,
        contentElement,
        handler: handleTabClick,
      });
    });

    this.isTabsCreated = true;
  }
}
