import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SubscribeForm = () => {
  return (
    <form className="flex gap-2 w-[300px] mx-auto">
      <Input type="email" placeholder="Enter your email" />
      <Button
        variant="secondary"
        onClick={() => {
          console.log("Subscribed");
        }}
      >
        Subscribe
      </Button>
    </form>
  );
};

export default SubscribeForm;
