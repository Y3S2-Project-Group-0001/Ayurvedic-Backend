import bcrypt from 'bcrypt'
import { sendMail } from './email'
import { createUser, findOneAndUpdateUser, getOneUser } from '../repository/user'

// Register a new user with email, username, and password
export const authRegister = async ({ email, username, password }) => {
  const user = await getOneUser({ email })
  if (user) return { status: 400, message: 'User already exists' }
  const encryptedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  }) // Encrypt password using bcrypt library
  const verificationCode = Math.floor(100000 + Math.random() * 900000)

  const registeredUser = await createUser({
    username,
    email,
    password: encryptedPassword,
    verification_code: verificationCode,
    photo_url: '',
    cover_photo_url: '',
  }) // Create a new user with provided details in the database
  await verifyMailTemplate(email, verificationCode) // Send a verification email to the registered user
  return registeredUser
}

// Verify a user's email using the verification code
export const verifyUser = async ({ email }) => {
  const user = await getOneUser({ email: email })
  if (!user) return false
  return await findOneAndUpdateUser({ email: user.email }, { is_verified: true })
}
// Login a user with email and password
export const authLogin = async ({ email, password }) => {
  const user = await getOneUser({ email }, true)
  if (!user) return false // Compare provided password with the stored password using bcrypt library
  const isPasswordMatch = await new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })
  if (!isPasswordMatch) return false
  delete user.password
  return user
}
// Send a verification email with a verification code
export const verifyMailTemplate = async (email, verification_code) => {
  const replacements = {
    verification_code: verification_code,
  } // Prepare replacements for email template
  const attachments = [
    {
      filename: 'verificationCode',
      path: __basedir + '/html/images/verificationCode.png',
      cid: 'verificationCode',
    },
  ] // Attachments for the email
  const subject = 'Welcome to CeylonHerb'
  await sendMail(email, 'verificationCode', replacements, subject, attachments)
  return true
}
