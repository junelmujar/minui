/* Event manager for MINUI. Converted to ES6 and inspired by Howard Rauscher code */

/* EventManager
 * Copyright (c) 2009, Howard Rauscher
 * Licensed under the MIT License
 * URL: https://gist.github.com/howardr/118668/ecd43be756079494f85d303ef69e9e04ef72031e
 */

const EventManager = (() => {

    class EventArg {
        constructor(name, data) {
            this.name = name;
            this.data = data;
            this.cancelled = false;
            this.removed = false;
        }
        cancel() {
            this.cancelled = true;
        }
        remove() {
            this.removed = true;
        }    
    }

    class EventManager {
        
        constructor() {
            this.listeners = {};    
        }

        addListener(name, fn) {
            (this.listeners[name] = this.listeners[name] || []).push(fn);
            return this;
        }

        fire(name, args) {
            var listeners = this.listeners[name];
            args = args || [];
            if(listeners !== undefined) {
                var data = {}, evt;
                for(var i = 0, len = listeners.length; i < len; i++) {
                    evt = new EventArg(name, data);
                    
                    listeners[i].apply(window, args.concat(evt));
                    
                    data = evt.data;
                    if(evt.removed) {
                        listeners.splice(i, 1);
                        len = listeners.length;
                        --i;
                    }
                    if(evt.cancelled) {
                        break;
                    }
                }
            }
            return this;
        }
  
        eventify(object, manager) {
            manager = manager || new EventManager();
            object.addListener = function() {
                manager.addListener.apply(manager, arguments);
            };
            object.fire = function() {
                manager.fire.apply(manager, arguments);
            };
            return manager;
        }


    }

    window.EventManager = EventManager;

    return EventManager;
})();

export default EventManager;