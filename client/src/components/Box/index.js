import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  const [value, setValue] = React.useState('list description');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="List"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
        />
        <TextField
          id="outlined-textarea"
          label="Items"
          placeholder="Placeholder"
          multiline
        />
        <TextField
          id="outlined-multiline-static"
          label="List"
          multiline
          rows={4}
          defaultValue="Description"
        />
      </div>
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="List"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          variant="filled"
        />
        <TextField
          id="filled-textarea"
          label="Items"
          placeholder="Placeholder"
          multiline
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="List"
          multiline
          rows={4}
          defaultValue="Description"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Items"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          variant="standard"
        />
        <TextField
          id="standard-textarea"
          label="Items"
          placeholder="Placeholder"
          multiline
          variant="standard"
        />
        <TextField
          id="standard-multiline-static"
          label="Items"
          multiline
          rows={4}
          defaultValue="Description"
          variant="standard"
        />
      </div>
    </Box>
  );
}
