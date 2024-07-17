"use strict";

function run() {
  function timeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(this);
        resolve(new Error("new error"));
      }, 0);
    });
  }

  timeout()
    .then(
      (value) => {
        console.log("resolve", value);
        return new Promise((resolve, reject) => {
          reject("reject");
        });
      },
      (error) => {
        console.log("error", error);
        throw new Error("xxx");
      }
    )
    .catch((x) => {
      console.log("x", x);

      return "catch run";
    })
    .then(
      (value) => {
        console.log("resolve 1", value);
      },
      (error) => {
        console.log("error 1", error);
      }
    )
    .finally(() => {
      console.log("finally run");
    });
}

run();
