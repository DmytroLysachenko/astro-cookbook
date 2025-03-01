import { Input } from "../ui/input";
import CustomButton from "./CustomButton";

const SubscribeForm = () => {
  return (
    <form className="flex gap-2 max-w-md mx-auto">
      <Input type="email" placeholder="Enter your email" />
      <CustomButton
        title="Subscribe"
        handleClick={() => {
          console.log("Subscribed");
        }}
      />
    </form>
  );
};

export default SubscribeForm;
