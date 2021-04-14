import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type TypeSeverity = 'success' | 'error' | 'warning' | 'info';

type NotificationProps = {
    message: string;
    severity?: TypeSeverity;
    id: number;
};

const Notification = (props: NotificationProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (props.id !== 0) {
            setOpen(true);
        }
    }, [props.id]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={open}
            style={{ marginBottom: 70 }}
            onClose={handleClose}
            autoHideDuration={10000}
        >
            <Alert onClose={handleClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
