// Interviewing Skills lessons 1–5 (event for HOSA members classified under IDEA): the event and accommodations,
// choosing a job, telling your story, writing the statement step by step, and building a resume.
const RULES=['HOSA Interviewing Skills 2026–27 guidelines and rating sheets','https://hosa.org/wp-content/uploads/2026/08/Interview-Skills-26-27.pdf'];
const OWLPS=['Purdue OWL: The personal statement','https://owl.purdue.edu/owl/job_search_writing/preparing_an_application/writing_the_personal_statement/index.html'];
const OWLRES=['Purdue OWL: Résumés and CVs','https://owl.purdue.edu/owl/job_search_writing/resumes_and_vitas/index.html'];
const COSRES=['CareerOneStop: Resumes','https://www.careeronestop.org/JobSearch/Resumes/resumes.aspx'];
const EHC=['Explore Health Careers','https://explorehealthcareers.org/'];
const SAFE=['CareerSafe','https://www.careersafeonline.com/'];
const q=(p,a,b,c,d,e)=>[p,[a,b,c,d],e];
const match=(title,pairs)=>({t:'w',kind:'match',title,pairs});
const order=(title,steps)=>({t:'w',kind:'order',title,steps});
const sort=(title,buckets,items)=>({t:'w',kind:'sort',title,buckets,items});
const flip=(title,cards)=>({t:'w',kind:'flip',title,cards});
const kase=(title,nodes)=>({t:'w',kind:'case',title,start:'a',nodes});
const chk=(q,options,why)=>({t:'check',q,options,why});
const ex=(title,prompt,steps,answer)=>({t:'example',title,prompt,steps,answer});

export const IS1={title:'The event, eligibility and accommodations',hook:'Interviewing Skills lets you practice something every worker does: applying for a job and talking with the people who hire. You write about yourself, make a one-page resume and then have a short interview with judges. This event is made for HOSA members who have an IEP under IDEA, and it lets you ask for the accommodations you need.',objectives:['Explain who can compete and how accommodations work.','Describe the two rounds and how they are scored.','List what you must upload and when.','Make a simple plan for the year.'],sections:[
['Who can compete',[
'Interviewing Skills is a **solo event** for the **secondary** division. It is one of four HOSA events made for students with an **IEP**. The others are Personal Care, Life Support Skills and Speaking Skills.',
'To compete, you must be classified under the **Individuals with Disabilities Education Act (IDEA)**. Students with only a **Section 504 plan** are **not** eligible for this event.',
'Your advisor can help you check whether you are eligible before you sign up.',
'If you are not sure about your plan, ask your advisor or school counselor. They can look at your records with you.',
'Knowing the rules early helps you avoid surprises later in the year.',
sort('Eligible for Interviewing Skills?',['Eligible','Not eligible'],[['Secondary student with an IEP under IDEA',0],['Student with only a 504 plan',1],['Secondary student with an IEP who wants to interview for a hospital volunteer role',0],['Postsecondary student',1]])]],
['The accommodation form',[
'Every competitor must complete the **IEP Verification and Accommodation Form**. It confirms your eligibility and lets you **ask for accommodations**—changes that help you show what you know, such as extra time to answer, having questions repeated or using a reader.',
'Submit it by your **state deadline** and **digitally for ILC by May 15 at midnight EST**. If you do not submit it on time, you can still compete, but you get **35 penalty points**.',
'Talk with your advisor and family about which accommodations help you most at school. Those are often the best ones to request.',
'Accommodations do not make the event easier. They make it fair, so you can show your real skills.',
'Keep a copy of the form so you can check it before competition day.',
"Some common accommodations include extra time to answer, having questions read aloud or repeated, a quiet waiting space or breaks. Your IEP team can help you choose what fits.",
order('Getting accommodations',['Talk with your advisor and family','Choose the accommodations that help you','Fill out the form','Submit it by the state deadline','Submit it for ILC by May 15','Keep a copy'])]],
['The two rounds',[
'**Round One** is your **personal statement and resume**. You upload them together as **one PDF file** by **May 15**. Judges read them before the conference. This round is worth **105 points**.',
'**Round Two** is the **interview**. Everyone who uploads gets an interview. It lasts **up to five minutes** and is worth **80 points**. A helper shows a card when **one minute** is left.',
'You may **not bring anything** into the interview—not even your resume. Handshakes are allowed at the start and the end.',
'Your scores from both rounds are added together.',
'Wear business clothes or the HOSA uniform. You get bonus points for proper dress.',
{t:'table',caption:'Event at a glance',head:['Round','What you do','Points'],rows:[['Round One','Personal statement and resume (one PDF)','105'],['Round Two','Interview with judges (up to 5 minutes)','80'],['Missing accommodation form','Compete with a penalty','−35']]}]],
['What judges look for',[
'In the **personal statement**, judges check spelling and grammar, length and formatting, and how well you **introduce yourself**, **tell your story**, **show who you are** and **finish strongly**.',
'In the **resume**, they check spelling, that it is **one page**, the **content** (20 points) and **creativity** (20 points).',
'In the **interview**, they look at your **first impression**, how well you **answer questions**, your **confidence**, how much you **know about the job**, your **closing**, how clearly you **speak** and your **eye contact and posture**.',
'You do not need to be perfect. Judges look for effort, honesty and preparation.',
'Practice helps with every item on this list.',
"Read the rating sheet with your advisor. Knowing exactly what judges look for helps you practice the right things.",
flip('What judges look for',[['Personal statement','Your story and who you are'],['Resume','One page, clear and creative'],['First impression','Greeting and handshake'],['Answers','Clear and about the job'],['Confidence','Calm and excited'],['Closing','A strong goodbye']])]],
['The secret questions',[
'In the interview, judges ask questions. The **first two questions are always the same idea**: (1) explain the job or opportunity you are interviewing for, and (2) tell the **skills** you would bring to it. You can practice these two answers a lot.',
'The other questions are a **secret**. After your interview, **do not tell anyone** what they were until the event is over. Telling others breaks the rules and can cost a big penalty.',
'HOSA shares sample questions so you can practice similar ones.',
'Practicing with sample questions helps you feel ready for anything.',
'If you forget an answer, you can pause and take a breath. That is okay.',
chk('What do the first two interview questions ask about?',['The job you chose and the skills you bring','Your favorite movie','Other competitors','The weather'],'You can prepare these.')]],
['A simple year plan',[
'**Fall:** check eligibility, choose your job and start the accommodation form. **Winter:** write your personal statement and resume with help from your advisor. **Spring:** upload one PDF before May 15 and practice interviews every week.',
'Break big jobs into small steps. Write one paragraph a week, or practice one question a day.',
'Use a calendar or checklist to track each step. Checking items off feels good and keeps you on time.',
'Ask for help early. Teachers, family and advisors want to support you.',
'Celebrate small wins along the way.',
"Set up a regular time each week to work on the event, like Tuesday after school. A steady routine makes big projects feel smaller.",
order('Year plan',['Check eligibility','Choose a job','Start the accommodation form','Write the statement and resume','Upload one PDF by May 15','Practice interviews weekly'])]],
['Practice scenario',[
kase('Getting ready',{a:{text:'It is May 10 and you have not sent your accommodation form. (Scenario invented for practice.) What should you do?',choices:[['Finish it with your advisor and submit it before May 15','b','Correct.',true],['Skip it','b','Missing it costs 35 points.',false]]},b:{text:'You want to bring your resume into the interview to read from. Is that allowed?',choices:[['No—no materials are allowed in the interview','c','Correct.',true],['Yes','c','You cannot bring any materials.',false]]},c:{text:'You submit the form and practice answering without notes.',end:true}})]]
],takeaways:['Interviewing Skills is a solo secondary event for students classified under IDEA with an IEP (504-only students are not eligible); complete the IEP Verification and Accommodation Form by the state deadline and for ILC by May 15 or receive 35 penalty points.','Round One is a personal statement and resume uploaded as one PDF by May 15 (105 points); everyone who uploads gets an interview of up to five minutes (80 points) with no materials allowed.','The first two questions always ask about your chosen job and your skills; other questions are secret and must not be shared; plan the year in small steps with your advisor.'],terms:[['IEP','Individualized Education Program, a plan for students with disabilities under IDEA.'],['Accommodation','A change that helps you show your skills fairly, such as extra time.'],['Personal statement','Writing that tells your story and why you fit a job.']],mcqs:[q('Who can compete in Interviewing Skills?','Secondary students classified under IDEA','Students with only a 504 plan','Postsecondary students','Any adult','Eligibility.'),q('What happens if the accommodation form is late?','You compete with 35 penalty points','You cannot compete','Nothing','You get bonus points','Rule.'),q('How long is the interview?','Up to 5 minutes','30 minutes','1 hour','1 minute','Time.'),q('What can you bring into the interview?','Nothing','Your resume','Notes','A friend','Rule.'),q('How must the statement and resume be uploaded?','As one PDF file','As photos','On paper','By email to judges','Rule.'),q('What do the first two questions ask about?','The job and your skills','Your hobbies','Your pets','The judges','Rule.'),q('When are handshakes allowed?','At the start and end','Never','Only at the end','Only if you ask','Rule.'),q('What should you do with the secret questions after your interview?','Keep them secret until the event ends','Tell your friends','Post them online','Write them on the board','Ethics.')],frq:{prompt:'Explain who can compete in Interviewing Skills, what you must submit and how the interview works.',rubric:[['Eligibility',['iep','idea','504','secondary','eligible']],['Accommodation form',['form','accommodations','may 15','35','state deadline']],['Round One',['personal statement','resume','one pdf','105','may 15']],['Interview',['5 minutes','no materials','first two questions','skills','secret','handshake']]],model:'Interviewing Skills is a solo event for secondary students who are classified under IDEA and have an IEP; students with only a 504 plan cannot compete. Every competitor must complete the IEP Verification and Accommodation Form, which confirms eligibility and lets me ask for accommodations such as extra time or having questions repeated. I must submit it by my state deadline and again for ILC by May 15, or I will still compete but lose 35 points. In Round One, I write a personal statement and a one-page resume about a job I am trained for or learning to do, such as a hospital volunteer, and upload them together as one PDF by May 15. Judges score them for 105 points. Everyone who uploads gets a Round Two interview of up to five minutes, worth 80 points. I cannot bring any materials, not even my resume. Handshakes are allowed at the start and end. The first two questions always ask me to explain the job I chose and the skills I would bring, so I can practice those answers. The other questions are secret, so I must not tell anyone what they were until the event is over. My plan is to check eligibility and choose my job in the fall, write my documents in the winter with my advisor and upload early and practice interviews every week in the spring.'},sources:[RULES,SAFE]};

export const IS2={title:'Choosing your job and learning about it',hook:'Before you write anything, you choose the job, internship, scholarship or program you want to interview for. A good choice is something real that you are trained for or are learning to do. Then you learn about it, so you can talk about it with confidence in the interview.',objectives:['Choose a real opportunity that fits your training.','Find out what the job involves.','List your own skills and experiences.','Match your skills to the job.'],sections:[
['Picking the right opportunity',[
'Choose a **health-related job** or a job **inside a health facility** that you are **trained for or being trained for**. It can be clinical (helping patients), educational or administrative (office work). You can also choose an **internship**, **scholarship** or **school program**.',
'Good examples include a **hospital volunteer**, **dietary aide**, **patient transporter**, **medical office assistant**, **nursing assistant** (if you are in a CNA course) or **health science scholarship**.',
'Pick something you could really apply for. That makes your answers honest and easier to give.',
'Ask your teacher what jobs your training prepares you for.',
'Choose something you are excited about. Excitement helps in the interview.',
"If you are not sure what jobs fit your training, look at what your class practices. Skills like greeting people, cleaning safely or helping with meals connect to many health jobs.",
sort('Good choice for this event?',['Good choice','Not a good choice'],[['Hospital volunteer',0],['Brain surgeon',1],['Dietary aide in a nursing home',0],['Hospital president',1],['Medical office receptionist after office training',0],['Patient transporter',0]])]],
['Learning about the job',[
'Find out **what the job involves**. Look at a job posting, the organization’s website or career sites such as Explore Health Careers. Ask your teacher or someone who does the job.',
'Write down three things: (1) **main tasks** of the job, (2) **skills** the job needs and (3) **where** the job happens and **who** you would work with.',
'This information helps you answer the first interview question: “Tell us about the job you are interviewing for.”',
'If you can, visit the place or talk to a worker there. Seeing the job helps you understand it.',
'Keep your notes in one folder so you can study them.',
"Write your job notes in a simple chart with three columns: tasks, skills and where. Charts are easy to read and study.",
match('Job and main task',[['Hospital volunteer','Guides visitors and delivers items'],['Dietary aide','Helps prepare and serve meals'],['Patient transporter','Moves patients safely by wheelchair or bed'],['Medical receptionist','Greets patients and schedules appointments'],['Nursing assistant','Helps patients with daily care'],['Pharmacy helper','Stocks shelves and assists staff']])]],
['Your skills list',[
'Next, make a list of **your skills**. Skills are things you are good at. Some are **job skills**, like using a computer or taking a temperature. Others are **people skills**, like being kind, on time or a good listener.',
'Think about school, home, clubs, sports, volunteering and any jobs. What do people thank you for? What are you proud of?',
'Write each skill with **one example**. For example: “Kind—I help my younger brother with homework every night.”',
'Your teacher or family can help you think of skills you might forget.',
'Everyone has skills. This list helps you see yours.',
"Think about compliments people give you. If a teacher says you are always helpful, that is a skill you can use in your interview.",
sort('Job skill or people skill?',['Job skill','People skill'],[['Using a computer to type',0],['Being a good listener',1],['Taking a temperature',0],['Being on time',1],['Folding linens neatly',0],['Being kind to others',1]])]],
['Your experiences list',[
'Now list your **experiences**. Include **school** (classes and grades you are proud of), **work** (any job, even babysitting or yard work), **volunteering**, **HOSA** and **clubs or sports**.',
'For each one, write **what you did**. For example: “Volunteered at the food pantry—packed boxes and greeted families every Saturday for six months.”',
'These lists become the building blocks of your resume and personal statement.',
'Use real experiences only. Judges want to know the real you.',
'Add new experiences to your list as they happen during the year.',
ex('Writing an experience','Turn an activity into an experience entry (details invented for practice).',['Activity: helping at a school health fair','What I did: set up tables and handed out flyers','How long: one day, 4 hours','What I learned: talking to visitors and staying organized'],'“Helped set up and greet visitors at the school health fair for 4 hours.” (Details invented for practice.)')]],
['Matching your skills to the job',[
'Look at your job notes and your skills list side by side. Draw a line from each **job need** to a **skill you have**. For example, the job needs “being friendly with patients,” and you are “kind—I volunteer at the food pantry.”',
'Pick your **top three matching skills**. These will be your answer to the second interview question: “What skills would you bring?”',
'If the job needs a skill you are still learning, say so honestly and explain how you are practicing it.',
'Practice saying your three skills out loud.',
'Matching makes your answers clear and strong.',
"If a job needs a skill you do not have yet, that is okay. You can say, “I am learning this in my health science class.”",
order('Matching steps',['List what the job needs','List your skills','Draw lines to match them','Pick your top three','Add one example for each','Practice saying them aloud'])]],
['Using your accommodations to prepare',[
'Use the tools that help you at school. If reading is hard, ask someone to read job information aloud. If writing is hard, try speaking your ideas into a recorder and typing them later.',
'Graphic organizers, checklists and color-coded notes can help you keep track of your job, skills and examples.',
'Practice in a quiet place if noise makes it hard to focus.',
'Ask your advisor about accommodations you can request for the interview, such as extra time.',
'Preparing in the way that works best for you is smart, not a shortcut.',
chk('Which is a smart way to prepare if writing is hard?',['Speak your ideas into a recorder, then type them','Skip preparing','Copy someone else’s work','Write nothing'],'Use tools that help you.')]],
['Practice scenario',[
kase('Choosing your job',{a:{text:'You have trained in your school’s health science lab and volunteer at a nursing home. (Scenario invented for practice.) Which job fits?',choices:[['A nursing home volunteer or dietary aide','b','Correct.',true],['Head doctor of the hospital','b','Choose something you are trained for.',false]]},b:{text:'Your top skills are being kind, on time and careful. What do you do next?',choices:[['Write one example for each skill','c','Correct.',true],['Just list the words','c','Examples make skills believable.',false]]},c:{text:'You are ready to start writing your story.',end:true}})]]
],takeaways:['Choose a real health-related job, internship, scholarship or program you are trained for or being trained for, such as hospital volunteer, dietary aide or patient transporter.','Learn the job’s main tasks, needed skills, setting and team; list your job skills and people skills and your experiences, each with an example.','Match job needs to your skills, pick your top three for the second interview question and prepare using the tools and accommodations that help you.'],terms:[['Job skill','A skill used to do the work, such as typing.'],['People skill','A skill for working with others, such as listening.'],['Experience','Something you have done, such as volunteering or a job.']],mcqs:[q('Which job is a good choice for a high school student?','Hospital volunteer','Brain surgeon','Hospital president','Chief doctor','Choice.'),q('Which is a people skill?','Being a good listener','Typing','Taking a temperature','Folding linens','Skills.'),q('Which is a job skill?','Using a computer','Being kind','Being on time','Being friendly','Skills.'),q('Where can you learn about a job?','A job posting or Explore Health Careers','A video game','A cartoon','Nowhere','Research.'),q('How many top skills should you pick for the second question?','Three','Ten','Zero','Twenty','Strategy.'),q('What should go with each skill?','One example','Nothing','A drawing only','A price','Evidence.'),q('Your experiences should be:','Real','Made up','Copied','Secret','Honesty.'),q('If writing is hard, you can:','Record your ideas and type them later','Skip preparing','Copy a friend','Give up','Tools.')],frq:{prompt:'Describe how you would choose your opportunity and prepare your skills for Interviewing Skills.',rubric:[['Choosing',['real','trained','health','volunteer','internship','scholarship']],['Learning the job',['tasks','skills','setting','posting','teacher']],['Skills and experiences',['job skills','people skills','example','experiences','volunteer']],['Matching',['match','top three','second question','practice','accommodations']]],model:'I would choose a job I am trained for or learning to do, like a volunteer at a local nursing home, because I have practiced skills in my health science class and already help there on weekends. Next, I would learn about the job by reading the nursing home’s volunteer page and asking the volunteer coordinator. I would write down the main tasks, like visiting residents, helping with activities and delivering mail, the skills needed, like kindness, patience and being on time, and who I would work with, like nurses and activity staff. Then I would list my skills. My job skills include using a computer and folding linens neatly. My people skills include being kind, being a good listener and always being on time. I would write one real example for each, like “On time—I have not missed a volunteer shift in six months.” I would also list my experiences: my health science class, volunteering at the nursing home and the food pantry and helping my grandmother. After that, I would match what the job needs to my skills and pick my top three—kindness, patience and being on time—for the second interview question. I would use tools that help me, like recording my ideas before typing and using a checklist, and I would practice saying my three skills out loud every day.'},sources:[RULES,EHC]};

export const IS3={title:'Telling your story',hook:'Your resume tells what you have done. Your personal statement tells who you are. It is your story—something real that happened to you, what you learned and why you want this job. Judges love stories that are honest and specific. This lesson helps you find and plan your story.',objectives:['Explain what a personal statement is.','Find a true story from your life.','Plan your story with a simple organizer.','Connect your story to the job.'],sections:[
['What is a personal statement?',[
'The guidelines say a personal statement is **a story** (your story), **an invitation** (a way for judges to get to know you) and **a picture** (a snapshot of who you are).',
'It should show **what makes you special** and include things that are **not on your resume**, like your feelings, values and goals.',
'It also shows why you are a **good fit** for the job.',
'Think of it like telling a new friend about yourself and why you care about this job.',
'Your story does not have to be big or dramatic. Small, real moments can be powerful.',
"Your statement is your chance to share what the resume cannot show, like how you treat people and what you care about.",
flip('A personal statement is…',[['A story','Something real that happened to you'],['An invitation','A way for judges to know you'],['A picture','A snapshot of who you are'],['Special','What makes you different'],['Not on the resume','Feelings, values and goals'],['A fit','Why you match the job']])]],
['Finding your story',[
'Think about moments that mattered to you. Did you **help someone**? Did you **learn something hard**? Did someone **inspire** you? Did you **overcome a challenge**? When did you first get interested in health care?',
'Pick **one or two moments** that connect to the job you chose. For a nursing home volunteer job, a story about helping your grandmother is a great fit.',
'Your challenges can be part of your story too, if you feel comfortable sharing. Many strong stories show how someone kept going when things were hard.',
'Talk your ideas over with your advisor or family. Saying them out loud can help you choose.',
'Pick the story that makes you feel proud.',
"You can also write about someone who inspired you, like a nurse who cared for your family. Explain what you learned from watching them.",
sort('Good story for a nursing home volunteer job?',['Good fit','Not a good fit'],[['Helping my grandmother after her surgery',0],['My favorite video game',1],['Making a resident smile during a visit',0],['A trip to the mall',1],['Learning patience while helping my little brother',0]])]],
['Using a story organizer',[
'A simple **story organizer** helps you plan. Answer five questions: **Who** was there? **What** happened? **How did I feel?** **What did I learn?** **How does it connect to this job?**',
'Write short answers first. You can turn them into sentences later.',
'Using an organizer makes writing easier because you already know what to say.',
'You can draw boxes or use a template your teacher gives you.',
'Keep your organizer to use when practicing for the interview too.',
"If you like drawing, you can sketch your story in boxes like a comic strip first. Then write a sentence for each box.",
ex('Filling in a story organizer','Plan a story (details invented for practice).',['Who: my grandmother and me','What: she broke her hip; I helped her walk and remember her pills','Feelings: worried at first, then proud','Learned: patience and how much small help matters','Connection: I want to help residents feel safe and happy'],'A complete plan ready to write (details invented for practice).')]],
['Showing, not just telling',[
'Instead of only saying “I am kind,” **show** it with what you did: “Every afternoon, I walked slowly beside my grandmother so she would not fall.”',
'Showing helps judges picture you. It makes your words believable.',
'Use your senses and details: what you saw, heard or did.',
'One clear example is better than many words like “nice” or “good.”',
'Practice turning “I am…” sentences into “I did…” sentences.',
"Try to include at least one sense detail, like what you heard or saw. Details help judges imagine the moment with you.",
"Ask yourself, “What did I do?” instead of “What am I like?” The answer usually gives you a showing sentence.",
sort('Showing or telling?',['Showing','Telling'],[['“I walked beside my grandmother every afternoon so she would not fall.”',0],['“I am kind.”',1],['“I read to Mrs. Lopez each Saturday because her eyes are weak.”',0],['“I am helpful.”',1],['“I learned every resident’s name in my first week.”',0]])]],
['The parts of your statement',[
'Your statement has four parts. **1. Beginning:** start with something interesting that grabs attention. **2. Story:** tell what happened. **3. Who you are:** explain what you learned and what you will bring to the job. **4. Ending:** finish strong and say why you want this job.',
'The judges score each part—**introduction**, **story**, **snapshot of you** and **conclusion**—at 10 points each.',
'Following these four parts keeps your statement clear and organized.',
'You can write each part on a separate card, then put them in order.',
'Check that each part connects to the next.',
"Each part can be one paragraph. Four short paragraphs are easy to write, read and remember.",
order('Statement parts in order',['Beginning that grabs attention','Your story','What you learned and will bring','Strong ending'])]],
['Connecting to the job',[
'Near the end, connect your story to the job. Explain how what you learned will help you do the work. For example: “Helping my grandmother taught me patience, which I will use when I visit residents who need extra time.”',
'Say **why you want this job** in your own words.',
'This connection shows judges you are a good fit.',
'Use the job’s name and one task you will do.',
'Keep it simple and honest.',
"Your connection shows judges that you understand the job and know why your story matters for it.",
chk('Which sentence best connects your story to the job?',['“Helping my grandmother taught me patience, which I will bring to residents at Sunrise Home.”','“That is my story.”','“I like stuff.”','“The end.”'],'Clear connection.')]],
['Practice scenario',[
kase('Planning your story',{a:{text:'Your first idea is “I am a nice person.” (Scenario invented for practice.) How can you make it a story?',choices:[['Tell about a time you did something nice, with details','b','Correct.',true],['Repeat “nice” many times','b','Show with a real example.',false]]},b:{text:'Your story is about helping at a food pantry, but your job is a hospital volunteer. What do you do?',choices:[['Connect what you learned at the pantry to helping hospital visitors','c','Correct.',true],['Choose a different job','c','Many stories can connect with a clear link.',false]]},c:{text:'Your story plan is clear and connected to the job.',end:true}})]]
],takeaways:['A personal statement is a story, an invitation and a picture of who you are, including things not on your resume and why you fit the job.','Choose one or two real moments that connect to the job and plan them with a story organizer (who, what, feelings, learned, connection); show with details instead of only telling.','Use four parts—beginning, story, what you learned and will bring, strong ending (each 10 points)—and connect your story to the job and why you want it.'],terms:[['Story organizer','A simple plan with questions to help you write your story.'],['Showing','Using actions and details to prove a quality.'],['Connection','Explaining how your story relates to the job.']],mcqs:[q('A personal statement is:','A story, an invitation and a picture','A list of grades','A copy of the resume','A grocery list','Definition.'),q('Which is a good story for a nursing home job?','Helping a grandmother after surgery','A video game','A shopping trip','A movie','Fit.'),q('Which sentence shows instead of tells?','“I read to Mrs. Lopez each Saturday.”','“I am kind.”','“I am nice.”','“I am good.”','Showing.'),q('How many parts does the statement have?','Four','One','Ten','Twenty','Structure.'),q('What comes first?','A beginning that grabs attention','The ending','Your phone number','The resume','Order.'),q('Which question is part of a story organizer?','What did I learn?','What is my favorite color?','How tall am I?','What is for lunch?','Planning.'),q('Why connect your story to the job?','To show you are a good fit','To make it longer','To confuse judges','It is not needed','Purpose.'),q('Each of the four statement parts is worth:','10 points','1 point','50 points','100 points','Rubric.')],frq:{prompt:'Plan your personal statement story using a story organizer and the four parts of a statement.',rubric:[['Purpose',['story','invitation','picture','who you are','fit']],['Story choice',['real','moment','help','learned','connect']],['Organizer',['who','what','feel','learned','connection']],['Parts',['beginning','story','bring','ending','show']]],model:'My personal statement would tell a true story about helping my grandmother after she broke her hip. Using a story organizer, I would answer five questions. Who: my grandmother and me. What: after her surgery, I walked beside her every afternoon so she would not fall and helped her remember her pills with a chart. How I felt: worried at first, then proud when she could walk to the mailbox by herself. What I learned: patience and how much small help can mean. Connection: I want to help residents at Sunrise Home feel safe and happy. My statement would have four parts. The beginning would grab attention: “The first time my grandmother tried to walk after surgery, she held my hand so tightly it hurt.” Next, I would tell the story with details that show my kindness instead of just saying I am kind. Then I would explain who I am and what I will bring to the job, like patience, being on time and listening carefully. Finally, I would end strong by connecting my story to the volunteer job: “Helping my grandmother taught me patience, and I want to bring that patience to the residents at Sunrise Home.” I would talk my plan over with my advisor and keep the organizer to practice for my interview.'},sources:[RULES,OWLPS]};

export const IS4={title:'Writing your statement step by step',hook:'Now you turn your plan into sentences. You write the beginning, the story, what you will bring and the ending—then format the pages exactly as HOSA asks and check for mistakes. Taking it one step at a time makes writing much easier, and every formatting rule you follow earns points.',objectives:['Write each part of the statement from your plan.','Make a title page with all the required information.','Format the pages correctly.','Check your writing for mistakes.'],sections:[
['Step 1: The beginning',[
'Start with a sentence that **grabs attention**. You can describe a moment (“The hallway smelled like soup, and Mr. Davis was waiting by the window.”) or share something someone said to you.',
'Then add one or two sentences that tell what your statement is about and the job you want.',
'Read your beginning out loud. Does it make you want to keep reading?',
'Try writing two or three beginnings and pick your favorite.',
'Short and clear is better than long and confusing.',
"If you get stuck, start with the story instead. You can write the beginning last, after you know what your statement says.",
"A question can also make a good beginning, like “Have you ever seen someone light up when you remember their name?”",
sort('Strong or weak beginning?',['Strong','Weak'],[['“Mr. Davis waited by the window every Saturday for my visit.”',0],['“My name is Sam and this is my statement.”',1],['“My grandmother squeezed my hand as she took her first step after surgery.”',0],['“I want a job.”',1]])]],
['Step 2: The story',[
'Write your story from your organizer. Tell **what happened** in order: first, next, then, finally. Use **real details** and **actions**.',
'Add how you **felt** and what you **learned**. This is called **reflection**.',
'Use words like **first**, **next**, **after that** and **finally** to help the reader follow along.',
'Keep sentences short and clear.',
'One or two short paragraphs are enough for the story.',
"Read each sentence out loud as you write. If it sounds confusing, make it shorter or say it a different way.",
"Use “I” sentences to tell what you did. For example, “I set up the chairs” is clear and strong.",
order('Writing the story',['Set the scene','Tell what happened first','Tell what happened next','Share how you felt','Share what you learned'])]],
['Step 3: Who you are and the ending',[
'Explain **what you will bring** to the job. Name one or two qualities and connect them to the work: “I will bring patience and a smile to every resident I visit.”',
'Then write your **ending**. Go back to your beginning and say why you want this job. A strong ending is short and memorable.',
'For example: “Mr. Davis taught me that a visit can brighten a whole day. At Sunrise Home, I hope to brighten many days.”',
'Read the beginning and the ending together. Do they match?',
'Your ending is the last thing judges read, so make it count.',
"Name the qualities you will bring in simple words, like kind, careful, patient or on time. Then show how each one helps the job.",
"If you are not sure your ending is strong, ask a family member which sentence they remember most. Make that sentence your last one.",
chk('Which ending is strongest?',['“A visit can brighten a whole day. At Sunrise Home, I hope to brighten many.”','“The end.”','“That is all.”','“Bye.”'],'Memorable and connected.')]],
['Step 4: The title page',[
'Page 1 is the **title page**. It must include: the **event name** (Interviewing Skills), **your name**, **HOSA division**, **chapter number**, **school name**, **chartered association** (your state) and the **job or opportunity** you chose.',
'You may add a design or picture, but it does not change your score.',
'Check each item off a list so you do not forget anything.',
'Ask your advisor for your chapter number if you do not know it.',
'The title page is one page only.',
"Make the title page neat and easy to read. Center the words and use a clear font so judges find the information quickly.",
sort('Goes on the title page?',['Goes on the title page','Does not go on the title page'],[['Event name',0],['Your name',0],['Chapter number',0],['The job you chose',0],['Your home address',1],['Your phone password',1]])]],
['Step 5: Formatting the statement',[
'Pages 2–3 are your statement. Follow these rules: **one-sided**, **typed**, **no more than two pages**, **12-point Arial** font, **double-spaced**, in **English**, **1-inch margins** on regular **8½ × 11-inch** paper.',
'Add a **header** at the top of each statement page: your **last name** and the **event name** on the **left** and the **page number** on the **right**. The title page does **not** get a header.',
'Your teacher can help you set up a template so formatting is correct from the start.',
'Length and formatting are worth 5 points each.',
'Use the print preview to check your pages.',
"If two pages feel like too much, that is fine. A clear one-and-a-half-page statement can score well if it tells your story.",
flip('Formatting checklist',[['Font','12-point Arial'],['Spacing','Double-spaced'],['Margins','1 inch'],['Length','Up to 2 pages'],['Header left','Last name and event'],['Header right','Page number']])]],
['Step 6: Checking for mistakes',[
'Spelling and grammar earn **5 points only with no mistakes**. Use spell-check, then read your statement **out loud** slowly. Ask a teacher, advisor or family member to read it too.',
'Watch for words that sound alike but mean different things, like **their/there/they’re** and **patience/patients**.',
'Use text-to-speech if it helps you hear mistakes.',
'Check that every fact is true and matches your resume.',
'Make your changes, then check one more time.',
"Keep your first draft too. Seeing how much your writing improved can help you feel proud and confident.",
"Spell-check does not catch everything. A careful human reader is the best final check.",
match('Mistake and fix',[['“Their going to the store”','“They’re going to the store”'],['“I learned patients”','“I learned patience”'],['Missing header','Add last name, event and page number'],['Three pages','Shorten to two pages'],['Very long sentence','Split into two sentences'],['Typo found by reading aloud','Correct it']])]],
['Practice scenario',[
kase('Fixing your statement',{a:{text:'Your statement is in 10-point font and single-spaced to fit more words. (Scenario invented for practice.) What do you change?',choices:[['Use 12-point Arial, double-spaced, and shorten the text if needed','b','Correct.',true],['Keep it—more words is better','b','Formatting rules are scored.',false]]},b:{text:'You put a header on the title page. Is that right?',choices:[['No—headers go only on the statement pages','c','Correct.',true],['Yes, every page needs one','c','The title page has no header.',false]]},c:{text:'Your statement now follows every rule.',end:true}})]]
],takeaways:['Write step by step: an attention-grabbing beginning, your story in order with feelings and lessons, what you will bring and a strong ending that ties back to the beginning.','The title page lists the event name, your name, division, chapter number, school, chartered association and the job you chose.','Format statement pages in 12-point Arial, double-spaced, 1-inch margins, up to two pages, with a header (last name and event left, page number right; none on the title page); check for zero mistakes by reading aloud and asking others to review.'],terms:[['Reflection','Sharing how you felt and what you learned.'],['Header','Text at the top of each page with your last name, event and page number.'],['Template','A document already set up with the right formatting.']],mcqs:[q('What font is required?','12-point Arial','10-point Times','14-point Comic Sans','Any font','Format.'),q('How should the statement be spaced?','Double-spaced','Single-spaced','Triple-spaced','No spaces','Format.'),q('How many statement pages are allowed?','Up to two','Five','Ten','One line','Length.'),q('Where does the page number go?','Top right','Bottom left','Middle','Nowhere','Header.'),q('Does the title page get a header?','No','Yes','Only a picture','Only the date','Rule.'),q('Which belongs on the title page?','The job you chose','Your home address','Your password','Your grades','Title page.'),q('Which word fixes “I learned patients”?','Patience','Patents','Patties','Patients is correct','Homophones.'),q('A good way to find mistakes is to:','Read your statement out loud','Never check','Only look at the first line','Delete it','Proofreading.')],frq:{prompt:'Explain the steps you would follow to write, format and check your personal statement.',rubric:[['Writing',['beginning','story','feelings','learned','bring','ending']],['Title page',['event','name','division','chapter','school','association','job']],['Formatting',['12','arial','double-spaced','1-inch','two pages','header','page number']],['Checking',['spell-check','out loud','teacher','homophones','true']]],model:'First, I would write a beginning that grabs attention: “Mr. Davis waited by the window every Saturday for my visit,” followed by a sentence saying I want to volunteer at Sunrise Home. Second, I would write my story in order using words like first, next and finally, with real details about reading to Mr. Davis and how I felt and what I learned. Third, I would explain what I will bring—patience and a friendly smile—and write an ending that ties back to my beginning: “Mr. Davis taught me that a visit can brighten a whole day. At Sunrise Home, I hope to brighten many days.” Fourth, I would make a title page with the event name, my name, HOSA division, chapter number, school name, chartered association and the volunteer job. Fifth, I would format my statement pages in 12-point Arial, double-spaced, with 1-inch margins, no more than two pages, and add a header with my last name and the event name on the left and the page number on the right, leaving the title page without a header. Finally, I would run spell-check, read my statement out loud, use text-to-speech to hear mistakes, check words like patience and patients, make sure every fact is true and ask my advisor to read it before I finish.'},sources:[RULES,OWLPS]};

export const IS5={title:'Building a one-page resume',hook:'A resume is a one-page list of your education, experiences and skills. It helps an employer quickly see what you can do. Judges give 20 points for content and 20 points for creativity, so a clear, neat resume really matters. You will build it one section at a time.',objectives:['Name the main sections of a resume.','Write experience lines that start with action words.','Keep the resume to one true, error-free page.','Design a resume that is neat and a little creative.'],sections:[
['The main sections',[
'Most student resumes have these sections: **contact information** (name, phone, school email), **objective** (the job you want), **education** (school, grade, health classes), **experience** (jobs and volunteering), **skills** and **activities or awards**.',
'Put the most important information near the top.',
'Use a template or ask your teacher for a sample to follow.',
'Each section has a clear heading so readers can find things fast.',
'Do not include private information like your Social Security number or birth date.',
"A template makes resume building easier. Fill in each section one at a time instead of trying to do it all at once.",
order('Resume sections in order',['Contact information','Objective','Education','Experience','Skills','Activities and awards'])]],
['Contact information and objective',[
'At the top, write your **name** in larger letters, then your **phone number** and a **professional email**, like your school email. You can add your city and state.',
'Next, write a short **objective**: one sentence about the job you want and what you will bring. For example: “Friendly, reliable student seeking a volunteer position at Sunrise Home to help residents feel happy and safe.”',
'Keep the objective short and about this job.',
'Check that your phone number and email are correct.',
'A professional email looks like your name, not a nickname.',
"Read your objective out loud. It should clearly say the job you want and one or two things you will bring.",
sort('Professional or not?',['Professional','Not professional'],[['sam.lee@school.org',0],['coolgamer99@email.com',1],['Your name in large, bold letters',0],['A silly nickname at the top',1],['A short objective about the job',0]])]],
['Education and skills',[
'In **education**, list your school, your expected graduation year and health classes you have taken, like **Health Science** or **First Aid**. Add certifications such as **CPR** with the date.',
'In **skills**, list things you can do, like **typing**, **taking a temperature**, **speaking Spanish** or **using a computer**. Choose skills that help with the job.',
'People skills like kindness are best shown in your experience lines or statement.',
'Be honest—list only skills you really have.',
'Keep each skill short.',
"If you have a skill like speaking another language, add it. Many health jobs value people who can help patients in their own language.",
"If you have a CPR or first aid card, look at it to copy the exact name and date correctly.",
match('Section and example',[['Education','Lincoln High School, expected 2028'],['Classes','Health Science I'],['Certification','CPR, American Heart Association, 2026'],['Skill','Typing 40 words per minute'],['Skill','Taking a temperature'],['Award','Perfect attendance, 2026']])]],
['Experience lines with action words',[
'In **experience**, list jobs and volunteer work. For each, write the **place**, your **role**, the **dates** and one to three short lines about what you did.',
'Start each line with an **action word**: **helped**, **greeted**, **delivered**, **organized**, **cleaned**, **served**, **assisted**. Add numbers when you can: “Greeted about 30 visitors each Saturday.”',
'Action words make your work sound clear and strong.',
'Use past tense for jobs you finished and present tense for jobs you still do.',
'Keep each line to one sentence.',
"For each experience, think about what you did most often. Those tasks make the best lines on your resume.",
"Use the same action word style for every line. Starting each line the same way makes your resume neat.",
sort('Strong or weak experience line?',['Strong','Weak'],[['Delivered mail to 20 residents each week',0],['Did stuff',1],['Greeted about 30 visitors every Saturday',0],['Was there sometimes',1],['Helped serve lunch to 40 people at the food pantry',0]])]],
['Keeping it true and on one page',[
'Your resume must be **one page** and **true**. Include only **real** jobs, classes and skills. Never make up experiences or change numbers.',
'If it is too long, remove less important items or shorten lines. If it is too short, add classes, volunteering, HOSA or school activities.',
'Spelling and grammar earn points only with **no mistakes**, so check carefully.',
'Ask someone to read your resume and look for mistakes.',
'Judges may ask about anything on your resume, so know each line.',
"If you cannot remember exact dates, ask a parent or supervisor, or check old schedules or certificates.",
chk('You volunteered 10 hours. What should your resume say?',['10 hours','100 hours','1,000 hours','No hours, but claim you were the boss'],'Always be truthful.')]],
['Making it neat and creative',[
'**Creativity** is worth 20 points. Make your resume **neat** and **a little special**: your name in bold, one calm accent color, clear section lines and even spacing.',
'Do **not** use bright backgrounds, cartoons or many different fonts. In health care, neat and simple looks professional.',
'Use the same style for every heading and every date.',
'Leave some white space so the page is easy to read.',
'Print it to see how it looks on paper.',
"Show your resume to your advisor and ask, “Is this easy to read?” Their answer helps you improve the design.",
"Keep your resume simple. Neat and clear is always better than busy and crowded.",
ex('Improving a design','Make a plain resume more creative (example).',['Make your name bold and a little larger','Add a thin blue line under each heading','Line up all dates on the right side','Use one easy-to-read font','Leave space between sections'],'A neat, professional resume with a creative touch.')]],
['Practice scenario',[
kase('Resume check',{a:{text:'Your experience line says “Food pantry.” (Scenario invented for practice.) How do you improve it?',choices:[['“Packed food boxes for about 25 families every Saturday”','b','Correct.',true],['Leave it','b','Use action words and details.',false]]},b:{text:'Your resume is one and a half pages. What do you do?',choices:[['Remove less important items and shorten lines to fit one page','c','Correct.',true],['Use tiny font','c','Keep it readable.',false]]},c:{text:'Your resume is one neat, true page.',end:true}})]]
],takeaways:['Resume sections: contact information (professional email), objective, education (classes, certifications), experience, skills and activities or awards; leave out private information.','Write experience lines that start with action words (helped, greeted, delivered) and include numbers when possible; list only true skills and experiences.','Keep it to one error-free page; make it neat and a little creative (bold name, one accent color, even spacing) without bright backgrounds or cartoons; content and creativity are 20 points each.'],terms:[['Resume','A one-page summary of your education, experience and skills.'],['Action word','A strong verb that starts an experience line, like “greeted.”'],['Objective','A short sentence about the job you want.']],mcqs:[q('How long should the resume be?','One page','Two pages','Five pages','Any length','Rule.'),q('Which is a professional email?','sam.lee@school.org','coolgamer99@email.com','partyking@email.com','nickname123@email.com','Contact.'),q('Which is an action word?','Greeted','Stuff','Thing','Was','Action.'),q('Which experience line is strongest?','Greeted about 30 visitors every Saturday','Did stuff','Was there','Helped','Detail.'),q('How many points is resume creativity worth?','20','5','1','50','Rubric.'),q('Which design is best for health care?','Neat with one accent color','Bright neon background','Cartoons everywhere','Ten different fonts','Design.'),q('If you volunteered 10 hours, you should write:','10 hours','100 hours','1,000 hours','No hours','Honesty.'),q('Which should NOT be on a resume?','Social Security number','Your name','Your school','Your skills','Privacy.')],frq:{prompt:'Describe how you would build a one-page resume for your chosen job.',rubric:[['Sections',['contact','objective','education','experience','skills','awards']],['Experience lines',['action words','numbers','dates','role','place']],['Truth and length',['one page','true','no mistakes','check']],['Design',['neat','bold','accent color','spacing','creative','no cartoons']]],model:'My resume would be one page. At the top, I would write my name in large bold letters, then my phone number and school email. Next, I would write an objective: “Friendly, reliable student seeking a volunteer position at Sunrise Home to help residents feel happy and safe.” In education, I would list Lincoln High School, my expected graduation year, Health Science I and First Aid, and my CPR certification from the American Heart Association with the date. In experience, I would list my volunteering at Sunrise Home and the food pantry, with lines that start with action words and include numbers, like “Read to 3 residents every Saturday” and “Packed food boxes for about 25 families each week.” In skills, I would list typing, taking a temperature and using a computer. In activities and awards, I would list HOSA and my perfect attendance award. Everything would be true. I would check spelling with spell-check and ask my advisor to read it, because there must be no mistakes. To make it neat and creative, I would use one easy-to-read font, my name in bold, a thin blue line under each heading, dates lined up on the right and plenty of white space, without cartoons or bright colors. I would print it to check how it looks and make sure it fits on one page.'},sources:[RULES,OWLRES,COSRES]};
