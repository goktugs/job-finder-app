import { IUserUpdateRequest } from "@/types/types";
import { useQuery } from "react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loadingSpinner";
import { useNavigate } from "react-router-dom";
import EditMeForm from "./EditMe";
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "../ui/use-toast";
import { useTranslation } from "react-i18next";
import { getMeProfileFn } from "@/api/authApi";

export default function Me() {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { data, isLoading, isFetching } = useQuery<IUserUpdateRequest>(
    ["me"],
    getMeProfileFn,
    {
      refetchOnWindowFocus: false,
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Something went wrong ${err} `,
        });
      },
    }
  );

  const exitHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const { t } = useTranslation();

  return (
    <>
      <Card className=" md:block morphismGlass md:font-josefin-sans md:text-center md:w-56 md:h-[900px] md:overflow-y-scroll ">
        {isLoading || isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            {isEditOpen ? (
              <EditMeForm setIsEditOpen={setIsEditOpen} />
            ) : (
              <>
                {" "}
                <CardHeader>
                  <CardContent className="items-center justify-center flex">
                    <img
                      alt="profileImg2"
                      src={data?.profileImage}
                      className="rounded-full w-32 h-32"
                    />
                  </CardContent>
                  <CardDescription>
                    {data?.name} {data?.surname}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="space-y-2 text-sm">
                    <p>
                      {t("phone")}:{" "}
                      <span className="text-orange-600">{data?.phone}</span>
                    </p>
                    <p>{data?.email}</p>
                    <p>
                      {t("birth")}:{" "}
                      <span className="text-orange-600">
                        {data?.dateOfBirth && (
                          <span className="text-orange-600">
                            {format(new Date(data.dateOfBirth), "PPP")}
                          </span>
                        )}
                      </span>{" "}
                    </p>
                    <p>
                      {t("skills")}:{" "}
                      {data?.skills?.map((skill, index) => (
                        <span key={index} className="text-orange-600">
                          {skill}{" "}
                        </span>
                      ))}
                    </p>
                    <div>
                      <p>{t("education")}: </p>
                      {data?.education?.map((edu, index) => (
                        <div key={index} className="text-orange-600">
                          <p>
                            {t("education")} {edu.degree}
                          </p>
                          <p>
                            {t("instituton")} {edu.institution}
                          </p>
                          <p>
                            {edu.startDate} ~ {edu.endDate}{" "}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p>{t("experience")}: </p>
                      {data?.experience?.map((exp, index) => (
                        <div key={index} className="text-orange-600">
                          <p>{exp.company}</p>
                          <p>{exp.position}</p>
                          <p>
                            {exp.startDate} ~ {exp.endDate}{" "}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p>{t("language")}:</p>
                      {data?.languages?.map((lang, index) => (
                        <div key={index} className="text-orange-600">
                          <p>
                            {lang.language} : {lang.level}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      {data?.address.city}
                      {data?.address.country} {data?.address.details}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="space-x-4">
                  <Button
                    onClick={() => setIsEditOpen(true)}
                    className="flex-1"
                    variant="default"
                  >
                    {t("edit")}
                  </Button>
                  <Button
                    onClick={exitHandler}
                    className="flex-1"
                    variant="destructive"
                  >
                    {t("exit")}
                  </Button>
                </CardFooter>
              </>
            )}
          </>
        )}
      </Card>
    </>
  );
}
