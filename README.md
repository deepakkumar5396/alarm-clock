# Alarm Clock Application

This is a simple command-line alarm clock application built using Node.js. It allows users to set alarms, snooze them, and manage multiple alarms easily.

## Features

- **Set Alarms:** Set alarms for specific times on specific days.
- **Snooze Alarms:** Snooze alarms for 5 minutes, up to 3 times.
- **List Alarms:** View all currently set alarms.
- **Delete Alarms:** Remove alarms that you no longer need.
- **Real-time Clock:** Displays the current time in the console.

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/deepakkumar5396/alarm-clock.git

2. Navigate to the project directory:
  cd alarm-clock
3. Install the dependencies:
   npm install
4. Run the application:
   node index.js

**Set an Alarm:**
Choose option 2 from the menu to set a new alarm.
Enter the time in HH:MM format and the day of the week (e.g., Monday).
The alarm will be set and stored in the list of alarms.

**Snooze or Stop an Alarm:**

When an alarm rings, you will be prompted to snooze or stop the alarm.
If you choose snooze, the alarm will be delayed by 5 minutes, and you can snooze it up to 3 times.
If you choose stop, the alarm will be turned off and won’t ring again.

**Dependencies**
luxon: For date and time handling.
play-sound: For playing alarm sounds.

**How It Works**
Real-Time Clock Display: The current time is displayed on the menu, updating every second.
Set Alarms: Users can input a time (in HH:MM format) and a day of the week to set an alarm.
Alarm Check: The app checks every second to see if the current time matches any set alarms and rings the alarm if a match is found.
Snooze Functionality: When an alarm rings, users can snooze it for 5 minutes, up to a maximum of 3 times.
Alarm Management: Users can view all set alarms and delete any that are no longer needed.