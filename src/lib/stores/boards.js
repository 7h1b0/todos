import { writable } from 'svelte/store';
import getDb from '../utils/database';
import dbWritable from './dbWritable';

export const INITIAL_BOARD = { id: 1, title: 'Main' };
export const currentBoard = writable(INITIAL_BOARD);

export const boards = dbWritable(async (set) => {
  const db = await getDb('boards');
  const event = await db.findAll();
  set([INITIAL_BOARD, ...event.target.result]);
}, 'boards');
