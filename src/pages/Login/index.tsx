// fixme dönen hata mesajlarını göster. axios kurulmalı
// fixme toast positon
//  fixme hata yanlış

import { Button } from "@/components/ui/button";
import axios from "axios";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "../../components/ui/loadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (data: z.infer<typeof LoginSchema>) =>
      axios
        .post(`${import.meta.env.VITE_API_URL}/login`, data)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        localStorage.setItem("id", JSON.stringify(data.user.id));
        navigate("/jobs");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User not found",
        });
      },
    }
  );

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center text-white font-josefin-sans items-center h-full text-center space-y-12">
      {isLoading ? (
        <LoadingSpinner />
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
                  animate-[bounce_3s_ease-in-out_infinite]"
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
                      <div className="flex space-x-1">
                        <Input
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <Toggle
                          pressed={showPassword}
                          onPressedChange={() => setShowPassword(!showPassword)}
                          size="sm"
                          aria-label="Toggle italic"
                        >
                          {showPassword ? (
                            <EyeClosedIcon className="h-8 w-8 bg-gray-600 p-1 rounded-lg" />
                          ) : (
                            <EyeOpenIcon className="h-8 w-8 bg-gray-600 p-1 rounded-lg" />
                          )}
                        </Toggle>
                      </div>
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
