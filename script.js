var createNewTask = function (userInput) {
 var taskDiv = $(document.createElement('div'));
 taskDiv.addClass("col-12 m-1")

 taskDiv.html(`${userInput} <button class="btn m-1 btn-outline-danger"> Delete </button>`);

 $('.list').append(taskDiv);
 $('#userInput').val('')
}

$(document).ready(function () {

  $('#newTask').on('submit', function(event){
    event.preventDefault();
    var userInput = $('#userInput').val();
    
    // The following ternary filters out blank inputs

    userInput ?
    createNewTask(userInput) :
    alert("Cannot Submit Blank Input")
  })
})