import React, { useCallback, useEffect, useState } from 'react';

import ProductList from '../../components/products/ProductList';
import products from '../../utils/products';
import currencies from '../../utils/currencies';

const LOCATION_URL = 'https://ipapi.co/json';

function Products() {
  const [currency, setCurrency] = useState<any>({});

  const setCurrencyData = (symbols: string) => {
    fetch(
      `http://data.fixer.io/api/latest?access_key=aa537a93e9468c49869c89479ef6d889&symbols=${symbols}&format=1`
    )
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        const { rates } = JSON.parse(data);
        const currencyData = currencies.find(
          (currency) => currency.code === symbols
        );
        setCurrency({ rate: rates[symbols], data: currencyData });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const fetchUserLocation = useCallback(() => {
    fetch(LOCATION_URL)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        const { currency } = JSON.parse(data);
        setCurrencyData(currency);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  return <ProductList products={products} currency={currency} />;
}

export default Products;
