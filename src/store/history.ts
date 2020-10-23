import { createBrowserHistory } from 'history';

/**
 * Enables access to router functions such as `push`, `replace`
 * in environments not scoped with React Router.
 *
 * Usage:
 *
 * import history from 'store/history';
 * history.push('target/route');
 */
export default createBrowserHistory();
