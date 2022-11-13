import Accordion from '../../api/accordion';
import Tabs from '../../api/tabs';

const tabs = new Tabs({ animation: 'scale', duration: 200, breakpointMinWidth: 601 });
tabs.init();

const accordion = new Accordion('#accordion', { breakpointMaxWidth: 600 });
accordion.init();
