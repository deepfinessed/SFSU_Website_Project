import jwt from 'jsonwebtoken';

function verifyJWT(req,res,next){
  const token = (req.method === 'POST') ? req.body.token : req.query.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if(err || !decodedToken){
      res.status(400).send(err);
    }
    req.token = decodedToken;
    next();
  });
}

export default verifyJWT;
