import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useRouletteStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flexGrow: 1,
    },
    grid: {
      width: '80%',
      height: '50vh',
      marginBottom: '40px',
      justifyContent: 'space-around',
    },
    gridContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    },
    button: {
      margin: theme.spacing(0, 2),
    },
  }),
);
