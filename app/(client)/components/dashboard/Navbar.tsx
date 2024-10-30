import UserButton from "./UserButton";

const Navbar = () => {
  return (
    <nav className="w-[calc(100%-300px)] flex items-center p-4 h-[68px] fixed top-0 z-50 bg-muted">
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
}

export default Navbar