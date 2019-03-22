import PropTypes from 'prop-types';

const { any, bool, func, shape, string, oneOfType, object, number } = PropTypes;

export const formPropTypes = {
  // State:
  anyTouched: bool, // true if any of the fields have been marked as touched
  asyncValidating: oneOfType([bool, string]), // true if async validation is running, a string if a field triggered async validation
  dirty: bool, // true if any values are different from initialValues
  error: any, // form-wide error from '_error' key in validation result
  form: string, // the name of the form
  invalid: bool, // true if there are any validation errors
  initialized: bool, // true if the form has been initialized
  initialValues: object, // the initialValues object passed to reduxForm
  pristine: bool, // true if the values are the same as initialValues
  pure: bool, // if true, implements shouldComponentUpdate
  submitting: bool, // true if the form is in the process of being submitted
  submitFailed: bool, // true if the form was submitted and failed for any reason
  submitSucceeded: bool, // true if the form was successfully submitted
  valid: bool, // true if there are no validation errors
  warning: any, // form-wide warning from '_warning' key in validation result
  // Actions:
  array: shape({
    insert: func, // function to insert a value into an array field
    move: func, // function to move a value within an array field
    pop: func, // function to pop a value off of an array field
    push: func, // function to push a value onto an array field
    remove: func, // function to remove a value from an array field
    removeAll: func, // function to remove all the values from an array field
    shift: func, // function to shift a value out of an array field
    splice: func, // function to splice a value into an array field
    swap: func, // function to swap values in an array field
    unshift: func, // function to unshift a value into an array field
  }),
  asyncValidate: func, // function to trigger async validation
  autofill: func, // action to set a value of a field and mark it as autofilled
  blur: func, // action to mark a field as blurred
  change: func, // action to change the value of a field
  clearAsyncError: func, // action to clear the async error of a field
  clearFields: func, // action to clean fields values for all fields
  clearSubmitErrors: func, // action to remove submitErrors and error
  destroy: func, // action to destroy the form's data in Redux
  dispatch: func, // the Redux dispatch action
  handleSubmit: func, // function to submit the form
  initialize: func, // action to initialize form data
  reset: func, // action to reset the form data to previously initialized values
  resetSection: func, // action to reset the form sections data to previously initialized values
  touch: func, // action to mark fields as touched
  submit: func, // action to trigger a submission of the specified form
  untouch: func, // action to mark fields as untouched

  // triggerSubmit
  triggerSubmit: bool, // if true, submits the form on componentWillReceiveProps
  clearSubmit: func, // called before a triggered submit, by default clears triggerSubmit
};

export const fieldInputPropTypes = {
  checked: bool,
  name: string,
  onBlur: func,
  onChange: func,
  onDragStart: func,
  onDrop: func,
  onFocus: func,
  value: any,
};

export const fieldMetaPropTypes = {
  active: bool,
  asyncValidating: bool,
  autofilled: bool,
  dirty: bool,
  dispatch: func,
  error: any,
  form: string,
  invalid: bool,
  pristine: bool,
  submitting: bool,
  submitFailed: bool,
  touched: bool,
  valid: bool,
  visited: bool,
  warning: string,
};

export const fieldArrayMetaPropTypes = {
  dirty: bool,
  error: any,
  form: string,
  invalid: bool,
  pristine: bool,
  submitFailed: bool,
  submitting: bool,
  valid: bool,
  warning: string,
};

export const fieldArrayFieldsPropTypes = {
  name: string,
  forEach: func,
  get: func,
  getAll: func,
  insert: func,
  length: number,
  map: func,
  move: func,
  pop: func,
  push: func,
  reduce: func,
  remove: func,
  removeAll: func,
  shift: func,
  swap: func,
  unshift: func,
};

export const fieldPropTypes = {
  input: shape(fieldInputPropTypes),
  meta: shape(fieldMetaPropTypes),
};

export const fieldArrayPropTypes = {
  fields: shape(fieldArrayFieldsPropTypes),
  meta: shape(fieldArrayMetaPropTypes),
};

export default formPropTypes;
