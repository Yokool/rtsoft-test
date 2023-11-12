import React, { useState } from "react";
import { Task } from "./TaskTypes/Task";
import { AddTaskModal } from "./Modals/AddTaskModal/AddTaskModal";

type TaskAddProps = {
    taskList: Task[]
    setTaskList: (taskList: Task[]) => void
}

export function TaskAddButton({taskList, setTaskList} : TaskAddProps): React.JSX.Element {
    
    function handleTaskAdd() {
        setShowingModal(true);
    }

    const [showingModal, setShowingModal] = useState(false);

    
    return (
        <>
            {showingModal && <AddTaskModal
                setTaskList={setTaskList}
                taskList={taskList}
                setShowingModal={setShowingModal}
            />}
            <button className="addNewTaskButton" onClick={handleTaskAdd}>
                Přidat novou zakázku
            </button>
        </>
    )
}
