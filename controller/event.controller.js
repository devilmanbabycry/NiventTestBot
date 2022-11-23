const db = require('../db')

class EventController {
    // создаёт мероприятие
    async createEvent(req, res) {
        const {name, info, date, time, address, subject} = req.body
        const newEvent = await db.query(
            'INSERT INTO event (name, info, date, time, address, subject) values ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, info, date, time, address, subject]
        )

        res.json(newEvent.rows[0])
    }
    // возвращает все мероприятия
    async getEvent(req, res) {
        const events = await db.query('SELECT * FROM event')

        res.json(events.rows)
    }
    // везвращает мероприятие по идентефикатору
    async getOneEvent(req, res) {
        const subject = req.params.subject
        const events = await db.query('SELECT * FROM event where subject = $1', [subject])

        res.json(events.rows)
    }
    // обновлять данные о мероприятии
    async updateEvent(req, res) {
        const {id, name, info, date, time, address, subject} = req.body
        const event = await db.query(
            'UPDATE event set name = $1, info = $2, date = $3, time = $4, address = $5, subject = $6 where id = $7 RETURNING *',
            [name, info, date, time, address, subject, id]
        )

        res.json(event.rows[0])
    }
    // удалить мероприятие
    async deleteEvent(req, res) {
        const id = req.params.id
        const events = await db.query('DELETE FROM event where id = $1', [id])

        res.json(events.rows)
    }
}

module.exports = new EventController()