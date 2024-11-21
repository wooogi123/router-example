import { computed, defineComponent, h, inject, reactive, watch } from 'vue';

import type { History } from '@router-example/history';
import type { App, Component, DefineComponent } from 'vue';

const ROUTER_INJECT_SYMBOL = 'router';

export interface Route {
  path: string;
  Component: Component | DefineComponent;
}

// ---

interface LinkProps {
  to: string;
}

export const Link = defineComponent<LinkProps>({
  name: 'Link',
  props: {
    to: String,
  },
  setup(props, { slots }) {
    const router = inject(ROUTER_INJECT_SYMBOL) as Router;

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      router.push(props.to);
    };

    return () => {
      return h(
        'a',
        {
          href: props.to,
          onClick: handleClick,
        },
        slots,
      );
    };
  },
});

// ---

export const RouterView = defineComponent({
  setup() {
    const router = inject(ROUTER_INJECT_SYMBOL) as Router;

    const currentLocation = reactive({ current: router.location });

    watch(
      () => router.location,
      (newLocation) => {
        currentLocation.current = newLocation;
      },
    );

    const render = computed(() => {
      const route = router.routes.find(
        (route) => route.path === currentLocation.current,
      );

      return route?.Component ?? null;
    });

    return () => {
      if (render.value === null) return;
      return h(render.value);
    };
  },
});

// ---

interface RouterParams {
  routes: Route[];
  history: History;
}

interface Router extends History {
  routes: Route[];
  install(app: App): void;
}

export const createRouter = ({ routes, history }: RouterParams): Router => {
  return {
    get stack() {
      return history.stack;
    },
    get location() {
      return history.location;
    },

    push: history.push,
    replace: history.replace,

    go: history.go,

    addListener: history.addListener,

    routes,
    install(app) {
      const router = this;

      app.component('Link', Link);
      app.component('RouterView', RouterView);

      app.config.globalProperties.$router = router;

      app.provide(ROUTER_INJECT_SYMBOL, router);
    },
  };
};
