import { ContactForm } from "@/components/contact-form";
import { AnimateOnScroll } from "../animate-on-scroll";

export function Contact() {
  return (
    <section id="contact" className="w-full py-16 lg:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <AnimateOnScroll
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
          >
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s Plan Your Next Event
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll
            animationClass="animate-slide-in-up"
            hiddenClass="opacity-0"
            delay="0.1s"
          >
            <p className="max-w-lg text-muted-foreground">
              Have an idea for an event? We&apos;d love to hear about it. Fill
              out the form, and one of our event specialists will get back to
              you to discuss how we can bring your vision to life, sustainably.
            </p>
          </AnimateOnScroll>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
