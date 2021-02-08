const dal = require("../data-access-layer/dal");


async function getAllSchedulesAsync() {
    const sql = `select * from teamNames`;
    const schedules = await dal.executeAsync(sql);
    return schedules;
}


async function getMeetingsBySchedulesAsync(id){

    const sql = `select meetingId, beginningTime, endTime, meetingDescription,
                meetingRoom, teamName from schedules as s right join
                teamNames as t on s.teamId = t.teamId where t.teamId = ?`
                const meetings = await dal.executeAsync(sql, [id]);
                return meetings;
}

async function addOneMeetingAsync(meeting) {
    
    const sql = `insert into schedules values(
                 default,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?)`;
                    const info = await dal.executeAsync(sql, [meeting.teamId, meeting.beginningTime, meeting.endTime,
                         meeting.meetingDescription, meeting.meetingRoom]);
                         meeting.meetingId = info.insertId;
                         return meeting;
}





module.exports = {
    getAllSchedulesAsync,
    getMeetingsBySchedulesAsync,
    addOneMeetingAsync
}