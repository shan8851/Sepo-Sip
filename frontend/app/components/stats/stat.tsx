import { PropsWithChildren } from 'react';
import { Spinner } from '../spinner/spinner';
import { TbFaceIdError } from 'react-icons/tb';

export interface IStatProps {
  title: string;
  value: string;
  loading?: boolean;
  error?: boolean;
  icon: React.ReactNode;
}

const Box: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="h-48 w-64 bg-neutral-800 flex items-center justify-center rounded-lg">
    {children}
  </div>
);

export const Stat: React.FC<IStatProps> = (props) => {
  const { title, value, icon, loading, error } = props;

  if (loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <TbFaceIdError className="text-6xl text-red" />
      </Box>
    );
  }
  return (
    <Box>
      <div className="flex items-center gap-4">
        {icon}
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl font-bold text-red-400">{value}</span>
          <span className="text-base leading-7">{title}</span>
        </div>
      </div>
    </Box>
  );
};
