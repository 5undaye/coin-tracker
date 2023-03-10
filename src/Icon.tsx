interface IconProps {
  name: string;
}

export const Icon = ({ name }: IconProps) => {
  return (
    <div className="material-icons-round" style={{ fontSize: 'inherit' }}>
      {name}
    </div>
  );
};
