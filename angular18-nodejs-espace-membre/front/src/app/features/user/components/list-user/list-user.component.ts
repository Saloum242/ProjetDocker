import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { PokeApiService } from '../../services/poke-api/poke-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: any[] = [];
  error: string | null = null;
  isModalOpen = false;
  selectedUser: any = null;

  constructor(
    private userService: UserService,
    private pokeApiService: PokeApiService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    try {
      this.users = await this.userService.getUsers();
      await this.loadPokemonImages();
    } catch (error) {
      console.error('Error fetching users', error);
      this.error = 'Error fetching users.';
    }
  }

  async loadPokemonImages() {
    for (let user of this.users) {
      user.pokemonImage = await this.pokeApiService.getPokemonImage(user.pokemon_id);
    }
  }

  async openModal(user: any) {
    this.selectedUser = user;
    this.isModalOpen = true;
    try {
      this.selectedUser.pokemonDescription = await this.pokeApiService.getPokemonDescription(user.pokemon_id);
    } catch (error) {
      console.error('Error fetching Pokémon description', error);
      this.selectedUser.pokemonDescription = 'Description non disponible';
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedUser = null;
  }
}
