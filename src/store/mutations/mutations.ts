import types from '../types/types'
export default {
    [types.TOKEN]: (state: any, data: string) => {
        console.log(process.env.VUE_APP_URL)
        state.token = data;
    }
}