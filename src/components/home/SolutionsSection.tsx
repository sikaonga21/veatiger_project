import { SolutionCard } from './SolutionCard';

const solutions = [
  {
    title: 'We Empower',
    subtitle: 'Productivity Tools',
    description:
      "An employee is only as productive as his tools, and that statement is increasingly true in this digital age. Therefore, having access to such technology is pivotal for success with cloud-backed workplace application suites and applications tailored to automate mundane work. A highly productive workforce is critical to a successful organisation.",
    features: ['OneVoice', 'Microsoft 365', 'Exchange Online', 'Dynamics 365'],
    learnMoreLink: '/empower',
    imageSrc: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    imageAlt: 'Team collaboration',
  },
  {
    title: 'We Connect',
    subtitle: 'Cloud Connectivity',
    description:
      "C2 has a suite of connectivity products and services that connect you to strategically located data centres and offer unrivalled cloud solutions. This bouquet of products and services ensure exceptional cloud experiences and rich, evolving connectivity solutions.",
    features: ['Liquid Edge', 'Microsoft ExpressRoute', 'Microsoft Azure Peering Service', 'Microsoft 365Direct'],
    learnMoreLink: '/connect',
    imageSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    imageAlt: 'Cloud connectivity',
    reverse: true,
  },
  {
    title: 'We Secure',
    subtitle: 'Cyber Security',
    description:
      "As organisational data becomes increasingly important to help you understand your business, threat actors have become increasingly active to disrupt your workflow. It is crucial to your business sustainability to deploy smart backup and disaster recovery measures.",
    features: ['Security Consulting Services', 'Product Solutions & Services', 'Managed Security Services', 'Security Operation Centre'],
    learnMoreLink: '/secure',
    imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    imageAlt: 'Cyber security',
  },
  {
    title: 'We Expand',
    subtitle: 'Cloud Platforms',
    description:
      "Whether your organisation is just migrating to the cloud or every team member is actively leveraging the cloud platform for daily operations, cloud-based solutions have firmly influenced the professional world. With cloud services, you can work any time, from anywhere.",
    features: ['Microsoft Azure', 'Amazon Web Services', 'Google Cloud', 'Liquid Site Builder'],
    learnMoreLink: '/expand',
    imageSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    imageAlt: 'Cloud platforms',
    reverse: true,
  },
  {
    title: 'We Advise',
    subtitle: 'Professional Services',
    description:
      "Leverage years of Managed Services Provider expertise managing various businesses have allowed us unique insight into a business process. As a result, we can help identify system vulnerabilities and provide lasting solutions.",
    features: ['Discovery Services', 'Planning Services', 'Deployment Services', 'Support Services', 'Titanium Cloud Management'],
    learnMoreLink: '/advise',
    imageSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    imageAlt: 'Professional services',
  },
];

export const SolutionsSection = () => {
  return (
    <>
      {solutions.map((solution) => (
        <SolutionCard
          key={solution.title}
          {...solution}
        />
      ))}
    </>
  );
};
