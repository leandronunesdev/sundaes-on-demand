import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useState } from 'react';
import './styles.css';

export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (!e.target.value || e.target.value < 0) {
      setError(true);
      return;
    }

    if (e.target.value % 1 !== 0) {
      console.log(parseInt(e.target.value));
      setError(true);
      updateItemCount(name, 0, 'scoops');
      return;
    }

    setError(false);
    updateItemCount(name, parseInt(e.target.value), 'scoops');
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control
            type='number'
            min={0}
            defaultValue={0}
            onChange={handleChange}
            className={error ? 'count-error' : ''}
            isInvalid={error}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
