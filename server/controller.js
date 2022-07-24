require("dotenv").config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect:"postgres", 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getVenues : (req, res) => {
        sequelize.query(`
        select *
        from venues;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err)) 
    },
    createEvent : (req, res) => {
        let { name, venueId, date} = req.body
        sequelize.query(`
        insert into events(name, date, venue_id)
        values ('${name}', '${date}', '${venueId}')
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getEvents: (req, res) => {
        sequelize.query(`
        select event_id, event.name as band, date, location.venue_id, location.name as venue
        from events as event
        join venues as location
        on event.venue_id = location.venue_id;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    deleteEvent : (req, res) => {
        let { id } = req.params
        sequelize.query(`
        delete from events
        where event_id = ${id} 
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    createTicket : (req, res) => {
        let { band, location, date} = req.body
        sequelize.query(`
        insert into tickets(band, location, date)
        values ('${band}', '${location}', '${date}')
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    getTickets : (req, res) => {
        sequelize.query(`
        select *
        from tickets`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    deleteTickets : (req, res) => {
        let { id } = req.params
        sequelize.query(`
        delete from tickets
        where id = ${id}
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}