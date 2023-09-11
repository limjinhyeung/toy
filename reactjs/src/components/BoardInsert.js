import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Container, Paper, Button} from "@material-ui/core";
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));
export default function BoardInsert() {
  const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
  const classes = useStyles();

  const { register, handleSubmit, formState: { isSubmitting }} = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/board/",{
        title: data.title,
        content: data.content
      })
      .then((res)=>{
        console.log(res.data);
        navigate('/board');
      })
      .catch((e)=>{console.log(e)});
  };

  return (
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <h1 style={{color: "blue"}}><u>Add Board</u></h1>
          <form className={classes.root}
            onSubmit={handleSubmit(async (data) => {
            onSubmit(data)
            await new Promise((r) => setTimeout(r, 1000));
          })}>
            <TextField id="standard-basic" label="Board title" variant="outlined" fullWidth
                       {...register("title")}/>
            <TextField id="standard-basic" label="Board content" variant="outlined" fullWidth
                       {...register("content")}/>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
  );
}



