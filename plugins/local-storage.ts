import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie';
import cookie from 'cookie';
import { Plugin } from '@nuxt/types'


const localStorage: Plugin = ({ store, req, isDev }) => {
  createPersistedState({
    key: 'token', // choose any name for your cookie
    paths: [
      // persist the access_token and refresh_token values from the "auth" store module
      'auth.access_token',
      'auth.refresh_token',
    ],
    storage: {
      // if on the browser, parse the cookies using js-cookie otherwise parse from the raw http request
      getItem: key => process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key],
      // js-cookie can handle setting both client-side and server-side cookies with one method
      // use isDev to determine if the cookies is accessible via https only (i.e. localhost likely won't be using https)
      setItem: (key, value) => Cookies.set(key, value, { expires: 14, secure: !isDev }),
      // also allow js-cookie to handle removing cookies
      removeItem: key => Cookies.remove(key)
    }
  })(store)
};

export default localStorage;