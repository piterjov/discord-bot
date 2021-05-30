import { Message } from 'discord.js'
import { PingFinder } from './ping-finder'
import { inject, injectable } from 'inversify'
import { TYPES } from "../types"

@injectable()
export class MessageResponder {
    private pingFinder: PingFinder;

    constructor(
        @inject(TYPES.PingFinder) PingFinder: PingFinder
    ) {
        this.pingFinder = PingFinder
    }

    handle(message: Message): Promise<Message | Message[]> {
        console.log(this.pingFinder.isPing(message.content), 'hey')
        if (this.pingFinder.isPing(message.content)) {
            return message.reply('pong!');
        }

        return Promise.reject()
    }
}