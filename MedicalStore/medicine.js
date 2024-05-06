"use strict";
let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;
let CurrentUserId;
let CurrentUser;
let OrderId;
let NewuserMailStatus = false;
let NewPasswordStatus = false;
let NewUserPhoneNumberStatus = false;
//Pages
let homePage = document.getElementById('homePage');
let availableUser = document.getElementById('availableUser');
let newUserPage = document.getElementById('newUserPage');
let existingUserPage = document.getElementById('existingUserPage');
let medicineadd = (document.getElementById('medicineadd'));
let MedicineDetail = (document.getElementById('MedicineDetail'));
let medicineform = (document.getElementById('Medicineform'));
let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail'));
let requiredCount = document.getElementById('requiredCount');
let orderhistory = (document.getElementById('OrderHistory'));
let topups = (document.getElementById('topup'));
let currentbalane = (document.getElementById('topup'));
let rechargedBalance = (document.getElementById('rechargedBalance'));
let page = (document.getElementById('page'));
let orderhistorys = (document.getElementById('OrderHistorys'));
let editingId = null;
let medicinename = (document.getElementById('medicineName'));
let medicncount = (document.getElementById('medicineCount'));
let medicineprice = (document.getElementById('medicineprice'));
let medicinedate = (document.getElementById('medicinedate'));
class User {
    constructor(paramuserMail, paramPassword, paramUserPhoneNumber, balance) {
        UserIdAutoIncrement++;
        this.UserId = "UI" + UserIdAutoIncrement.toString();
        this.userMail = paramuserMail;
        this.Password = paramPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.balance = balance;
    }
}
class MedicineInfo {
    constructor(paramMedicineName, paramMedicineCount, paramMedicinePrice, paramMedicinedate) {
        MedicineIdAutoIncrement++;
        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = paramMedicinedate;
    }
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Cancelled"] = "Cnacelled";
    OrderStatus["Order"] = "Ordered";
})(OrderStatus || (OrderStatus = {}));
class Order {
    constructor(paramUserId, paramMedicineId, paramMedicineCount, paramtotalprice, paramdate, paramstatus) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.UserId = paramUserId;
        this.TotalPrice = paramtotalprice;
        this.OrderDate = paramdate;
        this.MedicineCount = paramMedicineCount;
        this.OrderStatus = paramstatus;
    }
}
let UserArrayList = new Array();
UserArrayList.push(new User("manju@gmail.com", "123@123", 9789011226, 100));
UserArrayList.push(new User("Harish@gmail.com", "345@2345", 9445153060, 0));
let MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 6, 30)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 5, 30)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 4, 30)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 12, 30)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 10, 30)));
let OrderList = new Array();
OrderList.push(new Order("UI1001", "MD11", 3, 15, new Date(2022, 11, 13), OrderStatus.Order));
OrderList.push(new Order("UI1001", "MD12", 2, 10, new Date(2022, 11, 13), OrderStatus.Order));
OrderList.push(new Order("UI1002", "MD13", 3, 120, new Date(2022, 11, 15), OrderStatus.Cancelled));
OrderList.push(new Order("UI1002", "MD15", 5, 250, new Date(2022, 11, 15), OrderStatus.Order));
function singin() {
    let homePage = document.getElementById('homePage');
    let availableUser = document.getElementById('availableUser');
    homePage.style.display = "block";
    availableUser.innerHTML = "<h2>Available User</h2>";
    for (let i = 0; i < UserArrayList.length; i++) {
        availableUser.innerHTML += `User Name : ${UserArrayList[i].userMail} | User Id : ${UserArrayList[i].UserId}<br>`;
    }
    let noExistingUserIdChecker = false;
    let existingUsermail = document.getElementById('existingUserId').value;
    let epass = document.getElementById('userpassword').value;
    let existingUserIdRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (existingUserIdRegex.test(existingUsermail)) {
        for (let i = 0; i < UserArrayList.length; i++) {
            if (UserArrayList[i].userMail == existingUsermail && UserArrayList[i].Password == epass) {
                CurrentUser = UserArrayList[i];
                CurrentUserId = UserArrayList[i].UserId;
                OperationPage();
                return;
            }
            else {
                noExistingUserIdChecker = true;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Enter Valid User mail");
        }
    }
    else {
        alert("Enter Valid User mail.");
    }
}
function signn() {
    let newUserPage = document.getElementById('newUserPage');
    newUserPage.style.display = "none";
    let existingUserPage = document.getElementById('existingUserPage');
    existingUserPage.style.display = "block";
}
function sign() {
    let existingUserPage = document.getElementById('existingUserPage');
    existingUserPage.style.display = "none";
    let newUserPage = document.getElementById('newUserPage');
    newUserPage.style.display = "block";
}
function singup() {
    if (NewuserMailStatus == true &&
        NewPasswordStatus == true &&
        NewUserPhoneNumberStatus == true) {
        let newuserMail = document.getElementById('newUserMail').value;
        let newPassword = document.getElementById('newUserPassword').value;
        let newUserPhoneNumber = document.getElementById('newUserPhoneNumber').value;
        UserArrayList.push(new User(newuserMail, newPassword, +newUserPhoneNumber, 0));
        alert("registered successfully");
    }
    else {
        alert("Please fill out the form fully.");
    }
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
function medicinedetails() {
    let medicineadd = (document.getElementById('medicineadd'));
    medicineadd.style.display = 'block';
    let MedicineDetail = (document.getElementById('MedicineDetail'));
    MedicineDetail.style.display = "block";
    let medicineform = (document.getElementById('Medicineform'));
    medicineform.style.display = "none";
    const tableBody = document.querySelector("#MedicineDetail tbody");
    tableBody.innerHTML = "";
    MedicineList.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.MedicineName}</td>
        <td>${item.MedicineCount}</td>
        <td>${item.MedicinePrice}</td>
        <td>${item.MedicineExpiryDate.toLocaleDateString()}</td>
        <td>
          <button onclick="edit('${item.MedicineId}')">Edit</button>
          <button onclicK="deleting('${item.MedicineId}')">Delete</button>
        </td>
        
        
      `;
        tableBody.appendChild(row);
    });
    availableUser.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    //medicineadd.style.display="none";
    //MedicineDetail.style.display="none";
    purchaseMedicineDetail.style.display = "none";
    //medicineform.style.display="none";
    requiredCount.style.display = "none";
    orderhistory.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    page.style.display = "none";
    orderhistorys.style.display = "none";
}
function purchase() {
    let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail'));
    purchaseMedicineDetail.style.display = "block";
    const tableBody = document.querySelector("#purchaseMedicineDetail tbody");
    tableBody.innerHTML = "";
    MedicineList.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.MedicineName}</td>

        <td>${item.MedicineCount}</td>
        <td>${item.MedicinePrice}</td>
        <td>${item.MedicineExpiryDate.toLocaleDateString()}</td>
        <td>
          <button onclick="BuyMedicine('${item.MedicineId}')">Buy</button>
        </td>
        
        
      `;
        tableBody.appendChild(row);
    });
    availableUser.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicineadd.style.display = "none";
    MedicineDetail.style.display = "none";
    //purchaseMedicineDetail.style.display="none";
    medicineform.style.display = "none";
    requiredCount.style.display = "none";
    orderhistory.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    page.style.display = "none";
    orderhistorys.style.display = "none";
}
let SelectedID;
function BuyMedicine(item) {
    let requiredCount = document.getElementById('requiredCount');
    requiredCount.style.display = "block";
    let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail'));
    purchaseMedicineDetail.style.display = "none";
    SelectedID = item;
}
function buyMedicine() {
    let proceed = true;
    let finalMedicineRequiredCount = 0;
    let medicineRequiredCount = document.getElementById('medicineRequiredCount').value;
    let medicineRequiredCountRegex = /^\d{1,3}$/;
    if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
        for (let i = 0; i < MedicineList.length; i++) {
            if (MedicineList[i].MedicineId == SelectedID) {
                if (MedicineList[i].MedicineCount > 0) {
                    if ((MedicineList[i].MedicineCount - +medicineRequiredCount) < 0) {
                        proceed = confirm(`We only have ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}. Do you want to buy ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}?`);
                        if (proceed) {
                            finalMedicineRequiredCount = MedicineList[i].MedicineCount;
                        }
                    }
                    else {
                        finalMedicineRequiredCount = +medicineRequiredCount;
                    }
                    if (proceed) {
                        MedicineList[i].MedicineCount = MedicineList[i].MedicineCount - finalMedicineRequiredCount;
                        if (CurrentUser.balance >= finalMedicineRequiredCount * MedicineList[i].MedicinePrice) {
                            CurrentUser.balance -= finalMedicineRequiredCount * MedicineList[i].MedicinePrice;
                            OrderList.push(new Order(CurrentUserId, MedicineList[i].MedicineId, finalMedicineRequiredCount, MedicineList[i].MedicinePrice * finalMedicineRequiredCount, new Date(), OrderStatus.Order));
                            alert("Purchase Success.");
                        }
                        else {
                            alert('your Balance is low');
                        }
                    }
                    let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail'));
                    purchaseMedicineDetail.style.display = "block";
                    let requiredCount = document.getElementById('requiredCount');
                    requiredCount.style.display = "none";
                }
                else if (MedicineList[i].MedicineCount <= 0) {
                    alert("Out of Stock, you can buy alternative medicine.");
                }
            }
        }
    }
    else {
        alert("Please enter valid Required Count");
    }
}
function showhistory() {
    let orderhistorys = (document.getElementById('OrderHistorys'));
    orderhistorys.style.display = "block";
    const tableBody = document.querySelector("#OrderHistorys tbody");
    tableBody.innerHTML = "";
    OrderList.forEach((item) => {
        if (item.UserId == CurrentUserId) {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.UserId}</td>
        <td>${item.MedicineId}</td>
        <td>${item.MedicineCount}</td>
        <td>${item.TotalPrice}</td>
        <td>${item.OrderDate.toLocaleDateString()}</td>
        <td>${item.OrderStatus}</td>
        
      `;
            tableBody.appendChild(row);
        }
    });
    availableUser.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicineadd.style.display = "none";
    MedicineDetail.style.display = "none";
    purchaseMedicineDetail.style.display = "none";
    medicineform.style.display = "none";
    requiredCount.style.display = "none";
    orderhistory.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    page.style.display = "none";
}
function topup() {
    let topups = (document.getElementById('topup'));
    topups.style.display = "block";
    let currentbalane = (document.getElementById('Currentbalance'));
    currentbalane.style.display = "block";
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == CurrentUserId) {
            currentbalane.innerHTML = `Current balance ${UserArrayList[i].balance.toString()}`;
        }
    }
    availableUser.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicineadd.style.display = "none";
    MedicineDetail.style.display = "none";
    purchaseMedicineDetail.style.display = "none";
    medicineform.style.display = "none";
    requiredCount.style.display = "none";
    orderhistory.style.display = "none";
    //topups.style.display="none";
    //currentbalane.style.display="none";
    //rechargedBalance.style.display="none";
    orderhistorys.style.display = "none";
    page.style.display = "none";
}
function recharge() {
    let currentbalane = (document.getElementById('topup'));
    currentbalane.style.display = "none";
    let rechargedBalance = (document.getElementById('rechargedBalance'));
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == CurrentUserId) {
            let ubalance = (document.getElementById('balance'));
            UserArrayList[i].balance += parseInt(ubalance.value);
            rechargedBalance.innerHTML = `Current balance ${UserArrayList[i].balance.toString()}`;
        }
    }
}
function showbalance() {
    let rechargedBalance = (document.getElementById('rechargedBalance'));
    rechargedBalance.style.display = "block";
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == CurrentUserId) {
            rechargedBalance.innerHTML = `Available balance ${UserArrayList[i].balance.toString()}`;
        }
    }
    availableUser.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicineadd.style.display = "none";
    MedicineDetail.style.display = "none";
    purchaseMedicineDetail.style.display = "none";
    medicineform.style.display = "none";
    requiredCount.style.display = "none";
    orderhistory.style.display = "none";
    orderhistorys.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    //rechargedBalance.style.display="none";
    page.style.display = "none";
}
function cancel() {
    let orderhistory = (document.getElementById('OrderHistory'));
    orderhistory.style.display = "block";
    const tableBody = document.querySelector("#OrderHistory tbody");
    tableBody.innerHTML = "";
    OrderList.forEach((item) => {
        if (item.UserId == CurrentUserId && item.OrderStatus == OrderStatus.Order) {
            OrderId = item.OrderId;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${item.UserId}</td>
        <td>${item.MedicineId}</td>
        <td>${item.MedicineCount}</td>
        <td>${item.TotalPrice}</td>
        <td>${item.OrderDate.toLocaleDateString()}</td>
        <td>${item.OrderStatus}</td>
        <td>
          <button onclick="remove()">Cancel</button>
        </td>
        
      `;
            tableBody.appendChild(row);
        }
    });
    availableUser.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicineadd.style.display = "none";
    MedicineDetail.style.display = "none";
    purchaseMedicineDetail.style.display = "none";
    medicineform.style.display = "none";
    requiredCount.style.display = "none";
    //orderhistory.style.display="none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    page.style.display = "none";
    orderhistorys.style.display = "none";
}
const remove = () => {
    // let orderhistory = (document.getElementById('OrderHistory')) as HTMLTableElement;
    // orderhistory.style.display = "none";
    OrderList.forEach((items) => {
        if (items.OrderId == OrderId) {
            items.OrderStatus = OrderStatus.Cancelled;
            CurrentUser.balance += items.TotalPrice;
            MedicineList.forEach((item) => {
                if (item.MedicineId == items.MedicineId) {
                    item.MedicineCount += items.MedicineCount;
                }
            });
        }
    });
    cancel();
};
function addmedicine() {
    let medicineform = (document.getElementById('Medicineform'));
    medicineform.style.display = "block";
    let medicineadd = (document.getElementById('medicineadd'));
    medicineadd.style.display = 'none';
    let MedicineDetail = (document.getElementById('MedicineDetail'));
    MedicineDetail.style.display = "none";
}
function medicineadding() {
    if (editingId !== null) {
        const index = MedicineList.findIndex((item) => item.MedicineId === editingId);
        if (index !== -1) {
            MedicineList[index].MedicineName = medicinename.value;
            MedicineList[index].MedicineCount = parseInt(medicncount.value);
            MedicineList[index].MedicinePrice = parseInt(medicineprice.value);
            MedicineList[index].MedicineExpiryDate = new Date(medicinedate.value);
        }
    }
    else {
        MedicineList.push(new MedicineInfo(medicinename.value, parseInt(medicncount.value), parseInt(medicineprice.value), new Date(medicinedate.value)));
        alert('medicine Added Successfully');
        medicinedetails();
    }
    medicineform.reset();
    editingId = null;
    // MedicineList.push(new MedicineInfo(medicinename.value,parseInt(medicncount.value),parseInt(medicineprice.value),new Date(medicinedate.value)));
    // alert('medicine Added Successfully');
    // medicinedetails();
}
const edit = (id) => {
    addmedicine();
    editingId = id;
    const item = MedicineList.find((item) => item.MedicineId === id);
    if (item) {
        medicinename.value = item.MedicineName;
        medicncount.value = String(item.MedicineCount);
        medicineprice.value = String(item.MedicinePrice);
        medicinedate.value = String(item.MedicineExpiryDate);
        addmedicine();
    }
};
const deleting = (id) => {
    MedicineList = MedicineList.filter((item) => item.MedicineId !== id);
    medicinedetails();
};
//validation
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
function displayHomePage() {
    let page = (document.getElementById('page'));
    page.style.display = "block";
    newUserPage.style.display = "none";
    medicineadd.style.display = "none";
    MedicineDetail.style.display = "none";
    purchaseMedicineDetail.style.display = "none";
    medicineform.style.display = "none";
    requiredCount.style.display = "none";
    orderhistory.style.display = "none";
    existingUserPage.style.display = "none";
    topups.style.display = "none";
    currentbalane.style.display = "none";
    rechargedBalance.style.display = "none";
    orderhistorys.style.display = "none";
}
//# sourceMappingURL=medicine.js.map