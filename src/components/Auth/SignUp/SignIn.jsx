import logo from "../../../assets/sel-logo.png";
import SignInForm from "./SignInForm";

const SignUp = () => {
  return (
    <div className="px-10 flex justify-center">
      <div>
        <div className="flex justify-center">
            <h1 className="text-3xl font-extrabold ">Join</h1>
        <img className="h-8 w-auto" src={logo} />
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignUp;
