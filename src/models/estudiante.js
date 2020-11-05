const conexion = require("../dbConfig");
module.exports = {
  //OBtener

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

  async obtenerCarreras() {
    const resultados = await conexion.query(
      "select codigoc, planc, nombrecarrera, estado from carrera"
    );
    return resultados.rows;
  },

  async obtenerCarrerasPorId(codigoc, planc) {
    const resultados = await conexion.query(
      `select codigoc, planc, nombrecarrera, estado from carrera where codigoc = $1 and planc =$2`,
      [codigoc, planc]
    );
    return resultados.rows[0];
  },

  async obtenerDocentes() {
    const resultados = await conexion.query(
      "select codigod, nombres, apellidop, apellidom, sexo, correo, estado from docente"
    );
    return resultados.rows;
  },

  async obtenerDocentePorId(codigod) {
    const resultados = await conexion.query(
      `select codigod, nombres, apellidop, apellidom, sexo, correo, estado from docente where codigod = $1`,
      [codigod]
    );
    return resultados.rows[0];
  },

  async obtenerInfoDocenteFromCH(codigod) {
    const resultados = await conexion.query(
      `select ch.* , d.* as d
    from cargahoraria ch
    inner join docente d
    on ch.codigod = d.codigod
    where ch.codigod = $1`,
      [codigod]
    );
    return resultados.rows[0];
  },

  async obtenerMaterias() {
    const resultados = await conexion.query(
      "select siglam, grupom, nombremat, estado, codigoc, planc from materia"
    );
    return resultados.rows;
  },

  async obtenerMateriaPorId(siglam, grupom) {
    const resultados = await conexion.query(
      `select siglam, grupom, nombremat, estado, codigoc, planc from materia where siglam = $1 and grupom = $2`,
      [siglam, grupom]
    );
    return resultados.rows[0];
  },

  async obtenerCargaHoraria() {
    const resultados = await conexion.query(
      "select idcargah, descripcion, estado, idsemestre, codigoc, planc, siglam, grupom, codigod, idperiodo, duracion, idaula, iddia from cargahoraria"
    );
    return resultados.rows;
  },

  async obtenerCargaHorariaPorId(idcargah) {
    const resultados = await conexion.query(
      `select * from cargahoraria where idcargah = $1`,
      [idcargah]
    );
    return resultados.rows[0];
  },

  async obtenerCargaHorariaPorSemestreMat(codigoc, planc, semestre) {
    const resultados = await conexion.query(
      `select ch.*, s.* as s 
    from cargahoraria ch
    inner join semestre s
    on ch.idsemestre = s.idsemestre
    where codigoc = $1
    and planc = $2
    and ch.idsemestre = $3`,
      [codigoc, planc, semestre]
    );
    return resultados.rows[0];
  },

  async obtenerCHSemestreLunes(codigoc, planc, semestre) {
    var dia = "Dia1";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigoc = $1
    and planc = $2
    and idsemestre = $3
    and iddia = $4`,
      [codigoc, planc, semestre, dia]
    );
    return resultados.rows;
  },

  async obtenerCHSemestreMartes(codigoc, planc, semestre) {
    var dia = "Dia2";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigoc = $1
    and planc = $2
    and idsemestre = $3
    and iddia = $4`,
      [codigoc, planc, semestre, dia]
    );
    return resultados.rows;
  },

  async obtenerCHSemestreMiercoles(codigoc, planc, semestre) {
    var dia = "Dia3";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigoc = $1
    and planc = $2
    and idsemestre = $3
    and iddia = $4`,
      [codigoc, planc, semestre, dia]
    );
    return resultados.rows;
  },

  async obtenerCHSemestreJueves(codigoc, planc, semestre) {
    var dia = "Dia4";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigoc = $1
    and planc = $2
    and idsemestre = $3
    and iddia = $4`,
      [codigoc, planc, semestre, dia]
    );
    return resultados.rows;
  },

  async obtenerCHSemestreViernes(codigoc, planc, semestre) {
    var dia = "Dia5";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigoc = $1
    and planc = $2
    and idsemestre = $3
    and iddia = $4`,
      [codigoc, planc, semestre, dia]
    );
    return resultados.rows;
  },

  async obtenerCHSemestreSabado(codigoc, planc, semestre) {
    var dia = "Dia6";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigoc = $1
    and planc = $2
    and idsemestre = $3
    and iddia = $4`,
      [codigoc, planc, semestre, dia]
    );
    return resultados.rows;
  },

  ///////////////ch docente

  async obtenerCHDocenteLunes(codigod) {
    var dia = "Dia1";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigod = $1
    and iddia = $2`,
      [codigod, dia]
    );
    return resultados.rows;
  },

  async obtenerCHDocenteMartes(codigod) {
    var dia = "Dia2";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigod = $1
    and iddia = $2`,
      [codigod, dia]
    );
    return resultados.rows;
  },

  async obtenerCHDocenteMiercoles(codigod) {
    var dia = "Dia3";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigod = $1
    and iddia = $2`,
      [codigod, dia]
    );
    return resultados.rows;
  },

  async obtenerCHDocenteJueves(codigod) {
    var dia = "Dia4";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigod = $1
    and iddia = $2`,
      [codigod, dia]
    );
    return resultados.rows;
  },

  async obtenerCHSDocenteViernes(codigod) {
    var dia = "Dia5";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigod = $1
    and iddia = $2`,
      [codigod, dia]
    );
    return resultados.rows;
  },

  async obtenerCHDocenteSabado(codigod) {
    var dia = "Dia6";
    const resultados = await conexion.query(
      `select *,  i.horaini as i, f.horafin as fin
    from cargahoraria 
    inner join periodo i on cargahoraria.idperiodo = i.idperiodo 
    inner join periodo f on cargahoraria.idperiodofin = f.idperiodo
    where codigod = $1
    and iddia = $2`,
      [codigod, dia]
    );
    return resultados.rows;
  },

  /*SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID*/
};
