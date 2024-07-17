console.log("Start"); // 1

setTimeout(() => {
  console.log("Timeout 1"); // 6
}, 0);

setImmediate(() => {
  console.log("Immediate 1"); // 9
});

process.nextTick(() => {
  console.log("Next Tick 1"); // 3
});

Promise.resolve().then(() => {
  console.log("Promise 1"); // 4
});

setTimeout(() => {
  console.log("Timeout 2"); // 7
  process.nextTick(() => {
    console.log("Next Tick 2"); // 8
  });
}, 0);

setImmediate(() => {
  console.log("Immediate 2"); // 10
});

Promise.resolve().then(() => {
  console.log("Promise 2"); // 5
});

console.log("End"); // 2
