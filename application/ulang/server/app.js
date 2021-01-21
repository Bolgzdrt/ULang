const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
// const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const { authRouter } = require('./routes/authRoutes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env.local' })
} else {
  require('dotenv').config({ path: './.env.production' })
}

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const PORT = process.env.PORT || 8081
const dbUri = process.env.DBURI
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch((err) => console.error(err))

// app.get('*', checkUser)
// app.all('/', requireAuth)
app.use(authRouter)
