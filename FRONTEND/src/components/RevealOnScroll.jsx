import { motion } from "framer-motion";

const RevealOnScroll = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Smaller movement for smoother effect
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }} // Starts animation when 20% of the element is in view
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default RevealOnScroll;
