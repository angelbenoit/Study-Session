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