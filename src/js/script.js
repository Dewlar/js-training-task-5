let errFocusNode;
const borderColorOnFocus = 'aqua';
const borderColorOnBlur = '#E5E5E5';
const errorColor = 'red';
let firstEntryPassword = 0;
const password = document.querySelector('.password');
const passwordConfirm = document.querySelector('.confirm-password');
let validatePersonalInfo = { login: false, email: false, password: false };

document.querySelector('form').onsubmit = function () {
  this.action = '#';
  if (validateForm(validatePersonalInfo)) console.log(validatePersonalInfo);
};

document.querySelectorAll('input').forEach(function (currentFocusNode) {
  // focus event
  currentFocusNode.onfocus = function () {
    errFocusNode = currentFocusNode;
    if (this.style.borderColor != errorColor) this.style.borderColor = borderColorOnFocus;

    if (this.matches('.email')) {
      this.style.borderColor = borderColorOnFocus;
      mailErrorHighlight(true);
    }
  };

  // blur event
  currentFocusNode.onblur = function () {
    if (this.style.borderColor != errorColor) this.style.borderColor = borderColorOnBlur;

    if (this.matches('.email')) {
      if (!validateEmail(this.value)) {
        this.style.borderColor = errorColor;
        mailErrorHighlight(false);
      } else {
        validatePersonalInfo.email = this.value;
      }
    }

    if (this.matches('.password')) {
      if (firstEntryPassword) {
        if (firstEntryPassword === 'yes') firstEntryPassword = 'no';
        if (password.value !== passwordConfirm.value) equalsPassword(false);
        else equalsPassword(true);
      } else {
        firstEntryPassword = 'yes';
      }
    }
  };

  // oninput event
  let errorDisplayDuration = null;
  currentFocusNode.oninput = function () {
    // handler for the login field
    if (this.matches('.login')) {
      let login = this.value;

      if (login.length > 10) {
        this.value = login.substr(0, 10);
        // validatePersonalInfo.login = login.substr(0, 10);

        let loginError = document.querySelector('.login-error');
        if (!loginError.hidden) {
          clearTimeout(errorDisplayDuration);
        }

        loginError.hidden = false;
        currentFocusNode.style.borderColor = errorColor;

        errorDisplayDuration = setTimeout(() => {
          loginError.hidden = true;

          if (errFocusNode === currentFocusNode) {
            currentFocusNode.style.borderColor = borderColorOnFocus;
          } else {
            currentFocusNode.style.borderColor = borderColorOnBlur;
          }
        }, 2000);
      }
      validatePersonalInfo.login = this.value;
    }

    // handler for the password field
    if (this.matches('.password')) {
      if (firstEntryPassword === 'no') {
        if (password.value === passwordConfirm.value) {
          equalsPassword(true);
          this.style.borderColor = borderColorOnFocus;
        } else equalsPassword(false);
      }
    }
  };
});

////////////////////// function    /////////////////////
function mailErrorHighlight(hidden) {
  let mailError = document.querySelector('.email-error');
  if (hidden) mailError.hidden = true;
  else mailError.hidden = false;
}

function equalsPassword(equal) {
  const passwordError = document.querySelectorAll('.password-error');
  if (equal) {
    validatePersonalInfo.password = true;
    passwordError[0].hidden = true;
    passwordError[1].hidden = true;
    password.style.borderColor = borderColorOnBlur;
    passwordConfirm.style.borderColor = borderColorOnBlur;
  } else {
    validatePersonalInfo.password = false;
    passwordError[0].hidden = false;
    passwordError[1].hidden = false;
    password.style.borderColor = errorColor;
    passwordConfirm.style.borderColor = errorColor;
  }
}

function validateEmail(email) {
  const mailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailRegexpStrong = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const RFC22 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const michaelRushton = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/id;
return mailRegexpStrong.test(email);
}

function validateForm(form) {
  for (let isFieldValid in form) {
    if (!form[isFieldValid]) {
      return false;
    }
  }
  return true;
}
