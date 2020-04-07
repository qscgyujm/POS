/* eslint-disable import/prefer-default-export */

export const getTime = () => (new Date()).toISOString().slice(0, -1); // Remove last char 'Z'
