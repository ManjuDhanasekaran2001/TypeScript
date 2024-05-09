// let UserIdAutoIncrement = 1000;
// let TravelIDAutoIncrement = 2000;
// let TicketIDAutoIncrement = 3000;

let NewuserMailStatus = false;
let NewPasswordStatus = false;
let NewUserPhoneNumberStatus = false;

let cardnumber: number;

//pages
let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
let homePage = document.getElementById('homePage') as HTMLDivElement;
let Ticketadd = (document.getElementById('Ticketadd')) as HTMLButtonElement;
let TicketDetail = (document.getElementById('TicketDetail')) as HTMLTableElement;
let ticketform = (document.getElementById('ticketform')) as HTMLFormElement;
let historys = (document.getElementById('history')) as HTMLTableElement;
let TicketbookingDetail = (document.getElementById('TicketbookingDetail')) as HTMLTableElement;
let topups = (document.getElementById('topup')) as HTMLLabelElement;
let currentbalane = (document.getElementById('topup')) as HTMLDivElement;
let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
let page = (document.getElementById('page')) as HTMLDivElement;

let currentUser: User;

let editingId: number | null = null;
let flocation = (document.getElementById('flocation')) as HTMLInputElement;
let tlocation = (document.getElementById('tlocation')) as HTMLInputElement;
let price = (document.getElementById('price')) as HTMLInputElement;

interface User {
    userID: number;
    userName: string;
    userMail: string;
    passWord: string;
    userPhoneNumber: string;
    balance: number;

    // constructor(paramuserMail: string, paramuserName: string, paramPassword: string, paramUserPhoneNumber: number, balance: number) {

    //     UserIdAutoIncrement++;

    //     this.UserId = "CMRL" + UserIdAutoIncrement.toString();
    //     this.userName = paramuserName;
    //     this.userMail = paramuserMail;
    //     this.Password = paramPassword;
    //     this.UserPhoneNumber = paramUserPhoneNumber;
    //     this.balance = balance;

    // }
}

interface TravelDetails {

    travelID: number;
    cardNumber: number;
    fromLocation: string;
    toLocation: string;
    travelDate: Date;
    cost: number;

    // constructor(cardnumber: string, fromLocation: string, toLocation: string, travelDate: Date, cost: number) {

    //     TravelIDAutoIncrement++;

    //     this.TravelID = "UI" + TravelIDAutoIncrement.toString();
    //     this.CardNumber = cardnumber;
    //     this.FromLocation = fromLocation;
    //     this.ToLocation = toLocation;
    //     this.TravelDate = travelDate;
    //     this.Cost = cost;


    // }
}

interface TicketDetails {
    ticketID: number;
    fromLocation: string;
    toLocation: string;
    ticketPrice: number;
    // constructor(fromlocation: string, toLocation: string, ticketprice: number) {

    //     TicketIDAutoIncrement++;
    //     this.TicketID = "MR" + TicketIDAutoIncrement.toString();
    //     this.FromLocation = fromlocation;
    //     this.ToLocation = toLocation;
    //     this.TicketPrice = ticketprice;
    // }
}

// let UserArrayList: Array<User> = new Array<User>();
// UserArrayList.push(new User("manju@gmail.com", "manju", "123@123", 8908907, 0));

// let TravelList: Array<TravelDetails> = new Array<TravelDetails>();
// TravelList.push(new TravelDetails("CMRL1001", "Airport", "Egmore", new Date(2023, 10, 10), 55));
// TravelList.push(new TravelDetails("CMRL1001", "Egmore", "Airport", new Date(2023, 10, 10), 32));
// TravelList.push(new TravelDetails("CMRL1002", "Alandur", "Koyambedu", new Date(2023, 11, 10), 25));
// TravelList.push(new TravelDetails("CMRL1002", "Egmore", "Thirumangalam", new Date(2023, 11, 10), 25));

// let TicketList: Array<TicketDetails> = new Array<TicketDetails>();
// TicketList.push(new TicketDetails("Airport", "Egmore", 55));
// TicketList.push(new TicketDetails("Airport", "Koyambedu", 25));
// TicketList.push(new TicketDetails("Alandur", "Koyambedu", 25));
// TicketList.push(new TicketDetails("Koyambedu", "Egmore", 32));
// TicketList.push(new TicketDetails("Vadapalani", "Egmore", 45));
// TicketList.push(new TicketDetails("Arumbakkam", "Egmore", 25));
// TicketList.push(new TicketDetails("Vadapalani", "Koyambedu", 25));
// TicketList.push(new TicketDetails("Arumbakkam", "Koyambedu", 16));

function sign() {
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    existingUserPage.style.display = "none";
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "block";

}

async function signn() {
    const UserArrayList = await fetchUser();
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "none";
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    existingUserPage.style.display = "block";

    let homePage = document.getElementById('homePage') as HTMLDivElement;

    let availableUser = document.getElementById('availableUser') as HTMLLabelElement;

    homePage.style.display = "block";


    availableUser.innerHTML = "<h2>Available User</h2>";


    for (let i = 0; i < UserArrayList.length; i++) {

        availableUser.innerHTML += `User Name : ${UserArrayList[i].userMail} | User Id : ${UserArrayList[i].userID}<br>`;
    }

}


 async function singin() {
    const UserArrayList = await fetchUser();
    

    let noExistingUserIdChecker: boolean = false;
    let existingUsermail = (document.getElementById('existingUserId') as HTMLInputElement).value;
    let epass = (document.getElementById('userpassword') as HTMLInputElement).value;

    let existingUserIdRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (existingUserIdRegex.test(existingUsermail)) {

        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userMail == existingUsermail && UserArrayList[i].passWord==epass) {
                currentUser = UserArrayList[i];
                //CurrentUserId = UserArrayList[i].UserId;

                OperationPage();

                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }

        if (noExistingUserIdChecker) {
            alert("Enter Valid User Password");
        }
    }
    else {
        alert("Enter Valid User mail.");
    }

}


function singup() {
    
    if (NewuserMailStatus == true &&
        NewPasswordStatus == true &&
        NewUserPhoneNumberStatus == true) {

        let UserMail = (document.getElementById('newUserMail') as HTMLInputElement).value;
        let Password = (document.getElementById('newUserPassword') as HTMLInputElement).value;
        let PhoneNumber = (document.getElementById('newUserPhoneNumber') as HTMLInputElement).value;
        let UserName = (document.getElementById('userName') as HTMLInputElement).value;
        //UserArrayList.push(new User(userMail, userName, Password, +PhoneNumber, 0));
        const user: User = {
            userID: 0,
            userName: UserName,
            userMail: UserMail,
            passWord: Password,
            userPhoneNumber: PhoneNumber,
            balance: 0
        }
        addUser(user);
        alert("registered successfully");


    }
    else {
        alert("Please fill out the form fully.")
    }
}

function checkNewUserEmail(paramNewUserMail: string) {
    let newUserMail = (document.getElementById(paramNewUserMail) as HTMLInputElement).value;
    let newUserMailMessage = document.getElementById(paramNewUserMail + "Message") as HTMLLabelElement;
    let newUserNameRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (newUserNameRegex.test(newUserMail)) {

        NewuserMailStatus = true;
        newUserMailMessage.style.visibility = "hidden";
    }
    else {
        NewuserMailStatus = false;
        newUserMailMessage.innerHTML = "Please enter valid mail";
        newUserMailMessage.style.visibility = "visible";
        newUserMailMessage.style.color = "tomato";
        newUserMailMessage.style.marginLeft = "10px";
    }

}

function checkNewUserPassword(paramNewUserPaasword: string) {
    let newUserPassword = (document.getElementById(paramNewUserPaasword) as HTMLInputElement).value;
    let newUserPasswordMessage = document.getElementById(paramNewUserPaasword + "Message") as HTMLLabelElement;
    let newUserPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (newUserPasswordRegex.test(newUserPassword)) {

        NewPasswordStatus = true;
        newUserPasswordMessage.style.visibility = "hidden";
    }
    else {
        NewPasswordStatus = false;
        newUserPasswordMessage.innerHTML = "Please enter valid Password with mimun 8 character";
        newUserPasswordMessage.style.visibility = "visible";
        newUserPasswordMessage.style.color = "tomato";
        newUserPasswordMessage.style.marginLeft = "10px";
    }


}

function checkNewPassword(paramPassword: string) {

    let newUserPassword = (document.getElementById('newUserPassword') as HTMLInputElement).value;
    let newPassword = (document.getElementById(paramPassword) as HTMLInputElement).value;
    let newPasswordMessage = document.getElementById(paramPassword + "Message") as HTMLLabelElement;

    if (newUserPassword != newPassword) {
        NewPasswordStatus = false;
        newPasswordMessage.innerHTML = "Passwor doesnot match";
        newPasswordMessage.style.visibility = "visible";
        newPasswordMessage.style.color = "tomato";
        newPasswordMessage.style.marginLeft = "10px";
    } else {
        NewPasswordStatus = true;
        newPasswordMessage.style.visibility = "hidden";
    }


}

function checkNewUserPhoneNumber(paramNewUserPhoneNumber: string) {
    let newUserPhoneNumber = (document.getElementById(paramNewUserPhoneNumber) as HTMLInputElement).value;
    let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message") as HTMLLabelElement;
    let newUserPhoneNumberRegex = /^\d{10}$/;

    if (newUserPhoneNumberRegex.test(newUserPhoneNumber)) {

        NewUserPhoneNumberStatus = true;
        newUserPhoneNumberMessage.style.visibility = "hidden";
    }
    else {
        NewUserPhoneNumberStatus = false;
        newUserPhoneNumberMessage.innerHTML = "Please enter valid phone number";
        newUserPhoneNumberMessage.style.visibility = "visible";
        newUserPhoneNumberMessage.style.color = "tomato";
        newUserPhoneNumberMessage.style.marginLeft = "10px";
    }

}


 async function Ticketdetails() {
    const TicketList = await fetchTickets();
    let Ticketadd = (document.getElementById('Ticketadd')) as HTMLButtonElement;
    Ticketadd.style.display = 'block';
    let TicketDetail = (document.getElementById('TicketDetail')) as HTMLTableElement;
    TicketDetail.style.display = "block";
    const tableBody = document.querySelector("#TicketDetail tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    TicketList.forEach((item) => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.fromLocation}</td>
            <td>${item.toLocation}</td>
            <td>${item.ticketPrice}</td>
            <td>
              <button onclick="edit('${item.ticketID}')">Edit</button>
              <button onclicK="deleting('${item.ticketID}')">Delete</button>
            </td>
            
            
          `;
        tableBody.appendChild(row);

    });

    existingUserPage.style.display = "none";
    newUserPage.style.display = "none";
    //Ticketadd.style.display="none";
    //TicketDetail.style.display="none";
    ticketform.style.display = "none";
    historys.style.display = "none";
    TicketbookingDetail.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    page.style.display = "none";
}
function OperationPage() {
    let homePage = document.getElementById('homePage') as HTMLDivElement;
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    homePage.style.display = "none";
    existingUserPage.style.display = "none";
    let OperationPage = document.getElementById('Operationpage') as HTMLDivElement;
    OperationPage.style.display = "block";
    page.style.display = "block";

}

function addticket() {
    let ticketform = (document.getElementById('ticketform')) as HTMLFormElement;
    ticketform.style.display = "block";
    let Ticketadd = (document.getElementById('Ticketadd')) as HTMLButtonElement;
    Ticketadd.style.display = 'none';
    let TicketDetail = (document.getElementById('TicketDetail')) as HTMLTableElement;
    TicketDetail.style.display = "none";



}
async function ticketadding() {

    const TicketList = await fetchTickets();
    //let ticketform = (document.getElementById('ticketform')) as HTMLFormElement;
    if (editingId !== null) {
        const index = TicketList.findIndex((item) => item.ticketID === editingId);
        
            // TicketList[index].fromLocation = flocation.value;
            // TicketList[index].toLocation = tlocation.value;
            // TicketList[index].ticketPrice = parseInt(price.value);

            const ticket: TicketDetails = {
                ticketID: editingId,
                fromLocation: flocation.value,
                toLocation: tlocation.value,
                ticketPrice: Number(price.value)
            }

            updateTicket(editingId, ticket);

        
    } else {
        //TicketList.push(new TicketDetails(flocation.value, tlocation.value, parseInt(price.value)));
        const ticket : TicketDetails={
            ticketID:0,
            fromLocation:flocation.value,
            toLocation:tlocation.value,
            ticketPrice:Number(price.value)
        }
        addTicketDetails(ticket);

        alert('Ticket Added Successfully');
        Ticketdetails();
    }

    ticketform.reset();
    editingId = null;
}
async function edit(id: number){
    
    editingId = id;

    const TicketList = await fetchTickets();
    const item = TicketList.find((item) => item.ticketID === Number(id));
    if (item) {
        addticket();
        flocation.value = item.fromLocation;
        tlocation.value = item.toLocation;
        price.value = String(item.ticketPrice);

    }
}

 function deleting(id:number){
    deleteTicket(id);
    //TicketList = TicketList.filter((items) => items.TicketID !== id);
    Ticketdetails();

}



async function showhistory() {
    const TravelList = await fetchTraveldetails();
    let historys = (document.getElementById('history')) as HTMLTableElement;
    historys.style.display = "block";
    const tableBody = document.querySelector("#history tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    TravelList.forEach((item) => {
        if (item.cardNumber == currentUser.userID) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${item.cardNumber}</td>
            <td>${item.fromLocation}</td>
            <td>${item.toLocation}</td>
            <td>${item.travelDate.toString().split('T')[0].split('-').reverse().join('/')}</td>
            <td>${item.cost}</td>
            
          `;
            tableBody.appendChild(row);
        }
    });

    existingUserPage.style.display = "none";
    newUserPage.style.display = "none";
    Ticketadd.style.display = "none";
    TicketDetail.style.display = "none";
    ticketform.style.display = "none";
    //historys.style.display="none";
    TicketbookingDetail.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    page.style.display = "none";
}

async function topup() {
    const UserArrayList = await fetchUser();

    let topups = (document.getElementById('topup')) as HTMLLabelElement;
    topups.style.display = "block";
    let currentbalane = (document.getElementById('Currentbalance')) as HTMLLabelElement;
    currentbalane.style.display = "block";

    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].userID == currentUser.userID) {
            currentbalane.innerHTML = `Current balance ${UserArrayList[i].balance.toString()}`;

        }
    }

    existingUserPage.style.display = "none";
    newUserPage.style.display = "none";
    Ticketadd.style.display = "none";
    TicketDetail.style.display = "none";
    ticketform.style.display = "none";
    historys.style.display = "none";
    TicketbookingDetail.style.display = "none";
    //topups.style.display="none";
    //currentbalane.style.display="none";
    //rechargedBalance.style.display="none";
    page.style.display = "none";
}

async function recharge() {
    const UserArrayList = await fetchUser();
    let currentbalane = (document.getElementById('topup')) as HTMLDivElement;
    currentbalane.style.display = "none";
    let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].userID == currentUser.userID) {
            let ubalance = (document.getElementById('balance')) as HTMLInputElement;
            UserArrayList[i].balance += Number(ubalance.value);
            const users :User = {

                userID:currentUser.userID,
                userName:UserArrayList[i].userName,
                userMail:UserArrayList[i].userMail,
                passWord:UserArrayList[i].passWord,
                balance:UserArrayList[i].balance,
                userPhoneNumber:UserArrayList[i].userPhoneNumber

            }

            updateUser(currentUser.userID,users);
            rechargedBalance.innerHTML = `Current balance ${UserArrayList[i].balance.toString()}`;


        }
    }
    existingUserPage.style.display = "none";
    newUserPage.style.display = "none";
    Ticketadd.style.display = "none";
    TicketDetail.style.display = "none";
    ticketform.style.display = "none";
    historys.style.display = "none";
    TicketbookingDetail.style.display = "none";
    topups.style.display = "none";
    //currentbalane.style.display="none";
    //rechargedBalance.style.display="none";
    page.style.display = "none";
}

async function showbalance() {
    const UserArrayList=await fetchUser();
    let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
    rechargedBalance.style.display = "block";
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].userID == currentUser.userID) {
            rechargedBalance.innerHTML = `Available balance ${UserArrayList[i].balance.toString()}`;

        }
    }

    existingUserPage.style.display = "none";
    newUserPage.style.display = "none";
    Ticketadd.style.display = "none";
    TicketDetail.style.display = "none";
    ticketform.style.display = "none";
    historys.style.display = "none";
    TicketbookingDetail.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    //rechargedBalance.style.display="none";
    page.style.display = "none";
}

async function Travel() {
    const TicketList = await fetchTickets();
    let TicketbookingDetail = (document.getElementById('TicketbookingDetail')) as HTMLTableElement;
    TicketbookingDetail.style.display = "block";
    const tableBody = document.querySelector("#TicketbookingDetail tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    TicketList.forEach((item) => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.fromLocation}</td>
            <td>${item.toLocation}</td>
            <td>${item.ticketPrice}</td>
            <td>
              <button onclick="Buy('${item.ticketID}')">BOOK</button>
            </td>
            
            
          `;
        tableBody.appendChild(row);

    });

    existingUserPage.style.display = "none";
    newUserPage.style.display = "none";
    Ticketadd.style.display = "none";
    TicketDetail.style.display = "none";
    ticketform.style.display = "none";
    historys.style.display = "none";
    //TicketbookingDetail.style.display="none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    page.style.display = "none";
}

async function Buy(id: number) {
    let tbalance : number;
    const UserArrayList= await fetchUser();
    for (let i = 0; i < UserArrayList.length; i++)
        {
        if (UserArrayList[i].userID == currentUser.userID){
            const users :User = {

                userID:currentUser.userID,
                userName:UserArrayList[i].userName,
                userMail:UserArrayList[i].userMail,
                passWord:UserArrayList[i].passWord,
                balance:UserArrayList[i].balance,
                userPhoneNumber:UserArrayList[i].userPhoneNumber

            }
            tbalance=UserArrayList[i].balance;
            currentUser.balance=tbalance;

            updateUser(currentUser.userID,users);
        }

    }
    const TicketList = await fetchTickets();
    const TravelList = await fetchTraveldetails();
    for (let i = 0; i < TicketList.length; i++) {
        if (TicketList[i].ticketID == id) {
            if (currentUser.balance >= TicketList[i].ticketPrice) {
                currentUser.balance -= TicketList[i].ticketPrice;
                //TravelList.push(new TravelDetails(currentUser.UserId, TicketList[i].FromLocation, TicketList[i].ToLocation, new Date, TicketList[i].TicketPrice))
            const user:User={
                userID:currentUser.userID,
                userMail:currentUser.userMail,
                userName:currentUser.userName,
                userPhoneNumber:currentUser.userPhoneNumber,
                balance:currentUser.balance,
                passWord:currentUser.passWord
            }

            updateUser(currentUser.userID,user);
            
            const travel : TravelDetails={
                travelID:0,
                cardNumber:currentUser.userID,
                fromLocation:TicketList[i].fromLocation,
                toLocation:TicketList[i].toLocation,
                cost:TicketList[i].ticketPrice,
                travelDate:new Date()
                

            }

            addTravelDetails(travel);
            
            }

            else {
                alert("your balance is low. Please Top up");
            }
        }

    }
}

function displayHomePage() {
    let page = (document.getElementById('page')) as HTMLDivElement;
    page.style.display = "block";
    newUserPage.style.display = "none";
    Ticketadd.style.display = "none";
    TicketDetail.style.display = "none";
    ticketform.style.display = "none";
    historys.style.display = "none";
    TicketbookingDetail.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
}

async function addUser(user: User): Promise<void> {

    const response = await fetch('http://localhost:5044/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Faild to add User');
    }
    signn();

}

async function addTicketDetails(ticketdetails: TicketDetails): Promise<void> {

    const response = await fetch('http://localhost:5044/api/ticketdetails', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketdetails)

    });

    if (!response.ok) {
        throw new Error('Faild to add tickets');
    }
    Ticketdetails();
}

async function addTravelDetails(travedetails: TravelDetails): Promise<void> {

    const response = await fetch('http://localhost:5044/api/traveldetails', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travedetails)

    });

    if (!response.ok) {
        throw new Error('Faild to add travel');
    }
    showhistory();
}

async function updateUser(id: number, user: User): Promise<void> {

    const response = await fetch(`http://localhost:5044/api/user/${id}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    });

    if (!response.ok) {
        throw new Error('Faild to update user');
    }
   

}

async function updateTicket(id: number, ticket: TicketDetails): Promise<void> {

    const response = await fetch(`http://localhost:5044/api/ticketdetails/${id}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)

    });

    if (!response.ok) {
        throw new Error('Faild to update ticket');
    }   
   Ticketdetails();
}

async function deleteTicket(id: number): Promise<void> {
    const response = await fetch(`http://localhost:5044/api/ticketdetails/${id}`, {

        method: 'DELETE',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(medicineinfo)

    });

    if (!response.ok) {
        throw new Error('Faild to Delete ticket');
    }

}

async function fetchUser(): Promise<User[]> {

    const apiUrl = 'http://localhost:5044/api/user';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failled to fetch user');

    }

    return await response.json();

}

async function fetchTickets(): Promise<TicketDetails[]> {

    const apiUrl = 'http://localhost:5044/api/ticketdetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failled to fetch tickets');

    }

    return await response.json();

}

async function fetchTraveldetails(): Promise<TravelDetails[]> {

    const apiUrl = 'http://localhost:5044/api/traveldetails';
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failled to fetch travels');

    }

    return await response.json();

}


