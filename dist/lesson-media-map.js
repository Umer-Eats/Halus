import { LESSON_MEDIA } from './lesson-media.js';

// A figure must match the lesson's teaching focus as well as its event. Never
// cycle through an event's gallery: a clinical image is not decorative filler.
// Each rule pairs a taught concept with figure metadata reviewed for that concept.
const RULES = {
  'Behavioral Health': [
    [/neuron|perception|synap|neural|nervous system/i, /prototypical neuron|synapse|resting potential/i],
    [/memory|encoding|retrieval|learning/i, /encoding involves|atkinson|encode information/i]
  ],
  'Biomedical Equipment Technician': [
    [/patient monitor|cardiac|electrocardio|\bECG\b/i, /conduction system|cardiac conduction/i],
    [/respirat|ventilat|breathing/i, /boyle|intrapulmonary|inspiration and expiration/i]
  ],
  'Dental Terminology': [
    [/oral anatomy|oral structures|mouth|dentition|tooth anatomy|dental anatomy/i, /mouth|tongue|salivary glands/i],
    [/saliva|salivary/i, /salivary glands/i],
    [/tongue|lingual/i, /tongue/i]
  ],
  'Health Informatics': [
    [/sampling|sample selection|selection bias/i, /data sampling/i],
    [/histogram|distribution|visualiz|frequency|time series|data display/i, /histograms frequency/i]
  ],
  'Healthcare Administration': [
    [/bar graph|line graph|visualiz|data display|performance graph/i, /stem and leaf/i]
  ],
  'Human Growth & Development': [
    [/prenatal|embryo|fertilization|implantation|conception/i, /pre-embryonic|implantation/i],
    [/fetal|prenatal/i, /fetal circulatory|sexual differentiation/i]
  ],
  'Medical Law & Ethics': [
    [/research ethics|human subjects|clinical research|research consent|informed consent|institutional review|\bIRB\b/i, /institution.s IRB|tuskegee/i],
    [/animal research|animal ethics/i, /animal research/i]
  ],
  'Medical Math': [
    [/histogram|frequency|distribution|statistics|statistical|data interpretation/i, /histograms frequency/i]
  ],
  'Medical Reading': [
    [/sampling|selection bias|sample selection|representative sample/i, /data sampling/i]
  ],
  'Medical Spelling': [
    [/anatomical|directional|body region|anatomy|planes/i, /regions of the human body|directional terms|planes of the body/i],
    [/organ systems|body systems|system vocabulary/i, /organ systems/i]
  ],
  'Medical Terminology': [
    [/directional|planes|anatomical position|body region/i, /regions of the human body|directional terms|planes of the body/i],
    [/organ systems|body systems|system vocabulary/i, /organ systems/i],
    [/structural organization|levels of organization/i, /structural organization/i]
  ],
  'Nutrition': [
    [/metaboli|energy|\bATP\b|macronutrient/i, /structure of ATP|sources of ATP/i],
    [/digesti|absorption|peristalsis/i, /peristalsis|digestive processes/i]
  ],
  'Pathophysiology': [
    [/innate|adaptive|immun|inflamm|infection/i, /innate|complement cascade|barrier defenses/i],
    [/homeostasis|feedback|compensation/i, /negative feedback/i],
    [/positive feedback|childbirth/i, /positive feedback/i]
  ],
  'Pharmacology': [
    [/absorption|membrane|pharmacokinetics|lipid.solub/i, /phospholipid|cell membrane/i],
    [/hormone|endocrine|receptor|pharmacodynamics/i, /binding of.*hormones/i]
  ],
  'World Health & Disparities': [
    [/sampling|sample selection|representative sample|selection bias/i, /data sampling/i],
    [/lymphatic|lymph flow/i, /lymphatic/i]
  ],
  'Biotechnology': [
    [/nucleus|nuclear|cell structure/i, /the nucleus/i],
    [/gene expression|transcription|translation|genetic code|protein synthesis/i, /genetic code|transcription|splicing/i]
  ],
  'Clinical Lab Science (Medical Lab Scientist)': [
    [/hematolog|blood cell|blood composition|formed elements|blood components/i, /composition of blood|major blood components|formed elements/i],
    [/erythrocyt|red blood|anemia|hemoglobin/i, /shape of red blood|hemoglobin/i]
  ],
  'Clinical Nursing': [
    [/vital signs|blood pressure|pulse|cardiovascular assessment/i, /systemic blood pressure|pulse sites|blood pressure measurement/i],
    [/respirat|breathing|ventilat|oxygenation/i, /intrapulmonary|inspiration and expiration/i]
  ],
  'Clinical Specialty': [
    [/metabolism|catabolic|anabolic/i, /metabolism/i],
    [/homeostasis|negative feedback/i, /negative feedback/i],
    [/positive feedback|childbirth/i, /positive feedback/i]
  ],
  'Dental Science': [
    [/oral anatomy|oral structures|mouth|dentition|tooth anatomy|dental anatomy/i, /mouth|tongue|salivary glands/i],
    [/saliva|salivary/i, /salivary glands/i],
    [/tongue|lingual/i, /tongue/i]
  ]
};

/** Return up to three directly relevant, fully attributed illustrations.
 * Empty means no verified external image fits; the lesson's concept model still
 * teaches the subject. The caller must render credit, source and license links.
 */
export function getLessonMedia(name, lesson = {}) {
  const pool = LESSON_MEDIA[name] || [];
  const focus = [lesson.title, ...(lesson.objectives || []), ...(lesson.diagram?.nodes || []).map(n => n.label), ...(lesson.sections || []).map(s => s.title)].filter(Boolean).join(' ');
  const matches = [];
  for (const [topic, image] of RULES[name] || []) {
    if (!topic.test(focus)) continue;
    for (const entry of pool) {
      if (image.test([entry.title, entry.caption].join(' ')) && !matches.some(m => m.url === entry.url)) matches.push(entry);
    }
  }
  return matches.slice(0, 3);
}
