import React from 'react';
import {Button, Paper} from "@material-ui/core";
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function (){
  const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
  const { register, handleSubmit, formState: { isSubmitting }} = useForm();

  const navigate = useNavigate();

  //꼭 state로 받아야하는건가
  const {state} = useLocation();

  const onSubmit = (data) => {
    axios.post(`http://localhost:8080/board/${state.no}`,{
      title: data.title,
      content: data.content
    })
        .then((res)=>{
          console.log(res.data);
          navigate(`/board/${state.no}`)
        })
        .catch((e)=>{console.log(e)});
  };

  return(
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{color: "blue"}}><u>Update Board</u></h1>
        <form
            onSubmit={handleSubmit(async (data) => {
              onSubmit(data)
            })}
        >
          <TextField id="standard-basic" label={state.no} variant="outlined" fullWidth
                     disabled/>
          <TextField id="standard-basic" label={state.title} variant="outlined" fullWidth
                     {...register("title")}/>
          <TextField id="standard-basic" label={state.content} variant="outlined" fullWidth
                     {...register("content")}/>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Update
          </Button>
          <Button type="button" variant="contained" onClick={()=>{navigate(-1)}}>
            돌아가기
          </Button>
        </form>
      </Paper>
  )
}