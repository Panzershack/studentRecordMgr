$(document).ready(function () {
  // Function to fetch and display all students
  function showAllStudents() {
    $.ajax({
      url: "/students",
      dataType: "json",
      success: function (data) {
        displayStudents(data);
      },
    });
  }

  // Function to display the students
  function displayStudents(students) {
    var tableBody = $("#students-body");
    tableBody.empty();

    $.each(students, function (index, student) {
      var row = $("<tr></tr>");
      row.append("<td>" + student.SID + "</td>");
      row.append("<td>" + student.FirstName + "</td>");
      row.append("<td>" + student.LastName + "</td>");
      row.append("<td>" + student.Email + "</td>");
      row.append("<td>" + student.NearCity + "</td>");
      row.append("<td>" + student.Course + "</td>");
      row.append("<td>" + student.Guardian + "</td>");
      row.append("<td>" + student.Subjects + "</td>");

      // Add click event listener to row
      row.click(function () {
        populateForm(student);
      });

      tableBody.append(row);
    });
  }

  // Function to populate the form with student data
  function populateForm(student) {
    $("#sid-input").val(student.SID);
    $("#first-name-input").val(student.FirstName);
    $("#last-name-input").val(student.LastName);
    $("#email-input").val(student.Email);
    $("#near-city-input").val(student.NearCity);
    $("#course-input").val(student.Course);
    $("#guardian-input").val(student.Guardian);
    $("#subjects-input").val(student.Subjects);
  }

  // Function to update a student record
  function updateStudent(sid, updatedStudent) {
    sid = parseInt(sid); // Parse the sid parameter as an integer
    $.ajax({
      url: `/students/${sid}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(updatedStudent),
      success: function () {
        showAllStudents();
        clearForm();
        showSuccessMessage("Student record updated successfully.");
      },
      error: function () {
        showErrorMessage("Failed to update student record.");
      },
    });
  }

  // Function to delete a student record
  function deleteStudent(sid) {
    fetch(`/students/${parseInt(sid)}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          showAllStudents();
          clearForm();
          showSuccessMessage("Student record deleted successfully.");
        } else {
          showErrorMessage("Failed to delete student record.");
        }
      })
      .catch((error) => {
        showErrorMessage("Failed to delete student record: " + error.message);
      });
  }

  // Function to clear the form
  function clearForm() {
    $("#student-form")[0].reset();
  }

  // Function to show success message
  function showSuccessMessage(message) {
    $(".alert").remove();
    var alert = $("<div class='alert alert-success'></div>").text(message);
    $(".form-container").prepend(alert);
  }

  // Function to show error message
  function showErrorMessage(message) {
    $(".alert").remove();
    var alert = $("<div class='alert alert-danger'></div>").text(message);
    $(".form-container").prepend(alert);
  }

  // Event listener for form submit
  $("#student-form").submit(function (event) {
    event.preventDefault();

    var updatedStudent = {
      SID: $("#sid-input").val(), // Include SID value
      FirstName: $("#first-name-input").val(),
      LastName: $("#last-name-input").val(),
      Email: $("#email-input").val(),
      NearCity: $("#near-city-input").val(),
      Course: $("#course-input").val(),
      Guardian: $("#guardian-input").val(),
      Subjects: $("#subjects-input").val(),
    };

    updateStudent($("#sid-input").val(), updatedStudent);
  });

  // Event listener for delete button
  $("#delete-button").click(function () {
    var sid = $("#sid-input").val();
    deleteStudent(sid);
  });

  // Initialize the page
  showAllStudents();
});
