export class Message {
    public id: string;
    public sender: string;
    public subject: string;
    public msgText: string;


    constructor( id: string, sender: string, subject: string, msgText: string ) {
        this.id = id;
        this.sender = sender;
        this.subject = subject;
        this.msgText = msgText;

    }
}
