import { Button } from "@/components/ui/button";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="font-josefin-sans text-center flex flex-col space-y-8 md:h-full">
      <RoughNotationGroup show={true}>
        <RoughNotation
          type="highlight"
          show={true}
          color="#499969"
          iterations={4}
        >
          <h1 className="text-9xl">Find Jobs</h1>
        </RoughNotation>
        <h2>
          That you'll actually{" "}
          <RoughNotation
            padding={10}
            type="circle"
            strokeWidth={5}
            color="#F59E0B"
          >
            love
          </RoughNotation>{" "}
        </h2>

        <RoughNotation
          brackets={["left", "right"]}
          type={"bracket"}
          color="red"
          strokeWidth={8}
        >
          <h6 className="text-4xl">
            You can find the desired job more easily and quickly by choosing
            different categories
          </h6>
        </RoughNotation>
      </RoughNotationGroup>
      <div className="flex flex-col space-y-2 items-center md:flex-row md:justify-around md:mt-32  ">
        <div className="w-64 h-32  morphism2 flex flex-col justify-center items-center space-y-4">
          <span>Sign Up To See All Jobs</span>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            className="w-fit"
          >
            Sign Up
          </Button>
        </div>
        <div className="w-64 h-32 flex flex-col justify-center items-center space-y-4 morphism2">
          <span>You Can Filter Jobs By Categories</span>
          <Button
            onClick={() => {
              navigate("/jobs");
            }}
            className="w-fit"
          >
            Go To Job List
          </Button>
        </div>
        <div className="w-64 h-32 flex flex-col justify-center items-center space-y-4 morphism2">
          <span>After Sign Up You Can Apply For Jobs</span>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="w-fit"
          >
            Sign In
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
