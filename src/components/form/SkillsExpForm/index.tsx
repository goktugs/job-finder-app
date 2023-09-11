import { AllFormValues } from "@/pages/Signup";
import React from "react";
import FormWrapper from "../FormWrapper";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

type StepProps = AllFormValues & {
  updateForm: (fieldToUpdate: Partial<AllFormValues>) => void;
};

export default function SkillsExpForm({
  skills,
  experience,
  updateForm,
}: StepProps) {
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());

  return (
    <FormWrapper
      title="Skills and Experience"
      description="Please provide your skills and experience."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="skills">
            Skills
          </Label>
          <Input
            autoFocus
            type="text"
            name="skills"
            id="skills"
            placeholder="e.g. Javascript, React, Node.js split with comma"
            value={skills.join(",")}
            onChange={(e) => updateForm({ skills: e.target.value.split(",") })}
            className="w-full text-white"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="experience">
            Experience
          </Label>

          <Input
            autoFocus
            type="text"
            name="company"
            id="company"
            placeholder="e.g. Company Name"
            value={experience[0]?.company || ""}
            onChange={(e) =>
              updateForm({
                experience: [
                  {
                    ...experience[0],
                    company: e.target.value,
                  },
                ],
              })
            }
            className="w-full text-white"
            required
          />
          <Input
            autoFocus
            type="text"
            name="position"
            id="position"
            placeholder="e.g. Position"
            value={experience[0]?.position || ""}
            onChange={(e) =>
              updateForm({
                experience: [
                  {
                    ...experience[0],
                    position: e.target.value,
                  },
                ],
              })
            }
            className="w-full text-white"
            required
          />
          <div className="flex justify-between flex-col space-y-2 md:flex-row md:space-y-0">
            <div className="flex flex-col text-white">
              <Label className="text-white text-xs">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(newStartDate) => {
                      setStartDate(newStartDate);
                      updateForm({
                        experience: [
                          {
                            ...experience[0],
                            startDate: newStartDate?.toDateString() || "",
                          },
                        ],
                      });
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col text-white">
              <Label className="text-white text-xs">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(newEndDate) => {
                      setEndDate(newEndDate);
                      updateForm({
                        experience: [
                          {
                            ...experience[0],
                            endDate: newEndDate?.toDateString() || "",
                          },
                        ],
                      });
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
