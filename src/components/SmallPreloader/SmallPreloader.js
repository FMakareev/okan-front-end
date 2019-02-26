import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box/Box';

export const PreloaderWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 3;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  -webkit-transition: 0.225s all;
  -o-transition: 0.225s all;
  transition: 0.225s all;
`;
export const SpeedingWheel = styled.div`
  width: 1em;
  height: 1em;
  margin: 0 auto;
  border: 2px solid #00649c;
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
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-o-keyframes cssload-spin {
    100% {
      -o-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-ms-keyframes cssload-spin {
    100% {
      -ms-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes cssload-spin {
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes cssload-spin {
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
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
