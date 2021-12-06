let onfocusNode;
let errorDisplayDuration;
const borderColorOnFocus = 'aqua';
const borderColorOnBlur = '#E5E5E5';
const errorColor = 'red';
let firstEntryPassword = 0;
const password = document.querySelector('.password');
const passwordConfirm = document.querySelector('.confirm-password');
let personalInfo = { login: false, email: false, password: false };

document.querySelector('form').onsubmit = function () {
  this.action = '#';
  if (validateForm(personalInfo)) {
    alert('login: ' + personalInfo.login + ' email: ' + personalInfo.email + ' password: ' + personalInfo.password);
  } else {
    alert('Проверьте правильность ввода данных.\n    Поля не должны быть пустыми!\n       Поля не должны содержать ошибки!');
  }
};

document.querySelectorAll('input').forEach(function (currentFocusNode) {
  // set focus event //
  currentFocusNode.onfocus = function () {
    onfocusNode = currentFocusNode;
    if (this.style.borderColor != errorColor) this.style.borderColor = borderColorOnFocus;

    if (this.matches('.email')) {
      this.style.borderColor = borderColorOnFocus;
      mailErrorHighlight(true);
    }
  };

  // lost focus event //
  currentFocusNode.onblur = function () {
    if (this.style.borderColor != errorColor) this.style.borderColor = borderColorOnBlur;

    // email field out of focus event handler
    if (this.matches('.email')) {
      if (!validateEmail(this.value)) {
        this.style.borderColor = errorColor;
        mailErrorHighlight(false);
        personalInfo.email = false;
      } else {
        personalInfo.email = this.value;
      }
    }

    // password field out of focus event handler
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

  // oninput event //
  currentFocusNode.oninput = function () {
    // login field handler on input event
    if (this.matches('.login')) {
      let login = this.value;
      if (login.length > 10) {
        this.value = login.substr(0, 10);
        setTimerLoginError();
      }
      personalInfo.login = this.value;
    }

    // password field handler on input event
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

//////////////////////    function    /////////////////////

function setTimerLoginError() {
  const loginErrorNode = document.querySelector('.login-error');
  const loginNode = document.querySelector('.login');

  if (!loginErrorNode.hidden) {
    clearTimeout(errorDisplayDuration);
  }

  loginErrorNode.hidden = false;
  loginNode.style.borderColor = errorColor;

  errorDisplayDuration = setTimeout(() => {
    loginErrorNode.hidden = true;

    if (onfocusNode === loginNode) {
      loginNode.style.borderColor = borderColorOnFocus;
    } else {
      loginNode.style.borderColor = borderColorOnBlur;
    }
  }, 2000);
}

function mailErrorHighlight(hidden) {
  const mailErrorNode = document.querySelector('.email-error');
  if (hidden) mailErrorNode.hidden = true;
  else mailErrorNode.hidden = false;
}

function equalsPassword(equal) {
  const passwordsError = document.querySelectorAll('.password-error');
  if (equal) {
    personalInfo.password = password.value;
    passwordsError[0].hidden = true;
    passwordsError[1].hidden = true;
    password.style.borderColor = borderColorOnBlur;
    passwordConfirm.style.borderColor = borderColorOnBlur;
  } else {
    personalInfo.password = false;
    passwordsError[0].hidden = false;
    passwordsError[1].hidden = false;
    password.style.borderColor = errorColor;
    passwordConfirm.style.borderColor = errorColor;
  }
}

function validateEmail(email) {
  const mailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailRegexpStrong = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
  const RFC22 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const michaelRushton = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/di;

  return mailRegexpStrong.test(email);
}

function validateForm(formFields) {
  for (let isFieldValid in formFields) {
    if (!formFields[isFieldValid]) {
      return false;
    }
  }
  return true;
}
