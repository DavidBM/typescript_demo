import {Constructable} from './interfaces';
import {DomainEvent, EventSubscriptionCallback, IEventBus} from './EventBusInterfaces';
export {DomainEvent, IDomainEventFactory} from './EventBusInterfaces';

export class EventBus<T = DomainEvent> implements IEventBus<T> {
	subscriptions: WeakMap<Constructable<T>, Set<EventSubscriptionCallback<T>>>

	constructor() {
		this.subscriptions = new WeakMap();
	}

	publish(event: T): Promise<void> {
		const callbacks = this.subscriptions.get(event.constructor as Constructable<T>);

		if(!callbacks) return Promise.resolve()

		callbacks.forEach(callback => callback(event));

		return Promise.resolve();
	}

	subscribe(eventType: Constructable<T>, callback: EventSubscriptionCallback<T>): void {
		var callbacksSet = this.subscriptions.get(eventType as Constructable<T>);

		if(!callbacksSet) callbacksSet = new Set();

		callbacksSet.add(callback);

		this.subscriptions.set(eventType as Constructable<T>, callbacksSet);
	}
}

export default EventBus;
