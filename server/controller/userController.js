const User = require("../models/User");
const Conversation = require("../models/Conversation");
const bcrypt = require("bcryptjs");
const { getDataUri } = require("../utils/dataUri");
const cloudinary = require("cloudinary");

const searchUsers = async (req, res) => {
  const { q, limit } = req.query;
  const search = q
    ? {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { username: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  const data = await User.find(search).limit(limit);
  !data &&
    res.status(404).json({
      data: [],
    });

  res.status(200).json({
    data: data,
  });
};

const updateUser = async (req, res) => {
  let coverPicFile = "",
    profilePicFile = "";
  if (req.files) {
    if (req.files.length === 1) {
      if (req.files[0].fieldname === "cover-pic") {
        coverPicFile = req.files[0];
      } else {
        profilePicFile = req.files[0];
      }
    } else {
      coverPicFile = req.files[0];
      profilePicFile = req.files[1];
    }
  }

  try {
    const user = await User.findById(req.data.userID);
    !user && res.staus(404).json("User not Found !");

    // remove current profile pic and cover pic
    const profilePicID = user.avatar.public_id;
    const coverPicID = user.coverPicture.public_id;

    if (profilePicID) {
      await cloudinary.v2.uploader.destroy(profilePicID);
    }
    if (coverPicID) {
      await cloudinary.v2.uploader.destroy(coverPicID);
    }

    const updateFields = {};

    if (req.body.name) { updateFields.name = req.body.name; }
    if (req.body.username) { 
      const user = await User.findOne({username : req.body.username});
      if (user) {
        res.status(403).json({
          message : "Email already exists"
        })
        return;
      }

      updateFields.username = req.body.username; 
    }
    if (req.body.email) { 
      const user = await User.findOne({email : req.body.email});
      if (user) {
        res.status(403).json({
          message : "Email already exists"
        })
        return;
      }

      updateFields.email = req.body.email; 
    }

    if (coverPicFile) {
      const coverPicURI = getDataUri(coverPicFile);
      const coverPicCloud = await cloudinary.v2.uploader.upload(
        coverPicURI.content
      );

      // console.log(coverPicCloud);

      updateFields.coverPicture = {
        public_id: coverPicCloud.public_id,
        url: coverPicCloud.secure_url,
      };
    }
    if (profilePicFile) {
      const profilePicURI = getDataUri(profilePicFile);
      const profilePicCloud = await cloudinary.v2.uploader.upload(
        profilePicURI.content
      );

      updateFields.avatar = {
        public_id: profilePicCloud.public_id,
        url: profilePicCloud.secure_url,
      };
    }

    const userID = user._id;
    await User.updateOne({_id : userID}, { $set : updateFields });

    const updatedUser = await User.findById(userID);

    res.status(200).json(updatedUser);

  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.data.userID);
    !user && res.staus(404).json("User not Found !");

    const validatePassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    !validatePassword &&
      res.status(400).json("Entered current password is incorrect !");

    const newPassword = await bcrypt.hash(req.body.newPassword, 10);

    await User.findByIdAndUpdate(req.data.userID, {
      $set: {
        password: newPassword,
      },
    });
    res.status(200).json("Password updated !");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  if (req.data.userID === req.params.userID || req.data.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.userID);
      res.status(200).json("User Deleted !");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to delete this user");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.userID);
    const { password, isAdmin, updatedAt, createdAt, __v, ...otherInfo } =
      user._doc;
    res.status(200).json(otherInfo);
  } catch (err) {
    res.status(500).json(err);
  }
};

const followUser = async (req, res) => {
  if (req.params.userID !== req.data.userID) {
    try {
      const currentUser = await User.findById(req.data.userID);
      const followUser = await User.findById(req.params.userID);
      !followUser && res.status(404).json("User not found !");

      if (!currentUser.following.includes(req.params.userID)) {
        await currentUser.updateOne({
          $push: { following: req.params.userID },
        });
        await followUser.updateOne({ $push: { followers: req.data.userID } });

        const followUserID = followUser._id.toString();
        const currentUserID = currentUser._id.toString();
        const doesConvoExist = await Conversation.findOne({
          members : { $all : [followUserID, currentUserID]}
        })

        if (!doesConvoExist) {
          const conversation = await new Conversation({
            members : [followUserID, currentUserID]
          });
          const newConvo = await conversation.save();
          // console.log(newConvo);
        }

        
        res.status(200).json("You started following this user");
      } else {
        // if currentUser already follows followedUser
        res.status(409).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
};

const unfollowUser = async (req, res) => {
  if (req.params.userID !== req.data.userID) {
    try {
      const currentUser = await User.findById(req.data.userID);
      const followUser = await User.findById(req.params.userID);

      if (currentUser.following.includes(req.params.userID)) {
        await currentUser.updateOne({
          $pull: { following: req.params.userID },
        });
        await followUser.updateOne({ $pull: { followers: req.data.userID } });

        res.status(200).json("You unfollowed this user");
      } else {
        // if currentUser already follows followedUser
        res.status(409).json("You do not follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
};

module.exports = {
  deleteUser,
  updateUser,
  updatePassword,
  getUser,
  followUser,
  unfollowUser,
  searchUsers,
};
