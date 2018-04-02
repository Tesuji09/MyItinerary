function createCard () {
  $('#create').click(event => {
    deSelectCards()
    $('.cards-list').append(`<div class="card selected">
      <form>
        <label>Location: <input class="location" type="text" placeholder="Location"></label><br>
				<label>Address: <input class="address" type="text" placeholder="Address"></label><br>
				<label>Start time: <input class="beginTime" type="time"></label><br>
				<label>End time: <input class="endTime" type="time"></label><br>
				<label>Notes<textarea class='notes'></textarea></label><br>
				<input type="button" value="Remove Card" class="delete">
      <form>
        </div>`)
    $('.card').last().data('selected', true)
    deleteCard()
    selectCard()
    toBottom()
    showSearchContainer()
  })
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
      <h2>${$('.location').eq(i).val()}<h2>
      <p>${$('.address').eq(i).val()}</p>
      <p>Begins at ${$('.beginTime').eq(i).val()}</p
      <p>Ends at ${$('.endTime').eq(i).val()}</p>
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
    console.log('this is working')
    $('.events').html(createFSElement())
    $('.itin-Title').html(`<h1>${$('#title').val()}</h1>`)
    $('.styled-itinerary').show()
  })
}

function deleteCard () {
  $('.delete').click(event => {
    const selectedCard = event.target.closest('.card')
    selectedCard.remove()
  })
}

function toggleSidebar() {
$('.showCC').click(event => {
  $('.card-container').toggle('slow')
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
