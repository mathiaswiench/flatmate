import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Heading1, Heading4 } from '../components/general/Heading';
import router from 'next/router';
import Link from 'next/link';
import { atom, useRecoilState } from 'recoil';
import { totalDaysState } from '@/state/atoms/TotalDaysState';
import Button from '@/components/general/Button';

const Index = () => {
  const [totalDays, setTotalDays] = useRecoilState(totalDaysState);

  const jumpToCalc = () => {
    router.push('/calculate');
  };

  return (
    <div className='px-20'>
      <Heading1>Flatmate 3.0</Heading1>
      <form>
        {/* Number of Days */}
        <label>Please enter number of days:</label>
        <input
          type='text'
          onChange={(e) => setTotalDays(e.target.value)}
          className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
      </form>
      <div className='pt-5'>
        <Button onClick={() => jumpToCalc()}>Next</Button>
      </div>
    </div>
  );
};

export default Index;
