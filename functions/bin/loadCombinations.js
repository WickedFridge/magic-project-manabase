const firebase = require('firebase');
const fs = require('fs').promises;
require('firebase/firestore');
const { getAllCombinationsOfMinAndMaxLengthWithCallback } = require('../common/tools/utils');

const obj = { total: 0 };

const callback = obj => comb => {
    console.log(comb);
    obj.total++;
};

const array = Array(20).fill(0).map((e, i) => i);

getAllCombinationsOfMinAndMaxLengthWithCallback(callback(obj), array, 4, 5);

console.log(obj)
// const firebaseConfig = {
//     apiKey: "AIzaSyCl7y8AwR6Dfw0XQTxlMTyXyse6lO70auM",
//     authDomain: "project-manabase.firebaseapp.com",
//     databaseURL: "https://project-manabase.firebaseio.com",
//     projectId: "project-manabase",
//     storageBucket: "project-manabase.appspot.com",
//     messagingSenderId: "1015514217365",
//     appId: "1:1015514217365:web:0231f4feba497a91e2d49c",
//     measurementId: "G-JS0GYSMD81"
// };
//
// firebase.initializeApp(firebaseConfig);
// const database = firebase.firestore();

// async function writeCombinationData(inputs, combination) {
//     const key = inputs.join('|');
//     const value = combination.map(c => JSON.stringify(c));
//     console.log(value);
//     return database.ref(`/${key}`).set(value);
// }

// async function writeCombinationData(inputs, combination) {
//     const [key1, key2] = inputs;
    // const value = combination.map(c => JSON.stringify(c));
    // return database.collection(key2.toString()).add({
    //     id: key1,
    //     value
    // });
    // const value = JSON.stringify({ inputs, combination })
    // return fs.writeFile('file.json', value);
// }

// async function loadCombinations(maxLength, elementCount) {
//     const array = new Array(elementCount).fill(0).map((e, i) => i);
//     const comb = getAllCombinationsOfMaxLength(array, maxLength);
//     return writeCombinationData([maxLength, elementCount], comb);
// }

// loadCombinations(7, 22)
//     .then(m => console.log(m))
//     .catch(e => console.log(e));
//
// database.ref('/2|25')
//     .once('value')
//     .then(snapshot => console.log(JSON.parse(snapshot.val())))
//     .catch(e => console.error(e));
