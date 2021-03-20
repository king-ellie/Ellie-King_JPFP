const path = require('path')
const express = require('express')
const app = express()

const { syncAndSeed } = require('./db/db')

// app.use('/client', express.static(path.join(__dirname + '../client')))
app.use('/dist', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})


const init = async() => {
    try {
        await syncAndSeed()
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