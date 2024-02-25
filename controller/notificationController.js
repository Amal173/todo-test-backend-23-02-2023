const notification=require('./../models/notificationModel')
const asyncHandler = require('express-async-handler')

const getnotification = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const notifications = await notification.aggregate([
        { $match: { userId: id } },
    ]);
    if (!notifications) {
        res.status(404);
        throw new Error("notifications not found");
    }
    res.status(200).json({ notifications })
});


module.exports={getnotification}
