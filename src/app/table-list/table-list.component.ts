import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HeroService } from '../../hero.service';
import { Hero } from '../../hero';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  heroes: Hero[];
  hero:Hero;
  dashboardheroes:Hero[];
  constructor(private heroService:HeroService,public changeDetectorRef: ChangeDetectorRef) { }
  condition$:boolean;

  ngOnInit() {
    this.getHeroes();
    this.getDashBoardHeroes();
  }
  

  getHeroes():void{
    this.heroService.getMarvelHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  getDashBoardHeroes():void{
    this.heroService.getHeroes().subscribe(heroes=>{
      this.dashboardheroes=heroes;
      console.log(heroes.length)
      if(heroes.length>=20)this.changeDetectorRef.detectChanges();
    }
      );
  }

  insertHero(hero:Hero):void{
    console.log("hello");
    console.log(this.heroes.length);
    this.heroService.addHero(hero).subscribe((hero)=>this.dashboardheroes.push(hero));
    if(this.dashboardheroes.length>=20){
      console.log(2);
  }
  }

}
