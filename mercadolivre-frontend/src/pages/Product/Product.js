import React from 'react';

import ProductDetail from '../../components/ProductDetail/ProductDetail';

export default function OnlyProductView(props) {
  return (
    <div>
      <ProductDetail params={props.match.params} />
    </div>
  );
}
