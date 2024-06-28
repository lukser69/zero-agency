import { getRefreshToken, login, logout } from "@/api/auth";
import { IAuthForm } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";
import { setUser } from "@/stores/user.store";

export const authService = {
  async main(type: 'login', data: IAuthForm) {
    const response = await login(data);

    if (response?.accessToken) {
      saveTokenStorage(response.accessToken);
      setUser(response.user);
    }

    return response;
  },

  async getNewTokens() {
    const response = await getRefreshToken();

    if (response?.accessToken) {
      saveTokenStorage(response.accessToken);
      setUser(response.user);
    } else {
      setUser(null);
    }

    return response
  },

  async logout() {
    const response = await logout();

    if (response) {
      removeFromStorage();
      setUser(null);
    }

    return response
  }
}
