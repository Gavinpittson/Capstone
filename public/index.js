


const eventContainer = document.querySelector('#event-container')
const ticketContainer = document.querySelector('#ticket-container')

function getEvents() {
    eventContainer.innerHTML = ''

    axios.get('http://localhost:4004/events')
    .then(res => {
        res.data.forEach(elem => {
            let eventCard = `<div class= "event-card">
            <h2>${elem.band}</h2>
            <h3>${elem.venue}, ${elem.date}</h3>
            <button onclick="deleteEvent(${elem['event_id']})">Ignore</button>
            <button onclick="ticketCard(['${elem.band}','${elem.venue}','${elem.date}'])">Buy Ticket</button>
            </div>

            `

            eventContainer.innerHTML += eventCard
        })
    })
}

function deleteEvent(id) {
    axios.delete(`http://localhost:4004/events/${id}`)
    .then(() => getEvents())
    .catch(err => console.log(err))
}

function ticketCard(arr) {
    
    
    
    let ticketCard = `<div class = "ticket-card">
    <h3>${arr[0]}</h3>
    <h3>${arr[1]}</h3>
    <h3>${arr[2]}</h3>

    </div>`
    
    ticketContainer.innerHTML += ticketCard
}


getEvents()