import { RootState, useStore } from '@react-three/fiber';
import { StoreApi, UseBoundStore } from 'zustand';

export const R3FRef: { current: UseBoundStore<StoreApi<RootState>> | null } = { current: null };

const R3FStoreProvider = () => {
  // @ts-ignore
  R3FRef.current = useStore();

  return null;
};

export default R3FStoreProvider;
