import React, { Fragment, useState } from "react";

const InputTodo = ({ onAddTodo }) => {
    const [description, setDescription] = useState("");
   
    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("/todos", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            console.log(response);
            // Call the onAddTodo function passed from the parent component to update the todo list
            onAddTodo();
        } catch (err) {
            console.error('Could not add todo:', err.message);
        }
    }

    return (
        <Fragment>
            <h1>InputTodo</h1>
            <h1 className="text-center mt-5">Todo list pern</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;
