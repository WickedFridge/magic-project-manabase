function getDeepValue(obj) {
    while (typeof obj === 'object') {
        const keys = Object.keys(obj);
        if (keys.length === 1) {
            const [key] = keys;
            obj = obj[key];
        } else {
            return null;
        }
    }
    return obj;
}


module.exports = {
    getDeepValue,
};
