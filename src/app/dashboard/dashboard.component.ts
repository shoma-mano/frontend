import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HeroService } from '../../hero.service';
import { Hero } from '../../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];
  hero:Hero;
  constructor(private heroService:HeroService) { }

  ngOnInit() {
      

    this.getHeroes();
    this.heroService.gettest("test").subscribe();


}
getHeroes():void{
  　this.heroService.getHeroes().subscribe(heroes => {
    this.heroes = heroes
    console.log(heroes);}
    );
}

delete(hero:Hero):void{
  console.log(hero);
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();
}


}
