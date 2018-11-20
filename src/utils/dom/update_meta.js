import { updateTag } from './update_tag';

export const updateMeta = (name, content) => {
  updateTag('meta', 'name', name, 'content', content);
};
