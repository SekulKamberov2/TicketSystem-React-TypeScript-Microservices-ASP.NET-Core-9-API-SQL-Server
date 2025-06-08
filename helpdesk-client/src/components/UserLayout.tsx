import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROLES } from '../utils/roles';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 2vh;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  color: #2c3e50;
  padding: 10px;
  align-items: center;
`;

const NavbarLeft = styled.div`
  display: flex;
  width: 100%;
  font-weight: 500;
  align-items: center;
`;

const NavItem = styled(NavLink)`
  display: block;
  color: white;
  margin: 0 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.background || '#f9f9f9'};
  color: ${({ theme }) => theme.text || '#333'};
  height: 100vh;
  width: 100vw;
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

interface RoundedButtonProps {
  width?: string;
}

const RoundedButton = styled.button<RoundedButtonProps>`
  padding: 5px 8px;
  background-color: transparent;
  color: black;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 650;
  margin-left: 9px;
  width: ${({ width }) => width || 'auto'};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #d4edda;
    border-color: black;
  }
`;

interface User {
  userName: string;
  roles: string[];
}

const UserLayout: React.FC = () => {
  const navigate = useNavigate();

  let user: User | null = null;
  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser && rawUser !== 'undefined') {
      user = JSON.parse(rawUser) as User;
    }
  } catch (err) {
    console.error('Failed to parse user from localStorage:', err);
  }

  useEffect(() => {
    if (!user) navigate('/signin');
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (!user) return null;

  const ADMIN = user.roles.some(role => role === ROLES.HR_ADMIN);
  const MANAGER = user.roles.some(role => role === ROLES.MANAGER);

  return (
    <LayoutContainer>
      <Navbar>
        <NavbarLeft>Welcome, {user.userName}</NavbarLeft>
        <NavbarRight>
          {user.roles.length > 0 && (
            <>
              {ADMIN && (
                <RoundedButton width="80px" onClick={() => (window.location.href = '/signup')}>
                  SignUp
                </RoundedButton>
              )}
              {(ADMIN || MANAGER) && (
                <RoundedButton width="70px" onClick={() => navigate('/users')}>
                  Users
                </RoundedButton>
              )}
              {ADMIN && (
                <RoundedButton width="70px" onClick={() => navigate('/roles')}>
                  Roles
                </RoundedButton>
              )}
            </>
          )}
          <RoundedButton onClick={() => navigate('/profile')}>Profile</RoundedButton>
          <RoundedButton onClick={handleLogout}>Logout</RoundedButton>
        </NavbarRight>
      </Navbar>

      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default UserLayout;
