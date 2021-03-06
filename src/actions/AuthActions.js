import { api } from '../services/api'
import AuthConstants from './AuthConstants'
import { push } from '../middleware/history'

/**
 * Executes a request to log in the user and then
 * dispatches a login success handler and redirects to
 * home page.
 */
export function login (username, password) {
  return function (dispatch, getState) {
    return api
      .login(username, password)
      .then(r => {
        dispatch(handleLoginSuccess(r.data))
      })
      .catch(error => {
        switch (error.response.status) {
          case 500:
            dispatch(handleLoginError(error.response.data))
        }
      })
  }
}

/**
 * Logs out a user
 */
export function logout () {
  return function (dispatch, getState) {
    api.setToken('')
    // TODO server side call to invalidate token
    dispatch({
      type: AuthConstants.LOGOUT
    })
    dispatch(push('/login'))
  }
}

export function qrcode (account) {
  return function (dispatch) {
    return api
      .twoFactor(account)
      .then(response => {
        dispatch(handleTwoFactorQrCode(response.data))
      })
  }
}

export function twofactor (account, token) {
  return function (dispatch, getState) {
    return api
      .twoFactor(account, token)
      .then(response => {
        api.setToken(getState().authentication.token)
        dispatch(handleTwoFactorSuccess())
        dispatch(push('/form'))
      })
      .catch(error => {
        api.setToken('')
        dispatch(handleTwoFactorError(error.response.data))
      })
  }
}

export function twofactorreset (account) {
  return function (dispatch, getState) {
    return api
      .twoFactorReset(account)
      .then(response => {
        api.setToken('')
        dispatch(handleTwoFactorError('Two factor authentication reset'))
        dispatch(qrcode(account))
      })
      .catch(error => {
        api.setToken('')
        dispatch(handleTwoFactorError(error.response.data))
      })
  }
}

export function handleLoginSuccess (token) {
  return {
    type: AuthConstants.LOGIN_SUCCESS,
    token: token
  }
}

export function handleLoginError (error) {
  return {
    type: AuthConstants.LOGIN_ERROR,
    error: error
  }
}

export function handleTwoFactorQrCode (png) {
  return {
    type: AuthConstants.TWOFACTOR_QRCODE,
    qrcode: png
  }
}

export function handleTwoFactorSuccess () {
  return {
    type: AuthConstants.TWOFACTOR_SUCCESS
  }
}

export function handleTwoFactorError (error) {
  return {
    type: AuthConstants.TWOFACTOR_ERROR,
    error: error
  }
}
