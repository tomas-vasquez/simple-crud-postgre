//fAulaEditar


/*<div class="form-group">
            <label for="nombre">Capacidad</label>
            <input value="<%= aulas.capacidad %>" required id="capacidad" placeholder="Capacidad"
                class="form-control" type="number" name="capacidad">
</div>*/

let today = new Date().toLocaleDateString()

console.log(today)


router.post('/fAulaInsertar', function (req, res, next) {
    const { id, capacidad} = req.body;
    if (!id || !capacidad) {
        return res.status(500).send("Por favor llene todos los datos");
    }
    // Si todo va bien, seguimos
    encargadoModel
        .insertarAula(id, capacidad)
        .then(idAula => {
            res.redirect("/encargado/fAula");
        })
        .catch(err => {
            return res.status(500).send("Error insertando Aula");
        });
  });