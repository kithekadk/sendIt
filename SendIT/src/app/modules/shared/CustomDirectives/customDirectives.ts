import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[navStyler]'
})
export class ContainerDirective implements OnInit{
  constructor( private el:ElementRef) {   
  }

  @Input() display:string='flex'
  @Input() justifyContent:string='space-between'
  @Input() paddingRight:string='20px'
  @Input() paddingLeft:string='20px'
  @Input() backgroundColor:string="blueviolet"
  @Input() color:string="coral"
  @Input() padding:string="0px"
  @Input() cursor:string="arrow"
  @Input() textAlign:string="center"
  
  @HostBinding ('style.display') displaytype!:string
  @HostBinding ('style.backgroundColor') background!:string
  @HostBinding ('style.justifyContent') justify!:string
  @HostBinding ('style.paddingRight') paddingR!:string;
  @HostBinding ('style.paddingLeft') paddingL!:string;
  @HostBinding ('style.color') color1!:string;
  @HostBinding ('style.padding') padding1!:string;
  @HostBinding ('style.cursor') cursor1!:string;
  @HostBinding ('style.textAlign') align!:string;

  ngOnInit(){
          this.displaytype = this.display
          this.background = this.backgroundColor
          this.paddingR=this.paddingRight
          this.paddingL=this.paddingLeft
          this.justify=this.justifyContent
          this.color1=this.color
          this.padding1=this.padding
          this.cursor1=this.cursor
          this.align=this.textAlign
  }
}