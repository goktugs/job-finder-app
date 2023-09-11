import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "../../ui/input";
import FormWrapper from "../FormWrapper";
import { Label } from "@/components/ui/label";
import { AllFormValues } from "@/pages/Signup";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

type StepProps = AllFormValues & {
  updateForm: (fieldToUpdate: Partial<AllFormValues>) => void;
};
export default function UserInfo({
  name,
  surname,
  email,
  password,
  updateForm,
}: StepProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormWrapper
      title="Site info"
      description="Please provide your name, email address, surname and password."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="name">
            Name
          </Label>
          <Input
            autoFocus
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen"
            value={name}
            onChange={(e) => updateForm({ name: e.target.value })}
            className="w-full text-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="surname">
            Surnamae
          </Label>
          <Input
            autoFocus
            type="text"
            name="surname"
            id="surname"
            placeholder="e.g. King"
            value={surname}
            onChange={(e) => updateForm({ surname: e.target.value })}
            className="w-full text-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="email">
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            className="w-full text-white"
            onChange={(e) => updateForm({ email: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="password">
            Password
          </Label>
          <div className="flex">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="e.g. ********"
              value={password}
              className="w-full text-white"
              onChange={(e) => updateForm({ password: e.target.value })}
              required
            />
            <Toggle
              className="ml-2"
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
        </div>
      </div>
    </FormWrapper>
  );
}
