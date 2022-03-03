declare type Format = {
    creator: string;
    uri: string;
}[];
declare type NewFormat = {
    uri: string;
    creator: string;
    proofs: string[];
};
interface MerkleInfo {
    merkleRoot: string;
    total: number;
    tokens: NewFormat[];
}
export declare function parseTokenMap(tokens: Format): MerkleInfo;
export {};
