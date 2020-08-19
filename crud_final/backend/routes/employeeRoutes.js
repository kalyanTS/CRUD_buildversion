const router = require("express").Router();
let Employee = require("../models/employee.model");

router.route("/").get((req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("error is: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const designation = req.body.designation;

  const newEmployee = new Employee({
    name,
    phoneNumber,
    designation,
  });

  newEmployee
    .save()
    .then(() => res.json("user added successfully"))
    .catch((err) => res.status(400).json("error is:" + err));
});

router.route("/:id").get((req, res) => {
  Employee.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("error is:" + err));
});

router.route("/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted successfully"))
    .catch((err) => res.status(400).json("error is:" + err));
});

router.route("/update/:id").post((req, res) => {
  Employee.findById(req.params.id)
    .then((Employee) => {
      Employee.name = req.body.name;
      Employee.phoneNumber = req.body.phoneNumber;
      Employee.designation = req.body.designation;
      Employee.save()
        .then(() => res.json("Employee details updated successfully"))
        .catch((err) => res.status(400).json("error is:" + err));
    })
    .catch((err) => res.json("error is:" + err));
});

module.exports = router;
