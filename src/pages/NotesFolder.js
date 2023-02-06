import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-drag-and-drop";
import Droppable from "react-drag-and-drop/lib/Droppable";
import { ResizableBox } from "react-resizable";
import { useSearchParams } from "react-router-dom";
import { deleteNote, editNotes, getAllNotes } from "../api/notesApi";
import GoBackButton from "../components/GoBackButton";
import Notepad from "../components/Notepad";
import "../styles/NotesFolder.css";

const NotesFolder = () => {
  const [searchParams] = useSearchParams();
  const folder_name = searchParams.get("folder_name");
  const [notes, setNotes] = useState([]);
  const [openNotepad, setOpenNotepad] = useState(false);
  const handleOpen = () => setOpenNotepad(true);
  const handleClose = () => setOpenNotepad(false);
  const [editNote, setEditNote] = useState();
  const [group, setGroup] = useState("");

  const getNotes = async () => {
    const folder_name = searchParams.get("folder_name");
    let response = await getAllNotes(folder_name);
    let result = response[0].notes.reduce(function (r, a) {
      r[a.group_name] = r[a.group_name] || [];
      r[a.group_name].push(a);
      return r;
    }, Object.create(null));
    setNotes(result);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleEditNote = async (id, data, refresh = true) => {
    let response = await editNotes(id, data);
    if (response && refresh) {
      getNotes();
    }
  };

  const deleteDrope = async (data) => {
    let response = await deleteNote(data.note);
    if (response) {
      getNotes();
    }
  };

  const handleMoveGrouping = async (data, group) => {
    let id = data.note;
    let response = await editNotes(id, { group_name: group });
    if (response) {
      getNotes();
    }
  };
  const handleAddGroup = () => {
    setNotes({ ...notes, [group]: [] });
    //setGroup("");
  };

  const onResize = (event, { element, size, handle }, id) => {
    setTimeout(() => {
      handleEditNote(
        id,
        {
          height: size.height.toString(),
          width: size.width.toString(),
        },
        false
      );
    }, 3000);
  };

  return (
    <Container>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mt={2}
      >
        <Box display={"flex"} alignItems={"center"}>
          <GoBackButton />
          <Typography variant="h3">{folder_name}</Typography>
        </Box>
        <Box display={"flex"}>
          <TextField
            value={group}
            placeholder="Add Group"
            onChange={(e) => setGroup(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleAddGroup}>
                  <Add />
                </IconButton>
              ),
            }}
          />
          <Droppable types={["note"]} onDrop={deleteDrope}>
            <IconButton>
              <Delete fontSize="large" />
            </IconButton>
          </Droppable>
        </Box>
      </Box>

      {notes &&
        Object.keys(notes).map((item) => (
          <Droppable
            key={item}
            types={["note"]}
            onDrop={(d) => handleMoveGrouping(d, item)}
          >
            <Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                style={{ background: "#ccc" }}
                mt={2}
                mb={2}
              >
                <Typography textAlign={"center"} variant="h4">
                  {item}
                </Typography>
              </Box>

              <Grid container spacing={4} mt={2}>
                {notes &&
                  notes[item].map((item, index) => (
                    <Grid
                      display={item.deleted ? "none" : "block"}
                      item
                      key={index}
                    >
                      <Card
                        sx={{
                          minWidth: 70,
                          background: item.background
                            ? item.background
                            : "#fff",
                        }}
                      >
                        <ResizableBox
                          className="box"
                          width={item.width ? +item.width : 200}
                          height={item.height ? +item.height : 200}
                          onResize={(e, s) => onResize(e, s, item.id)}
                        >
                          <CardContent className="text">
                            <Draggable data={item.id} type="note">
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  color={
                                    item.title_color ? item.title_color : "#000"
                                  }
                                >
                                  {item.title}
                                </Typography>
                                <IconButton
                                  onClick={(e) => {
                                    handleOpen();
                                    setEditNote(item);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              </Box>
                            </Draggable>
                            <hr />
                            <div
                              style={{
                                color: item.body_color
                                  ? item.body_color
                                  : "#000",
                              }}
                            >
                              {item.body}
                            </div>
                          </CardContent>
                        </ResizableBox>
                      </Card>

                      <Notepad
                        open={openNotepad}
                        handleClose={handleClose}
                        editNote={editNote}
                        handleEditNote={handleEditNote}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Droppable>
        ))}
      <Box m={10}></Box>
    </Container>
  );
};

export default NotesFolder;
