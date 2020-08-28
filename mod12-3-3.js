function createObjNull() {
    const emptyObj = Object.create(null);
    return emptyObj;
}

console.log(createObjNull());
console.log(Object.getPrototypeOf(createObjNull()) === null);