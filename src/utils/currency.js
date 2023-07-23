export class CurrencyUtils {
  static toBrazilianCurrency(amount) {
    return amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }
}
