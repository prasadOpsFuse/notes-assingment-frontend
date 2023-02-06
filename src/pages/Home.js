import { Add, Folder } from "@mui/icons-material";
import { Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNotes, getAllNotes } from "../api/notesApi";
import Notepad from "../components/Notepad";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [openNotepad, setOpenNotepad] = useState(false);
  const handleOpen = () => setOpenNotepad(true);
  const handleClose = () => setOpenNotepad(false);
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  const getFolders = async () => {
    let response = await getAllNotes();
    setFolders(response);
  };

  useEffect(() => {
    getFolders();
  }, []);

  const addNote = async (folder, note) => {
    let response = await addNotes({ ...note, folder_name: folder });
    if (response) {
      getFolders();
    }
  };

  return (
    <Container>
      <Paper style={{ margin: "20px", padding: "5px" }}>
        <Box alignItems={"center"} display={"flex"}>
          <IconButton onClick={handleOpen}>
            <Add />
          </IconButton>
          <Typography variant="p">Add Notes</Typography>
        </Box>
      </Paper>
      <Notepad open={openNotepad} handleClose={handleClose} addNote={addNote} />
      <Typography variant="h3" mt={2}>
        All Notes
      </Typography>
      <Grid container spacing={3} mt={1}>
        {folders &&
          folders.map((item) => (
            <Fragment key={item.id}>
              {!item?.notes?.every((e) => e.deleted === true) && (
                <Grid item lg={2} md={3} sm={4} xs={6}>
                  <Paper
                    className={styles.folder}
                    onClick={(e) =>
                      navigate(`/folder?folder_name=${item.folder_name}`)
                    }
                  >
                    <Folder color="inherit" />
                    <Typography ml={1}>{item.folder_name}</Typography>
                  </Paper>
                </Grid>
              )}
            </Fragment>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
