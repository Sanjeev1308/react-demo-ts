import React from 'react';

import styles from './ProductListItem.module.css';

interface Currency {
  data: {
    symbol: string;
  };
  rate: number;
}

interface Props {
  name: string;
  priceUSD: number;
  photos: string[];
  currency: Currency;
}

export default function ProductListItem({
  name,
  priceUSD,
  photos,
  currency,
}: Props): JSX.Element {
  const getPrice = () => {
    if (!Object.keys(currency).length) {
      return <div>Loading price</div>;
    }

    const {
      data: { symbol },
      rate,
    } = currency;

    const price = (rate * priceUSD).toFixed(2);

    return (
      <div className={styles.price}>
        {symbol}
        {price}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {photos.map((photo, index) => (
          <img
            className={styles.image}
            src={photo}
            key={`photo-${index}`}
            alt={`${index}`}
          />
        ))}
      </div>

      <div className={styles.name}>{name}</div>

      {getPrice()}
    </div>
  );
}
