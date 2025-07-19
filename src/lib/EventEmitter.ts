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
