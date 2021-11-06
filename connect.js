const mongoose = require('mongoose');

const db = "mongodb+srv://test123:test123@cluster0.ndxjq.mongodb.net/MovieDB?retryWrites=true&w=majority";

mongoose.connect(db).then(() => {
    console.log("Connected to database");
})

.catch(() => {
    console.log("Error connected to database");
})

const heroSchema = new mongoose.Schema({
    titleName: {type: String},
    fullName: {type: String},
    genreMovie: {type: String},
    plotMovie: {type: String},
    movieRating: {type: String}
});

const Record = mongoose.model('records', heroSchema);

module.exports = Record;