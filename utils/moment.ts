import moment_ from 'moment';
import 'moment/locale/es';

moment_.updateLocale('es', {
  relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: function (number, withoutSuffix, key, isFuture) {
      return '00:' + (number < 10 ? '0' : '') + number + ' minutos';
    },
    m: '01:00 minutos',
    mm: function (number, withoutSuffix, key, isFuture) {
      return (number < 10 ? '0' : '') + number + ':00' + ' minutos';
    },
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años',
  },
});

export const moment = moment_;

export const momentPrettyDate = (date: any) => moment(date).format('DD [de] MMMM [del] YYYY ');

export const getYear = moment().format('YYYY');
