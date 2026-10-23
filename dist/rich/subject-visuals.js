import { FIGURES } from './figures.js';

const AP = 'anatomy-and-physiology:';
const eligible = new Set(['Health Informatics','Healthcare Administration','Human Growth & Development','Medical Terminology','Nutrition']);
const label = (diagram,title,parts) => ({t:'w',kind:'label',diagram,title,parts});
const models = {
  information: () => label('information-pyramid','Explore the steps from measurements to decisions',[
    ['data','Data','Recorded observations need units, time, identity and provenance before they can be interpreted.'],
    ['information','Information','Organizing observations into a meaningful context makes comparison possible.'],
    ['knowledge','Knowledge','Evidence and domain understanding help explain patterns and their limitations.'],
    ['wisdom','Judgment in context','A decision also considers uncertainty, patient goals, consequences and professional responsibility. More data alone does not guarantee a wise choice.']
  ]),
  quality: () => label('quality-cycle','Explore a small improvement cycle',[
    ['plan','Plan','Define the problem, a specific change, a prediction and how the result will be measured.'],
    ['do','Do','Try the change at a manageable scale and record what happened, including unexpected difficulties.'],
    ['study','Study','Compare observations with the prediction. Consider variation, context and unintended effects.'],
    ['act','Act','Adapt, adopt or abandon the change based on the evidence, then plan the next learning cycle.'],
    ['measures','Measures','Use outcome, process and balancing measures so improvement in one area does not conceal harm elsewhere.']
  ]),
  context: () => label('development-context','Explore the environments around a developing person',[
    ['society','Society and policy','Public institutions, cultural expectations and historical events shape access and opportunities.'],
    ['community','Community and settings','Schools, workplaces, neighborhoods and services influence daily experiences and participation.'],
    ['relationships','Relationships','Family, peers and trusted supporters provide interaction, expectations and practical assistance.'],
    ['person','Person','Physical, cognitive, social and emotional processes interact with experience. Context influences development without determining an individual destiny.']
  ]),
  words: () => label('word-map','Explore how word parts build a precise meaning',[
    ['prefix','Prefix','A beginning element may specify location, number, timing or direction of change; not every word has a prefix.'],
    ['root','Root','The central element identifies an anatomical structure or core concept. A word can contain more than one root.'],
    ['suffix','Suffix','The ending often identifies a condition, process or procedure. Compare endings before interpreting the whole term.'],
    ['combining','Combining vowel','A connecting vowel helps join word elements. Its use depends on the next element and established spelling.'],
    ['meaning','Meaning in context','Combine the elements, then verify the established definition. A literal word-part translation does not establish a diagnosis or cause.']
  ]),
  nutrients: () => label('nutrient-pathways','Trace major nutrient products and absorption routes',[
    ['carbs','Carbohydrates','Digestible carbohydrates are broken down to monosaccharides before absorption. Fiber is not handled in the same way as digestible starch.'],
    ['protein','Proteins','Proteins are digested to amino acids and small peptides; absorbed products enter the body’s amino-acid pool.'],
    ['fats','Fats','Digestion and transport depend on the type of lipid. This simplified route emphasizes dietary long-chain fats.'],
    ['sugars','Monosaccharides','Simple sugar products enter intestinal blood vessels and travel toward the liver through portal circulation.'],
    ['amino','Amino acids','Amino acids enter portal blood after absorption and can support synthesis and other metabolic needs.'],
    ['lipids','Lipid transport particles','Long-chain lipids are packaged into chylomicrons in intestinal cells. Not all fatty acids use this route.'],
    ['portal','Portal circulation','Blood from the intestine carries many absorbed nutrients toward the liver before broader systemic distribution.'],
    ['lymph','Lymphatic route','Chylomicrons enter intestinal lymph and later reach blood. This contrasts with the portal route used by many water-soluble nutrients.']
  ])
};

// Each figure rule requires a matching lesson focus and points to a relevant
// section. Figures are not selected from a rotating gallery or broad keyword bag.
const rules = {
  'Medical Terminology': [
    [/anatomical|directional|body organization|body planes/i,/direction|position|plane|organization/i,'1.13','Directional terms describe locations relative to the body in anatomical position.','Anterior, posterior, superior, inferior and other paired anatomical directions'],
    [/anatomical|directional|body organization|body planes/i,/plane|direction|position/i,'1.14','Body planes divide anatomy in different orientations; they are not interchangeable with directional terms.','Sagittal, frontal and transverse body planes'],
    [/skin|integument/i,/skin|layer|anatom/i,'5.2','Identify epidermis, dermis and underlying tissue before decoding terms for skin structures.','Layers and accessory structures of the skin'],
    [/bone|skelet|joint|musculoskel/i,/joint|structure|bone/i,'9.8','A synovial joint contains distinct structures that give joint-related terms their anatomical meaning.','Structure of a synovial joint'],
    [/cardio|heart|circulat/i,/heart|anatom|circulat/i,'19.9','The heart’s chambers and valves are separate anatomical structures; names should preserve those distinctions.','Internal chambers and valves of the heart'],
    [/blood|hemat|immun|lymph/i,/blood|component|cell/i,'18.2','Blood contains plasma and formed elements. A term naming one component does not describe every component.','Plasma and formed elements in blood'],
    [/lymph|immun/i,/lymph|immun/i,'21.2','Locate the major lymphatic structures named in the lesson.','Lymphatic organs and vessels'],
    [/respirat|breathing/i,/airway|anatom|passage/i,'22.2','Follow the conducting passages toward the lungs and distinguish each named structure.','Nose, pharynx, larynx, trachea, bronchi and lungs'],
    [/respirat|breathing/i,/exchange|movement|function/i,'22.22','Gas exchange across the alveolar–capillary interface differs from moving air through the airways.','Oxygen and carbon dioxide exchange between alveoli and capillaries'],
    [/digest|gastro|nutrition/i,/anatom|tract|structure/i,'23.2','The digestive tract and accessory organs have different locations and roles.','Digestive tract and accessory organs'],
    [/urinar|renal|kidney/i,/kidney|structure|anatom/i,'25.7','Kidney structures provide the anatomical context for renal terminology.','External and internal kidney anatomy'],
    [/neuro|nervous|brain/i,/brain|anatom|central/i,'13.7','The cerebral lobes are anatomical regions; a region name alone does not establish a disorder.','Lobes of the cerebral cortex'],
    [/sense|vision|eye/i,/eye|vision|visual/i,'14.15','Distinguish structures that transmit light from the retina and other structures involved in vision.','Major structures of the eye'],
    [/sense|hearing|ear/i,/ear|hear|auditory/i,'14.5','External, middle and inner ear structures have distinct names and functions.','Structures of the external, middle and inner ear'],
    [/endocrin|hormone/i,/endocrin|hormone|gland/i,'17.7','The hypothalamus and pituitary connect neural regulation with endocrine signaling.','Hypothalamus and anterior and posterior pituitary'],
  ],
  'Nutrition': [
    [/digest|absorp|gastro/i,/digest|tract|anatom/i,'23.2','Trace food through the digestive tract and identify the accessory organs that support digestion.','Digestive tract with liver, gallbladder and pancreas'],
    [/digest|absorp|gastro/i,/stomach|gastric/i,'23.15','The stomach has distinct regions and wall structures; most nutrient absorption occurs later in the small intestine.','Regions and layers of the stomach'],
    [/digest|absorp|fat|lipid/i,/bile|liver|pancre|accessory|digest/i,'23.24','Liver, gallbladder and pancreas support digestion through distinct secretions and transport pathways.','Liver, gallbladder, pancreas and associated ducts'],
    [/carbo|glucose|diabet/i,/glucose|insulin|regulat|metabol/i,'17.19','Insulin and glucagon participate in blood-glucose regulation; the diagram summarizes feedback rather than an individual treatment plan.','Insulin and glucagon feedback around blood glucose'],
    [/water|fluid|electrolyte|hydration/i,/kidney|renal|balance|fluid/i,'25.10','Renal blood flow supports filtration and the regulation of water and dissolved substances.','Blood vessels supplying the nephron'],
    [/bone|mineral|calcium|aging/i,/bone|calcium|lifespan|aging/i,'6.23','Bone mass changes across the lifespan. The plotted pattern is an illustration, not a prediction for every individual.','Illustrative relationship between age and bone mass'],
    [/iron|blood|anemia/i,/iron|blood|anemia/i,'18.2','Red blood cells are one component of blood; nutrient-related blood findings require context and assessment.','Plasma, red blood cells and other formed elements'],
  ],
  'Human Growth & Development': [
    [/prenatal/i,/timeline|genes|chromosome/i,'3.30','Cell division is one process supporting early development. This cell-cycle diagram complements the prenatal timeline; it does not show all stages of embryogenesis.','Interphase and the major stages of cell division'],
    [/aging/i,/sensation|sensory|vision/i,'14.15','Anatomy helps distinguish visual structures before discussing changes in visual function.','Eye structures including the retina and lens'],
    [/aging/i,/sensation|communication|hearing/i,'14.5','Hearing access can affect observed communication. The anatomical diagram identifies the pathways involved without diagnosing a cause.','External, middle and inner ear structures'],
    [/aging/i,/aging|physical|function/i,'6.23','An illustrative bone-mass pattern across ages highlights one physical domain; individual trajectories vary.','Graph of age and bone mass'],
  ]
};

function sectionFor(lesson,pattern) {
  return lesson.sections?.find(s=>pattern.test(s.title)) || lesson.sections?.find(s=>(s.blocks||[]).some(b=>typeof b==='string'&&pattern.test(b))) || lesson.sections?.[0];
}
function addModel(lesson,model,pattern) {
  if(lesson.sections.some(s=>(s.blocks||[]).some(b=>b.t==='w'&&b.diagram===model.diagram)))return;
  const section=sectionFor(lesson,pattern);
  if(section) section.blocks.push(model);
}

/** Enrich only the five new rich courses. Safe to call again: no duplicate blocks. */
export function addSubjectVisuals(name,lessons) {
  if(!eligible.has(name))return;
  for(const lesson of lessons){
    if(!lesson.sections?.length)continue;
    const title=lesson.title||'';
    if(name==='Health Informatics'){
      if(/record|learning health|architecture|interoper|structure|governance|analytics|artificial/i.test(title))addModel(lesson,models.information(),/data|information|context|workflow|evidence/i);
      if(/quality|end.to.end|analytics|governance/i.test(title))addModel(lesson,models.quality(),/quality|validat|monitor|improv|workflow/i);
    }
    if(name==='Healthcare Administration'){
      if(/quality|safety|operation|workflow|improv|leadership|management|planning/i.test(title))addModel(lesson,models.quality(),/quality|improv|measure|workflow|plan/i);
      if(/information|data|record|decision|evidence/i.test(title))addModel(lesson,models.information(),/information|data|decision|record/i);
    }
    if(name==='Human Growth & Development'&&/context|government|theories/i.test(title))addModel(lesson,models.context(),/ecolog|family|culture|system|theor/i);
    if(name==='Medical Terminology'&&/word|prefix|suffix|foundation|build|decod/i.test(title))addModel(lesson,models.words(),/word|root|prefix|suffix|meaning/i);
    if(name==='Nutrition'&&/digest|absorp|macronutrient|protein|carbo|fat|lipid/i.test(title))addModel(lesson,models.nutrients(),/digest|absorp|transport|metabol/i);
    let inserted=lesson.sections.reduce((n,s)=>n+(s.blocks||[]).filter(b=>b.t==='fig').length,0);
    for(const [focus,where,number,caption,alt] of rules[name]||[]){
      if(inserted>=3)break;
      if(!focus.test(title))continue;
      const file=AP+number;
      if(!FIGURES[file]||lesson.sections.some(s=>(s.blocks||[]).some(b=>b.t==='fig'&&b.file===file)))continue;
      const section=sectionFor(lesson,where);
      if(!section)continue;
      section.blocks.splice(Math.min(1,section.blocks.length),0,{t:'fig',file,caption,alt});
      if(++inserted===3)break;
    }
  }
}
