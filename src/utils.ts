import os from 'os'
import Conf from 'conf'
import fs from 'fs'
import { fileDBSchema } from './schema/fileDb.js'

const awsDir = os.homedir() + '/.aws'
const mainStore = new Conf({ configName: 'store', cwd: awsDir, schema: fileDBSchema })

export const getAwsDir = (): string => awsDir
export const getAwsCredentialsFile = (): string => (getAwsDir() + '/credentials')
export const getStoreFile = (): string => (getAwsDir() + '/store')
export const getMainStore = (): Conf => mainStore

export const getAwsCredentials = (): [{ [key: string]: string }] => {
  const credentials = getMainStore().get('users')
  if (credentials == null) {
    return [] as unknown as [{ [key: string]: string }]
  }
  return credentials as [{ [key: string]: string }]
}

export const getAwsCredentialsByAccount = (account: string): { [key: string]: string } => {
  const credentials = getAwsCredentials()
  return credentials.find(c => c.account === account) ?? {}
}

export const removeUser = (account: string): void => {
  const credentials = getAwsCredentials()
  const index = credentials.findIndex(c => c.account === account)
  if (index === -1) {
    console.error(`[ERROR]: user ${account} not found to remove`)
    return
  }
  credentials.splice(index, 1)
  getMainStore().set('users', credentials)
}

export const switchAwsCredentials = (account: string): void => {
  const acc = getAwsCredentialsByAccount(account)
  if (acc == null) {
    console.error(`[ERROR]: account: ${account} not found`)
  }
  const stringStub = `[default]\naws_access_key_id = ${acc.id}\naws_secret_access_key = ${acc.pass}\n`
  fs.writeFileSync(getAwsCredentialsFile(), stringStub)
  console.log(`[INFO]: switched to account: ${account}`)
}

export const addUser = (user: { [key: string]: string }): void => {
  const credentials = getAwsCredentials()
  if (!('account' in user) || !('id' in user) || !('pass' in user)) {
    console.error('[ERROR]: user invalid format usename:AWS_ACCOUNT_ID:AWS_SECRET_ACCESS_KEY \n Example: aws-user add john22:ASIARNQFX7RWNRAAI2VVO:TTgFyl0p/2kxXa/uJ9i9sabBn22b2sewLXjaXPPY')
  }
  credentials.push(user)
  getMainStore().set('users', credentials)
  console.log(`[INFO]: user: ${user.account} added to store`)
  switchAwsCredentials(user.account)
}

export const showUser = (account: string): void => {
  const credentials = getAwsCredentialsByAccount(account)
  if (credentials == null) {
    console.error(`[ERROR]: account: ${account} not found`)
    return
  }
  console.log(credentials)
}

export const libWipeStore = (): void => {
  const cleanData = [] as unknown as [{ [key: string]: string }]
  getMainStore().set('users', cleanData)
  console.log('[INFO]: store wiped')
}

export const libLogout = (): void => {
    fs.unlinkSync(getAwsCredentialsFile())
    console.log('[INFO]: logged out of current aws account')
}
