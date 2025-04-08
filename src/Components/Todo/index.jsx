import React, { useState } from 'react'
import './index.css'
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdSend } from 'react-icons/md';
import { HiSave } from 'react-icons/hi';

const Todo = () => {
    const [list, setList] = useState([]);
    const [inputVal, setInputVal] = useState('')
    const [completed, setCompleted] = useState([])

    const submitHandler = (e) => {
        e.preventDefault();
        setList([...list, { id: list.length + 1, completed: false, text: inputVal }])
    }

    const deleteItem = (id) => {
        const filterList = list.filter((item) => item.id !== id)
        setList(filterList)
    }

    const editItem = (item) => {
        const filterList = list?.map((li) => {
            if (li.id === item.id) {
                return item
            }
            return li;
        })
        setList(filterList)
    }
    const completedHandler = (compl) => {
        const filterlist = list?.filter((li) => li.completed === compl)
        setCompleted(filterlist)
    }



    return (
        <div>
            <div>
                <header>
                    <h1>☑️<i>TODO</i></h1>
                </header>
            </div>

            <div>
                <form className='inbtn' onSubmit={(e) => {
                    submitHandler(e)
                    setInputVal('')
                }}>
                    <input type="text"
                        placeholder='Bir şey yaz...'
                        value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <button title='Send' className='enterbtn'><MdSend /></button>
                </form>
                <TodoList list={list} deleteItem={deleteItem} editItem={editItem} />
            </div>
            <div className='cmpltdbtn'>
                <button className='completedbtn' onClick={() => completedHandler(true)}>Completed</button>
                <button className='uncompletedbtn' onClick={() => completedHandler(false)}>Uncompleted</button>
            </div>
            <ul className='completedlist'>
                {completed.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    )
}

export default Todo

const TodoList = ({ list, deleteItem, editItem }) => {
    return (
        <ul className='list'>
            {list.map((item) => (
                <TodoItem {...item} key={item.id} deleteItem={deleteItem} editItem={editItem} />
            ))}
        </ul>
    )
}

const TodoItem = ({ id, text, deleteItem, editItem, completed }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [inputText, setInputText] = useState(text)
    const editHandler = () => {
        editItem({ id, completed, text: inputText });
        setIsEdit(!isEdit);
    }
    const toggleHandler = () => {
        editItem({ id, completed: !completed, text })
    }

    return (
        <li className='buttons' key={id}>

            {isEdit ? (<input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />) : (
                <>
                    <span className={completed ? 'done' : 'hidden'}
                        onClick={toggleHandler}
                    >{text}</span>
                </>

            )}

            <button
                className={isEdit ? 'savebtn' : 'editbtn'}
                onClick={editHandler}
                title={isEdit ? 'Save' : 'Edit'}
            >
                {isEdit ? <HiSave /> : <FiEdit />}
            </button>

            {!isEdit && (
                <button className='deletebtn' onClick={() => deleteItem(id)} title='Delete'>
                    <FiTrash />
                </button>
            )}
        </li>


    )
}

