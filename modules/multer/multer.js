import multer from "multer";
import path from "path";


//configuro multer
const storage = multer.diskStorage({
    destination:function(_req,_file,cb){
        cb(null,path.join(__dirname,"..","..", "public","images_users"));
    }, 
    filename: function(_req,file,cb){
        cb(null,`FotoUsuario_${Date.now()}${path.extname(file.originalname)}`);
    }
}); 
const upload = new multer({storage});
export {upload};