/// <reference types="node" />
/// <reference types="node" />
import crypto from 'crypto';
import Wallet from 'ethereumjs-wallet';
interface V4Keystore {
    crypto: {
        kdf: {
            function: string;
            params: {
                dklen: number;
                n: number;
                r: number;
                p: number;
                salt: string;
            };
            message: string;
        };
        checksum: {
            function: string;
            params: any;
            message: string;
        };
        cipher: {
            function: string;
            params: {
                iv: string;
            };
            message: string;
        };
    };
    description: string;
    pubkey: string;
    path: string;
    uuid: string;
    version: number;
}
/**
 * Decrypt private key from key store data
 * Supports key store versions: v1, v3, v4
 *
 * Example of usage (Node env):
 *
 *  const keyStoreFilePath = path.join(process.cwd(), 'validator_keys', 'keystore.json');
 *  const keyStoreString: string = fs.readFileSync(keyStoreFilePath).toString();
 *  const keyStoreData = JSON.parse(keyStoreString);
 *  const keyStore = new EthereumKeyStore(keyStoreData);
 *  const password = 'testtest';
 *  console.log('Private Key:', await keyStore.getPrivateKey(password));
 */
declare class EthereumKeyStore {
    private readonly keyStoreData;
    private privateKey;
    private wallet;
    /**
     * Receive key store data from string or parsed JSON
     * @param keyStoreData
     */
    constructor(keyStoreData: string | never);
    getPublicKey(): string;
    /**
     * Decrypt private key using user password
     * @param password
     */
    getPrivateKey(password?: string): Promise<string>;
    /**
     * Import a wallet (Version 4 of the Ethereum wallet format).
     *
     * @param input A JSON serialized string, or an object representing V3 Keystore.
     * @param password The keystore password.
     */
    fromV4(input: string | V4Keystore, password: string): Promise<Wallet>;
    /**
     * @param cipher
     * @param data
     */
    protected runCipherBuffer(cipher: crypto.Cipher | crypto.Decipher, data: Buffer): Buffer;
    /**
     * Convert byte array to string
     * @param byteArray
     */
    static toHexString(byteArray: Uint8Array): string;
}
export default EthereumKeyStore;
