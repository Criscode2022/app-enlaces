import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.png";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <h1>
          <img src={Logo} alt="Logo" />
        </h1>
      </Link>

      <nav>

      <Link to="/login">
        <Button variant="contained">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="contained">Register</Button>
      </Link>
      <Link to="/feed">
        <Button variant="contained">Feed</Button>
      </Link>
      <Link to="/linkform">
        <Button variant="contained">Share Link</Button>
      </Link>
      </nav>

        <ul>




          <li>
            <Icon>
              <CustomPersonIcon className="large-icon" />
            </Icon>
          </li>
        </ul>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 0;
  border-bottom: 2px solid black;
  background-color: #290025;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  img {
    max-width: 300px;
    margin: 0;
  }

  ul {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    list-style: none;
    position: absolute;
    top: 0;
    right: 0;
  }

  button {
    margin: 20px;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a.active {
    font-weight: bold;
  }

  nav {

    display:flex;
    justify-content: space-around;
    width: 60%;
    max-width: 100%;
    margin-left:30%;



  }

  h1 {
    text-align: center;
    font-weight: bold;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
`;

const Icon = styled.div`
  margin: 20px;
`;

const CustomPersonIcon = styled(PersonIcon)`
  &.large-icon {
    font-size: 50px;
  }
`;

export default Header;
