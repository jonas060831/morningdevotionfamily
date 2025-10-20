"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/Authcontext";
import styles from "./page.module.css";
import TextInputField from "@/components/forms/inputs/text/TextInputField";
import { useSystemMessage } from "@/components/modals/notification/systemMessage/SystemMessageManager";
import Image from "next/image";
import { signInAdmin } from "@/app/(server)/auth/admin";

export default function AdminLoginPage() {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { showMessage } = useSystemMessage()

  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signInAdmin(formData);
      const { success, token, error } = res;

      if (success && token) {
        // Store token in localStorage
        localStorage.setItem("token", token);

        // Parse token to get user info
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);

        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        showMessage(error || "Login failed", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div
           style={{ position: 'relative', width: '100px', height: '100px', margin: '0px auto' }}
          >
            <Image src="/assets/images/logos/dtc.png" alt="" fill/>
          </div>
          <h1 className={styles.title}>Admin Login</h1>

          <TextInputField
           name="username"
           label="Username"
           onChange={handleChange}
           value={formData.username}
          />

          <TextInputField
           name="password"
           label="Password"
           type="password"
           onChange={handleChange}
           value={formData.password}
          />

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {
              isLoading ? (
                <div style={{ position: 'relative', width: '100%', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src="/assets/svgs/icons/loadingwhite.svg" alt="" fill />
                </div>
              ) : (
                'Sign In'
              )
            }
          </button>
        </form>
      </div>
    </div>
  );
}
