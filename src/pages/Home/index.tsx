import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Home() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="font-josefin-sans text-center flex flex-col space-y-8 md:h-full">
      <RoughNotationGroup show={true}>
        <RoughNotation
          type="highlight"
          show={true}
          color="#499969"
          iterations={4}
        >
          <h1 className="text-5xl md:text-9xl ">{t("findJ")}</h1>
        </RoughNotation>
        <h2>
          {t("findJ2")}
          <RoughNotation
            padding={10}
            type="circle"
            strokeWidth={5}
            color="#F59E0B"
          >
            {t("findJ6")}
          </RoughNotation>{" "}
        </h2>

        <RoughNotation
          brackets={["left", "right"]}
          type={"bracket"}
          color="red"
          strokeWidth={8}
        >
          <h6 className="text-4xl">{t("findJ3")}</h6>
        </RoughNotation>
      </RoughNotationGroup>
      <div className="flex flex-col space-y-2 items-center md:flex-row md:justify-around md:mt-32  ">
        <div className="w-64 h-32  morphism2 flex flex-col justify-center items-center space-y-4">
          <span>{t("findJ5")}</span>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            className="w-fit"
          >
            {t("findJ7")}
          </Button>
        </div>
        <div className="w-64 h-32 flex flex-col justify-center items-center space-y-4 morphism2">
          <span>{t("findJ8")}</span>
          <Button
            onClick={() => {
              navigate("/jobs");
            }}
            className="w-fit"
          >
            {t("findJ9")}
          </Button>
        </div>
        <div className="w-64 h-32 flex flex-col justify-center items-center space-y-4 morphism2">
          <span>{t("findJ10")}</span>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="w-fit"
          >
            {t("findJ11")}
          </Button>
        </div>
      </div>
      <div className="text-5xl hidden md:block ">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .pauseFor(2500)
              .typeString("Your Gateway to Find Your Dream Job!")
              .pauseFor(300)
              .deleteChars(10)
              .typeString("Perfect Job!")
              .deleteChars(12)
              .typeString("Suitable Job!")
              .deleteChars(13)
              .deleteAll()
              .typeString("Find Your Dream Job!")
              .start();
          }}
        />
      </div>
    </div>
  );
}
