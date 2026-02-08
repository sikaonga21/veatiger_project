import { motion } from 'framer-motion';

const partners = [
  { name: 'AWS', color: '#FF9900' },
  { name: 'Cloudflare', color: '#F38020' },
  { name: 'Microsoft', color: '#00A4EF' },
  { name: 'Acronis', color: '#E6000E' },
  { name: 'Google Cloud', color: '#4285F4' },
  { name: 'Fortinet', color: '#EE3124' },
];

export const PartnersCarousel = () => {
  return (
    <section className="py-12 bg-muted overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {/* Double the partners for seamless loop */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-32 h-20 bg-white rounded-lg shadow-sm"
            >
              <span
                className="text-xl font-bold"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
