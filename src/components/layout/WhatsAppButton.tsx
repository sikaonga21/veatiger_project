import { WhatsappLogo } from "phosphor-react";

export const WhatsAppButton = () => {
    // Number provided: +26096 3627768
    // WhatsApp format removes the + and spaces
    const phoneNumber = "260963627768";
    const message = "Hello! I'm interested in Veatiger's services.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-xl flex items-center justify-center group"
            aria-label="Chat with us on WhatsApp"
        >
            <WhatsappLogo className="w-8 h-8" weight="fill" />
            <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-medium py-1 px-3 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
                Chat with us
            </span>
        </a>
    );
};
