import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { getPerformanceByDate, setPerformanceDate } from '../actions/performanceActions';
import BackButton from '../../../components/BackButton';
import { setShowLoader, setHideLoader } from '../../../actions/layoutActions';

class ManagePerformancesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.getPerformancesToday = this.getPerformancesToday.bind(this);
    this.goToPerformance = this.goToPerformance.bind(this);
    this.createNewPerformance = this.createNewPerformance.bind(this);
  }

  componentDidMount() {
    const { getPerformancesOnDate, showLoader, hideLoader } = this.props;
    showLoader();
    return getPerformancesOnDate()
      .then(() => {
        hideLoader();
        this.setState({ initialized: true });
      });
  }

  getPerformancesToday() {
    const { setDate, getPerformancesOnDate } = this.props;
    return setDate(moment().format('YYYY-MM-DD'))
      .then(() => getPerformancesOnDate());
  }

  goToPerformance(id) {
    const { history, match } = this.props;
    return history.push(`${match.path}/${id}`);
  }

  createNewPerformance() {
    const { history, match } = this.props;
    return history.push(`${match.path}/create`);
  }

  render() {
    const { initialized } = this.state;
    const { setDate, getPerformancesAfterDate, getPerformancesBeforeDate, getPerformancesOnDate, date, performances } = this.props;

    if (!initialized) return null;

    return (
      <React.Fragment>
        <div className="row justify-content-around padding-around">
          <button type="button" className="btn btn-light">
            Voorstellingen vandaag
          </button>
          <div className="date-holder">
            Datum:
            <input value={date} onChange={e => setDate(e.target.value)} type="text" placeholder="jjjj-mm-dd" />
          </div>
          <button onClick={getPerformancesOnDate} type="button" className="btn btn-light">
            Zoeken op datum
          </button>
          <button onClick={getPerformancesBeforeDate} type="button" className="btn btn-light">
            Zoeken voor datum
          </button>
          <button onClick={getPerformancesAfterDate} type="button" className="btn btn-light">
            Zoeken na datum
          </button>
        </div>
        <Table className="with-hover white-text">
          <thead>
            <tr>
              <th>Naam film</th>
              <th>Starttijd</th>
              <th>Eindtijd</th>
              <th>Zaal</th>
              <th>Bezetting</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(performances).map(performance => (
              <tr key={performance.id} onClick={() => this.goToPerformance(performance.id)}>
                <td>{performance.movieId}</td>
                <td>{performance.startTime}</td>
                <td>{performance.endTime}</td>
                <td>{performance.hallId}</td>
                <td>{`${performance.chairs.filter(c => c.taken).length}/${performance.chairs.length} `}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <BackButton destination="/secure" />
        <button onClick={this.createNewPerformance} type="button" className="btn btn-light">
          Nieuwe voorstelling
        </button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  date: state.performance.date,
  performances: state.entities.performances
});

const mapDispatchToProps = dispatch => ({
  getPerformancesOnDate: () => dispatch(getPerformanceByDate()),
  getPerformancesBeforeDate: () => dispatch(getPerformanceByDate('before')),
  getPerformancesAfterDate: () => dispatch(getPerformanceByDate('after')),
  setDate: date => dispatch(setPerformanceDate(date)),
  showLoader: () => dispatch(setShowLoader()),
  hideLoader: () => dispatch(setHideLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePerformancesPage);

ManagePerformancesPage.propTypes = {
  setDate: PropTypes.func,
  getPerformancesAfterDate: PropTypes.func,
  getPerformancesBeforeDate: PropTypes.func,
  getPerformancesOnDate: PropTypes.func,
  date: PropTypes.string,
  performances: PropTypes.object,
  history: PropTypes.object
};
