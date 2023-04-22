import styles from './TablePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTableById } from '../../../redux/tablesRedux';
import { getAllStatus } from '../../../redux/statusReducer';
import Form from 'react-bootstrap/Form';
import { Col, Row, Button } from 'react-bootstrap';
import { useState } from 'react';

const TablePage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));
  const statusData = useSelector(getAllStatus);
  console.log(table);
  console.log(statusData);

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
  const [bill, setBill] = useState(table.bill);

  return (
    <div>
      <h2>Table {table.id}</h2>
      <Row className='mb-3 mt-4'>
        <Col className='col-1 me-3'>
          <span className='fw-bold'>
            <p>Status:</p>
          </span>
        </Col>
        <Col className='col-4'>
          <Form.Select aria-label='Default select example'>
            <option>{status}</option>
            {statusData.map(status => (
              <option key={status.id} value={status.option}>
                {status.option}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col className='col-1 me-3'>
          <span className='fw-bold'>
            <p>People:</p>
          </span>
        </Col>
        <Col>
          <input className={styles.optionBox} defaultValue={table.peopleAmount}></input>
          <span className='m-3'>/</span>
          <input className={styles.optionBox} defaultValue={table.maxPeopleAmount}></input>
        </Col>
      </Row>

      <Row className='mb-3'>
        <Col className='col-1 me-3'>
          <span className='fw-bold'>
            <p>Bill:</p>
          </span>
        </Col>
        <Col>
          <span className='me-3'>$</span>
          <input className={styles.optionBox} defaultValue={table.bill}></input>
        </Col>
      </Row>

      <Row>
        <Col className='col-6 d-flex'>
          <Button className='px-3 py-2' variant='primary' size='sm'>
            Update
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TablePage;
