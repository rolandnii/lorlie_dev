import { afterNextRender, afterRender, AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalInterface } from './terminal-interface';
import { CommandInterface } from './command-interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  implements OnInit, OnChanges {
@ViewChild('inputIndicator') indicator!: ElementRef<HTMLInputElement>
  terminalHistory : TerminalInterface[]  = [];
  commands!: CommandInterface[];
  showIndicator = true;

  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.terminalHistory.push({
      command: undefined
    })
    this.commands = commands
    this.indicator.nativeElement.focus()
   }

   ngOnChanges(changes: SimpleChanges): void {
       console.log(changes);
       
   }


  runCommmand(input: string, historyIndex: number) : void {
   const command =  this.commands.find( command => command.command === input);
   if (!!command) {
     this.validCommand(input,historyIndex)
     this.newTerminalLine();
     return
   }
   this.invalidCommand(input, historyIndex);
   this.newTerminalLine();
  
  }
  
  toHtml(response?: string) : SafeHtml|undefined {
    return response ? this.sanitizer.bypassSecurityTrustHtml(response) : undefined;
  }
  validCommand(input: string, historyIndex: number): void {
    this.terminalHistory[historyIndex] = {
      command: input,
      response: this.fetchResponse(input)
     }
  }
  invalidCommand(input: string, historyIndex: number): void {
    this.terminalHistory[historyIndex] = {
      command: input,
      response: "no command found"
     }
  }
  newTerminalLine(): void{
    this.terminalHistory.push({
      command: undefined
     })
  }
  
  fetchResponse(input: string): string {
    return "this is the response from " + input;
  }



  debug(val: any) : any {
    console.log(val);
    
    return val;
  }

}


export const commands: CommandInterface[] = [
  {
    command: 'about',
    description: 'To give you a brief history about me'
  },{
    command: 'contact',
    description: "<h2>reach out to me on</h2>"
  }
]

