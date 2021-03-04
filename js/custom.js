window.load = function () {

}

validateForm = function () {
    // Name Input Conditions
    let first = document.contactUsForm.first.value;
    if (first == "") {
        alert("Firstname must be filled out");
        document.contactUsForm.first.focus();
        return false;
    }

    // Name Input Conditions
    let last = document.forms["contactUsForm"]["last"].value;
    if (last == "") {
        alert("Lastname must be filled out");
        document.contactUsForm.last.focus();
        return false;
    }

    // Mobile Number Input Conditions
    let mobileNumber = document.forms["contactUsForm"]["mobile-number"].value;
    if (mobileNumber == "") {
        alert("Mobile Number must be filled out");
        document.contactUsForm.mobileNumber.focus();
        return false;
    }

    // Email Input Conditions
    let email = document.forms["contactUsForm"]["email"].value;
    if (email == "") {
        alert("Email must be filled out");
        document.contactUsForm.email.focus();
        return false;
    }

    // Message Conditions
    let message = document.forms["contactUsForm"]["message"].value;
    if (message == "") {
        alert("Message must be filled out");
        document.contactUsForm.message.focus();
        return false;
    }

    alert("Your message has been sent!");
    return true;

}