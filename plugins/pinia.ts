import { useStore } from '~/stores';

export default defineNuxtPlugin(({ $pinia }: any) => {
  return {
    provide: {
      store: useStore($pinia),
    },
  };
});