import { 
  Navbar,
  Container,
  Nav,
  NavDropdown
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

const Header = () => {
	return(
		<>
			<header>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">Cluster-App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/cluster">Cluster</Nav.Link>
                {/*<Nav.Link as={Link} to="/rkphistorycluster">Laporan</Nav.Link>*/}
                {/*<Nav.Link as={Link} to="/dataset">Dataset</Nav.Link>*/}
                {/*<NavDropdown title="Laporan" id="basic-nav-dropdown">
                  <NavDropdown.Item  as={Link} to="/rkpcluster">Rekap Jumlah Cluster</NavDropdown.Item>
                  <NavDropdown.Item  as={Link} to="/dataset">Rekap Rata-Rata Data Cluster</NavDropdown.Item>
                </NavDropdown>*/}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
	     </header>
		</>
	)
}

export default Header