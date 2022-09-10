import { Pipe, PipeTransform } from '@angular/core';
import { parcel } from 'src/app/interfaces/parcelInterfaces';

@Pipe({
  name: 'searchparcel'
})
export class SearchparcelPipe implements PipeTransform {

  transform(value: parcel[], id: number|string ): parcel[] {
    if(!value || id === ''){
      return value;
    }
    const filtered:parcel[]=[]
    for(let item of value){
      if((item.parcelID+'').includes((id.toString)()) ){
              filtered.push(item);
            }
    }
    return filtered
  }

}
