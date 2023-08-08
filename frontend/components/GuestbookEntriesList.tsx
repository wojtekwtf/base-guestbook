'use client';

import { useContractRead } from 'wagmi'
import BaseGuestbookABI from '../BaseGuestbookABI'
import { useEffect, useState } from 'react';
import GuestbookEntryInput from './GuestbookEntryInput';
import GuestbookEntry from './GuestbookEntry';

const GuestbookEntriesList = () => {

  const [totalSupply, setTotalSupply] = useState<number>(0)

  const { data, isError, isLoading } = useContractRead({
    address: '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
    abi: BaseGuestbookABI,
    functionName: 'totalSupply',
  })

  useEffect(() => {
    if (!isLoading && !isError) {
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
