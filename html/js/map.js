var group
var map

function placePostCodeMarker(postCode, name) {
    $.get("https://api.postcodes.io/postcodes/"+postCode.replace(/\s+/g, ''), function(res) {
        if (res.result.latitude && res.result.longitude) {
            var marker = new H.map.Marker({lat: res.result.latitude, lng: res.result.longitude})
            marker.setData("<div>" + name + "</div>")
            group.addObject(marker)
        }
    })
}

function deleteMarkers() {
    group.removeAll()
}

$(document).ready(function() {
    $("#map-search").click(function() {
        deleteMarkers()

        var searchTerm = $("#map-search-text").val()

        var data = [
            {
                "field": "RegAddressPostTown",
                "value": $("#map-search-city").val()
            },
            {
                "field": "SICCodeSicText_1",
                "value": $("#map-search-type").val()
            }
        ]

        $.ajax({
            method: "POST",
            url: "https://us-central1-my-project-1510348200658.cloudfunctions.net/get-companies-slim",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(data) {
                for (var i=0; i<data.length; i++) {
                    placePostCodeMarker(data[i].RegAddressPostCode)
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown + " - " + textStatus)
            }
        })
    })

    $.get("https://europe-west1-my-project-1510348200658.cloudfunctions.net/get-metadata", function(res) {
        var buffer = ""
        for (var i=0; i<res.length; i++) {
            buffer += "<option value='" + res[i] + "'>" + res[i] + "</option>"
        }
        $("#map-search-type").append(buffer)
    })

    $.get("https://europe-west1-my-project-1510348200658.cloudfunctions.net/get-cities", function(res) {
        var buffer = ""
        for (var i=0; i<res.length; i++) {
            buffer += "<option value='" + res[i] + "'>" + res[i] + "</option>"
        }
        $("#map-search-city").append(buffer)
    })

    var platform = new H.service.Platform({
        'app_id': 'RXVZ8CRzHyoJN7X0yqsS',
        'app_code': 'i4tlCdUhdzbBK7sWkNcFhQ'
    })

    // Obtain the default map types from the platform object:
    var defaultLayers = platform.createDefaultLayers()

    // Instantiate (and display) a map object:
    map = new H.Map(
        document.getElementById('map'),
        defaultLayers.normal.map,
        {
            zoom: 10,
            center: {lat: 53.38297, lng: -1.4659}
        }
    )
    //
    // var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))
    // var ui = H.ui.UI.createDefault(map, defaultLayers)
    //
    // var mapSettings = ui.getControl('mapsettings');
    // var zoom = ui.getControl('zoom');
    // var scalebar = ui.getControl('scalebar');
    // var panorama = ui.getControl('panorama');
    //
    // panorama.setAlignment('top-right');
    // mapSettings.setAlignment('top-left');
    // zoom.setAlignment('top-left');
    // scalebar.setAlignment('top-left');
    //
    group = new H.map.Group()
    map.addObject(group)
    // group.addEventListener("tap", function(evt) {
    //     var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
    //         content: evt.target.getData()
    //     })
    //     ui.addBubble(bubble)
    // }, false)
})
