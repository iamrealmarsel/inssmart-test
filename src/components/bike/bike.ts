import Tabs from '../../api/tabs';

const tabs = new Tabs('#tabs', '#content');

tabs.init();

document.querySelector('.ggg')?.addEventListener('click', tabs.destroy);
