type TransferResponse = {
  hash: string;
  nonce: number;
  gasLimit: bigint;
};

export interface IContractService {
  getBalance(eoa: string): Promise<bigint>;
  transfer(eoa: string, amount: string): Promise<TransferResponse>;
}
