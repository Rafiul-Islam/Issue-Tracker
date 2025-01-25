import React from 'react';
import { FieldError } from 'react-hook-form';

interface Props {
    error?: FieldError;
}

const ErrorMessage = ({ error }: Props) => (
    error?.message ? <span className="text-red-500 mt-1.5 text-sm">{error.message}</span> : null
);

export default ErrorMessage;
