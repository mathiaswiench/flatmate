import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Heading1, Heading4 } from '../components/general/Heading';
import Modal from '../components/Modal/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { totalDaysState } from '../state/atoms/TotalDaysState';
import Button from '../components/general/Button';
import Link from 'next/link';
import { number } from 'prop-types';

const Calculate = () => {
  const [totalDays, setTotalDays] = useRecoilState(totalDaysState);

  const [name, setName] = useState('');
  const formular = useRef<HTMLFormElement>(null);
  const [expenditure, setExpenditure] = useState('');
  const [daysAbsent, setDaysAbsent] = useState('');
  const [dailyCostPerPerson, setDailyCostPerPerson] = useState('');
  const [totalExpenditure, setTotalExpenditure] = useState('');
  const [debts, setDebts] = useState<string[]>([]);

  const flatmates = useRef(new Array());

  const addFlatmate = () => {
    flatmates.current.push({
      name: name,
      expenditure: expenditure,
      absent_days: daysAbsent,
    });
    if (formular.current) {
      const form = formular.current as HTMLFormElement;
      form.reset();
    }
  };

  const openModal = () => {
    const modal = document.getElementById('modal-dialog') as HTMLDialogElement;
    modal.showModal();
  };

  const callBackend = async () => {
    const response = await fetch(
      'https://blueberry-icecream-72593-21698fe61654.herokuapp.com/calc',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total_days: totalDays,
          flatmates: flatmates.current,
        }),
      }
    );
    if (response.ok) {
      response.json().then((data: any) => {
        if (data) {
          setDailyCostPerPerson(data['daily_cost_per_person']);
          setTotalExpenditure(data['total_expenditure']);
          setDebts((currentDebts) => [...currentDebts, ...data['settlements']]);
        }
      });
    }
  };

  const print = () => {
    console.log(totalDays);
    console.log(name);
    // console.log(debts);
  };

  return (
    <div className='px-20'>
      <Heading1>Flatmate 3.0</Heading1>
      <form id='flatmate_form' ref={formular}>
        {/* Number of Days */}

        {/* Flatmates */}
        {/* Name */}
        <div className='mt-5'>
          <label>Name:</label>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
            className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>

        {/* Expenditure */}
        <div className='mt-5'>
          <label>Expenditure:</label>
          <input
            type='number'
            onChange={(e) => setExpenditure(e.target.value)}
            className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>

        {/* Days Absent */}
        <div className='mt-5'>
          {' '}
          <label>Days Absent:</label>
          <input
            type='number'
            onChange={(e) => setDaysAbsent(e.target.value)}
            className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
      </form>
      <div className='flex gap-4 mt-5'>
        <Link href='/'>
          <Button>Back</Button>
        </Link>{' '}
        <Button onClick={() => addFlatmate()}>Add</Button>
        <Button
          onClick={() => {
            callBackend();
            openModal();
          }}
        >
          Submit
        </Button>
        <Modal>
          <div>
            <p>Total Expenditure: {totalExpenditure} €</p>
            <p>Daily Cost per Person: {dailyCostPerPerson} €</p>
            <br />
            <p className='font-semibold'>Who owes whom?</p>
            <div>
              {debts.map((debt) => (
                <p key={debts.indexOf(debt)}>{debt} €</p>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Calculate;
