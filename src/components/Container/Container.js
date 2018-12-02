import styled from 'styled-components';
import PropTypes from 'prop-types';

/**View */
import { Box } from '../Box/Box';

/**Style property */
import { MaxWidthProperty } from '../../styles/styleProperty/MaxWidthProperty';

export const Container = styled(Box)`
  ${MaxWidthProperty};
`;

Container.defaultProps = {
  mt: 0,
  mb: 0,
  ml: 'auto',
  mr: 'auto',
  maxWidth: '992px',
};

Container.propTypes = {};

export default Container;
