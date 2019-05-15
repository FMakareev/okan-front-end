import React from 'react';

/** Image */
// import { SvgSidebarComment } from '../../../../components/Icons/SvgSidebarComment';

/** View */
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';

export const ButtonDocumentToApproval = ({
  title,
  variant,
  size,
  handleSubmit,
  isLoading,
  children,
}) => {
  return (
    <ButtonWithImage
      isLoading={isLoading}
      onClick={handleSubmit}
      title={title}
      size={size}
      variant={variant}>
      {children}
    </ButtonWithImage>
  );
};

export default ButtonDocumentToApproval;
