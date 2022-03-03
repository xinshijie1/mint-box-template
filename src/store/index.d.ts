import Vuex from 'vuex';
export declare const UPDATE_ACCOUNT = "update-account";
export declare const UPDATE_CHAINID = "update-chainId";
interface AccountState {
    account: string;
    chainId: string;
}
declare class InvoiceStore extends Vuex.Store<AccountState> {
    constructor();
    init(state: AccountState): void;
}
declare const store: InvoiceStore;
export default store;
