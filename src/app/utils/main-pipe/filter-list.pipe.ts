import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(arr: any[], searchValue: string) {
    if (!searchValue) return arr;

    for (let obj of Object.values(arr)) {
      if (obj._id == searchValue) {
        return obj.nome;
      }
    }
  }
}
