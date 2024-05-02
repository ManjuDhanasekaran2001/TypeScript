"use strict";
let id = 5;
let company = "Syncfusion";
let isCompanyopen = true;
let x;
x = 5;
x = 'manju';
let ids = [1, 2, 3, 4, 5, 6];
ids.push(3);
let x1 = [1, 'd', true];
let employee = [1, 'manju', true];
let employees = [
    [1, 'manju', true],
    [2, 'priya', false],
    [3, 'manjula', true]
];
let eid;
eid = 'EID5';
var direction1;
(function (direction1) {
    direction1[direction1["up"] = 5] = "up";
    direction1[direction1["down"] = 6] = "down";
    direction1[direction1["left"] = 7] = "left";
    direction1[direction1["right"] = 8] = "right";
})(direction1 || (direction1 = {}));
console.log(direction1.left);
var direction2;
(function (direction2) {
    direction2["up"] = "up";
    direction2["down"] = "down";
    direction2["left"] = "left";
    direction2["right"] = "right";
})(direction2 || (direction2 = {}));
console.log(direction2.left);
let user = {
    id: 1,
    name: 'Iyyappan'
};
let x3 = '5';
let compId = x3;
function doMath(a, b) {
    return a + b;
}
console.log(doMath(1, 2));
function logme(x) {
    console.log(x);
}
logme('hi');
function myfunction(x) {
    if (typeof x === 'number')
        console.log('Hi Number');
    if (typeof x === 'string')
        console.log('Hi String');
}
myfunction('hi hello');
let user1 = {
    id: 1,
    name: 'Iyyappan'
};
const add = (x, y) => x + y;
const sub = (x, y) => x - y;
class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    register() {
        return `${this.name} is registered now`;
    }
}
const iyy = new Person(2, 'manju');
console.log(iyy);
console.log(iyy.register());
class Employee extends Person {
    constructor(id, name, position) {
        super(id, name);
        this.position = position;
    }
}
const emp1 = new Employee(5, 'ramesh', 'developer');
console.log(emp1.name);
function getArrays(items) {
    return new Array().concat(items);
}
let numArray = getArrays([1, 2, 3, 4, 5]);
let strArray = getArrays(['a', 'b']);
numArray.push(1);
strArray.push('sdff');
//# sourceMappingURL=index.js.map