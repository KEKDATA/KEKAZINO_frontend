import { STORAGE } from '@lib/constants';

export const base64ImageConverter = async (
  file: File,
  imageSetter: Function,
) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imageSetter(reader.result);
  });

  await reader.readAsDataURL(file);
};

export const asyncSetTimeout = async (callback: Function, delay: number) => {
  await new Promise((resolve: Function) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};

export const getRandomValueFromArray = (values: Array<any>) => {
  const randomValue = values[Math.floor(Math.random() * values.length)];

  return randomValue;
};

export const LS = {
  get: (token: string) => localStorage.getItem(token),
  set: (token: string, value: string) => localStorage.setItem(token, value),
};

export const getSavedImageFromStorage = () => LS.get(STORAGE.IMAGE.type) || '';
