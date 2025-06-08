import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createTicket, TicketCreateDto } from '../api';

const Form = styled.form`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #0077cc;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  min-height: 120px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #0077cc;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #0077cc;
  }
`;

const Button = styled.button`
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005fa3;
  }
`;

// Dummy options for dropdowns - replace with real data as needed
const userOptions = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

const staffOptions = [
  { id: 1, name: 'Staff 1' },
  { id: 2, name: 'Staff 2' },
];

const ticketTypeOptions = [
  { id: 0, name: 'Issue' },
  { id: 1, name: 'Request' },
];

const departmentOptions = [
  { id: 1, name: 'Housekeeping' },
  { id: 2, name: 'Maintenance' },
];

const locationOptions = [
  { id: 1, name: 'Building A' },
  { id: 2, name: 'Building B' },
];

const categoryOptions = [
  { id: 1, name: 'Cleanliness' },
  { id: 2, name: 'Repair' },
];

const priorityOptions = [
  { id: 1, name: 'Low' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'High' },
];

const statusOptions = [
  { id: 1, name: 'Open' },
  { id: 2, name: 'In Progress' },
  { id: 3, name: 'Closed' },
];

const CreateTicket: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState<number>(1);
  const [staffId, setStaffId] = useState<number>(1);
  const [ticketTypeId, setTicketTypeId] = useState<number>(0);
  const [departmentId, setDepartmentId] = useState<number>(1);
  const [locationId, setLocationId] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [priorityId, setPriorityId] = useState<number>(1);
  const [statusId, setStatusId] = useState<number>(1);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please fill all required fields');
      return;
    }

    const ticket: TicketCreateDto & {
      userId: number;
      staffId: number;
      ticketTypeId: number;
      departmentId: number;
      locationId: number;
      categoryId: number;
      priorityId: number;
      statusId: number;
    } = {
      title,
      description,
      userId,
      staffId,
      ticketTypeId,
      departmentId,
      locationId,
      categoryId,
      priorityId,
      statusId,
    };

    try {
      await createTicket(ticket);
      alert('Ticket created successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to create ticket');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        placeholder="Enter ticket title"
      />

      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        placeholder="Enter ticket description"
      />

      <Label htmlFor="userId">User</Label>
      <Select
        id="userId"
        value={userId}
        onChange={e => setUserId(Number(e.target.value))}
      >
        {userOptions.map(u => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="staffId">Staff</Label>
      <Select
        id="staffId"
        value={staffId}
        onChange={e => setStaffId(Number(e.target.value))}
      >
        {staffOptions.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="ticketTypeId">Ticket Type</Label>
      <Select
        id="ticketTypeId"
        value={ticketTypeId}
        onChange={e => setTicketTypeId(Number(e.target.value))}
      >
        {ticketTypeOptions.map(t => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="departmentId">Department</Label>
      <Select
        id="departmentId"
        value={departmentId}
        onChange={e => setDepartmentId(Number(e.target.value))}
      >
        {departmentOptions.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="locationId">Location</Label>
      <Select
        id="locationId"
        value={locationId}
        onChange={e => setLocationId(Number(e.target.value))}
      >
        {locationOptions.map(l => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="categoryId">Category</Label>
      <Select
        id="categoryId"
        value={categoryId}
        onChange={e => setCategoryId(Number(e.target.value))}
      >
        {categoryOptions.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="priorityId">Priority</Label>
      <Select
        id="priorityId"
        value={priorityId}
        onChange={e => setPriorityId(Number(e.target.value))}
      >
        {priorityOptions.map(p => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>

      <Label htmlFor="statusId">Status</Label>
      <Select
        id="statusId"
        value={statusId}
        onChange={e => setStatusId(Number(e.target.value))}
      >
        {statusOptions.map(s => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </Select>

      <Button type="submit">Create Ticket</Button>
    </Form>
  );
};

export default CreateTicket;
