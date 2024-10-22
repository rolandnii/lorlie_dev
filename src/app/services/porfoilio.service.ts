import { Injectable } from '@angular/core';
import { CommandInterface } from '../command-interface';

@Injectable({
  providedIn: 'root'
})
export class PorfoilioService {

  constructor() { }


  commands() : CommandInterface[] {

    return [
      {
        command: 'help',
        description: this.help()
      }
    ]
  }


  help() : string {

    return `
        <div class="help" >
          <p>
            <span>about</span> 
            <span class="material-symbols-outlined">double_arrow </span>
             <span>About Me</span>
          </p>
          <p>
            <span>education</span> 
            <span class="material-symbols-outlined">double_arrow </span>
             <span>More On My Education</span>
          </p>
        </div>
        `
  }



}
