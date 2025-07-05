const express = require('express');
const TechnoController = require('../controller/technologyController');
const router = express.Router(); // Use "router" for clarity



// Technology routes
router.post('/technoinsert', TechnoController.technoinsert);
// Display
// router.get('/technodisplay', TechnoController.technodisplay);
router.get('/technodisplay', TechnoController.technodisplay);

router.get("/technoview/:id", TechnoController.technoview);
router.put("/technoupdate/:id", TechnoController.technoupdate);
router.delete("/technodelete/:id", TechnoController.technodelete);
module.exports = router;
