// Original schematic diagrams for the interactive models. Elements with data-part are the
// selectable parts; lessons list each part's name and explanation. Diagrams are teaching
// schematics, not to scale.
const svg = (box, label, body) => `<svg class="lw-svg" viewBox="${box}" role="img" aria-label="${label}">${body}</svg>`;
const box = (id, x, y, w, h, text, cls = 'p1') => `<g data-part="${id}"><rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><text class="tx" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${text}</text></g>`;
const arrow = (d, cls = 'arr') => `<path class="${cls}" d="${d}" marker-end="url(#lw-arrow)"/>`;
const defs = '<defs><marker id="lw-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="arr-head"/></marker></defs>';

export const DIAGRAMS = {
  neuron: svg('0 0 520 220', 'Neuron', `
    <g data-part="dendrite"><path class="branch" d="M72 98L32 58M52 78L18 84M72 122L30 162M50 142L16 136M92 82L84 34M86 56L58 28M94 140L90 192M90 170L64 196"/></g>
    <circle data-part="soma" class="p1" cx="100" cy="110" r="32"/>
    <circle data-part="nucleus" class="p3" cx="98" cy="108" r="12"/>
    <path data-part="hillock" class="p2" d="M129 97L152 105V115L129 123Z"/>
    <rect data-part="axon" class="p5" x="150" y="105" width="285" height="10" rx="5"/>
    <g data-part="myelin"><rect class="p4" x="165" y="96" width="50" height="28" rx="14"/><rect class="p4" x="227" y="96" width="50" height="28" rx="14"/><rect class="p4" x="289" y="96" width="50" height="28" rx="14"/><rect class="p4" x="351" y="96" width="50" height="28" rx="14"/></g>
    <g data-part="node"><rect class="p2" x="216" y="101" width="10" height="18" rx="3"/><rect class="p2" x="278" y="101" width="10" height="18" rx="3"/><rect class="p2" x="340" y="101" width="10" height="18" rx="3"/></g>
    <g data-part="terminal"><path class="branch" d="M432 110L470 72M432 110L478 104M432 110L474 140M450 92L486 88"/><circle class="p3" cx="472" cy="70" r="8"/><circle class="p3" cx="481" cy="104" r="8"/><circle class="p3" cx="476" cy="143" r="8"/><circle class="p3" cx="489" cy="87" r="7"/></g>
    <text class="tx faint" x="300" y="176" text-anchor="middle">signal travels this way →</text>`),

  synapse: svg('0 0 420 300', 'Synapse', `
    <path data-part="presyn" class="p1" d="M120 16H300V90Q300 162 210 162Q120 162 120 90Z"/>
    <g data-part="vesicle"><circle class="p3" cx="170" cy="70" r="12"/><circle class="p3" cx="214" cy="54" r="12"/><circle class="p3" cx="252" cy="82" r="12"/><circle class="p3" cx="196" cy="110" r="12"/><circle class="p3" cx="236" cy="126" r="12"/></g>
    <rect data-part="reuptake" class="p6" x="132" y="112" width="16" height="30" rx="6" transform="rotate(-35 140 127)"/>
    <rect data-part="cleft" class="cleft" x="96" y="166" width="230" height="30"/>
    <g data-part="nt"><circle class="p2" cx="178" cy="178" r="4.5"/><circle class="p2" cx="196" cy="186" r="4.5"/><circle class="p2" cx="214" cy="174" r="4.5"/><circle class="p2" cx="232" cy="188" r="4.5"/><circle class="p2" cx="250" cy="178" r="4.5"/><circle class="p2" cx="160" cy="190" r="4.5"/></g>
    <rect data-part="post" class="p4" x="86" y="204" width="250" height="80" rx="18"/>
    <g data-part="receptor"><path class="p5" d="M150 196h18v14h-5v-7h-8v7h-5z"/><path class="p5" d="M195 196h18v14h-5v-7h-8v7h-5z"/><path class="p5" d="M240 196h18v14h-5v-7h-8v7h-5z"/><path class="p5" d="M285 196h18v14h-5v-7h-8v7h-5z"/></g>
    <text class="tx faint" x="210" y="10" text-anchor="middle">↓ action potential arrives</text>`),

  'brain-lateral': svg('0 0 460 320', 'Brain, side view', `
    <path data-part="frontal" class="p1" d="M60 150C60 70 120 30 200 30H215L230 150L170 175L90 190C70 180 60 170 60 150Z"/>
    <path data-part="parietal" class="p3" d="M215 30C290 30 340 55 360 95L300 140L230 150Z"/>
    <path data-part="occipital" class="p4" d="M360 95C385 125 390 160 375 190L330 200L300 140Z"/>
    <path data-part="temporal" class="p6" d="M90 190L170 175L230 150L300 140L330 200C300 225 230 235 170 228C120 222 95 210 90 190Z"/>
    <path data-part="motor" class="p2" d="M203 31L217 30L230 149L216 151Z"/>
    <ellipse data-part="broca" class="p2" cx="150" cy="170" rx="20" ry="11"/>
    <ellipse data-part="wernicke" class="p2" cx="300" cy="168" rx="20" ry="12"/>
    <path data-part="cerebellum" class="p5" d="M300 216C330 204 380 210 386 240C386 270 340 282 310 268C290 256 286 230 300 216Z"/>
    <path data-part="pons" class="p3" d="M252 226C272 222 290 230 290 246L288 262C280 270 262 270 255 262Z"/>
    <path data-part="medulla" class="p1" d="M258 264H286L282 304H265Z"/>
    <text class="tx faint" x="40" y="300">← front (face)</text>`),

  'brain-mid': svg('0 0 460 320', 'Brain, midline view', `
    <path class="faint-fill" d="M60 160C55 80 130 28 230 28C330 28 400 80 400 150C400 200 370 220 330 225L300 220L250 205L180 210L110 205C80 200 62 185 60 160Z"/>
    <path data-part="prefrontal" class="p1" d="M62 160C58 105 90 62 140 44L150 120L110 200C80 196 64 184 62 160Z"/>
    <path data-part="callosum" class="p4" d="M140 125C180 88 290 86 330 128C318 122 300 108 270 106C220 102 175 108 154 132Z"/>
    <ellipse data-part="thalamus" class="p3" cx="238" cy="150" rx="27" ry="17"/>
    <ellipse data-part="hypothalamus" class="p2" cx="204" cy="176" rx="19" ry="11"/>
    <g data-part="pituitary"><path class="p6" d="M200 186L198 198"/><circle class="p6" cx="197" cy="203" r="8"/></g>
    <circle data-part="amygdala" class="p2" cx="230" cy="200" r="9"/>
    <path data-part="hippocampus" class="p5" d="M246 198C262 206 290 202 304 186L310 192C294 212 262 216 242 206Z"/>
    <path data-part="midbrain" class="p6" d="M250 168H280L284 204H254Z"/>
    <ellipse data-part="pons" class="p3" cx="272" cy="226" rx="22" ry="16"/>
    <path data-part="medulla" class="p1" d="M260 240H284L280 296H266Z"/>
    <path data-part="cerebellum" class="p5" d="M300 220C330 206 380 212 386 240C386 270 340 282 310 268C292 256 288 232 300 220Z"/>
    <text class="tx faint" x="40" y="300">← front (face)</text>`),

  'ns-tree': svg('0 0 540 300', 'Divisions of the nervous system', `${defs}
    ${box('ns', 190, 10, 160, 40, 'Nervous system', 'p6')}
    ${box('cns', 40, 90, 200, 40, 'Central (CNS)', 'p1')}${box('pns', 300, 90, 200, 40, 'Peripheral (PNS)', 'p3')}
    ${box('brain', 20, 170, 110, 40, 'Brain', 'p1')}${box('cord', 140, 170, 110, 40, 'Spinal cord', 'p1')}
    ${box('somatic', 270, 170, 120, 40, 'Somatic', 'p4')}${box('autonomic', 400, 170, 130, 40, 'Autonomic', 'p4')}
    ${box('sympathetic', 300, 250, 115, 40, 'Sympathetic', 'p2')}${box('parasympathetic', 420, 250, 115, 40, 'Parasympathetic', 'p5')}
    ${arrow('M250 50L150 88')}${arrow('M290 50L390 88')}${arrow('M120 130L80 168')}${arrow('M160 130L190 168')}${arrow('M380 130L330 168')}${arrow('M420 130L460 168')}${arrow('M450 210L360 248')}${arrow('M470 210L475 248')}`),

  hpa: svg('0 0 540 300', 'Stress response pathways', `${defs}
    ${box('stressor', 200, 8, 140, 34, 'Stressor', 'p6')}
    ${box('hypothalamus', 190, 66, 160, 38, 'Hypothalamus', 'p1')}
    ${box('pituitary', 30, 136, 170, 38, 'Anterior pituitary', 'p3')}
    ${box('cortex', 30, 206, 170, 38, 'Adrenal cortex', 'p4')}
    ${box('cortisol', 30, 262, 170, 32, 'Cortisol', 'p2')}
    ${box('sympathetic', 340, 136, 180, 38, 'Sympathetic nerves', 'p5')}
    ${box('medulla', 340, 206, 180, 38, 'Adrenal medulla', 'p4')}
    ${box('epinephrine', 340, 262, 180, 32, 'Epinephrine', 'p2')}
    ${arrow('M270 42V64')}${arrow('M230 104L140 134')}<text class="tx sm" x="160" y="118">CRH</text>${arrow('M115 174V204')}<text class="tx sm" x="122" y="194">ACTH</text>${arrow('M115 244V260')}
    ${arrow('M310 104L410 134')}${arrow('M430 174V204')}${arrow('M430 244V260')}
    <g data-part="feedback"><path class="arr dashed" d="M30 278C4 250 4 120 186 86" marker-end="url(#lw-arrow)"/><text class="tx sm" x="8" y="200">− feedback</text></g>`),

  adme: svg('0 0 560 330', 'Path of a drug through the body', `${defs}
    ${box('oral', 20, 20, 130, 40, 'Oral dose', 'p6')}
    ${box('gut', 20, 100, 130, 46, 'GI tract', 'p3')}
    ${box('portal', 20, 186, 130, 40, 'Portal vein', 'p4')}
    ${box('liver', 200, 186, 150, 48, 'Liver', 'p2')}
    ${box('iv', 230, 20, 110, 40, 'IV dose', 'p6')}
    ${box('blood', 200, 96, 150, 50, 'Bloodstream', 'p1')}
    ${box('tissue', 400, 40, 145, 50, 'Tissues & target', 'p5')}
    ${box('kidney', 400, 140, 145, 46, 'Kidneys', 'p3')}
    ${box('urine', 400, 238, 145, 40, 'Urine', 'p6')}
    ${box('bile', 200, 276, 150, 40, 'Bile → feces', 'p6')}
    ${arrow('M85 60V98')}${arrow('M85 146V184')}${arrow('M150 206H198')}${arrow('M275 186V148')}${arrow('M285 60V94')}${arrow('M350 112L398 72')}${arrow('M398 82L352 128', 'arr dashed')}${arrow('M350 130L398 158')}${arrow('M472 186V236')}${arrow('M275 234V274')}`),

  receptor: svg('0 0 520 250', 'Agonist and antagonist at a receptor', `
    <text class="tx" x="130" y="22" text-anchor="middle">Agonist binds and activates</text><text class="tx" x="390" y="22" text-anchor="middle">Antagonist binds and blocks</text>
    <g data-part="membrane"><rect class="p6" x="20" y="150" width="220" height="26"/><rect class="p6" x="280" y="150" width="220" height="26"/></g>
    <g data-part="receptor"><path class="p4" d="M95 196V116H115V136H145V116H165V196Z"/><path class="p4" d="M355 196V116H375V136H405V116H425V196Z"/></g>
    <path data-part="agonist" class="p2" d="M117 70H143V134H117Z"/>
    <path data-part="antagonist" class="p5" d="M372 92H408V132H372Z"/>
    <path class="p2 ghost" d="M447 50H473V114H447Z"/><text class="tx sm" x="460" y="44" text-anchor="middle">agonist can't fit</text>
    <g data-part="signal"><path class="zap" d="M130 200L118 222H134L122 244"/><text class="tx sm" x="146" y="230">cell response</text></g>
    <text class="tx sm faint" x="390" y="230" text-anchor="middle">no response</text>`),

  injection: svg('0 0 520 280', 'Injection angles and tissue layers', `
    <rect data-part="epidermis" class="p6" x="20" y="70" width="480" height="18"/>
    <rect data-part="dermis" class="p3" x="20" y="88" width="480" height="46"/>
    <rect data-part="subq" class="p4" x="20" y="134" width="480" height="58"/>
    <rect data-part="muscle" class="p2" x="20" y="192" width="480" height="78"/>
    <g data-part="id"><path class="needle" d="M70 44L140 96"/><text class="tx" x="64" y="38">ID</text></g>
    <g data-part="sc"><path class="needle" d="M230 34L300 150"/><text class="tx" x="214" y="28">SubQ</text></g>
    <g data-part="im"><path class="needle" d="M420 20V230"/><text class="tx" x="430" y="30">IM</text></g>`),

  tooth: svg('0 0 380 420', 'Tooth in cross-section', `
    <path data-part="bone" class="p5" d="M40 240H103L112 300C118 350 150 382 180 384C210 382 242 350 248 300L257 240H320V410H40Z"/>
    <path data-part="pdl" class="p4" d="M103 240L112 300C118 350 150 382 180 384C210 382 242 350 248 300L257 240H249L242 300C236 345 208 372 180 374C152 372 124 345 118 300L110 240Z"/>
    <path data-part="cementum" class="p3" d="M100 170L118 300C124 345 152 372 180 374C208 372 236 345 242 300L260 170H250L240 300C236 340 210 362 180 366C150 362 124 340 120 300L110 170Z"/>
    <path data-part="enamel" class="p6" d="M95 170C85 120 90 70 110 50C130 35 150 45 160 55C170 45 190 45 200 55C210 45 230 35 250 50C270 70 275 120 265 170Z"/>
    <path data-part="dentin" class="p1" d="M110 168C102 125 108 85 122 70C138 60 150 70 160 78C170 70 190 70 200 78C210 70 222 60 238 70C252 85 258 125 250 168L240 300C236 340 210 362 180 366C150 362 124 340 120 300Z"/>
    <path data-part="pulp" class="p2" d="M142 165C138 135 146 112 158 112C168 112 172 122 180 122C188 122 192 112 202 112C214 112 222 135 218 165L192 345C189 356 171 356 168 345Z"/>
    <circle data-part="apex" class="p2" cx="180" cy="362" r="6"/>
    <g data-part="gingiva"><path class="gum" d="M50 148C78 148 95 160 102 176L114 238H50Z"/><path class="gum" d="M310 148C282 148 265 160 258 176L246 238H310Z"/></g>
    <g data-part="cej"><circle class="p5" cx="100" cy="170" r="6"/><circle class="p5" cx="260" cy="170" r="6"/></g>
    <g data-part="crown"><path class="bracket" d="M330 46H340V168H330"/><text class="tx sm" x="346" y="112">crown</text></g>
    <g data-part="root"><path class="bracket" d="M330 172H340V372H330"/><text class="tx sm" x="346" y="276">root</text></g>`),

  'molar-occlusal': svg('0 0 380 320', 'Maxillary first molar, occlusal view', `
    <path class="faint-fill" d="M70 80C90 48 250 40 292 70C322 100 322 220 292 250C250 282 100 282 70 250C44 220 44 110 70 80Z"/>
    <ellipse data-part="mb" class="p1" cx="115" cy="112" rx="44" ry="36"/>
    <ellipse data-part="db" class="p3" cx="240" cy="108" rx="40" ry="34"/>
    <ellipse data-part="ml" class="p4" cx="122" cy="212" rx="54" ry="42"/>
    <ellipse data-part="dl" class="p6" cx="246" cy="214" rx="34" ry="30"/>
    <path data-part="oblique" class="ridge" d="M140 196C170 170 196 150 222 124"/>
    <path data-part="mmr" class="ridge" d="M66 104C56 150 56 192 68 232"/>
    <path data-part="dmr" class="ridge" d="M296 98C308 142 308 188 296 226"/>
    <circle data-part="cfossa" class="p2" cx="168" cy="160" r="13"/>
    <path data-part="bgroove" class="groove" d="M178 58C176 90 172 120 170 146"/>
    <text class="tx faint" x="190" y="24" text-anchor="middle">BUCCAL</text><text class="tx faint" x="190" y="306" text-anchor="middle">LINGUAL (palatal)</text><text class="tx faint" x="8" y="168">MESIAL</text><text class="tx faint" x="372" y="168" text-anchor="end">DISTAL</text>`),

  surfaces: svg('0 0 520 300', 'Tooth surfaces', `
    <text class="tx" x="130" y="22" text-anchor="middle">Incisor (facial view)</text><text class="tx" x="380" y="22" text-anchor="middle">Molar (occlusal view)</text>
    <path class="faint-fill" d="M90 50H170C178 120 168 200 150 250H110C92 200 82 120 90 50Z"/>
    <path data-part="labial" class="p1" d="M98 60H162C168 120 160 180 148 232H112C100 180 92 120 98 60Z"/>
    <path data-part="incisal" class="edge" d="M90 50H170"/>
    <path data-part="cervical" class="edge" d="M110 250H150"/>
    <g data-part="mesial"><path class="edge" d="M90 52C84 120 92 200 110 248"/><path class="edge" d="M300 80V230"/></g>
    <g data-part="distal"><path class="edge" d="M170 52C176 120 168 200 150 248"/><path class="edge" d="M460 80V230"/></g>
    <rect class="faint-fill" x="300" y="80" width="160" height="150" rx="34"/>
    <rect data-part="occlusal" class="p4" x="330" y="108" width="100" height="94" rx="22"/>
    <path data-part="buccal" class="edge" d="M318 80H442"/>
    <path data-part="lingual" class="edge" d="M318 230H442"/>
    <g data-part="midline"><path class="dashed-line" d="M30 40V280"/><text class="tx sm" x="36" y="290">midline</text></g>
    <text class="tx faint sm" x="300" y="268">← toward midline</text>`),

  skull: svg('0 0 460 360', 'Skull and jaw, side view', `
    <path class="faint-fill" d="M120 170C90 90 150 30 250 28C350 30 410 90 405 170C400 220 370 245 330 250H300L280 205L200 200L150 205Z"/>
    <circle class="hole" cx="165" cy="150" r="26"/><path class="hole" d="M120 182L132 214H110Z"/>
    <ellipse data-part="temporal" class="p3" cx="318" cy="150" rx="48" ry="34"/>
    <path data-part="zygomatic" class="p4" d="M180 178L298 186V200L180 196Z"/>
    <path data-part="maxilla" class="p1" d="M108 200H212L216 248L120 252C104 236 104 216 108 200Z"/>
    <path class="teeth" d="M124 252h90M124 270h120"/>
    <path data-part="body" class="p6" d="M115 272L255 274L262 318C230 336 160 338 128 328C112 318 110 292 115 272Z"/>
    <path data-part="angle" class="p5" d="M255 274L286 278L290 320C286 332 272 334 262 318Z"/>
    <path data-part="ramus" class="p6" d="M255 274L262 206H290L286 278Z"/>
    <path data-part="coronoid" class="p2" d="M262 236L248 194L272 208Z"/>
    <ellipse data-part="condyle" class="p2" cx="294" cy="202" rx="13" ry="9"/>
    <circle data-part="tmj" class="ring" cx="298" cy="196" r="20"/>
    <circle data-part="mental" class="p2" cx="160" cy="304" r="6"/>`),

  mastication: svg('0 0 460 360', 'Muscles of mastication', `
    <path class="faint-fill" d="M120 170C90 90 150 30 250 28C350 30 410 90 405 170C400 220 370 245 330 250H300L280 205L200 200L150 205Z"/>
    <path class="faint-fill" d="M115 272L255 274L262 206H290L290 320C286 334 268 334 262 318C230 336 160 338 128 328C112 318 110 292 115 272Z"/>
    <circle class="hole" cx="165" cy="150" r="26"/>
    <path data-part="temporalis" class="muscle" d="M230 50C300 40 370 70 380 140L300 180L262 212L240 140Z"/>
    <path data-part="masseter" class="muscle m2" d="M200 190L296 196L292 320L246 324Z"/>
    <path data-part="medial" class="muscle m3 dashed" d="M262 230L290 236L286 314L258 300Z"/>
    <path data-part="lateral" class="muscle m4 dashed" d="M272 200L320 186L318 204L282 214Z"/>`),

  'oral-cavity': svg('0 0 400 320', 'Oral cavity, front view', `
    <path data-part="upperlip" class="p1" d="M60 110C120 58 280 58 340 110C280 92 120 92 60 110Z"/>
    <path data-part="lowerlip" class="p1" d="M60 210C120 292 280 292 340 210C280 240 120 240 60 210Z"/>
    <ellipse class="dk" cx="200" cy="160" rx="140" ry="70"/>
    <path data-part="gingiva" class="gum" d="M84 108C150 92 250 92 316 108L311 122C250 106 150 106 89 122Z"/>
    <path data-part="frenum" class="p2" d="M196 95H204L202 110H198Z"/>
    <path class="teeth" d="M96 124C150 110 250 110 304 124"/>
    <path data-part="hardpalate" class="p6" d="M110 134C160 124 240 124 290 134C280 152 120 152 110 134Z"/>
    <path data-part="softpalate" class="p4" d="M130 150C170 144 230 144 270 150C255 166 145 166 130 150Z"/>
    <ellipse data-part="pharynx" class="dk2" cx="200" cy="182" rx="40" ry="18"/>
    <path data-part="uvula" class="p2" d="M193 160C192 180 208 180 207 160Z"/>
    <g data-part="tonsil"><ellipse class="p5" cx="146" cy="178" rx="12" ry="16"/><ellipse class="p5" cx="254" cy="178" rx="12" ry="16"/></g>
    <path data-part="tongue" class="p3" d="M100 214C120 180 280 180 300 214C280 232 120 232 100 214Z"/>
    <path class="teeth" d="M100 230C150 244 250 244 300 230"/>`),

  'cavity-classes': svg('0 0 540 250', 'G.V. Black cavity classes', `
    <g data-part="c1" transform="translate(20 40)"><rect class="faint-fill" width="70" height="70" rx="18"/><path class="groove" d="M14 35H56M35 14V56"/><circle class="lesion" cx="35" cy="35" r="9"/></g>
    <g data-part="c2" transform="translate(110 30)"><path class="faint-fill" d="M10 0H70C78 30 78 60 70 90L60 160H20L10 90C2 60 2 30 10 0Z"/><path class="lesion" d="M70 20C78 34 78 52 72 66L62 60C66 48 66 36 62 26Z"/></g>
    <g data-part="c3" transform="translate(210 30)"><path class="faint-fill" d="M8 0H62C66 60 58 120 48 160H22C12 120 4 60 8 0Z"/><circle class="lesion" cx="58" cy="60" r="8"/></g>
    <g data-part="c4" transform="translate(300 30)"><path class="faint-fill" d="M8 0H62C66 60 58 120 48 160H22C12 120 4 60 8 0Z"/><path class="lesion" d="M44 0H62C64 16 62 34 58 46C52 36 46 18 44 0Z"/></g>
    <g data-part="c5" transform="translate(390 30)"><path class="faint-fill" d="M8 0H62C66 60 58 120 48 160H22C12 120 4 60 8 0Z"/><ellipse class="lesion" cx="35" cy="128" rx="13" ry="7"/></g>
    <g data-part="c6" transform="translate(470 40)"><path class="faint-fill" d="M4 30C10 0 24 0 30 18C36 0 50 0 56 30L52 150H8Z"/><circle class="lesion" cx="13" cy="14" r="6"/></g>
    <text class="tx faint" x="270" y="232" text-anchor="middle">Each tooth shows a lesion (red). Select one to identify its class.</text>`),

  perio: svg('0 0 500 300', 'Healthy sulcus versus periodontal pocket', `
    <text class="tx" x="125" y="22" text-anchor="middle">Healthy</text><text class="tx" x="375" y="22" text-anchor="middle">Periodontitis</text>
    <g data-part="bone"><path class="p5" d="M20 150H100V290H20Z"/><path class="p5" d="M150 150H230V290H150Z"/><path class="p5" d="M270 220H350V290H270Z"/><path class="p5" d="M400 220H480V290H400Z"/></g>
    <g data-part="toothroot"><path class="p6" d="M100 30H150V280H100Z"/><path class="p6" d="M350 30H400V280H350Z"/></g>
    <g data-part="gingiva"><path class="gum" d="M40 110C70 104 92 108 98 118V150H40Z"/><path class="gum" d="M210 110C180 104 158 108 152 118V150H210Z"/><path class="gum" d="M290 120C320 114 342 118 348 128V220H290Z"/><path class="gum" d="M460 120C430 114 408 118 402 128V220H460Z"/></g>
    <path data-part="sulcus" class="pocket" d="M98 118H100V136H98Z"/>
    <path data-part="pocket" class="pocket" d="M346 128H350V214H346Z"/>
    <g data-part="calculus"><path class="calc" d="M350 150h6v12h-6zM350 176h7v14h-7z"/></g>
    <g data-part="probe"><path class="needle" d="M88 40L97 136"/><path class="needle" d="M336 40L347 212"/></g>
    <path data-part="boneloss" class="loss" d="M270 150H350V220H270ZM400 150H480V220H400Z"/>`),

  heart: svg('0 0 420 380', 'Heart chambers, valves and vessels', `
    <rect data-part="svc" class="pb" x="72" y="34" width="28" height="92" rx="8"/>
    <rect data-part="ivc" class="pb" x="72" y="206" width="28" height="90" rx="8"/>
    <path data-part="pa" class="pb" d="M136 120V58C136 36 104 30 70 34V20C116 14 168 26 166 60V120Z"/>
    <path data-part="aorta" class="pr" d="M214 126V50C214 18 280 8 320 26C340 36 348 52 344 70H314C316 50 296 40 268 42C250 44 248 52 248 62V126Z"/>
    <g data-part="pv"><rect class="pr" x="330" y="140" width="56" height="16" rx="6"/><rect class="pr" x="330" y="182" width="56" height="16" rx="6"/></g>
    <path data-part="ra" class="pb" d="M92 120C70 120 60 150 60 176C60 204 80 215 110 215H190V126C160 118 120 118 92 120Z"/>
    <path data-part="rv" class="pb" d="M110 223H190L198 332C170 342 130 322 110 292C96 270 96 240 110 223Z"/>
    <path data-part="la" class="pr" d="M210 126C250 116 300 116 330 126C346 142 346 200 330 215H210Z"/>
    <path data-part="lv" class="pr" d="M210 223H332C346 262 332 320 282 346C250 356 220 352 205 336Z"/>
    <rect data-part="septum" class="p5" x="192" y="120" width="16" height="225" rx="4"/>
    <rect data-part="tricuspid" class="valve" x="116" y="214" width="68" height="9" rx="4"/>
    <rect data-part="mitral" class="valve" x="216" y="214" width="110" height="9" rx="4"/>
    <rect data-part="pulmonary" class="valve" x="136" y="112" width="30" height="9" rx="4"/>
    <rect data-part="aortic" class="valve" x="214" y="118" width="34" height="9" rx="4"/>
    <text class="tx faint" x="18" y="372">patient's right</text><text class="tx faint" x="404" y="372" text-anchor="end">patient's left</text>`),

  conduction: svg('0 0 420 380', 'Cardiac conduction system', `
    <path class="faint-fill" d="M92 120C70 120 60 150 60 176C60 204 80 215 100 240C110 300 160 340 200 350C250 356 320 330 338 260C348 220 346 160 330 126C300 116 250 116 210 122C160 118 120 118 92 120Z"/>
    <path class="faint-line" d="M200 122V346M70 218H340"/>
    <circle data-part="sa" class="node" cx="100" cy="132" r="11"/>
    <path data-part="internodal" class="cond" d="M104 142C130 170 160 196 184 208"/>
    <circle data-part="av" class="node" cx="188" cy="212" r="10"/>
    <path data-part="his" class="cond" d="M194 220V250"/>
    <path data-part="rbb" class="cond" d="M194 250C180 280 160 300 140 318"/>
    <path data-part="lbb" class="cond" d="M206 250C226 280 250 300 280 318"/>
    <g data-part="purkinje"><path class="cond thin" d="M140 318C120 300 106 270 104 244M140 318C150 332 170 342 196 344M280 318C300 300 320 270 326 236M280 318C262 334 236 344 206 346M128 304l-14 6M300 296l14 8M168 334l-6 12M244 336l6 12"/></g>`),

  'ecg-wave': svg('0 0 520 250', 'ECG waveform', `
    <path class="trace" d="M20 150H60C75 120 95 120 110 150H140L148 162L154 40L162 175L172 150H220C245 105 285 105 305 150H400L408 162L414 40L422 175L432 150H500"/>
    <path data-part="p" class="seg" d="M60 150C75 120 95 120 110 150"/>
    <path data-part="qrs" class="seg" d="M140 150L148 162L154 40L162 175L172 150"/>
    <path data-part="st" class="seg" d="M172 150H220"/>
    <path data-part="t" class="seg" d="M220 150C245 105 285 105 305 150"/>
    <g data-part="pr"><path class="bracket" d="M60 196V204H140V196"/></g>
    <g data-part="qt"><path class="bracket" d="M140 220V228H305V220"/></g>
    <g data-part="rr"><path class="bracket" d="M154 24V16H414V24"/></g>
    <path class="faint-line" d="M20 150H500"/>`),

  skin: svg('0 0 460 330', 'Layers of the skin', `
    <rect data-part="hypodermis" class="p1" x="20" y="196" width="340" height="110"/>
    <g class="fat"><circle cx="60" cy="230" r="16"/><circle cx="100" cy="262" r="18"/><circle cx="160" cy="236" r="15"/><circle cx="300" cy="250" r="18"/><circle cx="330" cy="280" r="14"/></g>
    <rect data-part="dermis" class="p3" x="20" y="72" width="340" height="124"/>
    <rect data-part="epidermis" class="p6" x="20" y="48" width="340" height="24"/>
    <g data-part="vessel"><path class="vessel-r" d="M20 180C100 170 200 190 360 176"/><path class="vessel-b" d="M20 188C100 182 200 200 360 186"/></g>
    <g data-part="follicle"><path class="p5" d="M124 72V214C124 228 148 228 148 214V72Z"/><path class="hair" d="M136 220V20"/></g>
    <path data-part="sebaceous" class="p2" d="M148 110C170 104 176 132 150 136Z"/>
    <path data-part="arrector" class="muscle-line" d="M150 150L196 92"/>
    <g data-part="sweat"><path class="duct" d="M250 48V176"/><path class="p4" d="M236 176C226 196 270 204 262 186C254 172 236 186 250 196C262 204 276 188 262 178Z"/></g>
    <ellipse data-part="receptor" class="p2" cx="300" cy="226" rx="16" ry="24"/>
    <g data-part="burn1"><path class="bracket" d="M380 48H390V72H380"/><text class="tx sm" x="394" y="64">superficial</text></g>
    <g data-part="burn2"><path class="bracket" d="M380 76H390V180H380"/><text class="tx sm" x="394" y="132">partial</text></g>
    <g data-part="burn3"><path class="bracket" d="M404 48H414V214H404"/><text class="tx sm" x="410" y="230">full</text></g>`),

  joint: svg('0 0 360 400', 'Synovial joint', `
    <path data-part="capsule" class="p5" d="M70 130C40 160 40 250 70 280H290C320 250 320 160 290 130Z"/>
    <path data-part="synovium" class="p2" d="M84 142C60 170 60 240 84 268H276C300 240 300 170 276 142Z"/>
    <path data-part="cavity" class="fluid" d="M92 150C72 175 72 235 92 260H268C288 235 288 175 268 150Z"/>
    <path data-part="bone" class="p6" d="M120 10H240V150C240 190 200 200 180 200C160 200 120 190 120 150ZM110 230C150 220 210 220 250 230V390H110Z"/>
    <path data-part="spongy" class="spongy" d="M130 120C130 170 160 188 180 188C200 188 230 170 230 120ZM120 240C150 232 210 232 240 240V270H120Z"/>
    <rect data-part="marrow" class="p4" x="160" y="20" width="40" height="90" rx="12"/>
    <g data-part="cartilage"><path class="p3" d="M116 150C118 196 160 208 180 208C200 208 242 196 244 150L236 150C234 186 200 198 180 198C160 198 126 186 124 150Z"/><path class="p3" d="M108 226C150 214 210 214 252 226V236C210 224 150 224 108 236Z"/></g>
    <g data-part="ligament"><rect class="lig" x="58" y="150" width="12" height="110" rx="5"/><rect class="lig" x="290" y="150" width="12" height="110" rx="5"/></g>`),

  resp: svg('0 0 420 440', 'Respiratory system', `
    <path data-part="nasal" class="p6" d="M150 30C180 20 230 22 250 40L240 70H160Z"/>
    <path data-part="pharynx" class="p3" d="M196 70H222L220 130H198Z"/>
    <rect data-part="larynx" class="p4" x="194" y="130" width="30" height="34" rx="8"/>
    <rect data-part="trachea" class="p5" x="200" y="164" width="18" height="80" rx="6"/>
    <path data-part="lungs" class="p1" d="M190 200C140 190 80 240 76 320C72 380 120 392 180 380L190 250ZM230 200C280 190 340 240 344 320C348 380 300 392 240 380L230 250Z"/>
    <g data-part="bronchi"><path class="tube" d="M209 244L172 282M209 244L248 282"/></g>
    <g data-part="bronchioles"><path class="tube thin" d="M172 282L140 312M172 282L166 330M140 312L118 330M140 312L134 344M248 282L282 312M248 282L254 330M282 312L304 330M282 312L288 344"/></g>
    <path data-part="pleura" class="ring" d="M186 194C134 182 70 236 66 320C62 392 120 400 186 388M234 194C286 182 350 236 354 320C358 392 300 400 234 388"/>
    <path data-part="diaphragm" class="muscle-line wide" d="M60 400C120 360 300 360 360 400"/>
    <g data-part="alveoli"><circle class="lens" cx="356" cy="110" r="46"/><circle class="p2" cx="340" cy="100" r="13"/><circle class="p2" cx="366" cy="96" r="13"/><circle class="p2" cx="352" cy="124" r="13"/><circle class="p2" cx="376" cy="120" r="12"/><path class="faint-line" d="M290 320L320 150"/></g>`),

  gi: svg('0 0 420 470', 'Digestive system', `
    <path data-part="mouth" class="p6" d="M180 14C200 6 230 8 240 20L232 40H186Z"/>
    <rect data-part="esophagus" class="p3" x="204" y="40" width="16" height="104" rx="7"/>
    <path data-part="liver" class="p2" d="M80 150C120 120 230 128 240 150C236 178 200 196 130 200C96 198 74 180 80 150Z"/>
    <ellipse data-part="gallbladder" class="p4" cx="170" cy="204" rx="14" ry="10"/>
    <path data-part="stomach" class="p1" d="M220 142C250 140 300 150 310 190C318 230 290 252 256 246C236 242 236 226 252 220C276 214 280 196 262 180C246 170 226 170 218 158Z"/>
    <path data-part="pancreas" class="p5" d="M190 250C220 240 270 244 300 252L298 264C268 258 222 256 192 264Z"/>
    <path data-part="largeint" class="colon" d="M110 400V250C110 232 120 226 140 226H300C320 226 330 232 330 250V400C330 420 300 424 270 420"/>
    <g data-part="smallint"><path class="coil" d="M150 272C180 262 260 262 290 272M150 300C180 290 260 290 290 300M150 328C180 318 260 318 290 328M150 356C180 346 260 346 290 356M150 384C180 374 240 374 262 386"/></g>
    <path data-part="appendix" class="p2" d="M106 404C100 418 92 428 84 430L88 422C96 418 100 410 102 400Z"/>
    <path data-part="rectum" class="p4" d="M262 414C240 420 226 430 220 448H236C240 436 250 430 268 428Z"/>`),

  endocrine: svg('0 0 360 470', 'Endocrine glands', `
    <path class="faint-fill" d="M180 10C214 10 230 36 228 66C226 92 206 104 196 108V124C250 130 290 150 296 200L288 330C284 360 262 380 236 388L232 460H128L124 388C98 380 76 360 72 330L64 200C70 150 110 130 164 124V108C154 104 134 92 132 66C130 36 146 10 180 10Z"/>
    <ellipse data-part="hypothalamus" class="p2" cx="180" cy="54" rx="14" ry="8"/>
    <circle data-part="pituitary" class="p1" cx="174" cy="72" r="7"/>
    <circle data-part="pineal" class="p4" cx="198" cy="50" r="5"/>
    <path data-part="thyroid" class="p3" d="M160 116C150 106 156 130 170 130C175 130 178 126 180 124C182 126 185 130 190 130C204 130 210 106 200 116C196 118 188 120 180 120C172 120 164 118 160 116Z"/>
    <g data-part="parathyroid"><circle class="p2" cx="164" cy="114" r="3.5"/><circle class="p2" cx="166" cy="126" r="3.5"/><circle class="p2" cx="196" cy="114" r="3.5"/><circle class="p2" cx="194" cy="126" r="3.5"/></g>
    <path data-part="thymus" class="p6" d="M166 146C158 170 166 196 180 200C194 196 202 170 194 146Z"/>
    <g class="faint-fill"><ellipse cx="140" cy="262" rx="14" ry="24"/><ellipse cx="220" cy="262" rx="14" ry="24"/></g>
    <g data-part="adrenal"><path class="p5" d="M128 238L140 226L152 238Z"/><path class="p5" d="M208 238L220 226L232 238Z"/></g>
    <path data-part="pancreas" class="p4" d="M150 284C176 276 214 280 236 288L234 298C212 292 178 290 152 296Z"/>
    <g data-part="gonads"><ellipse class="p1" cx="150" cy="360" rx="12" ry="8"/><ellipse class="p1" cx="210" cy="360" rx="12" ry="8"/></g>`),

  urinary: svg('0 0 560 380', 'Urinary system and nephron', `
    <g data-part="kidney"><path class="p1" d="M60 60C30 64 26 150 64 156C80 158 84 140 78 120C74 104 82 94 90 92C96 70 80 58 60 60Z"/><path class="p1" d="M220 60C250 64 254 150 216 156C200 158 196 140 202 120C206 104 198 94 190 92C184 70 200 58 220 60Z"/></g>
    <g data-part="ureter"><path class="tube" d="M86 120C110 180 120 230 124 268M194 120C170 180 160 230 156 268"/></g>
    <path data-part="bladder" class="p3" d="M100 262C100 300 180 300 180 262C180 250 100 250 100 262Z"/>
    <rect data-part="urethra" class="p5" x="134" y="294" width="12" height="60" rx="5"/>
    <text class="tx faint" x="140" y="374" text-anchor="middle">urinary tract</text><text class="tx faint" x="420" y="374" text-anchor="middle">one nephron</text>
    <circle data-part="glomerulus" class="p2" cx="330" cy="70" r="20"/>
    <path data-part="bowman" class="ring" d="M330 40C304 40 300 100 330 100C352 100 358 84 356 76"/>
    <path data-part="pct" class="tube" d="M356 76C390 60 410 90 390 104C372 118 400 134 420 126"/>
    <path data-part="loop" class="tube" d="M420 126V300C420 318 444 318 444 300V150"/>
    <path data-part="dct" class="tube" d="M444 150C460 130 470 110 452 96C436 84 456 64 480 70"/>
    <path data-part="collecting" class="tube wide" d="M500 40V340"/>`),

  'cell-adapt': svg('0 0 580 240', 'Cellular adaptations', `
    <text class="tx" x="50" y="20" text-anchor="middle">Normal</text>
    <g transform="translate(10 40)" class="faint-cells"><rect width="36" height="36" rx="6"/><rect x="40" width="36" height="36" rx="6"/><rect y="40" width="36" height="36" rx="6"/><rect x="40" y="40" width="36" height="36" rx="6"/><circle cx="18" cy="18" r="6" class="nuc"/><circle cx="58" cy="18" r="6" class="nuc"/><circle cx="18" cy="58" r="6" class="nuc"/><circle cx="58" cy="58" r="6" class="nuc"/></g>
    <g data-part="hypertrophy" transform="translate(110 30)"><rect class="p1" width="96" height="96" rx="12"/><circle class="nuc" cx="48" cy="48" r="10"/></g>
    <g data-part="hyperplasia" transform="translate(220 40)"><rect class="p3" width="24" height="24" rx="4"/><rect class="p3" x="26" width="24" height="24" rx="4"/><rect class="p3" x="52" width="24" height="24" rx="4"/><rect class="p3" y="26" width="24" height="24" rx="4"/><rect class="p3" x="26" y="26" width="24" height="24" rx="4"/><rect class="p3" x="52" y="26" width="24" height="24" rx="4"/><rect class="p3" y="52" width="24" height="24" rx="4"/><rect class="p3" x="26" y="52" width="24" height="24" rx="4"/><rect class="p3" x="52" y="52" width="24" height="24" rx="4"/></g>
    <g data-part="atrophy" transform="translate(320 56)"><rect class="p4" width="20" height="20" rx="4"/><rect class="p4" x="24" width="20" height="20" rx="4"/><rect class="p4" y="24" width="20" height="20" rx="4"/><rect class="p4" x="24" y="24" width="20" height="20" rx="4"/></g>
    <g data-part="metaplasia" transform="translate(390 40)"><rect class="p6" width="18" height="70" rx="4"/><rect class="p6" x="20" width="18" height="70" rx="4"/><path class="p5" d="M44 50h40v10H44zM44 38h40v10H44zM44 62h40v10H44z"/></g>
    <g data-part="dysplasia" transform="translate(490 36)"><rect class="p2" width="30" height="22" rx="6"/><rect class="p2" x="34" y="4" width="22" height="34" rx="9"/><rect class="p2" y="26" width="26" height="40" rx="5"/><rect class="p2" x="30" y="42" width="34" height="26" rx="10"/><circle class="nuc" cx="15" cy="11" r="7"/><circle class="nuc" cx="45" cy="20" r="9"/><circle class="nuc" cx="13" cy="46" r="10"/><circle class="nuc" cx="47" cy="55" r="6"/></g>
    <text class="tx faint" x="290" y="200" text-anchor="middle">Select a tissue sample to identify the adaptation.</text>`),

  inflammation: svg('0 0 540 320', 'Acute inflammation', `
    <rect data-part="vessel" class="pr" x="20" y="40" width="500" height="90" rx="10"/>
    <g data-part="endothelium"><path class="edge" d="M20 40H520M20 130H520"/></g>
    <g class="faint-cells"><ellipse cx="80" cy="85" rx="16" ry="10"/><ellipse cx="160" cy="70" rx="16" ry="10"/><ellipse cx="420" cy="80" rx="16" ry="10"/></g>
    <g data-part="neutrophil"><circle class="p6" cx="240" cy="118" r="14"/><circle class="p6" cx="300" cy="120" r="14"/></g>
    <g data-part="diapedesis"><path class="p6" d="M352 112C368 112 372 126 366 134C362 146 368 156 360 166C350 172 340 164 342 152C344 140 336 130 340 120C344 114 348 112 352 112Z"/></g>
    <g data-part="edema"><path class="drop" d="M130 136C126 150 136 156 140 148C142 142 136 138 130 136ZM190 140C186 154 196 160 200 152C202 146 196 142 190 140ZM460 140C456 154 466 160 470 152C472 146 466 142 460 140Z"/></g>
    <g data-part="mast"><circle class="p4" cx="100" cy="230" r="26"/><g class="granule"><circle cx="90" cy="222" r="4"/><circle cx="104" cy="236" r="4"/><circle cx="112" cy="220" r="4"/><circle cx="134" cy="210" r="3"/><circle cx="140" cy="226" r="3"/></g></g>
    <g data-part="bacteria"><rect class="p2" x="400" y="240" width="22" height="10" rx="5"/><rect class="p2" x="430" y="256" width="22" height="10" rx="5" transform="rotate(30 441 261)"/><rect class="p2" x="452" y="232" width="22" height="10" rx="5"/></g>
    <g data-part="macrophage"><path class="p5" d="M300 230C320 210 360 216 366 236C372 258 350 276 326 272C300 270 286 248 300 230Z"/></g>
    <text class="tx faint" x="270" y="304" text-anchor="middle">tissue (injury site)</text>`),

  'body-planes': svg('0 0 480 420', 'Directional terms and body planes', `${defs}
    <g class="faint-fill"><circle cx="150" cy="54" r="24"/><path d="M120 84H180L190 210H110Z"/><path d="M118 88L84 200L96 204L128 110Z"/><path d="M182 88L216 200L204 204L172 110Z"/><path d="M114 210H148L144 380H118Z"/><path d="M152 210H186L182 380H156Z"/></g>
    <g data-part="superior">${arrow('M40 120V40')}<text class="tx sm" x="10" y="34">superior</text></g>
    <g data-part="inferior">${arrow('M40 260V340')}<text class="tx sm" x="10" y="358">inferior</text></g>
    <g data-part="medial">${arrow('M240 150H164')}<text class="tx sm" x="244" y="154">medial</text></g>
    <g data-part="lateral">${arrow('M200 300H250')}<text class="tx sm" x="254" y="304">lateral</text></g>
    <g data-part="proximal"><circle class="node" cx="94" cy="104" r="7"/><text class="tx sm" x="34" y="94">proximal</text></g>
    <g data-part="distal"><circle class="node" cx="88" cy="196" r="7"/><text class="tx sm" x="44" y="222">distal</text></g>
    <g data-part="sagittal"><path class="plane" d="M150 20V400"/></g>
    <g data-part="transverse"><path class="plane" d="M90 150H210"/></g>
    <g class="faint-fill" transform="translate(300 0)"><circle cx="90" cy="54" r="24"/><path d="M70 84H112L118 210H66Z"/><path d="M72 210H112L108 380H78Z"/></g>
    <g data-part="anterior">${arrow('M390 150H340')}<text class="tx sm" x="306" y="140">anterior</text></g>
    <g data-part="posterior">${arrow('M410 150H460')}<text class="tx sm" x="420" y="140">posterior</text></g>
    <g data-part="frontal"><path class="plane" d="M390 20V400"/></g>`),

  plug: svg('0 0 460 280', 'Grounded receptacle and wiring', `
    <rect class="faint-fill" x="20" y="20" width="200" height="240" rx="16"/>
    <g data-part="hot"><rect class="slot" x="62" y="60" width="8" height="34" rx="2"/><rect class="slot" x="62" y="160" width="8" height="34" rx="2"/><path class="wire-hot" d="M220 90H300"/><circle class="screw-b" cx="306" cy="90" r="9"/><text class="tx sm" x="322" y="94">black · hot</text></g>
    <g data-part="neutral"><rect class="slot" x="166" y="56" width="10" height="42" rx="2"/><rect class="slot" x="166" y="156" width="10" height="42" rx="2"/><path class="wire-neutral" d="M220 140H300"/><circle class="screw-s" cx="306" cy="140" r="9"/><text class="tx sm" x="322" y="144">white · neutral</text></g>
    <g data-part="ground"><path class="slot" d="M110 112a10 10 0 0 1 20 0v12h-20z"/><path class="slot" d="M110 212a10 10 0 0 1 20 0v12h-20z"/><path class="wire-ground" d="M220 190H300"/><circle class="screw-g" cx="306" cy="190" r="9"/><text class="tx sm" x="322" y="194">green/bare · ground</text></g>`),

  pulseox: svg('0 0 480 280', 'Pulse oximeter', `
    <path data-part="probe" class="p6" d="M40 40H300C320 40 330 60 330 76V100H40ZM40 180H330V204C330 220 320 240 300 240H40Z"/>
    <path data-part="tissue" class="p3" d="M20 100H330C360 100 372 120 372 140C372 160 360 180 330 180H20Z"/>
    <g data-part="artery"><path class="vessel-r wide" d="M20 128H350"/></g>
    <g data-part="vein"><path class="vessel-b wide" d="M20 154H340"/></g>
    <g data-part="led"><rect class="p2" x="180" y="78" width="26" height="16" rx="4"/><rect class="p4" x="212" y="78" width="26" height="16" rx="4"/><path class="beam" d="M193 96V180M225 96V180"/></g>
    <rect data-part="detector" class="p5" x="190" y="184" width="44" height="16" rx="4"/>
    <g data-part="pleth"><path class="trace" d="M360 260C372 230 384 230 392 250C398 262 404 262 410 252C420 230 432 230 440 250C446 262 452 262 458 252"/></g>`),

  network: svg('0 0 580 300', 'Medical device network', `${defs}
    ${box('devices', 20, 20, 150, 50, 'Monitors · pumps', 'p6')}
    ${box('wifi', 20, 120, 150, 44, 'Wi-Fi access point', 'p3')}
    ${box('switch', 210, 120, 150, 44, 'Switch · device VLAN', 'p4')}
    ${box('gateway', 210, 20, 150, 50, 'Device gateway', 'p1')}
    ${box('engine', 400, 20, 160, 50, 'Interface engine (HL7)', 'p5')}
    ${box('ehr', 400, 120, 160, 44, 'EHR server', 'p2')}
    ${box('firewall', 210, 226, 150, 44, 'Firewall', 'p2')}
    ${box('internet', 400, 226, 160, 44, 'Internet / vendors', 'p6')}
    ${arrow('M95 70V118')}${arrow('M170 142H208')}${arrow('M285 120V72')}${arrow('M360 45H398')}${arrow('M480 70V118')}${arrow('M285 164V224')}${arrow('M360 248H398')}`),

  bitewing: svg('0 0 540 280', 'Bitewing radiograph (simulated)', `
    <rect class="xr-bg" width="540" height="280" rx="14"/>
    <g data-part="bone"><path class="xr-bone" d="M20 30H520V60H20ZM20 220H520V250H20Z"/></g>
    <g data-part="dentin"><path class="xr-dentin" d="M50 60C50 100 60 128 70 134H190C200 128 210 100 210 60ZM220 60C220 100 230 128 240 134H360C370 128 380 100 380 60ZM390 60C390 100 400 128 410 134H500V60ZM50 220C50 180 60 152 70 146H190C200 152 210 180 210 220ZM220 220C220 180 230 152 240 146H360C370 152 380 180 380 220ZM390 220C390 180 400 152 410 146H500V220Z"/></g>
    <g data-part="enamel"><path class="xr-enamel" d="M70 134H190C200 128 204 116 206 104C190 120 80 120 56 104C58 116 62 128 70 134ZM240 134H360C370 128 374 116 376 104C360 120 250 120 226 104C228 116 232 128 240 134ZM70 146H190C200 152 204 164 206 176C190 160 80 160 56 176C58 164 62 152 70 146ZM240 146H360C370 152 374 164 376 176C360 160 250 160 226 176C228 164 232 152 240 146Z"/></g>
    <g data-part="pulp"><path class="xr-pulp" d="M110 60V96C110 108 150 108 150 96V60ZM280 60V96C280 108 320 108 320 96V60ZM110 220V184C110 172 150 172 150 184V220ZM280 220V184C280 172 320 172 320 184V220Z"/></g>
    <path data-part="restoration" class="xr-metal" d="M420 96C420 120 440 128 470 128H500V96C480 90 440 90 420 96Z"/>
    <ellipse data-part="caries" class="xr-pulp" cx="214" cy="124" rx="9" ry="7"/>
    <path data-part="crest" class="xr-crest" d="M210 220L216 196L222 220Z"/>`),

  eye: svg('0 0 460 280', 'Eye in cross-section', `
    <circle data-part="sclera" class="p6" cx="250" cy="140" r="110"/>
    <circle data-part="retina" class="p2" cx="250" cy="140" r="98"/>
    <circle data-part="vitreous" class="fluid" cx="250" cy="140" r="90"/>
    <path data-part="cornea" class="p4" d="M150 92C112 110 112 170 150 188L156 180C126 164 126 116 156 100Z"/>
    <path data-part="aqueous" class="fluid2" d="M156 100C128 116 128 164 156 180L160 160V120Z"/>
    <g data-part="iris"><rect class="p5" x="156" y="94" width="8" height="34" rx="3"/><rect class="p5" x="156" y="152" width="8" height="34" rx="3"/></g>
    <rect data-part="pupil" class="dk" x="156" y="128" width="8" height="24"/>
    <ellipse data-part="lens" class="lens" cx="182" cy="140" rx="16" ry="36"/>
    <circle data-part="macula" class="p1" cx="344" cy="146" r="9"/>
    <path data-part="optic" class="p3" d="M342 162C360 170 380 178 440 190V214C380 204 352 196 332 182Z"/>`),
};
