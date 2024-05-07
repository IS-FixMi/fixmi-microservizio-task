import cookieParser from 'cookie-parser';
import getMissingFields from './missingFields';
import JSONError from './JSONError';

// This function returns the token from the request
export default function getToken(req) {

  let token;

  // getting the token from the request body
  token = req.body.token;

  if (token == undefined) {
    // getting the token from the cookie
    token = req.cookies.token;
  }

  // Check if the token is missing
  let missingFields = getMissingFields([["token", token]]);
  if (missingFields.length != 0) {
    let e = {'value': 'Missing fields', missingfields: missingFields };
    throw new JSONError(e);
  }

  return token;
}
