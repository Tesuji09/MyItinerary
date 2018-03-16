function getLatLng() {

}

 function initMap() {
        let map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -25.363, lng: 131.044},
          zoom: 4
        });
      }

function showApp() { 
 $('#hideIntro').click( () => {
	$('.introduction').fadeOut(1200);
});
}

$(showApp)   