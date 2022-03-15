const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://ranjan:e91pDMx03Sx9wB2V@cluster0.u4idw.mongodb.net/vipin199-db?authSource=admin&replicaSet=atlas-oajyb4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});