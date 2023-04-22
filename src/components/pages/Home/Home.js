import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const tablesData = useSelector(getAllTables);

  return (
    <section>
      <h2>All tables</h2>
      {tablesData.map(table => (
        <Row key={table.id}>
          <Row className='align-items-end mb-3 mt-3'>
            <Col className='col-2 d-flex align-items-end justify-content-between'>
              <h3 className='mb-0'>Table {table.id}</h3>
            </Col>
            <Col className='col-4'>
              <strong>Status:</strong> {table.status}
            </Col>
            <Col className='col-6 d-flex justify-content-end'>
              <Link to={'/tables/' + table.id}>
                <Button variant='primary' size='sm'>
                  Show more
                </Button>
              </Link>
            </Col>
          </Row>
          <hr />
        </Row>
      ))}
    </section>
  );
};

export default Home;
