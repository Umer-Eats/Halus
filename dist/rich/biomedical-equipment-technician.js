// In-depth Biomedical Equipment Technician course mapped to the 2026–27 HOSA test plan.
import {course} from './build.js';
import {T1, T2, T3, T4, T5} from './bet-a.js';
import {T6, T7, T8, T9, T10} from './bet-b.js';

export default course('Biomedical Equipment Technician', {
  intro: 'Ten in-depth lessons following the HOSA Biomedical Equipment Technician test plan, with circuit, ECG, resistor and shock simulators and troubleshooting cases.',
  units: [
    {title: 'Unit 1 · Anatomy and physiology for BMETs', summary: 'Test plan: 10%.', lessons: [T1]},
    {title: 'Unit 2 · Medical devices and public safety', summary: 'Test plan: 22%. Monitoring, therapeutic and life-support devices; FDA regulation, reporting and recalls.', lessons: [T2, T3, T4]},
    {title: 'Unit 3 · Safety in healthcare', summary: 'Test plan: 16%. Electrical, infection, chemical, fire, radiation and MRI safety.', lessons: [T5]},
    {title: 'Unit 4 · Fundamentals of electricity and electronics', summary: 'Test plan: 14%.', lessons: [T6, T7]},
    {title: 'Unit 5 · Reasoning', summary: 'Test plan: 24%, the largest domain. Troubleshooting, maintenance, calibration and equipment management.', lessons: [T8, T9]},
    {title: 'Unit 6 · Healthcare IT', summary: 'Test plan: 14%. Networking, interoperability and cybersecurity.', lessons: [T10]},
  ],
});
