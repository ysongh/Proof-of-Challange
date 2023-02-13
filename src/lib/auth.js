import { AuthProvider } from '@arcana/auth'
import { VUE_APP_ARCANA_APP_ADDRESS } from '../keys'
let authInstance

export async function getAuthInstance () {
  if (authInstance == null) {
    authInstance = new AuthProvider(VUE_APP_ARCANA_APP_ADDRESS, {
      network: 'testnet',
      alwaysVisible: true,
      theme: 'light',
      position: 'right'
    })
    await authInstance.init()
    await authInstance.connect()
  }
  return authInstance
}