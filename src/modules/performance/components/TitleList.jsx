import React from 'react';
import PropTypes from 'prop-types';
import ReactToolTip from 'react-tooltip';
import Title from '../../../components/Title';
import PurchaseList from './PurchaseList';

const TitleList = ({ title }) => (
  <div className="title-list">
    <Title title={title} />
      <ReactToolTip />
      <div className="circle" data-tip="Let op! Bij het afgeven van jouw kaartjes moet je kunnen bewijzen dat je recht hebt op de gekozen korting.">?</div>
    <PurchaseList />
  </div>
);

export default TitleList;

TitleList.propTypes = {
  title: PropTypes.string
};
