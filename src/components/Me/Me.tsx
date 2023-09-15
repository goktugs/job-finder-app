import { IProfile } from "@/types/types";
import axios from "axios";
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
import { useMeSlice } from "@/store/meSlice";
import { format } from "date-fns";
import { useToast } from "../ui/use-toast";

export default function Me() {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const refetchMe = useMeSlice((state) => state.refetchMe);
  const { toast } = useToast();

  const fetchMeUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("accessToken")
            ?.replace(/"/g, "")}`,
        },
      });
      return response.data;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  const { data, isLoading, isFetching } = useQuery<IProfile>({
    queryKey: ["me", refetchMe],
    queryFn: () => fetchMeUser(),
    refetchOnWindowFocus: false,
  });

  const exitHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <>
      <Card className="hidden md:block morphismGlass md:font-josefin-sans md:text-center md:w-56 md:h-[900px] md:overflow-y-scroll ">
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
                      Phone:{" "}
                      <span className="text-orange-600">{data?.phone}</span>
                    </p>
                    <p>{data?.email}</p>
                    <p>
                      Date of Birth:{" "}
                      <span className="text-orange-600">
                        {data?.dateOfBirth && (
                          <span className="text-orange-600">
                            {format(new Date(data.dateOfBirth), "PPP")}
                          </span>
                        )}
                      </span>{" "}
                    </p>
                    <p>
                      Skills:{" "}
                      {data?.skills?.map((skill, index) => (
                        <span key={index} className="text-orange-600">
                          {skill}{" "}
                        </span>
                      ))}
                    </p>
                    <div>
                      <p>Education: </p>
                      {data?.education?.map((edu, index) => (
                        <div key={index} className="text-orange-600">
                          <p>Degree {edu.degree}</p>
                          <p>Institution {edu.institution}</p>
                          <p>
                            {edu.startDate} ~ {edu.endDate}{" "}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p>Experience: </p>
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
                      <p>Languages</p>
                      {data?.languages?.map((lang, index) => (
                        <div key={index} className="text-orange-600">
                          <p>
                            {lang.language} : {lang.level}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="space-x-4">
                  <Button
                    onClick={() => setIsEditOpen(true)}
                    className="flex-1"
                    variant="default"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={exitHandler}
                    className="flex-1"
                    variant="destructive"
                  >
                    Exit
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
