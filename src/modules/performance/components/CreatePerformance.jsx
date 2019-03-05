import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeCreatePerformance, setNewPerformanceProperty, createNewPerformance, resetPerformance } from '../actions/performanceActions';
import BackButton from '../../../components/BackButton';

class CreatePerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      errors: []
    };
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    const { initialize } = this.props;
    return initialize()
      .then(() => this.setState({ initialized: true }));
  }

  componentWillUnmount() {
    this.props.unmount();
  }

  validate() {
    const { createPerformance } = this.props;
    return createPerformance()
      .then(errors => this.setState({ errors }));
  }

  hasError(prop) {
    return this.state.errors.indexOf(prop) > -1 ? 'error' : '';
  }

  render() {
    const { initialized } = this.state;
    const { movies, halls, newPerformance, setMovie, setHall, set3D, setDate, setStartTime, setEndTime } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <FormGroup className="form-group">
          <Label htmlFor="filmcontrol">Film</Label>
          <select
            className={`form-control ${this.hasError('movieId')}`}
            id="filmcontrol"
            value={newPerformance.movieId}
            onChange={e => setMovie(e.target.value)}
          >
            <option value="0" />
            {Object.keys(movies).map(movie => <option key={movie} value={movie}>{movies[movie].title}</option>)}
          </select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="hallcontrol">Zaal</Label>
          <select
            className={`form-control ${this.hasError('hallId')}`}
            id="hallcontrol"
            value={newPerformance.hallId}
            onChange={e => setHall(e.target.value)}
          >
            <option value="0" />
            {Object.keys(halls).map(hall => <option key={hall} value={hall}>{halls[hall].name}</option>)}
          </select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date">Datum</Label>
          <Input
            className={`${this.hasError('date')}`}
            type="date"
            name="date"
            id="date"
            placeholder="date placeholder"
            onChange={e => setDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="startTime">Starttijd</Label>
          <Input
            className={`${this.hasError('startTime')}`}
            onChange={e => setStartTime(e.target.value)}
            type="time"
            name="time"
            id="startTime"
            placeholder="Start"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="endTime">Eindtijd</Label>
          <Input
            className={`${this.hasError('endTime')}`}
            onChange={e => setEndTime(e.target.value)}
            type="time"
            name="time"
            id="endTime"
            placeholder="Eind"
          />
        </FormGroup>
        <div className="form-group">
          <label htmlFor="3d">3D-voorstelling</label>
          <input
            type="checkbox"
            className="form-control"
            id="3d"
            checked={newPerformance.threeDimensional}
            onChange={() => set3D(!newPerformance.threeDimensional)}
          />
        </div>
        <BackButton destination="/secure/performances" />
        <button
          type="button"
          className="btn btn-light"
          onClick={this.validate}
        >
          Aanmaken
        </button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  newPerformance: state.performance.new,
  halls: state.entities.halls,
  movies: state.entities.movies
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initializeCreatePerformance()),
  createPerformance: () => dispatch(createNewPerformance()),
  setDate: date => dispatch(setNewPerformanceProperty('date', date)),
  setMovie: id => dispatch(setNewPerformanceProperty('movieId', id)),
  setHall: id => dispatch(setNewPerformanceProperty('hallId', id)),
  set3D: value => dispatch(setNewPerformanceProperty('threeDimensional', value)),
  setStartTime: value => dispatch(setNewPerformanceProperty('startTime', value)),
  setEndTime: value => dispatch(setNewPerformanceProperty('endTime', value)),
  unmount: () => dispatch(resetPerformance())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePerformance);

CreatePerformance.propTypes = {
  initialize: PropTypes.func,
  movies: PropTypes.object,
  halls: PropTypes.object,
  newPerformance: PropTypes.object,
  setMovie: PropTypes.func,
  setHall: PropTypes.func,
  set3D: PropTypes.func,
  setDate: PropTypes.func,
  setStartTime: PropTypes.func,
  setEndTime: PropTypes.func,
  unmount: PropTypes.func
};
