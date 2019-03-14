import styled from "styled-components";

export const SideBarWrapper = styled.div`
  position: relative;
  padding-top: 10px;
  width: 340px;
  min-height: calc(100vh - 40px);
  padding-top: 10px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: fixed;
  overflow-y: scroll;
  height: calc(100vh - 40px);
`;


export default SideBarWrapper;
