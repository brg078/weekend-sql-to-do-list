$(document).ready(function(){       //~~~!!!ORIGIN
    console.log('jQuery sourced.');
    clickListeners();
    refreshTasks();
  });      //END ready INVOKES (clickListeners)(refreshTasks)


function clickListeners() {         //ORIGIN: (ready)
    $('#submit').on('click', addTask);
}          //END clickListeners INVOKES (addTask)


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


function refreshTasks() {           //ORIGIN: (addTask)
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


function renderTasks(tasks) {       //ORIGIN: (refreshTasks)
    $('#tasklistbody').empty();
    for(let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      // For each task, append a new row to our table
      $('#tasklistbody').append(`
        <tr>
          <td>${task.name}</td>
          <td><button class="taskdone-btn" data-id="${task.id}">Task Done!</td>
          <td><button class="delete-btn" data-id="${task.id}">DELETE</button></td>
        </tr>
      `);
    }
}          //END renderTasks!!!~~~




// FRONT END DONE FOR GET/POST/RENDER, BUILD SERVER JS AND ROUTER, AND DATA BASE