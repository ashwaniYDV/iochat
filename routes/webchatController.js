var express = require('express');
var router = express.Router();

var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended: false});

   
router.get('/', function(req,res){
    res.render('index');
});

router.post('/', urlencodedParser, function(req,res){
     res.render('webchat',{data: req.body});
});


module.exports=router;