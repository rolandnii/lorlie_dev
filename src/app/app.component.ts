import { afterNextRender, afterRender, AfterViewInit, Component, ElementRef, inject, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalInterface } from './terminal-interface';
import { CommandInterface } from './command-interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PorfoilioService } from './services/porfoilio.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  implements AfterViewInit, OnInit {
@ViewChild('inputIndicator', {static: false}) indicator!: ElementRef<HTMLInputElement>
  terminalHistory : TerminalInterface[]  = [];
  commands!: CommandInterface[];
  showIndicator = true;
  portfolioService: PorfoilioService =  inject(PorfoilioService)

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.terminalHistory.push({
      command: undefined
    })
    this.commands =  this.portfolioService.commands()
  }
  
  ngAfterViewInit(): void {
    this.focusInput()
   }

  runCommmand(input: string, historyIndex: number) : void {
  if (input == 'clear' || input == 'cls' ) {
    this.reset()
    this.focusInput()
    return;
  }
   const command = this.getCommand(input);
   if (!!command && input != '' ) {
     this.validCommand(input,historyIndex)
    
   } else {
    this.invalidCommand(input, historyIndex);
   }
   this.newTerminalLine();
   this.focusInput()
  
  }
  
  toHtml(response?: string) : SafeHtml|undefined {
    return response ? this.sanitizer.bypassSecurityTrustHtml(response) : undefined;
  }

  validCommand(input: string, historyIndex: number): void {
    this.terminalHistory[historyIndex] = {
      command: input,
      response: this.toHtml(this.fetchResponse(input))
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
  
  fetchResponse(input: string): string | undefined {
    let desc = this.getCommand(input)?.description
    return desc;
  }

  getCommand(input: string): CommandInterface | undefined {

    return  this.commands.find( command => command.command === input)

  }

  focusInput() {
   
    if ( this.indicator) {
      setTimeout(() => {
        this.indicator.nativeElement.focus();
      });
    }
  }

  reset() {
    this.terminalHistory = []
    this.newTerminalLine()
  }

}



