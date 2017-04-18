// APIs for task CRUD
// The state of the server is stored in ../core/Q.js

var express = require('express');
var router = express.Router();

const Q = require('../core/Q');

let lastId = Q.taskTotalCount() - 1;
console.log(lastId);

//TODO: how to ensure this is atomic?
function generateNewId() {
  lastId += 1;
  return lastId;
}

const StandardResponse = {
  Success: "success",
  Failure: "failure"
};


// Accessor methods

router.get('/list', (req, res, next) => {
  res.json(Q.allTasks());
});

router.get('/:id', (req, res, next) => res.json(Q.getTaskById(req.params.id)) );
router.get('/:id/name', (req, res, next) => res.json( { result: Q.nameOf(req.params.id) } ) );
router.get('/:id/description', (req, res, next) => res.json( { result: Q.descriptionOf(req.params.id) } ) );
router.get('/:id/progress', (req, res, next) => res.json( { result: Q.progressOf(req.params.id) } ) );
router.get('/:id/exists', (req, res, next) => res.json( { result: Q.exists(req.params.id) } ) );

// Modifier methods

// Adds a new task. A new ID will be assigned and returned.
router.put('/', (req, res, next) => {
  const newId = generateNewId();
  const body = req.body;
  const newTask = {
    id: newId,
    name: body.name,
    description: body.description,
    progress: body.progress
  };
  Q.addTask(newTask);
  res.json(newTask);
});

router.put('/:id/name', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  if ('newValue' in body) {
    Q.setNameOf(id, body.newValue);
    res.send(StandardResponse.Success);
  }
  else res.send(StandardResponse.Failure);
});

router.put('/:id/description', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  if ('newValue' in body) {
    Q.setDescriptionOf(id, body.newValue);
    res.send(StandardResponse.Success);
  }
  else res.send(StandardResponse.Failure);
});

router.put('/:id/progress', (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  if ('newValue' in body) {
    Q.setProgressOf(id, parseFloat(body.newValue));
    res.send(StandardResponse.Success);
  }
  else res.send(StandardResponse.Failure);
});

module.exports = router;
