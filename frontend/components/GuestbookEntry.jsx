'use client';

import { useContractRead } from 'wagmi'
import BaseGuestbookABI from '../BaseGuestbookABI'
import { useEffect, useState } from 'react';

const GuestbookEntry = (props) => {

  const { data, isError, isLoading } = useContractRead({
    address: '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
    abi: BaseGuestbookABI,
    functionName: 'tokenURI',
    args: [props.tokenId]
  })

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(data)
    }
  }, [isLoading])

  return (
    <div>
      <p>{props.tokenId}</p>
    </div>
  );
};

export default GuestbookEntry;