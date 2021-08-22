import React from "react";
import Task from "./task";
import Sidebar from "./sidebar";

function Content(){

    let [selectedTab, setSelectedTab] = React.useState("INBOX");
    //let [taskArray, setTaskArray] = React.useState([]);

    // function addToContent(tasks){
    //     setTaskArray([...taskArray,...tasks]);
    //     console.log(taskArray);
    // }

    return (
        <div className="content">
            <Sidebar selectedTab = {selectedTab} setSelectedTab={setSelectedTab}/>
            <Task selectedTab ={selectedTab}/>
        </div>
    );
}
export default Content;

//addToContent ={addToContent}