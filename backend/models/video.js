const Joi = require("joi");
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  videoPublicId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { versionKey: false });

const Video = mongoose.model("Video", videoSchema);

function validateVideo(video) {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    videoUrl: Joi.string().required(),
    videoPublicId: Joi.string().required(),
  });

  return schema.validate(video);
}

function validateVideoPatch(video) {
  const schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    videoUrl: Joi.string().required(),
    videoPublicId: Joi.string().required(),
  });

  return schema.validate(video);
}


exports.Video = Video;
exports.validateVideo = validateVideo;
exports.validateVideoPatch = validateVideoPatch;