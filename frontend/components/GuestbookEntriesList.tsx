'use client';

import { useContractRead } from 'wagmi'
import BaseGuestbookABI from '../BaseGuestbookABI'
import { useEffect, useState } from 'react';
import GuestbookEntry from './GuestbookEntry';

const GuestbookEntriesList = () => {

  const [totalSupply, setTotalSupply] = useState<number>(0)

  const { data, isError, isLoading } = useContractRead({
    address: '0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35',
    abi: BaseGuestbookABI,
    functionName: 'totalSupply',
  })

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(Number(data))
      setTotalSupply(Number(data))
    }
  }, [data])

  return (
    <div>
      <p>total suply</p>
      {[...Array(totalSupply)].map((e, i) => (<GuestbookEntry key={i} tokenId={i} />))}
    </div>
  );
};

export default GuestbookEntriesList;
