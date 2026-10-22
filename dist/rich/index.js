// In-depth courses, each loaded only when a learner opens it.
export const RICH_COURSES = {
  'Pharmacology': () => import('./pharmacology.js'),
  'Pathophysiology': () => import('./pathophysiology.js'),
  'Behavioral Health': () => import('./behavioral-health.js'),
  'Biomedical Equipment Technician': () => import('./biomedical-equipment-technician.js'),
  'Dental Terminology': () => import('./dental-terminology.js'),
};
