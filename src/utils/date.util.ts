import { format } from 'date-fns';

export const formatDate = (date: Date, formatPattern: string = 'dd/MM/yyyy') => {
    return format(date, formatPattern);
};
