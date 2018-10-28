$(document).ready(function () {
    $("#top-search").click(function() {
        localStorage.setItem("field", $("#top-search-type").val())
        localStorage.setItem("value", $("#top-search-text").val())

        window.location = "listing.html"
    })
})
