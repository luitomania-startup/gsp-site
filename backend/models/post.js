const Joi = require("joi");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: new Date()
  },
  sortedBy: {
    type: Number,
    default: new Date()
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  postImageUrl: {
    type: String,
  },
  postImagePublicId: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { versionKey: false });

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    postImageUrl: Joi.string(),
    postImagePublicId: Joi.string(),
  });

  return schema.validate(post);
}

function validatePostPatch(post) {
  const schema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string(),
    description: Joi.string(),
    postImageUrl: Joi.string(),
    postImagePublicId: Joi.string(),
  });

  return schema.validate(post);
}


exports.Post = Post;
exports.validatePost = validatePost;
exports.validatePostPatch = validatePostPatch;