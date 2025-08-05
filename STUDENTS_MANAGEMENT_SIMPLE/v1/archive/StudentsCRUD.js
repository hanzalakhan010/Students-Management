import fs from 'fs'

let students = loadState()

function saveState() {
    fs.writeFile('db.json', JSON.stringify({ students }), (err) => {
        if (err) {
            console.log("Error saving state:", err)
        }
    })
}

function loadState() {
    try {
        return JSON.parse(fs.readFileSync('db.json', 'utf-8'))?.students ?? []
    } catch (err) {
        console.log("Error loading state:", err)
        return []
    }
}

function generateId() {
    return students.length ? Math.max(...students.map(s => s.id)) + 1 : 1
}

export function createStudent(studentDetails) {
    const id = generateId()
    const newStudent = { id, ...studentDetails }
    students.push(newStudent)
    saveState()
    return id
}

export function getAllStudents() {
    return students
}

export function searchStudentByName(name) {
    const filterStudents = students.filter(student => student.name.toLowerCase().includes(name.toLowerCase()))
    return filterStudents

}
export function getStudentById(studentId) {
    if (!studentId) return null
    return students.find(s => s.id == studentId)
}

export function updateStudentById(studentId, updatedDetails) {
    for (let i = 0; i < students.length; i++) {
        if (students[i]?.id == studentId) {
            students[i] = { ...students[i], ...updatedDetails }
            saveState()
            return true
        }
    }
    return false
}

export function deleteStudentById(studentId) {
    const initialLength = students.length
    students = students.filter(s => s.id != studentId)
    if (students.length !== initialLength) {
        saveState()
        return JSON.stringify({ students })
    }
    return JSON.stringify({ error: 'Student not found' })
}
