import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { MessageResponder } from './services/message-responder'

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private messageResponder: MessageResponder

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder
    ) {
        this.client = client;
        this.token = token
        this.messageResponder = messageResponder

    }

    public listen(): Promise<string> {

        this.client.on("message", (message: Message) => {
            if (message.author.bot) {
                console.log("Ignoring bot message")
                return
            }
            console.log(this.messageResponder)

            this.messageResponder.handle(message).then(() => {
                console.log("Response set")
            }).catch(() => {
                console.log("Response not set")
            })
        });

        return this.client.login(this.token)
    }
}