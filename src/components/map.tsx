"use client";

export function MapComponent() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0282418186066!2d77.53892007465323!3d13.09739668722966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae23225f80ae31%3A0x3403c4eee5da2abf!2sAP%20Home%20Food%20-%20Lunch%20box!5e0!3m2!1sen!2sin!4v1767287310699!5m2!1sen!2sin"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-[300px] w-full md:h-[400px] border-0"
      />
    </div>
  );
}
