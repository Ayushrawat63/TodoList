import React, { useEffect, useState } from "react";
import "./todo.css"
import "../image/todoIcon.png"



const getLocalData = () => {
    const lists = localStorage.getItem("myKey");
    if (lists) {
        return JSON.parse(lists);
    }
    else {
        return [];
    }
}

const TodoList = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData());
    const [editItem, setEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () => {
        if (!inputData)
            alert("Please enter data");
        else if (inputData && toggleButton) {
            setItems(
                items.map((curElem => {
                    if (curElem.id === editItem) {
                        return { ...curElem, name: inputData }
                    };
                    return curElem;
                }
                ))
            )
        }
        else {
            if (inputData) {
                const present = items.find((curElem) => {
                    return curElem.name === inputData;
                })
                if (present)
                    alert("Already Present");
                else {
                    const newItemData = {
                        id: new Date().getTime().toString(),
                        name: inputData,
                    }
                    setItems([...items, newItemData]);
                }
            }

        }
        setEditItem("");
        setInputData("");
        setToggleButton(false);
    };
    const toDelete = (value) => {
        const newList = items.filter((curElem) => {
            return curElem.id !== value;
        });
        setItems(newList);


    }
    const toEdit = (id) => {
        const getItem = items.find((curElem) => {
            return curElem.id === id;
        });
        setInputData(getItem.name)
        setEditItem(id);
        setToggleButton(true);


    }
    const removeAll = () => {
        setItems([]);

    };

    useEffect(() => {
        localStorage.setItem("myKey", JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                         <div></div>
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder="✍️ Add Item "
                            className="form-control"
                            value={inputData}
                            onChange={(ele) => setInputData(ele.target.value)}>
                        </input>
                        {
                            (toggleButton) ? (
                                <i className="fa fa-solid fa-edit add-btn" onClick={addItem}></i>
                            ) :
                                (
                                    <i className="fa fa-solid fa-plus" onClick={addItem}></i>
                                )
                        }

                    </div>
                    <div className="showItems">
                        {items.map((value) => {
                            return (
                                <div className="eachItem" key={value.id}>
                                    <h1>{value.name}</h1>
                                    <div className="todo-btn">
                                        <i className=" far  fa-solid fa-edit add-btn" onClick={() => toEdit(value.id)}></i>
                                        <i className=" far fa-solid  add-btn fa-trash-alt" style={{ marginLeft: "10px" }} onClick={() => toDelete(value.id)}></i>
                                    </div>
                                </div>

                            )
                        }
                        )}
                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}><span style={{fontWeight:"bolder"}}>CHECKLIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;