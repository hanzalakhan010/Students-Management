import fs from 'fs'
import { getStudentById } from './StudentCRUD.js'

function saveState() {
    fs.writeFile('db.json', JSON.stringify({ students }), (err) => {
        if (err) {
            console.log("Error saving state:", err)
        }
    })
}

function loadState() {
    try {
        return JSON.parse(fs.readFileSync('db.json', 'utf-8'))?.courses ?? []
    } catch (err) {
        console.log("Error loading state:", err)
        return []
    }
}

let courses = loadState()

console.log(courses)
export function getAllCourses() {
    return courses
}
export function getMultipleCourses(course_ids) {
    const filteredCourses = courses.filter(course => course_ids.includes(course.id))
    return filteredCourses
}
export function getAvailableCourseForStudent(student_id) {
    const student = getStudentById(student_id)
    if (!student) return false
    const course_ids = student.courses?.map(course => course.id)
    return getMultipleCourses(course_ids)
}

console.log(getAvailableCourseForStudent(1))