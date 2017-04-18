// This file holds the state of the server. 
// The state of the server = the states of the tasks. 

const tasks = {
  0: {
    id: 0,
    name: 'Feature extraction',
    description: 'Lorem ipsum ',
    startTime: '16:34:55',
    progress: 0.72
  },
  1: {
    id: 1,
    name: 'Normalizer tuning',
    startTime: '17:23:12',
    progress: 0.29
  },
  2: {
    id: 2,
    name: 'Syntactic parsing for MPQA asdf qwer asd',
    startTime: '23:34:22',
    progress: 0.89
  }
}

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
