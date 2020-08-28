function hasKey(str, obj) {
    for (let key in obj) {
        if (key === str) {
            return true;
        }
    }
    return false;
}

const obj1 = {a: 1, b: 2, 1: 25};
const testString = "1";

console.log(hasKey(testString, obj1));