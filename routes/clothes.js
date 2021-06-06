const router = require('express').Router();
const mongoose = require('mongoose');
var Clothes = mongoose.model('Clothes');
var multer = require('multer');

//setup image upload using multer
var imgStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads');
    },
    filename: function (req, file, cb){
        cb(null, Date.now()+'---'+file.originalname);
    }
});
var upload = multer({storage : imgStorage});

//insert clothes data with image
router.post('/new', upload.single("image"), (req,res)=>{
    var input={
        brand : req.body.brand,
        category : req.body.category,
        size : req.body.size,
        img : req.file.path,
        createdBy: req.user.name
    }
    var clothes = new Clothes(input);
    clothes.save().then(data=>{res.status(200).json(data)})
    .catch(err=>{res.status(500).send(err)})
})

//get list of all clothes data
router.get('/get', (req,res)=>{
    console.log("USER: ",req.user.role);
    // if(req.user.role==='admin')
    // {
        Clothes.find().then(data=>{res.status(200).json(data)})
        .catch(err=>{res.status(500).send(err)})
    // }
    // else{
    //     return res.send('Unauthorised operation.')
    // }
})

//get clothes data by _id
router.get('/get/:id', (req,res)=>{
    // console.log(req.params)
    Clothes.findById({_id : req.params.id}).then(data=>{res.status(200).json(data)})
    .catch(err=>{res.status(500).send(err)})
})

//update using _id
router.put('/update/:id', (req,res)=>{
    if(req.user.role==='admin')
    {
    Clothes.findByIdAndUpdate({_id : req.params.id}, req.body).then(data=>{res.status(200).json('Updated.')})
    .catch(err=>{res.status(500).send(err)})
}
else{
    return res.send('Unauthorised operation.')
}
})

//delete using _id
router.delete('/delete/:id', (req,res)=>{
    if(req.user.role==='admin')
    {
    Clothes.findByIdAndDelete({_id : req.params.id}).then(data=>{res.status(200).json('Deleted.')})
    .catch(err=>{res.status(500).send(err)})
}
else{
    return res.send('Unauthorised operation.')
}
})


module.exports=router;