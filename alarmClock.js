const readline = require("readline");
const { DateTime } = require("luxon");
const { isValidTime, isValidDay } = require("./helpers");
const { playSound } = require("./soundPlayer");

class AlarmClock {
  constructor() {
    this.alarms = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Check alarms periodically
    setInterval(() => this.checkAlarms(), 1000);

    this.start();
  }

  start() {
    this.displayMenu();
  }

  displayMenu() {
    console.clear();
    const currentTime = DateTime.now();
    console.log(
      `Current Time: ${currentTime.toFormat("HH:mm:ss")} ${currentTime.toFormat(
        "cccc"
      )}\n`
    );
    console.log("1. Display current time");
    console.log("2. Set an alarm");
    console.log("3. Snooze an alarm");
    console.log("4. List all alarms");
    console.log("5. Delete an alarm");
    console.log("6. Exit");

    this.rl.question("Select an option: ", (option) => {
      switch (option) {
        case "1":
          this.displayCurrentTime();
          break;
        case "2":
          this.setAlarm();
          break;
        case "3":
          this.snoozeAlarm();
          break;
        case "4":
          this.listAlarms();
          break;
        case "5":
          this.deleteAlarm();
          break;
        case "6":
          this.exit();
          break;
        default:
          console.log("Invalid option. Please select again.");
          this.displayMenu();
          break;
      }
    });
  }

  checkAlarms() {
    const now = DateTime.now();
    const nowTime = now.toFormat("HH:mm");
    const nowDay = now.toFormat("cccc");

    this.alarms.forEach((alarm) => {
      if (alarm.time === nowTime && alarm.day === nowDay && !alarm.rang) {
        this.ringAlarm(alarm);
      }
    });
  }

  ringAlarm(alarm) {
    playSound("alarm.wav");
    alarm.rang = true;
    console.log(`Alarm ringing: ${alarm.originalTime} on ${alarm.day}`);

    const timeout = setTimeout(() => {
      console.log("No response. Snoozing the alarm automatically.");
      this.snoozeAlarm(alarm);
    }, 60000);

    this.rl.question("Type 'snooze' to snooze or 'stop' to stop the alarm: ", (input) => {
      clearTimeout(timeout);
      if (input.toLowerCase() === "snooze") {
        this.snoozeAlarm(alarm);
      } else if (input.toLowerCase() === "stop") {
        console.log("Alarm stopped.");
        alarm.snoozeCount = 3; 
      } else {
        console.log("Invalid input. Snoozing the alarm automatically.");
        this.snoozeAlarm(alarm);
      }
    });
  }

  snoozeAlarm(alarm) {
    if (alarm.snoozeCount < 3) {
      const newTime = DateTime.now().plus({ minutes: 5 }).toFormat("HH:mm");
      alarm.time = newTime;
      alarm.rang = false;
      alarm.snoozeCount += 1;
      console.log(
        `Alarm snoozed to ${newTime} on ${alarm.day}. Original time was ${alarm.originalTime}. Snooze count: ${alarm.snoozeCount}`
      );
    } else {
      console.log("Maximum snooze limit reached for this alarm.");
    }
  }

  displayCurrentTime() {
    const currentTime = DateTime.now();
    console.log(
      `Current Time: ${currentTime.toFormat("HH:mm:ss")} ${currentTime.toFormat(
        "cccc"
      )}`
    );
    this.rl.question("Press Enter to return to the menu...", () => {
      this.displayMenu();
    });
  }

  setAlarm() {
    this.rl.question("Enter alarm time (HH:MM): ", (time) => {
      if (!isValidTime(time)) {
        console.log("Invalid time format. Please use HH:MM.");
        return this.setAlarm(); 
      }

      this.rl.question("Enter the day of the week (e.g., Monday): ", (day) => {
        if (!isValidDay(day)) {
          console.log("Invalid day. Please enter a valid day of the week.");
          return this.setAlarm();
        }

        const alarm = { time: time, originalTime: time, day: day, rang: false, snoozeCount: 0 };
        this.alarms.push(alarm);
        console.log(`Alarm set for ${time} on ${day}`);
        this.displayMenu();
      });
    });
  }

  listAlarms() {
    if (this.alarms.length === 0) {
      console.log("No alarms set.");
    } else {
      console.log("Current alarms:");
      this.alarms.forEach((alarm) => {
        console.log(
          `- ${alarm.originalTime} on ${alarm.day} (Snoozed ${alarm.snoozeCount} times)`
        );
      });
    }
    this.rl.question("Press Enter to return to the menu...", () => {
      this.displayMenu();
    });
  }

  deleteAlarm() {
    this.rl.question(
      "Enter the time of the alarm to delete (HH:MM): ",
      (time) => {
        this.rl.question(
          "Enter the day of the alarm to delete (e.g., Monday): ",
          (day) => {
            const alarmIndex = this.alarms.findIndex(
              (alarm) => alarm.originalTime === time && alarm.day === day
            );

            if (alarmIndex !== -1) {
              this.alarms.splice(alarmIndex, 1);
              console.log(`Alarm for ${time} on ${day} deleted.`);
            } else {
              console.log("No alarm found for that time and day.");
            }

            this.displayMenu();
          }
        );
      }
    );
  }

  exit() {
    console.log("Exiting...");
    this.rl.close();
    process.exit(0);
  }
}

module.exports = AlarmClock;
