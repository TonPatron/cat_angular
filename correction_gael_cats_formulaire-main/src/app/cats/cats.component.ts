import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css'],
})
export class CatsComponent {
  // je déclare ma liste de chats , vide pour l'instant
  catList: any = [];

  // je créer un attribut (une variable en soit)
  // pour plus tard lui injecter un formulaire
  chatForm: FormGroup;

  // dans mon constructor je créer un formulaire sur chatForm
  // je créer un group, dans ce groupe il y a un tableau
  // qui pourra contenir plusieurs input, justement
  // je pousse ça encore plus loin en créeant un group dans le tableau
  // visuellement ça donnerais ça :
  // cats: [[<input name="name">, <input name="color">, <input name="age">], [<input name="name">, <input name="color">, <input name="age">]]
  // dans le cas visuel que je vous donne, il y aurais 2 chats que nous voudrions ajouter
  constructor(private fbuild: FormBuilder) {
    this.chatForm = this.fbuild.group({
      cats: this.fbuild.array([
        this.fbuild.group({
          name: [''],
          color: [''],
          age: [''],
        }),
      ]),
    });
  }

  // notre getter pour récuperer le tableau de formulaire des chats
  get cats(): FormArray {
    return this.chatForm.get('cats') as FormArray;
  }

  // quand j'ajoute un nouveau chat j'ajoute à nouveau ce combo
  //[<input name="name">, <input name="color">, <input name="age">]
  // dans le tableau de formulaire
  addNewCat(): void {
    this.cats.push(
      this.fbuild.group({
        name: [''],
        color: [''],
        age: [''],
      })
    );
  }

  // quand je soumet, je dis que mon catList (vide au début)
  // va être l'exactitude de ce que mon formulaire m'envoie
  // ce qui correspond à [{name: "", color: "", age}, (plusieurs fois l'objet en fonction de ce qu'on ajoute comme chats)]
  // si j'avais fait catList.push(this.chatForm.value), j'envoyais plusieurs fois dans le tableau cats: {name, etc}
  // ce qui ferais : [{cats: {name: "", color:"", age: ""},{cats: {name: "", color:"", age: ""} }]
  // ce qui n'est pas super pour itérer plus tard dessus
  onSubmit(): void {
    this.catList = this.chatForm.value.cats;
  }

  myStyles = {
    fontSize: '30px',
    color: 'red',
  };

  catAction(catName: string): void {
    alert(`${catName} miaole`);
  }
}
