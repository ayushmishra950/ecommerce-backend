const bcrypt = require('bcryptjs');
const { AuthenticationModel } = require('../Schema/schema');
const jwt = require('jsonwebtoken');

exports.registration = async (req, res) => {

  try {
    const existingUser = await AuthenticationModel.findOne({ email: req.body.email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const information = new AuthenticationModel({
        ...req.body,
        password: hashedPassword
      });

      await information.save();
      res.status(201).json('Registration Successfully...');
    } else {
      res.status(409).json('This email already exists...');
    }
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


let obj = '';
   
exports.login = async (req, res) => {
  const form = req.query.form;
  const All = JSON.parse(form);
  const { email, password } = All;
  

  try {
    const existingUser = await AuthenticationModel.findOne({ email });

    if (!existingUser) {
      return res.status(401).json('User not found');
    }
    else{
      obj = existingUser
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json('Invalid credentials');
    }

    const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ success: 'Login Successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json('Login Failed...');
  }
};



exports.full_Information = async(req,res) => {
if (obj) {
    res.json(obj); 
  } else {
    res.status(401).json({ message: "Login first" });
  }
}


exports.passwordchange = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await AuthenticationModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await AuthenticationModel.updateOne(
      { email },
      { $set: { password: hashedNewPassword } }
    );

    res.json({ message: "Password changed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};





exports.logout = (req,res) => {
   obj = null; 
  res.json({ message: "You have been logged out successfully." });
}


exports.userinfo = async(req,res)=>{
        const info = await AuthenticationModel.find({});
          res.json(info);
}





