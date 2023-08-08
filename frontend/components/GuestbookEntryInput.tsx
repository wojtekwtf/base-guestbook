'use client';

import { useState } from 'react';

import { usePrepareContractWrite, useContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import BaseGuestbookABI from '../BaseGuestbookABI'

const GuestbookEntry = () => {

  const [entry, setEntry] = useState<string>('');
  const { address, connector, isConnected } = useAccount()

  /* @ts-ignore */
  const { config } = usePrepareContractWrite({
    address: '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
    abi: BaseGuestbookABI,
    functionName: 'safeMint',
    args: [address, entry],
  })

  const { data, write } = useContractWrite(config)

  const submitEntry = () => {
    write?.()
  }

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className="flex flex-col">
      <input onChange={(e) => setEntry(e.target.value)} className='w-[360px] border border-gray-800 rounded-md px-2 py-2 focus:outline-none mb-4' type="text" placeholder="Write your entry" />
      <button disabled={!write || isLoading} onClick={() => submitEntry()} className='px-4 py-2 bg-blue-600 w-[100px] rounded-lg shadow text-gray-200 mx-auto hover:bg-blue-500 hover:shadow-md duration-150 font-medium'>{isLoading ? 'Minting...' : 'Mint'}</button>
      {isSuccess && (
        <div>
          Successfully minted your NFT! Tx: {data?.hash}
        </div>
      )}
    </div>
  );
};

export default GuestbookEntry;
