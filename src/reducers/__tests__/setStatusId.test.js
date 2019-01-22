import setStatusId from '../setStatusId';

describe('#setStatusId', () => {
  it('should return a correct object', () => {
    expect(setStatusId(undefined, 1)).toEqual({ statusId: 1 });
  });
});
