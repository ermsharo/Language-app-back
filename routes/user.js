const { Op } = require("sequelize");
const express = require("express");
const User = require("../models/User");
const HistoryLog = require("../models/HistoryLog");
const FavoritesLog = require("../models/FavoritesLog");
const router = express.Router();

router.get("/user/me", async (req, res) => {
    let genericUser = "emilio"
    const getUserByUsername = await User.findOne({ where: { username: genericUser } });
    if (getUserByUsername !== null) {
        const userByUsername = getUserByUsername.dataValues;
        console.log("-->", userByUsername)
        return res.status(200).json({
            id: userByUsername.id,
            username: userByUsername.userName,
            email: userByUsername.email
        });
    }

    res.status(401).send("user not find");
});

const getNumberOfPages = (count, pageSize) => {
  if (count < pageSize) return 0;
  if (count % pageSize != 0) return parseInt(count / pageSize);
  return 0;
};


router.get("/user/me/history", async (req, res) => {
    let genericUserId = 1;
    let page = 0;
    let pageSize = 20;

    const { count, rows } = await HistoryLog.findAndCountAll({
        where: {
          user_id: genericUserId
        },
        offset: page * pageSize,
        limit: pageSize,
      });
    
      res.send({
        results: rows.map((item) => {
          return item.word;
        }),
        totalDocs: count,
        page: page,
        totalPages: getNumberOfPages(count, pageSize),
        hasNext: page == getNumberOfPages(count, pageSize) ? false : true,
        hasPrev: page == 0 ? false : true,
      });
});



router.get("/user/me/favorites", (req, res) => {
    console.log("singup req", req.body);
    res.send("user working");
});



module.exports = router;
