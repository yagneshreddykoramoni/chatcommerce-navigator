
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";

const AuthDialog = () => {
  const { showAuthDialog, setShowAuthDialog } = useAuth();
  
  return (
    <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
      <DialogContent className="sm:max-w-md">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
