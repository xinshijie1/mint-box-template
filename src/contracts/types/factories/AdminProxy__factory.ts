/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BytesLike,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AdminProxy, AdminProxyInterface } from "../AdminProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "imp",
        type: "address",
      },
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000e0b38038062000e0b833981016040819052620000349162000497565b82816200006360017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd620005c6565b60008051602062000dc4833981519152146200008f57634e487b7160e01b600052600160045260246000fd5b6200009d82826000620000b4565b50620000ab905082620000f1565b5050506200062f565b620000bf836200014c565b600082511180620000cd5750805b15620000ec57620000ea83836200018e60201b620001d41760201c565b505b505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6200011c620001bd565b604080516001600160a01b03928316815291841660208301520160405180910390a16200014981620001f6565b50565b6200015781620002ab565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6060620001b6838360405180606001604052806027815260200162000de4602791396200034e565b9392505050565b6000620001e760008051602062000da483398151915260001b6200043460201b620002001760201c565b546001600160a01b0316905090565b6001600160a01b038116620002615760405162461bcd60e51b815260206004820152602660248201527f455243313936373a206e65772061646d696e20697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b806200028a60008051602062000da483398151915260001b6200043460201b620002001760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b620002c1816200043760201b620002031760201c565b620003255760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840162000258565b806200028a60008051602062000dc483398151915260001b6200043460201b620002001760201c565b60606200035b8462000437565b620003b85760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840162000258565b600080856001600160a01b031685604051620003d5919062000573565b600060405180830381855af49150503d806000811462000412576040519150601f19603f3d011682016040523d82523d6000602084013e62000417565b606091505b5090925090506200042a82828662000441565b9695505050505050565b90565b803b15155b919050565b6060831562000452575081620001b6565b825115620004635782518084602001fd5b8160405162461bcd60e51b815260040162000258919062000591565b80516001600160a01b03811681146200043c57600080fd5b600080600060608486031215620004ac578283fd5b620004b7846200047f565b9250620004c7602085016200047f565b60408501519092506001600160401b0380821115620004e4578283fd5b818601915086601f830112620004f8578283fd5b8151818111156200050d576200050d62000619565b604051601f8201601f19908116603f0116810190838211818310171562000538576200053862000619565b8160405282815289602084870101111562000551578586fd5b62000564836020830160208801620005ea565b80955050505050509250925092565b6000825162000587818460208701620005ea565b9190910192915050565b6000602082528251806020840152620005b2816040850160208701620005ea565b601f01601f19169190910160400192915050565b600082821015620005e557634e487b7160e01b81526011600452602481fd5b500390565b60005b8381101562000607578181015183820152602001620005ed565b83811115620000ea5750506000910152565b634e487b7160e01b600052604160045260246000fd5b610765806200063f6000396000f3fe6080604052600436106100385760003560e01c80633659cfe61461004f5780634f1ef2861461006f5780638f2839701461008257610047565b36610047576100456100a2565b005b6100456100a2565b34801561005b57600080fd5b5061004561006a3660046105c0565b6100b4565b61004561007d3660046105da565b610113565b34801561008e57600080fd5b5061004561009d3660046105c0565b610193565b6100b26100ad61020d565b61021c565b565b6100bc610240565b6001600160a01b0316336001600160a01b0316146100f55760405162461bcd60e51b81526004016100ec906106a7565b60405180910390fd5b61011081604051806020016040528060008152506000610273565b50565b61011b610240565b6001600160a01b0316336001600160a01b03161461014b5760405162461bcd60e51b81526004016100ec906106a7565b61018e8383838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525060019250610273915050565b505050565b61019b610240565b6001600160a01b0316336001600160a01b0316146101cb5760405162461bcd60e51b81526004016100ec906106a7565b6101108161029e565b60606101f98383604051806060016040528060278152602001610709602791396102f2565b9392505050565b90565b803b15155b919050565b60006102176103cd565b905090565b3660008037600080366000845af43d6000803e80801561023b573d6000f35b3d6000fd5b60007fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035b546001600160a01b0316905090565b61027c836103f5565b6000825111806102895750805b1561018e5761029883836101d4565b50505050565b7f7e644d79422f17c01e4894b5f4f588d331ebfa28653d42ae832dc59e38c9798f6102c7610240565b604080516001600160a01b03928316815291841660208301520160405180910390a161011081610435565b60606102fd84610203565b6103585760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016100ec565b600080856001600160a01b0316856040516103739190610658565b600060405180830381855af49150503d80600081146103ae576040519150601f19603f3d011682016040523d82523d6000602084013e6103b3565b606091505b50915091506103c38282866104de565b9695505050505050565b60007f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc610264565b6103fe81610517565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b6001600160a01b03811661049a5760405162461bcd60e51b815260206004820152602660248201527f455243313936373a206e65772061646d696e20697320746865207a65726f206160448201526564647265737360d01b60648201526084016100ec565b807fb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d61035b80546001600160a01b0319166001600160a01b039290921691909117905550565b606083156104ed5750816101f9565b8251156104fd5782518084602001fd5b8160405162461bcd60e51b81526004016100ec9190610674565b61052081610203565b6105825760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016100ec565b807f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc6104bd565b80356001600160a01b038116811461020857600080fd5b6000602082840312156105d1578081fd5b6101f9826105a9565b6000806000604084860312156105ee578182fd5b6105f7846105a9565b9250602084013567ffffffffffffffff80821115610613578384fd5b818601915086601f830112610626578384fd5b813581811115610634578485fd5b876020828501011115610645578485fd5b6020830194508093505050509250925092565b6000825161066a8184602087016106dc565b9190910192915050565b60006020825282518060208401526106938160408501602087016106dc565b601f01601f19169190910160400192915050565b6020808252818101527f41646d696e50726f78793a206f6e6c792061646d696e2063616e2063616c6c2e604082015260600190565b60005b838110156106f75781810151838201526020016106df565b83811115610298575050600091015256fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a264697066735822122000e673fff828283fe7c6d892b16ce35f149376142a5e5b2aabf5941aa14e13c764736f6c63430008020033b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";

export class AdminProxy__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    imp: string,
    admin: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AdminProxy> {
    return super.deploy(
      imp,
      admin,
      data,
      overrides || {}
    ) as Promise<AdminProxy>;
  }
  getDeployTransaction(
    imp: string,
    admin: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(imp, admin, data, overrides || {});
  }
  attach(address: string): AdminProxy {
    return super.attach(address) as AdminProxy;
  }
  connect(signer: Signer): AdminProxy__factory {
    return super.connect(signer) as AdminProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AdminProxyInterface {
    return new utils.Interface(_abi) as AdminProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AdminProxy {
    return new Contract(address, _abi, signerOrProvider) as AdminProxy;
  }
}