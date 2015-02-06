var Norkart = {}; //definerer et "namespace" som vi kan holde oss innenfor

//JQuery-funksjon. Sørger for at koden 
//inne i funksjonen kjører først _etter_ at 
//alt er lastet inn i nettleseren.
$(document).ready(function() {
    //starter kartmotoren (Leaflet med Norkart sine tilpasninger) 
    //lagrer referanse til objektet i Norkart.map
    Norkart.map = new WebatlasMap('kart', {
        customer: "WA_studentkurs" //ved kommersiell bruk send epost til alexander.nossum@norkart.no
    });
    
    Norkart.sidebar = L.control.sidebar('sidebar').addTo(Norkart.map);

    //endrer senterpunkt til koordinatene og setter zoomnivå til 5
    //Norkart.map.setView(new L.LatLng(64.0, 11.0), 5);


    /*** Asynkron innlasting av json-filen
        filen ligger ikke ute med CORS-støtte, så vi må lagre den lokalt eller 
        ha en proxy - som fks corsproxy.com
    */
    //var url = 'js/barnehager.json'; //lokal lagring
    var url = "http://www.corsproxy.com/www.barnehager.oslo.kommune.no/bhgmaps/50546.json";
    $.getJSON(url, function(data) {
        //vi har fått data tilbake fra AJAX-requesten
        //oppretter et layergroup som kan holde alle marker-layerne
        Norkart.markerlayer = L.layerGroup();

        //går igjennom alle objektene (barnehagene) i listen
        for(var k in data.b) {
            var bhg = data.b[k];
            var marker = L.marker([bhg.la, bhg.lo]).bindPopup(bhg.t);

            Norkart.markerlayer.addLayer(marker);
        }

        //start clustermotoren
        var markers = new L.MarkerClusterGroup();
        //legg til barnehage-laget til clustermotoren og legg til kartet
        markers.addLayer(Norkart.markerlayer).addTo(Norkart.map);
        //legg også til som eget lag i layer control
        Norkart.map.LayerControl.addOverlay(markers, "Barnehager i Oslo");
    });
});