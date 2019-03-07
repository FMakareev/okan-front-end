import React from 'react';
import PropTypes from 'prop-types';
import {Box} from "@lib/ui/Box/Box";
import styled from 'styled-components';
import {color} from "styled-system";

const MenuItemStyled = styled(Box)`
  width: 100%;
  padding: 10px;
  background-color: #fff;  
  text-align: center;
  ${(props)=>color({...props,color:'color11'})}
  border-bottom: 1px solid #333333;
  cursor: pointer;
  font-family: 'Circe Regular';
  :last-child {
    border: none;
  }
  
  :hover {
    background-color: rgba(0,127,175,.2);
  }
`;



export const DropdownMenuList = ({options, onChange, labelKey, valueKey}) => (<Box
  borderRadius={'5px'}
  border={'1px solid'}
  borderColor={'color4'}
  backgroundColor={'color0'}
  overflow={'hidden'}
>
  {
    options && options.map((item, index) => (
      <MenuItemStyled
        key={`DropdownMenuList-${item[labelKey]}-${index}`}
        onClick={() => {
          onChange(item[valueKey])
        }}>
        {item[labelKey]}
      </MenuItemStyled>))
  }
</Box>);

DropdownMenuList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
};

DropdownMenuList.defaultProps = {
  options: [],
  onChange: () => {
  },
  labelKey: 'label',
  valueKey: 'value',
};

export default DropdownMenuList;
