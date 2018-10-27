var markerList = []

function deleteMarkers() {
    for (let i=0; i<markerList.length; i++) {
        console.log("Deleting marker!")
    }
}

$(document).ready(function() {
    var platform = new H.service.Platform({
        'app_id': 'RXVZ8CRzHyoJN7X0yqsS',
        'app_code': 'i4tlCdUhdzbBK7sWkNcFhQ'
    })

    // Obtain the default map types from the platform object:
    var defaultLayers = platform.createDefaultLayers()

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('map'),
        defaultLayers.normal.map,
        {
            zoom: 13,
            center: {lat: 53.38297, lng: -1.4659}
        }
    )

    var marker = new H.map.Marker({lat: 53.38297, lng: -1.4659})
    map.addObject(marker)
    markerList.push()
})
