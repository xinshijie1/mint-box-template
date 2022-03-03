"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const ERC20__factory_1 = require("./ERC20__factory");
const types_1 = require("./types");
class Contracts {
    constructor() {
        this.delegatePay = '0x4C7de9e14eeF1aCDfaE61978b4E6Abe14396fe27';
        // DAI
        this.dai = '0x2d2C8ab3A4006823260F862FF042b8cFDBcCE0C7';
        this.ERC721SingleCollectionUpgradeableImp = '0x0983E291FA08533a64Dd1DA684855A47A6F8c798';
        this.ERC721MultiCollectionUpgradeableImp = '0x56D79876ce91b75e6124538e4787D12BC896a076';
        this.ERC1155SingleCollectionUpgradeableImp = '0xC8965f3F140BcD234Bdd57d2b2017AA4C49C9195';
        this.ERC721SingleCollectionFactoryAddress = '0xD456604cC5D3b7994bFDbE8879371C1a7aEF4072';
        this.ERC721MultipleCollectionFactoryAddress = '0xd21BAA82784D83Ac35b1e8315Ec52e228CCD3f88';
        this.ERC1155SingleCollectionFactoryAddress = '0x5078446e9F5D4d76184fe68dCE4F57C586802e22';
    }
    get provider() {
        if (!window.ethereum) {
            throw 'no ethereum plugin';
        }
        return new ethers_1.providers.Web3Provider(window.ethereum);
    }
    get signer() {
        return this.provider.getSigner();
    }
    ERC20(addr) {
        return ERC20__factory_1.ERC20__factory.connect(addr, this.provider);
    }
    ERC721SingleCollectionUpgradeable(addr) {
        return types_1.ERC721SingleCollectionUpgradeable__factory.connect(addr, this.provider);
    }
    ERC721MultiCollectionUpgradeable(addr) {
        return types_1.ERC721MultiCollectionUpgradeable__factory.connect(addr, this.provider);
    }
    ERC1155SingleCollectionUpgradeable(addr) {
        return types_1.ERC1155SingleCollectionUpgradeable__factory.connect(addr, this.provider);
    }
    get ERC721SingleCollectionFactory() {
        return types_1.ERC721SingleCollectionFactory__factory.connect(this.ERC721SingleCollectionFactoryAddress, this.provider);
    }
    get ERC721MultipleCollectionFactory() {
        return types_1.ERC721MultipleCollectionFactory__factory.connect(this.ERC721MultipleCollectionFactoryAddress, this.provider);
    }
    get ERC1155SingleCollectionFactory() {
        return types_1.ERC1155SingleCollectionFactory__factory.connect(this.ERC1155SingleCollectionFactoryAddress, this.provider);
    }
    get DelegatePay() {
        return types_1.DelegatePay__factory.connect(this.delegatePay, this.provider);
    }
}
const contracts = new Contracts();
exports.default = contracts;
