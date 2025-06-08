import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import TicketsList from '../src/pages/TicketsList';
import TicketDetail from '../src/pages/TicketDetail';
import CreateTicket from '../src/pages/CreateTicket';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';
import SignIn from './pages/SignIn';
import ProfilePage from './pages/ProfilePage';
import TicketList from '../src/pages/TicketsList';
import SignUp from './pages/SignUp';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const NavButton = styled(Link)`
  padding: 0.5rem 1rem; 
  color: black;
  border: 2px solid black;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(216, 238, 255);
  }
`;

const App: React.FC = () => {
  return (
  <ThemeProvider theme={lightTheme}> 
  <Provider store={store}> 
    <Router>
      <Container>
        <Nav>
          <NavButton to="/">Tickets</NavButton>
          <NavButton to="/create">Create Ticket</NavButton> 
           <NavButton to="/profile">Profile</NavButton>
        </Nav>
        <Routes>
          <Route path="/" element={<TicketsList />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/create" element={<CreateTicket />} />
        </Routes>
      </Container>
    </Router>
    </Provider>
  </ThemeProvider>
  );
};

export default App;
