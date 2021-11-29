document.querySelectorAll('input').forEach(function (inputNode) {
  // focus event
  inputNode.onfocus = function () {
    if (this.style.borderColor != 'red') this.style.borderColor = 'aqua';
  };

  // blur event
  inputNode.onblur = function () {
    if (this.style.borderColor != 'red') this.style.borderColor = '#E5E5E5';
  };

  // oninput event
  let errorDisplayDuration = null;
  inputNode.oninput = function () {
    // handler for the login field
    if (this.matches('.login')) {
      let login = this.value;

      if (login.length > 10) {
        this.value = login.substr(0, 10);

        let loginError = document.querySelector('.loginError');
        if (!loginError.hidden) {
          clearTimeout(errorDisplayDuration);
        }

        loginError.hidden = false;
        inputNode.style.borderColor = 'red';

        errorDisplayDuration = setTimeout(() => {
          loginError.hidden = true;
          inputNode.style.borderColor = 'aqua';
        }, 2000);
      }
    }

    // handler for the password field
    let passwordError = document.querySelectorAll('.passwordError');
    if (this.matches('.password')) {
      let password = document.querySelectorAll('.password');
      if ((password[0].value != password[1].value) && (password[0].value !== false) && (password[1].value !== false)) {
        highlightError(password[0]);
        highlightError(password[1]);

        passwordError[0].hidden = false;
        passwordError[1].hidden = false;
      } else {
        passwordError[0].hidden = true;
        passwordError[1].hidden = true;
      }
    }
  };

  function highlightError(node) {
    let highlight = setInterval(function () {
      if (node.style.borderColor != 'red') {
        node.style.borderColor = 'red';
      } else {
        node.style.borderColor = '#E5E5E5';
      }
    }, 300);

    setTimeout(() => {
      clearInterval(highlight);
      node.style.borderColor = '#E5E5E5';
    }, 3100);
  }
});
