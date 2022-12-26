import styled from "styled-components";

export const StyledMain = styled.div`
  width: 100%;
  .ant-layout-header {
    background-color: #9cffee;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    position: "sticky";
    top: 0;
    z-index: 1;
    width: "100%";
  }
  .site-layout {
    padding: 25px;
    min-height: calc(100vh - 65px);
  }
  .logo {
    img {
      width: 200px;
    }
  }
  .main_content {
    background: #fff;
    padding: 10px;
    height: 100% !important;
    width: 100%;
  }
  .form_body {
    display: flex;
    align-items: center;
    justify-content: center;
    .sbm_btn {
      margin: 10px;
    }
  }
`;
