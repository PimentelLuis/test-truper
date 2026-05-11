import { Component, OnInit, ChangeDetectorRef, NgModule } from '@angular/core';
import { PokemonDetail, PokemonModel } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-search',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-search.html',
  styleUrl: './pokemon-search.css',
})
export class PokemonSearch implements OnInit {

  isloading = false;
  encontrado = false;

  pokemonBase: number = 0;
  pokemonComparation: number = 0;

  pokemonBaseDetail: PokemonDetail | null = null;
  pokemonComparationDetail: PokemonDetail | null = null;

  searchPokemonForm = new FormGroup({
    name: new FormControl('')
  });

  pokemonList: PokemonModel[] = [];

  pokemonSeek: PokemonDetail | null = null;

  constructor(private pokemonService: PokemonService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.pokemonService.getPokemonList(0, 10).subscribe((data) => {
      console.log(data);
      this.pokemonList = data;
      this.cdr.detectChanges();
    });
  }

  onSubmit(): void {
    const name = this.searchPokemonForm.get('name')?.value;

    if (name) {
      this.pokemonService.getPokemonByName(name).subscribe((data) => {
        console.log(data);
        this.pokemonSeek = data;
        this.cdr.detectChanges();
      });
    } 
  }

  onPokemonSelect(id: number): void {
    console.log('Selected Pokemon ID: ' + id);

    if (this.pokemonBase === 0) {
      this.pokemonBase = id;
    } else if (this.pokemonComparation === 0) {
      this.pokemonComparation = id;
    }

    if (this.pokemonBase !== 0 && this.pokemonComparation !== 0) {
      this.pokemonService.getPokemonById(this.pokemonBase).subscribe((data) => {
        this.pokemonBaseDetail = data;
        console.log(this.pokemonBaseDetail);
        this.cdr.detectChanges();
      });

      this.pokemonService.getPokemonById(this.pokemonComparation).subscribe((data) => {
        this.pokemonComparationDetail = data;
        console.log(this.pokemonComparationDetail);
        this.cdr.detectChanges();
      });
    }


    console.log('Base Pokemon ID: ' + this.pokemonBase);
    console.log('Comparation Pokemon ID: ' + this.pokemonComparation);

  }

}
