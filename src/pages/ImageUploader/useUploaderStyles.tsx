import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useUploaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      minHeight: '80vh',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    button: {
      margin: theme.spacing(0, 2),
      minWidth: 120,
    },
    gridRoot: {
      marginTop: 14,
    },
    label: {
      marginTop: 14,
      marginLeft: 8,
    },
  }),
);
