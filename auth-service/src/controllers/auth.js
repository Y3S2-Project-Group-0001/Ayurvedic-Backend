import asyncHandler from '../middleware/async'
import { makeResponse } from '../utils/response'
import { sendTokenResponse } from '../utils/jwt'
import { authRegister, verifyUser, authLogin } from '../services/auth'

//Register a new user
export const register = asyncHandler(async (req, res) => {
  const result = await authRegister(req.body)
  if (!result) return makeResponse({ res, status: 500, message: 'Registration Failed' })
  if (result.status) return makeResponse({ res, ...result })
  return makeResponse({
    res,
    message: 'Registration Successfull. Please check your email to verify your account.',
  })
})

//Verify a user
export const verify = asyncHandler(async (req, res) => {
  const result = await verifyUser(req.body)
  if (!result)
    return makeResponse({ res, status: 400, message: 'Verification failed, invalid user' })
  return makeResponse({ res, message: 'Verification Successful' })
})

//User login
export const login = asyncHandler(async (req, res) => {
  const user = await authLogin(req.body)
  //check if user exists
  if (!user)
    return makeResponse({ res, status: 401, message: 'Invalid email or password. Try again!' })
  //check if user is verified
  if (!user.is_verified)
    return makeResponse({
      res,
      status: 401,
      message: 'Account not verified. Please check your email',
    })
  return sendTokenResponse(res, user, 'User logged in successfully')
})
