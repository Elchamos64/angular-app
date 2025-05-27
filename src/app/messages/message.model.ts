export class Message {
    public id: number;
    public sender: string;
    public subject: string;
    public msgText: string;


    constructor( id: number, sender: string, subject: string, msgText: string ) {
        this.id = id;
        this.sender = sender;
        this.subject = subject;
        this.msgText = msgText;

    }
}