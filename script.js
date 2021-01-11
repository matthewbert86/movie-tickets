/* select elements from DOM */

const container = document.querySelector('.container');
/* queryselectorAll grabs everything and puts it into a node list, which is similar to an array */
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

/* + will log movieSelect as a number instead of a string */
let ticketPrice = +movieSelect.value;

// Update ticket count and price based on seats selected
function updateSelectedCount() {
    // put selected seats into a node list
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    // get length of nodelist
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
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