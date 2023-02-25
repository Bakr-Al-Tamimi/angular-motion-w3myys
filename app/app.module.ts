//our root app component
import { Component, NgModule, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';

import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query as q, stagger } from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

@Component({
  selector: 'my-app',
  template: `
    <div class="buttons-container">
      <button mat-fab (click)="add()"><i class="material-icons">&#xE147;</i></button>
      <button mat-fab (click)="remove(0)" [disabled]="list.length===0"><i class="material-icons">&#xE872;</i></button>
    </div>
    <div @list class="list-container">
      <div @items class="box" 
        (click)="remove(i)"
        *ngFor="let item of list; let i=index;">
      </div>
    </div>
  `,
  animations: [
    // nice stagger effect when showing existing elements
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items', 
          stagger(300, animateChild())
        )
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ]),      
    ])
  ],
  styles: [`
    .buttons-container, .list-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .buttons-container {
      flex-direction: row;  
    }
    
    .list-container {
      flex-direction: column;
    }
    
    .box {
      width: 100px;
      height: 50px;
      background-color: #f0397b;
      margin: 5px;
    }
    
    .mat-fab.mat-accent, .mat-mini-fab.mat-accent, .mat-raised-button.mat-accent {
      margin: 20px 10px 20px 0;
      background-color: #2976b9;
    }
  `]
})
export class App {
  counter = 5;
  list = [1,2,3,4];
  
  add(){
    this.list.push(this.counter++);
  }
  
  remove(index) {
    if(!this.list.length) return;
    this.list.splice(index,1);
  }
}

@NgModule({
  imports: [ BrowserModule, BrowserAnimationsModule, MatButtonModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule { }