import {
    Button,
    Card, CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField, Typography,
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTask, updateTask} from '../redux/tasks/actions';

const useStyles = makeStyles((theme) => {
    return ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing(1, 0),
            justifyContent: 'space-around',
        },
    });
});
const TaskDetailsModal = ({open,openEdit, handleClose,taskId}) => {
    const classes = useStyles();
    const {tasks} = useSelector(state => state.tasksReducers);
    const [task,setTask] = useState();

    const dispatch = useDispatch();

    useEffect(()=>{
        if(!taskId) return
        const task = tasks.find(task=>task.id === Number(taskId));
        if(!task) return
        setTask(task);
    },[taskId])

    const doneTask = () =>{
        dispatch(updateTask({...task,isDone:true},
            () => {handleClose()},
        ));
    }
    const deleteThis = () => {
        dispatch(deleteTask(task.id,
            () => {handleClose()},
        ));
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Card className={classes.paper}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {task?.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {task?.description}
                        </Typography>
                    </CardContent>
                    <div className={classes.buttonsContainer}>
                        <Button
                            variant="contained"
                            color="primary"
                            margin="normal"
                            className={classes.btn}
                            onClick={openEdit}
                        >
                            Edit Tasks
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={doneTask}
                        >
                            Done Tasks
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={deleteThis}
                        >
                            Delete Task
                        </Button>
                    </div>

            </Card>
        </Fade>
</Modal>
);
};

export default TaskDetailsModal;
