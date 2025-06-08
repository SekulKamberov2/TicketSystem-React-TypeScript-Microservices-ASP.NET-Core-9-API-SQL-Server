import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getTickets, Ticket } from '../api';
import { useNavigate } from 'react-router-dom';
 
const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const TicketCard = styled.div`
  background-color: #f7f9fc;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
  cursor: pointer;
`;

const Title = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const Description = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const LoadingText = styled.p`
  text-align: center;
  font-style: italic;
  color: #888;
`;

const EmptyText = styled.p`
  text-align: center;
  color: #999;
  font-weight: 600;
`;

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getTickets();
        setTickets(res.data.data || []);
        console.log("Tickets fetched:", res.data.data);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingText>Loading tickets...</LoadingText>
      ) : tickets.length === 0 ? (
        <EmptyText>No tickets found.</EmptyText>
      ) : (
        tickets.map(ticket => (
          <TicketCard key={ticket.id} onClick={() => navigate(`/tickets/${ticket.id}`)}>
            <Title>{ticket.title}</Title>
            <Description>{ticket.description}</Description> 
          </TicketCard>
        ))
      )}
    </Container>
  );
};

export default TicketList;
