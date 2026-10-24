// In-depth Organizational Leadership course mapped to the HOSA 2026–27 voting delegate test plan.
import {course} from './build.js';
import {OL1, OL2, OL3, OL4, OL5} from './ol-a.js';
import {OL6, OL7, OL8, OL9, OL10} from './ol-b.js';

export default course('Organizational Leadership', {
  intro: 'Ten in-depth lessons for the HOSA Organizational Leadership solo event, which helps chartered associations select voting delegates for ILC, following the 2026–27 test plan (voting delegate role and responsibilities 24%, parliamentary procedure 24%, HOSA, Inc. 16%, organizational structure 12%, history of HOSA 12%, Executive Council positions 8%, membership 4%) and the HOSA Handbook, HOSA website, Robert’s Rules of Order Newly Revised In Brief and First Fifty Years references. Covers delegate duties before and at ILC, evaluating candidates, business session procedure, governance, structure, history, officers, membership and test and essay strategy.',
  units: [
    {title: 'Unit 1 · The event and the delegate role', summary: 'Event purpose, test plan and voting delegate responsibilities (24%).', lessons: [OL1, OL2]},
    {title: 'Unit 2 · Elections and parliamentary procedure', summary: 'Evaluating candidates and parliamentary procedure (24%).', lessons: [OL3, OL4, OL5]},
    {title: 'Unit 3 · HOSA as an organization', summary: 'HOSA, Inc. (16%), structure (12%) and history (12%).', lessons: [OL6, OL7, OL8]},
    {title: 'Unit 4 · Officers, members and test day', summary: 'Executive Council (8%), membership (4%) and test strategy.', lessons: [OL9, OL10]},
  ],
});
