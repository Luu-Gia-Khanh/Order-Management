export function generateOrderCode() {
    const now = new Date();
    const datePart =
        now.getFullYear().toString().slice(-2) +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0');
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${datePart}-${randomPart}`;
}
