var express = require('express');
const ToyModel = require('../models/ToyModel')
var router = express.Router();

/* GET users listing. */

router.get('/', async (req, res) => {
  let toys = await ToyModel.find({});
  res.render('toy/index', { toys })
})

router.get('/home', async (req, res) => {
  let toys = await ToyModel.find({});
  res.render('toy/home', { toys })
})

router.get('/delete/:id', async (req, res) => {
  await ToyModel.findByIdAndDelete(req.params.id);
  console.log("Delete toy succeed !");
  res.redirect("/toy");
})



//render ra form ADD
router.get('/add', (req, res) => {
  res.render("toy/add");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
  ToyModel.create(req.body, (err) => {
    if (!err) {
      console.log('Add toy succeed !')
      res.redirect("/toy")
    }
  })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
  ToyModel.findById(req.params.id, (err, data) => {
    if (!err) {
      res.render("toy/edit", { toy: data })
    }
  })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
  var id = req.params.id;
  var toy = req.body;
  ToyModel.findByIdAndUpdate(id, toy, (err) => {
    if (!err) {
      console.log("Update toy succeed !")
      res.redirect("/toy")
    }
  })
})

router.get('/detail/:id', (req, res) => {
  ToyModel.findById(req.params.id, (err, toy) => {
    if (!err) {
      res.render('toy/info', { toy: toy })
    }
  })
})



module.exports = router;