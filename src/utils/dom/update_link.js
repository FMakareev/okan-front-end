import { updateTag } from './update_tag';

export const updateLink = (rel, href) => {
  updateTag('link', 'rel', rel, 'href', href);
};
