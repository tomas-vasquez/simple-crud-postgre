const conexion = require("../dbConfig");
module.exports = {
  //
  //Consultas Aulas
  //

  async obtenerAulas() {
    const resultados = await conexion.query(
      "select idaula, capacidad, estado from aula"
    );
    return resultados.rows;
  },

  async obtenerAulasPorId(id) {
    const resultados = await conexion.query(
      `select idaula, capacidad, estado from aula where idaula = $1`,
      [id]
    );
    return resultados.rows[0];
  },

  async insertarAula(id, capacidad) {
    var estado = 1;
    let resultados = await conexion.query(
      `insert into aula
        (idaula, capacidad, estado)
        values
        ($1, $2, $3)`,
      [id, capacidad, estado]
    );
    return resultados;
  },

  async insertarListaAula(user, id) {
    let today = new Date().toLocaleDateString();
    var tipo = "TR4";
    let resultados = await conexion.query(
      `insert into listaaula
        (fecha, idtiporegistro, idaula, idencargado)
        values
        ($1, $2, $3, $4)`,
      [today, tipo, id, user]
    );
    return resultados;
  },

  async insertarListaAula2(user, id) {
    let today = new Date().toLocaleDateString();
    var tipo;
    if (id === 1) {
      tipo = "TR5";
    } else {
      tipo = "TR6";
    }
    let resultados = await conexion.query(
      `insert into listaaula
        (fecha, idtiporegistro, idaula, idencargado)
        values
        ($1, $2, $3, $4)`,
      [today, tipo, id, user]
    );
    return resultados;
  },

  async actualizarAula(estado, id) {
    let resultados = await conexion.query(
      `update aula
        set estado = $1
        where idaula = $2`,
      [estado, id]
    );
    return resultados;
  },

  //
  //Consultas Carrera
  //

  async obtenerCarreras() {
    const resultados = await conexion.query(
      "select codigoc, planc, nombrecarrera, estado from carrera"
    );
    return resultados.rows;
  },

  async insertarCarrera(codigoc, planc, nombrec) {
    var estado = 1;
    let resultados = await conexion.query(
      `insert into carrera
    (codigoc, planc, nombrecarrera, estado)
    values
    ($1, $2, $3, $4)`,
      [codigoc, planc, nombrec, estado]
    );
    return resultados;
  },

  async obtenerCarrerasPorId(codigoc, planc) {
    const resultados = await conexion.query(
      `select codigoc, planc, nombrecarrera, estado from carrera where codigoc = $1 and planc =$2`,
      [codigoc, planc]
    );
    return resultados.rows[0];
  },

  async actualizarCarrera(codigoc, planc, estado) {
    let resultados = await conexion.query(
      `update carrera
    set estado = $1
    where codigoc = $2 AND planc = $3`,
      [estado, codigoc, planc]
    );
    return resultados;
  },

  async insertarListaCarrera(user, codigoc, planc) {
    let today = new Date().toLocaleDateString();
    var tipo = "TR7";
    let resultados = await conexion.query(
      `insert into listacarrera
    (fecha, idtiporegistro, codigoc, planc, idencargado)
    values
    ($1, $2, $3, $4, $5)`,
      [today, tipo, codigoc, planc, user]
    );
    return resultados;
  },

  async insertarListaCarrera2(user, codigoc, planc, estado) {
    let today = new Date().toLocaleDateString();
    var tipo;
    if (estado === 1) {
      tipo = "TR8";
    } else {
      tipo = "TR9";
    }
    let resultados = await conexion.query(
      `insert into listacarrera
        (fecha, idtiporegistro, codigoc, planc, idencargado)
        values
        ($1, $2, $3, $4, $5)`,
      [today, tipo, codigoc, planc, user]
    );
    return resultados;
  },

  //
  //Consultas Docente
  //

  async obtenerDocentes() {
    const resultados = await conexion.query(
      "select codigod, nombres, apellidop, apellidom, sexo, correo, estado from docente"
    );
    return resultados.rows;
  },

  async insertarDocente(codigod, nombres, apellidop, apellidom, sexo, correo) {
    var estado = 1;
    let resultados = await conexion.query(
      `insert into docente
    (codigod, nombres, apellidop, apellidom, sexo, correo, estado)
    values
    ($1, $2, $3, $4, $5, $6, $7)`,
      [codigod, nombres, apellidop, apellidom, sexo, correo, estado]
    );
    return resultados;
  },

  async obtenerDocentePorId(codigod) {
    const resultados = await conexion.query(
      `select codigod, nombres, apellidop, apellidom, sexo, correo, estado from docente where codigod = $1`,
      [codigod]
    );
    return resultados.rows[0];
  },

  async actualizarDocente(codigod, estado) {
    let resultados = await conexion.query(
      `update docente
    set estado = $1
    where codigod = $2`,
      [estado, codigod]
    );
    return resultados;
  },

  async insertarListaDocente(user, codigod) {
    let today = new Date().toLocaleDateString();
    var tipo = "TR1";
    let resultados = await conexion.query(
      `insert into listadocente
    (fecha, idtiporegistro, codigod, idencargado)
    values
    ($1, $2, $3, $4)`,
      [today, tipo, codigod, user]
    );
    return resultados;
  },

  async insertarListaDocente2(user, codigod, estado) {
    let today = new Date().toLocaleDateString();
    var tipo;
    if (estado === 1) {
      tipo = "TR2";
    } else {
      tipo = "TR3";
    }
    let resultados = await conexion.query(
      `insert into listadocente
        (fecha, idtiporegistro, codigod, idencargado)
        values
        ($1, $2, $3, $4)`,
      [today, tipo, codigod, user]
    );
    return resultados;
  },

  //
  //Consultas Materia
  //

  async obtenerMaterias() {
    const resultados = await conexion.query(
      "select siglam, grupom, nombremat, estado, codigoc, planc from materia"
    );
    return resultados.rows;
  },

  async insertarMateria(siglam, grupom, nombremat, codigoc, planc) {
    var estado = 1;
    let resultados = await conexion.query(
      `insert into materia
    (siglam, grupom, nombremat, estado, codigoc, planc)
    values
    ($1, $2, $3, $4, $5, $6)`,
      [siglam, grupom, nombremat, estado, codigoc, planc]
    );
    return resultados;
  },

  async obtenerMateriaPorId(siglam, grupom) {
    const resultados = await conexion.query(
      `select siglam, grupom, nombremat, estado, codigoc, planc from materia where siglam = $1 and grupom = $2`,
      [siglam, grupom]
    );
    return resultados.rows[0];
  },

  async actualizarMateria(siglam, grupom, estado) {
    let resultados = await conexion.query(
      `update materia
    set estado = $1
    where siglam = $2
    and grupom =$3`,
      [estado, siglam, grupom]
    );
    return resultados;
  },

  async insertarListaMateria(user, siglam, grupom) {
    let today = new Date().toLocaleDateString();
    var tipo = "TR10";
    let resultados = await conexion.query(
      `insert into listamateria
    (fecha, idtiporegistro, siglam, grupom, idencargado)
    values
    ($1, $2, $3, $4, $5)`,
      [today, tipo, siglam, grupom, user]
    );
    return resultados;
  },

  async insertarListaMateria2(user, siglam, grupom, estado) {
    let today = new Date().toLocaleDateString();
    var tipo;
    if (estado == 1) {
      tipo = "TR11";
    } else {
      tipo = "TR12";
    }
    let resultados = await conexion.query(
      `insert into listamateria
        (fecha, idtiporegistro, siglam, grupom, idencargado)
        values
        ($1, $2, $3, $4, $5)`,
      [today, tipo, siglam, grupom, user]
    );
    return resultados;
  },

  ////CONSULTAS CARGA HORARIA

  async obtenerCargaHoraria() {
    const resultados = await conexion.query(
      "select idcargah, descripcion, estado, idsemestre, codigoc, planc, siglam, grupom, codigod, idperiodo, duracion, idaula, iddia from cargahoraria"
    );
    return resultados.rows;
  },

  async insertarCargaHoraria(
    idcargah,
    descripcion,
    idsemestre,
    codigoc,
    planc,
    siglam,
    grupom,
    codigod,
    idperiodo,
    duracion,
    idaula,
    iddia
  ) {
    var estado = 1;
    let resultados = await conexion.query(
      `insert into cargahoraria
    (idcargah, descripcion, estado, idsemestre, codigoc, planc, siglam, grupom, codigod, idperiodo, duracion, idaula, iddia)
    values
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        idcargah,
        descripcion,
        estado,
        idsemestre,
        codigoc,
        planc,
        siglam,
        grupom,
        codigod,
        idperiodo,
        duracion,
        idaula,
        iddia,
      ]
    );
    return resultados;
  },

  async obtenerCargaHorariaPorId(idcargah) {
    const resultados = await conexion.query(
      `select * from cargahoraria where idcargah = $1`,
      [idcargah]
    );
    return resultados.rows[0];
  },

  async actualizarCargaHoraria(idcargah, estado) {
    let resultados = await conexion.query(
      `update cargahoraria
    set estado = $1
    where idcargah = $2`,
      [estado, idcargah]
    );
    return resultados;
  },

  async insertarListaCargaHoraria(user, idcargah) {
    let today = new Date().toLocaleDateString();
    var tipo = "TR13";
    let resultados = await conexion.query(
      `insert into listacargah
    (fecha, idtiporegistro, idcargah, idencargado)
    values
    ($1, $2, $3, $4)`,
      [today, tipo, idcargah, user]
    );
    return resultados;
  },

  async insertarListaCargaHoraria2(user, idcargah, estado) {
    let today = new Date().toLocaleDateString();
    var tipo;
    if (estado == 1) {
      tipo = "TR14";
    } else {
      tipo = "TR15";
    }
    let resultados = await conexion.query(
      `insert into listacargah
        (fecha, idtiporegistro, idcargah, idencargado)
        values
        ($1, $2, $3, $4)`,
      [today, tipo, idcargah, user]
    );
    return resultados;
  },

  async obtenerSemestre() {
    const resultados = await conexion.query("select * from semestre");
    return resultados.rows;
  },

  async obtenerPeriodo() {
    const resultados = await conexion.query("select * from periodo");
    return resultados.rows;
  },

  async obtenerDia() {
    const resultados = await conexion.query("select * from dia");
    return resultados.rows;
  },
};
