
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar"; 

const Privacy = () => {
  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cyan">X Minecraft Launcher Privacy Terms</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-white/70 mb-8">
            Thank you for using the X Minecraft Launcher ("the Launcher"), developed by XMCL developer team ("the Organization"). This document outlines the privacy terms and practices governing the collection, use, and protection of certain information when you use the Launcher. By using the Launcher, you agree to the terms outlined in this document.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. Information Collection and Use</h2>
          <h3 className="text-xl font-semibold mb-3">2.1. Usage Information</h3>
          <p className="text-white/70 mb-4">
            The Launcher collects the following usage information:
          </p>
          <ul className="list-disc pl-8 text-white/70 mb-6">
            <li>Minecraft game start event</li>
            <li>Minecraft game exit event</li>
            <li>User login event</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2. Additional Information</h3>
          <p className="text-white/70 mb-4">
            In addition to the usage information mentioned above, the Launcher also collects the following data:
          </p>
          <ul className="list-disc pl-8 text-white/70 mb-6">
            <li>Minecraft startup arguments</li>
            <li>Game exit code</li>
            <li>User login service name</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.3. Device Identification</h3>
          <p className="text-white/70 mb-6">
            The Launcher generates a unique ID for your device. This ID will be used to identify your device as a single user. No personally identifiable information is associated with this device ID.
          </p>

          <h3 className="text-xl font-semibold mb-3">2.4. Error Reporting</h3>
          <p className="text-white/70 mb-8">
            The Launcher collects unexpected errors and their associated error stacks for the purpose of identifying and resolving issues. This information is used to improve the stability and performance of the Launcher and is not used for any other purpose.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. Data Sharing and Disclosure</h2>
          <p className="text-white/70 mb-4">
            The Organization may share the collected information in the following circumstances:
          </p>
          <ul className="list-disc pl-8 text-white/70 mb-8">
            <li>With contributors and maintainers of the Launcher for the purpose of improving the software and providing support</li>
            <li>When required by applicable law or in response to a legal request</li>
            <li>To protect the rights, property, or safety of the Organization, its users, or others</li>
            <li>As part of an aggregated and anonymized dataset that does not identify individual users</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="text-white/70 mb-8">
            The Organization takes reasonable measures to protect the collected information from unauthorized access, use, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
          <p className="text-white/70 mb-8">
            The Launcher may integrate with or provide links to third-party services or websites. The Organization is not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of those third parties before providing any personal information.
          </p>

          <h2 className="text-2xl font-bold mb-4">6. Children's Privacy</h2>
          <p className="text-white/70 mb-8">
            The Launcher is not intended for use by individuals under the age of 13. The Organization does not knowingly collect personal information from children under 13. If you believe we have collected personal information from a child under 13, please contact us immediately.
          </p>

          <h2 className="text-2xl font-bold mb-4">7. Changes to this Privacy Terms</h2>
          <p className="text-white/70 mb-8">
            The Organization reserves the right to update or modify this privacy terms document at any time. We will notify you of any material changes by posting the updated version on our website or through other communication channels.
          </p>

          <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
          <p className="text-white/70">
            If you have any questions or concerns about this privacy terms document or our privacy practices, please contact us at <a href="mailto:cijhn@hotmail.com" className="text-accent hover:underline">cijhn@hotmail.com</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
