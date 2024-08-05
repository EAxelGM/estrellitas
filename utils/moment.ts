import moment_ from 'moment';
import 'moment/dist/locale/es';

moment_.locale("es")

export const moment = moment_;

export const momentPrettyDate = (date: any) => {
  if(date){
    if(moment(date).isValid()){
      return moment(date).format('DD [de] MMMM [del] YYYY ')
    }
  }
  return "sin fecha"
}

export const momentPrettyFullDate = (date: any) =>{
  if(date){
    if(moment(date).isValid()){
      return moment(date).format('DD [de] MMMM [del] YYYY [a las] HH:mm:ss ');
    }
  }
  return "sin fecha"
}

export const getYear = moment().format('YYYY');
