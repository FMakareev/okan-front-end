import { updateTag } from './update_tag';

export const updateCustomMeta = (property, content) => {
  updateTag('meta', 'property', property, 'content', content);
};
