let passwordLength = 16;
const inputEl = document.querySelector("#password");

const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");

const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");

function generatePassword() {
  let chars =
    "abcdefghjkmnpqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numberChars = "123456789";
  const symbolChars = "?!@&*()[]";

    if (upperCaseCheckEl.checked) {
      chars += upperCaseChars;
    }

    if (numberCheckEl.checked) {
      chars += numberChars;
    }

    if (symbolCheckEl.checked) {
      chars += symbolChars;
    }
  
  let password = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password;
  calculateQuality();
  calculateFontSize();
}

function calculateQuality() {
  let percent = Math.round((passwordLength / 64) * 60);

  upperCaseCheckEl.checked ? percent += 10 : percent += 0;
  numberCheckEl.checked ? percent += 10 : percent += 0;
  symbolCheckEl.checked ? percent += 20 : percent += 0;

  securityIndicatorBarEl.style.width = `${percent}%`;

  if(percent <= 50) {
    // critical
    securityIndicatorBarEl.classList.remove("safe");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.add("critical");
  } else if (percent > 50 && percent <= 69) {
    // warning
    securityIndicatorBarEl.classList.remove("safe");
    securityIndicatorBarEl.classList.add("warning");
    securityIndicatorBarEl.classList.remove("critical");
  } else if (percent > 69) {
    // safe
    securityIndicatorBarEl.classList.add("safe");
    securityIndicatorBarEl.classList.remove("warning");
    securityIndicatorBarEl.classList.remove("critical");
  }

  if (percent === 100) {
    // completed
    securityIndicatorBarEl.classList.add("completed");
  } else {
    securityIndicatorBarEl.classList.remove("completed");
  } 
}

function calculateFontSize() {
  if (passwordLength > 45) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.add("font-xxs");
  } else if (passwordLength > 32) {
    inputEl.classList.remove("font-sm");
    inputEl.classList.add("font-xs");
    inputEl.classList.remove("font-xxs");
  } else if (passwordLength > 22) {
    inputEl.classList.add("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  } else {
    inputEl.classList.remove("font-sm");
    inputEl.classList.remove("font-xs");
    inputEl.classList.remove("font-xxs");
  }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value);
}

const passwordLengthEl = document.querySelector("#password-length");

passwordLengthEl.addEventListener("input", function() {
    passwordLength = passwordLengthEl.value;

    const passwordLengthText = document.querySelector("#password-length-text");
    passwordLengthText.innerText = passwordLength;

    generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", generatePassword);

generatePassword();
