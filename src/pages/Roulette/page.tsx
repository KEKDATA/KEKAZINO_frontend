import * as React from 'react';
import { useStore } from 'effector-react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useRouletteStyles } from '@pages/Roulette/useRouletteStyles';
import { $userImageUrl } from '@pages/ImageUploader/model';
import {
  $isImageUrlExist,
  setImageUrlExistStatus,
} from '@pages/Roulette/model';

import { RouletteEffects } from '@features/RouletteEffects';
import { useHistories } from '@features/useHistories';

import './styles.pcss';

export const Roulette: React.FC = () => {
  const classes = useRouletteStyles();

  const imageUrl = useStore($userImageUrl);
  const isImageUrlExist = useStore($isImageUrlExist);

  const { pushToUpload } = useHistories();

  React.useEffect(() => {
    const isImageSaved = imageUrl.length > 0;
    setImageUrlExistStatus(isImageSaved);
  }, []);

  return (
    <div className={classes.root}>
      {isImageUrlExist === null && <CircularProgress color="secondary" />}
      {isImageUrlExist && <RouletteEffects />}
      {isImageUrlExist === false && (
        <>
          <p
            className="roulette__empty-image-url"
            data-test-id="roulette-without-image">
            {' '}
            Oops, we did not find saved image.{' '}
          </p>
          <Button
            data-test-id="roulette-button-without-image-to-upload-page"
            variant="contained"
            color="primary"
            size="large"
            onClick={pushToUpload}>
            Back to image upload page
          </Button>
        </>
      )}
    </div>
  );
};
