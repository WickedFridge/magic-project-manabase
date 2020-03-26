const { performance } = require('perf_hooks');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { longComputation } = require('./child');

if (cluster.isMaster) {
    masterProcess();
} else {
    childProcess();
}

function masterProcess() {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i}...`);
        cluster.fork();
    }

    process.exit();
}

function childProcess() {
    const t0 = performance.now();
    longComputation();
    const t1 = performance.now();
    console.log(`${t1-t0}ms`);
    process.exit();
}

