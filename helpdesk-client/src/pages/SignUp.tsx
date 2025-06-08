import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ErrorNotification from '../components/ErrorNotification';

// Interfaces
interface SignUpFormData {
  UserName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
}

interface CreatedUser {
  Id: number;
  UserName: string;
  Email: string;
  PhoneNumber: string;
}

// Styled components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfileDetailsHeader = styled.div`
  font-size: 31px;
  color: #333;
  margin-bottom: 28px;
  text-align: center;
  font-weight: 700;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background || '#f9f9f9'};
  color: ${({ theme }) => theme.text || '#333'};
  margin-top: 7%;
  height: 30vh;
  width: 30vw;
`;

const ProfileInfo = styled.p`
  font-size: 21px;
  color: #555;
  margin: 5px 0;
`;

const Field = styled.span`
  color: #555;
  font-weight: 650;
  padding-right: 7px;
`;

// Component
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<SignUpFormData>({
    UserName: '',
    Email: '',
    Password: '',
    PhoneNumber: '',
  });

  const [data, setData] = useState<CreatedUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5003/api/HR/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        setData(result.data);
        navigate('/profile');
      } else {
        setError(result.error || 'Sign up failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    }
  };

  return (
    <>
      {!data ? (
        <ProfileContainer>
          <Form onSubmit={handleSubmit}>
            <h3>Qwerty1!@%</h3>
            {error && <ErrorNotification message={error} />}

            <Input
              type="text"
              name="UserName"
              value={userData.UserName}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <Input
              type="email"
              name="Email"
              value={userData.Email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <Input
              type="password"
              name="Password"
              value={userData.Password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <Input
              type="text"
              name="PhoneNumber"
              value={userData.PhoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <Button type="submit">Sign Up</Button>
          </Form>
        </ProfileContainer>
      ) : (
        <ProfileContainer>
          <ProfileDetailsHeader>Employee Created</ProfileDetailsHeader>
          <ProfileInfo><Field>ID:</Field>{data.Id}</ProfileInfo>
          <ProfileInfo><Field>User:</Field>{data.UserName}</ProfileInfo>
          <ProfileInfo><Field>Email:</Field>{data.Email}</ProfileInfo>
          <ProfileInfo><Field>Phone Number:</Field>{data.PhoneNumber}</ProfileInfo>
        </ProfileContainer>
      )}
    </>
  );
};

export default SignUp;
