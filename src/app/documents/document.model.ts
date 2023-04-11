export class Document{
    constructor(
        public id:string,
        public name:string,
        public url:string,
        public date:string,
        public clientSponsor:string,
        public location:string,
        public publication:string,
        public category:string,
        public tangibleItems:string,
        public description:string,
        public profileStartedBy:string,
        public profileStatus:string
        ){}
}
