export function currencyFormat(num) {
    if (!num ) {
        return '0 đ';
    }
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'; 
}
