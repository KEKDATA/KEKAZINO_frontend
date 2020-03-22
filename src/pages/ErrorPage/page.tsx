import * as React from 'react';

import errorImage from '@assets/images/404.jpg';

export const ErrorPage: React.FC = () => {
  return (
    <img
      src={errorImage}
      alt="OOPS"
      title="Our application did not understand you"
    />
  );
};
