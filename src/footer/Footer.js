import { 
  Container,
  Row,
  Col
} from 'react-bootstrap'

const Footer = () => {
	return(
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col style={{background: '#212529', color: '#ffffff'}}>
          <div style={{margin: '10px 20px'}}>
            Copyright @2022 Fairizal Aaron
          </div>
        </Col>
      </Row>
    </Container>
	)
}

export default Footer