const { client } = require("../models/db");
const jwt = require("jsonwebtoken");

module.exports.loggingIn = async (req, res) => {
  try {
    const checkEmail = `INSERT INTO member_info (email)
    VALUES ('${req.body.email}')
    ON CONFLICT (email) DO NOTHING;`;
    const isMember = await client.query(checkEmail);

    // user checking from database

    // if user login is successfull then

    let token = null;
    if (isMember.rowCount === 1 || isMember.rowCount === 0) {
      token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      console.log(req.body.email);

      // three argument variable it will receive, 1. payload (user related information) 2. jwt_secret variable value 3. token expire value
    }
    console.log(isMember);
    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({
        // when we will receive this json data from broswer then browser will receive string formate data now js objecdt because we know json formate is string formate. we can convert this respose fron frontend site using parse method
        isMember: isMember.rowCount,
        token: token,
        email: req.body.email,
      });
  } catch (error) {
    console.log(error);
  }
};

// function authenticate(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split("")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.email = email;
//     next();
//   });
// }

//***jwt  (json web token)

// ***protect middleware function

module.exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //*** */ []
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json("you are not looged in! please login to get access"); // req and res cycle will be stop here
  }
  //*** */ verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET); // jwt.ion
  console.log("decode", decoded);

  // ***user is exis in database
  const check_user_query = `SELECT * from member_info WHERE email = '${decoded.email}'`;
  const isUser = await client.query(check_user_query);
  if (!check_user_query) {
    return res.status(404).json({
      message: "User is not found from database",
    });
  }

  //*** */ if user chaged password after the token was issued then we can send a error message from here
  console.log(isUser);
  req.user = {
    email: decoded.email,
  };

  return next();
};
module.exports.autoLogin = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //*** */ []
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json("you are not looged in! please login to get access"); // req and res cycle will be stop here
  }
  //*** */ verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET); // jwt.ion
  console.log("decode", decoded);

  // ***user is exis in database
  const check_user_query = `SELECT * from member_info WHERE email = '${decoded.email}'`;
  const isUser = await client.query(check_user_query);
  if (!check_user_query) {
    return res.status(404).json({
      message: "User is not found from database",
    });
  }

  //*** */ if user chaged password after the token was issued then we can send a error message from here
  console.log(isUser.rows[0].email);
  res.status(200).send(isUser.rows[0].email);
};

module.exports.userInformation = async (req, res) => {
  console.log("userInformation ");
  console.log(req.user);
  if (req.user) {
    return res.status(200).json({
      message: "User is found",
    });
  } else {
    return res.status(401).json({
      message: "Your are not permited for this action",
    });
  }
};
