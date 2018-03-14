
function hideIntro() {
	$('header').fadeOut(1200,complete)
}

function showApp() { 
 $('#hideIntro').click(hideIntro())
}

$(showApp)   