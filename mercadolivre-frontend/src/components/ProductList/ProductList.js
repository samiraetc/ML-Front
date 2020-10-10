import React, { Component } from 'react';

import Product from '../Product/Product';

import './ProductList.scss';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      breadcrumb: '',
    };
  }

  componentDidMount() {
    function getQueryParams(qs) {
      qs = qs.split('+').join(' ');

      var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

      while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }

      return params;
    }

    var query = getQueryParams(window.location.search);

    if (query.search) {
      fetch('/api/items?q=' + query.search)
        .then((_data) => _data.json())
        .then((_data) => {
          // console.log(_data);
          this.setState({ products: _data.products });
          this.setState({ breadcrumb: _data.breadcrumb });
        });
    }
  }

  render() {
    return (
      <div className="container overflow">
        <div className="breadcrumb flex flex-justify-start max-width">
          {this.state.breadcrumb}
        </div>
        <ul className="normalize-list listProduct">
          {this.state.products.map((_product) => (
            <Product data={_product} key={_product.id} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductsList;
