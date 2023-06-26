import MongoConfig from '../../../../../Shared/infrastructure/persistence/mongo/MongoConfig';
import config from '../../../../../../apps/mooc/backend/config/config';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
