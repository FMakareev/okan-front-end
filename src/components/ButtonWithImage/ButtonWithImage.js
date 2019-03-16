import React, {Component} from 'react';
import PropTypes from 'prop-types';

/** View */
import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';
import {PreloaderWrapper, SpeedingWheel} from "@lib/ui/SmallPreloader/SmallPreloader";

export class ButtonWithImage extends Component {
  static propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.any,
    isLoading: PropTypes.bool,
    leftIcon: PropTypes.any,
    ml: PropTypes.number,
    mr: PropTypes.number,
    name: PropTypes.string,
    rightIcon: PropTypes.any,
    size: PropTypes.string,
    variant: PropTypes.string,
    width: PropTypes.any,
    widthIcon: PropTypes.any
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.isLoading !== this.props.isLoading){
      return true;
    }
    if(nextProps.disabled !== this.props.disabled){
      return true;
    }
    return false;
  }

  render() {
    const {
      leftIcon,
      rightIcon,
      children,
      variant,
      size,
      mr,
      ml,
      width,
      widthIcon,
      isLoading,
      ...props
    } = this.props;
    return (
      <ButtonBase variant={variant} size={size} width={width} {...props}>
        <Flex justifyContent={'center'} alignItems={'space-around'} width={'100%'}>
          {leftIcon && (
            <Flex position={'relative'} mr={mr} justifyContent={'center'} alignItems={'center'} width={widthIcon}>
              {leftIcon}
            </Flex>
          )}

          <Flex justifyContent={'center'} alignItems={'center'}>
            {children}
            {
              isLoading &&
              <PreloaderWrapper>
                <SpeedingWheel/>
              </PreloaderWrapper>
            }
          </Flex>

          {rightIcon && (
            <Flex position={'relative'} ml={ml} justifyContent={'center'} alignItems={'center'} width={widthIcon}>
              {rightIcon}
            </Flex>
          )}
        </Flex>
      </ButtonBase>
    );
  }
}


export default ButtonWithImage;
