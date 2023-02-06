import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import styles from "../styles/Notepad.module.css";

const Notepad = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [folder, setFolder] = useState("");
  const [titleColor, setTitleColor] = useState("#000");
  const [bodyColor, setBodyColor] = useState("#000");
  const [background, setBackground] = useState("#fff");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };
  const handleFolderChange = (event) => {
    setFolder(event.target.value);
  };

  useEffect(() => {
    if (props.editNote) {
      setTitle(props.editNote.title);
      setBody(props.editNote.body);
      setBackground(props.editNote.background || '#fff');
      setTitleColor(props.editNote.title_color || '#000');
      setBodyColor(props.editNote.body_color || '#000' );
    }
  }, [props.editNote]);

  const handlBodyColorChange = (e) => {
    setBodyColor(e.target.value);
  };
  const handleTitleColorChange = (e) => {
    setTitleColor(e.target.value);
  };
  const handleBgChange = (e) => {
    setBackground(e.target.value);
  };

  const handleSubmit = () => {
    if (props.addNote) {
      let note = {
        title,
        body,
      };
      props.addNote(folder, note);
    } else {
      let note = {
        title,
        body,
        title_color: titleColor,
        body_color: bodyColor,
        background: background,
      };
      props.handleEditNote(props.editNote.id, note);
    }
    props.handleClose();
    setTitle("");
    setBody("");
    setFolder("");
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.container}>
        <Paper className={styles.body}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5"> {props.editNote? 'Edit Note': 'Add Note'}</Typography>
            {props.editNote && (
              <input
                type={"color"}
                value={background}
                onChange={handleBgChange}
              />
            )}
          </Box>
          {!props.editNote && (
            <TextField
              className={styles.textField}
              fullWidth={true}
              placeholder="Folder"
              variant="standard"
              size="large"
              onChange={handleFolderChange}
              margin={"normal"}
              value={folder}
            />
          )}
          <TextField
            className={styles.textField}
            fullWidth={true}
            placeholder="Title"
            variant="standard"
            size="medium"
            onChange={handleTitleChange}
            margin={"normal"}
            value={title}
            InputProps={{
              endAdornment: props.editNote && (
                <input
                  type={"color"}
                  value={titleColor}
                  onChange={handleTitleColorChange}
                />
              ),
            }}
          />
          <TextField
            className={styles.textField}
            fullWidth={true}
            minRows={6}
            multiline
            onChange={handleBodyChange}
            margin={"normal"}
            value={body}
            InputProps={{
              endAdornment: props.editNote && (
                <input
                  type={"color"}
                  value={bodyColor}
                  onChange={handlBodyColorChange}
                />
              ),
            }}
          />
          <Button fullWidth={true} onClick={handleSubmit} variant="contained">
            {props.editNote ? "Edit Note" : "Add Note"}
          </Button>
        </Paper>
      </Box>
    </Modal>
  );
};

export default Notepad;
