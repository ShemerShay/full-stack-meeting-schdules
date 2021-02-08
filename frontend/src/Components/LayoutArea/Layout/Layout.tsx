import React from "react";
import { BrowserRouter, NavLink, Redirect, Route, Switch } from "react-router-dom";
import AddMeeting from "../../SitesArea/AddMeeting/AddMeeting";
import MeetingByTeam from "../../SitesArea/MeetingByTeam/MeetingByTeam";
import logo from "../../../assets/images/background.jpg"
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
        <div className="Layout" style={{ 
  backgroundImage: `url(${logo})`,
  backgroundSize:'cover' 
}}>
            <h1>Meetings By Team</h1>
            <br/>
            <br/>

			<nav>
                <NavLink to="/home" >
                    Meetings 
                </NavLink>
                <span> | </span>
                <NavLink to="/add-meeting">
                    Add Meeting
                </NavLink>
            </nav>
            <hr/>
            <Switch>
                <Route path="/home" component={MeetingByTeam} exact/>
                <Route path="/add-meeting" component={AddMeeting} exact/>
                <Redirect from="/" to="/home" exact />

            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default Layout;
