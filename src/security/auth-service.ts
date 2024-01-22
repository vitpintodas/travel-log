//import { Injectable } from "@angular/core";
import axios, { AxiosError } from 'axios';
//import { Observable, ReplaySubject, map } from "rxjs";
import { AuthResponse } from "./auth-response.model";
//import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { AuthRequest } from "./auth-request.model";

/***********************************************************/
/*********!!! REPLACE BELOW WITH YOUR API URL !!! **********/
/***********************************************************/
const API_URL = "https://my-travel-log-cfax.onrender.com/api";

let auth: AuthResponse | undefined = undefined;
// TODO: Initialiser "auth" avec l'éventuelle valeur présente dans le store.

/**
 * Authentication service for login/logout.
 */
export class AuthService {

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
  static async logIn(authRequest: AuthRequest): Promise<User> {
    const authUrl = `${API_URL}/auth`;
    try
    {
        const {data: response} = await axios.post<AuthResponse>(authUrl, authRequest);
        // TODO: stocker "response" quelque part dans un store
        auth = response;
        console.log(`User ${response.user.name} logged in`);
        return response.user;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401)
        {
            console.error("T'as une erreur sorry");
        } else {
            console.error("Erreur de serveur je crois:", error);
        }
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