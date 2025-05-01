const express = require('express');
const CommentController = require('../controllers/comment');
const router = express.Router();
const auth = require('../middleware/auth');


router.post('/comment',auth,CommentController.addComment);
router.get("/comment/:videoId",CommentController.getCommentById)

module.exports = router;