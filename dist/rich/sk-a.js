// Speaking Skills lessons 1–5 (event for HOSA members classified under IDEA): the event and accommodations,
// understanding the topic, choosing a main idea, finding stories and examples, and building a speech map.
const RULES=['HOSA Speaking Skills 2026–27 guidelines and rating sheet','https://hosa.org/wp-content/uploads/2026/08/Speaking-Skills-26-27.pdf'];
const EDL=['eDynamic Learning: HOSA public speaking course','https://www.edynamiclearning.com/hosa/'];
const TM=['Toastmasters International: Public speaking tips','https://www.toastmasters.org/resources/public-speaking-tips'];
const RHET=['Purdue OWL: Rhetorical situations','https://owl.purdue.edu/owl/general_writing/academic_writing/rhetorical_situation/index.html'];
const q=(p,a,b,c,d,e)=>[p,[a,b,c,d],e];
const match=(title,pairs)=>({t:'w',kind:'match',title,pairs});
const order=(title,steps)=>({t:'w',kind:'order',title,steps});
const sort=(title,buckets,items)=>({t:'w',kind:'sort',title,buckets,items});
const flip=(title,cards)=>({t:'w',kind:'flip',title,cards});
const kase=(title,nodes)=>({t:'w',kind:'case',title,start:'a',nodes});
const chk=(q,options,why)=>({t:'check',q,options,why});
const ex=(title,prompt,steps,answer)=>({t:'example',title,prompt,steps,answer});

export const SK1={title:'The event, eligibility and accommodations',hook:'Speaking Skills gives you a chance to share your ideas in a short speech. Everyone speaks on the same topic, and this year it is “Redefine the Standard.” The event is made for HOSA members with an IEP under IDEA, and you can ask for accommodations that help you do your best.',objectives:['Explain who can compete in Speaking Skills.','Describe the speech rules.','Explain the accommodation form and deadline.','Understand how the speech is scored.'],sections:[
['Who can compete',[
'Speaking Skills is a **solo event** for **middle school** and **secondary** students. It is one of four HOSA events made for students with an **IEP**: Interviewing Skills, Personal Care, Life Support Skills and Speaking Skills.',
'You must be classified under the **Individuals with Disabilities Education Act (IDEA)**. Students with only a **Section 504 plan** cannot compete in this event.',
'Your advisor can help you check if you can compete.',
'Ask questions early so you are ready.',
'This event is a great way to build confidence.',
'Many students find that practicing speeches helps in class too.',
"Speaking Skills helps you practice skills you will use in class presentations, job interviews and everyday conversations.",
sort('Can compete in Speaking Skills?',['Can compete','Cannot compete'],[['Middle school student with an IEP under IDEA',0],['Student with only a 504 plan',1],['Secondary student with an IEP under IDEA',0],['Postsecondary student',1]])]],
['The speech rules',[
'Your speech can be **up to five minutes** long. A helper shows a card when **one minute** is left. When five minutes are up, you are stopped.',
'Everyone speaks on the **same topic**. For 2026–27, the topic is **“Redefine the Standard.”**',
'You may use **notecards** (paper or electronic). Electronic notes cannot be shown to judges. **No props** or other materials are allowed.',
'There are **no microphones**, so you will practice speaking loudly and clearly.',
'Wear business clothes or the HOSA uniform for bonus points, and bring your photo ID.',
'Knowing the rules helps you feel calm on speech day.',
"Practice with a timer so you know what five minutes feels like. Many students are surprised by how fast it goes.",
flip('Speech rules',[['Topic','Redefine the Standard'],['Length','Up to 5 minutes'],['Time card','At 1 minute left'],['Notecards','Allowed'],['Props','Not allowed'],['Microphone','None']])]],
['The accommodation form',[
'Every competitor must complete the **IEP Verification and Accommodation Form**. It shows you can compete and lets you **ask for accommodations**—changes that help you, like extra time, a quiet waiting area or a helper to hold up a bigger time card.',
'Submit it by your **state deadline** and **for ILC by May 15 at midnight EST**. If it is late, you can still compete, but you lose **35 points**.',
'Talk with your family, advisor and IEP team about what helps you most.',
'Keep a copy of the form.',
'Accommodations make the event fair so you can show your real skills.',
'Ask your advisor to remind you of the deadline.',
"Your IEP team knows what helps you in class. Ask them which accommodations might help during a speech too.",
order('Getting accommodations',['Talk with your advisor and family','Choose what helps you','Fill out the form','Submit by the state deadline','Submit for ILC by May 15','Keep a copy'])]],
['How the speech is scored',[
'Judges score your speech out of **105 points** in three parts. **Content (60 points):** how well you cover the topic, how strong your message is, how well it fits the theme and how clear your main idea is.',
'**Organization (30 points):** your opening, how your ideas connect and your closing. **Delivery (15 points):** your voice, how you stand and look at judges and how clearly you speak.',
'The biggest part is content, so your ideas matter most.',
'You can practice every part of the rubric.',
'Ask your advisor for a copy of the rating sheet.',
'Use it to check your practice speeches.',
"Judges want to see your effort and your ideas. You do not need to be perfect to do well.",
{t:'table',caption:'Speaking Skills scoring',head:['Part','What judges look for','Points'],rows:[['Content','Your ideas and message','60'],['Organization','Opening, connections, closing','30'],['Delivery','Voice, standing, clear speech','15'],['Late accommodation form','Penalty','−35']]}]],
['The official resource',[
'HOSA lists the **eDynamic Learning public speaking course** as a resource. HOSA members can use it at a discount.',
'Your teachers, advisor and family are great resources too. They can listen to your speech and help you practice.',
'Watching good speakers, like at school assemblies, can give you ideas.',
'Pick one or two tips at a time to try.',
'Learning to speak well helps in school, jobs and life.',
'Small steps add up to big progress.',
"You can also watch short speeches online with your advisor and talk about what made them good.",
chk('Which resource does HOSA list for this event?',['The eDynamic Learning public speaking course','A cookbook','A sports video','No resource'],'Official resource.')]],
['A simple year plan',[
'**Fall:** check eligibility, start the accommodation form and think about the topic. **Winter:** write your speech with help. **Spring:** practice a little every day and submit the form by May 15.',
'Break the work into small steps, like writing one part each week.',
'Use a calendar to track your progress.',
'Practice with different people so you get used to an audience.',
'Celebrate when you finish each step.',
'Ask for help whenever you need it.',
"If you feel overwhelmed, focus on just the next small step. One step at a time is how big goals get done.",
order('Year plan',['Check eligibility','Start the accommodation form','Think about the topic','Write your speech','Practice every day','Submit the form by May 15'])]],
['Practice scenario',[
kase('Getting ready',{a:{text:'You want to show a poster during your speech. (Scenario invented for practice.) Is that allowed?',choices:[['No—only notecards are allowed','b','Correct.',true],['Yes','b','Props are not allowed.',false]]},b:{text:'It is May 12 and your accommodation form is not done. What should you do?',choices:[['Finish it with your advisor and submit it before May 15','c','Correct.',true],['Skip it','c','A late form costs 35 points.',false]]},c:{text:'You are ready with the form and know the rules.',end:true}})]]
],takeaways:['Speaking Skills is a solo event for middle school and secondary students classified under IDEA with an IEP (504-only students cannot compete).','Give a speech of up to five minutes on “Redefine the Standard,” with a card at one minute left, notecards only, no props and no microphones.','Submit the IEP Verification and Accommodation Form by the state deadline and for ILC by May 15 (or lose 35 points); the speech is scored on content (60), organization (30) and delivery (15).'],terms:[['IEP','Individualized Education Program under IDEA.'],['Accommodation','A change that helps you show your skills fairly.'],['Notecards','Small cards with key words to help you remember.']],mcqs:[q('What is the 2026–27 topic?','Redefine the Standard','Healthy Habits','Be Kind','Go Green','Topic.'),q('How long can your speech be?','Up to 5 minutes','1 minute','20 minutes','1 hour','Rule.'),q('Who can compete?','Middle school and secondary students with an IEP under IDEA','Students with only a 504 plan','Postsecondary students','Anyone','Eligibility.'),q('What can you use during your speech?','Notecards','Posters','Slides','Props','Rule.'),q('What happens if the accommodation form is late?','You lose 35 points','You cannot speak','Nothing','You get bonus points','Rule.'),q('How many points is content worth?','60','15','30','105','Rubric.'),q('Are microphones used?','No','Yes','Only for some','Only outside','Rule.'),q('When is the time card shown?','At 1 minute left','At the start','At 4 minutes left','Never','Rule.')],frq:{prompt:'Explain who can compete in Speaking Skills, the speech rules and the accommodation form.',rubric:[['Eligibility',['iep','idea','504','middle school','secondary']],['Rules',['5 minutes','one minute','notecards','no props','no microphones','redefine the standard']],['Accommodation form',['form','accommodations','may 15','35','state deadline']],['Scoring',['content','60','organization','30','delivery','15']]],model:'Speaking Skills is a solo event for middle school and secondary students who are classified under IDEA and have an IEP. Students with only a 504 plan cannot compete. I would give a speech of up to five minutes on this year’s topic, “Redefine the Standard.” A helper would show a card when one minute is left, and I would be stopped at five minutes. I can use notecards, but no props or other materials, and there are no microphones, so I need to speak loudly and clearly. I must complete the IEP Verification and Accommodation Form, which lets me ask for things that help me, like extra time or a quiet waiting area. I need to submit it by my state deadline and for ILC by May 15, or I will lose 35 points. Judges score my speech out of 105 points: content is worth 60 points for my ideas and message, organization is worth 30 points for my opening, how my ideas connect and my closing, and delivery is worth 15 points for my voice, how I stand and look at the judges and how clearly I speak. I would use the eDynamic Learning course, ask my advisor and family to help me practice and follow a plan with small steps all year.'},sources:[RULES,EDL]};

export const SK2={title:'Understanding the topic',hook:'The topic this year is “Redefine the Standard.” It sounds big, but you can break it into small pieces. A standard is a level of how good something should be. To redefine it means to change it or make it better. In this lesson, you will figure out what the topic means to you.',objectives:['Explain what “standard” and “redefine” mean.','Brainstorm ideas with a topic web.','Connect the topic to health care and your life.','Choose ideas you care about.'],sections:[
['What the words mean',[
'A **standard** is a level of quality or a rule people try to meet. For example, hospitals have **standards** for keeping things clean. You might have a **personal standard**, like always being kind.',
'To **redefine** means to **change the meaning** or **make it better**. So “Redefine the Standard” can mean **raising the bar**, **doing things in a new and better way** or **changing what people expect**.',
'Say the topic in your own words. For example: “Make things better than before.”',
'There is no single right answer. Your idea is what matters.',
'Write your own meaning on a card.',
'Talk about it with your advisor or family.',
"You can also think of a standard like a bar in high jump. Redefining it means moving the bar higher or trying a new way to jump.",
match('Word and meaning',[['Standard','A level of quality or a rule'],['Redefine','Change or make better'],['Raise the bar','Expect more than before'],['Personal standard','A rule you set for yourself'],['Health care standard','How care should be done'],['New standard','A better way to do things']])]],
['Making a topic web',[
'A **topic web** helps you brainstorm. Write “Redefine the Standard” in a circle in the middle of a page. Draw lines out to other circles with ideas.',
'Ideas could be: **being kind to patients**, **helping everyone get care**, **taking care of your mind**, **being a good friend**, **trying your best in school** or **making HOSA welcoming for all**.',
'Add as many ideas as you can. Do not worry if they are big or small.',
'You can draw pictures in the circles if that helps.',
'Ask others for ideas to add.',
'Circle the ideas you like most.',
"Keep your topic web somewhere you can see it, like on a wall. Seeing your ideas often helps new ones appear.",
ex('A topic web','Make a topic web (example).',['Center: Redefine the Standard','Circle 1: kindness in health care','Circle 2: everyone can get care','Circle 3: taking care of mental health','Circle 4: my own standard of trying my best'],'A web with many ideas to choose from.')]],
['Connecting to health care',[
'HOSA is about **future health professionals**, so connect the topic to health care. How could health care be better? Maybe nurses could **listen more**, clinics could be **easier to get to** or everyone could learn **healthy habits**.',
'Think about times you or your family went to a doctor or clinic. What made it good? What could be better?',
'Your own experiences give you great ideas.',
'You can also connect to helping people in your school or community.',
'Choose ideas that feel real to you.',
'Write down one health care idea you like.',
"Think about people who help others in health care, like nurses, aides or pharmacists. How could their work be even better?",
sort('Connected to health care?',['Connected','Not connected'],[['Nurses listening more to patients',0],['My favorite cartoon',1],['Making clinics easy for wheelchairs',0],['A new video game',1],['Teaching kids to wash their hands',0],['Helping people feel calm at the doctor',0]])]],
['Connecting to your life',[
'The topic can also be personal. Maybe you **redefined your own standard** by working hard to learn something new or by being brave in a hard situation.',
'Your own story can show the topic in a powerful way. For example: “I used to be scared to speak up. Now I set a new standard for myself.”',
'Share only what you feel comfortable sharing.',
'Personal stories help judges connect with you.',
'Think about a time you made something better.',
'Write down one personal idea you like.',
"A personal idea can still connect to health care, like taking care of your own health in a new way.",
chk('Which is a personal way to show the topic?',['A time you set a new, higher goal for yourself','A random fact about planets','A movie plot','A grocery list'],'Your own story.')]],
['Choosing what you care about',[
'Look at your web and pick **one idea** that you care about most. Caring about your idea makes your speech stronger.',
'Ask yourself: Can I explain this idea? Do I have a story or example? Does it connect to “Redefine the Standard”?',
'If you answer yes to all three, it is a good choice.',
'Talk with your advisor about your choice.',
'It is okay to change your idea early if you find a better one.',
'Once you choose, stick with it so you can practice.',
"Write your chosen idea at the top of a new page. This page will become the start of your speech plan.",
order('Choosing your idea',['Look at your topic web','Circle ideas you care about','Ask the three questions','Pick one idea','Talk with your advisor','Stick with your choice'])]],
['Using your supports',[
'Use the tools that help you think. You can draw your web, talk your ideas into a recorder or have someone write as you speak.',
'Color-coding ideas can help you see which ones connect.',
'Take breaks if you feel tired or stuck.',
'Ask for help understanding words you do not know.',
'Your accommodations can help during planning, not just on speech day.',
'Every student plans in their own way.',
sort('Helpful planning support?',['Helpful','Not helpful'],[['Drawing a topic web',0],['Giving up when stuck',1],['Recording ideas out loud',0],['Copying someone else’s speech',1],['Taking a short break',0]])]],
['Practice scenario',[
kase('Understanding the topic',{a:{text:'You do not know what “redefine” means. (Scenario invented for practice.) What do you do?',choices:[['Ask your advisor or look it up, then say it in your own words','b','Correct.',true],['Skip the topic','b','Understanding the topic is important.',false]]},b:{text:'Your web has ten ideas. How do you choose one?',choices:[['Pick the one you care about and can explain with a story','c','Correct.',true],['Use all ten','c','One clear idea is best.',false]]},c:{text:'You pick a clear idea you care about.',end:true}})]]
],takeaways:['A standard is a level of quality or a rule; to redefine it means to change it or make it better.','Use a topic web to brainstorm ideas, then connect the topic to health care and your own life.','Choose one idea you care about, can explain and can support with a story, using the planning tools that help you.'],terms:[['Standard','A level of how good something should be.'],['Redefine','To change or make better.'],['Topic web','A drawing that shows ideas connected to a topic.']],mcqs:[q('What is a standard?','A level of quality or a rule','A kind of food','A song','A sport','Meaning.'),q('What does “redefine” mean?','Change or make better','Forget','Break','Hide','Meaning.'),q('What goes in the middle of a topic web?','The topic','Your name','A picture of a pet','Nothing','Web.'),q('Which idea connects to health care?','Nurses listening more to patients','A cartoon','A video game','A movie','Connection.'),q('How many ideas should your speech focus on?','One main idea','Ten','None','Fifty','Focus.'),q('Why choose an idea you care about?','It makes your speech stronger','It is shorter','It is required to be boring','It does not matter','Choice.'),q('Which is a helpful planning support?','Recording your ideas out loud','Giving up','Copying others','Skipping planning','Supports.'),q('Personal stories should be:','Ones you feel comfortable sharing','Made up','Secret','About other people only','Comfort.')],frq:{prompt:'Explain what “Redefine the Standard” means and how you would choose your speech idea.',rubric:[['Meaning',['standard','quality','rule','redefine','change','better']],['Brainstorming',['topic web','ideas','circles','draw']],['Connections',['health care','patients','life','story','personal']],['Choosing',['one idea','care','explain','advisor','stick']]],model:'A standard is a level of how good something should be or a rule people try to meet, like hospital rules for keeping things clean or my own rule to always be kind. To redefine means to change something or make it better, so “Redefine the Standard” means making things better than before. To find ideas, I would make a topic web with the topic in the middle and lines to ideas like nurses listening more to patients, making clinics easier for people in wheelchairs, teaching kids to wash their hands and my own goal of speaking up in class. I would connect the topic to health care by thinking about times my family visited the doctor and what could have been better, and I would connect it to my life by remembering when I set a new standard for myself. Then I would pick one idea I care about most: helping patients feel heard. I would check that I can explain it, that I have a story—like my grandma feeling nervous at the doctor—and that it connects to the topic. I would talk with my advisor about my choice and use tools that help me, like drawing my web and recording my ideas out loud.'},sources:[RULES,RHET]};

export const SK3={title:'Picking your main idea',hook:'A great speech has one main idea that judges remember. Your main idea is one sentence that tells what you believe about the topic. Judges give 15 points for a clear focus and point of view, so a strong main idea really helps.',objectives:['Write your main idea in one sentence.','Make sure it connects to the topic.','Plan three supporting points.','Check that everything fits your main idea.'],sections:[
['What is a main idea?',[
'Your **main idea** is the **one big thing** you want judges to remember. It tells what you believe about “Redefine the Standard.”',
'Example: “We can redefine the standard of care by listening to every patient.”',
'Your main idea should be **one sentence** and **easy to say**.',
'It is like the title of your whole speech in a sentence.',
'Everything else in your speech will help explain it.',
'Write it on a card and keep it with you while you plan.',
"Read your main idea to a family member. Ask them to say it back in their own words. If they can, it is clear.",
"Your main idea is like the heart of your speech. Every other part helps it shine.",
sort('Clear main idea?',['Clear','Not clear'],[['“We can redefine the standard of care by listening to every patient.”',0],['“Stuff is important.”',1],['“I will set a new standard by speaking up for others.”',0],['“There are lots of things.”',1],['“Kindness should be the new standard in clinics.”',0]])]],
['Writing your main idea',[
'Use this fill-in sentence: “**We can redefine the standard of ______ by ______.**” For example: “We can redefine the standard of kindness by smiling and listening to everyone.”',
'Read it out loud. Does it sound clear? Does it say what you believe?',
'Try writing two or three versions and pick the best one.',
'Ask a family member which version is clearest.',
'Short is better. Aim for 10 to 20 words.',
'Keep the words simple and strong.',
"Use simple words in your main idea. Words you use every day are easier to say and remember.",
ex('Filling in the sentence','Write a main idea (example).',['Pick the standard: care for patients','Pick how to make it better: listening','Fill in: “We can redefine the standard of care by listening to every patient.”','Read it out loud and check it'],'A clear, one-sentence main idea.')]],
['Connecting to the topic',[
'Make sure your main idea uses or clearly connects to the topic, “Redefine the Standard.” Judges give 15 points for fitting the theme.',
'You can use the words “redefine” or “standard,” or say it another way, like “make the old way better.”',
'If your main idea is about something else, change it so it connects.',
'Ask yourself: Does my main idea talk about making something better?',
'A clear connection helps judges see you understand the topic.',
'Check this connection again after you write your speech.',
"It is fine to use the exact words “Redefine the Standard” in your speech. It shows judges you are on topic.",
chk('Which main idea connects to the topic?',['“We can redefine the standard of care by listening to every patient.”','“I like pizza.”','“Dogs are cute.”','“Summer is fun.”'],'Connects to Redefine the Standard.')]],
['Three supporting points',[
'Next, plan **three points** that support your main idea. Each point is a reason or part of your idea.',
'For a main idea about listening, your points could be: **1. Why listening matters**, **2. What gets in the way** and **3. How we can listen better**.',
'Three points are easy for you and judges to remember.',
'Write each point on its own card.',
'Make sure each point connects to your main idea.',
'You will add stories and examples to each point later.',
"Give each point a short name, like “Why,” “What stops us” and “How.” Short names are easy to remember.",
"Put your three points in an order that makes sense, like starting with why, then the problem, then the answer.",
order('Main idea and three points',['Main idea: listening is the new standard of care','Point 1: why listening matters','Point 2: what gets in the way','Point 3: how we can listen better'])]],
['Checking that everything fits',[
'Look at each point and ask: **Does this help explain my main idea?** If not, change it or take it out.',
'Speeches with too many ideas can confuse listeners. One main idea with three points keeps your speech focused.',
'Read your main idea and points out loud together. Do they sound like they belong?',
'Ask your advisor to check your plan.',
'A focused speech earns more points.',
'It is easier to practice, too.',
"If you have more than three points, choose the three that best explain your main idea.",
"Ask your advisor, “Does each point help explain my main idea?” Their answer helps you stay focused.",
sort('Fits the main idea about listening?',['Fits','Does not fit'],[['Why listening helps patients feel better',0],['My favorite sports team',1],['Ways nurses can listen more',0],['A story about my vacation',1],['What makes listening hard in busy clinics',0]])]],
['Your point of view',[
'Your **point of view** is what **you** think. Use words like “**I believe**” or “**We can**” to show it.',
'Say your main idea at the **start** and again at the **end** of your speech. This helps judges remember it.',
'Be confident. Your ideas matter.',
'You do not need big words—clear words are best.',
'Speaking from your heart makes your point of view strong.',
'Practice saying your main idea with feeling.',
"Practice saying your main idea with a strong, steady voice. It is the most important sentence in your speech.",
match('Phrase and purpose',[['“I believe…”','Shows your point of view'],['“We can…”','Invites others to act'],['Main idea at the start','Tells judges your focus'],['Main idea at the end','Helps judges remember'],['Clear words','Easy to understand'],['Feeling in your voice','Shows you care']])]],
['Practice scenario',[
kase('Main idea check',{a:{text:'Your main idea is “Standards are important.” (Scenario invented for practice.) How can you make it stronger?',choices:[['Say which standard and how to make it better, like “We can redefine the standard of care by listening to every patient.”','b','Correct.',true],['Keep it','b','A specific main idea is clearer.',false]]},b:{text:'One of your points is about your favorite movie. What do you do?',choices:[['Replace it with a point that supports your main idea','c','Correct.',true],['Keep it','c','Every point should fit.',false]]},c:{text:'Your main idea and points are clear and focused.',end:true}})]]
],takeaways:['Your main idea is one clear sentence that tells what you believe about “Redefine the Standard” (focus and point of view are worth 15 points).','Use the fill-in sentence “We can redefine the standard of ___ by ___,” and make sure it connects to the topic.','Plan three supporting points, check that each fits your main idea and say your main idea at the start and end.'],terms:[['Main idea','The one big thing you want judges to remember.'],['Supporting point','A reason or part that explains your main idea.'],['Point of view','What you believe about the topic.']],mcqs:[q('How long should your main idea be?','One sentence','One page','Ten sentences','One word','Main idea.'),q('Which main idea is clearest?','“We can redefine the standard of care by listening to every patient.”','“Stuff is important.”','“There are lots of things.”','“I don’t know.”','Clarity.'),q('How many supporting points should you plan?','Three','Ten','None','Twenty','Points.'),q('What should each point do?','Help explain your main idea','Talk about anything','Be about movies','Be very long','Focus.'),q('Where should you say your main idea?','At the start and the end','Only in the middle','Never','Only on cards','Placement.'),q('Which words show your point of view?','“I believe…”','“Maybe…”','“Whatever…”','“Um…”','Point of view.'),q('How many points is focus and point of view worth?','15','5','1','60','Rubric.'),q('If a point does not fit, you should:','Change it or take it out','Keep it anyway','Add more','Ignore it','Focus.')],frq:{prompt:'Write your main idea and three supporting points, and explain how they connect to the topic.',rubric:[['Main idea',['one sentence','redefine','standard','clear','believe']],['Connection',['topic','theme','better','connect']],['Three points',['three','why','what gets in the way','how','support']],['Fit and point of view',['fits','focus','start','end','i believe','we can']]],model:'My main idea would be: “We can redefine the standard of care by listening to every patient.” I made it with the fill-in sentence “We can redefine the standard of ___ by ___,” and it connects to the topic because it talks about making care better than before. My three supporting points would be: first, why listening matters, because patients feel safer and calmer when someone listens; second, what gets in the way, like busy clinics and people looking at screens; and third, how we can listen better, by making eye contact, sitting down and asking how people feel. I would check that each point helps explain my main idea and take out anything that does not fit, like a story about my vacation. I would show my point of view with words like “I believe” and “We can,” and I would say my main idea at the start and again at the end of my speech so judges remember it. I would read my main idea and points out loud together and ask my advisor to check them, because focus and point of view are worth 15 points.'},sources:[RULES,TM]};

export const SK4={title:'Finding stories and examples',hook:'Stories and examples make your speech come alive. They help judges understand your points and remember your message. Content is worth 60 points, and good stories and examples help you earn them. In this lesson, you will find a story and examples for each of your three points.',objectives:['Find a personal story that supports your main idea.','Add simple examples and facts to your points.','Use information from trusted places.','Tell your story clearly.'],sections:[
['Why stories matter',[
'A **story** is something that happened. Stories help judges **feel** your message and **picture** what you mean.',
'A good story for your speech is **true**, **short** and **connected to your main idea**.',
'For a speech about listening, you might tell about a time someone listened to you, or a time someone did not.',
'Stories from your life, your family or volunteering are great.',
'Only share what you feel comfortable sharing.',
'One strong story is enough for a short speech.',
"Stories about small moments can be very powerful. A kind word or a helpful action can make a great story.",
"If you do not have a personal story, you can tell about something you saw or learned in class.",
sort('Good story for a speech about listening?',['Good story','Not a good fit'],[['When a nurse listened to my grandma and helped her feel calm',0],['My favorite pizza topping',1],['When a teacher listened to me and I felt brave',0],['A dream about flying',1],['When I listened to a friend who was sad',0]])]],
['A simple story plan',[
'Use a simple plan: **Who** was there? **What** happened? **How did it feel?** **What did I learn?**',
'Keep your story to about **30 to 45 seconds**.',
'Use details that help judges picture it, like what you saw or heard.',
'End your story by connecting it to your main idea.',
'Practice telling it out loud several times.',
'You can write the four answers on one notecard.',
"Use words that help judges see the scene, like “the waiting room was quiet” or “she smiled.”",
ex('Planning a story','Plan a story (details invented for practice).',['Who: my grandma and a nurse','What: Grandma was scared before a test; the nurse sat down and listened','Feeling: Grandma smiled and felt calm','Learned: listening helps people feel safe'],'A short, clear story that supports the main idea (details invented for practice).')]],
['Adding examples',[
'An **example** shows your point in action. For “How we can listen better,” examples could be: **looking at the person**, **sitting down at their level** and **asking, “How are you feeling?”**',
'Examples make your ideas easy to understand.',
'Give one or two examples for each point.',
'Pick examples people can picture or try.',
'Short examples are easier to remember.',
'Write them on your notecards for each point.',
"Examples that judges can try themselves, like asking “How are you feeling?”, make your speech practical and memorable.",
"Make your examples specific. “Sit down and look at the patient” is clearer than “be nice.”",
match('Point and example',[['Why listening matters','Patients feel calmer when heard'],['What gets in the way','Busy clinics and screens'],['How to listen better','Look at the person and ask how they feel'],['Listening at school','Letting a friend finish talking'],['Listening at home','Putting your phone away during dinner'],['Listening in HOSA','Asking new members their ideas']])]],
['Using simple facts',[
'A **fact** is something true you can check. Facts can make your speech stronger. Find facts from **trusted places**, like health organizations, your teacher or a school librarian.',
'Say where the fact comes from: “A health group says…” or “My health teacher told me…”',
'Use only one or two facts. Too many numbers can be hard to remember.',
'Make sure you understand the fact before you use it.',
'Ask an adult to help you check that it is true.',
'Never make up a fact.',
"Write the source of each fact on your notecard so you remember to say where it came from.",
"If a number is hard to say, you can round it, like “about half” instead of “48 percent.”",
chk('Where is a good place to find a fact?',['A trusted health organization or your teacher','A random social media post','A made-up guess','A video game'],'Trusted sources.')]],
['Putting stories and examples together',[
'Plan what goes with each point. **Point 1** could have your story. **Point 2** could have an example or fact. **Point 3** could have two examples of how to listen better.',
'This mix keeps your speech interesting.',
'Make a chart with your three points and what you will add to each.',
'Check that each piece connects to your main idea.',
'Take out anything that does not fit.',
'Now you are ready to build your speech.',
"Use your chart while practicing so you remember which story or example goes with each point.",
order('Planning support for each point',['Write your three points','Add your story to one point','Add an example or fact to each point','Check each piece fits','Take out anything that does not fit','Write it all on notecards'])]],
['Telling your story clearly',[
'Tell your story **slowly** and **clearly**. Pause after the most important part to let it sink in.',
'Look at the judges while you tell it. Your feelings can show in your voice and face.',
'Practice so you can tell it without reading every word.',
'Use simple words. You do not need big words to tell a great story.',
'If you forget a detail, keep going—judges will not notice.',
'Your story can be the most memorable part of your speech.',
"Practice your story for a friend and ask them how it made them feel. Their answer shows if your story works.",
sort('Good way to tell a story?',['Good way','Not helpful'],[['Telling it slowly with a pause',0],['Reading it fast from a paper',1],['Looking at the judges',0],['Using hard words you do not know',1],['Showing feeling in your voice',0]])]],
['Practice scenario',[
kase('Finding support',{a:{text:'You want to use a fact you saw in a random online post. (Scenario invented for practice.) What do you do?',choices:[['Check it with a trusted source or ask a teacher first','b','Correct.',true],['Use it without checking','b','Facts must be true.',false]]},b:{text:'Your story takes three minutes to tell. What do you do?',choices:[['Shorten it to about 30–45 seconds with the most important parts','c','Correct.',true],['Keep it all','c','Short stories leave time for your points.',false]]},c:{text:'Your speech has a short story and clear examples.',end:true}})]]
],takeaways:['Use one true, short story (about 30–45 seconds) that connects to your main idea, planned with who, what, feelings and lesson.','Add one or two examples to each point and only a few simple facts from trusted places, saying where they come from; never make up facts.','Plan support for each of your three points, check that everything fits and tell your story slowly and clearly with eye contact.'],terms:[['Story','Something true that happened, told to support a point.'],['Example','A specific case that shows a point in action.'],['Fact','Something true that can be checked.']],mcqs:[q('A good speech story is:','True, short and connected to the main idea','Made up','Very long','About anything','Story.'),q('About how long should your story be?','30–45 seconds','5 minutes','2 seconds','1 hour','Timing.'),q('Which is an example of listening better?','Looking at the person and asking how they feel','Looking at your phone','Walking away','Talking over them','Example.'),q('Where should facts come from?','Trusted places like health organizations or teachers','Random posts','Guesses','Video games','Facts.'),q('How many facts should you use?','One or two','Fifty','None ever','Every sentence','Facts.'),q('How should you tell your story?','Slowly and clearly with eye contact','Very fast','Reading every word','Looking at the floor','Delivery.'),q('If a story part does not fit, you should:','Take it out','Keep it anyway','Make it longer','Add more','Focus.'),q('How many points is content worth?','60','15','30','5','Rubric.')],frq:{prompt:'Plan a story and examples for your speech about “Redefine the Standard.”',rubric:[['Story',['true','short','who','what','feel','learned']],['Examples',['example','each point','listening','look','ask']],['Facts',['trusted','teacher','health organization','say where','true']],['Fit and telling',['fits','main idea','slowly','pause','eye contact']]],model:'My speech’s main idea is that we can redefine the standard of care by listening to every patient. For my first point, why listening matters, I would tell a true story using my simple plan: who—my grandma and a nurse; what—Grandma was scared before a medical test, and the nurse sat down and listened to her worries; how it felt—Grandma smiled and became calm; what I learned—listening helps people feel safe. I would keep it to about 40 seconds and end by connecting it to my main idea. For my second point, what gets in the way, I would give the example of busy clinics where people look at computer screens instead of patients, and I would share one simple fact from a trusted health organization or my health teacher, saying where it came from. For my third point, how we can listen better, I would give two examples people can try: looking at the person and asking, “How are you feeling?” and sitting down at their level. I would make a chart showing each point and what supports it, take out anything that does not fit and write everything on notecards. When telling my story, I would speak slowly, pause after the most important part, look at the judges and let my feelings show in my voice.'},sources:[RULES,TM]};

export const SK5={title:'Building your speech map',hook:'A speech map is like a road map for your speech. It shows the path from your opening to your three points to your closing. Organization is worth 30 points, and a clear map helps you earn them—and helps you remember what comes next.',objectives:['Create a speech map with an opening, three points and a closing.','Use connecting words between parts.','Plan how much time each part gets.','Turn your map into a speech.'],sections:[
['The parts of a speech',[
'Every speech has three parts. **1. Opening:** grab attention and say your main idea. **2. Body:** share your three points with stories and examples. **3. Closing:** remind judges of your main idea and end strong.',
'Judges give 10 points each for your **opening**, how your **ideas connect** and your **closing**.',
'A speech map shows all three parts on one page.',
'You can draw boxes for each part.',
'Having a map makes writing and practicing easier.',
'Keep your map with your notecards.',
"Some students like to build their speech map with sticky notes so they can move parts around easily.",
"Your speech map can be on one big piece of paper or on five notecards in a row.",
order('Speech parts',['Opening','Point 1','Point 2','Point 3','Closing'])]],
['Drawing your speech map',[
'Draw five boxes in a row or down the page: **Opening**, **Point 1**, **Point 2**, **Point 3** and **Closing**. In each box, write a few key words.',
'Add arrows between the boxes to show the order.',
'Use colors if they help—maybe green for the opening, blue for points and red for the closing.',
'Put your main idea at the top of the page.',
'Look at your map often while practicing.',
'Change the map if you find a better order.',
"Draw a small picture in each box to help you remember, like a heart for your story or an ear for listening.",
ex('A speech map','Fill in a speech map (example).',['Opening: story hook + main idea','Point 1: why listening matters (Grandma story)','Point 2: what gets in the way (busy clinics)','Point 3: how to listen better (look, sit, ask)','Closing: main idea again + call to action'],'A clear map from start to finish.')]],
['Connecting words',[
'**Connecting words** help judges follow your speech. Use words like **first**, **next**, **also**, **another reason**, **finally** and **so**.',
'For example: “**First**, let’s talk about why listening matters.” “**Next**, what gets in the way?” “**Finally**, how can we listen better?”',
'Connecting words help you remember where you are in your speech, too.',
'Write them on your notecards.',
'Practice saying them clearly.',
'Smooth connections earn points for organization.',
"Connecting words also help judges know when one point ends and the next begins.",
"Practice your connecting words out loud until they feel smooth.",
sort('Connecting word?',['Connecting word','Not a connecting word'],[['First',0],['Banana',1],['Next',0],['Finally',0],['Purple',1],['Another reason',0]])]],
['Planning your time',[
'Your speech can be up to five minutes. Plan about **4 minutes 30 seconds** so you do not get stopped.',
'A simple time plan: **Opening** about 30 seconds, **each point** about 1 minute and **closing** about 30 seconds.',
'Practice with a timer to see how long each part takes.',
'If one part is too long, make it shorter.',
'Talking slowly is better than rushing to fit more.',
'Your accommodations may include support with timing.',
"Write the time goal for each part in the corner of each box on your map.",
{t:'table',caption:'Simple time plan',head:['Part','About how long'],rows:[['Opening','30 seconds'],['Point 1','1 minute'],['Point 2','1 minute'],['Point 3','1 minute'],['Closing','30 seconds'],['Total','About 4 minutes']]}]],
['Turning your map into a speech',[
'Use your map to write or say your speech one box at a time. Start with the opening box, then each point, then the closing.',
'You can **write** sentences, **record** yourself talking through each box or have someone **write** while you speak.',
'Keep sentences short and clear.',
'Read your speech out loud and make changes that sound better.',
'Ask your advisor to listen and give ideas.',
'Your speech will get better each time you practice.',
"If writing is hard, say each part out loud to a helper who writes it down for you.",
"Read each box out loud and time it. Then you will know if any part is too long.",
chk('What is a good way to turn your map into a speech?',['Go one box at a time, writing or recording what you will say','Skip the map','Copy someone else’s speech','Say random ideas'],'Step by step.')]],
['Checking your speech',[
'Use a checklist: **Does my opening grab attention? Did I say my main idea? Do I have three points? Did I use connecting words? Does my closing remind judges of my main idea?**',
'Check that your speech is about four to four and a half minutes long.',
'Ask someone to listen and tell you your main idea. If they can, your speech is clear.',
'Fix one thing at a time.',
'Celebrate when your checklist is complete.',
'Then you are ready to practice delivery.',
"After your checklist is done, read your whole speech out loud once. Notice how it flows from start to finish.",
sort('On the speech checklist?',['On the checklist','Not needed'],[['Opening grabs attention',0],['Main idea is clear',0],['Three points with connecting words',0],['Speech is 12 minutes long',1],['Closing repeats the main idea',0]])]],
['Practice scenario',[
kase('Speech map check',{a:{text:'Your speech jumps from Point 1 to Point 3 without a connecting word. (Scenario invented for practice.) What do you add?',choices:[['A connecting word like “Next” or “Finally”','b','Correct.',true],['Nothing','b','Connecting words help judges follow.',false]]},b:{text:'Your practice speech takes 6 minutes. What do you do?',choices:[['Shorten each part to fit about 4 minutes 30 seconds','c','Correct.',true],['Talk faster','c','Shorten instead of rushing.',false]]},c:{text:'Your speech map is clear and on time.',end:true}})]]
],takeaways:['A speech has an opening, three body points and a closing; opening, connections and closing are 10 points each (organization 30).','Draw a speech map with five boxes and arrows, add key words and use connecting words like first, next and finally.','Plan about 4 minutes 30 seconds (opening 30 s, each point 1 min, closing 30 s), turn the map into a speech one box at a time and use a checklist.'],terms:[['Speech map','A drawing that shows the parts of your speech in order.'],['Connecting words','Words like first and next that link ideas.'],['Body','The middle of the speech with your three points.']],mcqs:[q('What are the three parts of a speech?','Opening, body and closing','Start, snack and stop','Hello, middle and bye','Title, page and end','Parts.'),q('How many points is organization worth?','30','60','5','105','Rubric.'),q('Which is a connecting word?','Next','Banana','Purple','Table','Words.'),q('About how long should your whole speech be?','About 4 minutes 30 seconds','10 minutes','30 seconds','1 hour','Timing.'),q('About how long should each point be?','About 1 minute','About 3 minutes','About 5 seconds','About 10 minutes','Timing.'),q('What goes at the top of your speech map?','Your main idea','Your phone number','A joke','Nothing','Map.'),q('If your speech is too long, you should:','Shorten parts','Talk faster','Skip the closing','Add more','Timing.'),q('What should your closing do?','Remind judges of your main idea','Start a new topic','Say nothing','Repeat the opening joke only','Closing.')],frq:{prompt:'Make a speech map for your speech and explain how you would use it.',rubric:[['Parts',['opening','point 1','point 2','point 3','closing']],['Map',['boxes','arrows','key words','main idea','colors']],['Connecting words',['first','next','finally','connect']],['Timing and checking',['4 minutes','30 seconds','1 minute','timer','checklist']]],model:'My speech map would have my main idea at the top: “We can redefine the standard of care by listening to every patient.” Below it, I would draw five boxes with arrows: Opening—a story hook and my main idea; Point 1—why listening matters, with my grandma’s story; Point 2—what gets in the way, like busy clinics and screens; Point 3—how to listen better, by looking at people, sitting down and asking how they feel; and Closing—my main idea again and a call to action. I would use connecting words to link the parts: “First, let’s talk about why listening matters,” “Next, what gets in the way?” and “Finally, how can we listen better?” I would plan my time with a timer: about 30 seconds for the opening, about one minute for each point and about 30 seconds for the closing, for a total of about four to four and a half minutes so I am not stopped. To turn my map into a speech, I would go one box at a time, recording myself talking through each box and then writing short, clear sentences. Finally, I would use a checklist to make sure my opening grabs attention, my main idea is clear, I have three points with connecting words and my closing reminds judges of my main idea.'},sources:[RULES,TM]};
