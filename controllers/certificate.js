const Certificate = require("../model/certificate");
exports.getAllCertificates = async (req, res) => {
  const certificates = await Certificate.find().select(['-_id','-__v']).lean()
  if (!certificates) {
    return res.status(204).json({ 'message': 'No messages' })
  }
  res.json(certificates)
};
exports.addCertificate = async (req, res) => {
  if (!req?.body?.name || !req?.body?.image) {
    return res.status(400).json({ 'message': 'Name and Image are required' });
  }
  try {
    const result = await Certificate.create({
      name: req.body.name,
      image: req.body.image
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
}
exports.deleteCertificate = async (req, res) => {
  if (!req?.params?.certificateId) return res.status(400).json({ 'message': 'Certificate ID required.' });
  const certificate = await Certificate.findOne({ _id: req.params.certificateId }).exec();
  if (!certificate) {
      return res.status(204).json({ "message": `No certificate matches ID ${req.body.certificateId}.` });
  }
  const result = await certificate.deleteOne(); 
  res.json(result);
}