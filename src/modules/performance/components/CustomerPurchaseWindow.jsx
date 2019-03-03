import React from 'react';
import Purchase from './Purchase';

const CustomerPurchaseWindow = () => (
  <div id="info-and-purchase-display" className="container-fluid flex-wrap">
    <div className="col-lg-7 col-md-6 col-sm-12 flex-wrap justify-content-center">
      Poster
    </div>
    <Purchase />
  </div>
);

export default CustomerPurchaseWindow;
