import crypto, { createHash } from 'crypto'
import env from '../env'
// const key1 = crypto.randomBytes(256).toString('hex')
// const key2 = crypto.randomBytes(256).toString('hex')
// console.table({key1 , key2})

const ENCRYPTION_KEY = env.ENCRYPTION_KEY || "2e6e454d1706f9e58ed155429a4809dc68025091857bb700e8aeaf9566a63107"
const IV_LENGTH = 16

export function encrypt(text: string) {
    let iv = crypto.randomBytes(IV_LENGTH)
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
    let encrypted = cipher.update(text)

    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decrypt(text: string) {
    let textParts = text.split(':')
    let iv = Buffer.from(textParts.shift()!, 'hex')
    let encryptedText = Buffer.from(textParts.join(':'), 'hex')
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}
