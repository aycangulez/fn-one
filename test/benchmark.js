const chain = require('../fn-one');
const Benchmark = require('benchmark');

// Synchronous implementation of fnOne to see the performance effect of awaiting all passed functions
function fnOneSync() {
    let result;
    for (let i in arguments) {
        result = arguments[i](result);
        if (result === false) {
            break;
        }
    }
    return result;
}

var suite = new Benchmark.Suite();

suite
    .add('Sync chain test', function () {
        fnOneSync(
            () => {},
            () => {},
            () => {}
        );
    })
    .add('Async chain test', {
        defer: true,
        async fn(deferred) {
            await chain(
                () => {},
                () => {},
                () => {}
            );
            deferred.resolve();
        },
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
