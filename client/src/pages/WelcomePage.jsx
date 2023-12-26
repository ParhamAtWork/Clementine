import clementineLogo from "../assets/clementinesv.svg";
import "./WelcomePage.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Example() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-center p-6 lg:px-8"
          aria-label="Global"
        >
          {/* Flex container for logo and title */}
          <div className="flex flex-col items-center lg:flex-row"></div>
          <div className="hidden lg:flex lg:gap-x-12"></div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt- lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <img
              className="h-20 w-auto" // Adjust size as needed
              src={clementineLogo}
              alt="Clementine"
            />
            <h1 className="text-orange mt-3">Clementine</h1>
          </div>
          <div className="text-center">
            <h4 className="text-3xl font-bold tracking-tight text-gray-900">
              The rent payment solution
            </h4>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button onClick={() => loginWithRedirect()} className="bg-[#558540] text-stone hover:text-stone w-auto px-10 py-2 border-2 border-[#000]">
                  Log in
              </button>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}
