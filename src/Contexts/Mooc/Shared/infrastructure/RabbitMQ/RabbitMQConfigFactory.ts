import { ExchangeSetting } from '../../../../Shared/infrastructure/EventBus/RabbitMq/ExchangeSetting';
import { ConnectionSettings } from '../../../../Shared/infrastructure/EventBus/RabbitMq/ConnectionSettings';
import config from '../../../../../apps/mooc/backend/config/config';

export type RabbitMQConfig = {
  exchangeSettings: ExchangeSetting;
  connectionSettings: ConnectionSettings;
};

export class RabbitMQConfigFactory {
  static createConfig(): RabbitMQConfig {
    return config.get('rabbitmq');
  }
}
