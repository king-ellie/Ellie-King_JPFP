const path = require('path')
const express = require('express')
const app = express()

const { db, models: { Campus, Student } } = require('./db/db')

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})


// API ROUTES
app.get('/api/campuses', async (req, res, next) => {
    const campuses = await Campus.findAll({
        include: Student
    })
    res.send(campuses)
})

app.get('/api/campuses/:id', async (req, res, next) => {
    const campus = await Campus.findAll({
        where: {
            id: req.params.id
        },
        include: Student
    })
    res.send(campus)
})

app.get('/api/students', async (req, res, next) => {
    const students = await Student.findAll({
        include: Campus
    })
    res.send(students)
})

app.get('/api/students/:id', async (req, res, next) => {
    const student = await Student.findAll({
        where: {
            id: req.params.id
        },
        include: Campus
    })
    res.send(student)
})


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