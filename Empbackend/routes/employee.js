const express = require('express');
const Employee = require('../models/Employee');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try{
   const employees = await Employee.find();
   res.json(employees);
  }catch(error){
    res.status(404).send(error);
  }
});

router.post('/', verifyToken, isAdmin, async (req, res) => {
  try{
  const newEmp = new Employee(req.body);
  await newEmp.save();
  res.json(newEmp);
}catch(error){
  res.status(404).send('no data added');
}
});

router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try{
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
}catch(error){
  res.status(404).send('update unsuccessful');
}
});

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try{
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
}catch(error){
  res.status(404).send('data not removed');
}
});

module.exports = router;
