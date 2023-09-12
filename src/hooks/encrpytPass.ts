import { useState } from "react";
import CryptoJS from "crypto-js";

export default function encryptPass() {
  const [encryptedPassword, setEncryptedPassword] = useState("");

  const encryptPassword = (password: string, secretKey: string) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
      setEncryptedPassword(encrypted);
    } catch (error) {
      console.error("Şifreleme hatası:", error);
    }
  };

  return { encryptedPassword, encryptPassword };
}
