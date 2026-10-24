// Researched Persuasive Writing & Speaking lessons 6–10: drafting the paper, formatting and mechanics with the
// upload, turning the paper into a speech, persuasive delivery, and rehearsal and competition day.
const RULES=['HOSA Researched Persuasive Writing & Speaking 2026–27 guidelines and rating sheets','https://hosa.org/wp-content/uploads/2026/08/RPWS-26-27.pdf'];
const ARG=['Purdue OWL: Argumentative essays','https://owl.purdue.edu/owl/general_writing/academic_writing/essay_writing/argumentative_essays.html'];
const APA=['APA Style: References','https://apastyle.apa.org/style-grammar-guidelines/references'];
const UPLOAD=['HOSA: Competitive event digital uploads','https://hosa.org/competitive-event-digital-uploads/'];
const TM=['Toastmasters International: Public speaking tips','https://www.toastmasters.org/resources/public-speaking-tips'];
const FALL=['Purdue OWL: Logical fallacies','https://owl.purdue.edu/owl/general_writing/academic_writing/logic_in_argumentative_writing/fallacies.html'];
const BASICS=['FDA: The basics of drug ads','https://www.fda.gov/drugs/prescription-drug-advertising/basics-drug-ads'];
const q=(p,a,b,c,d,e)=>[p,[a,b,c,d],e];
const match=(title,pairs)=>({t:'w',kind:'match',title,pairs});
const order=(title,steps)=>({t:'w',kind:'order',title,steps});
const sort=(title,buckets,items)=>({t:'w',kind:'sort',title,buckets,items});
const flip=(title,cards)=>({t:'w',kind:'flip',title,cards});
const kase=(title,nodes)=>({t:'w',kind:'case',title,start:'a',nodes});
const chk=(q,options,why)=>({t:'check',q,options,why});
const ex=(title,prompt,steps,answer)=>({t:'example',title,prompt,steps,answer});

export const RW6={title:'Drafting the persuasive paper',hook:'With a thesis and outline, it is time to write. The rubric awards 10 points each for the opening statement, coverage and research, originality and conclusion, 5 for transitions and 20 for persuasiveness. In only two pages, every sentence must grab attention, prove a point or move the reader toward your conclusion.',objectives:['Write an opening that grabs attention and states the thesis.','Draft body paragraphs with evidence and analysis.','Show originality in argument and voice.','Write a concise, persuasive conclusion.'],sections:[
['The opening statement',[
'The top opening **grabs attention** and introduces the topic clearly. Begin with a **hook**—a striking statistic, a brief scenario, a provocative question or a vivid detail about drug ads—then provide brief **context** and end with your **thesis**.',
'Example hook: “Before the evening news ends, viewers may see several prescription drug ads—each promising a better life and racing through a list of side effects.”',
'Keep the opening to about four or five sentences in a two-page paper.',
'Make your stance unmistakable by the end of the paragraph.',
'Avoid starting with dictionary definitions or vague statements.',
"Write several hooks and test them on a classmate. Choose the one that most quickly makes them want to read your argument.",
sort('Strong or weak opening hook?',['Strong','Weak'],[['A vivid scene of a TV drug ad with rushed side effects',0],['“Webster’s dictionary defines advertising as…”',1],['A striking statistic from a credible source',0],['“This paper is about drug ads.”',1],['A provocative question tied to the thesis',0]])]],
['Body paragraphs',[
'Each body paragraph follows a pattern: **topic sentence** (the reason), **evidence** (data, research or expert statement with citation), **analysis** (why the evidence matters and how it supports your thesis) and a **link** back to the thesis.',
'Analysis is where persuasion happens—do not let evidence speak for itself. Explain the “so what.”',
'Use one or two strong pieces of evidence per paragraph rather than many weak ones.',
'Keep paragraphs focused on one reason each.',
'Each paragraph should be about 100–150 words in a two-page paper.',
"Use specific numbers and named sources in each paragraph. Specificity makes evidence more persuasive than general statements.",
order('Body paragraph pattern',['Topic sentence','Evidence with citation','Analysis of the evidence','Link to the thesis','Transition to the next paragraph'])]],
['Coverage and research quality',[
'**Coverage of the topic and quality of research** reward accurate, well-supported content. Define key terms, explain how DTC advertising works and is regulated, use credible and current sources and represent evidence accurately.',
'Show depth by explaining mechanisms—for example, how ads might shape patient requests and prescribing—rather than only listing claims.',
'Cite the FDA for regulatory facts and peer-reviewed research for effects.',
'Avoid unsupported generalizations.',
'Depth in fewer points beats shallow coverage of many.',
"Explain a mechanism in each body paragraph—how the advertising practice leads to the outcome you describe—so judges see the logic, not just the claim.",
"Use the FDA’s own terms, such as product claim ad and fair balance, so your coverage is precise and credible.",
chk('Which sentence best shows research quality?',['“According to the FDA, broadcast ads must include a major statement of the drug’s most important risks.”','“Everyone knows ads lie.”','“Ads are on TV a lot, I think.”','“Drug ads are bad.”'],'Accurate and cited.')]],
['Originality',[
'**Originality** rewards writing that reflects your own thinking and voice. Go beyond the most common arguments by offering a **fresh angle** (for example, the effect of ads on health literacy or on young adults), an **original example** or a **creative solution** (such as stricter standards or price transparency in ads).',
'Your analysis and synthesis of sources—connecting ideas in new ways—are original even when the facts come from research.',
'Avoid clichés and generic statements.',
'Your personal or community perspective can add originality when relevant.',
'Original work also protects against plagiarism concerns.',
"If you propose a solution, keep it realistic and connected to evidence, such as requiring clearer risk presentation or limiting ads for certain drug types.",
match('Common approach and original twist',[['“Ads raise costs.”','Explain how costs reach patients through insurance premiums'],['“Ads educate.”','Examine whether ads match viewers’ health literacy'],['“Ban ads.”','Propose specific stricter standards instead'],['“Ads show side effects.”','Analyze how visuals distract from spoken risks'],['“Other countries ban ads.”','Compare outcomes in a specific country'],['“Ads help awareness.”','Suggest public health alternatives']])]],
['Transitions',[
'**Transitions** (5 points) make writing easy to read and give it voice. Use them **between paragraphs** (“Beyond cost, these ads also shape how patients understand risks.”) and **within paragraphs** (“For example,” “However,” “As a result,” “In contrast”).',
'Good transitions show relationships: addition, contrast, cause and effect, example and conclusion.',
'Read the paper aloud to check that ideas flow smoothly.',
'Avoid repeating the same transition word.',
'Transitions also help listeners follow your speech.',
"Read the paper aloud once just to listen for flow. Places where you stumble often need a stronger transition.",
sort('Transition type',['Contrast','Cause and effect','Example'],[['However',0],['As a result',1],['For example',2],['In contrast',0],['Therefore',1],['For instance',2]])]],
['The conclusion',[
'A strong conclusion is **concise** and **summarizes** the argument. **Restate the thesis** in fresh words, briefly recall your main reasons and end with a **call to action** or a **memorable final thought**—for example, urging policymakers to restrict DTC ads or calling for clear risk and price information.',
'Do not introduce new evidence in the conclusion.',
'Echoing your opening hook creates a satisfying close.',
'Keep it to about four sentences.',
'The conclusion is worth 10 points and shapes the reader’s final impression.',
"After finishing the draft, highlight your thesis, topic sentences and conclusion. Reading only the highlighted sentences should summarize your whole argument.",
ex('A conclusion paragraph','Draft a conclusion (example).',['Restate thesis: “Prescription drug ads aimed at consumers cost more than they give.”','Summarize: they raise spending, drive brand-name demand and blur risks','Call to action: “Lawmakers should restrict DTC ads, as most countries already do.”','Final thought: echo the opening TV scene'],'A concise, persuasive close.')]],
['Practice scenario',[
kase('Draft review',{a:{text:'Your body paragraph lists three statistics with no explanation. (Scenario invented for practice.) What is missing?',choices:[['Analysis explaining why the evidence supports your thesis','b','Correct.',true],['More statistics','b','Explain the “so what.”',false]]},b:{text:'Your conclusion introduces a new study. What should you do?',choices:[['Move the study into a body paragraph and keep the conclusion as a summary and call to action','c','Correct.',true],['Leave it','c','Conclusions should not add new evidence.',false]]},c:{text:'Your draft is persuasive and well organized.',end:true}})]]
],takeaways:['Open with a hook, brief context and a clear thesis (opening is 10 points); avoid dictionary or vague openings.','Write body paragraphs with topic sentence, evidence, analysis and a link to the thesis (about 100–150 words each); show coverage and research quality with accurate, cited facts and originality through fresh angles and synthesis.','Use transitions between and within paragraphs (5 points) and a concise conclusion that restates the thesis, summarizes and calls to action without new evidence (10 points).'],terms:[['Analysis','Explaining how evidence supports your argument.'],['Synthesis','Combining ideas from sources in new ways.'],['Transition','A word or phrase that connects ideas.']],mcqs:[q('How many points is the opening statement worth in the paper?','10','5','20','15','Rubric.'),q('What should end the opening paragraph?','The thesis','The references','A new topic','A joke','Structure.'),q('What is analysis?','Explaining why evidence supports your thesis','Listing statistics','Repeating the thesis','Adding pictures','Definition.'),q('Which shows research quality?','A cited FDA fact about broadcast ad requirements','“Everyone knows ads lie.”','“I think ads are bad.”','“Ads are everywhere, probably.”','Quality.'),q('Which is a contrast transition?','However','For example','As a result','Therefore','Transitions.'),q('Should the conclusion add new evidence?','No','Yes','Only statistics','Always','Conclusion.'),q('How many points is originality worth?','10','5','20','15','Rubric.'),q('About how long is each body paragraph in a two-page paper?','About 100–150 words','About 500 words','About 10 words','About 1,000 words','Length.')],frq:{prompt:'Explain how you would draft a two-page persuasive paper that earns high scores for opening, coverage, originality, transitions and conclusion.',rubric:[['Opening',['hook','context','thesis','attention']],['Body',['topic sentence','evidence','analysis','link','citation']],['Coverage and originality',['define','regulation','credible','fresh angle','synthesis','solution']],['Transitions and conclusion',['transitions','however','restate','summarize','call to action','no new evidence']]],model:'I would open with a vivid hook: “Before the evening news ends, viewers may see several prescription drug ads—each promising a better life and racing through a list of side effects,” followed by two sentences of context explaining that the United States is one of the few countries allowing direct-to-consumer prescription ads, and end with my thesis that companies should not advertise prescription drugs to consumers because the ads raise spending, drive brand-name demand and blur risks. Each body paragraph would follow the same pattern: a topic sentence stating the reason, one or two pieces of credible evidence with APA citations—such as FDA requirements for a major statement of risks and a peer-reviewed study on patient requests—analysis explaining why the evidence matters and a link back to the thesis, in about 120 words each. To show coverage and research quality, I would define DTC advertising and fair balance accurately and explain how ads can shape prescribing conversations. For originality, I would add a fresh angle on how fast-paced visuals distract from spoken risk information and propose specific alternatives, such as public health campaigns. I would connect ideas with transitions like “Beyond cost,” “However” and “As a result.” My conclusion would restate the thesis in fresh words, briefly summarize my reasons, call on lawmakers to restrict DTC ads as most countries already do and echo the opening TV scene, without adding new evidence.'},sources:[RULES,ARG]};

export const RW7={title:'Formatting, mechanics, references and upload',hook:'Twenty-five points in the paper rubric depend on details: title page, transitions, grammar, spelling and punctuation, formatting and references. Grammar and spelling earn full points only with zero errors. Careful formatting and proofreading protect easy points—and a single, correct PDF ensures judges see your work at all.',objectives:['Format the title page and body exactly.','Proofread for zero grammar, spelling and punctuation errors.','Prepare a clean APA reference page.','Upload one correct PDF by the deadline.'],sections:[
['The title page',[
'The **title page** is centered and one page only. It includes the **event name**, **your name**, **HOSA division**, **chapter number**, **school name**, **chartered association** and the **title of the paper including your topic stance**. Creative design or pictures may be used but do not affect the score.',
'The title page is worth 5 points; missing any required item can cost them.',
'A clear stance in the title, such as “Why Pharmaceutical Companies Should Not Advertise to Consumers,” helps judges understand your argument immediately.',
'Check spelling of your name, school and chapter number.',
'Do not put a running header or page number on the title page.',
"Make the title concise but specific; a reader should know your stance from the title alone.",
sort('Required on the title page?',['Required','Not required'],[['Event name',0],['Title including your stance',0],['Chapter number',0],['Your GPA',1],['Chartered association',0],['A photo of yourself',1]])]],
['Formatting the body',[
'The body is **two pages**, **one-sided**, **typed**, in **12-point Arial**, **double-spaced**, in **English**, with **1-inch margins** on **8½″ × 11″** paper. A **running header** with your **last name** and the **event name** appears at the **top left**, and the **page number** at the **top right** of each page except the title page.',
'Formatting is worth 5 points. Set up the template before you write so you can see true length as you draft.',
'Do not shrink margins, font or spacing to fit more words—edit instead.',
'Use print preview to check headers and page breaks.',
'Reference pages begin on page 4 (or later if needed).',
"Turn on the ruler and formatting marks in your word processor to confirm margins and spacing are set correctly.",
flip('Body formatting checklist',[['Length','Two pages'],['Font','12-point Arial'],['Spacing','Double-spaced'],['Margins','1 inch on all sides'],['Header left','Last name and event name'],['Header right','Page number']])]],
['Grammar, spelling and punctuation',[
'Grammar earns 5 points and spelling and punctuation earn 5 points—**zero errors** for full points. Common problems include **subject–verb agreement**, **run-on sentences**, **comma splices**, **apostrophe errors** (it’s versus its), **homophones** (their, there, they’re) and **inconsistent tense**.',
'Proofread in stages: once for grammar, once for spelling and punctuation and once for consistency. Read aloud, read backward sentence by sentence and ask at least two people to review.',
'Spell-check misses correctly spelled wrong words.',
'Check names of organizations and drug-related terms.',
'Take a break before final proofreading to see errors freshly.',
"Read the paper once only for punctuation, looking at commas, apostrophes and end marks in each sentence.",
match('Error and correction',[['“Its a costly practice.”','“It’s a costly practice.”'],['“The ads is everywhere.”','“The ads are everywhere.”'],['Comma splice joining two sentences','Use a period or semicolon'],['“Their are many ads.”','“There are many ads.”'],['Mixed past and present tense','Choose one tense consistently'],['Missing comma after an introductory phrase','Add the comma']])]],
['The reference page',[
'List all literature cited in **APA** style on the reference page, starting on a new page after the body. Formatting of references is **not judged**, but a **clean, legible** reference page earns 5 points.',
'Alphabetize entries, use consistent formatting and include enough information for judges to find each source. Make sure every in-text citation matches an entry.',
'Include sources used in your speech too, since the references guide both.',
'Double-check URLs and DOIs.',
'Use a hanging indent if possible for readability.',
"Each reference should allow a judge to locate the source. Include authors, dates, titles and URLs or DOIs whenever available.",
ex('APA reference examples','Format two references (examples).',['Web page: U.S. Food and Drug Administration. (n.d.). *The basics of drug ads*. https://www.fda.gov/drugs/prescription-drug-advertising/basics-drug-ads','Journal: Author, A. A., & Author, B. B. (Year). Title of article. *Journal Name, 12*(3), 45–60. https://doi.org/…','Alphabetize by author or organization'],'Clean, consistent APA references.')]],
['Avoiding plagiarism',[
'The paper must be your own work; **no plagiarism** is allowed under the GRRs. Paraphrase in your own words and cite, quote exact words with quotation marks and citations and never submit work written by someone else or by an AI tool as your own.',
'Check your draft against your notes to ensure every borrowed idea is cited.',
'If you are unsure whether something needs a citation, cite it.',
'Keep drafts and notes as evidence of your process.',
'Integrity is part of professionalism in health care.',
chk('You used an idea from an article but changed the wording. What must you do?',['Cite the article','Nothing, since the words changed','Remove all citations','Claim it as your own idea'],'Ideas need citations too.')]],
['Creating and uploading the PDF',[
'Combine the title page, body and reference page(s) into **one PDF**. Upload to the HOSA Digital Upload System by **May 15 at midnight EST**—no exceptions. If it is not a single PDF, judges will not view it and no points are awarded.',
'Open the final PDF to check fonts, headers, page numbers and page order. If your state used the upload system, upload again for ILC. Competitors who do not upload cannot give the Round Two speech.',
'Upload early to avoid technical problems.',
'Name the file clearly and save a backup.',
'Confirm the upload was received.',
"After uploading, check that the file opens correctly and that it is the final version. Keep a dated copy on your device.",
order('Final submission steps',['Proofread the full paper','Check title page and formatting','Check references','Export one combined PDF','Open and review the PDF','Upload before May 15 and confirm'])]],
['Practice scenario',[
kase('Final checks',{a:{text:'Spell-check found no errors, but you wrote “there argument” instead of “their argument.” (Scenario invented for practice.) What does this show?',choices:[['Spell-check misses homophone errors—proofread aloud and have others review','b','Correct.',true],['Spell-check is always enough','b','Human proofreading is essential.',false]]},b:{text:'Your body runs onto a third page. What do you do?',choices:[['Edit content to fit two pages without changing font or margins','c','Correct.',true],['Change to 10-point font','c','Formatting rules are fixed.',false]]},c:{text:'Your paper is polished and correctly submitted.',end:true}})]]
],takeaways:['The centered, one-page title page lists event, name, division, chapter number, school, chartered association and a title with your stance (5 points); the two-page body uses 12-point Arial, double-spacing, 1-inch margins and a header with last name, event and page number (5 points).','Grammar and spelling/punctuation each earn 5 points only with zero errors—proofread in stages, read aloud and ask two reviewers; spell-check misses homophones.','Include a clean, alphabetized APA reference page (5 points), avoid plagiarism by citing ideas and quotes and upload one combined PDF by May 15 at midnight EST.'],terms:[['Running header','Text at the top of each body page with last name and event.'],['Comma splice','Two sentences incorrectly joined by a comma.'],['Homophone','A word that sounds like another but differs in meaning.']],mcqs:[q('What must the title page include?','A title with your topic stance','Your GPA','A selfie','Your address','Rule.'),q('How many pages is the body?','Two','Four','One','Five','Rule.'),q('What font and size are required?','12-point Arial','10-point Times','14-point Calibri','Any','Rule.'),q('Where does the page number go?','Top right','Bottom center','Top left','Nowhere','Rule.'),q('Is reference formatting judged?','No, but a clean, legible page earns points','Yes, strictly','Only the font','Only the URLs','Rule.'),q('Grammar earns full points with:','Zero errors','Three errors','Five errors','Any number','Rubric.'),q('Which sentence is correct?','“It’s a costly practice.”','“Its a costly practice.”','“Their are many ads.”','“The ads is everywhere.”','Mechanics.'),q('How must the paper be uploaded?','As one combined PDF','As separate files','As images','By email','Rule.')],frq:{prompt:'Explain how you would format, proofread, reference and submit your RPWS paper to earn every mechanics point.',rubric:[['Title page and format',['title page','stance','centered','arial','double-spaced','header','page number']],['Proofreading',['zero errors','grammar','spelling','aloud','reviewers','homophones']],['References and integrity',['apa','alphabetize','clean','cite','plagiarism']],['Upload',['one pdf','may 15','check','upload again','backup']]],model:'My title page would be centered on one page and include the event name, my name, HOSA division, chapter number, school, chartered association and the title “Why Pharmaceutical Companies Should Not Advertise Prescription Drugs to Consumers,” which shows my stance. I would set up a template for the two-page body before writing: one-sided, typed, 12-point Arial, double-spaced, 1-inch margins on letter paper, with a running header showing my last name and the event name at the top left and the page number at the top right, and no header on the title page. If my draft ran long, I would edit content rather than changing fonts or margins. To earn full grammar, spelling and punctuation points, I would proofread in stages—grammar, then spelling and punctuation, then consistency—reading aloud and backward sentence by sentence, checking homophones such as their and there and apostrophes in it’s and its, and asking my advisor and an English teacher to review it. My reference page would begin after the body, listing every source in clean, alphabetized APA format, including the FDA’s basics of drug ads page and peer-reviewed studies, with every in-text citation matching an entry. I would cite every borrowed idea and quotation to avoid plagiarism. Finally, I would combine the title page, body and references into one PDF, open it to check fonts, headers and page order, upload it well before May 15 at midnight EST, confirm it was received and keep a backup.'},sources:[RULES,APA,UPLOAD]};

export const RW8={title:'Turning the paper into a speech',hook:'Your paper and speech share the same main ideas, but they are not the same text. A speech is heard once, so it needs a stronger opening, clearer signposts, fewer statistics and more vivid language. In five minutes, you can elaborate on your paper’s arguments and connect with judges in ways writing cannot.',objectives:['Adapt the paper’s structure for listeners.','Write an attention-grabbing introduction and strong conclusion.','Select and explain evidence for the ear.','Address counterarguments in a speech.'],sections:[
['Same ideas, different form',[
'The guidelines say the speech **may or may not be worded exactly** as the paper, but the **main ideas must remain the same**. You may **elaborate**—adding examples, explanations or stories that did not fit in two pages.',
'Speeches use shorter sentences, more repetition, signposts and vivid images. Five minutes is about **600–700 spoken words**, slightly more than your paper’s body.',
'Keep your thesis and main reasons identical so judges see consistency.',
'Use the extra time for elaboration, not new arguments.',
'Remember: only notecards may be used—not the paper.',
"Write the speech as an outline of key phrases rather than a full script, then practice speaking from it. This keeps your delivery natural.",
sort('Allowed in the speech?',['Allowed','Not allowed'],[['Elaborating with an additional example',0],['Changing your stance from the paper',1],['Rewording ideas for listeners',0],['Reading the paper aloud from the page',1],['Using notecards with key points',0]])]],
['The introduction',[
'The speech introduction (15 points) should **grab attention**, introduce the topic and state your **thesis** clearly. Use a hook suited to listening: a short scenario (“Picture yourself on the couch when an ad promises…”), a striking statistic stated simply or a direct question.',
'Then briefly preview your reasons so listeners know what to expect.',
'Memorize the introduction so you can deliver it with eye contact.',
'Keep it to about 45 seconds.',
'Make your stance unmistakable early.',
"A personal connection—such as noticing drug ads during family television time—can make your introduction relatable, as long as it is genuine.",
ex('A speech introduction','Draft an introduction (example).',['Hook: “Picture yourself on the couch as an ad shows a smiling family hiking—while a narrator rushes through side effects.”','Context: “The U.S. is one of only two high-income countries allowing these ads.”','Thesis: “Pharmaceutical companies should not advertise prescription drugs to consumers.”','Preview: “Here’s why: cost, brand-name pressure and blurred risks.”'],'A vivid, clear opening for listeners.')]],
['Evidence for the ear',[
'Choose your **strongest** evidence and explain it simply. Round numbers, translate them into relatable terms and name sources orally: “A study in a major medical journal found…” or “According to the FDA…”',
'Limit statistics to one per point; listeners cannot reread. Use stories and examples to make evidence memorable.',
'Coverage and research quality (15 points) still matter, so cite sources accurately.',
'Explain why each piece of evidence matters.',
'Speak numbers slowly and clearly.',
"Translate numbers into everyday comparisons. For example, compare advertising spending to something listeners understand, such as the cost of a familiar program, if you have accurate data.",
"Choose evidence that is easy to picture. A finding about what patients ask their doctors is more vivid than a complex percentage table.",
chk('How should you present a statistic in a speech?',['Round it, explain it simply and name the source aloud','Read a long table of numbers','Skip the source','Say it as fast as possible'],'Clear for listeners.')]],
['Signposts and structure',[
'Use clear **signposts**: “My first reason is…,” “Second…,” “Finally…,” “Some argue… but…” Signposts help judges follow your argument and score coverage and persuasiveness.',
'Structure the speech like the paper: introduction, two or three reasons, counterargument and refutation and conclusion.',
'Plan time: introduction about 45 seconds, each reason about one minute, counterargument about 45 seconds and conclusion about 45 seconds.',
'Repeat your thesis or a key phrase at transitions.',
'Signposts also help you remember your place.',
"Pause briefly at each signpost. The pause tells judges a new point is beginning and gives you a moment to check your notes.",
order('Speech structure',['Introduction with hook and thesis','Reason 1','Reason 2','Reason 3 or counterargument and refutation','Conclusion with call to action'])]],
['Addressing counterarguments aloud',[
'Acknowledge the strongest opposing view fairly: “Supporters say these ads help people recognize symptoms and seek care—and awareness does matter.” Then refute with evidence and reasoning: “But public health campaigns can raise awareness without steering patients toward expensive brands.”',
'Addressing counterarguments shows confidence and increases persuasiveness.',
'Keep the tone respectful.',
'Do not spend too long on the opposing view; return to your thesis quickly.',
'Practice this section so it sounds natural.',
"Choose the counterargument judges are most likely to think of. Answering the obvious objection makes your speech feel complete.",
match('Counterargument step and example',[['Acknowledge','“Supporters say ads raise awareness.”'],['Concede a valid point','“Awareness does matter.”'],['Refute','“But public campaigns can raise awareness without brand promotion.”'],['Evidence','Cite a study or official source'],['Return to thesis','“So the costs outweigh the benefits.”'],['Tone','Respectful and confident']])]],
['The conclusion',[
'The speech conclusion (15 points) **reviews the thesis** and main points and ends memorably—with a **call to action** or a final image that echoes your opening: “Next time an ad tells you to ask your doctor, ask a different question: Who really benefits?”',
'Signal the end clearly and slow down for the final line.',
'Do not introduce new arguments.',
'Memorize the conclusion for full eye contact.',
'Keep it to about 45 seconds and protect it in your timing.',
"Practice the conclusion so it can be shortened instantly if time runs low, keeping the thesis and final line.",
sort('Strong or weak conclusion?',['Strong','Weak'],[['Restating the thesis and ending with a memorable question',0],['“That’s all I have.”',1],['A call to action for policymakers',0],['Introducing a brand-new argument',1],['Echoing the opening TV scene',0]])]],
['Practice scenario',[
kase('Adapting the paper',{a:{text:'You plan to read your paper word for word as your speech. (Scenario invented for practice.) What is the problem?',choices:[['The paper cannot be brought, and written language needs adapting for listeners','b','Correct.',true],['Nothing; it is efficient','b','Adapt it into a speech with notecards.',false]]},b:{text:'You have five statistics in your first point. What do you do?',choices:[['Keep the strongest one, explain it simply and add an example','c','Correct.',true],['Read all five quickly','c','Listeners need clarity.',false]]},c:{text:'Your speech is clear, consistent and persuasive.',end:true}})]]
],takeaways:['The speech may be worded differently but must keep the paper’s main ideas; elaborate with examples within about 600–700 spoken words, using notecards only.','Write a memorized, attention-grabbing introduction with a clear thesis and preview (15 points) and a conclusion that reviews the thesis and ends with a call to action or echo (15 points).','Use one clear, sourced statistic per point, strong signposts, a planned time budget and a respectful acknowledge-and-refute counterargument.'],terms:[['Elaboration','Adding detail or examples to develop an idea.'],['Signpost','A phrase that marks where you are in a speech.'],['Concession','Acknowledging a valid point in the opposing view.']],mcqs:[q('Must the speech match the paper word for word?','No, but main ideas must stay the same','Yes, exactly','It can change stance','It must be about a new topic','Rule.'),q('May you bring the paper into the speech?','No','Yes','Only page 1','Only references','Rule.'),q('How many points is the speech introduction worth?','15','5','10','20','Rubric.'),q('About how many words is a five-minute speech?','About 600–700','About 100','About 2,000','About 50','Length.'),q('How many statistics per point work best in a speech?','About one, clearly explained','Five or more','None ever','Ten','Clarity.'),q('Which is a signpost?','“My first reason is…”','“Um…”','“Whatever…”','“Okay…”','Signposts.'),q('What should a speech conclusion avoid?','New arguments','Restating the thesis','A call to action','An echo of the opening','Conclusion.'),q('How should you treat the opposing view?','Acknowledge fairly, then refute','Ignore it','Mock it','Agree completely','Counterargument.')],frq:{prompt:'Explain how you would turn your two-page paper into a five-minute persuasive speech.',rubric:[['Consistency',['main ideas','same','elaborate','notecards','not the paper']],['Introduction and conclusion',['hook','thesis','preview','conclusion','call to action','echo']],['Evidence and structure',['statistic','source aloud','signposts','time','one minute']],['Counterargument',['acknowledge','concede','refute','respectful','return to thesis']]],model:'I would keep my paper’s thesis and three main reasons exactly the same while rewording and elaborating for listeners, since the speech must share the paper’s main ideas, and I could bring only notecards—not the paper. My introduction would open with a scenario: “Picture yourself on the couch as an ad shows a smiling family hiking while a narrator races through side effects,” followed by brief context that the United States is one of only two high-income countries allowing these ads, my thesis that pharmaceutical companies should not advertise prescription drugs to consumers and a preview of my reasons: cost, brand-name pressure and blurred risks. I would memorize it to deliver with eye contact in about 45 seconds. For each reason, I would use one strong, clearly explained statistic or study, named orally—“According to a study in a major medical journal…”—plus an example, using signposts like “My first reason is…” and spending about a minute on each. I would then acknowledge the strongest counterargument fairly—“Supporters say ads help people recognize symptoms, and awareness matters”—and refute it: “But public health campaigns can raise awareness without steering patients toward expensive brands.” My conclusion would review my thesis and reasons and echo the opening: “Next time an ad tells you to ask your doctor, ask a different question: Who really benefits?” I would plan the speech at about 650 words and 4 minutes 45 seconds.'},sources:[RULES,ARG,BASICS]};

export const RW9={title:'Persuasive delivery',hook:'Persuasiveness in the speech is worth 20 points—and delivery makes persuasion believable. A confident voice, strong presence and clear diction tell judges you believe your argument. This lesson focuses on delivering a persuasive message with conviction while staying credible and respectful.',objectives:['Use voice to emphasize persuasive points.','Project confidence through stage presence.','Speak with clear diction and minimal fillers.','Stay credible and respectful while persuading.'],sections:[
['Voice for persuasion',[
'Use your voice to highlight key moments: **slow down** and **lower your pitch** for your thesis, **pause** after a striking statistic, **raise energy** for your call to action. Vary pace and volume to avoid monotone.',
'Speak loudly enough for all judges to hear; there is no microphone guarantee, so practice projection.',
'Emphasize key words, such as “cost,” “risk” and “who benefits.”',
'Record rehearsals to check variety.',
'Your voice should sound confident, not aggressive.',
"Avoid speaking in a constant loud, intense tone. Contrast between calm explanation and energetic emphasis makes persuasion more powerful.",
"Mark emphasis on your notecards with underlines or bold letters so you remember which words to stress.",
"End your thesis sentence on a strong word, such as “risks” or “cost,” and pause after it to let it register.",
match('Vocal choice and persuasive effect',[['Slower pace on the thesis','Signals importance'],['Pause after a statistic','Lets it sink in'],['Raised energy on the call to action','Inspires action'],['Lower pitch','Conveys authority'],['Emphasis on key words','Highlights main ideas'],['Varied volume','Keeps listeners engaged']])]],
['Stage presence and confidence',[
'Stand tall, plant your feet and use purposeful gestures—an open hand when presenting evidence, a firm gesture for your thesis. Make eye contact with each judge, especially when stating your thesis and call to action.',
'Confidence comes from preparation: know your arguments well enough to speak naturally with minimal notes.',
'Avoid distracting movements such as pacing or fidgeting with notecards.',
'Facial expressions should match the seriousness of your message.',
'Stage presence is worth 5 points but affects persuasiveness too.',
"Let your face show conviction: a focused, serious expression when discussing risks and costs signals that you care about the issue.",
"Use a small step forward when stating your thesis or call to action. Purposeful movement draws attention to key moments.",
sort('Confident presence?',['Confident','Undermines confidence'],[['Steady eye contact during the thesis',0],['Reading from notecards the whole time',1],['Purposeful gestures for key points',0],['Rocking back and forth',1],['Planted feet and tall posture',0]])]],
['Diction and clarity',[
'Diction, pronunciation and grammar earn 5 points. Pronounce terms such as **pharmaceutical**, **direct-to-consumer**, **prescription** and organization names correctly. Articulate clearly and replace fillers with pauses.',
'Use precise, professional language; avoid slang and exaggerated claims.',
'Practice difficult words until they are natural.',
'Grammar mistakes in speech can reduce credibility.',
'Clear speech helps judges follow complex arguments.',
"Use complete sentences and correct grammar when speaking. Spoken grammar errors are noticed, especially in a persuasive speech.",
"Record yourself and count filler words. Each week, aim to reduce them by practicing transitions and pausing intentionally.",
ex('Practicing key terms','Warm up with topic vocabulary (example).',['Say slowly: “phar-ma-CEU-ti-cal”','Say: “direct-to-consumer advertising” three times','Say: “Office of Prescription Drug Promotion”','Use each term in a sentence aloud'],'Confident pronunciation of key terms.')]],
['Credibility while persuading',[
'Persuasive speakers stay **credible**: cite sources, acknowledge complexity, avoid exaggeration and treat opposing views and stakeholders respectfully. Saying “Drug companies are evil” undermines credibility; saying “The evidence suggests these ads prioritize sales over clarity” is persuasive and fair.',
'Judges—often health professionals—respond to measured, evidence-based passion.',
'Show conviction through tone and evidence, not insults.',
'Accuracy in every claim protects your credibility.',
'Respectful persuasion is a professional skill.',
"Acknowledging uncertainty—“evidence on this point is still developing”—can actually increase credibility when done honestly.",
"If you mention specific companies or ads, describe them factually and avoid assumptions about motives you cannot prove.",
chk('Which statement keeps credibility?',['“The evidence suggests these ads prioritize sales over clarity.”','“Drug companies are evil.”','“Everyone knows they lie.”','“Ads are the worst thing ever.”'],'Measured and evidence-based.')]],
['Using notecards',[
'Notecards (paper or electronic) are allowed; electronic notes are not shown to judges. Write **key words**, **statistics with sources** and **transitions**—not full sentences. Memorize the introduction and conclusion.',
'Glance down briefly and look up to speak. Number cards and hold them at waist level.',
'Practice with the same cards you will use.',
'Highlight the thesis and call to action.',
'Use cards less as rehearsals progress.',
"Number each card and keep them in order with a clip until you begin, so they do not get mixed up.",
"Practice with your notecards in business attire to make sure pockets, jackets or bags do not get in the way of handling them.",
order('Notecard set',['Card 1: introduction cues','Card 2: reason 1 with statistic and source','Card 3: reason 2','Card 4: counterargument and refutation','Card 5: conclusion cues'])]],
['Handling nerves and time',[
'Nerves are normal. Before speaking, breathe slowly, roll your shoulders and review your first line. During the speech, focus on your message and the judges.',
'Watch for the **one-minute announcement**; if it comes before your conclusion, move to it immediately. The timekeeper stops you at five minutes.',
'If you lose your place, pause, glance at your card and continue.',
'Arrive early and dress professionally.',
'Confidence grows with every rehearsal.',
"Plan what you will cut if you are running long, such as a secondary example, so you can adjust smoothly during the speech.",
"If you feel your voice shake at the start, slow down and take a breath—steady pacing calms both your voice and your nerves.",
sort('Good response?',['Good response','Poor response'],[['Moving to the conclusion at the one-minute warning',0],['Ignoring the warning and getting cut off',1],['Pausing calmly after losing your place',0],['Starting the speech over',1],['Breathing slowly before entering',0]])]],
['Practice scenario',[
kase('Delivery choices',{a:{text:'In rehearsal, you deliver your thesis quickly in a flat voice. (Scenario invented for practice.) How do you improve?',choices:[['Slow down, lower your pitch, make eye contact and pause after the thesis','b','Correct.',true],['Say it faster','b','Emphasis signals importance.',false]]},b:{text:'You want to call opponents “greedy liars.” What is better?',choices:[['Describe the evidence about the ads’ effects respectfully','c','Correct.',true],['Use the insult for impact','c','Insults damage credibility.',false]]},c:{text:'Your delivery is persuasive and credible.',end:true}})]]
],takeaways:['Use voice to emphasize the thesis (slower, lower pitch), pause after statistics, raise energy for the call to action and project clearly.','Show confident stage presence with tall posture, planted feet, purposeful gestures and eye contact; pronounce key terms correctly and replace fillers with pauses (voice, presence and diction are 5 points each).','Stay credible with sourced, measured, respectful arguments; use key-word notecards, memorize the introduction and conclusion and manage nerves and the one-minute warning.'],terms:[['Conviction','A firmly held belief shown through delivery.'],['Credibility','The trust listeners place in a speaker.'],['Emphasis','Stressing words or ideas to highlight importance.']],mcqs:[q('How should the thesis be delivered?','Slower with a lower pitch and eye contact','Very fast','In a whisper','While looking at notes','Voice.'),q('What should follow a striking statistic?','A pause','A joke','Faster speech','Silence for a minute','Pause.'),q('Which statement keeps credibility?','“The evidence suggests these ads prioritize sales over clarity.”','“Drug companies are evil.”','“They all lie.”','“Ads are the worst.”','Credibility.'),q('What should notecards include?','Key words, statistics with sources and transitions','The full paper','Nothing','Pictures for judges','Notes.'),q('What should you memorize?','The introduction and conclusion','Nothing','Only the references','Every statistic in order','Memory.'),q('If the one-minute warning comes before your conclusion, you should:','Move to the conclusion','Ignore it','Speak faster through all points','Stop','Timing.'),q('How many points is speech persuasiveness worth?','20','5','10','15','Rubric.'),q('Which word should you practice pronouncing?','Pharmaceutical','Cat','Dog','Sun','Diction.')],frq:{prompt:'Explain how you would deliver your RPWS speech persuasively and credibly.',rubric:[['Voice',['slow','pitch','pause','energy','projection','emphasis']],['Presence',['posture','gestures','eye contact','planted','confident']],['Diction and credibility',['pronounce','fillers','sources','respectful','measured','exaggeration']],['Notes and time',['notecards','key words','memorize','one-minute','nerves']]],model:'I would use my voice to highlight key moments: slowing down and lowering my pitch when stating my thesis that pharmaceutical companies should not advertise prescription drugs to consumers, pausing after my most striking statistic so it sinks in and raising my energy for my call to action, while projecting so every judge can hear. I would stand tall with planted feet, use an open-hand gesture when presenting evidence and a firm gesture for my thesis and make eye contact with each judge, especially during my thesis and conclusion, avoiding pacing or fidgeting. I would practice pronouncing terms such as pharmaceutical, direct-to-consumer and the FDA’s Office of Prescription Drug Promotion until they flow naturally, use precise, professional language and replace fillers with pauses. To stay credible, I would cite sources aloud, acknowledge that ads can raise awareness and describe evidence respectfully—“the evidence suggests these ads prioritize sales over clarity”—rather than insulting companies. My numbered notecards would contain key words, statistics with sources and transitions, with the thesis and call to action highlighted, and I would memorize my introduction and conclusion. Before speaking, I would breathe slowly and review my first line; during the speech, if the one-minute warning came before my conclusion, I would move straight to it, and if I lost my place, I would pause, glance at my card and continue.'},sources:[RULES,TM,FALL]};

export const RW10={title:'Rehearsal, refinement and competition day',hook:'A persuasive speech improves with every rehearsal—arguments sharpen, transitions smooth out and delivery grows more confident. This final lesson builds a rehearsal plan, shows how to use rubric-based feedback for both paper and speech and prepares you for competition day.',objectives:['Create a rehearsal schedule for the speech.','Use rubric-based feedback to refine content and delivery.','Simulate competition conditions.','Prepare for competition day.'],sections:[
['A rehearsal schedule',[
'Begin rehearsing at least a month before competition. **Weeks 1–2:** practice each section separately and refine wording. **Week 3:** full run-throughs with notecards, timed. **Week 4:** full run-throughs with minimal notes in competition conditions.',
'Short daily practice works better than occasional long sessions. Aim for three or more full run-throughs per week in the final weeks.',
'Rehearse standing and, at times, in professional attire.',
'Track time and one improvement goal for each rehearsal.',
'Re-read your paper weekly to keep main ideas consistent.',
"Change rehearsal locations occasionally so you can adapt to different rooms and acoustics.",
"Rehearse at the time of day your speech is scheduled, if possible, to get used to your energy level then.",
order('Four-week rehearsal plan',['Weeks 1–2: practice sections and refine wording','Week 3: timed full run-throughs with notecards','Week 4: competition-condition run-throughs','Final days: polish and rest'])]],
['Rubric-based feedback',[
'Give listeners the speech rubric and ask targeted questions: Was my introduction attention-grabbing and my thesis clear? Did I cover the topic with credible research? Was I persuasive? Was my conclusion strong? How were my voice, presence and diction?',
'Prioritize revisions by point value: persuasiveness (20), then introduction, coverage and conclusion (15 each), then delivery (5 each).',
'Seek varied listeners, including someone who disagrees with your stance—they will test your persuasiveness.',
'Record feedback in a log and look for patterns.',
'Thank listeners and act on key suggestions.',
"If listeners say your speech differs from your paper, check that your main ideas still match exactly.",
"Ask at least one listener to score you using the rubric’s numbers. Numerical feedback shows which items need the most work.",
match('Feedback question and rubric item',[['Did I convince you?','Persuasiveness (20)'],['Did the opening grab you?','Introduction (15)'],['Was the research credible?','Coverage and research (15)'],['Did the ending stick?','Conclusion (15)'],['Could you hear me clearly?','Voice (5)'],['Did I use fillers?','Diction (5)']])]],
['Testing persuasiveness',[
'Practice for a listener who **disagrees**. Ask them which argument was most convincing and which was weakest. Strengthen weak points with better evidence or clearer reasoning.',
'Anticipate questions or objections and make sure your counterargument section answers the strongest one.',
'A speech that persuades a skeptic is likely to persuade judges.',
'Keep your tone respectful even with strong opponents.',
'Revise only what improves persuasion; keep main ideas consistent with the paper.',
"After each skeptic rehearsal, write down the objection they raised and your best answer. These notes become a powerful study tool.",
"Rehearse answers to tough objections aloud, even though judges do not ask questions; it makes your counterargument section stronger and more confident.",
chk('Why rehearse for someone who disagrees with you?',['They reveal which arguments need strengthening','They will lower your score','They make practice shorter','It is not useful'],'Test persuasiveness.')]],
['Simulating competition',[
'Recreate the Round Two setting: judges at a table, a timekeeper who announces **one minute remaining** and stops you at **five minutes**, notecards only and professional attire. Practice entering, pausing, delivering and exiting.',
'Practice recovering from surprises—a lost place, a noise or an early time warning.',
'Simulate at least twice before competition.',
'Ask “judges” to keep neutral faces so you get used to it.',
'Review a recording of each simulation.',
"In the final days, focus on confidence and consistency rather than major rewrites.",
"Pack your notecards, photo ID and outfit the night before, and leave your paper at home or in your bag outside the room.",
ex('A simulation checklist','Plan a full simulation (example).',['Room set with judges at a table','Timekeeper announces one minute remaining and stops at five','Speaker in business attire with notecards','Deliver full speech','Debrief using the rubric'],'Realistic practice that builds confidence.')]],
['Competition day',[
'**Before:** confirm your appointment time and room; prepare your outfit and notecards; sleep well. **Bring:** photo ID and notecards (no paper or props). **Arrive early** and warm up your voice and body.',
'In the room, wait to be introduced, pause, make eye contact and begin. After your conclusion, pause, thank the judges if you wish and exit calmly.',
'Remember that your paper was pre-judged; focus on delivering your arguments persuasively.',
'Avoid discussing your speech near other competitors.',
'Reflect afterward on what went well.',
"Eat a balanced meal and drink water before your appointment so you have steady energy and a clear voice.",
"Remember that delivery is only part of the score. A clear, well-supported argument delivered calmly can outperform flashier speeches.",
order('Competition day',['Confirm time and room','Dress professionally','Bring photo ID and notecards','Arrive early and warm up','Pause, make eye contact and begin','Deliver and exit calmly'])]],
['After the event',[
'Reflect on the experience: Which arguments worked best? What would you change? Persuasive research, writing and speaking skills transfer to college essays, scholarship applications, debates and advocacy for health issues.',
'Keep your research for future projects and consider sharing your findings with your chapter.',
'Celebrate the work you completed.',
'Write down lessons learned while they are fresh.',
'Help future RPWS competitors in your chapter.',
"Consider using your research to write a letter to a local newspaper or to present at a chapter meeting, turning competition work into real advocacy.",
sort('Good after-event practice?',['Helpful','Not helpful'],[['Writing down lessons learned',0],['Throwing away all research',1],['Sharing tips with future competitors',0],['Never reflecting',1],['Using skills in future advocacy',0]])]],
['Practice scenario',[
kase('Final preparation',{a:{text:'A listener who disagrees says your cost argument is weak. (Scenario invented for practice.) What do you do?',choices:[['Strengthen it with clearer evidence and reasoning','b','Correct.',true],['Ignore the feedback','b','Skeptics reveal weak points.',false]]},b:{text:'On competition day, you realize you packed your paper instead of notecards. What should you do?',choices:[['Leave the paper outside and rely on your rehearsed points or quickly prepare notecards if time allows','c','Correct.',true],['Bring the paper in','c','The paper is not allowed in the speech.',false]]},c:{text:'You deliver a confident, persuasive speech.',end:true}})]]
],takeaways:['Rehearse over about four weeks—sections, timed run-throughs, then competition-condition practice—with three or more full run-throughs weekly near the end.','Use the speech rubric for feedback, prioritizing persuasiveness (20), then introduction, coverage and conclusion (15 each) and delivery; rehearse for skeptics to strengthen weak arguments.','Simulate competition (one-minute warning, five-minute stop, notecards only), bring photo ID and notecards (not the paper) on competition day and reflect afterward.'],terms:[['Run-through','A full rehearsal of the entire speech.'],['Skeptic','A listener who doubts your position.'],['Simulation','Practice that recreates competition conditions.']],mcqs:[q('When should you begin rehearsing?','At least a month before competition','The night before','Never','After competition','Plan.'),q('Which rubric item should revisions prioritize first?','Persuasiveness','Voice','Attire','Notecard color','Points.'),q('Why rehearse for someone who disagrees?','To find weak arguments','To lose points','To skip practice','It is not useful','Testing.'),q('What does the timekeeper do?','Announces one minute remaining and stops at five minutes','Reads your paper','Asks questions','Nothing','Rule.'),q('What should you bring to the speech?','Photo ID and notecards','Your paper','Props','Slides','Rule.'),q('How many full run-throughs per week are suggested near competition?','Three or more','None','One per year','Fifty','Plan.'),q('After the event, you should:','Reflect and write down lessons learned','Throw away research','Never think about it','Delete notes','Growth.'),q('Should the speech’s main ideas match the paper?','Yes','No','Only the title','Only the references','Rule.')],frq:{prompt:'Describe how you would rehearse, refine and deliver your RPWS speech on competition day.',rubric:[['Rehearsal plan',['month','sections','timed','run-throughs','weekly']],['Feedback',['rubric','persuasiveness','introduction','conclusion','skeptic','log']],['Simulation',['timekeeper','one minute','five minutes','notecards','attire','recording']],['Competition day',['photo id','notecards','no paper','arrive early','warm up','reflect']]],model:'I would begin rehearsing about a month before competition. In the first two weeks, I would practice each section separately—introduction, three reasons, counterargument and conclusion—refining wording for listeners while keeping my paper’s main ideas the same; in the third week, I would do timed full run-throughs with notecards; and in the final week, I would rehearse in competition conditions with minimal notes, aiming for at least three full run-throughs per week. I would give listeners the speech rubric and ask whether my introduction grabbed them, my thesis was clear, my research was credible, I was persuasive and my conclusion was memorable, and how my voice, presence and diction sounded. I would prioritize revisions by points: persuasiveness first, then introduction, coverage and conclusion, then delivery. I would also rehearse for a classmate who supports pharmaceutical advertising, asking which of my arguments was weakest and strengthening it with better evidence. At least twice, I would simulate Round Two with judges at a table, a timekeeper announcing one minute remaining and stopping me at five minutes and notecards only, recording each run and debriefing. On competition day, I would confirm my time and room, wear business attire, bring photo ID and notecards—not my paper—arrive early, warm up my voice and body, pause and make eye contact before beginning and exit calmly. Afterward, I would reflect on what worked and save my research.'},sources:[RULES,TM]};
