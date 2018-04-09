function createCard () {
  $('#create').click(event => {
    deSelectCards()
    $('.cards-list').append(`<div class="card selected">
      <form>
        <label>Location: <input class="location" type="text" placeholder="Location"></label><br>
				<label>Address: <input class="address" type="text" placeholder="Address"></label><br>
				<label>Time: <input class="beginTime" type="time"></label><br>
				<label>Notes<textarea class='notes'></textarea></label><br>
				<input type="button" value="Remove Card" class="delete">
      <form>
        </div>`)
    setCardIndex()
    $('.card').last().data('selected', true)
    deleteCard()
    selectCard()
    toBottom()
    toggleSideBar()
  })
}

function setCardIndex(){
  $('.selected').data("cardIndex",$('.card').length-1)
}

function toBottom() {
  $('.card-container').animate({
   scrollTop: $('.cards-list').height() + $('.card-form').height()},
   'fast')
}
function showSearchContainer () {
  $('.search-container').show()
}

function hideSearchContainer() {
  $('.searchContainer').hide()
}

function createFSElement() {
  let elements = []
  for(let i = 0; i < $('.card').length; i++) {
    elements.push(`<div class='event'>
      <h1>${$('.location').eq(i).val()}</h1>
      <p>${$('.address').eq(i).val()}</p>
      <p>Begins at ${$('.beginTime').eq(i).val()}</p>
      <p>${$('.notes').eq(i).val()}</p>
      </div>`)
  }
  return elements
}

function hideFullScreen() {
  $('#js-hide-styled').click(event => {$('.styled-itinerary').hide()})
}

function toggleFullScreen () {
  $('#showFull').click(event => {
    $('.events').html(createFSElement())
    $('.itin-title').html(`<h1>${$('#title').val()}</h1>`)
    $('.styled-itinerary').show()
  })
}

function deleteCard () {
  $('.delete').click(event => {
    const selectedCard = $(event.target).closest('.card')
    if(selectedCard.data('markerIndex') !== undefined){
      removeDeletedCardsMarker(selectedCard)
    }
    selectedCard.remove()
    resetAllCardIndexes()
    renameMarkers()
  })
}

function removeDeletedCardsMarker(selectedCard) {
  const markerIndex = selectedCard.data("markerIndex")
  MARKERS[markerIndex].setMap(null)
  delete MARKERS[markerIndex]
}

function resetAllCardIndexes() {
  for (let i = 0; i < $('.cards-list').length; i++){
    $('.card').eq(i).data("cardIndex", i)

  }

}

function renameMarkers() {
  for (let i = 0; i < MARKERS.length; i++){
    const markerIndex = $(`.card`).eq(i).data('markerIndex')
    if(MARKERS[markerIndex] !== undefined){
      MARKERS[markerIndex].setLabel(`${i+1}`)
    }
  }
}

function toggleSideBar() {
  $('.search-container').toggle('fast')
}

function toggleOnClick () {
  $('.showCC').click(event => {
    toggleSideBar()
    })
}

function deSelectCards () {
  $('.card').attr('class', 'card notSelected')
}

function selectCard () {
  $('.location, .address, .beginTime, .endTime, .notes').focus(event => {
    deSelectCards()
    $(event.target).closest('.card').attr('class', 'card selected')
  })
}
