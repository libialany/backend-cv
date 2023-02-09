const Project = require("../model/project");

exports.getAllProjectCategory = async (req, res) => {
  if (!req?.params?.projectCategory) return res.status(400).json({ 'message': 'projectCategory required.' });
  const projects = await Project.find({ projectType: req.params.projectCategory }).exec();
  if (!projects) {
    return res.status(204).json({ "message": `No projects matches ID ${req.params.projectCategory}.` });
  }
  res.json(projects);
};
exports.addProject = async (req, res) => {
  if (
    !req?.body?.projectName ||
    !req?.body?.projectDescription ||
    !req?.body?.projectImage ||
    !req?.body?.projectShowCase ||
    !req?.body?.projectDemoVideo ||
    !req?.body?.projectDownloadLink ||
    !req?.body?.projectTechUsed ||
    !req?.body?.projectType ||
    !req?.body?.projectGithubLink
  ) {
    return res.status(400).json({ 'message': 'All are required' });
  }
  const duplicate = await Project.findOne({ projectName: req.body.projectName }).exec();
  if (duplicate) return res.status(400).json({ 'message': 'Project exist' });
  try {
    const result = await Project.create({
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      projectImage: req.body.projectImage,
      projectShowCase: req.body.projectShowCase,
      projectDemoVideo: req.body.projectDemoVideo,
      projectDownloadLink: req.body.projectDownloadLink,
      projectTechUsed: req.body.projectTechUsed,
      projectType: req.body.projectType,
      projectGithubLink: req.body.projectGithubLink
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
}
exports.getAllProject = async (req, res) => {
  const projects = await Project.find()
  if (!projects) {
    return res.status(204).json({ 'message': 'No messages' })
  }
  res.json(projects)
}
exports.updateProject = async (req, res) => {
  if (!req?.body?.projectId) {
    return res.status(400).json({ 'message': 'ID parameter is required.' });
  }
  const project = await Project.findOne({ _id: req.body.projectId }).exec();
  if (!project) {
    return res.status(204).json({ "message": `No project matches ID ${req.body.projectId}.` });
  }
  if (req.body?.projectName) { project.projectName = req.body?.projectName }
  if (req.body?.projectDescription) { project.projectDescription = req.body?.projectDescription }
  if (req.body?.projectImage) { project.projectImage = req.body?.projectImage }
  if (req.body?.projectShowCase) { project.projectShowCase = req.body?.projectShowCase }
  if (req.body?.projectDemoVideo) { project.projectDemoVideo = req.body?.projectDemoVideo }
  if (req.body?.projectDownloadLink) { project.projectDownloadLink = req.body?.projectDownloadLink }
  if (req.body?.projectTechUsed) { project.projectTechUsed = req.body?.projectTechUsed }
  if (req.body?.projectType) { project.projectType = req.body?.projectType }
  if (req.body?.projectGithubLink) { project.projectGithubLink = req.body?.projectGithubLink }
  const result = await project.save();
  res.json(result);
}
exports.deleteProject = async (req, res) => {
  if (!req?.params?.projectId) return res.status(400).json({ 'message': 'Certificate ID required.' });
  const project = await Project.findOne({ _id: req.params.projectId }).exec();
  if (!project) {
    return res.status(204).json({ "message": `No project matches ID ${req.body.projectId}.` });
  }
  const result = await project.deleteOne(); //{ _id: req.body.id }
  res.json(result);
}
