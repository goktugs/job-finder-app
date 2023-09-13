import { Navigate, Outlet } from "react-router-dom";
import { useToast } from "./components/ui/use-toast";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  const { toast } = useToast();

  if (!token) {
    toast({
      variant: "destructive",
      title: "You are not logged in",
      description: "Please login to continue",
    });

    return (
      <>
        <Navigate to="/login" replace />
      </>
    );
  }

  return <Outlet />;
}
