const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: String,
    projectDescription: String,
    projectImage: String,
    projectShowCase: String,
    projectDemoVideo: String,
    projectDownloadLink: String,
    projectTechUsed: String,
    projectType: String,
    projectGithubLink: String,
    projectAvailableOnPlayStore: String
});

module.exports = mongoose.model('Project', projectSchema)