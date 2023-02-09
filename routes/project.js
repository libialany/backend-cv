const express = require("express");
const {
  addProject,
  getAllProject,
  updateProject,
  deleteProject,
  getAllProjectCategory,
} = require("../controllers/project");
const router = express.Router();

router.get("/getAllProjectCategory/:projectCategory", getAllProjectCategory)
router.post("/",addProject);
router.get("/", getAllProject);
router.put("/update",updateProject);
router.delete("/delete/:projectId",deleteProject);

module.exports = router;
