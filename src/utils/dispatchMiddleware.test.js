import { ADD_ALL } from './actions';
import dispatchMiddleware from './dispatchMiddleware';

jest.mock('./database', () => {
  return () => ({
    addAll: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
    edit: jest.fn(),
  });
});

describe('dispatchMiddleware', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call dispatch', async () => {
    const dispatch = jest.fn();
    const payload = { type: ADD_ALL, data: [] };
    await dispatchMiddleware(dispatch)(payload);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(payload);
  });
});
