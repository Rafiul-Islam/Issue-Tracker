import React from 'react';
import { FieldError } from 'react-hook-form';
import {Text} from "@radix-ui/themes";

interface Props {
    error?: FieldError;
}

const ErrorMessage = ({ error }: Props) => (
    error?.message ? <Text className="text-red-500 mt-1.5 text-sm">{error.message}</Text> : null
);

export default ErrorMessage;
