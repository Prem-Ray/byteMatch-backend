const adminAuth = (req,res,next)=>{
    console.log("Admin auth") ;
    const token = "axy" ;
    const isAdminAuthorized = token = "axy" ;
    if(!isAdminAuthorized){
        res.send(401).send("Unauthorized") ;
    }else{
        next() ;
    }
 }

 module.exports = {adminAuth} ;