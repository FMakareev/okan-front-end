export const ButtonVariant = {
  xsmall: {
    color: '#fff',
    fill: '#fff',
    backgroundColor: '#00649C',
    border: '1px solid #00649C',
    '&:hover': { backgroundColor: '#fff', color: '#00649C', fill: '#00649C' },
  },
  small: {
    color: '#848484',
    backgroundColor: '#fff',
    fill: '#848484',
    border: '1px solid',
    '&:hover': { backgroundColor: '#848484', color: '#ffffff', fill: '#ffffff' },
  },
  large: {
    color: '#00649C',
    fill: '#00649C',
    backgroundColor: 'transparent',
    border: '2px solid',
    '&:hover': { backgroundColor: '#00649C', color: '#ffffff', fill: '#ffffff' },
  },
  empty: {
    backgroundColor: '#ffffff',
    fill: '#ffffff',
    border: 0 ,
    ':disabled':{
      backgroundColor: '#e5e5e5',
      fill: '#e5e5e5',
    }
  },
};
