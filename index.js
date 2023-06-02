import mysql from 'mysql';
import express from 'express';
import path, { resolve } from 'path';
import crypto from 'crypto';
import session from 'express-session';

const pool = mysql.createPool({
    user: 'root',
    password: '',
    database: 'balihalus_db',
    host: 'localhost'
});

const PORT = 8080;
const app = express();

app.set('view engine', 'ejs');

const staticPath = path.resolve('public');
app.use(express.static(staticPath));
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

const dbConnect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if(err){
                reject(err);
            } else{
                resolve(conn);
            }
        });
    });
};

app.get('/', async (req, res) => {
    // const conn = await dbConnect();
    res.render('login')
})

app.listen(PORT, () => {
    console.log("Ready!")
});