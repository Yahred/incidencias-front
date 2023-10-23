import Box from '@mui/material/Box';

const IndicadorEstatus = ({ color }) => {
  return (
    <Box
      sx={{
        width: 16,
        backgroundColor: color,
        position: 'absolute',
        left: 0,
        height: '100%',
      }}
    ></Box>
  );
};

export default IndicadorEstatus;
