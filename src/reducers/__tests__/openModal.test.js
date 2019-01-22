import openModal from '../openModal';

describe('#openModal', () => {
  it('should return a correct object', () => {
    expect(openModal()).toEqual({ modal: true });
  });
});
