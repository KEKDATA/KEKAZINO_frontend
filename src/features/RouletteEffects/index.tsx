import * as React from 'react';
import clsx from 'clsx';

import RootRef from '@material-ui/core/RootRef';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { ROULETTE_SLOTS_EFFECTS } from '@lib/constants';

import { useRouletteStyles } from '@pages/Roulette/useRouletteStyles';

import { useRouletteSlots } from '@features/useRouletteSlots';
import { useHistories } from '@features/useHistories';

import './styles.pcss';

export const RouletteEffects: React.FC = () => {
  const gridRef = React.useRef<HTMLDivElement>();

  const { pushToUpload } = useHistories();

  const classes = useRouletteStyles();
  const {
    isRollAnimation,
    slots,
    activeAnimationForSlots,
  } = useRouletteSlots();

  const slotsHeight = gridRef.current?.getBoundingClientRect().height;

  return (
    <>
      <RootRef rootRef={gridRef}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          data-test-id="roulette-counts-container"
          className={classes.grid}>
          {slots.map(({ id, isDone, value }) => (
            <Grid key={id} item className={classes.gridContainer}>
              <div className="slots__animation-wrapper">
                <div
                  data-test-id="roulette-effect"
                  className={clsx('slots', {
                    'slots__animation-start': isRollAnimation && !isDone,
                    slots__result: value && isDone,
                    slots__start: !isRollAnimation && !isDone,
                  })}
                  style={{
                    height: isDone ? 'auto' : slotsHeight,
                  }}>
                  {isDone && <span className="slots__effect">{value}</span>}
                  {!isDone &&
                    ROULETTE_SLOTS_EFFECTS.map(effect => (
                      <span className="slots__effect" key={effect}>
                        {effect}
                      </span>
                    ))}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </RootRef>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          disabled={isRollAnimation}
          onClick={activeAnimationForSlots}
          data-test-id="roulette-start-button"
          className={classes.button}>
          Start Kekazino!
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={isRollAnimation}
          endIcon={<ArrowForward />}
          onClick={pushToUpload}
          data-test-id="roulette-go-to-upload-page"
          className={classes.button}>
          Back
        </Button>
      </Grid>
    </>
  );
};
