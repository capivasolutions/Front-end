import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

const timeZone = dayjs.tz.guess()
console.log('timeZone', timeZone)

export class DateUtils {
  static relativeDatefromNow(date) {
    console.log('DATE', date);
    return dayjs.utc(`${date}Z`).tz(timeZone).format('DD/MM/YYYY HH:mm:ss')
  }
}
