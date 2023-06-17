$(document).ready(function () {
  // Function to fetch and display all students
  function showAllStudents() {
    $.ajax({
      url: "/students", // Update the URL to match the server route
      dataType: "json",
      success: function (data) {
        displayStudents(data);
      },
    });
  }

  // Function to display the filtered students
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

      // Check if Course is an array
      if (Array.isArray(student.Course)) {
        row.append("<td>" + student.Course.join(", ") + "</td>");
      } else {
        row.append("<td>" + student.Course + "</td>");
      }

      row.append("<td>" + student.Guardian + "</td>");

      //Check if Subjects is an array

      if (Array.isArray(student.Subjects)) {
        row.append("<td>" + student.Subjects.join(", ") + "</td>");
      } else {
        row.append("<td>" + student.Subjects + "</td>");
      }

      tableBody.append(row);
    });
  }

  // Function to filter students based on search criteria
  function filterStudents(criteria, value) {
    // Convert value to an integer if criteria is "SID"
    if (criteria === "SID") {
      value = parseInt(value);
    }

    $.ajax({
      url: "/students", // Update the URL to match the server route
      dataType: "json",
      success: function (data) {
        var filteredStudents = data.filter(function (student) {
          if (Array.isArray(student[criteria])) {
            return student[criteria].includes(value);
          } else {
            return student[criteria] === value;
          }
        });

        displayStudents(filteredStudents);
      },
    });
  }

  // Event handler for the search button
  $("#search-button").click(function () {
    var criteria = $("#search-dropdown").val();
    var value = $("#search-input").val();

    filterStudents(criteria, value);
  });

  // Initial display of all students
  showAllStudents();
});
