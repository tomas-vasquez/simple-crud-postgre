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
    res.render("estudiante/estLogin")
})

router.get('/estRegistro', checkAuthenticated, function (req, res, next){
    res.render("estudiante/estRegistro")
})

router.get('/estDashboard', checkNotAuthenticated, function (req, res, next){
    res.render("estudiante/estDashboard", {user: req.user.idusuario})
})

router.post("/estRegistro", async (req, res) => {
    let { nombreEstudiante, apellidoPEstudiante, apellidoMEstudiante, carnetEstudiante, fechaNacEstudiante, codEstudiante, password, password2 } = req.body;
  
    let errors = [];
  
    console.log({
      nombreEstudiante,
      apellidoPEstudiante,
      apellidoMEstudiante,
      carnetEstudiante,
      fechaNacEstudiante,
      codEstudiante,
      password,
      password2
    });
  
    if (!nombreEstudiante || !apellidoPEstudiante || !apellidoMEstudiante || !carnetEstudiante || !fechaNacEstudiante || !codEstudiante || !password || !password2) {
      errors.push({ message: "Por favor ingrese todos los datos" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "La contraseña debe ser de al menos 6 caracteres" });
    }
  
    if (password !== password2) {
      errors.push({ message: "Las contraseñas no concuerdan" });
    }
  
    if (errors.length > 0) {
      res.render("/estRegistro", { errors, nombreEstudiante, apellidoPEstudiante, apellidoMEstudiante, carnetEstudiante, fechaNacEstudiante, codEstudiante, password, password2 });
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
            return res.render("/estRegistro", {
              message: "El numero de registro ya esta registrado"
            });
          } else {
            pool.query(
                `INSERT INTO miembro (cimiembro, nombres, apellidop, apellidom, fechan)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING cimiembro`,
              [carnetEstudiante, nombreEstudiante, apellidoPEstudiante, apellidoMEstudiante, fechaNacEstudiante],
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
            [codEstudiante, hashedPassword],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "Usted esta registrado, por favor ingrese");
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
      failureFlash: true
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
