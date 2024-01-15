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

/**
 * Authentication service for login/logout.
 */
export class AuthService {
    #auth: AuthResponse | undefined;
  //#auth$: ReplaySubject<AuthResponse | undefined>;

  constructor() {
    this.#auth = undefined;
  }

  /**
   * @returns An `Observable` that will emit a `boolean` value
   * indicating whether the current user is authenticated.
   * This `Observable` will never complete and must be unsubscribed for when not needed.
   */
  async isAuthenticated(): Promise<boolean> {
    return !!this.#auth;
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated `User` object only if there
   * currently is an authenticated user.
   */
  async getUser(): Promise<User | undefined> {
    return this.#auth?.user;
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated user's `token`, only if there
   * currently is an authenticated user.
   */
  async getToken(): Promise<string | undefined> {
    return this.#auth?.token;
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  async logIn(authRequest: AuthRequest): Promise<User> {
    const authUrl = `${API_URL}/auth`;
    try
    {
        const {data: response} = await axios.post(authUrl, authRequest);
        this.#auth = response;
        console.log(`User ${response.user.name} logged in`);
        return response.user;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401)
        {
            console.error("T'as une erreur sorry");
        } else {
            console.error("Erreur de serveur je crois:", error);
        }
        throw error
    }
  }

  /**
   * Logs out the current user.
   */
  logOut(): void {
    this.#auth = undefined;
    console.log("Utilisateur déconnecté !");
  }
}