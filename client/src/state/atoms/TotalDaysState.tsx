import { atom } from 'recoil';

export const totalDaysState = atom({
  key: 'totalDaysState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
