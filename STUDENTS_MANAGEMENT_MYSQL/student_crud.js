import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'myuser',
    password: 'UserPass123!',
    database: 'mydb',
    multipleStatements: true
});

async function createTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(20),
                email VARCHAR(30),
                password VARCHAR(20)
            );
            CREATE TABLE IF NOT EXISTS courses(
                id INT AUTO_INCREMENT PRIMARY KEY,
                title varchar(20),
                about varchar(40)
            );
            CREATE TABLE IF NOT EXISTS course_enrollment(
                id int auto_increment primary key,
                course_id int,
                student_id int,
                FOREIGN KEY (course_id) REFERENCES courses(id),
                FOREIGN KEY (student_id) REFERENCES students(id)

            );
        `);
        // console.log("✅ Table created or already exists");
    } catch (err) {
        console.error("❌ SQL Error:", err.sqlMessage);
    }
}

createTable();




export async function getAllStudents() {
    const [rows] = await pool.execute(`
        select id,name,email from students  
        `)
    return rows
}

export async function addStudent(name, email, password) {
    const [result] = await pool.execute(`insert into students (name,email,password) values (?,?,?)`, [name, email, password])
    return result.affectedRows

}


export async function getStudentById(student_id) {
    const [result] = await pool.execute(`
        SELECT id,name,email
        FROM students WHERE id = ?;
        `,[student_id])
    return result
}
// console.log(await addStudent('Hanzala Khan', 'hanzala@h++.com', 'password123'))

// console.log(await getAllStudents())

// console.log(await getStudentById(1))