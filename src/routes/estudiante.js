const express = require("express");
const pool = require("../dbConfig");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("../passportConfig");

const estudianteModel = require("../models/estudiante");
initializePassport(passport);

router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

//Middleware

router.get("/", checkAuthenticated, function (req, res, next) {
  res.render("estudiante/estLogin");
});

router.get("/estRegistro", checkAuthenticated, function (req, res, next) {
  res.render("estudiante/estRegistro");
});

router.get("/estDashboard", checkNotAuthenticated, function (req, res, next) {
  estudianteModel.obtenerDocentes().then((docentes) => {
    res.render("estudiante/estDashboard", {
      docentes: docentes,
      user: req.user.idusuario,
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.render("estudiante/estLogin", {
    message: "You have logged out successfully",
  });
});

/////Middleware DOcente

/*router.post('/fDocenteBuscar', checkNotAuthenticated, function (req, res, next){
  const obj = JSON.stringify(req.body);
  const docente = obj.slice(12,16)
  console.log(docente);
  estudianteModel
  .obtenerInfoDocenteFromCH(docente)
  .then(infodocente => {
      res.render("estudiante/fDocenteHorario", {
          infodocente: infodocente,
          user: req.user.idusuario,
      });
  })
})*/

router.post("/fDocenteBuscar", checkNotAuthenticated, function (
  req,
  res,
  next
) {
  const obj = JSON.stringify(req.body);
  const docente = obj.slice(12, 16);
  console.log(docente);
  estudianteModel.obtenerInfoDocenteFromCH(docente).then((infodocente) =>
    estudianteModel.obtenerCHDocenteLunes(docente).then((lunes) =>
      estudianteModel.obtenerCHDocenteMartes(docente).then((martes) =>
        estudianteModel.obtenerCHDocenteMiercoles(docente).then((miercoles) =>
          estudianteModel.obtenerCHDocenteJueves(docente).then((jueves) =>
            estudianteModel.obtenerCHSDocenteViernes(docente).then((viernes) =>
              estudianteModel.obtenerCHSemestreSabado(docente).then((sabado) =>
                res.render("estudiante/fDocenteHorario", {
                  infodocente: infodocente,
                  lunes: lunes,
                  martes: martes,
                  miercoles,
                  miercoles,
                  jueves: jueves,
                  viernes: viernes,
                  sabado: sabado,
                  user: req.user.idusuario,
                })
              )
            )
          )
        )
      )
    )
  );
});

router.post("/fSemestreHorario", checkNotAuthenticated, function (
  req,
  res,
  next
) {
  const { codigoc, planc, semestre } = req.body;
  console.log(codigoc, planc, semestre);
  estudianteModel
    .obtenerCargaHorariaPorSemestreMat(codigoc, planc, semestre)
    .then((horariosem) =>
      estudianteModel
        .obtenerCHSemestreLunes(codigoc, planc, semestre)
        .then((lunes) =>
          estudianteModel
            .obtenerCHSemestreMartes(codigoc, planc, semestre)
            .then((martes) =>
              estudianteModel
                .obtenerCHSemestreMiercoles(codigoc, planc, semestre)
                .then((miercoles) =>
                  estudianteModel
                    .obtenerCHSemestreJueves(codigoc, planc, semestre)
                    .then((jueves) =>
                      estudianteModel
                        .obtenerCHSemestreViernes(codigoc, planc, semestre)
                        .then((viernes) =>
                          estudianteModel
                            .obtenerCHSemestreSabado(codigoc, planc, semestre)
                            .then((sabado) =>
                              res.render("estudiante/fSemestreHorario", {
                                horariosem: horariosem,
                                lunes: lunes,
                                martes: martes,
                                miercoles,
                                miercoles,
                                jueves: jueves,
                                viernes: viernes,
                                sabado: sabado,
                                user: req.user.idusuario,
                              })
                            )
                        )
                    )
                )
            )
        )
    );
});

router.post("/estRegistro", async (req, res) => {
  let {
    nombreEstudiante,
    apellidoPEstudiante,
    apellidoMEstudiante,
    carnetEstudiante,
    fechaNacEstudiante,
    codEstudiante,
    password,
    password2,
  } = req.body;

  let errors = [];

  console.log({
    nombreEstudiante,
    apellidoPEstudiante,
    apellidoMEstudiante,
    carnetEstudiante,
    fechaNacEstudiante,
    codEstudiante,
    password,
    password2,
  });

  if (
    !nombreEstudiante ||
    !apellidoPEstudiante ||
    !apellidoMEstudiante ||
    !carnetEstudiante ||
    !fechaNacEstudiante ||
    !codEstudiante ||
    !password ||
    !password2
  ) {
    errors.push({ message: "Por favor ingrese todos los datos" });
  }

  if (password.length < 6) {
    errors.push({ message: "La contraseña debe ser de al menos 6 caracteres" });
  }

  if (password !== password2) {
    errors.push({ message: "Las contraseñas no concuerdan" });
  }

  if (errors.length > 0) {
    res.render("estudiante/estRegistro", {
      errors,
      nombreEstudiante,
      apellidoPEstudiante,
      apellidoMEstudiante,
      carnetEstudiante,
      fechaNacEstudiante,
      codEstudiante,
      password,
      password2,
    });
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Validation passed
    pool.query(
      `SELECT * FROM usuario
          WHERE idusuario = $1`,
      [codEstudiante],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          return res.render("estudiante/estRegistro", {
            message: "El numero de registro ya esta registrado",
          });
        } else {
          pool.query(
            `INSERT INTO miembro (cimiembro, nombres, apellidop, apellidom, fechan)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING cimiembro`,
            [
              carnetEstudiante,
              nombreEstudiante,
              apellidoPEstudiante,
              apellidoMEstudiante,
              fechaNacEstudiante,
            ],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
            }
          );
          pool.query(
            `INSERT INTO estudiante (idestudiante, cimiembro)
                VALUES ($1, $2)
                RETURNING idestudiante`,
            [codEstudiante, carnetEstudiante],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
            }
          );
          pool.query(
            `INSERT INTO usuario (idusuario, password)
                VALUES ($1, $2)
                RETURNING idusuario, password`,
            [codEstudiante, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash(
                "success_msg",
                "Usted esta registrado, por favor ingrese"
              );
              res.redirect("/estudiante");
            }
          );
        }
      }
    );
  }
});

router.post(
  "/estLogin",
  passport.authenticate("local", {
    successRedirect: "/estudiante/estDashboard",
    failureRedirect: "/estudiante",
    failureFlash: true,
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/estudiante/estDashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/estudiante");
}

module.exports = router;
