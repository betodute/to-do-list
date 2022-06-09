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
      printNewTask(response.task);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var markComplete = function (taskID) {
  $.ajax({
    type: 'PUT',
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${taskID}/mark_complete?api_key=389`,
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var markActive = function (taskID) {
  $.ajax({
    type: 'PUT',
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${taskID}/mark_active?api_key=389`,
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var getAllComplete = function () {
  $('.list-container').empty();
  checkAPIComplete();
}

var getAllActive = function () {
  $('.list-container').empty();
  checkAPIActive();
}

var deleteTask = function (taskID) {
  $.ajax({
    type: 'DELETE',
    url: `https://altcademy-to-do-list-api.herokuapp.com/tasks/${taskID}?api_key=389`,
    success: function (response, textStatus) {
      getTasks(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var printNewTask = function (element) {
 var taskDiv = $(document.createElement('div'));
 taskDiv.addClass(`col-12 m-2 list-item`);

 if (element.completed == true) {
  taskDiv.html(`${element.content} <input id=${element.id} class="check" type="checkbox" checked/> <button id=${element.id} class="delete btn m-2 btn-outline-danger"> Delete </button>`);
 } else {
  taskDiv.html(`${element.content} <input id=${element.id} class="check" type="checkbox"/> <button id=${element.id} class="delete btn m-2 btn-outline-danger"> Delete </button>`);
 }

 $('.list-container').append(taskDiv);
 $('#userInput').val('')
}

var getTasks = function (response) {
  $(response.tasks).each(function(index, element) {
    printNewTask(element)
  })
}

var getCompletedTasks = function (response) {
  $(response.tasks).each(function(index, element) {
    if (element.completed == true) {
      printNewTask(element);
    }
  })
}

var getActiveTasks = function (response) {
  $(response.tasks).each(function(index, element) {
    if (element.completed == false) {
      printNewTask(element);
    }
  })
}

var checkAPI = function () { 
  $.ajax({
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
}

var checkAPIComplete = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=389',
    dataType: 'json',
    success: function (response, textStatus) {
      getCompletedTasks(response)
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
    });
}

var checkAPIActive = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=389',
    dataType: 'json',
    success: function (response, textStatus) {
      getActiveTasks(response)
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
    });
}

$(document).ready(function () {

  // CHECK API FOR EXISTING TASKS
  
  checkAPI();


  // EVENT LISTENERS

  $('#newTask').on('submit', function (event) {
    event.preventDefault();
    var userInput = $('#userInput').val();
    
    // The following ternary filters out blank inputs

    userInput ? postNewTask(userInput) : alert("Cannot Submit Blank Input")

  })

  $(document).on('click', '.delete', function () {
    $(this).closest('div').remove();
    deleteTask(this.id);
  })

  $(document).on('click', '.check', function () {
    this.checked? markComplete(this.id) : markActive(this.id);
  });

  $(document).on('click', '.completed', function () {
    getAllComplete();
  })

  $(document).on('click', '.active-tasks', function () {
    getAllActive();
  })

  $(document).on('click', '.all-tasks', function () {
    $('.list-container').empty();
    checkAPI();
  } )

})