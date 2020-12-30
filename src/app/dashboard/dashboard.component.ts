import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { HeroService } from '../../hero.service';
import { Hero } from '../../hero';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css','./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];
  hero:Hero;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  constructor(private heroService:HeroService,
    private readonly keycloak: KeycloakService) { }

    public async  ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
    this.getHeroes();
}

getHeroes():void{
  　this.heroService.getHeroes(this.userProfile.email).subscribe(heroes => {
    this.heroes = heroes;
    console.log(heroes);}
    );
}

delete(hero:Hero):void{
  console.log(hero);
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero.id).subscribe();
}


}
