export function currencyFormatter(params: any) {
  var sansDec = params.value.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + formatted;
}