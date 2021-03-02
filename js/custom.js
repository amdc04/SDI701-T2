window.load = function () {



}
var validateForm = function () {
    // Name Input Conditions
    let name = document.forms["contactUsForm"]["name"].value;
    if (name == "") {
        alert("Name must be filled out");
        return false;
    }

    // Mobile Number Input Conditions
    let mobileNumber = document.forms["contactUsForm"]["mobile-number"].value;
    if (mobileNumber == "") {
        alert("Mobile Number must be filled out");
        return false;
    }

    // Email Input Conditions
    let email = document.forms["contactUsForm"]["email"].value;
    if (email == "") {
        alert("Email must be filled out");
        return false;
    }

    // Message Conditions
    let message = document.forms["contactUsForm"]["message"].value;
    if (message == "") {
        alert("Message must be filled out");
        return false;
    }


    alert("Information submitted");
    return true;

}