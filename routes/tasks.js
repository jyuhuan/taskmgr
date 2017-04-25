// APIs for task CRUD
// The data of the tasks is in ../core/Q.js

const DEBUG = true;

const express = require('express');
const router = express.Router();

const Q = require('../core/Q');
const Error = require('../core/Error');

let lastId = Q.totalTaskCount() - 1;

//TODO: how to ensure this is atomic?
function generateNewId() {
  lastId += 1;
  return lastId;
}

/**
 * A success message.
 */
const Success = (data) => {
  return { "status": "success", "data": data };
};

/**
 * A failure message.
 * @param {*} The error code.
 */
const Failure = (code) => { 
  return { "status": "failure", "code": code };
};

/**
 * 
 * @param {number} id The task ID. 
 * @param {*} f 
 */
const tryId = (id, f) => Q.exists(id) ? Success(f(id)) : Failure(Error.TaskNotExist)


// ACCESSOR METHODS

router.get('/', (req, res, next) => res.json(Success(Q.allTasks())));
router.get('/count', (req, res, next) => res.json(Success(Q.totalTaskCount())));

// Direct property access
router.get('/:id',             (req, res, next) => res.json(tryId(req.params.id, Q.getTaskById)));
router.get('/:id/name',        (req, res, next) => res.json(tryId(req.params.id, Q.nameOf)));
router.get('/:id/description', (req, res, next) => res.json(tryId(req.params.id, Q.descriptionOf)));
router.get('/:id/steps',       (req, res, next) => res.json(tryId(req.params.id, Q.stepsOf)));
router.get('/:id/max',         (req, res, next) => res.json(tryId(req.params.id, Q.maxOf)));
router.get('/:id/exists',      (req, res, next) => res.json(Success(Q.exists(req.params.id))));

// Computed property access
router.get('/:id/progress',           (req, res, next) => res.json(tryId(req.params.id, Q.progressOf)));
router.get('/:id/formatted-progress', (req, res, next) => res.json(tryId(req.params.id, Q.formattedProgressOf)));



// MODIFIER METHODS

// Adds a new task. A new ID will be assigned and returned.
router.post('/', (req, res, next) => {
  const newId = generateNewId();
  const body = req.body;
  if (DEBUG) console.log(req.body);
  Q.addTask({
    id: newId,
    name: body.name,
    description: body.description,
    steps: body.steps,
    max: body.max
  });
  res.json(Success(newId));
});

const tryChangePropertyOfTask = (taskId, propName, newValue) => {
  if (!newValue) return Failure(Error.NewPropertyValueMissing);
  if (!Q.exists(taskId)) return Failure(Error.TaskNotExist);
  Q.setPropOf(taskId, propName, newValue);
  return Success(true);
};

// Changes the name of a task
router.put('/:id/name',        (req, res, next) => res.json(tryChangePropertyOfTask(req.params.id, 'name', req.body.val)));
router.put('/:id/description', (req, res, next) => res.json(tryChangePropertyOfTask(req.params.id, 'description', req.body.val)));
router.put('/:id/steps',       (req, res, next) => res.json(tryChangePropertyOfTask(req.params.id, 'steps', parseInt(req.body.val))));
router.put('/:id/max',         (req, res, next) => res.json(tryChangePropertyOfTask(req.params.id, 'max', parseInt(req.body.val))));

router.put('/:id/finish', (req, res, next) => {
  const id = req.params.id;
  if (Q.exists(id)) {
    Q.setStepsOf(id, Q.maxOf(id));
    res.send(Success(true));
  }
  else res.json(Failure(Error.TaskNotExist));
})

module.exports = router;
