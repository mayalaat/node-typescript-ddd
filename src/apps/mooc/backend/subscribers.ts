import container from './config/dependency-injection';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import { DomainEventSubscribers } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';

export function registerSubscribers() {
  const eventBus = container.get<EventBus>('Mooc.shared.EventBus');
  eventBus.addSubscribers(DomainEventSubscribers.from(container));
}
