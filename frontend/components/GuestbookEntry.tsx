'use client';

import type { NextPage } from 'next';
import { useState } from 'react';

import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi'
import BaseGuestbookABI from '../BaseGuestbookABI'

const GuestbookEntry: NextPage = () => {

  const [entry, setEntry] = useState<string>('');
  const { address, connector, isConnected } = useAccount()

  /* @ts-ignore */
  const { config } = usePrepareContractWrite({
    address: '0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35',
    abi: BaseGuestbookABI,
    functionName: 'safeMint',
    args: [address, entry],
  })

  const { write } = useContractWrite(config)

  const submitEntry = () => {
    write?.()
  }

  return (
    <div className="flex flex-col">
      <input onChange={(e) => setEntry(e.target.value)} className='w-[360px] border border-gray-800 rounded-md px-2 py-2 focus:outline-none mb-4' type="text" placeholder="Write your entry" />
      <button onClick={() => submitEntry()} className='px-4 py-2 bg-blue-600 w-[100px] rounded-lg shadow text-gray-200 mx-auto hover:bg-blue-500 hover:shadow-md duration-150 font-medium'>Submit</button>
    </div>
  );
};

export default GuestbookEntry;
