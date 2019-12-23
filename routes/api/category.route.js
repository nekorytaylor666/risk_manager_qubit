var express = require('express')
var router = express.Router()
var CategoryController = require('../../controllers/category.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/', Authorization, CategoryController.getCategories)
router.get('/category/:id', Authorization, CategoryController.getCategory)
router.delete('/:id', Authorization, CategoryController.removeCategory)
router.put('/', Authorization, CategoryController.updateCategory)
router.post('/', Authorization, CategoryController.createCategory)
router.post('/delete', Authorization, CategoryController.deleteCategoryList)

// Export the Router
module.exports = router;