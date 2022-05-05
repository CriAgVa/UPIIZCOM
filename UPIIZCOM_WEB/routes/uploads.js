var express = require("express");
var router = express.Router();

var formidable = require("formidable");
var fs = require("fs");
var mongoose = require("mongoose");

var Archivo = mongoose.model("M_File");
var Chat = mongoose.model("M_Chat");
var direccionsubir = 'E:\\NewStuff\\Escuela\\8vo Semestre\\Ejercicios\\Espiral5_v5\\UPIIZCOM\\UPIIZCOM_WEB\\public\\assets\\img\\general';
var direcciondescarga = 'E://NewStuff//Escuela//8vo Semestre//Ejercicios//Espiral5_v5//UPIIZCOM//UPIIZCOM_WEB//public//assets//img//general//';

/* GET home page. */
router.get('/fl', function(req, res, next) {
    res.render('fileupload', { title: 'Files' });
});

router.get('/', function(re, res){
    Archivo.find({})
    .exec(function(err, rslt){
        if (err === null){
            res.json(rslt);
        }else{
            res.json({status:false, error:err});
        }
   });
});
  
router.post('/', function(req, res){
   //https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
   var form = new formidable.IncomingForm();
   //definition of the form options
   const uploadFolder =direccionsubir;
   form.multiples = true;
   form.options.maxFileSize = 50 * 1024 * 1024;
   form.options.keepExtensions = true;
   form.uploadDir = uploadFolder;
   form.uploaddir = uploadFolder;
   form.options.uploadDir = uploadFolder;
  
   //parse function 
   form.parse(req, (err, fields, files) => {
     var mFile = {
      nombreOriginal  : ObjectId(files.upload.originalFilename),
      nombreNuevo     : files.upload.newFilename,
      tipo            : files.upload.mimetype
     }
  
     var archivo = new Archivo( mFile );
         archivo.save(function(err, rslt){
             if(err === null){
                 res.json(rslt);
                 
             }else{
                 res.json({status:false, error:err});
             }
         });
   });
});

router.post('/msg', function(req, res){
    //https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
    var form = new formidable.IncomingForm();
    //definition of the form options
    const uploadFolder =direccionsubir;
    form.multiples = true;
    form.options.maxFileSize = 50 * 1024 * 1024;
    form.options.keepExtensions = true;
    form.uploadDir = uploadFolder;
    form.uploaddir = uploadFolder;
    form.options.uploadDir = uploadFolder;
   
    //parse function 
    form.parse(req, (err, fields, files) => {
        if(files.upload.mimetype.includes("application")){
            files.upload.mimetype = "app"
        }
      var mFile = {
       nombreOriginal  : files.upload.originalFilename,
       nombreNuevo     : files.upload.newFilename,
       tipo            : files.upload.mimetype
      }
   
      var archivo = new Archivo( mFile );
          archivo.save(function(err, rslt){
              if(err === null){
                  console.log("exito")
                  res.redirect(req.get('referer'))
              }else{
                  res.json({status:false, error:err});
              }
          });
       
    });
});

router.post('/foro', function(req, res){
    //https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
    var form = new formidable.IncomingForm();
    //definition of the form options
    // 
    const uploadFolder = direccionsubir;
    form.multiples = true;
    form.options.maxFileSize = 50 * 1024 * 1024;
    form.options.keepExtensions = true;
    form.uploadDir = uploadFolder;
    form.uploaddir = uploadFolder;
    form.options.uploadDir = uploadFolder;
   
    //parse function 
    form.parse(req, (err, fields, files) => {
        if(files.upload.mimetype.includes("application")){
            files.upload.mimetype = "app"
        }
      var mFile = {
       nombreOriginal  : files.upload.originalFilename,
       nombreNuevo     : files.upload.newFilename,
       tipo            : files.upload.mimetype
      }
   
      var archivo = new Archivo( mFile );
          archivo.save(function(err, rslt){
              if(err === null){
                  console.log("exito")
                  res.redirect(req.get('referer'))
              }else{
                  res.json({status:false, error:err});
              }
          });
       
    });
});

router.post('/noticia', function(req, res){
    //https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
    var form = new formidable.IncomingForm();
    //definition of the form options
    // 
    const uploadFolder =direccionsubir;
    form.multiples = true;
    form.options.maxFileSize = 50 * 1024 * 1024;
    form.options.keepExtensions = true;
    form.uploadDir = uploadFolder;
    form.uploaddir = uploadFolder;
    form.options.uploadDir = uploadFolder;
   
    //parse function 
    form.parse(req, (err, fields, files) => {
        if(files.upload.mimetype.includes("application")){
            files.upload.mimetype = "app"
        }
      var mFile = {
       nombreOriginal  : files.upload.originalFilename,
       nombreNuevo     : files.upload.newFilename,
       tipo            : files.upload.mimetype
      }
   
      var archivo = new Archivo( mFile );
          archivo.save(function(err, rslt){
              if(err === null){
                  console.log("exito")
                  res.redirect(req.get('referer'))
              }else{
                  res.json({status:false, error:err});
              }
          });
       
    });
});

router.post('/imgperfilgrupo', function(req, res){
    //https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
    var form = new formidable.IncomingForm();
    //definition of the form options
    // 
    const uploadFolder =direccionsubir;
    form.multiples = true;
    form.options.maxFileSize = 50 * 1024 * 1024;
    form.options.keepExtensions = true;
    form.uploadDir = uploadFolder;
    form.uploaddir = uploadFolder;
    form.options.uploadDir = uploadFolder;
   
    //parse function 
    form.parse(req, (err, fields, files) => {
        if(files.upload.mimetype.includes("application")){
            files.upload.mimetype = "app"
        }
      var mFile = {
       nombreOriginal  : files.upload.originalFilename,
       nombreNuevo     : files.upload.newFilename,
       tipo            : files.upload.mimetype
      }
   
      var archivo = new Archivo( mFile );
          archivo.save(function(err, rslt){
              if(err === null){
                  console.log("exito")
                  res.redirect(req.get('referer'))
              }else{
                  res.json({status:false, error:err});
              }
          });
       
    });
});

router.get('/r/:id', function(req, res){
    Archivo.findOne({nombreOriginal : req.params.id})
    .exec(function(err, rslt){
        if (err === null){
            res.json(rslt.nombreNuevo);
        }else{
            res.json({status:false, error:err});
        }
   });


});

router.get('/downloadCHAT/:id', function(req, res){
    Archivo.findOne({nombreOriginal : req.params.id},
        function(err, reslt){
            //var file = 'E://NewStuff//Escuela//8vo Semestre//Ejercicios//Espiral5//Archivos//'+reslt.nombreNuevo;
            var file = direcciondescarga +reslt.nombreNuevo;
            res.download(file)
            
            
        });
});


router.get('/downloadCOMENT/:id', function(req, res){
    Archivo.findOne({nombreOriginal : req.params.id},
            function(err, reslt){
                //var file = 'E://NewStuff//Escuela//8vo Semestre//Ejercicios//Espiral5//Archivos//'+reslt.nombreNuevo;
                var file = direcciondescarga + reslt.nombreNuevo;
                res.download(file)    
                });   
});
module.exports = router;