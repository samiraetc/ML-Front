import React from 'react';
import { Link } from 'react-router-dom';
import './Product.scss';
import ic_shipping from '../../assets/images/ic_shipping.png';

export default function Product(props) {
  const { data } = props;
  const isFreeShipping = data.shipping.free_shipping;

  return (
    <li className="product-item flex">
      <Link
        to={`/items/${data.id}`}
        className="flex flex-align-start max-width"
      >
        <div className="product-item-image flex">
          <img src={data.imageProduct} alt="ProductImage" />
        </div>

        <span className="product-item-price flex flex-justify-start flex-align-end max-height">
          ${data.price}
          {isFreeShipping ? (
            <img
              className="shipping_badge"
              src={ic_shipping}
              alt="Shipping Badge"
              title="Free shipping"
            />
          ) : (
            ''
          )}
        </span>

        <h3 className="product-item-title flex flex-justify-start flex-align-start max-height">
          {data.title}
        </h3>
        <span className="product-item-address flex flex-justify-start flex-align-end max-height">
          {data.address.state_name}
        </span>
      </Link>
    </li>
  );
}
