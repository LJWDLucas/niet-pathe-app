import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import PurchaseList from './PurchaseList';

const TitleList = ({ title }) => (
  <div className="title-list">
    <Title title={title} />
    <PurchaseList />
  </div>
);

export default TitleList;

TitleList.propTypes = {
  title: PropTypes.string
};
