import { Pipe, PipeTransform } from '@angular/core';
import { parcel } from 'src/app/interfaces/parcelInterfaces';

@Pipe({
  name: 'searchparcel'
})
export class SearchparcelPipe implements PipeTransform {

  transform(value: parcel[], email: string ): parcel[] {
    if(!value || email === ''){
      return value;
    }
    const filtered:parcel[]=[]
    for(let item of value){
      if(item.sender.toLowerCase().includes(email.toLowerCase()) ){
              filtered.push(item);
            }
    }
    return filtered
  }

}
