//basic types
let id: number = 5;
let company: string ="Syncfusion"
let isCompanyopen: boolean= true;
let x:any;

x=5;
x='manju';

let ids: number[] = [1,2,3,4,5,6];
ids.push(3);

let x1 :any[]=[1,'d',true]

//tuple
let employee: [number, string, boolean]= [1, 'manju' , true] 

//Tuple array
let employees:[number, string, boolean][] = [
    [1, 'manju' , true] ,
    [2, 'priya' ,  false] ,
    [3, 'manjula' , true] 
]

//union
//assigning more than one data type like employeee id is combination of string and number
let eid: string | number;
eid = 'EID5';

//enum
//number conccept
enum direction1 {
    up =5,
    down,
    left,
    right
}
console.log(direction1.left)

enum direction2 {
    up ="up",
    down = "down",
    left ="left",
    right = "right"
}
console.log(direction2.left)

//object

type userType = {
    id:number,
    name:string
}

let user : userType = {
    id: 1,
    name:'Iyyappan'

}

//type assert
//assigning one variable to another variable with the different datatype
//ther is two way
let x3 : any ='5'
//let compId = x3 as number;//first way
let compId=<number>x3;//second way

//functions

function doMath(a:number,b: number): number{
  return a+b
}

console.log(doMath(1,2))

//some function return nothing

function logme(x: string): void{
    console.log(x)
}

logme('hi')

function myfunction(x: string | number): void{

    if(typeof x==='number') console.log('Hi Number')
    if(typeof x==='string') console.log('Hi String')


}

myfunction('hi hello');

//interface

interface userType1  {
    readonly id:number,// we cannot modify that property if we use readonly
    name:string
    age?: number//optional parameter we dont need to initialize
}

let user1 : userType1 = {
    id: 1,
    name:'Iyyappan'

}

//user1.id = 5
 interface MathFunc{
    (x:number,y:number):number
 }

 const add : MathFunc=(x: number, y:number) =>x+y
 const sub : MathFunc=(x: number, y:number) =>x-y

//class
interface PersonType  {
    id:number,
    name:string
    register(): string
}

class Person implements PersonType{
    id: number
    name: string
    constructor(id:number, name:string){
        this.id =id
        this.name=name
    }
    register() {
        return `${this.name} is registered now`
    }
}

const iyy =new Person(2, 'manju')

console.log(iyy)
//console.log(iyy.id)

//data modifiers private public

console.log(iyy.register())

//child class
class Employee extends Person{
    position : string

    constructor(id:number, name:string,position:string){
        super(id,name)
        this.position= position
    }
}

const emp1 = new Employee(5,'ramesh','developer')
console.log(emp1.name)

//Generics
function getArrays<T>(items: T[]):T[]{
    return new Array().concat(items);
}

let numArray = getArrays<number>([1,2,3,4,5])
let strArray = getArrays<string>(['a','b'])

numArray.push(1)
strArray.push('sdff')