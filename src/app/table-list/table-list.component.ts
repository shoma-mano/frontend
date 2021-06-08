import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeroService } from '../../hero.service';
import { Hero } from '../../hero';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  heroes: Hero[];
  hero: Hero;
  dashboardheroes: Hero[];
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  condition$: boolean;
  constructor(private heroService: HeroService,
    public changeDetectorRef: ChangeDetectorRef,
    private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    this.getHeroes();
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.getDashBoardHeroes();
    }
  }


  getHeroes(): void {
    this.heroService.getMarvelHeroes().subscribe(heroes => this.heroes = heroes);
  }

  getDashBoardHeroes(): void {
    this.heroService.getHeroes(this.userProfile.email).subscribe(heroes => {
      this.dashboardheroes = heroes;
      console.log(heroes.length)
      if (heroes.length >= 20) {this.changeDetectorRef.detectChanges(); }
    }
      );
  }

  insertHero(hero: Hero): void {
    console.log(this.heroes.length);
    if (this.isLoggedIn) {
      hero.email = this.userProfile.email;
    }
    console.log(hero);
    // tslint:disable-next-line:no-shadowed-variable
    this.heroService.addHero(hero).subscribe((hero) => this.dashboardheroes.push(hero));

  }

}
