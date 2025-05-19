var mar = null;

function set_position(lat, lon) {
    var from_projection = new OpenLayers.Projection("EPSG:4326");
    var to_projection = new OpenLayers.Projection("EPSG:900913");
    return new OpenLayers.LonLat(lon, lat).transform(from_projection, to_projection);
}

function handler(position, message) {
    var popup = new OpenLayers.Popup.FramedCloud("Popup", position, null, message, null, true);
    map.addPopup(popup);
}

function add_marker(position, message) {
    if (mar) markers.removeMarker(mar);
    
    mar = new OpenLayers.Marker(position);
    markers.addMarker(mar);
    mar.events.register('mousedown', mar, function(evt) {
        handler(position, message);
    });
    map.setCenter(position, 12);
}

map = new OpenLayers.Map("Map");
var mapnik = new OpenLayers.Layer.OSM();
map.addLayer(mapnik);

var markers = new OpenLayers.Layer.Markers("Markers");
map.addLayer(markers);

var position = set_position(35.3053121, 25.0722869);
add_marker(position, "CSD");