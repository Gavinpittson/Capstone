



const eventContainer = document.querySelector('#event-container')
const ticketContainer = document.querySelector('#ticket-container')

function getEvents() {
    eventContainer.innerHTML = ''

    axios.get('http://localhost:4004/events')
    .then(res => {
        res.data.forEach(elem => {
            let eventCard = `<div class= "event-card">
            <h3>${elem.band}</h3>
            <h3>${elem.venue}, ${elem.date}</h3>
            <button onclick="deleteEvent(${elem['event_id']})">Ignore</button>
            <button onclick="ticketCard(['${elem.band}','${elem.venue}','${elem.date}']);getTickets()">Buy Ticket</button>
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

// function ticketCard(arr) {
    
    
    
//     let ticketCard = `<div class = "ticket-card">
//     <h3>${arr[0]}</h3>
//     <h3>${arr[1]}</h3>
//     <h3>${arr[2]}</h3>

//     </div>`
    
//     ticketContainer.innerHTML += ticketCard

//     alert("ticket bought!")
// }


function ticketCard(arr) {
    
    let infoOne = arr[0]
    let infoTwo = arr[1]
    let infoThree = arr[2]
    
    
    
    
    let body = {
        band : infoOne,
        location: infoTwo,
        date : infoThree
    }

    axios.post(`http://localhost:4004/tickets`, body).then(alert("ticket bought!"))
}

function getTickets() {
    ticketContainer.innerHTML = ''
    axios.get('http://localhost:4004/tickets')
    .then(res => {
        
        res.data.forEach(elem => {
            let ticketCard = `<div class = "ticket-card">
            <h3 id='ticket-id'>${elem.band}</h3>
            <h3 id='ticket-id'>${elem.location}</h3>
            <h3 id='ticket-id'>${elem.date}</h3>
            <h3 id='ticket-id'>Ticket Id: ${Math.floor(Math.random() * 99999999) + 10000000} </h3>
            <button onclick="deleteTicket(${elem['id']})">Refund</button>
            `

            ticketContainer.innerHTML += ticketCard
            
        })

        
    })
}

function deleteTicket(id) {
    axios.delete(`http://localhost:4004/tickets/${id}`)
    .then(() => getTickets())
    .catch(err => console.log(err))
}


getEvents()
getTickets()


let today = new Date();

let newDate = (today.getMonth()+1)+'/'+today.getDate() + '/' + today.getFullYear();

let date = document.getElementById('date')

date.textContent = newDate