import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material'
import snackbarStore from '../../store/SnackbarStore.ts'

const SnackbarList = () => {
  const { errors, drop } = snackbarStore()

  const handleClose = async (index: number, reason: SnackbarCloseReason) => {
    if (reason == 'clickaway') return
    await drop(index)
  }

  return (
    <>
      <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1300 }}>
        {errors.map((error, index) => {
          return (
            <Snackbar
              key={index}
              open={true}
              onClose={(event, reason) => handleClose(index, reason)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              style={{
                marginBottom: `${index * 60}px`
              }}>
              <Alert severity={'error'} onClose={() => drop(index)}>
                {error.message}
              </Alert>
            </Snackbar>
          )
        })}
      </div>
    </>
  )
}

export default SnackbarList
