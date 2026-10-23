// In-depth courses, each loaded only when a learner opens it.
export const RICH_COURSES = {
  'Pharmacology': () => import('./pharmacology.js'),
  'Pathophysiology': () => import('./pathophysiology.js'),
  'Behavioral Health': () => import('./behavioral-health.js'),
  'Biomedical Equipment Technician': () => import('./biomedical-equipment-technician.js'),
  'Dental Terminology': () => import('./dental-terminology.js'),
  'Medical Terminology': () => import('./medical-terminology.js'),
  'Human Growth & Development': () => import('./human-growth-development.js'),
  'Health Informatics': () => import('./health-informatics.js'),
  'Nutrition': () => import('./nutrition.js'),
  'Healthcare Administration': () => import('./healthcare-administration.js'),
  'Medical Law & Ethics': () => import('./medical-law-ethics.js'),
  'Medical Math': () => import('./medical-math.js'),
  'Medical Reading': () => import('./medical-reading.js'),
  'Medical Spelling': () => import('./medical-spelling.js'),
  'World Health & Disparities': () => import('./world-health-disparities.js'),
};
