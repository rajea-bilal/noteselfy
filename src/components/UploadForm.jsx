'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Define rules for our form
const formSchema = z.object({
  // The file must be a File object and smaller than 5MB
  file: z.instanceof(File).refine((file) => file.size <= 5000000, `File size should be less than 5MB.`)
});

export default function UploadForm() {
  // Create a state to track if we're currently uploading
  const [uploading, setUploading] = useState(false);
  // Get the function to show toast notifications
  const { toast } = useToast();

   // Set up the form with react-hook-form
  const form = useForm({
    // Use zod to validate the form
    resolver: zodResolver(formSchema),
    defaultValues: {
    // Set initial values
      file: undefined,
    },
  });

    // This function runs when the form is submitted
  const onSubmit = async (data) => {
    setUploading(true);
   // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', data.file);

    try {
      // Send the file to our API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // If the upload failed, throw an error
      if (!response.ok) throw new Error('Upload failed');

      // If it worked, get the result
      const result = await response.json();

      // Show a success message
      toast({
        title: "Upload Successful",
        description: "Your screenshot has been uploaded and processed.",
      });
      console.log('Upload successful:', result);
      // TODO: Handle successful upload (e.g., clear form, update UI)
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your screenshot.",
        variant: "destructive",
      });
    } finally {
      // Whether it worked or not, we're done uploading
      setUploading(false);
    }
  };

  return (
    // take all the properties/methods of form object from the useForm() and pass them to Form component from shadcn".
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Screenshot</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              </FormControl>
              <FormDescription>
                Upload a screenshot to analyze (max 5MB).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Screenshot"}
        </Button>
      </form>
    </Form>
  );
}