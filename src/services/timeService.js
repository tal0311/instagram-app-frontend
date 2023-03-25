

export function formattedRelativeTime(ts) {
 const now = Date.now()
 const rtf = new Intl.RelativeTimeFormat('en', { style: 'narrow' });

 const calcHours = (1000 * 3600)
 const calcDays = (1000 * 3600 * 24)
 const calcWeeks = (1000 * 3600 * 24 * 7)
 // format by minutes
 if ((now - ts) / 6000 < 1) {
  return 'Just now'
 }
 if ((now - ts) / 6000 > 1 && (now - ts) / 6000 < 60) {
  const minutes = parseInt((now - ts) / 6000).toFixed()
  return rtf.format(-minutes, 'minutes')
 }
 // format by hours
 if ((now - ts) / calcHours < 24) {
  const hours = parseInt((now - ts) / calcHours).toFixed()
  if (!hours) {
   return 'less then a hour ago'
  }
  return rtf.format(-hours, 'hours')
 }

 // format by days
 if (parseInt(now - ts) / calcDays < 30) {
  const days = parseInt(now - ts) / calcDays.toFixed()
  return rtf.format(-days, 'days')
 }

 // format by weeks
 if (parseInt(now - ts) / calcWeeks) {
  const weeks = parseInt((Date.now() - ts) / calcWeeks)
  return rtf.format(-weeks, 'weeks')
 }


}

