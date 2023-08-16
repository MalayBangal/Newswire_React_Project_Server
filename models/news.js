const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: String,
	content: String,
	author: String,
	image: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

const newsModel = mongoose.model('news',newsSchema);

module.exports = newsModel;