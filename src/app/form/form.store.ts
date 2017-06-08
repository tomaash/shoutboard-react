import { observable, action } from 'mobx'
import { FormState, FieldState } from 'formstate'
import { check, checkRequired } from './validatorUtils'
import * as isLength from 'validator/lib/isLength'

export class FormStore {
  title = new FieldState('').validators(
    checkRequired('Title is required'),
    check(isLength, 'Title must be at least 4 characters long.', { min: 4 }),
    check(isLength, 'Title cannot be more than 24 characters long.', { max: 24 }),
  )
  message = new FieldState('').validators(
    checkRequired('Message cannot be blank.'),
    check(isLength, 'Message is too short, minimum is 50 characters.', { min: 50 }),
    check(isLength, 'Message is too long, maximum is 1000 characters.', { max: 1000 }),
  )
  form = new FormState({
    title: this.title,
    message: this.message
  })
}
