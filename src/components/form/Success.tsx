import { motion } from "framer-motion";
import successIcon from "../../assets/success.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTranslation } from "react-i18next";

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
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      navigate("/jobs");
    }, 5000);
  }, [navigate]);

  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <img src={successIcon} alt="Success Icon" className="md:mb-4 w-36 h-36" />
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        {t("thankYou")}
      </h4>
      <p className="text-sm max-w-md text-neutral-300 md:text-base">
        {t("regSuccess")}
      </p>
      <RoughNotation show={true} type={"underline"} color="#f00">
        <h3 className="text-2xl font-semibold text-white md:text-3xl">
          {t("regSuccess2")}
        </h3>
      </RoughNotation>
    </motion.section>
  );
}
