const express = require('express');
const VideoController = require('../controllers/videos');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/video',auth,VideoController.uploadVideo);
router.get('/allVideo',VideoController.getAllVideo);
router.get('/getVideoById/:id',VideoController.getVideoById);
router.put('/like/:id',VideoController.likeVideo)
router.get('/:userId/channel',VideoController.getAllVideoByUserID);
router.get('/search', VideoController.searchVideos);


module.exports = router;



// const express = require('express');
// const VideoController = require('../controllers/videos');
// const router = express.Router();
// const auth = require('../middleware/auth');

// router.post('/video', auth, VideoController.uploadVideo);
// router.get('/allVideo', VideoController.getAllVideo);
// router.get('/getVideoById/:id', VideoController.getVideoById);
// router.put('/like/:id', VideoController.likeVideo);
// router.get('/:userId/channel', VideoController.getAllVideoByUserID);

// 

// module.exports = router;

