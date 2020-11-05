const express = require('express');
const pool = require('../conexion');
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("../passportConfig");

const encargadoModel = require("../models/encargado");
initializePassport(passport);

router.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false
    })
  ); 
router.use(passport.initialize());
router.use(passport.session());   
router.use(flash());

//Middleware

router.get('/', checkAuthenticated, function (req, res, next){
    res.render("encargado/encLogin")
})

router.get('/encRegistro', checkAuthenticated, function (req, res, next){
    res.render("encargado/encRegistro")
})

router.get('/encDashboard', checkNotAuthenticated, function (req, res, next){
    res.render("encargado/encDashboard", {user: req.user.idusuario})
})

router.get('/logout', (req, res) => {
  req.logout();
  res.render('encargado/encLogin', { message: "You have logged out successfully" });
});
//Middleware Aula

router.get('/fAula', checkNotAuthenticated, function (req, res, next) {
  encargadoModel
      .obtenerAulas()
      .then(aulas => {
          res.render("encargado/fAula", {
              aulas: aulas,
              user: req.user.idusuario,
          });
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo aulas");
      });

})

router.get('/fAulaAgregar', checkNotAuthenticated, function (req, res, next){
  res.render('encargado/fAulaAgregar', {user: req.user.idusuario});
})

router.post('/fAulaInsertar', function (req, res, next) {
  const { id, capacidad, user} = req.body;
  if (!id || !capacidad) {
      return res.status(500).send("Por favor llene todos los datos");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .insertarAula(id, capacidad)
      .then(encargadoModel.insertarListaAula(user, id)
      .then(idAula => {
        res.redirect("/encargado/fAula");
    }))
      .catch(err => {
          return res.status(500).send("Error insertando Aula");
      });
});

router.get('/fAulaEditar/:id', function (req, res, next) {
  encargadoModel
      .obtenerAulasPorId(req.params.id)
      .then(aulas => {
          if (aulas) {
              res.render("encargado/fAulaEditar", {
                  aulas: aulas,
                  user: req.user.idusuario
              });
          } else {
              return res.status(500).send("No existe aula con ese id");
          }
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo aula");
      });
});

router.post('/fAulaActualizar/', function (req, res, next) {
  const { estado, id, user } = req.body;
  if ((!id || !estado) && (id>1)) {
      return res.status(500).send("Por favor ingrese un estado valido");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .actualizarAula(estado, id)
      .then(encargadoModel.insertarListaAula2(user, id)
      .then(idAula => {
        res.redirect("/encargado/fAula");
    }))
      .catch(err => {
          return res.status(500).send("Error actualizando Aulas");
      });
});


//Middleware Carrera




router.get('/fCarrera', checkNotAuthenticated, function (req, res, next) {
  encargadoModel
      .obtenerCarreras()
      .then(carreras => {
          res.render("encargado/fCarrera", {
              carreras: carreras,
              user: req.user.idusuario,
          });
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo carreras");
      });

})

router.get('/fCarreraAgregar', checkNotAuthenticated, function (req, res, next){
  res.render('encargado/fCarreraAgregar', {user: req.user.idusuario});
})

router.post('/fCarreraInsertar', function (req, res, next) {
  const { codigoc, planc, nombrec, user} = req.body;
  if (!codigoc || !planc || !nombrec) {
      return res.status(500).send("Por favor llene todos los datos");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .insertarCarrera(codigoc, planc, nombrec)
      .then(encargadoModel.insertarListaCarrera(user, codigoc, planc)
      .then(idAula => {
        res.redirect("/encargado/fCarrera");
    })
)
      .catch(err => {
          return res.status(500).send("Error insertando Carrera");
      });
});

router.get('/fCarreraEditar/:codigoc', function (req, res, next) {
  var str = req.params.codigoc;
  var codigo = str.slice(0,3);
  var plan = str.slice(-1);
  console.log(codigo, plan);
  encargadoModel
      .obtenerCarrerasPorId(codigo, plan)
      .then(carreras => {
          if (carreras) {
              res.render("encargado/fCarreraEditar", {
                  carreras: carreras,
                  user: req.user.idusuario
              });
          } else {
              return res.status(500).send("No existe carrera con ese id");
          }
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo carrera");
      });
});

router.post('/fCarreraActualizar/', function (req, res, next) {
  const { codigoc, planc, estado, user } = req.body;
  if ((!codigoc || !planc || !estado) && (estado>1)) {
      return res.status(500).send("Por favor ingrese un estado valido");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .actualizarCarrera(codigoc, planc, estado)
      .then(encargadoModel.insertarListaCarrera2(user, codigoc, planc, estado)
      .then(idAula => {
        res.redirect("/encargado/fCarrera");
    })
    )
      .catch(err => {
          return res.status(500).send("Error actualizando carreras");
      });
});




//Middleware Docente




router.get('/fDocente', checkNotAuthenticated, function (req, res, next) {
  encargadoModel
      .obtenerDocentes()
      .then(docentes => {
          res.render("encargado/fDocente", {
              docentes: docentes,
              user: req.user.idusuario,
          });
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo docentes");
      });

})

router.get('/fDocenteAgregar', checkNotAuthenticated, function (req, res, next){
  res.render('encargado/fDocenteAgregar', {user: req.user.idusuario});
})

router.post('/fDocenteInsertar', function (req, res, next) {
  const { codigod, nombres, apellidop, apellidom, sexo, correo, user} = req.body;
  if (!codigod || !nombres || !apellidop || !apellidom || !sexo || !correo ) {
      return res.status(500).send("Por favor llene todos los datos");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .insertarDocente(codigod, nombres, apellidop, apellidom, sexo, correo)
      .then(encargadoModel.insertarListaDocente(user, codigod)
      .then(idDocente => {
        res.redirect("/encargado/fDocente");
    })
)
      .catch(err => {
          return res.status(500).send("Error insertando Docente");
      });
});

router.get('/fDocenteEditar/:codigod', function (req, res, next) {
  encargadoModel
      .obtenerDocentePorId(req.params.codigod)
      .then(docentes => {
          if (docentes) {
              res.render("encargado/fDocenteEditar", {
                  docentes: docentes,
                  user: req.user.idusuario
              });
          } else {
              return res.status(500).send("No existe docente con ese codigo");
          }
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo docente");
      });
});

router.post('/fDocenteActualizar/', function (req, res, next) {
  const { codigod, estado, user } = req.body;
  if ((!codigod || !estado) && (estado>1)) {
      return res.status(500).send("Por favor ingrese un estado valido");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .actualizarDocente(codigod, estado)
      .then(encargadoModel.insertarListaDocente2(user, codigod, estado)
      .then(idDocente => {
        res.redirect("/encargado/fDocente");
    })
    )
      .catch(err => {
          return res.status(500).send("Error actualizando docente");
      });
});




//Middleware Materia




router.get('/fMateria', checkNotAuthenticated, function (req, res, next) {
  encargadoModel
      .obtenerMaterias()
      .then(materias => {
          res.render("encargado/fMateria", {
              materias: materias,
              user: req.user.idusuario,
          });
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo materias");
      });

})

router.get('/fMateriaAgregar', checkNotAuthenticated, function (req, res, next){
  encargadoModel
      .obtenerCarreras()
      .then(carrerasnom =>
        res.render('encargado/fMateriaAgregar', {
             user: req.user.idusuario,
            carrerasnom: carrerasnom,
          })
        )
  })

router.post('/fMateriaInsertar', function (req, res, next) {
  const { siglam, grupom, nombremat, user, selectpicker} = req.body;
  if (!siglam || !grupom || !nombremat) {
      return res.status(500).send("Por favor llene todos los datos");
  }
  // Si todo va bien, seguimos
  console.log("el usuario es",user);
    encargadoModel
      .insertarMateria(siglam, grupom, nombremat, selectpicker.slice(0,3), selectpicker.slice(-1))
      .then(encargadoModel.insertarListaMateria(user, siglam, grupom)
      .then(idmateria => {
        res.redirect("/encargado/fMateria");
    })
      )
 
      .catch(err => {
          return res.status(500).send("Error insertando Materia");
      });
      
});


router.get('/fMateriaEditar/:codigom', function (req, res, next) {
  var str = req.params.codigom;
  var sigla = str.slice(0,7);
  var grupo = str.slice(7,9);
  console.log(sigla, grupo);
  encargadoModel
      .obtenerMateriaPorId(sigla, grupo)
      .then(materias => {
          if (materias) {
              res.render("encargado/fMateriaEditar", {
                  materias: materias,
                  user: req.user.idusuario
              });
          } else {
              return res.status(500).send("No existe materia con ese id");
          }
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo materia");
      });
});

router.post('/fMateriaActualizar/', function (req, res, next) {
  const { siglam, grupom, estado, user } = req.body;
  if ((!siglam || !grupom || !estado)) {
      return res.status(500).send("Por favor ingrese un estado valido");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .actualizarMateria(siglam, grupom, estado)
      .then(encargadoModel.insertarListaMateria2(user, siglam, grupom, estado)
      .then(idMateria => {
        res.redirect("/encargado/fMateria");
    })
    )
      .catch(err => {
          return res.status(500).send("Error actualizando materias");
      });
});



//Middleware Carga Horaria



router.get('/fCargaH', checkNotAuthenticated, function (req, res, next) {
  encargadoModel
      .obtenerCargaHoraria()
      .then(cargah => {
          res.render("encargado/fCargaH", {
              cargah: cargah,
              user: req.user.idusuario,
          });
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo la carga horaria");
      });

})

router.get('/fCargaHAgregar', checkNotAuthenticated, function (req, res, next){
  encargadoModel
      .obtenerCarreras()
       .then(carreras => encargadoModel.obtenerSemestre()
        .then(semestres => encargadoModel.obtenerMaterias()
         .then(materias => encargadoModel.obtenerDocentes()
          .then(docentes => encargadoModel.obtenerPeriodo()
           .then(periodos => encargadoModel.obtenerAulas()
            .then(aulas => encargadoModel.obtenerDia()
              .then(dias => res.render('encargado/fCargaHAgregar', {
                user: req.user.idusuario,
                carreras: carreras,
                semestres: semestres,
                materias: materias,
                docentes: docentes,
                periodos: periodos,
                aulas: aulas,
                dias: dias,
                user: req.user.idusuario,
             })
             )
            )
           )
          )
         )
        )
       )
     })


router.post('/fCargaHInsertar', function (req, res, next) {
  const { idcargah, descripcion, idsemestre, carreranums, materianums, codigod, idperiodo, duracion, idaula, iddia, user} = req.body;
  if (!idcargah || !descripcion || !idsemestre || !carreranums ||! materianums || !codigod || !idperiodo || !duracion || !idaula || !iddia) {
      return res.status(500).send("Por favor llene todos los datos");
  }
  // Si todo va bien, seguimos
  console.log(carreranums, materianums);
    encargadoModel
      .insertarCargaHoraria(idcargah, descripcion, idsemestre, carreranums.slice(0,3), carreranums.slice(-1), materianums.slice(0,7), materianums.slice(7,9), codigod, idperiodo, duracion, idaula, iddia)
      .then(encargadoModel.insertarListaCargaHoraria(user, idcargah)
      .then(icargah => {
        res.redirect("/encargado/fCargaH");
    })
      )
 
      .catch(err => {
          return res.status(500).send("Error insertando la carga horaria");
      });
      
});


router.get('/fCargaHEditar/:idcargah', function (req, res, next) {
  encargadoModel
      .obtenerCargaHorariaPorId(req.params.idcargah)
      .then(cargah => {
          if (cargah) {
              res.render("encargado/fCargaHEditar", {
                  cargah: cargah,
                  user: req.user.idusuario
              });
          } else {
              return res.status(500).send("No existe carga horaria con ese id");
          }
      })
      .catch(err => {
          return res.status(500).send("Error obteniendo la carga horaria");
      });
});

router.post('/fCargaHActualizar/', function (req, res, next) {
  const { idcargah, estado, user } = req.body;
  if ((!idcargah || !estado)) {
      return res.status(500).send("Por favor ingrese un estado valido");
  }
  // Si todo va bien, seguimos
  encargadoModel
      .actualizarCargaHoraria(idcargah, estado)
      .then(encargadoModel.insertarListaCargaHoraria2(user, idcargah, estado)
      .then(idcargah => {
        res.redirect("/encargado/fCargaH");
    })
    )
      .catch(err => {
          return res.status(500).send("Error actualizando carga horaria");
      });
});






//////////////////////////////////////////////////////





router.post("/encRegistro", async (req, res) => {
    let { nombreEncargado, apellidoPEncargado, apellidoMEncargado, carnetEncargado, fechaNacEncargado, codEncargado, password, password2 } = req.body;
  
    let errors = [];
  
    console.log({
      nombreEncargado,
      apellidoPEncargado,
      apellidoMEncargado,
      carnetEncargado,
      fechaNacEncargado,
      codEncargado,
      password,
      password2
    });
  
    if (!nombreEncargado || !apellidoPEncargado || !apellidoMEncargado || !carnetEncargado || !fechaNacEncargado || !codEncargado || !password || !password2) {
      errors.push({ message: "Por favor ingrese todos los datos" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "La contraseña debe ser de al menos 6 caracteres" });
    }
  
    if (password !== password2) {
      errors.push({ message: "Las contraseñas no concuerdan" });
    }
  
    if (errors.length > 0) {
      res.render("encargado/encRegistro", { errors, nombreEncargado, apellidoPEncargado, apellidoMEncargado, carnetEncargado, fechaNacEncargado, codEncargado, password, password2 });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      // Validation passed
      pool.query(
        `SELECT * FROM usuario
          WHERE idusuario = $1`,
        [codEncargado],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            return res.render("encargado/encRegistro", {
              message: "El codigo de encargado ya esta registrado"
            });
          } else {
            pool.query(
                `INSERT INTO miembro (cimiembro, nombres, apellidop, apellidom, fechan)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING cimiembro`,
              [carnetEncargado, nombreEncargado, apellidoPEncargado, apellidoMEncargado, fechaNacEncargado],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
              }
            );
            pool.query(
                `INSERT INTO encargado (idencargado, cimiembro)
                VALUES ($1, $2)
                RETURNING idencargado`,
            [codEncargado, carnetEncargado],
            (err, results) =>{
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
            [codEncargado, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "Usted esta registrado, por favor ingrese");
              res.redirect("/encargado");
            }
            );
          }
        }
      );
    }
  });

  router.post(
    "/encLogin",
    passport.authenticate("local", {
      successRedirect: "/encargado/encDashboard",
      failureRedirect: "/encargado",
      failureFlash: true
    })
  );


  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/encargado/encDashboard");
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/encargado");
  }


module.exports = router;
