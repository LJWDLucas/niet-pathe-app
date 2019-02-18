import React from 'react';
import PropTypes from 'prop-types';
import { chairsFifteen, chairsTen } from '../../../constants/halls';
import Chair from './Chair';
import PerformanceContext from './PerformanceContext';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.chairs = props.chairs === 15 ? chairsFifteen : chairsTen;
  }

  render() {
    const { withClass, row } = this.props;

    return (
      <PerformanceContext.Consumer>
        {({ performanceId }) => (
          <div
            className={`row-chairs ${withClass}`}
          >
            {this.chairs.map(chair => <Chair key={chair} row={row} chair={chair} performanceId={performanceId} />)}
          </div>
        )}
      </PerformanceContext.Consumer>
    );
  }
}

export default Row;

Row.propTypes = {
  chairs: PropTypes.number,
  row: PropTypes.number,
  withClass: PropTypes.string
};
