import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetail {
    [key: string]: string | number | string[] | null | undefined;
    index: number | null
    title: string
    firstName: string
    LastName: string
    birthday: string
    nationality: string
    citizenID?: string[]
    gender: string
    mobilePhone: string
    mobilePhoneCountry: string
    passport?: string
    expectedSalary: string
}

interface StateTest_3 {
    form: UserDetail
    listData: UserDetail[]
    currentPage: number
    pageSize: number
    selectedIndex: number[]
}

interface FormValue {
    value: string
    name: string
}

const initialState: StateTest_3 = {
    form: {
        index: null,
        title: '',
        firstName: '',
        LastName: '',
        birthday: '',
        nationality: '',
        citizenID: [],
        gender: '',
        mobilePhone: '',
        mobilePhoneCountry: '',
        passport: '',
        expectedSalary: '',
    },
    listData: [],
    currentPage: 1,
    pageSize: 10,
    selectedIndex: []
};

export const StateTest_3 = createSlice({
    name: 'stateTest_3',
    initialState,
    reducers: {
        inputForm: (state, action: PayloadAction<FormValue>) => {
            const { value, name } = action.payload
            const form = state.form

            if (name === 'index') return

            const key = name as keyof UserDetail
            form[key] = value
        },
        submitAction: (state, action: PayloadAction<UserDetail>) => {
            const data = action.payload
            state.listData.push(data)
        },
        resetAction: (state) => {
            state.form = initialState.form
        },
        deleteAction: (state, action: PayloadAction<number | number[]>) => {
            const indexDelete = action.payload
            if (Array.isArray(indexDelete)) {
                state.listData = state.listData.filter((_, index) => !indexDelete.includes(index))
            } else {
                state.listData = state.listData.filter((_, index) => indexDelete !== index)
            }
            state.selectedIndex = []
        },
        loadDataStorage: (state, action: PayloadAction<[]>) => {
            const data = action.payload
            state.listData = data
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        selectAll: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.selectedIndex = state.listData.map((_, i) => i)
            } else {
                state.selectedIndex = []
            }
        },
        selectItem: (state, action: PayloadAction<number>) => {
            const index = action.payload
            if (state.selectedIndex.includes(index)) {
                state.selectedIndex = state.selectedIndex.filter(i => i !== index)
            } else {
                state.selectedIndex.push(index)
            }
        }
    },
});

export const { 
    inputForm, 
    submitAction, 
    resetAction, 
    deleteAction, 
    loadDataStorage, 
    setPage, 
    selectAll,
    selectItem
} = StateTest_3.actions;
export default StateTest_3.reducer;