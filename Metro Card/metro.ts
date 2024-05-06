let UserIdAutoIncrement = 1000;
let TravelIDAutoIncrement = 2000;
let TicketIDAutoIncrement = 3000;

let NewuserMailStatus = false;
let NewPasswordStatus = false;
let NewUserPhoneNumberStatus = false;

let cardnumber: string;

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

let editingId: string | null = null;
let flocation = (document.getElementById('flocation')) as HTMLInputElement;
let tlocation = (document.getElementById('tlocation')) as HTMLInputElement;
let price = (document.getElementById('price')) as HTMLInputElement;

class User {
    UserId: string;
    userName: string;
    userMail: string;
    Password: string;
    UserPhoneNumber: number;
    balance: number;

    constructor(paramuserMail: string, paramuserName: string, paramPassword: string, paramUserPhoneNumber: number, balance: number) {

        UserIdAutoIncrement++;

        this.UserId = "CMRL" + UserIdAutoIncrement.toString();
        this.userName = paramuserName;
        this.userMail = paramuserMail;
        this.Password = paramPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.balance = balance;

    }
}

class TravelDetails {

    TravelID: string;
    CardNumber: string;
    FromLocation: string;
    ToLocation: string;
    TravelDate: Date;
    Cost: number;

    constructor(cardnumber: string, fromLocation: string, toLocation: string, travelDate: Date, cost: number) {

        TravelIDAutoIncrement++;

        this.TravelID = "UI" + TravelIDAutoIncrement.toString();
        this.CardNumber = cardnumber;
        this.FromLocation = fromLocation;
        this.ToLocation = toLocation;
        this.TravelDate = travelDate;
        this.Cost = cost;


    }
}

class TicketDetails {
    TicketID: string;
    FromLocation: string;
    ToLocation: string;
    TicketPrice: number;
    constructor(fromlocation: string, toLocation: string, ticketprice: number) {

        TicketIDAutoIncrement++;
        this.TicketID = "MR" + TicketIDAutoIncrement.toString();
        this.FromLocation = fromlocation;
        this.ToLocation = toLocation;
        this.TicketPrice = ticketprice;
    }
}

let UserArrayList: Array<User> = new Array<User>();
UserArrayList.push(new User("manju@gmail.com", "manju", "123@123", 8908907, 0));

let TravelList: Array<TravelDetails> = new Array<TravelDetails>();
TravelList.push(new TravelDetails("CMRL1001", "Airport", "Egmore", new Date(2023, 10, 10), 55));
TravelList.push(new TravelDetails("CMRL1001", "Egmore", "Airport", new Date(2023, 10, 10), 32));
TravelList.push(new TravelDetails("CMRL1002", "Alandur", "Koyambedu", new Date(2023, 11, 10), 25));
TravelList.push(new TravelDetails("CMRL1002", "Egmore", "Thirumangalam", new Date(2023, 11, 10), 25));

let TicketList: Array<TicketDetails> = new Array<TicketDetails>();
TicketList.push(new TicketDetails("Airport", "Egmore", 55));
TicketList.push(new TicketDetails("Airport", "Koyambedu", 25));
TicketList.push(new TicketDetails("Alandur", "Koyambedu", 25));
TicketList.push(new TicketDetails("Koyambedu", "Egmore", 32));
TicketList.push(new TicketDetails("Vadapalani", "Egmore", 45));
TicketList.push(new TicketDetails("Arumbakkam", "Egmore", 25));
TicketList.push(new TicketDetails("Vadapalani", "Koyambedu", 25));
TicketList.push(new TicketDetails("Arumbakkam", "Koyambedu", 16));


function singin() {
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "none";
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    existingUserPage.style.display = "block";

    let homePage = document.getElementById('homePage') as HTMLDivElement;

    let availableUser = document.getElementById('availableUser') as HTMLLabelElement;

    homePage.style.display = "block";


    availableUser.innerHTML = "<h2>Available User</h2>";


    for (let i = 0; i < UserArrayList.length; i++) {

        availableUser.innerHTML += `User Name : ${UserArrayList[i].userMail} | User Id : ${UserArrayList[i].UserId}<br>`;
    }

    let noExistingUserIdChecker: boolean = false;
    let existingUsermail = (document.getElementById('existingUserId') as HTMLInputElement).value;
    let epass = (document.getElementById('userpassword') as HTMLInputElement).value;

    let existingUserIdRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (true/*existingUserIdRegex.test(existingUsermail)*/) {

        for (let i = 0; i < UserArrayList.length; i++) {
            if (true/*UserArrayList[i].userMail == existingUsermail && UserArrayList[i].Password==epass*/) {
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
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    existingUserPage.style.display = "none";
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "block";

    if (NewuserMailStatus == true &&
        NewPasswordStatus == true &&
        NewUserPhoneNumberStatus == true) {

        let userMail = (document.getElementById('newUserMail') as HTMLInputElement).value;
        let Password = (document.getElementById('newUserPassword') as HTMLInputElement).value;
        let PhoneNumber = (document.getElementById('newUserPhoneNumber') as HTMLInputElement).value;
        let userName = (document.getElementById('userName') as HTMLInputElement).value;
        UserArrayList.push(new User(userMail, userName, Password, +PhoneNumber, 0));
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


function Ticketdetails() {
    let Ticketadd = (document.getElementById('Ticketadd')) as HTMLButtonElement;
    Ticketadd.style.display = 'block';
    let TicketDetail = (document.getElementById('TicketDetail')) as HTMLTableElement;
    TicketDetail.style.display = "block";
    const tableBody = document.querySelector("#TicketDetail tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    TicketList.forEach((item) => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.FromLocation}</td>
            <td>${item.ToLocation}</td>
            <td>${item.TicketPrice}</td>
            <td>
              <button onclick="edit('${item.TicketID}')">Edit</button>
              <button onclicK="deleting('${item.TicketID}')">Delete</button>
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
function ticketadding() {

    let ticketform = (document.getElementById('ticketform')) as HTMLFormElement;
    if (editingId !== null) {
        const index = TicketList.findIndex((item) => item.TicketID === editingId);
        if (index !== -1) {
            TicketList[index].FromLocation = flocation.value;
            TicketList[index].ToLocation = tlocation.value;
            TicketList[index].TicketPrice = parseInt(price.value);

        }
    } else {
        TicketList.push(new TicketDetails(flocation.value, tlocation.value, parseInt(price.value)));
        alert('Ticket Added Successfully');
        Ticketdetails();
    }

    ticketform.reset();
    editingId = null;
}

const edit = (id: string) => {
    addticket()
    editingId = id;
    const item = TicketList.find((item) => item.TicketID === id);
    if (item) {
        flocation.value = item.FromLocation;
        tlocation.value = item.ToLocation;
        price.value = String(item.TicketPrice);

    }
};

const deleting = (id: string) => {
    TicketList = TicketList.filter((items) => items.TicketID !== id);
    Ticketdetails();

};



function showhistory() {
    let historys = (document.getElementById('history')) as HTMLTableElement;
    historys.style.display = "block";
    const tableBody = document.querySelector("#history tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    TravelList.forEach((item) => {
        if (item.CardNumber == currentUser.UserId) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${item.CardNumber}</td>
            <td>${item.FromLocation}</td>
            <td>${item.ToLocation}</td>
            <td>${item.TravelDate.toLocaleDateString()}</td>
            <td>${item.Cost}</td>
            
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

function topup() {

    let topups = (document.getElementById('topup')) as HTMLLabelElement;
    topups.style.display = "block";
    let currentbalane = (document.getElementById('Currentbalance')) as HTMLLabelElement;
    currentbalane.style.display = "block";

    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == currentUser.UserId) {
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

function recharge() {
    let currentbalane = (document.getElementById('topup')) as HTMLDivElement;
    currentbalane.style.display = "none";
    let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == currentUser.UserId) {
            let ubalance = (document.getElementById('balance')) as HTMLInputElement;
            UserArrayList[i].balance += parseInt(ubalance.value);
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

function showbalance() {
    let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
    rechargedBalance.style.display = "block";
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == currentUser.UserId) {
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

function Travel() {

    let TicketbookingDetail = (document.getElementById('TicketbookingDetail')) as HTMLTableElement;
    TicketbookingDetail.style.display = "block";
    const tableBody = document.querySelector("#TicketbookingDetail tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    TicketList.forEach((item) => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.FromLocation}</td>
            <td>${item.ToLocation}</td>
            <td>${item.TicketPrice}</td>
            <td>
              <button onclick="Buy('${item.TicketID}')">BOOK</button>
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

function Buy(id: string) {
    for (let i = 0; i < TicketList.length; i++) {
        if (TicketList[i].TicketID == id) {
            if (currentUser.balance >= TicketList[i].TicketPrice) {
                currentUser.balance -= TicketList[i].TicketPrice;
                TravelList.push(new TravelDetails(currentUser.UserId, TicketList[i].FromLocation, TicketList[i].ToLocation, new Date, TicketList[i].TicketPrice))
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

