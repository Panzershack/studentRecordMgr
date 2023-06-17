$(document).ready(function () {
  // Function to retrieve student data from the server
  function fetchStudents() {
    $.ajax({
      url: "http://localhost:3000/students",
      type: "GET",
      success: function (data) {
        renderStudents(data);
      },
      error: function () {
        console.log("Error retrieving data");
      },
    });
  }

  // Function to render the student data in the table
  function renderStudents(students) {
    var tableBody = $("#studentsTableBody");
    tableBody.empty();

    students.forEach(function (student) {
      var row =
        "<tr>" +
        "<td>" +
        student.SID +
        "</td>" +
        "<td>" +
        student.FirstName +
        "</td>" +
        "<td>" +
        student.LastName +
        "</td>" +
        "<td>" +
        student.Email +
        "</td>" +
        "<td>" +
        student.NearCity +
        "</td>" +
        "<td>" +
        student.Course.join(", ") +
        "</td>" +
        "<td>" +
        student.Guardian +
        "</td>" +
        "<td>" +
        student.Subjects.join(", ") +
        "</td>" +
        "</tr>";
      tableBody.append(row);
    });
  }

  // Function to add a new student to the server
  $("#addStudentForm").on("submit", function (event) {
    event.preventDefault();

    var formData = $(this).serializeArray();
    var student = {};
    formData.forEach(function (field) {
      if (field.name === "Course" || field.name === "Subjects") {
        student[field.name] = field.value.split(",").map(function (item) {
          return item.trim();
        });
      } else if (field.name === "SID") {
        student[field.name] = parseInt(field.value);
      } else {
        student[field.name] = field.value;
      }
    });

    $.ajax({
      url: "http://localhost:3000/students",
      type: "POST",
      data: student,
      success: function () {
        fetchStudents();
        $("#addStudentForm")[0].reset();
        alert("New student added to database");
      },
      error: function () {
        console.log("Error adding student");
      },
    });
  });

  // Initial fetch of student data
  fetchStudents();
});
