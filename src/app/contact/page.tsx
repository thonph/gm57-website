import TitleContact from "@/components/TitleContact";
import ContactForms from "@/components/ContactForms";


function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">

        <TitleContact />

        <div className="max-w-2xl mx-auto">

          <ContactForms />

        </div>
      </div>
    </section>
  );
}

export default ContactSection;