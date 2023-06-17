import mysql from "mysql";
import express from "express";
import path from "path";
import crypto from "crypto";
import session from "express-session";
import multer from 'multer';

const pool = mysql.createPool({
  user: "root",
  password: "",
  database: "balihalus_db",
  host: "localhost",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  }
});
const upload = multer({ storage: storage })

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
  cookie: { secure: false }
}));

const resultPerPage = 10;

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
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getDataMemberBaru = conn => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM member WHERE status = 0`, (err, result) => {
      if (err) {
        reject(err);
      } else {
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
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const tolakMember = (conn, data) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM member WHERE username = '${data}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getDataBodyM = conn => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT id_layanan, oil FROM layanan WHERE oil IS NOT NULL`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateDataBodyM = (conn, data, oil) => {
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE layanan SET oil = '${oil}' WHERE id_layanan = '${data}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getDataSpaMasker = conn => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT id_layanan, masker FROM layanan WHERE masker IS NOT NULL`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateDataSpaMasker = (conn, data, masker) => {
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE layanan SET masker = '${masker}' WHERE id_layanan = '${data}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getDataSpaScrub = conn => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT id_layanan, scrub FROM layanan WHERE scrub IS NOT NULL`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateDataSpaScrub = (conn, data, scrub) => {
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE layanan SET scrub = '${scrub}' WHERE id_layanan = '${data}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getDataCabang = (conn) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM cabang JOIN kota ON kota.id_kota = cabang.id_kota`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateDataCabang = (conn, data, nama, alamat, id_kota) => {
  return new Promise((resolve, reject) => {
    conn.query(
      'UPDATE cabang SET nama = ?, alamat = ?, id_kota = ? WHERE no_cabang = ?',
      [nama, alamat, id_kota, data],
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

const getDataKota = (conn) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT nama_kota FROM kota`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const convertNamaKotakeIDKota = (conn, nama_kota) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT id_kota FROM kota WHERE nama_kota = ?', [nama_kota], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const tambahCabang = (conn, nama, alamat, id_kota, username, gambarCabang) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO cabang (nama, alamat, id_kota, username, gambar) VALUES (?, ?, ?, ?, ?)`,
      [nama, alamat, id_kota, username, gambarCabang],
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

const isAuthMember = (req, res, next) => {
  if (req.session.isAuthMember) {
    next();
  } else {
    res.redirect("/");
  }
};

const isAuthAdmin = (req, res, next) => {
  if (req.session.isAuthAdmin) {
    next();
  } else {
    res.redirect("/");
  }
};

const tambahDataMasker = (conn, masker) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO layanan (masker) VALUES ('${masker}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const tambahDataScrub = (conn, scrub) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO layanan (scrub) VALUES ('${scrub}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
const tambahDataOil = (conn, oil) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO layanan (oil) VALUES ('${oil}')`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const getLaporan = conn => {
  return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM reservasi`, (err, result) => {
          if(err){
              reject(err);
          } else{
              resolve(result);
          }
      });
  });
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
  let query = 'SELECT * FROM member WHERE status = 1'
  conn.query(query, (err, result) => {

    const numOfResults = result.length;
    const numberOfPages = Math.ceil(numOfResults / resultPerPage);
    let page = req.query.page ? Number(req.query.page) : 1;
    // console.log(resultPerPage)

    if (page > numberOfPages) {
      res.redirect('/dataMember?page=' + encodeURIComponent(numberOfPages));
    } else if (page < 1) {
      res.redirect('/dataMember?page=' + encodeURIComponent('1'));
    }

    const startLimit = (page - 1) * resultPerPage;
    query = `SELECT * FROM member WHERE status = 1 LIMIT ${startLimit}, ${resultPerPage}`
    conn.query(query, (err, result) => {
      if (err) throw err;
      let iterator = (page - 5) < 1 ? 1 : page - 5;
      let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);

      if (endingLink < (page + 4)) {
        iterator -= (page + 4) - numberOfPages;
      }

      res.render('dataMember', { dataSession, result, page, iterator, endingLink, numberOfPages })
    });
    conn.release();
  })
});

app.get('/memberBaru', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataMember = await getDataMemberBaru(conn);
  conn.release();
  res.render('memberBaru', { dataSession, dataMember })
});

app.get('/edit/:data', async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataMember = await getDataMemberBaru(conn);
  res.render('dataMember', { dataSession, dataMember })
});


app.get('/bodyMassage', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataBodyM = await getDataBodyM(conn);
  res.render('bodyMassage', { dataSession, dataBodyM })
});

app.get('/spaMasker', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataSpaMasker = await getDataSpaMasker(conn);
  conn.release();
  res.render('spaMasker', { dataSession, dataSpaMasker })
});

app.get('/spaScrub', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  let dataSpaScrub = await getDataSpaScrub(conn);
  conn.release();
  res.render('spaScrub', { dataSession, dataSpaScrub })
});

app.get('/laporan', isAuthAdmin, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  const dataLaporan = await getLaporan(conn);

  let dateObj = {
    januari: 0,
    februari: 0,
    maret: 0,
    april: 0,
    mei: 0,
    juni: 0,
    juli: 0,
    agustus: 0,
    september: 0,
    oktober: 0,
    november: 0,
    desember: 0
  };
  
  let i = 0;
  for (let row of dataLaporan){
    let tanggal = dataLaporan[i].tanggal;
    let month = new Date(tanggal).getMonth() + 1;

    if (month == 1){
      dateObj.januari++;
    } else if (month == 2){
      dateObj.februari++;
    } else if (month == 3){
      dateObj.maret++;
    } else if (month == 4){
      dateObj.april++;
    } else if (month == 5){
      dateObj.mei++;
    } else if (month == 6){
      dateObj.juni++;
    } else if (month == 7){
      dateObj.juli++;
    } else if (month == 8){
      dateObj.agustus++;
    } else if (month == 9){
      dateObj.september++;
    } else if (month == 10){
      dateObj.oktober++;
    } else if (month == 11){
      dateObj.november++;
    } else if (month == 12){
      dateObj.desember++;
    }
    // console.log(month)
    // console.log(dateObj)
    i++;
  }

  conn.release();
  res.render('laporan', {dataSession, dateObj})
});

app.get("/cabang", isAuthMember, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  conn.release();
  res.render("cabang", { dataSession });
});

app.get("/reservasi", isAuthMember, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  conn.release();
  res.render("reservasi", { dataSession });
});

app.get("/historiReservasi", isAuthMember, async (req, res) => {
  const conn = await dbConnect();
  let dataSession = req.session.data;
  conn.release();
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
  // console.log(selected)
  let dataSession = req.session.data;
  const dataCabang = await getDataCabang(conn);
  const dataKota = await getDataKota(conn);
  conn.release();
  res.render('kelolaCabang', { dataSession, dataCabang, dataKota })
});

//POST METHOD

app.post('/login', async (req, res) => {
  const conn = await dbConnect();
  const { username, password } = req.body;
  const hashed_pass = crypto.createHash('sha256').update(password).digest('base64');
  let data = "";
  // console.log(hashed_pass);
  if (username.length > 0 && password.length > 0) {
    const dataAdmin = await getCheckAdmin(conn, username, hashed_pass);
    const dataMember = await getCheckMember(conn, username, hashed_pass);

    if (dataAdmin.length > 0) {
      req.session.data = dataAdmin[0].nama;
      req.session.username = dataAdmin[0].username;
      req.session.isAuthAdmin = true;
      // console.log(req.session.data);
      res.redirect('/homeAdmin');
    } else if (dataMember.length > 0) {
      req.session.data = dataMember[0].nama;
      // console.log(dataMember[0].status)

      // console.log(req.session.data);
      if (dataMember[0].status == 1) {
        req.session.isAuthMember = true;
        res.redirect('/homeMember');
      } else {
        data = "Maaf, akun Anda belum diterima oleh Admin!";
        res.render('login', { data });
      }
    } else {
      data = "Username atau Password salah!";
      res.render('login', { data });
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

  if (nama != undefined && username != undefined && status == true && nomorhp != undefined && alamat != undefined) {
    // console.log(checkDataExist.length)
    if (checkDataExist.length == 0) {
      console.log("Ter INSERT data nya")
      const insert = await postDaftar(conn, nama, username, hashed_pass, nomorhp, alamat);
      res.render('login', { data })
    } else {
      isExist = "Username sudah digunakan, silakan ganti!"
      res.render('daftar', { isExist })
    }
  } else {
    isExist = "Data yang Anda masukkan tidak valid!"
    res.render('daftar', { isExist })
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
  const { data } = req.params
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
  const { data } = req.params
  const { oil } = req.body

  // let dataSession = req.session.data
  // let dataBodyM = await getDataMember(conn);
  // const dataEdit = await getDataEdit(conn, data)
  const updateData = await updateDataBodyM(conn, data, oil)

  conn.release();
  res.redirect('/bodyMassage')
});

app.post('/editMasker/:data', async (req, res) => {
  const conn = await dbConnect();
  const { data } = req.params
  const { masker } = req.body

  const updateData = await updateDataSpaMasker(conn, data, masker)

  conn.release();
  res.redirect('/spaMasker')
});

app.post('/editScrub/:data', async (req, res) => {
  const conn = await dbConnect();
  const { data } = req.params
  const { scrub } = req.body

  const updateData = await updateDataSpaScrub(conn, data, scrub)

  conn.release();
  res.redirect('/spaScrub')
});

app.post('/editCabang/:data', async (req, res) => {
  const conn = await dbConnect();
  const { data } = req.params
  const { nama, alamat, editKota } = req.body
  // console.log(editKota);

  const getIDKota = await convertNamaKotakeIDKota(conn, editKota);
  const id_kota = getIDKota[0].id_kota;
  let dataSession = req.session.data
  let dataCabang = await getDataCabang(conn);
  // const dataEdit = await getDataCabangEdit(conn, data)
  const updateData = await updateDataCabang(
    conn,
    data,
    nama,
    alamat,
    id_kota
  );

  conn.release();
  res.redirect('/kelolaCabang')
});

app.post('/tambahCabang', upload.single('gambarCabang'), async (req, res) => {
  const conn = await dbConnect();
  const { namaCabang, alamatCabang, pilihKota } = req.body;
  const gambarCabang = req.file.filename;
  
  const getIDKota = await convertNamaKotakeIDKota(conn, pilihKota);
  const username = req.session.username;
  const id_kota = getIDKota[0].id_kota;
  
  const tambahDataCabang = await tambahCabang(
    conn,
    namaCabang,
    alamatCabang,
    id_kota,
    username,
    gambarCabang
  );

  conn.release();
  res.redirect('/kelolaCabang');
});

app.post('/tambahMasker', async (req, res) => {
  const conn = await dbConnect();
  const { namaMasker } = req.body

  await tambahDataMasker(conn, namaMasker);

  conn.release();
  res.redirect('/spaMasker')
});

app.post('/tambahScrub', async (req, res) => {
  const conn = await dbConnect();
  const { namaScrub } = req.body

  await tambahDataScrub(conn, namaScrub);

  conn.release();
  res.redirect('/spaScrub')
});

app.listen(PORT, () => {
  console.log("Ready!");
});

app.post('/tambahOil', async (req, res) => {
  const conn = await dbConnect();
  const { namaOil } = req.body

  await tambahDataOil(conn, namaOil);

  conn.release();
  res.redirect('/bodyMassage')
});
