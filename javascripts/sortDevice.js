jQuery(document).ready(function() {
    $("body").on("click", ".sortDevice", function() {
        var value = $(this).data("value");
        SortDevice(value);
    });
});

function SortDevice(value) {
    $.ajax({
        url: "devices/" + value,
        contentType: "application/json",
        method: "POST",
        success: function(devices) {
            $('#device div').remove();
            let str = "";
            devices.forEach(element => {
                str += "<div id='" + element.id + "' class='device ";
                if (element.condition == "0") {
                    str += "off";
                } else {
                    str += "on";
                }
                str += "' data-value='" + element.conditionА + "'> <div class='img ";
                if (element.condition == "0") {
                    str += "imgOFF ";
                } else {
                    str += "imgON ";
                }
                switch (element.type) {
                    case 'Розетки':
                        str += "soket";
                        break;
                    case 'Климат-контроль':
                        str += "climate_control";
                        break;
                    case 'Солнцезащитные конструкции':
                        str += "jalousie";
                        break;
                    case 'Бытовые приботы':
                        str += "teapot";
                        break;
                    case 'Освещение':
                        str += "bulb";
                        break;
                }
                str += "'> </div>";
                str += "<h3>" + element.login + "</h3>";
                str += "<p>" + element.type + " | " + element.room + "</p>";
                str += "<a onclick = 'link(" + '"' + "/edit/:" + element.id + '"' + ")'>Редактировать устройство</a><br>";
                str += "<a class='deleteDevice' data-id=" + element.id + ">Удалить устройство</a>";
                str += "</div>";
            });
            $("#device").append(str);
        }
    })
}