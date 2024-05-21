const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inegiweb'
});

app.post("/createV", (req, res) => {
    const idVivienda = req.body.idVivienda;
    const material = req.body.material;
    const calle = req.body.calle;
    const colonia = req.body.colonia;
    const numInt = req.body.numInt;
    const numExt = req.body.numExt;
    const cp = req.body.cp;
    const localidad = req.body.localidad;
    const municipio = req.body.municipio;

    db.query(
        "INSERT INTO vivienda (IDVIVIENDA, IDMATVIV, CALLE, COLONIA, NUMEROINT, NUMEROEXT, CODIGOPOSTAL, LOCALIDAD, MUNICIPIO) VALUES (?,?,?,?,?,?,?,?,?)",
        [idVivienda, material, calle, colonia, numInt, numExt, cp, localidad, municipio],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/createH", (req, res) => {
    const curp = req.body.curp;
    const idVivienda = req.body.idVivienda;
    const nombre = req.body.nombre;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    const fecha = req.body.fecha;

    db.query(
        "INSERT INTO habitante (CURP, IDVIVIENDA, NOMBREH, PATERNOH, MATERNOH, FECHANACIMIENTO) VALUES (?,?,?,?,?,?)",
        [curp, idVivienda, nombre, apellidoP, apellidoM, fecha],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/createO", (req, res) => {
    const idOcupacion = req.body.idOcupacion;
    const ocupacion = req.body.ocupacion;

    db.query(
        "INSERT INTO ocupacion (IDOCUPACION, OCUPACION) VALUES (?,?)",
        [idOcupacion, ocupacion],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/createM", (req, res) => {
    const idMaterial = req.body.idMaterial;
    const tipoMaterial = req.body.tipoMaterial;

    db.query(
        "INSERT INTO materialvivienda (IDMATVIV, TIPOMATERIAL) VALUES (?,?)",
        [idMaterial, tipoMaterial],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/vivienda", (req, res) => {
    db.query(
        "SELECT * FROM vivienda",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/habitante", (req, res) => {
    db.query(
        "SELECT * FROM habitante",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/ocupacion", (req, res) => {
    db.query(
        "SELECT * FROM ocupacion",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateV", (req, res) => {
    const idVivienda = req.body.idVivienda;
    const material = req.body.material;
    const calle = req.body.calle;
    const colonia = req.body.colonia;
    const numInt = req.body.numInt;
    const numExt = req.body.numExt;
    const cp = req.body.cp;
    const localidad = req.body.localidad;
    const municipio = req.body.municipio;

    db.query(
        "UPDATE vivienda SET IDMATVIV=?, CALLE=?, COLONIA=?, NUMEROINT=?, NUMEROEXT=?, CODIGOPOSTAL=?, LOCALIDAD=?, MUNICIPIO=? WHERE IDVIVIENDA=?",
        [material, calle, colonia, numInt, numExt, cp, localidad, municipio, idVivienda], // Cambio de orden de los valores
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateH", (req, res) => {
    const curp = req.body.curp;
    const idVivienda = req.body.idVivienda;
    const nombre = req.body.nombre;
    const apellidoP = req.body.apellidoP;
    const apellidoM = req.body.apellidoM;
    const fecha = req.body.fecha;

    db.query(
        "UPDATE habitante SET IDVIVIENDA=?, NOMBREH=?, PATERNOH=?, MATERNOH=?, FECHANACIMIENTO=? WHERE CURP=?",
        [idVivienda, nombre, apellidoP, apellidoM, fecha, curp],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateO", (req, res) => {
    const idOcupacion = req.body.idOcupacion;
    const ocupacion = req.body.ocupacion;

    db.query(
        "UPDATE ocupacion SET OCUPACION=? WHERE IDOCUPACION=?",
        [ocupacion, idOcupacion],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateM", (req, res) => {
    const idMaterial = req.body.idMaterial;
    const tipoMaterial = req.body.tipoMaterial;

    db.query(
        "UPDATE materialvivienda SET TIPOMATERIAL=? WHERE IDMATVIV=?",
        [tipoMaterial, idMaterial],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteV/:idVivienda", (req, res) => {
    const idVivienda = req.params.idVivienda;

    db.query(
        "DELETE FROM vivienda WHERE IDVIVIENDA=?",idVivienda,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteH/:curp", (req, res) => {
    const curp = req.params.curp;

    db.query(
        "DELETE FROM habitante WHERE CURP=?",curp,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteO/:idOcupacion", (req, res) => {
    const idOcupacion = req.params.idOcupacion;

    db.query(
        "DELETE FROM ocupacion WHERE IDOCUPACION=?",idOcupacion,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteM/:idMaterial", (req, res) => {
    const idMaterial = req.params.idMaterial;

    db.query(
        "DELETE FROM materialvivienda WHERE IDMATVIV=?",idMaterial,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/material", (req, res) => {
    db.query(
        "SELECT * FROM materialvivienda",
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al obtener las opciones desde la base de datos");
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/login", (req, res) => {
    const { user, password } = req.body;

    db.query(
        "SELECT * FROM administrador  WHERE USUARIO = ? AND PASSWORD = ?",
        [user, password],
        (err, result) => {
            if (err) {
                console.error("Database error:", err);
                res.status(500).json({ success: false, message: "Database error" });
            } else {
                if (result.length > 0) {
                    // Usuario encontrado
                    res.status(200).json({ success: true, message: "Login successful" });
                } else {
                    // Credenciales incorrectas
                    res.status(401).json({ success: false, message: "Invalid username or password" });
                }
            }
        }
    );
});

app.post("/createOcupacionVivienda", (req, res) => {
    const { idOcupacion, idVivienda } = req.body;

    db.query(
        "INSERT INTO ocupacion_vivienda (IDOCUPACION, IDVIVIENDA) VALUES (?, ?)",
        [idOcupacion, idVivienda],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar la ocupación en la vivienda");
            } else {
                res.status(200).send("Ocupación registrada en la vivienda correctamente");
            }
        }
    );
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
})