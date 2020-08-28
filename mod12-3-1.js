function listKeysOwnProps(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key} : ${obj[key]}`);
        }
        else {
            console.log(key);
        }
    }
}


const objPrototype = {
    a: 1, b: 2, c: 11
}

const objInstance = Object.create(objPrototype);

objInstance.d = 5;
objInstance.e = 8;

listKeysOwnProps(objInstance);

