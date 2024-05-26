// import { Link, useNavigate } from "react-router-dom";
// import styled from "styled-components";

// function Dropdown() {
//   const navigate = useNavigate();
//   return (
//     <Box>
//       <List onClick={() => navigate("/setting")}>계정설정</List>
//       <List>로그아웃</List>
//     </Box>
//   );
// }

// export default Dropdown;

// const Box = styled.div`
//   width: 120px;

//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);

//   position: absolute;
//   top: 50px;
//   right: 0;

//   overflow: hidden;
// `;

// const List = styled.div`
//   width: 100%;
//   padding: 6px 8px;

//   cursor: pointer;

//   &:hover {
//     background-color: #dbffb680;
//     color: #54a300;
//   }
// `;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Dropdown() {
  const navigate = useNavigate();
  return (
    <Box>
      <List onClick={() => navigate("/setting")}>계정설정</List>
      <List>로그아웃</List>
    </Box>
  );
}

export default Dropdown;

const Box = styled.div`
  width: 120px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50px;
  right: 0;
  overflow: hidden;
`;

const List = styled.div`
  width: 100%;
  padding: 6px 8px;
  cursor: pointer;
  &:hover {
    background-color: #dbffb680;
    color: #54a300;
  }
`;
