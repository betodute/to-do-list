var postNewTask = function (userInput) {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=389',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: `${userInput}`
      }
    }),
    success: function (response, textStatus) {
      printNewTask(response.task.content);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var printNewTask = function (userInput) {
 var taskDiv = $(document.createElement('div'));
 taskDiv.addClass("col-12 m-1")

 taskDiv.html(`${userInput} <button class="btn m-1 btn-outline-danger"> Delete </button>`);

 $('.list').append(taskDiv);
 $('#userInput').val('')
}

var getTasks = function (response) {
  $(response.tasks).each(function(index, element) {
    printNewTask(element.content)
  })
}

$(document).ready(function () {

  // CHECK API FOR EXISTING TASKS

  var checkAPI = $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=389',
    dataType: 'json',
    success: function (response, textStatus) {
      getTasks(response)
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });


  // NEW TASK

  $('#newTask').on('submit', function(event){
    event.preventDefault();
    var userInput = $('#userInput').val();
    
    // The following ternary filters out blank inputs

    userInput ?
    postNewTask(userInput) :
    alert("Cannot Submit Blank Input")

  })
})