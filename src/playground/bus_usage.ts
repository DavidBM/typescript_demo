import {DomainEvent, EventBus, IDomainEventFactory} from './EventBus'

class ConcreteEventFactory implements IDomainEventFactory {
	build(data: {}): ConcreteEvent {
		return new ConcreteEvent();
	}

	getDomainEventType() {
		return ConcreteEvent;
	}
}

class ConcreteEvent extends DomainEvent{
	serialize() {
		return {};
	}
}
class ConcreteEvent2 extends DomainEvent{
	serialize() {
		return {};
	}
}
class ConcreteEvent3 extends DomainEvent{
	serialize() {
		return {};
	}
}
class ConcreteEventChild extends ConcreteEvent{
	serialize() {
		return {};
	}
}
class ConcreteEventSubChils extends ConcreteEventChild{
	serialize() {
		return {};
	}
}

/*
ConcreteEvent2 {} 'ConcreteEvent2'
ConcreteEvent2 {} 'ConcreteEventChild'
ConcreteEvent {} 'ConcreteEvent'
*/

const bus = new EventBus();

bus.subscribe(ConcreteEvent, (event) => {console.log(event, 'ConcreteEvent')});
bus.subscribe(ConcreteEvent, (event) => {console.log(event, 'ConcreteEvent')});
bus.subscribe(ConcreteEvent2, (event) => {console.log(event, 'ConcreteEvent2')});
bus.subscribe(ConcreteEventChild, (event) => {console.log(event, 'ConcreteEventChild')});
bus.subscribe(ConcreteEvent, (event) => {console.log(event, 'ConcreteEvent')});
bus.subscribe(ConcreteEventChild, (event) => {console.log(event, 'ConcreteEventChild')});
bus.subscribe(ConcreteEventChild, (event) => {console.log(event, 'ConcreteEventChild')});
bus.subscribe(ConcreteEventChild, (event) => {console.log(event, 'ConcreteEventChild')});
bus.subscribe(ConcreteEvent2, (event) => {console.log(event, 'ConcreteEvent2')});
bus.subscribe(ConcreteEvent3, (event) => {console.log(event, 'ConcreteEvent3')});
bus.subscribe(ConcreteEvent2, (event) => {console.log(event, 'ConcreteEvent2')});
bus.subscribe(ConcreteEvent, (event) => {console.log(event, 'ConcreteEvent')});

//bus.publish(new ConcreteEventChild());
bus.publish(new ConcreteEvent2());
bus.publish(new ConcreteEvent2());
bus.publish(new ConcreteEventChild());
bus.publish(new ConcreteEvent3());
bus.publish(new ConcreteEvent3());
bus.publish(new ConcreteEvent3());
bus.publish(new ConcreteEvent2());
bus.publish(new ConcreteEvent());
bus.publish(new ConcreteEvent3());
bus.publish(new ConcreteEventChild());
bus.publish(new ConcreteEventChild());
bus.publish(new ConcreteEvent());
bus.publish(new ConcreteEvent3());
bus.publish(new ConcreteEvent3());

var concreteEventFactory = new ConcreteEventFactory();
concreteEventFactory.build({});