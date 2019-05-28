import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import 'fabric-customise-controls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  canvas: any;

  constructor() { }

  ngOnInit() {
    this.draw();
  }

  draw(){
    this.canvas = new fabric.Canvas('canvas');
    fabric.Image.fromURL('https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg', img => {

      img.set({
        scaleX : this.canvas.getWidth() / img.width,   
        scaleY: this.canvas.getHeight() / img.height,   
        originX: "center", 
        originY: "center",
        selectable: false,
        centeredScaling: true
      });

      if ( Math.max(img.width, img.height) > 2048) {
        let fscale = 2048 / Math.max(img.width, img.height);
        img.filters.push(new fabric.Image.filters.Resize({scaleX: fscale, scaleY: fscale}));
        img.applyFilters();
      }

      img.setCoords();  
      this.canvas.centerObject(img);
      this.canvas.setBackgroundImage(img , this.canvas.renderAll.bind(this.canvas));

      this.setText();
      this.canvas.renderAll();      
    });
  }

  setText() {
    let text = new fabric.IText('Click here to edit text', {
      fontSize: 22,
      fontFamily: 'Halvetic',
      fill: "#C0C0C0",
      borderColor: '#00c6d2',
      editingBorderColor: '#00c6d2',
      borderScaleFactor: 2,
      padding: 3
    });

    this.canvas.add(text);
    this.canvas.centerObject(text);
    this.canvas.setActiveObject(text);
    this.canvas.bringToFront(text);
    
  }
  /*
  canvasControls(){
    fabric.Canvas.prototype.customiseControls({
      tl: {
          action: 'rotate',
          cursor: 'cow.png'
      },
      tr: {
          action: 'scale'
      },
      bl: {
          action: 'remove',
          cursor: 'pointer'
      },
      br: {
          action: 'moveUp',
          cursor: 'pointer'
      },
      mb: {
          action: 'moveDown',
          cursor: 'pointer'
      },
      mt: {
          action: {
              'rotateByDegrees': 45
          }
      },
      mr: {
          action: function( e, target ) {
              target.set( {
                  left: 200
              } );
              this.canvas.renderAll();
          }
       },
       // only is hasRotatingPoint is not set to false
       mtr: {
          action: 'rotate',
          cursor: 'cow.png'
       },
  }, function() {
    this.canvas.renderAll();
  } );
  }
  */
}
