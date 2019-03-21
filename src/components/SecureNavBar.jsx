import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown
} from 'reactstrap';
import { getInitialMovies } from '../actions/movieActions';

const SecureNavBar = ({ match, location, fetchInitialMovies }) => {
  const [state, setState] = React.useState({ isOpen: false });
  return (
    <Navbar className="nav-secure" color="light" light expand="md">
      <div className="navbar-brand">
        <Link to="/secure">
        NietPathe
        </Link>
      </div>
      <NavbarToggler onClick={setState} />
      <Collapse isOpen={state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {location.pathname.includes('/secure/movies') && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Acties - Films
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/secure/movies/new">Nieuwe film aanmaken</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>Filters</DropdownItem>
                <DropdownItem onClick={fetchInitialMovies}>
                  Alleen actieve films
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Beheren
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to={`${match.path}/movies`}>Beheren films</Link>
              </DropdownItem>
              <DropdownItem>
              <Link to={`${match.path}/performances`}>Beheren voorstellingen</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={`${match.path}/reviews`}>Goedkeuren reviews</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Manager
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to={`${match.path}/surveys`}>Beheren enquetes</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchInitialMovies: () => dispatch(getInitialMovies(100))
});

SecureNavBar.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  fetchInitialMovies: PropTypes.func
};

export default connect(null, mapDispatchToProps)(withRouter(SecureNavBar));
