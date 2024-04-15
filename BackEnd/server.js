const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
let schema = new mongoose.Schema({ name: String, age: Number, Id: String });
const Students = mongoose.model("students information", schema);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/students/getInfo", (req, res) => {
  Students.find({}).then((studentInfo) => {
    res.send(studentInfo);
  });
});

app.post("/students/addStudent", async (req, res) => {
  try {
    const name = req.body.name;
    const age = req.body.age;
    const Id = req.body.Id;
    const newStudent = new Students({ name, age, Id });
    await newStudent.save();
    console.log("Student added " + newStudent);
    res.json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/students/updateInfo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newName = req.body.name;
    const newAge = req.body.age;
    const newID = req.body.Id;
    await Students.findByIdAndUpdate(id, {
      name: newName,
      age: newAge,
      Id: newID,
    });
    res.send("Student name updated successfully");
  } catch (error) {
    console.error("Error updating student name:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/students/DeleteInfo/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Students.findByIdAndDelete(id)
    .then(() => {
      console.log("student info deleted");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error deleting student Info:", error);
      res.sendStatus(500);
    });
});

app.get("/", (req, res) => {
  res.send("Connected to the server");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,  () => {
  console.log("Server started on port", PORT);
});
