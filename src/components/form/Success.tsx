import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import successIcon from "../../assets/success.png";
import { Link } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

export default function SuccessMessage() {
  const refresh = () => window.location.reload();

  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <img src={successIcon} alt="Success Icon" className="md:mb-4 w-36 h-36" />
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Thank you!
      </h4>
      <p className="text-sm max-w-md text-neutral-300 md:text-base">
        Thanks for the time you spent filling out the form. Now you can sign in
        and start using our services.
      </p>
      <div className="flex items-center mt-6">
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Button
            onClick={refresh}
            className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
          >
            <ReloadIcon className="mr-2 h-4 w-4" /> Restart
          </Button>
        </div>
        <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Link to="/login">
            <Button className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white">
              Go To Login
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
