import { totalDaysState } from './../../state/atoms/TotalDaysState';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    'https://blueberry-icecream-72593-21698fe61654.herokuapp.com/calc'
  );
  const data = await response.json();
  res.status(200).json({ data: data });
}
