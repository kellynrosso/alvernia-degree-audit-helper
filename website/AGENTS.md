# Campus Resource Studio: project instructions

Build a useful, accessible campus guide for AI 101 students from all majors. Read README.md and the student's TASK.md before edits.

- This is a classroom prototype, not the official university website. Preserve that label.
- data.js contains sourced campus/partner addresses and approximate pins. Preserve the distinction between active campuses, planned Allentown, partners, student-added resources, and the proposed AI Center.
- Add new published resources to config.js studentResources. Require a source URL, checked date, coordinates, and honest access notes. Never invent hours, service availability, or accessibility from an image.
- Keep student/browser changes exportable. Local storage does not publish changes to GitHub.
- Put no private model API keys, private/write-scope Cesium tokens, or personal student records in this public client. Use the token UI for session setup. A published public-scope Cesium token must be limited by assets and URL.
- Preserve Cesium/Google/provider credits, Google geocoder use for Google tiles, video pause controls, keyboard dialogs, responsive layout, and the WebGL error fallback.
- The AI Center image is a proposal. A GLB is a separately created model. Do not describe the code example as automatic image-to-3D reconstruction or as a real campus building.
- This app is deterministic browser code, not a live LLM. Coding agents operate on this repository; do not fake agent/network results in the interface.
- Make the requested feature concrete; run `node test-core.js` and relevant browser checks. Report actual results, untested live-token paths, and files changed. Never claim that WebGL or token-dependent tiles rendered unless observed.
- Stop after the acceptance criteria are checked. Do not add unrelated APIs or deploy other projects.
- The archived examples/legacy-loop lesson uses fictional service records; do not mix those into the real campus seed data.
