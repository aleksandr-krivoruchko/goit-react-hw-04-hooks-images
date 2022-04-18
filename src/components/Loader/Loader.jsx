import { Watch } from 'react-loader-spinner';
import { LoaderStyle, Title } from './LoaderStyle.styled';

export function Loader() {
  return (
    <LoaderStyle>
      <Title>Загрузка...</Title>
      <Watch height="30" width="30" color="blue" />
    </LoaderStyle>
  );
}
