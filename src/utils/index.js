// dom
import { updateCustomMeta } from './dom/update_custom-meta';
import { updateLink } from './dom/update_link';
import { updateMeta } from './dom/update_meta';
import { updateTag } from './dom/update_tag';
// validation
import { isEmail } from './validation/isEmail';
import { isNumber } from './validation/isNumber';

import { maxLength } from './validation/maxLength';
import { minLength } from './validation/minLength';

import { minValue } from './validation/minValue';
import { maxValue } from './validation/maxValue';

import { required } from './validation/required';

export {
  // dom
  updateCustomMeta,
  updateLink,
  updateMeta,
  updateTag,
  // validation
  required,
  isEmail,
  isNumber,
  maxLength,
  minLength,
  minValue,
  maxValue,
};
