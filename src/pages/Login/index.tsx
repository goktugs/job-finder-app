import { Button } from "@/components/ui/button";
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
import { loginUserFn } from "@/api/authApi";
import { useTranslation } from "react-i18next";
import { RoughNotation } from "react-rough-notation";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { t } = useTranslation();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation(loginUserFn, {
    onSuccess: (data) => {
      toast({
        title: "Login Success",
        description: "You have successfully logged in.",
      });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userId", data.user.id);
      navigate("/jobs");
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        // error type should be unknown see 'https://stackoverflow.com/questions/72321623/whats-the-type-of-react-querys-error-and-how-to-handle-different-cases'

        // @ts-ignore
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

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
            <h1 className="text-3xl text-main-brownish  font-bold ">
              {t("login1")}
            </h1>
            <h3>
              <RoughNotation
                show
                type={"circle"}
                strokeWidth={3}
                color="#FFA500"
              >
                <span className="text-main-brownish text-2xl">{t("or")}</span>
              </RoughNotation>
              <span className="text-main-bronze border-b-2 border-main-gray border-ani">
                <Link to="/signup"> {t("createAcc")} </Link>
              </span>
            </h3>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-main-brownish rounded-md w-80 px-8 pb-16 pt-8 "
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
                      className="text-red-600 text-sm font-semibold 
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
                      {t("password")}
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
                      className="text-red-600 text-sm font-semibold 
                  animate-[bounce_3s_ease-in-out_infinite]
                "
                    />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-main-pinkish text-main-brownish font-bold text-md"
                type="submit"
              >
                {t("login")}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
