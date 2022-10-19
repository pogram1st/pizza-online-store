import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingPizza = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox='0 0 280 460'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='140' cy='130' r='130' />
    <rect x='10' y='280' rx='10' ry='10' width='260' height='25' />
    <rect x='10' y='320' rx='10' ry='10' width='125' height='30' />
    <rect x='145' y='320' rx='10' ry='10' width='125' height='30' />
    <rect x='10' y='370' rx='10' ry='10' width='80' height='30' />
    <rect x='100' y='370' rx='10' ry='10' width='80' height='30' />
    <rect x='190' y='370' rx='10' ry='10' width='80' height='30' />
    <rect x='10' y='420' rx='10' ry='10' width='100' height='40' />
    <rect x='160' y='420' rx='20' ry='20' width='110' height='40' />
  </ContentLoader>
);

export default LoadingPizza;
