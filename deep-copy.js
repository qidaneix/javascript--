function deepCopy(item) {
  if (item === null) return item;
  if (typeof item !== "object") return item;

  let newItem;
  if (Array.isArray(item)) {
    newItem = item.map((i) => deepCopy(i));
  } else {
    newItem = {};
    Object.keys(item).forEach((key) => {
      newItem[key] = deepCopy(item[key]);
    });
  }

  return newItem;
}

let testA = ["1", true, 222, 232n, [1, "2", { a: "b" }], { c: "d" }];
let testB = { a: "a", b: 2, c: testA, d: { e: [1, 2, 3], f: { g: true } } };
let testC = true;
let testD = 123;
let testE = "xyz";
let testF = undefined;
let testG = null;

console.log(deepCopy(testA));
console.log(deepCopy(testB));
console.log(deepCopy(testC));
console.log(deepCopy(testD));
console.log(deepCopy(testE));
console.log(deepCopy(testF));
console.log(deepCopy(testG));
