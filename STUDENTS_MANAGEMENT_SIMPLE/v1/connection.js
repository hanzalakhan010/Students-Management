import mysql2 from 'mysql2'



const pool = mysql2.createPool({
    host: 'localhost',      // or Docker host IP if outside container
    user: 'myuser',         // MYSQL_USER from container
    password: 'password', // MYSQL_PASSWORD from container
    database: 'mydb',       // MYSQL_DATABASE from container
    port: 3306
}
)

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Connected to MySQL database');
    connection.release();
});


export default pool;