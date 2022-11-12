$(document).ready(function(){       //~~~!!!ORIGIN
    console.log('jQuery sourced.');
    clickListeners();
    refreshTasks();
});      //END ready INVOKES (clickListeners)(refreshTasks)


function clickListeners() {         //ORIGIN: (ready)
    $('#submit').on('click', addTask);
    $('#tasklistbody').on('click', '.taskDoneButton', taskDone);
    $('#tasklistbody').on('click', '.taskNotDoneButton', taskNotDone);
    $('#tasklistbody').on('click','.deleteButton', deleteTask);

}          //END clickListeners INVOKES (addTask)(taskDone)(deleteTask)(taskNotDone)


function addTask() {                //ORIGIN: (clickListeners)
    // console.log('Submit task button clicked, in addTask!');
    let task = {};
    task.name = $('#taskInputField').val();
    if (task.name == '') {
        console.log('no task!', task)
        alert('Please enter a task!');
    } else {
        console.log('some task in there', task)
        // task.XXXPROPERTYXXX = $('#PROPERTY').val();    FOR ADDING FURTHER PROPERTIES TO TASK LIST
        $.ajax({
        type: 'POST',
        url: '/tasks',
        data: task,
        }).then(function(response) {
            console.log('Response from server.', response);
            refreshTasks();
        }).catch(function(error) {
            console.log('Error in POST', error)
            alert('Unable to add task at this time. Please try again later.');
        });
  
    }
}         //END addTask INVOKES (AJAX POST) (refreshTasks)


function refreshTasks() {           //ORIGIN: (addTask)(taskDone)(taskNotDone)
    $.ajax({
      type: 'GET',
      url: '/tasks'
    }).then(function(response) {
      console.log(response);
      renderTasks(response);
    }).catch(function(error){
      console.log('error in GET', error);
    });
}         //END refreshTasks INVOKES (AJAX GET)(renderTasks)


function taskDone() {               //ORIGIN: (clickListeners)
    console.log('putresponse')    
    const id = $(this).data('id');
    const task = $(this).data('id');
    console.log('in taskDone', id, task);

    $.ajax({
      method: 'PUT',
      url: `/tasks/isdone/${id}`,
      data: {
       task: task
      }
    })
    .then(function() {
      refreshTasks();
    })
    .catch(function(error) {
      console.log(`IN PUT TASK`, error);
    })
}        //END taskDone INVOKES (AJAX PUT)(refreshTasks)


function taskNotDone(){              //ORIGIN: (clickListeners)
    const id = $(this).data('id');
    const task = $(this).data('id');
    console.log('in taskNotDone', id, task);

    $.ajax({
      method: 'PUT',
      url: `/tasks/isnotdone/${id}`,
      data: {
       task: task
      }
    })
    .then(function() {
      refreshTasks();
    })
    .catch(function(error) {
      console.log(`IN PUT TASK NOT DONE`, error);
    })
}       //END taskNotDone INVOKES (AJAX PUT)(refreshTasks)


function deleteTask(){              //ORIGIN: (clickListeners)
    console.log('in deleteTask');
    const taskId = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`
    })
    .then(function() {
        refreshTasks();
    })
    .catch(function(error) {
        alert(`DELETE TASK ${error}`);
    })
}          //END deleteTask INVOKES (AJAX DELETE)(refreshTasks)


function renderTasks(tasks) {       //ORIGIN: (refreshTasks)
    $('#tasklistbody').empty();
    for(let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
        if (task.isDone == false){
            // console.log('detecting boolean');
            $('#tasklistbody').append(`
                <tr class="taskNotDoneRow">
                    <td>${task.name}</td>
                    <td><button class="taskDoneButton" data-id="${task.id}">Mark Task Complete</td>
                    <td><button class="deleteButton" data-id="${task.id}">Delete Task</button></td>
                </tr>
            `);
        } else {
            console.log('not detecting boolean FALSE');
        }
    }
    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
          if (task.isDone == true){
            //   console.log('detecting boolean');
              $('#tasklistbody').append(`
                  <tr class="taskDoneRow">
                      <td>${task.name}</td>
                      <td><button class="taskNotDoneButton" data-id="${task.id}">Mark Task Incomplete</td>
                      <td><button class="deleteButton" data-id="${task.id}">Delete Task</button></td>
                  </tr>
              `);
          } else {
              console.log('not detecting boolean TRUE');
          }
      }





}          //END renderTasks!!!~~~