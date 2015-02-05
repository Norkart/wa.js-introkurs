var Norkart = {}; //definerer et "namespace" som vi kan holde oss innenfor

//JQuery-funksjon. Sørger for at koden 
//inne i funksjonen kjører først _etter_ at 
//alt er lastet inn i nettleseren.
$(document).ready(function() {
    console.log("ready!");

//starter kartmotoren (Leaflet med Norkart sine tilpasninger) 
//lagrer referanse til objektet i Norkart.map
    Norkart.map = new WebatlasMap('kart', {
        customer: "WA_studentkurs" //ved kommersiell bruk send epost til alexander.nossum@norkart.no
    });

//endrer senterpunkt til koordinatene og setter zoomnivå til 5
    Norkart.map.setView(new L.LatLng(64.0, 11.0), 5);

/*** Legge til markør  */
// //Lager en markør på et koordinatpar og legger til kartet.
//     var minMarker = L.marker(new L.LatLng(65.0, 10.0));
//     minMarker.addTo(Norkart.map);
//     minMarker.bindPopup("Her er det vann").openPopup();

//chainet (kortversjon) blir det:
    //L.marker(new L.LatLng(59.0, 10.5)).addTo(Norkart.map).bindPopup("Her er det fjell").openPopup();

/*** GeoLocation */
// //trigger HTML5 GeoLocation via Leaflet
//     Norkart.map.locate({
//         setView: false,
//         maxZoom: 16,
//         watch: true
//     });

//     Norkart.gpsTrack = L.polyline([], {color: 'red'}).addTo(Norkart.map);
// //definerer funksjon som skal kjøres ved event nedenfor
//     function onLocationFound(e) {
//         var radius = e.accuracy / 2;
//         if(typeof Norkart.gpsMarker === 'object') {
//             Norkart.map.removeLayer(Norkart.gpsMarker);
//             Norkart.map.removeLayer(Norkart.gpsCircle); 
//         }
        
//         Norkart.gpsTrack.addLatLng(e.latlng);

// //Lager en ny markør med koordinater (latlng) som fått igjennom "locationfound"-eventet
//         Norkart.gpsMarker = L.marker(e.latlng).addTo(Norkart.map)
//             .bindPopup("Du er innenfor " + radius + " meter av dette punktet.").openPopup();

// //lager en sirkel med senter i koordinaten og radius = nøyaktighet/2
//         Norkart.gpsCircle = L.circle(e.latlng, radius).addTo(Norkart.map);
//     }
// //definerer funksjon som skal kjøres ved event nedenfor
//     function onLocationError(e) {
//         alert(e.message);
//     }

// //setter opp "eventlisteners" som lytter på "locationfound" og "locationerror"
//     Norkart.map.on('locationfound', onLocationFound);
//     Norkart.map.on('locationerror', onLocationError);


/*** Asynkron innlasting av en ekstern geojson-fil med dynamiske farger og dynamisk popup*/
//     var url = 'https://gist.githubusercontent.com/alexanno/c5e452f34fd42e6642c9/raw/57b1065bc435a3f39a0cbccd1228abc9f9d2ab04/pubs_norway.geojson';
//     $.getJSON(url, function(data) {
//         Norkart.punktliste = [];
// //vi har fått data tilbake fra AJAX-requesten
// //oppretter et geojson-lag fra Leaflet som vi lagrer i namespacet vårt og legger til kartet vårt.
//         Norkart.geojsonLag = L.geoJson(data, {
//             onEachFeature: hverFeature
//         });

// //legger kartlaget til i LayerControl for å la brukeren slå av og på kartlaget.
//         Norkart.map.LayerControl.addOverlay(Norkart.geojsonLag,"Restauranter i Norge");

//         function hverFeature(feature, layer) {
//             layer.bindPopup(feature.properties.name);

// //lager en punktliste av alle punktene - vi skal bruke denne senere
//             Norkart.punktliste.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
//         }
// //Setter igang ulike typer visualiseringer
//         lagVisualiseringer();
//     });


/** Andre visualiseringer av punktlaget */
//     function lagVisualiseringer() {
// //start opp heatmap-motoren - vi bruker punktlisten vi lagde ovenfor og setter parametere
//         var heatmapLayer = L.heatLayer(Norkart.punktliste, {
//             radius: 110
//         });

// //Legg til heatmap til layer control
//         Norkart.map.LayerControl.addOverlay(heatmapLayer, "Heatmap");

// //start opp maskeringsmotoren og sett nødvendige parametere
//         var coverageLayer = new L.TileLayer.MaskCanvas({
//             'opacity': 0.8,
//             radius: 500,
//             useAbsoluteRadius: true,
//             'attribution': ''
//         });

// //knytt punktlisten vår til maskeringsmotoren
//         coverageLayer.setData(Norkart.punktliste);
// //legg til maskering som eget lag i layer control
//         Norkart.map.LayerControl.addOverlay(coverageLayer, "Dekning");

// //start clustermotoren
//         var markers = new L.MarkerClusterGroup();

// //legg til eiendommer-laget til clustermotoren og legg til kartet
//         markers.addLayer(Norkart.geojsonLag).addTo(Norkart.map);
// //legg også til som eget lag i layer control
//         Norkart.map.LayerControl.addOverlay(markers, "Kluster");    
//     }

});