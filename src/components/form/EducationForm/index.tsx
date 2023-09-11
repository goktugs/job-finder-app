import { AllFormValues } from "@/pages/Signup";
import FormWrapper from "../FormWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type StepProps = AllFormValues & {
  updateForm: (fieldToUpdate: Partial<AllFormValues>) => void;
};

export default function EducationForm({
  education,
  languages,
  updateForm,
}: StepProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  return (
    <FormWrapper
      title="Education info"
      description="Please provide education and languages proficiency."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="Education">
            Education
          </Label>
          <Input
            autoFocus
            type="text"
            name="institution"
            id="institution"
            placeholder="e.g. institution Name"
            value={education[0]?.institution || ""}
            onChange={(e) =>
              updateForm({
                education: [
                  {
                    ...education[0],
                    institution: e.target.value,
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
            name="degree"
            id="degree"
            placeholder="e.g. Degree Name"
            value={education[0]?.degree || ""}
            onChange={(e) =>
              updateForm({
                education: [
                  {
                    ...education[0],
                    degree: e.target.value,
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
                        education: [
                          {
                            ...education[0],
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
                        education: [
                          {
                            ...education[0],
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
        <div className="flex flex-col gap-2">
          <Label className="text-white" htmlFor="languages">
            Languages
          </Label>
          <Input
            autoFocus
            type="text"
            name="language"
            id="language"
            placeholder="e.g. English"
            value={languages[0]?.language || ""}
            onChange={(e) =>
              updateForm({
                languages: [
                  {
                    ...languages[0],
                    language: e.target.value,
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
            name="level"
            id="level"
            placeholder="e.g. Level of proficiency"
            value={languages[0]?.level || ""}
            onChange={(e) =>
              updateForm({
                languages: [
                  {
                    ...languages[0],
                    level: e.target.value,
                  },
                ],
              })
            }
            className="w-full text-white"
            required
          />
        </div>
      </div>
    </FormWrapper>
  );
}
