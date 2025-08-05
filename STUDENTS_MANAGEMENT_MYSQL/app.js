import express from "express"

import { addStudent, getAllStudents, getStudentById } from './student_crud.js'
const app = express()
app.set('view engine', "ejs")

app.use(express.static("assets"))
app.use(express.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    res.render('allStudent', { students: await getAllStudents() })
})
app.get('/student/:id', async (req, res) => {
    const student = await getStudentById(req.params?.id)
    if (!student) return res.send('Student not found')
    
    res.render("studentProfile", { "student": student[0] })
})


app.get('/newstudent', (req, res) => {
    console.log('debug')
    res.render('newStudent')
})
app.post('/newstudent', async (req, res) => {
    const { name, email, password } = req.body
    // try {
    const student_id = await addStudent(name, email, password)
    res.redirect(`/student/${student_id}`)
    // }
    // catch {
    //     res.send('Error adding student')
    // }

})



app.listen(3000, () => { console.log('Server running on port 3000') })