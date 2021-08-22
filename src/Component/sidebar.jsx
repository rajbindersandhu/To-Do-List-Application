import React from "react";
import {FaEnvelopeOpenText, FaCalendarCheck, FaCalendarWeek} from"react-icons/fa";

function Sidebar({selectedTab, setSelectedTab}){


    return(
        <div className ="sidebar">
            <div className ={selectedTab == "Inbox" ? "active" : ""}  onClick = {() => setSelectedTab("INBOX")}>
                <FaEnvelopeOpenText className="icon"/>
                Inbox</div>
            <div className ={selectedTab == "Today" ? "active" : ""}  onClick = {() => setSelectedTab("TODAY")}>
                <FaCalendarCheck className="icon"/>
                Today</div>
            <div className ={selectedTab == "Next_7" ? "active" : ""} onClick = {() => setSelectedTab("NEXT_7")}>
                <FaCalendarWeek className="icon"/>
                Next 7 Days</div>
        </div>
    );
}

export default Sidebar;