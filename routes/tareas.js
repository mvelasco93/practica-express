var express = require('express');
var router = express.Router();
var Proyecto = require('../models/proyectos');
var Tarea = require('../models/tareas');

router.get('/:nombre', function(req, res, next) {
    var nombre = req.params.nombre;

    Proyecto.find().where('nombre').equals(nombre).exec(function(err, data){
        if (err) {
            res.send(err);
        }
        var id;
        for (i=0; i<data.length; i++) {
            if ((data[i].nombre) === nombre){
                var id = data[i].id;
            }
        }
        Tarea.find().where('proyecto').equals(id).exec(function(err, data2){
            res.json(data2);
        });
    });
});

router.post('/', function(req, res, next){
    var tarea = new Tarea({titulo : req.body.titulo , descripcion : req.body.descripcion , responsable : req.body.responsable , estado : 1 , proyecto : "588ac31b793b62329486106d"});

    tarea.save(function(err){
        if (err) return handleError(err);
    });
    res.send("Tarea Guardada Con Exito")
});

router.delete('/:idTarea', function(req, res, next){
    var id = req.params.idTarea;
    Tarea.remove({
        titulo: id
    });
    tarea.save(function(err){
        if (err) return handleError(err);
    });
    res.send("Tarea Guardada Con Exito")
});

module.exports = router;
