import { createEvent, createStore, createEffect, Event } from 'effector';
import React from 'react';

import { base64ImageConverter, getSavedImageFromStorage } from '@lib/utils';
import { createFetching } from '@lib/createFetching';

const savedImageFromStorage = getSavedImageFromStorage();

export const $userImageUrl = createStore<string>(savedImageFromStorage);
export const $isSaveImageToLocalStorage = createStore<boolean>(false);

export const addUserImageUrl: Event<string> = createEvent();
export const setImageToLocalStorageStatus: Event<boolean> = createEvent();

// Events - resets
export const removeUploadedImage: Event<void> = createEvent();

export const pickNewUserImage = createEffect({
  handler: async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const uploadedFile = files[0];
      const isFile = uploadedFile.type.includes('image');
      if (isFile) {
        await base64ImageConverter(uploadedFile, addUserImageUrl);
      }
    }
  },
});

$userImageUrl.on(addUserImageUrl, (_, url) => url).reset(removeUploadedImage);
$isSaveImageToLocalStorage.on(
  setImageToLocalStorageStatus,
  (_, isImageToLocalStorage) => isImageToLocalStorage,
);

export const $imageFetching = createFetching(pickNewUserImage, 'initial', {
  reset: removeUploadedImage,
});
