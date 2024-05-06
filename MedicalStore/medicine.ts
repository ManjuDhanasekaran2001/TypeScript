let UserIdAutoIncrement = 1000;
let MedicineIdAutoIncrement = 10;
let OrderIdAutoIncrement = 100;

let CurrentUserId: string;
let CurrentUser: User;
let OrderId: string;

let NewuserMailStatus = false;
let NewPasswordStatus = false;
let NewUserPhoneNumberStatus = false;


//Pages
let homePage = document.getElementById('homePage') as HTMLDivElement;

let availableUser = document.getElementById('availableUser') as HTMLLabelElement;
let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
let medicineadd = (document.getElementById('medicineadd')) as HTMLButtonElement;
let MedicineDetail = (document.getElementById('MedicineDetail')) as HTMLTableElement;
let medicineform = (document.getElementById('Medicineform')) as HTMLFormElement;
let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail')) as HTMLTableElement;
let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;
let orderhistory = (document.getElementById('OrderHistory')) as HTMLTableElement;
let topups = (document.getElementById('topup')) as HTMLLabelElement;
let currentbalane = (document.getElementById('topup')) as HTMLDivElement;
let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
let page = (document.getElementById('page')) as HTMLDivElement;
let orderhistorys = (document.getElementById('OrderHistorys')) as HTMLTableElement;







let editingId: string | null = null;
let medicinename = (document.getElementById('medicineName')) as HTMLInputElement;
let medicncount = (document.getElementById('medicineCount')) as HTMLInputElement;
let medicineprice = (document.getElementById('medicineprice')) as HTMLInputElement;
let medicinedate = (document.getElementById('medicinedate')) as HTMLInputElement;


class User {

    UserId: string;
    userMail: string;
    Password: string;
    UserPhoneNumber: number;
    balance: number;

    constructor(paramuserMail: string, paramPassword: string, paramUserPhoneNumber: number, balance: number) {

        UserIdAutoIncrement++;

        this.UserId = "UI" + UserIdAutoIncrement.toString();

        this.userMail = paramuserMail;
        this.Password = paramPassword;
        this.UserPhoneNumber = paramUserPhoneNumber;
        this.balance = balance;
    }

}

class MedicineInfo {

    MedicineId: string;
    MedicineName: string;
    MedicineCount: number;
    MedicinePrice: number;
    MedicineExpiryDate: Date;

    constructor(paramMedicineName: string, paramMedicineCount: number, paramMedicinePrice: number, paramMedicinedate: Date) {
        MedicineIdAutoIncrement++;

        this.MedicineId = "MD" + MedicineIdAutoIncrement.toString();
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.MedicineExpiryDate = paramMedicinedate;
    }

}

enum OrderStatus {

    Cancelled = "Cnacelled",
    Order = "Ordered"
}

class Order {
    OrderId: string;
    MedicineId: string;
    UserId: string;
    MedicineCount: number;
    TotalPrice: number;
    OrderDate: Date;
    OrderStatus: OrderStatus;

    constructor(paramUserId: string, paramMedicineId: string, paramMedicineCount: number, paramtotalprice: number, paramdate: Date, paramstatus: OrderStatus) {
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

let UserArrayList: Array<User> = new Array<User>();

UserArrayList.push(new User("manju@gmail.com", "123@123", 9789011226, 100));
UserArrayList.push(new User("Harish@gmail.com", "345@2345", 9445153060, 0));

let MedicineList: Array<MedicineInfo> = new Array<MedicineInfo>();

MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 6, 30)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 5, 30)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 4, 30)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 12, 30)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 10, 30)));



let OrderList: Array<Order> = new Array<Order>();
OrderList.push(new Order("UI1001", "MD11", 3, 15, new Date(2022, 11, 13), OrderStatus.Order));
OrderList.push(new Order("UI1001", "MD12", 2, 10, new Date(2022, 11, 13), OrderStatus.Order));
OrderList.push(new Order("UI1002", "MD13", 3, 120, new Date(2022, 11, 15), OrderStatus.Cancelled));
OrderList.push(new Order("UI1002", "MD15", 5, 250, new Date(2022, 11, 15), OrderStatus.Order));

function singin() {

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
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "none";
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    existingUserPage.style.display = "block";

}
function sign() {
    let existingUserPage = document.getElementById('existingUserPage') as HTMLDivElement;
    existingUserPage.style.display = "none";
    let newUserPage = document.getElementById('newUserPage') as HTMLDivElement;
    newUserPage.style.display = "block";

}

function singup() {

    if (NewuserMailStatus == true &&
        NewPasswordStatus == true &&
        NewUserPhoneNumberStatus == true) {

        let newuserMail = (document.getElementById('newUserMail') as HTMLInputElement).value;
        let newPassword = (document.getElementById('newUserPassword') as HTMLInputElement).value;
        let newUserPhoneNumber = (document.getElementById('newUserPhoneNumber') as HTMLInputElement).value;
        UserArrayList.push(new User(newuserMail, newPassword, +newUserPhoneNumber, 0));
        alert("registered successfully");


    }
    else {
        alert("Please fill out the form fully.")
    }
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
function medicinedetails() {
    let medicineadd = (document.getElementById('medicineadd')) as HTMLButtonElement;
    medicineadd.style.display = 'block';
    let MedicineDetail = (document.getElementById('MedicineDetail')) as HTMLTableElement;
    MedicineDetail.style.display = "block";
    let medicineform = (document.getElementById('Medicineform')) as HTMLFormElement;
    medicineform.style.display = "none";
    const tableBody = document.querySelector("#MedicineDetail tbody") as HTMLTableSectionElement;
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

    let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail')) as HTMLTableElement;
    purchaseMedicineDetail.style.display = "block";
    const tableBody = document.querySelector("#purchaseMedicineDetail tbody") as HTMLTableSectionElement;
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

let SelectedID: string;
function BuyMedicine(item: string) {

    let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;
    requiredCount.style.display = "block";
    let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail')) as HTMLTableElement;
    purchaseMedicineDetail.style.display = "none";
    SelectedID = item;
}



function buyMedicine() {

    let proceed: boolean = true;
    let finalMedicineRequiredCount: number = 0;


    let medicineRequiredCount = (document.getElementById('medicineRequiredCount') as HTMLInputElement).value;



    let medicineRequiredCountRegex = /^\d{1,3}$/;

    if (medicineRequiredCountRegex.test(medicineRequiredCount) && +medicineRequiredCount > 0) {
        for (let i = 0; i < MedicineList.length; i++) {

            if (MedicineList[i].MedicineId == SelectedID) {


                if (MedicineList[i].MedicineCount > 0) {

                    if ((MedicineList[i].MedicineCount - +medicineRequiredCount) < 0) {
                        proceed = confirm(`We only have ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}. Do you want to buy ${MedicineList[i].MedicineCount} ${MedicineList[i].MedicineName}?`)

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

                    let purchaseMedicineDetail = (document.getElementById('purchaseMedicineDetail')) as HTMLTableElement;
                    purchaseMedicineDetail.style.display = "block";
                    let requiredCount = document.getElementById('requiredCount') as HTMLDivElement;
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
    let orderhistorys = (document.getElementById('OrderHistorys')) as HTMLTableElement;
    orderhistorys.style.display = "block";
    const tableBody = document.querySelector("#OrderHistorys tbody") as HTMLTableSectionElement;
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

    let topups = (document.getElementById('topup')) as HTMLLabelElement;
    topups.style.display = "block";
    let currentbalane = (document.getElementById('Currentbalance')) as HTMLLabelElement;
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
    let currentbalane = (document.getElementById('topup')) as HTMLDivElement;
    currentbalane.style.display = "none";
    let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
    for (let i = 0; i < UserArrayList.length; i++) {
        if (UserArrayList[i].UserId == CurrentUserId) {
            let ubalance = (document.getElementById('balance')) as HTMLInputElement;
            UserArrayList[i].balance += parseInt(ubalance.value);
            rechargedBalance.innerHTML = `Current balance ${UserArrayList[i].balance.toString()}`;
        }
    }

}

function showbalance() {
    let rechargedBalance = (document.getElementById('rechargedBalance')) as HTMLLabelElement;
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

    let orderhistory = (document.getElementById('OrderHistory')) as HTMLTableElement;
    orderhistory.style.display = "block";
    const tableBody = document.querySelector("#OrderHistory tbody") as HTMLTableSectionElement;
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
            })
        }
    })

    cancel();

};

function addmedicine() {
    let medicineform = (document.getElementById('Medicineform')) as HTMLFormElement;
    medicineform.style.display = "block";
    let medicineadd = (document.getElementById('medicineadd')) as HTMLButtonElement;
    medicineadd.style.display = 'none';
    let MedicineDetail = (document.getElementById('MedicineDetail')) as HTMLTableElement;
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
    } else {
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



const edit = (id: string) => {
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

const deleting = (id: string) => {
    MedicineList = MedicineList.filter((item) => item.MedicineId !== id);
    medicinedetails();

};

//validation
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

function displayHomePage() {
    let page = (document.getElementById('page')) as HTMLDivElement;
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


