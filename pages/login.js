import Link from "next/link";
import LoginForm from "../components/LoginForm";
const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup">
              <a href="#" className="text-blue-500">
                Sign Up
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />

          <Link href="/reset-password">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
