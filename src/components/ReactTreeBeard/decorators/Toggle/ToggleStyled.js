import styled from 'styled-components';

export const Base = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-left: -5px;
  height: 24px;
  width: 24px;
`;

export const Polygon = styled.polygon`
  fill: #9da5ab;
  stroke-width: 0;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -7px 0 0 -7px;
  height: 14px;
`;

export default {
  Base,
  Polygon,
  Wrapper,
};
