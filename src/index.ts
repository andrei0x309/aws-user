
import {
  showUser as utilShowUser,
  removeUser,
  switchAwsCredentials,
  addUser,
  getAwsCredentials,
  libWipeStore,
  libLogout,
} from './utils.js'

export const listUsers = (): void => {
  const credentials = getAwsCredentials()
  if (credentials == null) {
    console.log('[ERROR]: no users found')
    return
  }
  console.log(JSON.stringify(credentials, null, 2))
}

export const createUser = (loginString: string): void => {
  const login = loginString.split(':')
  if (login.length !== 3) {
    console.log('[ERROR]: userString invalid format usename:AWS_ACCOUNT_ID:AWS_SECRET_ACCESS_KEY \n Example: john22:ASIARNQFX7RWNRAAI2VVO:TTgFyl0p/2kxXa/uJ9i9sabBn22b2sewLXjaXPPY')
    return
  }
  const [account, id, pass] = login
  const user = { account, id, pass }
  addUser(user)
}

export const deleteUser = (account: string): void => {
  removeUser(account)
}

export const switchUser = (account: string): void => {
  switchAwsCredentials(account)
}

export const showUser = (account: string): void => {
  utilShowUser(account)
}

export const wipeStore = (): void => {
  libWipeStore()
}

export const logout = (): void => {
  libLogout()
}

export const showHelp = (): void => {
  console.log('[INFO]: usage: \n\n')
  console.log('[INFO]: aws-user list \n')
  console.log('[INFO]: aws-user create <user> \n Example: aws-user create john22:ASIARNQFX7RWNRAAI2VVO:TTgFyl0p/2kxXa/uJ9i9sabBn22b2sewLXjaXPPY\n\n')
  console.log('[INFO]: aws-user delete <user> \n')
  console.log('[INFO]: aws-user switch <user> \n')
  console.log('[INFO]: aws-user show <user>\n')
  console.log('[INFO]: aws-user wipe \n')
  console.log('[INFO]: aws-user list \n')
  console.log('[INFO]: aws-user loggout \n')
  console.log('[INFO]: aws-user help \n')
}
