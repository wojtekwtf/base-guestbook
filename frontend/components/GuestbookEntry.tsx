'use client';

import type { NextPage } from 'next';
import { useState } from 'react';

const GuestbookEntry: NextPage = () => {

  const [entry, setEntry] = useState<string>('');

  const submitEntry = () => {
    alert(entry);
  }

  return (
    <div className="flex flex-col">
      <input onChange={(e) => setEntry(e.target.value)} className='w-[360px] border border-gray-800 rounded-md px-2 py-2 focus:outline-none mb-4' type="text" placeholder="Write your entry" />
      <button onClick={() => submitEntry()} className='px-4 py-2 bg-blue-600 w-[100px] rounded-lg shadow text-gray-200 mx-auto hover:bg-blue-500 hover:shadow-md duration-150 font-medium'>Submit</button>
    </div>
  );
};

export default GuestbookEntry;
