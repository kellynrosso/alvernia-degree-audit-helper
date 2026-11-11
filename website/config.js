// STUDENTS: this is the only file needed to configure the map and hero videos.
// Prefer "Connect Cesium" on the website while developing. It keeps the token
// in this browser tab's session and does not put it in an exported project.
// For a published class site, a public-scope, URL-restricted token can go here.
// Browser tokens are visible. NEVER use private/admin/write-scope tokens.
window.CAMPUS_CONFIG = {
  cesiumIonToken: "", // <-- PASTE YOUR RESTRICTED CESIUM ION TOKEN HERE (optional).
  cesiumVersion: "1.146",
  heroVideos: [
    // Add a YouTube link here, or use "Add a video" on the website:
    // { title: "My campus story", youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID" }
  ],
  studentResources: [], // Paste exported resources here to publish them for everyone.
  aiCenter: {
    modelUrl: "models/ai-center-concept.glb",
    imageUrl: "assets/ai-center-concept.png",
    latitude: 40.3121, longitude: -75.9346, heading: 25, scale: 1, height: 0
  }
};
