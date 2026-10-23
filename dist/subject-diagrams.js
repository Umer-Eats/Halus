// Original Valus teaching schematics; labels explain simplifications and scope in each lesson.
const svg=(label,body)=>`<svg class="lw-svg" viewBox="0 0 560 360" role="img" aria-label="${label}">${body}</svg>`;
const box=(id,x,y,w,h,label,cls='p1')=>`<g data-part="${id}"><rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/><text class="tx" x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle">${label}</text></g>`;
const line=(x,y,xx,yy)=>`<path class="branch" d="M${x} ${y}L${xx} ${yy}"/><path class="branch" d="M${xx-5} ${yy-7}L${xx} ${yy}L${xx+5} ${yy-7}"/>`;
export const SUBJECT_DIAGRAMS={
 'information-pyramid':svg('From observations to a reasoned decision',`
 <g data-part="wisdom"><path class="p4" d="M280 20L350 90H210Z"/><text class="tx" x="280" y="72" text-anchor="middle">Decision</text></g>
 <g data-part="knowledge"><path class="p3" d="M210 100H350L410 165H150Z"/><text class="tx" x="280" y="142" text-anchor="middle">Knowledge</text></g>
 <g data-part="information"><path class="p2" d="M150 175H410L470 240H90Z"/><text class="tx" x="280" y="215" text-anchor="middle">Information</text></g>
 <g data-part="data"><path class="p1" d="M90 250H470L530 315H30Z"/><text class="tx" x="280" y="292" text-anchor="middle">Data + provenance</text></g>
 <text class="tx faint" x="280" y="345" text-anchor="middle">Context, validation and interpretation at every level</text>`),
 'quality-cycle':svg('Plan Do Study Act improvement cycle',`
 ${box('plan',35,40,200,85,'PLAN','p1')}${box('do',325,40,200,85,'DO','p2')}${box('study',325,230,200,85,'STUDY','p3')}${box('act',35,230,200,85,'ACT','p4')}
 <path class="branch" d="M240 80H315M305 72L315 80L305 88M425 133V220M417 210L425 220L433 210M315 270H245M255 262L245 270L255 278M135 220V135M127 145L135 135L143 145"/>
 <g data-part="measures"><circle class="p5" cx="280" cy="177" r="53"/><text class="tx" x="280" y="174" text-anchor="middle">MEASURES</text><text class="tx faint" x="280" y="192" text-anchor="middle">learn • adapt</text></g>`),
 'development-context':svg('Nested influences on development',`
 <g data-part="society"><rect class="p1" x="15" y="15" width="530" height="325" rx="25"/><text class="tx" x="280" y="45" text-anchor="middle">Policies, cultural values and historical change</text></g>
 <g data-part="community"><rect class="p2" x="50" y="70" width="460" height="245" rx="22"/><text class="tx" x="280" y="100" text-anchor="middle">Neighborhood, work and community resources</text></g>
 <g data-part="relationships"><rect class="p3" x="90" y="125" width="380" height="165" rx="20"/><text class="tx" x="280" y="156" text-anchor="middle">Caregivers, peers, school and their connections</text></g>
 <g data-part="person"><rect class="p4" x="158" y="183" width="244" height="80" rx="18"/><text class="tx" x="280" y="218" text-anchor="middle">Developing person</text><text class="tx faint" x="280" y="242" text-anchor="middle">biology • experience • agency</text></g>`),
 'word-map':svg('Medical term construction and interpretation',`
 ${box('prefix',20,45,150,75,'PREFIX','p1')}${box('root',205,45,150,75,'ROOT','p2')}${box('suffix',390,45,150,75,'SUFFIX','p3')}
 <text class="tx" x="187" y="90" text-anchor="middle">+</text><text class="tx" x="372" y="90" text-anchor="middle">+</text>
 ${line(95,125,95,170)}${line(280,125,280,170)}${line(465,125,465,170)}
 ${box('combining',95,175,370,60,'Combining vowels and spelling','p4')}${line(280,240,280,270)}${box('meaning',45,275,470,65,'Confirm the accepted complete meaning','p5')}`),
 'nutrient-pathways':svg('Absorbed nutrients enter different transport pathways',`
 ${box('carbs',15,20,165,60,'Carbohydrates','p1')}${box('protein',197,20,165,60,'Proteins','p2')}${box('fats',380,20,165,60,'Most dietary fats','p3')}
 ${line(97,85,97,120)}${line(280,85,280,120)}${line(462,85,462,120)}
 ${box('sugars',15,125,165,60,'Monosaccharides','p1')}${box('amino',197,125,165,60,'Amino acids','p2')}${box('lipids',380,125,165,60,'Lipid products','p3')}
 <path class="branch" d="M97 190V210H187V240M280 190V210H187M462 190V240"/>
 ${box('portal',20,245,330,70,'Portal blood → liver','p4')}${box('lymph',375,245,175,70,'Lymph → blood','p5')}
 <text class="tx faint" x="280" y="344" text-anchor="middle">Simplified small-intestinal absorption and transport</text>`)
};
