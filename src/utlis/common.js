export function formatDate(date) {
  let d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}

export function formatDTime(time) {
  const secondTotal = Math.floor(time/1000)
  let min = Math.floor(secondTotal/60)
  let second = secondTotal%60

  min = '' + min
  second = '' + second
  if(second.length < 2)
    second = '0' + second

  return [min,second].join(':')
}