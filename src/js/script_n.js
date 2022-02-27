const loginErrorNode = document.querySelector('.login-error');
const emailErrorNode = document.querySelector('.email-error');
const passwordErrorNode = document.querySelector('.password-error');
// let firstEntryPassword = 0;
const borderColorOnFocus = 'aqua';
const borderColorOnBlur = '#E5E5E5';
const errorColor = 'red';

//----------------------------login---------------------//
document.querySelector('.login').addEventListener('input', (loginNode) => {
  let login = loginNode.target.value;

  if (login.length > 10) {
    loginErrorNode.hidden = false;
  } else {
    loginErrorNode.hidden = true;
  }
});
//----------------------------email-----------------------//
document.querySelector('.email').addEventListener('blur', (emailNode) => {
  let email = emailNode.target.value;

  if (!validateEmail(email)) {
    emailErrorNode.hidden = false;
  } else {
    emailErrorNode.hidden = true;
  }
});

function validateEmail(email) {
  const mailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailRegexpStrong = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
  const RFC22 =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const michaelRushton =
    /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/di;

  return mailRegexpStrong.test(email);
}

//-------------------------password------------------------//
const firstPasswordIcon = document.querySelector('.first-show-password-icon');
const secondPasswordIcon = document.querySelector('.second-show-password-icon');
const passwordNode = document.querySelector('.first-password');
const confirmPasswordNode = document.querySelector('.second-password');

passwordNode.addEventListener('blur', () => {
  equalsPassword();
});
confirmPasswordNode.addEventListener('blur', () => {
  equalsPassword();
});

function equalsPassword() {
  let confirmPassword = confirmPasswordNode.value;
  let password = passwordNode.value;

  const passwordsError = document.querySelectorAll('.password-error');
  if (password === confirmPassword) {
    // personalInfo.password = password.value;
    passwordsError[0].hidden = true;
    passwordsError[1].hidden = true;
    // passwordNode.style.borderColor = borderColorOnBlur;
    // confirmPasswordNode.style.borderColor = borderColorOnBlur;
  } else {
    // personalInfo.password = false;
    passwordsError[0].hidden = false;
    passwordsError[1].hidden = false;
    // passwordNode.style.borderColor = errorColor;
    // confirmPasswordNode.style.borderColor = errorColor;
  }
}

firstPasswordIcon.addEventListener('click', () => {
  showPasswordIconToggle();
  showPasswordToggle();
});

secondPasswordIcon.addEventListener('click', () => {
  showPasswordIconToggle();
  showPasswordToggle();
});

function showPasswordIconToggle() {
  firstPasswordIcon.classList.toggle('eye-slash');
  firstPasswordIcon.classList.toggle('eye');
  secondPasswordIcon.classList.toggle('eye-slash');
  secondPasswordIcon.classList.toggle('eye');
}

function showPasswordToggle() {
  if (passwordNode.type === 'password') {
    passwordNode.type = 'text';
    confirmPasswordNode.type = 'text';
  } else {
    passwordNode.type = 'password';
    confirmPasswordNode.type = 'password';
  }
}

//------------------------functions---------------------------//
