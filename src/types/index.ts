export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavbarProps {
  variant?: 'default' | 'auth';
  showLogin?: boolean;
  showSignup?: boolean;
}
