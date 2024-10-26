import jwt from "jsonwebtoken";

const auth = (req, res, next) =>{
    try{
        console.log("inside authentication");
        



    }catch(err){
        console.log("error in authentication", err);

        res.status(400).json({msg : err})
        
    }
}

export default auth;