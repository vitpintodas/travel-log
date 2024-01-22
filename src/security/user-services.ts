import axios from 'axios';
import { AuthResponse } from "./auth-response.model";
import { User } from "./user.model";
import { UserRequest } from "./user-request.model";

/***********************************************************/
/*********!!! REPLACE BELOW WITH YOUR API URL !!! **********/
/***********************************************************/
const API_URL = "https://my-travel-log-cfax.onrender.com/api";

let auth: AuthResponse | undefined = undefined;

/**
 * Authentication service for login/logout.
 */
export class UserService {

  /**
   * @returns An `Observable` that will emit a `boolean` value
   * indicating whether the current user is authenticated.
   * This `Observable` will never complete and must be unsubscribed for when not needed.
   */
  static async isAuthenticated(): Promise<boolean> {
    return !!auth;
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated `User` object only if there
   * currently is an authenticated user.
   */
  static async getUser(): Promise<User | undefined> {
    return auth?.user;
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated user's `token`, only if there
   * currently is an authenticated user.
   */
  static async getToken(): Promise<string | undefined> {
    if(auth?.token) {
      console.log(auth.token);
    }
    return auth?.token;
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  static async signUp(userRequest: UserRequest): Promise<User> {
    const authUrl = `${API_URL}/users`;
    console.log(authUrl);
    try
    {
        const {data: response} = await axios.post<AuthResponse>(authUrl, userRequest);
        console.log("Bien ouej");
        
        return response.user;
    } catch(error) {
        console.log("oups");
        return Promise.reject(error);
    }
  }

  /**
   * Logs out the current user.
   */
  static logOut(): void {
    auth = undefined;
    // TODO: Supprimer l'authentification du store
    console.log("Utilisateur déconnecté !");
  }
}