let htmlElements = {
	inputName: document.querySelector('#name'),
	inputAddress: document.querySelector('#address'),
	inputEmail: document.querySelector('#email'),
	inputCreditCard: document.querySelector('#txtCreditCard'),
	inputExpiration: document.querySelector('#txtExpiration'),
	inputCVC: document.querySelector('#txtCVC'),
	inputAgreement: document.querySelector('#agreement'),
	buttonCheckout: document.querySelector('#btnCheckout'),
	ccVisa: document.querySelector('#cc-visa'),
	ccMasterCard: document.querySelector('#cc-mastercard'),
	ccUnknown: document.querySelector('#cc-unknown'),
};

const regex = {
	// https://stackoverflow.com/questions/9315647/regex-credit-card-number-tests
	// accepted cards
	visa: /^4[0-9]{12}(?:[0-9]{3})?$|^4[0-9]{12}(?:[0-9]{3})?$/,
	mastercard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
	amex: /^3[47][0-9]{13}$/,

	// All -> visa, master card, diners club, discover, jcb, american express
	allCards: /^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
};

function validate() {
	if (
		htmlElements.inputName.value !== '' &&
		htmlElements.inputAddress.value !== '' &&
		htmlElements.inputEmail.value !== '' &&
		htmlElements.inputCreditCard.value !== '' &&
		htmlElements.inputExpiration.value !== '' &&
		htmlElements.inputCVC.value !== ''
	) {
		// validates Name
		fName = validateName(htmlElements.inputName.value);

		// validates Address
		fAddress = validateAddress(htmlElements.inputAddress.value);

		// validates Email
		fEmail = validateEmail(htmlElements.inputEmail.value);

		// validates Card Number
		fcardNumber = validateCardType(htmlElements.inputCreditCard.value);

		// validates Date
		fdate = validateDate(htmlElements.inputExpiration.value);

		// validates CVC
		fcvc = validateCVC(htmlElements.inputCVC.value);

		if (fName && fAddress && fEmail && fcardNumber && fdate && fcvc) {
			alert('Payment Card: Successful Transaction! Thank you!');

			// Extract all data
			let name = htmlElements.inputName.value;
			let cardType = document.querySelector("input[name='cc-radio']:checked").value.toUpperCase();
			let creditCardNo = htmlElements.inputCreditCard.value.replace(/[ -]+/g, '').replace(/\d(?=\d{4})/g, '*');
			let email = htmlElements.inputEmail.value;
			let address = htmlElements.inputAddress.value;

			let message = `Hi ${name},\n\nThank you for purchasing our product using ${cardType} \nwith credit card no. ${creditCardNo}.\n\nWe will email your receipt on ${email} and\nsend your product on ${address}`;

			alert(message);
			window.location.href = '/index.html'; // redirect
		} else {
			alert('Payment Card: Failed Transaction. Please make sure you filled up all needed information.');
			return false;
		}
	} else {
		alert('Payment Card: Please enter your valid information all marked forms');
		htmlElements.inputName.style.boxShadow = '0 0 0 2px red';
		htmlElements.inputAddress.style.boxShadow = '0 0 0 2px red';
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
		alert('Payment Card: Please enter your name.');
		return false;
	}
}

function validateAddress(address) {
	if (address) {
		htmlElements.inputAddress.style.boxShadow = '0 0 0 2px green';
		return true;
	} else {
		htmlElements.inputAddress.style.boxShadow = '0 0 0 2px red';
		alert('Payment Card: Please enter your address.');
		return false;
	}
}

function validateEmail(email) {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (regex.test(email)) {
		htmlElements.inputEmail.style.boxShadow = '0 0 0 2px green';
		return true;
	} else {
		htmlElements.inputEmail.style.boxShadow = '0 0 0 2px red';
		alert('Payment Card: Please enter valid email address');
		return false;
	}
}

function validateCardType(num) {
	let sanitizedNumber = num.replace(/[ -]+/g, '');
	let cardType = document.querySelector("input[name='cc-radio']:checked").value;

	let validCard = verifyCardNumber(cardType, sanitizedNumber);

	return validCard;
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
			alert('Payment Card: Please enter valid expiration date.');
			return false;
		} else {
			htmlElements.inputExpiration.style.boxShadow = '0 0 0 2px green';
			return true;
		}
	} else {
		alert('Payment Card: Please enter valid expiration date.');
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
		alert('Payment Card: Please enter CVC.');
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
	let ccValue = htmlElements.inputCreditCard.value;
	if (regex.visaCard.test(ccValue)) {
		htmlElements.ccVisa.classList.toggle('invisible');
		return false;
	}

	if (regex.masterCard.test(ccValue)) {
		htmlElements.ccMasterCard.classList.toggle('invisible');
		return false;
	}
}

function toggleContinuePayment() {
	var element = htmlElements.buttonCheckout;
	element.toggleAttribute('disabled');
}

function verifyCardNumber(cardType, sanitizedNumber) {
	if (regex[cardType].test(sanitizedNumber)) {
		htmlElements.inputCreditCard.style.boxShadow = '0 0 0 2px green';
		return true;
	} else {
		htmlElements.inputCreditCard.style.boxShadow = '0 0 0 2px red';

		alert('Payment Card: Please enter a valid ' + cardType.toUpperCase() + ' card number');
		return false;
	}
}

$(function () {
	$('.date-picker').datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: 'mm/yy',
		onClose: function (dateText, inst) {
			$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
		},
	});
});