const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFollower,
    unFollow
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);


router.route('/:userId/followers').post(addFollower);


router.route('/:userId/followers/:followerId').delete(unFollow);


module.exports = router;