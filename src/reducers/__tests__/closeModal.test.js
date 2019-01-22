import closeModal from '../closeModal';

describe('#closeModal', () => {
  it('should return a correct object', () => {
    expect(closeModal()).toEqual({ modal: false });
  });
});
