import { Pipe, PipeTransform } from '@angular/core';
import { user, user1 } from 'src/app/interfaces/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: user1[], email: string): user1[] {
    if(!value || email === ''){
      return value
    }
    const filtered:user1[]=[]
    for (let user of value){
      if(user.email.toLowerCase().includes(email.toLowerCase())){
        filtered.push(user)
      }
    }
    return filtered
  }

}
