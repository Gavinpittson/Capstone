

const form = document.querySelector('form')
const venueSelect = document.querySelector('#venue-select')
const nameInput = document.querySelector('#name-input')
const dateInput = document.querySelector('#date-input')

function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1 || dateInput.value < 1 ) {
        alert ('Unsufficent data provided')
        return
    }

    let body = {
        name: nameInput.value,
        venueId : +venueSelect.value,
        date: dateInput.value
    }

    axios.post('http://localhost:4004/events', body)
    .then(() => {
        venueSelect.value = 1
        nameInput.value = ''
    })
       
    
}

function getVenues() {
    axios.get('http://localhost:4004/venues')
        .then(res => {
            res.data.forEach(venues => {
                const option = document.createElement('option')
                option.setAttribute('value', venues['venue_id'])
                option.textContent = venues.name
                venueSelect.appendChild(option)
            })
        })
}

getVenues()
form.addEventListener('submit', handleSubmit)