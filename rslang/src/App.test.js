import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import CardTeam from './components/partials/CardTeam';
import {shuffle, calculatePercentResult} from './functions/math';
import { AuthService } from './services/auth.service';
import urls from './constants/urls';

const name='Mike';
const img=  './images/team/den.jpeg';
const position= 'Front-end developer';
const description= 'kjnjklnjlkjnlk';
const git= 'dzianiskor';

test('render card team', () => {
  const {container}  = render(<CardTeam name={name} img={img}
    position={position}
    description={description}
    git={git}/>);
  expect(container.firstChild).toHaveAttribute('class');
});

test('shuffle function', async () => {
  const array=['I', 'you', 'know'];
  const data = shuffle(array);
  expect(data).toEqual(expect.arrayContaining(array));
});

test('calculatePercentResult function', () => {
  const data = calculatePercentResult(10, 100);
  expect(data).toEqual(10);
});

test('container is an divElement', () => {
  const { container } = render(<CardTeam />);
  expect(container).toBeInstanceOf(HTMLDivElement);
});

test('team container defined', () => {
  const { container } = render(<CardTeam/>);
  expect(container).toBeDefined();
});

test('card container exists', () => {
  const { container } = render(<CardTeam />);
  expect(container).toBeTruthy();
});

test('auth service, such user exists', async () => {
  const username = 'maks';
  const password = '01020304';
  const email = 'maks@mail.ru';
  const avatar =
    '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';
  const response = await AuthService.signUp({username:username, avatar:avatar, email:email, password:password});
  await expect(Promise.resolve(response.response.data)).resolves.toBe("user with this e-mail exists");
});

test('the first item from database', async () => {
  const response = await axios.get(`${urls.words.all}?group=${0}&page=${1}`);
  const data = response.data;
  expect(data[0].textExample).toContain('adventure');
});

test('data from database', async () => {
  const response = await axios.get(`${urls.words.all}?group=${0}&page=${1}`);
  const data = response.data;
  expect(data).toHaveLength(20);
});

test('the number of properties', async () => {
  const response = await axios.get(urls.words.all);
  const data = response.data;
  expect(Object.keys(data[0]).length).toBeGreaterThanOrEqual(5);
});
/*test('get score from database', async () => {
  const countryId='604f46c7426e110004d066f5';
  const result= {username: "john", value: 3};
  const response = await axios.get(urls.scores.byId(countryId));
  const data = response.data;
  expect(Object.values(data)[0].scores[0]).toEqual(expect.objectContaining(result));
});*/
