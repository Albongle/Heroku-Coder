import jwt from "jsonwebtoken";
export class JsonWebToken{

    static generateAccessToken = (user)=> jwt.sign(user,process.env.PALABRA_SECRETA, {expiresIn:"10m"});

    static validaAccessToken = (accessToken,callback)=>jwt.verify(accessToken,process.env.PALABRA_SECRETA,callback);

    static decodificaAccessToken = (accessToken)=> jwt.decode(accessToken,{complete:true});
}