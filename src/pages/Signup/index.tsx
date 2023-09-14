// fixme error yok
// fixme react hook form eklenmeli

import { useMultiplestepForm } from "@/hooks/useMultipleStepForm";
import React, { useState } from "react";
import Sidebar from "@/components/form/Sidebar";
import { AnimatePresence } from "framer-motion";
import SuccessMessage from "@/components/form/Success";
import { Button } from "@/components/ui/button";
import UserInfoForm from "@/components/form/UserInfoForm";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import SkillsExpForm from "@/components/form/SkillsExpForm";
import EducationForm from "@/components/form/EducationForm";
import { useMutation } from "react-query";
import { format } from "date-fns";

interface UserInfoForm {
  email: string;
  password: string;
}

interface PersonalInfoForm {
  name: string;
  surname: string;
  dateOfBirth: string;
  phone: string;
  address: {
    details: string;
    city: string;
    country: string;
  };
  profileImage: string;
}

interface SkillsExpForm {
  skills: string[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
  }[];
}

interface EducationForm {
  isEmployer: boolean;
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  languages: {
    language: string;
    level: string;
  }[];
}

export type AllFormValues = UserInfoForm &
  PersonalInfoForm &
  SkillsExpForm &
  EducationForm;

const initialValues: AllFormValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  dateOfBirth: format(new Date(), "yyyy-MM-dd"),
  isEmployer: false,
  phone: "",
  address: {
    details: "",
    city: "",
    country: "",
  },
  profileImage: "",
  skills: [],
  experience: [
    {
      company: "",
      position: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    },
  ],
  education: [
    {
      institution: "",
      degree: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
    },
  ],
  languages: [
    {
      language: "",
      level: "",
    },
  ],
};

export default function Signup() {
  const [formData, setFormData] = useState(initialValues);

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(4);

  function updateForm(fieldToUpdate: Partial<UserInfoForm>) {
    setFormData({ ...formData, ...fieldToUpdate });
  }

  const { mutate } = useMutation((data: AllFormValues) =>
    fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${localStorage
          .getItem("accessToken")
          ?.replace(/"/g, "")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStepIndex === 0) {
      fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(data.refreshToken)
          );
          localStorage.setItem("id", JSON.stringify(data.user.id));
        });
    }

    if (isLastStep) {
      mutate(formData);
    }
    nextStep();
  };

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
            <form
              onSubmit={handleOnSubmit}
              className="w-full flex flex-col justify-between h-full"
            >
              <AnimatePresence mode="wait">
                {currentStepIndex === 0 && (
                  <UserInfoForm
                    key="step1"
                    {...formData}
                    updateForm={updateForm}
                  />
                )}
                {currentStepIndex === 1 && (
                  <PersonalInfoForm
                    key="step2"
                    {...formData}
                    updateForm={updateForm}
                  />
                )}
                {currentStepIndex === 2 && (
                  <SkillsExpForm
                    key="step3"
                    {...formData}
                    updateForm={updateForm}
                  />
                )}
                {currentStepIndex === 3 && (
                  <EducationForm
                    key="step4"
                    {...formData}
                    updateForm={updateForm}
                  />
                )}
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
                <div className="text-white ">{`${currentStepIndex + 1}/4`}</div>
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
          )}
        </main>
      </div>
    </div>
  );
}
