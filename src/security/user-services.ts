import axios from 'axios';
import { AuthResponse } from "./auth-response.model";
import { User } from "./user.model";
import { UserRequest } from "./user-request.model";

/***********************************************************/
/*********!!! REPLACE BELOW WITH YOUR API URL !!! **********/
/***********************************************************/
const API_URL = "https://my-travel-log-cfax.onrender.com/api";

/**
 * Authentication service for login/logout.
 */
export class UserService {

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  static async signUp(userRequest: UserRequest): Promise<User> {
    const authUrl = `${API_URL}/users`;
    try
    {
        const {data: response} = await axios.post<AuthResponse>(authUrl, userRequest);
        return response.user;
    } catch(error) {
        return Promise.reject(error);
    }
  }
}