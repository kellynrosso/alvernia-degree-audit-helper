# Redesign Alvernia for a Real Student

This is this week's active assignment. Choose ONE useful page or feature.
The earlier five-resource and AI Center challenges are optional extensions for this lab.
The starter website still displays those older challenges as example content.
This TASK.md and the redesign Canvas rubric define what is required this week.

## My design brief — complete before editing code
Student / group: [Enter your name]

My chosen audience: All Alvernia University students.

Task this person needs to complete: Understand degree requirements and track sample progress toward graduation.

Problem I observed in the starter or official site: The starter website does not currently include a tool that explains degree requirements or lets students explore graduation progress.

Evidence (a screenshot, observation, or peer comment): [Add a screenshot of the original website showing that the Degree Audit Helper is not available.]

My improvement in one sentence: I will create an interactive Degree Audit Helper that explains common degree requirements and lets students track their progress using a sample checklist.

Why this matters to someone: Students can better understand graduation requirements, see how progress tracking works, and prepare questions for their academic advisors.

What I will leave outside this week's scope: Real student records, official degree audits, university database connections, actual graduation eligibility calculations, and AI chatbots.

## My chosen path
Chosen path: Other — Alvernia Degree Audit Helper.

I am creating a student-designed Degree Audit Helper that explains common degree requirements and allows students to track sample graduation progress. This is not an official Alvernia University degree audit.


## Project boundaries
Likely files for navigation: index.html, style.css, and the relevant menu code in app.js.
Likely files for a new page: ai.html (new), style.css, optional ai.js (new), and a link in index.html.
Do not copy app.js to a new page without checking which existing DOM elements it expects.
Use relative links so the site works under a GitHub Pages repository path.

Files my agent may change: index.html, style.css, degree-audit.html (new), and degree-audit.js (new).

Existing features it must preserve: The campus map, resource finder, navigation, existing JavaScript features, student-prototype label, and source/media credits.

Sources for any university facts I add: I will use fictional sample requirements and will not add unverified Alvernia degree requirements.

What I will label as a proposal, sample, rule-based interaction, or unknown: The Degree Audit Helper is a student-designed proposal. The checklist and progress tracker use fictional examples, not official student records. Graduation eligibility must be confirmed with an academic advisor.

## Three acceptance tests — observable checks, not opinions
1. When I select a sample degree requirement, I expect to see a clear explanation of what it means.

2. When I change a requirement's status on a phone or using a keyboard, I expect the sample graduation progress tracker to update correctly.

3. When no requirements are marked completed, I expect the progress tracker to display 0% and explain that the information is only a demonstration.

Example navigation test: On a narrow screen, the Menu button opens and closes;
all links can be reached by keyboard; selecting a link reaches the correct section.
Example AI hub test: Choosing Writing shows the matching sourced examples;
Reset restores all cards; an unmatched search shows a useful empty message.

## Bounded agent workflow
Read README.md and AGENTS.md. Summarize this TASK.md before editing.
Ask about missing design choices, then offer two feasible small solutions.
Wait for my selection. Implement the selected option.
Run node test-core.js if Node is available. Otherwise mark it unrun and tell me how to run it.
Perform the relevant browser checks; do not claim checks you could not perform.
Record observations, fix one concrete issue, and retest.
Stop after the three criteria pass and a peer test is recorded, or after three
build/test rounds. At the round limit, report the unresolved issues and next step.

## Evidence to submit
- Working site URL and repository URL, or an instructor-approved code ZIP fallback.
- This completed TASK.md.
- Before and after screenshots, including a narrow-screen view.
- A short 60–90 second demo showing the visitor's task.
- New results appended to TEST_LOG.md; do not rewrite the starter's test history.
- AI_USE.md: a useful suggestion, a change I made, and an error/limitation I checked.
- One peer's task result and the revision I made in response.

## Non-negotiable project rules
Keep the student-prototype label and source/media credits.
Do not invent university services, hours, accessibility, policies, or building status.
Do not collect real student records or add private model API keys to browser code.
An AI-themed page does not need a live chatbot. Label scripted interactions honestly.
Keep existing maps, token controls, and fallbacks intact unless my approved task
specifically changes them. No Cesium token or paid API is required for the redesign.
