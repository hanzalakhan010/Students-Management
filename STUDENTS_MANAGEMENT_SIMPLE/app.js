import express from 'express'
import { createStudent, getAllStudents, getStudentById, searchStudentByName, updateStudentById } from './StudentsCRUD.js'
import { fileURLToPath } from 'url'
import path from 'path'
const app = express()


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'assets')))





app.get('/students', (req, res) => {
    res.render('allStudents', { students: req.query?.search ? searchStudentByName(req.query.search) : getAllStudents(), search: req.query?.search })
})

app.post('/students', (req, res) => {
    const id = createStudent(req.body)
    res.redirect(`/student/${id}`)
})

app.get('/editStudent/:id', (req, res) => {
    const student = getStudentById(req?.params?.id)
    res.render('editStudent', { student })
})
app.post('/editStudent/:id', (req, res) => {
    const student_id = req?.params?.id
    if (student_id) {
        if (updateStudentById(student_id, req.body)) {
            res.redirect(`/student/${student_id}`)
        }
        else {
            res.send('Error updating student')
        }
    }
    else {
        res.send('NOT FOUND')
    }
})
app.get('/student/:id', (req, res) => {
    const student = getStudentById(req?.params?.id)
    if (student) {
        res.render('studentProfile', { student })
    } else {
        res.send('NOT FOUND')
    }
})
app.get('/students/new', (req, res) => {
    res.render('newStudent')
})


app.get('/login', (req, res) => {
    console.log('debug 2')
    res.render('login', {})
})

app.post('/login', (req, res) => {
    if (req.body?.username == 'admin' && req.body?.password == '1234') {
        res.redirect('/students')
    }
    else {
        res.redirect('/login')
    }
})
app.get('/logout', (req, res) => {
    loggedIn = false
    res.redirect('/login')
})

app.listen(3000, '0.0.0.0', () => { console.log('Listening on port 3000') })