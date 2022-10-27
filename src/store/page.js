import { defineStore } from "pinia";

export const usePageStore = defineStore('page', {
    state: () => ({
        isPageLoading: false,
    }),
    actions: {
        setPageLoadingState(state) {
            this.isPageLoading = state;
        }
    }
})