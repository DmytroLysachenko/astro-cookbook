import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

const SubscribeForm = () => {
  return (
    <>
      <form
        className="flex gap-2 w-[300px] mx-auto"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get("email");
          try {
            await fetch("/api/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
              }),
            });

            toast.success("Successfully subscribed!");
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong, try later.");
          }
        }}
      >
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Button variant="secondary">Subscribe</Button>
      </form>
      <Toaster richColors />
    </>
  );
};

export default SubscribeForm;
