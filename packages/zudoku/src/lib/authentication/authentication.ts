import { ZudokuPlugin } from "../core/plugins.js";

export interface AuthenticationProvider {
  signUp(options?: { redirectTo?: string }): Promise<void>;
  signIn(options?: { redirectTo?: string }): Promise<void>;
  signOut(): Promise<void>;
  getAccessToken(): Promise<string>;
  getAuthenticationPlugin?(): ZudokuPlugin;
  onPageLoad?(): void;
}

export interface AuthenticationProviderInitializer<TConfig> {
  (config: TConfig): AuthenticationProvider;
}
