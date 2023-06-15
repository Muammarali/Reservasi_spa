import mysql from "mysql";
import express from "express";
import path from "path";
import crypto from "crypto";
import session from "express-session";

const pool = mysql.createPool({
  user: "root",
  password: "",
  database: "balihalus_db",
  host: "localhost",
});

const PORT = 8080;
const app = express();

app.set("view engine", "ejs");

const staticPath = path.resolve("public");
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

const dbConnect = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn);
      }
    });
  });
};

const getCheckAdmin = (conn, username, hashed_pass) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM admin WHERE username = '${username}' AND password = '${hashed_pass}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getCheckMember = (conn, username, hashed_pass) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM member WHERE username = '${username}' AND password = '${hashed_pass}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
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

const getDataMemberBaru = conn => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM member WHERE status = 0`, (err, result) => {
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
    conn.query(
      `SELECT * FROM member WHERE username = '${username}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const checkDataMember = (conn, username) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT username FROM member WHERE username = '${username}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const updateDataMember = (conn, data, nama, username, no_hp, alamat) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE member SET nama = '${nama}', username = '${username}', no_hp = '${no_hp}', alamat = '${alamat}' WHERE username = '${data}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const updateStatusMember = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE member SET status = '1' WHERE username = '${data}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const tolakMember = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query(`DELETE FROM member WHERE username = '${data}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataBodyM = conn => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT id_layanan, oil FROM layanan WHERE oil IS NOT NULL`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const updateDataBodyM= (conn, data, oil) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE layanan SET oil = '${oil}' WHERE id_layanan = '${data}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataSpaMasker= conn => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT id_layanan, masker FROM layanan WHERE masker IS NOT NULL`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const updateDataSpaMasker= (conn, data, masker) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE layanan SET masker = '${masker}' WHERE id_layanan = '${data}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataSpaScrub= conn => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT id_layanan, scrub FROM layanan WHERE scrub IS NOT NULL`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const updateDataSpaScrub= (conn, data, scrub) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE layanan SET scrub = '${scrub}' WHERE id_layanan = '${data}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataCabang = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM cabang JOIN kota ON kota.id_kota = cabang.id_kota`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataCabangEdit = (conn, data) => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE layanan SET oil = '${oil}' WHERE id_layanan = '${data}'`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const getDataKota = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT nama_kota FROM kota`, (err, result) => {
            if(err){
                reject(err);
            } else{
                resolve(result);
            }
        });
    });
};

const isAuthMember = (req, res, next) => {
  if (req.session.isAuthMember) {
    req.session.isAuthAdmin = false;
    next();
  } else {
    res.redirect("/");
  }
};

const isAuthAdmin = (req, res, next) => {
  if (req.session.isAuthAdmin) {
    req.session.isAuthMember = false;
    next();
  } else {
    res.redirect("/");
  }
};

app.get("/", async (req, res) => {
  let data = "";
  req.session.isAuthAdmin = false;
  req.session.isAuthMember = false;
  res.render("login", { data });
});

app.get("/login", async (req, res) => {
  let data = "";
  req.session.isAuthAdmin = false;
  req.session.isAuthMember = false;
  res.render("login", { data });
});

app.get("/daftar", async (req, res) => {
  let isExist = "";
  res.render("daftar", { isExist });
});

app.get("/homeAdmin", isAuthAdmin, async (req, res) => {
  let dataSession = req.session.data;
  console.log("Auth Admin : " + req.session.isAuthAdmin);
  res.render("homeAdmin", { dataSession });
});

app.get("/homeMember", isAuthMember, async (req, res) => {
  let dataSession = req.session.data;
  console.log("Auth Member : " + req.session.isAuthMember);
  res.render("homeMember", { dataSession });
});

app.get('/dataMember', isAuthAdmin, async (req, res) => {
    const conn = await dbConnect();
    let dataSession = req.session.data;
    let dataMember = await getDataMember(conn);
    conn.release();
    res.render('dataMember', {dataSession, dataMember})
});

app.get('/memberBaru', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataMember = await getDataMemberBaru(conn);
  conn.release();
  res.render('memberBaru', {dataSession, dataMember})
});

app.get('/edit/:data', async (req, res) => {
    const conn = await dbConnect();
    let dataSession = req.session.data;
    let dataMember = await getDataMemberBaru(conn);
    res.render('dataMember', {dataSession, dataMember})
});


app.get('/bodyMassage', isAuthAdmin, async (req, res) => {
    const conn = await dbConnect();
    let dataSession = req.session.data;
    let dataBodyM = await getDataBodyM(conn);
    res.render('bodyMassage', {dataSession, dataBodyM})
});

app.get('/spaMasker', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataSpaMasker = await getDataSpaMasker(conn);
  conn.release();
  res.render('spaMasker', {dataSession, dataSpaMasker})
});

app.get('/spaScrub', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataSpaScrub = await getDataSpaScrub(conn);
  conn.release();
  res.render('spaScrub', {dataSession, dataSpaScrub})
});

app.get('/laporan', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  conn.release();
  res.render('laporan', {dataSession})
});

app.get("/cabang", isAuthMember, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  res.render("cabang", { dataSession });
});

app.get("/reservasi", isAuthMember, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  res.render("reservasi", { dataSession });
});

app.get("/historiReservasi", isAuthMember, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  res.render("historiReservasi", { dataSession });
});

app.get('/logout', async (req, res) => {
    let data = "";
    req.session.isAuthAdmin = false;
    req.session.isAuthMember = false;
    res.redirect('login')
});

app.get('/kelolaCabang', isAuthAdmin, async (req, res) => {
    const conn = await dbConnect();
    let { selected } = req.body;
    console.log(selected)
    let dataSession = req.session.data;
    const dataCabang = await getDataCabang(conn);
    const dataKota = await getDataKota(conn);
    conn.release();
    res.render('kelolaCabang', {dataSession, dataCabang, dataKota})
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
            data = "Username atau Password salah!";
            res.render('login', {data});
        }
        
    }
    conn.release();
});

app.post("/daftar", async (req, res) => {
  const conn = await dbConnect();
  const { nama, username, password, retypepassword, nomorhp, alamat } =
    req.body;
  const hashed_pass = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");
  let checkDataExist = await checkDataMember(conn, username);
  let data = "";
  let isExist = "";
  let status = true;
  // console.log(hashed_pass);
  if (password == retypepassword) {
    status = true;
  } else {
    status = false;
  }

    if (nama != undefined && username != undefined && status == true && nomorhp != undefined && alamat != undefined){
        // console.log(checkDataExist.length)
        if (checkDataExist.length == 0){
            console.log("Ter INSERT data nya")
            const insert = await postDaftar(conn, nama, username, hashed_pass, nomorhp, alamat);
            res.render('login', {data})
        } else{
            isExist = "Username sudah digunakan, silakan ganti!"
            res.render('daftar', {isExist})
        }
    } else{
        isExist = "Data yang Anda masukkan tidak valid!"
        res.render('daftar', {isExist})
    }
    
    conn.release();
});

app.post("/edit/:data", async (req, res) => {
  const conn = await dbConnect();
  const { data } = req.params;
  const { username, nama, nomorhp, alamat } = req.body;
  // console.log(data)
  // console.log(nama)
  // console.log(username)
  // console.log(nomorhp)
  // console.log(alamat)
  // console.log(req.session.data)

  let dataSession = req.session.data;
  let dataMember = await getDataMember(conn);
  const dataEdit = await getDataEdit(conn, data);
  const updateData = await updateDataMember(
    conn,
    data,
    nama,
    username,
    nomorhp,
    alamat
  );

  conn.release();
  res.redirect("/dataMember");
});

app.post('/tambah/:data', async (req, res) => {
    const conn = await dbConnect();
    const {data} = req.params
    const updateData = await updateStatusMember(conn, data)
    conn.release();
    res.redirect('/memberBaru')
});

app.post('/tolak/:data', async (req, res) => {
    const conn = await dbConnect();
    const {data} = req.params
    const updateData = await tolakMember(conn, data)
    conn.release();
    res.redirect('/memberBaru')
});

app.post('/editOil/:data', async (req, res) => {
    const conn = await dbConnect();
    const {data} = req.params
    const {oil} = req.body

    // let dataSession = req.session.data
    // let dataBodyM = await getDataMember(conn);
    // const dataEdit = await getDataEdit(conn, data)
    const updateData = await updateDataBodyM(conn, data, oil)

    conn.release();
    res.redirect('/bodyMassage')
});

app.post('/editMasker/:data', async (req, res) => {
    const conn = await dbConnect();
    const {data} = req.params
    const {masker} = req.body

    // let dataSession = req.session.data
    // let dataBodyM = await getDataMember(conn);
    // const dataEdit = await getDataEdit(conn, data)
    const updateData = await updateDataSpaMasker(conn, data, masker)

    conn.release();
    res.redirect('/spaMasker')
});

app.post('/editScrub/:data', async (req, res) => {
    const conn = await dbConnect();
    const {data} = req.params
    const {scrub} = req.body

    // let dataSession = req.session.data
    // let dataBodyM = await getDataMember(conn);
    // const dataEdit = await getDataEdit(conn, data)
    const updateData = await updateDataSpaScrub(conn, data, scrub)

    conn.release();
    res.redirect('/spaScrub')
});

app.listen(PORT, () => {
  console.log("Ready!");
});
