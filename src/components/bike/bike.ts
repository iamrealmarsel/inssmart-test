import Accordion from '../../api/accordion';
import Tabs from '../../api/tabs';

const tabs = new Tabs({ animation: 'fade', duration: 300, breakpointMinWidth: 601 });
tabs.init();

const accordion = new Accordion('#accordion', { breakpointMaxWidth: 600 });
accordion.init();

const formElements = document.querySelectorAll('[data-feature-add-to]');
formElements.forEach((formElement) => {
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    if (formElement instanceof HTMLFormElement) {
      const formData = new FormData(formElement);
      const feature = formData.get('feature');

      if (typeof feature === 'string' && feature.trim() === '') {
        formElement.classList.add('my-validation-error');
        formElement.animate(
          {
            transform: [
              'translateX(0)',
              'translateX(-10px)',
              'translateX(10px)',
              'translateX(-10px)',
              'translateX(8px)',
              'translateX(-8px)',
              'translateX(0)',
            ],
          },
          {
            duration: 500,
          }
        );

        return;
      }

      const targetFeatureList = document.querySelector(`#${formElement.dataset.featureAddTo}`);
      targetFeatureList?.insertAdjacentHTML(
        'beforeend',
        `<li class="bikes__feature">${feature}</li>`
      );
    }
  });

  formElement.addEventListener('input', () => {
    formElement.classList.remove('my-validation-error');
  });
});
