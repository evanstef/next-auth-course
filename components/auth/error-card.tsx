import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { BackButton } from "./back-button";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper headerLabel="Opps Something went wrong!!" backButtonHref="/auth/login" backButtonLabel="Back To Login">
            <div className="w-full rounded-lg bg-destructive/15 py-3 px-4 flex items-center gap-3">
              <ExclamationTriangleIcon /> 
              <p className="text-destructive">Something went wrong!!</p> 
            </div>
        </CardWrapper>
    )
}