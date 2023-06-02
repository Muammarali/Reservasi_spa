import mysql from 'mysql';
import express from 'express';
import path from 'path';
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

const getCheckAdmin = (conn, username, hashed_pass) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM admin WHERE username = '${username}' AND password = '${hashed_pass}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getCheckMember = (conn, username, hashed_pass) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM member WHERE username = '${username}' AND password = '${hashed_pass}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

app.get('/', async (req, res) => {
    let data = "";
    res.render('login', {data})
});

app.get('/login', async (req, res) => {
    let data = "";
    res.render('login', {data})
});

app.get('/daftar', async (req, res) => {
    const conn = await dbConnect();
    res.render('daftar')
});

//POST METHOD

app.post('/login', async (req, res) => {
    const conn = await dbConnect();
    const { username, password } = req.body;
    const hashed_pass = crypto.createHash('sha256').update(password).digest('base64');
    let data = "";
    // console.log(hashed_pass);
    if (username.length > 0 && password.length > 0){
        const dataAdmin = await getCheckAdmin(conn, username, hashed_pass);
        const dataMember = await getCheckMember(conn, username, hashed_pass);
        
        if (dataAdmin.length > 0){
            req.session.data = dataAdmin[0].nama;
            console.log(req.session.data);
            res.redirect('/daftar');
        } else if (dataMember.length > 0){
            req.session.data = dataMember[0].nama;
            console.log(req.session.data);
            res.redirect('/daftar');
        } else{
            data = "Data tidak ditemukan!";
            res.render('login', {data});
        }
        
    }
    conn.release();
});

app.get('/homeAdmin', async (req, res) => {
    // const conn = await dbConnect();
    res.render('homeAdmin')
})

app.get('/homeMember', async (req, res) => {
    // const conn = await dbConnect();
    res.render('homeMember')
})

app.listen(PORT, () => {
    console.log("Ready!")
});