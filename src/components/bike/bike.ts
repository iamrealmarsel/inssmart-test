import Accordion from '../../api/accordion';
import Tabs from '../../api/tabs';

const tabs = new Tabs();
const accordion = new Accordion('#accordion');

const initAPIs = () => {
  if (document.documentElement.clientWidth <= 600) {
    // TODO:  или такой вариант, проверить в windows
    // if (window.innerWidth <= 600) {
    tabs.destroy();
    accordion.init();
  } else {
    accordion.destroy();
    tabs.init();
  }
};

initAPIs();

window.addEventListener('resize', () => {
  initAPIs();
});
