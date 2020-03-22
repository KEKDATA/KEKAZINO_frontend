import * as React from 'react';
import { useHistory } from 'react-router-dom';

export const useHistories = () => {
  const history = useHistory();

  const pushToUpload = () => {
    history.push('/');
  };

  const pushToRoulette = () => {
    history.push('/roulette');
  };

  return {
    pushToUpload,
    pushToRoulette,
  };
};
