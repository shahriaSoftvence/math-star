'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import AllUser from './allUsers';
import { Switch } from '@/components/ui/switch';

type FormValues = {
    new_user_emails: boolean;
};

export default function UsersPage() {
    const form = useForm<FormValues>({
        defaultValues: {
            new_user_emails: true, // switch ON by default
        },
    });

    const handleSwitchChange = (value: boolean) => {
        form.setValue('new_user_emails', value);
        console.log('Switch is now:', value);
    };

    return (
        <FormProvider {...form}>
            <div className="max-w-7xl mx-auto my-5">
                <h2 className="text-xl font-semibold my-4 text-center">All Users</h2>

                <div className='my-4'>
                    <FormField
                        control={form.control}
                        name="new_user_emails"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <FormLabel className='font-semibold'>Welcome Math Star</FormLabel>
                                    <FormDescription>
                                        Receive email about new math challenges, updates, and rewards.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value ?? true}
                                        onCheckedChange={handleSwitchChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <AllUser />
            </div>
        </FormProvider>
    );
}
