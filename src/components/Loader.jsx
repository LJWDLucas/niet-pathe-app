import React from 'react';
import { connect } from 'react-redux';

const Loader = ({ showLoader }) => showLoader && (
  <div className="loader-wrapper">
    <div className="loader">
      <div />
      <div />
      <div />
    </div>
  </div>
);

const mapStateToProps = state => ({
  showLoader: state.layout.showLoader
});

export default connect(mapStateToProps)(Loader);
