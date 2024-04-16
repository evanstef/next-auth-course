import {CheckCircledIcon} from '@radix-ui/react-icons';

interface FormSuccessProps {
    message?: string
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if(!message) return null;
    return (
        <div className='bg-emerald-500/15 text-emerald-500 flex items-center gap-x-2 rounded-md px-4 py-2'>
            <CheckCircledIcon className='w-5 h-5' />
            <p>{message}</p>
        </div>
        )
    }   