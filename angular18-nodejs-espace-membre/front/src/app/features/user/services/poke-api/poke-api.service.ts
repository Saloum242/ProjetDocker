import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private http: HttpClient) {}

  getPokemonDescription(pokemonId: number): Promise<string> {
    return firstValueFrom(
      this.http.get<any>(`${this.pokeApiUrl}/${pokemonId}`).pipe(
        map(response => {
          const entry = response.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'fr'
          );
          return entry ? entry.flavor_text : 'Description non disponible';
        })
      )
    );
  }

  getPokemonImage(pokemonId: number): Promise<string> {
    return firstValueFrom(
      this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).pipe(
        map(response => response.sprites.front_default)
      )
    );
  }
}
