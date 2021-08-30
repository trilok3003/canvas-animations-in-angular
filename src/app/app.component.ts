import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  
  animate() {  
    this.ctx.fillStyle = 'red';  
    const square = new Square(this.ctx);  
    square.draw(5, 1, 20);  
    square.move(1, 30);
  }
  
}
export class Square {
  private color = 'red';
  private x = 0;
  private y = 0;
  private z = 30;

  constructor(private ctx: CanvasRenderingContext2D) {}

  moveRight() {
    this.x++;
    // this.draw();
  }
  // private draw() {
  //   this.ctx.fillStyle = this.color;
  //   this.ctx.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
  // }
  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
  }
  move(y: number, z: number) {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);      
      this.draw(x, y, z);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 200);    
  }
  
}
