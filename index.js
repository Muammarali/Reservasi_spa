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
    saveUninitialized: false,
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

const postDaftar = (conn, nama, username, hashed_pass, no_hp, alamat) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO member (nama, username, password, no_hp, alamat) VALUES ('${nama}', '${username}', '${hashed_pass}', '${no_hp}', '${alamat}')`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataMember = conn => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM member`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataEdit = (conn, username) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM member WHERE username = '${username}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const updateDataMember = (conn, data, nama, username, no_hp, alamat) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE member SET nama = '${nama}', username = '${username}', no_hp = '${no_hp}', alamat = '${alamat}' WHERE username = '${data}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const isAuthMember = (req, res, next) => {
    if (req.session.isAuthMember){
        req.session.isAuthAdmin = false;
        next()
    } else{
        res.redirect('/')
    }
}

const isAuthAdmin = (req, res, next) => {
    if (req.session.isAuthAdmin){
        req.session.isAuthMember = false;
        next()
    } else{
        res.redirect('/')
    }
}

app.get('/', async (req, res) => {
    let data = "";
    req.session.isAuthAdmin = false;
    req.session.isAuthMember = false;
    res.render('login', {data})
});

app.get('/login', async (req, res) => {
    let data = "";
    req.session.isAuthAdmin = false;
    req.session.isAuthMember = false;
    res.render('login', {data})
});

app.get('/daftar', async (req, res) => {
    res.render('daftar')
});

app.get('/homeAdmin', isAuthAdmin, async (req, res) => {
    let dataSession = req.session.data;
    console.log("Auth Admin : " + req.session.isAuthAdmin)
    res.render('homeAdmin', {dataSession})
});

app.get('/homeMember', isAuthMember, async (req, res) => {
    let dataSession = req.session.data
    console.log("Auth Member : " + req.session.isAuthMember)
    res.render('homeMember', {dataSession})
});

app.get('/dataMember', isAuthAdmin, async (req, res) => {
    const conn = await dbConnect();
    let dataSession = req.session.data;
    let dataMember = await getDataMember(conn);
    res.render('dataMember', {dataSession, dataMember})
});

app.get('/edit/:data', async (req, res) => {
    const conn = await dbConnect();
    let dataSession = req.session.data
    let dataMember = await getDataMember(conn);
    res.render('dataMember', {dataSession, dataMember})

});

app.get('/logout', async (req, res) => {
    let data = "";
    req.session.isAuthAdmin = false;
    req.session.isAuthMember = false;
    res.redirect('login')
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
            req.session.isAuthAdmin = true;
            // console.log(req.session.data);
            res.redirect('/homeAdmin');
        } else if (dataMember.length > 0){
            req.session.data = dataMember[0].nama;
            req.session.isAuthMember = true;
            // console.log(req.session.data);
            res.redirect('/homeMember');
        } else{
            data = "Data tidak ditemukan!";
            res.render('login', {data});
        }
        
    }
    conn.release();
});

app.post('/daftar', async (req, res) => {
    const conn = await dbConnect();
    const { nama, username, password, retypepassword, nomorhp, alamat } = req.body;
    const hashed_pass = crypto.createHash('sha256').update(password).digest('base64');
    let data = "";
    let status = true;
    // console.log(hashed_pass);
    if (password == retypepassword){
        status = true;
    } else{
        status = false;
    }

    if (nama != undefined && username != undefined && status == true && nomorhp != undefined && alamat != undefined){
        const insert = await postDaftar(conn, nama, username, hashed_pass, nomorhp, alamat);
    }
    res.render('login',{data})
    conn.release();
});

app.post('/edit/:data', async (req, res) => {
    const conn = await dbConnect();
    const {data} = req.params
    const {username, nama, nomorhp, alamat} = req.body
    // console.log(data)
    // console.log(nama)
    // console.log(username)
    // console.log(nomorhp)
    // console.log(alamat)
    // console.log(req.session.data)

    let dataSession = req.session.data
    let dataMember = await getDataMember(conn);
    const dataEdit = await getDataEdit(conn, data)
    const updateData = await updateDataMember(conn, data, nama, username, nomorhp, alamat)

    conn.release();
    res.redirect('/dataMember')
});

app.listen(PORT, () => {
    console.log("Ready!")
});