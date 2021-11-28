console.log();
/*  let str = 'asd4567';
    console.log(str.substr(0,9)); */
/*     console.log(login.length);
      console.log(login.substr(0,10)); */

document.querySelector('form').addEventListener('change', (event) => {
  if (event.target.matches('.login')) {
    let login = event.target.value;

    if (login.length > 10) {
      event.target.value = login.substr(0, 10);

      let highlightLogin = setInterval(function () {
        if (event.target.style.borderColor != 'red') {
          event.target.style.borderColor = 'red';
        }else{
            event.target.style.borderColor = '#E5E5E5';
        }
      }, 500);

      setTimeout(() => {
        clearInterval(highlightLogin);
      }, 5000);
    }
  }
});

document.querySelector('input[type="email"]').addEventListener('focus', (event) => {
    event.target.style.borderColor= 'aqua';
});
