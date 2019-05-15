import React from 'react';
/** View */
import ButtonWithImage from '@lib/ui/ButtonWithImage/ButtonWithImage';

export const ButtonDocumentToApproval = ({
  title,
  variant,
  size,
  onClick,
  isLoading,
  children,
}) => {
  return (
    <ButtonWithImage
      isLoading={isLoading}
      onClick={onClick}
      title={title}
      size={size}
      variant={variant}>
      {children}
    </ButtonWithImage>
  );
};

export default ButtonDocumentToApproval;
