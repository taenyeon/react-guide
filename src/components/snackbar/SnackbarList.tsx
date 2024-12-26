import {Alert, Snackbar, SnackbarCloseReason} from "@mui/material";
import snackbarViewModel from "../../viewModel/SnackbarViewModel.ts";

const SnackbarList = () => {
    const {errors, drop} = snackbarViewModel();

    const handleClose = async (index: number, reason: SnackbarCloseReason) => {
        if (reason == 'clickaway') return;
        await drop(index)
    }

    return (
        <>
            <div style={{position: 'fixed', bottom: 0, right: 0, zIndex: 1300}}>
                {errors.map((error, index) => {
                    return <Snackbar
                        key={index}
                        open={true}
                        onClose={(event, reason) => handleClose(index, reason)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        style={{
                            marginBottom: `${index * 60}px`, // 최신 메시지가 아래로 밀리지 않도록 오프셋 조정
                        }}
                    >
                        <Alert severity={"error"} onClose={() => drop(index)}>
                            {error.message}
                        </Alert>
                    </Snackbar>
                })}
            </div>
        </>
    )
}

export default SnackbarList;