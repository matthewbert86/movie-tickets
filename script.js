/* select elements from DOM */

const container = document.querySelector('.container');
/* queryselectorAll grabs everything and puts it into a node list, which is similar to an array */
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

/* + will log movieSelect as a number instead of a string */
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update ticket count and price based on seats selected
function updateSelectedCount() {
    // put selected seats into a node list
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats into array
    // Map through array
    // Return a new array of index to save the seats

    // map() is similar to forEach but returns an array
    const seatsIndex = [...selectedSeats].map(function(seat) {
        // return index of seats selected.
        // We need to get all of the seats and pass in current seats
        return[...seats].indexOf(seat);
    });

   // Save to local storage
    // wrap seatsIndex in JSON.stringify since it's an array
   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    // get length of nodelist
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    
}

// Get data from localStorage and populate UI
function populateUI() {
    // pull out selected seats from localStorage
        // JSON.parse will reverse what was done with JSON.stringify
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // Check to see if anything is in selectedSeats
    if(selectedSeats !== null && selectedSeats.length > 0) {
        // loop through each seat
        seats.forEach((seat, index) => {
            // if its greater than -1, that mean's something is there
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        // set the selectedMovieIndex
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    // setMovieData will save selected movie and price to localStorage
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

/* change seat class to selected when clicked */

container.addEventListener('click', e => {
    // bring to open seats
        // !e.target is used to make sure we dont taget occupied seats to be selected
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
    ) {
        // add selected class
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();