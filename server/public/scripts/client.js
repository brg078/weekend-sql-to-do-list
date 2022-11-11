$(document).ready(function(){
    console.log('jQuery sourced.');

    clickListeners();
  });


  function clickListeners() {
    $('#submit').on('click', submitClicked);
  }


  function submitClicked() {
    let taskCheck = {};
    taskCheck.name = $('#taskInputField').val();
    if (taskCheck.name == '') {
        console.log('no task!', taskCheck)
        alert('Please enter a task!');
    } else {
        console.log('some task in there', taskCheck)
        addTask(taskCheck);
    }
  }


function addTask() { //adds a book to the database

}


// BEGIN BUILDING AJAX WITH ADD TASK
function addTask(taskToAdd) {
    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: taskToAdd,
      }).then(function(response) {
        console.log('Response from server.', response);
        refreshTasks();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
      });
  }