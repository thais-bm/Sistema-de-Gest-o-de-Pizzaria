import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const PedidoExtraDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">
          Você escolheu uma mesa.
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          Deseja pedir mais comida?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="success"
          startIcon={<ThumbUpIcon />}
          onClick={() => {
            onConfirm(true);
            onClose();
          }}
        >
          Sim
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<ThumbDownIcon />}
          onClick={() => {
            onConfirm(false);
            onClose();
          }}
        >
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PedidoExtraDialog;