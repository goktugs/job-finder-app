import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

export default function UserInfoForm(form: ReturnType<typeof useForm>) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel className="text-semibold text-lg">Name</FormLabel>
            <FormControl>
              <Input placeholder="Name" {...field} />
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
        name="surname"
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel className="text-semibold text-lg">Surname</FormLabel>
            <FormControl>
              <Input placeholder="Surname" {...field} />
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
        name="email"
        render={({ field }) => (
          <FormItem className="text-left">
            <FormLabel className="text-semibold text-lg">Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
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
            <FormLabel className="text-semibold text-lg">Password</FormLabel>
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
    </>
  );
}
