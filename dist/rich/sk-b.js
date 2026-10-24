// Speaking Skills lessons 6–10: openings and closings, notecards and memory helpers, using your voice,
// body language and eye contact, and practice, calm and competition day.
const RULES=['HOSA Speaking Skills 2026–27 guidelines and rating sheet','https://hosa.org/wp-content/uploads/2026/08/Speaking-Skills-26-27.pdf'];
const EDL=['eDynamic Learning: HOSA public speaking course','https://www.edynamiclearning.com/hosa/'];
const TM=['Toastmasters International: Public speaking tips','https://www.toastmasters.org/resources/public-speaking-tips'];
const TMHOME=['Toastmasters International','https://www.toastmasters.org/'];
const q=(p,a,b,c,d,e)=>[p,[a,b,c,d],e];
const match=(title,pairs)=>({t:'w',kind:'match',title,pairs});
const order=(title,steps)=>({t:'w',kind:'order',title,steps});
const sort=(title,buckets,items)=>({t:'w',kind:'sort',title,buckets,items});
const flip=(title,cards)=>({t:'w',kind:'flip',title,cards});
const kase=(title,nodes)=>({t:'w',kind:'case',title,start:'a',nodes});
const chk=(q,options,why)=>({t:'check',q,options,why});
const ex=(title,prompt,steps,answer)=>({t:'example',title,prompt,steps,answer});

export const SK6={title:'Great openings and closings',hook:'The beginning and end of your speech are the parts judges remember best. A great opening makes them want to listen, and a great closing leaves them thinking about your message. Each is worth 10 points. Simple templates can help you write both.',objectives:['Write an opening that grabs attention.','Say your main idea in the opening.','Write a closing that reminds and inspires.','Practice your opening and closing until they feel easy.'],sections:[
['Why openings matter',[
'Your **opening** is the first thing judges hear. A strong opening **grabs attention** and **tells your topic**.',
'Avoid starting with “Hi, my speech is about…” Instead, start with something interesting.',
'Your opening should be about **30 seconds** long.',
'Memorize your first sentence so you can look at the judges.',
'Take a breath before you begin.',
'A strong start helps you feel confident for the rest of your speech.',
"Practice walking in and saying your first sentence right away, so starting feels natural.",
"Practice your first sentence while looking at a family member. It helps you get used to eye contact at the start.",
chk('Which opening is strongest?',['“My grandma held my hand tightly in the waiting room.”','“Hi, my speech is about standards.”','“Um, okay.”','“I am going to talk now.”'],'Start with something interesting.')]],
['Opening templates',[
'Try one of these templates. **Story:** “One day, ______ happened.” **Question:** “Have you ever ______?” **Fact:** “Did you know that ______?” **Bold statement:** “It is time to ______.”',
'Pick the one that fits your speech best.',
'After your hook, say your main idea: “Today I believe we can redefine the standard of ______ by ______.”',
'Then tell your three points briefly: “First…, next…, and finally….”',
'Practice your opening many times.',
'Ask someone which version they like best.',
"You can combine templates, like a question followed by a short story. Choose what feels best to you.",
match('Template and example',[['Story','“My grandma held my hand tightly in the waiting room.”'],['Question','“Have you ever felt like no one was listening?”'],['Fact','“Did you know listening can help patients feel calmer?”'],['Bold statement','“It is time to make listening the new standard.”'],['Main idea','“We can redefine the standard of care by listening.”'],['Preview','“First…, next…, and finally….”']])]],
['Putting the opening together',[
'A complete opening has three parts: **1. Hook** (story, question, fact or bold statement), **2. Main idea** and **3. Preview** of your three points.',
'For example: “Have you ever felt like no one was listening? Today I believe we can redefine the standard of care by listening to every patient. First, why listening matters; next, what gets in the way; and finally, how we can listen better.”',
'Keep it short and clear.',
'Look at the judges when you say your main idea.',
'Pause after your hook to let it sink in.',
'Your opening is now ready to practice.',
"Say your preview slowly so judges can remember your three points.",
order('Opening parts',['Hook','Pause','Main idea','Preview of three points'])]],
['Why closings matter',[
'Your **closing** is the last thing judges hear. A strong closing **reminds** judges of your main idea and **ends with something memorable**.',
'Signal the end with words like “**In closing**” or “**So remember**.”',
'Your closing should be about **30 seconds** long.',
'Do not add new ideas in your closing.',
'Speak a little slower as you finish.',
'End with confidence, not with “That’s it.”',
"Look at all the judges during your closing. It helps your final message reach everyone.",
"Your closing is your last chance to share your main idea, so say it with feeling.",
sort('Strong or weak closing?',['Strong','Weak'],[['“So remember: listening is the new standard of care.”',0],['“That’s it.”',1],['“In closing, let’s all ask one more question.”',0],['“Um, I’m done, I think.”',1],['Returning to the opening story',0]])]],
['Closing templates',[
'A simple closing has three parts: **1. Signal** (“In closing…”), **2. Main idea again** and **3. Call to action or final thought** (“Let’s all…” or a short line that connects to your opening).',
'Example: “In closing, we can redefine the standard of care by listening to every patient. Next time you visit someone, sit down, look at them and ask how they feel. Like the nurse who helped my grandma, you can make someone feel safe.”',
'A **call to action** asks listeners to do something.',
'Going back to your opening story makes your speech feel complete.',
'Memorize your last sentence.',
'Pause and smile after your final words.',
"A short closing is better than a long one. Three or four sentences are usually enough.",
"Write your closing on its own notecard in a special color so it is easy to find.",
ex('Writing a closing','Write a closing (example).',['Signal: “In closing,”','Main idea: “we can redefine the standard of care by listening to every patient.”','Call to action: “Next time, sit down and ask how someone feels.”','Final line: “You can make someone feel safe, like the nurse who helped my grandma.”'],'A complete, memorable closing.')]],
['Practicing your opening and closing',[
'Practice your opening and closing **more than any other part**. Say them every day.',
'Practice in front of a mirror, your family or your advisor.',
'Try saying them while looking at a person, not your notes.',
'Record yourself and listen. Are you clear and confident?',
'If you get nervous on speech day, your well-practiced opening will help you start strong.',
'A confident closing helps you finish strong too.',
"On speech day, say your opening once quietly to yourself before you walk in.",
sort('Good practice idea?',['Good idea','Not helpful'],[['Saying the opening every day',0],['Only reading it once',1],['Practicing with a family member',0],['Never practicing the closing',1],['Recording and listening back',0]])]],
['Practice scenario',[
kase('Opening and closing',{a:{text:'Your opening is “Hi, my speech is about standards.” (Scenario invented for practice.) How can you make it stronger?',choices:[['Start with a story, question or fact, then say your main idea','b','Correct.',true],['Keep it','b','A hook grabs attention.',false]]},b:{text:'Your closing adds a brand-new idea. What should you do?',choices:[['Remove the new idea and remind judges of your main idea instead','c','Correct.',true],['Add more new ideas','c','Closings should not add new ideas.',false]]},c:{text:'Your opening and closing are clear and strong.',end:true}})]]
],takeaways:['A strong opening (10 points) has a hook (story, question, fact or bold statement), your main idea and a preview of three points, in about 30 seconds.','A strong closing (10 points) signals the end, repeats your main idea and ends with a call to action or a final line connected to your opening, without new ideas.','Memorize and practice your opening and closing more than any other part, with eye contact, pauses and confidence.'],terms:[['Hook','The first sentence that grabs attention.'],['Preview','A quick list of your three points.'],['Call to action','Asking listeners to do something.']],mcqs:[q('How many points is the opening worth?','10','60','1','100','Rubric.'),q('Which is a good opening template?','A question','“Hi, my speech is about…”','“Um, okay.”','Silence','Hook.'),q('What comes after the hook?','Your main idea','Your closing','A joke','Nothing','Order.'),q('Which signals the end of your speech?','“In closing…”','“Um…”','“That’s it.”','“Bye.”','Signal.'),q('Should you add new ideas in your closing?','No','Yes','Only many','Always','Closing.'),q('What is a call to action?','Asking listeners to do something','A phone call','A new topic','A joke','Definition.'),q('About how long should the closing be?','About 30 seconds','About 3 minutes','About 1 second','About 10 minutes','Timing.'),q('Which parts should you practice most?','The opening and closing','Only the middle','None','Only the title','Practice.')],frq:{prompt:'Write an opening and a closing for your speech and explain each part.',rubric:[['Opening',['hook','story','question','fact','main idea','preview']],['Closing',['signal','in closing','main idea','call to action','final line']],['Connection',['opening','closing','story','connect','no new ideas']],['Practice',['practice','memorize','eye contact','pause','record']]],model:'My opening would start with a question hook: “Have you ever felt like no one was listening?” I would pause to let it sink in. Then I would say my main idea: “Today I believe we can redefine the standard of care by listening to every patient.” Next, I would preview my three points: “First, why listening matters; next, what gets in the way; and finally, how we can listen better.” This opening takes about 30 seconds, grabs attention and tells judges my topic. My closing would begin with a signal: “In closing.” Then I would repeat my main idea: “we can redefine the standard of care by listening to every patient.” I would give a call to action: “Next time you visit someone, sit down, look at them and ask how they feel.” I would finish with a final line that connects back to my grandma’s story: “You can make someone feel safe, just like the nurse who helped my grandma.” I would not add any new ideas in the closing. I would memorize my first and last sentences, practice my opening and closing every day in front of a mirror and my family, record myself to check that I sound clear and confident and pause and smile after my final words.'},sources:[RULES,TM]};

export const SK7={title:'Notecards and memory helpers',hook:'You may use notecards in your speech, and they can help you feel safe. But notecards work best with a few key words, not your whole speech. In this lesson, you will make simple notecards and try memory helpers so you can look at the judges more and read less.',objectives:['Make simple, clear notecards.','Use key words instead of full sentences.','Try memory helpers that work for you.','Practice using notecards smoothly.'],sections:[
['Notecard rules',[
'Notecards can be **paper** or **electronic**. Electronic notecards, like on a tablet or phone, **cannot be shown to judges**. No other props or materials are allowed.',
'Notecards help you remember your ideas, but judges want to see your face, not the top of your head.',
'Use them as reminders, not as a script.',
'Practice with the same cards you will use on speech day.',
'Number your cards so they stay in order.',
'Keep them neat and easy to read.',
"Use thick paper or index cards so they are easy to hold and do not bend.",
chk('Can you show your electronic notecards to the judges?',['No','Yes','Only the first card','Only if they ask'],'Electronic notes are not shown.')]],
['Making key-word cards',[
'Write **key words**, not full sentences. For example, instead of writing “First, let’s talk about why listening matters for patients,” write “**1. Why listening matters — Grandma story**.”',
'Use **one card for each part**: opening, Point 1, Point 2, Point 3 and closing.',
'Write in **big, clear letters** so you can read them quickly.',
'Use bullet points or short lines.',
'Highlight your main idea and connecting words.',
'Leave space so cards are not crowded.',
"Use dark ink and big letters. Light colors can be hard to read under bright lights.",
"Put a small check mark on each card after you practice with it. It shows how much you have practiced.",
ex('A key-word card','Make a card for Point 1 (example).',['Card number: 2','Heading: Point 1 — Why listening matters','Key words: Grandma scared → nurse sat down → Grandma calm','Connecting word: “First”','Main idea reminder: listening = new standard'],'A simple card with only what you need.')]],
['Memory helpers',[
'**Memory helpers** make it easier to remember your speech. Try: **colors** (a different color for each point), **pictures** (a small drawing, like an ear for listening), **counting on fingers** (one finger per point) or a **keyword chain** (“Listen – Busy – Better”).',
'Choose one or two helpers that work for you.',
'Practice with them every day.',
'Your accommodations may include support with memory or reading.',
'Talk with your advisor about what helps you most.',
'There is no wrong way to remember.',
"Try your memory helpers with a practice partner, who can remind you of the helper if you get stuck.",
"Some students tap their leg gently for each point to remember the order. Try it and see if it helps.",
match('Memory helper and how it works',[['Colors','A different color for each part'],['Pictures','Small drawings as reminders'],['Counting on fingers','One finger per point'],['Keyword chain','Short words in order'],['Repeating aloud','Saying the speech many times'],['Practice partner','Someone who helps you rehearse']])]],
['Using notecards smoothly',[
'Hold your cards at **waist level** in one hand. **Glance down**, read a few words, then **look up** at the judges and speak.',
'When you finish a card, move it to the back of the pile.',
'Do not wave the cards or play with them.',
'If you lose your place, pause, look at your card and keep going.',
'Practice holding your cards while speaking so it feels natural.',
'The less you look at cards, the more you connect with judges.',
"If your hands shake when nervous, hold the cards with both hands at your waist.",
order('Using a notecard',['Glance down at the card','Read a few key words','Look up at the judges','Say your sentence','Move to the next card when done'])]],
['Memorizing the most important parts',[
'Try to **memorize** your **first sentence**, your **main idea** and your **last sentence**. These are the most important parts.',
'Say them out loud many times a day until you know them by heart.',
'Then you can look at the judges at the most important moments.',
'You can still use cards for the middle of your speech.',
'Memorizing a little makes you feel more confident.',
'Practice in different places so you remember them anywhere.',
"Saying your main idea before bed each night can help you remember it well.",
"Practice your memorized lines in the car, at breakfast or before bed. Short practice adds up.",
sort('Good to memorize?',['Memorize','Use cards'],[['Your first sentence',0],['Your main idea',0],['Your last sentence',0],['Details in the middle of a point',1],['Exact numbers in a fact',1]])]],
['Practicing with your cards',[
'Practice your speech with your cards every day. Each week, try to look at your cards **a little less**.',
'Ask a family member to tell you when you are looking down too much.',
'Record yourself and watch how often you look up.',
'Celebrate each time you use your cards less.',
'By speech day, cards will be a helpful backup.',
'You will feel more confident each time.',
"Keep a spare set of cards in your bag in case one gets lost or wrinkled.",
chk('What should happen over weeks of practice?',['You look at your cards less','You add more words to cards','You stop practicing','You read every word'],'Build confidence.')]],
['Practice scenario',[
kase('Notecard check',{a:{text:'Your notecards have your whole speech written in small letters. (Scenario invented for practice.) What should you change?',choices:[['Write only key words in big letters','b','Correct.',true],['Write even smaller to fit more','b','Key words are easier to read.',false]]},b:{text:'During your speech you lose your place. What do you do?',choices:[['Pause, glance at your card and keep going','c','Correct.',true],['Stop and leave','c','Pause and continue calmly.',false]]},c:{text:'Your cards help you without getting in the way.',end:true}})]]
],takeaways:['Notecards (paper or electronic) are allowed but electronic notes cannot be shown to judges; no other props.','Write key words in big letters on numbered cards, one per part, and try memory helpers like colors, pictures, finger counting or keyword chains.','Hold cards at waist level, glance down and look up to speak, memorize your first sentence, main idea and last sentence and use cards less each week.'],terms:[['Key words','A few important words that remind you of an idea.'],['Memory helper','A trick that helps you remember.'],['Notecard','A small card with reminders for your speech.']],mcqs:[q('What should notecards have?','Key words','Your whole speech','Nothing','Pictures for judges','Notecards.'),q('Can you show electronic notes to judges?','No','Yes','Only once','Only at the end','Rule.'),q('Where should you hold your cards?','At waist level','In front of your face','Behind your back','On the floor','Holding.'),q('Which is a memory helper?','Using a different color for each point','Skipping practice','Talking fast','Hiding cards','Helpers.'),q('What should you memorize?','Your first sentence, main idea and last sentence','Nothing','Only the middle','The judges’ names','Memorize.'),q('Why number your cards?','So they stay in order','To make them heavier','For decoration','It is not useful','Order.'),q('If you lose your place, you should:','Pause and look at your card','Leave','Cry','Start over','Calm.'),q('Over time, you should look at your cards:','Less','More','The whole time','Never practice','Progress.')],frq:{prompt:'Explain how you would make and use notecards and memory helpers for your speech.',rubric:[['Card rules',['paper','electronic','not shown','no props','numbered']],['Key-word cards',['key words','big letters','one card','part','highlight']],['Memory helpers',['colors','pictures','fingers','keyword chain','accommodations']],['Using cards',['waist','glance','look up','memorize','less']]],model:'I would make five numbered notecards, one for each part of my speech: opening, Point 1, Point 2, Point 3 and closing. On each card, I would write only key words in big, clear letters, like “Point 1 — Why listening matters — Grandma scared → nurse sat down → Grandma calm,” and I would highlight my main idea and connecting words. I know electronic notecards cannot be shown to judges and no other props are allowed, so I would use simple paper cards. For memory helpers, I would use a different color for each point and a small drawing of an ear on my listening card, and I would count my three points on my fingers while practicing. I would talk with my advisor about accommodations that help me remember. During my speech, I would hold the cards at waist level, glance down to read a few words, then look up at the judges and speak, moving each card to the back when I finish it. I would memorize my first sentence, my main idea and my last sentence so I can look at the judges at the most important moments. If I lost my place, I would pause, look at my card and keep going. Each week, I would practice looking at my cards a little less.'},sources:[RULES,EDL]};

export const SK8={title:'Using your voice',hook:'Your voice carries your message. There are no microphones in this event, so you need to speak loudly and clearly enough for every judge to hear. Judges score your voice and how clearly you speak. With practice, you can make your voice strong, steady and interesting.',objectives:['Speak loudly enough without a microphone.','Speak at a good speed with pauses.','Change your voice to show feeling.','Speak clearly without filler words.'],sections:[
['Speaking loudly',[
'Since there are **no microphones**, speak loudly enough for the person farthest away to hear you. Imagine you are talking to someone at the back of the room.',
'Stand tall and take a deep breath before you speak. Breathing from your belly makes your voice stronger.',
'Loud does not mean shouting. It means strong and clear.',
'Practice in a big room, like a classroom or gym.',
'Ask a friend at the back of the room if they can hear you.',
'Your accommodations may include support, so talk with your advisor.',
"Speak to the judges, not to the floor. Lifting your chin helps your voice travel farther.",
"Take a breath before each new point. It gives your voice power and helps you stay calm.",
sort('Good for a strong voice?',['Helps','Does not help'],[['Standing tall and breathing deeply',0],['Mumbling into your cards',1],['Imagining someone at the back of the room',0],['Whispering',1],['Practicing in a big room',0]])]],
['Speed and pauses',[
'Speak at a **comfortable speed**—not too fast and not too slow. When people are nervous, they often talk fast. Slow down on purpose.',
'Use **pauses** after important sentences. A pause helps judges think about what you said.',
'Pause after your hook, your main idea and before your last sentence.',
'Mark pauses on your notecards with a slash (/).',
'Practice with a timer to find a good speed.',
'Pauses make you sound calm and confident.',
"Count “one, two” silently during a pause. It helps you pause long enough.",
order('Where to pause',['After your hook','After your main idea','Between your points','Before your last sentence'])]],
['Showing feeling with your voice',[
'Change your voice to show feeling. Speak **a little softer** for a sad or gentle part of your story. Speak **a little louder and faster** when you are excited.',
'Change your **pitch** too—your voice can go higher or lower. This keeps your speech interesting.',
'A voice that stays the same the whole time is called **monotone**. It can be hard to listen to.',
'Practice reading a story to a child with lots of expression.',
'Let your feelings about your topic show in your voice.',
'Record yourself and listen for changes.',
"Mark words to say louder or softer on your cards with simple symbols, like an up arrow or down arrow.",
"Smile during happy parts. Smiling can make your voice sound warmer and friendlier.",
match('Voice change and when to use it',[['Softer voice','A gentle or sad part of your story'],['Louder voice','An important or exciting point'],['Slower speed','Your main idea'],['Faster speed','Exciting moments'],['Pause','After important sentences'],['Higher or lower pitch','To keep your speech interesting']])]],
['Speaking clearly',[
'Say each word **clearly**. Open your mouth and finish the ends of words. Practice saying hard words slowly first, then at normal speed.',
'Judges score **diction**—how clearly and correctly you speak.',
'Practice tongue twisters to warm up, like “Red leather, yellow leather.”',
'Look up how to say any word you are not sure about.',
'Speak in full sentences.',
'Clear words help judges understand your great ideas.',
"If a word is hard to say, practice it ten times a day for a week. It will become easy.",
"Ask your advisor to listen for words that are hard to understand, and practice those words more.",
ex('Practicing clear speech','Warm up your voice before practice (example).',['Hum for 10 seconds','Say “Red leather, yellow leather” five times slowly','Say your hard words slowly, then at normal speed','Read your opening out loud clearly'],'A short warm-up for clear speech.')]],
['Fewer filler words',[
'**Filler words** are sounds like “**um**,” “**uh**,” “**like**” and “**you know**.” Judges notice them, and too many can lower your score.',
'Instead of saying “um,” **pause** silently. A pause sounds confident.',
'Practice by asking a friend to clap gently each time you say a filler word.',
'Knowing your speech well helps reduce fillers.',
'It is normal to have a few. Try to have fewer each week.',
'Count your fillers in recordings to track progress.',
"Do not worry if a filler slips out. Just pause and keep going.",
chk('What should you do instead of saying “um”?',['Pause silently','Say “like”','Talk faster','Shout'],'Silence sounds confident.')]],
['Practicing your voice',[
'Practice your voice every day. Read your speech out loud, record it and listen. Ask yourself: **Was I loud enough? Did I pause? Did my voice change? Did I speak clearly?**',
'Pick one thing to work on each day, like pausing more.',
'Practice for different listeners so you get used to people.',
'Drink water to keep your voice ready.',
'Rest your voice if it feels tired.',
'Your voice will get stronger with practice.',
"Drink water before your speech, but not right before, so you do not need a break.",
sort('Voice checklist item?',['On the checklist','Not on the checklist'],[['Was I loud enough?',0],['Did I pause after big ideas?',0],['Did my voice change to show feeling?',0],['What color are my shoes?',1],['Did I speak clearly?',0]])]],
['Practice scenario',[
kase('Voice check',{a:{text:'In practice, your friend at the back says they cannot hear you. (Scenario invented for practice.) What do you do?',choices:[['Stand tall, breathe deeply and speak louder toward the back','b','Correct.',true],['Speak faster','b','Speed does not fix volume.',false]]},b:{text:'You say “um” many times. How can you improve?',choices:[['Pause silently instead and practice more','c','Correct.',true],['Say “like” instead','c','Pauses are better than fillers.',false]]},c:{text:'Your voice is loud, clear and interesting.',end:true}})]]
],takeaways:['With no microphones, speak loudly and clearly for the back of the room by standing tall and breathing deeply.','Speak at a comfortable speed with pauses after your hook, main idea and before your last sentence; change volume, speed and pitch to show feeling and avoid monotone.','Speak clearly with warm-ups and correct pronunciation, replace filler words with silent pauses and practice your voice daily with recordings.'],terms:[['Monotone','A voice that stays the same and does not change.'],['Filler word','A sound like “um” that adds no meaning.'],['Diction','How clearly and correctly you speak.']],mcqs:[q('Are microphones used in Speaking Skills?','No','Yes','Only for finals','Only if you ask','Rule.'),q('How can you make your voice stronger?','Stand tall and breathe deeply','Whisper','Mumble','Look down','Voice.'),q('When should you pause?','After your main idea','In the middle of every word','Never','Only at the start','Pauses.'),q('What is monotone?','A voice that stays the same','A very loud voice','A song','A fast voice','Definition.'),q('Which is a filler word?','Um','Patient','Listen','Standard','Fillers.'),q('What should replace filler words?','Silent pauses','More fillers','Shouting','Humming','Fix.'),q('Which helps clear speech?','Warm-up tongue twisters','Talking with your mouth closed','Rushing','Skipping words','Diction.'),q('Why change your voice?','To show feeling and keep it interesting','To confuse judges','To be silly','It is not allowed','Variety.')],frq:{prompt:'Explain how you would use your voice to give a strong speech without a microphone.',rubric:[['Loudness',['loud','no microphone','back of the room','breathe','stand tall']],['Speed and pauses',['speed','slow','pause','main idea','last sentence']],['Feeling',['softer','louder','pitch','monotone','feeling']],['Clarity',['clear','diction','warm-up','fillers','um','pause']]],model:'Since there are no microphones, I would speak loudly and clearly enough for the person at the back of the room to hear me. I would stand tall, take a deep breath from my belly and imagine I am talking to someone far away, without shouting. I would practice in a big classroom and ask a friend at the back if they could hear me. I would speak at a comfortable speed, slowing down on purpose because I tend to talk fast when nervous, and I would pause after my hook, after my main idea, between my points and before my last sentence, marking pauses on my notecards with a slash. To show feeling, I would speak a little softer during the gentle part of my grandma’s story and a little louder when I give my call to action, and I would change my pitch so I am not monotone. To speak clearly, I would warm up with humming and “Red leather, yellow leather,” practice hard words slowly and speak in full sentences. Instead of saying “um,” I would pause silently, and I would ask a friend to clap gently each time I used a filler word. Every day, I would record my speech and check if I was loud, paused, showed feeling and spoke clearly.'},sources:[RULES,TM]};

export const SK9={title:'Body language and eye contact',hook:'Judges watch you as well as listen. How you stand, where you look and how you move all send a message. Stage presence—poise, posture, eye contact and enthusiasm—is part of your score. With practice, your body can help tell your story.',objectives:['Stand with good posture.','Make eye contact with the judges.','Use simple, natural gestures.','Show enthusiasm with your face.'],sections:[
['Standing tall',[
'Stand **tall** with your **feet flat** and about shoulder-width apart. Keep your shoulders relaxed and your head up.',
'Try not to **sway**, **rock** or **shift** from foot to foot. Plant your feet like a tree.',
'Good posture helps you look confident and helps your voice sound strong.',
'If you use a wheelchair or other support, sit or position yourself tall and comfortable, facing the judges.',
'Practice standing tall in front of a mirror.',
'Take a deep breath to relax your body before you start.',
"Take one slow breath before you start. It helps your body relax and stand tall.",
sort('Good posture?',['Good posture','Not good posture'],[['Standing tall with feet flat',0],['Rocking back and forth',1],['Shoulders relaxed and head up',0],['Slouching with head down',1],['Feet planted like a tree',0]])]],
['Eye contact',[
'**Eye contact** means looking at the judges while you speak. It helps them feel connected to you.',
'Look at **one judge** for a sentence, then move to **another judge**. Try to look at each judge during your speech.',
'If direct eye contact is hard, look at a judge’s **forehead** or **eyebrows**. It looks like eye contact.',
'Look up from your notecards as much as you can.',
'Practice with family members sitting where judges would sit.',
'Your accommodations may help with this; ask your advisor.',
"Practice eye contact with family by looking at a different person for each sentence.",
"If you feel nervous, start by looking at the judge who smiles or nods. Then look at the others.",
chk('Eye contact feels hard for you. What can you try?',['Look at the judge’s forehead or eyebrows','Look at the floor','Close your eyes','Look only at the ceiling'],'A helpful strategy.')]],
['Simple gestures',[
'**Gestures** are hand movements that help explain your words. For example, hold up **one finger** for your first point, **open your hands** when you talk about listening or **point to yourself** when you say “I.”',
'Use gestures that feel **natural**. You do not need many.',
'When you are not gesturing, let your hands rest at your sides or hold your notecards at your waist.',
'Avoid fidgeting, like playing with your hair or clothes.',
'Practice gestures in a mirror.',
'Gestures can make your speech more interesting to watch.',
"Plan two or three gestures for key moments. You do not need to move your hands all the time.",
"Keep gestures at chest or waist level so judges can see them clearly.",
match('Words and gesture',[['“First…”','Hold up one finger'],['“Listening”','Cup a hand near your ear or open your hands'],['“All of us”','Open arms toward the judges'],['“I believe”','Hand on your chest'],['“Three ways”','Hold up three fingers'],['Resting','Hands at your sides or holding cards']])]],
['Showing enthusiasm',[
'**Enthusiasm** means showing that you care about your topic. **Smile** when you talk about hopeful ideas. Let your face look **serious** when you talk about problems.',
'Your face should match your words.',
'If you believe in your message, enthusiasm comes naturally.',
'Practice in a mirror to see your expressions.',
'Smiling at the start and end helps judges feel welcomed.',
'Enthusiasm makes your speech more memorable.',
"Think of something happy right before you walk in. It helps you smile naturally.",
sort('Matches the words?',['Matches','Does not match'],[['Smiling when sharing a hopeful idea',0],['Laughing during a sad part of your story',1],['Looking serious when describing a problem',0],['Frowning during your happy ending',1],['Bright face during your call to action',0]])]],
['Walking in and out',[
'**Walking in:** stand tall, walk calmly to your spot, look at the judges, smile, take a breath and begin.',
'**Walking out:** after your last sentence, pause, smile, say “Thank you” if you want and walk out calmly.',
'How you enter and leave is part of your stage presence.',
'Wear business clothes or the HOSA uniform for bonus points.',
'Do not chew gum or carry extra items.',
'Practice walking in and out at home.',
"Find out where you will stand before speech day if you can, so the room feels familiar.",
"Stand still for a moment after your last sentence before walking out. It shows you are finished and proud.",
order('Walking in',['Walk in calmly','Stand in your spot','Look at the judges and smile','Take a deep breath','Begin your speech'])]],
['Practicing body language',[
'Practice in front of a **mirror** or **record a video**. Watch the video once **with the sound off** to see only your body language.',
'Ask yourself: Am I standing tall? Am I looking at people? Are my gestures natural? Does my face match my words?',
'Pick one thing to improve each practice.',
'Ask your family or advisor for feedback.',
'Celebrate each improvement.',
'Your body language will become more natural over time.',
"Ask your advisor to watch your body language and give one tip each week.",
ex('A body language check','Review a practice video (results invented for practice).',['Posture: good, but rocking during Point 2','Eye contact: looked at cards a lot in the opening','Gestures: nice “one, two, three” fingers','Face: smiled at the end','Goal: plant feet and look up more in the opening'],'A clear goal for the next practice (results invented for practice).')]],
['Practice scenario',[
kase('Body language check',{a:{text:'In your video, you rock back and forth during the whole speech. (Scenario invented for practice.) What can you do?',choices:[['Plant your feet flat, shoulder-width apart','b','Correct.',true],['Rock faster','b','Standing still looks confident.',false]]},b:{text:'You look only at your cards. How can you improve?',choices:[['Glance at cards, then look up at each judge for a sentence','c','Correct.',true],['Hold cards in front of your face','c','Eye contact connects you with judges.',false]]},c:{text:'Your body language now supports your message.',end:true}})]]
],takeaways:['Stand tall with feet flat and shoulder-width apart (or sit tall and comfortable), shoulders relaxed and head up; avoid swaying and rocking.','Make eye contact with each judge for a sentence at a time (forehead or eyebrows if direct eye contact is hard); use a few natural gestures and rest hands when not gesturing.','Show enthusiasm with a face that matches your words, walk in and out calmly in professional dress and practice with a mirror or video, watching once with the sound off.'],terms:[['Stage presence','How you look and act while speaking: posture, eye contact and enthusiasm.'],['Gesture','A hand movement that helps explain your words.'],['Posture','How you hold your body.']],mcqs:[q('How should you stand?','Tall with feet flat','Rocking','Slouching','On one foot','Posture.'),q('Eye contact means:','Looking at the judges while you speak','Looking at the floor','Closing your eyes','Looking at your phone','Definition.'),q('If eye contact is hard, you can look at:','The judge’s forehead or eyebrows','The ceiling','Your shoes','Nothing','Strategy.'),q('Which gesture fits “First…”?','Holding up one finger','Crossing arms','Hiding hands','Waving wildly','Gestures.'),q('Your face should:','Match your words','Always frown','Never change','Look bored','Enthusiasm.'),q('How should you walk in?','Calmly, then smile and breathe','Running','Talking on the way','Looking at the floor','Entry.'),q('Why watch your practice video with the sound off?','To see only your body language','To save battery','It is required','To skip practice','Practice.'),q('Which is fidgeting?','Playing with your hair','Standing still','Smiling','Using a gesture','Habits.')],frq:{prompt:'Explain how you would use body language and eye contact in your speech.',rubric:[['Posture',['stand tall','feet flat','shoulders','no swaying','plant']],['Eye contact',['eye contact','each judge','forehead','look up','cards']],['Gestures and face',['gestures','natural','one finger','hands','smile','match']],['Entry and practice',['walk in','calm','breath','mirror','video','sound off']]],model:'I would stand tall with my feet flat and about shoulder-width apart, my shoulders relaxed and my head up, planting my feet like a tree so I do not rock or sway. I would make eye contact by looking at one judge for a sentence and then moving to another, so each judge feels included; if direct eye contact felt hard, I would look at their foreheads. I would glance at my notecards only briefly and look up as much as I can. I would use a few natural gestures, like holding up one, two and three fingers for my three points, opening my hands when I talk about listening and putting a hand on my chest when I say “I believe,” and I would rest my hands at my sides or hold my cards at my waist the rest of the time, without fidgeting. To show enthusiasm, I would smile during hopeful parts and look serious when describing problems, so my face matches my words. When I walk in, I would move calmly to my spot, look at the judges, smile, take a deep breath and begin, and at the end I would pause, smile and walk out calmly, wearing my HOSA uniform for bonus points. I would practice in a mirror and record videos, watching once with the sound off to check my body language and picking one goal each time.'},sources:[RULES,TM]};

export const SK10={title:'Practice, staying calm and competition day',hook:'Practice turns a good speech into a great one. Every time you practice, you get more comfortable, more confident and more ready. In this final lesson, you will make a practice plan, learn calming strategies and get ready for speech day.',objectives:['Make a weekly practice plan.','Use feedback to improve.','Use calming strategies before and during your speech.','Get ready for competition day.'],sections:[
['A weekly practice plan',[
'Practice a little every day. A simple plan: **Monday**—practice the opening and closing. **Tuesday**—practice Point 1. **Wednesday**—practice Points 2 and 3. **Thursday**—full speech with a timer. **Friday**—full speech for someone. **Weekend**—rest or a quick review.',
'Five to fifteen minutes a day is enough.',
'Check off each practice on a calendar.',
'Practice standing up, like on speech day.',
'Try practicing in your speech clothes sometimes.',
'Small daily practice builds big confidence.',
"If you miss a day, that is okay. Just practice again the next day.",
"Practice in front of a pet or a stuffed animal if you feel shy at first. It still counts as practice.",
order('Weekly practice plan',['Monday: opening and closing','Tuesday: Point 1','Wednesday: Points 2 and 3','Thursday: full speech with timer','Friday: full speech for a listener'])]],
['Getting feedback',[
'Ask your advisor, teacher or family to listen. Give them a short list of questions: **What was my main idea? Could you hear me? Did I look at you? What was my best part? What is one thing I can do better?**',
'Listen to their ideas and pick **one thing** to work on next.',
'Say thank you for their help.',
'Different listeners notice different things.',
'Keep a notebook of feedback.',
'Feedback helps you grow faster.',
"Write down the feedback you get so you can remember it later.",
sort('Good feedback question?',['Good question','Not helpful'],[['“What was my main idea?”',0],['“What should I eat for dinner?”',1],['“Could you hear me?”',0],['“What is one thing I can do better?”',0],['“Do you like my shoes?”',1]])]],
['Practicing like the real event',[
'A few times before competition, practice **just like the real event**. Have someone act as a judge, sit at a table and hold up a card at **one minute left**. Stop at **five minutes**.',
'Walk in, give your full speech and walk out.',
'Practice in a new room so you get used to different places.',
'Wear your speech clothes.',
'This helps you feel calm on the real day.',
'Ask your “judge” to keep a calm face so you get used to it.',
"After a practice like the real event, think about what felt easy and what felt hard.",
"Try practicing once in a room you have never used. New places can feel strange, and practice helps you adjust.",
chk('What should your practice “judge” do?',['Hold up a card at one minute left and stop you at five minutes','Talk the whole time','Leave the room','Read your speech for you'],'Like the real event.')]],
['Calming strategies',[
'Feeling nervous is normal. Try these calming strategies: **slow breathing** (in for 4, out for 6), **squeezing and relaxing** your hands, **counting to five slowly** or **thinking of a happy place**.',
'Say kind words to yourself: “**I practiced. I am ready. I can do this.**”',
'Use the strategies that help you at school.',
'Your accommodations might include a quiet place to wait.',
'Remember: judges want you to do well.',
'A little nervousness can give you energy.',
"Try your calming strategy during practice too, so it feels familiar on speech day.",
"Bring a small comfort item in your pocket if it helps you feel calm, as long as you do not show it during your speech.",
match('Calming strategy and how to do it',[['Slow breathing','In for 4 counts, out for 6'],['Hand squeeze','Squeeze tight, then relax'],['Counting','Count slowly to five'],['Happy place','Picture somewhere calm'],['Kind words','“I practiced. I am ready.”'],['Quiet waiting','Ask about a calm waiting area']])]],
['If something goes wrong',[
'If you **forget a part**, pause, look at your card and keep going. Judges usually do not notice.',
'If there is a **noise**, pause until it is quiet, then continue.',
'If the **one-minute card** comes early, go to your closing.',
'If you **make a mistake**, keep going—you do not need to start over.',
'Staying calm shows judges you are poised.',
'Every speaker makes small mistakes. What matters is how you keep going.',
"Practice what you will do if you forget something, so you feel ready if it happens.",
"Remember that every speaker gets nervous sometimes. Being brave enough to try is already a success.",
sort('Good response?',['Good response','Not a good response'],[['Pausing and looking at your card',0],['Starting your speech over',1],['Going to your closing when the card comes',0],['Leaving the room',1],['Continuing after a small mistake',0]])]],
['Competition day checklist',[
'**The night before:** lay out your clothes, put your notecards and photo ID in your bag and get good sleep. **In the morning:** eat breakfast and drink water.',
'**Before your speech:** arrive early, use the bathroom, do a voice warm-up and a calming strategy.',
'**During:** walk in calmly, smile, breathe and begin. **After:** smile, say thank you if you want and walk out calmly.',
'Make sure your accommodation form was submitted before May 15.',
'Be proud of all your hard work.',
'You are ready!',
"After your speech, think of one thing you did well. Be proud of your courage.",
"Share what you learned with a younger HOSA member. Helping others is a great way to grow.",
ex('Competition day checklist','Plan your day (example).',['Night before: clothes, notecards, photo ID ready','Morning: breakfast and water','Arrive early','Voice warm-up and slow breathing','Walk in, smile, breathe and begin','After: smile and walk out calmly'],'A calm, prepared speech day.')]],
['Practice scenario',[
kase('Speech day',{a:{text:'You feel very nervous while waiting. (Scenario invented for practice.) What can you do?',choices:[['Use slow breathing and tell yourself, “I practiced. I am ready.”','b','Correct.',true],['Leave','b','Calming strategies help.',false]]},b:{text:'You forget a sentence in the middle of Point 2. What do you do?',choices:[['Pause, look at your card and keep going','c','Correct.',true],['Start over from the beginning','c','Keep going calmly.',false]]},c:{text:'You finish your speech proud and calm.',end:true}})]]
],takeaways:['Practice a little every day with a weekly plan, standing up, with a timer and sometimes in speech clothes.','Ask listeners specific feedback questions, pick one thing to improve and practice like the real event with a one-minute card and a five-minute stop.','Use calming strategies (slow breathing, hand squeezes, counting, kind words), keep going calmly if something goes wrong and follow a competition-day checklist with photo ID and notecards.'],terms:[['Practice plan','A schedule of what to practice each day.'],['Feedback','Ideas from others about how to improve.'],['Calming strategy','A way to relax your body and mind.']],mcqs:[q('How often should you practice?','A little every day','Once a year','Only the night before','Never','Plan.'),q('Which is a good feedback question?','“What was my main idea?”','“Do you like my shoes?”','“What’s for dinner?”','“Is it raining?”','Feedback.'),q('In a practice like the real event, when is the card shown?','At one minute left','At the start','Never','At three minutes','Realism.'),q('Which is a calming strategy?','Slow breathing','Running around','Skipping breakfast','Arriving late','Calm.'),q('If you forget part of your speech, you should:','Pause, look at your card and continue','Start over','Leave','Stop talking','Recovery.'),q('If the one-minute card comes early, you should:','Go to your closing','Ignore it','Talk faster','Start over','Strategy.'),q('What should you bring on speech day?','Photo ID and notecards','Props','A poster','A microphone','Rule.'),q('What kind words can help?','“I practiced. I am ready.”','“I can’t.”','“I’ll fail.”','“Whatever.”','Self-talk.')],frq:{prompt:'Describe your practice plan, calming strategies and competition day steps.',rubric:[['Practice plan',['every day','opening','points','timer','listener','standing']],['Feedback and simulation',['feedback','questions','one thing','judge','one minute','five minutes']],['Calming',['breathing','squeeze','counting','kind words','accommodations']],['Competition day',['photo id','notecards','arrive early','warm-up','keep going','proud']]],model:'My practice plan would have short practices every day: on Monday I would practice my opening and closing, on Tuesday Point 1, on Wednesday Points 2 and 3, on Thursday my full speech with a timer and on Friday my full speech for my family or advisor. I would practice standing up and sometimes in my HOSA uniform, checking off each day on a calendar. I would ask listeners: What was my main idea? Could you hear me? Did I look at you? What was my best part? What is one thing I can do better? Then I would pick one thing to work on. A few times before competition, I would practice just like the real event, with someone acting as a judge who holds up a card at one minute left and stops me at five minutes. To stay calm, I would use slow breathing—in for four counts and out for six—squeeze and relax my hands and tell myself, “I practiced. I am ready.” If I forgot a part, I would pause, look at my card and keep going; if the time card came early, I would go to my closing. The night before competition, I would lay out my clothes and pack my notecards and photo ID, then eat breakfast, arrive early, warm up my voice and walk in calmly, smiling and breathing before I begin.'},sources:[RULES,EDL,TMHOME]};
