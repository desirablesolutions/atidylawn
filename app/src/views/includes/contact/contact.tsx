export const FormComponent = null;

export type ContactProps = {
  title: string;
}



export function Contact() {
  return (
    <section id="contact" className="py-16 px-4">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-4xl font-thin text-center mb-12 text-green-700 dark:text-green-400">Get in Touch</h2>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeq1LHz4ol5dj8TCg3pYXyyvNALuFllNk9rbWUwrQ444gCVHQ/viewform?embedded=true" width="640" height="1952" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>      
      </div>
    </section>
  )
}

 