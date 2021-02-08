import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import MeetingModel from "../Models/MeetingModel";
import TeamModel from "../Models/TeamModel";
import "./AddMeeting.css";


function AddMeeting(): JSX.Element {
  const history = useHistory();


  const [teams, setTeams] = useState<TeamModel[]>([])


  useEffect(() => {
    (async function () {
      const response = await axios.get<TeamModel[]>(
        "http://localhost:3001/api/meetings"
      );
      const teams = response.data;
      setTeams(teams);
    })();
  }, []);

  const { register, handleSubmit, errors } = useForm<MeetingModel>();

  async function submit(meetings: MeetingModel) {
    try {
      const response = await axios.post<MeetingModel>(
        "http://localhost:3001/api/meetings",
        meetings
      );
      const addedMeeting = response.data;
      history.push("/home");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="AddMeeting">
      <form action="Post" onSubmit={handleSubmit(submit)}>
        <table>
          <tr>
            <td>
              <label > Team Name:</label>
            </td>
            <select defaultValue="0"  name="teamId" ref={register({required:true})}>
              { errors.teamName?.type === 'required' && <span>Team name is required</span>}
                <option disabled value="0">
                  Select Team
                </option>
              {teams.map((t) => (
                <option key={t.teamId} value={t.teamId}>
                  {t.teamName}
                </option>
              ))}
            </select>
          </tr>
          <td></td>
          <tr>
            <td>
              <label>Start hour:</label>
            </td>
            <td>
              <input type="datetime-local" name="beginningTime" ref={register({required:true})} />
              { errors.beginningTime?.type === 'required' && <span>Meeting start is required</span>}

            </td>
          </tr>
          <tr>
            <td>
              <label>End hour:</label>
            </td>
            <td>
              <input type="datetime-local" name="endTime" ref={register({required:true})} />
              { errors.endTime?.type === 'required' && <span>Meeting end is required</span>}

            </td>
          </tr>
          <tr>
            <td>
              <label>Meeting Description:</label>
            </td>
            <td>
              <input type="text" name="meetingDescription" ref={register({required:true})} />
              { errors.meetingDescription?.type === 'required' && <span>Meeting description is required</span>}

            </td>
          </tr>
          <tr>
            <td>
              <label>Room Meeting:</label>
            </td>
            <td>
              <input type="text" name="meetingRoom" ref={register({required:true})} />
              { errors.meetingRoom?.type === 'required' && <span>Meeting room is required</span>}
            </td>
          </tr>
          <tr>
            <td>
              <button>Submit</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default AddMeeting;
