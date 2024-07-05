async function async1() {
  console.log("async1 start"); // 1
  await async2();
  console.log("async1 end"); // 4
}
async function async2() {
  console.log("async2"); // 2
}

setTimeout(function () {
  console.log("setTimeout"); // 5

  new Promise(function (resolve) {
    console.log("promise1"); // 6
    resolve();
  }).then(function () {
    console.log("promise2"); // 7
  });
});

setTimeout(function () {
  console.log("setTimeout2"); // 8
});

async1();

console.log("script end"); // 3
