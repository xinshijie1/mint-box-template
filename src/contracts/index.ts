import { providers } from 'ethers'
import { ERC20__factory } from './ERC20__factory'
import {
	ERC721SingleCollectionUpgradeable__factory,
	ERC721MultiCollectionUpgradeable__factory,
	ERC1155SingleCollectionUpgradeable__factory,
	ERC721SingleCollectionFactory__factory,
	ERC721MultipleCollectionFactory__factory,
	ERC1155SingleCollectionFactory__factory,
	DelegatePay__factory,
} from './types'

class Contracts {

	public readonly delegatePay = '0x4C7de9e14eeF1aCDfaE61978b4E6Abe14396fe27'
	// DAI
	public readonly dai = '0x2d2C8ab3A4006823260F862FF042b8cFDBcCE0C7'

	public readonly ERC721SingleCollectionUpgradeableImp = '0x0983E291FA08533a64Dd1DA684855A47A6F8c798'
	public readonly ERC721MultiCollectionUpgradeableImp = '0x56D79876ce91b75e6124538e4787D12BC896a076'
	public readonly ERC1155SingleCollectionUpgradeableImp = '0xC8965f3F140BcD234Bdd57d2b2017AA4C49C9195'

	public readonly ERC721SingleCollectionFactoryAddress = '0xD456604cC5D3b7994bFDbE8879371C1a7aEF4072'
	public readonly ERC721MultipleCollectionFactoryAddress = '0xd21BAA82784D83Ac35b1e8315Ec52e228CCD3f88'
	public readonly ERC1155SingleCollectionFactoryAddress = '0x5078446e9F5D4d76184fe68dCE4F57C586802e22'

	public get provider(): providers.Web3Provider {
		if (!window.ethereum) {
			throw 'no ethereum plugin'
		}
		return new providers.Web3Provider(window.ethereum as any)
	}

	public get signer() {
		return this.provider.getSigner()
	}

	public ERC20(addr: string) {
		return ERC20__factory.connect(
			addr,
			this.provider
		)
	}

	public ERC721SingleCollectionUpgradeable(addr: string) {
		return ERC721SingleCollectionUpgradeable__factory.connect(
			addr,
			this.provider
		)
	}

	public ERC721MultiCollectionUpgradeable(addr: string) {
		return ERC721MultiCollectionUpgradeable__factory.connect(
			addr,
			this.provider
		)
	}

	public ERC1155SingleCollectionUpgradeable(addr: string) {
		return ERC1155SingleCollectionUpgradeable__factory.connect(
			addr,
			this.provider
		)
	}

	public get ERC721SingleCollectionFactory() {
		return ERC721SingleCollectionFactory__factory.connect(
			this.ERC721SingleCollectionFactoryAddress,
			this.provider
		)
	}

	public get ERC721MultipleCollectionFactory() {
		return ERC721MultipleCollectionFactory__factory.connect(
			this.ERC721MultipleCollectionFactoryAddress,
			this.provider
		)
	}

	public get ERC1155SingleCollectionFactory() {
		return ERC1155SingleCollectionFactory__factory.connect(
			this.ERC1155SingleCollectionFactoryAddress,
			this.provider
		)
	}

	public get DelegatePay() {
		return DelegatePay__factory.connect(this.delegatePay, this.provider)
	}

}

const contracts = new Contracts()
export default contracts