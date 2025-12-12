import { locations } from '#constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer'

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
    immer((set) => ({
        activeLocationStore: DEFAULT_LOCATION,

        setActiveLocation: (location = null) => 
            set((state)  => {
                state.activeLocation = location
            }),

        resetActiveLocaiton: () => set((state) => {
            state.activeLocation = null
        })
    })),
)

export default useLocationStore