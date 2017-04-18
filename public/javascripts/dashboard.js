function refresh() {
  // Check for new tasks or deleted tasks
  Q.allTasks().done(tasks => {
    tasks.forEach(t => {
      if ($(`#taskItem-${t.id}`).length == 0) {
        const taskItem = createTaskItem(t);
        $('#ulTasks').append(createTaskItem(t))
        console.log(`#taskItem-${t.id}`)
        $(`#taskItem-${t.id}`).on('click', function (e) {
          const taskId = $(this).attr('id').split('-')[1];

          // Mark as selected visually
          const CSS = {
            SelectedTaskItem: {
              background: '#EEE'
            },
            UnselectedTaskItem: {
              background: 'unset'
            }
          }
          $(this).css(CSS.SelectedTaskItem);
          $(`#taskItem-${lastSelectedTaskId}`).css(CSS.UnselectedTaskItem);

          if (taskId in detailPanes) {
            // Show the detailed pane
          }
          else {
            // Create a detailed pane
            Q.getTaskById(taskId).done(t => {
              const detailedPaneContent = createDetailPane(t);
              $('.rightPane').html(detailedPaneContent);
            });
          }

          lastSelectedTaskId = taskId;
          
        })
      }
    });
  });

  // Update task progress
  Q.allTasks().done(tasks => {
    tasks.forEach(t => {
      Q.progressOf(t.id).done(response => {
        $(`#taskProgress-${t.id}`).text(Math.floor(t.progress * 100));
      });
    });
  });
}

const detailPanes = {};  // Caches detail panes
let lastSelectedTaskId = -1;


function createTaskItem(task) {
  return `
    <li id="taskItem-${task.id}" class="task">
      <div id="taskIndicator-${task.id}" class="indicator">
        <svg height="22" width="22">
          <circle cx="11" cy="11" r="10" stroke-width="1" stroke="#eee" fill="transparent"></circle>
          <circle cx="11" cy="11" r="10" stroke-dasharray="62.8" stroke-dashoffset="50" stroke-width="2" stroke="#999" fill="transparent"></circle>
          <text id="taskProgress-${task.id}" x="11" y="11" fill="#999" text-anchor="middle" alignment-baseline="central" font-size="10px">${Math.floor(task.progress * 100)}</text>
        </svg>
      </div>
      <div class="main">
        <div class="head">
          <div id="taskName-${task.id}" class="name">${task.name}</div>
          <div id="taskStartTime-${task.id}" class="startTime">${task.startTime}</div>
        </div>
        <div id="taskDescription-${task.id}" class="description">
          ${task.description}
        </div>
      </div>
    </li>  
  `;
}

function createDetailPane(task) {
  return `
    <div class="detail">
        <div class="taskName">${task.name}</div>
        <div class="taskId">Task ID: ${task.id}</div>
        <div class="taskDescription">${task.description}</div>
        <div class="progressBar">
            <div class="progress"></div>
        </div>
        <div class="progressDetail">
          <span>72</span> / <span>100</span>
        </div>
        <div class="terminal">
            <div class="title">output.txt</div>
            <div class="subtitle">/afs/cs.pitt.edu/usr0/yuhuan/work/runs/experiment-1/output.txt</div>
            <div class="line"></div>
            <div class="content">
                Started feature extraction ...
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8
                <br>Num of threads: 8</div>
        </div>
        <div class="terminal">
            <div class="title">error.txt</div>
            <div class="subtitle">/afs/cs.pitt.edu/usr0/yuhuan/work/runs/experiment-1/error.txt</div>
            <div class="line"></div>
            <div class="content">
                Unrecognizable unicode character 0x123F
                <br>Unrecognizable unicode character 0xFFFF</div>
        </div>
    </div>
  `;
}

$(() => {

  refresh();

  
  setInterval(refresh, 1000);

})