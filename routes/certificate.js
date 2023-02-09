const express = require("express");

const {
  addCertificate,
  deleteCertificate,
  getAllCertificates,
} = require("../controllers/certificate");
const router = express.Router();

router.post("/", addCertificate);
router.get("/", getAllCertificates);
router.delete("/delete/:certificateId", deleteCertificate);

module.exports = router;
