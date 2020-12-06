import React from 'react';

import { Product } from '../../utils/products';
import ProductListItem from './ProductListItem';

import styles from './ProductList.module.css';

interface Props {
  products: Product[];
  currency: any;
}

export default function ProductList({
  products,
  currency,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          name={product.name}
          photos={product.photos}
          priceUSD={product.priceUSD}
          currency={currency}
        />
      ))}
    </div>
  );
}
