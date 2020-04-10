import { format } from 'date-fns';

const convertDateTime = (time) => format(new Date(time), 'yy/MM/dd HH:mm:ss');

export default convertDateTime;
