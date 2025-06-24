import { motion } from "framer-motion";
import { FC } from "react";
import type { User } from "../../../../types/User";

interface ContactSectionProps {
  user: User;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

export const ContactSection: FC<ContactSectionProps> = ({
  user,
  githubUrl,
  linkedinUrl,
  websiteUrl,
}) => {
  const contactItems = [
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: "GitHub",
      href: githubUrl,
      description: "Mes projets open source",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "LinkedIn",
      href: linkedinUrl,
      description: "Mon réseau professionnel",
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: "Email",
      href: `mailto:${user.email}`,
      description: user.email,
    },
    {
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      label: "Site Web",
      href: websiteUrl,
      description: "Mon portfolio en ligne",
    },
  ].filter((item) => item.href);

  return (
    <section
      id="contact"
      className="relative flex w-full items-center justify-center"
      style={{
        background: "linear-gradient(180deg, rgb(2,2,2) 0%, rgb(0,0,0) 100%)",
        paddingBlock: "8rem",
      }}
    >
      <div className="mx-auto flex w-[65%] flex-col">
        {/* Header */}
        <div className="mb-5 flex w-[94%] flex-col">
          <h3 className="text-left text-4xl">Collaborons ensemble</h3>
          <p className="mt-2 max-w-2xl text-left text-xl text-neutral-400">
            Une idée ? Un projet ? N'hésitez pas à me contacter pour en discuter
          </p>
        </div>
        {/* Call to action */}
        <motion.div
          className="mb-16 text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-6 py-3 backdrop-blur-md">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
            <span className="text-neutral-300">
              Disponible pour de nouveaux projets
            </span>
          </div>
        </motion.div>
        {/* Contact Cards - Small Version */}
        <div className="grid w-full max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.href?.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="group flex- relative flex gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-neutral-800 p-2 text-neutral-300 transition-all duration-200 group-hover:scale-110 group-hover:bg-neutral-700 group-hover:text-white">
                  {item.icon}
                </div>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-white">
                  {item.label}
                </h3>
                <p className="truncate text-xs text-wrap text-neutral-400 group-hover:text-neutral-300">
                  {item.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
