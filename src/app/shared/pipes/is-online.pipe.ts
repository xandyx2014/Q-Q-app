import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOnline'
})
export class IsOnlinePipe implements PipeTransform {

  transform(value: any): any {
    if (navigator.onLine) {
      return value;
    } else {
      return '/assets/img/no-image.png';
    }
  }

}
