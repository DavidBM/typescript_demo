import {JsonizableInterface, Constructable, Serializable} from './interfaces';

interface IEvent extends Serializable{}

export type EventSubscriptionCallback<T = DomainEvent> = (event: T) => Promise<void> | void; 

export interface IEventBus<T = DomainEvent> {
	subscriptions: WeakMap<Constructable<T>, Set<EventSubscriptionCallback<T>>>
	publish(event: T): Promise<void>
	subscribe(event: Constructable<T>, callback: EventSubscriptionCallback<T>): void
}

export interface IDomainEventFactory<T extends IEvent = DomainEvent> {
	build(serializedEvent: JsonizableInterface): T;
	getDomainEventType(): Constructable<T>;
}

export abstract class DomainEvent implements IEvent {
	abstract serialize(): JsonizableInterface;
}