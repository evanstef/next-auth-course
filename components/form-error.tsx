import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
    message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if(!message) return null;
    return (
        <div className='bg-destructive/15 text-destructive flex items-center gap-x-2 rounded-md px-4 py-2'>
            <ExclamationTriangleIcon className='w-5 h-5' />
            <p>{message}</p>
        </div>
    )
}
