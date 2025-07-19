type Subscriber = { event: string; callback: (...args: any[]) => any };

class EventEmitter<T extends Subscriber> {
  private subscribers: T[] = [];

  on<E extends T["event"]>(
    event: E,
    callback: Extract<T, { event: E }>["callback"]
  ) {
    const subscriber = { event, callback } as Extract<T, { event: E }>;
    this.subscribers.push(subscriber);
    return () => this.off(event, callback);
  }

  emit<E extends T["event"]>(
    event: E,
    ...args: Parameters<Extract<T, { event: E }>["callback"]>
  ) {
    this.subscribers.forEach((subscriber) => {
      if (subscriber.event == event) {
        subscriber.callback(...args);
      }
    });
  }

  off<E extends T["event"]>(
    event: E,
    callback: Extract<T, { event: E }>["callback"]
  ) {
    this.subscribers.filter(
      (listener) => listener.event == event && listener.callback == callback
    );
  }
}

export default EventEmitter;

// interface NodeUpdateEvent {
//   event: 'node-update';
//   callback: (param: { nodeId: string }) => void
// }

// interface NodeDeleteEvent {
//   event: 'node-delete';
//   callback: () => void // so this one has different params to accept
// }

// type NodeEvents = NodeUpdateEvent | NodeDeleteEvent

// new EventEmitter<NodeEvents>()
