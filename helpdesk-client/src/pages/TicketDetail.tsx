import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTicket, UserTicket } from '../api';

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color:rgb(244, 255, 253);
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin: 1rem 0;
  color: rgb(1, 12, 19);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.b` 
font-size: 27px; 
  color: #333;
`; 

const UserName = styled.p` 
margin-top: 0.3rem; 
font-size: 12px; 
  color: #333;
`;  
const Created = styled.p` 
margin-top: 0.3rem; 
margin-left: 1rem;
float: left;
font-size: 12px; 
  color: #333;
`;  

const TicketID = styled.h1`
  font-size: 23px; 
  color: #444;
`;

const Description = styled.p`
  font-size: 21px; 
  color: #333; 
   margin-bottom: 3rem; 
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 0.70rem;
`; 

const DateTimeWrapper = styled.div` 
  margin-top: 3rem;
`;  

const PhoneNumber = styled.div`
  display: flex;
  margin-bottom: 3.70rem;
`; 

const Label = styled.div`
  flex: 0 0 160px;
  font-weight: bold;
  color: #555;
`;

const Value = styled.div`
  flex: 1;
  color: #222;
`;

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<UserTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchTicket = async () => {
      try {
        const res = await getTicket(Number(id));
        if (res.data.isSuccess && res.data.data) {
          setTicket(res.data.data);
        } else {
          alert(res.data.error ?? 'Failed to fetch ticket');
        }
      } catch (error) {
        alert('Ticket not found or error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) return <Container>Loading ticket...</Container>;
  if (!ticket) return <Container>Ticket not found.</Container>;

  return ( 
      <Container>
        <TicketID>Ticket ID: {ticket.id}</TicketID>
        <Title>{ticket.title}</Title>
    
             <DetailRow>
            <UserName> 
                <Value> {ticket.userName}</Value>
            </UserName>  
            <Created>Created: {new Date(ticket.createdAt).toLocaleString()}</Created>
            </DetailRow>
        <Description>{ticket.description}</Description>
 
  
        <DetailRow>
          <Label>User ID:</Label>
          <Value>{ticket.userId}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Email:</Label>
          <Value>{ticket.email}</Value>
        </DetailRow>
        <PhoneNumber>
          <Label>Phone Number:</Label>
          <Value>{ticket.phoneNumber}</Value>
        </PhoneNumber>


        <DetailRow>
          <Label>Staff ID:</Label>
          <Value>{ticket.staffId}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Ticket Type ID:</Label>
          <Value>{ticket.ticketTypeId}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Department ID:</Label>
          <Value>{ticket.departmentId}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Location ID:</Label>
          <Value>{ticket.locationId}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Category ID:</Label>
          <Value>{ticket.categoryId}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Priority ID:</Label>
          <Value>{ticket.priorityId}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Status ID:</Label>
          <Value>{ticket.statusId}</Value>
        </DetailRow>

        <DateTimeWrapper> 
        
            <DetailRow>
                <Label>Updated At:</Label>
                <Value>{new Date(ticket.updatedAt).toLocaleString()}</Value>
            </DetailRow>
        </DateTimeWrapper>
      </Container> 
  );
};

export default TicketDetail;
