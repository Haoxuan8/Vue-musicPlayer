export function formatDate(date, format='Day') {
  let d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear(),
  hour ='' + d.getHours(),
  min ='' + d.getMinutes(),
  second ='' + d.getSeconds();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  if (hour.length < 2)
    hour = '0' + hour;
  if (min.length < 2) 
    min = '0' + min;
  if (second.length < 2) 
    second = '0' + second;

  if(format=='Day')
    return [year, month, day].join('-');
  else if(format=='Second')
    return  [year, month, day].join('-') + ' ' + [hour,min,second].join(':')
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


const LyricExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
export function parseLyric(lrc) {
  const lines = lrc.split('\n')
  const lyric = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const result = LyricExp.exec(line)
    if (!result) {
      continue
    }
    const text = line.replace(LyricExp, '').trim()
    if (text) {
      lyric.push({
        time: (result[1] * 6e4 + result[2] * 1e3 + (result[3] || 0) * 1) / 1e3,
        text
      })
    }
  }
  return lyric
}