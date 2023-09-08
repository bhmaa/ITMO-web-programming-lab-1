$(document).ready(function () {
    let form = document.querySelector('.js-form');
    let radio_group = document.getElementById("radio_group");

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let sending = true;
        let x = document.querySelector('input[name="x"]:checked');
        let y = form.querySelector('.y');
        let r = form.querySelector('.r');

        if (x == null) {
            radio_group.classList.add('error');
            sending = false;
        } else {
            radio_group.classList.remove('error');
        }

        if (!y.value || isNaN(y.value) || y.value < -5 || y.value > 3 || y.value.length > 12) {
            y.classList.add('error');
            sending = false;
        } else {
            y.classList.remove('error');
        }

        if (!r.value || isNaN(r.value) || r.value < 2 || r.value > 5 || r.value.length > 12) {
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
                    y: y.value,
                    r: r.value,
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