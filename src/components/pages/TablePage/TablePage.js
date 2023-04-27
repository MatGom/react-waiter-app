import styles from './TablePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getTableById, editTableRequest } from '../../../redux/tablesRedux';
import { getAllStatus } from '../../../redux/statusReducer';
import Form from 'react-bootstrap/Form';
import { Col, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TablePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));
  const statusData = useSelector(getAllStatus);
  console.log(table);
  console.log(statusData);

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
  const [bill, setBill] = useState(table.bill);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editTableRequest({ status, peopleAmount, maxPeopleAmount, bill, id }));
    navigate('/');
  };

  if (!table) {
    return <Navigate to='' />;
  }
  return (
    <div>
      <h2>Table {table.id}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='d-flex align-items-center w-25 mb-3'>
          <Form.Label className='mx-2'>Status:</Form.Label>
          <Form.Select onChange={(e) => setStatus(e.target.value)}>
          {statusData.map(status => (
              <option key={status.id} value={status.option}>
                {status.option}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='d-flex align-items-center w-25 mb-3'>
          <Form.Label className='mx-2'>People:</Form.Label>
          <Col>
            <Form.Control
              value={peopleAmount}
              onChange={(e) => setPeopleAmount(e.target.value)}
            ></Form.Control>{' '}
          </Col>
          <span className='mx-2'>/</span>
          <Col>
            <Form.Control
              value={maxPeopleAmount}
              onChange={(e) => setMaxPeopleAmount(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group className='d-flex align-items-center w-25 mb-3'>
          <Form.Label className='mx-2'>Bill:</Form.Label>
          <Col sm={4} className='mx-4'>
            <Form.Control
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button className='mx-2' type='submit'>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default TablePage;

