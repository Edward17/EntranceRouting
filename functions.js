var o_nominatim_results;
var o_overpass_results;

function o_loadNominatimResults() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var response = xmlhttp.responseXML;
                o_nominatim_results = response.getElementsByTagName('place');

                var result = '';
                for (i=0; i < o_nominatim_results.length; i++) {
                    result = result + '<p><button onclick="o_loadOverpassResults(' + i + ')">Select</button> ' + o_nominatim_results[i].getAttribute('display_name') + '</p>';
                }

//                alert(xmlhttp.responseText);
                document.getElementById("o_nominatim_results").innerHTML = result;
            }
        }
    };

    var request = 'http://nominatim.openstreetmap.org/search?q=' + document.getElementById('o_place').value  + '&format=xml';
    xmlhttp.open('GET', request, true);
    xmlhttp.send();
}

function o_loadOverpassResults(i) {
    document.getElementById("o_nominatim_results").innerHTML = o_nominatim_results[i].getAttribute('display_name');
//    alert(nominatim_results[i].getAttribute('osm_type') + '(' + nominatim_results[i].getAttribute('osm_id') + ')');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var response = xmlhttp.responseXML;
                o_overpass_results = response.getElementsByTagName('node');

                var result = '';
                for (i=0; i < o_overpass_results.length; i++) {
                    result = result + '<p><button onclick="o_setSelectedNode(' + i + ')">Select</button> ';

                    var tags = o_overpass_results[i].getElementsByTagName('tag');
                    for (j=0; j < tags.length; j++) {
                        result = result + tags[j].getAttribute('k') + ' = ' + tags[j].getAttribute('v') + '</br>';
                    }
                    result = result + '</p>';
                }
//            alert(xmlhttp.responseText);
            document.getElementById("o_overpass_results").innerHTML = result;
            }
        }
    };

    var request = 'http://overpass-api.de/api/interpreter?data=' + o_nominatim_results[i].getAttribute('osm_type') + '(' + o_nominatim_results[i].getAttribute('osm_id') + ');%20%3E%20-%3E%20.a;%20node.a[entrance];%20out%20body%20qt;';
    xmlhttp.open('GET', request, true);
    xmlhttp.send();
}

function o_setSelectedNode(number) {
        setLatLonOne(o_overpass_results[number].getAttribute('lat'), o_overpass_results[number].getAttribute('lon'));
        document.getElementById("node_one").innerHTML = o_overpass_results[number].getAttribute('lat') + ',' + o_overpass_results[number].getAttribute('lon');
}

var t_nominatim_results;
var t_overpass_results;

function t_loadNominatimResults() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var response = xmlhttp.responseXML;
                t_nominatim_results = response.getElementsByTagName('place');

                var result = '';
                for (i=0; i < t_nominatim_results.length; i++) {
                    result = result + '<p><button onclick="t_loadOverpassResults(' + i + ')">Select</button> ' + t_nominatim_results[i].getAttribute('display_name') + '</p>';
                }

//                alert(xmlhttp.responseText);
                document.getElementById("t_nominatim_results").innerHTML = result;
            }
        }
    };

    var request = 'http://nominatim.openstreetmap.org/search?q=' + document.getElementById('t_place').value  + '&format=xml';
    xmlhttp.open('GET', request, true);
    xmlhttp.send();
}

function t_loadOverpassResults(i) {
    document.getElementById("t_nominatim_results").innerHTML = t_nominatim_results[i].getAttribute('display_name');
//    alert(nominatim_results[i].getAttribute('osm_type') + '(' + nominatim_results[i].getAttribute('osm_id') + ')');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var response = xmlhttp.responseXML;
                t_overpass_results = response.getElementsByTagName('node');

                var result = '';
                for (i=0; i < t_overpass_results.length; i++) {
                    result = result + '<p><button onclick="t_setSelectedNode(' + i + ')">Select</button> ';

                    var tags = t_overpass_results[i].getElementsByTagName('tag');
                    for (j=0; j < tags.length; j++) {
                        result = result + tags[j].getAttribute('k') + ' = ' + tags[j].getAttribute('v') + '</br>';
                    }
                    result = result + '</p>';
                }
//            alert(xmlhttp.responseText);
            document.getElementById("t_overpass_results").innerHTML = result;
            }
        }
    };

    var request = 'http://overpass-api.de/api/interpreter?data=' + t_nominatim_results[i].getAttribute('osm_type') + '(' + t_nominatim_results[i].getAttribute('osm_id') + ');%20%3E%20-%3E%20.a;%20node.a[entrance];%20out%20body%20qt;';
    xmlhttp.open('GET', request, true);
    xmlhttp.send();
}

function t_setSelectedNode(number) {
        setLatLonTwo(t_overpass_results[number].getAttribute('lat'), t_overpass_results[number].getAttribute('lon'));
        document.getElementById("node_two").innerHTML = t_overpass_results[number].getAttribute('lat') + ',' + t_overpass_results[number].getAttribute('lon');
}

var lat_o, lon_o;
var lat_t, lon_t;

function setLatLonOne(la_o, lo_o) {
    lat_o = la_o;
    lon_o = lo_o;
//    alert(lat_o + lon_o);
}

function setLatLonTwo(la_t, lo_t) {
    lat_t = la_t;
    lon_t = lo_t;
//    alert(lat_t + lon_t);
}

function generateRoutes() {
    var result = '';
    result = result + '<a href="http://www.openstreetmap.org/directions?engine=graphhopper_bicycle&route=' + lat_o + ',' + lon_o + ';' + lat_t + ',' + lon_t + '">Bicycle (GraphHopper)</a><br>';
    result = result + '<a href="http://www.openstreetmap.org/directions?engine=mapquest_bicycle&route=' + lat_o + ',' + lon_o + ';' + lat_t + ',' + lon_t + '">Bicycle (MapQuest)</a><br>';
    result = result + '<a href="http://www.openstreetmap.org/directions?engine=mapquest_car&route=' + lat_o + ',' + lon_o + ';' + lat_t + ',' + lon_t + '">Car (MapQuest)</a><br>';
    result = result + '<a href="http://www.openstreetmap.org/directions?engine=osrm_car&route=' + lat_o + ',' + lon_o + ';' + lat_t + ',' + lon_t + '">Car (OSRM)</a><br>';
    result = result + '<a href="http://www.openstreetmap.org/directions?engine=graphhopper_foot&route=' + lat_o + ',' + lon_o + ';' + lat_t + ',' + lon_t + '">Foot (GraphHopper)</a><br>';
    result = result + '<a href="http://www.openstreetmap.org/directions?engine=mapquest_foot&route=' + lat_o + ',' + lon_o + ';' + lat_t + ',' + lon_t + '">Foot (MapQuest)</a><br>';

    document.getElementById('routes').innerHTML = result;
}