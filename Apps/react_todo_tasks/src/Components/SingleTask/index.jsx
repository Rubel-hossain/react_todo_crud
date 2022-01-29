import React from "react";
import { ListGroup } from "react-bootstrap";
const SingleTask = ({todo,handleTodoEdit})=>{
    return(
        <ListGroup.Item>
            <div className="single-todo d-flex justify-content-between align-items-center">
                <div className="todo-text">
                    {todo.todo}
                </div>
                <div className="button-group">
                  <button className="btn btn-sm btn-info" disabled={false} onClick={()=>handleTodoEdit(todo.id)}>Edit</button>
                  <button className="btn btn-sm btn-danger ms-3" disabled={false}>Delete</button>
                  <span>{todo.editAble}</span>
                </div>
            </div>
        </ListGroup.Item>
    )
}

export default SingleTask;