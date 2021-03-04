const htmlElements = {
	inputName: document.querySelector('#name'),
	inputEmail: document.querySelector('#email'),
	inputCreditCard: document.querySelector('#txtCreditCard'),
	inputExpiration: document.querySelector('#txtExpiration'),
	inputCVC: document.querySelector('#txtCVC'),
	inputAgreement: document.querySelector('#agreement'),
	buttonCheckout: document.querySelector('#btnCheckout'),
};

const regex = {
	// https://stackoverflow.com/questions/9315647/regex-credit-card-number-tests
	// acepted cards
	visaCard: /^4[0-9]{12}(?:[0-9]{3})?$|^4[0-9]{12}(?:[0-9]{3})?$/,
	masterCard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,

	// All -> visa, master card, diners club, discover, jcb, american express
	allCards: /^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
};

function validate() {
	if (
		htmlElements.inputName.value !== '' &&
		htmlElements.inputEmail.value !== '' &&
		htmlElements.inputCreditCard.value !== '' &&
		htmlElements.inputExpiration.value !== '' &&
		htmlElements.inputCVC.value !== ''
	) {
		// validates Name
		fName = validateName(htmlElements.inputName.value);

		// validates Email
		fEmail = validateEmail(htmlElements.inputEmail.value);

		// validates Card Number
		fcardNumber = validateCardNumber(htmlElements.inputCreditCard.value);

		// validates Date
		fdate = validateDate(htmlElements.inputExpiration.value);

		// validates CVC
		fcvc = validateCVC(htmlElements.inputCVC.value);

		if (fName && fEmail && fcardNumber && fdate && fcvc) {
			alert('Payment Card: Successful Transaction. Thank you!');
		} else {
			alert('Payment Card: Failed Transaction. Please make sure you filled up all needed information.');
			return false;
		}
	} else {
		alert('Payment Card: Please enter your valid information all marked forms');
		htmlElements.inputName.style.boxShadow = '0 0 0 2px red';
		htmlElements.inputEmail.style.boxShadow = '0 0 0 2px red';
		htmlElements.inputCreditCard.style.boxShadow = '0 0 0 2px red';
		htmlElements.inputExpiration.style.boxShadow = '0 0 0 2px red';
		htmlElements.inputCVC.style.boxShadow = '0 0 0 2px red';
		htmlElements.inputAgreement.style.boxShadow = '0 0 0 2px red';
		return false;
	}
}

function validateName(name) {
	if (name) {
		htmlElements.inputName.style.boxShadow = '0 0 0 2px green';
		return true;
	} else {
		htmlElements.inputName.style.boxShadow = '0 0 0 2px red';
		alert('Payment Card: Please input your name.');
		return false;
	}
}

function validateEmail(email) {
	if (email) {
		htmlElements.inputName.style.boxShadow = '0 0 0 2px green';
		return true;
	} else {
		htmlElements.inputName.style.boxShadow = '0 0 0 2px red';
		alert('Payment Card: Please input email here.');
		return false;
	}
}

function validateCardNumber(num) {
	let number = num.replace(/[ -]+/g, '');

	if (regex.visaCard.test(number) || regex.masterCard.test(number)) {
		htmlElements.inputCreditCard.style.boxShadow = '0 0 0 2px green';
		return true;
	} else {
		htmlElements.inputCreditCard.style.boxShadow = '0 0 0 2px red';
		alert('Payment Card: Please input a valid credit card number.');
		return false;
	}
}

function validateDate(date) {
	let edate;
	const regex = /^([0-9]{2}\/[0-9]{4})$/;

	if (regex.test(date)) {
		edate = date.split(/[ /]+/);

		const today = new Date();
		const expirationDate = new Date().setFullYear(edate[1], edate[0]);

		if (expirationDate < today) {
			htmlElements.inputExpiration.style.boxShadow = '0 0 0 2px red';
			alert('Payment Card: Please input valid expiration date.');
			return false;
		} else {
			htmlElements.inputExpiration.style.boxShadow = '0 0 0 2px green';
			return true;
		}
	} else {
		alert('Payment Card: Please input valid expiration date.');
		htmlElements.inputExpiration.style.boxShadow = '0 0 0 2px red';
		return false;
	}
}

function validateCVC(cvc) {
	const regex = /^([0-9]{3})$/;

	if (regex.test(cvc)) {
		htmlElements.inputCVC.style.boxShadow = '0 0 0 2px green';
		return true;
	} else {
		alert('Payment Card: Please input CVC.');
		htmlElements.inputCVC.style.boxShadow = '0 0 0 2px red';
		return false;
	}
}

function validateAgreement(check) {
	if (check) {
		return true;
	} else {
		htmlElements.inputName.style.boxShadow = '0 0 0 2px red';
		alert('Payment Card: Make sure you have read the terms and conditions.');
		return false;
	}
}

function detectCard() {
	let number = num.replace(/[ -]+/g, '');
}

function toggleContinuePayment() {
	var element = htmlElements.buttonCheckout;
	element.toggleAttribute('disabled');
}
