const scrollbarMixin = {
  '&::-webkit-scrollbar': {
    backgroundColor: '#fff',
    width: '12spx',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#fff',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#babac0',
    borderRadius: '16px',
    border: '4px solid #fff',
  },
  '::-webkit-scrollbar-button': {
    display: 'none',
  },
};

export default scrollbarMixin;
