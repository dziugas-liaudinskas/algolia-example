import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div>
        <Link to={'/category/speakers'}>Click to check out speakers!</Link>
      </div>
    </main>
  );
}
