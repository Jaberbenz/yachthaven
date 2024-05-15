import { Link, useLocation, useParams } from "react-router-dom";

export default function ClientAccountNav() {
  const { pathname } = useLocation();
  const { id } = useParams();

  let subpage = pathname.split("/")?.[2];
  if (subpage === id) {
    subpage = "profile";
  }

  console.log("current sub");

  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-4 rounded-full";
    if (type === subpage) {
      classes += " bg-primary text-white ";
    } else {
      classes += " bg-gray-200 ";
    }
    return classes;
  }
  return (
    <nav className="flex justify-center w-full gap-4 my-6">
      <Link className={linkClasses("profile")} to={`/account-client/${id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        Mon Profile
      </Link>
      <Link className={linkClasses("bookings")} to={`/account-client/bookings`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        Mes rendez-vous
      </Link>
    </nav>
  );
}
