const functions = require('firebase-functions');
const decklistApp = require('./decklist');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const runtimeOpts = {
    timeoutSeconds: 120,
    memory: '512MB'
};


exports.decklist = functions
    .region('europe-west2')
    .runWith(runtimeOpts)
    .https.onRequest(decklistApp);
