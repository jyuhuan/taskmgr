// This file holds the state of the server. 
// The state of the server = the states of the tasks. 

const fs = require('fs');
const f = fs.readFileSync(`${__dirname}/data.json`);

const json = JSON.parse(f);
console.log(json);

// All tasks are stored here. 
const tasks = json.tasks;

const ε = module.exports;

// Accessor methods

ε.taskTotalCount = () => Object.keys(tasks).length;
ε.allTasks = () => Object.keys(tasks).map(k => tasks[k]);
ε.exists = (id) => id in tasks;
ε.getTaskById = (id) => tasks[id];
ε.nameOf = (id) => tasks[id].name;
ε.descriptionOf = (id) => tasks[id].description;
ε.progressOf = (id) => (id in tasks) ? tasks[id].progress : 0.0;

ε.propOf = (id, prop) => tasks[id][prop];


// Modifier methods
ε.addTask = (task) => tasks[task.id] = task;
ε.removeTask = (id) => delete tasks[id];
ε.setNameOf = (id, n) => tasks[id].name = n;
ε.setDescriptionOf = (id, d) => tasks[id].description = d;
ε.setProgressOf = (id, p) => tasks[id].progress = p;
ε.setPropOf = (id, k, v) => tasks[id][k] = v;
