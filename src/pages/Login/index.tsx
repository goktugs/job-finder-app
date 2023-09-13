// fixme dönen hata mesajlarını göster. axios kurulmalı

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
import Loading from "@/components/ui/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
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

  const { mutate, isLoading } = useMutation(
    (data: z.infer<typeof LoginSchema>) =>
      fetch(`${import.meta.env.VITE_API_URL}/login `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        localStorage.setItem("user", JSON.stringify(data.refreshToken));
      },
    }
  );

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate(data);
  };

  return (
    <div className="w-full flex flex-col justify-center text-white font-josefin-sans items-center h-full text-center space-y-12">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl text-main-gray  font-bold ">
              Sign In To Job Finder{" "}
            </h1>
            <h3>
              <span className="text-main-green">Or </span>
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
                    <FormLabel className="text-semibold text-lg">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="E-Mail" {...field} />
                    </FormControl>
                    <FormMessage
                      className="text-white text-sm font-semibold 
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
                      className="text-white text-sm font-semibold 
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
        </>
      )}
    </div>
  );
}
