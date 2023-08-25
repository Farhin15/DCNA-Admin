import moment from 'moment';

/**
 * @param {string} dateA - a date, represented in string format
 * @param {string} dateB - a date, represented in string format
 */
const dateSort = (dateA, dateB) => moment(dateA?.trim()).diff(moment(dateB?.trim()));

/**
 *
 * @param {number|string} a
 * @param {number|string} b
 */
const defaultSort = (a, b) => {
    if (a?.trim() < b?.trim()) return -1;
    if (b?.trim() < a?.trim()) return 1;
    return 0;
};

export const Sorter = {
    DEFAULT: defaultSort,
    DATE: dateSort,
};
