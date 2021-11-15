import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js';

export const changeTheme = (scopeName: string): void => {
  toggleTheme({
    scopeName
  });
};
