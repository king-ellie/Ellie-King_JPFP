const path = require('path')
const express = require('express')
const app = express()

const { db, models: { Campus, Student } } = require('./db/db')

// app.use('/client', express.static(path.join(__dirname + '../client')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

// API ROUTES - CURRENT PROBLEM: data is sent the first time i hit the endpoint. But if i change my code, save, and refresh, the endpoint shows an empty array and the instances are dropped from the database. something with seeding?
app.get('/api/campuses', async (req, res, next) => {
    const campuses = await Campus.findAll()
    res.send(campuses)
})

// app.get('/api/students', async (req, res, next) => {
//     res.send(await Student.findAll())
// })


const init = async() => {
    try {
        await db.sync()
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`
            Listening on port ${port}

            http://localhost:${port}/
        `))
    }
    catch(error) {
        console.log('SERVER INIT ERROR: ', error)
    }
}
init()