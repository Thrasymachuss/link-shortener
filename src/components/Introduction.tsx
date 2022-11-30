import { signIn } from "next-auth/react";
import FadeIn from "./FadeIn";

const Introduction = () => {
  return (
    <FadeIn>
      <div className="pt-16 text-white lg:pt-20">
        <div className="pb-10">
          <h1 className="pb-6 text-center text-6xl lg:text-8xl">
            Welcome To Turl
          </h1>
          <h2 className="text-center text-3xl lg:text-4xl">A Link Shortener</h2>
        </div>
        <p className="pb-2 text-center text-2xl">
          Sign in with an email address to get immediate access to the
          following:
        </p>
        <div className="flex justify-center">
          <ul className="list-checkbox list-inside list-disc justify-center py-4 text-xl">
            <li className="mx-4 pb-2">Unlimited link shortening</li>
            <li className="mx-4 pb-2">Ability to save links</li>
            <li className="mx-4 pb-2">Customized URLs</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => signIn()}
            id="main-login"
            className="rounded bg-blue-500 py-2 px-4 text-xl font-bold text-white hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </FadeIn>
  );
};

export default Introduction;
