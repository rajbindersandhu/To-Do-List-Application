import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import { addDays } from 'date-fns';
import { isAfter, isBefore, isToday, setDate } from "date-fns";


const FORMAT = 'dd/MM/yyyy';
function formatDate(date, format, locale){
    return dateFnsFormat(date,format, { locale });
}

function AddTask({onAdd, onCancel}){
    let [task, setTask] = React.useState("");
    let [date,setDate] = React.useState(null);

    return(
        <div className ="add-task-display">
                <input value={task} onChange = {(e) => setTask(e.target.value)}/>
                <div className = "add-task-actions-container">
                    <div className="btns-container">
                        <button disabled ={!task} className = "add-btn" onClick={()=>{onAdd(task,date); onCancel();setTask("") }}>Add Task</button>
                        <button className = "cancel-btn" onClick = {() => {onCancel(); setTask("")}}>Cancel</button>
                    </div>
                    <div className = "icon-container">
                        <DayPickerInput onDayChange = {(day)=> setDate(day)} placeholder ={`${dateFnsFormat(new Date(), FORMAT)}`} 
                        formatDate = {formatDate} 
                        format ={FORMAT}
                        dayPickerProps ={{
                            modifiers : {
                                disabled:[{before: new Date()}],
                            },
                        }   
                        }
                        />
                    </div>
                </div>
            </div>
    );
}

const Tasks_Header_Mapping = {
    INBOX: "Inbox",
    TODAY : "Today",
    NEXT_7 : "Next 7 Days"

};

function TaskItems({selectedTab, tasks}){
    if(selectedTab == "NEXT_7"){
        return tasks.filter((task)=>
                isAfter(task.date,new Date()) && isBefore(task.date, addDays(new Date(),7))
        ).map((task,index)=>(<><p key={index}>{task.text}
            <br/>{dateFnsFormat(new Date(task.date), FORMAT)}</p><hr/></>));
    }

    if(selectedTab == "TODAY"){
        return tasks.filter((task) => isToday(task.date))
        .map((task,index)=>(<><p key={index}>{task.text}
            <br/>{dateFnsFormat(new Date(task.date), FORMAT)}</p><hr/></>));
    }

    //return tasks.map((task) => (<p>{task.text}{dateFnsFormat(new Date(task.date), FORMAT)}{" "}</p>));
    return tasks.map((task,index) => <><p key={index}>{task.text}
    <br/>{dateFnsFormat(new Date(task.date), FORMAT)}</p><hr/></>);
}

function Task({selectedTab}){
    let [showAddTask, setShowAddTask] = React.useState(false);
    let [tasks ,setTasks] = React.useState([]);

    //React.useEffect(()=>{addToContent(tasks)},([tasks]))

    function addTheTask(text, date){
        let newTask = {text, date: date || new Date()};
        setTasks( prevState => [...prevState, newTask]);
    }

    return(
        <div className = "tasks">
            <h1>{Tasks_Header_Mapping[selectedTab]}</h1>
            {selectedTab == "INBOX" ?<div className = "add-task-btn" onClick = {() => setShowAddTask(prevState => !prevState)}>
                <span className = "plus">+</span>
                <span className = "add-task-text">Add Task</span>
            </div> : null}
        {showAddTask && <AddTask onAdd = {addTheTask} onCancel ={() => setShowAddTask(false)}/>}
        {/* {tasks.length > 0 ? tasks.map((task,index) => <><p key={index}>{task.text}
                            <br/>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                            <hr/></>
                            ) 
                        : <p> No Task Found ....</p>} */}

        {tasks.length > 0 ? <TaskItems tasks={tasks} selectedTab={selectedTab}/> : <p> No Task Found ....</p>}
        </div>
    );
}

export default Task;