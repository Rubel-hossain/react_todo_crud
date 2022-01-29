import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ListGroup } from "react-bootstrap";
import SingleTask from "../SingleTask"
const TasksWrapper = ()=>{
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [editAble, setEditAble] = useState(false);
    const [currentItem, setCUrrentItem] = useState({});


    const getLocalStorage = () => {
        if(localStorage.getItem("localTodoList") === null){
            localStorage.setItem("localTodoList", JSON.stringify([]));
        }else {
            const getLocalTodoLists  = JSON.parse(localStorage.getItem("localTodoList"));
            setTodoList(getLocalTodoLists);
        }
        
    }

    useEffect(()=>{
        getLocalStorage();
    },[]);

    useEffect(()=>{
        localStorage.setItem("localTodoList", JSON.stringify(todoList));
    },[todoList]);



    const handleInputChange = (e)=>{
          const value = e.target.value;
          setInputValue(value);
    }
    const handleFormSubmit = (e)=>{
        setTodoList(prevState=>[...prevState, { todo: inputValue, id: uuidv4()}]);
        setInputValue("");
        e.preventDefault();
    }
    const handleTodoEdit = (id)=>{
          setEditAble(true);
          const getSingleItem = todoList.find(todo => todo.id === id);
          setCUrrentItem(getSingleItem);
          setInputValue(getSingleItem.todo);
    }
    const handleUpdate = ()=> {
        if(Object.keys(currentItem).length !==0){
            
            const filterTodos = todoList.filter(item => item.id !== currentItem.id);
            let updatedToto = [...filterTodos, {todo: inputValue, id: currentItem.id}];
                updatedToto.splice(-1,1);
                setTodoList(updatedToto);
                setEditAble(false);
        }
        
    }
    const handleDelete = (id)=>{
        setTodoList(todoList.filter(item=>item.id !== id));
    }

    return (
        <div className="tasks_wrapper">
          <div className="container">
              <div className="row">
                  <div className="col-lg-7 mx-auto">
                      <div className="tasks_container">
                          <h3 className="py-4">Reactjs Todo Application</h3>
                       <form
                       onSubmit={handleFormSubmit}
                       >
                          <input 
                          type="text" 
                          value={inputValue} 
                          className="form-control" 
                          placeholder="Type Here" required 
                          onChange={handleInputChange}
                          />
                         {editAble ? (
                             <button onClick={handleUpdate} className="btn btn-success mt-3"> Update</button>
                         ) : (
                             <button type="submit" className="btn btn-primary mt-3"> Add Data</button>
                         )}
                       </form>
                      </div>
                  </div>
              </div>
              <div className="row my-5 justify-content-center">
                  <div className="col-lg-7">
                      <div className="todos-container">
                          {todoList.slice(0).reverse().map(todo=>(
                              <ListGroup key={todo.id}>
                                 <SingleTask 
                                 todo={todo} 
                                 editAble={editAble} 
                                 handleTodoEdit={handleTodoEdit} 
                                 handleDelete={handleDelete}
                                 />

                              </ListGroup>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
        </div>
    )
}

export default TasksWrapper;