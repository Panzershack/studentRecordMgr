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

        // Generate QR code and display it
        generateQRCode(student);
      },
      error: function () {
        console.log("Error adding student");
      },
    });
  });

  // Function to generate QR code and display it
  function generateQRCode(student) {
    var qrCodeContainer = $("#qrCodeContainer");
    qrCodeContainer.empty();

    var qrCodeData = student.FirstName + " " + student.LastName + "\n";
    qrCodeData += "SID: " + student.SID + "\n";
    qrCodeData += "Email: " + student.Email;

    var qrCode = new QRCode(qrCodeContainer.get(0), {
      text: qrCodeData,
      width: 128,
      height: 128,
    });
  }

  // Initial fetch of student data
  fetchStudents();
});
