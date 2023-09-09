import { useMultiplestepForm } from "@/hooks/useMultipleStepForm";
import React, { FormEvent } from "react";
import Sidebar from "@/components/form/Sidebar";
import { AnimatePresence } from "framer-motion";
import SuccessMessage from "@/components/form/Success";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserInfoForm from "@/components/form/UserInfoForm";
import { Form } from "@/components/ui/form";

const AllFormItemsSchema = z.object({
  name: z.string().min(2).max(50),
  surname: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  profilePicture: z.string().url(),
  dateOfBirth: z.string(),
  phone: z.string(),
  address: z.object({
    details: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
  languages: z.array(
    z.object({
      language: z.string(),
      level: z.string(),
    })
  ),
});

export default function Signup() {
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);

  const form = useForm<Partial<z.infer<typeof AllFormItemsSchema>>>({
    resolver: zodResolver(AllFormItemsSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      profilePicture: "",
      dateOfBirth: "",
      phone: "",
      address: {
        details: "",
        city: "",
        country: "",
      },
      skills: [],
      experience: [],
      education: [],
      languages: [],
    },
  });

  function handleOnSubmit(values: z.infer<typeof AllFormItemsSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div
        className={`flex justify-between ${
          currentStepIndex === 1 ? "h-[600px] md:h-[500px]" : "h-[500px]"
        } w-11/12 max-w-4xl relative m-1 rounded-lg border border-neutral-700 bg-[#262626] p-4`}
      >
        {!showSuccessMsg ? (
          <Sidebar currentStepIndex={currentStepIndex} goTo={goTo} />
        ) : (
          ""
        )}
        <main
          className={`${
            showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"
          }`}
        >
          {showSuccessMsg ? (
            <AnimatePresence mode="wait">
              <SuccessMessage />
            </AnimatePresence>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOnSubmit)}
                className="w-full flex flex-col justify-between h-full"
              >
                <AnimatePresence mode="wait">
                  {currentStepIndex === 0 && (
                    <UserInfoForm key="step1" {...form} />
                  )}
                  {/* {currentStepIndex === 1 && (
                    <PlanForm
                      key="step2"
                      {...formData}
                      updateForm={updateForm}
                    />
                  )}
                  {currentStepIndex === 2 && (
                    <AddonsForm
                      key="step3"
                      {...formData}
                      updateForm={updateForm}
                    />
                  )}
                  {currentStepIndex === 3 && (
                    <FinalStep key="step4" {...formData} goTo={goTo} />
                  )} */}
                </AnimatePresence>
                <div className="w-full items-center flex justify-between">
                  <div className="">
                    <Button
                      onClick={previousStep}
                      type="button"
                      variant="ghost"
                      className={`${
                        isFirstStep
                          ? "invisible"
                          : "visible p-0 text-neutral-200 hover:text-white"
                      }`}
                    >
                      Go Back
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                      <Button
                        type="submit"
                        className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
                      >
                        {isLastStep ? "Confirm" : "Next Step"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          )}
        </main>
      </div>
    </div>
  );
}
