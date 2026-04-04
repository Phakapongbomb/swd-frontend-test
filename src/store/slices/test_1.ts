import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardImgProps } from '@/types/test_1';

interface StateTest_1 {
    listCard: CardImgProps[]
    layout: 'layout1' | 'layout2'
}

const initialState: StateTest_1 = {
    listCard: [
        {
            geometry: 'squareShape',
        },
        {
            geometry: 'circle',
        },
        {
            geometry: 'ovalShape',
        },
        {
            geometry: 'trapezoidShape',
        },
        {
            geometry: 'squareShape',
        },
        {
            geometry: 'parallelogramShape',
        },
    ],
    layout: 'layout1'
};

export const StateTest_1 = createSlice({
    name: 'stateTest_1',
    initialState,
    reducers: {
        prveImg: (state) => {
            if (state.listCard.length > 0) {
                const firstItme = state.listCard.shift()
                if (firstItme) {
                    state.listCard.push(firstItme)
                }
            }
        },
        nextImg: (state) => {
            if (state.listCard.length > 0) {
                const lastItem = state.listCard.pop()
                if (lastItem) {
                    state.listCard.unshift(lastItem)
                }
            }
        },
        changeLayout: (state) => {
            if (state.layout === 'layout1') {
                state.layout = 'layout2'
            } else {
                state.layout = 'layout1'
            }
        },
        randomPosition: (state, action: PayloadAction<number>) => {
            const index = action.payload
            const list = state.listCard

            if (index < 0 || index >= list.length) return

            const [itemRandom] = list.splice(index, 1)

            let newIndex = Math.floor(Math.random() * list.length + 1)

            if (newIndex === index) {
                newIndex = Math.floor(Math.random() * list.length + 1)
            }

            list.splice(newIndex, 0, itemRandom)
        }
    },
});

export const { prveImg, nextImg, changeLayout, randomPosition } = StateTest_1.actions;
export default StateTest_1.reducer;