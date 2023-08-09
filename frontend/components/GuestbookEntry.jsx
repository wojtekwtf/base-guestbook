'use client';

import { useContractRead } from 'wagmi'
import BaseGuestbookABI from '../BaseGuestbookABI'
import { useEffect, useState } from 'react';

const GuestbookEntry = (props) => {

  const { data, isError, isLoading } = useContractRead({
    address: '0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35',
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
      <p>{data}</p>
    </div>
  );
};

export default GuestbookEntry;