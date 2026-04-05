import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetail {
    [key: string]: string | number | string[] | null | undefined;
    title: string
    firstName: string
    lastName: string
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
    touched: Record<string, boolean>;
    typeSubmit: 'submit' | 'edit'
    indexEdit: number | null
}

interface FormValue {
    value: string | string[]
    name: string
}

const initialState: StateTest_3 = {
    form: {
        title: '',
        firstName: '',
        lastName: '',
        birthday: '',
        nationality: '',
        citizenID: ['', '', '', '', ''],
        gender: '',
        mobilePhone: '',
        mobilePhoneCountry: '',
        passport: '',
        expectedSalary: '',
    },
    listData: [],
    currentPage: 1,
    pageSize: 10,
    selectedIndex: [],
    touched: {},
    indexEdit: null,
    typeSubmit: 'submit'
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
            if (state.typeSubmit === 'edit') {
                const data = action.payload
                const indexEdit = state.indexEdit as number
                state.listData[indexEdit] = data
                state.typeSubmit = 'submit'
            } else {
                const data = action.payload
                state.listData.push(data)
            }
        },
        resetAction: (state) => {
            state.form = initialState.form
            state.indexEdit = initialState.indexEdit
            state.typeSubmit = initialState.typeSubmit
            state.touched = {};
        },
        deleteAction: (state, action: PayloadAction<number | number[]>) => {
            const indexDelete = action.payload
            if (Array.isArray(indexDelete)) {
                state.listData = state.listData.filter((_, index) => !indexDelete.includes(index))
            } else {
                state.listData = state.listData.filter((_, index) => indexDelete !== index)
            }
            state.selectedIndex = []

            const maxPages = Math.ceil(state.listData.length / state.pageSize) || 1;
            if (state.currentPage > maxPages) {
                state.currentPage = maxPages;
            }
        },
        loadDataStorage: (state, action: PayloadAction<UserDetail[]>) => {
            const data = action.payload;
            state.listData = data;

            const maxPages = Math.ceil(data.length / state.pageSize) || 1;
            if (state.currentPage > maxPages) {
                state.currentPage = maxPages;
            }
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
        },
        setFieldTouched: (state, action: PayloadAction<string>) => {
            state.touched[action.payload] = true;
        },
        editData: (state, action: PayloadAction<number>) => {
            const index = action.payload
            state.typeSubmit = 'edit'
            state.indexEdit = index
            state.form = state.listData[index]
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
    selectItem,
    setFieldTouched,
    editData
} = StateTest_3.actions;
export default StateTest_3.reducer;