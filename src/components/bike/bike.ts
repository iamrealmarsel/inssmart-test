import Accordion from '../../api/accordion';
import Tabs from '../../api/tabs';

const tabs = new Tabs('#tabs', '#content');

tabs.init();

const accordion = new Accordion('#accordion');

accordion.init();

document.querySelector('.ggg')?.addEventListener('click', accordion.destroy);
