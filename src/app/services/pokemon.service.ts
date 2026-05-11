import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { PokemonModel, PokemonDetail } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  public getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .pipe(
      map((response: any) => {
        return response.results.map((pokemon: any) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();

          return {
            id: parseInt(id, 10),
            name: pokemon.name,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            isSelected: false
          } as PokemonModel;
        });
      })
    );
  }

  public getPokemonByName(name: string): Observable<PokemonDetail> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .pipe(
      map((pokemon: any) => {

        return {
          id: pokemon.id,
          name: pokemon.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          height: pokemon.height,
          weight: pokemon.weight,
          stats: pokemon.stats.map((stat: any) => ({
            base_stat: stat.base_stat,
            effort: stat.effort,
            stat: {
              name: stat.stat.name,
              url: stat.stat.url
            }
          }))
        } as PokemonDetail;
      })
    );
  }

   public getPokemonById(id: number): Observable<PokemonDetail> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(
      map((pokemon: any) => {

        return {
          id: pokemon.id,
          name: pokemon.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
          height: pokemon.height,
          weight: pokemon.weight,
          stats: pokemon.stats.map((stat: any) => ({
            base_stat: stat.base_stat,
            effort: stat.effort,
            stat: {
              name: stat.stat.name,
              url: stat.stat.url
            }
          }))
        } as PokemonDetail;
      })
    );
  }

}
