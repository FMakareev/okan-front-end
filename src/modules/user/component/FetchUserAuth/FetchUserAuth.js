
/** json method */
import { jsonToUrlEncoded } from '../../../../utils/jsontools/jsonToUrlEncoded';

export const FetchUserAuth = value => {
  return fetch(`${ENDPOINT_CLIENT}/user/auth`, {
    method: 'POST',
    credentials: 'include',
    mode: 'no-cors',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: jsonToUrlEncoded(value),
  });
};

export default FetchUserAuth;
