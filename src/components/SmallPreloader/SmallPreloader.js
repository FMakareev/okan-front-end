import React from 'react';
import styled from 'styled-components';
import {Box} from "../Box/Box";

export const PreloaderWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; 
  background-color: rgba(255, 255, 255, 0.6); 
  transition: .225s all;
`;
export const SpeedingWheel = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  border: 2px solid #aeaeae;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: cssload-spin 500ms infinite linear;
  -o-animation: cssload-spin 500ms infinite linear;
  -ms-animation: cssload-spin 500ms infinite linear;
  -webkit-animation: cssload-spin 500ms infinite linear;
  -moz-animation: cssload-spin 500ms infinite linear;

  @keyframes cssload-spin {
    100% {
      transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-o-keyframes cssload-spin {
    100% {
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-ms-keyframes cssload-spin {
    100% {
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes cssload-spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes cssload-spin {
    100% {
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  padding: 8px;
`;

export const SmallPreLoader = () => (
  <Container>
    <SpeedingWheel />
  </Container>
);

export default SmallPreLoader;
