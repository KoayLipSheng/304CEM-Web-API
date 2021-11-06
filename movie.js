const axios = require('axios');
const express = require('express');
const app = express();
const Record = require('./connect');
app.use(express.static('public'));
const apikey = '4634577469920197';
app.set('view engine', 'ejs');
const ejs = require('ejs');
const port = process.env.PORT || 3000 ;

app.get('/', (req,res) => {
    Record.find({}, function(err, records){
        res.render('index',{
            moviesList : records
        });
    })
    
})

//http://localhost:5000/getMovie?hero=
 app.get('/getMovie',(req, res) => {
     const hero = req.query.getName;

const querystr = `https://superheroapi.com/api/${apikey}/search/${hero}`;

var titleName, fullName, genreMovie, plotMovie, movieRating;

axios.get(querystr).then( (response) => {

    titleName = response.data.results[0].name;
    fullName = response.data.results[0].biography['full-name'];


    const movieApi = '93cb5a11';
    const movieName = response.data.results[0].name;
    const querystr2 = `http://www.omdbapi.com/?t=${movieName}&apikey=${movieApi}`;

    axios.get(querystr2).then((response) => {

        genreMovie = response.data.Genre;
        plotMovie = response.data.Plot;
        movieRating = response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value;  

        filmValue = new Record ({
            titleName: titleName,
            fullName: fullName,
            genreMovie: genreMovie,
            plotMovie: plotMovie,
            movieRating: movieRating
        });

        if (!filmValue.titleName){
            res.status(200).json('Not found');

            return;
        }

        filmValue.save().then(response => {
            res.redirect(req.get('referer'));
        })
        
        .catch(error => {
            res.status(400).json(error);
        });
        
    });

});
 });

 //http://localhost:5000/editMovie?hero=&data=
 app.get('/editMovie', (req, res) =>{
    
    const hero2 = req.query.getName;
    const data = req.query.rating;
    
    Record.updateOne({fullName: `${hero2}`}, {movieRating: `${data}`}, function(err, res){
        
        if (err) return handleError(err);
        console.log("Update Successfully");
    });
    res.redirect(req.get('referer'));

});//close editmovie

//http://localhost:5000/deleteMovie?hero=
app.get('/deleteMovie', (req, res) =>{

    const hero1 = req.query.hero;
    Record.deleteOne({titleName: `${hero1}`}, function(err){

        if (err) return handleError(err);
        console.log("Delete Record Successfully");
    });
    res.redirect(req.get('referer'));

});//close deletemovie


 app.listen(port, () => {
      console.log('Sever listening to port 5000');
 });