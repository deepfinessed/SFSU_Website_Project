import jwt from 'jsonwebtoken';

function verifyJWT(req,res,next){
  const [type, token] = req.get('Authorization').split(' ');
  if(type !== 'Bearer'){
    res.sendStatus(400);
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if(err || !decodedToken){
      res.status(400).send(err);
    }
    req.token = decodedToken;
    next();
  });
}

export default verifyJWT;
