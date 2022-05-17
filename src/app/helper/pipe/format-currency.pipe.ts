import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(currency: number): string {
    return currency.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  }

}
