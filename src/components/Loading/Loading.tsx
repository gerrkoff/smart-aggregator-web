import React from 'react';
import { Oval } from 'react-loader-spinner';

export const Loading = () => (
  <Oval
    height={40}
    width={40}
    color="#f4f4f5"
    visible
    ariaLabel="oval-loading"
    secondaryColor="#effdde"
    strokeWidth={5}
    strokeWidthSecondary={5}
  />
);
