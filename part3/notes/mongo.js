const mongoose = require('mongoose')

// for terminal line, "argv" length should be 3 or more
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// password is written in terminal
const password = process.argv[2]


/*

*/
const url = `mongodb+srv://dtstimdjumaniyazov_db_user:${password}@cluster0.ighrj1c.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

// правило как должно попасть с JS to MongoDB
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})


const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})