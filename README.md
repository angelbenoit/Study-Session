<h1>Study Session</h1>

<p>
    Study session allows students to schedule school subjects
    to study any present or future date using the calendar.
    The dashboard gives a side navbar to see overall progress,
    upcoming and past study sessions, option to set a goal, timer, calendar, and option to logout.
</p>
<p>
    In the calendar page, users can only pick present or future dates to schedule subjects to study. When user clicks a date, they'll be given a form to enter specific Subject and the amount of minutes they'll want to study for.
    On the side, there'll be a list of subjects that user has scheduled for that date.
</p>
<p>
    The "Start a session" link will give user option to start
    studying the subjects for the current date. For example: if today's date is 8/29/2018, then the "Start a session" page will
    only show the subjects for that day. Users will be automatically be given a subject to study and they'll be able to click "Start" to start the countdown clock. Minutes will depend on how many the user picked when scheduling. After every subject is complete, the timer page will notify user that there's no more subjects to study.
</p>

<h4>
Add this to config/keys.js

```
module.exports = {
    googleClientID:'',
    googleClientSecret:'',
    mongoURI:''
}
```

</h4>

<p>
At https://console.developers.google.com, set Authorized JavaScript origins to http://localhost:5000, and Authorized redirect URIs to 'http://localhost:5000/auth/google/callback' and 'http://localhost:3000/auth/google/callback'. Double check that Cliend ID and Client secret match the ones in config/keys.js
</p>