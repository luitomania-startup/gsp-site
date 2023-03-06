const Joi = require("joi");
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String,
    default: "",
    required: false,
  },
  description: {
    type: String,
    default: "",
    required: false
    // required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { versionKey: false });

const Image = mongoose.model("Image", imageSchema);

function validateImage(image) {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.string().required(),
    imagePublicId: Joi.string().required(),
  });

  return schema.validate(image);
}

function validateImagePatch(image) {
  const schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.string().required(),
    imagePublicId: Joi.string().required(),
  });

  return schema.validate(image);
}


exports.Image = Image;
exports.validateImage = validateImage;
exports.validateImagePatch = validateImagePatch;