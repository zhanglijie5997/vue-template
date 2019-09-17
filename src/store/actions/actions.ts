import types from '../types/types';
// const [types.TOKEN] =  () => {

// }
interface Commit {
    // tslint:disable-next-line:ban-types
    commit: Function
}

export default {
    [types.TOKEN]: async ({ commit }: Commit, state: string = '') => {
        await commit(types.TOKEN , state)
    }
}