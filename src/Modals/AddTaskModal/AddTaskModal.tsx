import React, { useState } from "react";
import './AddTaskModal.css';
import { Task } from "../../TaskTypes/Task";
import { taskListContainsCode } from "../../TaskCalendar/TaskCalendar";
import { ErrorModalBase } from "../ErrorModal/ErrorModal";
import { ModalHeaderInput } from "../ModalElements/ModalHeaderInput";
import { ModalSubmit } from "../ModalElements/ModalSubmit";
import { ModalHeaderSelect, ModalHeaderSelectOption } from "../ModalElements/ModalHeaderSelect";

type AddTaskModalProps = {
    taskList: Task[]
    setTaskList: (taskList: Task[]) => void;
    setShowingModal: (showModal: boolean) => void;
}

function taskIntoCodeName(task: Task)
{
    return `${task.taskCode} - ${task.taskName}`;
}

function taskListIntoOptions(taskList: Task[]): ModalHeaderSelectOption[]
{
    return taskList.map((task) => {
        return {
            optionValue: task.taskCode,
            optionDisplayValue: taskIntoCodeName(task)
        }
    })
}

/*
function getTaskByCodeExhaustive(taskList: Task[], code: string)
{
    const foundTask = taskList.find((task) => {
        return task.taskCode === code;
    })

    if(foundTask === undefined)
    {
        throw new Error(`Unable to find a task with the code ${code}.`);
    }

    return foundTask;
}
*/


export function AddTaskModal({
    taskList,
    setTaskList,
    setShowingModal
}: AddTaskModalProps): React.JSX.Element {
    
    
    const [taskCode, setTaskCode] = useState('');
    const [taskName, setTaskName] = useState('');
    const [parentTaskCode, setParentTaskCode] = useState<string | undefined>(undefined);

    const [errorMessage, setErrorMessage] = useState<string | undefined>()


    function handleTaskSubmit() {

        // We can't add in new tasks, whose code matches an
        // already existing task -> all task codes are unique
        if(taskListContainsCode(taskList, taskCode))
        {
            setErrorMessage(`Zakázka s kódem \`${taskCode}\` již existuje. Všechny zakázky musí mít unikátní kód.`);
            return;
        }

        const newlyCreatedTask: Task = {
            taskCode: taskCode,
            taskName: taskName,
            childrenTaskCodes: [] // a task starts out without children
        };

        let taskListCopy = [...taskList, newlyCreatedTask];

        // add child to parent
        if(parentTaskCode !== undefined)
        {
            let foundParent = false;

            taskListCopy = taskListCopy.map((task) => {
                // different task skip
                if(task.taskCode !== parentTaskCode)
                {
                    return task;
                }
                
                foundParent = true;

                const newChildren = [
                    ...task.childrenTaskCodes,
                    newlyCreatedTask.taskCode
                ];

                return {
                    ...task,
                    childrenTaskCodes: newChildren
                }

            });

            if(!foundParent)
            {
                throw new Error(`Tried to add the new task to a non-existing parent task with the code ${parentTaskCode}`);
            }
        }

        setTaskList(taskListCopy);

        setShowingModal(false);
    }

    const parentTaskSelectOptions = taskListIntoOptions(taskList);
    
    return (
        <ErrorModalBase
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            >
            <ModalHeaderInput
                header="Kód zakázky"
                inputValue={taskCode}
                setInputValue={setTaskCode}
            />
            <ModalHeaderInput
                header="Název zakázky"
                inputValue={taskName}
                setInputValue={setTaskName}
            />
            <ModalHeaderSelect
                options={parentTaskSelectOptions}
                defaultValue={undefined}
                headerText="Nadřazená zakázka (volitelné)"
                onChange={(newValue) => {
                    setParentTaskCode(newValue);
                }}

            />
            <ModalSubmit
                submitText="Přidat"
                onSubmit={handleTaskSubmit}
            />
        </ErrorModalBase>
    );
}

