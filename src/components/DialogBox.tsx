import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import "./DialogBox.css";

interface IProps {
  open: boolean;
  message: string;
  reset: () => void;
}

class DialogBox extends Component<IProps> {
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => this.props.reset()}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DialogBox;
