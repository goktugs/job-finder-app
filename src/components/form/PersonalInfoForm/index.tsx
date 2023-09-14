import { Input } from "@/components/ui/input";

import FormWrapper from "../FormWrapper";
import { Label } from "@/components/ui/label";
import { AllFormValues } from "@/pages/Signup";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
type stepProps = AllFormValues & {
  updateForm: (fieldToUpdate: Partial<AllFormValues>) => void;
};
export default function PersonalInfoForm({
  phone,
  address,
  profileImage,
  dateOfBirth,
  name,
  surname,
  updateForm,
}: stepProps) {
  const [dateOfBirthState, setDateOfBirthState] = React.useState<
    Date | undefined
  >(new Date());

  return (
    <FormWrapper
      title="Personal info"
      description="Please provide your profile pic, address, and phone number."
    >
      <div className="w-full flex flex-col space-y-4 overflow-y-scroll h-96 md:h-80">
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
            Surname
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
          <Label className="text-white" htmlFor="phone">
            Phone
          </Label>
          <Input
            autoFocus
            type="number"
            name="phone"
            id="phone"
            placeholder="e.g. +90 555 555 55 55"
            value={phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
            className="w-full text-white"
            required
          />
        </div>
        <div className="flex justify-between flex-col space-y-2 md:flex-row md:space-y-0">
          <div className="flex flex-col text-white">
            <Label className="text-white text-xs">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !dateOfBirthState && "text-muted-foreground"
                  )}
                >
                  {dateOfBirthState ? (
                    format(dateOfBirthState, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateOfBirthState}
                  disabled={
                    dateOfBirthState
                      ? {
                          after: new Date(),
                        }
                      : undefined
                  }
                  onSelect={(newDateOfBirthState) => {
                    setDateOfBirthState(newDateOfBirthState);
                    updateForm({
                      dateOfBirth: newDateOfBirthState
                        ? format(newDateOfBirthState, "yyyy-MM-dd")
                        : dateOfBirth,
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="adress">
            Enter your address
          </Label>
          <Input
            autoFocus
            type="text"
            name="city"
            id="city"
            placeholder="e.g. City "
            value={address.city}
            onChange={(e) =>
              updateForm({ address: { ...address, city: e.target.value } })
            }
            className="w-full text-white"
            required
          />
          <Input
            autoFocus
            type="text"
            name="country"
            id="country"
            placeholder="e.g. Country"
            value={address.country}
            onChange={(e) =>
              updateForm({
                address: { ...address, country: e.target.value },
              })
            }
            className="w-full text-white"
            required
          />
          <Input
            autoFocus
            type="text"
            name="details"
            id="details"
            placeholder="e.g. Details"
            value={address.details}
            onChange={(e) =>
              updateForm({
                address: { ...address, details: e.target.value },
              })
            }
            className="w-full text-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="profile">
            Profile Picture
          </Label>
          <div className="flex ">
            <Input
              type="url"
              name="profile"
              id="profile"
              placeholder="e.g. stephenking@lorem.com"
              value={profileImage}
              className="w-full text-white"
              onChange={(e) => updateForm({ profileImage: e.target.value })}
              required
            />
            <span
              onClick={() =>
                updateForm({
                  profileImage: `https://placekitten.com/200/${
                    Math.floor(Math.random() * 200) + 100
                  }`,
                })
              }
              className="text-white ml-2 text-center cursor-pointer"
            >
              Get Rand Image
            </span>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
