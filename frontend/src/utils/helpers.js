export function isExpired(expirationDate){ // handle the expiration date
    const now = new Date();
    const expDate =  new Date(expirationDate);
    const daysDiff = (expDate - now) / (1000 * 60 * 60 * 24); // Calculate the difference in days
    return daysDiff <= 0 || daysDiff <= 92; // Check if the product is expired or within 7 days of expiration
}

export const formatDateToText = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }


    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};
