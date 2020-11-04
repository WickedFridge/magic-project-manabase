const cdf = require( '@stdlib/stats/base/dists/hypergeometric/cdf' );
const pmf = require( '@stdlib/stats/base/dists/hypergeometric/pmf' );

function getLandNOnCurveProba(deckSize = 60, landCount, landNumber) {
    return 1 - cdf(landNumber - 1, deckSize, landCount, 7 + landNumber);
}

function getAverageLandCountInHand(deckSize, landCount) {
    let maxProba = 0;
    let output = 0;
    for (let i=2; i<=7; i++) {
        const proba = pmf(i, deckSize, landCount, 7);
        // console.log(`${i} : ${proba.toFixed(2)}`);
        if (proba > maxProba) {
            output = i;
            maxProba = proba;
        }
    }
    // console.log(output);
    return output;
}

module.exports = {
    getLandNOnCurveProba,
    getAverageLandCountInHand,
};
