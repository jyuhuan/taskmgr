// Methods for managing the state of the server. 
// The state of the server is the states of the tasks. 
// The exported methods are the actual methods that the REST APIs in ../rountes/tasks.js call. 

const fs = require('fs');
const f = fs.readFileSync(`${__dirname}/data.json`);

const json = JSON.parse(f);

// All tasks are stored here. 
const tasks = json.tasks;

// Rename module.exports for brevity
const ε = module.exports;

// ACCESSOR METHODS

// Direct property access
ε.totalTaskCount = () => Object.keys(tasks).length;
ε.allTasks = () => Object.keys(tasks).map(k => tasks[k]);
ε.exists = (id) => id in tasks;
ε.getTaskById = (id) => tasks[id];
ε.nameOf = (id) => tasks[id].name ? tasks[id].name : "";
ε.descriptionOf = (id) => tasks[id].description ? tasks[id].description : "";
ε.stepsOf = (id) => tasks[id].steps;
ε.maxOf = (id) => tasks[id].max;

// Computed property access
ε.progressOf = (id) => ε.stepsOf(id) / ε.maxOf(id) * 100;
ε.formattedProgressOf = (id) => Math.floor(ε.stepsOf(id) / ε.maxOf(id) * 100).toString();

// General accessor methods
ε.intPropOf = (id, prop) => tasks[id][prop];
ε.floatPropOf = (id, prop) => tasks[id][prop];
ε.stringPropOf = (id, prop) => tasks[id][prop];


// Modifier methods
ε.addTask = (task) => tasks[task.id] = task;
ε.setNameOf = (id, n) => tasks[id].name = n;
ε.setDescriptionOf = (id, d) => tasks[id].description = d;
ε.setStepsOf = (id, p) => tasks[id].steps = p;
ε.setMaxOf = (id, p) => tasks[id].max = p;

// General modifier methods
ε.setPropOf = (id, k, v) => tasks[id][k] = v;
ε.setIntPropOf = (id, k, v) => tasks[id][k] = parseInt(v);
ε.setFloatPropOf = (id, k, v) => tasks[id][k] = parseFloat(v);
ε.setStringPropOf = (id, k, v) => tasks[id][k] = v.toString();
