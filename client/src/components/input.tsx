import React, { useState, useCallback, useMemo } from "react";
import { Button, TextField, Tab, Tabs, Typography, Paper, Slider } from "@mui/material";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const Input: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [tabValue, setTabValue] = useState<number>(0);
  const [flashcardTextSize, setFlashcardTextSize] = useState<number>(1.5);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  function Accept() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result as string;
          setInput(binaryStr);
        };
        reader.readAsText(file);
      });
    }, []);
    const {
      // acceptedFiles,
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      onDrop,
      accept: {
        "text/plain": [],
      },
      multiple: false,
    });

    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );

    return (
      <div className="container">
        <div {...getRootProps(style)}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        style={{ width: "600px", padding: "24px", borderRadius: "12px" }}
      >
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
        >
          <Tab label="Flashcard" />
          <Tab label="Upload file" />
          <Tab label="Cài đặt" />
        </Tabs>
        {tabValue === 0 && (
          <form style={{ marginTop: "24px" }}>
            <TextField
              id="kanjiinput"
              label="Nhập vào chuỗi các Hán Tự cách nhau bởi ・"
              variant="outlined"
              multiline
              fullWidth
              margin="normal"
              sx={{
                mb: 2,
                "& .MuiInputBase-input": {
                  height: "100px",
                },
              }}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              <Link
                to="flashcard"
                state={{ data: input, textSize: flashcardTextSize }}
                style={{ color: "white" }}
              >
                Bắt đầu
              </Link>
            </Button>
          </form>
        )}
        {tabValue === 1 && (
          <form onSubmit={handleSubmit}>
            <Accept />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              <Link
                to="flashcard"
                state={{ data: input }}
                style={{ color: "white" }}
              >
                Bắt đầu
              </Link>
            </Button>
          </form>
        )}
        {tabValue === 2 && (
          <div>
            <Typography
              variant="h4"
              style={{
                marginTop: "24px",
                fontSize: `${flashcardTextSize}rem`,
              }}
            >
              Flashcard Text Size
            </Typography>
            <Slider
              value={flashcardTextSize}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, value) => setFlashcardTextSize(value as number)}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}rem`}
            />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Input;