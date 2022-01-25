import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  
  documents: Document[] = [
    new Document(1, 'Mickey Mouse', 'An anthropomorphic mouse who typically wears red shorts, large yellow shoes, and white gloves, Mickey is one of the world\'s most recognizable fictional characters.', 'https://en.wikipedia.org/wiki/Mickey_Mouse' ),
    new Document(2, 'Minnie Mouse', 'As the longtime sweetheart of Mickey Mouse, she is an anthropomorphic mouse with white gloves, a bow, polka-dotted dress, white bloomers, and low-heeled shoes occasionally with ribbons on them. Her full name is Minerva Mouse, but this is rarely used.', 'https://en.wikipedia.org/wiki/Minnie_Mouse' ),
    new Document(3, 'Donald Duck', 'Donald is an anthropomorphic white duck with a yellow-orange bill, legs, and feet. He typically wears a sailor shirt and cap with a bow tie. Donald is known for his semi-intelligible speech and his mischievous, temperamental, and pompous personality.', 'https://en.wikipedia.org/wiki/Donald_Duck' ),
    new Document(4, 'Goofy', 'He is a tall, anthropomorphic dog who typically wears a turtle neck and vest, with pants, shoes, white gloves, and a tall hat originally designed as a rumpled fedora. Goofy is a close friend of Mickey Mouse and Donald Duck. He is normally characterized as hopelessly clumsy and dim-witted, yet this interpretation is not always definitive; occasionally Goofy is shown as intuitive and clever, albeit in his own unique, eccentric way.', 'https://en.wikipedia.org/wiki/Goofy' ),
    new Document(5, 'Pluto', 'He is a yellow-orange color, medium-sized, short-haired dog with black ears. Unlike most Disney characters, Pluto is not anthropomorphic beyond some characteristics such as facial expression. He is Mickey\'s pet. Officially a mixed-breed dog, he made his debut as a bloodhound in the Mickey Mouse cartoon The Chain Gang.', 'https://en.wikipedia.org/wiki/Pluto_(Disney)' )
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
