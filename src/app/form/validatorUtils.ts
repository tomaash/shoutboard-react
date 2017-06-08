import { ValidationResponse } from 'formstate'

type simpleValidator = (value, options?: any) => boolean

export const nonEmpty: simpleValidator = (str: string) => !!str

export const check = (validator: simpleValidator, message: string, options?: any) =>
  (value) =>
    (!validator(value, options) && message) as ValidationResponse

export const checkRequired = (msg: string) => check(nonEmpty, msg)
