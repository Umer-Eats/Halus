// Prepared Speaking lessons 6–10: building a cohesive body, closing with impact, writing for the ear,
// delivery without a microphone, and rehearsal and competition day.
const RULES=['HOSA Prepared Speaking 2026–27 guidelines and rating sheet','https://hosa.org/wp-content/uploads/2026/08/Prepared-Speaking-26-27.pdf'];
const EDL=['eDynamic Learning: HOSA public speaking course','https://www.edynamiclearning.com/hosa/'];
const TM=['Toastmasters International: Public speaking tips','https://www.toastmasters.org/resources/public-speaking-tips'];
const STRAT=['Purdue OWL: Rhetorical strategies','https://owl.purdue.edu/owl/general_writing/academic_writing/establishing_arguments/rhetorical_strategies.html'];
const RHET=['Purdue OWL: Rhetorical situations','https://owl.purdue.edu/owl/general_writing/academic_writing/rhetorical_situation/index.html'];
const q=(p,a,b,c,d,e)=>[p,[a,b,c,d],e];
const match=(title,pairs)=>({t:'w',kind:'match',title,pairs});
const order=(title,steps)=>({t:'w',kind:'order',title,steps});
const sort=(title,buckets,items)=>({t:'w',kind:'sort',title,buckets,items});
const flip=(title,cards)=>({t:'w',kind:'flip',title,cards});
const kase=(title,nodes)=>({t:'w',kind:'case',title,start:'a',nodes});
const chk=(q,options,why)=>({t:'check',q,options,why});
const ex=(title,prompt,steps,answer)=>({t:'example',title,prompt,steps,answer});

export const PSP6={title:'Building a cohesive body',hook:'The body of your speech is where your message is proven and developed—and the rubric’s cohesion item (10 points) rewards a logical, coherent body with smooth transitions. In about three and a half minutes, you need two or three strong main points that build toward your closing.',objectives:['Choose an organizational pattern that fits the message.','Develop main points with support and explanation.','Write transitions that connect ideas.','Balance time across main points.'],sections:[
['Organizational patterns',[
'Choose a pattern that fits your message. **Problem–solution:** describe a problem with the current standard, then propose the new one. **Past–present–future:** show how the standard was, is and should be. **Three pillars:** present three qualities of the new standard. **Story arc:** follow one story through challenge and change, adding evidence along the way. **Cause–effect:** explain what causes a problem and what results.',
'Problem–solution and past–present–future fit “Redefine the Standard” naturally because they show change.',
'Choose one pattern and use it consistently.',
'Your preview in the opening should match the pattern.',
'A clear pattern helps judges follow and score cohesion.',
"Sketch your pattern as a simple outline before writing full sentences. Seeing the structure on one page helps you check that the logic flows.",
"Whatever pattern you choose, state it clearly in the preview so judges can follow the logic from the start.",
match('Pattern and example for the theme',[['Problem–solution','Patients feel unheard → listening as a new standard'],['Past–present–future','Speed-based care → today’s gaps → a listening standard'],['Three pillars','Listen, include, follow up'],['Story arc','Grandfather’s experience → change → lesson'],['Cause–effect','Rushed visits → patients unheard → poorer outcomes'],['Compare–contrast','Old standard versus new standard']])]],
['Developing each main point',[
'Each main point should include a **claim** (what you are arguing), **support** (story, statistic, example or expert) and **explanation** (why the support proves the claim and connects to your message). This pattern—claim, support, explain—makes points convincing.',
'Avoid simply stating facts; interpret them for listeners. Ask “So what?” after each piece of support.',
'Give each point a memorable label that you used in your preview.',
'End each point by linking back to the central message.',
'Depth on two or three points beats shallow coverage of many.',
"Use the most compelling support for the point that matters most. Placing your strongest evidence strategically increases impact.",
order('Developing a main point',['State the claim','Provide support','Explain why it matters','Connect to the central message','Transition to the next point'])]],
['Transitions',[
'**Transitions** guide listeners from one idea to the next and are key to cohesion. Use **signposts** (“First…,” “Second…,” “Finally…”), **bridges** that summarize and preview (“If listening matters so much, why is it so rare?”), **questions** and **repeated key phrases**.',
'Spoken transitions need to be more obvious than written ones because listeners cannot reread.',
'Practice transitions as much as content; they are where speakers often lose their place.',
'A good transition makes the next point feel inevitable.',
'Avoid abrupt jumps such as “Okay, next thing.”',
"Write transitions on your notecards in a different color so you can find them quickly if you lose your place.",
sort('Strong or weak transition?',['Strong','Weak'],[['“If listening is medicine, why is it so often missing?”',0],['“Um, next.”',1],['“Now that we see the problem, let’s explore the solution.”',0],['“Anyway…”',1],['“Finally, how can each of us raise this standard?”',0]])]],
['Balancing time',[
'In a five-minute speech, a common plan is **opening 30–45 seconds**, **body about 3½ minutes** and **closing 30–45 seconds**. With three main points, each gets roughly **one minute**.',
'Time each section during rehearsal. If one point runs long, trim support or explanation rather than rushing delivery.',
'About 130–150 spoken words per minute means a five-minute speech is roughly 600–700 words, including pauses.',
'Leave a cushion of 10–15 seconds for pauses and audience reactions.',
'A balanced speech feels complete rather than cut off.',
"If you must cut time, shorten the explanation of your weakest point first, keeping your strongest point intact.",
ex('Planning time','Plan a 4:45 speech with three points (one possible plan).',['Opening: 0:40','Point 1 (why listening matters): 1:05','Point 2 (what gets in the way): 1:05','Point 3 (how to raise the standard): 1:10','Closing: 0:45','Total: 4:45'],'Balanced time with a 15-second cushion.')]],
['Building toward the closing',[
'Arrange points so they **build**—from understanding the problem to seeing a solution to taking action. The final main point should lead naturally into your call to action.',
'Cohesion also comes from **repetition** of your central message or key phrase at strategic moments, reminding listeners of the throughline.',
'Ask a listener to summarize your three points after hearing the speech; if they can, your body is cohesive.',
'Reorder points if a different sequence creates stronger momentum.',
'Momentum keeps judges engaged until the end.',
"Consider ending your final body point with an image or story that sets up the emotional tone of your closing.",
chk('Which order best builds momentum?',['Problem → why it matters → what we can do','Solution → problem → random fact','Unrelated points in any order','Closing first, then opening'],'Build toward action.')]],
['Common body problems',[
'Problems include **too many points**, **points without support**, **support without explanation**, **missing transitions** and **drifting off theme**. Each weakens cohesion and focus.',
'Fix them with a revision checklist: two or three points; claim, support and explanation for each; clear transitions; and a link to the theme in every point.',
'Read the body aloud and listen for places where you lose the thread.',
'Ask a listener where they felt confused.',
'Revise until each point flows into the next.',
"After revising, deliver the body to a listener and ask them to name each point. Clear recall means strong cohesion.",
sort('Body problem or strength?',['Problem','Strength'],[['Five unrelated points',0],['Each point linked to the theme',1],['Statistics with no explanation',0],['Clear signpost transitions',1],['A point that drifts into an unrelated topic',0]])]],
['Practice scenario',[
kase('Body revision',{a:{text:'Your second point lists four statistics without explaining them. (Scenario invented for practice.) What do you change?',choices:[['Keep the strongest statistic and explain why it matters to your message','b','Correct.',true],['Add more statistics','b','Explanation creates understanding.',false]]},b:{text:'Listeners say your speech felt like separate pieces. What do you add?',choices:[['Bridging transitions and repeated key phrases','c','Correct.',true],['A longer opening','c','Transitions create cohesion.',false]]},c:{text:'Your body is logical, cohesive and balanced.',end:true}})]]
],takeaways:['Choose one organizational pattern—problem–solution, past–present–future, three pillars, story arc, cause–effect or compare–contrast—that matches your preview.','Develop each main point with claim, support and explanation and connect it to the central message; use signposts, bridges, questions and repeated phrases as transitions (cohesion is 10 points).','Balance time (opening 30–45 s, body about 3½ min, closing 30–45 s; about 600–700 words), build toward the call to action and revise to fix too many points, unexplained support and missing transitions.'],terms:[['Signpost','A word or phrase that marks a point, such as “first.”'],['Bridge','A transition that summarizes one point and previews the next.'],['Claim–support–explain','A structure for developing each main point.']],mcqs:[q('Which pattern fits “Redefine the Standard” naturally?','Problem–solution','Alphabetical','Random','Chronological recipe','Pattern.'),q('Each main point should include:','Claim, support and explanation','Only a joke','Only a statistic','Nothing','Structure.'),q('Which is a strong transition?','“Now that we see the problem, let’s explore the solution.”','“Um, next.”','“Anyway…”','“Okay.”','Transitions.'),q('About how long should the body of a five-minute speech be?','About 3½ minutes','About 30 seconds','About 5 minutes','About 1 minute','Timing.'),q('About how many words is a five-minute speech?','About 600–700','About 100','About 2,000','About 50','Length.'),q('How many points is cohesion worth?','10','5','15','30','Rubric.'),q('Which is a common body problem?','Support without explanation','Clear transitions','Linking to the theme','Balanced time','Problems.'),q('Why repeat a key phrase?','To remind listeners of the throughline','To fill time','To confuse judges','It is not allowed','Cohesion.')],frq:{prompt:'Describe how you would organize the body of your speech for cohesion and impact.',rubric:[['Pattern',['problem–solution','past–present–future','pillars','pattern','preview']],['Main points',['claim','support','explain','connect','two or three']],['Transitions',['signpost','bridge','question','repeat','smooth']],['Timing and build',['3½','minute','600','build','call to action','revise']]],model:'I would organize the body of my speech using a problem–solution pattern that fits “Redefine the Standard” and matches my preview. My first point, “Listening is medicine,” would claim that listening affects health outcomes, support it with research on communication and outcomes and explain why that means listening belongs in our definition of quality care. My second point, “What drowns out the patient’s voice,” would claim that time pressure and screens crowd out listening, support it with a nurse’s quote from my interview and a statistic on visit length and explain how these barriers lower the real standard of care. My third point, “Raising the standard starts with us,” would claim that future health professionals can redefine the standard now, support it with examples like teach-back and sitting at eye level and explain how small habits change patients’ experiences. I would connect each point with clear transitions—signposts like “first” and “finally,” a bridge such as “If listening is medicine, why is it so rare?” and repetition of my key phrase, “Listen as well as we treat.” I would give each point about a minute, keeping the body near three and a half minutes in a 600- to 700-word speech, and order the points to build from understanding the problem to taking action, leading naturally into my call to action. Finally, I would revise using a checklist and ask listeners to summarize my three points to confirm cohesion.'},sources:[RULES,STRAT]};

export const PSP7={title:'Closing with impact',hook:'The closing is the last thing judges hear before they score. The rubric awards 10 points for a closing that prepares the audience for the end and leaves a lasting impression—and impact (15 points) often depends on how powerfully you finish. A strong closing turns a good speech into a memorable one.',objectives:['Signal the conclusion clearly.','Summarize the central message concisely.','Deliver a memorable call to action or final thought.','End with confidence and control.'],sections:[
['Signaling the end',[
'Prepare listeners for the conclusion with a clear signal: “As we leave today…,” “So here is the standard I ask you to hold…” or a return to your opening story. A signal tells judges you are wrapping up and helps them recognize the closing.',
'Avoid abrupt endings or phrases like “That’s it” or “I guess I’m done.”',
'The time card at one minute remaining is a helpful reminder to begin moving toward your closing.',
'Slow your pace slightly as you begin the conclusion.',
'A clear signal helps you earn the closing points.',
"Some speakers use a brief pause and a step forward to signal the conclusion physically, reinforcing the verbal signal.",
sort('Strong or weak signal?',['Strong','Weak'],[['“So here is the standard I ask you to carry forward…”',0],['“That’s it.”',1],['Returning to the opening story',0],['“I guess I’m done.”',1],['“As we leave this room today…”',0]])]],
['Summarizing the message',[
'Briefly restate your **central message** and main points in fresh words: “Listening is medicine, its barriers are real, and raising the standard begins with each of us.” A concise summary reinforces memory without repeating the whole speech.',
'Keep the summary to one or two sentences. The goal is clarity, not repetition.',
'Use the same key phrases from your preview so the speech feels complete.',
'A summary also shows judges that your speech had a clear structure.',
'Then move quickly to your final thought.',
"The summary should feel like a natural recap, not a list. Connect the points in one flowing sentence.",
chk('How long should the summary in a closing usually be?',['One or two sentences','Two full minutes','Half the speech','No summary is allowed'],'Concise reinforcement.')]],
['Call to action',[
'A **call to action** asks listeners to do something specific: “Tomorrow, in your clinical rotation, sit down, make eye contact and ask one more question.” Specific, achievable actions are more powerful than vague requests like “Be better.”',
'For a HOSA audience, connect the action to members’ roles as students and future health professionals.',
'Consider a call to action that listeners can begin today.',
'Phrase it with confident, active verbs.',
'A strong call to action often provides the speech’s greatest impact.',
"Test your call to action by asking listeners whether they could do it this week. If they say yes, it is specific enough.",
match('Vague request and specific call to action',[['“Care more.”','“Ask every patient one more question about how they feel.”'],['“Be a leader.”','“Start a listening pledge in your chapter this month.”'],['“Change the world.”','“Sit at eye level with your next patient.”'],['“Do your best.”','“Practice teach-back at your next clinical shift.”'],['“Think about it.”','“Write down one standard you will raise this week.”'],['“Help people.”','“Volunteer one hour this month to listen to residents.”']])]],
['A memorable final line',[
'End with a **final line** that echoes your opening, repeats your key phrase or offers a vivid image: “My grandfather taught me that the most important part of care is often the quietest—so let’s listen as well as we treat.”',
'**Circling back** to the opening story creates a satisfying sense of completion. Pause before the last line, deliver it slowly and hold eye contact for a moment afterward.',
'Avoid adding new information after your final line.',
'Do not end with “Thank you” as the main closing; you may say it briefly after the final line if you wish.',
'Practice the last line until it is smooth and confident.',
"Write several possible final lines and test them aloud. The best final line is usually short, clear and connected to your opening.",
ex('Circling back','Write a closing that echoes the opening (example).',['Opening image: grandfather whispering “No one asked me how I feel.”','Summary: listening is medicine, barriers are real, change starts with us','Call to action: “Ask one more question at your next clinical.”','Final line: “Let’s make sure no patient ever has to whisper that again.”'],'A complete, memorable ending tied to the opening.')]],
['Timing the closing',[
'Plan about **30 to 45 seconds** for the closing. Use the one-minute card as your cue: if you are not near the closing, skip remaining details and move to it so you are not cut off.',
'Being stopped before your closing costs points for organization and impact, so protect it in your time plan.',
'Practice a shortened version of the closing for emergencies.',
'Memorize the closing so you can deliver it with full eye contact.',
'A calm, controlled finish shows confidence.',
"Avoid speaking past the stop signal. Ending within time shows control and respect for the rules.",
order('If the one-minute card appears early',['Notice the card calmly','Skip remaining minor details','Signal the conclusion','Summarize in one sentence','Deliver the call to action and final line'])]],
['Delivering the closing',[
'Slow down, lower your pitch slightly for emphasis, pause before key words and maintain eye contact. Stand still during the final line to give it weight, then hold a brief pause before relaxing.',
'Your voice and body should signal certainty and conviction—the impression judges carry into scoring.',
'Avoid rushing off or looking away immediately after finishing.',
'A confident pause after the last line lets your message land.',
'Smile or nod gently to signal you are finished.',
"Practice the closing more than any section except the opening. Judges often remember the last thirty seconds most clearly.",
sort('Strong closing delivery?',['Strong','Weak'],[['Pausing before the final line',0],['Rushing the last sentence',1],['Holding eye contact after finishing',0],['Walking away mid-sentence',1],['Standing still for emphasis',0]])]],
['Practice scenario',[
kase('Closing choices',{a:{text:'Your closing introduces a new statistic. (Scenario invented for practice.) Is that effective?',choices:[['No—use the closing to summarize, call to action and finish memorably','b','Correct.',true],['Yes, new facts are best at the end','b','New information distracts.',false]]},b:{text:'The one-minute card appears while you are still on point two. What do you do?',choices:[['Skip remaining details and move to your closing','c','Correct.',true],['Keep going and hope for time','c','Protect your closing.',false]]},c:{text:'You finish with a strong, complete closing.',end:true}})]]
],takeaways:['Signal the conclusion clearly, then summarize your central message and main points in one or two sentences using key phrases from your preview.','Deliver a specific, achievable call to action connected to HOSA members and a memorable final line that circles back to your opening; add no new information.','Plan 30–45 seconds, use the one-minute card to protect the closing, memorize it and deliver slowly with pauses, emphasis and eye contact (closing is 10 points; impact is 15).'],terms:[['Call to action','A specific request for listeners to act.'],['Circling back','Returning to an image or story from the opening.'],['Final line','The last sentence that leaves a lasting impression.']],mcqs:[q('How many points is the closing worth?','10','5','15','30','Rubric.'),q('Which signals the conclusion?','“So here is the standard I ask you to carry forward…”','“That’s it.”','“I guess I’m done.”','“Um…”','Signal.'),q('A strong call to action is:','Specific and achievable','Vague','Optional and unrelated','A new statistic','CTA.'),q('What should a closing NOT include?','New information','A summary','A final line','A call to action','Rule of thumb.'),q('About how long should the closing be?','30–45 seconds','2 minutes','5 seconds','4 minutes','Timing.'),q('If the one-minute card appears early, you should:','Move to your closing','Speed-read the remaining points','Ignore it','Stop immediately','Strategy.'),q('Circling back means:','Returning to your opening story or image','Starting over','Walking in a circle','Repeating the whole speech','Technique.'),q('How should the final line be delivered?','Slowly with a pause and eye contact','Quickly while walking away','Looking at notes','Whispered','Delivery.')],frq:{prompt:'Write and explain a closing for your “Redefine the Standard” speech.',rubric:[['Signal and summary',['signal','summarize','central message','key phrases','brief']],['Call to action',['call to action','specific','achievable','members','clinical']],['Final line',['final line','circle back','opening','memorable','no new']],['Timing and delivery',['30','45 seconds','one-minute card','pause','eye contact','slow']]],model:'My closing would begin with a clear signal: “So here is the standard I ask you to carry out of this room.” Then I would summarize in one sentence using the key phrases from my preview: “Listening is medicine, its barriers are real, and raising the standard begins with each of us.” Next, I would deliver a specific, achievable call to action for HOSA members: “At your next clinical rotation, job or volunteer shift, sit at eye level, make eye contact and ask one more question about how your patient feels.” Finally, I would circle back to my opening story with a memorable final line: “My grandfather once whispered, ‘No one asked me how I feel.’ Let’s make sure no patient ever has to whisper that again.” I would add no new information, keeping the closing to about 40 seconds. Because the closing is worth 10 points and drives impact, I would protect it in my time plan: if the one-minute card appeared while I was still on my second point, I would skip remaining details and move straight to the closing, using a shortened version I had practiced. I would memorize the closing so I could deliver it with full eye contact, slowing my pace, pausing before the final line, standing still for emphasis and holding a brief pause and gentle nod afterward to signal that I had finished.'},sources:[RULES,TM]};

export const PSP8={title:'Writing for the ear',hook:'A speech is heard, not read. Listeners cannot reread a confusing sentence or look back at a statistic, so speech language must be clearer, simpler and more rhythmic than essay writing. Techniques like repetition, the rule of three and vivid imagery help your message stick—and they strengthen impact.',objectives:['Write sentences that are easy to hear and remember.','Use rhetorical devices effectively.','Create vivid imagery without visual aids.','Edit the speech for timing and clarity.'],sections:[
['Oral style versus written style',[
'Speech language uses **shorter sentences**, **active voice**, **concrete words**, **repetition** and **signposts**. A sentence that works in an essay—long, with several clauses—can confuse listeners. Read every sentence aloud and simplify anything you stumble over.',
'Use **contractions** and a conversational tone where appropriate, while staying professional.',
'Put the most important words at the end of sentences, where they carry the most emphasis.',
'Vary sentence length for rhythm: a short sentence after a long one adds punch.',
'Write as you would speak to a respected listener.',
"If a sentence needs a breath in the middle, it is probably too long for a speech. Split it into two sentences.",
sort('Good for the ear?',['Easy to hear','Hard to hear'],[['“Listening is medicine.”',0],['“It is the case that the standard, which has historically been defined by many factors, must be reconsidered.”',1],['“Patients notice when we look up.”',0],['“The utilization of communicative modalities is paramount.”',1],['“We can do better. We must.”',0]])]],
['Repetition and the rule of three',[
'**Repetition** of a key phrase creates rhythm and memory—“listen as well as we treat” repeated at key moments becomes your speech’s signature. **Anaphora** repeats words at the start of sentences: “We listen when… We listen when… We listen when…”',
'The **rule of three** groups ideas in threes because listeners find them satisfying and memorable: “See the patient, hear the patient, respect the patient.”',
'Use these devices purposefully—too much repetition becomes tiresome.',
'Place repeated phrases at transitions and in the closing.',
'These devices strengthen both cohesion and impact.',
"Choose one signature phrase rather than several. A single repeated phrase is easier for listeners to remember.",
match('Device and example',[['Repetition','“Listen as well as we treat” at key moments'],['Anaphora','“We listen when… We listen when…”'],['Rule of three','“See, hear, respect.”'],['Contrast','“Not how fast we treat, but how well we listen.”'],['Rhetorical question','“What if care were measured in listening?”'],['Alliteration','“Patient, present, prepared.”']])]],
['Vivid imagery',[
'Without slides or props, **words must create images**. Use specific sensory details: “the steady beep of the monitor,” “the cold metal rail of the hospital bed,” “a nurse kneeling to meet a child’s eyes.” Concrete images make abstract ideas such as “standards” tangible.',
'Analogies also help: “Listening is a diagnostic tool, as important as a stethoscope.”',
'Choose images that support your message, not just decoration.',
'One vivid image can carry an entire point.',
'Practice describing scenes so listeners can picture them.',
"Use sensory details sparingly but precisely. One or two well-chosen details are more powerful than a long description.",
"Imagery can also come from your own senses during volunteering or shadowing—what you saw, heard and felt makes descriptions authentic.",
ex('Adding imagery','Make an abstract sentence vivid (example).',['Abstract: “Patients often feel ignored.”','Add a scene: a hospital room at night','Add sensory details: the beep of the monitor, the glow of a screen','Vivid: “In the blue glow of a computer screen, a patient waits for someone to look up.”'],'A concrete image that makes the idea real.')]],
['Word choice and clarity',[
'Choose **precise, familiar words**, define necessary medical terms briefly and avoid jargon or acronyms listeners may not know. Replace vague words (“things,” “stuff,” “very”) with specific ones.',
'Diction—choice of words for correctness, clearness and effectiveness—is scored under delivery, so strong word choice helps there too.',
'Avoid clichés such as “at the end of the day” or “think outside the box”; fresh language is more memorable.',
'Check pronunciation of any unfamiliar words you include.',
'Clarity always comes before cleverness.',
"Explain any medical term in a few words the first time you use it, so every listener can follow.",
sort('Precise or vague?',['Precise','Vague'],[['“One in three patients”',0],['“Lots of people”',1],['“Sit at eye level with the patient”',0],['“Do stuff better”',1],['“Teach-back, where patients repeat instructions in their own words”',0]])]],
['Editing for time',[
'A five-minute speech is about **600–700 words** at a typical pace with pauses. Read your draft aloud with a timer. If it runs long, cut weaker examples, shorten sentences and remove repetition that does not serve a purpose.',
'Never solve a timing problem by speaking faster—it hurts clarity and stage presence.',
'Aim for about 4:45 in rehearsal to leave room for pauses and nerves.',
'Mark places where you will pause for emphasis; pauses take time too.',
'Re-time after every major revision.',
"Keep a record of each timing run. Watching the time decrease toward your target shows progress and helps you plan final edits.",
order('Editing for time and clarity',['Read the draft aloud with a timer','Mark sentences you stumble over','Simplify difficult sentences','Cut weaker examples if long','Add pauses for emphasis','Re-time the speech'])]],
['Notecards',[
'Notecards (paper or electronic) are allowed, but electronic notes may not be shown to judges. Use cards for **key words and phrases**, not full sentences, so you look up and connect with judges. Number the cards and use large, clear writing.',
'Many speakers memorize the opening and closing and use cards as a safety net for the body.',
'Practice with the same cards you will use in competition.',
'Highlight transitions and key statistics so you can find them quickly.',
'Holding cards steadily at waist level keeps them unobtrusive.',
"Practice glancing at a card, then completing the full sentence while looking at judges. This habit keeps your delivery connected.",
chk('What should notecards contain?',['Key words and phrases','The full speech word for word','Nothing','Images to show judges'],'Cues, not scripts.')]],
['Practice scenario',[
kase('Language revision',{a:{text:'Your sentence reads, “It is imperative that the utilization of attentive auditory engagement be prioritized.” (Scenario invented for practice.) How do you revise it?',choices:[['“We must make listening a priority.”','b','Correct.',true],['Keep it—it sounds impressive','b','Clarity matters for listeners.',false]]},b:{text:'Your speech times at 5:30. What do you do?',choices:[['Cut weaker examples and simplify sentences to reach about 4:45','c','Correct.',true],['Speak faster','c','Rushing hurts delivery.',false]]},c:{text:'Your speech is clear, vivid and on time.',end:true}})]]
],takeaways:['Write for the ear: short sentences, active voice, concrete words, signposts and important words at the end; read aloud and simplify.','Use repetition, anaphora, the rule of three, contrast and rhetorical questions purposefully; create vivid sensory images and analogies since no visuals are allowed.','Choose precise words without jargon or clichés; edit to about 600–700 words and 4:45 without speeding up; use numbered notecards with key words, memorizing the opening and closing.'],terms:[['Oral style','Language designed to be heard clearly and remembered.'],['Rule of three','Grouping ideas in threes for rhythm and memory.'],['Anaphora','Repeating words at the start of successive sentences.']],mcqs:[q('Which sentence is best for the ear?','“Listening is medicine.”','“The utilization of communicative modalities is paramount.”','“It is the case that standards historically…”','“Stuff matters.”','Oral style.'),q('The rule of three groups ideas in:','Threes','Fives','Pairs','Tens','Device.'),q('Which is an example of anaphora?','“We listen when… We listen when…”','A single sentence','A statistic','A quote','Device.'),q('Why use vivid imagery?','Words must create images without visual aids','Props are required','To confuse listeners','To lengthen the speech','Imagery.'),q('If the speech runs long, you should:','Cut weaker material','Speak faster','Skip the closing','Add more facts','Timing.'),q('What should notecards contain?','Key words and phrases','The full speech','Pictures for judges','Nothing','Notecards.'),q('Which word choice is precise?','“One in three patients”','“Lots of people”','“Stuff”','“Things”','Clarity.'),q('About how long should rehearsals run?','About 4:45','About 6:00','About 2:00','About 10:00','Target.')],frq:{prompt:'Explain how you would revise your speech so it is clear, memorable and well timed for listeners.',rubric:[['Oral style',['short sentences','active voice','concrete','read aloud','simplify']],['Devices',['repetition','rule of three','anaphora','contrast','rhetorical question']],['Imagery and word choice',['vivid','sensory','analogy','precise','jargon','clichés']],['Timing and notes',['600','700','4:45','cut','notecards','key words']]],model:'Because my speech will be heard, not read, I would revise it in oral style: shorter sentences, active voice and concrete words, with the most important word at the end of each key sentence. I would read every sentence aloud, simplifying any I stumbled over—for example, changing “It is imperative that attentive auditory engagement be prioritized” to “We must make listening a priority.” I would use rhetorical devices purposefully: repeating my key phrase, “listen as well as we treat,” at each transition and in the closing; anaphora in my third point—“We listen when we sit down. We listen when we look up. We listen when we ask one more question”; the rule of three in “See the patient, hear the patient, respect the patient”; and contrast in “not how fast we treat, but how well we listen.” Since no visuals are allowed, I would create vivid images with sensory details, like “the blue glow of a computer screen while a patient waits for someone to look up,” and an analogy comparing listening to a stethoscope. I would choose precise words, define teach-back briefly and remove jargon and clichés. To manage time, I would read the draft aloud with a timer, cutting weaker examples until it ran about 4 minutes 45 seconds and 600 to 700 words, without speeding up. Finally, I would make numbered notecards with key words, transitions and statistics, memorizing my opening and closing.'},sources:[RULES,STRAT]};

export const PSP9={title:'Delivery without a microphone',hook:'Delivery is worth 15 points, but it affects every other score: judges cannot reward a message they cannot hear or follow. With no microphones in this event, your voice must fill the room. Strong delivery combines a projected, varied voice, purposeful movement and clear, filler-free speech.',objectives:['Project your voice and vary pitch, pace and volume.','Use stage presence: posture, gestures, eye contact and movement.','Speak with clear diction and pronunciation.','Reduce filler words and manage nerves.'],sections:[
['Voice: projection and variety',[
'The top voice score describes a voice **loud enough to hear**, with **varied rate and volume** to enhance the speech and **appropriate pausing**. Project from your diaphragm, not your throat: stand tall, breathe deeply and aim your voice at the back of the room.',
'Vary **pitch** (high and low), **pace** (faster for energy, slower for emphasis) and **volume** (louder for passion, softer to draw listeners in). Monotone delivery makes even strong content forgettable.',
'Practice in a room similar to competition size to calibrate volume.',
'Record yourself and listen for variety.',
'Pauses before and after key ideas add power.',
"Practice vocal variety by reading a children’s book aloud with expression. It builds range that carries into your speech.",
match('Vocal tool and effect',[['Projection','Everyone can hear without a microphone'],['Slower pace','Emphasizes important ideas'],['Faster pace','Builds energy and urgency'],['Softer volume','Draws listeners in'],['Pause','Lets key ideas land'],['Pitch variety','Avoids monotone']])]],
['Stage presence',[
'Stage presence covers **poise, posture, eye contact and enthusiasm**. Stand tall with feet shoulder-width apart, avoid swaying and use **purposeful gestures** that match your words. Movement should be intentional—step forward for an important point, then plant your feet.',
'**Eye contact** with each judge builds connection; hold it for a complete thought before moving to the next person. Facial expressions should reflect your message—serious for concerns, warm for hope.',
'Avoid distracting habits such as fidgeting with notecards, touching your face or pacing.',
'Genuine enthusiasm for your message is contagious.',
'Practice in front of a mirror and on video.',
"Plan two or three key gestures for important moments, but let most gestures arise naturally from what you are saying.",
sort('Strong or weak stage presence?',['Strong','Weak'],[['Purposeful gestures that match key points',0],['Constant swaying',1],['Eye contact with each judge',0],['Staring at notecards',1],['Facial expressions matching the message',0],['Playing with hair while speaking',1]])]],
['Diction and pronunciation',[
'The diction item rewards **clear enunciation and pronunciation** and **no vocal fillers** such as “ah,” “um” and “you know,” with a tone that heightens interest. Articulate consonants, especially at the ends of words, and practice pronouncing medical terms correctly.',
'Replace fillers with **pauses**. A silent pause sounds confident; a filler sounds uncertain.',
'Tongue twisters and reading aloud slowly can improve articulation.',
'Ask a listener to count your fillers during rehearsal.',
'Tone should match content and stay consistent.',
"Slow down on numbers and names. These are hardest for listeners to catch without a microphone.",
"Record a few sentences and listen for dropped word endings. Crisp final consonants make speech easier to understand in large rooms.",
ex('Reducing fillers','Track fillers over three rehearsals (counts invented for practice).',['Rehearsal 1: 14 fillers (mostly “um”)','Strategy: pause silently at transitions','Rehearsal 2: 7 fillers','Rehearsal 3: 2 fillers'],'Pausing replaces fillers and improves diction (counts invented for practice).')]],
['Using notecards gracefully',[
'Hold notecards at **waist level** in one hand, glance down briefly and look up to speak. Never read whole sentences. Move cards smoothly to the back as you finish each one.',
'If you lose your place, pause, glance at your card and continue calmly—judges rarely notice a brief pause.',
'Electronic notecards are allowed but may not be shown to judges; make sure screens do not distract.',
'Practice with cards so handling them feels natural.',
'Many top speakers barely use cards by competition day.',
"Use cards less with each rehearsal. By competition day, cards should be a safety net, not a script.",
chk('You lose your place mid-speech. What should you do?',['Pause, glance at your notecard and continue calmly','Apologize repeatedly','Start the speech over','Stop and leave'],'Calm recovery.')]],
['Managing nerves',[
'Nervous energy is normal and can make you more alert. Before speaking: breathe slowly (in for four counts, out for six), relax your shoulders, visualize a successful speech and remind yourself of your preparation.',
'During the speech, focus on your message and the judges rather than yourself. Friendly faces help—connect with an engaged judge early.',
'Physical warm-ups such as shoulder rolls and vocal exercises reduce tension.',
'Arrive early so you are not rushed.',
'Every rehearsal reduces anxiety.',
"Remember that a little nervous energy can make your delivery more lively. Channel it into enthusiasm.",
"Hydrate before speaking and avoid dairy or very sugary drinks right beforehand, which can affect some speakers’ voices.",
order('Pre-speech routine',['Arrive early','Do shoulder rolls and vocal warm-ups','Breathe slowly for one minute','Visualize a confident opening','Review your first line','Walk in, pause and begin'])]],
['Professional presence',[
'Wear **business attire** or the **official HOSA uniform** for bonus points. Walk in confidently, pause, make eye contact and begin only when you are ready. After your final line, pause, then thank the judges briefly if you wish and exit calmly.',
'Professional presence from entry to exit supports stage presence scores.',
'Avoid chewing gum, wearing noisy jewelry or carrying unnecessary items.',
'Stand where all judges can see you clearly.',
'Remain composed even if something unexpected happens.',
"Stand still for a moment before speaking. A calm start signals confidence and gives judges time to focus on you.",
sort('Professional choice?',['Professional','Unprofessional'],[['Pausing before your first line',0],['Starting while still walking in',1],['Business attire or HOSA uniform',0],['Chewing gum',1],['Exiting calmly after a pause',0]])]],
['Practice scenario',[
kase('Delivery check',{a:{text:'In rehearsal, judges at the back of the room cannot hear you. (Scenario invented for practice.) What do you do?',choices:[['Project from the diaphragm and aim your voice at the back wall','b','Correct.',true],['Speak faster','b','Projection, not speed, solves volume.',false]]},b:{text:'A listener counts 12 “ums.” How do you improve?',choices:[['Replace fillers with silent pauses and practice transitions','c','Correct.',true],['Talk without stopping','c','Pauses sound confident.',false]]},c:{text:'Your delivery is clear, confident and engaging.',end:true}})]]
],takeaways:['Project without a microphone from the diaphragm and vary pitch, pace and volume with purposeful pauses (voice is 5 points).','Stage presence: tall posture, purposeful gestures and movement, eye contact with each judge and expressions that match the message; avoid swaying and fidgeting.','Diction: clear articulation, correct pronunciation and silent pauses instead of fillers; hold notecards at waist level, manage nerves with breathing and warm-ups and show professional presence in attire, entry and exit.'],terms:[['Projection','Speaking loudly enough to fill a room clearly.'],['Vocal filler','A sound like “um” that adds no meaning.'],['Stage presence','Poise, posture, eye contact and enthusiasm.']],mcqs:[q('How many points is delivery worth?','15','5','10','30','Rubric.'),q('Where should you project your voice from?','Your diaphragm','Your nose','Your throat only','Your notes','Projection.'),q('What replaces filler words best?','Silent pauses','Louder fillers','Faster speech','Humming','Diction.'),q('Which is strong stage presence?','Purposeful gestures','Constant swaying','Staring at notes','Fidgeting','Presence.'),q('Where should notecards be held?','At waist level','In front of your face','Behind your back','On the floor','Notecards.'),q('Which helps manage nerves?','Slow breathing','Skipping warm-ups','Arriving late','Rushing in','Nerves.'),q('Are microphones used in Prepared Speaking?','No','Yes','Only for finals','On request','Rule.'),q('Which attire earns bonus points?','Business attire or HOSA uniform','Gym clothes','Costume','Pajamas','Dress.')],frq:{prompt:'Explain how you would deliver your speech effectively without a microphone.',rubric:[['Voice',['project','diaphragm','pitch','pace','volume','pause']],['Stage presence',['posture','gestures','eye contact','movement','enthusiasm']],['Diction',['enunciation','pronunciation','fillers','pause','tone']],['Notes, nerves and presence',['notecards','waist','breathing','warm-up','attire','composed']]],model:'Since there are no microphones, I would project my voice from my diaphragm by standing tall, breathing deeply and aiming my voice at the back wall, practicing in a room similar in size to the competition room. I would vary my delivery: slowing down and lowering my volume for my grandfather’s story to draw listeners in, speeding up slightly with more energy in my call to action and pausing before and after key lines such as “listen as well as we treat.” For stage presence, I would stand with my feet shoulder-width apart, avoid swaying, use purposeful gestures—an open hand when describing listening—and take one step forward for my most important point, then plant my feet. I would make eye contact with each judge for a full thought before moving to the next and let my expressions match my message. For diction, I would articulate clearly, practice pronouncing terms like “teach-back” and replace fillers with silent pauses, asking a friend to count my “ums” during rehearsals. I would hold numbered notecards with key words at waist level, glancing down only briefly, and if I lost my place, I would pause and calmly continue. Before speaking, I would arrive early, do shoulder rolls and vocal warm-ups, breathe slowly and visualize a confident opening. Finally, I would wear the HOSA uniform, pause and make eye contact before my first word and exit calmly after my final line.'},sources:[RULES,TM,EDL]};

export const PSP10={title:'Rehearsal, feedback and competition day',hook:'Great speeches are not written—they are rewritten and rehearsed. Each rehearsal sharpens your message, smooths transitions and builds confidence. This final lesson creates a rehearsal plan, shows how to use feedback with the rubric and prepares you for competition day.',objectives:['Create an effective rehearsal schedule.','Use rubric-based feedback to improve.','Simulate competition conditions.','Prepare for competition day and handle surprises.'],sections:[
['A rehearsal schedule',[
'Rehearse in stages. **Early:** read the draft aloud to test clarity and timing. **Middle:** rehearse with notecards, focusing on structure and transitions. **Late:** rehearse with minimal notes, focusing on delivery. **Final weeks:** full run-throughs in competition conditions.',
'Short daily rehearsals are more effective than occasional long ones. Aim for at least three full run-throughs per week in the final month.',
'Rehearse standing, in professional attire, at least some of the time.',
'Vary rehearsal locations to adapt to new spaces.',
'Track each rehearsal’s time and one improvement goal.',
"Rehearse at the same time of day as your scheduled speech when possible, so your voice and energy feel familiar.",
order('Rehearsal stages',['Read the draft aloud','Rehearse with notecards','Rehearse with minimal notes','Full run-throughs in competition conditions','Final polish of delivery'])]],
['Using the rubric for feedback',[
'Give listeners a copy of the rating sheet and ask them to score your speech. Ask specific questions: What was my central message? Was my point of view clear? Which point was strongest? Where did I lose you? Did I sound confident?',
'Focus revisions on the highest-value items first: content (60 points), then organization (30), then delivery (15).',
'Seek feedback from different listeners—advisors, teachers, family and peers—since each notices different things.',
'Keep a feedback log and note patterns across listeners.',
'Thank listeners and act on their suggestions.',
"When feedback conflicts, look for the most common suggestions across listeners and prioritize those.",
"Ask at least one listener who is not a HOSA member. Outside listeners show whether your message is clear to a general audience.",
match('Feedback question and rubric item',[['What was my main message?','Clear focus and point of view'],['Did it connect to the theme?','Appropriate to the conference theme'],['Did the opening grab you?','Opening statement'],['Did ideas flow?','Cohesion of body'],['Could you hear me?','Voice'],['Did I use fillers?','Diction']])]],
['Recording and self-review',[
'Record rehearsals on video. Watch once for **content** (is the message clear?), once for **voice** (variety, volume, fillers) and once for **body language** (posture, gestures, eye contact). Watching with the sound off reveals distracting movements.',
'Compare recordings over time to see progress.',
'Note one strength and one goal after each review.',
'Watch a top speaker’s example for ideas on delivery, then apply them in your own style.',
'Self-review builds independence as a speaker.',
"Celebrate improvements you see in recordings. Recognizing progress builds the confidence that judges notice.",
"Watch the final recording with a fresh mind a day later. Distance often makes it easier to see what needs one last adjustment.",
ex('A self-review checklist','Review a recording (results invented for practice).',['Content: message clear; second point needs a better example','Voice: good projection; pace too fast in the opening','Body: strong eye contact; hands fidget with cards','Timing: 4:52','Goal for next rehearsal: slow the opening and hold cards still'],'Targeted goals for steady improvement (results invented for practice).')]],
['Simulating competition',[
'Recreate competition conditions: a room with judges seated at a table, a timekeeper showing a one-minute card, no microphone and professional attire. Practice entering, pausing, delivering and exiting.',
'Have the timekeeper stop you at five minutes so you learn how strict the limit is.',
'Practice recovering from small disruptions, such as a noise or a lost place on your cards.',
'Simulations reduce surprise and nerves on competition day.',
'Schedule at least two full simulations before the event.',
"In simulations, ask “judges” to keep straight faces at times. Learning to stay confident without visible reactions prepares you for real judges.",
chk('Why have a timekeeper stop you at five minutes in practice?',['To experience how strictly time is enforced','To make practice shorter','Because judges prefer short speeches','It is not useful'],'Realistic practice.')]],
['Competition day checklist',[
'**Before:** confirm your speaking time and room, prepare your outfit and notecards, sleep well and eat a balanced meal. **Bring:** photo ID and notecards. **Arrive early** and warm up your voice and body.',
'In the room, wait to be introduced, walk in confidently, pause and begin. Remember that only notecards are allowed—no props.',
'After speaking, thank the judges if you wish and exit calmly; avoid discussing your speech in the hallway near other competitors.',
'Reflect afterward on what went well and what you would improve.',
'Celebrate the work you have done.',
"Avoid making major changes to the speech in the final few days. Focus on polishing what you have rehearsed.",
"Keep a printed copy of the speech in your bag for a final review, even though you will use only notecards in the room.",
order('Competition day',['Confirm time and room','Dress professionally','Bring photo ID and notecards','Arrive early and warm up','Enter, pause and begin','Deliver and exit calmly','Reflect afterward'])]],
['Handling surprises',[
'If you forget a line, pause and continue with your next key idea—listeners usually do not notice. If there is a noise or interruption, pause until it passes and resume. If the one-minute card appears earlier than expected, move to your closing.',
'Staying composed under pressure shows poise, which judges reward under stage presence.',
'Prepare a mental plan for each surprise in advance.',
'Remember that judges want you to succeed.',
'Focus on your message, not on perfection.',
"After the event, write down lessons learned while they are fresh. They will help you in future speaking events and presentations.",
sort('Good response to a surprise?',['Good response','Poor response'],[['Pausing during a loud noise, then continuing',0],['Stopping the speech and leaving',1],['Moving to the closing when the card appears early',0],['Apologizing repeatedly for a mistake',1],['Skipping to the next key idea after forgetting a line',0]])]],
['Practice scenario',[
kase('Final preparation',{a:{text:'Two weeks before competition, your speech is 5:20. (Scenario invented for practice.) What do you do?',choices:[['Cut a weaker example and re-time until about 4:45','b','Correct.',true],['Plan to talk faster','b','Edit content rather than rushing.',false]]},b:{text:'During your speech, a fire truck siren passes outside. What do you do?',choices:[['Pause until it passes, then continue confidently','c','Correct.',true],['Shout over it','c','A calm pause shows poise.',false]]},c:{text:'You are prepared for competition day.',end:true}})]]
],takeaways:['Rehearse in stages (read aloud, notecards, minimal notes, full competition run-throughs) with short daily sessions and at least three full run-throughs per week in the final month.','Use the rating sheet for feedback, prioritizing content (60), organization (30) and delivery (15); record rehearsals and review content, voice and body language separately.','Simulate competition (judges, one-minute card, five-minute stop, no microphone, attire), follow a competition-day checklist with photo ID and notecards and handle surprises with calm pauses.'],terms:[['Run-through','A full rehearsal of the entire speech.'],['Simulation','Practice that recreates competition conditions.'],['Feedback log','A record of listeners’ suggestions and patterns.']],mcqs:[q('Which rubric area should revisions prioritize first?','Content','Delivery','Attire','Notecards','Points.'),q('What should a simulation include?','A timekeeper with a one-minute card','Slides','A microphone','Props','Realism.'),q('How should you review a recording?','Separately for content, voice and body language','Not at all','Only for fun','Only the opening','Self-review.'),q('What should you bring on competition day?','Photo ID and notecards','Props','A slideshow','A microphone','Rule.'),q('If you forget a line, you should:','Pause and continue with the next key idea','Start over','Leave','Apologize repeatedly','Composure.'),q('If a loud noise interrupts, you should:','Pause until it passes, then resume','Shout over it','Stop permanently','Laugh loudly','Poise.'),q('How many full run-throughs per week are recommended in the final month?','At least three','Zero','One per year','Fifty','Plan.'),q('A speech that is too long should be fixed by:','Cutting weaker content','Talking faster','Skipping the closing','Adding more','Editing.')],frq:{prompt:'Describe your rehearsal plan and how you would prepare for competition day.',rubric:[['Rehearsal stages',['read aloud','notecards','minimal notes','run-throughs','daily']],['Feedback',['rating sheet','content','organization','delivery','listeners','log']],['Recording and simulation',['record','voice','body language','timekeeper','one-minute','five minutes']],['Competition day',['photo id','notecards','arrive early','warm up','surprises','pause']]],model:'My rehearsal plan would move through stages. First, I would read my draft aloud to test clarity and timing; next, I would rehearse with notecards to master structure and transitions; then I would practice with minimal notes to focus on delivery; and in the final month, I would complete at least three full run-throughs each week, some in my HOSA uniform. I would give listeners—my advisor, an English teacher, family and HOSA peers—copies of the rating sheet and ask specific questions: What was my central message? Did it clearly connect to “Redefine the Standard”? Where did you lose me? Could you hear me? I would keep a feedback log and revise content first, then organization, then delivery, matching the 60-30-15 point split. I would also record rehearsals and review them three times—once for content, once for voice and fillers and once with the sound off for body language—setting one goal per rehearsal. At least twice, I would simulate competition with judges at a table, a timekeeper showing the one-minute card and stopping me at five minutes and no microphone. On competition day, I would confirm my time and room, bring photo ID and notecards, arrive early, warm up my voice and body, enter confidently, pause and begin. If I forgot a line, I would pause and move to my next key idea; if a noise interrupted, I would wait and resume; and if the time card appeared early, I would move to my closing.'},sources:[RULES,EDL]};
