# Alvernia Campus Resource Studio

> **This week's redesign lab:** complete the revised TASK.md and one useful
> page or feature. The five-resource and AI Center sections below document
> optional starter capabilities; they are not required for this week's full
> credit. The website itself still displays the earlier example challenge.
> See ../INSTRUCTOR_START_HERE.txt, ../AGENT_PROMPTS.txt, and canvas-lab.html.

An AI 101 classroom remake inspired by Alvernia’s website. It is a student prototype, not the university’s official website. Plain HTML, CSS, and JavaScript: no build step, paid model API, or server required.

## Start here

1. Extract the starter ZIP. Open the `website` folder in VS Code or your coding agent.
2. Serve that folder with VS Code Live Server, or run `python3 -m http.server 8000` inside it and open `http://localhost:8000` (Windows: `py -m http.server 8000`). Do not rely on double-clicking the HTML file: model fetching, origins, and token restrictions need an HTTP server.
3. Open the site. Try the carousel, search, and resource editor.
4. Select **Load campus map**. The basic Cesium map uses OpenStreetMap without a token. A WebGL-capable browser and network access are required.
5. Follow the five-resource challenge on the page. Read `TASK.md` before asking an agent to edit code.

## Exactly where to add a Cesium access token

**Recommended for development:** click **Connect Cesium** in the header or **Map setup** above the map. Paste your own Cesium ion token. It is stored only in this tab’s session storage, not in the exported JSON. Use **Forget session token** to clear it.

**Published class website:** open `config.js` and change this field:

```js
window.CAMPUS_CONFIG = {
  cesiumIonToken: "YOUR_PUBLIC_SCOPE_URL_RESTRICTED_TOKEN",
  // Keep the other configuration fields already in the file.
};
```

Create a separate token at <https://ion.cesium.com/tokens>. Use only public `assets:read` and `geocode` scopes, the required assets, and your website origin in Allowed URLs. Include your localhost origin for local testing. Public browser tokens are visible to visitors. Never paste an OpenAI, Claude, admin, or write-scope key into this app. A token bundled by an `.env` build step would also be visible in the browser.

If you leave config blank, every student can connect their own token through the interface. Do not submit tokens in Canvas, screenshots, AI chats, or exported work. Removing a session token does not remove a token that you wrote into config.js.

## Photorealistic 3D: what it does

1. In Cesium ion, enable/add **Google Photorealistic 3D Tiles** to your account.
2. Confirm your token has access to that content. Check current terms, plan eligibility, and quota in your account before streaming; this starter does not promise unlimited free usage.
3. Connect the token and click **Photorealistic 3D**.
4. Select a location, then drag/zoom/tilt the scene. Google’s geocoder is used when token-enabled; the app’s resource search only filters its local records.
5. Keep Google/Cesium/provider credits visible. The app streams the tiles; do not download/rehost the scan data.

This is existing real-world imagery/geometry, not new campus scanning. Photorealistic coverage and detail vary; the starter cannot guarantee full 3D buildings at every location. Use the basic map when coverage or quota is unavailable. If WebGL fails, the directory, resources, image, export, and lab still work.

## Locations and evidence

Seven starting pins cover Hill Campus, Reading CollegeTowne, Pottsville, planned Allentown, MCCC Blue Bell and Pottstown, and the North Philadelphia partner. These are not seven Alvernia campuses. Campuses, planned locations, and partners have different labels.

Names, addresses, and statuses were checked against official pages on 2026-10-30. Allentown remains labeled planned because the official locations page says soon to open. Coordinates are approximate address geocodes, not surveyed building corners or accessible entrances. The Allentown source has no east/west qualifier; its pin is explicitly an approximate downtown marker. See `data.js`, `SOURCES.md`, and `assets/coordinate-sources.json`. Verify locations again before using for directions or student support.

## Add five student resources

Use **Add a resource**. Each record needs a name, helpful description, campus, category, latitude/longitude, source link, checked date, and honest access notes. Use a precise map point when available; do not copy a campus center for every service. Unknown hours/accessibility must stay unknown. Do not enter private student records.

The seven campus/partner seed pins do not count toward the goal. New resources are stored in your browser. You can edit/remove them, search them, and export/import the project JSON. Matching names at the same campus update rather than inflate the count.

To publish browser edits for classmates:

1. Click **Export my project data**.
2. Open the downloaded JSON.
3. Copy the `resources` array into `studentResources` in `config.js`.
4. Copy the `videos` array into `heroVideos`.
5. Commit the files and update GitHub Pages. Browser local storage never edits the repository.

Example resource shape (replace illustrative values with verified details):

```json
{
  "name": "Your verified resource",
  "campus": "hill",
  "category": "Learning",
  "description": "Who it helps and what students should confirm.",
  "lat": 40.312,
  "lon": -75.934,
  "source": "https://www.alvernia.edu/",
  "verifiedOn": "2026-10-30",
  "accessibility": "Not verified; contact the service."
}
```

## Add a YouTube story

Click **Add a video**, enter a title and a full YouTube link, and save. Previous/next controls select the new carousel story. **Watch this campus story** opens a privacy-enhanced YouTube embed; an external link is available if the video cannot be embedded. The video must be public/unlisted and allow embedding. The carousel does not advance by itself. The official campus background video is muted and has a pause control.

For a persistent published video, add it to `config.js`:

```js
heroVideos: [
  { title: "My Alvernia campus story", youtubeUrl: "https://www.youtube.com/watch?v=YOUR_11_CHARACTER_ID" }
],
```

Agent prompt: “Read AGENTS.md. Ask me for my YouTube URL and a title. Add it to heroVideos in config.js. Preserve the carousel and no-autoplay-audio behavior. Test an invalid link and the new slide.”

## Create an AI Center: image → model → campus

The starter provides `assets/ai-center-concept.png` (AI-generated illustration) and `models/ai-center-concept.glb` (separately code-built, simplified 3D massing model). They are a classroom concept, not an actual/approved Alvernia building. The model approximates the design; it is not a photorealistic reconstruction of the image.

1. Generate your own building concept with an image model. Show a full three-quarter view and keep shapes understandable. Save the prompt, tool, edits, and date in `AI_USE.md`.
2. Create a model in an image-to-3D service you have access to, or use Blender with an AI-assisted modeling script. Check the service’s export rights and costs. Export **GLB 2.0**, ideally under 25 MB with embedded textures. Image generation alone does not produce this file.
3. Upload the image and GLB in **AI Center studio**. Orbit the model to inspect invented hidden sides, geometry, and scale.
4. Set latitude, longitude, heading, scale, and height. Click **Place on the campus map**. The default point is only a hypothetical Hill Campus placement. Move it away from existing buildings for a sensible classroom proposal; this tool does not assess land ownership, utilities, construction, or accessible routes.
5. Use photorealistic 3D for context when available. The proposed model is a separate layer on top of the scan, not a change to real-world tiles.
6. To publish, place your files in `assets/` and `models/`, then update `aiCenter.imageUrl` and `aiCenter.modelUrl` in config.js plus placement values. The JSON export does not embed uploaded file bytes. Keep the original files.

Optional: host a georeferenced 3D Tiles asset in your own Cesium ion account. This starter’s uploader accepts self-contained GLB files; it does not pretend a JPEG is 3D and does not automatically run an image-to-3D service.

## Work with a coding agent

The repository includes AGENTS.md, CLAUDE.md, GEMINI.md, TASK.md, TEST_LOG.md, AI_USE.md, and project skill examples in `.agents/skills` and `.claude/skills`. They are repository instructions, not a hosted chatbot, model API, or automatic agent connection. Open the project folder in a coding tool you already use; ask it to read AGENTS.md and TASK.md. For chat-only tools, attach the relevant files and copy the returned changes into the project.

Use a bounded loop: goal → edit → run tests → observe → fix → stop. Pick one feature: better filters, student-friendly access notes, resource cards, a campus tour, or video content. The website itself uses deterministic JavaScript; it does not call an LLM.

## Publish on GitHub Pages

1. Sign into GitHub. Create a repository such as `ai101-campus-explorer`. Public repositories can use GitHub Pages on GitHub Free; other visibility/account combinations depend on your plan.
2. Upload **the contents of `website/`**, with index.html at the repository root. Include assets, models, `.nojekyll`, and the project instruction files. A Git client includes dotfolders that a simple file picker can miss.
3. Optional command-line path from inside `website/`:
   `git init`, `git add .`, `git commit -m "Create campus explorer"`, `git branch -M main`, then add the exact remote URL GitHub gives you and `git push -u origin main`. Run these separately; never paste credentials into code.
4. Go to repository **Settings → Pages**. Set **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)**, then Save.
5. Wait for GitHub’s deployment and use the exact website URL shown in Pages settings.
6. Add that origin to your Cesium token’s Allowed URLs. Keep the app’s normal referrer policy; origin-level restrictions work with it. Restrict assets too.
7. Check images, video, search, five resources, token/photorealistic access, and GLB placement. Test on a phone and with keyboard navigation.
8. Submit the repository URL and Pages URL. Fork/clone is available after the instructor uploads this starter to a GitHub repository; no GitHub repository has been created automatically by downloading the ZIP.

## Canvas

Host the full app on GitHub Pages or another static host, then add its URL to Canvas as an External URL, or link from a page. Keep “open in a new tab” available. Canvas’s content editor strips scripts and cannot run this app by pasting index.html. An iframe may work if school and host policies allow it; it needs enough height and can be blocked. `canvas-lab.html` is a separate script-free fragment for the Canvas HTML editor. Replace its link placeholder with your published Pages URL.

## Test

Run `node test-core.js`. This covers malformed YouTube URLs, unsafe source URL schemes, missing/nonfinite/out-of-range coordinates, malformed resource imports, duplicate handling, five distinct resources, and filtering. It requires no API account.

Manual checks: add/edit/remove a resource; export/import; add/remove a YouTube slide; empty search; keyboard dialogs; desktop/phone layout; GLB upload; map error fallback; real token + photorealistic tiles on a WebGL-enabled device. Do not report unrun checks as passed.

## Files

- `index.html`, `style.css`: layout and responsive design.
- `app.js`: carousel, forms, local storage, export/import, studio.
- `map.js`: Cesium loader, map modes, pins, model placement.
- `core.js`, `test-core.js`: data validation and tests.
- `data.js`: sourced campus/partner records.
- `config.js`: your token, videos, published resource records, and model paths.
- `assets/`, `models/`: local images, provenance, GLB.
- `tools/make-concept-model.py`: optional Python script that rebuilds the example GLB from simple shapes.
- `examples/legacy-loop/`: prior fictional rule-based loop lesson, retained separately. It is not loaded by this website.

## Image and data credits

Campus photographs, university video, and logos remain Alvernia University materials, used in this course prototype with source attribution. They are not relicensed as open-source assets; use school-approved media when publishing your own adaptation. Generated concept image and example model are separately labeled. External dependencies: CesiumJS 1.146, model-viewer 4.4.0, Google Fonts, OpenStreetMap, and optional Google Photorealistic 3D Tiles/YouTube. Network access is needed for those services. See SOURCES.md.
