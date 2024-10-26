import user from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    // console.log(" sign up menthod  : req.body : ", req.body);

    const { firstName, LastName, Email, Password } = req.body;

    const existUSer = await user.findOne({ where: { Email } });
    if (existUSer) {
      console.log("User Already exist ");
      return res
        .status(400)
        .json({ msg: "your aleady exits ? please loggin " });
    }

    const hashpasword = await bcrypt.hash(Password, 10);

    console.log("passed  : ");
    const newUser = new user({
      firstName,
      LastName,
      Email,
      Password: hashpasword,
    });
    const result = await newUser.save();

    const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET,
      {expiresIn:'24h'}
    )

console.log("token :",token);

    // console.log("reuslt : ", result);

    res.status(201).json({ msg: "user created successfully ", token });
  } catch (err) {
    // console.log("error :", err);
    res.status(400).json({ msg: err });
  }
};

export const login = async (req, res) => {
  try {
    console.log(" login method : req.body : ", req.body);
    const { Email, Password } = req.body;

    const existUSer = await user.findOne({ where: { Email } });
    if (!existUSer) {
      console.log("Email not exist");
      return res.status(401).json({ msg: "Invalid credintial " });
    }

    const isMatch = await bcrypt.compare(Password, existUSer.Password);

    if (!isMatch) {
      console.log("Password does not match !!");
      return res
        .status(401)
        .json({ msg: "Invalid credintial  passwrond wrong" });
    }

    const token = jwt.sign({id: existUSer.id}, process.env.JWT_SECRET,
      {expiresIn:'24h'}
    )

    res.status(201).json({
      msg: "logged in successfuly",
      token
    });
  } catch (err) {
    console.log("error :", err);
    res.status(400).json({ msg: err });
  }
};


export const ForgetPassword = async (req,res)=>{
console.log("Forget password");
const {Email} = req.body;
const existUSer = await user.findOne({ where: { Email } });
if (!existUSer) {
  console.log("Email not exist");
  return res.status(401).json({ msg: "Email does not exist!!  " });
}

console.log( "user : " ,existUSer.dataValues);
const Identity =existUSer.dataValues.Id
console.log("id is :",Identity);

const resetToken = jwt.sign(
  {id:Identity},
  process.env.JWT_SECRET,
  {expiresIn:'5m'}
)

const resetLink = `localhost:8080/user/resetpassword/${resetToken}`;

console.log( "reset link ", resetLink);

res.status(201).json({msg:"Reset password link send ", resetLink})
}
export const ResetPassword = async(req,res)=>{

 
try{ console.log("reset password");

  const {token} = req.params;
const {newpassword} = req.body;

  console.log("token : ",token );
const decode = jwt.verify(token, process.env.JWT_SECRET);
if(!decode)
  return res.status(404).json({msg : "invalid link"});
  
console.log("Decoded token :",decode);


const verifyuser = await user.findByPk(decode.id);
if(!verifyuser)
{
  res.status(404).json({msg:"user not found "})
}

console.log("user:", verifyuser.dataValues);
  const hashpassword =await bcrypt.hash(newpassword, 10);
  console.log("Passed here 1 ");
  
  const result = await verifyuser.update({Password:hashpassword})
  console.log("Passed here 2", result);
 res.status(201).json({msg : "passsword reset successfully"})
}catch(err){
  console.log("error :",err);
  res.status(401).json({msg : " could not reset password", error : err.message}

  )
  
}


}
export const getProfile = async(req,res)=>{
 try{
  console.log("get profile ");
  const {userid} = req.params;
  const existUSer = await user.findOne({ where: { id:userid } });
if (!existUSer) {
  console.log("user not exist");
  return res.status(401).json({ msg: "User  not exist  " });
}

res.status(201).json({msg : existUSer})

 }
catch(err){
  res.status(401).json({msg : err.message});
}
 
  
}