// Where each OpenStax figure appears in the in-depth lessons, so figures sit inside the section
// they illustrate. scripts/import-openstax-figures.mjs reads this file to fetch the images.
// course → lesson number (1-based) → [section number (1-based), 'book/page', figure number, caption, alt, 'end'?]
// A figure goes after the section's first block, or at the end of the section with 'end'.
const AP = 'anatomy-and-physiology/', PS = 'psychology/', CP = 'college-physics/', BIO = 'biology-2e/', MICRO = 'microbiology/';

const HEMOSTASIS = [AP + '18-5-hemostasis', '18.14', 'Hemostasis has three steps: vascular spasm, a platelet plug and coagulation. Antiplatelet drugs act on the plug, anticoagulants on the clotting cascade, and thrombolytics dissolve a finished clot.', 'Three steps of hemostasis: vessel spasm, platelet plug and clot formation'];
const ASTHMA = [AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.12', 'In asthma, the bronchiole wall becomes inflamed and thickened, mucus collects and smooth muscle tightens, narrowing the airway.', 'Normal bronchiole compared with an asthmatic bronchiole'];
const GLUCOSE = [AP + '17-9-the-endocrine-pancreas', '17.19', 'Insulin and glucagon keep blood glucose in range: insulin moves glucose into cells, and glucagon releases stored glucose from the liver.', 'Feedback loop of insulin and glucagon regulating blood glucose'];
const SKIN = [AP + '5-1-layers-of-the-skin', '5.2', 'The skin has three layers: epidermis, dermis and hypodermis (subcutaneous tissue).', 'Cross section of skin showing epidermis, dermis and hypodermis'];
const STOMACH = [AP + '23-4-the-stomach', '23.15', 'Regions and layers of the stomach.', 'Anatomy of the stomach'];
const NEPHRON = [AP + '25-3-gross-anatomy-of-the-kidney', '25.10', 'Blood flow through the nephron, where blood is filtered and urine forms.', 'Blood vessels surrounding a nephron'];
const RAAS = [AP + '25-4-microscopic-anatomy-of-the-kidney', '25.14', 'The renin-angiotensin-aldosterone system. Angiotensin-converting enzyme turns angiotensin I into angiotensin II, which constricts vessels and triggers aldosterone release.', 'Conversion of angiotensin I to angiotensin II and its effects'];

export const FIGURE_PLACES = {
  'Pharmacology': {
    2: [
      [2, AP + '3-1-the-cell-membrane', '3.5', 'Small, lipid-soluble molecules cross cell membranes by simple diffusion, from high to low concentration. This is why lipid solubility speeds drug absorption.', 'Molecules diffusing across a cell membrane from high to low concentration'],
      [3, AP + '20-1-structure-and-function-of-blood-vessels', '20.5', 'Capillary types shape drug distribution. Leaky fenestrated and sinusoid capillaries let drugs out easily, while the tight continuous capillaries of the brain form the blood-brain barrier.', 'Continuous, fenestrated and sinusoid capillaries'],
      [4, AP + '23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder', '23.24', 'The liver receives blood from the gut through the portal vein, so oral drugs pass through it before reaching the body. It is the main site of drug metabolism and the first-pass effect.', 'Liver, gallbladder and pancreas beside the stomach and duodenum'],
      [5, ...NEPHRON.slice(0, 2), 'Blood flow through the nephron. Drugs leave the blood by glomerular filtration and tubular secretion, and some are reabsorbed.', NEPHRON[3]],
    ],
    3: [
      [1, AP + '17-2-hormones', '17.5', 'A water-soluble messenger binds a receptor on the cell surface and starts a second-messenger cascade inside the cell. Many drugs act on this same kind of receptor.', 'A hormone binding a membrane receptor and activating cAMP inside the cell'],
      [2, AP + '12-5-communication-between-neurons', '12.28', 'Two main receptor types: ion channels that open when a ligand binds, and G protein-coupled receptors that work through second messengers. Agonists activate these receptors; antagonists block them.', 'Ligand-gated ion channel receptor and G protein-coupled receptor'],
    ],
    5: [
      [1, AP + '15-1-divisions-of-the-autonomic-nervous-system', '15.2', 'The sympathetic division leaves the thoracic and lumbar spinal cord. Most of its target organs respond to norepinephrine.', 'Sympathetic nerve connections from the spinal cord to organs'],
      [3, AP + '15-1-divisions-of-the-autonomic-nervous-system', '15.4', 'The parasympathetic division leaves the brainstem and sacral spinal cord and releases acetylcholine at its targets. Cholinergic drugs mimic it; anticholinergic drugs block it.', 'Parasympathetic nerve connections from the brainstem and sacral cord to organs'],
    ],
    6: [
      [1, AP + '12-5-communication-between-neurons', '12.27', 'At a chemical synapse, neurotransmitter crosses the cleft and binds receptors, then is cleared by reuptake. SSRIs and SNRIs block that reuptake.', 'Chemical synapse with vesicles, synaptic cleft and receptors'],
      [5, AP + '13-2-the-central-nervous-system', '13.9', 'The basal nuclei depend on dopamine from the substantia nigra. Losing those neurons causes Parkinson disease, which levodopa treats.', 'Frontal section of the brain showing the basal nuclei'],
    ],
    7: [
      [1, ...RAAS.slice(0, 2), 'The renin-angiotensin-aldosterone system. ACE inhibitors block the conversion of angiotensin I to angiotensin II, and ARBs block angiotensin II at its receptor.', RAAS[3]],
      [2, AP + '19-1-heart-anatomy', '19.15', 'The coronary arteries supply the heart muscle. When they narrow, oxygen demand outstrips supply and angina results.', 'Coronary arteries and veins on the surface of the heart'],
      [3, ...HEMOSTASIS],
    ],
    8: [
      [4, AP + '21-4-the-adaptive-immune-response-b-lymphocytes-and-antibodies', '21.24', 'A vaccine produces the primary response. On later exposure, memory cells mount a faster and larger secondary response.', 'Graph of primary and secondary antibody responses over time'],
    ],
    9: [
      [1, ...GLUCOSE],
      [3, AP + '17-4-the-thyroid-gland', '17.13', 'The thyroid feedback loop: TRH triggers TSH, TSH triggers T3 and T4, and the thyroid hormones feed back to slow both. Levothyroxine doses are adjusted by TSH for this reason.', 'Negative feedback loop of TRH, TSH and thyroid hormones'],
      [4, ...ASTHMA.slice(0, 2), 'In asthma, the bronchiole wall is inflamed, mucus collects and smooth muscle tightens. Bronchodilators relax the muscle; inhaled corticosteroids treat the inflammation.', ASTHMA[3]],
      [5, ...STOMACH.slice(0, 2), 'The stomach. Proton pump inhibitors and H2 blockers reduce the acid made by its parietal cells.', STOMACH[3]],
    ],
    10: [
      [2, ...SKIN.slice(0, 2), 'The layers of the skin. Intradermal injections go into the dermis, subcutaneous injections into the hypodermis, and intramuscular injections pass through both into muscle.', SKIN[3]],
    ],
  },

  'Pathophysiology': {
    1: [
      [1, AP + '1-5-homeostasis', '1.10', 'Health depends on homeostasis. In a negative feedback loop, a change is detected and reversed; many diseases begin when this regulation fails.', 'Diagram of a negative feedback loop'],
      [3, AP + '3-5-cell-growth-and-division', '3.30', 'The cell cycle. Hyperplasia adds cells by driving them through this cycle, while hypertrophy enlarges existing cells without dividing.', 'Cell cycle with interphase and mitotic phase'],
    ],
    2: [
      [1, AP + '18-4-leukocytes-and-platelets', '18.10', 'Emigration (diapedesis): white blood cells squeeze out of a capillary toward injured tissue during acute inflammation.', 'White blood cell squeezing through a capillary wall'],
      [2, AP + '4-6-tissue-injury-and-aging', '4.21', 'Tissue healing: a clot forms, inflammation clears debris, and granulation tissue fills the wound before it is remodeled into a scar.', 'Stages of wound healing in skin'],
      [3, AP + '21-2-barrier-defenses-and-the-innate-immune-response', '21.12', 'Innate and adaptive immunity work together. Innate defenses act within minutes; adaptive responses take days but are specific and leave memory.', 'Timeline of innate and adaptive immune responses'],
    ],
    3: [
      [3, AP + '4-6-tissue-injury-and-aging', '4.22', 'Cancer develops as mutations accumulate and cells escape normal growth controls, invade nearby tissue and spread.', 'Abnormal cells multiplying and invading tissue'],
      [3, AP + '3-5-cell-growth-and-division', '3.33', 'Checkpoints control the cell cycle. Mutations in proto-oncogenes and tumor suppressor genes disable these controls and let damaged cells divide.', 'Cell cycle checkpoints', 'end'],
    ],
    4: [
      [1, ...SKIN.slice(0, 2), 'The skin has three layers: epidermis, dermis and hypodermis. Burn depth and many skin disorders are described by which layers they reach.', SKIN[3]],
      [3, AP + '5-4-diseases-disorders-and-injuries-of-the-integumentary-system', '5.23', 'The rule of nines estimates the percentage of body surface burned. Children have proportionally larger heads, so their chart differs.', 'Rule of nines body surface area chart'],
      [4, AP + '5-4-diseases-disorders-and-injuries-of-the-integumentary-system', '5.20', 'Melanoma, the most dangerous skin cancer. Look for the ABCDEs: asymmetry, irregular border, uneven color, diameter over 6 mm and evolving appearance.', 'Photograph of a melanoma on the skin'],
      [4, AP + '5-4-diseases-disorders-and-injuries-of-the-integumentary-system', '5.18', 'Basal cell carcinoma, the most common skin cancer.', 'Photograph of a basal cell carcinoma', 'end'],
    ],
    5: [
      [1, AP + '9-4-synovial-joints', '9.8', 'A synovial joint: articular cartilage covers the bone ends, and a capsule lined by synovial membrane holds lubricating synovial fluid.', 'Structure of a synovial joint'],
      [2, AP + '6-5-fractures-bone-repair', '6.20', 'Types of fractures, including transverse, oblique, spiral, comminuted, greenstick and open (compound).', 'Illustrations of fracture types'],
      [2, AP + '6-5-fractures-bone-repair', '6.21', 'Fracture repair: a hematoma forms, then a soft callus, a bony callus and finally remodeling.', 'Stages of bone fracture repair', 'end'],
      [3, AP + '9-4-synovial-joints', '9.11', 'Osteoarthritis wears away articular cartilage until bone rubs on bone.', 'Joint damaged by osteoarthritis'],
      [4, AP + '6-6-exercise-nutrition-hormones-and-bone-tissue', '6.23', 'Bone mass peaks in early adulthood and then declines, faster in women after menopause. This is why osteoporosis is most common in older women.', 'Graph of bone mass against age for men and women'],
    ],
    6: [
      [1, AP + '19-1-heart-anatomy', '19.9', 'Internal structures of the heart: four chambers, the septum and the valves that keep blood flowing one way.', 'Interior of the heart showing chambers and valves'],
      [2, AP + '19-1-heart-anatomy', '19.16', 'Plaque narrows a coronary artery. When a plaque ruptures, the clot that forms can block the artery and cause a myocardial infarction.', 'Coronary arteries narrowed by atherosclerotic plaque'],
      [4, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.25', 'Common ECG abnormalities compared with a normal tracing.', 'Several abnormal ECG tracings'],
      [5, AP + '20-1-structure-and-function-of-blood-vessels', '20.8', 'Varicose veins form when the valves in superficial leg veins fail and blood pools.', 'Photograph of varicose veins in a leg'],
    ],
    7: [
      [1, AP + '18-1-an-overview-of-blood', '18.2', 'Spun in a centrifuge, blood separates into plasma, a thin buffy coat of white cells and platelets, and red cells. The red cell fraction is the hematocrit.', 'Centrifuged blood sample separated into layers'],
      [2, AP + '18-3-erythrocytes', '18.9', 'In sickle cell disease, abnormal hemoglobin makes red cells stiff and crescent-shaped, so they block small vessels and break down early.', 'Normal and sickled red blood cells'],
      [3, ...HEMOSTASIS],
      [3, AP + '21-1-anatomy-of-the-lymphatic-and-immune-systems', '21.2', 'The lymphatic system returns fluid to the blood and filters it through lymph nodes, where lymphomas begin.', 'Lymphatic vessels and lymph nodes throughout the body', 'end'],
      [4, AP + '20-4-homeostatic-regulation-of-the-vascular-system', '20.21', 'After blood loss the body raises heart rate, constricts vessels and holds on to water. Shock develops when these responses can no longer keep up.', 'Homeostatic responses to loss of blood volume'],
    ],
    8: [
      [1, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.2', 'The respiratory tract from the nasal cavity to the alveoli.', 'Major structures of the respiratory system'],
      [1, AP + '22-4-gas-exchange', '22.22', 'External respiration: oxygen diffuses from the alveoli into the blood and carbon dioxide diffuses out.', 'Gas exchange between an alveolus and a capillary', 'end'],
      [2, ...ASTHMA],
      [4, AP + '22-3-the-process-of-breathing', '22.16', 'Pressure in the pleural space stays below lung pressure, which keeps the lungs expanded. When air enters this space (pneumothorax), the lung collapses.', 'Pressure relationships between the lungs and pleural space'],
    ],
    9: [
      [1, AP + '23-1-overview-of-the-digestive-system', '23.2', 'The organs of the digestive tract and the accessory organs.', 'Components of the digestive system'],
      [2, ...STOMACH.slice(0, 2), 'The stomach. Peptic ulcers form in its lining or in the duodenum.', STOMACH[3]],
      [3, AP + '23-5-the-small-and-large-intestines', '23.21', 'The large intestine. Diverticula, polyps and colorectal cancer form in its wall.', 'Regions of the large intestine'],
      [4, AP + '23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder', '23.24', 'The liver, gallbladder and pancreas drain into the duodenum through shared ducts, so a gallstone can block bile flow or trigger pancreatitis.', 'Liver, gallbladder and pancreas with their ducts'],
    ],
    10: [
      [1, AP + '17-3-the-pituitary-gland-and-hypothalamus', '17.7', 'The hypothalamus controls the pituitary gland, which directs many other endocrine glands.', 'Hypothalamus and pituitary gland'],
      [2, ...GLUCOSE],
      [3, AP + '17-4-the-thyroid-gland', '17.14', 'A goiter is an enlarged thyroid gland, classically caused by iodine deficiency.', 'Photograph of a goiter'],
      [4, AP + '17-6-the-adrenal-glands', '17.17', 'The adrenal glands sit on top of the kidneys. The cortex makes cortisol and aldosterone; the medulla makes epinephrine.', 'Adrenal gland showing cortex and medulla'],
    ],
    11: [
      [1, AP + '13-2-the-central-nervous-system', '13.7', 'The lobes of the cerebral cortex.', 'Lobes of the cerebrum'],
      [1, AP + '13-2-the-central-nervous-system', '13.12', 'The brainstem (midbrain, pons and medulla) controls breathing, heart rate and consciousness.', 'Midbrain, pons and medulla of the brainstem', 'end'],
      [4, AP + '13-2-the-central-nervous-system', '13.14', 'Cross section of the spinal cord. The level of an injury determines which parts of the body lose function.', 'Cross section of the spinal cord'],
      [5, AP + '14-1-sensory-perception', '14.15', 'Structure of the eye: cornea, lens, retina and optic nerve.', 'Structure of the eye'],
      [5, AP + '14-1-sensory-perception', '14.5', 'The outer, middle and inner ear.', 'Structures of the ear', 'end'],
    ],
    12: [
      [1, AP + '25-3-gross-anatomy-of-the-kidney', '25.7', 'The kidneys sit behind the abdominal organs and drain through the ureters into the bladder.', 'Kidneys and their position in the body'],
      [1, ...NEPHRON, 'end'],
      [3, ...RAAS.slice(0, 2), 'Damaged kidneys activate the renin-angiotensin-aldosterone system, which raises blood pressure and harms the kidneys further.', RAAS[3]],
    ],
    13: [
      [5, PS + '16-2-types-of-treatment', '16.13', 'Cognitive therapy targets the thoughts between an event and the feelings that follow it.', 'Two flowcharts showing different thoughts and feelings after failing a test'],
    ],
  },

  'Behavioral Health': {
    1: [
      [1, PS + '3-2-cells-of-the-nervous-system', '3.8', 'Parts of a neuron: dendrites receive signals, the cell body integrates them and the axon carries the impulse to the terminal buttons.', 'Neuron with labeled dendrites, cell body, axon and terminals'],
      [2, PS + '3-2-cells-of-the-nervous-system', '3.9', 'Neurotransmitters released into the synaptic cleft bind receptors on the next neuron.', 'Synapse between two neurons with neurotransmitters'],
      [3, PS + '3-4-the-brain-and-spinal-cord', '3.18', 'The four lobes of the cerebral cortex.', 'Frontal, parietal, temporal and occipital lobes'],
      [3, PS + '3-4-the-brain-and-spinal-cord', '3.23', 'The limbic system, which handles emotion and memory.', 'Hypothalamus, amygdala and hippocampus in the limbic system', 'end'],
    ],
    2: [
      [1, AP + '14-1-sensory-perception', '14.15', 'Structure of the eye. Light is focused on the retina, where receptors turn it into neural signals (transduction).', 'Structure of the eye'],
      [3, PS + '4-3-stages-of-sleep', '4.13', 'A hypnogram. A night cycles through NREM stages and REM about every 90 minutes, with more REM toward morning.', 'Hypnogram showing sleep stages across a night'],
    ],
    3: [
      [2, PS + '10-2-hunger-and-eating', '10.9', 'Hunger signals come from the stomach and from hormones acting on the hypothalamus.', 'Brain and stomach exchanging hunger and fullness signals'],
      [3, PS + '10-4-emotion', '10.22', 'The amygdala, hippocampus and hypothalamus are central to emotion.', 'Brain with the hypothalamus, amygdala and hippocampus labeled'],
    ],
    4: [
      [1, PS + '6-2-classical-conditioning', '6.4', 'Classical conditioning: after a neutral stimulus is paired with food, it triggers salivation on its own.', 'Dog before, during and after classical conditioning'],
      [2, PS + '6-3-operant-conditioning', '6.10', 'A Skinner box, in which an animal learns to press a lever for food.', 'Rat in a Skinner box'],
      [2, PS + '6-3-operant-conditioning', '6.13', 'Schedules of reinforcement. Variable-ratio schedules produce the highest and most persistent response rates.', 'Cumulative responses under different reinforcement schedules', 'end'],
    ],
    5: [
      [1, PS + '8-1-how-memory-functions', '8.4', 'The Atkinson-Shiffrin model: sensory memory, short-term memory and long-term memory.', 'Flow diagram from sensory input to long-term memory'],
      [3, PS + '8-3-problems-with-memory', '8.15', 'Ebbinghaus’s forgetting curve: most forgetting happens soon after learning.', 'Graph of memory retention falling over time'],
      [3, PS + '8-3-problems-with-memory', '8.18', 'Proactive interference (old learning disrupts new) and retroactive interference (new learning disrupts old).', 'Diagram of proactive and retroactive interference', 'end'],
      [4, PS + '8-3-problems-with-memory', '8.11', 'Anterograde amnesia blocks new memories after an event; retrograde amnesia erases memories from before it.', 'Diagram comparing anterograde and retrograde amnesia'],
    ],
    7: [
      [5, PS + '3-2-cells-of-the-nervous-system', '3.12', 'Neurotransmitter that does not bind is taken back into the sending neuron (reuptake). SSRIs block reuptake of serotonin so more stays in the synapse.', 'Synapse showing neurotransmitter reuptake'],
    ],
    8: [
      [1, PS + '14-1-what-is-stress', '14.8', 'The fight-or-flight response: heart rate, breathing and muscle tension rise while digestion slows.', 'Body outline showing fight-or-flight responses'],
    ],
    11: [
      [2, PS + '3-4-the-brain-and-spinal-cord', '3.24', 'The ventral tegmental area (VTA) and substantia nigra release dopamine. The VTA pathway is the core of the brain’s reward system.', 'Location of the substantia nigra and ventral tegmental area'],
    ],
    13: [
      [1, PS + '14-1-what-is-stress', '14.3', 'Stress begins with appraisal: whether an event seems threatening and whether we believe we can cope.', 'Concept map from stressor to appraisal and stress response'],
      [1, PS + '14-1-what-is-stress', '14.4', 'The Yerkes-Dodson law: performance is best at a moderate level of arousal.', 'Bell curve of performance against arousal', 'end'],
      [2, PS + '14-1-what-is-stress', '14.11', 'The HPA axis: the hypothalamus signals the pituitary, which signals the adrenal glands to release cortisol.', 'Body outline showing the hypothalamus, pituitary and adrenal glands'],
      [3, PS + '14-1-what-is-stress', '14.10', 'Selye’s general adaptation syndrome: alarm, resistance and exhaustion.', 'Graph of the three stages of the general adaptation syndrome'],
    ],
  },

  'Biomedical Equipment Technician': {
    1: [
      [1, AP + '1-6-anatomical-terminology', '1.13', 'Directional terms applied to the human body.', 'Body with directional terms such as superior, inferior, anterior and posterior'],
      [1, AP + '1-6-anatomical-terminology', '1.14', 'The sagittal, frontal and transverse planes, the views used by CT and MRI.', 'Body divided by sagittal, frontal and transverse planes', 'end'],
      [3, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.18', 'The heart’s conduction system produces the electrical signal an ECG records.', 'Conduction system of the heart'],
      [4, AP + '20-2-blood-flow-blood-pressure-and-resistance', '20.11', 'Common pulse sites.', 'Body outline with pulse sites marked'],
    ],
    2: [
      [1, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.22', 'Standard placement of ECG leads.', 'ECG electrode positions on the chest and limbs'],
      [1, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.24', 'Each part of the ECG tracing matches an event in the cardiac cycle.', 'ECG tracing lined up with the cardiac cycle', 'end'],
      [2, AP + '20-2-blood-flow-blood-pressure-and-resistance', '20.12', 'Measuring blood pressure with a cuff: sounds begin at systolic pressure and stop at diastolic pressure.', 'Blood pressure cuff measurement with pressure graph'],
      [4, AP + '22-3-the-process-of-breathing', '22.18', 'Respiratory volumes and capacities, the quantities spirometers and ventilators measure.', 'Graph of lung volumes and capacities'],
    ],
    3: [
      [2, AP + '22-3-the-process-of-breathing', '22.17', 'Normal breathing uses negative pressure: the diaphragm drops and air is drawn in. A mechanical ventilator instead pushes air in with positive pressure.', 'Inspiration and expiration with diaphragm movement'],
      [3, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.26', 'An automated external defibrillator and a manual defibrillator.', 'Photographs of defibrillators'],
    ],
    5: [
      [1, CP + '20-6-electric-hazards-and-the-human-body', '20.24', 'A shock happens when a person becomes part of a path to ground. Grounding and insulation keep current from taking that path.', 'Person touching a live wire with a tool, completing a path to ground'],
      [1, CP + '20-6-electric-hazards-and-the-human-body', '20.25', 'Thresholds of sensation and of “can’t let go” current by frequency. Currents near 50–60 Hz are the most dangerous.', 'Graph of current thresholds against frequency', 'end'],
      [2, CP + '20-6-electric-hazards-and-the-human-body', '20.23', 'In a three-wire system, the ground wire gives fault current a safe path so the breaker trips.', 'Circuit with a fuse or breaker and a ground wire'],
    ],
    6: [
      [2, CP + '20-2-ohms-law-resistance-and-simple-circuits', '20.8', 'A simple circuit: a voltage source drives current through a resistance.', 'Battery connected to a resistor with current direction shown'],
      [3, CP + '21-1-resistors-in-series-and-parallel', '21.2', 'Resistors connected in series share one current path.', 'Resistors in series'],
      [4, CP + '20-5-alternating-current-versus-direct-current', '20.16', 'Direct current flows one way at a steady value; alternating current reverses direction many times per second.', 'Graphs of DC and AC voltage and current over time'],
    ],
  },

  'Dental Terminology': {
    1: [
      [1, AP + '7-2-the-skull', '7.5', 'Lateral view of the skull.', 'Side view of the skull with bones labeled'],
      [1, AP + '7-2-the-skull', '7.15', 'The mandible: body, ramus, angle, condyle and coronoid process.', 'The mandible with its parts labeled', 'end'],
      [2, AP + '9-6-anatomy-of-selected-synovial-joints', '9.15', 'The temporomandibular joint, where the mandibular condyle meets the temporal bone.', 'Temporomandibular joint'],
      [2, AP + '11-3-axial-muscles-of-the-head-neck-and-back', '11.10', 'Muscles that move the lower jaw: temporalis, masseter and the pterygoids.', 'Muscles of mastication', 'end'],
      [3, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.9', 'The salivary glands: parotid, submandibular and sublingual.', 'Parotid, submandibular and sublingual glands'],
      [3, AP + '13-4-the-peripheral-nervous-system', '13.23', 'The cranial nerves. The trigeminal nerve (V) supplies sensation to the teeth and jaws.', 'Underside of the brain with the cranial nerves', 'end'],
      [4, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.7', 'The oral cavity.', 'Open mouth showing the palate, uvula and tongue'],
    ],
    2: [
      [1, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.11', 'Structure of a tooth.', 'Cross section of a tooth showing enamel, dentin, pulp and root'],
      [2, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.10', 'The permanent and primary (deciduous) teeth with typical eruption ages.', 'Permanent and deciduous teeth with eruption ages'],
    ],
    10: [
      [1, AP + '12-4-the-action-potential', '12.20', 'Voltage-gated sodium channels open to start an action potential. Local anesthetics block these channels.', 'Voltage-gated channel closed and open'],
    ],
    11: [
      [3, AP + '19-1-heart-anatomy', '19.3', 'Hand position for chest compressions during CPR.', 'Hands placed on the lower sternum for CPR'],
    ],
  },
  'Genetics': {
    1: [
      [2, BIO + '10-2-the-cell-cycle', '10.5', 'The cell cycle: interphase (G1, S and G2) takes most of the time, followed by the mitotic phase. DNA is copied during S phase.', 'Circular diagram of the cell cycle with G1, S, G2 and mitotic phases'],
      [3, BIO + '10-2-the-cell-cycle', '10.6', 'The stages of mitosis and cytokinesis, from prophase to the two identical daughter cells.', 'Stages of mitosis from prophase through cytokinesis'],
      [6, BIO + '10-2-the-cell-cycle', '10.10', 'Dividing cells in a whitefish blastula and onion root tip show each phase of mitosis under the microscope.', 'Micrographs of cells in different phases of mitosis'],
    ],
    2: [
      [2, BIO + '11-1-the-process-of-meiosis', '11.4', 'Crossing over in prophase I: nonsister chromatids of homologous chromosomes exchange segments, creating new allele combinations.', 'Homologous chromosomes exchanging segments during crossing over'],
      [3, BIO + '11-1-the-process-of-meiosis', '11.8', 'Mitosis and meiosis compared. Meiosis has two divisions and produces four genetically different haploid cells.', 'Side-by-side comparison of mitosis and meiosis'],
      [5, BIO + '13-2-chromosomal-basis-of-inherited-disorders', '13.6', 'Nondisjunction in meiosis I or meiosis II produces gametes with an extra or missing chromosome.', 'Diagram of nondisjunction producing abnormal gametes'],
    ],
    3: [
      [3, BIO + '12-2-characteristics-and-traits', '12.4', 'A monohybrid cross of pea plants: the F2 generation shows a 3:1 ratio of dominant to recessive phenotypes.', 'Punnett square of a monohybrid pea cross'],
      [3, BIO + '12-2-characteristics-and-traits', '12.5', 'A test cross reveals whether a dominant-phenotype parent is homozygous or heterozygous.', 'Test cross outcomes for homozygous and heterozygous parents', 'end'],
      [4, BIO + '12-3-laws-of-inheritance', '12.16', 'A dihybrid cross of two independently assorting genes gives a 9:3:3:1 phenotypic ratio in the F2.', 'Dihybrid Punnett square of pea seed color and shape'],
      [6, BIO + '12-3-laws-of-inheritance', '12.17', 'The forked-line method multiplies probabilities gene by gene instead of drawing a large Punnett square.', 'Forked-line diagram for a trihybrid cross'],
    ],
    4: [
      [1, BIO + '12-2-characteristics-and-traits', '12.7', 'Incomplete dominance: a heterozygous snapdragon has pink flowers, intermediate between red and white.', 'Pink snapdragon flower'],
      [1, BIO + '12-3-laws-of-inheritance', '12.20', 'Epistasis in mouse coat color: one gene determines whether pigment appears at all, changing the expected ratio.', 'Cross of agouti mice showing epistatic coat colors', 'end'],
      [3, BIO + '12-2-characteristics-and-traits', '12.6', 'A pedigree of a family carrying the recessive disorder alkaptonuria: affected children can have unaffected carrier parents.', 'Pedigree chart of an autosomal recessive disorder'],
    ],
    5: [
      [2, BIO + '12-2-characteristics-and-traits', '12.12', 'A Punnett square for X-linked eye color in fruit flies: sons inherit their only X chromosome from their mother.', 'Punnett square of X-linked eye color in Drosophila'],
      [3, BIO + '13-1-chromosomal-theory-and-genetic-linkage', '13.3', 'Linked genes travel together unless crossing over separates them, so parental types outnumber recombinants.', 'Inheritance of linked and unlinked genes'],
      [4, BIO + '13-2-chromosomal-basis-of-inherited-disorders', '13.5', 'A human karyotype: 22 pairs of autosomes and one pair of sex chromosomes arranged by size and banding.', 'Karyotype of a human female'],
      [5, BIO + '13-2-chromosomal-basis-of-inherited-disorders', '13.13', 'A reciprocal translocation exchanges segments between nonhomologous chromosomes.', 'Diagram of a reciprocal translocation'],
      [6, BIO + '13-1-chromosomal-theory-and-genetic-linkage', '13.4', 'A Drosophila genetic map: gene positions in centimorgans come from recombination frequencies.', 'Genetic map of a Drosophila chromosome'],
    ],
    6: [
      [1, BIO + '14-2-dna-structure-and-sequencing', '14.7', 'The DNA double helix: sugar-phosphate backbones outside and complementary base pairs (A–T, G–C) inside, with antiparallel strands.', 'DNA double helix with base pairs'],
      [2, BIO + '14-3-basics-of-dna-replication', '14.12', 'Conservative, semiconservative and dispersive models of replication. Meselson and Stahl showed replication is semiconservative.', 'Three proposed models of DNA replication'],
      [3, BIO + '15-4-rna-processing-in-eukaryotes', '15.11', 'Eukaryotic pre-mRNA receives a 5′ cap and poly-A tail, and introns are spliced out to form mature mRNA.', 'Processing of pre-mRNA into mature mRNA'],
      [4, BIO + '15-5-ribosomes-and-protein-synthesis', '15.18', 'Translation: initiation at AUG, elongation as tRNAs bring amino acids, and termination at a stop codon.', 'Steps of protein synthesis on a ribosome'],
    ],
    7: [
      [3, BIO + '12-2-characteristics-and-traits', '12.11', 'Fruit flies with different eye colors—easily scored phenotypes that make Drosophila a classic model organism.', 'Six fruit flies with different eye colors'],
      [4, BIO + '17-1-biotechnology', '17.3', 'The basic steps of DNA extraction: lyse cells, remove proteins and debris, and precipitate DNA with alcohol.', 'Steps of DNA extraction in test tubes'],
    ],
    8: [
      [1, MICRO + '11-6-how-asexual-prokaryotes-achieve-genetic-diversity', '11.26', 'Three routes of horizontal gene transfer in bacteria: transformation, transduction and conjugation.', 'Diagrams of transformation, transduction and conjugation'],
      [3, MICRO + '11-6-how-asexual-prokaryotes-achieve-genetic-diversity', '11.28', 'Conjugation: a donor cell’s pilus contacts a recipient, and a copy of the plasmid passes between the cells.', 'Steps of bacterial conjugation through a pilus'],
      [5, BIO + '17-1-biotechnology', '17.5', 'PCR repeats denaturation, annealing and extension to double a DNA region each cycle.', 'Cycles of the polymerase chain reaction'],
      [5, BIO + '17-1-biotechnology', '17.7', 'Molecular cloning inserts a gene into a plasmid vector and uses antibiotic selection to find transformed cells.', 'Steps of cloning a gene into a plasmid', 'end'],
    ],
    9: [
      [5, BIO + '17-1-biotechnology', '17.10', 'Corn ears show kernels of different colors that can be counted to test genetic ratios with chi-square.', 'Ears of corn with kernels of different colors'],
    ],
    10: [
      [1, BIO + '19-1-population-evolution', '19.2', 'The Hardy-Weinberg principle predicts genotype frequencies (p², 2pq, q²) from allele frequencies.', 'Hardy-Weinberg diagram of allele and genotype frequencies'],
      [3, BIO + '17-1-biotechnology', '17.9', 'Gene therapy can use a modified virus to deliver a working gene into a patient’s cells.', 'Gene therapy using a viral vector'],
      [4, BIO + '17-1-biotechnology', '17.8', 'Dolly the sheep was cloned by nuclear transfer from an adult cell into an egg whose nucleus had been removed.', 'Steps used to clone Dolly the sheep'],
    ],
  },
  'Dental Science': {
    2: [
      [1, AP + '7-2-the-skull', '7.5', 'Lateral view of the skull showing the maxilla, mandible, zygomatic bone and temporal bone.', 'Lateral view of the human skull'],
      [1, AP + '7-2-the-skull', '7.15', 'The isolated mandible: body, ramus, angle, coronoid process, condyle and the mental and mandibular foramina.', 'The mandible and its landmarks', 'end'],
      [2, AP + '11-3-axial-muscles-of-the-head-neck-and-back', '11.10', 'Muscles that move the lower jaw, including the masseter, temporalis and pterygoid muscles.', 'Muscles of mastication'],
      [3, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.7', 'The mouth: lips, palate, uvula, tongue and other landmarks of the oral cavity.', 'Landmarks of the oral cavity'],
      [4, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.9', 'The parotid, submandibular and sublingual salivary glands and their ducts.', 'Major salivary glands'],
    ],
    3: [
      [1, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.11', 'Structure of a tooth: enamel, dentin, pulp, cementum, periodontal ligament and alveolar bone.', 'Cross section of a tooth'],
      [2, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.10', 'The permanent and primary (deciduous) teeth with typical eruption ages.', 'Permanent and deciduous dentitions with eruption ages'],
    ],
    5: [
      [4, MICRO + '9-1-how-microbes-grow', '9.2', 'Bacteria multiply by binary fission, which is why instrument processing must remove and kill microorganisms before reuse.', 'Bacterial cell dividing by binary fission', 'end'],
    ],
  },
  'Clinical Nursing': {
    6: [
      [2, AP + '28-4-maternal-changes-during-pregnancy-labor-and-birth', '28.21', 'The stages of childbirth: dilation, expulsion of the baby and delivery of the placenta.', 'Stages of labor and birth'],
    ],
    8: [
      [1, AP + '19-1-heart-anatomy', '19.15', 'The coronary arteries supply the heart muscle; blockage causes angina or myocardial infarction.', 'Coronary circulation of the heart'],
      [3, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.2', 'The major respiratory structures from the nasal cavity to the alveoli.', 'Major organs of the respiratory system'],
    ],
    9: [
      [4, AP + '25-2-gross-anatomy-of-urine-transport', '25.3', 'The female urethra is much shorter than the male urethra, which affects catheter insertion depth and UTI risk.', 'Female and male urethras'],
    ],
    10: [
      [1, AP + '9-4-synovial-joints', '9.11', 'Osteoarthritis wears away joint cartilage, causing pain and stiffness.', 'Osteoarthritis of a joint'],
    ],
  },
  'Home Health Aide': {
    4: [
      [3, AP + '19-1-heart-anatomy', '19.2', 'The heart sits in the chest with its apex pointing down and to the left—where the apical pulse is heard.', 'Position of the heart in the thorax'],
      [4, AP + '20-2-blood-flow-blood-pressure-and-resistance', '20.11', 'Common pulse sites, including the radial, carotid, brachial and pedal pulses.', 'Pulse sites on the body'],
    ],
    6: [
      [1, AP + '25-2-gross-anatomy-of-urine-transport', '25.4', 'The bladder stores urine until it is emptied through the urethra.', 'Anatomy of the urinary bladder'],
      [3, AP + '25-1-physical-characteristics-of-urine', '25.2', 'Urine color ranges from pale yellow to dark amber; dark urine can signal dehydration.', 'Range of urine colors'],
    ],
    7: [
      [3, AP + '9-4-synovial-joints', '9.11', 'Osteoarthritis wears away joint cartilage, causing pain and stiffness.', 'Osteoarthritis of a joint'],
      [6, AP + '9-5-types-of-body-movements', '9.12', 'Body movements such as flexion, extension, abduction and adduction used in range-of-motion exercises.', 'Body movements at joints'],
    ],
    8: [
      [2, AP + '14-1-sensory-perception', '14.15', 'Structures of the eye affected by cataracts, glaucoma and macular degeneration.', 'Structure of the eye'],
      [5, AP + '23-3-the-mouth-pharynx-and-esophagus', '23.7', 'The mouth and gums are checked for sores and irritation during denture care.', 'Landmarks of the oral cavity'],
    ],
  },
  'Medical Assisting': {
    7: [
      [2, AP + '1-6-anatomical-terminology', '1.13', 'Directional terms applied to the human body.', 'Directional terms on the human body'],
      [2, AP + '1-6-anatomical-terminology', '1.14', 'The sagittal, frontal and transverse planes of the body.', 'Planes of the body', 'end'],
      [2, AP + '1-6-anatomical-terminology', '1.16', 'The four abdominal quadrants and nine regions.', 'Abdominal quadrants and regions', 'end'],
    ],
    8: [
      [2, AP + '20-2-blood-flow-blood-pressure-and-resistance', '20.12', 'Measuring blood pressure with a cuff and stethoscope: the first sound is systolic and the last is diastolic.', 'Blood pressure measurement with a sphygmomanometer'],
    ],
    9: [
      [4, AP + '25-1-physical-characteristics-of-urine', '25.2', 'Urine color is part of the physical examination in a urinalysis.', 'Range of urine colors'],
    ],
    10: [
      [3, AP + '14-1-sensory-perception', '14.15', 'Structure of the eye. Visual acuity depends on the cornea, lens and the central retina (macula).', 'Structure of the eye'],
    ],
  },
  'Nursing Assisting': {
    5: [
      [1, ...SKIN.slice(0, 2), 'The skin has three layers: epidermis, dermis and subcutaneous tissue (hypodermis). Pressure over bony areas cuts off blood flow to these layers.', SKIN[3]],
      [3, AP + '9-5-types-of-body-movements', '9.12', 'Flexion, extension, abduction, adduction and other movements used in range-of-motion exercises.', 'Body movements at joints'],
    ],
    6: [
      [2, AP + '20-2-blood-flow-blood-pressure-and-resistance', '20.11', 'Common pulse sites, including the radial artery on the thumb side of the wrist.', 'Pulse sites on the body'],
      [4, AP + '20-2-blood-flow-blood-pressure-and-resistance', '20.12', 'Blood pressure measurement: the first sound is systolic and the last sound is diastolic.', 'Blood pressure measurement with a sphygmomanometer'],
    ],
    7: [
      [1, AP + '25-2-gross-anatomy-of-urine-transport', '25.4', 'The urinary bladder stores urine until it is emptied.', 'Anatomy of the urinary bladder', 'end'],
    ],
  },
  'Biotechnology': {
    4: [
      [6, MICRO + '9-1-how-microbes-grow', '9.11', 'Serial dilution: each transfer dilutes the sample by a set factor so colonies can be counted.', 'Diagram of serial dilution'],
    ],
    5: [
      [1, BIO + '14-2-dna-structure-and-sequencing', '14.7', 'The DNA double helix with complementary base pairs.', 'DNA double helix with base pairs'],
    ],
    6: [
      [1, BIO + '17-1-biotechnology', '17.4', 'An agarose gel under UV light: DNA fragments separate by size, with smaller fragments traveling farther.', 'DNA bands on an agarose gel'],
    ],
    7: [
      [1, BIO + '17-1-biotechnology', '17.7', 'Cloning a gene into a plasmid vector and selecting transformed cells with an antibiotic.', 'Steps of cloning a gene into a plasmid'],
    ],
    8: [
      [2, BIO + '17-1-biotechnology', '17.5', 'Each PCR cycle has denaturation, annealing and extension steps.', 'Cycles of the polymerase chain reaction'],
    ],
    9: [
      [1, BIO + '3-4-proteins', '3.30', 'The four levels of protein structure: primary, secondary, tertiary and quaternary.', 'Four levels of protein structure'],
    ],
    10: [
      [2, MICRO + '20-1-polyclonal-and-monoclonal-antibody-production', '20.4', 'Monoclonal antibodies are made by fusing antibody-producing cells with myeloma cells to form hybridomas.', 'Production of monoclonal antibodies'],
      [3, MICRO + '20-4-eias-and-elisas', '20.24', 'A sandwich ELISA: a capture antibody, the antigen and an enzyme-linked detection antibody produce a color change.', 'Diagram of a sandwich ELISA'],
    ],
  },
  'Clinical Lab Science (Medical Lab Scientist)': {
    3: [
      [3, MICRO + '2-3-instruments-of-microscopy', '2.12', 'Parts of a brightfield compound microscope.', 'Labeled compound light microscope'],
    ],
    4: [
      [1, AP + '18-1-an-overview-of-blood', '18.2', 'Centrifuged blood separates into plasma, the buffy coat and red blood cells (the hematocrit).', 'Composition of centrifuged blood'],
    ],
    5: [
      [1, ...HEMOSTASIS],
    ],
    6: [
      [3, AP + '18-6-blood-typing', '18.17', 'ABO blood groups: the antigens on red cells and the antibodies in plasma for types A, B, AB and O.', 'ABO blood group antigens and antibodies'],
      [5, AP + '18-6-blood-typing', '18.15', 'Hemolytic disease of the newborn (erythroblastosis fetalis) from Rh incompatibility.', 'Rh incompatibility between mother and fetus'],
    ],
    7: [
      [2, AP + '25-1-physical-characteristics-of-urine', '25.2', 'Urine color in the physical examination of urine.', 'Range of urine colors'],
    ],
    9: [
      [2, MICRO + '2-4-staining-microscopic-specimens', '2.33', 'The Gram stain steps: crystal violet, iodine, decolorizer and safranin.', 'Table of Gram stain steps'],
      [2, MICRO + '2-4-staining-microscopic-specimens', '2.34', 'Gram-positive cocci stain purple and gram-negative rods stain pink.', 'Purple cocci and pink rods after a Gram stain', 'end'],
    ],
  },
  'Patient Care Technician': {
    9: [
      [1, AP + '20-5-circulatory-pathways', '20.38', 'Veins of the upper limb, including the cephalic, basilic and median cubital veins used for venipuncture.', 'Diagram of the veins of the arm'],
    ],
    10: [
      [2, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.22', 'Standard placement of ECG leads on the chest and limbs.', 'Chest and limb electrode positions for an ECG'],
      [5, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.25', 'Common ECG abnormalities compared with a normal tracing.', 'Normal and abnormal ECG tracings'],
    ],
  },
  'Personal Care': {
    4: [
      [7, AP + '5-1-layers-of-the-skin', '5.2', 'The layers of the skin: epidermis, dermis and the fatty hypodermis that cushions bony areas.', 'Cross-section of skin layers'],
    ],
    9: [
      [1, AP + '19-1-heart-anatomy', '19.4', 'The heart pumps blood through the lungs and the body, creating the pressure measured as blood pressure.', 'Pulmonary and systemic circulation'],
    ],
  },
  'Pharmacy Science': {
    8: [
      [2, AP + '19-1-heart-anatomy', '19.16', 'Atherosclerosis narrows coronary arteries; statins, antiplatelets and nitrates target this process.', 'Narrowed coronary artery with plaque'],
      [4, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.12', 'Normal airway tissue compared with the inflamed, narrowed airway of asthma.', 'Normal and asthmatic bronchiole'],
    ],
    9: [
      [1, AP + '23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder', '23.26', 'The pancreas has exocrine cells that make enzymes and islet cells that make insulin and glucagon.', 'Exocrine and endocrine pancreas'],
    ],
  },
  'Phlebotomy': {
    3: [
      [2, AP + '18-1-an-overview-of-blood', '18.2', 'Centrifuged blood separates into plasma, the buffy coat and red blood cells.', 'Composition of centrifuged blood'],
      [3, AP + '18-4-leukocytes-and-platelets', '18.13', 'The five types of leukocytes and their typical percentages.', 'Neutrophils, eosinophils, basophils, lymphocytes and monocytes'],
      [4, ...HEMOSTASIS],
      [5, AP + '20-5-circulatory-pathways', '20.38', 'Veins of the upper limb: the cephalic, basilic and median cubital veins in the antecubital area.', 'Diagram of the veins of the arm'],
    ],
  },
  'Physical Therapy': {
    5: [
      [2, AP + '9-4-synovial-joints', '9.11', 'Osteoarthritis: loss of articular cartilage and bone changes in a joint.', 'Healthy joint compared with an osteoarthritic joint'],
    ],
    6: [
      [1, AP + '9-5-types-of-body-movements', '9.12', 'Body movements, part 1: flexion, extension, abduction, adduction and circumduction.', 'Illustrated body movements'],
      [1, AP + '9-5-types-of-body-movements', '9.13', 'Body movements, part 2: rotation, supination, pronation, dorsiflexion, plantar flexion, inversion and eversion.', 'More illustrated body movements', 'end'],
    ],
    7: [
      [1, AP + '5-1-layers-of-the-skin', '5.2', 'Skin layers: pressure over bone starves the dermis and hypodermis of blood.', 'Cross-section of skin layers'],
    ],
  },
  'Physician Assistant - Medical Case Challenge': {
    5: [
      [2, AP + '19-1-heart-anatomy', '19.16', 'Atherosclerotic plaque narrows a coronary artery and can rupture, causing acute coronary syndrome.', 'Narrowed coronary artery with plaque'],
      [3, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.25', 'Common ECG abnormalities, including atrial fibrillation, compared with a normal tracing.', 'Normal and abnormal ECG tracings'],
    ],
    7: [
      [1, AP + '23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder', '23.24', 'The liver, gallbladder and pancreas and their ducts.', 'Accessory digestive organs'],
    ],
    8: [
      [3, AP + '25-3-gross-anatomy-of-the-kidney', '25.10', 'Blood flow through the nephron, from the glomerulus in Bowman’s capsule through the tubules.', 'Nephron and its blood supply'],
    ],
  },
  'Respiratory Therapy': {
    3: [
      [1, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.2', 'Major respiratory structures from the nasal cavity to the alveoli.', 'Major structures of the respiratory system'],
      [2, AP + '22-3-the-process-of-breathing', '22.17', 'Inspiration and expiration: the diaphragm and intercostals change chest volume and pressure.', 'Chest changes during inspiration and expiration'],
      [3, AP + '22-3-the-process-of-breathing', '22.18', 'Respiratory volumes and capacities on a spirogram.', 'Graph of lung volumes and capacities'],
      [4, AP + '22-5-transport-of-gases', '22.27', 'Oxygen–hemoglobin dissociation curves in the fetus and adult.', 'S-shaped oxygen–hemoglobin dissociation curves'],
      [5, AP + '22-3-the-process-of-breathing', '22.20', 'Respiratory centers in the brainstem control the rhythm of breathing.', 'Brainstem respiratory centers'],
    ],
    5: [
      [4, AP + '22-3-the-process-of-breathing', '22.19', 'Pulmonary function testing with a spirometer.', 'Patient performing spirometry'],
    ],
    6: [
      [1, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.12', 'Normal airway tissue compared with the inflamed, narrowed airway of asthma.', 'Normal and asthmatic bronchiole'],
    ],
  },
  'Sports Medicine': {
    2: [
      [1, AP + '8-4-bones-of-the-lower-limb', '8.19', 'Bones of the foot: tarsals, metatarsals and phalanges.', 'Bones of the foot'],
      [2, AP + '11-6-appendicular-muscles-of-the-pelvic-girdle-and-lower-limbs', '11.32', 'Muscles of the lower leg, including the gastrocnemius, soleus, tibialis anterior and fibularis muscles.', 'Muscles of the lower leg'],
      [3, AP + '8-4-bones-of-the-lower-limb', '8.16', 'The femur and patella.', 'Femur and patella'],
      [3, AP + '11-6-appendicular-muscles-of-the-pelvic-girdle-and-lower-limbs', '11.31', 'Thigh muscles that move the femur, tibia and fibula: quadriceps, hamstrings, sartorius and gracilis.', 'Thigh muscles', 'end'],
    ],
    3: [
      [1, AP + '11-5-muscles-of-the-pectoral-girdle-and-upper-limbs', '11.23', 'Muscles that move the humerus, including the deltoid, rotator cuff, latissimus dorsi and teres major.', 'Shoulder muscles'],
      [2, AP + '8-2-bones-of-the-upper-limb', '8.6', 'The ulna and radius of the forearm.', 'Ulna and radius'],
      [3, AP + '8-2-bones-of-the-upper-limb', '8.7', 'Bones of the wrist and hand: carpals, metacarpals and phalanges.', 'Bones of the wrist and hand'],
    ],
    4: [
      [1, AP + '9-5-types-of-body-movements', '9.12', 'Body movements: flexion, extension, abduction, adduction and circumduction.', 'Illustrated body movements'],
      [1, AP + '9-5-types-of-body-movements', '9.13', 'Body movements: rotation, supination, pronation, dorsiflexion, plantar flexion, inversion and eversion.', 'More illustrated body movements', 'end'],
    ],
  },
  'Surgical Technologist': {
    9: [
      [1, AP + '11-4-axial-muscles-of-the-abdominal-wall-and-thorax', '11.16', 'Muscles of the abdominal wall: rectus abdominis, external and internal obliques and transversus abdominis.', 'Abdominal wall muscles'],
      [2, AP + '23-6-accessory-organs-in-digestion-the-liver-pancreas-and-gallbladder', '23.24', 'The liver, gallbladder, pancreas and bile ducts.', 'Accessory digestive organs'],
      [4, AP + '25-3-gross-anatomy-of-the-kidney', '25.10', 'Blood flow in the nephron, beginning at the glomerulus inside Bowman’s capsule.', 'Nephron and its blood supply'],
    ],
    10: [
      [1, AP + '19-1-heart-anatomy', '19.15', 'Coronary circulation: the arteries bypassed in coronary artery bypass grafting.', 'Coronary arteries and veins'],
    ],
  },
  'Veterinary Science': {
    3: [
      [1, BIO + '34-1-digestive-systems', '34.8', 'Ruminants such as goats and cattle have a four-chambered stomach—rumen, reticulum, omasum and abomasum—where microbes break down plant fiber before true digestion.', 'Digestive system of a goat showing the four stomach chambers'],
      [1, BIO + '34-1-digestive-systems', '34.7', 'Birds have a crop that stores food and a muscular gizzard that grinds it, since they have no teeth.', 'Avian digestive system with crop, proventriculus and gizzard', 'end'],
    ],
    5: [
      [4, MICRO + '16-3-modes-of-disease-transmission', '16.13', 'Arthropod vectors such as ticks, fleas and mosquitoes carry pathogens between animals and people, which is why parasite control protects both pets and families.', 'Table of common arthropod vectors and the pathogens they carry'],
    ],
  },
  'CERT Skills': {
    4: [
      [1, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.4', 'The upper airway. In an unresponsive person, the tongue can fall back and block it, which is why CERT opens the airway with a jaw thrust.', 'Upper airway showing the nasal cavity, pharynx and larynx'],
    ],
    5: [
      [1, ...HEMOSTASIS.slice(0, 2), 'The body’s own bleeding control—vessel spasm, a platelet plug and a clot—cannot keep up with severe bleeding, so rescuers apply direct pressure or a tourniquet.', HEMOSTASIS[3], 'end'],
    ],
    8: [
      [1, ...SKIN.slice(0, 2), 'Burn depth depends on how many skin layers are damaged: superficial burns stay in the epidermis, while deeper burns reach the dermis and hypodermis.', SKIN[3]],
      [3, AP + '6-5-fractures-bone-repair', '6.20', 'Types of fractures. In the field, treat any painful, swollen or deformed injury as a fracture and splint it in the position found.', 'Illustrations of closed, open, transverse, oblique, spiral, comminuted, impacted and greenstick fractures'],
    ],
  },
  'CPR/First Aid': {
    3: [
      [1, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.26', 'An automated external defibrillator analyzes the heart rhythm and delivers a shock only when it detects a shockable rhythm such as ventricular fibrillation.', 'Automated external defibrillator with pads'],
    ],
    5: [
      [1, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.4', 'The upper airway. A piece of food lodged in the larynx or trachea can block airflow completely, causing severe choking.', 'Upper airway showing the nasal cavity, pharynx and larynx'],
    ],
    6: [
      [1, ...HEMOSTASIS.slice(0, 2), 'The body slows bleeding with vessel spasm, a platelet plug and a clot. Severe bleeding overwhelms these steps, so firm direct pressure and tourniquets are needed.', HEMOSTASIS[3], 'end'],
    ],
    7: [
      [1, AP + '6-5-fractures-bone-repair', '6.20', 'Types of fractures. An open fracture breaks through the skin; all suspected fractures are splinted in the position found.', 'Illustrations of closed, open, transverse, oblique, spiral, comminuted, impacted and greenstick fractures'],
    ],
    8: [
      [1, ...SKIN.slice(0, 2), 'Burn depth depends on the skin layers involved: superficial burns affect the epidermis, partial-thickness burns reach the dermis and full-thickness burns destroy all layers.', SKIN[3], 'end'],
    ],
    10: [
      [2, ...GLUCOSE.slice(0, 2), 'Insulin lowers blood glucose and glucagon raises it. Too much insulin or too little food can cause low blood sugar, which is treated with fast-acting sugar if the person can swallow.', GLUCOSE[3]],
    ],
  },
  'Emergency Medical Technician': {
    4: [
      [1, AP + '22-1-organs-and-structures-of-the-respiratory-system', '22.2', 'The major respiratory structures. Airway adjuncts, suction and ventilation keep the path from the mouth and nose to the alveoli open.', 'Major respiratory structures from the nasal cavity to the lungs'],
    ],
    5: [
      [1, AP + '19-1-heart-anatomy', '19.15', 'The coronary arteries supply the heart muscle. A blocked coronary artery causes acute myocardial infarction.', 'Coronary arteries and veins on the surface of the heart'],
      [3, AP + '19-2-cardiac-muscle-and-electrical-activity', '19.18', 'The heart’s conduction system. When its electrical activity becomes chaotic, as in ventricular fibrillation, an AED shock can reset the rhythm.', 'Conduction system of the heart from the SA node to the Purkinje fibers', 'end'],
    ],
    6: [
      [1, ...HEMOSTASIS.slice(0, 2), 'Hemostasis—vessel spasm, a platelet plug and coagulation—controls minor bleeding. Major bleeding needs direct pressure, a pressure dressing or a tourniquet.', HEMOSTASIS[3], 'end'],
      [5, ...SKIN.slice(0, 2), 'Skin layers determine burn depth: superficial (epidermis), partial-thickness (into the dermis) and full-thickness (through all layers).', SKIN[3]],
    ],
    7: [
      [1, AP + '6-5-fractures-bone-repair', '6.20', 'Types of fractures, including open, comminuted and greenstick. A Colles’ fracture is a break of the distal radius.', 'Illustrations of closed, open, transverse, oblique, spiral, comminuted, impacted and greenstick fractures'],
    ],
    8: [
      [1, ...ASTHMA.slice(0, 2), 'In asthma, inflamed bronchioles narrow, causing wheezing and prolonged exhalation; bronchodilator inhalers relax the smooth muscle.', ASTHMA[3]],
      [2, ...GLUCOSE.slice(0, 2), 'Insulin and glucagon regulate blood glucose. Hypoglycemia develops quickly and is treated with oral glucose if the patient can swallow.', GLUCOSE[3], 'end'],
    ],
  },
  'Epidemiology': {
    1: [
      [3, MICRO + '16-2-tracking-infectious-diseases', '16.5', 'John Snow’s 1854 map of cholera deaths clustered around the Broad Street pump—an early example of descriptive epidemiology by place.', 'Photo of John Snow and his map of cholera deaths in London'],
    ],
    5: [
      [3, MICRO + '16-2-tracking-infectious-diseases', '16.6', 'Epidemic curves: a point-source outbreak rises and falls sharply, while a propagated outbreak shows successive peaks as the disease spreads from person to person.', 'Graphs of disease incidence for point-source and propagated outbreaks'],
    ],
    6: [
      [1, MICRO + '16-3-modes-of-disease-transmission', '16.10', 'Fomites—objects such as doorknobs, towels and needles—can carry pathogens from one person to another by indirect contact.', 'Photos of a hand on a doorknob, a towel on a hook and a syringe'],
    ],
  },
  'Life Support Skills': {
    7: [
      [1, AP + '6-5-fractures-bone-repair', '6.20', 'Bones can break in different ways. In an open fracture, the broken bone comes through the skin.', 'Drawings of different kinds of broken bones'],
    ],
  },
};

/** Key used in figures.js for a book page and figure number. */
export const figureKey = (ref, number) => ref.split('/')[0] + ':' + number;

/** Insert the figure blocks into a course's lessons (called by course()). */
export function placeFigures(name, lessons) {
  const places = FIGURE_PLACES[name] || {};
  for (const [n, list] of Object.entries(places)) {
    const lesson = lessons[Number(n) - 1];
    if (!lesson) continue;
    for (const [s, ref, number, caption, alt, where] of list) {
      const section = lesson.sections[s - 1];
      if (!section) continue;
      const block = {t: 'fig', file: figureKey(ref, number), caption, alt};
      if (where === 'end') section.blocks.push(block);
      else section.blocks.splice(Math.min(1, section.blocks.length), 0, block);
    }
  }
}
