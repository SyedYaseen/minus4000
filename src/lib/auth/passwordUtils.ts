import crypto from "crypto"

export function generateHash(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
}

export function validPassword(password: string, hash: string, salt: string) {
  return hash === generateHash(password, salt)
}

export function genPassword(password: string) {
  let salt = crypto.randomBytes(32).toString("hex")
  let genHash = generateHash(password, salt)

  return {
    salt: salt,
    hash: genHash,
  }
}
