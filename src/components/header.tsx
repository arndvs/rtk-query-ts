type HeaderProps = {
  count: number;
};

const Header = ({ count = 0 }: HeaderProps) => (
  <header id="page-header">
    <h1 className="text-4xl font-bold">Going on a Trip</h1>
    <h2 className="text-2xl font-bold">Gonna have me some fun packing list</h2>
    <p id="number-of-items">
      {count} {count === 1 ? 'item' : 'items'}
    </p>
  </header>
);

export default Header;
