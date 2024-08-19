'use client';

import { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ExtractedInfoDisplay from '@/components/TextDisplay'

// Define rules for our form
const formSchema = z.object({
  //Start with accepting any kind of data for the "file" field.
 file: typeof window === 'undefined'
    ? z.any()
    : z.instanceof(File, { message: "Please select a file." })
        .refine(file => file.size <= 5000000, `File size should be less than 5MB.`)

});

export default function UploadForm() {
  // Create a state to track if we're currently uploading
  const [uploading, setUploading] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [category, setCategory] = useState(null);
  // Get the function to show toast notifications
  const { toast } = useToast();
  const { user } = useUser();

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
    if(!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to upload a screenshot.",
        variant: "destructive",
      });
      return;
    }
  

  setUploading(true);
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('userId', user.id);
    formData.append('userEmail', user.emailAddresses[0].emailAddress);
    formData.append('username', user.username || user.firstName || 'Unknown');

   

  try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });


      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
     

      toast({
        title: "Upload Successful",
        description: "Your screenshot has been uploaded and processed.",
      });

      form.reset(); // Clear the form after successful upload
      console.log('Upload successful:', result);

      console.log(`result.imageUrl: ${result.screenshot.imageUrl}`)
      console.log(`result.id: ${result.screenshot.id}`)
      console.log(`result.screenshot.clerkId: ${result.screenshot.clerkId}`)

      // Perform OCR
    const ocrResponse = await fetch('/api/ocr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: result.screenshot.imageUrl,
        screenshotId: result.screenshot.id
      }),
    });

    if (!ocrResponse.ok) throw new Error('OCR processing failed');

    const ocrResult = await ocrResponse.json();
    console.log('OCR successful:', ocrResult);
    setOcrResult(ocrResult.extractedText);
    setOcrResult(ocrResult.extractedText);
    setCategory(ocrResult.category);

    toast({
      title: "Process Successful",
      description: "Your screenshot has been uploaded and processed.",
    });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "There was a problem uploading your screenshot.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      form.reset(); // Clear the form after successful upload
    }
  }

  return (

    <>
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
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>
                Upload a screenshot to analyze (max 5MB).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit" disabled={uploading || !user}>
            {uploading ? "Uploading..." : "Upload Screenshot"}
          </Button>
        </form>
      </Form>

        {/* extracted text display component */}
     <ExtractedInfoDisplay 
     extractedText = {ocrResult}
     category = {category}
     />

    </>
   );
 }
   
    

