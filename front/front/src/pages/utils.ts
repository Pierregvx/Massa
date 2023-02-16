import { IAccount, Client, Args, ICallData, IEventFilter, IEvent, EOperationStatus } from "@massalabs/massa-web3";
// add dotenv to load env variables
const chalk = require("chalk");
export const baseAccount = {
    address: 'A12e97Ywxm2XXhWPRPgPpFH42hz9PTM3swie1L9ZdJ256vmUhkrV',
    secretKey: 'S127JMNMntDKS5d6p4EzERm5TLmpnXCjq6noMQbeAMpQqCQcHugj',
    publicKey: "P1ZLPkSszVMLjjcgkGEPYAdPpxYHUnN2o1GLvNDyMmjUVu9FQnr"
} as IAccount;
export const contractAddress = "A12AEbPUcNeUWZtC7Fo7Y8YW8MPSFBeUpYs5sMFKmDTMo2Ue2re8";
async function awaitTxConfirmation(web3Client: Client, deploymentOperationId: string): Promise<void> {
    console.log(`Awaiting ${chalk.green("FINAL")} transaction status....`);
    let status: EOperationStatus;
    try {
        status = await web3Client.smartContracts().awaitRequiredOperationStatus(deploymentOperationId, EOperationStatus.FINAL);
        console.log(`Transaction with Operation ID ${chalk.yellow(deploymentOperationId)} has reached finality!`);
    } catch (ex) {
        const msg = chalk.red(`Error getting finality of transaction ${chalk.yellow(deploymentOperationId)}`);
        console.error(msg);
        throw new Error(ex);
    }

    if (status !== EOperationStatus.FINAL) {
        const msg = chalk.red(`Transaction ${chalk.yellow(deploymentOperationId)} did not reach finality after considerable amount of time. Try redeploying anew`);
        console.error(msg);
        throw new Error(msg);
    }
}
export async function increment(web3Client: Client, scAddress: string) {
    const data: string = await web3Client.smartContracts().callSmartContract({
        fee: 10,
        maxGas: 200000,
        coins: 10,
        targetAddress: scAddress,
        functionName: "Increment",
        parameter: (new Args()).serialize(), // this is based on input arguments
    } as ICallData, baseAccount);
    await awaitTxConfirmation(web3Client, data);
    await getEvent(web3Client);
    return data;
}

export async function init(web3Client: Client, scAddress: string) {
    const data: string = await web3Client.smartContracts().callSmartContract({
        fee: 10,
        maxGas: 200000,
        coins: 10,
        targetAddress: scAddress,
        functionName: "init",
        parameter: (new Args()).serialize(), // this is based on input arguments
    } as ICallData, baseAccount);
    await awaitTxConfirmation(web3Client, data);
    await getEvent(web3Client);
    return data;
}
// same as increment but with trigger_value
export async function trigger_value(web3Client: Client, scAddress: string) {
    const data: string = await web3Client.smartContracts().callSmartContract({
        fee: 0,
        maxGas: 200000,
        coins: 1,
        targetAddress: scAddress,
        functionName: "trigger_value",
        parameter: (new Args()).serialize(), // this is based on input arguments
    } as ICallData, baseAccount);
    await awaitTxConfirmation(web3Client, data);
    await getEvent(web3Client);
    return data;
}

export const getEvent = async (web3Client: Client) => {

    const eventsFilter = {
        start: null,
        end: null,
        original_caller_address:
            contractAddress,
        original_operation_id: null,
        emitter_address: null,
    } as IEventFilter;

    const filteredEvents: Array<IEvent> = await web3Client.smartContracts().getFilteredScOutputEvents(eventsFilter);
    console.log("filteredEvents", filteredEvents);

};
