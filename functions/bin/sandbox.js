const redis = require('redis');
const { promisify } = require('util');
const { performance } = require('perf_hooks');
const client = redis.createClient({
    port: 13467,
    host: 'redis-13467.c124.us-central1-1.gce.cloud.redislabs.com',
    password: 'project-manabase-redis',
});

const getAsync = promisify(client.get).bind(client);
const getAllAsync = promisify(client.mget).bind(client);
const setAsync = promisify(client.set).bind(client);

(async () => {
    try {
        const keys = `Bomat Courier
Jace, Vryn's Prodigy
Scrapheap Scrounger
Robber of the Rich
Rielle, the Everwise
Goblin Rabblemaster
Thief of Sanity
Zealous Conscripts
The Scarab God
Consecrated Sphinx
Scalding Tarn
Watery Grave
Wooded Foothills
Blood Crypt
Arid Mesa
Steam Vents
Badlands
Ketria Triome
Island
Swamp
Mountain
Talisman of Creativity
Izzet Signet
Chart a Course
Demonic Tutor
Night's Whisper
Izzet Charm
Thought Erasure
Chandra, Acolyte of Flame
Dack Fayden
Compulsive Research
Disallow
Neutralize
Chandra, Torch of Defiance`.split('\n');
        console.log(keys);
        const t0 = performance.now();
        const test = await Promise.all(keys.map(key => getAsync(key)));
        const t1 = performance.now();
        const val = await getAllAsync(keys);
        const t2 = performance.now();
        console.log(val.map(val => JSON.parse(val).data[0].name));
        console.log(`promise.all : ${t1 - t0} ms`);
        console.log(`mget : ${t2 - t1} ms`);
        client.quit();
        console.log('done !');
    }
    catch(e) {
        console.error(e);
        client.quit();
    }
})();



