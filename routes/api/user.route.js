var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/user.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUser)
router.post('/forgot', UserController.forgot)
//router.get('/', Authorization, UserController.getUsers)
router.get('/', Authorization, UserController.getCurrentUser)
router.get('/:filename', UserController.downloadFile)

router.post('/bin', UserController.getByBIN)
router.delete('/:id', Authorization, UserController.removeUser)
router.put('', Authorization, UserController.updateUser)
router.post('/upload', function(req, res, next){
    UserController.upload(req, res, function(err){
        if(err) {
            res.json({error_code:1, err_desc:err});
            return;
        } else {
            res.json({error_code:0, err_desc:null, 
                financialReport1: req.files['financialReport1']?req.files['financialReport1'][0].filename:'',
                financialReport2: req.files['financialReport2']?req.files['financialReport2'][0].filename:'',
                financialReport3: req.files['financialReport3']?req.files['financialReport3'][0].filename:'',
                descriptionNote1: req.files['descriptionNote1']?req.files['descriptionNote1'][0].filename:'',
                descriptionNote2: req.files['descriptionNote2']?req.files['descriptionNote2'][0].filename:'',
                descriptionNote3: req.files['descriptionNote3']?req.files['descriptionNote3'][0].filename:'',
                garantyLetter: req.files['garantyLetter']?req.files['garantyLetter'][0].filename:'',
                landSchema: req.files['landSchema']?req.files['landSchema'][0].filename:'',
                projectConcept: req.files['projectConcept']?req.files['projectConcept'][0].filename:'',
                foreskiz: req.files['foreskiz']?req.files['foreskiz'][0].filename:'',
                currentFile: req.files['currentFile']?req.files['currentFile'][0].filename:''
            });
        }
    })
});

// Export the Router
module.exports = router;