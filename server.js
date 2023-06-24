const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

let students = [];

// Load the initial data from the JSON file
function loadStudents(callback) {
  fs.readFile("students.json", "utf8", (err, data) => {
    if (err) {
      console.log("Error reading students.json:", err);
      return;
    }
    students = JSON.parse(data);
    callback();
  });
}

// Save the students data to the JSON file
function saveStudents() {
  fs.writeFile(
    "students.json",
    JSON.stringify(students, null, 2),
    "utf8",
    (err) => {
      if (err) {
        console.log("Error writing students.json:", err);
        return;
      }
      console.log("Students data saved successfully.");
    }
  );
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Route to get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Route to add a new student
app.post("/students", (req, res) => {
  const newStudent = req.body;
  newStudent.SID = parseInt(newStudent.SID); // Convert SID to an integer
  students.push(newStudent);
  saveStudents(); // Save the updated data
  res.sendStatus(200);
});

// Route to update a student
app.put("/students/:sid", (req, res) => {
  const sid = parseInt(req.params.sid); // Convert sid to an integer
  const updatedStudent = req.body;
  updatedStudent.SID = sid; // Set the SID to the integer value

  const index = students.findIndex((student) => student.SID === sid);
  if (index !== -1) {
    students[index] = updatedStudent;
    saveStudents(); // Save the updated data
    res.sendStatus(200);
  } else {
    res.status(404).send("Student not found");
  }
});

// Route to delete a student
app.delete("/students/:sid", (req, res) => {
  const sid = parseInt(req.params.sid); // Convert sid to an integer
  const index = students.findIndex((student) => student.SID === sid);
  if (index !== -1) {
    students.splice(index, 1);
    saveStudents(); // Save the updated data
    res.sendStatus(200);
  } else {
    res.status(404).send("Student not found");
  }
});

// Route to serve welcome.html as the home page
app.get("/", (req, res) => {
  loadStudents(() => {
    res.sendFile(__dirname + "/public/welcome.html");
  });
});

// Route to serve read.html
app.get("/read", (req, res) => {
  loadStudents(() => {
    res.sendFile(__dirname + "/public/read.html");
  });
});

// Route to serve updateDelete.html
app.get("/updateDelete", (req, res) => {
  loadStudents(() => {
    res.sendFile(__dirname + "/public/updateDelete.html");
  });
});

// Route to serve index.html at /index and /index.html
app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Route to serve readScript.js
app.get("/readScript.js", (req, res) => {
  res.sendFile(__dirname + "/public/readScript.js");
});

// Route to serve updateDeleteScript.js
app.get("/updateDeleteScript.js", (req, res) => {
  res.sendFile(__dirname + "/public/updateDeleteScript.js");
});

// Route to serve script.js
app.get("/script.js", (req, res) => {
  res.sendFile(__dirname + "/public/script.js");
});

// Route to serve styles.css
app.get("/styles.css", (req, res) => {
  res.sendFile(__dirname + "/public/styles.css");
});

// Route to serve styles2.css
app.get("/styles2.css", (req, res) => {
  res.sendFile(__dirname + "/public/styles2.css");
});

// Route to serve styles3.css
app.get("/styles3.css", (req, res) => {
  res.sendFile(__dirname + "/public/styles3.css");
});

// Load the initial data when the server starts
loadStudents(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
