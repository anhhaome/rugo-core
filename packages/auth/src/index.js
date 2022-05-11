import { wrapComposer } from "rugo-common";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const forbidden = (data) => ({
  status: 403,
  data
});

const badRequest = (data) => ({
  status: 400,
  data
})

export const createLogin = wrapComposer(async (secret, model, form) => {
  const { email, password } = form;

  if (!email || !password)
    return badRequest('Email and Password must not be empty');

  const { data: { 0: info } } = await model.list({ $limit: 1, email });

  if (!info || !bcrypt.compareSync(password, info.password)){
    return forbidden(ctx, 'Wrong email or password');
  }

  const token = jwt.sign({
    id: info._id
  }, secret, {
    expiresIn: '30d'
  });

  return {
    status: 200,
    data: token
  }
});

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch(err){
    return false;
  }
}

export const createGate = wrapComposer(async (secret, model, disabled, token, context) => {
  if (disabled)
    return null;

  if (!token)
    return forbidden('Access denied');

  const [authType, authToken] = token.split(' ');
  let user;

  if (authType === 'Bearer'){
    const rel = await verifyToken(authToken, secret);
    if (rel){
      user = await model.get(rel.id);
    } else {
      return forbidden('Your session has expired. Please logging in again!');
    }
  } else {
    user = (await model.list({
      apikey: token
    })).data[0];
  }

  if (!user)
    return forbidden('Access denied');

  context.user = user;

  return null;
});