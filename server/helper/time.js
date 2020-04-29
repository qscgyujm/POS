/* eslint-disable import/prefer-default-export */
import { format } from 'date-fns';

export const getTime = () => (new Date()).toISOString().slice(0, -1); // Remove last char 'Z'

export const convertTime = (time) => format(new Date(time), 'yy/MM/dd HH:mm:ss');
