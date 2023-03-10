import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import {  increment, trigger_value, baseAccount, contractAddress, getEvent } from './utils';
import {
  ClientFactory,
  Client,
  DefaultProviderUrls} from "@massalabs/massa-web3";
import React from 'react';
// create a base account for signing transactions


async function createClient() {

  // create a base account for signing transactions
  // initialize a testnet client
  const client = await ClientFactory.createDefaultClient(
    DefaultProviderUrls.TESTNET,
    true,
    baseAccount
  );
  return client;

}

export default function Home() {
  const [client, setClient] = React.useState<Client>();
  const [inputNumber, setInputNumber] = React.useState<number>(0);
 
  React.useEffect(() => {
    createClient().then((client) => {
      setClient(client);
    });
  }, []);
  // set a variable event, a list of number that will take the value of getEvent
  const [event, setEvent] = React.useState<number[]>([]);
  // give him the value of getEvent
  React.useEffect(() => {
    console.log("client", client)
    if(client){getEvent(client).then((event) => {
      setEvent(event);
    });}
  }, [client]);

  


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

       
        {/* input that take a number and button that call increment with this number */}
        <form>
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => {
              setInputNumber(Number(e.target.value));
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (client) {
                increment(client, inputNumber).then((operationId) => {
                  console.log("operationId", operationId);
                });
              }
            }}
          >
            increment
          </button>
        </form>

        
        {/* display all events */}
        <div>
          {event.map((value, index) => {
            return <div key={index}>{value}</div>;
          })}
        </div>
        

        
       
        {/* button that call trigger_value */}
        <button onClick={() => {
          if (client) {
            trigger_value(client, contractAddress).then((operationId) => {
              console.log("operationId", operationId);
              // refresh the page
              window.location.reload();
            });
          }
        }}>trigger_value</button>
        

      </main>
    </>
  );
}
