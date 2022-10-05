function validate() {
  let sending = true;
  let form = document.querySelector('.js-form');
  let x = document.querySelector('input[name="x"]:checked');
  let y = form.querySelector('.y');
  let r = form.querySelector('.r');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const x_errors = form.querySelectorAll('.text-error');
    for (let i = 0; i < x_errors.length; i++) {
      x_errors[i].remove();
    }

    if (x == null) {
      let err = document.createElement('div');
      err.className = 'text-error';
      err.style.color = 'red';
      err.innerHTML = 'you didnt\'t choose the value of x!';
      document.getElementById('radio_group').after(err);
      sending = false;
    }

    if (!y.value || isNaN(y.value) || y.value < -5 || y.value > 3) {
      y.classList.add('error');
      sending = false;
    } else {
      y.classList.remove('error');
    }
    if (!r.value || isNaN(r.value) || r.value < 2 || r.value > 5) {
      r.classList.add('error');
      sending = false;
    } else {
      r.classList.remove('error');
    }

    if (sending) {
      $.ajax({
        url: 'server.php',
        method: "POST",
        dataType: "html",
        data: {
          x: $('input[name="x"]:checked').val(),
          y: y.value,
          r: r.value,
          timezone: new Date().getTimezoneOffset(),
        },
        success: function (data) {
          $(".results>tbody").append(data);
        },
        error: function (error) {
          console.log(error);
        },
      });
      $(".y").val("");
      $(".r").val("");
      $('input[name="x"]').prop('checked', false);
    }
  });
}