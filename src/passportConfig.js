const LocalStrategy = require("passport-local").Strategy;
const conexion = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
  console.log("Initialized");

  const authenticateUser = (codigo, password, done) => {
    // console.log(codigo, password);
    conexion.query(
      `SELECT * FROM usuario WHERE idusuario = $1`,
      [codigo],
      (err, results) => {
        if (err) {
          return done(null, false, {
            message: err.message,
          });
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              //password is incorrect
              return done(null, false, { message: "Contraseña incorrecta" });
            }
          });
        } else {
          // No user
          return done(null, false, {
            message: "No se encuentra al usuario con ese codigo",
          });
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "codigo", passwordField: "password" },
      authenticateUser
    )
  );
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => done(null, user.idusuario));

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((id, done) => {
    conexion.query(
      `SELECT * FROM usuario WHERE idusuario = $1`,
      [id],
      (err, results) => {
        if (err) {
          return done(err);
        }
        console.log(`El ID del usuario es ${results.rows[0].idusuario}`);
        return done(null, results.rows[0]);
      }
    );
  });
}

module.exports = initialize;
