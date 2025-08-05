
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'myuser',
    password: 'UserPass123!',
    database: 'mydb',
});



export async function getAvailableCourses(student_id) {
    const [result] = await pool.execute(`
        select id,title 
        from courses where
        id not in (
            select course_id from course_enrollment 
            where student_id = ?
        )
        `, [student_id])
    return result
}

export function enrollCourse(course_id,student_id){
    const result = pool.execute(`
        
        `)
}

console.log(await getAvailableCourses(1))