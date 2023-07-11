import * as React from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Severity Options
// "error", "warning", "info", "success"

const SnackbarContainer = styled('div')(({ theme }) => ({
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

interface QESnackbarProps extends SnackbarProps {
  severity: AlertProps['severity'];
  message: string;
}

export default function QESnackbar(props: QESnackbarProps) {
  const { t } = useTranslation();

  return (
    <SnackbarContainer>
      <Snackbar open={props.open} autoHideDuration={2000} onClose={props.onClose} anchorOrigin={props.anchorOrigin}>
        <Alert onClose={(event) => props.onClose?.(event, 'clickaway')} severity={props.severity}>
          {t(props.message)}
        </Alert>

      </Snackbar>
    </SnackbarContainer>
  );
}
