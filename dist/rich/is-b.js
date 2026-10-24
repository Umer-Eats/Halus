// Interviewing Skills lessons 6–10: checking and uploading, the first two questions, first impressions,
// answering other questions and staying calm, and ending strong with a practice plan.
const RULES=['HOSA Interviewing Skills 2026–27 guidelines and rating sheets','https://hosa.org/wp-content/uploads/2026/08/Interview-Skills-26-27.pdf'];
const UPLOAD=['HOSA: Competitive event digital uploads','https://hosa.org/competitive-event-digital-uploads/'];
const COSINT=['CareerOneStop: Get ready to interview','https://www.careeronestop.org/JobSearch/Interview/get-ready.aspx'];
const SAFE=['CareerSafe','https://www.careersafeonline.com/'];
const OWLLET=['Purdue OWL: Job search letters','https://owl.purdue.edu/owl/job_search_writing/job_search_letters/index.html'];
const q=(p,a,b,c,d,e)=>[p,[a,b,c,d],e];
const match=(title,pairs)=>({t:'w',kind:'match',title,pairs});
const order=(title,steps)=>({t:'w',kind:'order',title,steps});
const sort=(title,buckets,items)=>({t:'w',kind:'sort',title,buckets,items});
const flip=(title,cards)=>({t:'w',kind:'flip',title,cards});
const kase=(title,nodes)=>({t:'w',kind:'case',title,start:'a',nodes});
const chk=(q,options,why)=>({t:'check',q,options,why});
const ex=(title,prompt,steps,answer)=>({t:'example',title,prompt,steps,answer});

export const IS6={title:'Checking and uploading your work',hook:'You have written your personal statement and built your resume. Now you check everything carefully and upload it the right way. A single PDF, uploaded on time, is your ticket to the interview—and careful checking protects the easy points for spelling, length and formatting.',objectives:['Use a checklist to review the statement and resume.','Combine the documents into one PDF.','Upload by the May 15 deadline.','Prepare to talk about everything you wrote.'],sections:[
['The final checklist',[
'Before uploading, check each item. **Title page:** event name, your name, division, chapter number, school, chartered association and job. **Statement:** two pages or less, 12-point Arial, double-spaced, 1-inch margins, header with last name and event on the left and page number on the right. **Resume:** one page. **Both:** true and with no spelling mistakes.',
'Check one item at a time and put a mark next to it when it is correct.',
'Ask your advisor to check the list with you.',
'A checklist helps you catch small mistakes that are easy to miss.',
'Keep your checklist for next year too.',
"Use a highlighter to mark anything that needs fixing. Then fix one highlighted item at a time.",
"Check the last page of your PDF too. Sometimes the resume moves to a new page by mistake.",
sort('Ready or needs fixing?',['Ready','Needs fixing'],[['Title page lists the job',0],['Statement is three pages',1],['Resume fits on one page',0],['No header on statement pages',1],['No spelling mistakes after two checks',0],['Statement uses 10-point font',1]])]],
['Proofreading tips',[
'Read slowly and out loud. Point to each word with your finger or a pen. Use text-to-speech so you can hear your writing.',
'Read the resume from the bottom up. This helps you see each line by itself and spot typos.',
'Ask two people to read your work. Fresh eyes find mistakes you missed.',
'Check names, dates and numbers carefully.',
'Take a break and check again the next day.',
"Print your documents if you find it easier to check mistakes on paper. Many people see errors better on paper than on a screen.",
order('Proofreading steps',['Run spell-check','Read out loud slowly','Use text-to-speech','Read the resume bottom to top','Ask two people to review','Fix mistakes and check again'])]],
['Making one PDF',[
'Your title page, personal statement and resume must be **one combined PDF file**. If you upload separate files, judges will **not** look at them, and you get **no points**.',
'Save each document as a PDF, then combine them in this order: title page, statement, resume. Your teacher or advisor can show you how.',
'Open the finished PDF and scroll through every page. Make sure the fonts and headers look right.',
'Name the file clearly, such as with your last name and the event.',
'Save a copy in a safe place.',
"If combining files feels hard, ask your advisor or a teacher to help you step by step the first time.",
"Make sure your file opens on another computer or phone before you upload. If it opens there, judges can open it too.",
ex('Combining the PDF','Plan the steps to make one PDF (one possible way).',['Save the title page as a PDF','Save the statement as a PDF','Save the resume as a PDF','Combine them in order: title page, statement, resume','Open and check every page'],'One PDF in the right order, ready to upload.')]],
['Uploading on time',[
'Upload your PDF to the **HOSA Digital Upload System** by **May 15 at midnight EST**. There are **no exceptions**. Upload early in case something goes wrong.',
'If your state also used the upload system, you must upload **again** for ILC.',
'Do not forget your **accommodation form**—it is also due by May 15 for ILC, or you lose 35 points.',
'Write the deadline on a calendar and set a reminder a week before.',
'Ask your advisor to confirm your upload was received.',
"After uploading, write down the date and time you finished. This helps you remember that the step is done.",
chk('When is the final upload deadline for ILC?',['May 15 at midnight EST','The day of the interview','June 30','Any time'],'No exceptions.')]],
['Knowing your own work',[
'Judges read your statement and resume before the interview, and they may ask about them. You **cannot bring copies** into the interview, so you need to **know** what you wrote.',
'Read your resume and statement out loud each week. Practice telling your story without looking.',
'Be ready to say more about any line, like “Tell us about your volunteer work.”',
'If you forget a detail, it is okay to say, “Let me think for a moment.”',
'Knowing your work helps you feel confident.',
"Practice telling each resume line as a short story: where you were, what you did and why it mattered.",
"Ask a practice partner to point to any line on your resume and ask you about it. This is great interview practice.",
match('Resume line and what you might say',[['Volunteer at Sunrise Home','What you do and why you like it'],['CPR certification','When you learned it and why it matters'],['Perfect attendance award','How you stay reliable'],['Health Science class','What you learned'],['Food pantry helper','A person you helped'],['Typing skill','How it helps at work']])]],
['Staying organized',[
'Keep all your work in one folder: the job notes, skills list, story organizer, statement, resume, PDF and accommodation form.',
'Use a checklist or calendar to track what is done and what is next.',
'Color-coding can help, such as green for finished and yellow for in progress.',
'Ask for help whenever you feel stuck.',
'Being organized makes the whole project less stressful.',
"A tidy folder also helps on competition day, because you can review your notes quickly before your interview.",
order('What goes in your folder',['Job notes','Skills and experiences lists','Story organizer','Personal statement','Resume','Combined PDF and accommodation form'])]],
['Practice scenario',[
kase('Upload day',{a:{text:'You uploaded your statement and resume as two separate files. (Scenario invented for practice.) What happens?',choices:[['Judges will not view them—combine them into one PDF and upload again before May 15','b','Correct.',true],['Nothing is wrong','b','Only one PDF is accepted.',false]]},b:{text:'You also need to send your accommodation form. When is it due for ILC?',choices:[['By May 15','c','Correct.',true],['After the interview','c','Late forms cost 35 points.',false]]},c:{text:'Your PDF and form are submitted on time.',end:true}})]]
],takeaways:['Use a final checklist: complete title page, statement of two pages or less in 12-point Arial, double-spaced, 1-inch margins, correct header, one-page resume, all true with no mistakes.','Proofread slowly aloud, with text-to-speech and by reading the resume bottom to top; ask two people to review.','Combine title page, statement and resume into one PDF and upload by May 15 at midnight EST (with the accommodation form); know your work well because no copies go into the interview.'],terms:[['PDF','A file type that keeps formatting the same on any device.'],['Proofread','Check writing carefully for mistakes.'],['Deadline','The last day and time something can be turned in.']],mcqs:[q('How must you upload your documents?','As one combined PDF','As separate files','As photos','By mail','Rule.'),q('What is the order in the PDF?','Title page, statement, resume','Resume, title page, statement','Statement only','Any order','Order.'),q('When is the upload deadline?','May 15 at midnight EST','June 1','The day of ILC','Never','Rule.'),q('Which proofreading tip helps you hear mistakes?','Text-to-speech','Skipping words','Reading very fast','Not reading','Tip.'),q('Can you bring your resume into the interview?','No','Yes','Only one page','Only the statement','Rule.'),q('What happens if the accommodation form is late?','You lose 35 points','You get bonus points','Nothing','You cannot upload','Rule.'),q('Why read your resume each week?','To know your work for the interview','To make it longer','To change the facts','It is not needed','Preparation.'),q('Who can help check your work?','Your advisor and family','No one','Only judges','A stranger online','Support.')],frq:{prompt:'Explain how you would check and upload your statement and resume and prepare to talk about them.',rubric:[['Checklist',['title page','two pages','arial','double-spaced','header','one page','true']],['Proofreading',['out loud','text-to-speech','bottom','two people','mistakes']],['Upload',['one pdf','order','may 15','upload again','accommodation form']],['Knowing your work',['no copies','read','practice','details','confident']]],model:'Before uploading, I would use a checklist with my advisor. My title page must show the event name, my name, division, chapter number, school, chartered association and the volunteer job. My statement must be two pages or less, in 12-point Arial, double-spaced with 1-inch margins and a header with my last name and the event on the left and the page number on the right. My resume must fit on one page, and both documents must be true with no mistakes. To proofread, I would read slowly out loud while pointing to each word, use text-to-speech, read my resume from the bottom up and ask my advisor and a family member to check it. Then I would save each document as a PDF and combine them into one PDF in this order: title page, statement and resume. I would open it and scroll through every page, name the file with my last name and the event, save a copy and upload it before May 15 at midnight EST, setting a reminder a week early. I would also make sure my accommodation form is submitted by May 15 so I do not lose 35 points. Because I cannot bring copies into the interview, I would read my resume and statement out loud each week and practice telling my story without looking, so I can answer any question about what I wrote.'},sources:[RULES,UPLOAD]};

export const IS7={title:'Practicing the first two questions',hook:'You already know the first two interview questions: explain the job you are interviewing for, and tell the skills you would bring. That is a big advantage. If you practice these two answers until they feel natural, you will start your interview strong and calm.',objectives:['Write a clear answer about your chosen job.','Write a clear answer about three skills you would bring.','Practice the answers until they feel natural.','Use accommodations and supports while practicing.'],sections:[
['Question 1: Explain the job',[
'The first question asks you to **explain the job or opportunity**. Use a simple plan: **1. Name it** (“I am interviewing to be a volunteer at Sunrise Home.”) **2. Say what you would do** (two or three main tasks). **3. Say why you want it** (one reason that matters to you).',
'Keep the answer to about **30 seconds**—four or five sentences.',
'Use the job notes you made earlier.',
'Practice saying it in your own words, not reading.',
'Smile while you answer. It shows you are excited.',
"Use the job’s real name and the organization’s name. Saying “Sunrise Home” sounds more prepared than saying “a nursing home.”",
"Practice telling one thing about the place, like who it serves. “Sunrise Home cares for older adults” shows you did your research.",
ex('Answering question 1','Build an answer (details invented for practice).',['Name it: “I am interviewing to be a volunteer at Sunrise Home.”','Tasks: “Volunteers visit residents, help with activities and deliver mail.”','Why: “I want to help residents feel happy, like I did with my grandmother.”'],'A clear 30-second answer (details invented for practice).')]],
['Question 2: Your skills',[
'The second question asks about the **skills you would bring**. Use your **top three skills** from your matching list. For each skill, give **one short example**.',
'Use a pattern: “The first skill I bring is **kindness**. For example, I read to residents every Saturday. The second skill is **being on time**. I have never missed a volunteer shift. The third skill is **patience**. I helped my grandmother walk after her surgery.”',
'Three skills with examples is clear and easy to remember.',
'Keep this answer to about 45 seconds.',
'Say each skill clearly and pause between them.',
"Choose examples that are short and easy to remember. One sentence per example is enough.",
"Put your strongest skill first. Judges often remember the first and last things they hear.",
order('Skills answer pattern',['Say the first skill','Give an example','Say the second skill','Give an example','Say the third skill','Give an example'])]],
['Practice out loud',[
'Practice both answers **out loud** every day. Say them to a mirror, a pet, a family member or your advisor.',
'Do **not** memorize every word. Remember the **main points** instead: the job, the tasks, why, three skills and three examples. This helps you stay calm if you forget a word.',
'Record yourself on a phone and listen back. Are you clear? Are you smiling?',
'Practice standing and sitting, since you will sit during the interview.',
'The more you practice, the easier it gets.',
"Practice in different places, like your kitchen, classroom or library. This helps you feel ready in a new room.",
sort('Good practice habit?',['Good habit','Not helpful'],[['Practicing out loud every day',0],['Only thinking about the answer once',1],['Recording and listening back',0],['Memorizing every word exactly',1],['Practicing with a family member',0]])]],
['Using memory helpers',[
'Memory helpers make answers easier to remember. Try a **keyword list**: “Sunrise—visit, activities, mail—grandma—kind, on time, patient.” Read it before practice, then say the full answer.',
'Some students use pictures, colors or hand signals in practice to remember each skill.',
'You cannot bring notes into the interview, so practice until you no longer need the list.',
'Your accommodations may include extra time to answer—use it calmly.',
'Choose the helpers that work best for you.',
"Pick one memory helper and use it every time you practice. Repeating the same helper builds a strong habit.",
"Try saying your answers while walking or doing a simple task. Movement can help some people remember.",
flip('Memory helpers',[['Keyword list','A few words for each idea'],['Count on fingers','One finger per skill'],['Color code','A color for each skill'],['Picture cue','A small drawing for each idea'],['Practice partner','Someone who asks the questions'],['Recording','Listen to your best answer']])]],
['Answering with confidence',[
'Speak **clearly** and at a comfortable speed. Look at the judges while you talk. Sit up straight and keep your hands calm.',
'If you need a moment to think, it is okay to pause, take a breath or say, “Let me think for a moment.”',
'If you forget part of your answer, keep going with what you remember. Judges care more about your effort and honesty than perfect words.',
'Smile when you talk about why you want the job.',
'Confidence grows each time you practice.',
"Speak a little slower than normal. Nervous people often talk fast, and slow speech sounds calm and clear.",
"End each answer with a small smile and a pause. This tells the judge you are finished and ready for the next question.",
chk('You forget your second skill in the middle of your answer. What should you do?',['Pause, take a breath and continue with what you remember','Stop the interview','Say nothing','Leave the room'],'Stay calm and keep going.')]],
['A daily practice plan',[
'Make a short daily plan: **Monday**, practice question 1. **Tuesday**, practice question 2. **Wednesday**, practice both. **Thursday**, record yourself. **Friday**, practice with your advisor or family. Repeat each week.',
'Five to ten minutes a day is enough.',
'Check off each practice on a calendar.',
'Ask your practice partner for one thing you did well and one thing to improve.',
'Celebrate your progress.',
"Ask your practice partner to change the wording of the questions sometimes. This helps you get ready for small differences.",
order('Weekly practice plan',['Monday: question 1','Tuesday: question 2','Wednesday: both questions','Thursday: record yourself','Friday: practice with a partner'])]],
['Practice scenario',[
kase('First two questions',{a:{text:'A judge says, “Tell us about the job you are interviewing for.” (Practice item.) Which answer is best?',choices:[['Name the job, give two or three tasks and say why you want it','b','Correct.',true],['“It’s a job.”','b','Give details.',false]]},b:{text:'The judge asks, “What skills would you bring?”',choices:[['Name three skills, each with one example','c','Correct.',true],['“I don’t know.”','c','Use your top three skills.',false]]},c:{text:'You start your interview strong.',end:true}})]]
],takeaways:['Question 1: name the job, say two or three tasks and give one reason you want it (about 30 seconds).','Question 2: name your top three skills, each with one short example (about 45 seconds).','Practice out loud daily, remember main points instead of exact words, use memory helpers and accommodations and pause calmly if you forget.'],terms:[['Main points','The most important ideas you want to say.'],['Keyword list','A few words that remind you of each idea.'],['Practice partner','Someone who helps you practice by asking questions.']],mcqs:[q('What does the first question ask about?','The job you are interviewing for','Your hobbies','Your pets','Your favorite food','Rule.'),q('What does the second question ask about?','The skills you would bring','Your family','Your vacation','The weather','Rule.'),q('How many skills should you give?','Three, each with an example','One word','Ten','None','Strategy.'),q('About how long should the first answer be?','About 30 seconds','About 5 minutes','About 2 seconds','About 1 hour','Timing.'),q('What should you remember instead of every word?','The main points','Nothing','Only the first word','The judges’ names','Practice.'),q('Can you bring a keyword list into the interview?','No','Yes','Only one card','Only a picture','Rule.'),q('If you forget part of an answer, you should:','Pause and continue with what you remember','Leave','Cry','Say nothing','Calm.'),q('How often should you practice?','A little every day','Once a year','Never','Only the night before','Plan.')],frq:{prompt:'Write your answers to the first two interview questions and explain how you would practice them.',rubric:[['Question 1',['name','job','tasks','why','30 seconds']],['Question 2',['three skills','example','kind','on time','patient']],['Practice',['out loud','daily','main points','record','partner']],['Confidence',['pause','breath','eye contact','smile','keep going']]],model:'For the first question, I would say: “I am interviewing to be a volunteer at Sunrise Home. Volunteers visit residents, help with activities like bingo and deliver mail. I want this job because helping my grandmother after her surgery showed me how much a little help can mean.” That answer names the job, gives tasks and explains why in about 30 seconds. For the second question, I would say: “The first skill I bring is kindness. For example, I read to residents every Saturday. The second skill is being on time. I have never missed a volunteer shift. The third skill is patience. I helped my grandmother walk slowly every day after her surgery.” To practice, I would say both answers out loud every day for five to ten minutes, to a mirror, my family and my advisor. I would remember the main points instead of every word, using a keyword list like “Sunrise—visit, bingo, mail—grandma—kind, on time, patient” and counting skills on my fingers until I no longer needed the list, since I cannot bring notes. I would record myself and listen to check that I am clear and smiling. In the interview, I would speak clearly, look at the judges and sit up straight. If I forgot a part, I would pause, take a breath and keep going with what I remembered.'},sources:[RULES,COSINT]};

export const IS8={title:'Making a great first impression',hook:'The first few seconds of your interview matter a lot. How you walk in, greet the judges, shake hands and sit down shows that you are ready and professional. The first impression is worth 15 points, and your eye contact, poise and posture are worth 10 more. Good news: all of these can be practiced.',objectives:['Greet judges politely and confidently.','Give a good handshake.','Use good posture and eye contact.','Dress professionally.'],sections:[
['Walking in and greeting',[
'When the section leader says your name, walk in calmly, stand tall and **smile**. Look at the judges and say a greeting: “**Good morning. It’s nice to meet you.**”',
'Wait for the judges to invite you to sit, or ask, “May I sit down?” Then sit and get ready.',
'A friendly greeting helps the judges feel comfortable with you.',
'Practice walking in and greeting at home or school.',
'Your first words can be short and simple.',
"If you feel shy, practice your greeting many times with people you know. Each time, it becomes more natural.",
"When the interview starts, say “Thank you for having me.” It is polite and starts things on a warm note.",
order('Walking in',['Hear your name','Walk in calmly and smile','Look at the judges','Say “Good morning. It’s nice to meet you.”','Shake hands','Wait to be invited to sit'])]],
['The handshake',[
'Handshakes are allowed at the **start and end**. A good handshake: use your **right hand**, hold the judge’s hand **firmly but gently**, **palm to palm**, shake **one or two times** for about **two seconds**, look the judge in the eyes and smile.',
'Avoid a weak, floppy handshake or squeezing too hard.',
'If a judge does not offer a hand, smile and say hello instead.',
'If handshakes are hard for you, talk with your advisor about what feels comfortable.',
'Practice with family and friends until it feels natural.',
"Wipe your hands on a tissue before you go in if they feel sweaty. Dry hands make handshakes more comfortable.",
sort('Good handshake?',['Good','Not good'],[['Firm, palm to palm, with eye contact',0],['Weak and floppy',1],['About two seconds with a smile',0],['Squeezing very hard',1],['Looking at the floor',1]])]],
['Sitting and posture',[
'Sit up **straight** with your back against the chair and your **feet flat** on the floor. Rest your hands in your **lap** or on the table.',
'Try not to **fidget**—tapping, playing with hair or swinging your legs. If you need to move, keep it small and calm.',
'Leaning slightly forward shows you are interested.',
'Good posture also helps you breathe and speak clearly.',
'Practice sitting in a chair and answering questions at home.',
"If you use a wheelchair or other mobility aid, position yourself where you are comfortable and can face the judges.",
"Keep a tissue in your pocket in case you need one. Being prepared helps you feel calm.",
match('Body action and message',[['Sitting up straight','I am ready and confident'],['Hands calm in lap','I am calm'],['Leaning slightly forward','I am interested'],['Nodding','I am listening'],['Crossed arms','I might not be open'],['Smiling','I am friendly']])]],
['Eye contact',[
'Look at the judge who is **asking** the question while they talk. When you answer, look at **each judge** for a moment so they all feel included.',
'If direct eye contact is uncomfortable, look at the judge’s **forehead or eyebrows**. It looks like eye contact to them.',
'Short looks away to think are fine.',
'Practice eye contact while talking with family or friends.',
'Your accommodations can include support with this; ask your advisor.',
"Nodding while a judge talks shows you are listening, even if eye contact is hard for you.",
"Practice looking at each judge in turn. Count to two while looking at one person, then move to the next.",
chk('Eye contact feels hard for you. What can you try?',['Look at the judge’s forehead or eyebrows','Look at the ceiling the whole time','Close your eyes','Look only at the floor'],'A helpful strategy.')]],
['Dressing professionally',[
'Wear **business clothes** or the **official HOSA uniform**. You get **bonus points** for proper dress. Business clothes can include dress pants or a skirt, a collared shirt or blouse, a jacket or sweater and dress shoes.',
'Make sure clothes are **clean** and **fit well**. Have neat hair and clean hands and nails. Avoid strong perfume or cologne.',
'Try on your outfit before the event so you know it is comfortable.',
'Lay out your clothes the night before.',
'Looking professional helps you feel professional.',
"Wear comfortable shoes you have worn before. New shoes can hurt and distract you during the interview.",
"If you wear a uniform, check that it is clean and ironed the day before.",
sort('Good choice for the interview?',['Good choice','Not a good choice'],[['Pressed dress pants and a collared shirt',0],['Ripped jeans',1],['Official HOSA uniform',0],['Flip-flops',1],['Clean dress shoes',0],['Strong perfume',1]])]],
['Feeling calm before you walk in',[
'Feeling nervous is normal. Before your turn, try **slow breathing**: breathe in for four counts and out for six counts, five times.',
'Say something kind to yourself: “I practiced. I am ready.” Think about your three skills.',
'Arrive early so you do not feel rushed.',
'Use any calming strategy that works for you at school, like squeezing your hands gently or counting.',
'Remember: the judges want you to do well.',
"If you feel very nervous, tell your advisor ahead of time. They can help you practice calming strategies.",
ex('A calm-down routine','Plan a short routine for before the interview.',['Breathe in for 4 counts, out for 6 counts, five times','Roll your shoulders back','Say: “I practiced. I am ready.”','Think of your three skills','Smile and walk in'],'A simple routine that helps you feel calm.')]],
['Practice scenario',[
kase('First impression practice',{a:{text:'You walk in looking at the floor and sit down right away. (Scenario invented for practice.) What would be better?',choices:[['Smile, look at the judges, say hello, shake hands and wait to sit','b','Correct.',true],['Stay quiet','b','The greeting is scored.',false]]},b:{text:'You notice you are tapping your foot. What do you do?',choices:[['Place your feet flat and take a slow breath','c','Correct.',true],['Tap faster','c','Calm movements look confident.',false]]},c:{text:'Your first impression is friendly and professional.',end:true}})]]
],takeaways:['Walk in calmly, smile, look at the judges, say “Good morning. It’s nice to meet you,” shake hands and wait to be invited to sit (first impression is worth 15 points).','A good handshake is firm but gentle, palm to palm, about two seconds with eye contact; sit up straight with feet flat and calm hands; eye contact, poise and posture are worth 10 points.','Wear business clothes or the HOSA uniform for bonus points; use calming strategies like slow breathing and positive self-talk before walking in.'],terms:[['First impression','What people think of you when they first meet you.'],['Posture','How you hold your body when sitting or standing.'],['Eye contact','Looking at people while talking and listening.']],mcqs:[q('What should you say when you greet the judges?','“Good morning. It’s nice to meet you.”','Nothing','“Hey, what’s up?”','“Let’s get this over with.”','Greeting.'),q('How long should a handshake last?','About two seconds','About one minute','No time','Ten seconds','Handshake.'),q('Which handshake is best?','Firm, palm to palm, with eye contact','Weak and floppy','Very hard squeeze','No eye contact','Handshake.'),q('How should you sit?','Up straight with feet flat','Slouched','With feet on the table','Turned away','Posture.'),q('If eye contact is hard, you can look at:','The judge’s forehead or eyebrows','The ceiling','The floor','Your phone','Strategy.'),q('Which outfit earns bonus points?','Business clothes or HOSA uniform','Pajamas','Gym clothes','Swimsuit','Dress.'),q('How many points is the first impression worth?','15','1','50','100','Rubric.'),q('Which can help you feel calm?','Slow breathing','Running into the room','Skipping breakfast','Arriving late','Calm.')],frq:{prompt:'Describe how you would make a great first impression in your interview.',rubric:[['Greeting',['smile','look','good morning','nice to meet you','wait to sit']],['Handshake',['firm','palm','two seconds','eye contact']],['Posture and eye contact',['straight','feet flat','hands','fidget','eye contact','forehead']],['Dress and calm',['business','hosa uniform','clean','breathing','ready']]],model:'Before my interview, I would wear my HOSA uniform, which is clean and fits well, to earn the dress bonus. While waiting, I would breathe in for four counts and out for six counts five times and tell myself, “I practiced. I am ready.” When my name was called, I would walk in calmly, stand tall and smile. I would look at the judges and say, “Good morning. It’s nice to meet you.” Then I would shake each judge’s hand with my right hand, firmly but gently, palm to palm, for about two seconds while looking at them and smiling. I would wait for the judges to invite me to sit, or I would ask, “May I sit down?” When sitting, I would keep my back straight, my feet flat on the floor and my hands calm in my lap, leaning forward a little to show interest. I would try not to tap my foot or play with my hair. When a judge asked a question, I would look at that judge, and when I answered, I would look at each judge for a moment. If eye contact felt hard, I would look at the judge’s forehead. These steps would help me earn points for my first impression and for eye contact, poise and posture.'},sources:[RULES,SAFE]};

export const IS9={title:'Answering other questions and staying calm',hook:'After the first two questions, judges ask other questions you have not seen. That can feel scary, but a simple plan helps: answer the question, give an example and connect it to the job. Judges look for answers that share information, fit the question, show your skills and sound professional.',objectives:['Use a simple answer plan for any question.','Practice common interview questions.','Use professional words.','Stay calm and ask for help with a question if needed.'],sections:[
['The answer plan: Answer, Example, Connect',[
'Use three steps for any question. **1. Answer:** say your answer in one sentence. **2. Example:** tell one short, true example. **3. Connect:** link it to the job.',
'For “Are you a team player?” say: “Yes, I work well on teams. For example, at the food pantry, my team packed 50 boxes together each Saturday. At Sunrise Home, I will work with staff to help residents.”',
'This plan works for almost every question.',
'Practice it with many different questions.',
'Keep each answer to about 30 to 45 seconds.',
"Write down your best examples for each skill before practicing. Then you can reuse them for different questions.",
"If you cannot think of an example, you can share what you would do: “If a resident needed help, I would find a nurse right away.”",
order('Answer plan',['Answer the question in one sentence','Give one true example','Connect it to the job'])]],
['What judges look for in answers',[
'Judges score four things: **(a)** you **share information** (more than yes or no), **(b)** you **answer the question that was asked**, **(c)** you **talk about your strengths and skills** for the job and **(d)** you **sound professional**.',
'Doing all four earns the most points (15). The answer plan helps you do all four.',
'Listen carefully to each question before answering.',
'If you finish early, you can add one more detail.',
'Short, clear answers are better than long, confusing ones.',
"Listen to the whole question before you start answering. It is okay to wait a second after the judge finishes.",
flip('Four things judges look for',[['Share information','More than yes or no'],['Answer the question','Stay on topic'],['Show strengths','Talk about your skills'],['Sound professional','Use polite, clear words'],['All four','Earns the most points'],['Answer plan','Helps you do all four']])]],
['Common questions to practice',[
'Practice questions like: **Tell us about yourself.** **Why do you want this job?** **What are your strengths?** **What is something you want to get better at?** **Tell us about a time you helped someone.** **How do you handle stress?** **What would you do if a resident needed help?**',
'For “something you want to get better at,” name a real thing and how you are improving: “I want to get better at speaking up. I practice by asking one question in class each day.”',
'Use HOSA’s sample questions too.',
'Practice with your advisor, family or friends.',
'Remember: the real questions are secret, so do not share them after your interview.',
"Practice one new question each day. Over a few weeks, you will have practiced many different questions.",
match('Question and good example idea',[['Tell us about yourself','School, health class and volunteering'],['Why this job?','A story about why you care'],['Strengths','Kind, on time, patient'],['Something to improve','Speaking up, with a plan'],['A time you helped someone','Helping your grandmother'],['Handling stress','Taking slow breaths and asking for help']])]],
['Using professional words',[
'Use **polite, clear words**. Say “**residents**” instead of “old people,” “**yes**” instead of “yeah,” and “**I would ask a staff member for help**” instead of “I’d just figure it out.”',
'Try not to use filler words like “um,” “like” or “you know.” A short pause is better.',
'Speak in full sentences and say words clearly. Diction is worth 10 points.',
'Practice saying health words like “resident,” “patient” and “safety.”',
'Polite words show respect.',
"Thank the judge for a question if you need a moment to think. “Thank you for that question” gives you a few seconds.",
"Try saying “I would” or “I have” to start answers. These phrases sound clear and confident.",
sort('Professional or not?',['Professional','Not professional'],[['“Yes, I would ask a nurse for help.”',0],['“Yeah, whatever.”',1],['“I enjoy helping residents.”',0],['“Old people are cool.”',1],['“Thank you for the question.”',0]])]],
['When you do not understand a question',[
'It is okay to ask for help. You can say, “**Could you please repeat the question?**” or “**Could you say that another way?**” Your accommodations may include having questions repeated or explained.',
'You can also take a moment to think: “That’s a good question. Let me think.”',
'If you do not know an answer, be honest and share something related: “I have not done that yet, but I would ask a staff member and learn quickly.”',
'Never make up an answer.',
'Asking for help shows you want to answer well.',
"Your advisor can help you request accommodations, like extra time, so you do not feel rushed.",
chk('You did not hear the question clearly. What should you say?',['“Could you please repeat the question?”','Nothing','“Next question.”','Leave the room'],'It is okay to ask.')]],
['Staying calm during the interview',[
'If you feel nervous, take a **slow breath** before answering. Sit up straight and put your feet flat on the floor—it can help you feel steady.',
'Remember your **three skills**. Many questions can be answered with one of your skill examples.',
'If you make a mistake, keep going. You can say, “Let me try that again.”',
'Smile. The judges want you to succeed.',
'Each answer is a new chance.',
"Remember that judges are on your side. They want to see you do your best.",
"After each answer, take a small breath. It helps you reset before the next question.",
ex('Calm answer example','A judge asks, “How do you handle stress?” (example answer)',['Answer: “I handle stress by taking slow breaths and making a plan.”','Example: “Before my health science test, I made a study schedule and asked my teacher questions.”','Connect: “At Sunrise Home, if I feel stressed, I will stay calm and ask staff for help.”'],'A calm, clear answer using the answer plan.')]],
['Practice scenario',[
kase('Answering new questions',{a:{text:'A judge asks, “Why do you want this job?” (Practice item.) Which answer is best?',choices:[['Give a reason, a short story and how it connects to the job','b','Correct.',true],['“I don’t know.”','b','Use the answer plan.',false]]},b:{text:'You do not understand the next question. What do you do?',choices:[['Politely ask the judge to repeat or explain it','c','Correct.',true],['Guess wildly','c','Asking is allowed.',false]]},c:{text:'You answer every question calmly and clearly.',end:true}})]]
],takeaways:['Use the answer plan for any question: answer in one sentence, give one true example and connect it to the job (about 30–45 seconds).','Judges score sharing information, answering the actual question, showing strengths and sounding professional (15 points for all four); practice common questions and use polite, clear words without fillers.','Ask politely to repeat or explain questions (accommodations may help), be honest if you do not know and stay calm with slow breaths and your three skill examples.'],terms:[['Answer plan','Answer, example, connect—a simple way to answer any question.'],['Filler word','A word like “um” or “like” that adds no meaning.'],['Diction','How clearly and correctly you speak.']],mcqs:[q('What are the three steps of the answer plan?','Answer, example, connect','Yes, no, maybe','Stop, wait, leave','Read, copy, paste','Plan.'),q('Which answer shares information?','“Yes, I work well on teams. For example…”','“Yes.”','“No.”','“Maybe.”','Criteria.'),q('Which is professional?','“Yes, I would ask a nurse for help.”','“Yeah, whatever.”','“Old people are cool.”','“Dunno.”','Words.'),q('If you do not understand a question, you can:','Ask the judge to repeat it','Leave','Stay silent forever','Guess a random answer','Help.'),q('If you do not know an answer, you should:','Be honest and share something related','Make something up','Get angry','Say nothing','Honesty.'),q('Which is a filler word?','Um','Resident','Safety','Patient','Diction.'),q('How long should most answers be?','About 30–45 seconds','About 5 minutes','About 1 second','About 1 hour','Timing.'),q('What helps you stay calm?','A slow breath','Talking very fast','Standing on the chair','Ignoring the judges','Calm.')],frq:{prompt:'Show how you would answer a new interview question using the answer plan and stay calm.',rubric:[['Answer plan',['answer','example','connect','job']],['Criteria',['share','question','strengths','professional']],['Professional words',['polite','residents','full sentences','no fillers']],['Calm and help',['repeat','explain','honest','breath','keep going']]],model:'If a judge asked, “Tell us about a time you helped someone,” I would use the answer plan. First, I would answer in one sentence: “I helped my grandmother after she had hip surgery.” Second, I would give a true example: “Every afternoon, I walked beside her so she would not fall, and I made a chart to help her remember her medicine.” Third, I would connect it to the job: “At Sunrise Home, I will bring the same patience and care to residents who need help.” This answer shares information, answers the question, shows my strengths and sounds professional, which are the four things judges look for. I would use polite words like “residents” and “medicine,” speak in full sentences and pause instead of saying “um.” If I did not understand a question, I would say, “Could you please repeat the question?” because my accommodations allow questions to be repeated. If I did not know an answer, I would be honest: “I have not done that yet, but I would ask a staff member and learn quickly.” To stay calm, I would take a slow breath before answering, sit up straight with my feet flat and remember my three skills—kind, on time and patient—because many questions can be answered with one of my skill examples. If I made a mistake, I would say, “Let me try that again,” and keep going.'},sources:[RULES,COSINT]};

export const IS10={title:'Ending strong and practicing',hook:'The end of your interview is your last chance to leave a great impression. A strong closing is worth 10 points, and showing confidence and excitement is worth 10 more. In this final lesson, you will practice a simple closing, plan full practice interviews and get ready for competition day.',objectives:['Give a short, strong closing.','Show confidence and excitement for the job.','Plan full practice interviews.','Get ready for competition day.'],sections:[
['A simple closing',[
'At the end, judges may ask, “**Is there anything else you want us to know?**” Use a three-part closing: **1. Your best reason**—“I would be a kind and reliable volunteer.” **2. Your excitement**—“I am excited to help residents at Sunrise Home.” **3. Thank you**—“Thank you for your time.”',
'Then stand, smile and **shake hands** again if the judges offer.',
'Keep your closing short—about 15 to 20 seconds.',
'Practice it until you can say it easily.',
'A strong ending helps judges remember you.',
"Practice your closing at the end of every practice interview. It should become automatic.",
"If you run out of time, a quick “Thank you for your time” and a smile are still a good ending.",
order('Closing steps',['Say your best reason','Say why you are excited','Say thank you','Stand and smile','Shake hands'])]],
['Showing confidence and excitement',[
'Judges score **confidence, maturity and enthusiasm** (10 points). Show **confidence** by sitting tall, speaking clearly and looking at the judges. Show **maturity** by being polite and honest. Show **enthusiasm** by smiling and saying why you care about the job.',
'You do not need to be perfect. Effort, kindness and honesty go a long way.',
'Practice showing excitement in your voice when you talk about why you want the job.',
'Believe in yourself—you prepared for this.',
'Each practice makes you more confident.',
"Think about why the job matters to you before the interview. Real reasons make your excitement easy to show.",
"Being polite to everyone—helpers, other competitors and judges—shows maturity throughout the event.",
sort('Shows confidence and excitement?',['Shows it','Does not show it'],[['Smiling when talking about the job',0],['Mumbling and looking down',1],['Saying “I am excited to help residents.”',0],['Saying “I don’t really care.”',1],['Sitting tall and speaking clearly',0]])]],
['Full practice interviews',[
'A **full practice interview** is like the real one: someone acts as the judge, you walk in, greet, answer the first two questions, answer other questions and close—all in **five minutes**.',
'Practice with your advisor, a teacher, a family member or HOSA friends. Wear your interview clothes for some practices.',
'Ask your practice judge to show a card when one minute is left, just like the real event.',
'Afterward, ask for one thing you did well and one thing to work on.',
'Try to do a full practice interview at least once a week before competition.',
"Each practice can be a little better than the last. Focus on one small goal each time, like smiling more.",
"Record one full practice interview each week and watch it. Notice one thing you improved since last time.",
ex('Practice interview plan','Plan a weekly full practice (example).',['Monday: set up chairs like the interview room','Practice walking in and greeting','Answer the two guaranteed questions','Answer three new practice questions','Give your closing and shake hands','Get feedback: one strength, one goal'],'A practice that feels like the real interview.')]],
['Competition day checklist',[
'**The night before:** lay out your clothes, get good sleep and review your main points. **In the morning:** eat breakfast, bring your **photo ID** and arrive early.',
'**Before the interview:** do your calm-down routine. Remember: **no materials** go into the interview.',
'**After the interview:** keep the questions secret until the event is over.',
'Check that your **accommodation form** was submitted earlier.',
'Smile—you are ready.',
"Pack your photo ID the night before and put it somewhere you will not forget.",
"Plan how you will get to the interview room. Knowing the way helps you arrive calm and on time.",
order('Competition day',['Lay out clothes the night before','Sleep well','Eat breakfast','Bring photo ID','Arrive early','Do your calm-down routine','Interview with no materials','Keep questions secret'])]],
['Learning after the event',[
'After competition, think about what went well and what you want to improve. Write down a few notes.',
'The skills you practiced—greeting, answering questions and talking about yourself—will help you in real job interviews, volunteer applications and school.',
'Keep your resume and statement and add new experiences as they happen.',
'Thank the people who helped you prepare.',
'Be proud of your hard work.',
"Keep your notes from this year. They can help you prepare for future interviews quickly.",
"Share what you learned with younger HOSA members. Teaching others helps you remember your skills too.",
match('After the event and next step',[['An answer felt hard','Practice it more next time'],['Greeting went well','Keep doing it'],['New volunteer job','Add it to your resume'],['A real job opening','Use your interview skills'],['Someone helped you','Thank them'],['You finished the event','Be proud']])]],
['Thank-you notes in real life',[
'After a **real** job interview, it is polite to send a short **thank-you note** or email within about one day. Thank the interviewer, say you are still interested and mention something you enjoyed talking about.',
'This is not required in the HOSA event, but it is a great habit for real jobs.',
'Keep it short—three or four sentences.',
'Ask a teacher or family member to read it before you send it.',
'Thank-you notes help employers remember you.',
"Practice writing a short thank-you note now so it feels easy when you need one for a real job.",
chk('When should you send a thank-you note after a real interview?',['Within about one day','After a month','Never','Before the interview'],'A good habit.')]],
['Practice scenario',[
kase('Ending the interview',{a:{text:'A judge asks, “Is there anything else you want us to know?” (Practice item.) What do you say?',choices:[['Give your best reason, say you are excited and thank them','b','Correct.',true],['“No.” and walk out','b','The closing is scored.',false]]},b:{text:'After your interview, a friend asks what questions you got. What do you do?',choices:[['Politely say you cannot share until the event is over','c','Correct.',true],['Tell them all the questions','c','The questions are secret.',false]]},c:{text:'You end strong and follow the rules.',end:true}})]]
],takeaways:['Close with your best reason, your excitement and a thank-you (about 15–20 seconds), then stand, smile and shake hands; the closing is worth 10 points.','Show confidence, maturity and enthusiasm (10 points) by sitting tall, speaking clearly, being polite and honest and smiling about the job.','Do weekly full five-minute practice interviews with feedback; on competition day bring photo ID, arrive early, use your calm-down routine, bring no materials and keep questions secret; keep building skills after the event.'],terms:[['Closing','The short statement at the end of an interview.'],['Enthusiasm','Showing excitement and interest.'],['Full practice interview','A practice that follows the real interview from start to finish.']],mcqs:[q('What are the three parts of a simple closing?','Best reason, excitement and thank you','Hello, goodbye and run','Your name, age and grade','Nothing','Closing.'),q('How many points is the closing worth?','10','1','50','100','Rubric.'),q('Which shows enthusiasm?','Smiling and saying why you care','Mumbling','Looking at the floor','Saying you do not care','Enthusiasm.'),q('How long is a full practice interview?','About five minutes','About one hour','About ten seconds','About one day','Practice.'),q('What must you bring on competition day?','Photo ID','Your resume','Notes','A practice judge','Rule.'),q('What do you do with the questions after your interview?','Keep them secret until the event is over','Tell friends','Post them','Write them on the wall','Ethics.'),q('When should you send a thank-you note after a real interview?','Within about one day','After a year','Never','Before you apply','Habit.'),q('After the event, you should:','Think about what went well and what to improve','Forget everything','Throw away your resume','Stop practicing forever','Growth.')],frq:{prompt:'Explain how you would end your interview strongly and prepare for competition day.',rubric:[['Closing',['best reason','excited','thank you','handshake','short']],['Confidence',['confidence','maturity','enthusiasm','smile','honest']],['Practice',['full practice','five minutes','feedback','weekly','one minute card']],['Competition day',['photo id','arrive early','no materials','calm','secret']]],model:'At the end of my interview, when a judge asked if there was anything else I wanted them to know, I would give a short three-part closing: “I would be a kind and reliable volunteer. I am excited to help residents at Sunrise Home. Thank you for your time.” Then I would stand, smile and shake each judge’s hand. Throughout the interview, I would show confidence by sitting tall, speaking clearly and looking at the judges, maturity by being polite and honest and enthusiasm by smiling and explaining why I care about the job. To prepare, I would do a full practice interview each week with my advisor or family, setting up chairs like the real room, walking in, greeting, answering the two guaranteed questions and three new questions and giving my closing in five minutes, with a card shown at one minute left. Afterward, I would ask for one thing I did well and one thing to improve. On competition day, I would lay out my HOSA uniform the night before, sleep well, eat breakfast, bring my photo ID and arrive early. Before my interview, I would do my calm-down routine with slow breathing, and I would remember that no materials can go into the interview. Afterward, I would keep the questions secret until the event ends, write notes about what went well and use these skills for real job interviews.'},sources:[RULES,OWLLET]};
