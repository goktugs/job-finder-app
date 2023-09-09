import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full flex flex-col justify-center text-white font-josefin-sans items-center h-full text-center space-y-12">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl  font-bold ">Sign In To Job Finder </h1>
        <h3>
          Or{" "}
          <span className="text-main-green border-b-4 border-main-green">
            <Link to="/signup">create your account</Link>
          </span>
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-main-gray rounded-md w-80 px-8 pb-16 pt-8 "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="text-semibold text-lg">E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-Mail" {...field} />
                </FormControl>
                <FormMessage
                  className="text-red-700 text-xs 
                  animate-[bounce_3s_ease-in-out_infinite]
                "
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel className="text-semibold text-lg">
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage
                  className="text-red-700 text-xs 
                  animate-[bounce_3s_ease-in-out_infinite]
                "
                />
              </FormItem>
            )}
          />
          <Button
            className="w-full bg-main-green text-black font-bold text-md hover:bg-main-green hover:text-black"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
