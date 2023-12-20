async function fnOne() {
    let result;
    for (let i in arguments) {
        result = await arguments[i](result);
        if (result === false) {
            break;
        }
    }
    return result;
}

try {
    module.exports = exports = fnOne;
} catch (e) {}
