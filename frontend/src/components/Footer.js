import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='bg-info p-3'>
      <Container>
        <Row>
          <Col className='text-white'>
            <h2>Implementation member</h2>
            <p>Nguyen Duy Hieu</p>
            <p>Le Hai Long</p>
          </Col>
          <Col>
            <p></p>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3 text-blue'>Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
