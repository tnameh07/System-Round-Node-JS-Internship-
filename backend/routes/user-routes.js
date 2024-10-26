import express from 'express';
import { signup,login , ForgetPassword, ResetPassword ,getProfile} from '../controller/userController.js';

const router = express.Router();


router.get('/', (req, res ) =>{
    console.log("url hits ");
    res.status(201).json({message:"server surring properly"})
    
})
router.get('/demo', (req,res)=>{
    console.log("demo wrorking");
    
    res.json({msg : "demo working"})
    
})

router.post('/user/signup', signup);
router.post('/user/login', login);
router.post('/user/forgotpasswrod',ForgetPassword)
router.post('/user/resetpassword/:token',ResetPassword)
router.get('/user/:userid/profile',getProfile);

export default router;
