import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normal'
})
export class NormalPipe implements PipeTransform {

  transform(value: any): any {
    const splitted = value.split('/');
    const wo = splitted[splitted.length - 1];
    return wo.split('_').join(' ');
  }

}
