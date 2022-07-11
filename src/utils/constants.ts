/**
 * To set dev env var in a env file you have to follow the following rules (create-react-app ones):
 * https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env
 * => `REACT_APP_*`
 * and referring them by lower case (ionic transformation):
 * https://github.com/ionic-team/ionic-cli/issues/4333#issuecomment-1009481605
 * => `console.log(process.env);`
 */

/**
 * API URL from back-end service
 */
export const apiUrl = process.env.react_app_ms_users_back_api_url || 'http://localhost:3000';

export const storageKeyHasLoggedIn = 'hasLoggedIn';
export const storageKey = 'user';

export const COLORS = [
  '#fad390',
  '#f8c291',
  '#6a89cc',
  '#82ccdd',
  '#b8e994',
  '#f6b93b',
  '#e55039',
  '#4a69bd',
  '#60a3bc',
  '#78e08f',
  '#fa983a',
  '#eb2f06',
  '#1e3799',
  '#3c6382',
  '#38ada9',
  '#e58e26',
  '#b71540',
  '#0c2461',
  '#0a3d62',
  '#079992',
];

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
