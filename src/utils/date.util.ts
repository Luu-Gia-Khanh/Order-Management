import { format } from 'date-fns';

export const formatDate = (date: Date, formatPattern: string = 'dd/MM/yyyy') => {
    return format(date, formatPattern);
};

export const addDays = (date: Date, daysToAdd: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + daysToAdd);
    return result;
};

export const daysBetween = (dateInput: Date) => {
    const today = new Date();

    const start = new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffMs = start.getTime() - end.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
};
