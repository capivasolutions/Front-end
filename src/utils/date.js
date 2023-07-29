import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

const timeZone = dayjs.tz.guess()

export class DateUtils {
  static now() {
    return dayjs();
  }

  static hourAgo() {
    return dayjs().subtract(1, 'hour');
  }

  static dayAgo() {
    return dayjs().subtract(1, 'day');
  }

  static weekAgo() {
    return dayjs().subtract(1, 'week');
  }

  static monthAgo() {
    return dayjs().subtract(1, 'month');
  }

  static yearAgo() {
    return dayjs().subtract(1, 'year');
  }

  static formatDateTime(date) {
    return dayjs.utc(`${date}Z`).tz(timeZone).format('DD/MM/YYYY HH:mm:ss')
  }

  static formatTime(date) {
    return dayjs.utc(`${date}Z`).tz(timeZone).format('HH:mm:ss')
  }
}
