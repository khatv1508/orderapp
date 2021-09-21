const moment = require('moment'); 
const stringToDate = (text) => {
    return moment(text, "DD-MM-YYYY HH:mm").utc(true);
}

const currentDate = () => {
    return moment().utc(true);
}

const dateTimeToString = (date) => {
    return moment(date).utc(false).format('DD-MM-YYYY HH:mm');
}

const dateToString = (date) => {
    return moment(date).utc(true).format('DD-MM-YYYY');
}

module.exports = {
    stringToDate,
    currentDate,
    dateToString,
    dateTimeToString
}