import amqplib, { ConsumeMessage } from 'amqplib';
import { ConnectionSettings } from './ConnectionSettings';
import { ExchangeSetting } from './ExchangeSetting';
import { RabbitMQExchangeNameFormatter } from './RabbitMQExchangeNameFormatter';

export class RabbitMQConnection {
  protected connectionSettings: ConnectionSettings;

  protected channel?: amqplib.ConfirmChannel;
  protected connection?: amqplib.Connection;

  constructor(params: { connectionSettings: ConnectionSettings; exchangeSettings: ExchangeSetting }) {
    this.connectionSettings = params.connectionSettings;
  }

  async connect() {
    this.connection = await this.amqpConnect();
    this.channel = await this.amqpChannel();
  }

  async exchange(params: { name: string }) {
    return this.channel?.assertExchange(params.name, 'topic', { durable: true });
  }

  async queue(params: {
    exchange: string;
    name: string;
    routingKeys: string[];
    deadLetterExchange?: string;
    deadLetterQueue?: string;
    messageTtl?: Number;
  }) {
    const durable = true;
    const exclusive = false;
    const autoDelete = false;
    const args = this.getQueueArguments(params);

    await this.channel?.assertQueue(params.name, {
      exclusive,
      durable,
      autoDelete,
      arguments: args
    });
    for (const routingKey of params.routingKeys) {
      await this.channel!.bindQueue(params.name, params.exchange, routingKey);
    }
  }

  async publish(params: {
    exchange: string;
    routingKey: string;
    content: Buffer;
    options: { messageId: string; contentType: string; contentEncoding: string };
  }) {
    const { routingKey, content, options, exchange } = params;
    return new Promise((resolve: Function, reject: Function) => {
      this.channel!.publish(exchange, routingKey, content, options, (error: any) =>
        error ? reject(error) : resolve()
      );
    });
  }

  async deleteQueue(queue: string) {
    return await this.channel!.deleteQueue(queue);
  }

  async close() {
    await this.channel?.close();
    return this.connection?.close();
  }

  async consume(queue: string, onMessage: (message: ConsumeMessage) => {}) {
    await this.channel!.consume(queue, (message: ConsumeMessage | null) => {
      if (!message) {
        return;
      }
      onMessage(message);
    });
  }

  ack(message: ConsumeMessage) {
    this.channel!.ack(message);
  }

  noAck(message: ConsumeMessage) {
    this.channel!.nack(message);
  }

  async retry(message: ConsumeMessage, queue: string, exchange: string) {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange);
    const options = this.getMessageOptions(message);

    return await this.publish({
      exchange: retryExchange,
      routingKey: queue,
      content: message.content,
      options
    });
  }

  async deadLetter(message: ConsumeMessage, queue: string, exchange: string) {
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange);
    const options = this.getMessageOptions(message);

    return await this.publish({
      exchange: deadLetterExchange,
      routingKey: queue,
      content: message.content,
      options
    });
  }

  private getMessageOptions(message: ConsumeMessage) {
    const { messageId, contentType, contentEncoding, priority } = message.properties;
    return {
      messageId,
      headers: this.incrementRedeliveryCount(message),
      contentType,
      contentEncoding,
      priority
    };
  }

  private incrementRedeliveryCount(message: ConsumeMessage) {
    if (this.hasBeenRedelivered(message)) {
      const count = parseInt(message.properties.headers['redelivery_count']);
      message.properties.headers['redelivery_count'] = count + 1;
    } else {
      message.properties.headers['redelivery_count'] = 1;
    }

    return message.properties.headers;
  }

  private hasBeenRedelivered(message: ConsumeMessage) {
    return message.properties.headers['redelivery_count'] !== undefined;
  }

  private getQueueArguments(params: {
    exchange: string;
    name: string;
    routingKeys: string[];
    deadLetterExchange?: string;
    deadLetterQueue?: string;
    messageTtl?: Number;
  }) {
    let args: any = {};
    if (params.deadLetterExchange) {
      args = { ...args, 'x-dead-letter-exchange': params.deadLetterExchange };
    }
    if (params.deadLetterQueue) {
      args = { ...args, 'x-dead-letter-routing-key': params.deadLetterQueue };
    }
    if (params.messageTtl) {
      args = { ...args, 'x-message-ttl': params.messageTtl };
    }

    return args;
  }

  private async amqpConnect() {
    const { hostname, port, secure } = this.connectionSettings.connection;
    const { username, password, vhost } = this.connectionSettings;
    const protocol = secure ? 'amqps' : 'amqp';

    const connection = await amqplib.connect({
      protocol,
      hostname,
      port,
      username,
      password,
      vhost
    });

    connection.on('error', (err: any) => {
      Promise.reject(err);
    });

    return connection;
  }

  private async amqpChannel(): Promise<amqplib.ConfirmChannel> {
    const channel = await this.connection!.createConfirmChannel();
    await channel.prefetch(1);

    return channel;
  }
}
