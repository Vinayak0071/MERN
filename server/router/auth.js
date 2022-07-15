const express = require("express");
const router = express.Router();

require("../db/conn");

const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello world from server router js`);
});

//     **USING PROMISES**
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Kuch to gadbad hai" });
//   }

//     User.findOne({ email: email })
//       .then((userExist) => {
//         console.log(userExist);
//         if (userExist) {
//           return res.status(422).json({ error: "Already Exist!" });
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });
//         user
//           .save()
//           .then(() => {
//             res.status(201).json({ message: "User registered successfully" });
//           })
//           .catch((err) => res.status(500).json({ err: "Failed to Register" }));
//       })
//       .catch((err) => console.log(err));
//   });

// });

//   **USING ASYNC/AWAIT**
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Kuch to gadbad hai" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Already Exist!" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ error: "Kuch enter to kar" });

    const userLogin = await User.findOne({ email: email });

    console.log(userLogin);

    if (!userLogin) res.status(400).json({ error: "user error" });
    else res.json({ message: "user signed in successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
