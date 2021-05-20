import {ADD_TASK, UPDATE_TASK} from '../../constants/actionTypes';

// Adds a task to tasks
export const addTask = (task, callback) => (dispatch) => {
    dispatch({
        type: ADD_TASK,
        payload:
            {task}
        ,
    });
    callback();
};

// Updates an existing task
export const updateTask = (task, callback) => (dispatch, getState) => {
    const tasks = (getState().tasksReducers.tasks);
    const updatedTasks = tasks.map((storeTask => {
        if (task.id === storeTask.id) {
            return task;
        } else {
            return storeTask;
        }
    }));
    dispatch({
        type: UPDATE_TASK,
        payload:
            {updatedTasks},
    });

    callback();
};

// Delete an existing task by Id
export const deleteTask = (taskId, callback) => (dispatch, getState) => {
    const tasks = (getState().tasksReducers.tasks);
    const updatedTasks = tasks.filter((storeTask => {
        console.log(taskId,storeTask.id)
        if (taskId !== storeTask.id) {
            return storeTask;
        }
    }));
    dispatch({
        type: UPDATE_TASK,
        payload:
            {updatedTasks},
    });
    callback();
};
