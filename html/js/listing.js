$(document).ready(function() {
    var searchField = localStorage.getItem("field")
    var searchValue = localStorage.getItem("value")

    var data = [
        {
            "field": searchField,
            "value": searchValue
        }
    ]

    console.log("TEST")
    console.log(searchField)
    console.log(searchValue)

    $.ajax({
        method: "POST",
        url: "https://us-central1-my-project-1510348200658.cloudfunctions.net/get-companies-slim-custom",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data) {
            buffer = ""

            var maxNum = 100
            if (data.length <= 100) {
                maxNum = data.length
            }

            for (var i=0; i<maxNum; i++) {
                buffer += "<tr>"
                buffer += "<td><a href='" + data[i].URI + "' target='_blank'>" + data[i].CompanyName + "</a></td>"
                buffer += "<td>" + data[i].RegAddressPostCode + "</td>"
                buffer += "<td>" + data[i].RegAddressPostTown + "</td>"
            }

            console.log("HELLO WORLD")
            console.log(searchField)
            console.log(searchValue)
            console.log(buffer)

            $("#table-body").html(buffer)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error: " + errorThrown + " - " + textStatus)
        }
    })
})
