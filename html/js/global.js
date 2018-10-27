$(document).ready(function () {
    $("#top-search").click(function() {
        var searchTerm = $("#top-search-text").val()

        var data = [
            {
                "field": "CompanyName",
                "value": searchTerm
            }
        ]

        $.ajax({
            method: "POST",
            url: "https://us-central1-my-project-1510348200658.cloudfunctions.net/get-companies",
            dataType: "json",
            success: function(data) {
                alert("res")
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown)
            }
        })
    })
})
