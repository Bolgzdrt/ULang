const express = require('express')
const { authRouter } = require('./routes/authRoutes')

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const PORT = 8081
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))