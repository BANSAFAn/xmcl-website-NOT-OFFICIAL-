
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Book } from "lucide-react";

export function TipAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert className="bg-blue-500/10 border-blue-500/30 mb-6">
      <Book className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-400">TIP</AlertTitle>
      <AlertDescription className="text-blue-200">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function ImportantAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert className="bg-red-500/10 border-red-500/30 mb-6">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <AlertTitle className="text-red-400">IMPORTANT</AlertTitle>
      <AlertDescription className="text-red-200">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function NoteAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert className="bg-yellow-500/10 border-yellow-500/30 mb-6">
      <AlertCircle className="h-4 w-4 text-yellow-500" />
      <AlertTitle className="text-yellow-400">NOTE</AlertTitle>
      <AlertDescription className="text-yellow-200">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function GoodNewsAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert className="bg-green-500/10 border-green-500/30 mb-6">
      <AlertCircle className="h-4 w-4 text-green-500" />
      <AlertTitle className="text-green-400">Good news</AlertTitle>
      <AlertDescription className="text-green-200">
        {children}
      </AlertDescription>
    </Alert>
  );
}
