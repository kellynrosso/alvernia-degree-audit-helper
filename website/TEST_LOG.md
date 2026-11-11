# Verification log

## Starter verification · 2026-10-30

- JavaScript syntax checks: passed for app.js, map.js, core.js.
- Automated validation: 10 test groups passed (run `node test-core.js`).
- Desktop browser: landing page/official background video rendered; carousel added a fourth YouTube slide; lookalike YouTube domain rejected; temporary test slide removed.
- Resource UI: sourced QA record saved, progress changed to 1/5, survived page reload, found by search, and removed. Export displayed the successful data-export message. Test data was removed from the preview.
- Mobile CSS: inspected in a 390-pixel iframe; hero, navigation, resource search, and map layout fit. DOM measured no horizontal overflow (375-pixel content width, 375-pixel scroll width).
- Cesium and model-viewer: browser cannot initialize WebGL 2. Clear fallback is included; actual 3D rendering, tile coverage, and model placement are not verified here.
- No user Cesium token was supplied. Real-token authentication, Google asset entitlement/quota, and live photorealistic tiles still require a check on an authorized WebGL-enabled device.
- A video URL’s syntax can be tested without verifying whether its owner allows playback. Test your chosen YouTube video after adding it.
- GLB file structure and local asset references checked separately during packaging.
- Imported JSON validation is automated; browser file-picker import/upload paths still need a student-device check.

## Student test record

| Scenario | Expected | Observed | Pass/fix/untested |
| --- | --- | --- | --- |
| Add five distinct resources | Five new pins; sources retained; 5/5 | | |
| Same resource twice | No inflated count | | |
| Search with no result | Clear empty state | | |
| Invalid video URL | Rejected without embedding | | |
| My actual YouTube story | Plays or useful external link | | |
| Export and import | Data survives; no token in JSON | | |
| Real token + tiles | Photorealistic scene or clear account/coverage error | | |
| My GLB on campus | Correct size, heading, ground contact | | |
| Keyboard + phone | Navigation and forms usable | | |
| Wrong or missing evidence | Claim corrected or left unknown | | |


## This week's redesign — student evidence
Complete this section for the chosen page/feature. The earlier map/GLB rows are
optional unless those features are part of the chosen redesign. Do not mark
the starter's historical results as results of your own work.

| Check | Expected | Observed | Pass / fix / untested |
| --- | --- | --- | --- |
| My acceptance test 1 | | | |
| My acceptance test 2 | | | |
| My acceptance test 3 | | | |
| Phone-width layout | | | |
| Keyboard path and visible focus | | | |
| Empty, invalid, or unavailable state | | | |
| Peer completes the assigned task | | | |
| Revised feature retest | | | |
| Published page and relative links | | | |
| Existing node test-core.js (if available) | | | |

Peer's task and observed difficulty:
What I changed after the peer test:
Known limitation and next step:
## Degree Audit Helper — Manual Testing (November 10, 2026)

- **PASS:** Checking one sample requirement updates progress from 0% to 17%.
- **PASS:** Requirement explanations can be expanded and collapsed.
- **PASS:** Resetting the sample checklist returns progress to 0%.
- **PASS:** The progress tracker displays the number of completed fictional sample requirements.
- - **PASS:** Keyboard accessibility testing. Pressing Spacebar toggles a focused checkbox and correctly updates the progress percentage.
- **PENDING:** Physical mobile-device testing.

The Degree Audit Helper uses fictional requirements and is clearly labeled as a student-designed demonstration, not an official Alvernia University degree audit.
## Peer Testing – November 10, 2026

**Tester:** A peer

**Task:** Test the Alvernia Degree Audit Helper and its interactive checklist.

**Result:** PASS

My peer tested the Degree Audit Helper and confirmed that it worked for them. They did not report any problems, confusion, or suggestions for improvement.

**Feedback:** No issues or suggestions were reported.

**Changes made:** No changes were made based on the peer's feedback.

**Remaining limitation:** The Degree Audit Helper uses fictional sample requirements and does not determine actual graduation eligibility.