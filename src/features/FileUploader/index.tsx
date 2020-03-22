import * as React from 'react';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { $imageFetching, pickNewUserImage } from '@pages/ImageUploader/model';

import { useFileUploaderStyles } from '@features/FileUploader/useFileUploaderStyles';

import './styles.pcss';

const FileUploaderMemoized: React.FC = () => {
  const isDone = useStore($imageFetching.isDone);
  const isLoading = useStore($imageFetching.isLoading);

  const classes = useFileUploaderStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: isDone,
  });

  const handleButtonClick = () => {
    if (!isLoading) {
      const fileUploadNode = document.getElementById('file-upload');

      if (fileUploadNode) {
        fileUploadNode.click();
      }
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          data-test-id="file-uploader-icon"
          className={buttonClassname}
          onClick={handleButtonClick}>
          {isDone ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {isLoading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={isLoading}
          onClick={handleButtonClick}
          data-test-id="file-uploader-button">
          Choose your best photo!
        </Button>
        <input
          className="file-uploader__hidden"
          onChange={pickNewUserImage}
          data-test-id="file-uploader-input"
          id="file-upload"
          type="file"
          accept="image/*"
        />
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </>
  );
};

export const FileUploader = React.memo(FileUploaderMemoized);
