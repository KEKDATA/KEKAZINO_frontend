import React from 'react';
import { useStore } from 'effector-react';
import Image from 'material-ui-image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { FileUploader } from '@features/FileUploader';

import { useUploaderStyles } from '@pages/ImageUploader/useUploaderStyles';
import {
  $userImageUrl,
  removeUploadedImage,
  $imageFetching,
  $isSaveImageToLocalStorage,
  setImageToLocalStorageStatus,
} from '@pages/ImageUploader/model';
import { setImageUrlExistStatus } from '@pages/Roulette/model';

import { useHistories } from '@features/useHistories';

import { LS } from '@lib/utils';
import { STORAGE } from '@lib/constants';

import './styles.pcss';

export const ImageUploader: React.FC = () => {
  const imageUrl = useStore($userImageUrl);
  const isDone = useStore($imageFetching.isDone);
  const isImageToLocalStorage = useStore($isSaveImageToLocalStorage);

  const classes = useUploaderStyles();

  const { pushToRoulette } = useHistories();

  const handleOnClickToDeleteImage = () => {
    removeUploadedImage();
  };

  const handleOnClickToSaveImage = () => {
    setImageUrlExistStatus(true);
    const savedImage = isImageToLocalStorage
      ? imageUrl
      : STORAGE.IMAGE.initialValue;

    LS.set(STORAGE.IMAGE.type, savedImage);

    pushToRoulette();
  };

  const handleOnToggleImageToStorage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setImageToLocalStorageStatus(event.target.checked);
  };

  return (
    <div className={classes.root} data-test-id="image-upload-container">
      <FileUploader />
      {isDone && imageUrl && (
        <Image
          src={imageUrl}
          style={{ marginTop: '20px', paddingTop: 0 }}
          imageStyle={{ width: '600px', position: 'relative' }}
        />
      )}
      {isDone && (
        <Grid container direction="column" justify="center" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={isImageToLocalStorage}
                value="imageToStorage"
                color="primary"
              />
            }
            label={
              <span className="image-uploader__storage-desc">
                Would you like to save the image inside Storage?
              </span>
            }
            className={classes.label}
            onChange={handleOnToggleImageToStorage}
          />
          <Grid
            className={classes.gridRoot}
            container
            direction="row"
            justify="center"
            alignItems="center">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.button}
              data-test-id="button-save-image"
              startIcon={<SaveIcon />}
              onClick={handleOnClickToSaveImage}>
              Save it!
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              data-test-id="button-delete-image"
              onClick={handleOnClickToDeleteImage}>
              Nah, delete it
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
