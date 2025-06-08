import axios from 'axios';
import { Result } from './shared/types/Result';

const api = axios.create({
  baseURL: 'http://localhost:5006/api',   
});

export interface Ticket {
  id: number;
  title: string;
  description: string;
  statusId: number;
  priorityId: number;
  createdAt: string;
  updatedAt: string; 
}

export interface UserTicket { 
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  title: string;
  description: string;
  userId: number;
  staffId: number;
  departmentId: number;
  locationId: number;
  ticketTypeId: number;
  categoryId: number;
  priorityId: number;
  statusId: number;
  createdAt: string;    
  updatedAt: string;   
}

export interface TicketCreateDto {
  title: string;
  description: string;
}

//export const getTickets = () => api.get<Result<Ticket[]>>('/tickets/my-tickets');
export const getTicket = (id: number) => api.get<Result<UserTicket>>(`/tickets/${id}`);
export const getTickets = () => {
  const token = localStorage.getItem('token');  

  return api.get<Result<Ticket[]>>('/tickets/my-tickets', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createTicket = (ticket: TicketCreateDto) => api.post('/tickets', ticket);
