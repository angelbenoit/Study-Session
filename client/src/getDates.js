export const getMonthName = (monthNum) => {
    switch (monthNum) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
    }
}

export const getMonthStart = (day) => {
    switch (day) {
        case "Sun":
            return 0;
        case "Mon":
            return 1;
        case "Tue":
            return 2;
        case "Wed":
            return 3;
        case "Thu":
            return 4;
        case "Fri":
            return 5;
        case "Sat":
            return 6;
    }
}

//returns days in the month, give the month and year in the parameters
export const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

export const checkDate = (pickedMonth, pickedYear) => {
    const currentTime = new Date();

    const year = currentTime.getFullYear();
    //console.log(pickedYear, year)
    if(pickedYear < year)
        return false;
    else
        return true;
}

export const pastDate = (itemDate) => {
    const date = new Date();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDate();
    const currentYear = date.getFullYear();
    const dateFormat = itemDate.split("/");
    //console.log(dateFormat, monthIndex, dayIndex, currentYear)
    //if the year passed in is less than the current year, then it means its from the past
    if (dateFormat[2] < currentYear)
      return true;

    //if it's the current year but a previous month
    else if (Number(dateFormat[2]) === currentYear && Number(dateFormat[0]) < monthIndex + 1)
      return true;

    //if it's the current year and month, check if the day is from earlier in the month
    else if ((Number(dateFormat[2]) === currentYear && Number(dateFormat[0]) === monthIndex + 1) && Number(dateFormat[1]) < dayIndex)
      return true;

    //otherwise return false, meaning not from the past
    else
      return false;
  }