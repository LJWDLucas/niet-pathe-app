import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rowsEight, rowsSix, rowsFour } from '../constants/halls';
import Row from './Row';

class RowsHolder extends React.Component {
  constructor(props) {
    super(props);
    this.rows = [];
  }

  componentWillUpdate(nextProps) {
    const { rows } = this.props;
    if (!rows && nextProps.rows) {
      let newRows;
      switch (nextProps.rows) {
        case 4:
          newRows = rowsFour;
          break;
        case 6:
          newRows = rowsSix;
          break;
        default:
          newRows = rowsEight;
      }
      this.rows = newRows;
    }
    return true;
  }

  render() {
    const { rows, chairs } = this.props;
    if (!rows || !chairs) return null;

    return (
      <div id="rows-holder">
        {this.rows.reverse().map(i => (
          <Row
            key={i}
            chairs={chairs[i - 1].chairs}
            row={i}
            withClass={classNames({
              "row-of-four": rows === 4,
              "row-of-six": rows === 6,
              "row-of-eight": rows === 8
            })}
          >
            {i}
          </Row>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  rows: state.entities.halls[ownProps.hallId] && state.entities.halls[ownProps.hallId].rows,
  chairs: state.entities.halls[ownProps.hallId] && state.entities.halls[ownProps.hallId].chairs
});

export default connect(mapStateToProps)(RowsHolder);

RowsHolder.propTypes = {
  rows: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  chairs: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
};
