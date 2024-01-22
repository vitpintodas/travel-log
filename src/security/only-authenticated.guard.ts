import { AuthService } from "./auth-service";

export async function onlyAuthenticated() {
  const result = await AuthService.isAuthenticated();
  return result || { name: "Login" };
}
