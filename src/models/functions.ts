export function getDayTime(): [string, string] {
    let date = new Date();
    return [date.toDateString(), get12HourFormat(date)];
}

export function getDayTimeFormatted(): string{
    let date = getDayTime();
    return date[0] + ", " + date[1];
}

function get12HourFormat(date: Date) {
    let h = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    let hours = h < 10 ? "0" + h : String(h);
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : String(date.getMinutes());
    // let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : String(date.getSeconds());

    return hours + ":" + minutes + " " + am_pm;
}

export function getDay(){
    let date = new Date();
    return date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
}

export function equalDates(date1: string, date2: string){
    date1 = date1.split(',')[0];
    date2 = date2.split(',')[0];

    return date1 == date2;
}