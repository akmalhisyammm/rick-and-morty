'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { LocationContext } from '@/contexts/location';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type LocationFormProps = {
  characterId: number;
  onDismiss: () => void;
};

const formSchema = z.object({
  location: z.string().min(1, {
    message: 'Location is required',
  }),
});

const LocationForm = ({ characterId, onDismiss }: LocationFormProps) => {
  const { assignCharacterToLocation } = useContext(LocationContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const isSuccess = assignCharacterToLocation(data.location, characterId);

    if (isSuccess) {
      toast.success(`Character assigned to ${data.location}`);
      onDismiss();
    } else {
      toast.error(`Character already assigned to ${data.location}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Knowhere" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Assign</Button>
      </form>
    </Form>
  );
};

export default LocationForm;
