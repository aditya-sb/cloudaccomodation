"use client";

import { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useVerifyEmailMutation, useResendVerificationMutation } from '../redux/slices/apiSlice';

interface VerifyEmailProps {
    email: string;
    userId: string;
    onVerificationComplete: () => void;
    onResendVerification: () => Promise<void>;
}

type MessageType = 'success' | 'error' | '';

interface Message {
    type: MessageType;
    text: string;
}

export default function VerifyEmail({
    email,
    userId,
    onVerificationComplete,
    onResendVerification,
}: VerifyEmailProps) {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });
    const [resendTimer, setResendTimer] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    
    // RTK Query hooks
    const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
    const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, []);

    const handleCodeChange = (index: number, value: string) => {
        if (value && !/^\d+$/.test(value)) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = verificationCode.join('');

        if (code.length !== 6) {
            setMessage({ type: 'error', text: 'Please enter a valid 6-digit code' });
            return;
        }

        try {
            const result = await verifyEmail({ email, otp: code }).unwrap();
            
            setMessage({
                type: 'success',
                text: result.message || 'Email verified successfully!'
            });

            // Notify parent component that verification is complete
            onVerificationComplete();
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error?.data?.message || 'An error occurred during verification'
            });
        }
    };

    const handleResendCode = async () => {
        if (resendTimer > 0) return;

        try {
            setMessage({ type: '', text: '' });
            await resendVerification({ email }).unwrap();
            setResendTimer(30);
            setMessage({ type: 'success', text: 'Verification code resent successfully!' });
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error?.data?.message || 'Failed to resend verification code'
            });
        }
    };

    return (
        <div className="w-full max-w-md p-6">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold">Verify Your Email</h2>
                    <p className="text-muted-foreground">
                        We've sent a verification code to {email}
                    </p>
                </div>
                
                {message.text && (
                    <div className={`p-3 rounded-md ${
                        message.type === 'error' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center space-x-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                                key={index}
                                ref={el => {
                                    if (el) inputRefs.current[index] = el;
                                }}
                                type="text"
                                maxLength={1}
                                value={verificationCode[index] || ''}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="h-14 w-12 text-center text-2xl border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                disabled={isVerifying || isResending}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            disabled={isVerifying || isResending || verificationCode.join('').length !== 6}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isVerifying ? (
                                <span className="flex items-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </span>
                            ) : (
                                'Verify Email'
                            )}
                        </button>
                    </div>
                </form>

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendTimer > 0 || isVerifying || isResending}
                        className={`text-sm font-medium ${
                            resendTimer > 0 || isVerifying || isResending ? 'text-gray-400' : 'text-blue-600 hover:text-blue-500'
                        }`}
                    >
                        {isResending ? (
                            <span className="flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </span>
                        ) : resendTimer > 0 ? (
                            `Resend code in ${resendTimer}s`
                        ) : (
                            'Resend code'
                        )}
                    </button>
                </div>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        Having trouble? Contact our{' '}
                        <a href="mailto:support@cloudaccommodation.com" className="font-medium text-blue-600 hover:text-blue-500">
                            support team
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}