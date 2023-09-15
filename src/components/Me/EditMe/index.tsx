// fixme eksik alanlar var

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "react-query";
import { useMeSlice } from "@/store/meSlice";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Please enter your phone correctly.",
  }),

  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  dateOfBirth: z.date().refine((date) => {
    return date < new Date() && date > new Date("1900-01-01");
  }, "Please enter a valid date."),
  skills: z.array(
    z.string().min(2, { message: "Please enter a valid skill." })
  ),

  address: z.object({
    details: z.string().min(2, {
      message: "Please enter a valid address.",
    }),
    city: z.string().min(2, {
      message: "Please enter a valid city.",
    }),
    country: z.string().min(2, {
      message: "Please enter a valid country.",
    }),
  }),
  profileImage: z.string().url({
    message: "Please enter a valid url.",
  }),
});

export default function EditMeForm({
  setIsEditOpen,
}: {
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      dateOfBirth: new Date(),
      phone: "",
      address: {
        details: "",
        city: "",
        country: "",
      },
      profileImage: "",
      skills: [],
    },
  });

  const refetchMe = useMeSlice((state) => state.refetchMe);
  const setRefetchMe = useMeSlice((state) => state.setRefetchMe);

  const { mutate } = useMutation((data) => {
    const resp = axios.put(`${import.meta.env.VITE_API_URL}/user`, data, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          ?.replace(/"/g, "")}`,
      },
    });
    return resp;
  });

  const onSubmit = (data: any) => {
    mutate(data);
    setIsEditOpen(false);
    setRefetchMe(!refetchMe);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 mt-8 px-4 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input
                  placeholder="Split with comma"
                  value={field.value.join(", ")}
                  className="placeholder:text-sm"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((skill) => skill.trim())
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Details"
                  value={field.value.details}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      details: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="City"
                  value={field.value.city}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      city: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Country"
                  value={field.value.country}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      country: e.target.value,
                    })
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input placeholder="Profile Image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-2">
          <Button onClick={() => setIsEditOpen(false)} className="flex-1">
            Go Back
          </Button>
          <Button type="submit" className="flex-1">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
