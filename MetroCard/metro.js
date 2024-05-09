"use strict";
// let UserIdAutoIncrement = 1000;
// let TravelIDAutoIncrement = 2000;
// let TicketIDAutoIncrement = 3000;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let NewuserMailStatus = false;
let NewPasswordStatus = false;
let NewUserPhoneNumberStatus = false;
let cardnumber;
//pages
let existingUserPage = document.getElementById('existingUserPage');
let newUserPage = document.getElementById('newUserPage');
let homePage = document.getElementById('homePage');
let Ticketadd = (document.getElementById('Ticketadd'));
let TicketDetail = (document.getElementById('TicketDetail'));
let ticketform = (document.getElementById('ticketform'));
let historys = (document.getElementById('history'));
let TicketbookingDetail = (document.getElementById('TicketbookingDetail'));
let topups = (document.getElementById('topup'));
let currentbalane = (document.getElementById('topup'));
let rechargedBalance = (document.getElementById('rechargedBalance'));
let page = (document.getElementById('page'));
let currentUser;
let editingId = null;
let flocation = (document.getElementById('flocation'));
let tlocation = (document.getElementById('tlocation'));
let price = (document.getElementById('price'));
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
    let existingUserPage = document.getElementById('existingUserPage');
    existingUserPage.style.display = "none";
    let newUserPage = document.getElementById('newUserPage');
    newUserPage.style.display = "block";
}
function signn() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUser();
        let newUserPage = document.getElementById('newUserPage');
        newUserPage.style.display = "none";
        let existingUserPage = document.getElementById('existingUserPage');
        existingUserPage.style.display = "block";
        let homePage = document.getElementById('homePage');
        let availableUser = document.getElementById('availableUser');
        homePage.style.display = "block";
        availableUser.innerHTML = "<h2>Available User</h2>";
        for (let i = 0; i < UserArrayList.length; i++) {
            availableUser.innerHTML += `User Name : ${UserArrayList[i].userMail} | User Id : ${UserArrayList[i].userID}<br>`;
        }
    });
}
function singin() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUser();
        let noExistingUserIdChecker = false;
        let existingUsermail = document.getElementById('existingUserId').value;
        let epass = document.getElementById('userpassword').value;
        let existingUserIdRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if (existingUserIdRegex.test(existingUsermail)) {
            for (let i = 0; i < UserArrayList.length; i++) {
                if (UserArrayList[i].userMail == existingUsermail && UserArrayList[i].passWord == epass) {
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
    });
}
function singup() {
    if (NewuserMailStatus == true &&
        NewPasswordStatus == true &&
        NewUserPhoneNumberStatus == true) {
        let UserMail = document.getElementById('newUserMail').value;
        let Password = document.getElementById('newUserPassword').value;
        let PhoneNumber = document.getElementById('newUserPhoneNumber').value;
        let UserName = document.getElementById('userName').value;
        //UserArrayList.push(new User(userMail, userName, Password, +PhoneNumber, 0));
        const user = {
            userID: 0,
            userName: UserName,
            userMail: UserMail,
            passWord: Password,
            userPhoneNumber: PhoneNumber,
            balance: 0
        };
        addUser(user);
        alert("registered successfully");
    }
    else {
        alert("Please fill out the form fully.");
    }
}
function checkNewUserEmail(paramNewUserMail) {
    let newUserMail = document.getElementById(paramNewUserMail).value;
    let newUserMailMessage = document.getElementById(paramNewUserMail + "Message");
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
function checkNewUserPassword(paramNewUserPaasword) {
    let newUserPassword = document.getElementById(paramNewUserPaasword).value;
    let newUserPasswordMessage = document.getElementById(paramNewUserPaasword + "Message");
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
function checkNewPassword(paramPassword) {
    let newUserPassword = document.getElementById('newUserPassword').value;
    let newPassword = document.getElementById(paramPassword).value;
    let newPasswordMessage = document.getElementById(paramPassword + "Message");
    if (newUserPassword != newPassword) {
        NewPasswordStatus = false;
        newPasswordMessage.innerHTML = "Passwor doesnot match";
        newPasswordMessage.style.visibility = "visible";
        newPasswordMessage.style.color = "tomato";
        newPasswordMessage.style.marginLeft = "10px";
    }
    else {
        NewPasswordStatus = true;
        newPasswordMessage.style.visibility = "hidden";
    }
}
function checkNewUserPhoneNumber(paramNewUserPhoneNumber) {
    let newUserPhoneNumber = document.getElementById(paramNewUserPhoneNumber).value;
    let newUserPhoneNumberMessage = document.getElementById(paramNewUserPhoneNumber + "Message");
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
    return __awaiter(this, void 0, void 0, function* () {
        const TicketList = yield fetchTickets();
        let Ticketadd = (document.getElementById('Ticketadd'));
        Ticketadd.style.display = 'block';
        let TicketDetail = (document.getElementById('TicketDetail'));
        TicketDetail.style.display = "block";
        const tableBody = document.querySelector("#TicketDetail tbody");
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
    });
}
function OperationPage() {
    let homePage = document.getElementById('homePage');
    let existingUserPage = document.getElementById('existingUserPage');
    homePage.style.display = "none";
    existingUserPage.style.display = "none";
    let OperationPage = document.getElementById('Operationpage');
    OperationPage.style.display = "block";
    page.style.display = "block";
}
function addticket() {
    let ticketform = (document.getElementById('ticketform'));
    ticketform.style.display = "block";
    let Ticketadd = (document.getElementById('Ticketadd'));
    Ticketadd.style.display = 'none';
    let TicketDetail = (document.getElementById('TicketDetail'));
    TicketDetail.style.display = "none";
}
function ticketadding() {
    return __awaiter(this, void 0, void 0, function* () {
        const TicketList = yield fetchTickets();
        //let ticketform = (document.getElementById('ticketform')) as HTMLFormElement;
        if (editingId !== null) {
            const index = TicketList.findIndex((item) => item.ticketID === editingId);
            // TicketList[index].fromLocation = flocation.value;
            // TicketList[index].toLocation = tlocation.value;
            // TicketList[index].ticketPrice = parseInt(price.value);
            const ticket = {
                ticketID: editingId,
                fromLocation: flocation.value,
                toLocation: tlocation.value,
                ticketPrice: Number(price.value)
            };
            updateTicket(editingId, ticket);
        }
        else {
            //TicketList.push(new TicketDetails(flocation.value, tlocation.value, parseInt(price.value)));
            const ticket = {
                ticketID: 0,
                fromLocation: flocation.value,
                toLocation: tlocation.value,
                ticketPrice: Number(price.value)
            };
            addTicketDetails(ticket);
            alert('Ticket Added Successfully');
            Ticketdetails();
        }
        ticketform.reset();
        editingId = null;
    });
}
function edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        editingId = id;
        const TicketList = yield fetchTickets();
        const item = TicketList.find((item) => item.ticketID === Number(id));
        if (item) {
            addticket();
            flocation.value = item.fromLocation;
            tlocation.value = item.toLocation;
            price.value = String(item.ticketPrice);
        }
    });
}
function deleting(id) {
    deleteTicket(id);
    //TicketList = TicketList.filter((items) => items.TicketID !== id);
    Ticketdetails();
}
function showhistory() {
    return __awaiter(this, void 0, void 0, function* () {
        const TravelList = yield fetchTraveldetails();
        let historys = (document.getElementById('history'));
        historys.style.display = "block";
        const tableBody = document.querySelector("#history tbody");
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
    });
}
function topup() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUser();
        let topups = (document.getElementById('topup'));
        topups.style.display = "block";
        let currentbalane = (document.getElementById('Currentbalance'));
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
    });
}
function recharge() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUser();
        let currentbalane = (document.getElementById('topup'));
        currentbalane.style.display = "none";
        let rechargedBalance = (document.getElementById('rechargedBalance'));
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userID == currentUser.userID) {
                let ubalance = (document.getElementById('balance'));
                UserArrayList[i].balance += Number(ubalance.value);
                const users = {
                    userID: currentUser.userID,
                    userName: UserArrayList[i].userName,
                    userMail: UserArrayList[i].userMail,
                    passWord: UserArrayList[i].passWord,
                    balance: UserArrayList[i].balance,
                    userPhoneNumber: UserArrayList[i].userPhoneNumber
                };
                updateUser(currentUser.userID, users);
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
    });
}
function showbalance() {
    return __awaiter(this, void 0, void 0, function* () {
        const UserArrayList = yield fetchUser();
        let rechargedBalance = (document.getElementById('rechargedBalance'));
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
    });
}
function Travel() {
    return __awaiter(this, void 0, void 0, function* () {
        const TicketList = yield fetchTickets();
        let TicketbookingDetail = (document.getElementById('TicketbookingDetail'));
        TicketbookingDetail.style.display = "block";
        const tableBody = document.querySelector("#TicketbookingDetail tbody");
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
    });
}
function Buy(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let tbalance;
        const UserArrayList = yield fetchUser();
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userID == currentUser.userID) {
                const users = {
                    userID: currentUser.userID,
                    userName: UserArrayList[i].userName,
                    userMail: UserArrayList[i].userMail,
                    passWord: UserArrayList[i].passWord,
                    balance: UserArrayList[i].balance,
                    userPhoneNumber: UserArrayList[i].userPhoneNumber
                };
                tbalance = UserArrayList[i].balance;
                currentUser.balance = tbalance;
                updateUser(currentUser.userID, users);
            }
        }
        const TicketList = yield fetchTickets();
        const TravelList = yield fetchTraveldetails();
        for (let i = 0; i < TicketList.length; i++) {
            if (TicketList[i].ticketID == id) {
                if (currentUser.balance >= TicketList[i].ticketPrice) {
                    currentUser.balance -= TicketList[i].ticketPrice;
                    //TravelList.push(new TravelDetails(currentUser.UserId, TicketList[i].FromLocation, TicketList[i].ToLocation, new Date, TicketList[i].TicketPrice))
                    const user = {
                        userID: currentUser.userID,
                        userMail: currentUser.userMail,
                        userName: currentUser.userName,
                        userPhoneNumber: currentUser.userPhoneNumber,
                        balance: currentUser.balance,
                        passWord: currentUser.passWord
                    };
                    updateUser(currentUser.userID, user);
                    const travel = {
                        travelID: 0,
                        cardNumber: currentUser.userID,
                        fromLocation: TicketList[i].fromLocation,
                        toLocation: TicketList[i].toLocation,
                        cost: TicketList[i].ticketPrice,
                        travelDate: new Date()
                    };
                    addTravelDetails(travel);
                }
                else {
                    alert("your balance is low. Please Top up");
                }
            }
        }
    });
}
function displayHomePage() {
    let page = (document.getElementById('page'));
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
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5044/api/user', {
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
    });
}
function addTicketDetails(ticketdetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5044/api/ticketdetails', {
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
    });
}
function addTravelDetails(travedetails) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:5044/api/traveldetails', {
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
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5044/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Faild to update user');
        }
    });
}
function updateTicket(id, ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5044/api/ticketdetails/${id}`, {
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
    });
}
function deleteTicket(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5044/api/ticketdetails/${id}`, {
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(medicineinfo)
        });
        if (!response.ok) {
            throw new Error('Faild to Delete ticket');
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5044/api/user';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failled to fetch user');
        }
        return yield response.json();
    });
}
function fetchTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5044/api/ticketdetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failled to fetch tickets');
        }
        return yield response.json();
    });
}
function fetchTraveldetails() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5044/api/traveldetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failled to fetch travels');
        }
        return yield response.json();
    });
}
//# sourceMappingURL=metro.js.map