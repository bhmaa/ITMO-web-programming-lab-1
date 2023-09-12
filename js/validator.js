$(document).ready(function () {
    let form = document.querySelector('.js-form');
    let radio_group = document.getElementById("radio_group");

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let sending = true;
        let x = document.querySelector('input[name="x"]:checked');
        let y = form.querySelector('.y');
        let yValue = y.value.replace(',', '.');
        let r = form.querySelector('.r');
        let rValue = r.value.replace(',', '.');

        if (x == null) {
            radio_group.classList.add('error');
            sending = false;
        } else {
            radio_group.classList.remove('error');
        }

        if (!yValue || isNaN(yValue) || yValue < -5 || yValue > 3 || yValue.length > 12) {
            y.classList.add('error');
            sending = false;
        } else {
            y.classList.remove('error');
        }

        if (!rValue || isNaN(rValue) || rValue < 2 || rValue > 5 || rValue.length > 12) {
            r.classList.add('error');
            sending = false;
        } else {
            r.classList.remove('error');
        }

        if (sending) {
            $.ajax({
                url: './php/server.php',
                method: "POST",
                dataType: "html",
                data: {
                    x: $('input[name="x"]:checked').val(),
                    y: yValue,
                    r: rValue,
                    timezone: new Date().getTimezoneOffset()
                },
                success: function (data) {
                    $("#table_body").append(data);
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    });
});