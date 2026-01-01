"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AnimateOnScroll } from "./animate-on-scroll";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50),
  email: z.string().email("Please enter a valid email address."),
  eventType: z.enum(["tedx", "corporate", "conference", "college", "brand"], {
    required_error: "Please select an event type.",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must not exceed 500 characters."),
});

type FormValues = z.infer<typeof formSchema>;

async function submitForm(data: FormValues) {
  // In a real app, you'd send this data to your backend.
  // We'll simulate a network request.
  console.log("Form submitted:", data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // You can return a success or error message here.
  return { success: true };
}

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const result = await submitForm(values);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you shortly.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
    }
  }

  return (
    <AnimateOnScroll
      animationClass="animate-slide-in-up"
      hiddenClass="opacity-0"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} className="bg-input border-border focus:ring-primary"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="jane.doe@example.com" {...field} className="bg-input border-border focus:ring-primary"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What kind of event are you planning?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-input border-border focus:ring-primary">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tedx">TEDx Event</SelectItem>
                    <SelectItem value="corporate">Corporate & Business Event</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="college">College & Cultural Event</SelectItem>
                    <SelectItem value="brand">Brand & Experiential</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your event..."
                    className="min-h-[150px] bg-input border-border focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please include details like event date, potential locations, and audience size.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" disabled={form.formState.isSubmitting} variant="secondary">
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send Inquiry
          </Button>
        </form>
      </Form>
    </AnimateOnScroll>
  );
}
