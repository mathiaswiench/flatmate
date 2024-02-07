import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Heading1, Heading4 } from '../components/general/Heading';
import Modal from '@/components/Modal/Modal';
import router from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { totalDaysState } from '@/state/atoms/TotalDaysState';
import { useNotificationContext } from '../contexts/NotificationProvider';
import NotificationAction from '../reducer/notificationAction';
import Button from '@/components/general/Button';

const Calculate = () => {
  const [totalDays, setTotalDays] = useRecoilState(totalDaysState);
  console.log(totalDays);

  const [name, setName] = useState('');
  const formular = useRef<HTMLFormElement>(null);
  const [expenditure, setExpenditure] = useState('');
  const [daysAbsent, setDaysAbsent] = useState('');
  const [dailyCostPerPerson, setDailyCostPerPerson] = useState('');
  const [totalExpenditure, setTotalExpenditure] = useState('');
  const [settlements, setSettlements] = useState([]);
  const { notify } = useNotificationContext();

  const flatmates = useRef(new Array());

  const addFlatmate = () => {
    flatmates.current.push({
      name: name,
      expenditure: expenditure,
      absent_days: daysAbsent,
    });
    notify(NotificationAction.SUCCESS, 'Flatmate added');
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
    const response = await fetch('http://localhost:8080/calc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total_days: totalDays,
        flatmates: flatmates.current,
      }),
    });
    if (response.ok) {
      response.json().then((data: any) => {
        if (data) {
          console.log(data);
          setDailyCostPerPerson(data['daily_cost_per_person']);
          setTotalExpenditure(data['total_expenditure']);
          let settlements: string[] = [];
          settlements = data['settlements'];
          settlements.map((settlement: any) => settlements.push(settlement));
        }
      });
    }
  };
  const jumpBack = () => {
    router.push('/');
  };
  const print = () => {
    console.log(dailyCostPerPerson);
    console.log(totalExpenditure);
    console.log(settlements);
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
        <Button onClick={() => jumpBack()}>Back</Button>
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
          <div></div>
          <p>Total Expenditure: {totalExpenditure} €</p>
          <p>Daily Cost per Person: {dailyCostPerPerson} €</p>
          <br />
          <p className='font-semibold'>Who owes whom?</p>
          <div>
            {settlements.map((settlement) => (
              <p key={settlements.indexOf(settlement)}>{settlement} €</p>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Calculate;
